import Link from "next/link";

/* ─── Shared section furniture ───
   The eyebrow, the hairline divider and the green arrow link had been copied
   into every interior page. Extracted here so a change to the house style is
   one edit rather than a hunt. */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-7" style={{ background: "rgba(34,197,94,0.55)" }} />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ color: "var(--green-text)" }}
      >
        {children}
      </span>
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="flex-1 h-px"
        style={{ background: "var(--border-2)" }}
      />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)" }} />
      <div
        className="flex-1 h-px"
        style={{ background: "var(--border-2)" }}
      />
    </div>
  );
}

export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-80"
      style={{ color: "var(--green-text)" }}
    >
      {children}
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
    </Link>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* Breadcrumb — interior pages all sit two or three levels down */
export function Breadcrumb({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[11px] font-semibold uppercase tracking-[0.2em]"
      style={{ color: "var(--text-4)" }}
    >
      {trail.map((crumb, i) => {
        const last = i === trail.length - 1;
        return (
          <span key={crumb.label}>
            {i > 0 && <span className="mx-2.5">/</span>}
            {crumb.href && !last ? (
              <Link href={crumb.href} className="transition-colors hover:text-(--text-2)">
                {crumb.label}
              </Link>
            ) : (
              <span style={last ? { color: "var(--green-text)" } : undefined}>
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
