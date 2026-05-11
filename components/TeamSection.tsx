"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/team-data";

const EASE_OUT = "easeOut" as const;

/* ─── Department color accents ─── */
const DEPT_COLORS: Record<string, string> = {
  Executive:      "rgba(34,197,94,0.15)",
  Technology:     "rgba(99,102,241,0.15)",
  Infrastructure: "rgba(139,92,246,0.15)",
  Finance:        "rgba(20,184,166,0.15)",
  Enterprise:     "rgba(236,72,153,0.15)",
  Operations:     "rgba(14,165,233,0.15)",
  Commercial:     "rgba(245,158,11,0.15)",
  Security:       "rgba(239,68,68,0.15)",
};
const DEPT_TEXT: Record<string, string> = {
  Executive:      "#22c55e",
  Technology:     "#818cf8",
  Infrastructure: "#a78bfa",
  Finance:        "#2dd4bf",
  Enterprise:     "#f472b6",
  Operations:     "#38bdf8",
  Commercial:     "#fbbf24",
  Security:       "#f87171",
};

/* ─── Section divider (consistent with other sections) ─── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border-2))" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, var(--border-2), transparent)" }} />
    </div>
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
        style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.22)", color: "#22c55e" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Our Leadership
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
        style={{ color: "var(--text-1)" }}
      >
        The Minds{" "}
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
          Behind the Network
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
        A leadership team forged across the world's top telecoms, technology, and infrastructure
        organisations — united by a single mission to build Africa's most trusted connectivity company.
      </motion.p>
    </div>
  );
}

/* ─── Avatar panel ─── */
function AvatarPanel({ member }: { member: TeamMember }) {
  return (
    <div
      className="relative h-52 w-full overflow-hidden"
      style={{ background: member.avatarGradient }}
    >
      {/* Radial shimmer overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(255,255,255,0.13) 0%, transparent 70%)",
        }}
      />
      {/* Diagonal grid texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`grid-${member.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${member.id})`} />
      </svg>
      {/* Initials */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-5xl font-black tracking-tight select-none"
          style={{
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            letterSpacing: "0.04em",
          }}
        >
          {member.initials}
        </span>
      </div>
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{ background: "linear-gradient(to top, var(--bg-card), transparent)" }}
      />
      {/* Leadership crown badge */}
      {member.isLeadership && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase"
          style={{
            background: "rgba(34,197,94,0.18)",
            border: "1px solid rgba(34,197,94,0.35)",
            color: "#22c55e",
            backdropFilter: "blur(8px)",
          }}
        >
          <svg viewBox="0 0 12 12" fill="currentColor" className="w-2.5 h-2.5">
            <path d="M6 1L7.5 4.5H11L8 7L9 10.5L6 8.5L3 10.5L4 7L1 4.5H4.5L6 1Z" />
          </svg>
          C‑Suite
        </div>
      )}
    </div>
  );
}

/* ─── Team Member Card ─── */
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const deptColor = DEPT_COLORS[member.department] ?? "rgba(34,197,94,0.1)";
  const deptText  = DEPT_TEXT[member.department]  ?? "#22c55e";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-1)",
        boxShadow: "var(--shadow-md)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(34,197,94,0.3)";
        el.style.boxShadow = "0 12px 48px rgba(0,0,0,0.35), 0 0 32px rgba(34,197,94,0.05) inset";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-1)";
        el.style.boxShadow = "var(--shadow-md)";
      }}
    >
      {/* Top accent line — visible on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)" }}
      />

      {/* Avatar panel */}
      <AvatarPanel member={member} />

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase"
            style={{ background: deptColor, color: deptText }}
          >
            {member.department}
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase"
            style={{ background: "var(--bg-input)", color: "var(--text-3)", border: "1px solid var(--border-1)" }}
          >
            <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth={1.4}>
              <circle cx="5" cy="5" r="4" />
              <path d="M5 3v2l1.5 1" strokeLinecap="round" />
            </svg>
            {member.experience}y
          </span>
        </div>

        {/* Name */}
        <div>
          <h3
            className="text-base font-bold leading-snug"
            style={{ color: "var(--text-1)" }}
          >
            {member.name}
          </h3>
          <p
            className="text-xs font-medium mt-0.5 leading-snug"
            style={{ color: "var(--text-3)" }}
          >
            {member.title}
          </p>
        </div>

        {/* Tagline */}
        <p
          className="text-xs leading-relaxed flex-1"
          style={{ color: "var(--text-3)" }}
        >
          {member.tagline}
        </p>

        {/* Divider */}
        <div className="h-px" style={{ background: "var(--border-1)" }} />

        {/* CTA */}
        <Link
          href={`/team/${member.slug}`}
          className="group/btn inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200"
          style={{ color: "rgba(34,197,94,0.75)" }}
        >
          View Profile
          <motion.span
            className="inline-flex"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.18 }}
          >
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Background hex pattern ─── */
function HexPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.018 }}
    >
      <defs>
        <pattern id="hex-team" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
          <polygon points="28,4 52,16 52,40 28,52 4,40 4,16" fill="none" stroke="#22c55e" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-team)" />
    </svg>
  );
}

/* ─── Main Export ─── */
export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <SectionDivider />

      <HexPattern />

      {/* Ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5%", left: "50%", transform: "translateX(-50%)",
          width: 700, height: 350, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "5%", right: "10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <SectionHeader />

        {/* Team grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
