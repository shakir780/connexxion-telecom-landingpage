"use client";

import React from "react";
import { motion } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─── Abstract signal / node background ─── */
function CTABackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <radialGradient id="cta-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(34,197,94,0.14)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </radialGradient>
        <radialGradient id="cta-left-glow" cx="0%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(34,197,94,0.07)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </radialGradient>
        <radialGradient id="cta-right-glow" cx="100%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(34,197,94,0.07)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </radialGradient>
      </defs>

      {/* Glow blobs */}
      <ellipse cx="600" cy="250" rx="420" ry="200" fill="url(#cta-center-glow)" />
      <ellipse cx="0" cy="250" rx="360" ry="300" fill="url(#cta-left-glow)" />
      <ellipse cx="1200" cy="250" rx="360" ry="300" fill="url(#cta-right-glow)" />

      {/* Horizontal signal arcs */}
      {[
        "M -60 250 Q 300 120 600 250 Q 900 380 1260 250",
        "M -60 250 Q 300 380 600 250 Q 900 120 1260 250",
        "M -60 140 Q 250 260 600 180 Q 950 100 1260 200",
        "M -60 360 Q 250 240 600 320 Q 950 400 1260 300",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="rgba(34,197,94,0.08)"
          strokeWidth={i < 2 ? "1" : "0.6"}
          strokeDasharray="8 7"
          style={{
            animation: `data-flow ${12 + i * 3}s linear infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* Nodes */}
      {[
        [600, 250], [200, 200], [1000, 300], [100, 350], [1100, 180], [400, 320], [800, 160],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3" fill="rgba(34,197,94,0.35)" />
          <circle
            cx={cx} cy={cy} r="3"
            fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="1"
            style={{
              animation: `pulse-ring ${2.5 + (i % 3) * 0.8}s cubic-bezier(0.4,0,0.6,1) infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        </g>
      ))}

      {/* Corner decorative lines */}
      <line x1="0" y1="0" x2="200" y2="0" stroke="rgba(34,197,94,0.06)" strokeWidth="1" />
      <line x1="0" y1="0" x2="0" y2="120" stroke="rgba(34,197,94,0.06)" strokeWidth="1" />
      <line x1="1200" y1="500" x2="1000" y2="500" stroke="rgba(34,197,94,0.06)" strokeWidth="1" />
      <line x1="1200" y1="500" x2="1200" y2="380" stroke="rgba(34,197,94,0.06)" strokeWidth="1" />
    </svg>
  );
}

/* ─── Floating badge (top-left decoration) ─── */
function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24, y: 16 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 }}
      className="absolute left-6 bottom-6 sm:left-10 sm:bottom-10 hidden sm:flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(34,197,94,0.18)",
        backdropFilter: "blur(16px)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
      >
        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="#22c55e" strokeWidth={1.8}>
          <circle cx="10" cy="10" r="8" />
          <path d="M2 10h16M10 2a14 14 0 014 8 14 14 0 01-4 8 14 14 0 01-4-8 14 14 0 014-8z" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-bold" style={{ color: "var(--text-1)" }}>47 States Connected</span>
        <span className="text-[10px]" style={{ color: "var(--text-3)" }}>Nationwide backbone</span>
      </div>
    </motion.div>
  );
}

/* ─── Floating badge (right decoration) ─── */
function UptimeBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, y: -16 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.55 }}
      className="absolute right-6 top-6 sm:right-10 sm:top-10 hidden sm:flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(34,197,94,0.18)",
        backdropFilter: "blur(16px)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-[11px] font-bold" style={{ color: "#22c55e" }}>99.9% Uptime</span>
      </div>
      <span className="text-[10px]" style={{ color: "var(--text-3)" }}>SLA Guaranteed</span>
    </motion.div>
  );
}

/* ─── Main Export ─── */
export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
      }}
    >
      {/* Top separator */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border-2))" }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, var(--border-2), transparent)" }} />
      </div>

      {/* Background */}
      <CTABackground />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(34,197,94,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, black 15%, transparent 100%)",
        }}
      />

      {/* Card frame */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="relative rounded-3xl overflow-hidden px-8 py-16 sm:px-16 sm:py-20 lg:py-24 text-center"
          style={{
            background: "var(--bg-card)",
            border: "1px solid rgba(34,197,94,0.14)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.55), 0 0 120px rgba(34,197,94,0.05) inset",
          }}
        >
          {/* Top green accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 5%, rgba(34,197,94,0.5) 35%, rgba(34,197,94,0.5) 65%, transparent 95%)",
            }}
          />

          {/* Floating corner decorations */}
          <FloatingBadge />
          <UptimeBadge />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.22)",
              color: "#22c55e",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Get Connected Today
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.18 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] max-w-4xl mx-auto"
            style={{ color: "var(--text-1)" }}
          >
            Ready to Build the{" "}
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
              Infrastructure
            </span>{" "}
            Your Business Deserves?
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.28 }}
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-2)" }}
          >
            From nationwide fiber deployment to fully managed enterprise connectivity —
            our solutions engineers are ready to architect a tailored solution that keeps
            your business ahead, online, and unstoppable.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.38 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {/* Primary */}
            <a
              href="mailto:info@connexxiontelecom.com"
              className="relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold overflow-hidden btn-shine transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "#000",
                boxShadow: "0 0 32px rgba(34,197,94,0.4), 0 4px 20px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 0 56px rgba(34,197,94,0.6), 0 6px 28px rgba(0,0,0,0.5)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 0 32px rgba(34,197,94,0.4), 0 4px 20px rgba(0,0,0,0.4)";
                el.style.transform = "translateY(0)";
              }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Get in Touch
            </a>

            {/* Secondary */}
            <a
              href="#services"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300"
              style={{
                background: "var(--bg-input)",
                border: "1px solid var(--border-3)",
                color: "var(--text-1)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.08)";
                el.style.borderColor = "rgba(34,197,94,0.4)";
                el.style.color = "#ffffff";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--bg-input)";
                el.style.borderColor = "var(--border-3)";
                el.style.color = "var(--text-1)";
                el.style.transform = "translateY(0)";
              }}
            >
              Explore Our Services
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>

          {/* Trust footnote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-5 mt-10"
          >
            {[
              "No long-term lock-in",
              "Dedicated account engineer",
              "Sub-2hr response SLA",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" stroke="#22c55e" strokeWidth={2}>
                  <path d="M3 8l3.5 3.5 6.5-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-medium" style={{ color: "var(--text-3)" }}>
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
