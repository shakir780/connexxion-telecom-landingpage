"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/team-data";

const EASE_OUT = "easeOut" as const;

/* ─── Dept accent maps ─── */
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
const DEPT_BG: Record<string, string> = {
  Executive:      "rgba(34,197,94,0.1)",
  Technology:     "rgba(99,102,241,0.1)",
  Infrastructure: "rgba(139,92,246,0.1)",
  Finance:        "rgba(20,184,166,0.1)",
  Enterprise:     "rgba(236,72,153,0.1)",
  Operations:     "rgba(14,165,233,0.1)",
  Commercial:     "rgba(245,158,11,0.1)",
  Security:       "rgba(239,68,68,0.1)",
};

/* ─── Icons ─── */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M17.04 17.04h-2.963v-4.64c0-1.107-.02-2.531-1.544-2.531-1.544 0-1.78 1.206-1.78 2.45v4.721H7.79V7.498h2.845v1.305h.04c.396-.75 1.363-1.542 2.807-1.542 3.003 0 3.557 1.976 3.557 4.547v5.232zM4.449 6.193a1.72 1.72 0 110-3.44 1.72 1.72 0 010 3.44zm1.484 10.847H2.963V7.498h2.97v9.542zM18.521 0H1.476C.66 0 0 .645 0 1.441v17.118C0 19.356.66 20 1.476 20h17.045C19.34 20 20 19.356 20 18.559V1.44C20 .645 19.34 0 18.521 0z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M16.99 0H3.01A3.01 3.01 0 000 3.01v13.98A3.01 3.01 0 003.01 20h13.98A3.01 3.01 0 0020 16.99V3.01A3.01 3.01 0 0016.99 0zm-1.63 7.27c.007.1.01.2.01.3 0 3.1-2.36 6.67-6.67 6.67a6.63 6.63 0 01-3.6-1.056 4.72 4.72 0 003.476-.972 2.354 2.354 0 01-2.197-1.633c.35.067.71.053 1.053-.04A2.35 2.35 0 014.85 8.24v-.03c.365.203.78.325 1.222.34A2.352 2.352 0 015.344 5.42a6.678 6.678 0 004.848 2.458 2.352 2.352 0 014.006-2.144 4.715 4.715 0 001.493-.57 2.36 2.36 0 01-1.033 1.3 4.71 4.71 0 001.349-.37 4.782 4.782 0 01-1.167 1.196z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.6}>
      <rect x="1" y="4" width="18" height="13" rx="2" />
      <path d="M1 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 mt-0.5" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l3.5 3.5L13 4" />
    </svg>
  );
}
function StarBullet() {
  return (
    <svg viewBox="0 0 10 10" fill="#22c55e" className="w-2.5 h-2.5 shrink-0 mt-1">
      <path d="M5 1l1.18 2.39L9 3.82 6.9 5.86l.5 2.95L5 7.45 2.6 8.81l.5-2.95L1 3.82l2.82-.43L5 1z" />
    </svg>
  );
}

/* ─── Decorative background ─── */
function ProfileBackground() {
  return (
    <>
      {/* Dot grid — a pattern of 1px dots, not a colour blend */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(34,197,94,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 30% 30%, black 10%, transparent 100%)",
        }}
      />
    </>
  );
}

/* ─── Large avatar ─── */
function ProfileAvatar({ member }: { member: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.15 }}
      className="relative shrink-0"
    >
      {/* Avatar circle */}
      <div
        className="relative w-44 h-44 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: member.avatarColor,
          boxShadow: "0 0 0 3px rgba(34,197,94,0.2), 0 0 0 7px rgba(34,197,94,0.06), 0 24px 60px rgba(0,0,0,0.35)",
        }}
      >
        {/* Grid texture */}
        <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
          <defs>
            <pattern id="av-grid" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#av-grid)" />
        </svg>
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="176px"
            priority
            className="relative z-10 object-cover"
          />
        ) : (
          <span
            className="relative z-10 text-5xl font-black select-none"
            style={{ color: "rgba(255,255,255,0.93)", letterSpacing: "0.06em", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            {member.initials}
          </span>
        )}
      </div>

      {/* Experience badge — only when the figure is actually published */}
      {member.experience !== undefined && (
        <div
          className="absolute -bottom-2 -right-2 flex items-center justify-center w-12 h-12 rounded-full text-xs font-black"
          style={{
            background: "var(--bg-card)",
            border: "2px solid rgba(34,197,94,0.35)",
            color: "#22c55e",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {member.experience}y
        </div>
      )}
    </motion.div>
  );
}

/* ─── Social link button ─── */
function SocialBtn({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
      style={{
        background: "var(--bg-input)",
        border: "1px solid var(--border-1)",
        color: "var(--text-3)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(34,197,94,0.35)";
        el.style.color = "#22c55e";
        el.style.background = "rgba(34,197,94,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-1)";
        el.style.color = "var(--text-3)";
        el.style.background = "var(--bg-input)";
      }}
    >
      {icon}
    </a>
  );
}

/* ─── Expertise chip ─── */
function ExpertiseChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.18)",
        color: "rgba(34,197,94,0.85)",
      }}
    >
      {label}
    </span>
  );
}

/* ─── Section heading used inside the profile ─── */
function ProfileSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-0.5 h-5 rounded-full bg-green-500" />
      <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--text-3)" }}>
        {children}
      </h2>
    </div>
  );
}

/* ─── Main Client Component ─── */
export default function TeamProfileClient({ member }: { member: TeamMember }) {
  const deptText = DEPT_TEXT[member.department] ?? "#22c55e";
  const deptBg   = DEPT_BG[member.department]   ?? "rgba(34,197,94,0.1)";

  return (
    <div className="relative" style={{ background: "var(--bg)" }}>
      {/* ─── Hero Section ─── */}
      <div className="relative overflow-hidden pt-24 pb-16 lg:pb-20">
        <ProfileBackground />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-200"
              style={{ color: "var(--text-3)" }}
            >
              <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 7H2M6 3L2 7l4 4" />
              </svg>
              Back to Team
            </Link>
          </motion.div>

          {/* Hero content */}
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
            {/* Avatar */}
            <ProfileAvatar member={member} />

            {/* Details */}
            <div className="flex flex-col gap-5 flex-1 min-w-0">
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.2 }}
                className="flex items-center gap-2 flex-wrap"
              >
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
                  style={{ background: deptBg, color: deptText }}
                >
                  {member.department}
                </span>
                {member.isLeadership && (
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
                    style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e" }}
                  >
                    <svg viewBox="0 0 12 12" fill="currentColor" className="w-2.5 h-2.5">
                      <path d="M6 1L7.5 4.5H11L8 7L9 10.5L6 8.5L3 10.5L4 7L1 4.5H4.5L6 1Z" />
                    </svg>
                    C‑Suite
                  </span>
                )}
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.25 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
                style={{ color: "var(--text-1)" }}
              >
                {member.name}
              </motion.h1>

              {/* Title */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.32 }}
                className="text-base sm:text-lg font-medium"
                style={{ color: "var(--text-2)" }}
              >
                {member.title}
              </motion.p>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.38 }}
                className="text-sm leading-relaxed max-w-xl"
                style={{ color: "var(--text-3)" }}
              >
                {member.tagline}
              </motion.p>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.44 }}
                className="flex items-center gap-2.5 flex-wrap"
              >
                {member.social.linkedin && (
                  <SocialBtn href={member.social.linkedin} icon={<LinkedInIcon />} label="LinkedIn" />
                )}
                {member.social.twitter && (
                  <SocialBtn href={member.social.twitter} icon={<TwitterIcon />} label="Twitter / X" />
                )}
                {member.social.email && (
                  <SocialBtn href={`mailto:${member.social.email}`} icon={<EmailIcon />} label="Email" />
                )}
                {member.social.email && (
                  <span className="text-xs ml-1" style={{ color: "var(--text-4)" }}>
                    {member.social.email}
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px" style={{ background: "var(--border-1)" }} />
      </div>

      {/* ─── Content body ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* ── Left: Biography + Philosophy ── */}
          <div className="lg:col-span-2 flex flex-col gap-12">

            {/* Biography */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <ProfileSectionHeading>Biography</ProfileSectionHeading>
              <div className="flex flex-col gap-4">
                {member.bio.map((paragraph, i) => (
                  <p key={i} className="text-sm sm:text-base leading-[1.8]" style={{ color: "var(--text-2)" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            {member.achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
              >
                <ProfileSectionHeading>Career Highlights</ProfileSectionHeading>
                <div className="flex flex-col gap-3.5">
                  {member.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Leadership philosophy */}
            {member.philosophy && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
              >
                <ProfileSectionHeading>Leadership Philosophy</ProfileSectionHeading>
                <blockquote
                  className="relative pl-5 py-2"
                  style={{ borderLeft: "3px solid rgba(34,197,94,0.4)" }}
                >
                  <div
                    className="absolute -top-1 left-4 text-6xl leading-none font-serif select-none"
                    style={{ color: "rgba(34,197,94,0.15)" }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <p className="relative text-base sm:text-lg leading-[1.8] font-medium italic" style={{ color: "var(--text-2)" }}>
                    {member.philosophy}
                  </p>
                </blockquote>
              </motion.div>
            )}
          </div>

          {/* ── Right: Expertise / Certifications / Education ── */}
          <div className="flex flex-col gap-10">

            {/* Areas of Expertise */}
            {member.expertise.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.08 }}
              >
                <ProfileSectionHeading>Areas of Expertise</ProfileSectionHeading>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill) => (
                    <ExpertiseChip key={skill} label={skill} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certifications */}
            {member.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.14 }}
              >
                <ProfileSectionHeading>Certifications</ProfileSectionHeading>
                <div className="flex flex-col gap-2.5">
                  {member.certifications.map((cert) => (
                    <div key={cert} className="flex items-start gap-2.5">
                      <StarBullet />
                      <span className="text-sm leading-snug" style={{ color: "var(--text-2)" }}>
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.2 }}
            >
              <ProfileSectionHeading>Education</ProfileSectionHeading>
              <div className="flex flex-col gap-4">
                {member.education.map((edu, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-0.5 pl-3"
                    style={{ borderLeft: "2px solid var(--border-3)" }}
                  >
                    <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text-1)" }}>
                      {edu.degree}
                    </p>
                    {edu.institution && (
                      <p className="text-xs" style={{ color: "var(--text-3)" }}>
                        {edu.institution}
                      </p>
                    )}
                    {edu.year !== undefined && (
                      <p className="text-[11px] font-mono" style={{ color: "var(--text-4)" }}>
                        {edu.year}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.25 }}
              className="rounded-2xl p-5 flex flex-col gap-4"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-1)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="h-px"
                style={{ background: "rgba(34,197,94,0.4)" }}
              />
              {member.experience !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: "var(--text-3)" }}>
                    Industry Experience
                  </span>
                  <span className="text-xl font-black" style={{ color: deptText }}>
                    {member.experience}+
                    <span className="text-sm font-medium ml-1" style={{ color: "var(--text-3)" }}>
                      yrs
                    </span>
                  </span>
                </div>
              )}
              {member.expertise.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: "var(--text-3)" }}>
                    Skill Areas
                  </span>
                  <span className="text-xl font-black" style={{ color: deptText }}>
                    {member.expertise.length}
                  </span>
                </div>
              )}
              {member.certifications.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: "var(--text-3)" }}>
                    Certifications
                  </span>
                  <span className="text-xl font-black" style={{ color: deptText }}>
                    {member.certifications.length}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
