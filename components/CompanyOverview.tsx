"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Constants ─── */
const EASE_OUT = "easeOut" as const;
const EASE_IO = "easeInOut" as const;

/* ─── Animated Counter Hook ─── */
function useCounter(target: number, duration = 2200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [active, target, duration]);
  return count;
}

/* ─── Feature icons (inline SVG) ─── */
const IconSignal = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
    <path d="M1.5 8.5a15 15 0 0121 0M5 12a11 11 0 0114 0M8.5 15.5a7 7 0 017 0M12 19h.01" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconServer = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="6" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" />
  </svg>
);
const IconStat1 = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconStat2 = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconStat3 = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
  </svg>
);
const IconStat4 = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Feature list ─── */
const FEATURES = [
  {
    Icon: IconSignal,
    title: "Nationwide Network Coverage",
    desc: "Fiber-optic backbone spanning 47 states with fully redundant, carrier-grade connectivity paths.",
  },
  {
    Icon: IconShield,
    title: "Enterprise-Grade SLA",
    desc: "Industry-leading uptime guarantees backed by 24/7 NOC monitoring and proactive incident response.",
  },
  {
    Icon: IconServer,
    title: "Dedicated Technical Support",
    desc: "Assigned account engineers with direct-line access and sub-2-hour response SLA commitments.",
  },
  {
    Icon: IconGlobe,
    title: "Scalable Infrastructure",
    desc: "Future-proof solutions that seamlessly scale alongside your business from SMB to Fortune 500.",
  },
];

/* ─── Stats ─── */
const STATS = [
  { Icon: IconStat1, value: 15, suffix: "+", label: "Years of Experience" },
  { Icon: IconStat2, value: 99, suffix: ".9%", label: "Network Uptime" },
  { Icon: IconStat3, value: 500, suffix: "+", label: "Enterprise Clients" },
  { Icon: IconStat4, value: 47, suffix: "", label: "States Covered" },
];

/* ─── Network Globe SVG Visualization ─── */
function NetworkGlobe() {
  const nodes = [
    { cx: 200, cy: 80 },   // top
    { cx: 320, cy: 140 },  // top-right
    { cx: 360, cy: 240 },  // right
    { cx: 300, cy: 340 },  // bottom-right
    { cx: 200, cy: 370 },  // bottom
    { cx: 100, cy: 320 },  // bottom-left
    { cx: 55,  cy: 220 },  // left
    { cx: 90,  cy: 130 },  // top-left
    { cx: 200, cy: 220 },  // center
    { cx: 260, cy: 190 },  // inner-right
    { cx: 155, cy: 175 },  // inner-left
    { cx: 235, cy: 295 },  // inner-bottom
  ];

  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],
    [8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],
    [8,9],[8,10],[8,11],[9,1],[9,2],[10,6],[10,7],[11,3],[11,4],
  ];

  return (
    <svg
      viewBox="0 0 400 450"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(34,197,94,0.12))" }}
    >
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(34,197,94,0.12)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </radialGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-sm">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Ambient glow behind globe */}
      <ellipse cx="200" cy="225" rx="160" ry="160" fill="url(#globeGlow)" />

      {/* Concentric rings */}
      {[60, 100, 145, 185].map((r, i) => (
        <circle
          key={i}
          cx="200" cy="225" r={r}
          fill="none"
          stroke="rgba(34,197,94,0.07)"
          strokeWidth={i === 0 ? 0.5 : 1}
          strokeDasharray={i % 2 === 0 ? "4 6" : "2 8"}
        />
      ))}

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(34,197,94,0.18)"
          strokeWidth="0.8"
          strokeDasharray="6 3"
          style={{
            animation: `data-flow ${3 + (i % 4) * 0.6}s linear infinite`,
            animationDelay: `${(i * 0.3) % 2}s`,
          }}
        />
      ))}

      {/* Node glow halos */}
      {nodes.map((n, i) => (
        <circle
          key={`halo-${i}`}
          cx={n.cx} cy={n.cy} r={i === 8 ? 18 : 10}
          fill="rgba(34,197,94,0.06)"
          filter="url(#blur-sm)"
        />
      ))}

      {/* Node dots */}
      {nodes.map((n, i) => (
        <circle
          key={`node-${i}`}
          cx={n.cx} cy={n.cy}
          r={i === 8 ? 5 : i < 8 ? 3.5 : 2.5}
          fill={i === 8 ? "#22c55e" : "rgba(34,197,94,0.75)"}
          style={i === 8 ? {
            filter: "drop-shadow(0 0 6px rgba(34,197,94,0.9))",
          } : undefined}
        />
      ))}

      {/* Ping rings on center node */}
      {[1, 2].map((k) => (
        <circle
          key={`ping-${k}`}
          cx="200" cy="225" r="5"
          fill="none"
          stroke="rgba(34,197,94,0.6)"
          strokeWidth="1.5"
          style={{
            animation: `pulse-ring ${2 + k * 0.8}s cubic-bezier(0.4,0,0.6,1) infinite`,
            animationDelay: `${(k - 1) * 0.9}s`,
          }}
        />
      ))}

      {/* City labels */}
      {[
        { cx: 200, cy: 60, label: "New York" },
        { cx: 348, cy: 130, label: "Chicago" },
        { cx: 32,  cy: 220, label: "Los Angeles" },
        { cx: 200, cy: 395, label: "Miami" },
        { cx: 360, cy: 255, label: "Dallas" },
      ].map((c, i) => (
        <text
          key={i}
          x={c.cx} y={c.cy}
          textAnchor="middle"
          fill="var(--text-4)"
          fontSize="9"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.5"
        >
          {c.label}
        </text>
      ))}
    </svg>
  );
}

/* ─── Floating Stat Card ─── */
function StatCard({
  Icon, value, suffix, label, delay, active,
}: {
  Icon: () => React.ReactElement;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  active: boolean;
}) {
  const count = useCounter(value, 2000, active);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="relative flex flex-col gap-1 px-4 py-3 rounded-xl cursor-default"
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(34,197,94,0.18)",
        boxShadow: "var(--shadow-md)",
        minWidth: "110px",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-px rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)" }}
      />
      <div className="flex items-center gap-2">
        <span style={{ color: "#22c55e" }}>
          <Icon />
        </span>
        <span
          className="text-2xl font-bold tabular-nums"
          style={{ color: "var(--text-1)", lineHeight: 1 }}
        >
          {count}
          <span style={{ color: "#22c55e", fontSize: "0.8em" }}>{suffix}</span>
        </span>
      </div>
      <span className="text-xs font-medium" style={{ color: "var(--text-3)", letterSpacing: "0.04em" }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Right Panel ─── */
function RightPanel({ statsActive }: { statsActive: boolean }) {
  return (
    <div className="relative flex flex-col gap-4 lg:gap-0">
      {/* Main visualization card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-1)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-bl-[80px]"
          style={{
            background: "radial-gradient(circle at top right, rgba(34,197,94,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-tr-[120px]"
          style={{
            background: "radial-gradient(circle at bottom left, rgba(34,197,94,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Top bar */}
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: "1px solid var(--border-2)" }}
        >
          {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
            <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-2 text-xs font-mono" style={{ color: "var(--text-4)", letterSpacing: "0.08em" }}>
            CONNEXXION — NETWORK OPERATIONS CENTER
          </span>
        </div>

        {/* SVG globe */}
        <div className="px-6 py-4" style={{ height: 340 }}>
          <NetworkGlobe />
        </div>

        {/* Bottom status bar */}
        <div
          className="flex items-center justify-between px-5 py-3 gap-4"
          style={{ borderTop: "1px solid var(--border-2)" }}
        >
          {[
            { label: "LATENCY", value: "12ms", ok: true },
            { label: "PACKET LOSS", value: "0.02%", ok: true },
            { label: "ACTIVE NODES", value: "1,247", ok: true },
          ].map(({ label, value, ok }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "var(--text-3)" }}>
                {label}
              </span>
              <span className="text-xs font-bold font-mono" style={{ color: ok ? "#22c55e" : "#ef4444" }}>
                {value}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] font-semibold" style={{ color: "#22c55e" }}>LIVE</span>
          </div>
        </div>
      </motion.div>

      {/* Stat cards grid — overlapping / floating below */}
      <div className="grid grid-cols-2 gap-3 mt-4 lg:absolute lg:-bottom-6 lg:left-0 lg:right-0 lg:px-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} delay={0.3 + i * 0.1} active={statsActive} />
        ))}
      </div>
    </div>
  );
}

/* ─── Left Panel ─── */
function LeftPanel() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase"
        style={{
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.22)",
          color: "#22c55e",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Who We Are
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
      >
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08]"
          style={{ color: "var(--text-1)" }}
        >
          Built on Infrastructure.{" "}
          <br className="hidden sm:block" />
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
            Driven by Innovation.
          </span>
        </h2>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.16 }}
        className="text-base lg:text-lg leading-relaxed max-w-lg"
        style={{ color: "var(--text-2)" }}
      >
        Connexxion Telecom delivers enterprise-grade connectivity solutions powering
        the backbone of America&apos;s most demanding industries. From coast-to-coast
        fiber networks to dedicated managed services, we architect the infrastructure
        that keeps businesses online and ahead.
      </motion.p>

      {/* Feature list */}
      <ul className="flex flex-col gap-4">
        {FEATURES.map(({ Icon, title, desc }, i) => (
          <motion.li
            key={title}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.22 + i * 0.1 }}
            className="flex items-start gap-3.5 group"
          >
            {/* Icon badge */}
            <div
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "#22c55e",
              }}
            >
              <Icon />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
                {title}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                {desc}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.6 }}
        className="flex flex-wrap items-center gap-4 pt-2"
      >
        <a
          href="#solutions"
          className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold overflow-hidden transition-all duration-300 btn-shine"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: "#000",
            boxShadow: "0 0 24px rgba(34,197,94,0.35), 0 4px 16px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 40px rgba(34,197,94,0.55), 0 4px 24px rgba(0,0,0,0.4)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 24px rgba(34,197,94,0.35), 0 4px 16px rgba(0,0,0,0.3)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Explore Our Solutions
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border-3)",
            color: "var(--text-1)",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-input)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-3)";
          }}
        >
          Talk to an Expert
        </a>
      </motion.div>
    </div>
  );
}

/* ─── Section Divider ─── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border-1))" }} />
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "rgba(34,197,94,0.5)", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }}
      />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, var(--border-1), transparent)" }} />
    </div>
  );
}

/* ─── Main Export ─── */
export default function CompanyOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle top separator */}
      <SectionDivider />

      {/* Background grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Ambient glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%", right: "-10%",
          width: 480, height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "5%", left: "-8%",
          width: 360, height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <LeftPanel />

          {/* Right */}
          <div ref={statsRef} className="lg:pt-4 pb-8 lg:pb-16">
            <RightPanel statsActive={statsInView} />
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <SectionDivider />
    </section>
  );
}
