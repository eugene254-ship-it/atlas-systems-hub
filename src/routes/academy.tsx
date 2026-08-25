import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, PageHero, Section, SectionHeader, StatusNote } from "@/components/ais/primitives";
import { ACADEMY_PROGRAMS } from "@/components/ais/platform-data";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "AIS Academy — Industrial Skills for Modular Infrastructure" },
      {
        name: "description",
        content:
          "AIS Academy is the planned talent layer: fabrication, modular construction, engineering fundamentals, industrial software, asset management and industrial AI.",
      },
      { property: "og:title", content: "AIS Academy — Building Industrial Talent" },
      {
        property: "og:description",
        content:
          "A training layer supporting industrial expansion: fabrication, modular construction, engineering, software, safety and supply chain.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AcademyPage,
});

function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="AIS Academy"
        title="Industrial capacity is a people problem before it is a machine problem."
        lead="Scaling manufacturing and deployment requires welders, fitters, engineers, planners and software people trained on the same standards the systems are built to."
      />

      <Section>
        <StatusNote>Programme in development</StatusNote>
        <SectionHeader
          className="mt-8"
          index="01"
          eyebrow="Programs"
          title="Ten planned tracks."
        />
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {ACADEMY_PROGRAMS.map((p, i) => (
            <div key={p} className="bg-background p-7">
              <p className="mono-label text-primary">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-[0.08em]">
                {p}
              </h3>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          index="02"
          eyebrow="Model"
          title="Trained inside a working industrial system."
          lead="Training runs against live standards, real drawings and production processes — not generic curriculum."
        />
        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
          {[
            { t: "Standards-led", b: "Every module maps to the engineering, quality and safety standards used in production." },
            { t: "Workshop-based", b: "Practical time in fabrication, assembly and commissioning environments." },
            { t: "Pathway to work", b: "Progression into the AIS network and partner manufacturers." },
          ].map((c) => (
            <article key={c.t} className="bg-background p-8">
              <h3 className="font-display text-lg font-bold uppercase tracking-[0.06em]">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ActionLink to="/careers">Open roles</ActionLink>
          <ActionLink to="/contact" variant="outline">
            Partner on training
          </ActionLink>
        </div>
      </Section>
    </>
  );
}
