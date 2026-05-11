"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

/* ─── Navigation structure ─── */
const NAV_LINKS = [
  { label: "About",    hash: "about" },
  { label: "Services", hash: "services" },
  { label: "Team",     hash: "team" },
  { label: "Partners", hash: "partners" },
  { label: "Contact",  hash: "contact" },
] as const;

type NavHash = (typeof NAV_LINKS)[number]["hash"];

/* ─── Active section via scroll offset ─── */
function useActiveSection(isHome: boolean): NavHash | "" {
  const [active, setActive] = useState<NavHash | "">("");

  useEffect(() => {
    if (!isHome) { setActive(""); return; }

    const NAV_OFFSET = 88;

    const compute = () => {
      const scrollY = window.scrollY + NAV_OFFSET;
      let current: NavHash | "" = "";
      for (const { hash } of NAV_LINKS) {
        const el = document.getElementById(hash);
        if (el && el.offsetTop <= scrollY) current = hash;
      }
      setActive(current);
    };

    window.addEventListener("scroll", compute, { passive: true });
    compute();
    return () => window.removeEventListener("scroll", compute);
  }, [isHome]);

  return active;
}

/* ─── Logo ─── */
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none">
      <div className="relative flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
        />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="relative z-10">
          <path d="M10 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="white" />
          <path d="M7 11.5A4.24 4.24 0 0 1 10 10.5a4.24 4.24 0 0 1 3 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4.5 9A7.75 7.75 0 0 1 10 7a7.75 7.75 0 0 1 5.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 6.5A11.17 11.17 0 0 1 10 3.5a11.17 11.17 0 0 1 8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-sm tracking-wider uppercase" style={{ color: "var(--text-1)" }}>
          Connexxion
        </span>
        <span className="text-green-500 text-[9px] tracking-[0.2em] uppercase font-medium">
          Telecom
        </span>
      </div>
    </Link>
  );
}

/* ─── Desktop nav link ─── */
function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="nav-link relative text-sm font-medium py-1 group"
      style={active ? { color: "var(--text-1)" } : undefined}
    >
      {label}
      {/* Active/hover underline */}
      <span
        className="absolute -bottom-0.5 left-0 h-px bg-green-500 transition-all duration-300"
        style={{ width: active ? "100%" : "0%", opacity: active ? 1 : undefined }}
      />
      {/* Hover underline (only when not active) */}
      {!active && (
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-green-500 group-hover:w-full transition-all duration-300" />
      )}
    </Link>
  );
}

/* ─── Hamburger icon ─── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      <motion.span
        className="block h-0.5 rounded-full origin-center"
        style={{ background: "var(--text-1)" }}
        animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="block h-0.5 rounded-full"
        style={{ background: "var(--text-1)" }}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 rounded-full origin-center"
        style={{ background: "var(--text-1)" }}
        animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}

/* ─── Mobile Drawer ─── */
function MobileDrawer({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string; active: boolean }>;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col"
            style={{
              background: "var(--nav-scrolled-bg)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderLeft: "1px solid var(--border-green, rgba(34,197,94,0.15))",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid var(--border-1)" }}
            >
              <Logo />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-colors"
                  style={{ background: "var(--bg-input)" }}
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 4L4 12M4 4l8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{ color: "var(--text-1)" }}
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="drawer-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium group"
                    style={
                      link.active
                        ? {
                            color: "var(--text-1)",
                            background: "rgba(34,197,94,0.07)",
                            borderLeft: "2px solid rgba(34,197,94,0.6)",
                          }
                        : undefined
                    }
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-green-500 transition-opacity"
                      style={{ opacity: link.active ? 1 : 0 }}
                    />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Navbar ─── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Build resolved link objects once per render */
  const resolvedLinks = NAV_LINKS.map((link) => ({
    label: link.label,
    href: isHome ? `#${link.hash}` : `/#${link.hash}`,
    active: link.hash === activeSection,
  }));

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500${!scrolled ? " nav-not-scrolled" : ""}`}
        style={
          scrolled
            ? {
                background: "var(--nav-scrolled-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid var(--nav-border)",
                boxShadow: "var(--nav-shadow)",
              }
            : {
                background: "transparent",
                backdropFilter: "blur(0px)",
              }
        }
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* Desktop center nav */}
            <nav className="hidden md:flex items-center gap-8">
              {resolvedLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} active={link.active} />
              ))}
            </nav>

            {/* Desktop right: theme toggle */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2.5 rounded-lg transition-colors"
              style={{ background: "var(--bg-input)" }}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <HamburgerIcon open={false} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={resolvedLinks}
      />
    </>
  );
}
