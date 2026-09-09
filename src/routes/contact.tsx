import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Container, PageHero } from "@/components/ais/primitives";
import { getSiteContent } from "@/lib/cms.functions";
import { contentMeta, parseList } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  loader: () => getSiteContent({ data: { key: "contact" } }),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [...contentMeta(loaderData), { property: "og:url", content: "/contact" }]
      : [],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const FALLBACK_CHANNELS = [
  ["Project enquiries", "projects@[domain to be confirmed]"],
  ["Engineering", "engineering@[domain to be confirmed]"],
  ["Procurement", "procurement@[domain to be confirmed]"],
  ["Partnerships", "partners@[domain to be confirmed]"],
  ["Careers", "careers@[domain to be confirmed]"],
  ["General enquiries", "hello@[domain to be confirmed]"],
];

const FALLBACK_NOTE =
  "Contact details are placeholders until verified addresses are supplied. No office or facility location is published until an AIS site is confirmed.";

function ContactPage() {
  const content = Route.useLoaderData();
  const f = content.fields;

  const locations = parseList(f["locations"], 3);
  const parsedChannels = parseList(f["channels"], 2);
  const channels = parsedChannels.length ? parsedChannels : FALLBACK_CHANNELS;
  const note = f["note"] || (parsedChannels.length || locations.length ? "" : FALLBACK_NOTE);

  return (
    <>
      <PageHero
        eyebrow={f["hero_eyebrow"] ?? "Contact"}
        title={f["hero_title"] ?? ""}
        lead={f["hero_lead"] ?? ""}
      />
      <Container className="py-16 md:py-24">
        {locations.length > 0 && (
          <div className="mb-16">
            <h2 className="display-xl text-2xl md:text-3xl">Offices & facilities</h2>
            <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {locations.map(([label, address, detail]) => (
                <div key={`${label}-${address}`} className="bg-background p-8">
                  <p className="mono-label text-primary">{label}</p>
                  <address className="mt-4 not-italic text-sm text-foreground">{address}</address>
                  {detail && (
                    <p className="mt-3 text-xs text-muted-foreground">{detail}</p>
                  )}
                  {address && (
                    <a
                      className="mt-5 inline-block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-primary underline-offset-4 hover:underline"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on map →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(([title, contact]) => (
            <div key={title} className="bg-background p-8">
              <h2 className="font-display text-base font-bold uppercase tracking-[0.06em]">
                {title}
              </h2>
              <p className="mt-3 font-mono text-xs text-muted-foreground">{contact}</p>
            </div>
          ))}
        </div>

        {note && <p className="mt-8 max-w-2xl text-xs text-muted-foreground">{note}</p>}

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
