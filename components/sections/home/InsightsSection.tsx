"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─────────────────────────────────────────────
   Placeholder excerpt copy — swap for the real
   article summaries once each post is written.
───────────────────────────────────────────── */
const ARTICLES = [
  {
    id: "choosing-sme-software",
    category: "Business Software",
    title: "Choosing SME Software",
    excerpt:
      "A practical guide to evaluating and selecting the right business management software as your SME scales.",
    href: "/insights/blog/choosing-sme-software",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    accent: "#a5b4fc",
  },
  {
    id: "digitising-cooperative-management",
    category: "Cooperatives",
    title: "Digitising Cooperative Management",
    excerpt:
      "How cooperative societies are moving from paper ledgers to digital platforms for savings, loans, and compliance.",
    href: "/insights/blog/digitising-cooperative-management",
    gradient: "linear-gradient(135deg, #042f2e 0%, #115e59 100%)",
    accent: "#5eead4",
  },
  {
    id: "paperless-government-in-nigeria",
    category: "GovTech",
    title: "Paperless Government in Nigeria",
    excerpt:
      "Examining Nigeria's shift toward paperless, digital-first public service delivery — and what it means for agencies.",
    href: "/insights/blog/paperless-government-in-nigeria",
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
    accent: "#86efac",
  },
];

/* ─── Section header ─── */
function SectionHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
      <div className="flex flex-col gap-5 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase self-start"
          style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.22)",
            color: "var(--green-text)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Insights &amp; Resources
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
          style={{ color: "var(--text-1)" }}
        >
          Technology Intelligence for{" "}
          <span className="gradient-green">Business Leaders</span>.
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.16 }}
      >
        <Link
          href="/insights/blog"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200"
          style={{ color: "var(--green-text)" }}
        >
          All Articles
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
      </motion.div>
    </div>
  );
}

/* ─── Article "read" link ─── */
function ReadLink({ accent }: { accent: string }) {
  return (
    <span className="group/link inline-flex items-center gap-1.5 mt-auto">
      <span className="text-xs font-semibold" style={{ color: accent }}>
        Read Article
      </span>
      <motion.span
        className="inline-flex"
        style={{ color: accent }}
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path
            fillRule="evenodd"
            d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </motion.span>
    </span>
  );
}

/* ─── Large featured card ─── */
function FeaturedCard({ article, index }: { article: (typeof ARTICLES)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        href={article.href}
        className="group relative flex flex-col justify-end gap-4 rounded-2xl p-8 sm:p-10 h-full min-h-[380px] overflow-hidden"
        style={{ background: article.gradient, border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${article.accent}33 0%, transparent 70%)`, filter: "blur(30px)" }}
        />

        <span
          className="relative inline-flex items-center gap-2 self-start px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
          style={{ background: "rgba(255,255,255,0.1)", border: `1px solid ${article.accent}55`, color: article.accent }}
        >
          {article.category}
        </span>

        <h3 className="relative text-2xl sm:text-3xl font-extrabold leading-tight text-white">
          {article.title}
        </h3>

        <p className="relative text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.75)" }}>
          {article.excerpt}
        </p>

        <div className="relative">
          <ReadLink accent={article.accent} />
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Smaller stacked card ─── */
function SecondaryCard({ article, index }: { article: (typeof ARTICLES)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.15 + index * 0.1 }}
      whileHover={{ y: -6 }}
      className="flex-1"
    >
      <Link
        href={article.href}
        className="group relative flex flex-col gap-3 rounded-2xl p-6 h-full overflow-hidden"
        style={{ background: article.gradient, border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${article.accent}33 0%, transparent 70%)`, filter: "blur(24px)" }}
        />

        <span
          className="relative inline-flex items-center gap-2 self-start px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
          style={{ background: "rgba(255,255,255,0.1)", border: `1px solid ${article.accent}55`, color: article.accent }}
        >
          {article.category}
        </span>

        <h3 className="relative text-lg font-bold leading-snug text-white">
          {article.title}
        </h3>

        <p className="relative text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
          {article.excerpt}
        </p>

        <div className="relative">
          <ReadLink accent={article.accent} />
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Section divider (reused pattern) ─── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border-2))" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, var(--border-2), transparent)" }} />
    </div>
  );
}

/* ─── Main Export ─── */
export default function InsightsSection() {
  const [featured, ...secondary] = ARTICLES;

  return (
    <section id="insights" className="relative overflow-hidden" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <SectionHeader />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeaturedCard article={featured} index={0} />
          <div className="flex flex-col gap-6">
            {secondary.map((article, i) => (
              <SecondaryCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
