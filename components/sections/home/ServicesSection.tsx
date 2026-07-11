"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─── Ease presets ─── */
const EASE_OUT = "easeOut" as const;

/* ─── Service data ─── */
const SERVICES = [
  {
    id: "network-infrastructure",
    title: "Network Infrastructure",
    description:
      "High-availability design, structured cabling, and LAN/WAN setup for enterprise environments.",
    caseStudyHref: "/insights/case-studies/network-infrastructure",
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
  },
  {
    id: "fibre-optic-solutions",
    title: "Fibre Optic Solutions",
    description:
      "Implementation of high-speed internet fibre networks with ultra low latency, including trenching, splicing, and long-term maintenance.",
    caseStudyHref: "/insights/case-studies/fibre-optic-solutions",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path d="M4 20 C4 20 8 10 14 18 C20 26 24 10 30 18 C34 24 36 20 36 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 26 C4 26 8 16 14 24 C20 32 24 16 30 24 C34 30 36 26 36 26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M4 14 C4 14 8 4 14 12 C20 20 24 4 30 12 C34 18 36 14 36 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
        <circle cx="36" cy="20" r="2.5" fill="currentColor" />
        <circle cx="4" cy="20" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "enterprise-voip",
    title: "Enterprise VoIP",
    description:
      "Scalable voice communication systems for remote and office-based teams, reducing operational telephony costs.",
    caseStudyHref: "/insights/case-studies/enterprise-voip",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path d="M8 10h24a2 2 0 012 2v12a2 2 0 01-2 2H22l-5 5v-5H8a2 2 0 01-2-2V12a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="13" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="13" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "cctv-security",
    title: "CCTV & Security",
    description:
      "Intelligent surveillance systems with remote monitoring capabilities and integration with access control.",
    caseStudyHref: "/insights/case-studies/cctv-security",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <rect x="6" y="14" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="26" cy="20" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="26" cy="20" r="1.4" fill="currentColor" />
        <path d="M6 17l-4-2v10l4-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 26v4M14 34h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M30 10a4 4 0 018 0" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.6" />
        <circle cx="34" cy="10" r="1.3" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "server-cloud-administration",
    title: "Server & Cloud Administration",
    description:
      "Managed hosting, server migration, and infrastructure-as-a-service (IaaS) support for reliable uptime.",
    caseStudyHref: "/insights/case-studies/server-cloud-administration",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path d="M11 22a5 5 0 01.4-9.98A7 7 0 0125 10a6 6 0 015 6 5 5 0 01-1 9.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 22h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="10" y="27" width="20" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="14" cy="30.5" r="1" fill="currentColor" />
        <circle cx="18" cy="30.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "managed-it-support",
    title: "Managed IT Support",
    description:
      "Dedicated 24/7/365 NOC support, troubleshooting, and proactive maintenance for your IT fleet.",
    caseStudyHref: "/insights/case-studies/managed-it-support",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <rect x="4" y="8" width="32" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="26" x2="12" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="26" x2="28" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="32" x2="31" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 17l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ─── Trust badge icons ─── */
const IconHeadset = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.6}>
    <path d="M3 11a9 9 0 1118 0" strokeLinecap="round" />
    <rect x="2" y="11" width="4" height="7" rx="1.5" />
    <rect x="18" y="11" width="4" height="7" rx="1.5" />
    <path d="M22 18v1a4 4 0 01-4 4h-3" strokeLinecap="round" />
  </svg>
);
const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.6}>
    <circle cx="12" cy="12" r="9" />
    <path d="M2 12h20M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" strokeLinecap="round" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.6}>
    <path d="M12 3l8 3.5V11c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6.5L12 3z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Trust badges below the grid ─── */
const TRUST_BADGES = [
  { Icon: IconHeadset, text: "24/7/365 NOC Support" },
  { Icon: IconMap, text: "Nationwide Coverage" },
  { Icon: IconShield, text: "Enterprise-Grade SLAs" },
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
          color: "var(--green-text)",
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
        We Handle the Tech.{" "}
        <span className="gradient-green">You Focus on Business.</span>
      </motion.h2>
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
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card-hover)";
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
            color: "var(--green-text)",
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

      {/* View case study link */}
      <Link
        href={service.caseStudyHref}
        className="group/link inline-flex items-center gap-1.5 mt-auto"
      >
        <span
          className="text-xs font-semibold transition-colors duration-200"
          style={{ color: "var(--green-text)" }}
        >
          View Case Study
        </span>
        <motion.span
          className="inline-flex"
          style={{ color: "var(--green-text)" }}
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
      </Link>

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

/* ─── Trust badges row ─── */
function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      className="flex flex-wrap justify-center gap-3"
    >
      {TRUST_BADGES.map(({ Icon, text }, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold"
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border-1)",
            color: "var(--text-2)",
          }}
        >
          <span style={{ color: "var(--green-text)" }}>
            <Icon />
          </span>
          {text}
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Custom solution CTA ─── */
function CustomSolutionCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.1 }}
      className="flex justify-center"
    >
      <Link
        href="/consultation"
        className="relative group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold overflow-hidden btn-shine transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          color: "#000",
          boxShadow: "0 0 24px rgba(34,197,94,0.3), 0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        Need a Custom Solution?
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
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

        {/* Cards grid — 3 columns, 2 rows */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12">
          <TrustBadges />
        </div>

        {/* Custom solution CTA */}
        <div className="mt-8">
          <CustomSolutionCTA />
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
