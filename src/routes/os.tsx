import { createFileRoute } from "@tanstack/react-router";
import {
  ActionLink,
  Container,
  PageHero,
  Section,
  SectionHeader,
  StatusNote,
} from "@/components/ais/primitives";
import { FLYWHEEL, OS_CAPABILITIES, STACK_LAYERS } from "@/components/ais/platform-data";
import { getSiteContent } from "@/lib/cms.functions";
import { contentMeta, mergeContent } from "@/lib/site-content";

export const Route = createFileRoute("/os")({
  loader: () => getSiteContent({ data: { key: "os" } }),
  head: ({ loaderData }) => ({
    meta: contentMeta(loaderData ?? mergeContent("os", null)),
  }),
  component: OsPage,
});

function OsPage() {
  const f = Route.useLoaderData().fields;
  return (
    <>
      <PageHero
        eyebrow={f["hero_eyebrow"]}
        title={f["hero_title"]}
        lead={f["hero_lead"]}
      />

      <Section>
        <Container className="px-0 md:px-0">
          <StatusNote>{f["status_note"]}</StatusNote>
        </Container>
        <SectionHeader
          className="mt-8"
          index="01"
          eyebrow="Modules"
          title="Eight operating modules."
          lead="One environment for the physical and digital sides of industrial infrastructure."
        />
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {OS_CAPABILITIES.map((m, i) => (
            <article key={m.name} className="bg-background p-7">
              <p className="mono-label text-primary">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-[0.06em]">
                {m.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ActionLink to="/command-center">Open command center prototype</ActionLink>
          <ActionLink to="/copilot" variant="outline">
            Engineering copilot
          </ActionLink>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          index="02"
          eyebrow="Industrial stack"
          title="Six layers, one system."
          lead="AIS operates across the whole stack — from raw material through to the intelligence that governs an asset in operation."
        />
        <ol className="mt-12 space-y-px border border-border bg-border">
          {STACK_LAYERS.map((l) => (
            <li
              key={l.id}
              className="grid gap-3 bg-background p-7 md:grid-cols-[6rem_14rem_1fr] md:items-baseline"
            >
              <span className="mono-label text-primary">Layer {l.id}</span>
              <h3 className="font-display text-lg font-bold uppercase tracking-[0.06em]">
                {l.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{l.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeader
          index="03"
          eyebrow="Platform flywheel"
          title="Each deployment improves the next system."
          lead="Standardization compounds. Data from operating assets returns to engineering and becomes the next generation of product."
        />
        <div className="mt-12 flex flex-wrap items-stretch gap-px border border-border bg-border">
          {FLYWHEEL.map((step, i) => (
            <div
              key={step}
              className="min-w-[9.5rem] flex-1 bg-background p-5"
              style={{ opacity: 1 - i * 0.03 }}
            >
              <p className="mono-label text-primary">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-display text-sm font-bold uppercase tracking-[0.08em]">
                {step}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
