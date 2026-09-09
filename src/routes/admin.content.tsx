import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { listSiteContent, saveSiteContent } from "@/lib/cms.functions";
import { CONTENT_FIELD_LABELS } from "@/lib/site-content";

export const Route = createFileRoute("/admin/content")({
  component: ContentAdmin,
});

const inputClass =
  "mt-2 w-full border border-input bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none";

type Draft = {
  route_key: string;
  seo_title: string;
  seo_description: string;
  og_title: string;
  og_description: string;
  fields: Record<string, string>;
};

function ContentAdmin() {
  const list = useServerFn(listSiteContent);
  const save = useServerFn(saveSiteContent);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["site-content"],
    queryFn: () => list(),
  });

  const [active, setActive] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    if (!data?.length) return;
    const key = active ?? data[0]!.route_key;
    const page = data.find((p) => p.route_key === key) ?? data[0]!;
    setActive(page.route_key);
    setDraft({
      route_key: page.route_key,
      seo_title: page.seo_title,
      seo_description: page.seo_description,
      og_title: page.og_title,
      og_description: page.og_description,
      fields: { ...page.fields },
    });
  }, [data, active]);

  const mutation = useMutation({
    mutationFn: (payload: Draft) => save({ data: payload }),
    onSuccess: () => {
      toast.success("Content saved. The live pages update immediately.");
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : "Could not save this page."),
  });

  if (isLoading) return <p className="mono-label text-muted-foreground">Loading pages…</p>;
  if (error)
    return (
      <p className="text-sm text-muted-foreground">
        {error instanceof Error && error.message === "Forbidden"
          ? "Your account does not have permission to edit content yet."
          : "Content could not be loaded."}
      </p>
    );
  if (!draft) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <nav aria-label="Pages" className="space-y-px bg-border">
        {(data ?? []).map((p) => (
          <button
            key={p.route_key}
            type="button"
            onClick={() => setActive(p.route_key)}
            aria-current={p.route_key === active ? "true" : undefined}
            className={`block w-full px-5 py-4 text-left font-mono text-[0.66rem] uppercase tracking-[0.16em] ${
              p.route_key === active ? "bg-primary text-primary-foreground" : "bg-background"
            }`}
          >
            {p.label}
          </button>
        ))}
      </nav>

      <form
        className="space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(draft);
        }}
      >
        <fieldset>
          <legend className="mono-label mb-5 text-primary">Page content</legend>
          <div className="space-y-6">
            {(PAGE_FIELDS[draft.route_key] ?? []).map((field) => (
              <label key={field.name} className="block">
                <span className="mono-label text-foreground">{field.label}</span>
                {field.kind === "text" ? (
                  <input
                    type="text"
                    className={inputClass}
                    value={draft.fields[field.name] ?? ""}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        fields: { ...draft.fields, [field.name]: e.target.value },
                      })
                    }
                  />
                ) : (
                  <textarea
                    rows={field.kind === "list" ? 8 : 3}
                    className={`${inputClass} ${field.kind === "list" ? "font-mono text-xs" : ""}`}
                    value={draft.fields[field.name] ?? ""}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        fields: { ...draft.fields, [field.name]: e.target.value },
                      })
                    }
                  />
                )}
                {field.hint && (
                  <span className="mt-2 block text-xs text-muted-foreground">{field.hint}</span>
                )}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mono-label mb-5 text-primary">Search and social preview</legend>
          <div className="space-y-6">
            <TextField
              label="Search title"
              value={draft.seo_title}
              onChange={(v) => setDraft({ ...draft, seo_title: v })}
              hint={`${draft.seo_title.length} characters — aim for under 60`}
            />
            <TextArea
              label="Search description"
              value={draft.seo_description}
              onChange={(v) => setDraft({ ...draft, seo_description: v })}
              hint={`${draft.seo_description.length} characters — aim for under 160`}
            />
            <TextField
              label="Share title"
              value={draft.og_title}
              onChange={(v) => setDraft({ ...draft, og_title: v })}
            />
            <TextArea
              label="Share description"
              value={draft.og_description}
              onChange={(v) => setDraft({ ...draft, og_description: v })}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-primary px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
        >
          {mutation.isPending ? "Saving…" : "Save changes →"}
        </button>
      </form>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mono-label text-foreground">{label}</span>
      <input
        type="text"
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="mt-2 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mono-label text-foreground">{label}</span>
      <textarea
        rows={3}
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="mt-2 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}
