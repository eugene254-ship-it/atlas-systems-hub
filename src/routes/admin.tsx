import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Container } from "@/components/ais/primitives";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "AIS Workspace — Content and Project Inquiries" },
      {
        name: "description",
        content: "Internal Atlas Industrial Systems workspace for page content and project inquiries.",
      },
      { property: "og:title", content: "AIS Workspace" },
      { property: "og:description", content: "Internal AIS content and lead workspace." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLayout,
});

const TABS = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/content", label: "Page content" },
  { to: "/admin/leads", label: "Project inquiries" },
  { to: "/admin/settings", label: "Lead routing" },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) navigate({ to: "/auth" });
      else setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate({ to: "/auth" });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  if (!ready) {
    return (
      <Container className="py-24">
        <p className="mono-label text-muted-foreground">Checking access…</p>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="mono-label text-primary">AIS workspace</p>
          <h1 className="display-xl mt-3 text-3xl">Content and inquiries</h1>
        </div>
        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="border border-border px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] hover:border-primary hover:text-primary"
        >
          Sign out
        </button>
      </div>

      <nav aria-label="Workspace sections" className="mt-6 flex flex-wrap gap-px bg-border">
        {TABS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={t.exact ? { exact: true } : undefined}
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            inactiveProps={{ className: "bg-background hover:text-primary" }}
            className="px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em]"
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10">
        <Outlet />
      </div>
    </Container>
  );
}
