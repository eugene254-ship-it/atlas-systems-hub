import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, PageHero, Section, SectionHeader, StatusNote } from "@/components/ais/primitives";
import { FLYWHEEL } from "@/components/ais/platform-data";

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: "Investors — Building an Industrial Platform, Not a Product Company" },
      {
        name: "description",
        content:
          "The AIS investment thesis: modular infrastructure, manufacturing, deployment, lifecycle service and software combined into one compounding industrial platform.",
      },
      { property: "og:title", content: "AIS Investors — Industrial Platform Thesis" },
      {
        property: "og:description",
        content:
          "Thesis, market, business model, expansion path, moat and roadmap for Atlas Industrial Systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvestorsPage,
});

const BLOCKS = [
  {
    k: "Thesis",
    t: "Infrastructure is becoming modular, connected and industrialized.",
    b: "The build-once, depreciate-forever project model is being replaced by standardized systems that are manufactured, deployed, instrumented and reused. AIS is structured for that model from the start.",
  },
  {
    k: "Market",
    t: "Demand sits where conventional construction struggles.",
    b: "Mining and resources, agri-processing, logistics, energy, healthcare and public infrastructure all require deployable capacity in locations where conventional construction is slow, costly or impractical.",
  },
  {
    k: "Business model",
    t: "Product + engineering + deployment + lifecycle + software.",
    b: "Revenue is layered: manufactured systems, engineering services, deployment, then recurring lifecycle service and — over time — platform software attached to the installed base.",
  },
  {
    k: "Expansion",
    t: "National → regional → international.",
    b: "Prove standardized product and delivery in one market, extend along established trade corridors, then license or replicate manufacturing where volume justifies it.",
  },
  {
    k: "Moat",
    t: "Physical, engineering, manufacturing, data, software and network.",
    b: "Each layer alone is replicable. Combined — a standardized product library, a production base, an instrumented installed base and the operating software above it — they compound and become difficult to copy.",
  },
];

const ROADMAP = [
  { phase: "Phase 01", t: "Standardized product library", b: "Repeatable system families with released engineering and defined specifications." },
  { phase: "Phase 02", t: "Production capability", b: "Fabrication and fit-out capacity with quality systems and supplier network." },
  { phase: "Phase 03", t: "Deployment and lifecycle", b: "Delivery, commissioning and contracted service across the installed base." },
  { phase: "Phase 04", t: "Instrumented assets", b: "Asset identity and telemetry on deployed systems feeding operations data." },
  { phase: "Phase 05", t: "Industrial OS", b: "Software layer commercialized across assets, projects and operations." },
  { phase: "Phase 06", t: "Regional network", b: "Corridor expansion and distributed manufacturing partnerships." },
];

function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Building an industrial platform, not a single product company."
        lead="AIS combines engineering, manufacturing, deployment, lifecycle service and software into one system where every deployment strengthens the next."
      />

      <Section>
        <StatusNote>Strategic overview — no financial information published</StatusNote>
        <div className="mt-12 space-y-px border border-border bg-border">
          {BLOCKS.map((b, i) => (
            <article key={b.k} className="grid gap-4 bg-background p-8 md:grid-cols-[10rem_1fr]">
              <div>
                <p className="mono-label text-primary">{String(i + 1).padStart(2, "0")}</p>
                <p className="mono-label mt-2">{b.k}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold uppercase leading-snug tracking-[0.02em] md:text-2xl">
                  {b.t}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {b.b}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          index="06"
          eyebrow="Roadmap"
          title="Milestones, in sequence."
          lead="Capability is built in order. Software has value only once there is an installed base to operate."
        />
        <ol className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ROADMAP.map((r) => (
            <li key={r.phase} className="bg-background p-7">
              <p className="mono-label text-primary">{r.phase}</p>
              <h3 className="mt-4 font-display text-base font-bold uppercase tracking-[0.06em]">
                {r.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeader
          index="07"
          eyebrow="Flywheel"
          title="Why the platform compounds."
        />
        <div className="mt-12 flex flex-wrap gap-px border border-border bg-border">
          {FLYWHEEL.map((step, i) => (
            <div key={step} className="min-w-[9.5rem] flex-1 bg-background p-5">
              <p className="mono-label text-primary">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-display text-sm font-bold uppercase tracking-[0.08em]">
                {step}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <ActionLink to="/contact">Request an investor conversation</ActionLink>
        </div>
      </Section>
    </>
  );
}
