/**
 * Pure helpers for the Pre-Review Assistant (docs/AI-WORKFORCE.md §3; src/lib/filings/
 * pre-review-tools.ts): how a return's lines moved against an earlier period, and where a
 * client stands against the ₱3,000,000 VAT threshold. The tax rules themselves stay in the
 * form modules and the tie-outs (src/lib/workpapers/tieouts.ts); this only compares.
 */
import { VAT_THRESHOLD } from "@/lib/returns/forms/business/income";
import type { Centavos, WorksheetResult } from "@/lib/returns/types";

/** A line moving by at least this percent (and NOTABLE_AMOUNT) is worth a look. */
export const NOTABLE_PCT = 30;
/** …and by at least ₱1,000, so small lines do not flood the memo. */
export const NOTABLE_AMOUNT: Centavos = 1_000_00;

export interface LineChange {
  key: string;
  line: string;
  label: string;
  current: Centavos;
  previous: Centavos;
  change: Centavos;
  /** One decimal; null when the earlier amount is zero. */
  change_pct: number | null;
  notable: boolean;
}

/**
 * The return's lines that also appear in an earlier worksheet's figures, biggest move first.
 * Lines unchanged on both sides are left out; `limit` caps the list.
 */
export function compareLines(current: Pick<WorksheetResult, "sections">, previous: Record<string, Centavos>, limit = 20): LineChange[] {
  const out: LineChange[] = [];
  const seen = new Set<string>();
  for (const s of current.sections) {
    for (const l of s.lines) {
      if (l.amount == null || seen.has(l.key) || !(l.key in previous)) continue;
      seen.add(l.key);
      const prev = Number(previous[l.key]) || 0;
      const change = l.amount - prev;
      if (change === 0) continue;
      const pct = prev !== 0 ? Math.round((change / Math.abs(prev)) * 1000) / 10 : null;
      out.push({
        key: l.key,
        line: l.line,
        label: l.label,
        current: l.amount,
        previous: prev,
        change,
        change_pct: pct,
        notable: Math.abs(change) >= NOTABLE_AMOUNT && (pct == null || Math.abs(pct) >= NOTABLE_PCT),
      });
    }
  }
  return out.sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, limit);
}

export type ThresholdStatus = "vat_registered" | "below" | "near" | "over";

/** Within this share of the threshold counts as near (80%). */
export const NEAR_SHARE = 0.8;

/**
 * Where a client stands against the ₱3,000,000 VAT threshold, on its gross sales of the last
 * twelve months. A VAT-registered client is past the question.
 */
export function vatThresholdStatus(salesLast12: Centavos, vatRegistered: boolean): { status: ThresholdStatus; threshold: Centavos; share_pct: number } {
  const share = Math.round((salesLast12 / VAT_THRESHOLD) * 1000) / 10;
  if (vatRegistered) return { status: "vat_registered", threshold: VAT_THRESHOLD, share_pct: share };
  const status: ThresholdStatus = salesLast12 > VAT_THRESHOLD ? "over" : salesLast12 >= VAT_THRESHOLD * NEAR_SHARE ? "near" : "below";
  return { status, threshold: VAT_THRESHOLD, share_pct: share };
}

/** First day of the quarter holding `month` (YYYY-MM-01). */
export function quarterStart(month: string): string {
  const m = Number(month.slice(5, 7));
  return `${month.slice(0, 4)}-${String(m - ((m - 1) % 3)).padStart(2, "0")}-01`;
}

/** The first day of the month eleven months before `month`: the start of a twelve-month window ending in it. */
export function twelveMonthsFrom(month: string): string {
  let y = Number(month.slice(0, 4));
  let m = Number(month.slice(5, 7)) - 11;
  if (m < 1) {
    m += 12;
    y -= 1;
  }
  return `${y}-${String(m).padStart(2, "0")}-01`;
}

/** Centavos as pesos (a number with two decimals), for the AI employee to read. */
export const pesos = (c: Centavos | null | undefined) => (c == null ? null : Math.round(c) / 100);
