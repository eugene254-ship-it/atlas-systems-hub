import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { getSiteContent } from "@/lib/cms.functions";
import { contentMeta, parseList } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  loader: () => getSiteContent({ data: { key: "about" } }),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [...contentMeta(loaderData), { property: "og:url", content: "/about" }]
      : [],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const VALUES = ["Precision", "Reliability", "Ingenuity", "Discipline", "Scale", "Stewardship"];


function AboutPage() {
  const content = Route.useLoaderData();
  const f = content.fields;
  const leadership = parseList(f["leadership"], 3);

  return (
    <>
      <PageHero
        eyebrow={f["hero_eyebrow"] ?? "About AIS"}
        title={f["hero_title"] ?? ""}
        lead={f["hero_lead"] ?? ""}
      />
      <Container className="py-20 md:py-28">
        <div className="grid gap-px bg-border md:grid-cols-2">
          <div className="bg-background p-8 md:p-12">
            <p className="mono-label text-primary">Vision</p>
            <p className="mt-5 text-lg">
              A world where resilient industrial infrastructure can be designed once, manufactured
              efficiently and deployed anywhere.
            </p>
          </div>
          <div className="bg-background p-8 md:p-12">
            <p className="mono-label text-primary">Mission</p>
            <p className="mt-5 text-lg">
              Engineer and manufacture scalable infrastructure systems that accelerate industrial
              and human development.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="display-xl text-3xl md:text-4xl">Values</h2>
          <ul className="mt-8 grid gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
            {VALUES.map((v, i) => (
              <li key={v} className="bg-background px-5 py-8">
                <span className="font-mono text-[0.62rem] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-sm font-bold uppercase tracking-[0.06em]">
                  {v}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20">
          <h2 className="display-xl text-3xl md:text-4xl">Leadership</h2>
          {leadership.length === 0 ? (
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Team profiles will be published as roles are confirmed. No biographies are shown
              until verified.
            </p>
          ) : (
            <ul className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map(([name, role, bio]) => (
                <li key={`${name}-${role}`} className="bg-background p-8">
                  <div
                    className="h-24 w-24 grid-field-sm border border-border opacity-60"
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-display text-base font-bold uppercase tracking-[0.06em]">
                    {name}
                  </h3>
                  <p className="mono-label mt-3 text-primary">{role}</p>
                  {bio && <p className="mt-4 text-sm text-muted-foreground">{bio}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-20 panel p-8 md:p-12">
          <StatusNote>Current stage — early-stage industrial platform</StatusNote>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            AIS publishes only verified facilities, certifications, projects and customers. Where
            information is not yet verified, it is labelled as concept, pilot, planned or to be
            added.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <ActionLink to="/partners">Become a partner</ActionLink>
          <ActionLink to="/careers" variant="outline">
            View openings
          </ActionLink>
        </div>
      </Container>
    </>
  );
}
