"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─── Animated Counter Hook ─── */
function useCounter(target: number, duration = 2200, active = false, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [active, target, duration]);

  return decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();
}

/* ─── Stat data ─── */
const STATS = [
  {
    id: "experience",
    value: 7,
    decimals: 0,
    suffix: "+",
    label: "Years of Technology Excellence",
    shortLabel: "Years",
    sub: "Since 2019",
    color: "var(--accent-indigo)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.5)",
  },
  {
    id: "users",
    value: 2500,
    decimals: 0,
    suffix: "+",
    label: "Users on Our Platforms",
    shortLabel: "Platform Users",
    sub: undefined,
    color: "var(--accent-teal)",
    bg: "rgba(20,184,166,0.08)",
    border: "rgba(20,184,166,0.5)",
  },
  {
    id: "uptime",
    value: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Platform Uptime Guarantee",
    shortLabel: "Uptime",
    sub: undefined,
    color: "var(--green-text)",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.5)",
  },
];

/* ─── Stat ───
   One horizontal bar rather than three panels: no card background, no accent
   top rule, no per-item border. The three read as a single line of proof,
   divided by hairlines instead of boxed off from each other.

   On phones the three stay on that same line but drop to the short label —
   "Years of Technology Excellence" across a third of a 390px screen wraps to
   three lines and turns the bar into a thicket. */
function Stat({
  stat,
  index,
  active,
}: {
  stat: (typeof STATS)[number];
  index: number;
  active: boolean;
}) {
  const count = useCounter(stat.value, 2200, active, stat.decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: index * 0.1 }}
      className="flex flex-col items-center gap-1.5 px-2 sm:px-6 text-center sm:items-start sm:text-left"
    >
      <div className="flex items-baseline gap-0.5 leading-none">
        <span
          className="text-[28px] sm:text-4xl lg:text-5xl font-black tabular-nums tracking-tight"
          style={{ color: "var(--text-1)" }}
        >
          {count}
        </span>
        <span
          className="text-lg sm:text-2xl lg:text-3xl font-extrabold"
          style={{ color: stat.color }}
        >
          {stat.suffix}
        </span>
      </div>

      <p
        className="text-[11px] sm:text-sm font-semibold leading-snug"
        style={{ color: "var(--text-2)" }}
      >
        <span className="sm:hidden">{stat.shortLabel}</span>
        <span className="hidden sm:inline">{stat.label}</span>
      </p>

      {stat.sub && (
        <p className="hidden sm:block text-xs" style={{ color: "var(--text-3)" }}>
          {stat.sub}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Section divider (reused pattern) ─── */
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
export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <SectionDivider />

      {/* Vertical padding roughly halves on phones — the bar is three short
          lines of type there, and the old card-height rhythm left it floating
          in a band of empty space. */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-9 sm:py-14 lg:py-20">
        <div className="grid grid-cols-3 items-center">
          {STATS.map((stat, i) => (
            <div
              key={stat.id}
              style={i > 0 ? { borderLeft: "1px solid var(--border-2)" } : undefined}
            >
              <Stat stat={stat} index={i} active={statsInView} />
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
