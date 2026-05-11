"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─── Social icons ─── */
const SocialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

/* ─── Footer nav data ─── */
const QUICK_LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  { label: "Network Infrastructure", href: "#services" },
  { label: "Fiber Optic Solutions", href: "#services" },
  { label: "Managed IT Services", href: "#services" },
  { label: "Enterprise Connectivity", href: "#services" },
  { label: "Wireless Connectivity", href: "#services" },
  { label: "Telecommunications Support", href: "#services" },
];

/* ─── Logo wordmark ─── */
function FooterLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          boxShadow: "0 0 16px rgba(34,197,94,0.35)",
        }}
      >
        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
          <path d="M2 10 C2 10 5 5 8 9 C11 13 13 5 16 9 C18 12 18 10 18 10" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="17" r="1.5" fill="#000" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>
          Connexxion
        </span>
        <span className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "rgba(34,197,94,0.8)" }}>
          Telecom
        </span>
      </div>
    </div>
  );
}

/* ─── Column heading ─── */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="w-3 h-px" style={{ background: "#22c55e" }} />
      <h4 className="text-xs font-bold tracking-widest uppercase" style={{ color: "#22c55e" }}>
        {children}
      </h4>
    </div>
  );
}

/* ─── Nav link ─── */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-sm transition-colors duration-200"
      style={{ color: "var(--text-3)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
    >
      <svg
        viewBox="0 0 12 12"
        fill="none"
        className="w-2.5 h-2.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        stroke="#22c55e"
        strokeWidth={2}
      >
        <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </Link>
  );
}

/* ─── Contact row ─── */
function ContactRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.16)",
          color: "#22c55e",
        }}
      >
        {icon}
      </div>
      <div className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Background decoration ─── */
function FooterBackground() {
  return (
    <>
      {/* Faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
        }}
      />
      {/* Glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </>
  );
}

/* ─── Main Export ─── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border-2)",
      }}
    >
      <FooterBackground />

      {/* Main grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Col 1: Company overview ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="flex flex-col gap-5 lg:col-span-1"
          >
            <FooterLogo />

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-3)" }}>
              Connexxion Telecom delivers enterprise-grade connectivity and managed
              technology services, powering the backbone of Nigeria&apos;s most
              demanding industries.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {SocialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                  style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-1)",
                    color: "var(--text-3)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(34,197,94,0.1)";
                    el.style.borderColor = "rgba(34,197,94,0.3)";
                    el.style.color = "#22c55e";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--bg-input)";
                    el.style.borderColor = "var(--border-1)";
                    el.style.color = "var(--text-3)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2: Quick links ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.08 }}
          >
            <ColHeading>Quick Links</ColHeading>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3: Services ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.16 }}
          >
            <ColHeading>Our Services</ColHeading>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 4: Contact info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.24 }}
            className="flex flex-col gap-5"
          >
            <ColHeading>Contact Us</ColHeading>

            <ContactRow
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M8 1.5a5 5 0 100 10A5 5 0 008 1.5zm0 0V8m0 0l3 2" strokeLinecap="round" />
                  <circle cx="8" cy="13.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              }
            >
              <span>Mon – Sat &nbsp; 9:00 – 18:00</span>
              <br />
              <span style={{ color: "var(--text-4)" }}>Closed Sunday</span>
            </ContactRow>

            <ContactRow
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M2 3.5A1.5 1.5 0 013.5 2h.879a1 1 0 01.94.659l.8 2a1 1 0 01-.23 1.06l-.879.879a8.015 8.015 0 004.392 4.392l.879-.879a1 1 0 011.06-.23l2 .8a1 1 0 01.659.94V13.5A1.5 1.5 0 0112.5 15 10.5 10.5 0 012 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            >
              <a href="tel:+2349016400000" className="block hover:text-gray-900 dark:hover:text-white transition-colors">
                +234 0 901 640 0000
              </a>
              <a href="tel:+23409290541" className="block hover:text-gray-900 dark:hover:text-white transition-colors">
                +234 09 290 5141
              </a>
            </ContactRow>

            <ContactRow
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M2 4l6 5 6-5" strokeLinecap="round" />
                  <rect x="1" y="3" width="14" height="10" rx="1.5" />
                </svg>
              }
            >
              <a href="mailto:info@connexxiontelecom.com" className="hover:text-gray-900 dark:hover:text-white transition-colors break-all">
                info@connexxiontelecom.com
              </a>
            </ContactRow>

            <ContactRow
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" strokeLinecap="round" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
              }
            >
              2A, Iller Crescent, Off Katsina Ala,
              <br />
              Maitama, FCT Abuja, Nigeria
            </ContactRow>
          </motion.div>
        </div>

        {/* ── Newsletter strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.3 }}
          className="mt-14 rounded-2xl px-6 py-6 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border-1)",
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
              Stay ahead of the network
            </p>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>
              Industry insights, infrastructure updates, and technology briefs — delivered monthly.
            </p>
          </div>
          <form
            className="flex gap-2 w-full sm:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@company.com"
              className="flex-1 sm:w-56 px-4 py-2.5 rounded-xl text-sm outline-none placeholder:text-[rgba(255,255,255,0.25)] focus:ring-1"
              style={{
                background: "var(--bg-input)",
                border: "1px solid var(--border-1)",
                color: "var(--text-1)",
                // @ts-expect-error CSS custom prop
                "--tw-ring-color": "rgba(34,197,94,0.4)",
              }}
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "#000",
                boxShadow: "0 0 16px rgba(34,197,94,0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(34,197,94,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(34,197,94,0.25)";
              }}
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-2)" }}
        >
          <p className="text-xs text-center sm:text-left" style={{ color: "var(--text-4)" }}>
            © {year} Connexxion Telecom Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Terms & Conditions", href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--text-4)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-4)"; }}
              >
                {label}
              </a>
            ))}
            {/* Green dot accent */}
            <div
              className="w-1 h-1 rounded-full"
              style={{ background: "rgba(34,197,94,0.4)", boxShadow: "0 0 6px rgba(34,197,94,0.4)" }}
            />
            <span className="text-xs" style={{ color: "var(--text-4)" }}>
              Nigeria
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
