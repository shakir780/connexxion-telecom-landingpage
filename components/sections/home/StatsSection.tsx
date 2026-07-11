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
    sub: undefined,
    color: "var(--green-text)",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.5)",
  },
];

/* ─── Stat card ─── */
function StatCard({
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: index * 0.1 }}
      className="flex flex-col gap-3 rounded-2xl px-7 py-8"
      style={{
        background: stat.bg,
        borderTop: `4px solid ${stat.border}`,
        borderLeft: "1px solid var(--border-1)",
        borderRight: "1px solid var(--border-1)",
        borderBottom: "1px solid var(--border-1)",
      }}
    >
      <div className="flex items-baseline gap-1 leading-none">
        <span
          className="text-4xl sm:text-5xl font-black tabular-nums tracking-tight"
          style={{ color: "var(--text-1)" }}
        >
          {count}
        </span>
        <span className="text-2xl sm:text-3xl font-extrabold" style={{ color: stat.color }}>
          {stat.suffix}
        </span>
      </div>

      <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text-1)" }}>
        {stat.label}
      </p>

      {stat.sub && (
        <p className="text-xs" style={{ color: "var(--text-3)" }}>
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} active={statsInView} />
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
