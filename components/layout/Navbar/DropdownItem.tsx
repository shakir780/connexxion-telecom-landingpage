import Link from "next/link";
import type { SimpleLink } from "@/lib/nav-data";

/* ─── Dropdown panel item ─── */
export function DropdownItem({
  item,
  onNavigate,
}: {
  item: SimpleLink;
  onNavigate: () => void;
}) {
  // No destination yet: the row still shows the name, but is not clickable.
  if (!item.href) {
    return (
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
        style={{ color: "var(--text-4)" }}
      >
        <span className="w-1 h-1 rounded-full shrink-0 opacity-0" />
        {item.label}
        <span className="ml-auto text-[10px] uppercase tracking-wider">
          Soon
        </span>
      </div>
    );
  }

  const external = item.href.startsWith("http");

  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
      className="group flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150"
      style={{ color: "var(--text-2)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
        (e.currentTarget as HTMLElement).style.background = "var(--bg-input)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      <span
        className="w-1 h-1 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "#22c55e" }}
      />
      {item.label}
    </Link>
  );
}
