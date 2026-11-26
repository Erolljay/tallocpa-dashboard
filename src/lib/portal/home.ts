/**
 * Portal Home (rework decision 18): the figures the client sees, built from what
 * public.portal_books_summary returns (balances by account type and control, the
 * monthly movement by account type, the locked months) and from the documents the
 * client sent this month. Pure functions, amounts in integer centavos.
 */
import { toCentavos } from "@/lib/returns/money";
import { STREAMS, streamOf, type DocType, type Stream } from "@/lib/documents/labels";
import type { Centavos } from "@/lib/ledger/types";

export interface BooksSummaryRaw {
  as_of: string;
  has_books: boolean;
  balances: { type: string; control: string | null; debit: number | string; credit: number | string }[];
  months: { month: string; type: string; debit: number | string; credit: number | string }[];
  locked: string[];
}

export interface Position {
  cash: Centavos;
  receivables: Centavos;
  payables: Centavos;
  assets: Centavos;
  liabilities: Centavos;
  /** Assets less liabilities: capital, retained earnings and this year's income so far. */
  equity: Centavos;
}

export interface MonthPoint {
  /** First day of the month, "2026-11-01". */
  month: string;
  revenue: Centavos;
  expenses: Centavos;
  net: Centavos;
  /** Locked by the reviewer (or by a filed return): the month's figures are final. */
  locked: boolean;
}

const c = (v: number | string) => toCentavos(v) ?? 0;
const INCOME = new Set(["revenue", "other_income"]);
const EXPENSE = new Set(["cost", "expense", "income_tax"]);

/** The first day of the month `back` months before `month` ("2026-11-01", 5 → "2026-06-01"). */
export function monthsBack(month: string, back: number): string {
  const d = new Date(`${month.slice(0, 7)}-01T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() - back);
  return d.toISOString().slice(0, 10);
}

/** Cash, receivables, payables and equity at the summary's date. */
export function financialPosition(raw: Pick<BooksSummaryRaw, "balances">): Position {
  const p: Position = { cash: 0, receivables: 0, payables: 0, assets: 0, liabilities: 0, equity: 0 };
  for (const b of raw.balances) {
    const dr = c(b.debit) - c(b.credit);
    if (b.type === "asset") p.assets += dr;
    else if (b.type === "liability") p.liabilities -= dr;
    if (b.control === "cash" || b.control === "bank") p.cash += dr;
    else if (b.control === "ar") p.receivables += dr;
    else if (b.control === "ap") p.payables -= dr;
  }
  p.equity = p.assets - p.liabilities;
  return p;
}

/**
 * Revenue and expenses for each of the `count` months ending with `lastMonth`, oldest
 * first, with a zero month where nothing was posted. Revenue includes other income;
 * expenses include cost of sales and income tax, so `net` is the net income.
 */
export function monthlySeries(raw: Pick<BooksSummaryRaw, "months" | "locked">, lastMonth: string, count = 6): MonthPoint[] {
  const locked = new Set(raw.locked.map((m) => m.slice(0, 10)));
  const points = Array.from({ length: count }, (_, i) => {
    const month = monthsBack(lastMonth, count - 1 - i);
    return { month, revenue: 0, expenses: 0, net: 0, locked: locked.has(month) };
  });
  const at = new Map(points.map((p) => [p.month, p]));
  for (const r of raw.months) {
    const p = at.get(r.month.slice(0, 10));
    if (!p) continue;
    if (INCOME.has(r.type)) p.revenue += c(r.credit) - c(r.debit);
    else if (EXPENSE.has(r.type)) p.expenses += c(r.debit) - c(r.credit);
  }
  for (const p of points) p.net = p.revenue - p.expenses;
  return points;
}

/** The largest bar in the series (at least 1), so bars scale against it. */
export const seriesMax = (points: MonthPoint[]) => Math.max(1, ...points.flatMap((p) => [Math.abs(p.revenue), Math.abs(p.expenses)]));

export interface StreamProgress {
  stream: Stream;
  label: string;
  received: number;
  /** Approved by staff into the Books (document status posted). */
  approved: number;
  returned: number;
}

/**
 * This month's Inbox, by stream: how many documents came in and how many staff have
 * approved. Payroll registers sent on the Tallo template count under Payroll.
 */
export function streamProgress(
  docs: { doc_type: string; status: string }[],
  payroll: { status: string }[] = [],
): StreamProgress[] {
  const out = (Object.keys(STREAMS) as Stream[]).map((s) => ({ stream: s, label: STREAMS[s].label, received: 0, approved: 0, returned: 0 }));
  const add = (s: Stream | null, approved: boolean, returned: boolean) => {
    const row = out.find((r) => r.stream === s);
    if (!row) return;
    row.received += 1;
    if (approved) row.approved += 1;
    if (returned) row.returned += 1;
  };
  for (const d of docs) {
    if (d.status === "uploading") continue;
    add(streamOf(d.doc_type as DocType), d.status === "posted", d.status === "returned");
  }
  for (const p of payroll) add("payroll", p.status === "posted", p.status === "returned");
  return out;
}

export interface Todo {
  key: string;
  title: string;
  detail?: string;
  href: string;
  tone: "blocked" | "waiting";
}

/** What waits on the client, most urgent first: returned documents, approvals, requests, dues, missing 2307s. */
export function todoList(input: {
  returnedDocuments: number;
  returnsToApprove: { id: string; form: string; periodLabel: string; dueDate: string }[];
  requests: { id: string; subject: string }[];
  /** Open balance across the client's statements, in centavos. */
  dues: Centavos;
  duesLabel?: string;
  missing2307: { party: string; amount: Centavos }[];
  /** Missing 2307s of an ended taxable year waiting for the client's keep-or-stop decision (decision 12). */
  missing2307Decisions?: number;
  /** Registration steps waiting on the client (their tasks on the routing slip). */
  registrationSteps?: { id: string; label: string }[];
  /** SSS, PhilHealth and Pag-IBIG approved for the client to pay with the PRN (clients who pay the agencies). */
  remittancesToPay?: { id: string; label: string; detail: string }[];
}): Todo[] {
  const t: Todo[] = [];
  if (input.returnedDocuments > 0) {
    const n = input.returnedDocuments;
    t.push({ key: "returned", title: `${n} document${n === 1 ? " was" : "s were"} returned to you`, detail: "See why and send it again.", href: "/portal/documents", tone: "blocked" });
  }
  for (const r of input.returnsToApprove) {
    t.push({ key: `return-${r.id}`, title: `Approve your ${r.form} for ${r.periodLabel}`, detail: `Due ${r.dueDate}`, href: "/portal/returns", tone: "waiting" });
  }
  for (const r of input.requests) {
    t.push({ key: `request-${r.id}`, title: r.subject, detail: "We asked you for this", href: `/portal/requests/${r.id}`, tone: "waiting" });
  }
  for (const s of input.registrationSteps ?? []) {
    t.push({ key: `step-${s.id}`, title: s.label, detail: "Your step on the registration", href: "/portal/registration", tone: "waiting" });
  }
  for (const r of input.remittancesToPay ?? []) {
    t.push({ key: `remit-${r.id}`, title: `Pay ${r.label}`, detail: r.detail, href: "/portal/remittances", tone: "waiting" });
  }
  if (input.dues > 0) {
    t.push({ key: "dues", title: "Pay your statement", detail: input.duesLabel, href: "/portal/billing", tone: "waiting" });
  }
  if (input.missing2307Decisions) {
    const n = input.missing2307Decisions;
    t.push({ key: "2307-decide", title: `Decide on ${n} missing 2307${n === 1 ? "" : "s"}`, detail: "The year has ended: keep claiming the tax withheld, or stop.", href: "/portal/missing-2307", tone: "waiting" });
  }
  for (const m of input.missing2307) {
    t.push({ key: `2307-${m.party}`, title: `Ask ${m.party} for their 2307`, detail: "They withheld tax from your sales and we don't have the certificate yet.", href: "/portal/upload?stream=sales", tone: "waiting" });
  }
  return t;
}
