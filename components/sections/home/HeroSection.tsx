"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const EASE_OUT = "easeOut" as const;

/* ─── Light-mode decorative hero background ─── */
function HeroLightBackground() {
  return (
    <div className="hero-light-bg absolute inset-0 overflow-hidden">
      {/* Base mesh gradient — soft blue to mint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #eef3ff 0%, #f0f8fb 45%, #ecfaf3 100%)",
        }}
      />

      {/* Top-right signal rings (telecom identity) */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: "-12%", right: "-6%", width: 620, height: 620, opacity: 0.8 }}
        viewBox="0 0 560 560"
        fill="none"
        aria-hidden="true"
      >
        {[250, 195, 140, 88, 42].map((r, i) => (
          <circle
            key={r}
            cx="280" cy="280" r={r}
            stroke={`rgba(34,197,94,${0.09 + i * 0.03})`}
            strokeWidth={i === 4 ? 1.5 : 1}
            strokeDasharray={i % 2 === 0 ? "6 9" : "3 7"}
            fill="none"
          />
        ))}
        {/* Radial spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={280 + Math.cos(rad) * 42}
              y1={280 + Math.sin(rad) * 42}
              x2={280 + Math.cos(rad) * 250}
              y2={280 + Math.sin(rad) * 250}
              stroke="rgba(34,197,94,0.08)"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
          );
        })}
        {/* Center node */}
        <circle cx="280" cy="280" r="16" fill="rgba(34,197,94,0.08)" />
        <circle cx="280" cy="280" r="6"  fill="rgba(34,197,94,0.18)" />
        <circle cx="280" cy="280" r="2.5" fill="#22c55e" opacity="0.7" />
        {/* Orbital node dots */}
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={280 + Math.cos(rad) * 140}
              cy={280 + Math.sin(rad) * 140}
              r="3.5"
              fill="rgba(34,197,94,0.3)"
            />
          );
        })}
      </svg>

      {/* Green ambient glow — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "0%", right: "5%",
          width: 520, height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.17) 0%, rgba(34,197,94,0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Atmospheric green glow directly behind the (centered) headline —
          gives the copy the same "lit from behind" feel as dark mode */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "18%", left: "50%",
          transform: "translateX(-50%)",
          width: 880, height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(34,197,94,0.11) 0%, rgba(34,197,94,0.04) 45%, transparent 72%)",
          filter: "blur(48px)",
        }}
      />

      {/* Indigo ambient glow — bottom left (depth) */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", left: "-8%",
          width: 500, height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          filter: "blur(52px)",
        }}
      />

      {/* Soft center bloom */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%", left: "25%",
          width: 700, height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Dot grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.55 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(34,197,94,0.35)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* Diagonal network line (accent) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.32 }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        {/* Abstract connection lines */}
        <line x1="0"    y1="180" x2="360"  y2="80"   stroke="#22c55e" strokeWidth="0.8" strokeDasharray="8 12" />
        <line x1="360"  y1="80"  x2="720"  y2="200"  stroke="#22c55e" strokeWidth="0.8" strokeDasharray="8 12" />
        <line x1="720"  y1="200" x2="1100" y2="60"   stroke="#22c55e" strokeWidth="0.8" strokeDasharray="8 12" />
        <line x1="1100" y1="60"  x2="1440" y2="180"  stroke="#22c55e" strokeWidth="0.8" strokeDasharray="8 12" />
        {/* Node markers */}
        <circle cx="360"  cy="80"  r="4" fill="rgba(34,197,94,0.35)" />
        <circle cx="720"  cy="200" r="4" fill="rgba(34,197,94,0.35)" />
        <circle cx="1100" cy="60"  r="4" fill="rgba(34,197,94,0.35)" />
      </svg>

      {/* Bottom edge fade to blend with next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(236,250,243,0.6))",
        }}
      />
    </div>
  );
}

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
        color: "var(--green-text)",
      }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
      </span>
      Helping Public and Private Sectors Transform Through Technology
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
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]" style={{ color: "var(--text-1)" }}>
        The{" "}
        <span className="gradient-green relative inline-block">
          Technology
        </span>{" "}
        African Organizations Need.
      </h1>
    </motion.div>
  );
}

/* ─── Rotating product/service tagline ─── */
const TAGLINE_SLIDES = [
  "Software Development.",
  "IT Consultancy.",
  "Smart Hardware Infrastructure.",
];

function TaglineCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % TAGLINE_SLIDES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.35 }}
      className="mt-5 flex flex-wrap items-center justify-center gap-2"
    >
      <span className="text-sm sm:text-base font-medium" style={{ color: "var(--text-3)" }}>
        All Products &amp; Services:
      </span>
      <span className="relative h-6 sm:h-7 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={TAGLINE_SLIDES[index]}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="block text-sm sm:text-base font-semibold tracking-wide"
            style={{ color: "var(--green-text)" }}
          >
            {TAGLINE_SLIDES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.div>
  );
}

/* ─── Supporting sub-headline ─── */
function SubHeading() {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 }}
      className="mt-6 max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed"
      style={{ color: "var(--text-2)" }}
    >
      We bridge the gap between complex enterprise and business challenges
      with simple, full scale digital solutions.
    </motion.h2>
  );
}

/* ─── CTA Buttons ─── */
function CTAButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.6 }}
      className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      {/* Primary green button */}
      <Link
        href="/consultation"
        className="relative group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          boxShadow: "var(--cta-shadow)",
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
        href="/consultation"
        className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "var(--btn-2-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--btn-2-border)",
          color: "var(--text-1)",
          boxShadow: "var(--btn-2-shadow)",
        }}
      >
        <span>Contact Us</span>
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

/* ─── Main HeroSection ─── */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Light-mode decorative background (fades in via CSS) */}
      <HeroLightBackground />

      {/* Animated particle canvas (dimmed in light mode via CSS) */}
      <div className="hero-canvas-wrap absolute inset-0">
        <AnimatedBackground />
      </div>

      {/* Content wrapper — centered single column */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <EyebrowBadge />
          <Headline />
          <TaglineCarousel />
          <SubHeading />
          <CTAButtons />
        </div>
      </div>

      {/* Bottom gradient fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />
    </section>
  );
}
