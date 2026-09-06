import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";
import {
  COPILOT_EXAMPLE,
  buildScope,
  scopeToPrefill,
  storePrefill,
} from "@/lib/copilot-brief";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "Engineering Copilot — From Operational Problem to Engineered Scope" },
      {
        name: "description",
        content:
          "The AIS Engineering Copilot turns an operational problem into a structured requirements summary, preliminary configuration and a list of open engineering questions.",
      },
      { property: "og:title", content: "AIS Engineering Copilot — Preliminary Scoping Assistant" },
      {
        property: "og:description",
        content:
          "Describe an operational need and receive a structured requirements summary, preliminary module configuration and the engineering questions that must be resolved.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CopilotPage,
});

const EXAMPLE =
  "We need a modular operations facility for 35 workers at a remote industrial site.";

type Scope = {
  headcount: number;
  useCase: string;
  remote: boolean;
  area: number;
  modules: { name: string; qty: number }[];
  utilities: string[];
  questions: string[];
};

function buildScope(input: string): Scope {
  const text = input.toLowerCase();
  const headMatch = text.match(/(\d{1,4})\s*(workers|people|staff|persons|crew|beds|students)/);
  const headcount = headMatch ? Math.min(Number(headMatch[1]), 2000) : 20;
  const remote = /remote|off-grid|off grid|site camp|bush|mine|field/.test(text);

  const useCase = /clinic|health|medical/.test(text)
    ? "Health facility"
    : /school|classroom|training/.test(text)
      ? "Training facility"
      : /warehouse|store|storage|cold/.test(text)
        ? "Storage and handling facility"
        : /workshop|fabrication|maintenance/.test(text)
          ? "Workshop facility"
          : /accommodation|camp|housing|dorm/.test(text)
            ? "Accommodation camp"
            : "Operations facility";

  const perPerson = useCase === "Accommodation camp" ? 9 : 6;
  const area = Math.max(30, Math.round((headcount * perPerson) / 5) * 5);

  const officeUnits = Math.max(1, Math.ceil(area / 30));
  const ablutionUnits = Math.max(1, Math.ceil(headcount / 15));
  const modules = [
    { name: `Atlas Contain 20ft ${useCase === "Workshop facility" ? "workshop" : "office"} unit`, qty: officeUnits },
    { name: "Atlas Contain ablution unit", qty: ablutionUnits },
    { name: "Atlas Mod covered link / walkway", qty: 1 },
  ];
  if (remote) modules.push({ name: "Atlas Energy hybrid solar + storage skid", qty: 1 });
  if (/cold|cold chain|perishable/.test(text))
    modules.push({ name: "Atlas Contain cold room unit", qty: 1 });

  const utilities = [
    `Power demand estimate: ${Math.max(15, Math.round(headcount * 0.55))} kW peak`,
    `Water demand estimate: ${Math.max(1500, headcount * 60)} litres/day`,
    "Wastewater: septic or packaged treatment, subject to site conditions",
    remote ? "Connectivity: satellite or cellular backhaul" : "Connectivity: local fibre or cellular",
  ];

  const questions = [
    "Confirmed site coordinates, ground conditions and geotechnical data?",
    "Wind, seismic and rainfall loading parameters for the location?",
    "Grid availability, tariff and generator backup requirement?",
    "Water source, quality and discharge consent?",
    "Access route constraints, bridge limits and abnormal-load permits?",
    "Required occupancy standards, fire strategy and approving authority?",
    remote ? "Security, camp management and resupply logistics model?" : "Local planning approvals and site boundary conditions?",
    "Expected service life, relocation intent and end-of-life plan?",
  ];

  return { headcount, useCase, remote, area, modules, utilities, questions };
}

function CopilotPage() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const scope = useMemo(() => (submitted ? buildScope(submitted) : null), [submitted]);

  return (
    <>
      <PageHero
        eyebrow="Engineering copilot"
        title="From an operational problem to an engineered scope."
        lead="Describe the operational situation in plain language. The copilot structures it into requirements, a preliminary configuration and the engineering questions that must be answered before design."
      />

      <Container className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_1.25fr]">
          <div className="border border-border bg-surface p-7">
            <p className="mono-label text-primary">Describe the need</p>
            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(input.trim() || EXAMPLE);
              }}
            >
              <label htmlFor="copilot-input" className="sr-only">
                Operational requirement
              </label>
              <textarea
                id="copilot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={7}
                placeholder={EXAMPLE}
                className="w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-primary px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/85"
                >
                  Structure requirement →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInput(EXAMPLE);
                    setSubmitted(EXAMPLE);
                  }}
                  className="border border-border px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors hover:border-primary hover:text-primary"
                >
                  Use example
                </button>
              </div>
            </form>
            <p className="mt-7 border-t border-border pt-6 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
              Rule-based preliminary scoping. No engineering calculation, code compliance or design
              approval is performed here.
            </p>
          </div>

          <div className="space-y-px border border-border bg-border">
            {!scope && (
              <div className="bg-background p-8">
                <p className="mono-label">Output</p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  The copilot returns four blocks: a requirements summary, a preliminary
                  configuration, the open engineering questions, and a defined next step into
                  configuration or procurement.
                </p>
              </div>
            )}

            {scope && (
              <>
                <div className="bg-background p-8">
                  <StatusNote>AI-assisted preliminary output — not final engineering design</StatusNote>
                </div>

                <div className="bg-background p-8">
                  <p className="mono-label text-primary">Requirements summary</p>
                  <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                    {[
                      ["Facility type", scope.useCase],
                      ["Occupancy", `${scope.headcount} people`],
                      ["Indicative floor area", `${scope.area} m²`],
                      ["Site context", scope.remote ? "Remote / off-grid assumed" : "Serviced site assumed"],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="mono-label">{k}</dt>
                        <dd className="mt-2 font-display text-lg font-bold uppercase tracking-[0.04em]">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="mt-6 space-y-2 border-t border-border pt-5">
                    {scope.utilities.map((u) => (
                      <li key={u} className="text-sm text-muted-foreground">
                        — {u}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-background p-8">
                  <p className="mono-label text-primary">Preliminary configuration</p>
                  <ul className="mt-5 space-y-3">
                    {scope.modules.map((m) => (
                      <li
                        key={m.name}
                        className="flex items-baseline justify-between gap-6 border-b border-border/60 pb-3 last:border-b-0"
                      >
                        <span className="text-sm">{m.name}</span>
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-primary">
                          × {m.qty}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-background p-8">
                  <p className="mono-label text-primary">Open engineering questions</p>
                  <ol className="mt-5 space-y-2">
                    {scope.questions.map((q, i) => (
                      <li key={q} className="text-sm text-muted-foreground">
                        <span className="font-mono text-[0.66rem] text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>{" "}
                        {q}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-background p-8">
                  <p className="mono-label text-primary">Next step</p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Take this preliminary scope into the configurator to test footprint and
                    transport implications, or submit it to engineering for a reviewed proposal.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ActionLink to="/configure">Open configurator</ActionLink>
                    <ActionLink to="/quote" variant="outline">
                      Submit to engineering
                    </ActionLink>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
