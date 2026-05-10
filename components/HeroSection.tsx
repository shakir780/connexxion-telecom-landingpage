"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const EASE_OUT = "easeOut" as const;
const EASE_IO = "easeInOut" as const;

/* ─── Badge / Eyebrow ─── */
function EyebrowBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.1 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
      style={{
        background: "rgba(34, 197, 94, 0.08)",
        border: "1px solid rgba(34, 197, 94, 0.25)",
        color: "#22c55e",
      }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
      </span>
      Next-Generation Connectivity
    </motion.div>
  );
}

/* ─── Headline ─── */
function Headline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: EASE_OUT, delay: 0.25 }}
      className="mt-6"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
        Connecting the{" "}
        <br className="hidden sm:block" />
        <span
          className="relative inline-block"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #86efac 50%, #22c55e 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-shift 4s ease infinite",
          }}
        >
          World
        </span>{" "}
        at the{" "}
        <br className="hidden sm:block" />
        <span className="text-white">Speed of Tomorrow</span>
      </h1>
    </motion.div>
  );
}

/* ─── Supporting paragraph ─── */
function SubHeading() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.4 }}
      className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed"
      style={{ color: "rgba(160, 174, 192, 0.85)" }}
    >
      Enterprise-grade telecommunications infrastructure built for the demands
      of a hyper-connected era. Ultra-low latency, unmatched reliability, and
      global reach — engineered for your ambitions.
    </motion.p>
  );
}

/* ─── CTA Buttons ─── */
function CTAButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.55 }}
      className="mt-10 flex flex-col sm:flex-row items-center sm:items-start gap-4"
    >
      {/* Primary green button */}
      <Link
        href="#solutions"
        className="relative group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          boxShadow:
            "0 0 30px rgba(34,197,94,0.3), 0 4px 15px rgba(34,197,94,0.2)",
        }}
      >
        {/* Shine sweep */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          }}
        />
        <span className="relative">Explore Solutions</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="relative transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M3 8H13M9 4l4 4-4 4"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* Secondary glassmorphism button */}
      <Link
        href="#contact"
        className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          color: "rgba(240, 244, 248, 0.9)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <span>Talk to Sales</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M13 5.5A5.5 5.5 0 0 1 7.5 11H5l-2 2V9.5A5.5 5.5 0 1 1 13 5.5z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </motion.div>
  );
}

/* ─── Trust indicators ─── */
function TrustIndicators() {
  const items = [
    { value: "99.99%", label: "Uptime SLA" },
    { value: "180+", label: "Countries" },
    { value: "< 5ms", label: "Avg Latency" },
    { value: "10K+", label: "Enterprise Clients" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.75 }}
      className="mt-14 pt-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p className="text-xs tracking-widest uppercase font-semibold mb-6" style={{ color: "rgba(120,130,150,0.8)" }}>
        Trusted by leading enterprises worldwide
      </p>
      <div className="flex flex-wrap gap-x-10 gap-y-5">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col"
          >
            <span
              className="text-2xl font-bold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #22c55e, #86efac)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {item.value}
            </span>
            <span className="text-xs mt-0.5" style={{ color: "rgba(120,130,150,0.9)" }}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Logo strip placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="flex items-center gap-6 mt-8 flex-wrap"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(90,100,115,0.7)" }}>
          Partners:
        </span>
        {["Cisco", "AWS", "Microsoft", "Google Cloud", "Nokia"].map((brand) => (
          <span
            key={brand}
            className="text-xs font-semibold tracking-wide"
            style={{ color: "rgba(130,145,160,0.55)" }}
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── Floating tech visual panel ─── */
function TechVisualPanel() {
  return (
    <motion.div
      className="hidden lg:flex absolute top-1/2 -translate-y-1/2 flex-col gap-4"
      style={{ width: "340px", right: "4%", zIndex: 10 }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.9, ease: EASE_IO }}
    >
      {/* Status card */}
      <div
        className="float rounded-2xl p-5"
        style={{
          background: "rgba(15, 22, 35, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(34, 197, 94, 0.15)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.05)",
          animationDelay: "0s",
        }}
      >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
              Network Status
            </span>
            <span
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color: "#22c55e" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              All Systems Operational
            </span>
          </div>

          {/* Signal bars */}
          {[
            { label: "Core Network", value: 98 },
            { label: "Edge Nodes", value: 94 },
            { label: "Global CDN", value: 100 },
          ].map((item, idx) => (
            <div key={item.label} className="mb-3 last:mb-0">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-500">{item.label}</span>
                <span className="text-zinc-300">{item.value}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #22c55e, #86efac)",
                    width: `${item.value}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ delay: 1.0 + idx * 0.15, duration: 1, ease: EASE_OUT }}
                />
              </div>
            </div>
          ))}
      </div>

      {/* Latency card */}
      <div
        className="float rounded-2xl p-4 self-end w-4/5"
        style={{
          background: "rgba(15, 22, 35, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          animationDelay: "1.5s",
        }}
      >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ background: "rgba(34, 197, 94, 0.12)", border: "1px solid rgba(34, 197, 94, 0.2)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5.5" stroke="#22c55e" strokeWidth="1.3" />
                <path d="M8 5v3l2 1.5" stroke="#22c55e" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Avg. Latency</p>
              <p className="text-xl font-bold text-white">
                2.4
                <span className="text-sm font-normal text-zinc-400 ml-0.5">ms</span>
              </p>
            </div>
          </div>
      </div>

      {/* Data throughput card */}
      <div
        className="float rounded-2xl p-4"
        style={{
          background: "rgba(15, 22, 35, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          animationDelay: "3s",
        }}
      >
          <p className="text-xs text-zinc-500 font-medium mb-3">Live Data Transfer</p>
          <div className="flex items-end gap-1 h-10">
            {[35, 55, 40, 70, 60, 80, 65, 90, 75, 85, 70, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.2 + i * 0.06, duration: 0.4, ease: EASE_OUT }}
                style={{
                  transformOrigin: "bottom",
                  background:
                    i === 11
                      ? "linear-gradient(to top, #22c55e, #86efac)"
                      : "rgba(34, 197, 94, 0.25)",
                  height: `${h}%`,
                  flex: 1,
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-zinc-600">Throughput</span>
            <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>↑ 98.4 Tbps</span>
          </div>
      </div>
    </motion.div>
  );
}

/* ─── Main HeroSection ─── */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated background */}
      <AnimatedBackground />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="lg:max-w-[55%]">
          <EyebrowBadge />
          <Headline />
          <SubHeading />
          <CTAButtons />
          <TrustIndicators />
        </div>

        {/* Floating visual panel (desktop only) */}
        <TechVisualPanel />
      </div>

      {/* Bottom gradient fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #080c14)",
        }}
      />
    </section>
  );
}
