import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { PROJECTS } from "@/components/ais/data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Concept Deployments — AIS" },
      {
        name: "description",
        content:
          "Concept and pilot infrastructure projects from Atlas Industrial Systems: remote mining facilities, cold-chain nodes, rapid response clinics and fabricated equipment platforms.",
      },
      { property: "og:title", content: "Built for Real Conditions — AIS Projects" },
      {
        property: "og:description",
        content:
          "Clearly labelled concept and pilot projects showing how AIS systems address real industrial constraints.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Built for real conditions."
        lead="AIS is an early-stage industrial platform. The work below is presented as concept and pilot projects — not as completed client deliveries."
      />
      <Container className="py-20 md:py-28">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {PROJECTS.map((p) => (
            <article key={p.name} className="bg-background p-8 md:p-10">
              <StatusNote>{p.label}</StatusNote>
              <h2 className="display-xl mt-6 text-2xl md:text-3xl">{p.name}</h2>
              <dl className="mt-8 grid grid-cols-2 gap-px bg-border">
                {[
                  ["Location", p.location],
                  ["Sector", p.sector],
                  ["System", p.system],
                  ["Deployment", p.deployment],
                ].map(([k, v]) => (
                  <div key={k} className="bg-background py-3 pr-3">
                    <dt className="mono-label">{k}</dt>
                    <dd className="mt-1 font-mono text-xs">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-muted-foreground">
                <span className="text-foreground">Challenge — </span>
                {p.challenge}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="text-foreground">Engineering solution — </span>
                {p.solution}
              </p>
              <div className="mt-8">
                <ActionLink to="/contact" variant="ghost">
                  Discuss a comparable system
                </ActionLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
