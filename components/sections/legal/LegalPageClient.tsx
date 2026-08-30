"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eyebrow, SectionDivider, Breadcrumb } from "@/components/ui/section-parts";
import type { LegalBlock, LegalDocument } from "@/lib/legal-data";

const EASE_OUT = "easeOut" as const;

const PHONE_DISPLAY = "+234 0 901 640 0000";
const PHONE_HREF = "tel:+2349016400000";
const EMAIL = "info@connexxiontelecom.com";

/* ─── Shared shell for legal documents ───
   Long-form legal text has different needs from a marketing page: a narrower
   measure so lines stay readable, headings that can be linked to directly,
   and a contents list so somebody hunting for one clause is not scrolling
   blind. The wording itself comes from lib/legal-data.ts untouched. */

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p
              key={i}
              className="text-[0.95rem] sm:text-base leading-[1.75]"
              style={{ color: "var(--text-2)" }}
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={i} className="flex flex-col gap-3">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--green-text)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-[0.95rem] sm:text-base leading-[1.75]"
                    style={{ color: "var(--text-2)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <dl key={i} className="flex flex-col gap-5">
            {block.items.map((item) => (
              <div
                key={item.term}
                className="flex flex-col gap-1 pl-4"
                style={{ borderLeft: "2px solid var(--border-3)" }}
              >
                <dt className="text-[0.95rem] sm:text-base font-bold" style={{ color: "var(--text-1)" }}>
                  {item.term}
                </dt>
                <dd
                  className="text-[0.95rem] sm:text-base leading-[1.75]"
                  style={{ color: "var(--text-2)" }}
                >
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        );
      })}
    </>
  );
}

export default function LegalPageClient({ doc }: { doc: LegalDocument }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* No photographic hero here, so the bar keeps its panel from the
          first paint rather than fading in on scroll. */}
      <Navbar solid />

      <main className="flex-1">
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
              <Breadcrumb
                trail={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: doc.title }]}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
              className="mt-7 max-w-3xl text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
              style={{ color: "var(--text-1)" }}
            >
              {doc.title}
            </motion.h1>

            {doc.lastUpdated && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.14 }}
                className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--text-4)" }}
              >
                Last updated {doc.lastUpdated}
              </motion.p>
            )}
          </div>
        </section>

        <section className="relative" style={{ background: "var(--bg-2)" }}>
          <SectionDivider />
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Contents — sticky on desktop so a long policy stays navigable */}
              <motion.nav
                aria-label="Contents"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
                className="lg:col-span-4 xl:col-span-3"
              >
                <div className="lg:sticky lg:top-28">
                  <Eyebrow>Contents</Eyebrow>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {doc.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="text-sm leading-snug transition-colors duration-200 hover:text-(--text-1)"
                          style={{ color: "var(--text-3)" }}
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.nav>

              {/* The document */}
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.16 }}
                className="lg:col-span-8 xl:col-span-9 max-w-3xl"
              >
                <div className="flex flex-col gap-5">
                  <Blocks blocks={doc.intro} />
                </div>

                {doc.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28 mt-12 lg:mt-14">
                    <h2
                      className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug"
                      style={{ color: "var(--text-1)" }}
                    >
                      {section.title}
                    </h2>
                    <div className="mt-5 flex flex-col gap-5">
                      <Blocks blocks={section.blocks} />
                    </div>

                    {/* The policy repeatedly says "contact us" without giving a
                        route. The details below are the ones the footer already
                        publishes — added so the instruction is actionable. */}
                    {section.id === "contact-us" && (
                      <div
                        className="mt-6 flex flex-col gap-3 p-6 rounded-xl"
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-1)",
                        }}
                      >
                        <a
                          href={`mailto:${EMAIL}`}
                          className="text-base font-semibold whitespace-nowrap transition-opacity duration-200 hover:opacity-80"
                          style={{ color: "var(--green-text)" }}
                        >
                          {EMAIL}
                        </a>
                        <a
                          href={PHONE_HREF}
                          className="text-base font-semibold whitespace-nowrap transition-colors duration-200 hover:text-(--text-1)"
                          style={{ color: "var(--text-2)" }}
                        >
                          {PHONE_DISPLAY}
                        </a>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                          2A Iller Crescent, Off Katsina Ala, Maitama, FCT Abuja,
                          Nigeria
                        </p>
                        <Link
                          href="/consultation"
                          className="mt-1 text-sm font-semibold transition-opacity duration-200 hover:opacity-80"
                          style={{ color: "var(--green-text)" }}
                        >
                          Or send us a message →
                        </Link>
                      </div>
                    )}
                  </section>
                ))}
              </motion.article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
