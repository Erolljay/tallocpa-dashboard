/**
 * The Collections Clerk's connector tools (docs/AI-WORKFORCE.md §3, §7.2; build step 6).
 * It reads the firm's receivables for its clients, summarizes each client's payment
 * habits, lists what is ready to bill and drafts payment reminders. It never bills,
 * records or waives anything, and never sends a message: every reminder is a draft the
 * Owner reads and sends himself.
 *
 * Receivables are the Owner's alone (staff cannot read them), so nothing is read from
 * the tables directly: three read-only functions (migration
 * 20270109000002_ai_collections_clerk.sql) answer only the switched-on Collections
 * Clerk, only for its clients. Reminders are saved without a client id, so only the
 * Owner sees and decides them; the subject (clients, id) says which client.
 */
import { z } from "zod";
import { saveDraft } from "@/lib/ai/drafts";
import { clientRef, findClient, notYours } from "@/lib/clients/ai-tools";
import { ageOpenItems, agingBucket, daysPastDue, dueKindLabel, readyReasonLabel, type DueKind, type ReadyReason } from "@/lib/collections/collections";
import { summarize, type SummaryRow } from "@/lib/collections/summary";
import { defineTool, ToolRefusal } from "@/lib/mcp/tool";
import type { Queryable } from "@/lib/mcp/types";

const CLERK = ["collections_clerk"] as const;
export const REMINDER_KIND = "payment_reminder";
/** A reminder decided this recently is not drafted again on the next run. */
export const REMINDER_QUIET_DAYS = 7;
export const REMINDER_TONES = ["gentle", "firm", "final"] as const;

const money = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
const cents = (v: number | string) => Math.round(Number(v) * 100);

interface OpenItem extends Record<string, unknown> {
  client_id: string;
  client_code: string;
  client_name: string;
  client_status: string;
  due_id: string;
  statement: string;
  statement_date: string;
  kind: DueKind;
  description: string;
  due_on: string;
  amount: string;
  paid: string;
  open_amount: string;
  client_credit: string;
  proof_waiting: boolean;
}

async function openItems(db: Queryable): Promise<OpenItem[]> {
  const { rows } = await db.query<OpenItem>(
    `select client_id, client_code, client_name, client_status, due_id, statement, statement_date::text, kind, description,
            due_on::text, amount, paid, open_amount, client_credit, proof_waiting
     from public.ai_receivables()`,
  );
  return rows;
}

/** The Clerk's latest reminder draft per client (its own drafts only, by row-level security). */
async function lastReminders(db: Queryable): Promise<Map<string, { status: string; on_day: string; recent: boolean }>> {
  const { rows } = await db.query<{ client_id: string; status: string; on_day: string; recent: boolean }>(
    `select distinct on (subject_id) subject_id::text as client_id, status, (created_at at time zone 'Asia/Manila')::date::text as on_day,
            (status = 'open' or coalesce(decided_at, created_at) > now() - make_interval(days => $2)) as recent
     from public.ai_drafts
     where ai_user_id = auth.uid() and kind = $1 and subject_table = 'clients' and status <> 'withdrawn'
     order by subject_id, created_at desc`,
    [REMINDER_KIND, REMINDER_QUIET_DAYS],
  );
  return new Map(rows.map((r) => [r.client_id, r]));
}

function byStatement(items: OpenItem[]) {
  const out = new Map<string, { statement: string; statement_date: string; due_on: string; open: number; items: string[]; proof_waiting: boolean }>();
  for (const i of items) {
    const s = out.get(i.statement) ?? { statement: i.statement, statement_date: i.statement_date, due_on: i.due_on, open: 0, items: [], proof_waiting: i.proof_waiting };
    s.open += cents(i.open_amount);
    if (i.due_on < s.due_on) s.due_on = i.due_on;
    s.items.push(`${dueKindLabel[i.kind] ?? i.kind}: ${i.description}`);
    out.set(i.statement, s);
  }
  return [...out.values()].map((s) => ({ ...s, open: s.open / 100 }));
}

export const receivablesAging = defineTool({
  name: "receivables_aging",
  title: "Receivables aging",
  description:
    "What your clients owe on statements already issued, per client, oldest first: totals by aging bucket (not yet due, 1–30, 31–60, 61–90, over 90 days past due), the statements still open, the client's unused credit, and whether the client uploaded a payment proof still waiting for the Owner. Clients you drafted a reminder for (still waiting, or decided in the last 7 days) are left out and only counted, so each run works new ones; pass include_drafted to list them too.",
  input: z.object({
    overdue_only: z.boolean().default(false).describe("Only clients with something past due"),
    include_drafted: z.boolean().default(false).describe("Also list clients you recently drafted a reminder for"),
  }),
  employees: CLERK,
  effect: "read",
  async run({ db, today }, { overdue_only, include_drafted }) {
    const items = await openItems(db);
    const reminders = await lastReminders(db);
    const clients = new Map<string, OpenItem[]>();
    for (const i of items) clients.set(i.client_id, [...(clients.get(i.client_id) ?? []), i]);
    let alreadyDrafted = 0;
    const out = [];
    for (const [clientId, rows] of clients) {
      const aging = ageOpenItems(rows, today);
      if (overdue_only && aging.overdue <= 0) continue;
      const last = reminders.get(clientId);
      if (last?.recent) {
        alreadyDrafted += 1;
        if (!include_drafted) continue;
      }
      const oldest = rows.reduce((a, b) => (b.due_on < a.due_on ? b : a));
      out.push({
        client_id: clientId,
        client_code: rows[0].client_code,
        client: rows[0].client_name,
        client_status: rows[0].client_status,
        total_open: aging.total,
        overdue: aging.overdue,
        buckets: aging.buckets,
        oldest_due_on: oldest.due_on,
        days_past_due: Math.max(daysPastDue(oldest.due_on, today), 0),
        oldest_bucket: agingBucket(oldest.due_on, today),
        credit: Number(rows[0].client_credit),
        payment_proof_waiting: rows.some((r) => r.proof_waiting),
        statements: byStatement(rows),
        last_reminder: last ? { status: last.status, on: last.on_day } : null,
      });
    }
    out.sort((a, b) => a.oldest_due_on.localeCompare(b.oldest_due_on) || a.client.localeCompare(b.client));
    const firm = ageOpenItems(items, today);
    return { as_of: today, firm_total_open: firm.total, firm_overdue: firm.overdue, firm_buckets: firm.buckets, already_drafted: alreadyDrafted, clients: out };
  },
});

interface History {
  billed: { statement: string; statement_date: string; kind: DueKind; description: string; due_on: string; amount: number; paid: number; open: number; waived: boolean; paid_in_full_on: string | null }[];
  payments: { received_on: string; amount: number; method: string; voided: boolean }[];
  credit: number;
  proofs_waiting: number;
}

export const clientPaymentHistory = defineTool({
  name: "client_payment_history",
  title: "A client's payment history",
  description:
    "One of your clients' statements and payments over the last months (12 by default): each item billed with its due date and the date it was paid in full, each payment received (date, amount, method), the client's credit, payment proofs waiting for the Owner, the average days from statement to payment and days paid late, and your last reminder for the client.",
  input: z.object({
    client: clientRef.describe("The client (id or code)"),
    months: z.number().int().min(1).max(36).default(12).describe("How many months back"),
  }),
  employees: CLERK,
  effect: "read",
  async run({ db, today, noteClient }, { client, months }) {
    const found = await findClient(db, client);
    if (!found) throw notYours(client);
    noteClient(found.id);
    const since = new Date(`${today}T00:00:00Z`);
    since.setUTCMonth(since.getUTCMonth() - months);
    const sinceDay = since.toISOString().slice(0, 10);
    const { rows } = await db.query<{ h: History }>(`select public.ai_client_payments($1, $2::date) as h`, [found.id, sinceDay]);
    const h = rows[0].h;
    const paid = h.billed.filter((b) => b.paid_in_full_on && !b.waived);
    const avg = (xs: number[]) => (xs.length ? Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 10) / 10 : null);
    const reminders = await lastReminders(db);
    const last = reminders.get(found.id);
    return {
      client_id: found.id,
      client_code: found.code,
      client: found.name,
      since: sinceDay,
      billed: h.billed.map((b) => ({ ...b, kind: dueKindLabel[b.kind] ?? b.kind })),
      payments: h.payments,
      credit: Number(h.credit),
      payment_proofs_waiting: h.proofs_waiting,
      habits: {
        items_paid: paid.length,
        items_open: h.billed.filter((b) => Number(b.open) > 0).length,
        average_days_statement_to_paid: avg(paid.map((b) => daysPastDue(b.statement_date, b.paid_in_full_on!))),
        average_days_late: avg(paid.map((b) => Math.max(daysPastDue(b.due_on, b.paid_in_full_on!), 0))),
        paid_on_time: paid.filter((b) => b.paid_in_full_on! <= b.due_on).length,
      },
      last_reminder: last ? { status: last.status, on: last.on_day } : null,
    };
  },
});

export const jobsReadyToBill = defineTool({
  name: "jobs_ready_to_bill",
  title: "Ready to bill",
  description:
    "What a billing run would put on your clients' statements today (the Owner's Ready to bill list, for your current clients): each month's retainer not yet billed, the tax due of returns the firm remits once the client approved them (or two days before the deadline), and contributions and charges not yet on a statement. Only the Owner runs billing.",
  input: z.object({}),
  employees: CLERK,
  effect: "read",
  async run({ db, today }) {
    const { rows } = await db.query<{ client_id: string; client_code: string; client_name: string; kind: DueKind; description: string; amount: string; reason: ReadyReason; days_to_due: number | null }>(
      `select client_id, client_code, client_name, kind, description, amount, reason, days_to_due from public.ai_ready_to_bill($1::date)`,
      [today],
    );
    const clients = new Map<string, { client_id: string; client_code: string; client: string; total: number; items: { kind: string; description: string; amount: number; why: string }[] }>();
    for (const r of rows) {
      const c = clients.get(r.client_id) ?? { client_id: r.client_id, client_code: r.client_code, client: r.client_name, total: 0, items: [] };
      c.items.push({ kind: dueKindLabel[r.kind] ?? r.kind, description: r.description, amount: Number(r.amount), why: readyReasonLabel(r) });
      c.total = (cents(c.total) + cents(r.amount)) / 100;
      clients.set(r.client_id, c);
    }
    const list = [...clients.values()];
    return { as_of: today, total: list.reduce((s, c) => (cents(s) + cents(c.total)) / 100, 0), clients: list };
  },
});

export const draftPaymentReminder = defineTool({
  name: "draft_payment_reminder",
  title: "Draft a payment reminder",
  description:
    "Save a payment reminder for one of your clients as a draft for the Owner: the statements it is about (all the client's open statements if none are named), the tone (gentle, firm or final) and the message text, with your reason. The Owner reads it and decides whether and how to send it; nothing is sent by you. Refused when the client owes nothing or has a payment proof waiting for the Owner. A new reminder for the same client replaces your earlier one.",
  input: z.object({
    client: clientRef.describe("The client (id or code)"),
    statements: z.array(z.string().trim().min(1).max(60)).max(20).optional().describe("Statement references the reminder is about"),
    tone: z.enum(REMINDER_TONES).describe("gentle (just past due), firm (over 30 days), final (over 60 days)"),
    message: z.string().trim().min(40, "Write the full message the Owner would send.").max(2000).describe("The reminder's text, ready to send"),
    reason: z.string().trim().min(10, "Explain your reminder in a sentence or two.").max(1000).describe("Why, for the Owner"),
  }),
  employees: CLERK,
  effect: "draft",
  async run({ db, today, noteClient }, { client, statements, tone, message, reason }) {
    const found = await findClient(db, client);
    if (!found) throw notYours(client);
    noteClient(found.id);
    const mine = (await openItems(db)).filter((i) => i.client_id === found.id);
    if (mine.length === 0) throw new ToolRefusal(`${found.name} owes nothing on an issued statement.`);
    if (mine.some((i) => i.proof_waiting)) throw new ToolRefusal(`${found.name} uploaded a payment proof still waiting for the Owner's verification; do not remind them.`);
    let chosen = byStatement(mine);
    if (statements?.length) {
      const wanted = new Set(statements);
      const unknown = [...wanted].filter((s) => !chosen.some((c) => c.statement === s));
      if (unknown.length) throw new ToolRefusal(`No open statement ${unknown.join(", ")} for ${found.name}.`);
      chosen = chosen.filter((c) => wanted.has(c.statement));
    }
    const amount = chosen.reduce((s, c) => s + cents(c.open), 0) / 100;
    const oldest = chosen.reduce((a, b) => (b.due_on < a.due_on ? b : a));
    const late = Math.max(daysPastDue(oldest.due_on, today), 0);
    const credit = Number(mine[0].client_credit);
    const summary = [
      { label: "Client", value: `${found.name} (${found.code})` },
      { label: "Statements", value: chosen.map((c) => `${c.statement}: ${money.format(c.open)} open, due ${c.due_on}`).join("\n") },
      { label: "Amount", value: money.format(amount) },
      { label: "Oldest due", value: late > 0 ? `${oldest.due_on} (${late} day${late === 1 ? "" : "s"} past due)` : `${oldest.due_on} (not yet due)` },
      ...(credit > 0 ? [{ label: "Client credit", value: `${money.format(credit)} unused` }] : []),
      { label: "Tone", value: tone[0].toUpperCase() + tone.slice(1) },
      { label: "Message", value: message },
    ];
    const draft = await saveDraft(db, {
      kind: REMINDER_KIND,
      // No client id: receivables are the Owner's alone, so only the Owner reads and decides it.
      clientId: null,
      subject: { table: "clients", id: found.id },
      summary,
      data: { client_id: found.id, statements: chosen.map((c) => c.statement), amount, tone, message },
      note: reason,
    });
    return { saved: true, draft_id: draft.id, status: draft.status, for_owner: summary };
  },
});

const DAY = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/** The first and last day of a month (YYYY-MM). */
function monthRange(month: string): { from: string; to: string } {
  const [y, m] = month.split("-").map(Number);
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return { from: `${month}-01`, to: `${month}-${String(last).padStart(2, "0")}` };
}

export const collectionsSummary = defineTool({
  name: "collections_summary",
  title: "Collections summary",
  description:
    "For a month (this month by default, Manila time) or a date range, and for your clients (or one): the total billed on statements dated in the period against the total collected from payments received in the period, and the money collected split by what it is for: tax dues the firm remits, retainers and professional fees, SSS, PhilHealth and Pag-IBIG (HDMF) remittances (each and as a subtotal), and others (listed by name, including payments not yet applied to an item). Each part says where the Owner deposits it. A report only: nothing is moved or recorded.",
  input: z.object({
    month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM.").optional().describe("The month, YYYY-MM (default: this month)"),
    from: z.string().regex(DAY, "Use YYYY-MM-DD.").optional().describe("Start date, YYYY-MM-DD (with to; instead of month)"),
    to: z.string().regex(DAY, "Use YYYY-MM-DD.").optional().describe("End date, YYYY-MM-DD"),
    client: clientRef.optional().describe("Only this client (id or code)"),
  }),
  employees: CLERK,
  effect: "read",
  async run({ db, today, noteClient }, { month, from, to, client }) {
    if ((from && !to) || (to && !from)) throw new ToolRefusal("Give both from and to, or a month.");
    if (month && from) throw new ToolRefusal("Give a month or from and to, not both.");
    const period = from && to ? { from, to } : monthRange(month ?? today.slice(0, 7));
    if (period.to < period.from) throw new ToolRefusal("The end date is before the start date.");
    let clientId: string | null = null;
    if (client) {
      const found = await findClient(db, client);
      if (!found) throw notYours(client);
      clientId = found.id;
      noteClient(found.id);
    }
    const { rows } = await db.query<SummaryRow & Record<string, unknown>>(
      `select source, kind, contribution, description, amount from public.ai_collections_rows($1::date, $2::date, $3::uuid)`,
      [period.from, period.to, clientId],
    );
    return {
      period,
      ...summarize(rows),
      note: "Collected means payments received in the period, split by the statement items each one paid, as the Owner applied it. Deposit hints are bank names only.",
    };
  },
});
