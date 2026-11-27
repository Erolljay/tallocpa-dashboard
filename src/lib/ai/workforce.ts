/**
 * The firm's AI workforce (docs/AI-WORKFORCE.md §3, §6; Q75–Q80): departments, the
 * standard AI employees and their starting settings. Settings → AI Employees creates
 * them from this list, every one switched off; the Owner changes the settings there.
 *
 * Books access defaults follow §6. Marketing never sees client data (the database
 * enforces it: client_data = false allows no client and no books).
 */

export type Department = "managing_partner" | "client_services" | "compliance" | "registration" | "collections" | "marketing";
export type RunsOn = "cowork" | "app" | "both";
export type BooksLevel = "none" | "summary" | "full";

export const DEPARTMENTS: Record<Department, string> = {
  managing_partner: "Office of the Managing Partner",
  client_services: "Client Services",
  compliance: "Tax Compliance & Bookkeeping",
  registration: "Business Registration",
  collections: "Billing & Collections",
  marketing: "Marketing & Growth",
};

export const DEPARTMENT_ORDER = Object.keys(DEPARTMENTS) as Department[];

export const RUNS_ON: Record<RunsOn, string> = {
  cowork: "Cowork",
  app: "In the app",
  both: "Cowork and the app",
};

export const BOOKS_LEVELS: Record<BooksLevel, { label: string; detail: string }> = {
  none: { label: "None", detail: "No ledger figures." },
  summary: { label: "Summary", detail: "Monthly totals, trial balance and FS lines; no entries, customers or suppliers." },
  full: { label: "Full", detail: "Entries, general ledger, receivables and payables by party, the same as the assigned preparer." },
};

export interface StandardEmployee {
  key: string;
  name: string;
  department: Department;
  job: string;
  runsOn: RunsOn;
  booksLevel: BooksLevel;
  allClients: boolean;
  clientData: boolean;
}

const role = (
  key: string,
  name: string,
  department: Department,
  runsOn: RunsOn,
  booksLevel: BooksLevel,
  job: string,
  extra: Partial<Pick<StandardEmployee, "allClients" | "clientData">> = {},
): StandardEmployee => ({ key, name, department, job, runsOn, booksLevel, allClients: extra.allClients ?? false, clientData: extra.clientData ?? department !== "marketing" });

export const STANDARD_WORKFORCE: StandardEmployee[] = [
  role("chief_of_staff", "Chief of Staff", "managing_partner", "cowork", "summary", "Morning brief for the Owner: approvals waiting, clients turning red, staff load and receivables at risk.", { allClients: true }),
  role("onboarding_officer", "Onboarding Officer", "client_services", "both", "full", "Works each new client's onboarding checklist: COR, engagement draft, portal invites, chart of accounts, opening balances draft and kickoff brief."),
  role("client_concierge", "Client Concierge", "client_services", "app", "none", "Answers clients on Telegram and the portal: deadlines, missing documents, 2307s and registration status. Opens a ticket for anything else."),
  role("document_clerk", "Document Clerk", "compliance", "both", "full", "After OCR: document type, period, account title, duplicates and odd amounts, and the note when a document goes back to the client."),
  role("pre_review_assistant", "Pre-Review Assistant", "compliance", "cowork", "full", "Before a return reaches the Reviewer: compares it with prior periods, 2307s with sales, the VAT threshold and the books, and drafts the review memo."),
  role("bir_mail_clerk", "BIR Mail Clerk", "compliance", "cowork", "none", "Matches BIR confirmations and notices to filings, attaches proof as a draft, and flags LOA, PAN or FAN."),
  role("fs_preparer", "FS Preparer", "compliance", "cowork", "full", "Assembles financial statements in the firm's design from the firm's notes library. Every amount, total and note number comes from the books."),
  role("annual_reviewer", "Annual Reviewer", "compliance", "cowork", "full", "Checks that the whole year adds up: the books against every return filed. Traces each difference and recommends explain, adjust or amend."),
  role("registration_runner", "Registration Runner", "registration", "cowork", "none", "Drafts Form 1901, 1903 and 1905 fields, lists missing requirements as client requests, and watches days held at each office."),
  role("collections_clerk", "Collections Clerk", "collections", "cowork", "none", "Drafts reminders by aging, summarizes each client's payment habits and flags jobs ready to bill. The Owner approves every send."),
  role("content_writer", "Content Writer", "marketing", "cowork", "none", "Articles and guides for tallocpa.com. Nothing is published without the Owner."),
  role("social_media_manager", "Social Media Manager", "marketing", "cowork", "none", "Content calendar, captions and Canva visuals. Nothing is posted without the Owner."),
  role("seo_specialist", "SEO Specialist", "marketing", "cowork", "none", "Local search, Google Business Profile, page titles and FAQs. Site changes go in as pull requests for the Owner."),
  role("sales_assistant", "Sales Assistant", "marketing", "cowork", "none", "Proposal drafts from leads and the fee schedule, and follow-ups. Hands accepted clients to the Onboarding Officer."),
  role("marketing_analyst", "Marketing Analyst", "marketing", "cowork", "none", "Monthly report from Firm → Marketing: leads by channel and what brought in proposals."),
];

/** Whether an AI employee calls a paid API, so its monthly cap matters. */
export const spendsOnApi = (runsOn: RunsOn) => runsOn !== "cowork";

/**
 * The login email of an AI employee: on a reserved domain (RFC 2606 `.invalid`), so no
 * mail can ever reach it and nobody can sign in with an emailed link.
 */
export function aiLoginEmail(key: string, suffix: string): string {
  return `ai.${key.replace(/_/g, "-")}.${suffix}@agents.tallocpa.invalid`;
}
