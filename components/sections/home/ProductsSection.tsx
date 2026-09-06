"use client";

import { motion } from "framer-motion";
import { productSite } from "@/lib/products-data";

const EASE_OUT = "easeOut" as const;

/* ─── Product data ───
   Names and copy are unchanged. `label` is the understated sector line that
   replaced the green category badge. A null `videoId` means there is no demo
   reel yet and the panel says so.

   Destinations are not held here. Each product lives on its own site, and
   productSite() in products-data owns those URLs. CNX 1GOV has no site yet,
   so its card renders "Coming soon" instead of a link. */
const PRODUCTS = [
  {
    id: "igov",
    name: "CNX 1GOV",
    label: "Public Sector",
    category: "Government Technology",
    boldDescription:
      "The all-in-one platform for modern Governing Bodies and Agencies",
    description: "Built for Compliance, Engineered for Scale…",
    videoId: null as string | null,
  },
  {
    id: "cnx247",
    name: "CNX247",
    label: "Business Operations",
    category: "Business Management Suite",
    boldDescription: "Unified tool designed to boost business productivity",
    description: "CRM, HR, Payroll, Loan automation, document management",
    videoId: "4Fmw7odzLnw",
  },
  {
    id: "icoop",
    name: "iCoop",
    label: "Cooperatives",
    category: "Cooperative Management",
    boldDescription: "Purpose built for cooperatives",
    description: "Track finance, savings, loan applications and more",
    videoId: "F2Ib73fEg9c",
  },
];

/* ─── Product media ───
   The demo reels are the real product visuals, so they carry the panels.
   A product with no reel yet says so rather than showing an empty frame. */
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
/* ─── Section header — left-aligned, with the link demoted to the margin ─── */
function SectionHeader() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
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
            Our Products
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
          Technology built around the work.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.12 }}
          className="mt-5 text-base lg:text-lg leading-relaxed max-w-xl"
          style={{ color: "var(--text-2)" }}
        >
          Purpose-built platforms for government, business and cooperative
          operations.
        </motion.p>
      </div>

    </div>
  );
}

/* ─── Shared card pieces ─── */
function SectorLabel({ text }: { text: string }) {
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-[0.18em]"
      style={{ color: "var(--text-4)" }}
    >
      {text}
    </span>
  );
}

/* Products live on their own sites, so this is an off-site anchor opened in
   a new tab. A product with no site yet is not a link at all. */
function ExploreLink({ name, href }: { name: string; href?: string }) {
  if (!href) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-sm font-semibold"
        style={{ color: "var(--text-4)" }}
      >
        Coming soon
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Explore ${name} (opens in a new tab)`}
      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-80"
      style={{ color: "var(--green-text)" }}
    >
      Explore {name}
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
      >
        <path
          fillRule="evenodd"
          d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}

/* ─── Product card ───
   One card shape across the three, in an equal grid. The hover treatment is
   deliberately quiet so the demo reels carry the section. */
function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-(--border-1) hover:border-[rgba(34,197,94,0.28)] transition-colors duration-300"
      style={{ background: "var(--bg-card)" }}
    >
      <div className="flex flex-col gap-4 p-7 pb-5">
        <SectorLabel text={product.label} />
        <h3 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>
          {product.name}
        </h3>
      </div>

      <div className="px-7">
        <div
          className="relative w-full aspect-video rounded-lg overflow-hidden"
          style={{ border: "1px solid var(--border-1)" }}
        >
          <ProductMedia name={product.name} videoId={product.videoId} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-7">
        <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text-1)" }}>
          {product.boldDescription}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          {product.description}
        </p>
        <div className="mt-auto pt-3">
          <ExploreLink name={product.name} href={productSite(product.id)} />
        </div>
      </div>
    </motion.article>
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
export default function ProductsSection() {
  return (
    <section id="products" className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <SectionDivider />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <SectionHeader />

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
