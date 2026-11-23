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

/** The next billing date on or after `today` for a client billed on `days` of the month (1–28). */
export function nextBillingDate(days: readonly number[], today: string): string | null {
  const valid = [...new Set(days)].filter((d) => Number.isInteger(d) && d >= 1 && d <= 28).sort((a, b) => a - b);
  if (valid.length === 0) return null;
  const [y, m, d] = today.split("-").map(Number);
  const sameMonth = valid.find((day) => day >= d);
  if (sameMonth !== undefined) return iso(y, m, sameMonth);
  return m === 12 ? iso(y + 1, 1, valid[0]) : iso(y, m + 1, valid[0]);
}

/** "10th and 20th", "10th" — how a client's billing days read in a sentence. */
export function describeBillingDays(days: readonly number[]): string {
  const sorted = [...new Set(days)].sort((a, b) => a - b).map(ordinal);
  if (sorted.length <= 1) return sorted[0] ?? "—";
  return `${sorted.slice(0, -1).join(", ")} and ${sorted.at(-1)}`;
}

export function ordinal(n: number): string {
  const tens = n % 100;
  if (tens >= 11 && tens <= 13) return `${n}th`;
  return `${n}${{ 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th"}`;
}

/** Parses "10, 20" or "10 20" into billing days, or an error sentence. */
export function parseBillingDays(input: string): { days: number[] } | { error: string } {
  const parts = input.split(/[\s,]+/).filter(Boolean);
  if (parts.length === 0) return { error: "Enter at least one billing day." };
  const days = parts.map(Number);
  if (days.some((d) => !Number.isInteger(d) || d < 1 || d > 28)) return { error: "Billing days are whole numbers from 1 to 28." };
  const unique = [...new Set(days)].sort((a, b) => a - b);
  if (unique.length > 4) return { error: "Use at most four billing days." };
  return { days: unique };
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

function iso(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
