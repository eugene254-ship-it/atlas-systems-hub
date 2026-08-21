import { createFileRoute } from "@tanstack/react-router";
import fabricationImage from "@/assets/fabrication.jpg";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { LIFECYCLE } from "@/components/ais/data";

export const Route = createFileRoute("/engineering")({
  head: () => ({
    meta: [
      { title: "Engineering & Digital Fabrication — AIS" },
      {
        name: "description",
        content:
          "How AIS engineers infrastructure: site analysis, structural engineering, CAD and modular design, fabrication drawings, CNC fabrication, integration, deployment and lifecycle planning.",
      },
      { property: "og:title", content: "Engineered Before It Is Built — AIS Engineering" },
      {
        property: "og:description",
        content:
          "Requirement → digital model → fabrication → assembly → deployment. The AIS engineering and digital fabrication chain.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/engineering" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/engineering" }],
  }),
  component: EngineeringPage,
});

const DISCIPLINES = [
  "site analysis",
  "structural engineering",
  "load calculations",
  "material selection",
  "CAD / 3D design",
  "modular design",
  "fabrication drawings",
  "bill of materials",
  "cost estimation",
  "logistics planning",
  "deployment planning",
  "lifecycle analysis",
];

const TRUST = [
  "engineering standards",
  "quality systems",
  "safety",
  "material traceability",
  "project governance",
  "inspection",
  "testing",
  "documentation",
  "warranties",
  "maintenance",
  "compliance",
];

function EngineeringPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering"
        title="Engineered before it is built."
        lead="Requirements are resolved digitally — structurally, mechanically and logistically — before any material is committed."
      />

      <Container className="py-20 md:py-28">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
          {["Requirement", "Digital model", "Fabrication", "Assembly", "Deployment"].map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 && (
                <span className="text-primary" aria-hidden="true">
                  →
                </span>
              )}
              <span className="border border-border px-3 py-2">{s}</span>
            </span>
          ))}
        </div>

        <ul className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {DISCIPLINES.map((d, i) => (
            <li key={d} className="bg-background px-6 py-6">
              <span className="font-mono text-[0.62rem] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm capitalize">{d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="border border-border">
            <img
              src={fabricationImage}
              alt="Automated welding and CNC cutting of structural steel in an AIS-style fabrication workflow"
              width={1600}
              height={1008}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="display-xl text-3xl md:text-4xl">
              From digital design to physical system.
            </h2>
            <p className="mt-6 text-muted-foreground">
              CAD, engineering, fabrication, automation and data converge into one production chain.
              Drawings drive machines; machines drive assemblies; assemblies drive deployable
              systems.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-px bg-border">
              {[
                "CAD models",
                "fabrication drawings",
                "CNC / automated fabrication",
                "welding",
                "cutting",
                "assembly",
                "quality inspection",
                "finishing / testing",
              ].map((s) => (
                <li
                  key={s}
                  className="bg-background px-5 py-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="display-xl text-3xl md:text-4xl">The lifecycle we run</h2>
          <ol className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {LIFECYCLE.map((s) => (
              <li key={s.code} className="bg-background p-8">
                <span className="font-mono text-sm text-primary">{s.code}</span>
                <h3 className="mt-3 font-display text-lg font-bold uppercase">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-24">
          <h2 className="display-xl text-3xl md:text-4xl">Trust architecture</h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Industrial buyers need evidence, not adjectives. These are the governance areas we
            document on every project.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {TRUST.map((t) => (
              <li
                key={t}
                className="border border-border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <StatusNote>Certification — to be added</StatusNote>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap gap-3">
          <ActionLink to="/quote">Request engineering proposal</ActionLink>
          <ActionLink to="/configure" variant="outline">
            Configure a system
          </ActionLink>
        </div>
      </Container>
    </>
  );
}
