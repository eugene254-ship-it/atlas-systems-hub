import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Build the Industrial Future at AIS" },
      {
        name: "description",
        content:
          "Engineering, manufacturing, fabrication, welding, electrical, software, supply chain, logistics and operations roles at Atlas Industrial Systems.",
      },
      { property: "og:title", content: "Build the Industrial Future — Careers at AIS" },
      {
        property: "og:description",
        content: "Disciplines AIS hires across engineering, manufacturing, technology and operations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/careers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

const ROLES = [
  "Mechanical engineering",
  "Civil / structural engineering",
  "Manufacturing",
  "Welding",
  "Fabrication",
  "Electrical systems",
  "Software engineering",
  "Product design",
  "Supply chain",
  "Logistics",
  "Project management",
  "Sales",
  "Operations",
];

function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the industrial future."
        lead="AIS is assembling an engineering and manufacturing team capable of turning infrastructure requirements into deployable systems."
      />
      <Container className="py-16 md:py-24">
        <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((r, i) => (
            <li key={r} className="flex items-center justify-between bg-background px-7 py-6">
              <span className="font-display text-sm font-bold uppercase tracking-[0.06em]">{r}</span>
              <span className="font-mono text-[0.62rem] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <StatusNote>Open roles — to be published</StatusNote>
        </div>
        <div className="mt-10">
          <ActionLink to="/contact">Register your interest</ActionLink>
        </div>
      </Container>
    </>
  );
}
