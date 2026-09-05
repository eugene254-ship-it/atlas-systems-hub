export type CopilotScope = {
  input: string;
  headcount: number;
  useCase: string;
  remote: boolean;
  area: number;
  modules: { name: string; qty: number }[];
  utilities: string[];
  questions: string[];
};

export const COPILOT_EXAMPLE =
  "We need a modular operations facility for 35 workers at a remote industrial site.";

export function buildScope(input: string): CopilotScope {
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
    {
      name: `Atlas Contain 20ft ${useCase === "Workshop facility" ? "workshop" : "office"} unit`,
      qty: officeUnits,
    },
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
    remote
      ? "Security, camp management and resupply logistics model?"
      : "Local planning approvals and site boundary conditions?",
    "Expected service life, relocation intent and end-of-life plan?",
  ];

  return { input, headcount, useCase, remote, area, modules, utilities, questions };
}

export type RfqPrefill = {
  project_name: string;
  system: string;
  scale: string;
  requirements: string;
  brief: CopilotScope;
};

/** Turn a copilot scope into the fields the RFQ form needs. */
export function scopeToPrefill(scope: CopilotScope): RfqPrefill {
  const requirements = [
    `REQUIREMENTS SUMMARY (Engineering Copilot)`,
    `Facility type: ${scope.useCase}`,
    `Occupancy: ${scope.headcount} people`,
    `Indicative floor area: ${scope.area} m²`,
    `Site context: ${scope.remote ? "Remote / off-grid assumed" : "Serviced site assumed"}`,
    "",
    "UTILITIES",
    ...scope.utilities.map((u) => `- ${u}`),
    "",
    "PRELIMINARY CONFIGURATION",
    ...scope.modules.map((m) => `- ${m.name} × ${m.qty}`),
    "",
    "OPEN ENGINEERING QUESTIONS",
    ...scope.questions.map((q, i) => `${String(i + 1).padStart(2, "0")}. ${q}`),
    "",
    "ORIGINAL BRIEF",
    scope.input,
  ].join("\n");

  return {
    project_name: `${scope.useCase} — ${scope.headcount} people`,
    system: "Combined / unsure",
    scale: `${scope.modules.reduce((n, m) => n + m.qty, 0)} modules / approx. ${scope.area} m²`,
    requirements,
    brief: scope,
  };
}

const STORAGE_KEY = "ais.copilot.prefill";

export function storePrefill(prefill: RfqPrefill) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(prefill));
  } catch {
    /* storage unavailable */
  }
}

export function readPrefill(): RfqPrefill | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RfqPrefill) : null;
  } catch {
    return null;
  }
}

export function clearPrefill() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}
