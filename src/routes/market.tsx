import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, PageHero, Section, SectionHeader, StatusNote } from "@/components/ais/primitives";
import { MARKET_CATEGORIES } from "@/components/ais/platform-data";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "AIS Market — Industrial Modules, Components and Services" },
      {
        name: "description",
        content:
          "AIS Market is the planned industrial marketplace for standardized modules, components, equipment, fabrication, logistics, maintenance and energy systems.",
      },
      { property: "og:title", content: "AIS Market — Coming Industrial Marketplace" },
      {
        property: "og:description",
        content:
          "Discover, configure, request, contract, deploy and manage industrial systems and services through one commercial layer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketPage,
});

const FLOW = ["Discover", "Configure", "Request", "Contract", "Deploy", "Manage"];

function MarketPage() {
  return (
    <>
      <PageHero
        eyebrow="AIS Market"
        title="A commercial layer for industrial systems."
        lead="A single place to discover standardized industrial systems and the engineering, logistics and lifecycle services that make them work — with pricing, lead times and specifications made legible."
      />

      <Section>
        <StatusNote>Coming platform — not transactable today</StatusNote>
        <SectionHeader
          className="mt-8"
          index="01"
          eyebrow="Categories"
          title="What the market will carry."
        />
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {MARKET_CATEGORIES.map((c, i) => (
            <div key={c} className="bg-background p-7">
              <p className="mono-label text-primary">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-base font-bold uppercase tracking-[0.06em]">
                {c}
              </h3>
              <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                Coming platform
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          index="02"
          eyebrow="Architecture"
          title="Discover → configure → request → contract → deploy → manage."
          lead="The market is not a catalogue bolted onto a website. It is the commercial front end of the same engineering, manufacturing and lifecycle system."
        />
        <ol className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3 lg:grid-cols-6">
          {FLOW.map((step, i) => (
            <li key={step} className="bg-background p-6">
              <p className="mono-label text-primary">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-4 font-display text-sm font-bold uppercase tracking-[0.08em]">
                {step}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <ActionLink to="/configure">Configure a system now</ActionLink>
          <ActionLink to="/partners" variant="outline">
            Supply into the network
          </ActionLink>
        </div>
      </Section>
    </>
  );
}
