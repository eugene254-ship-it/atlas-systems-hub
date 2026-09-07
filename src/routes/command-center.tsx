import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/command-center")({
  head: () => ({
    meta: [
      { title: "Industrial Command Center — AIS Deployment Simulator" },
      {
        name: "description",
        content:
          "Model a modular deployment across sites and corridors: enter modules, occupancy, transport distance and energy, and see capacity, power, logistics, schedule and cost indicators update live.",
      },
      { property: "og:title", content: "AIS Industrial Command Center — Deployment Simulator" },
      {
        property: "og:description",
        content:
          "Build a portfolio of sites and corridors and watch capacity, energy, logistics, schedule and lifecycle indicators recalculate as you change the inputs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommandCenter,
});

type UnitType = "office" | "accommodation" | "clinic" | "workshop" | "cold";

const UNIT_TYPES: { id: UnitType; label: string; areaPerModule: number; kwPerModule: number; buildDays: number }[] =
  [
    { id: "office", label: "Office / operations", areaPerModule: 28, kwPerModule: 6, buildDays: 16 },
    { id: "accommodation", label: "Accommodation", areaPerModule: 28, kwPerModule: 5, buildDays: 14 },
    { id: "clinic", label: "Health / clinic", areaPerModule: 28, kwPerModule: 9, buildDays: 22 },
    { id: "workshop", label: "Workshop", areaPerModule: 34, kwPerModule: 12, buildDays: 20 },
    { id: "cold", label: "Cold chain", areaPerModule: 26, kwPerModule: 18, buildDays: 24 },
  ];

const CORRIDORS = [
  { id: "northern", label: "Northern corridor", factor: 1 },
  { id: "central", label: "Central corridor", factor: 1.1 },
  { id: "lake", label: "Lake region", factor: 1.15 },
  { id: "coastal", label: "Coastal corridor", factor: 0.95 },
  { id: "remote", label: "Remote / off-corridor", factor: 1.45 },
] as const;

type Site = {
  id: string;
  name: string;
  corridor: (typeof CORRIDORS)[number]["id"];
  unit: UnitType;
  modules: number;
  occupancy: number;
  distanceKm: number;
  pvKw: number;
  storageKwh: number;
};

let counter = 0;
function newSite(partial: Partial<Site> = {}): Site {
  counter += 1;
  return {
    id: `site-${counter}`,
    name: `Site ${counter}`,
    corridor: "northern",
    unit: "office",
    modules: 6,
    occupancy: 30,
    distanceKm: 180,
    pvKw: 60,
    storageKwh: 120,
    ...partial,
  };
}

function initialSites(): Site[] {
  return [
    newSite({ name: "Nakuru crew facility", corridor: "northern", unit: "accommodation", modules: 8, occupancy: 48, distanceKm: 160, pvKw: 90, storageKwh: 180 }),
    newSite({ name: "Kisumu health outpost", corridor: "lake", unit: "clinic", modules: 4, occupancy: 24, distanceKm: 340, pvKw: 48, storageKwh: 90 }),
    newSite({ name: "Kajiado logistics depot", corridor: "remote", unit: "workshop", modules: 6, occupancy: 22, distanceKm: 120, pvKw: 60, storageKwh: 120 }),
  ];
}

const num = (v: string, max: number) => Math.max(0, Math.min(max, Math.round(Number(v) || 0)));

function CommandCenter() {
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [standardization, setStandardization] = useState(70);
  const [redeployment, setRedeployment] = useState(30);
  const [dieselPrice, setDieselPrice] = useState(1.4);

  const model = useMemo(() => {
    const rows = sites.map((s) => {
      const unit = UNIT_TYPES.find((u) => u.id === s.unit)!;
      const corridor = CORRIDORS.find((c) => c.id === s.corridor)!;
      const area = s.modules * unit.areaPerModule;
      const peakKw = Math.round(s.modules * unit.kwPerModule + s.occupancy * 0.25);
      const dailyKwh = Math.round(peakKw * 7.5);
      const solarKwh = Math.round(s.pvKw * 4.6 + s.storageKwh * 0.15);
      const renewableShare = dailyKwh ? Math.min(100, Math.round((solarKwh / dailyKwh) * 100)) : 0;
      const dieselLitres = Math.max(0, Math.round(((dailyKwh - solarKwh) / 3.2) * 1));
      const moves = Math.ceil(s.modules / 2);
      const transportCost = Math.round(moves * s.distanceKm * 1.85 * corridor.factor);
      const buildDays = Math.round(
        unit.buildDays * Math.ceil(s.modules / 3) * (1 - (standardization / 100) * 0.3),
      );
      const water = Math.round(s.occupancy * 60);
      return {
        site: s,
        area,
        peakKw,
        dailyKwh,
        renewableShare,
        dieselLitres,
        moves,
        transportCost,
        buildDays,
        water,
      };
    });

    const sum = (pick: (r: (typeof rows)[number]) => number) => rows.reduce((n, r) => n + pick(r), 0);
    const modules = sum((r) => r.site.modules);
    const dailyKwh = sum((r) => r.dailyKwh);
    const solarCovered = sum((r) => Math.min(r.dailyKwh, Math.round(r.dailyKwh * (r.renewableShare / 100))));
    const dieselLitres = sum((r) => r.dieselLitres);

    return {
      rows,
      totals: {
        sites: sites.length,
        modules,
        area: sum((r) => r.area),
        occupancy: sum((r) => r.site.occupancy),
        peakKw: sum((r) => r.peakKw),
        dailyKwh,
        renewableShare: dailyKwh ? Math.round((solarCovered / dailyKwh) * 100) : 0,
        dieselCost: Math.round(dieselLitres * dieselPrice * 30),
        moves: sum((r) => r.moves),
        transportCost: sum((r) => r.transportCost),
        longestBuild: rows.length ? Math.max(...rows.map((r) => r.buildDays)) : 0,
        water: sum((r) => r.water),
        reuseCredit: Math.round(modules * (redeployment / 100)),
      },
    };
  }, [sites, standardization, redeployment, dieselPrice]);

  const t = model.totals;
  const kpis = [
    { label: "Sites in scenario", value: String(t.sites), sub: `${t.modules} modules total` },
    { label: "Floor area", value: `${t.area.toLocaleString()} m²`, sub: `${t.occupancy} people served` },
    { label: "Peak power", value: `${t.peakKw} kW`, sub: `${t.dailyKwh.toLocaleString()} kWh per day` },
    { label: "Renewable share", value: `${t.renewableShare}%`, sub: "Solar and storage contribution" },
    { label: "Monthly fuel cost", value: `$${t.dieselCost.toLocaleString()}`, sub: `At $${dieselPrice.toFixed(2)} per litre` },
    { label: "Transport moves", value: String(t.moves), sub: `$${t.transportCost.toLocaleString()} indicative` },
    { label: "Longest build", value: `${t.longestBuild} days`, sub: `${standardization}% standardized` },
    { label: "Redeployable modules", value: String(t.reuseCredit), sub: `${redeployment}% reuse assumption` },
  ];

  function update(id: string, patch: Partial<Site>) {
    setSites((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  return (
    <>
      <PageHero
        eyebrow="Industrial command center"
        title="Model a deployment across sites and corridors."
        lead="Set up the sites you are planning, adjust modules, occupancy, distance and energy, and every indicator below recalculates immediately."
      />

      <Container className="py-14 md:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <StatusNote>Planning estimates — not engineering calculations</StatusNote>
          <span className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
            Live telemetry — not connected
          </span>
        </div>

        <section aria-labelledby="kpi-heading" className="mt-8">
          <h2 id="kpi-heading" className="sr-only">
            Scenario indicators
          </h2>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="bg-background p-6">
                <dt className="mono-label">{k.label}</dt>
                <dd>
                  <span className="mt-4 block font-display text-3xl font-bold tracking-tight text-primary">
                    {k.value}
                  </span>
                  <span className="mt-2 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {k.sub}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="levers-heading" className="mt-10 border border-border bg-surface p-7">
          <h2 id="levers-heading" className="mono-label text-primary">
            Programme assumptions
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <Slider
              label="Standardization"
              suffix="%"
              min={0}
              max={100}
              step={5}
              value={standardization}
              onChange={setStandardization}
              hint="Higher standardization shortens build time."
            />
            <Slider
              label="Redeployment assumption"
              suffix="%"
              min={0}
              max={100}
              step={5}
              value={redeployment}
              onChange={setRedeployment}
              hint="Share of modules expected to be reused elsewhere."
            />
            <Slider
              label="Fuel price"
              suffix=" $/L"
              min={0.5}
              max={3}
              step={0.05}
              value={dieselPrice}
              onChange={setDieselPrice}
              hint="Drives the monthly fuel cost estimate."
            />
          </div>
        </section>

        <section aria-labelledby="sites-heading" className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="sites-heading" className="mono-label text-primary">
              Sites in this scenario
            </h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSites((prev) => [...prev, newSite()])}
                className="bg-primary px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-primary-foreground hover:bg-primary/85"
              >
                Add site
              </button>
              <button
                type="button"
                onClick={() => setSites(initialSites())}
                className="border border-border px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] hover:border-primary hover:text-primary"
              >
                Reset scenario
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-px border border-border bg-border">
            {model.rows.map(({ site, area, peakKw, renewableShare, moves, buildDays, water }) => (
              <article key={site.id} className="bg-background p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <label className="flex-1">
                    <span className="sr-only">Site name</span>
                    <input
                      type="text"
                      value={site.name}
                      onChange={(e) => update(site.id, { name: e.target.value })}
                      className="w-full max-w-md border-0 border-b border-border bg-transparent pb-2 font-display text-lg font-bold uppercase tracking-[0.04em] focus:border-primary focus:outline-none"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setSites((prev) => prev.filter((s) => s.id !== site.id))}
                    className="border border-border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] hover:border-destructive hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <Select
                    label="Corridor"
                    value={site.corridor}
                    onChange={(v) => update(site.id, { corridor: v as Site["corridor"] })}
                    options={CORRIDORS.map((c) => ({ value: c.id, label: c.label }))}
                  />
                  <Select
                    label="Facility type"
                    value={site.unit}
                    onChange={(v) => update(site.id, { unit: v as UnitType })}
                    options={UNIT_TYPES.map((u) => ({ value: u.id, label: u.label }))}
                  />
                  <Number
                    label="Modules"
                    value={site.modules}
                    onChange={(v) => update(site.id, { modules: num(v, 200) })}
                  />
                  <Number
                    label="People on site"
                    value={site.occupancy}
                    onChange={(v) => update(site.id, { occupancy: num(v, 5000) })}
                  />
                  <Number
                    label="Distance from works (km)"
                    value={site.distanceKm}
                    onChange={(v) => update(site.id, { distanceKm: num(v, 5000) })}
                  />
                  <Number
                    label="Solar (kW)"
                    value={site.pvKw}
                    onChange={(v) => update(site.id, { pvKw: num(v, 5000) })}
                  />
                  <Number
                    label="Storage (kWh)"
                    value={site.storageKwh}
                    onChange={(v) => update(site.id, { storageKwh: num(v, 20000) })}
                  />
                </div>

                <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-3 lg:grid-cols-6">
                  {[
                    ["Floor area", `${area} m²`],
                    ["Peak power", `${peakKw} kW`],
                    ["Renewable", `${renewableShare}%`],
                    ["Transport moves", String(moves)],
                    ["Build time", `${buildDays} days`],
                    ["Water / day", `${water.toLocaleString()} L`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="mono-label">{k}</dt>
                      <dd
                        className={cn(
                          "mt-2 font-mono text-sm",
                          k === "Renewable" && renewableShare < 40 ? "text-destructive" : "text-primary",
                        )}
                      >
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
            {!model.rows.length && (
              <p className="bg-background p-8 text-sm text-muted-foreground">
                No sites in this scenario yet. Add a site to start modelling.
              </p>
            )}
          </div>
        </section>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          These figures are planning-level estimates based on your inputs and standard module data.
          Site conditions, loading, approvals and utilities are confirmed during engineering review.
        </p>
      </Container>
    </>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
  hint: string;
}) {
  return (
    <label className="block">
      <span className="mono-label text-foreground">
        {label} — {step < 1 ? value.toFixed(2) : value}
        {suffix}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-[hsl(var(--primary))]"
      />
      <span className="mt-2 block text-xs text-muted-foreground">{hint}</span>
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mono-label text-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-input bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Number({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mono-label text-foreground">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-input bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}
