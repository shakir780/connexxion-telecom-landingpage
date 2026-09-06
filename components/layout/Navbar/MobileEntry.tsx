import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { NavEntry, SimpleLink } from "@/lib/nav-data";
import { Chevron } from "@/components/ui/icons/Chevron";

/* One row in the drawer. Mirrors DropdownItem: an item with no href has
   nowhere to go yet and renders as plain text, and an off-site href opens in
   a new tab. */
function DrawerItem({
  item,
  onNavigate,
  className,
}: {
  item: SimpleLink;
  onNavigate: () => void;
  className: string;
}) {
  if (!item.href) {
    return (
      <span className={className} style={{ color: "var(--text-4)" }}>
        {item.label} <span className="text-[10px] uppercase">soon</span>
      </span>
    );
  }
  const external = item.href.startsWith("http");
  return (
    <Link
      key={item.label}
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
      className={className}
    >
      {item.label}
    </Link>
  );
}

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
                    <DrawerItem
                      key={item.label}
                      item={item}
                      onNavigate={onNavigate}
                      className="drawer-link px-3 py-2 rounded-lg text-sm"
                    />
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
                        <DrawerItem
                          key={item.label}
                          item={item}
                          onNavigate={onNavigate}
                          className="drawer-link block px-3 py-2 rounded-lg text-sm"
                        />
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
