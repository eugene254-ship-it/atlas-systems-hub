import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { CONTENT_DEFAULTS, mergeContent, type SiteContent } from "./site-content";

/** Publishable-key client for public reads. Only call this inside a handler. */
function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Public: content for a single page, merged over the built-in defaults. */
export const getSiteContent = createServerFn({ method: "GET" })
  .inputValidator((input: { key: string }) => z.object({ key: z.string().min(1) }).parse(input))
  .handler(async ({ data }): Promise<SiteContent> => {
    try {
      const { data: row } = await publicClient()
        .from("site_content")
        .select("route_key,label,seo_title,seo_description,og_title,og_description,fields")
        .eq("route_key", data.key)
        .maybeSingle();
      return mergeContent(data.key, row as Partial<SiteContent> | null);
    } catch (error) {
      console.error("getSiteContent failed", error);
      return mergeContent(data.key, null);
    }
  });

async function assertStaff(supabase: Database extends never ? never : any, userId: string) {
  const { data, error } = await supabase.rpc("is_staff", { _user_id: userId });
  if (error) throw new Error("Could not verify permissions");
  if (!data) throw new Error("Forbidden");
}

/** Staff: every editable page record. */
export const listSiteContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertStaff(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("site_content")
      .select("route_key,label,seo_title,seo_description,og_title,og_description,fields,updated_at")
      .order("route_key");
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
      ...mergeContent(row.route_key, row as Partial<SiteContent>),
      updated_at: row.updated_at,
    }));
  });

const contentSchema = z.object({
  route_key: z.string().min(1).max(64),
  seo_title: z.string().max(180).default(""),
  seo_description: z.string().max(400).default(""),
  og_title: z.string().max(180).default(""),
  og_description: z.string().max(400).default(""),
  fields: z.record(z.string(), z.string().max(2000)),
});

/** Staff: save one page's content and SEO fields. */
export const saveSiteContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => contentSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertStaff(context.supabase, context.userId);
    const label = CONTENT_DEFAULTS[data.route_key]?.label ?? data.route_key;
    const { error } = await context.supabase
      .from("site_content")
      .upsert({ ...data, label }, { onConflict: "route_key" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Signed-in user's access level, used to shape the admin UI. */
export const getMyAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [{ data: staff }, { data: admin }] = await Promise.all([
      context.supabase.rpc("is_staff", { _user_id: context.userId }),
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
    ]);
    return { userId: context.userId, isStaff: Boolean(staff), isAdmin: Boolean(admin) };
  });

const settingsSchema = z.object({
  webhook_url: z.string().max(500),
  webhook_secret: z.string().max(200),
  notify_email: z.string().max(320),
});

/** Admin: read the lead-routing settings. */
export const getRfqSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertStaff(context.supabase, context.userId);
    const { data } = await context.supabase
      .from("site_settings")
      .select("value")
      .eq("key", "rfq_notifications")
      .maybeSingle();
    const value = (data?.value ?? {}) as Record<string, unknown>;
    return {
      webhook_url: String(value["webhook_url"] ?? ""),
      webhook_secret: String(value["webhook_secret"] ?? ""),
      notify_email: String(value["notify_email"] ?? ""),
    };
  });

/** Admin: update the lead-routing settings. */
export const saveRfqSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => settingsSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase
      .from("site_settings")
      .upsert({ key: "rfq_notifications", value: data }, { onConflict: "key" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
