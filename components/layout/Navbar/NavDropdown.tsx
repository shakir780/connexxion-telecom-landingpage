import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { NavEntry } from "@/lib/nav-data";
import { Chevron } from "@/components/ui/icons/Chevron";
import { DropdownItem } from "./DropdownItem";

/* ─── Desktop dropdown (list or grid) ─── */
export function NavDropdown({
  entry,
  isOpen,
  onOpen,
  onClose,
  onNavigate,
  active,
}: {
  entry: Extract<NavEntry, { type: "list" | "grid" }>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
  active: boolean;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? onClose() : onOpen())}
        className="nav-link relative flex items-center gap-1 text-sm font-medium py-1 px-3"
        style={active || isOpen ? { color: "var(--text-1)" } : undefined}
      >
        {entry.label}
        <Chevron open={isOpen} />
        <span
          className="absolute -bottom-0.5 left-3 right-3 h-px bg-green-500 transition-all duration-300"
          style={{ width: active ? "calc(100% - 1.5rem)" : "0%" }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-40"
          >
            {/* nav-surface: this panel is an opaque themed surface inside a
                nav that repaints its subtree white over the hero photo — the
                class hands it back the page palette (see globals.css). */}
            <div
              className="nav-surface rounded-2xl p-3 shadow-xl"
              style={{
                background: "var(--nav-panel-bg)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid var(--border-1)",
                boxShadow: "var(--shadow-lg)",
                width: entry.type === "grid" ? 440 : 240,
              }}
            >
              {entry.type === "list" ? (
                <div className="flex flex-col gap-0.5">
                  {entry.items.map((item) => (
                    <DropdownItem
                      key={item.href}
                      item={item}
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {entry.columns.map((col) => (
                    <div key={col.href} className="flex flex-col gap-0.5">
                      <Link
                        href={col.href}
                        onClick={onNavigate}
                        className="flex items-center gap-2 px-3 pb-2 mb-1 text-xs font-bold tracking-widest uppercase"
                        style={{
                          color: "var(--green-text)",
                          borderBottom: "1px solid var(--border-2)",
                        }}
                      >
                        <span
                          className="w-3 h-px"
                          style={{ background: "#22c55e" }}
                        />
                        {col.heading}
                      </Link>
                      {col.items.map((item) => (
                        <DropdownItem
                          key={item.href}
                          item={item}
                          onNavigate={onNavigate}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
