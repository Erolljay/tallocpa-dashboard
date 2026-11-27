/**
 * The Onboarding Officer's connector tools (docs/AI-WORKFORCE.md §3, §7.2; build step 3).
 *
 * It reads a client's onboarding through public.ai_onboarding_facts() (facts only, for its
 * clients) and computes the checklist with the app's own onboardingChecklist(), so it sees
 * exactly what staff see on the Onboarding tab. It changes nothing: what it prepares (an
 * engagement, a team, the chart of accounts, opening balances, a kickoff brief, a request
 * to the client) is saved as a draft for staff to accept or reject (ai_save_draft()).
 */
import { z } from "zod";
import { saveDraft, type DraftLine } from "@/lib/ai/drafts";
import { clientRef, findClient, notYours } from "@/lib/clients/ai-tools";
import { TEMPLATES, type TemplateCode } from "@/lib/ledger/types";
import { defineTool, ToolRefusal } from "@/lib/mcp/tool";
import type { Queryable } from "@/lib/mcp/types";
import { onboardingChecklist, onboardingProgress, type OnboardingFacts } from "./checklist";

const EMPLOYEES = ["onboarding_officer"] as const;

/** What public.ai_onboarding_facts() returns. */
export interface AiOnboardingFacts {
  client_id: string;
  status: string;
  fiscal_year_end_month: number;
  files: { proposal: number; contract: number; contract_signed: boolean };
  engagement_active: boolean;
  engagements: { service_line: string; monthly_retainer: number | string; status: string; start_date: string }[];
  accepted_proposal: { accepted_on: string; monthly_retainer: number | string } | null;
  tax_types: unknown[];
  registration_date: string | null;
  obligations: number;
  has_payroll_obligation: boolean;
  preparer: boolean;
  reviewer: boolean;
  portal_users: number;
  portal_signed_in: boolean;
  books_start: string | null;
  opening_posted: boolean;
  batch_uploads: number;
  employees: number;
  ticks: { item: string; at: string; note: string | null }[];
}

/** The app's checklist facts from what the database function returns. Pure. */
export function factsFromAi(f: AiOnboardingFacts): OnboardingFacts {
  return {
    clientId: f.client_id,
    files: { proposal: Number(f.files.proposal), contract: Number(f.files.contract), contractSigned: f.files.contract_signed },
    engagementActive: f.engagement_active,
    corRecorded: (f.tax_types ?? []).length > 0,
    obligations: Number(f.obligations),
    hasPayrollObligation: f.has_payroll_obligation,
    preparer: f.preparer,
    reviewer: f.reviewer,
    portalUsers: Number(f.portal_users),
    portalSignedIn: f.portal_signed_in,
    booksStart: f.books_start ? String(f.books_start).slice(0, 10) : null,
    openingPosted: f.opening_posted,
    yearStartMonth: (Number(f.fiscal_year_end_month) % 12) + 1,
    batchUploads: Number(f.batch_uploads),
    employees: Number(f.employees),
    // The AI employee sees when an item was ticked, not who ticked it.
    ticks: new Map((f.ticks ?? []).map((t) => [t.item, { by: "", at: String(t.at).slice(0, 10), note: t.note }])),
  };
}

async function readFacts(db: Queryable, clientId: string): Promise<AiOnboardingFacts> {
  const { rows } = await db.query<{ f: AiOnboardingFacts }>(`select public.ai_onboarding_facts($1) as f`, [clientId]);
  return rows[0].f;
}

const checklistOf = (facts: AiOnboardingFacts) => {
  const items = onboardingChecklist(factsFromAi(facts));
  return { items, progress: onboardingProgress(items) };
};

export const onboardingClients = defineTool({
  name: "onboarding_clients",
  title: "Clients being onboarded",
  description:
    "Your clients still being onboarded (status Onboarding), each with checklist progress (done / total) and the next items still to do.",
  input: z.object({}),
  employees: EMPLOYEES,
  effect: "read",
  async run({ db }) {
    const { rows } = await db.query<{ id: string; code: string; name: string }>(`select id, code, name from public.clients where status = 'onboarding' order by name`);
    const clients = [];
    for (const c of rows) {
      const { items, progress } = checklistOf(await readFacts(db, c.id));
      clients.push({ ...c, done: progress.done, total: progress.total, next: items.filter((i) => i.state === "todo").slice(0, 3).map((i) => i.label) });
    }
    return { clients };
  },
});

export const onboardingChecklistTool = defineTool({
  name: "onboarding_checklist",
  title: "A client's onboarding checklist",
  description:
    "One of your clients' onboarding checklist, item by item (done, to do, or not applicable, with what is missing), with the registration facts from the COR (taxpayer type, TIN, RDO, tax types, registration date, the returns it must file) and its engagements or accepted proposal.",
  input: z.object({ client: clientRef.describe("The client's id or code") }),
  employees: EMPLOYEES,
  effect: "read",
  async run({ db, noteClient }, { client }) {
    const found = await findClient(db, client);
    if (!found) throw notYours(client);
    noteClient(found.id);
    const facts = await readFacts(db, found.id);
    const { items, progress } = checklistOf(facts);
    const [{ rows: detail }, { rows: returns }] = [
      await db.query(`select code, name, status, taxpayer_type, tin, rdo_code, registered_address, fiscal_year_end_month, book_type from public.clients where id = $1`, [found.id]),
      await db.query(`select form, frequency, start_date::text from public.obligations where client_id = $1 and (end_date is null or end_date >= current_date) order by form`, [found.id]),
    ];
    return {
      client: detail[0],
      progress,
      checklist: items.map((i) => ({ key: i.key, group: i.group, item: i.label, state: i.state, detail: i.hint, ticked_by_staff: i.manual })),
      registration: { tax_types: facts.tax_types, registration_date: facts.registration_date, returns },
      engagements: facts.engagements,
      accepted_proposal: facts.accepted_proposal,
    };
  },
});

export const staffForTeam = defineTool({
  name: "staff_for_team",
  title: "Staff and their load",
  description:
    "Active staff with role, branch, capacity and current load (monthly retainers of current clients ÷ ₱1,000), to suggest a preparer and a reviewer for a new client.",
  input: z.object({}),
  employees: EMPLOYEES,
  effect: "read",
  async run({ db }) {
    const { rows } = await db.query(`select full_name, role, branch, capacity_points::float8 as capacity, load_points::float8 as load, clients from public.ai_staff_load()`);
    return { staff: rows };
  },
});

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.");
const money = z.number().min(0).max(1_000_000_000_000);

export const DRAFT_KINDS = ["engagement", "team", "chart_of_accounts", "opening_balances", "kickoff_brief", "client_request"] as const;
export type OnboardingDraftKind = (typeof DRAFT_KINDS)[number];

const draftInput = z.object({
  kind: z.enum(DRAFT_KINDS).describe("What you are drafting"),
  client: clientRef.describe("The client's id or code"),
  reason: z.string().trim().min(1).max(1500).describe("Why, in a sentence or two, for the reviewer"),
  engagement: z
    .object({
      service_lines: z.array(z.string().trim().min(1).max(80)).min(1).max(10).describe("Services, e.g. tax_compliance, bookkeeping"),
      monthly_retainer: money.describe("Monthly retainer in pesos"),
      start_date: isoDate,
    })
    .optional()
    .describe("For kind engagement"),
  team: z
    .object({ preparer: z.string().trim().min(1).max(120), reviewer: z.string().trim().min(1).max(120) })
    .optional()
    .describe("For kind team: full names as staff_for_team lists them"),
  chart_of_accounts: z
    .object({ template: z.enum(Object.keys(TEMPLATES) as [TemplateCode, ...TemplateCode[]]), books_start: isoDate })
    .optional()
    .describe("For kind chart_of_accounts"),
  opening_balances: z
    .object({
      as_of: isoDate.describe("The day before the books start"),
      lines: z
        .array(z.object({ account_code: z.string().trim().min(1).max(20), account_name: z.string().trim().max(120).optional(), debit: money.default(0), credit: money.default(0) }))
        .min(2)
        .max(300),
      source: z.string().trim().max(300).optional().describe("Where the figures come from, e.g. 2025 AFS"),
    })
    .optional()
    .describe("For kind opening_balances: must balance"),
  kickoff_brief: z.object({ text: z.string().trim().min(1).max(20_000) }).optional().describe("For kind kickoff_brief: markdown"),
  client_request: z
    .object({ title: z.string().trim().min(1).max(200), items: z.array(z.string().trim().min(1).max(300)).min(1).max(30) })
    .optional()
    .describe("For kind client_request: what to ask the client for"),
});

type DraftInput = z.output<typeof draftInput>;

const cents = (n: number) => Math.round(n * 100);
const peso = (c: number) => `₱${(c / 100).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Checks the body for the kind and turns it into what the reviewer reads. Pure; throws ToolRefusal with the reason. */
export function draftBody(input: DraftInput, staffNames: string[] = []): { summary: DraftLine[]; data: Record<string, unknown> } {
  const missing = () => new ToolRefusal(`Give the "${input.kind}" details for kind ${input.kind}.`);
  switch (input.kind) {
    case "engagement": {
      const e = input.engagement;
      if (!e) throw missing();
      return {
        summary: [
          { label: "Services", value: e.service_lines.join(", ") },
          { label: "Monthly retainer", value: peso(cents(e.monthly_retainer)) },
          { label: "Starts", value: e.start_date },
        ],
        data: { engagement: e },
      };
    }
    case "team": {
      const t = input.team;
      if (!t) throw missing();
      const known = new Set(staffNames.map((n) => n.toLowerCase()));
      for (const n of [t.preparer, t.reviewer]) if (!known.has(n.toLowerCase())) throw new ToolRefusal(`"${n}" is not an active member of staff (see staff_for_team).`);
      return { summary: [{ label: "Preparer", value: t.preparer }, { label: "Reviewer", value: t.reviewer }], data: { team: t } };
    }
    case "chart_of_accounts": {
      const c = input.chart_of_accounts;
      if (!c) throw missing();
      return { summary: [{ label: "Template", value: TEMPLATES[c.template] }, { label: "Books start", value: c.books_start }], data: { chart_of_accounts: c } };
    }
    case "opening_balances": {
      const o = input.opening_balances;
      if (!o) throw missing();
      let dr = 0;
      let cr = 0;
      for (const [i, l] of o.lines.entries()) {
        const d = cents(l.debit);
        const c = cents(l.credit);
        if (Math.abs(l.debit * 100 - d) > 1e-6 || Math.abs(l.credit * 100 - c) > 1e-6) throw new ToolRefusal(`Line ${i + 1}: amounts go to the centavo.`);
        if ((d > 0) === (c > 0)) throw new ToolRefusal(`Line ${i + 1} (${l.account_code}): give a debit or a credit, not both or neither.`);
        dr += d;
        cr += c;
      }
      if (dr !== cr) throw new ToolRefusal(`The opening balances do not balance: debits ${peso(dr)}, credits ${peso(cr)} (difference ${peso(Math.abs(dr - cr))}).`);
      return {
        summary: [
          { label: "As of", value: o.as_of },
          { label: "Lines", value: String(o.lines.length) },
          { label: "Total debits = credits", value: peso(dr) },
          ...(o.source ? [{ label: "Source", value: o.source }] : []),
          ...o.lines.slice(0, 40).map((l) => ({ label: `${l.account_code}${l.account_name ? ` ${l.account_name}` : ""}`, value: cents(l.debit) ? `Dr ${peso(cents(l.debit))}` : `Cr ${peso(cents(l.credit))}` })),
          ...(o.lines.length > 40 ? [{ label: "…", value: `${o.lines.length - 40} more lines in the draft` }] : []),
        ],
        data: { opening_balances: o },
      };
    }
    case "kickoff_brief": {
      const k = input.kickoff_brief;
      if (!k) throw missing();
      return { summary: [{ label: "Brief", value: k.text }], data: { kickoff_brief: k } };
    }
    case "client_request": {
      const r = input.client_request;
      if (!r) throw missing();
      return { summary: [{ label: "Request", value: r.title }, ...r.items.map((it, i) => ({ label: `${i + 1}`, value: it }))], data: { client_request: r } };
    }
  }
}

export const draftOnboardingItem = defineTool({
  name: "draft_onboarding_item",
  title: "Draft an onboarding item",
  description:
    "Save a draft for staff to accept or reject on the client's Onboarding tab: an engagement, a team (preparer and reviewer), the chart-of-accounts template and books start, opening balances (must balance), a kickoff brief, or a request to the client. Nothing is changed in the app; a new draft of the same kind replaces your open one.",
  input: draftInput,
  employees: EMPLOYEES,
  effect: "draft",
  async run({ db, noteClient }, input) {
    const found = await findClient(db, input.client);
    if (!found) throw notYours(input.client);
    noteClient(found.id);
    let names: string[] = [];
    if (input.kind === "team") {
      const { rows } = await db.query<{ full_name: string }>(`select full_name from public.ai_staff_load()`);
      names = rows.map((r) => r.full_name);
    }
    const body = draftBody(input, names);
    const saved = await saveDraft(db, {
      kind: input.kind,
      clientId: found.id,
      subject: { table: "clients", id: found.id },
      summary: body.summary,
      data: body.data,
      note: input.reason,
    });
    return { draft: saved, client: { code: found.code, name: found.name }, message: "Saved for staff to review on the client's Onboarding tab." };
  },
});
