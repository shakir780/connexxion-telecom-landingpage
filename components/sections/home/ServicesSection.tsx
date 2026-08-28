"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Ease presets ─── */
const EASE_OUT = "easeOut" as const;

/* ─── Service data ───
   Grouped into three bands so seven offerings read as one system rather than
   seven unrelated tiles. Copy is one sentence of business value each — the
   long paragraphs belonged to a card layout that no longer exists.

   Every service keeps its own image: the index on the right drives the single
   large visual on the left, so the imagery is used once, deliberately, instead
   of seven times as a gallery. */
type Service = {
  id: string;
  title: string;
  summary: string;
  group: string;
  image: string;
  imageAlt: string;
  caseStudyHref: string;
};

const GROUPS = [
  { id: "connect", label: "Connect" },
  { id: "compute", label: "Compute" },
  { id: "secure", label: "Secure & Support" },
];

const SERVICES: Service[] = [
  {
    id: "network-infrastructure",
    title: "Network Infrastructure",
    summary: "Reliable LAN/WAN infrastructure designed for growing organisations.",
    group: "connect",
    image: "/images/Network Infrastructure C2.webp",
    imageAlt: "Telecom masts and antennas broadcasting across a city skyline",
    caseStudyHref: "/insights/case-studies/network-infrastructure",
  },
  {
    id: "fibre-optic-solutions",
    title: "Fibre Optic Solutions",
    summary: "High-speed fibre networks built for low latency and long-term reliability.",
    group: "connect",
    image: "/images/Fibre Optics Solutions C2.webp",
    imageAlt: "Fibre optic cables and connectors carrying light through a switch",
    caseStudyHref: "/insights/case-studies/fibre-optic-solutions",
  },
  {
    id: "enterprise-voip",
    title: "Enterprise VoIP",
    summary: "Business communication systems designed for distributed teams.",
    group: "connect",
    image: "/images/Enterprise Voip C2.webp",
    imageAlt: "Desk VoIP handset and headset beside a connected globe",
    caseStudyHref: "/insights/case-studies/enterprise-voip",
  },
  {
    id: "server-cloud-administration",
    title: "Server & Cloud Administration",
    summary: "Managed hosting and migrations that keep critical systems available.",
    group: "compute",
    image: "/images/Server and Cloud Administraion C2.webp",
    imageAlt: "Cloud icons linked to server stacks and workstations",
    caseStudyHref: "/insights/case-studies/server-cloud-administration",
  },
  {
    id: "bespoke-software-services",
    title: "Bespoke Software Services",
    summary: "Custom applications built around the way your team actually works.",
    group: "compute",
    image: "/images/Software Development C1.webp",
    imageAlt: "Developer writing code across multiple screens",
    caseStudyHref: "/insights/case-studies/bespoke-software-services",
  },
  {
    id: "cctv-security",
    title: "CCTV & Security",
    summary: "Surveillance and access control you can monitor from anywhere.",
    group: "secure",
    // PLACEHOLDER: no CCTV photo was supplied, so this borrows the smart
    // hardware shot. Swap in a surveillance image when one exists.
    image: "/images/Smart Hardware Infrastructure C1.webp",
    imageAlt: "Server racks and circuit hardware in a data centre aisle",
    caseStudyHref: "/insights/case-studies/cctv-security",
  },
  {
    id: "managed-it-support",
    title: "Managed IT Support",
    summary: "A 24/7 support desk that resolves issues before your team feels them.",
    group: "secure",
    image: "/images/Managed IT Support C2.webp",
    imageAlt: "Support engineer on a headset working a helpdesk floor",
    caseStudyHref: "/insights/case-studies/managed-it-support",
  },
];

const GROUP_LABEL = Object.fromEntries(GROUPS.map((g) => [g.id, g.label]));

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

const TRUST_BADGES = [
  { Icon: IconHeadset, text: "24/7/365 NOC Support" },
  { Icon: IconMap, text: "Nationwide Coverage" },
  { Icon: IconShield, text: "Enterprise-Grade SLAs" },
];

/* ─── Section header — left-aligned, editorial ─── */
function SectionHeader() {
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-7" style={{ background: "rgba(34,197,94,0.55)" }} />
        <span
          className="text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "var(--green-text)" }}
        >
          What We Offer
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.06 }}
        className="mt-5 text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.05]"
        style={{ color: "var(--text-1)" }}
      >
        From infrastructure to intelligent systems.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.12 }}
        className="mt-5 text-base lg:text-lg leading-relaxed max-w-2xl"
        style={{ color: "var(--text-2)" }}
      >
        We design, deploy and manage the technology that keeps modern
        organisations connected, secure and moving forward.
      </motion.p>
    </div>
  );
}

/* ─── The stage: one large visual, driven by whichever row is active ─── */
function ServiceStage({ service }: { service: Service }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg h-85 sm:h-110 lg:h-full lg:min-h-140"
      style={{ border: "1px solid var(--border-1)" }}
    >
      {/* Every frame stays mounted and crossfades on opacity. Swapping a single
          <Image> by key instead re-mounts it, so each rotation re-fetched the
          next photo and showed an empty stage until it arrived. */}
      {SERVICES.map((s) => {
        const isActive = s.id === service.id;
        return (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{ opacity: isActive ? 1 : 0 }}
            aria-hidden={!isActive}
          >
            <Image
              src={s.image}
              // Described once, on the frame actually on show; the others would
              // otherwise stack seven descriptions into the accessibility tree.
              alt={isActive ? s.imageAlt : ""}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        );
      })}

      {/* Flat-to-dark scrim: the caption sits on photography in both themes, so
          it needs its own ground rather than the page's. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "rgba(6,10,18,0.55)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{ color: "#4ade80" }}
          >
            {GROUP_LABEL[service.group]}
          </span>
          <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {service.title}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.72)" }}>
            {service.summary}
          </p>
          <Link
            href={service.caseStudyHref}
            className="group/cs mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
          >
            View Case Study
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cs:translate-x-1"
              style={{ color: "#4ade80" }}
            >
              <path
                fillRule="evenodd"
                d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Index row — a line of type, not a card ─── */
function ServiceRow({
  service,
  number,
  isActive,
  onActivate,
}: {
  service: Service;
  number: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <li style={{ borderTop: "1px solid var(--border-2)" }}>
      <Link
        href={service.caseStudyHref}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        className="group relative flex items-baseline gap-4 py-4 pr-1"
      >
        {/* Active rule — absolutely placed in the gutter so switching rows
            never nudges the text. It sits outside the row rather than being
            pulled out with a negative margin, which would resolve each row's
            auto width to 16px wider than its column. */}
        <span
          className="absolute -left-3 top-3 bottom-3 w-px origin-top transition-transform duration-300"
          style={{
            background: "var(--green-text)",
            transform: `scaleY(${isActive ? 1 : 0})`,
          }}
        />
        <span
          className="font-mono text-[11px] tabular-nums shrink-0 w-5 transition-colors duration-200"
          style={{ color: isActive ? "var(--green-text)" : "var(--text-4)" }}
        >
          {String(number).padStart(2, "0")}
        </span>
        <span className="flex-1 min-w-0">
          <span
            className="block text-base font-bold leading-snug transition-colors duration-200"
            style={{ color: isActive ? "var(--text-1)" : "var(--text-2)" }}
          >
            {service.title}
          </span>
          <span className="block mt-1 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
            {service.summary}
          </span>
        </span>
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-3.5 h-3.5 shrink-0 self-center opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
          style={{ color: "var(--green-text)" }}
        >
          <path
            fillRule="evenodd"
            d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </li>
  );
}

/* ─── Mobile composition ───
   Below md the desktop's stage-plus-index becomes a tap accordion. The two are
   separate compositions of the same content rather than one layout squeezed
   down: no hover is involved, rows clear the 44px touch minimum, and only one
   panel is open at a time so the section never runs away in length. */
function MobileServiceRow({
  service,
  number,
  isOpen,
  onToggle,
}: {
  service: Service;
  number: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `service-panel-${service.id}`;
  return (
    <li style={{ borderTop: "1px solid var(--border-2)" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 min-h-16 py-4 text-left"
      >
        <span
          className="font-mono text-[11px] tabular-nums shrink-0 w-5 transition-colors duration-200"
          style={{ color: isOpen ? "var(--green-text)" : "var(--text-4)" }}
        >
          {String(number).padStart(2, "0")}
        </span>
        <span
          className="flex-1 text-[17px] font-bold leading-snug transition-colors duration-200"
          style={{ color: isOpen ? "var(--text-1)" : "var(--text-2)" }}
        >
          {service.title}
        </span>
        {/* Plus that becomes a minus — the vertical stroke collapses */}
        <span
          className="relative w-4 h-4 shrink-0"
          style={{ color: isOpen ? "var(--green-text)" : "var(--text-3)" }}
          aria-hidden="true"
        >
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2" style={{ background: "currentColor" }} />
          <span
            className="absolute inset-y-0 left-1/2 w-px transition-transform duration-300"
            style={{
              background: "currentColor",
              transform: `translateX(-50%) scaleY(${isOpen ? 0 : 1})`,
            }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-9">
              <div
                className="relative w-full aspect-video rounded-md overflow-hidden"
                style={{ border: "1px solid var(--border-1)" }}
              >
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--text-3)" }}>
                {service.summary}
              </p>
              <Link
                href={service.caseStudyHref}
                className="mt-2 inline-flex items-center gap-2 min-h-11 text-[15px] font-semibold"
                style={{ color: "var(--green-text)" }}
              >
                View Case Study
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path
                    fillRule="evenodd"
                    d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ─── Trust line — plain type, no chips ─── */
function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      className="flex flex-wrap items-center gap-x-8 gap-y-3"
    >
      {TRUST_BADGES.map(({ Icon, text }, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-2.5 text-xs font-semibold"
          style={{ color: "var(--text-2)" }}
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
    <Link
      href="/consultation"
      className="btn-pill group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-7 min-h-12 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: "var(--green-text)", color: "#04120a" }}
    >
      Need a Custom Solution?
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1">
        <path
          fillRule="evenodd"
          d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}

/* ─── Section divider (reused pattern) ─── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="flex-1 h-px"
        style={{ background: "var(--border-2)" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "rgba(34,197,94,0.5)", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }}
      />
      <div
        className="flex-1 h-px"
        style={{ background: "var(--border-2)" }}
      />
    </div>
  );
}

/* ─── Main Export ─── */
export default function ServicesSection() {
  // The first service is the default feature; hovering or tabbing the index
  // swaps the stage. Touch devices never fire hover, so every row is also a
  // plain link straight to its case study.
  //
  // The selection deliberately sticks rather than resetting on mouse-leave:
  // reaching from a row across to the stage's "View Case Study" would
  // otherwise swap that link's destination mid-reach.
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  // The mobile accordion tracks its own open row: the stage's rotation must
  // not reach across and expand panels under someone's thumb while they read.
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  // Matches the md breakpoint the two compositions switch on, so the timer
  // only runs while the stage it drives is the one on screen.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Cycles the stage on its own so the section still shows its range to
  // someone who never touches it, and hands control straight over the moment
  // they do — pointing at or tabbing into the list holds the current service
  // for as long as they stay there.
  useEffect(() => {
    if (isPaused || !isDesktop) return;
    const timer = setInterval(() => {
      setActiveId((current) => {
        const i = SERVICES.findIndex((s) => s.id === current);
        return SERVICES[(i + 1) % SERVICES.length].id;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isDesktop]);

  return (
    <section id="services" className="relative overflow-hidden" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />

      {/* px-5 on phones: 16px left the rows feeling cramped against the edge */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <SectionHeader />

        {/* Desktop / tablet: the editorial stage-and-index composition.
            Pause covers the stage as well as the index — the rotation must not
            move the "View Case Study" target while it is being reached for. */}
        <div
          className="mt-14 lg:mt-20 hidden md:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="lg:col-span-7"
          >
            <ServiceStage service={active} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {GROUPS.map((group) => (
              <div key={group.id}>
                <div
                  className="text-[10px] font-bold uppercase tracking-[0.24em]"
                  style={{ color: "var(--text-4)" }}
                >
                  {group.label}
                </div>
                <ul className="mt-3">
                  {SERVICES.filter((s) => s.group === group.id).map((service) => (
                    <ServiceRow
                      key={service.id}
                      service={service}
                      number={SERVICES.indexOf(service) + 1}
                      isActive={service.id === activeId}
                      onActivate={() => setActiveId(service.id)}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: the same services as a tap accordion */}
        <div className="mt-10 md:hidden">
          {GROUPS.map((group) => (
            <div key={group.id} className="mb-6 last:mb-0">
              <div
                className="text-[10px] font-bold uppercase tracking-[0.24em]"
                style={{ color: "var(--text-4)" }}
              >
                {group.label}
              </div>
              <ul className="mt-2">
                {SERVICES.filter((s) => s.group === group.id).map((service) => (
                  <MobileServiceRow
                    key={service.id}
                    service={service}
                    number={SERVICES.indexOf(service) + 1}
                    isOpen={openId === service.id}
                    onToggle={() => setOpenId(openId === service.id ? null : service.id)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-14 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <TrustBadges />
          <CustomSolutionCTA />
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
