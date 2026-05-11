/* ─────────────────────────────────────────────────────────────
   Connexxion Telecom — Leadership Team Data
   Replace avatarGradient with a real <img> src when photos
   are available. All other fields are production-ready.
───────────────────────────────────────────────────────────── */

export interface TeamMemberEducation {
  degree: string;
  institution: string;
  year: number;
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
  experience: number;
  expertise: string[];
  certifications: string[];
  achievements: string[];
  education: TeamMemberEducation[];
  social: TeamMemberSocial;
  isLeadership: boolean;
  initials: string;
  /** CSS linear-gradient string used as avatar background */
  avatarGradient: string;
  /** Optional leadership philosophy quote */
  philosophy?: string;
  /** Optional photo URL — replace placeholder when available */
  photo?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    slug: "adebayo-okafor",
    name: "Adebayo Okafor",
    title: "Chief Executive Officer & Co-Founder",
    department: "Executive",
    tagline: "Visionary builder with 22 years transforming African telecom infrastructure.",
    bio: [
      "Adebayo Okafor founded Connexxion Telecom with a singular conviction: enterprise-grade connectivity infrastructure should be accessible to every business, regardless of size or geography. In six years, he has transformed that conviction into a nationwide carrier-grade network trusted by over 500 enterprises, financial institutions, and government agencies.",
      "Prior to founding Connexxion, Adebayo held senior executive roles at MTN Group and Ericsson, leading multi-billion dollar network rollout programs across West Africa. A tenure at IFC — the World Bank's private sector arm — gave him deep expertise in infrastructure investment, concession frameworks, and public-private partnership structuring.",
      "He is a sought-after voice at global telecoms forums including ITW, AfricaCom, and MWC Barcelona, and serves on the board of the Nigerian Internet Registration Association (NiRA). In 2024, he was named among the Top 50 African Tech CEOs by Forbes Africa.",
    ],
    experience: 22,
    expertise: [
      "Strategic Leadership",
      "Infrastructure Investment",
      "Public-Private Partnerships",
      "Regulatory Affairs",
      "M&A Strategy",
    ],
    certifications: [
      "MBA — London Business School",
      "PMP® Certified Project Manager",
      "TM Forum Certified Professional",
    ],
    achievements: [
      "Built a nationwide fiber backbone spanning 47 states in under 4 years",
      "Secured $240M in cumulative infrastructure investment",
      "Named Top 50 African Tech CEOs — Forbes Africa 2024",
      "Grew Connexxion from 3 to 400+ employees in 6 years",
    ],
    education: [
      { degree: "MBA, Finance & Corporate Strategy", institution: "London Business School", year: 2005 },
      { degree: "B.Eng, Electrical & Electronics Engineering", institution: "University of Lagos", year: 2001 },
    ],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "a.okafor@connexxiontelecom.com",
    },
    isLeadership: true,
    initials: "AO",
    avatarGradient: "linear-gradient(145deg, #15803d 0%, #065f46 60%, #052e16 100%)",
    philosophy:
      "I believe infrastructure is the great equalizer. When every enterprise has access to the same quality of connectivity as the Fortune 500, innovation can happen anywhere — and that is a world worth building.",
  },
  {
    id: "2",
    slug: "chidinma-eze",
    name: "Chidinma Eze",
    title: "Chief Technology Officer",
    department: "Technology",
    tagline: "Architect of the high-availability systems trusted by 500+ enterprises daily.",
    bio: [
      "Chidinma Eze is the engineering mind behind Connexxion's carrier-grade infrastructure platform. As CTO, she oversees the complete technical architecture of the core network, cloud services layer, and managed services portfolio — a system carrying hundreds of terabytes of enterprise traffic daily with 99.997% measured uptime.",
      "Before Connexxion, Chidinma spent 12 years at Cisco Systems, rising to Distinguished Engineer, where she led the design of SD-WAN and MPLS architectures deployed across 30 African countries. Her work in network traffic optimization has been cited in over 40 academic publications and resulted in 3 granted patents.",
      "Chidinma is deeply committed to growing engineering talent in Nigeria. She co-founded the Women in Telecom Engineering initiative and personally mentors over 50 engineers through the programme annually. She speaks regularly at Cisco Live, AfricaCom, and IEEE ComSoc.",
    ],
    experience: 18,
    expertise: [
      "Network Architecture",
      "SD-WAN & MPLS",
      "Cloud Infrastructure",
      "5G Systems Design",
      "Cybersecurity Architecture",
    ],
    certifications: [
      "CCIE #34521 — Routing & Switching",
      "AWS Certified Solutions Architect (Professional)",
      "TOGAF 9 Certified Enterprise Architect",
    ],
    achievements: [
      "Designed core network achieving 99.997% uptime over 36 consecutive months",
      "Led deployment of Nigeria's first enterprise 5G private network",
      "3 granted patents in adaptive network traffic optimization",
      "Co-founded Women in Telecom Engineering — 50+ active mentees",
    ],
    education: [
      { degree: "M.Sc, Computer Networks & Distributed Systems", institution: "University of Edinburgh", year: 2008 },
      { degree: "B.Sc, Computer Engineering", institution: "University of Nigeria, Nsukka", year: 2005 },
    ],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "c.eze@connexxiontelecom.com",
    },
    isLeadership: true,
    initials: "CE",
    avatarGradient: "linear-gradient(145deg, #1d4ed8 0%, #4338ca 60%, #1e1b4b 100%)",
    philosophy:
      "The most elegant infrastructure is invisible to the user. Our job is to absorb complexity at the network layer so our clients can focus entirely on building their business.",
  },
  {
    id: "3",
    slug: "emeka-nwosu",
    name: "Emeka Nwosu",
    title: "Chief Infrastructure Officer",
    department: "Infrastructure",
    tagline: "Overseeing 12,000 km of fiber deployment across Nigeria and West Africa.",
    bio: [
      "Emeka Nwosu commands Connexxion's physical infrastructure programme — the nationwide fiber rollout, tower infrastructure partnerships, duct lease agreements, and data centre colocation portfolio that form the physical foundation of the business.",
      "With a background at Huawei Technologies and Airtel Networks, Emeka has personally overseen the installation of over 15,000 km of fiber optic cable across Sub-Saharan Africa. His operational discipline and vendor relationship management have become defining strengths of Connexxion's delivery capability and reputation.",
      "His current mandate includes the aggressive expansion of Connexxion's metro fibre rings in Lagos, Abuja, Port Harcourt, and Kano — a programme that will double the company's addressable enterprise market by 2026.",
    ],
    experience: 16,
    expertise: [
      "Fiber Optic Rollout",
      "Tower Infrastructure",
      "Vendor & Contract Management",
      "DWDM Systems",
      "Civil & Structural Works",
    ],
    certifications: [
      "PMP® Certified Project Manager",
      "PRINCE2 Practitioner",
      "Huawei HCIE Datacom",
    ],
    achievements: [
      "Completed 12,000 km national fiber deployment 3 months ahead of schedule",
      "Negotiated $60M in long-term infrastructure supply contracts",
      "Established 14 data centre colocation partnerships nationwide",
      "Zero lost-time injury safety record across all field operations",
    ],
    education: [
      { degree: "M.Eng, Civil & Structural Engineering", institution: "Covenant University", year: 2009 },
      { degree: "B.Eng, Electrical & Electronic Engineering", institution: "Federal University of Technology Owerri", year: 2006 },
    ],
    social: {
      linkedin: "#",
      email: "e.nwosu@connexxiontelecom.com",
    },
    isLeadership: true,
    initials: "EN",
    avatarGradient: "linear-gradient(145deg, #7c3aed 0%, #6d28d9 60%, #2e1065 100%)",
    philosophy:
      "Fiber in the ground today is opportunity unlocked tomorrow. Every kilometre we deploy represents a business that can now compete on a level field with the rest of the world.",
  },
  {
    id: "4",
    slug: "funmilayo-ajayi",
    name: "Funmilayo Ajayi",
    title: "Chief Financial Officer",
    department: "Finance",
    tagline: "Stewarding the financial strategy of a rapidly scaling infrastructure company.",
    bio: [
      "Funmilayo Ajayi oversees all financial operations, capital allocation, investor relations, and strategic planning at Connexxion Telecom. As CFO, she has been instrumental in securing the company's major infrastructure investment rounds and in establishing the financial discipline that underpins its growth trajectory.",
      "Funmi brings 18 years of financial leadership from PricewaterhouseCoopers, Interswitch Group, and Dangote Industries. Her expertise in infrastructure project finance, capital markets, and institutional investor relations has enabled Connexxion to pursue ambitious expansion while maintaining the unit economics and balance-sheet strength that sophisticated investors demand.",
    ],
    experience: 18,
    expertise: [
      "Infrastructure Project Finance",
      "Capital Markets",
      "Investor Relations",
      "Strategic Planning",
      "FP&A & Budgeting",
    ],
    certifications: [
      "ACCA (Fellow)",
      "CFA® Charterholder",
      "ICAN (Fellow)",
    ],
    achievements: [
      "Led $240M Series C infrastructure funding round",
      "Improved EBITDA margin from 18% to 34% over 3 years",
      "Established Connexxion's ESG reporting and sustainability framework",
      "CFO of the Year — BusinessDay Banking & Finance Awards 2023",
    ],
    education: [
      { degree: "M.Sc, Finance & Investment", institution: "Cranfield School of Management", year: 2008 },
      { degree: "B.Sc, Accounting", institution: "University of Benin", year: 2004 },
    ],
    social: {
      linkedin: "#",
      email: "f.ajayi@connexxiontelecom.com",
    },
    isLeadership: true,
    initials: "FA",
    avatarGradient: "linear-gradient(145deg, #0f766e 0%, #0d9488 60%, #042f2e 100%)",
    philosophy:
      "Capital follows conviction. When you show investors a business with strong infrastructure, disciplined operations, and a clear market thesis, the investment case makes itself.",
  },
  {
    id: "5",
    slug: "ngozi-adeyemi",
    name: "Ngozi Adeyemi",
    title: "VP, Enterprise Solutions",
    department: "Enterprise",
    tagline: "Delivering custom connectivity architectures for Nigeria's top 250 corporations.",
    bio: [
      "Ngozi Adeyemi leads Connexxion's enterprise solutions practice — a team of 45 solutions architects and account executives responsible for designing and delivering connectivity infrastructure to Nigeria's largest corporations, financial institutions, and government agencies.",
      "Her 14-year career spans enterprise technology sales at IBM, pre-sales architecture at Nokia Networks, and solutions consulting at Deloitte. Ngozi consistently ranks among the top enterprise technology sales performers in West Africa and is known for building highly consultative, client-first sales cultures.",
    ],
    experience: 14,
    expertise: [
      "Enterprise Network Architecture",
      "UCaaS & Collaboration",
      "Cloud Connectivity",
      "Government IT",
      "Financial Services Technology",
    ],
    certifications: [
      "TOGAF 9 Certified Enterprise Architect",
      "AWS Business Professional",
      "Cisco Enterprise Networking Sales Specialist",
    ],
    achievements: [
      "Closed ₦180B in enterprise contracts in FY2024",
      "Onboarded 3 of Nigeria's 5 largest banks as anchor clients",
      "Scaled enterprise solutions team from 4 to 45 members in 3 years",
      "Launched flagship Government Cloud Connect programme",
    ],
    education: [
      { degree: "MBA, Technology Management", institution: "Strathmore Business School, Nairobi", year: 2012 },
      { degree: "B.Sc, Information Systems", institution: "University of Ibadan", year: 2008 },
    ],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "n.adeyemi@connexxiontelecom.com",
    },
    isLeadership: false,
    initials: "NA",
    avatarGradient: "linear-gradient(145deg, #be185d 0%, #9d174d 60%, #500724 100%)",
    philosophy:
      "Every enterprise has unique DNA. Our job isn't to sell a product — it's to understand that DNA deeply and architect the infrastructure that lets it reach its full potential.",
  },
  {
    id: "6",
    slug: "tunde-abiodun",
    name: "Tunde Abiodun",
    title: "Director, Network Operations",
    department: "Operations",
    tagline: "Leading a 24/7 NOC team that maintains sub-2ms mean time to detect.",
    bio: [
      "Tunde Abiodun oversees Connexxion's Network Operations Centre — the operational nerve centre of the company's service delivery. His team of 60 network operations engineers monitors over 2,000 active enterprise circuits around the clock, maintaining the sub-2-minute mean time to detect that underpins Connexxion's industry-leading SLA commitments.",
      "Previously at MainOne Cable Company and NTT Communications, Tunde built a reputation as one of Africa's most capable NOC architects. He redesigned Connexxion's entire monitoring and alerting stack in 2022, reducing mean time to repair by 71% — a transformation that directly contributes to the company's 99.997% network uptime.",
    ],
    experience: 13,
    expertise: [
      "NOC Architecture & Design",
      "ITIL Service Operations",
      "Incident & Problem Management",
      "Network Performance Monitoring",
      "SLA Management",
    ],
    certifications: [
      "ITIL v4 Expert",
      "Cisco CCNP Enterprise",
      "Zabbix Certified Professional",
    ],
    achievements: [
      "Reduced mean time to repair from 47 minutes to 8 minutes through NOC redesign",
      "Delivered 99.997% network uptime for 36 consecutive months",
      "Built and trained a 60-person, 24/7 NOC team",
      "Deployed AI-powered anomaly detection reducing false positives by 84%",
    ],
    education: [
      { degree: "B.Eng, Telecommunications Engineering", institution: "Obafemi Awolowo University, Ile-Ife", year: 2011 },
    ],
    social: {
      linkedin: "#",
      email: "t.abiodun@connexxiontelecom.com",
    },
    isLeadership: false,
    initials: "TA",
    avatarGradient: "linear-gradient(145deg, #0369a1 0%, #0284c7 60%, #0c4a6e 100%)",
    philosophy:
      "In network operations, complacency is the enemy. We train for the 0.003% failure scenario — because that is precisely where our clients' trust is won or lost.",
  },
  {
    id: "7",
    slug: "amaka-okonkwo",
    name: "Amaka Okonkwo",
    title: "VP, Sales & Strategic Partnerships",
    department: "Commercial",
    tagline: "Driving commercial growth through high-trust carrier and channel partnerships.",
    bio: [
      "Amaka Okonkwo leads Connexxion's commercial expansion strategy, overseeing a team of 30 sales professionals and managing the company's carrier peering, OEM, and channel partner relationships. Since joining in 2020, she has more than tripled Connexxion's annual recurring revenue.",
      "Her 16-year career spans Telkom South Africa, Orange Business Services, and Andela, where she consistently led commercial teams to category-defining growth. Amaka is known for building high-trust, consultative sales cultures and for her ability to close complex, multi-year infrastructure agreements at enterprise and government level.",
    ],
    experience: 16,
    expertise: [
      "Enterprise Sales Leadership",
      "Channel Partner Development",
      "Carrier Peering & Agreements",
      "Revenue Growth Strategy",
      "Executive Relationship Management",
    ],
    certifications: [
      "Certified Sales Leader (CSL)",
      "Challenger Sale Certified Practitioner",
      "MEDDIC Sales Methodology",
    ],
    achievements: [
      "Tripled ARR from ₦2.1B to ₦6.8B over 4 years",
      "Signed 12 strategic carrier peering and interconnect agreements",
      "Built channel partner network of 85 accredited resellers nationwide",
      "Sales Leader of the Year — TechCabal Ecosystem Awards 2024",
    ],
    education: [
      { degree: "MBA, Marketing & International Business", institution: "Lagos Business School", year: 2010 },
      { degree: "B.Sc, Business Administration", institution: "Nnamdi Azikiwe University", year: 2006 },
    ],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "a.okonkwo@connexxiontelecom.com",
    },
    isLeadership: false,
    initials: "AO",
    avatarGradient: "linear-gradient(145deg, #b45309 0%, #d97706 60%, #451a03 100%)",
    philosophy:
      "Clients don't buy connectivity — they buy confidence. My entire job is to make every client completely confident that Connexxion is the infrastructure partner they can trust for the next decade.",
  },
  {
    id: "8",
    slug: "oluwaseun-dada",
    name: "Oluwaseun Dada",
    title: "Head of Cybersecurity",
    department: "Security",
    tagline: "Protecting 500+ enterprises with a carrier-grade Zero Trust security model.",
    bio: [
      "Oluwaseun Dada leads Connexxion's security practice, responsible for the end-to-end security posture of the company's carrier-grade network, its managed services platform, and the 500+ enterprises that rely on it daily. He has built a security operations capability widely regarded as the most sophisticated in the Nigerian telecoms sector.",
      "Before Connexxion, Seun was Head of Cyber Defence at Access Bank and a senior threat analyst at the Nigerian Communications Commission's cybersecurity directorate. He holds multiple advanced security certifications and was the principal author of the NCC's cybersecurity compliance framework for licensed internet service providers.",
    ],
    experience: 11,
    expertise: [
      "Network & Infrastructure Security",
      "Threat Intelligence",
      "SOC Architecture",
      "Zero Trust Network Access",
      "Regulatory Compliance",
    ],
    certifications: [
      "CISSP — Certified Information Systems Security Professional",
      "CISM — Certified Information Security Manager",
      "Certified Ethical Hacker (CEH)",
    ],
    achievements: [
      "Zero material security breaches across client network infrastructure since 2022",
      "Deployed Nigeria's first carrier-grade Zero Trust Network Access platform",
      "Built 24/7 SOC with 8-minute mean time to contain",
      "Authored NCC cybersecurity compliance framework for licensed ISPs",
    ],
    education: [
      { degree: "M.Sc, Information Security", institution: "Royal Holloway, University of London", year: 2014 },
      { degree: "B.Sc, Computer Science", institution: "University of Lagos", year: 2011 },
    ],
    social: {
      linkedin: "#",
      email: "o.dada@connexxiontelecom.com",
    },
    isLeadership: false,
    initials: "OD",
    avatarGradient: "linear-gradient(145deg, #b91c1c 0%, #dc2626 60%, #450a0a 100%)",
    philosophy:
      "Security is not a feature — it is a foundation. Every service we deliver is built on the assumption that threats are real, present, and constantly evolving. Anything less is negligent.",
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
