export type SystemFamily = {
  code: string;
  name: string;
  category: string;
  description: string;
  applications: string[];
  cta: string;
};

export const SYSTEM_FAMILIES: SystemFamily[] = [
  {
    code: "01",
    name: "Atlas Contain",
    category: "Containerized Infrastructure Systems",
    description:
      "ISO-container based units converted, reinforced and fitted out as deployable operational infrastructure.",
    applications: [
      "storage",
      "offices",
      "workshops",
      "site facilities",
      "modular commercial spaces",
      "equipment rooms",
      "technical rooms",
      "emergency facilities",
    ],
    cta: "Explore Atlas Contain",
  },
  {
    code: "02",
    name: "Atlas Fab",
    category: "Engineered Steel & Fabrication",
    description:
      "Structural steel design and fabrication for frames, platforms, enclosures and industrial assemblies.",
    applications: [
      "structural steel",
      "industrial frames",
      "equipment platforms",
      "fabrication assemblies",
      "support structures",
      "industrial enclosures",
    ],
    cta: "Explore Atlas Fab",
  },
  {
    code: "03",
    name: "Atlas Mod",
    category: "Modular Infrastructure",
    description:
      "Volumetric and panelised modular buildings engineered for repeatable manufacture and fast site assembly.",
    applications: [
      "modular buildings",
      "worker facilities",
      "classrooms",
      "clinics",
      "offices",
      "accommodation",
      "industrial facilities",
    ],
    cta: "Explore Atlas Mod",
  },
  {
    code: "04",
    name: "Atlas Logistics",
    category: "Industrial Logistics Infrastructure",
    description:
      "Infrastructure for moving, holding and handling industrial goods across constrained supply chains.",
    applications: [
      "container handling",
      "storage networks",
      "logistics facilities",
      "cargo support systems",
      "fleet infrastructure",
      "supply-chain infrastructure",
    ],
    cta: "Explore Logistics",
  },
  {
    code: "05",
    name: "Atlas Energy",
    category: "Distributed Energy Infrastructure",
    description:
      "Energy systems integrated directly into modular units — generation, storage, distribution and control.",
    applications: [
      "solar integration",
      "battery systems",
      "backup power",
      "microgrids",
      "industrial energy systems",
      "remote power infrastructure",
    ],
    cta: "Explore Energy",
  },
  {
    code: "06",
    name: "Atlas Response",
    category: "Rapid Deployment Infrastructure",
    description:
      "Pre-engineered facilities configured for speed of deployment into unprepared or disrupted environments.",
    applications: [
      "emergency response",
      "humanitarian deployments",
      "temporary facilities",
      "disaster recovery",
      "field hospitals",
      "command centers",
      "displacement infrastructure",
    ],
    cta: "Explore Response",
  },
];

export const CAPABILITIES = [
  "Engineering",
  "Fabrication",
  "Modular Systems",
  "Containerization",
  "Logistics",
  "Deployment",
  "Maintenance",
  "Lifecycle Management",
];

export const LIFECYCLE = [
  {
    code: "01",
    title: "Discover",
    body: "Understand operational requirements, site conditions, capacity, risks and deployment constraints.",
  },
  {
    code: "02",
    title: "Engineer",
    body: "Develop specifications, drawings, structural requirements, layouts, utilities and system architecture.",
  },
  {
    code: "03",
    title: "Fabricate",
    body: "Manufacture structural components, modular units, steel assemblies and industrial systems.",
  },
  {
    code: "04",
    title: "Integrate",
    body: "Install electrical, mechanical, plumbing, energy, security and operational systems.",
  },
  {
    code: "05",
    title: "Deploy",
    body: "Transport and commission systems where they are required.",
  },
  {
    code: "06",
    title: "Operate",
    body: "Provide maintenance, upgrades, monitoring and lifecycle support.",
  },
];

export const INDUSTRIES = [
  {
    name: "Mining",
    body: "Remote camps, workshops, equipment storage, worker infrastructure and field systems.",
  },
  {
    name: "Manufacturing",
    body: "Factories, modular extensions, production support infrastructure and industrial structures.",
  },
  {
    name: "Logistics",
    body: "Container infrastructure, storage, handling, distribution and transport systems.",
  },
  {
    name: "Energy",
    body: "Power infrastructure, battery storage, solar integration and distributed energy systems.",
  },
  {
    name: "Construction",
    body: "Temporary works, site facilities, material storage, offices and worker facilities.",
  },
  {
    name: "Agriculture",
    body: "Agro-processing facilities, storage systems, cold-chain infrastructure and distributed operations.",
  },
  {
    name: "Government",
    body: "Public infrastructure, field offices, emergency infrastructure and institutional facilities.",
  },
  {
    name: "Healthcare",
    body: "Clinics, laboratories, mobile health facilities and emergency medical infrastructure.",
  },
  {
    name: "Humanitarian",
    body: "Rapid-deployment facilities, emergency shelters, sanitation systems and command units.",
  },
  {
    name: "Commercial Real Estate",
    body: "Modular offices, retail structures, warehouses and mixed-use infrastructure.",
  },
];

export const NETWORK_NODES = [
  { city: "Nairobi", status: "Home base", x: 63, y: 55 },
  { city: "Mombasa", status: "Target market", x: 68, y: 60 },
  { city: "Kampala", status: "Target market", x: 58, y: 52 },
  { city: "Dar es Salaam", status: "Target market", x: 65, y: 65 },
  { city: "Kigali", status: "Target market", x: 56, y: 57 },
  { city: "Addis Ababa", status: "Target market", x: 66, y: 42 },
  { city: "Lusaka", status: "Strategic network", x: 56, y: 72 },
  { city: "Johannesburg", status: "Strategic network", x: 55, y: 84 },
  { city: "Accra", status: "Strategic network", x: 24, y: 47 },
  { city: "Lagos", status: "Strategic network", x: 31, y: 48 },
];

export const PROJECTS = [
  {
    name: "Remote Industrial Facility",
    location: "East Africa",
    sector: "Mining",
    system: "Modular Operations Facility",
    deployment: "Remote site",
    challenge: "Limited permanent infrastructure and long lead times for conventional construction.",
    solution:
      "Containerized operational facility combining offices, workshop bays and an integrated power module.",
    label: "Concept project",
  },
  {
    name: "Distributed Cold-Chain Node",
    location: "East Africa",
    sector: "Agriculture",
    system: "Atlas Contain + Atlas Energy",
    deployment: "Peri-urban aggregation point",
    challenge: "Post-harvest losses caused by absent cold storage near production areas.",
    solution:
      "Insulated containerized cold store with solar generation, battery buffer and remote monitoring provision.",
    label: "Concept project",
  },
  {
    name: "Rapid Response Clinic Cluster",
    location: "Regional",
    sector: "Healthcare / Humanitarian",
    system: "Atlas Response",
    deployment: "Unprepared site",
    challenge: "Medical capacity required faster than permanent facilities can be built.",
    solution:
      "Pre-engineered clinical modules with sanitation, power and expandable ward configuration.",
    label: "Pilot concept",
  },
  {
    name: "Fabricated Equipment Platform",
    location: "Regional",
    sector: "Manufacturing",
    system: "Atlas Fab",
    deployment: "Existing plant",
    challenge: "Process equipment requiring an engineered support structure inside a live facility.",
    solution: "Structural steel platform with access stairs, guarding and maintenance clearances.",
    label: "Concept project",
  },
];

export const OS_MODULES = [
  { name: "Asset Command", body: "Track deployed infrastructure." },
  { name: "Project Control", body: "Track active projects." },
  { name: "Supply Chain", body: "Monitor materials and components." },
  { name: "Fabrication", body: "Monitor production." },
  { name: "Logistics", body: "Track transportation and delivery." },
  { name: "Maintenance", body: "Schedule inspections and service." },
  { name: "Performance", body: "Analyze system utilization and lifecycle data." },
  { name: "Intelligence", body: "Surface operational insights." },
];
