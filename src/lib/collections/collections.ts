/**
 * Collections & Statement of Account (spec §3.9) as the screens see it. The
 * database (supabase/migrations/…_collections.sql) holds the rules for billing
 * and matching payments; this file only labels, groups and formats.
 */

export type DueKind = "retainer" | "tax" | "contribution" | "other";
export type DepositMethod = "transfer" | "check" | "ewallet" | "cash";

export const dueKindLabel: Record<DueKind, string> = {
  retainer: "Retainer",
  tax: "Tax due",
  contribution: "Contribution",
  other: "Other charge",
};

export const methodLabel: Record<DepositMethod, string> = {
  transfer: "Fund transfer",
  check: "Check",
  ewallet: "E-wallet",
  cash: "Cash (deposited by staff)",
};

/** Kinds of contribution the firm remits for clients, offered when adding a charge. */
export const CONTRIBUTIONS = ["SSS", "PhilHealth", "Pag-IBIG"] as const;

export const AGING_BUCKETS = ["current", "1-30", "31-60", "61-90", "90+"] as const;
export type AgingBucket = (typeof AGING_BUCKETS)[number];

export const agingLabel: Record<AgingBucket, string> = {
  current: "Not yet due",
  "1-30": "1–30 days",
  "31-60": "31–60 days",
  "61-90": "61–90 days",
  "90+": "Over 90 days",
};

const DAY = 86_400_000;
const utc = (d: string) => Date.parse(`${d}T00:00:00Z`);

/** Whole days from `dueOn` to `today` (both YYYY-MM-DD); negative when not yet due. */
export function daysPastDue(dueOn: string, today: string): number {
  return Math.round((utc(today) - utc(dueOn)) / DAY);
}

/** The receivables-aging bucket (30/60/90+) of an open amount due on `dueOn`. */
export function agingBucket(dueOn: string, today: string): AgingBucket {
  const days = daysPastDue(dueOn, today);
  if (days <= 0) return "current";
  if (days <= 30) return "1-30";
  if (days <= 60) return "31-60";
  if (days <= 90) return "61-90";
  return "90+";
}

/** Sums open amounts into aging buckets. Amounts are in centavos to avoid float drift. */
export function ageOpenItems(items: { due_on: string; open_amount: number | string }[], today: string) {
  const cents: Record<AgingBucket, number> = { current: 0, "1-30": 0, "31-60": 0, "61-90": 0, "90+": 0 };
  for (const i of items) cents[agingBucket(i.due_on, today)] += toCents(i.open_amount);
  const total = Object.values(cents).reduce((a, b) => a + b, 0);
  return { buckets: mapValues(cents, fromCents), total: fromCents(total), overdue: fromCents(total - cents.current) };
}

/** Why an item is in Ready to bill (public.ready_to_bill, decision 16c). */
export type ReadyReason = "retainer" | "client_approved" | "due_soon" | "charge";

/** One item a billing run would put on the client's statement now. */
export interface ReadyItem {
  client_id: string;
  client_code: string;
  client_name: string;
  kind: DueKind;
  description: string;
  amount: number | string;
  reason: ReadyReason;
  /** Days from the billing date to the return's BIR deadline (tax items only). */
  days_to_due: number | null;
  filing_instance_id: string | null;
  due_id: string | null;
}

/** "Client approved", "Due in 2 days", "Due today", "Past due" — why a return is ready to bill. */
export function readyReasonLabel(item: Pick<ReadyItem, "reason" | "days_to_due">): string {
  switch (item.reason) {
    case "client_approved":
      return "Client approved";
    case "due_soon": {
      const d = item.days_to_due ?? 0;
      if (d < 0) return "Past due";
      if (d === 0) return "Due today";
      return `Due in ${d} day${d === 1 ? "" : "s"}`;
    }
    case "retainer":
      return "This month's retainer";
    case "charge":
      return "Not yet billed";
  }
}

export interface ReadyClient {
  id: string;
  code: string;
  name: string;
  items: ReadyItem[];
  total: number;
}

/** Groups Ready to bill rows by client, keeping the database's order; totals in centavos. */
export function groupReady(rows: ReadyItem[]): ReadyClient[] {
  const out = new Map<string, { id: string; code: string; name: string; items: ReadyItem[]; cents: number }>();
  for (const r of rows) {
    const c = out.get(r.client_id) ?? { id: r.client_id, code: r.client_code, name: r.client_name, items: [], cents: 0 };
    c.items.push(r);
    c.cents += toCents(r.amount);
    out.set(r.client_id, c);
  }
  return [...out.values()].map(({ cents, ...c }) => ({ ...c, total: fromCents(cents) }));
}

export function toCents(v: number | string): number {
  return Math.round(Number(v) * 100);
}

function fromCents(c: number): number {
  return c / 100;
}

function mapValues<K extends string, A, B>(o: Record<K, A>, f: (a: A) => B): Record<K, B> {
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v as A)])) as Record<K, B>;
}

export type AllocationRow = {
  deposit_id: string;
  due_id: string;
  amount: string | number;
  /** Applied later from the payment's leftover credit, not ticked by the Owner at verification. */
  from_credit?: boolean | null;
  client_dues: { description: string } | null;
};
export type PaidItem = { dueId: string; description: string; amount: number; fromCredit: boolean };

/**
 * The items each deposit paid, in the order they were applied: first the items the
 * Owner ticked (oldest first), then any its leftover credit paid later. One line per
 * item even when it was applied in several parts.
 */
export function groupPaidItems(rows: AllocationRow[]): Map<string, PaidItem[]> {
  const out = new Map<string, PaidItem[]>();
  for (const a of rows) {
    const list = out.get(a.deposit_id) ?? [];
    const fromCredit = Boolean(a.from_credit);
    const same = list.find((x) => x.dueId === a.due_id && x.fromCredit === fromCredit);
    if (same) same.amount = Math.round((same.amount + Number(a.amount)) * 100) / 100;
    else list.push({ dueId: a.due_id, description: a.client_dues?.description ?? "Item", amount: Number(a.amount), fromCredit });
    out.set(a.deposit_id, list);
  }
  return out;
}

/** A tax or contribution item and the client's money held for it (public.remittance_items). */
export interface RemittanceItem {
  due_id: string;
  kind: "tax" | "contribution";
  description: string;
  due_on: string;
  received: number;
  remitted: boolean;
  remitted_on: string | null;
  remit_reference: string | null;
  held: number;
}

/**
 * Cash for remittance (decision 16): tax and contribution money received from
 * clients and not yet remitted, totalled per client and firm-wide. Sums in
 * centavos to avoid float drift.
 */
export function totalHeld(rows: { client_id: string; held: number | string }[]): { byClient: Map<string, number>; total: number } {
  const cents = new Map<string, number>();
  for (const r of rows) cents.set(r.client_id, (cents.get(r.client_id) ?? 0) + toCents(r.held));
  const byClient = new Map([...cents].map(([k, v]) => [k, fromCents(v)] as const));
  return { byClient, total: fromCents([...cents.values()].reduce((a, b) => a + b, 0)) };
}

/**
 * The items ticked by default when verifying a payment of `amount`: open items
 * oldest first until the amount is used up (the last one may be paid in part).
 */
export function suggestTicks(items: { id: string; open: number }[], amount: number): string[] {
  let left = toCents(amount);
  const out: string[] = [];
  for (const i of items) {
    if (left <= 0) break;
    out.push(i.id);
    left -= toCents(i.open);
  }
  return out;
}

/** How a payment of `amount` lands on the ticked items: applied, kept as the client's credit, and still open on them. */
export function tickedSplit(ticked: { open: number }[], amount: number): { applied: number; credit: number; stillOpen: number } {
  const open = ticked.reduce((s, i) => s + toCents(i.open), 0);
  const amt = Math.max(toCents(amount), 0);
  const applied = Math.min(open, amt);
  return { applied: fromCents(applied), credit: fromCents(amt - applied), stillOpen: fromCents(open - applied) };
}
