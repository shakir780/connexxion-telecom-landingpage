/* ─────────────────────────────────────────────────────────────
   Connexxion Telecom — Primary Navigation Data
   Shared between Navbar (desktop + mobile) and the consultation
   form, which reuses the solutions list for its category field.
───────────────────────────────────────────────────────────── */

import { SOLUTIONS } from "@/lib/solutions-data";

export interface SimpleLink {
  label: string;
  /** Absent means there is nowhere to go yet; render as plain text. */
  href?: string;
}

export interface GridColumn {
  heading: string;
  href: string;
  items: SimpleLink[];
}

export type NavEntry =
  | { type: "link"; label: string; href: string }
  | { type: "list"; label: string; matchPrefixes: string[]; items: SimpleLink[] }
  | { type: "grid"; label: string; matchPrefixes: string[]; columns: GridColumn[] };

export const SOLUTIONS_COLUMNS: GridColumn[] = [
  {
    /* The platforms link straight to their own sites rather than to a page
       here. CNX 1GOV has no site yet, so it carries no href and renders as
       plain text. Billing, CRM, Unified Communications and Self-Care Portal
       keep their pages and stay listed on /solutions/applications; they are
       simply no longer surfaced in the dropdown. */
    heading: "Applications",
    href: "/solutions/applications",
    items: [
      { label: "CNX 247 (ERP)", href: "https://www.cnx247.com/" },
      { label: "CNX 1GOV (ERP)" },
      { label: "iCoop for Cooperatives", href: "https://www.icoop.ng/" },
      { label: "HR Management", href: "/solutions/applications/hr-management" },
      { label: "Savings and Loan Application", href: "/solutions/applications/savings-and-loan" },
    ],
  },
  {
    heading: "Infrastructure",
    href: "/solutions/infrastructure",
    items: [
      { label: "Network Core Solutions", href: "/solutions/infrastructure/network-core" },
      { label: "Cloud & Data Center", href: "/solutions/infrastructure/cloud-data-center" },
      { label: "Cybersecurity", href: "/solutions/infrastructure/cybersecurity" },
      { label: "Managed Services", href: "/solutions/infrastructure/managed-services" },
    ],
  },
];

export const NAV_ENTRIES: NavEntry[] = [
  { type: "link", label: "Home", href: "/" },
  {
    type: "list",
    label: "About Us",
    matchPrefixes: ["/about", "/team"],
    items: [
      { label: "Company Overview", href: "/about/overview" },
      { label: "Mission", href: "/about/mission" },
      { label: "Team", href: "/team" },
      { label: "Why Us?", href: "/about/why-us" },
    ],
  },
  {
    type: "grid",
    label: "Solutions",
    matchPrefixes: ["/solutions"],
    columns: SOLUTIONS_COLUMNS,
  },
  {
    type: "list",
    label: "Insights",
    matchPrefixes: ["/insights"],
    items: [
      { label: "Blogs", href: "/insights/blog" },
      { label: "Case Studies", href: "/insights/case-studies" },
      { label: "Press Releases", href: "/insights/press-releases" },
      { label: "Events", href: "/insights/events" },
      { label: "Join Our Community", href: "/insights/community" },
    ],
  },
  { type: "link", label: "Contact", href: "/consultation" },
];

/** Flat list of solution categories, used by the consultation form's category
    field. Every solution page pre-selects this field through ?topic=, matching
    on its own `topic` string, so the list has to cover all of them. It is
    therefore built from the solutions data rather than from the dropdown: the
    dropdown no longer lists every solution, and deriving it from there would
    silently break the preselect on the pages left out. */
export const SOLUTION_CATEGORIES: string[] = [
  ...SOLUTIONS.map((s) => s.topic),
  "Other",
];
