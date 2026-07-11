"use client";

import { motion } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─────────────────────────────────────────────
   Client logos — pure SVG wordmarks so zero
   external image deps are needed (same approach
   as PartnersSection).
───────────────────────────────────────────── */
const CLIENTS: { id: string; label: string; Logo: () => React.ReactElement }[] = [
  {
    id: "ramco",
    label: "Ramco Group",
    Logo: () => (
      <div className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 13L9 3l7 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-base font-extrabold tracking-tight">RAMCO</span>
          <span className="text-[8px] font-semibold tracking-[0.2em] opacity-70">GROUP</span>
        </div>
      </div>
    ),
  },
  {
    id: "providusbank",
    label: "ProvidusBank",
    Logo: () => (
      <div className="flex items-center gap-1.5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5L14.5 5v1H1.5V5L8 1.5z" fill="currentColor" />
          <rect x="2.5" y="7" width="2" height="6.5" fill="currentColor" />
          <rect x="7" y="7" width="2" height="6.5" fill="currentColor" />
          <rect x="11.5" y="7" width="2" height="6.5" fill="currentColor" />
          <rect x="1.5" y="14" width="13" height="1.2" fill="currentColor" />
        </svg>
        <span className="text-sm font-bold tracking-tight">ProvidusBank</span>
      </div>
    ),
  },
  {
    id: "shuttlers",
    label: "Shuttlers",
    Logo: () => (
      <div className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="9" cy="9" r="2" fill="currentColor" />
        </svg>
        <span className="text-base font-bold tracking-tight">Shuttlers</span>
      </div>
    ),
  },
  {
    id: "mwanga",
    label: "Mwanga",
    Logo: () => (
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 0l1 5 5 1-5 1-1 5-1-5-5-1 5-1z"
            fill="currentColor"
          />
        </svg>
        <span className="text-base font-semibold tracking-tight lowercase">mwanga</span>
      </div>
    ),
  },
  {
    id: "turaco",
    label: "Turaco",
    Logo: () => (
      <span className="text-base font-extrabold tracking-tight lowercase">turaco</span>
    ),
  },
  {
    id: "sterling",
    label: "Sterling",
    Logo: () => (
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" fill="currentColor" opacity="0.9" />
          <circle cx="10.5" cy="6" r="5" fill="var(--trust-bg, #0b1220)" />
        </svg>
        <span className="text-base font-semibold tracking-tight">Sterling</span>
      </div>
    ),
  },
  {
    id: "wemabank",
    label: "Wema Bank",
    Logo: () => (
      <div className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M1 3l3.5 12L9 6l4.5 9L17 3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-extrabold tracking-tight">WEMA</span>
          <span className="text-[8px] font-semibold tracking-[0.2em] opacity-70">BANK</span>
        </div>
      </div>
    ),
  },
];

/* ─── Main Export ─── */
export default function TrustLine() {
  return (
    <section
      aria-label="Trusted by top businesses and government agencies"
      className="relative"
      style={{ background: "#0b1220" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-8"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Trusted By Top Businesses and Government Agencies in Nigeria
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-6">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.05 * i }}
              title={client.label}
              className="transition-opacity duration-300"
              style={{ color: "rgba(255,255,255,0.72)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
            >
              <client.Logo />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
