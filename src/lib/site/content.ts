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
  /** What we need from you to start. */
  start: string[];
  /** Plain notes that matter (scope limits, independence). */
  notes?: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "bookkeeping",
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
    start: ["Your BIR Certificate of Registration (Form 2303)", "Last year's financial statements and books, if any", "Access to bank statements for the period"],
  },
  {
    slug: "tax-compliance",
    short: "VAT, withholding and income tax returns",
    name: "Tax compliance",
    summary: "BIR returns prepared and filed on time: VAT or percentage tax, withholding, income tax and annual information returns.",
    intro:
      "We prepare and file the returns your registration requires, on the BIR's schedule, and keep the alphalists and eSubmission files that go with them. You approve each return in the client portal before it is filed.",
    includes: [
      "VAT (2550Q) or percentage tax (2551Q) returns",
      "Withholding tax on compensation and expanded withholding (1601-C, 0619-E, 1601-EQ)",
      "Quarterly and annual income tax returns (1701Q/1701, 1702Q/1702)",
      "Annual information returns and alphalists (1604-C, 1604-E), with eSubmission",
      "Certificates of withholding (2307, 2316) and the summary lists the BIR asks for",
      "A filing calendar built from your Certificate of Registration",
    ],
    forWhom: "Any registered taxpayer: individuals in business or practice, one person corporations, partnerships, corporations and non-stock organizations.",
    start: ["Your BIR Certificate of Registration (Form 2303)", "Your eFPS or eBIRForms access, if already enrolled", "Copies of the last returns filed"],
    notes: ["Due dates move when they fall on a weekend or holiday, and the BIR occasionally extends them. We file on the date in force."],
  },
  {
    slug: "accounting-outsourcing",
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
    start: ["Your BIR Certificate of Registration (Form 2303)", "Your current chart of accounts and latest trial balance", "A walk-through of how documents move today"],
  },
  {
    slug: "audit",
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
    start: ["Your draft financial statements and trial balance", "Last year's audited financial statements, if any", "Access to the books and supporting documents"],
    notes: ["To stay independent, we do not audit financial statements we prepared or books we keep."],
  },
  {
    slug: "cas-implementation",
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
    start: ["Your BIR Certificate of Registration (Form 2303)", "A sample month of your transactions", "The system you are considering, if any"],
  },
  {
    slug: "agreed-upon-procedures",
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
    start: ["The request or terms from the party asking for the report", "The records the procedures cover"],
  },
  {
    slug: "rehabilitation-and-liquidation",
    shortName: "Rehabilitation and liquidation",
    short: "Court-appointed receiver and liquidator",
    name: "Corporate rehabilitation and liquidation",
    summary: "Court-appointed work as rehabilitation receiver or liquidator for businesses in financial distress.",
    intro:
      "Eroll Jay C. Tallo, CPA accepts court appointments as rehabilitation receiver and liquidator under the Financial Rehabilitation and Insolvency Act of 2010 (Republic Act No. 10142), and supports debtors and creditors with the accounting these proceedings require.",
    includes: [
      "Service as rehabilitation receiver or liquidator when appointed by the court",
      "Review and evaluation of a proposed rehabilitation plan",
      "Inventory, valuation support and the accounting of the debtor's assets",
      "Monitoring and periodic reports to the court and creditors",
    ],
    forWhom: "Courts, debtors, creditors and their counsel in rehabilitation and liquidation proceedings.",
    start: ["The petition or court order, through counsel", "The debtor's latest financial statements"],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug) ?? null;

/** The BIR filing rhythm shown on the home page. OWNER REVIEW against current regulations. */
export const FILING_RHYTHM: { cadence: string; rows: { form: string; what: string; due: string }[] }[] = [
  {
    cadence: "Every month",
    rows: [
      { form: "1601-C", what: "Compensation withholding", due: "10th, next month" },
      { form: "0619-E", what: "Expanded withholding", due: "10th, next month" },
    ],
  },
  {
    cadence: "Every quarter",
    rows: [
      { form: "2550Q / 2551Q", what: "VAT or percentage tax", due: "25th day after quarter" },
      { form: "1601-EQ", what: "Expanded withholding", due: "Last day, next month" },
    ],
  },
  {
    cadence: "Every year",
    rows: [
      { form: "1604-C", what: "Alphalist, compensation", due: "January 31" },
      { form: "1604-E", what: "Alphalist, expanded", due: "March 1" },
      { form: "1701 / 1702", what: "Annual income tax", due: "April 15" },
    ],
  },
];

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

/** The client's month, both sides of it. OWNER REVIEW: describes how the portal works today. */
export const CLIENT_MONTH: { when: string; you: string; we: string }[] = [
  { when: "As documents come in", you: "Upload receipts and bank statements.", we: "Record them in your books." },
  { when: "Before each deadline", you: "Check the return and approve it.", we: "Prepare it from your books." },
  { when: "On the deadline", you: "Nothing.", we: "File it and post the filed copy." },
  { when: "When billed", you: "Pay by QR from your bank app.", we: "Post your statement of account." },
]
