import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/command-center")({
  head: () => ({
    meta: [
      { title: "Industrial Command Center — AIS Operations Prototype" },
      {
        name: "description",
        content:
          "A prototype of the AIS Industrial Command Center: assets, projects, manufacturing, supply chain, logistics, maintenance, energy and analytics in one operations view.",
      },
      { property: "og:title", content: "AIS Industrial Command Center — Prototype" },
      {
        property: "og:description",
        content:
          "Concept dashboard demonstrating how AIS assets, projects, production and logistics are monitored in a single operating environment. Demo data only.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommandCenter,
});

type Metric = { label: string; value: string; sub: string };
type Row = { a: string; b: string; c: string; d: string };

const VIEWS: Record<string, { metrics: Metric[]; columns: string[]; rows: Row[] }> = {
  Overview: {
    metrics: [
      { label: "Tracked assets", value: "148", sub: "Concept fleet" },
      { label: "Active projects", value: "12", sub: "Across 4 industries" },
      { label: "Units in production", value: "26", sub: "Fabrication + fit-out" },
      { label: "Deployments this quarter", value: "9", sub: "Indicative plan" },
    ],
    columns: ["Signal", "Domain", "State", "Action"],
    rows: [
      { a: "Fit-out queue above capacity", b: "Manufacturing", c: "Watch", d: "Rebalance line 2" },
      { a: "Transport permit pending", b: "Logistics", c: "Blocked", d: "Escalate" },
      { a: "Solar array underperforming", b: "Energy", c: "Watch", d: "Inspection" },
      { a: "Two assets idle > 30 days", b: "Assets", c: "Opportunity", d: "Redeploy" },
    ],
  },
  Assets: {
    metrics: [
      { label: "Deployed", value: "112", sub: "In operation" },
      { label: "Idle", value: "14", sub: "Redeployment candidates" },
      { label: "In service", value: "16", sub: "Maintenance window" },
      { label: "Avg utilization", value: "71%", sub: "Indicative" },
    ],
    columns: ["Asset ID", "Type", "Site", "Status"],
    rows: [
      { a: "AIS-C-0184", b: "Contain 20ft office", c: "Nakuru", d: "Deployed" },
      { a: "AIS-M-0042", b: "Mod 4-bay clinic", c: "Kisumu", d: "Deployed" },
      { a: "AIS-E-0011", b: "Energy 30kW hybrid", c: "Kajiado", d: "Service" },
      { a: "AIS-C-0203", b: "Contain ablution", c: "Depot", d: "Idle" },
    ],
  },
  Projects: {
    metrics: [
      { label: "Requirements stage", value: "5", sub: "Scoping" },
      { label: "Engineering", value: "3", sub: "Design release" },
      { label: "Production", value: "3", sub: "On the floor" },
      { label: "Commissioning", value: "1", sub: "Site integration" },
    ],
    columns: ["Project", "Client type", "Stage", "Target"],
    rows: [
      { a: "Remote crew facility", b: "Mining", c: "Engineering", d: "Q3" },
      { a: "Agri cold chain node", b: "Agriculture", c: "Production", d: "Q3" },
      { a: "Logistics depot", b: "Transport", c: "Requirements", d: "Q4" },
      { a: "Health outpost cluster", b: "Public sector", c: "Commissioning", d: "Q3" },
    ],
  },
  Manufacturing: {
    metrics: [
      { label: "Lines active", value: "3", sub: "Concept capacity" },
      { label: "Units WIP", value: "26", sub: "All families" },
      { label: "First-pass quality", value: "94%", sub: "Indicative" },
      { label: "Avg build days", value: "18", sub: "Standard module" },
    ],
    columns: ["Work order", "Family", "Stage", "Days remaining"],
    rows: [
      { a: "WO-2291", b: "Atlas Contain", c: "Fit-out", d: "4" },
      { a: "WO-2294", b: "Atlas Fab", c: "Welding", d: "9" },
      { a: "WO-2301", b: "Atlas Mod", c: "Framing", d: "12" },
      { a: "WO-2305", b: "Atlas Energy", c: "Wiring", d: "6" },
    ],
  },
  "Supply chain": {
    metrics: [
      { label: "Open POs", value: "38", sub: "Materials + components" },
      { label: "Critical items", value: "4", sub: "Long lead" },
      { label: "Local content", value: "62%", sub: "Target 75%" },
      { label: "Supplier network", value: "27", sub: "Qualified" },
    ],
    columns: ["Item", "Category", "Lead time", "Risk"],
    rows: [
      { a: "Structural steel sections", b: "Material", c: "3 weeks", d: "Low" },
      { a: "Hybrid inverters", b: "Energy", c: "9 weeks", d: "High" },
      { a: "Insulated panels", b: "Envelope", c: "5 weeks", d: "Medium" },
      { a: "Sanitary sets", b: "Plumbing", c: "2 weeks", d: "Low" },
    ],
  },
  Logistics: {
    metrics: [
      { label: "Moves planned", value: "11", sub: "Next 30 days" },
      { label: "In transit", value: "3", sub: "Road" },
      { label: "Permits pending", value: "2", sub: "Abnormal load" },
      { label: "Avg transit", value: "2.4 d", sub: "Regional" },
    ],
    columns: ["Movement", "Payload", "Route", "State"],
    rows: [
      { a: "MV-0451", b: "2 × 20ft modules", c: "Nairobi → Nakuru", d: "In transit" },
      { a: "MV-0452", b: "Steel frame set", c: "Nairobi → Kisumu", d: "Loading" },
      { a: "MV-0455", b: "Energy skid", c: "Nairobi → Kajiado", d: "Permit" },
      { a: "MV-0458", b: "Return / redeploy", c: "Nanyuki → Depot", d: "Planned" },
    ],
  },
  Maintenance: {
    metrics: [
      { label: "Open work orders", value: "17", sub: "All sites" },
      { label: "Preventive due", value: "9", sub: "Next 14 days" },
      { label: "Mean response", value: "36 h", sub: "Indicative" },
      { label: "Assets under contract", value: "64", sub: "Lifecycle plans" },
    ],
    columns: ["Work order", "Asset", "Type", "Priority"],
    rows: [
      { a: "MW-1180", b: "AIS-E-0011", c: "Inverter inspection", d: "High" },
      { a: "MW-1182", b: "AIS-C-0184", c: "HVAC service", d: "Medium" },
      { a: "MW-1185", b: "AIS-M-0042", c: "Roof seal check", d: "Low" },
      { a: "MW-1190", b: "AIS-C-0203", c: "Refurbishment", d: "Medium" },
    ],
  },
  Energy: {
    metrics: [
      { label: "Installed capacity", value: "412 kW", sub: "Concept portfolio" },
      { label: "Storage", value: "760 kWh", sub: "Battery" },
      { label: "Renewable share", value: "68%", sub: "Indicative" },
      { label: "Generator hours", value: "-24%", sub: "Vs baseline" },
    ],
    columns: ["Site", "PV", "Storage", "Status"],
    rows: [
      { a: "Nakuru crew camp", b: "120 kW", c: "240 kWh", d: "Nominal" },
      { a: "Kisumu clinic", b: "48 kW", c: "90 kWh", d: "Nominal" },
      { a: "Kajiado depot", b: "90 kW", c: "180 kWh", d: "Underperforming" },
      { a: "Depot yard", b: "30 kW", c: "60 kWh", d: "Nominal" },
    ],
  },
  Analytics: {
    metrics: [
      { label: "Cost per m²", value: "-11%", sub: "Standardized vs custom" },
      { label: "Schedule variance", value: "-6%", sub: "Against plan" },
      { label: "Reuse rate", value: "38%", sub: "Redeployed assets" },
      { label: "Data coverage", value: "54%", sub: "Instrumented assets" },
    ],
    columns: ["Metric", "Period", "Trend", "Note"],
    rows: [
      { a: "Build cycle time", b: "6 months", c: "Improving", d: "Standard modules" },
      { a: "Transport cost / unit", b: "6 months", c: "Flat", d: "Fuel exposure" },
      { a: "Warranty events", b: "12 months", c: "Improving", d: "Design revisions" },
      { a: "Utilization", b: "Quarter", c: "Improving", d: "Redeployment" },
    ],
  },
  AI: {
    metrics: [
      { label: "Assisted scopes", value: "34", sub: "Preliminary only" },
      { label: "Configurations drafted", value: "76", sub: "Concept" },
      { label: "Engineering questions raised", value: "212", sub: "Routed to review" },
      { label: "Human approval", value: "100%", sub: "Required" },
    ],
    columns: ["Model task", "Input", "Output", "Review"],
    rows: [
      { a: "Requirement extraction", b: "Client brief", c: "Structured scope", d: "Engineer" },
      { a: "Configuration draft", b: "Scope", c: "Module set", d: "Engineer" },
      { a: "Anomaly detection", b: "Telemetry", c: "Alert", d: "Operations" },
      { a: "Document retrieval", b: "Question", c: "Cited answer", d: "Optional" },
    ],
  },
};

const TABS = Object.keys(VIEWS);

function CommandCenter() {
  const [tab, setTab] = useState(TABS[0]!);
  const view = VIEWS[tab]!;

  return (
    <>
      <PageHero
        eyebrow="Industrial command center"
        title="One operating view across the industrial fleet."
        lead="A working prototype of the AIS operations environment. Every figure below is demonstration data used to show structure and intent — not live telemetry."
      />

      <Container className="py-14 md:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <StatusNote>Demo data</StatusNote>
          <span className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
            Live data — not connected
          </span>
        </div>

        <div className="mt-8 border border-border bg-surface">
          <div
            role="tablist"
            aria-label="Command center views"
            className="flex flex-wrap gap-px border-b border-border bg-border"
          >
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "bg-background px-4 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors",
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {view.metrics.map((m) => (
              <div key={m.label} className="bg-background p-6">
                <p className="mono-label">{m.label}</p>
                <p className="mt-4 font-display text-3xl font-bold tracking-tight text-primary">
                  {m.value}
                </p>
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {m.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto border-t border-border">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr>
                  {view.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="border-b border-border px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {view.rows.map((r) => (
                  <tr key={r.a} className="border-b border-border/60 last:border-b-0">
                    <td className="px-6 py-4 text-sm">{r.a}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{r.b}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{r.c}</td>
                    <td className="px-6 py-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-primary">
                      {r.d}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The command center is the visible surface of the AIS Industrial OS. Instrumentation,
          asset identity and integration scope are defined per deployment.
        </p>
      </Container>
    </>
  );
}
