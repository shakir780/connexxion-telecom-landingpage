"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eyebrow, SectionDivider, ArrowRight, Breadcrumb } from "@/components/ui/section-parts";
import { SERVICES, type Service } from "@/lib/services-data";

const EASE_OUT = "easeOut" as const;

const COMMITMENTS = [
  { title: "24/7/365 NOC Support", body: "A staffed operations centre, not an answering service." },
  { title: "Nationwide Coverage", body: "Deployment and maintenance across the country, run from Abuja." },
  { title: "Enterprise-Grade SLAs", body: "Response and resolution targets written down and measured." },
];

export default function ServicePageClient({ service }: { service: Service }) {
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);
  const bookHref = `/consultation?topic=${encodeURIComponent(service.title)}`;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* No photographic hero here, so the bar keeps its panel from the
          first paint rather than fading in on scroll. */}
      <Navbar solid />

      <main className="flex-1">
        <section className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-14 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <Breadcrumb
                trail={[
                  { label: "Home", href: "/" },
                  { label: "Services", href: "/services" },
                  { label: service.title },
                ]}
              />
            </motion.div>

            <div className="mt-7 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
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
                  {service.group}
                </span>

                <h1
                  className="mt-4 text-3xl sm:text-4xl lg:text-[3rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
                  style={{ color: "var(--text-1)" }}
                >
                  {service.title}
                </h1>

                <p
                  className="mt-6 max-w-lg text-lg leading-relaxed"
                  style={{ color: "var(--text-2)" }}
                >
                  {service.summary}
                </p>

                <div className="mt-9 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={bookHref}
                    className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ background: "var(--green-fill)", color: "var(--on-green)" }}
                  >
                    Book a Consultation
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold transition-colors duration-200"
                    style={{ border: "1px solid var(--border-3)", color: "var(--text-1)" }}
                  >
                    All Services
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
                  className="relative w-full aspect-[16/10] rounded-xl overflow-hidden"
                  style={{ border: "1px solid var(--border-1)" }}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "rgba(6,10,18,0.35)" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The capability area this service delivers */}
        {service.relatedSolution && (
          <section className="relative" style={{ background: "var(--bg-2)" }}>
            <SectionDivider />
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end"
              >
                <div className="lg:col-span-7">
                  <Eyebrow>In depth</Eyebrow>
                  <h2
                    className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]"
                    style={{ color: "var(--text-1)" }}
                  >
                    {service.title} sits inside {service.relatedSolution.title}.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "var(--text-2)" }}>
                    That page covers the problems this work solves, what it
                    includes end to end, and how it is delivered.
                  </p>
                </div>
                <div className="lg:col-span-5 lg:text-right">
                  <Link
                    href={service.relatedSolution.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "var(--green-text)" }}
                  >
                    Read {service.relatedSolution.title}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* What every engagement carries */}
        <section className="relative" style={{ background: "var(--bg)" }}>
          <SectionDivider />
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <Eyebrow>What every engagement carries</Eyebrow>
              <div className="mt-8 grid sm:grid-cols-3 gap-x-8 gap-y-8">
                {COMMITMENTS.map((c) => (
                  <div
                    key={c.title}
                    className="flex flex-col gap-2 pt-5 border-t"
                    style={{ borderColor: "var(--border-2)" }}
                  >
                    <h3 className="text-base font-bold" style={{ color: "var(--text-1)" }}>
                      {c.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Other services */}
        <section className="relative" style={{ background: "var(--bg-2)" }}>
          <SectionDivider />
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <Eyebrow>Other services</Eyebrow>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/services/${other.slug}`}
                    className="group flex flex-col gap-2 p-6 rounded-xl border border-(--border-1) hover:border-[rgba(34,197,94,0.28)] transition-colors duration-300"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: "var(--text-4)" }}
                    >
                      {other.group}
                    </span>
                    <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text-1)" }}>
                      {other.title}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {other.summary}
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
