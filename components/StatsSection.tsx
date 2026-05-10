"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─── Animated Counter Hook ─── */
function useCounter(target: number, duration = 2400, active = false) {
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

/* ─── Icons ─── */
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}>
    <rect x="3" y="4" width="18" height="18" rx="2.5" />
    <line x1="3" y1="9" x2="21" y2="9" strokeLinecap="round" />
    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
    <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
    <rect x="7" y="13" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}>
    <circle cx="12" cy="12" r="9" />
    <path d="M2 12h20M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" strokeLinecap="round" />
  </svg>
);
const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}>
    <path d="M3 21h18M5 21V7l7-4 7 4v14" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="9" y="13" width="2" height="4" rx="0.5" />
    <rect x="13" y="13" width="2" height="4" rx="0.5" />
    <rect x="9" y="8" width="2" height="3" rx="0.5" />
    <rect x="13" y="8" width="2" height="3" rx="0.5" />
  </svg>
);
const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconActivity = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconHeadset = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}>
    <path d="M3 11a9 9 0 1118 0" strokeLinecap="round" />
    <rect x="2" y="11" width="4" height="7" rx="1.5" />
    <rect x="18" y="11" width="4" height="7" rx="1.5" />
    <path d="M22 18v1a4 4 0 01-4 4h-3" strokeLinecap="round" />
  </svg>
);
const IconAward = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}>
    <circle cx="12" cy="9" r="6" />
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/* ─── Stat data ─── */
const STATS = [
  {
    id: "experience",
    Icon: IconCalendar,
    value: 15,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Years of Experience",
    sub: "Industry-proven expertise",
    color: "#22c55e",
  },
  {
    id: "coverage",
    Icon: IconMap,
    value: 47,
    prefix: "",
    suffix: "",
    decimals: 0,
    label: "States Covered",
    sub: "Nationwide network reach",
    color: "#22c55e",
  },
  {
    id: "clients",
    Icon: IconBuilding,
    value: 500,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Enterprise Clients",
    sub: "Trusted by industry leaders",
    color: "#22c55e",
  },
  {
    id: "projects",
    Icon: IconCheckCircle,
    value: 1200,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Projects Delivered",
    sub: "On time and on budget",
    color: "#22c55e",
  },
  {
    id: "uptime",
    Icon: IconActivity,
    value: 99,
    prefix: "",
    suffix: ".9%",
    decimals: 0,
    label: "Network Uptime SLA",
    sub: "Carrier-grade reliability",
    color: "#22c55e",
  },
  {
    id: "support",
    Icon: IconHeadset,
    value: 24,
    prefix: "",
    suffix: "/7",
    decimals: 0,
    label: "Technical Support",
    sub: "Always-on NOC monitoring",
    color: "#22c55e",
  },
];

/* ─── Achievement badges ─── */
const BADGES = [
  { Icon: IconAward, text: "ISO 27001 Certified" },
  { Icon: IconCheckCircle, text: "SOC 2 Type II" },
  { Icon: IconStar, text: "Top Telecom Provider 2025" },
];

/* ─── Radial glow ring SVG ─── */
function GlowRings() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <radialGradient id="rg-stats" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(34,197,94,0.08)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </radialGradient>
      </defs>
      {/* Central glow blob */}
      <ellipse cx="600" cy="300" rx="440" ry="220" fill="url(#rg-stats)" />
      {/* Rings */}
      {[180, 280, 380].map((r, i) => (
        <circle
          key={i}
          cx="600"
          cy="300"
          r={r}
          stroke="rgba(34,197,94,0.05)"
          strokeWidth={i === 0 ? 1 : 0.6}
          strokeDasharray={i % 2 === 0 ? "6 8" : "3 10"}
          style={{
            animation: `spin-slow ${28 + i * 10}s linear infinite ${i % 2 ? "reverse" : ""}`,
            transformOrigin: "600px 300px",
          }}
        />
      ))}
      {/* Network lines across the section */}
      {[
        { x1: 0, y1: 150, x2: 320, y2: 300 },
        { x1: 320, y1: 300, x2: 600, y2: 300 },
        { x1: 600, y1: 300, x2: 880, y2: 180 },
        { x1: 880, y1: 180, x2: 1200, y2: 220 },
        { x1: 0, y1: 420, x2: 240, y2: 300 },
        { x1: 960, y1: 300, x2: 1200, y2: 400 },
      ].map((l, i) => (
        <line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(34,197,94,0.08)"
          strokeWidth="0.8"
          strokeDasharray="5 6"
          style={{
            animation: `data-flow ${5 + i * 0.8}s linear infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      {/* Node dots at line intersections */}
      {[
        [320, 300], [600, 300], [880, 180], [240, 300], [960, 300],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="rgba(34,197,94,0.35)" />
      ))}
    </svg>
  );
}

/* ─── Animated uptime bar ─── */
function UptimeBar({ active }: { active: boolean }) {
  const segments = 48;
  return (
    <div className="flex gap-0.5 mt-1">
      {Array.from({ length: segments }).map((_, i) => {
        const isDown = i === 11 || i === 22; // 2 "incidents" for realism
        return (
          <motion.div
            key={i}
            className="rounded-sm"
            style={{
              width: "100%",
              height: 12,
              background: isDown ? "rgba(239,68,68,0.6)" : "rgba(34,197,94,0.7)",
            }}
            initial={{ scaleY: 0 }}
            animate={active ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.4, delay: active ? i * 0.012 : 0, ease: EASE_OUT }}
          />
        );
      })}
    </div>
  );
}

/* ─── Main stat card ─── */
function StatCard({
  stat,
  index,
  active,
}: {
  stat: (typeof STATS)[number];
  index: number;
  active: boolean;
}) {
  const count = useCounter(stat.value, 2200, active);
  const isUptime = stat.id === "uptime";
  const isSupport = stat.id === "support";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: EASE_OUT,
        delay: (index % 4) * 0.09 + Math.floor(index / 4) * 0.12,
      }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative flex flex-col gap-4 rounded-2xl p-6 sm:p-7 overflow-hidden cursor-default"
      style={{
        background: "linear-gradient(145deg, rgba(12,18,30,0.92) 0%, rgba(8,12,20,0.96) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.1) inset, 0 0 40px rgba(34,197,94,0.07)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 32px rgba(0,0,0,0.4)";
      }}
    >
      {/* Corner accent glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
          filter: "blur(16px)",
        }}
      />

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.55), transparent)",
        }}
      />

      {/* Icon row */}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{
            background: "rgba(34,197,94,0.09)",
            border: "1px solid rgba(34,197,94,0.2)",
            color: "#22c55e",
          }}
        >
          <stat.Icon />
        </div>
        {/* Live pill for uptime & support */}
        {(isUptime || isSupport) && (
          <div
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#22c55e",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            Live
          </div>
        )}
      </div>

      {/* Number */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline gap-0.5 leading-none">
          {stat.prefix && (
            <span className="text-2xl font-bold" style={{ color: "#22c55e" }}>
              {stat.prefix}
            </span>
          )}
          <span
            className="text-5xl sm:text-6xl font-black tabular-nums tracking-tight"
            style={{ color: "#ffffff", fontVariantNumeric: "tabular-nums" }}
          >
            {count.toLocaleString()}
          </span>
          <span
            className="text-3xl font-extrabold"
            style={{ color: "#22c55e", marginLeft: "1px" }}
          >
            {stat.suffix}
          </span>
        </div>

        {/* Uptime sparkline */}
        {isUptime && <UptimeBar active={active} />}
      </div>

      {/* Label & sub */}
      <div className="flex flex-col gap-1 mt-auto">
        <p
          className="text-sm font-semibold leading-snug"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          {stat.label}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
          {stat.sub}
        </p>
      </div>

      {/* Index watermark */}
      <span
        className="absolute bottom-5 right-5 text-[11px] font-bold font-mono tabular-nums"
        style={{ color: "rgba(255,255,255,0.06)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

/* ─── Featured large stat ─── */
function FeaturedStat({ active }: { active: boolean }) {
  const count = useCounter(98, 2000, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
      className="relative col-span-full rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(14,22,38,0.95) 0%, rgba(8,14,26,0.98) 100%)",
        border: "1px solid rgba(34,197,94,0.15)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.5), 0 0 80px rgba(34,197,94,0.04) inset",
      }}
    >
      {/* Decorative top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(34,197,94,0.45) 40%, rgba(34,197,94,0.45) 60%, transparent 95%)",
        }}
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-10 sm:px-12">
        {/* Left */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <div
            className="inline-flex items-center gap-2 self-center md:self-start px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#22c55e",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            Client Satisfaction
          </div>
          <h3 className="text-2xl font-extrabold" style={{ color: "#ffffff" }}>
            Industry-Leading Satisfaction Score
          </h3>
          <p className="text-sm max-w-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Based on independent surveys across 500+ enterprise accounts. Measured across
            reliability, responsiveness, and service quality.
          </p>
        </div>

        {/* Right — ring gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg viewBox="0 0 140 140" className="w-36 h-36">
            <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            <motion.circle
              cx="70" cy="70" r="58"
              fill="none"
              stroke="#22c55e"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 58}`}
              strokeDashoffset={`${2 * Math.PI * 58 * (1 - count / 100)}`}
              style={{
                transformOrigin: "70px 70px",
                rotate: "-90deg",
                filter: "drop-shadow(0 0 8px rgba(34,197,94,0.6))",
                transition: "stroke-dashoffset 0.05s linear",
              }}
            />
            <text x="70" y="66" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="800" fontFamily="system-ui">
              {count}
            </text>
            <text x="70" y="66" textAnchor="start" fill="#22c55e" fontSize="16" fontWeight="700" fontFamily="system-ui" dx="18" dy="0">
              %
            </text>
            <text x="70" y="84" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="system-ui" letterSpacing="1">
              SATISFACTION
            </text>
          </svg>
          {/* Stars row */}
          <div className="absolute -bottom-2 flex gap-0.5" style={{ color: "#22c55e" }}>
            {[...Array(5)].map((_, i) => <IconStar key={i} />)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Achievement badges row ─── */
function BadgeRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.25 }}
      className="flex flex-wrap justify-center gap-3"
    >
      {BADGES.map(({ Icon, text }, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span style={{ color: "#22c55e" }}>
            <Icon />
          </span>
          {text}
        </div>
      ))}
    </motion.div>
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
        By the Numbers
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
        style={{ color: "#ffffff" }}
      >
        Trusted at{" "}
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
          Enterprise Scale
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.16 }}
        className="text-base lg:text-lg leading-relaxed"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Fifteen years of continuous infrastructure investment, nationwide deployment,
        and unwavering commitment to enterprise reliability — measured in real outcomes.
      </motion.p>
    </div>
  );
}

/* ─── Section divider ─── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06))" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.06), transparent)" }} />
    </div>
  );
}

/* ─── Main Export ─── */
export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080c14 0%, #060a10 40%, #080c14 100%)",
      }}
    >
      <SectionDivider />

      {/* Decorative background */}
      <GlowRings />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(34,197,94,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Header */}
        <SectionHeader />

        {/* Badge strip */}
        <div className="mt-8">
          <BadgeRow />
        </div>

        {/* Featured satisfaction card */}
        <div className="mt-14">
          <FeaturedStat active={statsInView} />
        </div>

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} active={statsInView} />
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Spin keyframe injected inline */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
