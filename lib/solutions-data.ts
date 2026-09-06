/* ─────────────────────────────────────────────────────────────
   Connexxion Telecom — Solutions content

   DRAFT COPY — needs sign-off before launch.

   There is no published source for these pages: the live site has no
   solutions section, and its /services page is still unmodified WordPress
   theme copy. What is verified, and what everything here is built on:

     • CNX247 — "an ERP Solution offering integrated management of key
       business processes… modernizes business logistics, delivers proactive
       customer responses, and unifies processes from project initiation to
       completion." (telecom.connexxiongroup.com/services)
     • CNX247 covers "CRM, HR, Payroll, Loan automation, document management"
     • iCoop tracks "finance, savings, loan applications and more"
     • Enterprise VoIP and Managed IT Support are services already sold

   Deliberately absent everywhere: seat or transaction volumes, uptime
   figures, named third-party integrations, compliance certifications and
   client references. Those are checkable facts, none of them are published,
   and inventing them would put false claims in front of procurement teams.
───────────────────────────────────────────────────────────── */

export interface SolutionSection {
  id: string;
  title: string;
  body: string;
}

export interface SolutionPlatform {
  name: string;
  role: string;
  body: string;
  href: string;
}

export interface Solution {
  slug: string;
  /** Second breadcrumb level, e.g. "Applications" */
  group: string;
  title: string;
  /** Pre-selects the consultation form's category via ?topic= */
  topic: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  secondaryCta: { label: string; href: string };
  problemHeading: string;
  problems: SolutionSection[];
  capabilityHeading: string;
  capabilities: SolutionSection[];
  /** Defaults to "Where it runs"; service-led pages say something else */
  whereEyebrow?: string;
  whereHeading: string;
  whereBody: string;
  /** Product cards — applications pages */
  platforms?: SolutionPlatform[];
  /** Named services instead of products — infrastructure pages, where the
      answer to "what delivers this" is people and engagements, not a URL */
  delivery?: { title: string; body: string }[];
  outcomes: string[];
  closingHeading: string;
  closingBody: string;
}

const CNX247: SolutionPlatform = {
  name: "CNX247",
  role: "Business operations",
  body: "Our own ERP — CRM, payroll, loan automation and document management for commercial organisations.",
  href: "/products/cnx247",
};

const IGOV: SolutionPlatform = {
  name: "CNX 1GOV",
  role: "Public sector",
  body: "The all-in-one platform for governing bodies and agencies — built for compliance, engineered for scale.",
  href: "/products/igov",
};

const ICOOP: SolutionPlatform = {
  name: "iCoop",
  role: "Cooperatives",
  body: "Member records, savings, contributions and loan applications for cooperative and thrift societies.",
  href: "/products/icoop",
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "billing-revenue-management",
    group: "Applications",
    title: "Billing & Revenue Management",
    topic: "Billing & Revenue Management",
    metaTitle: "Billing & Revenue Management | Connexxion Telecom",
    metaDescription:
      "Invoicing, collections, payment reconciliation and loan automation running on one ledger — delivered through CNX247 and iCoop, platforms Connexxion builds and maintains in-house.",
    intro:
      "Invoicing, collections and reconciliation running on the same records as the rest of the business — so what you billed, what you were paid and what you are still owed are the same set of numbers.",
    secondaryCta: { label: "See CNX247", href: "/products/cnx247" },
    problemHeading: "Most revenue is lost in the admin, not the market.",
    problems: [
      {
        id: "leakage",
        title: "Revenue that quietly leaks",
        body: "Services delivered but never invoiced, discounts that outlive their approval, and charges that were only ever agreed verbally. Most organisations discover the gap at year end, when it is too late to recover.",
      },
      {
        id: "spreadsheets",
        title: "A billing run that lives in spreadsheets",
        body: "When invoicing depends on one person's workbook, the process stops when they are on leave — and nobody else can explain how a figure was arrived at.",
      },
      {
        id: "reconciliation",
        title: "Payments that take days to reconcile",
        body: "Money arrives in the bank, but matching it back to the right customer and the right invoice is manual. Collections chase people who have already paid.",
      },
      {
        id: "visibility",
        title: "No usable view of what is owed",
        body: "Finance can tell you what was invoiced. Telling you what is actually collectable, by whom and by when, is a different question — and usually an unanswered one.",
      },
    ],
    capabilityHeading: "One ledger, from invoice to reconciliation.",
    capabilities: [
      {
        id: "billing",
        title: "Invoicing and billing runs",
        body: "Recurring and one-off invoicing generated from the same records the rest of the business works in, so a billing run is a scheduled job rather than a week of preparation.",
      },
      {
        id: "collections",
        title: "Collections and receivables",
        body: "Outstanding balances tracked per customer with an ageing view, so chasing is driven by the ledger rather than by memory.",
      },
      {
        id: "payments",
        title: "Payment capture and reconciliation",
        body: "Payments recorded against the invoice they settle, so the gap between money received and money accounted for closes on the day rather than at month end.",
      },
      {
        id: "loans",
        title: "Loan and repayment automation",
        body: "Schedules, balances and repayments handled as first-class records — the same engine iCoop uses for cooperative savings and loan books.",
      },
      {
        id: "payroll",
        title: "Payroll and internal costs",
        body: "Payroll sits alongside revenue in CNX247 rather than in a separate system, so the cost side of a month is visible next to the income side.",
      },
      {
        id: "reporting",
        title: "Reporting and audit trail",
        body: "Every adjustment attributable to a person and a time. When an auditor or a board committee asks why a figure changed, the answer is in the record.",
      },
    ],
    whereHeading: "Delivered on platforms we own.",
    whereBody:
      "Billing is not a bolt-on product. It is delivered through the platform that suits the organisation — which means changes to how your billing behaves are a roadmap conversation with the team that wrote it, not a support ticket to a third-party vendor.",
    platforms: [CNX247, ICOOP],
    outcomes: [
      "Billing runs that complete without a specialist babysitting them",
      "A single answer to what is owed, by whom, and for how long",
      "Adjustments that leave a trail instead of an argument",
      "Finance reporting drawn from live records, not re-keyed",
    ],
    closingHeading: "Start with your current billing run.",
    closingBody:
      "Walk us through how invoicing works today and where it breaks. If the answer is that you do not need new software, we will say so — that conversation is the cheapest thing we sell.",
  },
  {
    slug: "crm-customer-care",
    group: "Applications",
    title: "CRM & Customer Care",
    topic: "CRM & Customer Care",
    metaTitle: "CRM & Customer Care | Connexxion Telecom",
    metaDescription:
      "One customer record, cases that cannot be forgotten, and calls tied to the history they belong to — CRM and customer care delivered through CNX247 and Connexxion's enterprise voice services.",
    intro:
      "One record per customer, every conversation attached to it, and nothing depending on whether the person who took the call remembers to write it down.",
    secondaryCta: { label: "See CNX247", href: "/products/cnx247" },
    problemHeading: "The customer remembers. The organisation does not.",
    problems: [
      {
        id: "scattered",
        title: "The history lives in someone's inbox",
        body: "What was agreed sits in a personal mailbox, a WhatsApp thread and a notebook. When that person moves on, the relationship restarts from nothing.",
      },
      {
        id: "promises",
        title: "Nobody knows what was promised",
        body: "A discount, a deadline or a workaround gets agreed on a call and never written anywhere the next person will look. The customer finds out it was forgotten before you do.",
      },
      {
        id: "dropped",
        title: "Requests fall between channels",
        body: "It came in by phone, so it is not in the inbox. It came in by email, so the person on the phone has never seen it. The follow-up depends on somebody remembering.",
      },
      {
        id: "blind",
        title: "No view of how you are actually doing",
        body: "How long does a request take to close? Which accounts have been waiting longest? Without the answer, service quality is a matter of opinion rather than measurement.",
      },
    ],
    capabilityHeading: "One record, every conversation attached to it.",
    capabilities: [
      {
        id: "record",
        title: "A single customer record",
        body: "Contacts, account history, open items and past correspondence in one place — so anyone picking up the relationship starts from what is known rather than from scratch.",
      },
      {
        id: "cases",
        title: "Cases that cannot be forgotten",
        body: "Requests logged as records with an owner and a state, not as a message in somebody's inbox. What is open, who has it, and how long it has been there is visible.",
      },
      {
        id: "voice",
        title: "Calls tied to the account",
        body: "Enterprise VoIP is one of our own services, so the phone system and the customer record are part of the same engagement rather than two vendors pointing at each other.",
      },
      {
        id: "followups",
        title: "Follow-ups and reminders",
        body: "Commitments captured against the account with a date attached, so a promise made on Tuesday is still visible three weeks later.",
      },
      {
        id: "sales",
        title: "Pipeline and account management",
        body: "Opportunities, quotes and renewals tracked against the same customer as the support history — the account team and the service desk look at one record, not two systems.",
      },
      {
        id: "reporting",
        title: "Response and resolution reporting",
        body: "How long requests take, which are ageing and where they stall, drawn from the records themselves rather than assembled by hand for a monthly review.",
      },
    ],
    whereHeading: "Built into the ERP, not bolted beside it.",
    whereBody:
      "CRM is a module of CNX247 rather than a separate product, so customer history sits next to the invoices, payroll and documents for the same organisation. It is our own software — changing how a workflow behaves is a roadmap conversation with the people who wrote it.",
    platforms: [CNX247, ICOOP],
    outcomes: [
      "Any colleague can pick up an account and see its full history",
      "Commitments survive the person who made them",
      "Requests have an owner and an age, not just a sender",
      "Service quality reported from records rather than recollection",
    ],
    closingHeading: "Start with the last request you dropped.",
    closingBody:
      "Tell us how enquiries reach you today and where they get lost. We will tell you honestly whether this needs software or just a change in how the desk is run.",
  },
  {
    slug: "self-care-portal",
    group: "Applications",
    title: "Self-Care Portal",
    topic: "Self-Care Portal",
    metaTitle: "Self-Care Portal | Connexxion Telecom",
    metaDescription:
      "Let members, customers and citizens check balances, pull statements, submit requests and track them — a self-service front onto the same records your staff already work in.",
    intro:
      "Let members, customers and citizens answer their own questions — balances, statements, requests and where a submission has got to — without joining a queue to do it.",
    secondaryCta: { label: "See iCoop", href: "/products/icoop" },
    problemHeading: "Your desk spends its day answering the same four questions.",
    problems: [
      {
        id: "repeat",
        title: "The same enquiry, all day",
        body: "What is my balance. Has my payment landed. Where is my application. Every one of them is a lookup somebody could have done themselves, and every one of them occupies a person who could be solving something harder.",
      },
      {
        id: "office-hours",
        title: "Access ends when the office closes",
        body: "A member who works the same hours you do can only ever reach you by taking time off. The enquiry does not go away — it just arrives as a backlog on Monday.",
      },
      {
        id: "black-hole",
        title: "Submissions disappear into a black hole",
        body: "A form goes in and nothing comes back. With no way to see progress, the only way to check is to call and ask — which creates the very load the form was supposed to remove.",
      },
      {
        id: "stale-details",
        title: "Records nobody can correct",
        body: "A changed phone number or address needs a staff member to key it in. So it does not get changed, and the organisation carries details it knows are wrong.",
      },
    ],
    capabilityHeading: "A front door onto the records you already keep.",
    capabilities: [
      {
        id: "balances",
        title: "Balances and account position",
        body: "Members and customers see their own position — savings, contributions, outstanding balances — read from the same records the back office works in, not a copy that drifts.",
      },
      {
        id: "statements",
        title: "Statements and documents on demand",
        body: "Statements, invoices and receipts available to download at the moment they are wanted, rather than compiled by hand and emailed on request.",
      },
      {
        id: "requests",
        title: "Requests and applications",
        body: "Loan applications, service requests and enquiries submitted directly into the workflow that handles them, arriving as records with an owner rather than as another email.",
      },
      {
        id: "status",
        title: "Status they can check themselves",
        body: "Where a submission has reached and what happens next, visible to the person who made it. This is the single change that removes the most calls.",
      },
      {
        id: "payments",
        title: "Payments and confirmation",
        body: "Payments made and receipted against the right account, so the confirmation the customer sees and the figure your ledger holds are the same event.",
      },
      {
        id: "access",
        title: "Access limited to their own record",
        body: "Role-based access so each person reaches their own account and nothing else, and every self-service change is attributable in the same audit trail as a staff one.",
      },
    ],
    whereHeading: "A view onto your system, not a second one.",
    whereBody:
      "A portal that keeps its own copy of the data becomes another thing to reconcile. This is a front onto the same platform your staff use — so what a member sees and what the office sees cannot disagree. Both platforms are ours, which means what the portal exposes is a roadmap decision rather than a vendor limitation.",
    platforms: [ICOOP, IGOV],
    outcomes: [
      "Routine lookups stop arriving as phone calls",
      "Members and citizens get an answer outside office hours",
      "Submissions carry a status the sender can see",
      "Details corrected once, by the person they belong to",
    ],
    closingHeading: "Start with the question you answer most.",
    closingBody:
      "Tell us the enquiry your desk handles more than any other. If it is a lookup or a status check, a portal removes it — and if it is not, we will tell you that instead.",
  },
  {
    slug: "unified-communications",
    group: "Applications",
    title: "Unified Communications",
    topic: "Unified Communications",
    metaTitle: "Unified Communications | Connexxion Telecom",
    metaDescription:
      "Voice, meetings and messaging on one system, reachable wherever your people are — built on Connexxion's own enterprise VoIP service and tied to the customer records in CNX247.",
    intro:
      "Voice, meetings and messaging on one system rather than four — reachable wherever your people are, and recorded against the account the conversation was about.",
    secondaryCta: { label: "See Our Services", href: "/#services" },
    problemHeading: "Four tools, four directories, and nobody reachable.",
    problems: [
      {
        id: "fragmented",
        title: "A different tool for every conversation",
        body: "Calls on one system, meetings on another, chat on a third, and none of them share a contact list. Reaching a colleague means guessing which one they are logged into.",
      },
      {
        id: "desk-bound",
        title: "Numbers tied to a building",
        body: "The extension rings on a desk nobody is sitting at. When work moved out of the office, the phone system stayed behind — so the published number reaches an empty room.",
      },
      {
        id: "cost",
        title: "Call spend nobody can attribute",
        body: "A telephony bill arrives as one figure with no breakdown by team, site or purpose. There is no way to tell what is worth paying for and what is waste.",
      },
      {
        id: "no-record",
        title: "The call leaves no trace",
        body: "A conversation happens, a commitment is made, and the only record is in one person's memory. The account history shows nothing between the invoice and the complaint.",
      },
    ],
    capabilityHeading: "One number, one directory, wherever the person is.",
    capabilities: [
      {
        id: "voice",
        title: "Enterprise voice over your own network",
        body: "VoIP is one of the services we already deliver, so the phone system and the network it runs on are the same engagement — not two vendors blaming each other when call quality drops.",
      },
      {
        id: "mobility",
        title: "Extensions that follow the person",
        body: "The same number and directory on a desk phone, a laptop or a mobile, so someone working from a site or from home is as reachable as someone at their desk.",
      },
      {
        id: "meetings",
        title: "Meetings and conferencing",
        body: "Audio and video meetings from the same system as the phones, using the same contacts, rather than a separate subscription with its own login and its own address book.",
      },
      {
        id: "routing",
        title: "Call handling and routing",
        body: "Queues, hunt groups, out-of-hours behaviour and reception routing configured to how the organisation actually answers, so callers reach a person rather than a dead extension.",
      },
      {
        id: "records",
        title: "Calls attached to the account",
        body: "Call activity recorded against the customer it concerned in CNX247, so the account history covers the conversations as well as the transactions.",
      },
      {
        id: "reporting",
        title: "Usage and cost reporting",
        body: "Call volumes, answer rates and spend broken down by team and site — the numbers needed to decide what the telephony budget is actually buying.",
      },
    ],
    whereEyebrow: "How it is delivered",
    whereHeading: "The phone system and the network are one engagement.",
    whereBody:
      "Unified communications fails most often at the seam between the application and the link it runs over. We deliver both — enterprise VoIP as a service, on network infrastructure we design and maintain — so call quality is our problem to fix rather than an argument between suppliers. Call records tie back into CNX247, which is our own software.",
    platforms: [CNX247],
    outcomes: [
      "One directory and one number per person, on any device",
      "Callers reach someone rather than an unattended extension",
      "Conversations recorded against the account they concerned",
      "Telephony spend attributable to a team and a purpose",
    ],
    closingHeading: "Start with how a caller reaches you today.",
    closingBody:
      "Tell us what happens when someone rings your main line, and what happens when the person they want is out of the office. That path is usually where the problem is.",
  },
  {
    /* HR and Payroll are named CNX247 modules in the verified services copy,
       so this page describes those modules. Nothing here claims headcount
       limits, statutory tax tables, biometric hardware or payroll bureau
       integrations — none of that is published. */
    slug: "hr-management",
    group: "Applications",
    title: "HR Management",
    topic: "HR Management",
    metaTitle: "HR Management | Connexxion Telecom",
    metaDescription:
      "People records, leave, payroll and documents in one system — HR management delivered through CNX247, Connexxion Telecom's own ERP.",
    intro:
      "One record per employee, with the contract, the leave balance and the payslip attached to it, rather than spread across a spreadsheet, a drawer and somebody's memory.",
    secondaryCta: { label: "See CNX247", href: "/products/cnx247" },
    problemHeading: "The organisation knows less about its people than it thinks.",
    problems: [
      {
        id: "spreadsheet",
        title: "The staff list is a spreadsheet",
        body: "One file, edited by several people, with no history of what changed or who changed it. The version on somebody's laptop is the one that gets used.",
      },
      {
        id: "leave",
        title: "Leave is agreed and then forgotten",
        body: "Time off approved in a corridor or a message thread, never recorded anywhere. Balances are reconstructed from memory at the end of the year, and disputed.",
      },
      {
        id: "payroll",
        title: "Payroll is rebuilt every month",
        body: "The same figures re-entered from the same sources, by hand, against a deadline. A typo is found after payment or not at all.",
      },
      {
        id: "documents",
        title: "Nobody can find the contract",
        body: "Offer letters, confirmations and disciplinary records sit in email and filing cabinets. When one is needed, someone spends an afternoon looking for it.",
      },
    ],
    capabilityHeading: "One employee record, from offer letter to payslip.",
    capabilities: [
      {
        id: "records",
        title: "A single employee record",
        body: "Personal details, role, reporting line, contract and history in one place, with changes recorded rather than overwritten.",
      },
      {
        id: "leave",
        title: "Leave requests and balances",
        body: "Time off requested, approved and deducted in the same system, so the balance is a number the record holds rather than one somebody works out.",
      },
      {
        id: "payroll",
        title: "Payroll runs",
        body: "Payroll built from the employee records already in the system, so the inputs to a pay run are the same data the rest of HR uses.",
      },
      {
        id: "documents",
        title: "Documents against the person",
        body: "Contracts, letters and signed forms attached to the employee they belong to, using the same document management the rest of the ERP uses.",
      },
      {
        id: "loans",
        title: "Staff loans and deductions",
        body: "Loan automation is a CNX247 module, so an advance to an employee and its repayment through payroll are handled in one system rather than tracked alongside it.",
      },
      {
        id: "reporting",
        title: "Headcount and cost reporting",
        body: "Who is employed, in which team, at what cost — drawn from the records themselves rather than assembled by hand when somebody asks.",
      },
    ],
    whereHeading: "A module of the ERP, not a separate HR product.",
    whereBody:
      "HR and payroll are modules of CNX247, so people data sits beside the customer records, documents and finances of the same organisation. It is our own software — changing how an approval or a pay rule behaves is a roadmap conversation with the people who wrote it.",
    platforms: [CNX247],
    outcomes: [
      "One record per employee that survives a change of HR staff",
      "Leave balances that are recorded rather than reconstructed",
      "Pay runs built from data already in the system",
      "Contracts and letters findable in seconds",
    ],
    closingHeading: "Start with your current staff list.",
    closingBody:
      "Tell us where employee information lives today and what happens when someone joins or leaves. That handover is usually where the gaps show.",
  },
  {
    /* Savings and loan applications are named iCoop capabilities, and loan
       automation is a named CNX247 module, in the verified copy. This page
       covers those. Not claimed: interest models, regulatory positions,
       payment-provider integrations or portfolio sizes. */
    slug: "savings-and-loan",
    group: "Applications",
    title: "Savings and Loan Application",
    topic: "Savings and Loan Application",
    metaTitle: "Savings and Loan Application | Connexxion Telecom",
    metaDescription:
      "Member savings, contributions and loan applications tracked end to end — delivered through iCoop for cooperatives and CNX247's loan automation.",
    intro:
      "Contributions recorded as they are received, loan applications that move through a visible process, and a balance a member can be told without anyone opening a ledger.",
    secondaryCta: { label: "See iCoop", href: "/products/icoop" },
    problemHeading: "The ledger and the members disagree.",
    problems: [
      {
        id: "ledger",
        title: "Balances live in one person's book",
        body: "Contributions recorded by hand, in one place, by one person. When they are unavailable, nobody can answer what a member has saved.",
      },
      {
        id: "applications",
        title: "Loan applications stall unseen",
        body: "A request is submitted and then waits. Neither the member nor the committee can say what stage it is at or who it is with.",
      },
      {
        id: "repayments",
        title: "Repayments tracked separately from savings",
        body: "What a member owes and what they have saved sit in different records, so the position of a member is assembled by hand before any decision.",
      },
      {
        id: "trust",
        title: "Members cannot check their own position",
        body: "Every balance enquiry is a phone call to an officer. The society spends its time answering questions the records could answer.",
      },
    ],
    capabilityHeading: "From contribution to disbursement, in one record.",
    capabilities: [
      {
        id: "members",
        title: "Member records",
        body: "One record per member holding contributions, savings and loan history, so their full position is visible in one place.",
      },
      {
        id: "savings",
        title: "Savings and contributions",
        body: "Contributions recorded against the member as they are received, building a balance the system holds rather than one recalculated each period.",
      },
      {
        id: "applications",
        title: "Loan applications with a state",
        body: "An application is a record with a stage and an owner, so what has been submitted, what is under review and what has been approved is visible rather than remembered.",
      },
      {
        id: "automation",
        title: "Loan automation",
        body: "Loan automation is a module of our own ERP, so disbursement and repayment schedules are handled by the same system that holds the savings.",
      },
      {
        id: "repayments",
        title: "Repayments against the member",
        body: "Repayments recorded against the loan and the member together, so outstanding balance and savings position are read from one record.",
      },
      {
        id: "reporting",
        title: "Position and arrears reporting",
        body: "What is saved, what is lent and what is overdue, drawn from the records themselves rather than compiled for a committee meeting.",
      },
    ],
    whereHeading: "Built for societies, on software we own.",
    whereBody:
      "iCoop is purpose built for cooperative and thrift societies, and loan automation is a module of CNX247 — both ours. Where a society's rules differ from how the software behaves, that is a roadmap conversation with the people who wrote it rather than a request to a third-party vendor.",
    platforms: [ICOOP, CNX247],
    outcomes: [
      "A member's savings position answerable without opening a ledger",
      "Loan applications with a visible stage and owner",
      "Repayments and savings read from the same record",
      "Arrears visible before the committee meets, not during it",
    ],
    closingHeading: "Start with how a member checks their balance.",
    closingBody:
      "Tell us how contributions are recorded today and what a loan application has to pass through. Those two paths show where the manual work actually is.",
  },
  {
    slug: "network-core",
    group: "Infrastructure",
    title: "Network Core Solutions",
    topic: "Network Core Solutions",
    metaTitle: "Network Core Solutions | Connexxion Telecom",
    metaDescription:
      "LAN and WAN core design, structured cabling, fibre, redundancy and monitoring — network infrastructure designed, deployed and maintained by Connexxion engineers, nationwide from Abuja.",
    intro:
      "The layer everything else depends on: core LAN and WAN design, cabling and fibre, redundancy that has actually been tested, and a NOC watching it around the clock.",
    secondaryCta: { label: "See Our Services", href: "/#services" },
    problemHeading: "Everything else is only as available as the network under it.",
    problems: [
      {
        id: "single-point",
        title: "One link, no second path",
        body: "A single provider into a single router. It works until the day it does not, and then every system in the building is offline at once — including the ones you were told were in the cloud.",
      },
      {
        id: "organic",
        title: "A network nobody has documented",
        body: "It grew a switch at a time over ten years. There is no current diagram, the person who built it has left, and every change is made by tracing cables to find out what breaks.",
      },
      {
        id: "split-blame",
        title: "Faults that live between vendors",
        body: "The cabling contractor blames the ISP, the ISP blames the equipment, and the outage lasts as long as the argument does. Nobody owns the whole path.",
      },
      {
        id: "capacity",
        title: "Capacity planned by guesswork",
        body: "Without monitoring there is no baseline, so congestion is diagnosed by complaint. The upgrade is sized by how loud the complaints were rather than by what the traffic shows.",
      },
    ],
    capabilityHeading: "Designed to fail safely, documented to be handed over.",
    capabilities: [
      {
        id: "design",
        title: "Core LAN and WAN design",
        body: "High-availability core and distribution design sized for what the organisation runs today and what it has told us is coming, rather than for the equipment a reseller had in stock.",
      },
      {
        id: "cabling",
        title: "Structured cabling and fibre",
        body: "Trenching, splicing, containment and termination done to a standard that can be certified — the physical layer that determines whether everything above it is reliable.",
      },
      {
        id: "redundancy",
        title: "Redundancy and failover",
        body: "Second paths, failover between links and power arrangements that have been tested by being failed on purpose, not assumed to work because the diagram shows two lines.",
      },
      {
        id: "segmentation",
        title: "Routing, switching and segmentation",
        body: "Traffic separated so that a compromised or noisy segment does not take the rest with it, and so that access between zones is a deliberate decision rather than an accident of history.",
      },
      {
        id: "monitoring",
        title: "Monitoring from a staffed NOC",
        body: "Links, devices and capacity watched 24/7/365 by people who can act, so the first sign of a problem is an alert rather than a phone call from a user.",
      },
      {
        id: "documentation",
        title: "Documentation and handover",
        body: "Current diagrams, addressing, device inventory and change history handed over as part of the work — so the network survives the departure of whoever built it, including us.",
      },
    ],
    whereEyebrow: "How it is delivered",
    whereHeading: "Engineers on site, not a ticket queue offshore.",
    whereBody:
      "Core network work is physical. It needs people who can be in the building, follow a cable and stand in front of the rack — which is why this is delivered by our own engineers, based in Abuja and deploying nationwide, rather than subcontracted and supervised by email.",
    delivery: [
      {
        title: "Network Infrastructure",
        body: "High-availability design, structured cabling and LAN/WAN build for enterprise environments.",
      },
      {
        title: "Fibre Optic Solutions",
        body: "High-speed fibre networks built for low latency, including trenching, splicing and long-term maintenance.",
      },
      {
        title: "Managed IT Support",
        body: "A staffed 24/7/365 operations centre monitoring what has been deployed, with response targets in the contract.",
      },
      {
        title: "Nationwide coverage",
        body: "Deployment and maintenance across the country, run from Abuja — for the work that cannot be done remotely.",
      },
    ],
    outcomes: [
      "A second path for the links the business cannot lose",
      "A current diagram anyone can pick up and follow",
      "One party accountable for the whole path, end to end",
      "Capacity decisions made from traffic data, not complaints",
    ],
    closingHeading: "Start with what happens when the main link drops.",
    closingBody:
      "If the answer is that everything stops, that is the conversation. We will walk the current setup with you and tell you what is worth changing first — and what is fine as it is.",
  },
  {
    slug: "cloud-data-center",
    group: "Infrastructure",
    title: "Cloud & Data Center",
    topic: "Cloud & Data Center",
    metaTitle: "Cloud & Data Center | Connexxion Telecom",
    metaDescription:
      "Managed hosting, server migration and cloud administration — the systems your organisation depends on, kept available, backed up and administered by engineers who answer the phone.",
    intro:
      "Managed hosting, migrations and day-to-day server administration — so the systems the organisation runs on are somebody's explicit job rather than everybody's assumption.",
    secondaryCta: { label: "See Our Services", href: "/#services" },
    problemHeading: "The server everything depends on is the one nobody owns.",
    problems: [
      {
        id: "orphan",
        title: "A critical machine under a desk",
        body: "It runs the thing the whole office needs, it was set up years ago by someone who has left, and nobody is certain what would break if it were switched off. So it never is — including for patching.",
      },
      {
        id: "backups",
        title: "Backups nobody has ever restored",
        body: "A backup job reports success every night. Whether the data can actually be brought back, and how long that would take, is unknown until the day it matters.",
      },
      {
        id: "lift-and-shift",
        title: "A cloud move that cost more, not less",
        body: "Machines lifted as they were, sized for peak and left running around the clock. The bill arrives monthly now instead of every few years, and it is larger.",
      },
      {
        id: "no-owner",
        title: "Administration by whoever is free",
        body: "Patching, certificates, disk space and capacity get attention when something breaks. There is no baseline, so the first sign of trouble is an outage.",
      },
    ],
    capabilityHeading: "Hosted, migrated and administered as an ongoing job.",
    capabilities: [
      {
        id: "hosting",
        title: "Managed hosting",
        body: "Server and application hosting with an owner, a patching routine and a monitoring baseline, rather than a machine that runs until it stops.",
      },
      {
        id: "migration",
        title: "Migration and consolidation",
        body: "Moving systems to new hardware or to cloud infrastructure, sized for what the workload actually does rather than replicated as-is — including deciding which machines should not move at all.",
      },
      {
        id: "administration",
        title: "Day-to-day server administration",
        body: "Patching, certificates, user access, disk and capacity handled as routine work on a schedule, which is what keeps the emergencies rare.",
      },
      {
        id: "backup",
        title: "Backup and recovery you have tested",
        body: "Backups configured, monitored and — the part usually skipped — restored on purpose, so the recovery time is a measured figure rather than a hope.",
      },
      {
        id: "availability",
        title: "Availability and failover",
        body: "Redundancy sized to what the organisation can actually afford to lose, with the trade-off between cost and downtime made explicitly rather than by default.",
      },
      {
        id: "capacity",
        title: "Capacity and cost visibility",
        body: "What is running, what it is consuming and what it is costing — the basis for deciding what to resize, consolidate or switch off.",
      },
    ],
    whereEyebrow: "How it is delivered",
    whereHeading: "Administration is a service, not a project.",
    whereBody:
      "Hosting and migration are engagements with an end date. Keeping systems available is not — it is a standing responsibility, so it is delivered as a managed service with a named owner and response targets in the contract. Where hardware needs hands on it, our engineers are in the country rather than at the end of a ticket queue.",
    delivery: [
      {
        title: "Server & Cloud Administration",
        body: "Managed hosting, server migration and infrastructure support for the systems that have to stay available.",
      },
      {
        title: "Managed IT Support",
        body: "A staffed 24/7/365 operations centre watching what has been deployed, with response and resolution targets written down.",
      },
      {
        title: "Network Infrastructure",
        body: "The links and core network the hosted systems are reached over, designed and maintained by the same company.",
      },
      {
        title: "Nationwide coverage",
        body: "Engineers who can be on site for the work that cannot be done over a remote session.",
      },
    ],
    outcomes: [
      "Every critical system has a named owner and a patching routine",
      "A restore time you have measured rather than assumed",
      "Cloud spend that matches what the workload actually needs",
      "Capacity decisions made before the disk fills, not after",
    ],
    closingHeading: "Start with the machine you are afraid to reboot.",
    closingBody:
      "Most organisations have one. Tell us what it runs and why nobody touches it, and we will work out what it would take to make it boring.",
  },
  {
    slug: "cybersecurity",
    group: "Infrastructure",
    title: "Cybersecurity",
    topic: "Cybersecurity",
    metaTitle: "Cybersecurity | Connexxion Telecom",
    metaDescription:
      "Segmentation, access control, patching, monitoring, backup and recovery — practical security work on the infrastructure Connexxion designs, hosts and supports, plus CCTV and physical access control.",
    intro:
      "Practical security on the infrastructure we already design and run — segmentation, access control, patching, monitoring and a recovery plan that has been tested.",
    secondaryCta: { label: "See Our Services", href: "/#services" },
    problemHeading: "Most breaches use the door that was left open years ago.",
    problems: [
      {
        id: "flat",
        title: "One flat network",
        body: "Everything can reach everything. A single compromised laptop in reception has a path to the finance server, because nothing was ever separated.",
      },
      {
        id: "access",
        title: "Accounts that outlive the people",
        body: "Staff leave and their logins do not. Shared administrator passwords circulate, and nobody can say with confidence who currently has access to what.",
      },
      {
        id: "patching",
        title: "Patching deferred indefinitely",
        body: "Updates are postponed because nobody is certain what they might break, so systems run for years on versions with publicly documented weaknesses.",
      },
      {
        id: "recovery",
        title: "No plan for the day after",
        body: "The question is not only how to keep an incident out, but what happens in the hours after one lands. Without a tested recovery path, that is improvised under pressure.",
      },
    ],
    capabilityHeading: "The unglamorous work that actually reduces risk.",
    capabilities: [
      {
        id: "segmentation",
        title: "Network segmentation",
        body: "Separating traffic so a compromise in one area does not reach the rest, and so access between zones is a deliberate decision with a reason attached.",
      },
      {
        id: "access",
        title: "Access control and joiners/leavers",
        body: "Who can reach what, reviewed and revoked as people arrive and leave, with administrative access held individually rather than as a shared password.",
      },
      {
        id: "patching",
        title: "Patching and hardening",
        body: "A routine for keeping systems current, and default configurations tightened — the two changes that close the largest share of the openings actually exploited.",
      },
      {
        id: "monitoring",
        title: "Monitoring and alerting",
        body: "Watching the infrastructure we run for the signals that indicate something is wrong, from a NOC staffed around the clock by people who can act on them.",
      },
      {
        id: "recovery",
        title: "Backup and tested recovery",
        body: "Backups held so that an incident cannot reach them, and restores rehearsed, so the answer to a ransom demand is a recovery time rather than a negotiation.",
      },
      {
        id: "physical",
        title: "Physical and electronic security",
        body: "CCTV, surveillance and access control — because a server room anyone can walk into is not secured by anything happening on the network.",
      },
    ],
    whereEyebrow: "How it is delivered",
    whereHeading: "Security on infrastructure we already run.",
    whereBody:
      "This is not an audit handed over as a PDF. It is applied to the network, servers and support arrangements we design and maintain, by the people who maintain them — which is why the work concentrates on configuration, access and recovery rather than on products bought to sit on top of a network nobody has fixed.",
    delivery: [
      {
        title: "Network Infrastructure",
        body: "Segmentation and access between zones designed into the network rather than added afterwards.",
      },
      {
        title: "Server & Cloud Administration",
        body: "Patching, hardening, backup and tested recovery as part of routine administration.",
      },
      {
        title: "Managed IT Support",
        body: "24/7/365 monitoring and a support desk that can act when something is flagged.",
      },
      {
        title: "CCTV & Security",
        body: "Surveillance and access control for the physical side, monitored remotely.",
      },
    ],
    outcomes: [
      "A compromise in one area cannot reach every other",
      "A current, reviewable answer to who has access to what",
      "Systems kept current on a routine rather than after an incident",
      "A recovery time you have measured by rehearsing it",
    ],
    closingHeading: "Start with who still has access.",
    closingBody:
      "Ask who could log into your finance system today. If the honest answer is that nobody is certain, that is where we would begin — and it costs nothing to find out.",
  },
  {
    slug: "managed-services",
    group: "Infrastructure",
    title: "Managed Services",
    topic: "Managed Services",
    metaTitle: "Managed Services | Connexxion Telecom",
    metaDescription:
      "A staffed 24/7/365 NOC, proactive maintenance and enterprise-grade SLAs — Connexxion running your infrastructure day to day, with response targets written into the contract.",
    intro:
      "A staffed operations centre, proactive maintenance and response targets in writing — your infrastructure run day to day by people who are accountable for it staying up.",
    secondaryCta: { label: "See Our Services", href: "/#services" },
    problemHeading: "In-house IT spends its life firefighting.",
    problems: [
      {
        id: "reactive",
        title: "Everything is an emergency",
        body: "The day is spent on whatever broke most recently, so the preventative work that would stop next week's failure never gets started. The team is busy and the estate still degrades.",
      },
      {
        id: "bus-factor",
        title: "One person holds the whole estate",
        body: "It works because a single colleague knows where everything is. Their leave is a risk, their resignation is a crisis, and none of it is written down.",
      },
      {
        id: "hours",
        title: "Nothing is watched out of hours",
        body: "A failure at 9pm is discovered at 8am. The outage lasted eleven hours, most of which nobody was awake for.",
      },
      {
        id: "no-sla",
        title: "Support with no measurable promise",
        body: "The current arrangement is a phone number and goodwill. There is no agreed response time, so there is nothing to hold anybody to — including yourselves.",
      },
    ],
    capabilityHeading: "Someone whose job is that it keeps working.",
    capabilities: [
      {
        id: "noc",
        title: "24/7/365 NOC monitoring",
        body: "Links, servers and devices watched continuously by a staffed operations centre, so problems are found by an alert at 9pm rather than by a user at 8am.",
      },
      {
        id: "proactive",
        title: "Proactive maintenance",
        body: "Patching, firmware, certificates, capacity and housekeeping done on a schedule — the work that quietly removes the incidents that would otherwise fill the week.",
      },
      {
        id: "servicedesk",
        title: "A service desk for the whole fleet",
        body: "One route for staff to report a problem, with requests tracked as records that have an owner and an age rather than as messages to whoever is nearest.",
      },
      {
        id: "sla",
        title: "Enterprise-grade SLAs",
        body: "Response and resolution targets written into the contract and measured against — so service level is a reported figure rather than an impression.",
      },
      {
        id: "onsite",
        title: "On-site attendance nationwide",
        body: "Engineers who can attend for the work that cannot be done remotely, across the country, run from Abuja.",
      },
      {
        id: "reporting",
        title: "Reporting and review",
        body: "What broke, how often, how long it took and what is trending worse — the basis for deciding where the next investment should go.",
      },
    ],
    whereEyebrow: "How it is delivered",
    whereHeading: "Support that supplements your team, not replaces it.",
    whereBody:
      "Most organisations do not need to hand everything over. The usual arrangement is that we take the monitoring, the out-of-hours cover and the routine maintenance, and the in-house team gets its time back for the work that needs somebody who knows the business. Where we also built the infrastructure, there is nobody to escalate to but ourselves.",
    delivery: [
      {
        title: "Managed IT Support",
        body: "Dedicated 24/7/365 NOC support, troubleshooting and proactive maintenance across the IT fleet.",
      },
      {
        title: "Server & Cloud Administration",
        body: "Hosting, patching and administration of the systems being monitored.",
      },
      {
        title: "Network Infrastructure",
        body: "The network under it all, designed and maintained by the same company that watches it.",
      },
      {
        title: "Enterprise-grade SLAs",
        body: "Response and resolution targets agreed up front, measured and reported rather than assumed.",
      },
    ],
    outcomes: [
      "Failures found by monitoring rather than by users",
      "Routine maintenance that actually happens on schedule",
      "A service level that is measured instead of felt",
      "In-house staff freed from the work anyone could do",
    ],
    closingHeading: "Start with your last out-of-hours failure.",
    closingBody:
      "How long was it down before anyone knew? That number is usually the clearest case for monitoring — and it is the first thing we would fix.",
  },
];

/** The two Solutions columns in the main nav. Their headings are links, so
    each needs a landing page or the mega-menu points at a 404. */
export const SOLUTION_GROUPS = [
  {
    slug: "applications",
    title: "Applications",
    intro:
      "The software layer: billing, customer records, self-service and communications, delivered on platforms we build and maintain ourselves.",
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    intro:
      "The layer everything else depends on: networks, hosting, security and the people who keep all of it running around the clock.",
  },
];

/** Slug of the group a solution belongs to, e.g. "Applications" -> "applications" */
export function groupSlug(group: string): string {
  return group.toLowerCase();
}

export function getSolutionsByGroup(slug: string): Solution[] {
  return SOLUTIONS.filter((s) => groupSlug(s.group) === slug);
}

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
