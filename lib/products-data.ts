/* ─────────────────────────────────────────────────────────────
   Connexxion Telecom — Products

   Names, taglines, descriptions and demo video IDs are the ones already used
   in the homepage products section; the feature lists are that same copy
   ("CRM, HR, Payroll, Loan automation, document management") split into
   items rather than new claims.

   `relatedSolutions` points at the Solutions pages, which is a real mapping:
   billing, CRM, self-service and communications are the capability areas
   these platforms deliver.

   Not claimed anywhere: pricing, module counts, deployment options,
   integrations, or customer numbers. None of that is published.
───────────────────────────────────────────────────────────── */

export interface Product {
  slug: string;
  name: string;
  /** Sector line, e.g. "Public Sector" */
  label: string;
  category: string;
  boldDescription: string;
  description: string;
  /** YouTube id; null means no demo reel exists yet */
  videoId: string | null;
  /** Split from the description copy — not new claims */
  features: string[];
  audience: string;
  /** Slugs under /solutions/applications */
  relatedSolutions: { slug: string; title: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "igov",
    name: "iGov",
    label: "Public Sector",
    category: "Government Technology",
    boldDescription:
      "The all-in-one platform for modern Governing Bodies and Agencies",
    description: "Built for Compliance, Engineered for Scale…",
    videoId: null,
    features: [],
    audience:
      "Ministries, agencies and governing bodies digitising the processes citizens and staff deal with every day.",
    relatedSolutions: [{ slug: "self-care-portal", title: "Self-Care Portal" }],
    metaTitle: "iGov — Government Technology Platform | Connexxion Telecom",
    metaDescription:
      "iGov is Connexxion Telecom's all-in-one platform for modern governing bodies and agencies — built for compliance, engineered for scale.",
  },
  {
    slug: "cnx247",
    name: "CNX247",
    label: "Business Operations",
    category: "Business Management Suite",
    boldDescription: "Unified tool designed to boost business productivity",
    description: "CRM, HR, Payroll, Loan automation, document management",
    videoId: "4Fmw7odzLnw",
    features: [
      "CRM",
      "HR",
      "Payroll",
      "Loan automation",
      "Document management",
    ],
    audience:
      "Commercial organisations that want customer records, people, payroll and documents in one system rather than four.",
    relatedSolutions: [
      { slug: "billing-revenue-management", title: "Billing & Revenue Management" },
      { slug: "crm-customer-care", title: "CRM & Customer Care" },
      { slug: "unified-communications", title: "Unified Communications" },
    ],
    metaTitle: "CNX247 — Business Management Suite | Connexxion Telecom",
    metaDescription:
      "CNX247 is Connexxion Telecom's own ERP: CRM, HR, payroll, loan automation and document management in one unified business productivity suite.",
  },
  {
    slug: "icoop",
    name: "iCoop",
    label: "Cooperatives",
    category: "Cooperative Management",
    boldDescription: "Purpose built for cooperatives",
    description: "Track finance, savings, loan applications and more",
    videoId: "F2Ib73fEg9c",
    features: ["Finance", "Savings", "Loan applications", "Member records"],
    audience:
      "Cooperative and thrift societies managing member savings, contributions and loan books.",
    relatedSolutions: [
      { slug: "billing-revenue-management", title: "Billing & Revenue Management" },
      { slug: "self-care-portal", title: "Self-Care Portal" },
    ],
    metaTitle: "iCoop — Cooperative Management Platform | Connexxion Telecom",
    metaDescription:
      "iCoop is purpose built for cooperatives — track finance, savings, loan applications and member records in one platform from Connexxion Telecom.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
