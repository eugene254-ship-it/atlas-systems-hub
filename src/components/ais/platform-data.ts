export const AUDIENCES = [
  { label: "Enterprise buyers", note: "Infrastructure, fast and reliable", to: "/configure" },
  { label: "Engineers", note: "Specifications and system architecture", to: "/specifications" },
  { label: "Procurement", note: "RFQ, BOQ and documentation", to: "/quote" },
  { label: "Governments", note: "Deployment at regional scale", to: "/africa" },
  { label: "Developers", note: "Modular, scalable development", to: "/systems" },
  { label: "Industrial operators", note: "Mining, energy, logistics, agri", to: "/industries" },
  { label: "Investors", note: "Platform thesis and roadmap", to: "/investors" },
  { label: "Partners", note: "Manufacturing and technology network", to: "/partners" },
  { label: "Future workforce", note: "Build the systems of tomorrow", to: "/academy" },
];

export const STACK_LAYERS = [
  {
    id: "01",
    name: "Material",
    body: "Steel, containers, components, equipment and infrastructure materials.",
  },
  {
    id: "02",
    name: "Structure",
    body: "Frames, buildings, platforms, modules and physical systems.",
  },
  {
    id: "03",
    name: "Systems",
    body: "Electrical, mechanical, plumbing, energy, communications and security.",
  },
  {
    id: "04",
    name: "Deployment",
    body: "Transport, installation, commissioning and site integration.",
  },
  {
    id: "05",
    name: "Intelligence",
    body: "Sensors, asset identity, telemetry, analytics and AI.",
  },
  {
    id: "06",
    name: "Operations",
    body: "Maintenance, optimization, lifecycle management and expansion.",
  },
];

export const OS_CAPABILITIES = [
  { name: "Asset command", body: "Know what infrastructure exists and where." },
  { name: "Project control", body: "Manage projects from requirements through delivery." },
  { name: "Manufacturing", body: "Monitor production and fabrication throughput." },
  { name: "Logistics", body: "Coordinate transportation and deployment." },
  { name: "Maintenance", body: "Schedule inspections, service and interventions." },
  { name: "Inventory", body: "Manage industrial components and materials." },
  { name: "Performance", body: "Track utilization and asset performance." },
  { name: "Intelligence", body: "Use analytics and AI to improve decisions." },
];

export const FLYWHEEL = [
  "Customer need",
  "Engineering",
  "Standardized system",
  "Manufacturing",
  "Deployment",
  "Asset",
  "Data",
  "Lifecycle service",
  "Knowledge",
  "Better system",
  "More deployments",
];

export const CORRIDOR_NODES: {
  city: string;
  country: string;
  status: "Current" | "Pilot" | "Target" | "Future";
  role: string;
}[] = [
  { city: "Nairobi", country: "Kenya", status: "Current", role: "Engineering and assembly base" },
  { city: "Mombasa", country: "Kenya", status: "Target", role: "Port logistics and export" },
  { city: "Kampala", country: "Uganda", status: "Pilot", role: "Regional deployment cell" },
  { city: "Kigali", country: "Rwanda", status: "Pilot", role: "Modular facilities corridor" },
  { city: "Dar es Salaam", country: "Tanzania", status: "Target", role: "Southern corridor port" },
  { city: "Addis Ababa", country: "Ethiopia", status: "Future", role: "Northern industrial node" },
  { city: "Lusaka", country: "Zambia", status: "Future", role: "Mining services hub" },
  { city: "Johannesburg", country: "South Africa", status: "Future", role: "Heavy fabrication partner" },
  { city: "Accra", country: "Ghana", status: "Future", role: "West Africa entry" },
  { city: "Lagos", country: "Nigeria", status: "Future", role: "Volume manufacturing target" },
];

export const CAMPUS_ZONES = [
  "Engineering",
  "Fabrication",
  "Assembly",
  "Energy",
  "Logistics",
  "Testing",
  "Warehouse",
  "Digital operations",
  "Training",
  "R&D",
];

export const MARKET_CATEGORIES = [
  "Standardized modules",
  "Components",
  "Industrial equipment",
  "Fabrication services",
  "Logistics services",
  "Maintenance",
  "Engineering services",
  "Refurbishment",
  "Energy systems",
];

export const ACADEMY_PROGRAMS = [
  "Industrial fabrication",
  "Modular construction",
  "Engineering fundamentals",
  "Industrial software",
  "Asset management",
  "Project management",
  "Technical drawing",
  "Safety",
  "Supply chain",
  "Industrial AI",
];
