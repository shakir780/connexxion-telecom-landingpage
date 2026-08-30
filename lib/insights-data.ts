/* ─────────────────────────────────────────────────────────────
   Connexxion Telecom — Insights

   The three article teasers below already existed in the homepage Insights
   section; they are moved here so the homepage and the blog index read from
   one source instead of drifting apart.

   Nothing else in this module is invented, and deliberately so:

     • Case studies describe real engagements with real clients. This site
       names SLB, NSIB, Huawei, MSI, AYM Shafa and PLAC, so a written-up case
       study is a claim about work done for an identifiable organisation.
     • Press releases are dated public statements. Writing one that was never
       issued fabricates a record.
     • Events have dates, venues and attendees.

   So sections with no supplied content render an honest empty state rather
   than filler, and article pages show what is known without inventing a body.
   Supply the real material and these become ordinary content entries.
───────────────────────────────────────────────────────────── */

export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date?: string;
  /** Body copy, once written. Absent means the teaser exists but the piece does not. */
  body?: string[];
}

export interface InsightsSection {
  slug: string;
  title: string;
  intro: string;
  /** Shown when the section has nothing in it yet */
  emptyLine: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "choosing-sme-software",
    category: "Business Software",
    title: "Choosing SME Software",
    excerpt:
      "A practical guide to evaluating and selecting the right business management software as your SME scales.",
    readTime: "5 min read",
  },
  {
    slug: "digitising-cooperative-management",
    category: "Cooperatives",
    title: "Digitising Cooperative Management",
    excerpt:
      "How cooperative societies are moving from paper ledgers to digital platforms for savings, loans, and compliance.",
    readTime: "4 min read",
  },
  {
    slug: "paperless-government-in-nigeria",
    category: "GovTech",
    title: "Paperless Government in Nigeria",
    excerpt:
      "Examining Nigeria's shift toward paperless, digital-first public service delivery — and what it means for agencies.",
    readTime: "6 min read",
  },
];

/* The services that link out to a case study. Titles only — these exist so
   the "View Case Study" links resolve to a page that explains the study is
   not published yet, rather than to a 404. */
export const CASE_STUDY_SUBJECTS: { slug: string; service: string }[] = [
  { slug: "network-infrastructure", service: "Network Infrastructure" },
  { slug: "fibre-optic-solutions", service: "Fibre Optic Solutions" },
  { slug: "enterprise-voip", service: "Enterprise VoIP" },
  { slug: "server-cloud-administration", service: "Server & Cloud Administration" },
  { slug: "bespoke-software-services", service: "Bespoke Software Services" },
  { slug: "cctv-security", service: "CCTV & Security" },
  { slug: "managed-it-support", service: "Managed IT Support" },
];

export const INSIGHTS_SECTIONS: InsightsSection[] = [
  {
    slug: "blog",
    title: "Blog",
    intro:
      "Notes on the technology decisions Nigerian organisations are actually making — what works, what does not, and what it costs to find out.",
    emptyLine: "No articles have been published yet.",
  },
  {
    slug: "case-studies",
    title: "Case Studies",
    intro:
      "Write-ups of the work: what the organisation needed, what was deployed, and what changed afterwards.",
    emptyLine:
      "No case studies have been published yet. Client work is only written up with the client's agreement.",
  },
  {
    slug: "press-releases",
    title: "Press Releases",
    intro: "Announcements from Connexxion Telecom.",
    emptyLine: "No press releases have been issued yet.",
  },
  {
    slug: "events",
    title: "Events",
    intro:
      "Where to find us — conferences, briefings and sessions we are running or attending.",
    emptyLine: "No events are scheduled at the moment.",
  },
  {
    slug: "community",
    title: "Join Our Community",
    intro:
      "For people building and running technology in Nigerian institutions: occasional notes, invitations and early access to what we publish.",
    emptyLine: "Community sign-up is not open yet.",
  },
];

export function getInsightsSection(slug: string): InsightsSection | undefined {
  return INSIGHTS_SECTIONS.find((s) => s.slug === slug);
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getCaseStudySubject(slug: string) {
  return CASE_STUDY_SUBJECTS.find((c) => c.slug === slug);
}
