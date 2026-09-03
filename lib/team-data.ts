/* ─────────────────────────────────────────────────────────────
   Connexxion Telecom — Team Data

   Sourced from the live team pages at telecom.connexxiongroup.com.
   Everything here is stated publicly by the company about real,
   named people, so nothing in this file should be invented — no
   filled-in years of experience, no plausible-sounding
   certifications, no made-up awards. Where the company has not
   published a detail, the field is left empty and the profile page
   omits that section rather than showing a heading with nothing
   under it.
───────────────────────────────────────────────────────────── */

export interface TeamMemberEducation {
  degree: string;
  /** Omitted where the company has not published the institution */
  institution?: string;
  /** Omitted where the company has not published the year */
  year?: number;
}

export interface TeamMemberSocial {
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  title: string;
  department: string;
  tagline: string;
  bio: string[];
  /** Years in industry — omitted unless published */
  experience?: number;
  expertise: string[];
  certifications: string[];
  achievements: string[];
  education: TeamMemberEducation[];
  social: TeamMemberSocial;
  isLeadership: boolean;
  initials: string;
  /** Flat colour shown behind the initials when there is no photo */
  avatarColor: string;
  /** Optional leadership quote */
  philosophy?: string;
  /** Portrait in /public/images/team */
  photo?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    slug: "maxwell-esan",
    name: "Maxwell Esan",
    title: "Group Managing Director",
    department: "Executive",
    tagline:
      "Electrical/Electronic engineer and iNARTE-certified executive who has held managerial and executive roles across America, Angola and Nigeria.",
    bio: [
      "Engr. Esan, a graduate of Electrical/Electronic Engineering with a master's degree in Micro-Processor and Control Engineering, has numerous professional certifications including being iNARTE certified. He has served at various managerial and executive positions of various organizations in America, Angola and Nigeria.",
      "He was a Managing Partner with Intels Security and Communications Solution before he moved back to Nigeria as MD of X-clusive Technologies Ltd.",
      "He is currently one of the International Advisers on Telecommunications integration standards to Polycom and Tandberg. He serves on the board of various organizations across Africa, is an executive director on the board of Emabel Industrial Company, and is Chairman of the Board of Trustees for the Initiative for Entrepreneurship and Talent Advancement (IETA) and Africa Vision Development Initiative (AVDI).",
      "It is his bold, innovative, well thought out approach and exemplary leadership that drives the spirit of excellence in this fast-evolving and growing company.",
    ],
    expertise: [
      "Telecommunications Integration",
      "Executive Leadership",
      "Security & Communications Solutions",
      "Board Advisory",
    ],
    certifications: ["iNARTE Certified"],
    achievements: [
      "Global Expert of the Year — International Who's Who of Professionals, Washington DC",
      "West African Corporate Personality of the Year — West African Freelance Journalists Association, January 2020",
      "Humanitarian Service Award — International Human Rights Protection Service, Florida, USA",
      "International Adviser on telecommunications integration standards to Polycom and Tandberg",
    ],
    education: [
      { degree: "M.Sc, Micro-Processor and Control Engineering" },
      { degree: "B.Eng, Electrical/Electronic Engineering" },
    ],
    social: {},
    isLeadership: true,
    initials: "ME",
    avatarColor: "#14532d",
    photo: "/images/team/maxwell-esan.jpg",
    philosophy:
      "We assist a wide range of clients both locally and internationally, specifically in Nigeria, Angola, Niger, and the USA, to maximize resources while increasing productivity in collaboration with our partners.",
  },
  {
    id: "2",
    slug: "lauretta-chinenye",
    name: "Lauretta Chinenye",
    title: "Head of Business Development",
    department: "Business Development",
    tagline:
      "A multi-skilled business analyst with a background in oil, gas and energy management.",
    bio: [
      "A multi-skilled business analyst, Lauretta holds a Bachelor of Science degree in Oil, Gas & Energy Management, as well as an MBA from the University of Plymouth, UK.",
    ],
    expertise: [],
    certifications: [],
    achievements: [],
    education: [
      { degree: "MBA", institution: "University of Plymouth, UK" },
      { degree: "B.Sc, Oil, Gas & Energy Management" },
    ],
    social: {},
    isLeadership: true,
    initials: "LC",
    avatarColor: "#134e4a",
    photo: "/images/team/lauretta-chinenye.jpg",
  },
  {
    /* Provisional entry. The company has not published a written profile for
       this role, so the copy below describes the remit of the GM Telecom
       position using Connexxion's own service lines — it states nothing
       personal about the holder. No degrees, certifications, awards or years
       of experience are recorded here, and those arrays stay empty until the
       company publishes them. Replace the name, tagline and bio with the
       official copy when it exists. */
    id: "3",
    slug: "pius",
    name: "Pius",
    title: "General Manager, Telecom",
    department: "Telecom",
    tagline:
      "General Manager for the telecom business, accountable for the network and managed-service delivery our clients run on.",
    bio: [
      "Pius is General Manager of Connexxion's telecom business, with responsibility for the delivery of the company's core network, infrastructure and managed-service lines.",
      "His remit covers the teams that design, deploy and operate client environments — from network core and transmission through to the day-to-day managed services that keep those environments available.",
    ],
    expertise: [],
    certifications: [],
    achievements: [],
    education: [],
    social: {},
    isLeadership: true,
    initials: "P",
    avatarColor: "#164e63",
    photo: "/images/team/pius.jpg",
  },
];

/** Look up a single member by slug */
export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.slug === slug);
}

/** C-Suite / executive leadership only */
export function getLeadershipTeam(): TeamMember[] {
  return TEAM_MEMBERS.filter((m) => m.isLeadership);
}
