"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eyebrow, SectionDivider, ArrowRight, Breadcrumb } from "@/components/ui/section-parts";
import { INSIGHTS_SECTIONS, type Article, type InsightsSection } from "@/lib/insights-data";

const EASE_OUT = "easeOut" as const;

/* ─── Shared shell for every Insights page ───
   Index, article and placeholder all share the masthead, the section switcher
   and the closing CTA, so the module reads as one thing rather than five
   pages that happen to live under the same path. */

function Masthead({
  title,
  intro,
  crumbs,
}: {
  title: string;
  intro?: string;
  crumbs: { label: string; href?: string }[];
}) {
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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <Breadcrumb trail={crumbs} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
          className="mt-7 max-w-3xl text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
          style={{ color: "var(--text-1)" }}
        >
          {title}
        </motion.h1>

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.16 }}
            className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-2)" }}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* Lets someone move between the five areas without going back to the nav */
function SectionSwitcher({ current }: { current: string }) {
  return (
    <nav aria-label="Insights sections" className="border-t" style={{ borderColor: "var(--border-2)" }}>
      <ul className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex gap-6 sm:gap-8 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {INSIGHTS_SECTIONS.map((section) => {
          const active = section.slug === current;
          return (
            <li key={section.slug} className="shrink-0">
              <Link
                href={`/insights/${section.slug}`}
                aria-current={active ? "page" : undefined}
                className="text-sm font-semibold whitespace-nowrap transition-colors duration-200"
                style={{ color: active ? "var(--green-text)" : "var(--text-3)" }}
              >
                {section.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ClosingCTA() {
  return (
    <section className="relative" style={{ background: "var(--bg)" }}>
      <SectionDivider />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <Eyebrow>Rather just ask</Eyebrow>
            <h2
              className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.1]"
              style={{ color: "var(--text-1)" }}
            >
              A conversation beats an article.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
              If you are weighing a decision right now, put it to an engineer
              instead of reading around it. The first conversation is free.
            </p>
          </div>

          <Link
            href="/consultation"
            className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--green-text)", color: "var(--on-green)" }}
          >
            Book a Consultation
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Shell({
  children,
  title,
  intro,
  crumbs,
  current,
}: {
  children: React.ReactNode;
  title: string;
  intro?: string;
  crumbs: { label: string; href?: string }[];
  current: string;
}) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* No photographic hero here, so the bar keeps its panel from the
          first paint rather than fading in on scroll. */}
      <Navbar solid />
      <main className="flex-1">
        <Masthead title={title} intro={intro} crumbs={crumbs} />
        <SectionSwitcher current={current} />
        {children}
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ─── Index: a list of articles, or an honest empty state ─── */
export function InsightsIndexClient({
  section,
  articles = [],
}: {
  section: InsightsSection;
  articles?: Article[];
}) {
  return (
    <Shell
      title={section.title}
      intro={section.intro}
      current={section.slug}
      crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }, { label: section.title }]}
    >
      <section className="relative" style={{ background: "var(--bg-2)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
          {articles.length > 0 ? (
            <div className="flex flex-col">
              {articles.map((article, i) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: (i % 3) * 0.06 }}
                  className="border-t"
                  style={{ borderColor: "var(--border-2)" }}
                >
                  <Link
                    href={`/insights/${section.slug}/${article.slug}`}
                    className="group grid lg:grid-cols-12 gap-x-8 gap-y-3 py-8 lg:py-10"
                  >
                    <div className="lg:col-span-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: "var(--text-4)" }}
                      >
                        {[article.category, article.readTime, article.date]
                          .filter(Boolean)
                          .join("  ·  ")}
                      </span>
                    </div>

                    <h2
                      className="lg:col-span-4 text-xl sm:text-2xl font-extrabold tracking-tight leading-snug"
                      style={{ color: "var(--text-1)" }}
                    >
                      {article.title}
                    </h2>

                    <div className="lg:col-span-5 flex flex-col gap-4">
                      <p className="text-base leading-relaxed" style={{ color: "var(--text-3)" }}>
                        {article.excerpt}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: "var(--green-text)" }}
                      >
                        Read article
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="max-w-2xl flex flex-col gap-4 p-8 sm:p-10 rounded-xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-1)" }}
            >
              <h2 className="text-xl font-bold" style={{ color: "var(--text-1)" }}>
                {section.emptyLine}
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                When there is something worth publishing here, it will appear.
                In the meantime, the fastest way to get an answer is to ask.
              </p>
              <Link
                href="/consultation"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold mt-1"
                style={{ color: "var(--green-text)" }}
              >
                Talk to us instead
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </Shell>
  );
}

/* ─── Article / case-study page ───
   Shows what is actually known. Where no body has been written, it says so
   plainly instead of padding the page out with invented copy. */
export function InsightsArticleClient({
  section,
  title,
  meta,
  excerpt,
  body,
  notPublishedNote,
}: {
  section: InsightsSection;
  title: string;
  meta?: string;
  excerpt?: string;
  body?: string[];
  notPublishedNote?: string;
}) {
  return (
    <Shell
      title={title}
      current={section.slug}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Insights" },
        { label: section.title, href: `/insights/${section.slug}` },
        { label: title },
      ]}
    >
      <section className="relative" style={{ background: "var(--bg-2)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
          <article className="max-w-3xl flex flex-col gap-6">
            {meta && (
              <span
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--text-4)" }}
              >
                {meta}
              </span>
            )}

            {excerpt && (
              <p
                className="text-lg sm:text-xl leading-relaxed"
                style={{ color: "var(--text-1)" }}
              >
                {excerpt}
              </p>
            )}

            {body?.map((paragraph, i) => (
              <p
                key={i}
                className="text-[0.95rem] sm:text-base leading-[1.75]"
                style={{ color: "var(--text-2)" }}
              >
                {paragraph}
              </p>
            ))}

            {notPublishedNote && (
              <div
                className="flex flex-col gap-3 p-6 rounded-xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-1)" }}
              >
                <p className="text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {notPublishedNote}
                </p>
                <Link
                  href="/consultation"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--green-text)" }}
                >
                  Ask us about this directly
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            )}

            <Link
              href={`/insights/${section.slug}`}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "var(--text-3)" }}
            >
              ← All {section.title.toLowerCase()}
            </Link>
          </article>
        </div>
      </section>
    </Shell>
  );
}
