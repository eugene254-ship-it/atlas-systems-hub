import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getRfqSettings, saveRfqSettings } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
});

const inputClass =
  "mt-2 w-full border border-input bg-surface px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none";

function SettingsAdmin() {
  const read = useServerFn(getRfqSettings);
  const write = useServerFn(saveRfqSettings);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["rfq-settings"],
    queryFn: () => read(),
  });

  const [form, setForm] = useState({ webhook_url: "", webhook_secret: "", notify_email: "" });
  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => write({ data: form }),
    onSuccess: () => {
      toast.success("Lead routing saved.");
      queryClient.invalidateQueries({ queryKey: ["rfq-settings"] });
    },
    onError: (err) =>
      toast.error(
        err instanceof Error && err.message === "Forbidden"
          ? "Only an admin can change lead routing."
          : "Could not save these settings.",
      ),
  });

  if (isLoading) return <p className="mono-label text-muted-foreground">Loading settings…</p>;
  if (error)
    return (
      <p className="text-sm text-muted-foreground">
        Your account does not have permission to view lead routing settings.
      </p>
    );

  return (
    <form
      className="max-w-2xl space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
    >
      <div className="border border-border bg-surface p-7">
        <p className="mono-label text-primary">Where new inquiries go</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Every submitted requirement is stored in the workspace. If you add a web address below,
          each new inquiry is also posted to it immediately — that is how you connect a CRM, a
          shared inbox tool or an automation service.
        </p>
      </div>

      <label className="block">
        <span className="mono-label text-foreground">CRM / automation web address</span>
        <input
          type="url"
          placeholder="https://hooks.example.com/ais-leads"
          className={inputClass}
          value={form.webhook_url}
          onChange={(e) => setForm({ ...form, webhook_url: e.target.value })}
        />
        <span className="mt-2 block text-xs text-muted-foreground">
          Must start with https. Leave empty to store inquiries in the workspace only.
        </span>
      </label>

      <label className="block">
        <span className="mono-label text-foreground">Shared signing phrase (optional)</span>
        <input
          type="text"
          className={inputClass}
          value={form.webhook_secret}
          onChange={(e) => setForm({ ...form, webhook_secret: e.target.value })}
        />
        <span className="mt-2 block text-xs text-muted-foreground">
          Sent as a signature header so the receiving system can confirm the message came from your
          site.
        </span>
      </label>

      <label className="block">
        <span className="mono-label text-foreground">Notification inbox</span>
        <input
          type="email"
          className={inputClass}
          value={form.notify_email}
          onChange={(e) => setForm({ ...form, notify_email: e.target.value })}
        />
        <span className="mt-2 block text-xs text-muted-foreground">
          Email alerts start sending once a sending domain is set up for this site.
        </span>
      </label>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-primary px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
      >
        {mutation.isPending ? "Saving…" : "Save routing →"}
      </button>
    </form>
  );
}
