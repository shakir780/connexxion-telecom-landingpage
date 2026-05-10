"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Solutions", href: "#solutions" },
  { label: "Network", href: "#network" },
  { label: "Enterprise", href: "#enterprise" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ─── Logo ─── */
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none">
      <div className="relative flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          }}
        />
        {/* Signal icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="relative z-10">
          <path d="M10 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="white" />
          <path d="M7 11.5A4.24 4.24 0 0 1 10 10.5a4.24 4.24 0 0 1 3 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4.5 9A7.75 7.75 0 0 1 10 7a7.75 7.75 0 0 1 5.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 6.5A11.17 11.17 0 0 1 10 3.5a11.17 11.17 0 0 1 8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-white font-bold text-sm tracking-wider uppercase">
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
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 group py-1"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-green-500 group-hover:w-full transition-all duration-300" />
    </Link>
  );
}

/* ─── Hamburger icon ─── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      <motion.span
        className="block h-0.5 bg-white rounded-full origin-center"
        animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="block h-0.5 bg-white rounded-full"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 bg-white rounded-full origin-center"
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
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll when drawer is open
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
              background: "rgba(10, 15, 28, 0.97)",
              borderLeft: "1px solid rgba(34, 197, 94, 0.15)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
              <Logo />
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/6 transition-colors"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-4 py-6 border-t border-white/6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="#contact"
                  onClick={onClose}
                  className="flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
                >
                  Get Started
                </Link>
              </motion.div>
              <p className="text-center text-xs text-zinc-600 mt-3">
                Enterprise solutions available
              </p>
            </div>
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

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-500"
        style={
          scrolled
            ? {
                background: "rgba(8, 12, 20, 0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
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
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="#contact"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 px-2"
              >
                Sign in
              </Link>
              <Link
                href="#contact"
                className="relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg btn-shine"
                style={{
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  boxShadow: "0 0 20px rgba(34,197,94,0.2)",
                }}
              >
                <span>Get Started</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2.5 rounded-lg hover:bg-white/6 transition-colors"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <HamburgerIcon open={false} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
