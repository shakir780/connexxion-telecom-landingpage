"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─────────────────────────────────────────────
   Partner / client logos — pure SVG wordmarks
   so zero external image deps are needed.
───────────────────────────────────────────── */
const PARTNERS: { id: string; label: string; Logo: () => React.ReactElement }[] = [
  {
    id: "cisco",
    label: "Cisco",
    Logo: () => (
      <svg viewBox="0 0 120 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="30" fontSize="28" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="-0.5">Cisco</text>
      </svg>
    ),
  },
  {
    id: "aws",
    label: "Amazon Web Services",
    Logo: () => (
      <svg viewBox="0 0 100 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="28" fontSize="22" fontWeight="800" fontFamily="Arial, sans-serif">AWS</text>
      </svg>
    ),
  },
  {
    id: "microsoft",
    label: "Microsoft",
    Logo: () => (
      <svg viewBox="0 0 160 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="28" fontSize="22" fontWeight="600" fontFamily="'Segoe UI', Arial, sans-serif">Microsoft</text>
      </svg>
    ),
  },
  {
    id: "nokia",
    label: "Nokia",
    Logo: () => (
      <svg viewBox="0 0 120 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="30" fontSize="28" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1">NOKIA</text>
      </svg>
    ),
  },
  {
    id: "ericsson",
    label: "Ericsson",
    Logo: () => (
      <svg viewBox="0 0 160 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="28" fontSize="22" fontWeight="700" fontFamily="Arial, sans-serif">Ericsson</text>
      </svg>
    ),
  },
  {
    id: "ibm",
    label: "IBM",
    Logo: () => (
      <svg viewBox="0 0 80 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="32" fontSize="32" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="3">IBM</text>
      </svg>
    ),
  },
  {
    id: "att",
    label: "AT&T",
    Logo: () => (
      <svg viewBox="0 0 100 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="30" fontSize="26" fontWeight="700" fontFamily="Arial, sans-serif">AT&amp;T</text>
      </svg>
    ),
  },
  {
    id: "oracle",
    label: "Oracle",
    Logo: () => (
      <svg viewBox="0 0 130 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="28" fontSize="24" fontWeight="700" fontFamily="Arial, sans-serif">Oracle</text>
      </svg>
    ),
  },
  {
    id: "juniper",
    label: "Juniper Networks",
    Logo: () => (
      <svg viewBox="0 0 170 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="28" fontSize="20" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="0.5">Juniper Networks</text>
      </svg>
    ),
  },
  {
    id: "vmware",
    label: "VMware",
    Logo: () => (
      <svg viewBox="0 0 140 40" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="29" fontSize="24" fontWeight="700" fontFamily="Arial, sans-serif">VMware</text>
      </svg>
    ),
  },
];

/* ─── Single logo pill ─── */
function LogoPill({ partner, delay }: { partner: (typeof PARTNERS)[number]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="group relative flex items-center justify-center px-7 py-5 rounded-xl cursor-default"
      style={{
        background: "var(--bg-input)",
        border: "1px solid var(--border-1)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(34,197,94,0.25)";
        el.style.background = "rgba(34,197,94,0.04)";
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,197,94,0.08) inset";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-1)";
        el.style.background = "var(--bg-input)";
        el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.25)";
      }}
    >
      {/* Top shimmer on hover */}
      <div
        className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)" }}
      />

      {/* Logo — muted by default, brighter on hover */}
      <div
        className="transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-white"
        style={{ color: "var(--text-3)" }}
        title={partner.label}
      >
        <partner.Logo />
      </div>
    </motion.div>
  );
}

/* ─── Infinite marquee row ─── */
function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  // duplicate for seamless loop
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <div className="relative overflow-hidden">
      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--bg) 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, var(--bg) 0%, transparent 100%)" }}
      />

      <div
        className="flex gap-4 py-2"
        style={{
          width: "max-content",
          animation: `marquee-${reverse ? "reverse" : "forward"} 40s linear infinite`,
        }}
      >
        {items.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="group relative flex items-center justify-center px-8 py-4 rounded-xl shrink-0 cursor-default"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-1)",
              minWidth: 160,
              transition: "border-color 0.3s ease, background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(34,197,94,0.3)";
              el.style.background = "rgba(34,197,94,0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border-1)";
              el.style.background = "var(--bg-input)";
            }}
          >
            <div
              className="transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-white"
              style={{ color: "var(--text-3)" }}
              title={p.label}
            >
              <p.Logo />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Testimonial card ─── */
function TestimonialCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.2 }}
      className="relative max-w-3xl mx-auto rounded-2xl px-8 py-8 sm:px-12"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(34,197,94,0.14)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-12 right-12 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.45), transparent)" }}
      />

      {/* Quote mark */}
      <div
        className="absolute -top-4 left-8 text-6xl font-black leading-none select-none"
        style={{ color: "rgba(34,197,94,0.18)", fontFamily: "Georgia, serif" }}
      >
        "
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(22,163,74,0.15) 100%)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#22c55e",
            }}
          >
            MR
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 16 16" fill="#22c55e" className="w-3.5 h-3.5">
                <path d="M8 1.5l1.84 3.73 4.12.6-2.98 2.9.7 4.1L8 10.77l-3.68 1.94.7-4.1L2.04 5.83l4.12-.6L8 1.5z" />
              </svg>
            ))}
          </div>

          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
            &ldquo;Connexxion&apos;s infrastructure refresh reduced our network latency by 67% and
            gave our engineering team confidence that our backbone will support the next decade
            of growth. Their NOC team is responsive, knowledgeable, and genuinely proactive.&rdquo;
          </p>

          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
              Marcus Reynolds
            </span>
            <span className="text-xs" style={{ color: "var(--text-3)" }}>
              Chief Technology Officer — MidAtlantic Financial Group
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Trust indicators bar ─── */
function TrustBar() {
  const indicators = [
    { value: "500+", label: "Enterprise Clients" },
    { value: "47", label: "States Covered" },
    { value: "99.9%", label: "Avg. Uptime SLA" },
    { value: "15+", label: "Years Trusted" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.3 }}
      className="flex flex-wrap justify-center gap-px rounded-2xl overflow-hidden mt-8"
      style={{ border: "1px solid var(--border-1)" }}
    >
      {indicators.map(({ value, label }, i) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1 px-8 py-5 grow"
          style={{
            background: "var(--bg-input)",
            borderRight: i < indicators.length - 1 ? "1px solid var(--border-1)" : "none",
          }}
        >
          <span
            className="text-2xl font-black tabular-nums"
            style={{ color: "var(--text-1)" }}
          >
            {value}
          </span>
          <span className="text-xs font-medium text-center" style={{ color: "var(--text-3)" }}>
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Background decoration ─── */
function BackgroundDeco() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <radialGradient id="rg-partners" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(34,197,94,0.07)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="600" cy="350" rx="500" ry="260" fill="url(#rg-partners)" />
      {/* Subtle arcing connection lines */}
      {[
        "M 0 350 Q 300 180 600 350 Q 900 520 1200 350",
        "M 0 350 Q 300 520 600 350 Q 900 180 1200 350",
        "M 100 100 Q 400 300 700 150 Q 900 50 1200 200",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="rgba(34,197,94,0.05)"
          strokeWidth="1"
          strokeDasharray="8 6"
          style={{
            animation: `data-flow ${10 + i * 4}s linear infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
      {/* Node dots */}
      {[[600, 350], [300, 260], [900, 260], [150, 350], [1050, 350]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill="rgba(34,197,94,0.3)" />
      ))}
    </svg>
  );
}

/* ─── Section header ─── */
function SectionHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase"
        style={{
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.22)",
          color: "#22c55e",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Partners &amp; Clients
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
        style={{ color: "var(--text-1)" }}
      >
        Trusted by{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #86efac 50%, #22c55e 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-shift 5s ease infinite",
          }}
        >
          Industry Leaders
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.16 }}
        className="text-base lg:text-lg leading-relaxed"
        style={{ color: "var(--text-2)" }}
      >
        From Fortune 500 enterprises to fast-scaling technology companies, the world&apos;s
        most connectivity-dependent organizations rely on Connexxion&apos;s infrastructure
        every single day.
      </motion.p>
    </div>
  );
}

/* ─── Grid logo section (above the fold, static) ─── */
function LogoGrid() {
  // Show the first 8 partners in a responsive grid
  const visible = PARTNERS.slice(0, 8);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {visible.map((p, i) => (
        <LogoPill key={p.id} partner={p} delay={0.06 * i} />
      ))}
    </div>
  );
}

/* ─── Section divider ─── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border-2))" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, var(--border-2), transparent)" }} />
    </div>
  );
}

/* ─── Main Export ─── */
export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
      }}
    >
      <SectionDivider />

      {/* Background decoration */}
      <BackgroundDeco />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 10%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Header */}
        <SectionHeader />

        {/* Logo grid */}
        <div className="mt-14">
          <LogoGrid />
        </div>

        {/* Trust bar */}
        <TrustBar />

        {/* Marquee rows */}
        <div className="mt-14 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          >
            <MarqueeRow reverse={false} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
          >
            <MarqueeRow reverse={true} />
          </motion.div>
        </div>

        {/* Divider label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
          className="flex items-center gap-4 mt-16 mb-10"
        >
          <div className="flex-1 h-px" style={{ background: "var(--border-2)" }} />
          <span
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: "var(--text-4)" }}
          >
            Client Testimonial
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border-2)" }} />
        </motion.div>

        {/* Testimonial */}
        <TestimonialCard />
      </div>

      <SectionDivider />

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee-forward {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
