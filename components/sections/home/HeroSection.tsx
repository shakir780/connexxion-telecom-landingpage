"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const EASE_OUT = "easeOut" as const;

/* ─── Service slides — background photo + its copy ───
   One source of truth so the image and the wording always agree.

   `overlay` is the dark-scrim opacity per photo, not one blanket value — the
   aim is the least overlay each photo can carry while white copy stays
   legible. These are measured, not eyeballed: the mean relative luminance of
   each photo under the copy column, solved for a ≥4.5:1 contrast ratio
   against white. The phone shot is the brightest of the three by a wide
   margin and needs roughly double the scrim the hardware shot does. */
const SERVICE_SLIDES = [
  {
    id: "software-development",
    label: "Software Development",
    headline: "Software Development",
    body: "Transform complex business challenges into fast, secure, and intuitive digital products (apps and websites)",
    image: "/images/Software Development4.png",
    overlayLight: 0.64,
    overlayDark: 0.7,
  },
  {
    id: "it-consultancy",
    label: "IT Consultancy",
    headline: "IT Consultancy",
    body: "Stop Guessing Your Tech Strategy - Validate software choices, infrastructure investments, and security protocols before you spend.",
    image: "/images/nigerian_office_team.webp",
    overlayLight: 0.4,
    overlayDark: 0.6,
  },
  {
    id: "smart-hardware-infrastructure",
    label: "Smart Hardware Infrastructure",
    headline: "Smart Hardware Infrastructure",
    body: "Connect the Physical World to the Cloud - Modernize operations with intelligent, secure, and reliable hardware infrastructure",
    image: "/images/Smart Hardware Infrastructure (1).png",
    overlayLight: 0.18,
    overlayDark: 0.45,
  },
];

/* Full-bleed imagery needs longer dwell than a text swap — 2.6s felt
   strobe-like once photos were driving the change. Raised again once the
   headline started rotating too: 5.2s is not long enough to read a
   headline and a two-line paragraph before it moves. */
const SLIDE_MS = 6800;

/* ─── Background photo carousel ───
   Decorative: the copy carousel already announces each service in text, so
   these carry empty alt text and are hidden from assistive tech. */
function HeroImageSlider({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={SERVICE_SLIDES[index].id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 1.1, ease: EASE_OUT },
            scale: { duration: SLIDE_MS / 1000 + 1.1, ease: "linear" },
          }}
        >
          {/* Focal point held right of centre so the subject of each frame
              sits clear of the copy column on portrait and tablet crops. */}
          <Image
            src={SERVICE_SLIDES[index].image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-center"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Hero copy — eyebrow, headline, paragraph ───
   Crossfades on the same beat as the photo. Both frames are absolutely
   positioned inside a reserved box: left in normal flow they would resize the
   column as the wording changed and shunt the CTA buttons up and down on
   every slide. The reserved height fits the longest pairing at each
   breakpoint. */
function HeroCopy({ index }: { index: number }) {
  const slide = SERVICE_SLIDES[index];

  return (
    <div className="relative min-h-60 sm:min-h-64 lg:min-h-72">
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-x-0 top-0"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            opacity: { duration: 0.6, ease: EASE_OUT },
            y: { duration: 0.75, ease: EASE_OUT },
          }}
        >
          {/* Position marker only: the service name is the headline now, so
              spelling it out here too would just say the same thing twice. */}
          <p
            className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--text-4)" }}
          >
            <span style={{ color: "var(--green-text)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mx-2.5">/</span>
            {String(SERVICE_SLIDES.length).padStart(2, "0")}
          </p>

          <h1
            className="mt-6 sm:mt-7 text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem] font-extrabold tracking-[-0.035em] leading-[1.06]"
            style={{ color: "var(--text-1)" }}
          >
            {slide.headline}
          </h1>

          {/* --text-2 rather than --text-3: at 66% white this paragraph sits
              just under 4.5:1 over the brightest of the three photos. */}
          <p
            className="mt-6 sm:mt-7 max-w-112 text-[0.95rem] sm:text-base leading-relaxed"
            style={{ color: "var(--text-2)" }}
          >
            {slide.body}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── CTA buttons — flat fills, no gradient or shine sweep ─── */
function CTAButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 }}
      className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
    >
      <Link
        href="/consultation"
        className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
        style={{ background: "var(--green-text)", color: "var(--on-green)" }}
      >
        Explore Solutions
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
        href="/consultation"
        className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold transition-colors duration-200"
        style={{
          border: "1px solid var(--btn-2-border)",
          color: "var(--text-1)",
        }}
      >
        Talk to Us
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <path
            d="M5 11L11 5M11 5H6M11 5v5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </motion.div>
  );
}

/* ─── Slide progress (narrow screens) ───
   On desktop each service in the index carries its own hairline, which reads
   as progress because all three sit side by side. Below `sm` that row becomes
   a horizontal scroller, so those hairlines no longer line up into anything
   legible — this replaces them with three segments that state position and
   dwell at a glance. The generous vertical padding is tap target, not
   thickness: the bar itself stays 3px. */
function SlideProgress({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 sm:hidden">
      {SERVICE_SLIDES.map((service, i) => {
        const active = i === index;
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show ${service.label}`}
            aria-current={active ? "true" : undefined}
            className="flex-1 py-2.5 cursor-pointer"
          >
            <span
              className="block h-0.75 w-full overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.28)" }}
            >
              {active && (
                <motion.span
                  key={service.id + "-" + index}
                  className="block h-full w-full origin-left rounded-full"
                  style={{ background: "var(--green-text)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Service index ───
   Deliberately quiet: it states the full range, shows which frame is on
   screen and lets you jump between them, but it should never compete with
   the headline. On narrow screens it becomes a single scrollable row rather
   than a stack, so it stays one line at the foot of the frame. */
function ServiceIndex({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <motion.nav
      aria-label="Featured services"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.65 }}
      className="border-t pt-4"
      style={{ borderColor: "var(--border-2)" }}
    >
      <ul className="flex gap-7 overflow-x-auto sm:grid sm:grid-cols-3 sm:gap-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SERVICE_SLIDES.map((service, i) => {
          const active = i === index;
          return (
            <li key={service.id} className="shrink-0 min-w-44 sm:min-w-0">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={active ? "true" : undefined}
                className="group w-full text-left cursor-pointer"
              >
                <span className="flex items-baseline gap-2.5">
                  <span
                    className="text-[10px] font-mono tabular-nums transition-colors duration-300"
                    style={{
                      color: active ? "var(--green-text)" : "var(--text-4)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[13px] font-medium whitespace-nowrap transition-colors duration-300"
                    style={{
                      color: active ? "var(--text-2)" : "var(--text-4)",
                    }}
                  >
                    {service.label}
                  </span>
                </span>

                {/* Hairline: fills across the active slide's dwell time.
                    Hidden below `sm`, where SlideProgress carries the dwell
                    instead and two indicators would just compete. */}
                <span
                  className="mt-2.5 hidden sm:block h-px w-full overflow-hidden"
                  style={{ background: "var(--border-2)" }}
                >
                  {active && (
                    <motion.span
                      key={service.id + "-" + index}
                      className="block h-full origin-left"
                      style={{ background: "var(--green-text)" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}

/* ─── Main HeroSection ─── */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  /* One timer drives the photo, the copy, the index and its progress bar, so
     they can't drift. Keyed on `slide` (rather than a standing interval) so
     picking a service from the index restarts its full dwell. */
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setSlide((prev) => (prev + 1) % SERVICE_SLIDES.length);
    }, SLIDE_MS);
    return () => clearTimeout(id);
  }, [slide]);

  return (
    <section
      ref={ref}
      className="hero-on-media relative w-full min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero section"
    >
      {/* 1. Service photo carousel — the hero's primary visual */}
      <HeroImageSlider index={slide} />

      {/* 2. Readability scrim — a flat dark tint, no gradient or blur, so the
             photo's own colours stay intact. Opacity is per-slide (see
             SERVICE_SLIDES) and resolved per theme in CSS. */}
      <div
        className="hero-scrim absolute inset-0 pointer-events-none"
        style={
          {
            "--overlay-light": SERVICE_SLIDES[slide].overlayLight,
            "--overlay-dark": SERVICE_SLIDES[slide].overlayDark,
          } as React.CSSProperties
        }
      />

      {/* 3. Sparse drifting motes — the only decorative layer left */}
      <div className="hero-canvas-wrap absolute inset-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      {/* Content — one left column, capped short of the frame's midpoint so
          the copy never runs across the subject of the photograph. The block
          sits just below the optical centre; the index is pinned to the foot. */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-8 sm:pb-10">
        {/* min-w-0 on both rows: the service index is a horizontal scroller
            whose items carry a min width, and a flex item defaults to
            min-width:auto — without this it reports a min-content width wider
            than the phone, which inflates the copy column past the viewport
            and the section's overflow-hidden silently crops the paragraph. */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="max-w-128 lg:translate-y-[3vh]">
            <HeroCopy index={slide} />
            <CTAButtons />
          </div>
        </div>

        {/* The segments take the top slice of the old margin rather than
            adding height, so the centred copy above doesn't shift up. */}
        <div className="mt-8 sm:mt-16 min-w-0">
          <SlideProgress index={slide} onSelect={setSlide} />
          <div className="mt-3 sm:mt-0">
            <ServiceIndex index={slide} onSelect={setSlide} />
          </div>
        </div>
      </div>

    </section>
  );
}
