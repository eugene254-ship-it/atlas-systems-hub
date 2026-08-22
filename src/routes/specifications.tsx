import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/specifications")({
  head: () => ({
    meta: [
      { title: "Technical Specifications Library — AIS Systems" },
      {
        name: "description",
        content:
          "Browse indicative technical specifications for AIS containers, steel systems, modular units, energy systems, storage and logistics components.",
      },
      { property: "og:title", content: "Technical Specifications — AIS" },
      {
        property: "og:description",
        content:
          "Dimensions, materials, capacity and deployment requirements for AIS industrial system components.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/specifications" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/specifications" }],
  }),
  component: SpecificationsPage,
});

type Spec = {
  category: string;
  name: string;
  rows: [string, string][];
};

const SPECS: Spec[] = [
  {
    category: "Containers",
    name: "40ft High Cube Conversion Shell",
    rows: [
      ["External dimensions", "12.19 × 2.44 × 2.90 m"],
      ["Structure", "Corten steel, reinforced openings"],
      ["Insulation options", "PU panel 50–100 mm"],
      ["Deployment", "Crane or side-lifter, level base required"],
    ],
  },
  {
    category: "Containers",
    name: "20ft Equipment / Technical Room",
    rows: [
      ["External dimensions", "6.06 × 2.44 × 2.59 m"],
      ["Services", "Electrical distribution, ventilation, fire detection"],
      ["Access", "Personnel door + louvred panels"],
      ["Deployment", "Forklift or crane"],
    ],
  },
  {
    category: "Steel systems",
    name: "Equipment Support Platform",
    rows: [
      ["Members", "Hot-rolled sections, welded connections"],
      ["Finish", "Blast + protective coating system"],
      ["Loading", "Designed to project-specific load cases"],
      ["Documentation", "Fabrication drawings + weld records"],
    ],
  },
  {
    category: "Modular units",
    name: "Modular Accommodation Unit",
    rows: [
      ["Nominal module", "9.0 × 3.0 × 3.0 m"],
      ["Envelope", "Insulated panel with steel frame"],
      ["Configuration", "Single, twin or linked modules"],
      ["Services", "Electrical, plumbing, HVAC optional"],
    ],
  },
  {
    category: "Energy systems",
    name: "Containerised Power Module",
    rows: [
      ["Generation", "Roof or ground-mounted PV array"],
      ["Storage", "Battery bank, project-sized"],
      ["Distribution", "AC/DC distribution board, protection"],
      ["Monitoring", "Provision for remote monitoring"],
    ],
  },
  {
    category: "Logistics",
    name: "Container Handling Configuration",
    rows: [
      ["Transport", "Standard ISO corner castings"],
      ["Unit equivalence", "1 TEU (20ft) / 2 TEU (40ft)"],
      ["Site requirement", "Compacted level pad, access route"],
      ["Lifting", "Certified lifting points"],
    ],
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(SPECS.map((s) => s.category)))];

function SpecificationsPage() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? SPECS : SPECS.filter((s) => s.category === active);

  return (
    <>
      <PageHero
        eyebrow="Specifications"
        title="Technical library."
        lead="Indicative specifications for AIS system components. Final specifications are issued per project after engineering review."
      />
      <Container className="py-16 md:py-24">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={cn(
                "border px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors",
                active === c
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
          {visible.map((spec) => (
            <article key={spec.name} className="bg-background p-8">
              <p className="mono-label text-primary">{spec.category}</p>
              <h2 className="display-xl mt-4 text-xl">{spec.name}</h2>
              <table className="mt-6 w-full text-left">
                <caption className="sr-only">Specifications for {spec.name}</caption>
                <tbody>
                  {spec.rows.map(([k, v]) => (
                    <tr key={k} className="border-t border-border">
                      <th scope="row" className="mono-label py-3 pr-6 align-top font-normal">
                        {k}
                      </th>
                      <td className="py-3 font-mono text-xs text-foreground">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mono-label mt-6">Download technical data — to be published</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <StatusNote>Indicative data — subject to engineering review</StatusNote>
        </div>
        <div className="mt-10">
          <ActionLink to="/quote">Request full specification</ActionLink>
        </div>
      </Container>
    </>
  );
}
