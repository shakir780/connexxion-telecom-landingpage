"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_ENTRIES } from "@/lib/nav-data";
import { SearchIcon } from "@/components/ui/icons/SearchIcon";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { Logo } from "./Logo";
import { MobileEntry } from "./MobileEntry";
import { isEntryActive } from "./utils";

/* ─── Mobile Drawer ─── */
export function MobileDrawer({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="nav-surface fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[88vw] flex flex-col"
            style={{
              background: "var(--nav-panel-bg)",
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
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="px-6 pt-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (query.trim()) {
                    router.push(
                      `/search?q=${encodeURIComponent(query.trim())}`,
                    );
                    onClose();
                  }
                }}
                className="relative"
              >
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-3)",
                    color: "var(--text-1)",
                  }}
                />
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-3)" }}
                >
                  <SearchIcon />
                </span>
              </form>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 px-4 py-6 flex-1 overflow-y-auto">
              {NAV_ENTRIES.map((entry, i) => (
                <motion.div
                  key={entry.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <MobileEntry
                    entry={entry}
                    active={isEntryActive(entry, pathname)}
                    expanded={expanded === entry.label}
                    onToggle={() =>
                      setExpanded((prev) =>
                        prev === entry.label ? null : entry.label,
                      )
                    }
                    onNavigate={onClose}
                  />
                </motion.div>
              ))}
            </nav>

            {/* CTA */}
            <div
              className="px-6 py-5"
              style={{ borderTop: "1px solid var(--border-1)" }}
            >
              <Link
                href="/consultation"
                onClick={onClose}
                className="btn-pill flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full font-bold text-sm text-white"
                style={{
                  background:
                    "#22c55e",
                }}
              >
                Book Free Consultation
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
