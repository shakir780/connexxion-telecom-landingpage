"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─────────────────────────────────────────────
   Placeholder testimonial copy — swap for the
   real client quotes before this goes live.
───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: "adaeze-okafor",
    quote:
      "Switching to Connexxion transformed how our fleet operations run day to day. Their platform gave us the visibility and reliability we'd been missing for years.",
    name: "Adaeze Okafor",
    role: "COO",
    org: "Logistics",
  },
  {
    id: "bello-mohammed",
    quote:
      "Our members now trust the system because it simply works. Connexxion's team understood our compliance needs from day one and delivered without compromise.",
    name: "Bello Mohammed",
    role: "Secretary-General",
    org: "Federal Cooperative",
  },
  {
    id: "chinedu-ike",
    quote:
      "We evaluated several vendors before choosing Connexxion. Their support responsiveness and platform stability have made them an easy partner to recommend.",
    name: "Chinedu Ike",
    role: "ICT Director",
    org: "Ministry",
  },
];

const AUTO_ADVANCE_MS = 5500;

/* ─── Section header ─── */
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
          Trusted by Organisations
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
        Built for organisations that can&rsquo;t afford friction.
      </motion.h2>
    </div>
  );
}

/* ─── Carousel arrow ─── */
function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-200"
      style={{ border: "1px solid var(--border-2)", color: "var(--text-2)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(34,197,94,0.45)";
        e.currentTarget.style.color = "var(--green-text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-2)";
        e.currentTarget.style.color = "var(--text-2)";
      }}
    >
      {children}
    </button>
  );
}

/* ─── Main Export ─── */
export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = TESTIMONIALS[index];

  const go = useCallback((delta: number) => {
    setIndex((prev) => (prev + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, go]);

  const initials = active.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <SectionHeader />

        {/* The quote is the visual, so it gets the width of the section and a
            hairline instead of a card. No panel, no glow, no quote glyph. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          className="mt-10 sm:mt-14 pt-10 sm:pt-12"
          style={{ borderTop: "1px solid var(--border-2)" }}
        >
          {/* Fixed floor under the slide: the three quotes differ in length,
              and without it the arrows and the proof line jump on every
              transition. */}
          <div className="min-h-60 sm:min-h-56 lg:min-h-56">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <p
                  className="text-xl sm:text-2xl lg:text-[2rem] font-medium leading-[1.4] tracking-tight max-w-4xl"
                  style={{ color: "var(--text-1)" }}
                >
                  &ldquo;{active.quote}&rdquo;
                </p>

                <footer className="mt-8 flex items-center gap-4">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={{
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-2)",
                      color: "var(--text-3)",
                    }}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                  <span className="flex flex-col">
                    <cite
                      className="not-italic text-base font-bold leading-snug"
                      style={{ color: "var(--text-1)" }}
                    >
                      {active.name}
                    </cite>
                    <span className="text-sm leading-snug" style={{ color: "var(--text-3)" }}>
                      {active.role} — {active.org}
                    </span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Proof line and controls share one row so the section stays compact */}
          <div
            className="mt-8 pt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderTop: "1px solid var(--border-2)" }}
          >
            <p className="text-xs sm:text-sm" style={{ color: "var(--text-3)" }}>
              <span className="font-semibold" style={{ color: "var(--text-2)" }}>
                Trusted across
              </span>{" "}
              Government &middot; Business &middot; Cooperatives
            </p>

            <div className="flex items-center gap-5">
              <span
                className="font-mono text-xs tabular-nums"
                style={{ color: "var(--text-3)" }}
                aria-live="polite"
              >
                <span style={{ color: "var(--text-1)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {" / "}
                {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-2">
                <ArrowButton label="Previous testimonial" onClick={() => go(-1)}>
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      d="M14 8a.75.75 0 00-.75-.75H4.56l3.22-3.22a.75.75 0 00-1.06-1.06l-4.5 4.5a.75.75 0 000 1.06l4.5 4.5a.75.75 0 101.06-1.06L4.56 8.75h8.69A.75.75 0 0014 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ArrowButton>
                <ArrowButton label="Next testimonial" onClick={() => go(1)}>
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ArrowButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
