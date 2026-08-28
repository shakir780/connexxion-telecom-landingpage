"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─────────────────────────────────────────────
   Placeholder excerpt copy — swap for the real
   article summaries once each post is written.

   `date` is deliberately empty: these posts have
   no publication date yet, and the metadata line
   renders whatever parts exist. Fill it in
   ("Aug 2026") and it appears automatically.
───────────────────────────────────────────── */
type Article = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  readTime: string;
  date?: string;
};

const ARTICLES: Article[] = [
  {
    id: "choosing-sme-software",
    category: "Business Software",
    title: "Choosing SME Software",
    excerpt:
      "A practical guide to evaluating and selecting the right business management software as your SME scales.",
    href: "/insights/blog/choosing-sme-software",
    readTime: "5 min read",
  },
  {
    id: "digitising-cooperative-management",
    category: "Cooperatives",
    title: "Digitising Cooperative Management",
    excerpt:
      "How cooperative societies are moving from paper ledgers to digital platforms for savings, loans, and compliance.",
    href: "/insights/blog/digitising-cooperative-management",
    readTime: "4 min read",
  },
  {
    id: "paperless-government-in-nigeria",
    category: "GovTech",
    title: "Paperless Government in Nigeria",
    excerpt:
      "Examining Nigeria's shift toward paperless, digital-first public service delivery — and what it means for agencies.",
    href: "/insights/blog/paperless-government-in-nigeria",
    readTime: "6 min read",
  },
];

/* ─── Article metadata line ─── */
function Meta({ article }: { article: Article }) {
  const parts = [article.category, article.readTime, article.date].filter(Boolean);
  return (
    <span
      className="block text-[10px] font-bold uppercase tracking-[0.16em]"
      style={{ color: "var(--text-4)" }}
    >
      {parts.join(" · ")}
    </span>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ─── Section header ─── */
function SectionHeader() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div className="max-w-2xl">
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
            Insights &amp; Resources
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
          Perspectives on technology, business and transformation.
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.16 }}
        className="lg:pb-2 shrink-0"
      >
        <Link
          href="/insights/blog"
          className="group inline-flex items-center gap-2 min-h-11 text-sm font-semibold whitespace-nowrap transition-colors duration-200"
          style={{ color: "var(--green-text)" }}
        >
          All Articles
          <Arrow className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}

/* ─── Featured article ───
   Weight comes from type size and space, not from a filled colour panel: a
   single hairline border on the page's own surface. */
function FeaturedArticle({ article }: { article: Article }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      className="h-full"
    >
      <Link
        href={article.href}
        className="group flex flex-col h-full rounded-lg p-7 sm:p-9 transition-colors duration-300 border border-(--border-1) hover:border-[rgba(34,197,94,0.28)]"
        style={{ background: "var(--bg-card)" }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ color: "var(--green-text)" }}
        >
          Featured
        </span>

        <h3
          className="mt-6 text-2xl sm:text-3xl lg:text-[2rem] font-extrabold leading-tight tracking-tight transition-colors duration-200"
          style={{ color: "var(--text-1)" }}
        >
          {article.title}
        </h3>

        <p
          className="mt-4 text-sm sm:text-base leading-relaxed max-w-md"
          style={{ color: "var(--text-3)" }}
        >
          {article.excerpt}
        </p>

        <div className="mt-auto pt-10">
          <Meta article={article} />
          <span
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--green-text)" }}
          >
            Read Article
            <Arrow className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Secondary article row ─── */
function ArticleRow({
  article,
  number,
  isFirst,
}: {
  article: Article;
  number: number;
  isFirst: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.1 }}
      style={isFirst ? undefined : { borderTop: "1px solid var(--border-2)" }}
    >
      <Link
        href={article.href}
        className="group flex gap-4 sm:gap-5 py-6 lg:py-8"
      >
        <span
          className="font-mono text-[11px] tabular-nums shrink-0 pt-1"
          style={{ color: "var(--text-4)" }}
        >
          {String(number).padStart(2, "0")}
        </span>

        <span className="flex-1 min-w-0">
          <span className="flex items-start justify-between gap-4">
            <h3
              className="text-lg sm:text-xl font-bold leading-snug tracking-tight transition-colors duration-200 group-hover:text-(--green-text)"
              style={{ color: "var(--text-1)" }}
            >
              {article.title}
            </h3>
            {/* The arrow is the row's affordance — green, like every other
                link in the section, and only on hover so the column stays
                typographic at rest. */}
            <span
              className="shrink-0 mt-1 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
              style={{ color: "var(--green-text)" }}
            >
              <Arrow className="w-4 h-4" />
            </span>
          </span>

          <span className="block mt-2.5">
            <Meta article={article} />
          </span>

          <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
            {article.excerpt}
          </p>
        </span>
      </Link>
    </motion.div>
  );
}

/* ─── Section divider (reused pattern) ─── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "var(--border-2)" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
      <div className="flex-1 h-px" style={{ background: "var(--border-2)" }} />
    </div>
  );
}

/* ─── Main Export ─── */
export default function InsightsSection() {
  const [featured, ...secondary] = ARTICLES;

  return (
    <section id="insights" className="relative overflow-hidden" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <SectionHeader />

        {/* Featured takes half the width; the rest is a divided index. On
            mobile this stacks in DOM order — featured first, then the rows. */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <FeaturedArticle article={featured} />

          <div className="flex flex-col">
            {secondary.map((article, i) => (
              <ArticleRow
                key={article.id}
                article={article}
                number={i + 2}
                isFirst={i === 0}
              />
            ))}
          </div>
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
