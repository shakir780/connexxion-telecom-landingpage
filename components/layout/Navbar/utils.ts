import type { NavEntry } from "@/lib/nav-data";

/* ─── Active-state matching ─── */
export function isEntryActive(entry: NavEntry, pathname: string): boolean {
  if (entry.type === "link")
    return entry.href === "/"
      ? pathname === "/"
      : pathname.startsWith(entry.href);
  return entry.matchPrefixes.some((prefix) => pathname.startsWith(prefix));
}
