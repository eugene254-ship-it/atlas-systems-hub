import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { OS_MODULES } from "@/components/ais/data";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [
      { title: "AIS Industrial OS — Connected Infrastructure Intelligence" },
      {
        name: "description",
        content:
          "The AIS Industrial OS concept: asset registry, digital twins, maintenance scheduling, logistics tracking and lifecycle analytics for deployed industrial infrastructure.",
      },
      { property: "og:title", content: "The Industrial System, Connected — AIS Intelligence" },
      {
        property: "og:description",
        content:
          "Physical asset → digital ID → data → intelligence → decision → action. An evolving industrial operating system.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/intelligence" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/intelligence" }],
  }),
  component: IntelligencePage,
});

const CAPABILITIES = [
  "asset registry",
  "digital twins",
  "maintenance scheduling",
  "inventory",
  "project tracking",
  "equipment monitoring",
  "logistics tracking",
  "predictive maintenance",
  "procurement intelligence",
  "lifecycle analytics",
];

function IntelligencePage() {
  return (
    <>
      <PageHero
        eyebrow="Industrial intelligence"
        title="The industrial system, connected."
        lead="Infrastructure generates data long after it is delivered. The AIS Industrial OS is being designed to capture and use it."
      />
      <Container className="py-20 md:py-28">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
          {["Physical asset", "Digital ID", "Data", "Intelligence", "Decision", "Action"].map(
            (s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-primary" aria-hidden="true">
                    →
                  </span>
                )}
                <span className="border border-border px-3 py-2">{s}</span>
              </span>
            ),
          )}
        </div>

        <ul className="mt-14 flex flex-wrap gap-2">
          {CAPABILITIES.map((c) => (
            <li
              key={c}
              className="border border-border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground"
            >
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <StatusNote>Concept / demonstration — no live data</StatusNote>
        </div>

        <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {OS_MODULES.map((m) => (
            <div key={m.name} className="bg-surface p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.06em]">
                  {m.name}
                </h2>
                <span className="h-1.5 w-1.5 bg-primary" aria-hidden="true" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{m.body}</p>
              <div className="mt-6 h-16 grid-field-sm opacity-40" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="mt-20 panel p-8 md:p-12">
          <p className="mono-label text-primary">Future capability</p>
          <h2 className="display-xl mt-4 text-2xl md:text-3xl">AIS Engineering Copilot</h2>
          <p className="mt-5 max-w-3xl text-muted-foreground">
            A planned assistant that translates an operational need — for example, “a temporary
            40-person mining camp near a remote site with solar power and workshop space” — into a
            preliminary configuration, likely components, estimated footprint, utilities and
            logistics considerations.
          </p>
          <div className="mt-6">
            <StatusNote>
              Preliminary AI-assisted configuration — subject to engineering review
            </StatusNote>
          </div>
        </div>

        <div className="mt-16">
          <ActionLink to="/contact">Talk to engineering</ActionLink>
        </div>
      </Container>
    </>
  );
}
