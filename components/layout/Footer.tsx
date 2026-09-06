"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─── Social icons ───
   href values are placeholders ("#") until real
   handles/URLs are provided — swap before launch. */
const SocialLinks = [
  {
    label: "Instagram",
    href: "#",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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
    label: "LinkedIn",
    href: "#",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a2.994 2.994 0 00-2.107-2.117C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.391.524A2.994 2.994 0 00.502 6.186 31.26 31.26 0 000 12a31.26 31.26 0 00.502 5.814 2.994 2.994 0 002.107 2.117c1.886.524 9.391.524 9.391.524s7.505 0 9.391-.524a2.994 2.994 0 002.107-2.117A31.26 31.26 0 0024 12a31.26 31.26 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

/* ─── Navigation groups ───
   Same links as before, regrouped. "Insights" is added to Company (the usual
   home for a company's writing) using the existing /insights/blog route, so
   the footer reaches it the way the main nav does. */
/* A product with no site yet has no href: FooterLink renders it as plain
   text rather than a link to nowhere. */
type NavGroup = { id: string; heading: string; links: { label: string; href?: string }[] };

const NAV_GROUPS: NavGroup[] = [
  {
    id: "products",
    heading: "Products",
    links: [
      { label: "CNX 1GOV" },
      { label: "CNX247", href: "https://www.cnx247.com/" },
      { label: "iCoop", href: "https://www.icoop.ng/" },
    ],
  },
  {
    id: "services",
    heading: "Services",
    links: [
      { label: "Network Infrastructure", href: "/services/network-infrastructure" },
      { label: "Fibre Optic Solutions", href: "/services/fibre-optic-solutions" },
      { label: "Enterprise VoIP", href: "/services/enterprise-voip" },
      { label: "CCTV & Security", href: "/services/cctv-security" },
      { label: "Server & Cloud Administration", href: "/services/server-cloud-administration" },
      { label: "Managed IT Support", href: "/services/managed-it-support" },
    ],
  },
  {
    id: "industries",
    heading: "Industries",
    links: [
      { label: "Gov / Public", href: "/testimonials/government-public" },
      { label: "Cooperatives / Thrift", href: "/testimonials/cooperatives-thrift" },
      { label: "Finance", href: "/testimonials/finance" },
      { label: "SMEs / Corporate", href: "/testimonials/smes-corporate" },
      { label: "Education", href: "/testimonials/education" },
      { label: "Healthcare", href: "/testimonials/healthcare" },
    ],
  },
  {
    id: "company",
    heading: "Company",
    links: [
      { label: "Company Overview", href: "/about/overview" },
      { label: "Mission", href: "/about/mission" },
      { label: "Team", href: "/team" },
      { label: "Why Us?", href: "/about/why-us" },
      { label: "Insights", href: "/insights/blog" },
    ],
  },
];

/* Paired so the two desktop sub-columns end at roughly the same depth */
const NAV_COLUMNS: NavGroup[][] = [
  [NAV_GROUPS[1], NAV_GROUPS[0]], // Services, Products
  [NAV_GROUPS[2], NAV_GROUPS[3]], // Industries, Company
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-and-conditions" },
];

/* ─── Shared pieces ─── */
function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="text-[10px] font-bold tracking-[0.22em] uppercase"
      style={{ color: "var(--text-4)" }}
    >
      {children}
    </h4>
  );
}

/* No leading icon: an arrow on every row is what made the old columns read as
   a dense list of bullets rather than navigation. */
function FooterLink({ href, children }: { href?: string; children: React.ReactNode }) {
  const className = "block text-sm transition-colors duration-200 hover:text-(--text-1)";

  // Nothing to link to yet — render the name, not a dead link.
  if (!href) {
    return (
      <span className="block text-sm" style={{ color: "var(--text-4)" }}>
        {children}{" "}
        <span className="text-xs">(coming soon)</span>
      </span>
    );
  }

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ color: "var(--text-3)" }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={{ color: "var(--text-3)" }}>
      {children}
    </Link>
  );
}

function NavColumn({ groups }: { groups: NavGroup[] }) {
  return (
    <div className="flex flex-col gap-9">
      {groups.map((group) => (
        <div key={group.id}>
          <GroupHeading>{group.heading}</GroupHeading>
          <ul className="mt-4 flex flex-col gap-2.5">
            {group.links.map(({ label, href }) => (
              <li key={label}>
                <FooterLink href={href}>{label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* Mobile: the same groups collapse, so the footer doesn't become a screen and
   a half of links. Contact is never collapsed — it is the one thing someone
   scrolls down here to find. */
function NavAccordion({
  group,
  isOpen,
  onToggle,
}: {
  group: NavGroup;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `footer-group-${group.id}`;
  return (
    <div style={{ borderTop: "1px solid var(--border-2)" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 min-h-13 py-3 text-left"
      >
        <span
          className="text-sm font-bold"
          style={{ color: isOpen ? "var(--text-1)" : "var(--text-2)" }}
        >
          {group.heading}
        </span>
        <span
          className="relative w-3.5 h-3.5 shrink-0"
          style={{ color: isOpen ? "var(--green-text)" : "var(--text-4)" }}
          aria-hidden="true"
        >
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2" style={{ background: "currentColor" }} />
          <span
            className="absolute inset-y-0 left-1/2 w-px transition-transform duration-300"
            style={{
              background: "currentColor",
              transform: `translateX(-50%) scaleY(${isOpen ? 0 : 1})`,
            }}
          />
        </span>
      </button>

      {isOpen && (
        <ul className="pb-4 flex flex-col gap-3" id={panelId}>
          {group.links.map(({ label, href }) => (
            <li key={label}>
              <FooterLink href={href}>{label}</FooterLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span
        className="block text-[10px] font-bold tracking-[0.18em] uppercase"
        style={{ color: "var(--text-4)" }}
      >
        {label}
      </span>
      <div className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export default function Footer() {
  const year = new Date().getFullYear();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border-2)" }}
    >
      {/* Faint grid only — the top-centre glow went with the rest of the
          decorative layer. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 sm:pt-16 lg:pt-20 pb-8">
        {/* Brand is given a third of the width and the largest type; the links
            and contact share the rest. Order flips on mobile so Contact comes
            straight after the brand, ahead of the collapsed navigation. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8 xl:gap-x-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="lg:col-span-5 lg:order-1 flex flex-col gap-6 lg:pr-10"
          >
            {/* w-auto pairs with the height so next/image keeps the ratio
                without warning, and self-start stops the column stretching the
                box, which would leave object-contain centring the mark in dead
                space. */}
            <Image
              src="/images/connexxion-logo.png"
              alt="Connexxion Telecom & Solutions"
              width={747}
              height={182}
              className="h-12 sm:h-14 w-auto self-start object-contain"
            />

            <p className="text-sm sm:text-base leading-relaxed max-w-sm" style={{ color: "var(--text-3)" }}>
              Technology that keeps organisations connected, productive and
              moving.
            </p>

            <Link
              href="/consultation"
              className="btn-pill group inline-flex items-center justify-center gap-2 self-start px-6 min-h-11 rounded-full text-sm font-bold transition-all duration-200"
              style={{ background: "var(--green-fill)", color: "var(--on-green)" }}
            >
              Book Appointment
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1">
                <path
                  fillRule="evenodd"
                  d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              {SocialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center justify-center transition-colors duration-200 hover:text-(--green-text)"
                  style={{ color: "var(--text-4)" }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact — wide enough that the address never breaks mid-word */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.12 }}
            className="lg:col-span-3 lg:order-3 flex flex-col gap-6"
          >
            <GroupHeading>Contact</GroupHeading>

            <ContactItem label="Address">
              2A Iller Crescent, Off Katsina Ala,
              <br />
              Maitama, FCT Abuja, Nigeria
            </ContactItem>

            <ContactItem label="Phone">
              <a href="tel:+2348163416011" className="block whitespace-nowrap transition-colors duration-200 hover:text-(--text-1)">
                +234 816 341 6011
              </a>
            </ContactItem>

            <ContactItem label="Email">
              <a
                href="mailto:info@connexxiontelecom.com"
                className="inline-block whitespace-nowrap transition-colors duration-200 hover:text-(--text-1)"
              >
                info@connexxiontelecom.com
              </a>
            </ContactItem>

            <ContactItem label="Business Hours">
              Mon – Sat &nbsp;9:00 – 18:00
              <br />
              <span style={{ color: "var(--text-4)" }}>Closed Sunday</span>
            </ContactItem>
          </motion.div>

          {/* Navigation — two sub-columns on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.06 }}
            className="hidden lg:grid lg:col-span-4 lg:order-2 grid-cols-2 gap-x-6"
          >
            {NAV_COLUMNS.map((groups, i) => (
              <NavColumn key={i} groups={groups} />
            ))}
          </motion.div>

          {/* Navigation — collapsed on mobile */}
          <div className="lg:hidden">
            <GroupHeading>Explore</GroupHeading>
            <div className="mt-3">
              {NAV_GROUPS.map((group) => (
                <NavAccordion
                  key={group.id}
                  group={group}
                  isOpen={openGroup === group.id}
                  onToggle={() => setOpenGroup(openGroup === group.id ? null : group.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Brand signature — a watermark, not a headline. Hidden from screen
            readers because the name is already in the legal line below. */}
        <div
          aria-hidden="true"
          className="mt-16 lg:mt-20 select-none pointer-events-none overflow-hidden"
        >
          <span
            className="block text-center font-extrabold leading-[0.85] tracking-[0.02em] whitespace-nowrap"
            // --text-5 alone still reads as a grey headline at this size; the
            // extra opacity takes it down to a watermark you notice second.
            style={{
              color: "var(--text-5)",
              opacity: 0.45,
              fontSize: "clamp(2.5rem, 13vw, 10rem)",
            }}
          >
            CONNEXXION
          </span>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-8 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid var(--border-2)" }}
        >
          {/* --text-4 is 25% white: 2.16:1 on the dark theme, well under the
              4.5:1 needed at this size. The legal row is small print, not
              invisible print. */}
          <p className="text-xs" style={{ color: "var(--text-2)" }}>
            © {year} Connexxion Telecom Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
            {LEGAL_LINKS.map(({ label, href }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <span style={{ color: "var(--text-4)" }}>·</span>}
                <Link
                  href={href}
                  className="underline underline-offset-4 decoration-1 transition-colors duration-200 hover:text-(--text-1)"
                  style={{ color: "var(--text-2)" }}
                >
                  {label}
                </Link>
              </React.Fragment>
            ))}
            <span style={{ color: "var(--text-4)" }}>·</span>
            <span style={{ color: "var(--text-2)" }} title="Nigerian Communications Commission Registered">
              NCC Registered
            </span>
            <span style={{ color: "var(--text-4)" }}>·</span>
            <span style={{ color: "var(--text-2)" }}>Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
