import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { SYSTEM_FAMILIES } from "@/components/ais/data";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request an Engineering Proposal — AIS Procurement" },
      {
        name: "description",
        content:
          "Submit project requirements to Atlas Industrial Systems: organisation, sector, location, required system, scale, technical documents and target deployment date.",
      },
      { property: "og:title", content: "Tell Us What You Need to Build — AIS" },
      {
        property: "og:description",
        content:
          "A structured procurement and RFQ pathway for institutional and industrial buyers of modular infrastructure.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/quote" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

const inputClass =
  "mt-2 w-full border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

function QuotePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us what you need to build."
        lead="Share the operational requirement. Our engineering team reviews every submission and determines the appropriate next step."
      />
      <Container className="py-16 md:py-24">
        {submitted ? (
          <div className="panel max-w-2xl p-10">
            <StatusNote>Project requirements received</StatusNote>
            <h2 className="display-xl mt-6 text-2xl">Thank you.</h2>
            <p className="mt-4 text-muted-foreground">
              Our engineering team will review your requirements and determine the appropriate next
              step. No quotation, price or delivery timeline is confirmed at this stage.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-8 border border-border px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] hover:border-primary hover:text-primary"
            >
              Submit another requirement
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="grid gap-10 lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="space-y-10">
              <FormBlock step="01" legend="Project">
                <Field label="Project name" name="project" required />
                <Field label="Organization / institution" name="organization" required />
              </FormBlock>

              <FormBlock step="02" legend="Location & sector">
                <Field label="Country / city / site" name="location" required />
                <Field label="Sector" name="sector" />
              </FormBlock>

              <FormBlock step="03" legend="System & scale">
                <label className="block">
                  <span className="mono-label text-foreground">Required system</span>
                  <select name="system" className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select a system
                    </option>
                    {SYSTEM_FAMILIES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} — {s.category}
                      </option>
                    ))}
                    <option value="Combined / unsure">Combined / unsure</option>
                  </select>
                </label>
                <Field label="Quantity / dimensions / capacity" name="scale" />
              </FormBlock>

              <FormBlock step="04" legend="Requirements">
                <label className="block sm:col-span-2">
                  <span className="mono-label text-foreground">Technical requirements</span>
                  <textarea
                    name="requirements"
                    rows={5}
                    className={inputClass}
                    placeholder="Operating conditions, loads, utilities, compliance, site access…"
                  />
                </label>
                <label className="block">
                  <span className="mono-label text-foreground">
                    Documents (drawings / BOQ / specifications)
                  </span>
                  <input type="file" name="documents" multiple className={inputClass} />
                </label>
                <Field label="Required deployment date" name="timeline" type="date" />
              </FormBlock>

              <FormBlock step="05" legend="Contact">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Budget range (optional)" name="budget" />
              </FormBlock>

              <button
                type="submit"
                className="bg-primary px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Request engineering proposal →
              </button>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="panel p-7">
                <p className="mono-label text-foreground">Procurement pathway</p>
                <ol className="mt-5 space-y-3">
                  {[
                    "New",
                    "Qualified",
                    "Engineering review",
                    "Proposal",
                    "Negotiation",
                    "Won",
                    "Deployed",
                  ].map((s, i) => (
                    <li key={s} className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                      {s}
                    </li>
                  ))}
                </ol>
                <p className="mt-7 text-xs text-muted-foreground">
                  AIS does not guarantee quotations, pricing or delivery timelines at submission.
                  Each requirement is assessed on engineering feasibility first.
                </p>
              </div>
            </aside>
          </form>
        )}
      </Container>
    </>
  );
}

function FormBlock({
  step,
  legend,
  children,
}: {
  step: string;
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mono-label mb-5 flex items-center gap-3">
        <span className="text-primary">{step}</span>
        <span className="h-px w-8 bg-border" aria-hidden="true" />
        <span className="text-foreground">{legend}</span>
      </legend>
      <div className="grid gap-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mono-label text-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      <input type={type} name={name} required={required} className={inputClass} />
    </label>
  );
}
