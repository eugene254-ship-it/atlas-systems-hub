import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/configure")({
  head: () => ({
    meta: [
      { title: "Configure a Modular Industrial System — AIS Configurator" },
      {
        name: "description",
        content:
          "Define project type, dimensions, structural systems, services, energy and deployment environment to generate an indicative AIS system configuration for engineering review.",
      },
      { property: "og:title", content: "Configure the Infrastructure You Need — AIS" },
      {
        property: "og:description",
        content:
          "An interactive configurator for containerized and modular industrial infrastructure. Indicative only — subject to engineering review.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/configure" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/configure" }],
  }),
  component: ConfigurePage,
});

const STEPS = [
  { code: "01", label: "Define" },
  { code: "02", label: "Dimension" },
  { code: "03", label: "Configure" },
  { code: "04", label: "Locate" },
  { code: "05", label: "Review" },
  { code: "06", label: "Request" },
];

const PROJECT_TYPES = [
  "Operations facility",
  "Workshop",
  "Storage",
  "Accommodation",
  "Clinic",
  "Energy module",
  "Command centre",
];

const BASE_UNITS = [
  { label: "20ft standard", len: 6.06, wid: 2.44, hgt: 2.59, tare: 2.2 },
  { label: "40ft standard", len: 12.19, wid: 2.44, hgt: 2.59, tare: 3.8 },
  { label: "40ft high cube", len: 12.19, wid: 2.44, hgt: 2.9, tare: 3.9 },
  { label: "Modular panel unit", len: 9.0, wid: 3.0, hgt: 3.0, tare: 3.2 },
];

const SYSTEM_OPTIONS = [
  { key: "insulation", label: "Insulation (PU panel)", mass: 0.6 },
  { key: "electrical", label: "Electrical system", mass: 0.35 },
  { key: "plumbing", label: "Plumbing", mass: 0.4 },
  { key: "hvac", label: "HVAC", mass: 0.5 },
  { key: "solar", label: "Solar array", mass: 0.7 },
  { key: "battery", label: "Battery storage", mass: 1.1 },
  { key: "security", label: "Security systems", mass: 0.2 },
  { key: "flooring", label: "Industrial flooring", mass: 0.45 },
  { key: "interior", label: "Interior fit-out", mass: 0.9 },
  { key: "branding", label: "Exterior finish + branding", mass: 0.15 },
];

const ENVIRONMENTS = ["Urban site", "Industrial park", "Remote site", "Coastal", "High altitude"];

function ConfigurePage() {
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]!);
  const [unitIndex, setUnitIndex] = useState(2);
  const [quantity, setQuantity] = useState(2);
  const [options, setOptions] = useState<string[]>(["insulation", "electrical"]);
  const [environment, setEnvironment] = useState(ENVIRONMENTS[2]!);

  const unit = BASE_UNITS[unitIndex]!;

  const summary = useMemo(() => {
    const floorArea = unit.len * unit.wid * quantity;
    const volume = floorArea * unit.hgt;
    const optionMass = options.reduce(
      (sum, key) => sum + (SYSTEM_OPTIONS.find((o) => o.key === key)?.mass ?? 0),
      0,
    );
    const mass = (unit.tare + optionMass) * quantity;
    const teu = (unit.len > 10 ? 2 : 1) * quantity;
    return {
      floorArea: floorArea.toFixed(1),
      volume: volume.toFixed(1),
      mass: mass.toFixed(1),
      teu,
    };
  }, [unit, quantity, options]);

  const toggle = (key: string) =>
    setOptions((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  return (
    <>
      <PageHero
        eyebrow="AIS industrial configurator"
        title="Configure the infrastructure you need."
        lead="Define the system conceptually, review indicative geometry and logistics, then request an engineering proposal."
      />

      <Container className="py-16 md:py-24">
        <ol className="grid gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((s) => (
            <li key={s.code} className="bg-surface px-5 py-4">
              <span className="font-mono text-[0.62rem] text-primary">Step {s.code}</span>
              <p className="mt-1.5 font-display text-sm font-bold uppercase tracking-[0.06em]">
                {s.label}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-12">
            <Fieldset step="01" legend="Define — project type">
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => (
                  <Chip key={t} active={projectType === t} onClick={() => setProjectType(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </Fieldset>

            <Fieldset step="02" legend="Dimension — base unit and quantity">
              <div className="flex flex-wrap gap-2">
                {BASE_UNITS.map((u, i) => (
                  <Chip key={u.label} active={unitIndex === i} onClick={() => setUnitIndex(i)}>
                    {u.label}
                  </Chip>
                ))}
              </div>
              <label
                htmlFor="qty"
                className="mono-label mt-8 block text-foreground"
              >
                Units — {quantity}
              </label>
              <input
                id="qty"
                type="range"
                min={1}
                max={20}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-3 w-full accent-[oklch(0.72_0.17_62)]"
              />
            </Fieldset>

            <Fieldset step="03" legend="Configure — systems and equipment">
              <div className="grid gap-px bg-border sm:grid-cols-2">
                {SYSTEM_OPTIONS.map((o) => {
                  const active = options.includes(o.key);
                  return (
                    <label
                      key={o.key}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 bg-surface px-5 py-4 text-sm transition-colors",
                        active && "text-primary",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggle(o.key)}
                        className="h-3.5 w-3.5 accent-[oklch(0.72_0.17_62)]"
                      />
                      {o.label}
                    </label>
                  );
                })}
              </div>
            </Fieldset>

            <Fieldset step="04" legend="Locate — deployment environment">
              <div className="flex flex-wrap gap-2">
                {ENVIRONMENTS.map((e) => (
                  <Chip key={e} active={environment === e} onClick={() => setEnvironment(e)}>
                    {e}
                  </Chip>
                ))}
              </div>
            </Fieldset>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-7">
              <div className="flex items-center justify-between">
                <p className="mono-label text-foreground">Step 05 — Review</p>
                <span className="font-mono text-[0.62rem] text-primary">AIS-CFG</span>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-px bg-border">
                {[
                  ["Project type", projectType],
                  ["Base unit", unit.label],
                  ["Units", String(quantity)],
                  ["Environment", environment],
                  ["Footprint", `${summary.floorArea} m²`],
                  ["Enclosed volume", `${summary.volume} m³`],
                  ["Indicative mass", `${summary.mass} t`],
                  ["Transport", `${summary.teu} TEU equivalent`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-surface px-4 py-3">
                    <dt className="mono-label">{k}</dt>
                    <dd className="mt-1 font-mono text-xs">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <p className="mono-label text-foreground">Selected systems</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {options.length
                    ? options
                        .map((k) => SYSTEM_OPTIONS.find((o) => o.key === k)?.label)
                        .filter(Boolean)
                        .join(" · ")
                    : "None selected"}
                </p>
              </div>

              <div className="mt-7">
                <StatusNote>Indicative configuration</StatusNote>
                <p className="mt-4 text-xs text-muted-foreground">
                  Figures are conceptual estimates for discussion only. They are not engineering
                  calculations, quotations or delivery commitments.
                </p>
              </div>

              <div className="mt-7">
                <ActionLink to="/quote" className="w-full justify-center">
                  Request engineering review
                </ActionLink>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

function Fieldset({
  step,
  legend,
  children,
}: {
  step: string;
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mono-label mb-5 flex items-center gap-3">
        <span className="text-primary">{step}</span>
        <span className="h-px w-8 bg-border" aria-hidden="true" />
        <span className="text-foreground">{legend}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-steel hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
