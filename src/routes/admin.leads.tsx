import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { listLeads, updateLeadStatus } from "@/lib/rfq.functions";
import { LEAD_STAGES } from "@/lib/rfq-stages";

export const Route = createFileRoute("/admin/leads")({
  component: LeadsAdmin,
});

function LeadsAdmin() {
  const list = useServerFn(listLeads);
  const update = useServerFn(updateLeadStatus);
  const queryClient = useQueryClient();
  const [openId, setOpenId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({ queryKey: ["leads"], queryFn: () => list() });

  const mutation = useMutation({
    mutationFn: (payload: { id: string; status: (typeof LEAD_STAGES)[number] }) =>
      update({ data: payload }),
    onSuccess: () => {
      toast.success("Stage updated.");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: () => toast.error("Could not update this inquiry."),
  });

  if (isLoading) return <p className="mono-label text-muted-foreground">Loading inquiries…</p>;
  if (error)
    return (
      <p className="text-sm text-muted-foreground">
        {error instanceof Error && error.message === "Forbidden"
          ? "Your account does not have permission to view project inquiries yet."
          : "Inquiries could not be loaded."}
      </p>
    );

  const leads = data ?? [];
  if (!leads.length)
    return (
      <div className="border border-border bg-surface p-8">
        <p className="mono-label text-primary">No inquiries yet</p>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Requirements submitted through the request form appear here, including anything sent
          across from the engineering copilot.
        </p>
      </div>
    );

  return (
    <div className="space-y-px border border-border bg-border">
      {leads.map((lead) => {
        const open = openId === lead.id;
        return (
          <article key={lead.id} className="bg-background p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-primary">
                  {lead.reference} · {new Date(lead.created_at).toLocaleDateString()}
                  {lead.source === "copilot" ? " · via copilot" : ""}
                </p>
                <h2 className="mt-2 font-display text-lg font-bold uppercase tracking-[0.04em]">
                  {lead.project_name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lead.organization} — {lead.location}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2">
                  <span className="sr-only">Stage for {lead.reference}</span>
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      mutation.mutate({
                        id: lead.id,
                        status: e.target.value as (typeof LEAD_STAGES)[number],
                      })
                    }
                    className="border border-input bg-surface px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em]"
                  >
                    {LEAD_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : lead.id)}
                  aria-expanded={open}
                  className="border border-border px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] hover:border-primary hover:text-primary"
                >
                  {open ? "Hide detail" : "View detail"}
                </button>
              </div>
            </div>

            {open && (
              <dl className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
                {[
                  ["Contact", `${lead.contact_name} — ${lead.contact_email}`],
                  ["Phone", lead.contact_phone || "—"],
                  ["Sector", lead.sector || "—"],
                  ["System", lead.system || "—"],
                  ["Scale", lead.scale || "—"],
                  ["Target date", lead.timeline || "—"],
                  ["Budget", lead.budget || "—"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="mono-label">{k}</dt>
                    <dd className="mt-1 text-sm">{v}</dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <dt className="mono-label">Requirements</dt>
                  <dd className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {lead.requirements || "—"}
                  </dd>
                </div>
              </dl>
            )}
          </article>
        );
      })}
    </div>
  );
}
