import Link from "next/link";

/* ─── Desktop simple nav link ─── */
export function NavLink({
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
      className="nav-link relative text-sm font-medium py-1 px-3 group"
      style={active ? { color: "var(--text-1)" } : undefined}
    >
      {label}
      <span
        className="absolute -bottom-0.5 left-3 right-3 h-px bg-green-500 transition-all duration-300"
        style={{ width: active ? "calc(100% - 1.5rem)" : "0%" }}
      />
      {!active && (
        <span className="absolute -bottom-0.5 left-3 w-0 h-px bg-green-500 group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
      )}
    </Link>
  );
}
