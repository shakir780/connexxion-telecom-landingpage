"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eyebrow, SectionDivider, ArrowRight, Breadcrumb } from "@/components/ui/section-parts";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/team-data";

const EASE_OUT = "easeOut" as const;

const LEADERSHIP = TEAM_MEMBERS.filter((m) => m.isLeadership);
const WIDER_TEAM = TEAM_MEMBERS.filter((m) => !m.isLeadership);

/* The pull quote is a real field on the leadership records rather than copy
   invented for this page — first leader who has one wins. */
const QUOTED = LEADERSHIP.find((m) => m.philosophy);

/* ─── Social icons — only rendered for the links a member actually has ─── */
function SocialIcons({ member }: { member: TeamMember }) {
  const { linkedin, twitter, email } = member.social;
  const items = [
    linkedin && {
      key: "linkedin",
      href: linkedin,
      label: `${member.name} on LinkedIn`,
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    twitter && {
      key: "twitter",
      href: twitter,
      label: `${member.name} on X`,
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    email && {
      key: "email",
      href: `mailto:${email}`,
      label: `Email ${member.name}`,
      path: "M1.5 4.5A1.5 1.5 0 013 3h18a1.5 1.5 0 011.5 1.5v15A1.5 1.5 0 0121 21H3a1.5 1.5 0 01-1.5-1.5v-15zm2.2.75L12 12.2l8.3-6.95H3.7z",
    },
  ].filter(Boolean) as { key: string; href: string; label: string; path: string }[];

  if (!items.length) return null;

  return (
    <div className="flex items-center gap-3">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          aria-label={item.label}
          className="transition-colors duration-200 hover:text-(--green-text)"
          style={{ color: "var(--text-4)" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d={item.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}

/* ─── Portrait ───
   `photo` is optional across the roster, so the flat-colour-and-initials block
   is the real presentation until photography exists, not a broken-image state. */
function Portrait({ member, tall }: { member: TeamMember; tall?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg ${tall ? "aspect-4/5" : "aspect-square"}`}
      style={{ background: member.avatarColor }}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <span
          className="absolute inset-0 flex items-center justify-center font-extrabold tracking-tight"
          style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: tall ? "2.75rem" : "2rem",
          }}
          aria-hidden="true"
        >
          {member.initials}
        </span>
      )}
    </div>
  );
}

/* ─── Masthead ─── */
function PageMasthead() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 85%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-14 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Our Team" }]} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
          className="mt-7 max-w-3xl text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
          style={{ color: "var(--text-1)" }}
        >
          Our Team
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.16 }}
          className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--text-2)" }}
        >
          Through the professional expertise of our team, we provide our
          clientele with international standard services and products built
          around their corporate and personal needs.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Leadership — the larger cards ─── */
function LeadershipGrid() {
  return (
    <section className="relative" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl"
        >
          <Eyebrow>Leadership</Eyebrow>
          <h2
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-1)" }}
          >
            The people accountable for the work.
          </h2>
        </motion.div>

        {/* The column count follows the roster: four across is right for a
            large team and leaves a half-empty row for a small one. */}
        <div
          className={`mt-12 grid gap-6 sm:gap-8 ${
            LEADERSHIP.length <= 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-3xl"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {LEADERSHIP.map((member, i) => (
            <motion.article
              key={member.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.07 }}
              className="group flex flex-col"
            >
              <Link href={`/team/${member.slug}`} className="block">
                <Portrait member={member} tall />
              </Link>

              <div className="mt-5 flex flex-col gap-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--text-4)" }}
                >
                  {member.department}
                </span>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-1)" }}>
                  <Link
                    href={`/team/${member.slug}`}
                    className="transition-opacity duration-200 hover:opacity-80"
                  >
                    {member.name}
                  </Link>
                </h3>
                <p className="text-sm font-semibold" style={{ color: "var(--green-text)" }}>
                  {member.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                  {member.tagline}
                </p>

                <div
                  className="mt-3 pt-4 flex items-center justify-between gap-3 border-t"
                  style={{ borderColor: "var(--border-2)" }}
                >
                  <SocialIcons member={member} />
                  <Link
                    href={`/team/${member.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity duration-200 hover:opacity-80"
                    style={{ color: "var(--text-2)" }}
                  >
                    Profile
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pull quote — a leadership philosophy already in the data ─── */
function PullQuote() {
  if (!QUOTED?.philosophy) return null;

  return (
    <section className="relative" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-3">
            <Eyebrow>In their words</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <blockquote
              className="text-xl sm:text-2xl lg:text-[2rem] font-bold tracking-[-0.02em] leading-[1.3]"
              style={{ color: "var(--text-1)" }}
            >
              &ldquo;{QUOTED.philosophy}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                className="flex items-center justify-center w-10 h-10 rounded-lg text-xs font-bold shrink-0"
                style={{ background: QUOTED.avatarColor, color: "rgba(255,255,255,0.92)" }}
                aria-hidden="true"
              >
                {QUOTED.initials}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>
                  {QUOTED.name}
                </span>
                <span className="text-xs" style={{ color: "var(--text-3)" }}>
                  {QUOTED.title}
                </span>
              </span>
            </figcaption>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}

/* ─── The wider team — compact rows, deliberately not a second card grid ─── */
function WiderTeam() {
  if (!WIDER_TEAM.length) return null;

  return (
    <section className="relative" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl"
        >
          <Eyebrow>Specialists</Eyebrow>
          <h2
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-1)" }}
          >
            The people you will actually work with.
          </h2>
        </motion.div>

        <div className="mt-12 flex flex-col">
          {WIDER_TEAM.map((member, i) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.05 }}
              className="border-t"
              style={{ borderColor: "var(--border-2)" }}
            >
              <Link
                href={`/team/${member.slug}`}
                className="group grid grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_1fr_auto] items-center gap-x-5 gap-y-2 py-6"
              >
                <span
                  className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-lg text-sm font-bold shrink-0 row-span-2 lg:row-span-1"
                  style={{ background: member.avatarColor, color: "rgba(255,255,255,0.92)" }}
                  aria-hidden="true"
                >
                  {member.initials}
                </span>

                <div className="min-w-0">
                  <h3
                    className="text-base font-bold tracking-tight truncate"
                    style={{ color: "var(--text-1)" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-sm truncate" style={{ color: "var(--green-text)" }}>
                    {member.title}
                  </p>
                </div>

                <p
                  className="col-span-2 lg:col-span-1 text-sm leading-relaxed"
                  style={{ color: "var(--text-3)" }}
                >
                  {member.tagline}
                </p>

                <span
                  className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold shrink-0"
                  style={{ color: "var(--text-2)" }}
                >
                  Profile
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Closing CTA ─── */
function ClosingCTA() {
  return (
    <section className="relative" style={{ background: "var(--bg)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <Eyebrow>Get in touch</Eyebrow>
            <h2
              className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
              style={{ color: "var(--text-1)" }}
            >
              How can we help you?
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
              Tell us what you are working on and we will put the right person
              on the call — not a generic account manager.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/consultation"
              className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--green-text)", color: "#04120a" }}
            >
              Book a Consultation
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about/overview"
              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold transition-colors duration-200"
              style={{ border: "1px solid var(--border-3)", color: "var(--text-1)" }}
            >
              About Connexxion
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Export ─── */
export default function TeamIndexClient() {
  return (
    <>
      <PageMasthead />
      <LeadershipGrid />
      <PullQuote />
      <WiderTeam />
      <ClosingCTA />
    </>
  );
}
