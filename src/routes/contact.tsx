import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero } from "@/components/ais/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Atlas Industrial Systems — Engineering & Procurement" },
      {
        name: "description",
        content:
          "Contact AIS for project enquiries, engineering, procurement, partnerships, careers and general questions about modular industrial infrastructure.",
      },
      { property: "og:title", content: "Let's Engineer the Next System — Contact AIS" },
      {
        property: "og:description",
        content: "Project enquiries, engineering, procurement, partnerships and careers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const CHANNELS = [
  ["Project enquiries", "projects@[domain to be confirmed]"],
  ["Engineering", "engineering@[domain to be confirmed]"],
  ["Procurement", "procurement@[domain to be confirmed]"],
  ["Partnerships", "partners@[domain to be confirmed]"],
  ["Careers", "careers@[domain to be confirmed]"],
  ["General enquiries", "hello@[domain to be confirmed]"],
];

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's engineer the next system."
        lead="Tell us the operational problem. We will tell you whether a modular industrial system is the right answer."
      />
      <Container className="py-16 md:py-24">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map(([title, contact]) => (
            <div key={title} className="bg-background p-8">
              <h2 className="font-display text-base font-bold uppercase tracking-[0.06em]">
                {title}
              </h2>
              <p className="mt-3 font-mono text-xs text-muted-foreground">{contact}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xs text-muted-foreground">
          Contact details are placeholders until verified addresses are supplied. No office or
          facility location is published until an AIS site is confirmed.
        </p>
        <div className="mt-14 flex flex-wrap gap-3">
          <ActionLink to="/quote">Start a project</ActionLink>
          <ActionLink to="/configure" variant="outline">
            Configure a system
          </ActionLink>
        </div>
      </Container>
    </>
  );
}
