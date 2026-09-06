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

/* A destination that may be off-site, or may not exist yet.

   next/link is for routes this app owns. An external product site has nothing
   to prefetch and opens in its own tab. And an unlaunched product has nowhere
   to go at all: rather than render a link that goes nowhere, this falls back to
   a plain element carrying the same layout classes, so the card still looks
   right but is not clickable. */
export function SmartLink({
  href,
  className,
  style,
  children,
}: {
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <SmartLink
      href={href}
      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-80"
      style={{ color: "var(--green-text)" }}
    >
      {children}
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
    </SmartLink>
  );
}

/* Shown where an Explore link would be, for a product with no site yet. */
export function ComingSoon() {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-sm font-semibold"
      style={{ color: "var(--text-4)" }}
    >
      Coming soon
    </span>
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
