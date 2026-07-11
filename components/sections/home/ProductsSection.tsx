"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─── Product data ─── */
const PRODUCTS = [
  {
    id: "igov",
    name: "iGov",
    category: "Government Technology",
    boldDescription:
      "The all-in-one platform for modern Governing Bodies and Agencies",
    description: "Built for Compliance, Engineered for Scale…",
    videoId: null as string | null,
    demoHref: "/products/igov",
  },
  {
    id: "cnx247",
    name: "CNX247",
    category: "Business Management Suite",
    boldDescription: "Unified tool designed to boost business productivity",
    description: "CRM, HR, Payroll, Loan automation, document management",
    videoId: "4Fmw7odzLnw",
    demoHref: "/products/cnx247",
  },
  {
    id: "icoop",
    name: "iCoop",
    category: "Cooperative Management",
    boldDescription: "Purpose built for cooperatives",
    description: "Track finance, savings, loan applications and more",
    videoId: "F2Ib73fEg9c",
    demoHref: "/products/icoop",
  },
];

/* ─── Section header ─── */
function SectionHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase"
        style={{
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.22)",
          color: "var(--green-text)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Our Products
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
        style={{ color: "var(--text-1)" }}
      >
        Scalable Platforms for{" "}
        <span className="gradient-green">Sustainable Growth</span>.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.16 }}
        className="text-base lg:text-lg leading-relaxed"
        style={{ color: "var(--text-2)" }}
      >
        Turn your fragmented processes into a unified ecosystem.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.22 }}
      >
        <Link
          href="/products"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
          style={{ color: "var(--green-text)" }}
        >
          View All Products
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

/* ─── Video / coming-soon panel ─── */
function ProductMedia({ name, videoId }: { name: string; videoId: string | null }) {
  if (!videoId) {
    return (
      <div
        className="relative aspect-video rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2"
        style={{ background: "var(--bg-input)", border: "1px solid var(--border-1)" }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke="var(--text-4)" strokeWidth="1.5" />
          <path d="M14 8v6l4 2.5" stroke="var(--text-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--text-4)" }}>
          Coming Soon
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-1)" }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={`${name} product demo video`}
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

/* ─── Product card ─── */
function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col gap-5 rounded-2xl p-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-1)",
        boxShadow: "var(--shadow-md)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.28)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
      }}
    >
      {/* Top green accent line — reveals on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)",
        }}
      />

      {/* Name + category */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>
          {product.name}
        </h3>
        <span
          className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md text-right"
          style={{
            background: "rgba(34,197,94,0.07)",
            border: "1px solid rgba(34,197,94,0.16)",
            color: "var(--green-text)",
          }}
        >
          {product.category}
        </span>
      </div>

      {/* Video / coming soon */}
      <ProductMedia name={product.name} videoId={product.videoId} />

      {/* Copy */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-bold leading-snug" style={{ color: "var(--text-1)" }}>
          {product.boldDescription}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          {product.description}
        </p>
      </div>

      {/* Book Demo CTA */}
      <Link
        href={product.demoHref}
        className="relative group/btn inline-flex items-center justify-center gap-2 mt-auto px-5 py-2.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          boxShadow: "var(--cta-shadow)",
        }}
      >
        <span
          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          }}
        />
        <span className="relative">Book Demo</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className="relative transition-transform duration-300 group-hover/btn:translate-x-1"
        >
          <path
            d="M3 8H13M9 4l4 4-4 4"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
export default function ProductsSection() {
  return (
    <section id="products" className="relative overflow-hidden" style={{ background: "var(--bg-2)" }}>
      <SectionDivider />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <SectionHeader />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
