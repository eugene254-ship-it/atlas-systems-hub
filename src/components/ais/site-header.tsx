import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Systems", to: "/systems" },
  { label: "Industries", to: "/industries" },
  { label: "Engineering", to: "/engineering" },
  { label: "Projects", to: "/projects" },
  { label: "Intelligence", to: "/intelligence" },
  { label: "About", to: "/about" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border backdrop-blur transition-all",
        scrolled ? "bg-background/95" : "bg-background/70",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 transition-all md:px-10",
          scrolled ? "h-14" : "h-20",
        )}
      >
        <Link to="/" className="flex items-center gap-3" aria-label="Atlas Industrial Systems home">
          <span className="flex h-8 w-8 items-center justify-center border border-primary font-mono text-[0.65rem] font-bold tracking-tight text-primary">
            AIS
          </span>
          <span className="hidden font-display text-sm font-bold uppercase tracking-[0.18em] sm:block">
            Atlas Industrial Systems
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/configure"
            className="border border-border px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors hover:border-primary hover:text-primary"
          >
            Configure
          </Link>
          <Link
            to="/quote"
            className="bg-primary px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Start a project
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center border border-border lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-5 py-3">
            {NAV.concat([
              { label: "Configure", to: "/configure" },
              { label: "Request quote", to: "/quote" },
              { label: "Contact", to: "/contact" },
            ]).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 font-mono text-xs uppercase tracking-[0.16em]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
