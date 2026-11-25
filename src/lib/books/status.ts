/**
 * Invoice status for the Books lists (docs/REWORK.md, decision 5): Paid in full,
 * Overdue N days, Due today, Due in N days, or Void. Dates are YYYY-MM-DD; pass
 * today's date in the Philippines (manilaToday() from src/lib/filings/run.ts).
 */

export type InvoiceStatusKind = "paid" | "overdue" | "due_today" | "due" | "void";

export interface InvoiceStatus {
  kind: InvoiceStatusKind;
  /** Days overdue (overdue) or until due (due); 0 otherwise. */
  days: number;
  label: string;
}

export interface InvoiceForStatus {
  /** Balance due in pesos, as the database returns it ("1120.50") or a number. */
  balanceDue: string | number;
  issueDate: string;
  /** Null: due on the issue date. */
  dueDate: string | null;
  voided?: boolean;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Whole days from a to b (b − a), both YYYY-MM-DD. */
export function daysBetween(a: string, b: string): number {
  if (!DATE.test(a) || !DATE.test(b)) throw new Error(`Dates must be YYYY-MM-DD: ${a}, ${b}`);
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

const plural = (n: number) => `${n} day${n === 1 ? "" : "s"}`;

export function invoiceStatus(inv: InvoiceForStatus, today: string): InvoiceStatus {
  if (inv.voided) return { kind: "void", days: 0, label: "Void" };
  if (Number(inv.balanceDue) <= 0) return { kind: "paid", days: 0, label: "Paid in full" };
  const due = inv.dueDate ?? inv.issueDate;
  const days = daysBetween(today, due);
  if (days < 0) return { kind: "overdue", days: -days, label: `Overdue ${plural(-days)}` };
  if (days === 0) return { kind: "due_today", days: 0, label: "Due today" };
  return { kind: "due", days, label: `Due in ${plural(days)}` };
}

/** Totals row of a list of invoices: total, paid and still due, in centavos. */
export function invoiceTotals(rows: { total: string | number; balanceDue: string | number; voided?: boolean }[]) {
  const c = (v: string | number) => Math.round(Number(v) * 100);
  let total = 0;
  let due = 0;
  for (const r of rows) {
    if (r.voided) continue;
    total += c(r.total);
    due += c(r.balanceDue);
  }
  return { total, paid: total - due, due };
}
