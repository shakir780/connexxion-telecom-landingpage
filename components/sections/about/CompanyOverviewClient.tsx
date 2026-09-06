"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eyebrow, SectionDivider, ArrowLink, Breadcrumb } from "@/components/ui/section-parts";
import TrustLine from "@/components/sections/home/TrustLine";

const EASE_OUT = "easeOut" as const;

/* ─── Page data ───
   Everything here already exists elsewhere on the site — the figures come
   from the home page stats, the capability and sector lists from the footer
   and nav. Kept as data so this overview
   cannot quietly drift out of step with the pages it summarises. */

const FACTS = [
  { label: "Founded", value: "2019" },
  { label: "Headquarters", value: "Abuja, Nigeria" },
  { label: "Platform users", value: "2,500+" },
  { label: "Uptime guarantee", value: "99.9%" },
];

const PILLARS = [
  {
    id: "infrastructure",
    heading: "Infrastructure and managed services",
    body: "We design, install and run the networks organisations depend on — structured cabling, fibre, voice, surveillance and the cloud estate behind them — then keep them running with 24/7/365 support.",
    href: "/services/network-infrastructure",
    linkLabel: "See our services",
  },
  {
    id: "platforms",
    heading: "Our own software platforms",
    body: "Three products built in-house for the sectors we know best: governing bodies and agencies, business operations, and cooperatives. They are ours end to end, so the roadmap answers to the people using them.",
    href: "/products/igov",
    linkLabel: "Explore the products",
  },
  {
    id: "advisory",
    heading: "Consultancy and bespoke build",
    body: "Where an off-the-shelf answer does not fit, we validate the strategy first and build to it — web platforms, applications and internal business systems shaped around how a team actually works.",
    href: "/services/bespoke-software-services",
    linkLabel: "Talk through a project",
  },
];

const CAPABILITIES = [
  { label: "Network Infrastructure", href: "/services/network-infrastructure" },
  { label: "Fibre Optic Solutions", href: "/services/fibre-optic-solutions" },
  { label: "Enterprise VoIP", href: "/services/enterprise-voip" },
  { label: "CCTV & Security", href: "/services/cctv-security" },
  { label: "Server & Cloud Administration", href: "/services/server-cloud-administration" },
  { label: "Managed IT Support", href: "/services/managed-it-support" },
  { label: "Bespoke Software Services", href: "/services/bespoke-software-services" },
];

const PRODUCTS = [
  {
    name: "iGov",
    sector: "Public Sector",
    body: "The all-in-one platform for modern governing bodies and agencies.",
    href: "/products/igov",
  },
  {
    name: "CNX247",
    sector: "Business Operations",
    body: "CRM, HR, payroll, loan automation and document management in one suite.",
    href: "/products/cnx247",
  },
  {
    name: "iCoop",
    sector: "Cooperatives",
    body: "Purpose built for cooperatives — finance, savings and loan applications.",
    href: "/products/icoop",
  },
];

const INDUSTRIES = [
  { label: "Government / Public", href: "/testimonials/government-public" },
  { label: "Cooperatives / Thrift", href: "/testimonials/cooperatives-thrift" },
  { label: "Finance", href: "/testimonials/finance" },
  { label: "SMEs / Corporate", href: "/testimonials/smes-corporate" },
  { label: "Education", href: "/testimonials/education" },
  { label: "Healthcare", href: "/testimonials/healthcare" },
];

/* ─── Shared pieces ─── */

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="max-w-2xl"
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1]"
        style={{ color: "var(--text-1)" }}
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
          {lead}
        </p>
      )}
    </motion.div>
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
          <Breadcrumb
            trail={[
              { label: "Home", href: "/" },
              { label: "About Us" },
              { label: "Company Overview" },
            ]}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
          className="mt-7 max-w-4xl text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
          style={{ color: "var(--text-1)" }}
        >
          Helping public and private sectors transform through technology.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.16 }}
          className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--text-2)" }}
        >
          Connexxion Telecom is an Abuja-based technology company. We build and
          run the networks, platforms and support that organisations depend on
          — for government agencies, cooperatives, financial institutions and
          businesses across Nigeria.
        </motion.p>

        {/* Facts strip — one line of proof rather than four boxed cards */}
        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.24 }}
          className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-y-8 border-t pt-8"
          style={{ borderColor: "var(--border-2)" }}
        >
          {FACTS.map((fact) => (
            <div key={fact.label} className="lg:px-6 lg:first:pl-0">
              <dt
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--text-4)" }}
              >
                {fact.label}
              </dt>
              <dd
                className="mt-2 text-xl sm:text-2xl font-bold tracking-tight"
                style={{ color: "var(--text-1)" }}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

/* ─── What we do — rows rather than three cloned cards ─── */
function Pillars() {
  return (
    <section className="relative" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="What we do"
          title="Three ways we work with an organisation."
          lead="Most clients start with one and grow into the others — the infrastructure, the platform running on it, and the people keeping both alive."
        />

        <div className="mt-12 lg:mt-16 flex flex-col">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.08 }}
              className="grid lg:grid-cols-12 gap-4 lg:gap-10 py-8 lg:py-10 border-t"
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
                className="lg:col-span-4 text-lg sm:text-xl font-bold tracking-tight"
                style={{ color: "var(--text-1)" }}
              >
                {pillar.heading}
              </h3>
              <div className="lg:col-span-7 flex flex-col gap-4 items-start">
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--text-3)" }}
                >
                  {pillar.body}
                </p>
                <ArrowLink href={pillar.href}>{pillar.linkLabel}</ArrowLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Capabilities list beside the product cards ─── */
function CapabilitiesAndProducts() {
  return (
    <section className="relative" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Capabilities" title="What we are asked for most." />
            <ul className="mt-8 flex flex-col">
              {CAPABILITIES.map((cap, i) => (
                <motion.li
                  key={cap.href}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: EASE_OUT, delay: i * 0.04 }}
                  className="border-t"
                  style={{ borderColor: "var(--border-2)" }}
                >
                  <Link
                    href={cap.href}
                    className="group flex items-center justify-between gap-4 py-3.5 text-sm transition-colors duration-200 hover:text-(--text-1)"
                    style={{ color: "var(--text-2)" }}
                  >
                    {cap.label}
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-3.5 h-3.5 shrink-0 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                      style={{ color: "var(--green-text)" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our platforms" title="Software we own, not resell." />
            <div className="mt-8 flex flex-col gap-4">
              {PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.08 }}
                  className="rounded-xl border p-6 transition-colors duration-300 hover:border-[rgba(34,197,94,0.28)]"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-1)" }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: "var(--text-4)" }}
                  >
                    {product.sector}
                  </span>
                  <h3
                    className="mt-3 text-xl font-extrabold tracking-tight"
                    style={{ color: "var(--text-1)" }}
                  >
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                    {product.body}
                  </p>
                  <div className="mt-4">
                    <ArrowLink href={product.href}>Explore {product.name}</ArrowLink>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sectors — a hairline grid, no card chrome ─── */
function Industries() {
  return (
    <section className="relative" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="Sectors"
          title="Where our work lands."
          lead="Six sectors with very different rules about uptime, procurement, and who is accountable when something breaks."
        />

        <div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "var(--border-2)" }}
        >
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.href}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: i * 0.05 }}
              style={{ background: "var(--bg-2)" }}
            >
              <Link
                href={industry.href}
                className="group flex items-center justify-between gap-4 p-6 h-full"
              >
                <span
                  className="text-base font-semibold transition-colors duration-200 group-hover:text-(--text-1)"
                  style={{ color: "var(--text-2)" }}
                >
                  {industry.label}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: "var(--green-text)" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
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
              Tell us what you are trying to fix.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
              A short conversation is usually enough to tell whether this is an
              infrastructure problem, a software one, or neither.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/consultation"
              className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--green-fill)", color: "var(--on-green)" }}
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
export default function CompanyOverviewClient() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* No photographic hero here, so the bar keeps its panel from the
          first paint rather than fading in on scroll. */}
      <Navbar solid />
      <main className="flex-1">
        <PageMasthead />
        <Pillars />
        <CapabilitiesAndProducts />
        <TrustLine />
        <Industries />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
