"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrustLine from "@/components/sections/home/TrustLine";
import { Eyebrow, SectionDivider, ArrowRight, Breadcrumb } from "@/components/ui/section-parts";

const EASE_OUT = "easeOut" as const;

/* ─── Page data ───
   Every reason below is anchored to something the business already says or
   does: the three platforms are the ones on the products section, the support
   commitments are the trust badges used site-wide, the country list comes from
   the Group Managing Director's own published statement, and the leadership
   credentials come from his profile. The wording is positioning copy, so it
   still needs sign-off from someone who can speak for the business — but the
   claims underneath it are not invented. */

const REASONS = [
  {
    id: "we-build-it",
    title: "We build the platforms, not just resell them",
    body: "iGov, CNX247 and iCoop are our own products. When a workflow does not fit how your organisation actually operates, that is a roadmap conversation with the people who wrote the code — not a support ticket to a vendor in another timezone.",
  },
  {
    id: "one-party",
    title: "One accountable party for the whole stack",
    body: "The network, the hardware on it, the software running on top and the people who keep it up are all in-house. Nobody gets to point at somebody else when something breaks, because there is nobody else to point at.",
  },
  {
    id: "support",
    title: "Support that answers at 3am",
    body: "A staffed 24/7/365 operations centre rather than an answering service, with response and resolution targets written into the contract and measured against them. Availability is the thing being bought, so we treat it that way.",
  },
  {
    id: "on-the-ground",
    title: "Engineers who can stand in front of the problem",
    body: "Based in Abuja and deploying nationwide. For infrastructure work, somebody who can be on site this week matters far more than a global support number and a ticket reference.",
  },
  {
    id: "reach",
    title: "Local roots, cross-border reach",
    body: "We assist clients both locally and internationally — in Nigeria, Angola, Niger and the USA — so an organisation growing past its home market does not have to change partner to do it.",
  },
  {
    id: "leadership",
    title: "Engineering-led from the top",
    body: "Our Group Managing Director is an Electrical/Electronic engineer with a master of Micro-Processor and Control Engineering, iNARTE certified, and an international adviser on telecommunications integration standards. Technical decisions are understood at board level, not merely delegated.",
  },
];

/* Counted from what the site already sells rather than picked for effect:
   three products, six service lines, four countries in the GMD statement. */
const PROOF = [
  { value: "3", label: "Platforms built in-house" },
  { value: "6", label: "Service lines under one roof" },
  { value: "4", label: "Countries served" },
  { value: "24/7", label: "Staffed NOC, 365 days" },
];

const QUESTIONS = [
  {
    q: "Do you only work with large organisations?",
    a: "No. The platforms scale down as well as up — a cooperative with a few hundred members and a federal agency run on the same software. What changes is the deployment, not the product.",
  },
  {
    q: "Can you work alongside our existing vendors and hardware?",
    a: "Usually, yes. Ripping out working infrastructure is rarely the cheapest answer, and part of our consultancy work is telling clients which of their existing investments to keep.",
  },
  {
    q: "What happens after deployment?",
    a: "The same team stays on it. Managed IT support, server and cloud administration and the NOC are ongoing services, not a handover to a call centre once the install is signed off.",
  },
  {
    q: "Do you deploy outside Abuja?",
    a: "Yes — nationwide, and beyond Nigeria into Angola, Niger and the USA. Abuja is where we are based, not the limit of where we work.",
  },
  {
    q: "What if we are not sure what we need yet?",
    a: "That is the IT consultancy engagement, and it is deliberately the cheapest thing we sell. Validating the strategy before the spend is better for everyone — a project scoped wrong is a project that fails slowly.",
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
              { label: "Why Us?" },
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
          Why organisations pick us.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.16 }}
          className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--text-2)" }}
        >
          Most technology partners can quote you. Fewer are still answering the
          phone in year three. These are the differences that tend to matter
          once the install is signed off.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Proof strip ─── */
function ProofStrip() {
  return (
    <section className="relative" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {PROOF.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.06 }}
              className="flex flex-col gap-2"
            >
              <span
                className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums"
                style={{ color: "var(--text-1)" }}
              >
                {item.value}
              </span>
              <span
                className="text-[11px] font-bold uppercase tracking-[0.16em] leading-snug"
                style={{ color: "var(--text-4)" }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Reasons ───
   Numbered editorial rows rather than another card grid: this page sits
   alongside Overview (pillar cards) and Mission (value cards), and a third
   grid of boxes would make all three read as one long template. */
function Reasons() {
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
          <Eyebrow>The difference</Eyebrow>
          <h2
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-1)" }}
          >
            Six reasons that hold up after the contract is signed.
          </h2>
        </motion.div>

        <div className="mt-12 lg:mt-16 flex flex-col">
          {REASONS.map((reason, i) => (
            <motion.article
              key={reason.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: (i % 3) * 0.06 }}
              className="grid lg:grid-cols-12 gap-x-8 gap-y-3 py-8 lg:py-10 border-t"
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
                className="lg:col-span-4 text-lg sm:text-xl font-bold tracking-tight leading-snug"
                style={{ color: "var(--text-1)" }}
              >
                {reason.title}
              </h3>

              <p
                className="lg:col-span-6 text-base leading-relaxed"
                style={{ color: "var(--text-3)" }}
              >
                {reason.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Questions ─── */
function Questions() {
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
          <Eyebrow>Before you ask</Eyebrow>
          <h2
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-1)" }}
          >
            The questions procurement always asks.
          </h2>
        </motion.div>

        <dl className="mt-12 grid lg:grid-cols-2 gap-x-12 gap-y-10">
          {QUESTIONS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: (i % 2) * 0.06 }}
              className="flex flex-col gap-3"
            >
              <dt className="text-base font-bold leading-snug" style={{ color: "var(--text-1)" }}>
                {item.q}
              </dt>
              <dd
                className="text-sm leading-relaxed pl-4"
                style={{ color: "var(--text-3)", borderLeft: "2px solid var(--border-3)" }}
              >
                {item.a}
              </dd>
            </motion.div>
          ))}
        </dl>
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
            <Eyebrow>Next step</Eyebrow>
            <h2
              className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
              style={{ color: "var(--text-1)" }}
            >
              Test it with a real problem.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
              Bring us something you are actually stuck on. You will get an
              engineer&apos;s answer on the first call, not a brochure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/consultation"
              className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--green-text)", color: "var(--on-green)" }}
            >
              Book a Consultation
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold transition-colors duration-200"
              style={{ border: "1px solid var(--border-3)", color: "var(--text-1)" }}
            >
              Meet the Team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Export ─── */
export default function WhyUsClient() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* No photographic hero here, so the bar keeps its panel from the
          first paint rather than fading in on scroll. */}
      <Navbar solid />
      <main className="flex-1">
        <PageMasthead />
        <ProofStrip />
        <Reasons />
        <TrustLine />
        <Questions />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
