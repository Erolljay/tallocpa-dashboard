/**
 * Copy for the public website. OWNER REVIEW: every line here is public advertising
 * by a CPA in public practice and falls under the BOA Code of Ethics. It is kept
 * factual on purpose: no testimonials, client names, rankings, statistics, years of
 * experience or prices (fees are shown only by the instant-quote calculator).
 * Check the BIR references (form numbers, due dates) against current issuances
 * before each filing season; they change by revenue regulation.
 */

export interface Service {
  slug: string;
  name: string;
  /** A shorter name where space is tight (footer). */
  shortName?: string;
  /** A few words for the home page index. */
  short: string;
  /** One line for lists and link previews. */
  summary: string;
  /** The opening paragraph of the service page. */
  intro: string;
  /** What the engagement covers. */
  includes: string[];
  /** Who usually engages it. */
  forWhom: string;
  /** Plain notes that matter (scope limits, independence). */
  notes?: string[];
  /** SEO: the page's primary search phrase, its title (60 characters at most), meta description (155 at most) and H1. */
  keyword: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** The opening paragraph under the H1, carrying the keyword naturally. */
  opening: string;
  /** Services linked from this one. */
  related: string[];
  group: ServiceGroup;
}

export type ServiceGroup = "accounting" | "assurance";
export const SERVICE_GROUPS: Record<ServiceGroup, string> = {
  accounting: "Accounting and tax",
  assurance: "Assurance",
};

export const SERVICES: Service[] = [
  {
    slug: "bookkeeping",
    keyword: "bookkeeping services Philippines",
    seoTitle: "Bookkeeping Services in the Philippines | Tallo CPA",
    metaDescription: "Monthly bookkeeping services for Philippine businesses: books of accounts kept in BIR form, reconciled to the bank, ready for your returns.",
    h1: "Bookkeeping services",
    opening: "Bookkeeping services for Philippine businesses: your sales, purchases and bank activity recorded every month, in books of accounts kept the way the BIR requires.",
    related: ["tax-compliance", "cas-implementation", "accounting-outsourcing"],
    group: "accounting",
    short: "Monthly books, kept current",
    name: "Bookkeeping",
    summary: "Books of accounts kept current every month, ready for your returns and your decisions.",
    intro:
      "We record your sales, purchases, expenses and bank activity each month and keep your books of accounts in the form the BIR requires, so your returns are filed from records that agree with them.",
    includes: [
      "Monthly recording of sales, purchases, expenses and payroll from your documents",
      "Bank and e-wallet reconciliation",
      "Journals and ledgers in manual, loose-leaf or computerized form",
      "Monthly financial reports: income statement and balance sheet",
      "Year-end closing and the schedules your annual return needs",
    ],
    forWhom: "Self-employed professionals, sole proprietors, partnerships and corporations that want the books kept by a CPA firm rather than in-house.",
  },
  {
    slug: "tax-compliance",
    keyword: "BIR tax compliance services",
    seoTitle: "BIR Tax Compliance Services | Tallo CPA",
    metaDescription: "BIR tax compliance services: VAT or percentage tax, withholding, income tax and annual information returns, prepared from your books and filed for you.",
    h1: "BIR tax compliance services",
    opening: "BIR tax compliance services: we prepare each return from your books, you approve it in the client portal, and we file it on the BIR's schedule.",
    related: ["bookkeeping", "accounting-outsourcing", "audit"],
    group: "accounting",
    short: "VAT, withholding and income tax returns",
    name: "Tax compliance",
    summary: "BIR returns prepared and filed on time: VAT or percentage tax, withholding, income tax and annual information returns.",
    intro:
      "We prepare and file the returns your registration requires, on the BIR's schedule, and keep the alphalists and eSubmission files that go with them. You approve each return in the client portal before it is filed.",
    includes: [
      "VAT (2550Q) or percentage tax (2551Q) returns",
      "Withholding on compensation and expanded withholding (1601-C, 0619-E, 1601-EQ)",
      "Quarterly and annual income tax returns (1701Q, 1701, 1702Q, 1702)",
      "Annual information returns and alphalists (1604-C, 1604-E) by eSubmission",
      "Certificates of withholding (2307, 2316)",
      "A filing calendar built from your Certificate of Registration",
    ],
    forWhom: "Any registered taxpayer: individuals in business, OPCs, partnerships, corporations and non-stock organizations.",
  },
  {
    slug: "accounting-outsourcing",
    keyword: "accounting outsourcing Philippines",
    seoTitle: "Accounting Outsourcing in the Philippines | Tallo CPA",
    metaDescription: "Accounting outsourcing for Philippine businesses: monthly close, payables, receivables and payroll records, and management reports, run by a CPA firm.",
    h1: "Accounting outsourcing",
    opening: "Accounting outsourcing for Philippine businesses: we run the records, reconciliations, monthly close and reports, so you need not build an accounting team.",
    related: ["bookkeeping", "tax-compliance", "audit"],
    group: "accounting",
    short: "Your accounting function, run for you",
    name: "Accounting outsourcing",
    summary: "The accounting function run for you: books, payables and receivables records, payroll records and reports.",
    intro:
      "For businesses that would rather not build an accounting team, we run the function end to end: the records, the reconciliations, the monthly close and the reports management needs, alongside your tax compliance.",
    includes: [
      "Monthly close and management reports",
      "Accounts payable and receivable records and aging",
      "Payroll computation records and the government remittance schedules",
      "Fixed asset register and depreciation",
      "Coordination with your auditor at year-end",
    ],
    forWhom: "Growing businesses and corporations that need a complete accounting function without hiring for each role.",
  },
  {
    slug: "audit",
    keyword: "financial statement audit Philippines",
    seoTitle: "Financial Statement Audit, Philippines | Tallo CPA",
    metaDescription: "Audit of financial statements under the Philippine Standards on Auditing, with the auditor's report for your annual BIR return and SEC filing.",
    h1: "Financial statement audit",
    opening: "A financial statement audit under the Philippine Standards on Auditing, with the auditor's report for your annual income tax return and SEC filing.",
    related: ["agreed-upon-procedures", "accounting-outsourcing", "tax-compliance"],
    group: "assurance",
    short: "Financial statements, audited",
    name: "Audit",
    summary: "Audit of financial statements under the Philippine Standards on Auditing, for filing with the BIR and the SEC.",
    intro:
      "We audit annual financial statements under the Philippine Standards on Auditing and issue the auditor's report that accompanies your annual income tax return and, for corporations, your filing with the SEC.",
    includes: [
      "Planning and risk assessment",
      "Testing of balances and transactions",
      "Auditor's report on the financial statements",
      "The supplementary schedules the BIR and SEC require",
    ],
    forWhom: "Businesses whose gross sales or receipts require audited financial statements, and organizations that need an audit for lenders or members.",
    notes: ["To stay independent, we do not audit financial statements we prepared or books we keep."],
  },
  {
    slug: "cas-implementation",
    keyword: "CAS implementation BIR",
    seoTitle: "BIR CAS Implementation and Registration | Tallo CPA",
    metaDescription: "Computerized accounting system (CAS) implementation: choose a system, set it up, and prepare the documents for its registration with the BIR.",
    h1: "CAS implementation",
    opening: "CAS implementation for businesses leaving manual books: we help choose a computerized accounting system, set it up, and prepare its BIR registration.",
    related: ["bookkeeping", "tax-compliance", "accounting-outsourcing"],
    group: "accounting",
    short: "Computerized books, registered with the BIR",
    name: "CAS implementation",
    summary: "A computerized accounting system chosen, set up and registered with the BIR.",
    intro:
      "When you move from manual or loose-leaf books to a computerized accounting system, we help you choose one that fits, set it up, and prepare the documents for its registration with the BIR.",
    includes: [
      "Review of your transactions and reporting needs",
      "System selection and chart of accounts set-up",
      "Preparation of the BIR application and its attachments",
      "Opening balances and parallel run",
      "Training for the people who will use it",
    ],
    forWhom: "Businesses moving off manual books, and those the BIR requires to keep computerized records or issue system-generated invoices.",
  },
  {
    slug: "agreed-upon-procedures",
    keyword: "agreed-upon procedures engagement",
    seoTitle: "Agreed-Upon Procedures Engagements | Tallo CPA",
    metaDescription: "Agreed-upon procedures engagements: specific procedures on specific figures or controls, reported as factual findings for a lender, grantor or regulator.",
    h1: "Agreed-upon procedures",
    opening: "An agreed-upon procedures engagement answers a narrow question: we perform the procedures you and the report's users agree on and report factual findings.",
    related: ["audit", "accounting-outsourcing", "tax-compliance"],
    group: "assurance",
    short: "Specific checks, factual findings",
    name: "Agreed-upon procedures",
    summary: "Specific procedures performed on specific information, reported as factual findings.",
    intro:
      "An agreed-upon procedures engagement answers a narrow question: we perform the procedures you and the report's users agree on and report what we found, without giving an opinion. It suits checks a lender, grantor, franchisor or regulator asks for.",
    includes: [
      "Agreeing the procedures and the subject matter with you and the intended users",
      "Performing the procedures on the records",
      "A report of factual findings, under the Philippine standard on related services",
    ],
    forWhom: "Organizations asked by a lender, grantor, franchisor, landlord or regulator for a report on specific figures or controls.",
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug) ?? null;


export interface Faq {
  q: string;
  a: string[];
}

/** OWNER REVIEW: answers are general information, not advice for a particular taxpayer. */
export const FAQ_GROUPS: { title: string; items: Faq[] }[] = [
  {
    title: "BIR deadlines",
    items: [
      {
        q: "When are monthly withholding taxes due?",
        a: [
          "Withholding on compensation (1601-C) and expanded withholding for the first two months of a quarter (0619-E) are due on the 10th of the following month for manual and eBIRForms filers. eFPS filers file on staggered dates set by their industry group.",
          "The withholding on compensation for December is due on January 15.",
        ],
      },
      {
        q: "When are quarterly VAT and percentage tax returns due?",
        a: ["The quarterly VAT return (2550Q) and the quarterly percentage tax return (2551Q) are due on the 25th day after the close of each taxable quarter."],
      },
      {
        q: "When is the annual income tax return due?",
        a: [
          "For calendar-year taxpayers, the annual income tax return (1701 or 1702) is due on April 15 of the following year. Corporations on a fiscal year file on the 15th day of the fourth month after their year ends.",
          "Quarterly returns for individuals (1701Q) are due on May 15, August 15 and November 15. Quarterly returns for corporations (1702Q) are due 60 days after the close of each of the first three quarters.",
        ],
      },
      {
        q: "What are the annual information returns?",
        a: [
          "Employers file the annual information return of income taxes withheld on compensation (1604-C) with its alphalist by January 31. Withholding agents file the annual information return of creditable and final withholding (1604-E) by March 1. Alphalists are sent to the BIR through eSubmission.",
        ],
      },
      {
        q: "What happens if a deadline falls on a weekend or holiday?",
        a: ["The return is due on the next working day. The BIR also extends deadlines from time to time by revenue memorandum circular; we file on the date in force."],
      },
    ],
  },
  {
    title: "Working with us",
    items: [
      {
        q: "How do I get a quote?",
        a: ["Answer a few questions about your business in the quote form. It shows the fee for your profile right away, based on our fee schedule, and sends your request to us."],
      },
      {
        q: "What do you need to start?",
        a: [
          "Your BIR Certificate of Registration (Form 2303), copies of the last returns filed, and your books or financial statements for the latest period. Each service page lists what that engagement needs.",
        ],
      },
      {
        q: "We are behind on filings. Can you help?",
        a: ["Yes. We list what is open with the BIR, file the missing returns in order, and explain the penalties the late filings carry before they are filed."],
      },
      {
        q: "How do I send documents and approve returns?",
        a: [
          "Through the client portal. You upload receipts and statements there, approve each return before it is filed, and see the filed returns, your statements of account and your payments in one place.",
        ],
      },
      {
        q: "How do I pay?",
        a: ["Your statement of account in the client portal shows the amount due and a QR code you can pay with your bank or e-wallet app."],
      },
      {
        q: "Do you work with businesses outside our city?",
        a: ["Yes. We serve businesses across the Philippines. Documents, approvals and payments all go through the client portal, and meetings can be held by video call."],
      },
    ],
  },
];

/** How the platform works, from receipt to filed return. OWNER REVIEW: describes the portal as it works today. */
export const PLATFORM_FLOW: { verb: string; body: string }[] = [
  { verb: "Upload", body: "Receipts and bank statements, from your phone." },
  { verb: "Record", body: "Posted to your books every month." },
  { verb: "Prepare", body: "Returns and alphalists, from your books." },
  { verb: "Approve", body: "Check each return, then approve it." },
  { verb: "File", body: "Filed with the BIR, the copy in your portal." },
];

/** Security and privacy: factual statements only. OWNER REVIEW: keep each one true. */
export const SAFEGUARDS: { title: string; body: string }[] = [
  { title: "Data Privacy Act", body: "Personal information is handled under Republic Act No. 10173." },
  { title: "Access by role", body: "You see your own business only. Staff access is set by role and enforced by the database." },
  { title: "Private storage", body: "Uploaded documents are kept in private storage, never on public links." },
  { title: "Encrypted connections", body: "The site and the portal are served over HTTPS only." },
];

/**
 * The /how-we-work page: how bookkeeping and BIR compliance run each month, from data
 * intake to the filed return. OWNER REVIEW: describes the portal as it works today
 * (src/app/portal/**); keep each step true.
 */
export const HOW_STEPS: { id: string; title: string; body: string }[] = [
  { id: "calendar", title: "We set up your filing calendar", body: "We read your Certificate of Registration and set up every return you file, with its BIR deadline." },
  { id: "upload", title: "You upload as the month goes", body: "Snap or choose files by category, any time in the month before the cutoff." },
  { id: "check", title: "We check and record", body: "We check each document and post it to your books. If something needs fixing, we ask you under Requests." },
  { id: "confirm", title: "You confirm the month", body: "When everything is in, tap “I've sent everything”. The portal shows anything still missing first." },
  { id: "lock", title: "The books are locked", body: "Once the month is checked and confirmed, we lock it. Its books are final." },
  { id: "approve", title: "You approve each return", body: "Each return waits under Returns with its tax due. Approve it, or ask a question first." },
  { id: "file", title: "We file and pay before the BIR deadline", body: "Every approval and filing is scheduled months ahead, each with its BIR deadline. The filed copy lands in your portal." },
  { id: "reports", title: "Your reports stay current", body: "Financial position, the last six months, loose-leaf books, filed returns, and your 2307s and 2316s." },
  { id: "billing", title: "You pay by QR", body: "Your statement comes to the portal. Pay with your bank or e-wallet app and upload the proof." },
];
