/**
 * Totals check: the register's gross pay, deductions and net pay (added up from
 * the item amounts, in centavos) against the client's own totals, to the
 * centavo. A difference means a figure was misread, a column is not mapped, or
 * the client's sheet does not add up; staff decide which.
 */
import { toCentavos } from "@/lib/returns/money";
import type { Centavos } from "@/lib/returns/types";
import type { PayrollItem } from "../items";

export interface PayTotals {
  gross: Centavos;
  deductions: Centavos;
  net: Centavos;
}

/** Gross (earnings), deductions and net of item amounts as typed; blanks and non-amounts count as zero. */
export function totalsOf(amounts: Record<string, string | null | undefined>, items: PayrollItem[]): PayTotals {
  const kind = new Map(items.map((i) => [i.id, i.kind]));
  let gross = 0;
  let deductions = 0;
  for (const [id, raw] of Object.entries(amounts)) {
    const c = toCentavos(raw ?? null) ?? 0;
    if (kind.get(id) === "earning") gross += c;
    else if (kind.get(id) === "deduction") deductions += c;
  }
  return { gross, deductions, net: gross - deductions };
}

export function addTotals(list: PayTotals[]): PayTotals {
  return list.reduce((a, t) => ({ gross: a.gross + t.gross, deductions: a.deductions + t.deductions, net: a.net + t.net }), { gross: 0, deductions: 0, net: 0 });
}

export interface TotalCheck {
  key: keyof PayTotals;
  label: string;
  ours: Centavos;
  /** The client's figure; null when their file does not show it. */
  theirs: Centavos | null;
  /** ours − theirs; null when there is nothing to compare. */
  difference: Centavos | null;
}

const LABELS: Record<keyof PayTotals, string> = { gross: "Gross pay", deductions: "Total deductions", net: "Net pay" };

/** Compares the register's totals with the client's (strings as read, e.g. "152,300.50"); exact to the centavo. */
export function checkTotals(ours: PayTotals, theirs: { gross?: string | null; deductions?: string | null; net?: string | null } | null): TotalCheck[] {
  return (["gross", "deductions", "net"] as const).map((key) => {
    const t = theirs?.[key] == null ? null : toCentavos(theirs[key]!);
    return { key, label: LABELS[key], ours: ours[key], theirs: t, difference: t == null ? null : ours[key] - t };
  });
}

/** True when every figure the client shows agrees exactly (and at least one is shown). */
export const totalsAgree = (checks: TotalCheck[]) => checks.some((c) => c.theirs != null) && checks.every((c) => c.difference == null || c.difference === 0);
