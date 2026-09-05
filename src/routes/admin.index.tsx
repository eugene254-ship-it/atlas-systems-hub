import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyAccess } from "@/lib/cms.functions";
import { listLeads } from "@/lib/rfq.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const access = useServerFn(getMyAccess);
  const leads = useServerFn(listLeads);

  const accessQuery = useQuery({ queryKey: ["access"], queryFn: () => access() });
  const leadsQuery = useQuery({
    queryKey: ["leads"],
    queryFn: () => leads(),
    enabled: Boolean(accessQuery.data?.isStaff),
  });

  if (accessQuery.isLoading) {
    return <p className="mono-label text-muted-foreground">Loading…</p>;
  }

  if (!accessQuery.data?.isStaff) {
    return (
      <div className="border border-border bg-surface p-8">
        <p className="mono-label text-primary">No workspace access</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Your account is signed in but has not been given editor or admin permission yet. An
          existing admin has to grant it before you can edit pages or see project inquiries.
        </p>
      </div>
    );
  }

  const all = leadsQuery.data ?? [];
  const open = all.filter((l) => !["won", "closed", "deployed"].includes(l.status));
  const stats = [
    { label: "Total inquiries", value: String(all.length) },
    { label: "Open", value: String(open.length) },
    { label: "New this month", value: String(all.filter(isThisMonth).length) },
    { label: "From copilot", value: String(all.filter((l) => l.source === "copilot").length) },
  ];

  return (
    <div className="space-y-10">
      <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-background p-7">
            <dt className="mono-label">{s.label}</dt>
            <dd className="mt-3 font-display text-3xl font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-px border border-border bg-border md:grid-cols-2">
        <Link to="/admin/content" className="bg-background p-7 hover:text-primary">
          <p className="mono-label text-primary">Page content</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Edit the homepage, Industrial OS and Market wording, plus each page's search and social
            preview text.
          </p>
        </Link>
        <Link to="/admin/leads" className="bg-background p-7 hover:text-primary">
          <p className="mono-label text-primary">Project inquiries</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Review submitted requirements and move them along the procurement pathway.
          </p>
        </Link>
      </div>
    </div>
  );
}

function isThisMonth(lead: { created_at: string }) {
  const d = new Date(lead.created_at);
  const now = new Date();
  return d.getUTCFullYear() === now.getUTCFullYear() && d.getUTCMonth() === now.getUTCMonth();
}
