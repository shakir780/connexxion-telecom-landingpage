"use client";

import { useEffect, useState } from "react";
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

/* ─── Star rating ─── */
function StarRating() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="#22c55e" className="w-4 h-4">
          <path d="M8 1.5l1.84 3.73 4.12.6-2.98 2.9.7 4.1L8 10.77l-3.68 1.94.7-4.1L2.04 5.83l4.12-.6L8 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Single testimonial card ─── */
function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div
      className="relative max-w-2xl mx-auto rounded-2xl px-8 py-9 sm:px-12"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-1)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Quote mark */}
      <div
        className="absolute -top-4 left-8 text-6xl font-black leading-none select-none"
        style={{ color: "rgba(34,197,94,0.18)", fontFamily: "Georgia, serif" }}
      >
        &ldquo;
      </div>

      <div className="flex flex-col gap-5">
        <StarRating />

        <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-2)" }}>
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.16) 0%, rgba(22,163,74,0.12) 100%)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#16a34a",
            }}
          >
            {initials}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
              {testimonial.name}
            </span>
            <span className="text-xs" style={{ color: "var(--text-3)" }}>
              {testimonial.role} — {testimonial.org}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section header ─── */
function SectionHeader() {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: EASE_OUT }}
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-center max-w-2xl mx-auto"
      style={{ color: "var(--text-1)" }}
    >
      Organisations That Already Made the Switch.
    </motion.h2>
  );
}

/* ─── Dot navigation ─── */
function Dots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Show testimonial ${i + 1}`}
          onClick={() => onSelect(i)}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === active ? 22 : 8,
            height: 8,
            background: i === active ? "var(--green-text)" : "var(--border-3)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Export ─── */
export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionHeader />

        <div className="mt-12 sm:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={TESTIMONIALS[index].id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <TestimonialCard testimonial={TESTIMONIALS[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8">
          <Dots count={TESTIMONIALS.length} active={index} onSelect={setIndex} />
        </div>
      </div>
    </section>
  );
}
