import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { ActionLink, Container, PageHero, StatusNote } from "@/components/ais/primitives";

export const Route = createFileRoute("/rfq/received")({
  validateSearch: z.object({ ref: z.string().max(40).optional() }),
  head: () => ({
    meta: [
      { title: "Requirement Received — Atlas Industrial Systems" },
      {
        name: "description",
        content:
          "Your project requirement has been received by the Atlas Industrial Systems engineering team, with a reference number for follow-up.",
      },
      { property: "og:title", content: "Requirement Received — Atlas Industrial Systems" },
      {
        property: "og:description",
        content: "AIS engineering reviews every submitted requirement before any commercial step.",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReceivedPage,
});

const STEPS = [
  ["01", "Received", "Your requirement is logged and routed to engineering."],
  ["02", "Qualification", "We confirm scope, site context and feasibility questions."],
  ["03", "Engineering review", "A reviewed configuration and open questions are prepared."],
  ["04", "Proposal", "Only after review do we issue scope, pricing and timeline."],
] as const;

function ReceivedPage() {
  const { ref } = useSearch({ from: "/rfq/received" });

  return (
    <>
      <PageHero
        eyebrow="Requirement received"
        title="Your project is with our engineering team."
        lead="Every requirement is assessed on engineering feasibility before any commercial step. You will hear from us with the outcome of that review."
      />
      <Container className="py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_1.1fr]">
          <div className="border border-border bg-surface p-8">
            <StatusNote>No quotation, price or delivery date is confirmed yet</StatusNote>
            <p className="mono-label mt-7 text-primary">Your reference</p>
            <p className="mt-3 font-display text-3xl font-bold tracking-[0.04em]">
              {ref ?? "AIS-REQUEST"}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Quote this reference in any follow-up. Keep a copy — it is the fastest way for us to
              find your submission.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink to="/systems">Browse systems</ActionLink>
              <ActionLink to="/configure" variant="outline">
                Open configurator
              </ActionLink>
            </div>
          </div>

          <ol className="space-y-px border border-border bg-border">
            {STEPS.map(([n, title, body]) => (
              <li key={n} className="bg-background p-7">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-primary">
                  {n} — {title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </>
  );
}
