"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eyebrow, SectionDivider, ArrowRight, Breadcrumb } from "@/components/ui/section-parts";
import { PRODUCTS, type Product } from "@/lib/products-data";

const EASE_OUT = "easeOut" as const;

/* ─── Demo reel, or an honest panel where there is not one yet ───
   Same treatment as the homepage products section, so a product that has no
   video says so rather than showing an empty frame. */
function ProductMedia({ name, videoId }: { name: string; videoId: string | null }) {
  if (!videoId) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2.5"
        style={{ background: "var(--bg-input)" }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke="var(--text-4)" strokeWidth="1.5" />
          <path
            d="M14 8v6l4 2.5"
            stroke="var(--text-4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "var(--text-4)" }}
        >
          Coming Soon
        </span>
      </div>
    );
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title={`${name} product demo video`}
      className="absolute inset-0 w-full h-full"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

export default function ProductPageClient({ product }: { product: Product }) {
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const bookHref = `/consultation?topic=${encodeURIComponent(product.name)}`;

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
              <Breadcrumb
                trail={[
                  { label: "Home", href: "/" },
                  { label: "Products", href: "/products" },
                  { label: product.name },
                ]}
              />
            </motion.div>

            <div className="mt-7 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.06 }}
                className="lg:col-span-6"
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--text-4)" }}
                >
                  {product.label}
                </span>

                <h1
                  className="mt-4 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
                  style={{ color: "var(--text-1)" }}
                >
                  {product.name}
                </h1>

                <p
                  className="mt-6 text-lg sm:text-xl font-semibold leading-snug"
                  style={{ color: "var(--text-1)" }}
                >
                  {product.boldDescription}
                </p>

                <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {product.description}
                </p>

                <div className="mt-9 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={bookHref}
                    className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ background: "var(--green-text)", color: "var(--on-green)" }}
                  >
                    Book a Demo
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold transition-colors duration-200"
                    style={{ border: "1px solid var(--border-3)", color: "var(--text-1)" }}
                  >
                    All Products
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.14 }}
                className="lg:col-span-6 w-full"
              >
                <div
                  className="relative w-full aspect-video rounded-xl overflow-hidden"
                  style={{ border: "1px solid var(--border-1)" }}
                >
                  <ProductMedia name={product.name} videoId={product.videoId} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What is in it — only where the copy actually lists features */}
        {product.features.length > 0 && (
          <section className="relative" style={{ background: "var(--bg-2)" }}>
            <SectionDivider />
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12"
              >
                <div className="lg:col-span-4">
                  <Eyebrow>What is in it</Eyebrow>
                  <h2
                    className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]"
                    style={{ color: "var(--text-1)" }}
                  >
                    One system, not four.
                  </h2>
                </div>

                <div className="lg:col-span-8">
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 py-3 border-t"
                        style={{ borderColor: "var(--border-2)" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "var(--green-text)" }}
                          aria-hidden="true"
                        />
                        <span className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {product.audience}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Where it fits — real links into the Solutions module */}
        <section className="relative" style={{ background: "var(--bg)" }}>
          <SectionDivider />
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12"
            >
              <div className="lg:col-span-4">
                <Eyebrow>What it delivers</Eyebrow>
                <h2
                  className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]"
                  style={{ color: "var(--text-1)" }}
                >
                  The capability areas {product.name} covers.
                </h2>
                {product.features.length === 0 && (
                  <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {product.audience}
                  </p>
                )}
              </div>

              <div className="lg:col-span-8 flex flex-col">
                {product.relatedSolutions.map((solution) => (
                  <Link
                    key={solution.slug}
                    href={`/solutions/applications/${solution.slug}`}
                    className="group flex items-center justify-between gap-6 py-6 border-t"
                    style={{ borderColor: "var(--border-2)" }}
                  >
                    <span
                      className="text-lg font-bold tracking-tight"
                      style={{ color: "var(--text-1)" }}
                    >
                      {solution.title}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold shrink-0"
                      style={{ color: "var(--green-text)" }}
                    >
                      Explore
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* The other platforms */}
        <section className="relative" style={{ background: "var(--bg-2)" }}>
          <SectionDivider />
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <Eyebrow>The other platforms</Eyebrow>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/products/${other.slug}`}
                    className="group flex flex-col gap-2 p-6 rounded-xl border border-(--border-1) hover:border-[rgba(34,197,94,0.28)] transition-colors duration-300"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: "var(--text-4)" }}
                    >
                      {other.label}
                    </span>
                    <span className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>
                      {other.name}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {other.boldDescription}
                    </span>
                    <span
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: "var(--green-text)" }}
                    >
                      Explore {other.name}
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
