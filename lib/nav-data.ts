/* ─────────────────────────────────────────────────────────────
   Connexxion Telecom — Primary Navigation Data
   Shared between Navbar (desktop + mobile) and the consultation
   form, which reuses the solutions list for its category field.
───────────────────────────────────────────────────────────── */

export interface SimpleLink {
  label: string;
  href: string;
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
    heading: "Applications",
    href: "/solutions/applications",
    items: [
      { label: "Billing & Revenue Management", href: "/solutions/applications/billing-revenue-management" },
      { label: "CRM & Customer Care", href: "/solutions/applications/crm-customer-care" },
      { label: "Self-Care Portal", href: "/solutions/applications/self-care-portal" },
      { label: "Unified Communications", href: "/solutions/applications/unified-communications" },
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

/** Flat list of solution categories, used by the consultation form's category field. */
export const SOLUTION_CATEGORIES: string[] = [
  ...SOLUTIONS_COLUMNS.flatMap((col) => col.items.map((item) => item.label)),
  "Other",
];
