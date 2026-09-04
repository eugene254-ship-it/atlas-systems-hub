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
};

export const CONTENT_KEYS = Object.keys(CONTENT_DEFAULTS);

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
