/* ─────────────────────────────────────────────────────────────
   Connexxion Telecom — Legal documents

   The wording here is the client's own legal copy and is reproduced
   verbatim. Do not rewrite, tighten or "improve" it: a privacy policy is a
   statement of what the business actually does with data, and editing it
   changes what has been promised. Structure only — headings, lists and
   ordering — is ours.
───────────────────────────────────────────────────────────── */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  /** Terms with a definition, e.g. the GDPR rights list */
  | { type: "dl"; items: { term: string; text: string }[] };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Shown under the heading. Null until the business supplies a real date —
      a policy with an invented effective date is worse than one with none. */
  lastUpdated: string | null;
  intro: LegalBlock[];
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy | Connexxion Telecom",
  metaDescription:
    "How Connexxion Telecom collects, uses and protects the information of visitors and customers, including cookies, log files, CCPA and GDPR rights, and telecommunications account records.",
  lastUpdated: null,
  intro: [
    {
      type: "p",
      text: "At Connexxion Telecom, accessible from https://www.connexxiontelecom.com/, one of our main priorities is the privacy of our visitors and customers. This Privacy Policy document contains the types of information that are collected and recorded by Connexxion Telecom and how we use them.",
    },
    {
      type: "p",
      text: "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.",
    },
    {
      type: "p",
      text: "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect on Connexxion Telecom. This policy is not applicable to any information collected offline or via channels other than this website.",
    },
  ],
  sections: [
    {
      id: "consent",
      title: "Consent",
      blocks: [
        {
          type: "p",
          text: "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      blocks: [
        {
          type: "p",
          text: "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
        },
        {
          type: "p",
          text: "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.",
        },
        {
          type: "p",
          text: "When you register for an account or request a quote for our telecommunications services, we may ask for your contact information, including items such as name, company name, billing address, service address, email address, and telephone number.",
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      title: "How We Use Your Information",
      blocks: [
        { type: "p", text: "We use the information we collect in various ways, including to:" },
        {
          type: "ul",
          items: [
            "Provide, operate, and maintain our website and telecommunications services",
            "Set up, manage, and bill for your account and services",
            "Improve, personalize, and expand our website and service offerings",
            "Understand and analyze how you use our website",
            "Develop new products, services, features, and functionality",
            "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to our services, and for marketing and promotional purposes",
            "Send you emails",
            "Find and prevent fraud",
          ],
        },
      ],
    },
    {
      id: "log-files",
      title: "Log Files",
      blocks: [
        {
          type: "p",
          text: "Connexxion Telecom follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
        },
      ],
    },
    {
      id: "cookies-and-web-beacons",
      title: "Cookies and Web Beacons",
      blocks: [
        {
          type: "p",
          text: "Like any other website, Connexxion Telecom uses “cookies.” These cookies are used to store information including visitors' preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
        },
      ],
    },
    {
      id: "advertising-partners",
      title: "Advertising Partners Privacy Policies",
      blocks: [
        {
          type: "p",
          text: "You may consult this list to find the Privacy Policy for each of the advertising partners of Connexxion Telecom.",
        },
        {
          type: "p",
          text: "Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Connexxion Telecom, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.",
        },
        {
          type: "p",
          text: "Note that Connexxion Telecom has no access to or control over these cookies that are used by third-party advertisers.",
        },
      ],
    },
    {
      id: "third-party-privacy-policies",
      title: "Third-Party Privacy Policies",
      blocks: [
        {
          type: "p",
          text: "Connexxion Telecom's Privacy Policy does not apply to other advertisers or websites. Thus, we advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt out of certain options.",
        },
        {
          type: "p",
          text: "You can choose to disable cookies through your individual browser options. More detailed information about cookie management with specific web browsers can be found on the browsers' respective websites.",
        },
      ],
    },
    {
      id: "ccpa-privacy-rights",
      title: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
      blocks: [
        { type: "p", text: "Under the CCPA, among other rights, California consumers have the right to:" },
        {
          type: "ul",
          items: [
            "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that the business has collected about consumers.",
            "Request that a business delete any personal data about the consumer that the business has collected.",
            "Request that a business that sells a consumer's personal data not sell the consumer's personal data.",
          ],
        },
        {
          type: "p",
          text: "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
        },
      ],
    },
    {
      id: "gdpr-data-protection-rights",
      title: "GDPR Data Protection Rights",
      blocks: [
        {
          type: "p",
          text: "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:",
        },
        {
          type: "dl",
          items: [
            {
              term: "The right to access",
              text: "You have the right to request copies of your personal data. We may charge you a small fee for this service.",
            },
            {
              term: "The right to rectification",
              text: "You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete information you believe is incomplete.",
            },
            {
              term: "The right to erasure",
              text: "You have the right to request that we erase your personal data, under certain conditions.",
            },
            {
              term: "The right to restrict processing",
              text: "You have the right to request that we restrict the processing of your personal data, under certain conditions.",
            },
            {
              term: "The right to object to processing",
              text: "You have the right to object to our processing of your personal data, under certain conditions.",
            },
            {
              term: "The right to data portability",
              text: "You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.",
            },
          ],
        },
        {
          type: "p",
          text: "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
        },
      ],
    },
    {
      id: "telecommunications-and-account-information",
      title: "Telecommunications and Account Information",
      blocks: [
        {
          type: "p",
          text: "As a telecommunications provider, Connexxion Telecom may also collect and retain information related to the services you use, including account and billing records, service usage records, technical and network diagnostic data, and support and service request history. This information is used to deliver, maintain, troubleshoot, and bill for your services, and to comply with applicable telecommunications regulations and record-keeping requirements. We do not sell this information to third parties.",
        },
      ],
    },
    {
      id: "childrens-information",
      title: "Children's Information",
      blocks: [
        {
          type: "p",
          text: "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their children's online activity.",
        },
        {
          type: "p",
          text: "Connexxion Telecom does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will do our best efforts to promptly remove such information from our records.",
        },
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      blocks: [
        {
          type: "p",
          text: "If you have any questions about this Privacy Policy, please contact us.",
        },
      ],
    },
  ],
};
