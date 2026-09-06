"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eyebrow, SectionDivider, ArrowRight, Breadcrumb } from "@/components/ui/section-parts";
import { groupSlug, type Solution } from "@/lib/solutions-data";

const EASE_OUT = "easeOut" as const;

/* ─── Shared renderer for every Solutions page ───
   Sibling pages under one category should share a shape — a visitor comparing
   two solutions is comparing content, not learning a second layout. The copy
   lives in lib/solutions-data.ts so adding the next one is a data entry. */

function bookHref(solution: Solution) {
  return `/consultation?topic=${encodeURIComponent(solution.topic)}`;
}

/* ─── Masthead ─── */
function PageMasthead({ solution }: { solution: Solution }) {
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
        {/* "Solutions" stays plain text — there is no top-level index and the
            nav never links one. The group crumb does have a page. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <Breadcrumb
            trail={[
              { label: "Home", href: "/" },
              { label: "Solutions" },
              { label: solution.group, href: `/solutions/${groupSlug(solution.group)}` },
              { label: solution.title },
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
          {solution.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.16 }}
          className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--text-2)" }}
        >
          {solution.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.24 }}
          className="mt-9 flex flex-col sm:flex-row gap-3"
        >
          <Link
            href={bookHref(solution)}
            className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--green-fill)", color: "var(--on-green)" }}
          >
            Book a Consultation
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href={solution.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold transition-colors duration-200"
            style={{ border: "1px solid var(--border-3)", color: "var(--text-1)" }}
          >
            {solution.secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── The problem ─── */
function Problems({ solution }: { solution: Solution }) {
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
          <Eyebrow>The problem</Eyebrow>
          <h2
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-1)" }}
          >
            {solution.problemHeading}
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          {solution.problems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: (i % 2) * 0.06 }}
              className="flex flex-col gap-3 pt-6 border-t"
              style={{ borderColor: "var(--border-2)" }}
            >
              <h3 className="text-base font-bold leading-snug" style={{ color: "var(--text-1)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Capabilities ─── */
function Capabilities({ solution }: { solution: Solution }) {
  return (
    <section className="relative" style={{ background: "var(--bg)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="max-w-2xl"
        >
          <Eyebrow>What it covers</Eyebrow>
          <h2
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-1)" }}
          >
            {solution.capabilityHeading}
          </h2>
        </motion.div>

        <div className="mt-12 lg:mt-16 flex flex-col">
          {solution.capabilities.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: (i % 3) * 0.05 }}
              className="grid lg:grid-cols-12 gap-x-8 gap-y-3 py-7 lg:py-9 border-t"
              style={{ borderColor: "var(--border-2)" }}
            >
              <div className="lg:col-span-2">
                <span
                  className="text-sm font-mono tabular-nums"
                  style={{ color: "var(--green-text)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                className="lg:col-span-4 text-lg font-bold tracking-tight leading-snug"
                style={{ color: "var(--text-1)" }}
              >
                {item.title}
              </h3>
              <p className="lg:col-span-6 text-base leading-relaxed" style={{ color: "var(--text-3)" }}>
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Where it runs ─── */
function WhereItRuns({ solution }: { solution: Solution }) {
  return (
    <section className="relative" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-4">
            <Eyebrow>{solution.whereEyebrow ?? "Where it runs"}</Eyebrow>
            <h2
              className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]"
              style={{ color: "var(--text-1)" }}
            >
              {solution.whereHeading}
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <p className="text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
              {solution.whereBody}
            </p>

            {solution.delivery && (
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {solution.delivery.map((d) => (
                  <div
                    key={d.title}
                    className="flex flex-col gap-2 pt-5 border-t"
                    style={{ borderColor: "var(--border-2)" }}
                  >
                    <h3 className="text-base font-bold leading-snug" style={{ color: "var(--text-1)" }}>
                      {d.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {solution.platforms && (
            <div className="grid sm:grid-cols-2 gap-4">
              {solution.platforms.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  className="group flex flex-col gap-2 p-6 rounded-xl border border-(--border-1) hover:border-[rgba(34,197,94,0.28)] transition-colors duration-300"
                  style={{ background: "var(--bg-card)" }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: "var(--text-4)" }}
                  >
                    {p.role}
                  </span>
                  <span className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>
                    {p.name}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                    {p.body}
                  </span>
                  <span
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: "var(--green-text)" }}
                  >
                    Explore {p.name}
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Outcomes + CTA ─── */
function OutcomesAndCTA({ solution }: { solution: Solution }) {
  return (
    <section className="relative" style={{ background: "var(--bg)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-12"
        >
          <div className="lg:col-span-6">
            <Eyebrow>What changes</Eyebrow>
            <ul className="mt-6 flex flex-col gap-4">
              {solution.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--green-text)" }}
                    aria-hidden="true"
                  />
                  <span className="text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]"
              style={{ color: "var(--text-1)" }}
            >
              {solution.closingHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
              {solution.closingBody}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={bookHref(solution)}
                className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--green-fill)", color: "var(--on-green)" }}
              >
                Book a Consultation
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about/why-us"
                className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold transition-colors duration-200"
                style={{ border: "1px solid var(--border-3)", color: "var(--text-1)" }}
              >
                Why Us?
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Export ─── */
export default function SolutionPageClient({ solution }: { solution: Solution }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* No photographic hero here, so the bar keeps its panel from the
          first paint rather than fading in on scroll. */}
      <Navbar solid />
      <main className="flex-1">
        <PageMasthead solution={solution} />
        <Problems solution={solution} />
        <Capabilities solution={solution} />
        <WhereItRuns solution={solution} />
        <OutcomesAndCTA solution={solution} />
      </main>
      <Footer />
    </div>
  );
}
