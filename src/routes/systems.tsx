import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero, Tag } from "@/components/ais/primitives";
import { SYSTEM_FAMILIES } from "@/components/ais/data";

export const Route = createFileRoute("/systems")({
  head: () => ({
    meta: [
      { title: "Industrial Systems — Containerized, Steel, Modular | AIS" },
      {
        name: "description",
        content:
          "Six AIS product families: containerized infrastructure, engineered steel fabrication, modular buildings, logistics infrastructure, distributed energy and rapid-deployment systems.",
      },
      { property: "og:title", content: "Industrial Systems, Built as Components — AIS" },
      {
        property: "og:description",
        content:
          "Containerized infrastructure, engineered steel, modular buildings, logistics, energy and rapid-deployment systems.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/systems" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/systems" }],
  }),
  component: SystemsPage,
});

function SystemsPage() {
  return (
    <>
      <PageHero
        eyebrow="Systems portfolio"
        title="Industrial systems, built as components."
        lead="Each family is engineered as a component of a larger infrastructure system — specified, fabricated, integrated and supported to a single standard."
      />
      <Container className="py-20 md:py-28">
        <div className="grid gap-px bg-border">
          {SYSTEM_FAMILIES.map((sys) => (
            <article
              key={sys.code}
              id={sys.name.toLowerCase().replace(/\s+/g, "-")}
              className="grid gap-8 bg-background p-8 md:grid-cols-[1fr_1.4fr] md:p-12"
            >
              <div>
                <p className="mono-label text-primary">Product family {sys.code}</p>
                <h2 className="display-xl mt-5 text-3xl md:text-4xl">{sys.name}</h2>
                <p className="mono-label mt-3">{sys.category}</p>
                <div className="mt-8">
                  <ActionLink to="/quote" variant="outline">
                    {sys.cta}
                  </ActionLink>
                </div>
              </div>
              <div>
                <p className="text-base text-muted-foreground">{sys.description}</p>
                <h3 className="mono-label mt-8 text-foreground">Applications</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {sys.applications.map((a) => (
                    <li key={a}>
                      <Tag>{a}</Tag>
                    </li>
                  ))}
                </ul>
                <dl className="mt-8 grid gap-px bg-border sm:grid-cols-3">
                  {[
                    ["Engineering", "Requirement-led"],
                    ["Fabrication", "In-house + partner"],
                    ["Support", "Lifecycle"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-background py-4 pr-4">
                      <dt className="mono-label">{k}</dt>
                      <dd className="mt-1 font-mono text-xs">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
