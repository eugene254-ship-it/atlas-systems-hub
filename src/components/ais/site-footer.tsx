import { Link } from "@tanstack/react-router";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Systems",
    links: [
      { label: "Atlas Contain", to: "/systems" },
      { label: "Atlas Fab", to: "/systems" },
      { label: "Atlas Mod", to: "/systems" },
      { label: "Atlas Energy", to: "/systems" },
      { label: "Specifications", to: "/specifications" },
    ],
  },
  {
    title: "Capability",
    links: [
      { label: "Industries", to: "/industries" },
      { label: "Engineering", to: "/engineering" },
      { label: "Projects", to: "/projects" },
      { label: "Intelligence", to: "/intelligence" },
      { label: "Resources", to: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Partners", to: "/partners" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
      { label: "Procurement", to: "/quote" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <p className="display-xl max-w-4xl text-2xl leading-tight md:text-4xl">
          Atlas Industrial Systems — engineering infrastructure that moves industry forward.
        </p>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-4">
          <div>
            <span className="flex h-9 w-9 items-center justify-center border border-primary font-mono text-[0.65rem] font-bold text-primary">
              AIS
            </span>
            <p className="mono-label mt-5 leading-relaxed">
              Design · Fabricate · Integrate · Deploy · Operate
            </p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Industrial systems. Engineered for reality.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mono-label text-foreground">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            © {new Date().getFullYear()} Atlas Industrial Systems (AIS)
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            Privacy · Terms · Procurement · Safety · Sustainability
          </p>
        </div>
      </div>
    </footer>
  );
}
