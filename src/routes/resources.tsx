import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Industrial Insights & Engineering Guides | AIS" },
      {
        name: "description",
        content:
          "The AIS knowledge centre: industrial insights, engineering guides, project planning guides, procurement resources, case studies and the AIS Journal.",
      },
      { property: "og:title", content: "AIS Knowledge Centre — Resources" },
      {
        property: "og:description",
        content:
          "Research, engineering guides and procurement resources for modular industrial infrastructure.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/resources" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

const SECTIONS = [
  ["Industrial insights", "Research and analysis on industrialization and infrastructure systems."],
  ["Engineering guides", "Technical educational resources on modular and steel systems."],
  ["Project guides", "How to plan, budget and sequence modular infrastructure projects."],
  ["Procurement", "Specification templates and industrial procurement resources."],
  ["Case studies", "Concept and pilot project documentation."],
  ["AIS Journal", "Articles on industrialization, manufacturing and African industrial development."],
];

function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Knowledge for people who buy and build infrastructure."
        lead="Practical material for engineers, procurement teams and operators evaluating modular industrial systems."
      />
      <Container className="py-16 md:py-24">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(([title, body], i) => (
            <article key={title} className="bg-background p-8">
              <span className="font-mono text-[0.62rem] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-display text-base font-bold uppercase tracking-[0.06em]">
                {title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
              <p className="mono-label mt-6">Publishing soon</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <StatusNote>Content library — in development</StatusNote>
        </div>
        <div className="mt-10">
          <ActionLink to="/specifications" variant="outline">
            Technical specifications
          </ActionLink>
        </div>
      </Container>
    </>
  );
}
