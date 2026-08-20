import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("border-t border-border py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">{children}</div>
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-5 md:px-10", className)}>{children}</div>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      {(index || eyebrow) && (
        <div className="mono-label mb-5 flex items-center gap-3">
          {index && <span className="text-primary">{index}</span>}
          {index && eyebrow && <span className="h-px w-8 bg-border" aria-hidden="true" />}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}
      <h2 className="display-xl text-3xl md:text-5xl lg:text-[3.4rem]">{title}</h2>
      {lead && <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{lead}</p>}
    </div>
  );
}

export function ActionLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-3 px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors";
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/85",
    outline: "border border-border text-foreground hover:border-primary hover:text-primary",
    ghost: "px-0 text-muted-foreground hover:text-primary",
  } as const;
  return (
    <Link to={to as "/"} className={cn(base, styles[variant], className)}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </span>
  );
}

export function StatusNote({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary">
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-surface">
      <div
        className="pointer-events-none absolute inset-0 grid-field opacity-40"
        aria-hidden="true"
      />
      <Container className="relative py-20 md:py-28">
        <p className="mono-label text-primary">{eyebrow}</p>
        <h1 className="display-xl mt-6 max-w-4xl text-4xl md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{lead}</p>
      </Container>
    </div>
  );
}
