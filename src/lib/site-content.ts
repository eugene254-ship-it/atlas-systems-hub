export type SiteContent = {
  route_key: string;
  label: string;
  seo_title: string;
  seo_description: string;
  og_title: string;
  og_description: string;
  fields: Record<string, string>;
};

export const CONTENT_FIELD_LABELS: Record<string, string> = {
  hero_eyebrow: "Hero eyebrow",
  hero_title: "Hero headline",
  hero_lead: "Hero lead paragraph",
  cta_primary: "Primary button label",
  cta_secondary: "Secondary button label",
  status_note: "Status note",
};

export const CONTENT_DEFAULTS: Record<string, SiteContent> = {
  home: {
    route_key: "home",
    label: "Homepage",
    seo_title: "Atlas Industrial Systems — Modular Industrial Infrastructure, Africa",
    seo_description:
      "AIS engineers, fabricates, integrates and deploys modular industrial systems: containerized infrastructure, engineered steel, distributed energy and rapid-deployment facilities.",
    og_title:
      "Atlas Industrial Systems — Engineering Infrastructure That Moves Industry Forward",
    og_description:
      "Containerized infrastructure, engineered steel, modular buildings, logistics and distributed energy systems engineered for African industrial conditions.",
    fields: {
      hero_eyebrow: "Atlas Industrial Systems",
      hero_title: "Engineering infrastructure that moves industry forward.",
      hero_lead:
        "We design, fabricate, integrate and deploy modular industrial systems built for logistics, energy, manufacturing, construction, mining, humanitarian operations and resilient infrastructure.",
      cta_primary: "Configure a system",
      cta_secondary: "Start a project",
    },
  },
  os: {
    route_key: "os",
    label: "Industrial OS",
    seo_title: "AIS Industrial OS — Operating Layer for Physical Infrastructure",
    seo_description:
      "AIS Industrial OS is the planned software layer connecting assets, projects, manufacturing, logistics, maintenance and industrial intelligence in one operating environment.",
    og_title: "AIS Industrial OS — Industrial Operating Environment",
    og_description:
      "Asset command, project control, manufacturing, logistics, maintenance, inventory, performance and intelligence in a single industrial operating layer.",
    fields: {
      hero_eyebrow: "AIS Industrial OS",
      hero_title: "The operating layer for physical infrastructure.",
      hero_lead:
        "Every system AIS engineers, manufactures and deploys is designed to be readable by software: identified, monitored, serviced, upgraded and redeployed across its full life.",
      status_note: "Platform in development — concept modules",
    },
  },
  market: {
    route_key: "market",
    label: "AIS Market",
    seo_title: "AIS Market — Industrial Modules, Components and Services",
    seo_description:
      "AIS Market is the planned industrial marketplace for standardized modules, components, equipment, fabrication, logistics, maintenance and energy systems.",
    og_title: "AIS Market — Coming Industrial Marketplace",
    og_description:
      "Discover, configure, request, contract, deploy and manage industrial systems and services through one commercial layer.",
    fields: {
      hero_eyebrow: "AIS Market",
      hero_title: "A commercial layer for industrial systems.",
      hero_lead:
        "A single place to discover standardized industrial systems and the engineering, logistics and lifecycle services that make them work — with pricing, lead times and specifications made legible.",
      status_note: "Coming platform — not transactable today",
    },
  },
  projects: {
    route_key: "projects",
    label: "Projects",
    seo_title: "Projects & Case Studies — Atlas Industrial Systems",
    seo_description:
      "Infrastructure projects and case studies from Atlas Industrial Systems: remote facilities, cold-chain nodes, rapid response clinics and fabricated equipment platforms.",
    og_title: "Built for Real Conditions — AIS Projects",
    og_description:
      "Projects and case studies showing how AIS systems address real industrial constraints.",
    fields: {
      hero_eyebrow: "Projects",
      hero_title: "Built for real conditions.",
      hero_lead:
        "AIS is an early-stage industrial platform. The work below is presented as concept and pilot projects — not as completed client deliveries.",
      projects: "",
    },
  },
  about: {
    route_key: "about",
    label: "About & Leadership",
    seo_title: "About Atlas Industrial Systems — Vision, Mission, Leadership",
    seo_description:
      "AIS exists to make industrial infrastructure accessible, deployable and scalable by combining engineering, fabrication, logistics and technology into modular systems.",
    og_title: "We Build Systems for a World That Cannot Afford Fragility — AIS",
    og_description:
      "The vision, mission, values and leadership behind Atlas Industrial Systems.",
    fields: {
      hero_eyebrow: "About AIS",
      hero_title: "We build systems for a world that cannot afford fragility.",
      hero_lead:
        "Atlas Industrial Systems combines engineering, fabrication, logistics and technology to transform infrastructure from isolated construction projects into modular systems.",
      leadership: "",
    },
  },
  contact: {
    route_key: "contact",
    label: "Contact & Locations",
    seo_title: "Contact Atlas Industrial Systems — Engineering & Procurement",
    seo_description:
      "Contact AIS for project enquiries, engineering, procurement, partnerships, careers and general questions about modular industrial infrastructure.",
    og_title: "Let's Engineer the Next System — Contact AIS",
    og_description:
      "Project enquiries, engineering, procurement, partnerships and careers.",
    fields: {
      hero_eyebrow: "Contact",
      hero_title: "Let's engineer the next system.",
      hero_lead:
        "Tell us the operational problem. We will tell you whether a modular industrial system is the right answer.",
      locations: "",
      channels: "",
      note: "",
    },
  },
};

export const CONTENT_KEYS = Object.keys(CONTENT_DEFAULTS);

export type FieldSpec = {
  name: string;
  label: string;
  kind: "text" | "textarea" | "list";
  hint?: string;
};

const HERO_FIELDS: FieldSpec[] = [
  { name: "hero_eyebrow", label: "Hero eyebrow", kind: "text" },
  { name: "hero_title", label: "Hero headline", kind: "text" },
  { name: "hero_lead", label: "Hero lead paragraph", kind: "textarea" },
];

/** Which editable fields each page shows in the admin editor. */
export const PAGE_FIELDS: Record<string, FieldSpec[]> = {
  home: [
    ...HERO_FIELDS,
    { name: "cta_primary", label: "Primary button label", kind: "text" },
    { name: "cta_secondary", label: "Secondary button label", kind: "text" },
  ],
  os: [...HERO_FIELDS, { name: "status_note", label: "Status note", kind: "text" }],
  market: [...HERO_FIELDS, { name: "status_note", label: "Status note", kind: "text" }],
  projects: [
    ...HERO_FIELDS,
    {
      name: "projects",
      label: "Projects and case studies",
      kind: "list",
      hint: "One project per line: Name | Location | Sector | System | Deployment | Challenge | Solution | Status label",
    },
  ],
  about: [
    ...HERO_FIELDS,
    {
      name: "leadership",
      label: "Leadership and team",
      kind: "list",
      hint: "One person per line: Name | Role | Short bio",
    },
  ],
  contact: [
    ...HERO_FIELDS,
    {
      name: "locations",
      label: "Offices and factories",
      kind: "list",
      hint: "One location per line: Label | Full address | Notes (e.g. opening hours)",
    },
    {
      name: "channels",
      label: "Contact channels",
      kind: "list",
      hint: "One per line: Purpose | Email or phone",
    },
    { name: "note", label: "Footnote under the contact details", kind: "textarea" },
  ],
};

/** Split a stored multi-line list field into pipe-separated columns. */
export function parseList(value: string | undefined, columns: number): string[][] {
  if (!value?.trim()) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((p) => p.trim());
      while (parts.length < columns) parts.push("");
      return parts.slice(0, columns);
    });
}

/** Merge a stored record over the code defaults so a page never renders empty. */
export function mergeContent(
  key: string,
  stored: Partial<SiteContent> | null | undefined,
): SiteContent {
  const base = CONTENT_DEFAULTS[key] ?? {
    route_key: key,
    label: key,
    seo_title: "",
    seo_description: "",
    og_title: "",
    og_description: "",
    fields: {},
  };
  if (!stored) return base;
  const pick = (value: unknown, fallback: string) =>
    typeof value === "string" && value.trim() ? value : fallback;
  const storedFields = (stored.fields ?? {}) as Record<string, unknown>;
  const fields: Record<string, string> = { ...base.fields };
  for (const [k, v] of Object.entries(storedFields)) {
    if (typeof v === "string" && v.trim()) fields[k] = v;
  }
  return {
    route_key: key,
    label: pick(stored.label, base.label),
    seo_title: pick(stored.seo_title, base.seo_title),
    seo_description: pick(stored.seo_description, base.seo_description),
    og_title: pick(stored.og_title, base.og_title),
    og_description: pick(stored.og_description, base.og_description),
    fields,
  };
}

/** Build the route head() meta array from a content record. */
export function contentMeta(content: SiteContent) {
  return [
    { title: content.seo_title },
    { name: "description", content: content.seo_description },
    { property: "og:title", content: content.og_title },
    { property: "og:description", content: content.og_description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
