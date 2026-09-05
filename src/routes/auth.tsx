import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Container, PageHero } from "@/components/ais/primitives";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Team Sign In — Atlas Industrial Systems" },
      {
        name: "description",
        content:
          "Sign in to the Atlas Industrial Systems team workspace to manage site content and project inquiries.",
      },
      { property: "og:title", content: "Team Sign In — Atlas Industrial Systems" },
      { property: "og:description", content: "Access the AIS content and lead workspace." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const inputClass =
  "mt-2 w-full border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate({ to: "/admin" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") navigate({ to: "/admin" });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMessage("Account created. Check your inbox if confirmation is required.");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setMessage("Google sign-in failed. Try email and password.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

  return (
    <>
      <PageHero
        eyebrow="Team access"
        title="Sign in to the AIS workspace."
        lead="Content editing and the project inquiry inbox are restricted to the AIS team."
      />
      <Container className="py-16 md:py-24">
        <div className="max-w-md border border-border bg-surface p-8">
          <div className="flex gap-px border border-border bg-border" role="group">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`flex-1 px-4 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] ${
                  mode === m ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mono-label text-foreground">Work email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mono-label text-foreground">Password</span>
              <input
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-primary px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
            >
              {busy ? "Working…" : mode === "signin" ? "Sign in →" : "Create account →"}
            </button>
          </form>

          <button
            type="button"
            onClick={google}
            disabled={busy}
            className="mt-4 w-full border border-border px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] hover:border-primary hover:text-primary disabled:opacity-60"
          >
            Continue with Google
          </button>

          <p aria-live="polite" className="mt-5 min-h-5 text-sm text-muted-foreground">
            {message}
          </p>
        </div>
      </Container>
    </>
  );
}
