"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eyebrow, SectionDivider, Breadcrumb } from "@/components/ui/section-parts";

const EASE_OUT = "easeOut" as const;

/* ─── Page data ───
   The mission and vision statements below are drafted from the language the
   site already uses — the "helping public and private sectors transform"
   kicker, the footer tagline, and the service commitments. They read as
   company positions, so they need sign-off from someone who can speak for
   the business before launch. */

const VALUES = [
  {
    id: "uptime",
    title: "Uptime is the product",
    body: "A platform nobody can reach has no features. We design for the failure first — redundancy, monitoring and a support rota — and treat availability as the thing being bought, not a line in a contract.",
  },
  {
    id: "ownership",
    title: "We own what we ship",
    body: "Our three platforms are built in-house rather than resold, so when something needs to change the answer is a roadmap decision, not a support ticket to a vendor in another timezone.",
  },
  {
    id: "plain-language",
    title: "Plain language over jargon",
    body: "Procurement committees and finance directors should be able to follow a proposal without a glossary. If we cannot explain why a piece of infrastructure is needed, it probably is not.",
  },
  {
    id: "proximity",
    title: "On the ground, not offshore",
    body: "Engineers who can be on site matter more than a global support number. Being based in Abuja and working nationwide means the people accountable for a network can stand in front of it.",
  },
  {
    id: "fit",
    title: "The right size of solution",
    body: "The most useful advice we give is often that a client does not need what they came asking for. Validating the strategy before the spend is cheaper for everyone, including us.",
  },
];

const COMMITMENTS = [
  {
    label: "24/7/365 NOC Support",
    body: "A staffed operations centre, not an answering service.",
  },
  {
    label: "Nationwide Coverage",
    body: "Deployment and maintenance across the country, run from Abuja.",
  },
  {
    label: "Enterprise-Grade SLAs",
    body: "Response and resolution targets written down and measured.",
  },
];

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
          <Breadcrumb
            trail={[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about/overview" },
              { label: "Mission" },
            ]}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
          className="mt-7 max-w-3xl text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
          style={{ color: "var(--text-1)" }}
        >
          Why we do this.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.16 }}
          className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--text-2)" }}
        >
          Too much of the technology sold into Nigerian institutions is bought
          on a brochure and abandoned within a year. Our work starts from the
          opposite end: what has to keep running on Monday morning.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── The statement itself, given the room a mission statement deserves ─── */
function MissionStatement() {
  return (
    <section className="relative" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-3">
            <Eyebrow>Our mission</Eyebrow>
          </div>

          <blockquote className="lg:col-span-9">
            <p
              className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-[-0.02em] leading-[1.25]"
              style={{ color: "var(--text-1)" }}
            >
              To help public and private sector organisations transform through
              technology that actually holds — infrastructure they can rely on,
              platforms built for how they really operate, and people who stay
              accountable long after the install is signed off.
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Vision, as a two-column split rather than another statement block ─── */
function Vision() {
  return (
    <section className="relative" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-3">
            <Eyebrow>Our vision</Eyebrow>
          </div>

          <div className="lg:col-span-9 flex flex-col gap-6 max-w-3xl">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.15]"
              style={{ color: "var(--text-1)" }}
            >
              A Nigeria where an institution&apos;s ambition is never limited by
              its technology.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
              An agency should be able to digitise a permit process without a
              two-year procurement cycle. A cooperative should be able to see
              its own books in real time. A growing business should not have to
              choose between a network that works and one it can afford. We
              want the technology to be the least interesting part of that
              story.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Values — a numbered hairline list, not a grid of cards ─── */
function Values() {
  return (
    <section className="relative" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl"
        >
          <Eyebrow>What we hold to</Eyebrow>
          <h2
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-1)" }}
          >
            Five things we will not trade away.
          </h2>
        </motion.div>

        <div className="mt-12 lg:mt-16 flex flex-col">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.06 }}
              className="grid lg:grid-cols-12 gap-3 lg:gap-10 py-7 lg:py-9 border-t"
              style={{ borderColor: "var(--border-2)" }}
            >
              <div className="lg:col-span-1">
                <span
                  className="text-xs font-mono tabular-nums"
                  style={{ color: "var(--green-text)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                className="lg:col-span-4 text-lg font-bold tracking-tight"
                style={{ color: "var(--text-1)" }}
              >
                {value.title}
              </h3>
              <p
                className="lg:col-span-7 text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--text-3)" }}
              >
                {value.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── The commitments those values cash out as ─── */
function Commitments() {
  return (
    <section className="relative" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl"
        >
          <Eyebrow>In practice</Eyebrow>
          <h2
            className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-1)" }}
          >
            What that means on a contract.
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "var(--border-2)" }}>
          {COMMITMENTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.07 }}
              className="p-6 lg:p-7"
              style={{ background: "var(--bg)" }}
            >
              <h3
                className="text-sm font-bold tracking-tight"
                style={{ color: "var(--text-1)" }}
              >
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                {item.body}
              </p>
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
    <section className="relative" style={{ background: "var(--bg-2)" }}>
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
            <Eyebrow>Next step</Eyebrow>
            <h2
              className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
              style={{ color: "var(--text-1)" }}
            >
              Hold us to it.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
              The fastest way to judge any of this is to put a real problem in
              front of us and see what comes back.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/consultation"
              className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--green-text)", color: "var(--on-green)" }}
            >
              Book a Consultation
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/about/overview"
              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold transition-colors duration-200"
              style={{ border: "1px solid var(--border-3)", color: "var(--text-1)" }}
            >
              Company Overview
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Export ─── */
export default function MissionClient() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* No photographic hero here, so the bar keeps its panel from the
          first paint rather than fading in on scroll. */}
      <Navbar solid />
      <main className="flex-1">
        <PageMasthead />
        <MissionStatement />
        <Vision />
        <Values />
        <Commitments />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
