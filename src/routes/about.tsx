import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Atlas Industrial Systems — Vision, Mission, Values" },
      {
        name: "description",
        content:
          "AIS exists to make industrial infrastructure accessible, deployable and scalable by combining engineering, fabrication, logistics and technology into modular systems.",
      },
      {
        property: "og:title",
        content: "We Build Systems for a World That Cannot Afford Fragility — AIS",
      },
      {
        property: "og:description",
        content:
          "The vision, mission and values behind Atlas Industrial Systems, an emerging African industrial infrastructure platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const VALUES = ["Precision", "Reliability", "Ingenuity", "Discipline", "Scale", "Stewardship"];
const TEAM = ["Founder", "Engineering", "Operations", "Manufacturing", "Technology", "Partnerships"];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AIS"
        title="We build systems for a world that cannot afford fragility."
        lead="Atlas Industrial Systems combines engineering, fabrication, logistics and technology to transform infrastructure from isolated construction projects into modular systems."
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
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Team profiles will be published as roles are confirmed. No biographies are shown until
            verified.
          </p>
          <ul className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((role) => (
              <li key={role} className="bg-background p-8">
                <div className="h-24 w-24 grid-field-sm border border-border opacity-60" aria-hidden="true" />
                <h3 className="mt-6 font-display text-base font-bold uppercase tracking-[0.06em]">
                  {role}
                </h3>
                <p className="mono-label mt-3">Profile — to be added</p>
              </li>
            ))}
          </ul>
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
