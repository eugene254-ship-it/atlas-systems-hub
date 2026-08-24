import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, PageHero, Section, SectionHeader, StatusNote } from "@/components/ais/primitives";
import { CAMPUS_ZONES, CORRIDOR_NODES } from "@/components/ais/platform-data";

export const Route = createFileRoute("/africa")({
  head: () => ({
    meta: [
      { title: "Building Industrial Capacity From Africa — AIS Industrialization Thesis" },
      {
        name: "description",
        content:
          "Africa needs infrastructure systems designed for scale, logistics constraints and energy limits. AIS builds manufacturing capability alongside infrastructure capability.",
      },
      { property: "og:title", content: "Building Industrial Capacity From Africa — AIS" },
      {
        property: "og:description",
        content:
          "Industrial corridors, manufacturing network and a long-term industrial campus: the AIS thesis for African industrialization.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AfricaPage,
});

const CONDITIONS = [
  { t: "Geographic scale", b: "Distances make transport mass and packing efficiency a design input, not a shipping detail." },
  { t: "Logistics constraints", b: "Road limits, ports and permits shape what can be delivered and how fast." },
  { t: "Fragmented markets", b: "Standardized systems travel across borders better than bespoke projects." },
  { t: "Uneven infrastructure", b: "Facilities must arrive with their own power, water and connectivity strategy." },
  { t: "Rapid urbanization", b: "Demand arrives faster than conventional construction can absorb it." },
  { t: "Energy constraints", b: "Hybrid generation and storage are baseline, not upgrades." },
  { t: "Industrial growth", b: "Mining, agri-processing and logistics need deployable capacity." },
  { t: "Local manufacturing", b: "Every deployment is an opportunity to build local industrial capability." },
];

const STATUS_STYLES: Record<string, string> = {
  Current: "border-primary/50 bg-primary/10 text-primary",
  Pilot: "border-border bg-surface-2 text-foreground",
  Target: "border-border text-muted-foreground",
  Future: "border-border/60 text-muted-foreground/70",
};

function AfricaPage() {
  return (
    <>
      <PageHero
        eyebrow="Industrialization"
        title="Building industrial capacity from Africa."
        lead="Infrastructure here is not a smaller version of infrastructure elsewhere. It has to survive distance, logistics, energy scarcity and pace of growth. That is a systems problem, and it is solved industrially."
      />

      <Section>
        <SectionHeader
          index="01"
          eyebrow="Conditions"
          title="Design for the conditions that actually exist."
        />
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {CONDITIONS.map((c) => (
            <article key={c.t} className="bg-background p-7">
              <h3 className="font-display text-base font-bold uppercase tracking-[0.06em]">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl border-l-2 border-primary pl-6 font-display text-xl uppercase leading-snug tracking-[0.02em] md:text-2xl">
          Build manufacturing capability alongside infrastructure capability.
        </p>
      </Section>

      <Section className="bg-surface">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="02"
            eyebrow="Industrial corridors"
            title="A corridor strategy, stated honestly."
            lead="Nodes are labelled by real status. Nothing here implies an operating facility unless it is marked current."
          />
          <StatusNote>Strategic intent — not operational claims</StatusNote>
        </div>
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {CORRIDOR_NODES.map((n) => (
            <article key={n.city} className="bg-background p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-[0.06em]">
                    {n.city}
                  </h3>
                  <p className="mono-label mt-2">{n.country}</p>
                </div>
                <span
                  className={`border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${STATUS_STYLES[n.status]}`}
                >
                  {n.status}
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{n.role}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="03"
            eyebrow="Industrial campus"
            title="The AIS industrial campus."
            lead="A long-term masterplan: engineering, fabrication and digital operations on one site, so product development and production stay in the same feedback loop."
          />
          <StatusNote>Vision</StatusNote>
        </div>
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {CAMPUS_ZONES.map((z, i) => (
            <div key={z} className="relative bg-background p-7">
              <div className="pointer-events-none absolute inset-0 grid-field opacity-25" aria-hidden="true" />
              <p className="mono-label relative text-primary">Zone {String(i + 1).padStart(2, "0")}</p>
              <p className="relative mt-4 font-display text-sm font-bold uppercase tracking-[0.08em]">
                {z}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ActionLink to="/investors">Investor thesis</ActionLink>
          <ActionLink to="/partners" variant="outline">
            Manufacturing network
          </ActionLink>
        </div>
      </Section>
    </>
  );
}
