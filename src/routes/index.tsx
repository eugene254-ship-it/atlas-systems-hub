import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-industrial.jpg";
import fabricationImage from "@/assets/fabrication.jpg";
import {
  ActionLink,
  Container,
  Section,
  SectionHeader,
  StatusNote,
  Tag,
} from "@/components/ais/primitives";
import {
  CAPABILITIES,
  INDUSTRIES,
  LIFECYCLE,
  NETWORK_NODES,
  OS_MODULES,
  PROJECTS,
  SYSTEM_FAMILIES,
} from "@/components/ais/data";
import { AUDIENCES, STACK_LAYERS } from "@/components/ais/platform-data";
import { getSiteContent } from "@/lib/cms.functions";
import { contentMeta, mergeContent } from "@/lib/site-content";


export const Route = createFileRoute("/")({
  loader: () => getSiteContent({ data: { key: "home" } }),
  head: ({ loaderData }) => ({
    meta: [
      ...contentMeta(loaderData ?? mergeContent("home", null)),
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Atlas Industrial Systems",
          alternateName: "AIS",
          slogan: "Engineering infrastructure that moves industry forward.",
          description:
            "Industrial systems company engineering, fabricating, deploying and managing modular industrial infrastructure.",
          areaServed: "Africa",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <AudiencePaths />
      <IndustrialStack />
      <Difference />

      <SystemsPortfolio />
      <IndustriesMatrix />
      <ConfigureTeaser />
      <EngineeringIntelligence />
      <DigitalFabrication />
      <ProjectsPreview />
      <WhyAis />
      <AfricaNetwork />
      <Circularity />
      <IndustrialOs />
      <FinalCta />
    </>
  );
}

function Hero() {
  const content = Route.useLoaderData();
  const f = content.fields;
  return (
    <section className="relative overflow-hidden border-b border-border">
      <img
        src={heroImage}
        alt="Modular containerized industrial facility installed on a prepared site at dusk"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 grid-field animate-drift-grid opacity-50"
        aria-hidden="true"
      />
      <Container className="relative flex min-h-[86vh] flex-col justify-end py-20 md:py-28">
        <p className="mono-label text-primary">{f["hero_eyebrow"]}</p>
        <h1 className="display-xl mt-6 max-w-5xl text-[2.6rem] leading-[0.95] sm:text-6xl lg:text-[5.2rem]">
          {f["hero_title"]}
        </h1>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          {f["hero_lead"]}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ActionLink to="/configure">{f["cta_primary"]}</ActionLink>
          <ActionLink to="/quote" variant="outline">
            {f["cta_secondary"]}
          </ActionLink>
          <ActionLink to="/os" variant="ghost" className="ml-1">
            Enter AIS Industrial OS
          </ActionLink>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border pt-6 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
          {["Design", "Fabricate", "Integrate", "Deploy", "Operate"].map((step, i) => (
            <span key={step} className="flex items-center gap-4">
              {i > 0 && (
                <span className="text-primary" aria-hidden="true">
                  →
                </span>
              )}
              {step}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CapabilityStrip() {
  return (
    <div className="overflow-hidden border-b border-border bg-surface-2">
      <Container className="grid grid-cols-2 gap-px bg-border md:grid-cols-4 lg:grid-cols-8">
        {CAPABILITIES.map((cap, i) => (
          <div key={cap} className="bg-surface-2 px-4 py-8">
            <span className="font-mono text-[0.62rem] text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 font-display text-xs font-semibold uppercase leading-tight tracking-[0.08em]">
              {cap}
            </p>
          </div>
        ))}
      </Container>
    </div>
  );
}

function AudiencePaths() {
  return (
    <Section>
      <SectionHeader
        index="00"
        eyebrow="Choose your path"
        title="Find the entry point that matches your role."
        lead="Enterprise buyers, engineers, procurement teams, governments, operators, investors and partners each need a different first screen."
      />
      <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {AUDIENCES.map((a) => (
          <Link
            key={a.label}
            to={a.to as "/"}
            className="group bg-background p-7 transition-colors hover:bg-surface"
          >
            <h3 className="font-display text-base font-bold uppercase tracking-[0.06em]">
              {a.label}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{a.note}</p>
            <span className="mono-label mt-6 block text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Enter →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function IndustrialStack() {
  return (
    <Section className="bg-surface">
      <SectionHeader
        eyebrow="The AIS industrial stack"
        title="Six layers, engineered as one system."
        lead="From material through to operations, AIS owns the transitions where conventional infrastructure projects usually break."
      />
      <ol className="mt-12 space-y-px border border-border bg-border">
        {STACK_LAYERS.map((l) => (
          <li
            key={l.id}
            className="group grid gap-3 bg-background p-7 transition-colors hover:bg-surface-2 md:grid-cols-[7rem_14rem_1fr] md:items-baseline"
          >
            <span className="mono-label text-primary">Layer {l.id}</span>
            <h3 className="font-display text-lg font-bold uppercase tracking-[0.06em]">{l.name}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{l.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}


function Difference() {
  return (
    <Section>
      <SectionHeader
        index="01"
        eyebrow="The AIS difference"
        title={
          <>
            More than fabrication.
            <br />A complete industrial system.
          </>
        }
        lead="AIS integrates the entire infrastructure lifecycle — from operational discovery through fabrication, deployment and long-term support — inside one engineering organisation."
      />
      <ol className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
        {LIFECYCLE.map((step) => (
          <li key={step.code} className="group bg-background p-8 transition-colors hover:bg-surface">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-primary">{step.code}</span>
              <h3 className="font-display text-lg font-bold uppercase tracking-[0.04em]">
                {step.title}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            <div className="mt-8 h-px w-full bg-border">
              <div className="h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function SystemsPortfolio() {
  return (
    <Section className="bg-surface">
      <SectionHeader
        index="02"
        eyebrow="Systems portfolio"
        title="Industrial systems, built as components."
        lead="Six engineered product families that combine into complete infrastructure. Each family is specified, fabricated and supported to the same engineering standard."
      />
      <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
        {SYSTEM_FAMILIES.map((sys) => (
          <article key={sys.code} className="flex flex-col bg-surface p-8">
            <div className="mono-label flex items-center justify-between">
              <span className="text-primary">Family {sys.code}</span>
              <span>AIS</span>
            </div>
            <h3 className="display-xl mt-6 text-2xl">{sys.name}</h3>
            <p className="mono-label mt-3">{sys.category}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{sys.description}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {sys.applications.slice(0, 5).map((a) => (
                <li key={a}>
                  <Tag>{a}</Tag>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <ActionLink to="/systems" variant="ghost">
                {sys.cta}
              </ActionLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function IndustriesMatrix() {
  return (
    <Section>
      <SectionHeader
        index="03"
        eyebrow="Industries"
        title="Engineered for the industries that move the world."
      />
      <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
        {INDUSTRIES.map((ind, i) => (
          <div key={ind.name} className="bg-background p-6 transition-colors hover:bg-surface">
            <span className="font-mono text-[0.62rem] text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-sm font-bold uppercase tracking-[0.06em]">
              {ind.name}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{ind.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ConfigureTeaser() {
  return (
    <Section className="bg-surface-2">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader
            index="04"
            eyebrow="Configurator"
            title="Build your system."
            lead="Define dimensions, structure, insulation, services, energy and deployment environment — then send an indicative configuration to our engineering team for review."
          />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ActionLink to="/configure">Configure a system</ActionLink>
            <StatusNote>Indicative configuration</StatusNote>
          </div>
        </div>
        <div className="panel p-8">
          <div className="mono-label flex justify-between">
            <span>Step 01 — Define</span>
            <span className="text-primary">AIS-CFG</span>
          </div>
          <div className="mt-6 grid gap-px bg-border sm:grid-cols-2">
            {[
              ["Project type", "Operations facility"],
              ["Base unit", "40ft HC container"],
              ["Structural system", "Reinforced steel frame"],
              ["Insulation", "PU panel, 50mm"],
              ["Energy", "Solar + battery"],
              ["Deployment", "Remote site"],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface px-5 py-4">
                <p className="mono-label">{k}</p>
                <p className="mt-1.5 font-mono text-sm">{v}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-6 h-1 overflow-hidden bg-border">
            <div className="absolute inset-y-0 w-1/3 bg-primary animate-scan-x" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function EngineeringIntelligence() {
  const items = [
    "site analysis",
    "structural engineering",
    "load calculations",
    "material selection",
    "CAD / 3D design",
    "modular design",
    "fabrication drawings",
    "bill of materials",
    "cost estimation",
    "logistics planning",
    "deployment planning",
    "lifecycle analysis",
  ];
  return (
    <Section>
      <SectionHeader
        index="05"
        eyebrow="Engineering intelligence"
        title="Engineered before it is built."
        lead="Every system starts as a specification, not a sketch. Decisions are resolved digitally before steel is cut."
      />
      <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
        {["Requirement", "Digital model", "Fabrication", "Assembly", "Deployment"].map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            {i > 0 && (
              <span className="text-primary" aria-hidden="true">
                →
              </span>
            )}
            <span className="border border-border px-3 py-2">{s}</span>
          </span>
        ))}
      </div>
      <ul className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item} className="bg-background px-6 py-6">
            <span className="font-mono text-[0.62rem] text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm capitalize text-foreground">{item}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function DigitalFabrication() {
  return (
    <Section className="bg-surface">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative border border-border">
          <img
            src={fabricationImage}
            alt="Robotic welding cell and CNC plasma cutting table processing structural steel"
            width={1600}
            height={1008}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 grid-field-sm opacity-25" aria-hidden="true" />
        </div>
        <div>
          <SectionHeader
            index="06"
            eyebrow="Digital fabrication"
            title="From digital design to physical system."
            lead="CAD, engineering, fabrication, automation and data converge into one production chain — so what is drawn is what is delivered."
          />
          <ul className="mt-10 grid grid-cols-2 gap-px bg-border">
            {[
              "CAD models",
              "fabrication drawings",
              "CNC cutting",
              "welding",
              "assembly",
              "quality inspection",
              "finishing",
              "testing",
            ].map((s) => (
              <li key={s} className="bg-surface px-5 py-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function ProjectsPreview() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader index="07" eyebrow="Projects" title="Built for real conditions." />
        <ActionLink to="/projects" variant="outline">
          All projects
        </ActionLink>
      </div>
      <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
        {PROJECTS.slice(0, 2).map((p) => (
          <article key={p.name} className="bg-background p-8">
            <StatusNote>{p.label}</StatusNote>
            <h3 className="display-xl mt-6 text-2xl">{p.name}</h3>
            <dl className="mt-6 grid grid-cols-2 gap-px bg-border">
              {[
                ["Location", p.location],
                ["Sector", p.sector],
                ["System", p.system],
                ["Deployment", p.deployment],
              ].map(([k, v]) => (
                <div key={k} className="bg-background py-3 pr-3">
                  <dt className="mono-label">{k}</dt>
                  <dd className="mt-1 font-mono text-xs">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted-foreground">
              <span className="text-foreground">Challenge — </span>
              {p.challenge}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="text-foreground">Solution — </span>
              {p.solution}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function WhyAis() {
  const points = [
    ["Modular", "Systems can be configured, expanded, relocated and upgraded."],
    ["Rapid", "Industrialized fabrication reduces deployment time compared with traditional construction."],
    ["Engineered", "Every system begins with engineering requirements rather than aesthetics alone."],
    ["Scalable", "Components can move from one unit to networks of infrastructure."],
    ["Lifecycle", "AIS remains involved beyond delivery through maintenance, upgrades and support."],
  ];
  return (
    <Section className="bg-surface-2">
      <SectionHeader index="08" eyebrow="Why AIS" title="Built around industrial reality." />
      <div className="mt-14 grid gap-px bg-border lg:grid-cols-5">
        {points.map(([title, body], i) => (
          <div key={title} className="bg-surface-2 p-7">
            <span className="font-mono text-[0.62rem] text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-lg font-bold uppercase">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AfricaNetwork() {
  return (
    <Section>
      <SectionHeader
        index="09"
        eyebrow="Africa"
        title="Building Africa's industrial capacity."
        lead="Africa's infrastructure challenge is not simply a shortage of buildings. It is a shortage of systems capable of being manufactured, transported, deployed, maintained and scaled efficiently."
      />
      <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
        {["Designed locally", "Manufactured regionally", "Deployed rapidly", "Operated locally", "Scaled globally"].map(
          (s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 && (
                <span className="text-primary" aria-hidden="true">
                  →
                </span>
              )}
              {s}
            </span>
          ),
        )}
      </div>

      <div className="mt-14 grid gap-px bg-border lg:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-[4/3] bg-surface">
          <div className="absolute inset-0 grid-field opacity-40" aria-hidden="true" />
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Strategic network map of planned Atlas Industrial Systems nodes across Africa"
          >
            <path
              d="M30 20 L48 14 L62 20 L70 34 L66 48 L62 62 L58 78 L52 92 L44 82 L36 66 L26 52 L20 38 Z"
              fill="oklch(0.24 0.006 260)"
              stroke="oklch(0.4 0.01 260)"
              strokeWidth="0.4"
            />
            {NETWORK_NODES.map((n, i) => (
              <g key={n.city}>
                {i > 0 && (
                  <line
                    x1={(NETWORK_NODES[0]?.x ?? 0)}
                    y1={(NETWORK_NODES[0]?.y ?? 0)}
                    x2={n.x}
                    y2={n.y}
                    stroke="oklch(0.72 0.17 62 / 0.28)"
                    strokeWidth="0.25"
                  />
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={i === 0 ? 1.5 : 0.9}
                  fill={i === 0 ? "oklch(0.72 0.17 62)" : "oklch(0.62 0.008 260)"}
                />
              </g>
            ))}
          </svg>
        </div>
        <ul className="grid grid-cols-2 gap-px bg-border">
          {NETWORK_NODES.map((n) => (
            <li key={n.city} className="bg-surface px-5 py-4">
              <p className="font-display text-sm font-bold uppercase tracking-[0.05em]">{n.city}</p>
              <p className="mono-label mt-1">{n.status}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 max-w-2xl text-xs text-muted-foreground">
        Nodes shown represent a strategic expansion network and target markets. They do not
        represent current operating facilities.
      </p>
    </Section>
  );
}

function Circularity() {
  const loop = ["Source", "Build", "Deploy", "Use", "Refurbish", "Redeploy", "Recycle"];
  return (
    <Section className="bg-surface">
      <SectionHeader
        index="10"
        eyebrow="Circular industrial systems"
        title="Industrial assets should have more than one life."
        lead="Reuse, refurbishment, remanufacturing, modular upgrades and component recovery are designed into the system rather than added after failure."
      />
      <ol className="mt-14 grid gap-px bg-border sm:grid-cols-4 lg:grid-cols-7">
        {loop.map((s, i) => (
          <li key={s} className="bg-surface px-5 py-7 text-center">
            <span className="font-mono text-[0.62rem] text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 font-display text-sm font-bold uppercase tracking-[0.06em]">{s}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function IndustrialOs() {
  return (
    <Section>
      <SectionHeader
        index="11"
        eyebrow="Industrial intelligence"
        title="The industrial system, connected."
        lead="An evolving AIS Industrial OS: physical asset → digital ID → data → intelligence → decision → action."
      />
      <div className="mt-8">
        <StatusNote>Concept / demonstration</StatusNote>
      </div>
      <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {OS_MODULES.map((m) => (
          <div key={m.name} className="bg-surface p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.06em]">
                {m.name}
              </h3>
              <span className="h-1.5 w-1.5 bg-primary" aria-hidden="true" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{m.body}</p>
            <div className="mt-6 h-8 grid-field-sm opacity-40" aria-hidden="true" />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ActionLink to="/intelligence" variant="outline">
          Explore intelligence
        </ActionLink>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section className="bg-surface-2">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="mono-label text-primary">Core narrative</p>
          <p className="display-xl mt-6 text-2xl leading-tight md:text-4xl">
            Infrastructure should not be reinvented for every project.
          </p>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            Atlas Industrial Systems transforms engineering, fabrication and deployment into modular
            industrial systems that can be configured, manufactured, transported, installed,
            maintained and scaled. Design once. Engineer precisely. Build efficiently. Deploy
            anywhere.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <ActionLink to="/quote">Start a project</ActionLink>
          <ActionLink to="/configure" variant="outline">
            Configure a system
          </ActionLink>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
          >
            Talk to engineering <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
