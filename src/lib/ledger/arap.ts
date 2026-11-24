/**
 * Receivables and payables by customer / supplier (spec §3.6): open items,
 * aging, and the monthly AR/AP update — what was collected and paid against
 * each open invoice — checked before it is sent (the database checks again:
 * submit_arap_update).
 */
import { toCentavos, toDecimalString } from "@/lib/returns/money";
import type { Centavos } from "./types";

export interface OpenItem {
  id: string;
  kind: "receivable" | "payable";
  partyName: string;
  partyTin: string | null;
  docNumber: string | null;
  docDate: string | null;
  dueDate: string | null;
  amount: Centavos;
  balance: Centavos;
}

export interface CashAccount {
  id: string;
  code: string;
  name: string;
}

export const accountLabel = (a: CashAccount) => `${a.code} · ${a.name}`;

export const AGING = ["0–30 days", "31–60 days", "61–90 days", "Over 90 days"] as const;

/** Days from the invoice (or due) date to `asOf`, bucketed. Undated items count as current. */
export function agingBucket(item: Pick<OpenItem, "docDate" | "dueDate">, asOf: string): number {
  const from = item.dueDate ?? item.docDate;
  if (!from) return 0;
  const days = Math.floor((Date.parse(`${asOf}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
  return days <= 30 ? 0 : days <= 60 ? 1 : days <= 90 ? 2 : 3;
}

export interface AgingRow {
  partyName: string;
  buckets: [Centavos, Centavos, Centavos, Centavos];
  total: Centavos;
}

/** Aging by party, largest balance first. Credits (negative items) reduce the party's current bucket. */
export function aging(items: OpenItem[], kind: OpenItem["kind"], asOf: string): AgingRow[] {
  const rows = new Map<string, AgingRow>();
  for (const i of items) {
    if (i.kind !== kind || i.balance === 0) continue;
    const r = rows.get(i.partyName) ?? { partyName: i.partyName, buckets: [0, 0, 0, 0], total: 0 };
    r.buckets[i.balance < 0 ? 0 : agingBucket(i, asOf)] += i.balance;
    r.total += i.balance;
    rows.set(i.partyName, r);
  }
  return [...rows.values()].sort((a, b) => b.total - a.total);
}

/** One filled-in row of the AR/AP update workbook. */
export interface UpdateRow {
  line: number;
  sheet: string;
  itemId: string;
  amount: string;
  date: string;
  account: string;
  reference: string;
}

export interface CheckedUpdate {
  rows: { openItemId: string; partyName: string; docNumber: string | null; kind: OpenItem["kind"]; amount: Centavos; date: string; accountId: string; reference: string | null }[];
  collected: Centavos;
  paid: Centavos;
  errors: string[];
}

const DATE_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/** `month` is YYYY-MM-01; every date must fall in it. */
export function checkUpdate(input: UpdateRow[], items: OpenItem[], accounts: CashAccount[], month: string): CheckedUpdate {
  const byId = new Map(items.map((i) => [i.id, i]));
  const byLabel = new Map(accounts.map((a) => [accountLabel(a).toLowerCase(), a]));
  const byCode = new Map(accounts.map((a) => [a.code.toLowerCase(), a]));
  const used = new Map<string, Centavos>();
  const out: CheckedUpdate = { rows: [], collected: 0, paid: 0, errors: [] };
  const ym = month.slice(0, 7);
  for (const r of input) {
    if (!r.amount.trim()) continue;
    const where = `${r.sheet} row ${r.line}`;
    const item = byId.get(r.itemId);
    if (!item) { out.errors.push(`${where}: this invoice is no longer open (download a new workbook).`); continue; }
    const label = `${where} (${item.partyName}${item.docNumber ? ` ${item.docNumber}` : ""})`;
    const amount = toCentavos(r.amount);
    if (amount == null || amount <= 0) { out.errors.push(`${label}: enter the amount as a number above zero.`); continue; }
    if (!DATE_RE.test(r.date.trim())) { out.errors.push(`${label}: enter the date as YYYY-MM-DD.`); continue; }
    if (r.date.trim().slice(0, 7) !== ym) { out.errors.push(`${label}: the date must fall in ${ym}.`); continue; }
    const acct = byLabel.get(r.account.trim().toLowerCase()) ?? byCode.get(r.account.trim().split(" ")[0]?.toLowerCase() ?? "");
    if (!acct) { out.errors.push(`${label}: choose the cash or bank account from the list.`); continue; }
    const total = (used.get(item.id) ?? 0) + amount;
    if (total > item.balance) { out.errors.push(`${label}: ${toDecimalString(total)} is more than the ${toDecimalString(item.balance)} still open.`); continue; }
    used.set(item.id, total);
    out.rows.push({ openItemId: item.id, partyName: item.partyName, docNumber: item.docNumber, kind: item.kind, amount, date: r.date.trim(), accountId: acct.id, reference: r.reference.trim() || null });
    if (item.kind === "receivable") out.collected += amount;
    else out.paid += amount;
  }
  if (!out.rows.length && !out.errors.length) out.errors.push("No collections or payments were filled in.");
  return out;
}

/** submit_arap_update rows. */
export const updatePayload = (c: CheckedUpdate) =>
  c.rows.map((r) => ({ open_item_id: r.openItemId, amount: toDecimalString(r.amount), date: r.date, account_id: r.accountId, reference: r.reference }));

/** arap_workbook() → items and cash/bank accounts. */
export function fromWorkbookData(w: { items?: Record<string, unknown>[]; accounts?: Record<string, unknown>[] } | null) {
  const items: OpenItem[] = (w?.items ?? []).map((i) => ({
    id: i.id as string,
    kind: i.kind as OpenItem["kind"],
    partyName: i.party_name as string,
    partyTin: (i.party_tin as string | null) ?? null,
    docNumber: (i.doc_number as string | null) ?? null,
    docDate: (i.doc_date as string | null) ?? null,
    dueDate: (i.due_date as string | null) ?? null,
    amount: toCentavos(i.amount as string | number) ?? 0,
    balance: toCentavos(i.balance as string | number) ?? 0,
  }));
  const accounts: CashAccount[] = (w?.accounts ?? []).map((a) => ({ id: a.id as string, code: a.code as string, name: a.name as string }));
  return { items, accounts };
}
