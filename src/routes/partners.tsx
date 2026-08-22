import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero } from "@/components/ais/primitives";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partnerships — Build the Industrial System With AIS" },
      {
        name: "description",
        content:
          "AIS partners with governments, manufacturers, engineering firms, logistics and energy companies, investors, DFIs, NGOs, universities and technology companies.",
      },
      { property: "og:title", content: "Build the System With Us — AIS Partnerships" },
      {
        property: "og:description",
        content:
          "Partnership pathways for institutions building industrial infrastructure capacity in Africa.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/partners" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

const PARTNERS = [
  ["Governments", "Public infrastructure programmes and institutional deployment."],
  ["Manufacturers", "Shared production capacity and component supply."],
  ["Engineering firms", "Joint design, structural review and specialist disciplines."],
  ["Logistics companies", "Movement, handling and last-mile deployment."],
  ["Energy companies", "Distributed generation, storage and microgrid integration."],
  ["Construction companies", "Site works, foundations and integration into larger builds."],
  ["Mining companies", "Remote operational infrastructure and camp systems."],
  ["Investors", "Capital for manufacturing capacity and system development."],
  ["Development finance", "Programme financing for infrastructure deployment."],
  ["NGOs", "Rapid-deployment and humanitarian infrastructure."],
  ["Universities", "Research, engineering talent and applied industrial programmes."],
  ["Technology companies", "Digital twins, monitoring and industrial software."],
];

function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Build the system with us."
        lead="Industrial capacity is built by networks, not single companies. These are the partnership types AIS is actively developing."
      />
      <Container className="py-16 md:py-24">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map(([name, body], i) => (
            <article key={name} className="bg-background p-8">
              <span className="font-mono text-[0.62rem] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-display text-base font-bold uppercase tracking-[0.06em]">
                {name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-14">
          <ActionLink to="/contact">Become a partner</ActionLink>
        </div>
      </Container>
    </>
  );
}
