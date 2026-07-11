import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { NavEntry } from "@/lib/nav-data";
import { Chevron } from "@/components/ui/icons/Chevron";

/* ─── Mobile accordion entry ─── */
export function MobileEntry({
  entry,
  active,
  expanded,
  onToggle,
  onNavigate,
}: {
  entry: NavEntry;
  active: boolean;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  if (entry.type === "link") {
    return (
      <Link
        href={entry.href}
        onClick={onNavigate}
        className="drawer-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
        style={
          active
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
          style={{ opacity: active ? 1 : 0 }}
        />
        {entry.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="drawer-link w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium"
        style={active || expanded ? { color: "var(--text-1)" } : undefined}
      >
        <span className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-500 transition-opacity"
            style={{ opacity: active ? 1 : 0 }}
          />
          {entry.label}
        </span>
        <Chevron open={expanded} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 pl-8 pr-2 py-1">
              {entry.type === "list"
                ? entry.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className="drawer-link px-3 py-2 rounded-lg text-sm"
                    >
                      {item.label}
                    </Link>
                  ))
                : entry.columns.map((col) => (
                    <div key={col.href} className="mb-2">
                      <Link
                        href={col.href}
                        onClick={onNavigate}
                        className="block px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase"
                        style={{ color: "var(--green-text)" }}
                      >
                        {col.heading}
                      </Link>
                      {col.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onNavigate}
                          className="drawer-link block px-3 py-2 rounded-lg text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
