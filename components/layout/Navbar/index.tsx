"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_ENTRIES } from "@/lib/nav-data";
import { HamburgerIcon } from "@/components/ui/icons/HamburgerIcon";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { NavDropdown } from "./NavDropdown";
import { MobileDrawer } from "./MobileDrawer";
import { isEntryActive } from "./utils";

/* ─── Main Navbar ─── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Close any open menus when the route changes (adjusted during render, per
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenMenu(null);
    setDrawerOpen(false);
  }

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const openMenuNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeMenuSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

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
            : { background: "transparent", backdropFilter: "blur(0px)" }
        }
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18 gap-4">
            {/* Logo */}
            <Logo />

            {/* Desktop center: nav */}
            <div className="hidden lg:flex items-center flex-1 justify-center gap-1">
              <nav className="flex items-center gap-1">
                {NAV_ENTRIES.map((entry) =>
                  entry.type === "link" ? (
                    <NavLink
                      key={entry.label}
                      href={entry.href}
                      label={entry.label}
                      active={isEntryActive(entry, pathname)}
                    />
                  ) : (
                    <NavDropdown
                      key={entry.label}
                      entry={entry}
                      isOpen={openMenu === entry.label}
                      onOpen={() => openMenuNow(entry.label)}
                      onClose={closeMenuSoon}
                      onNavigate={() => setOpenMenu(null)}
                      active={isEntryActive(entry, pathname)}
                    />
                  ),
                )}
              </nav>
            </div>

            {/* Desktop right: theme toggle + CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <ThemeToggle />
              <Link
                href="/consultation"
                className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  boxShadow: "var(--cta-shadow)",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                  }}
                />
                <span className="relative">Book Free Consultation</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2.5 rounded-lg transition-colors shrink-0"
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
        pathname={pathname}
      />
    </>
  );
}
