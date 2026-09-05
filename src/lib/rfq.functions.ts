import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const leadSchema = z.object({
  project_name: z.string().trim().min(2).max(160),
  organization: z.string().trim().min(2).max(160),
  location: z.string().trim().min(2).max(160),
  sector: z.string().trim().max(120).optional().default(""),
  system: z.string().trim().max(160).optional().default(""),
  scale: z.string().trim().max(300).optional().default(""),
  requirements: z.string().trim().max(8000).optional().default(""),
  timeline: z.string().trim().max(20).optional().default(""),
  budget: z.string().trim().max(120).optional().default(""),
  contact_name: z.string().trim().min(2).max(120),
  contact_email: z.string().trim().email().max(320),
  contact_phone: z.string().trim().max(60).optional().default(""),
  copilot_brief: z.unknown().optional(),
  source: z.enum(["website", "copilot"]).default("website"),
});

function makeReference() {
  const now = new Date();
  const stamp = `${String(now.getUTCFullYear()).slice(2)}${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AIS-${stamp}-${rand}`;
}

/** Public: submit a project requirement. Stores the lead and fans out notifications. */
export const submitRfq = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const reference = makeReference();
    const insert = {
      reference,
      project_name: data.project_name,
      organization: data.organization,
      location: data.location,
      sector: data.sector || null,
      system: data.system || null,
      scale: data.scale || null,
      requirements: data.requirements || null,
      timeline: data.timeline || null,
      budget: data.budget || null,
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone || null,
      copilot_brief: (data.copilot_brief ?? null) as never,
      source: data.source,
      status: "new",
    };

    const { data: lead, error } = await supabaseAdmin
      .from("rfq_leads")
      .insert(insert)
      .select("id,reference,created_at")
      .single();

    if (error || !lead) {
      console.error("submitRfq insert failed", error);
      throw new Error("We could not record your requirement. Please try again.");
    }

    const events: { lead_id: string; kind: string; status: string; detail: string | null }[] = [
      { lead_id: lead.id, kind: "status", status: "new", detail: "Requirement received" },
    ];

    // Routing settings (CRM webhook + notification recipient)
    const { data: settingsRow } = await supabaseAdmin
      .from("site_settings")
      .select("value")
      .eq("key", "rfq_notifications")
      .maybeSingle();
    const settings = (settingsRow?.value ?? {}) as Record<string, string>;
    const webhookUrl = (settings["webhook_url"] ?? "").trim();
    const webhookSecret = (settings["webhook_secret"] ?? "").trim();
    const notifyEmail = (settings["notify_email"] ?? "").trim();

    if (webhookUrl && /^https:\/\//i.test(webhookUrl)) {
      const payload = JSON.stringify({
        event: "rfq.created",
        reference: lead.reference,
        created_at: lead.created_at,
        lead: { id: lead.id, ...insert },
      });
      try {
        const headers: Record<string, string> = { "content-type": "application/json" };
        if (webhookSecret) {
          const key = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(webhookSecret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"],
          );
          const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
          headers["x-ais-signature"] = Array.from(new Uint8Array(sig))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        }
        const res = await fetch(webhookUrl, { method: "POST", headers, body: payload });
        events.push({
          lead_id: lead.id,
          kind: "webhook",
          status: res.ok ? "sent" : "failed",
          detail: `${res.status} ${res.statusText}`.trim(),
        });
      } catch (err) {
        console.error("RFQ webhook failed", err);
        events.push({
          lead_id: lead.id,
          kind: "webhook",
          status: "failed",
          detail: err instanceof Error ? err.message : "Unknown webhook error",
        });
      }
    } else {
      events.push({
        lead_id: lead.id,
        kind: "webhook",
        status: "skipped",
        detail: "No CRM webhook configured",
      });
    }

    events.push({
      lead_id: lead.id,
      kind: "email",
      status: notifyEmail ? "queued" : "skipped",
      detail: notifyEmail
        ? `Notification queued for ${notifyEmail}`
        : "No notification recipient configured",
    });

    await supabaseAdmin.from("rfq_lead_events").insert(events);

    return { reference: lead.reference };
  });

/** Staff: the lead inbox. */
export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: staff } = await context.supabase.rpc("is_staff", { _user_id: context.userId });
    if (!staff) throw new Error("Forbidden");
    const { data, error } = await context.supabase
      .from("rfq_leads")
      .select(
        "id,reference,project_name,organization,location,sector,system,scale,requirements,timeline,budget,contact_name,contact_email,contact_phone,source,status,created_at",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const LEAD_STAGES = [
  "new",
  "qualified",
  "engineering review",
  "proposal",
  "negotiation",
  "won",
  "deployed",
  "closed",
] as const;

/** Staff: move a lead through the procurement pathway. */
export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(LEAD_STAGES) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: staff } = await context.supabase.rpc("is_staff", { _user_id: context.userId });
    if (!staff) throw new Error("Forbidden");
    const { error } = await context.supabase
      .from("rfq_leads")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
