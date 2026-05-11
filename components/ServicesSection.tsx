"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Ease presets ─── */
const EASE_OUT = "easeOut" as const;

/* ─── Service data ─── */
const SERVICES = [
  {
    id: "network-infra",
    title: "Network Infrastructure",
    description:
      "End-to-end design, deployment, and management of carrier-grade network infrastructure engineered for maximum throughput and resilience.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="27" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="27" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="27" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="9.5" y1="14" x2="14" y2="27" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="20.5" y1="14" x2="20.5" y2="27" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="31.5" y1="14" x2="26.5" y2="27" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
        <circle cx="14.5" cy="27" r="1.5" fill="currentColor" />
        <circle cx="26.5" cy="27" r="1.5" fill="currentColor" />
      </svg>
    ),
    tags: ["BGP Routing", "SD-WAN", "MPLS"],
    accent: "#22c55e",
  },
  {
    id: "fiber-optic",
    title: "Fiber Optic Solutions",
    description:
      "Ultra-low latency, symmetrical fiber connectivity with dedicated last-mile delivery for enterprise campuses, data centers, and multi-site organizations.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path d="M4 20 C4 20 8 10 14 18 C20 26 24 10 30 18 C34 24 36 20 36 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 26 C4 26 8 16 14 24 C20 32 24 16 30 24 C34 30 36 26 36 26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M4 14 C4 14 8 4 14 12 C20 20 24 4 30 12 C34 18 36 14 36 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
        <circle cx="36" cy="20" r="2.5" fill="currentColor" />
        <circle cx="4" cy="20" r="2.5" fill="currentColor" />
      </svg>
    ),
    tags: ["10Gbps+", "Dark Fiber", "Last Mile"],
    accent: "#22c55e",
  },
  {
    id: "telecom-support",
    title: "Telecommunications Support",
    description:
      "Round-the-clock NOC monitoring, incident management, and proactive maintenance ensuring your telecom infrastructure stays performant at all times.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        <line x1="20" y1="6" x2="20" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="29" x2="20" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6" y1="20" x2="11" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="29" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tags: ["24/7 NOC", "< 2hr Response", "SLA-backed"],
    accent: "#22c55e",
  },
  {
    id: "managed-it",
    title: "Managed IT Services",
    description:
      "Fully managed technology stacks from cloud hosting and cybersecurity to helpdesk and hardware lifecycle management — freeing your team to focus on core business.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <rect x="4" y="8" width="32" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="26" x2="12" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="26" x2="28" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="32" x2="31" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 17l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tags: ["Cloud", "Cybersecurity", "Helpdesk"],
    accent: "#22c55e",
  },
  {
    id: "wireless",
    title: "Wireless Connectivity",
    description:
      "High-density 5G and Wi-Fi 7 deployments for enterprise campuses, stadiums, and public venues, with centralized management and seamless roaming.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path d="M6 16 a20 20 0 0 1 28 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 21 a14 14 0 0 1 20 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M14 26 a9 9 0 0 1 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="32" r="2.5" fill="currentColor" />
      </svg>
    ),
    tags: ["5G", "Wi-Fi 7", "High Density"],
    accent: "#22c55e",
  },
  {
    id: "enterprise-comms",
    title: "Enterprise Communications",
    description:
      "Unified communications platforms combining VoIP, video conferencing, secure messaging, and collaboration tools into a single integrated ecosystem.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path d="M8 10h24a2 2 0 012 2v12a2 2 0 01-2 2H22l-5 5v-5H8a2 2 0 01-2-2V12a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="13" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="13" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    tags: ["VoIP", "UCaaS", "Video"],
    accent: "#22c55e",
  },
];

/* ─── Background hex pattern ─── */
function HexPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.018 }}
    >
      <defs>
        <pattern id="hex-svc" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
          <polygon
            points="28,4 52,16 52,40 28,52 4,40 4,16"
            fill="none"
            stroke="#22c55e"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-svc)" />
    </svg>
  );
}

/* ─── Section Header ─── */
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
        What We Offer
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
        style={{ color: "var(--text-1)" }}
      >
        Solutions Built for{" "}
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
        style={{ color: "var(--text-2)" }}
      >
        From nationwide fiber backbone to fully managed IT ecosystems — our service
        portfolio covers every layer of the modern enterprise communications stack.
      </motion.p>
    </div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col gap-5 rounded-2xl p-6 cursor-default"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-1)",
        boxShadow: "var(--shadow-md)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.28)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(34,197,94,0.1) inset, 0 0 32px rgba(34,197,94,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
      }}
    >
      {/* Top green accent line — reveals on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)",
        }}
      />

      {/* Ambient glow — hover only */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Icon */}
      <div className="relative">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.18)",
            color: "#22c55e",
            padding: "9px",
          }}
        >
          {service.icon}
        </div>
        {/* Icon glow blob */}
        <div
          className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(34,197,94,0.1) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <h3
          className="text-base font-bold leading-snug transition-colors duration-200 group-hover:text-gray-900 dark:group-hover:text-white"
          style={{ color: "var(--text-1)" }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-3)" }}
        >
          {service.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase"
            style={{
              background: "rgba(34,197,94,0.07)",
              border: "1px solid rgba(34,197,94,0.16)",
              color: "rgba(34,197,94,0.8)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Learn more link */}
      <div className="flex items-center gap-1.5 mt-1">
        <span
          className="text-xs font-semibold transition-colors duration-200"
          style={{ color: "rgba(34,197,94,0.6)" }}
        >
          Learn more
        </span>
        <motion.span
          className="inline-flex"
          style={{ color: "rgba(34,197,94,0.6)" }}
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path
              fillRule="evenodd"
              d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </motion.span>
      </div>

      {/* Corner number */}
      <span
        className="absolute top-5 right-5 text-[11px] font-bold font-mono tabular-nums"
        style={{ color: "var(--text-4)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

/* ─── Bottom CTA strip ─── */
function BottomCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
      className="relative flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-7 mt-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(34,197,94,0.15)",
        boxShadow: "0 0 60px rgba(34,197,94,0.04) inset, 0 8px 40px rgba(0,0,0,0.4)",
      }}
    >
      {/* Glow line */}
      <div
        className="absolute top-0 left-12 right-12 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)",
        }}
      />

      <div className="flex flex-col gap-1 text-center sm:text-left">
        <p className="text-base font-bold" style={{ color: "var(--text-1)" }}>
          Don&apos;t see what you&apos;re looking for?
        </p>
        <p className="text-sm" style={{ color: "var(--text-3)" }}>
          Our solutions engineers will architect a custom package around your exact requirements.
        </p>
      </div>

      <a
        href="#contact"
        className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap overflow-hidden btn-shine shrink-0 transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          color: "#000",
          boxShadow: "0 0 24px rgba(34,197,94,0.3), 0 4px 16px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 40px rgba(34,197,94,0.5), 0 4px 24px rgba(0,0,0,0.4)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 24px rgba(34,197,94,0.3), 0 4px 16px rgba(0,0,0,0.3)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        Speak to an Engineer
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </motion.div>
  );
}

/* ─── Section divider (reused pattern from CompanyOverview) ─── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-2))",
        }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: "rgba(34,197,94,0.5)",
          boxShadow: "0 0 8px rgba(34,197,94,0.5)",
        }}
      />
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, var(--border-2), transparent)",
        }}
      />
    </div>
  );
}

/* ─── Main Export ─── */
export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
      }}
    >
      <SectionDivider />

      {/* Background texture */}
      <HexPattern />

      {/* Ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "0%",
          left: "20%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Header */}
        <SectionHeader />

        {/* Cards grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <BottomCTA />
      </div>

      <SectionDivider />
    </section>
  );
}
