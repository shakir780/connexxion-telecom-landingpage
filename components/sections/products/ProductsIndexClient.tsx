"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eyebrow, SectionDivider, ArrowRight, Breadcrumb } from "@/components/ui/section-parts";
import { PRODUCTS } from "@/lib/products-data";

const EASE_OUT = "easeOut" as const;

export default function ProductsIndexClient() {
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

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-14 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Products" }]} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
              className="mt-7 max-w-3xl text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
              style={{ color: "var(--text-1)" }}
            >
              Technology built around the work.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.16 }}
              className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-2)" }}
            >
              Three platforms, built and maintained in-house, for government,
              business and cooperative operations.
            </motion.p>
          </div>
        </section>

        <section className="relative" style={{ background: "var(--bg-2)" }}>
          <SectionDivider />
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="flex flex-col">
              {PRODUCTS.map((product, i) => (
                <motion.article
                  key={product.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: (i % 3) * 0.06 }}
                  className="border-t"
                  style={{ borderColor: "var(--border-2)" }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group grid lg:grid-cols-12 gap-x-8 gap-y-3 py-8 lg:py-10"
                  >
                    <div className="lg:col-span-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: "var(--text-4)" }}
                      >
                        {product.label}
                      </span>
                    </div>

                    <h2
                      className="lg:col-span-3 text-2xl sm:text-3xl font-extrabold tracking-tight"
                      style={{ color: "var(--text-1)" }}
                    >
                      {product.name}
                    </h2>

                    <div className="lg:col-span-6 flex flex-col gap-3">
                      <p
                        className="text-base font-semibold leading-snug"
                        style={{ color: "var(--text-1)" }}
                      >
                        {product.boldDescription}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                        {product.description}
                      </p>
                      <span
                        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: "var(--green-text)" }}
                      >
                        Explore {product.name}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

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
                <Eyebrow>See it running</Eyebrow>
                <h2
                  className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.1]"
                  style={{ color: "var(--text-1)" }}
                >
                  A demo on your own process.
                </h2>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                  Bring a workflow you actually run and we will walk it through
                  the platform, rather than showing you a generic tour.
                </p>
              </div>

              <Link
                href="/consultation"
                className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--green-text)", color: "#04120a" }}
              >
                Book a Demo
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
