/* ─────────────────────────────────────────────────────────────
   Connexxion Telecom — Services

   Titles, summaries and imagery are the ones already used in the homepage
   services section. `relatedSolutions` is a real mapping onto the Solutions
   pages — the capability area each service delivers.

   Not claimed: response times beyond the published 24/7/365 NOC, coverage
   figures, equipment vendors, pricing or client names.
───────────────────────────────────────────────────────────── */

export interface Service {
  slug: string;
  title: string;
  summary: string;
  group: string;
  image: string;
  imageAlt: string;
  /** Path under /solutions — the capability area this service delivers */
  relatedSolution?: { href: string; title: string };
  metaDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: "network-infrastructure",
    title: "Network Infrastructure",
    summary: "Reliable LAN/WAN infrastructure designed for growing organisations.",
    group: "Connect",
    image: "/images/Network Infrastructure C2.webp",
    imageAlt: "Telecom masts and antennas broadcasting across a city skyline",
    relatedSolution: {
      href: "/solutions/infrastructure/network-core",
      title: "Network Core Solutions",
    },
    metaDescription:
      "High-availability network design, structured cabling and LAN/WAN build for enterprise environments, delivered by Connexxion Telecom engineers nationwide.",
  },
  {
    slug: "fibre-optic-solutions",
    title: "Fibre Optic Solutions",
    summary: "High-speed fibre networks built for low latency and long-term reliability.",
    group: "Connect",
    image: "/images/Fibre Optics Solutions C2.webp",
    imageAlt: "Fibre optic cables and connectors carrying light through a switch",
    relatedSolution: {
      href: "/solutions/infrastructure/network-core",
      title: "Network Core Solutions",
    },
    metaDescription:
      "Fibre network implementation with ultra-low latency — trenching, splicing and long-term maintenance from Connexxion Telecom.",
  },
  {
    slug: "enterprise-voip",
    title: "Enterprise VoIP",
    summary: "Business communication systems designed for distributed teams.",
    group: "Connect",
    image: "/images/Enterprise Voip C2.webp",
    imageAlt: "Desk VoIP handset and headset beside a connected globe",
    relatedSolution: {
      href: "/solutions/applications/unified-communications",
      title: "Unified Communications",
    },
    metaDescription:
      "Scalable enterprise voice for remote and office-based teams, delivered on network infrastructure Connexxion Telecom designs and maintains.",
  },
  {
    slug: "server-cloud-administration",
    title: "Server & Cloud Administration",
    summary: "Managed hosting and migrations that keep critical systems available.",
    group: "Compute",
    image: "/images/Server and Cloud Administraion C2.webp",
    imageAlt: "Cloud icons linked to server stacks and workstations",
    relatedSolution: {
      href: "/solutions/infrastructure/cloud-data-center",
      title: "Cloud & Data Center",
    },
    metaDescription:
      "Managed hosting, server migration and day-to-day administration for the systems your organisation depends on.",
  },
  {
    slug: "bespoke-software-services",
    title: "Bespoke Software Services",
    summary: "Custom applications built around the way your team actually works.",
    group: "Compute",
    image: "/images/Software Development C1.webp",
    imageAlt: "Developer writing code across multiple screens",
    relatedSolution: {
      href: "/solutions/applications/crm-customer-care",
      title: "CRM & Customer Care",
    },
    metaDescription:
      "Custom web, mobile and internal business applications designed, built and maintained around how your team actually works.",
  },
  {
    slug: "cctv-security",
    title: "CCTV & Security",
    summary: "Surveillance and access control you can monitor from anywhere.",
    group: "Secure & Support",
    // PLACEHOLDER: no CCTV photo was supplied, so this borrows the smart
    // hardware shot. Swap in a surveillance image when one exists.
    image: "/images/Smart Hardware Infrastructure C1.webp",
    imageAlt: "Server racks and circuit hardware in a data centre aisle",
    relatedSolution: {
      href: "/solutions/infrastructure/cybersecurity",
      title: "Cybersecurity",
    },
    metaDescription:
      "Intelligent surveillance and access control with remote monitoring, integrated with the rest of your security setup.",
  },
  {
    slug: "managed-it-support",
    title: "Managed IT Support",
    summary: "A 24/7 support desk that resolves issues before your team feels them.",
    group: "Secure & Support",
    image: "/images/Managed IT Support C2.webp",
    imageAlt: "Support engineer on a headset working a helpdesk floor",
    relatedSolution: {
      href: "/solutions/infrastructure/managed-services",
      title: "Managed Services",
    },
    metaDescription:
      "Dedicated 24/7/365 NOC support, troubleshooting and proactive maintenance for your entire IT fleet.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
