import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Container, PageHero, StatusNote } from "@/components/ais/primitives";
import { SYSTEM_FAMILIES } from "@/components/ais/data";
import { clearPrefill, readPrefill, type RfqPrefill } from "@/lib/copilot-brief";
import { submitRfq } from "@/lib/rfq.functions";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuotePage,
});

const inputClass =
  "mt-2 w-full border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

type FormState = {
  project_name: string;
  organization: string;
  location: string;
  sector: string;
  system: string;
  scale: string;
  requirements: string;
  timeline: string;
  budget: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};

const EMPTY: FormState = {
  project_name: "",
  organization: "",
  location: "",
  sector: "",
  system: "",
  scale: "",
  requirements: "",
  timeline: "",
  budget: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
};

function QuotePage() {
  const navigate = useNavigate();
  const send = useServerFn(submitRfq);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [prefill, setPrefill] = useState<RfqPrefill | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = readPrefill();
    if (!stored) return;
    setPrefill(stored);
    setForm((f) => ({
      ...f,
      project_name: stored.project_name,
      system: stored.system,
      scale: stored.scale,
      requirements: stored.requirements,
    }));
  }, []);

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await send({
        data: {
          ...form,
          copilot_brief: prefill?.brief ?? null,
          source: prefill ? "copilot" : "website",
        },
      });
      clearPrefill();
      navigate({ to: "/rfq/received", search: { ref: result.reference } });
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "We could not send your requirement. Please check the form and try again.",
      );
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us what you need to build."
        lead="Share the operational requirement. Our engineering team reviews every submission and determines the appropriate next step."
      />
      <Container className="py-16 md:py-24">
        {prefill && (
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border border-primary/40 bg-primary/5 p-6">
            <div>
              <p className="mono-label text-primary">Copilot brief attached</p>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Project name, system, scale and the full requirements brief were carried across from
                the engineering copilot. Edit anything before you send it.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                clearPrefill();
                setPrefill(null);
                setForm((f) => ({ ...f, requirements: "", scale: "", system: "" }));
              }}
              className="border border-border px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] hover:border-primary hover:text-primary"
            >
              Clear brief
            </button>
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-10">
            <FormBlock step="01" legend="Project">
              <Field
                label="Project name"
                required
                value={form.project_name}
                onChange={(v) => set("project_name", v)}
              />
              <Field
                label="Organization / institution"
                required
                value={form.organization}
                onChange={(v) => set("organization", v)}
              />
            </FormBlock>

            <FormBlock step="02" legend="Location & sector">
              <Field
                label="Country / city / site"
                required
                value={form.location}
                onChange={(v) => set("location", v)}
              />
              <Field label="Sector" value={form.sector} onChange={(v) => set("sector", v)} />
            </FormBlock>

            <FormBlock step="03" legend="System & scale">
              <label className="block">
                <span className="mono-label text-foreground">Required system</span>
                <select
                  className={inputClass}
                  value={form.system}
                  onChange={(e) => set("system", e.target.value)}
                >
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
              <Field
                label="Quantity / dimensions / capacity"
                value={form.scale}
                onChange={(v) => set("scale", v)}
              />
            </FormBlock>

            <FormBlock step="04" legend="Requirements">
              <label className="block sm:col-span-2">
                <span className="mono-label text-foreground">Technical requirements</span>
                <textarea
                  rows={prefill ? 14 : 5}
                  className={inputClass}
                  value={form.requirements}
                  onChange={(e) => set("requirements", e.target.value)}
                  placeholder="Operating conditions, loads, utilities, compliance, site access…"
                />
              </label>
              <Field
                label="Required deployment date"
                type="date"
                value={form.timeline}
                onChange={(v) => set("timeline", v)}
              />
              <Field
                label="Budget range (optional)"
                value={form.budget}
                onChange={(v) => set("budget", v)}
              />
            </FormBlock>

            <FormBlock step="05" legend="Contact">
              <Field
                label="Name"
                required
                value={form.contact_name}
                onChange={(v) => set("contact_name", v)}
              />
              <Field
                label="Email"
                type="email"
                required
                value={form.contact_email}
                onChange={(v) => set("contact_email", v)}
              />
              <Field
                label="Phone"
                type="tel"
                value={form.contact_phone}
                onChange={(v) => set("contact_phone", v)}
              />
            </FormBlock>

            <p aria-live="polite" className="min-h-5 text-sm text-destructive">
              {error}
            </p>

            <button
              type="submit"
              disabled={busy}
              className="bg-primary px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-60"
            >
              {busy ? "Sending…" : "Request engineering proposal →"}
            </button>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-7">
              <StatusNote>No pricing or delivery date is confirmed at submission</StatusNote>
              <p className="mono-label mt-6 text-foreground">Procurement pathway</p>
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
                  <li
                    key={s}
                    className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <p className="mt-7 text-xs text-muted-foreground">
                Each requirement is assessed on engineering feasibility first. You receive a
                reference number as soon as it is logged.
              </p>
            </div>
          </aside>
        </form>
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
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mono-label text-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  );
}
