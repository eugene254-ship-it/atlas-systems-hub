import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { PROJECTS } from "@/components/ais/data";
import { getSiteContent } from "@/lib/cms.functions";
import { contentMeta, parseList } from "@/lib/site-content";

export const Route = createFileRoute("/projects")({
  loader: () => getSiteContent({ data: { key: "projects" } }),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [...contentMeta(loaderData), { property: "og:url", content: "/projects" }]
      : [],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const content = Route.useLoaderData();
  const f = content.fields;

  const custom = parseList(f["projects"], 8).map(
    ([name, location, sector, system, deployment, challenge, solution, label]) => ({
      name: name ?? "",
      location: location ?? "",
      sector: sector ?? "",
      system: system ?? "",
      deployment: deployment ?? "",
      challenge: challenge ?? "",
      solution: solution ?? "",
      label: label ?? "",
    }),
  );
  const projects = custom.length ? custom : PROJECTS;

  return (
    <>
      <PageHero
        eyebrow={f["hero_eyebrow"] ?? "Projects"}
        title={f["hero_title"] ?? ""}
        lead={f["hero_lead"] ?? ""}
      />
      <Container className="py-20 md:py-28">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.name} className="bg-background p-8 md:p-10">
              {p.label && <StatusNote>{p.label}</StatusNote>}
              <h2 className="display-xl mt-6 text-2xl md:text-3xl">{p.name}</h2>
              <dl className="mt-8 grid grid-cols-2 gap-px bg-border">
                {[
                  ["Location", p.location],
                  ["Sector", p.sector],
                  ["System", p.system],
                  ["Deployment", p.deployment],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="bg-background py-3 pr-3">
                      <dt className="mono-label">{k}</dt>
                      <dd className="mt-1 font-mono text-xs">{v}</dd>
                    </div>
                  ))}
              </dl>
              {p.challenge && (
                <p className="mt-6 text-sm text-muted-foreground">
                  <span className="text-foreground">Challenge — </span>
                  {p.challenge}
                </p>
              )}
              {p.solution && (
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="text-foreground">Engineering solution — </span>
                  {p.solution}
                </p>
              )}
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
