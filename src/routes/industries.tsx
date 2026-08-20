import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero } from "@/components/ais/primitives";
import { INDUSTRIES } from "@/components/ais/data";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Engineer For — Mining, Logistics, Energy | AIS" },
      {
        name: "description",
        content:
          "AIS delivers modular industrial infrastructure for mining, manufacturing, logistics, energy, construction, agriculture, government, healthcare, humanitarian and commercial real estate.",
      },
      { property: "og:title", content: "Engineered for the Industries That Move the World — AIS" },
      {
        property: "og:description",
        content:
          "Modular and containerized infrastructure engineered for ten industrial sectors across Africa.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/industries" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Engineered for the industries that move the world."
        lead="Different sectors, one engineering discipline: define the operational requirement, then manufacture infrastructure that meets it."
      />
      <Container className="py-20 md:py-28">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <article key={ind.name} className="bg-background p-8">
              <span className="font-mono text-[0.65rem] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="display-xl mt-4 text-xl">{ind.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{ind.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap gap-3">
          <ActionLink to="/quote">Start a project</ActionLink>
          <ActionLink to="/configure" variant="outline">
            Configure a system
          </ActionLink>
        </div>
      </Container>
    </>
  );
}
