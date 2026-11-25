/**
 * Straight-line depreciation for the fixed asset register (A1; workpaper E; Owner's
 * decisions 13–17), in centavos. Mirrors private.depreciation_for() in migration
 * 20261125000009_fixed_assets.sql, which posts the entry:
 *   monthly = (cost − residual) ÷ life, rounded to the centavo
 *   from the month after purchase; the last month takes the rounding, so the
 *   residual (₱1) stays on the books.
 * The tax column uses the asset's tax life the same way. Pure, so it can be tested.
 */
import type { Centavos } from "@/lib/returns/types";

export const CAPITALIZATION_THRESHOLD: Centavos = 1_000_000; // ₱10,000 (decision 12)
export const RESIDUAL: Centavos = 100; // ₱1 (decision 14)

export interface Asset {
  id: string;
  number: number;
  source: "register" | "opening";
  documentId: string | null;
  description: string;
  assetAccount: string;
  acquiredOn: string;
  cost: Centavos;
  inputVat: Centavos;
  residual: Centavos;
  lifeMonths: number | null;
  taxLifeMonths: number | null;
  status: "setup" | "active";
}

/** Months from the purchase month to `month` (YYYY-MM-..): 1 is the month after purchase. */
export function monthIndex(acquiredOn: string, month: string): number {
  return (Number(month.slice(0, 4)) - Number(acquiredOn.slice(0, 4))) * 12 + Number(month.slice(5, 7)) - Number(acquiredOn.slice(5, 7));
}

export function depreciationFor(cost: Centavos, residual: Centavos, life: number | null, acquiredOn: string, month: string): Centavos {
  if (!life) return 0;
  const n = monthIndex(acquiredOn, month);
  if (n < 1 || n > life) return 0;
  const base = cost - residual;
  const monthly = Math.round(base / life);
  return n === life ? base - monthly * (life - 1) : monthly;
}

/** The asset's depreciation for a month, books and tax. */
export const bookFor = (a: Asset, month: string) => (a.status === "active" ? depreciationFor(a.cost, a.residual, a.lifeMonths, a.acquiredOn, month) : 0);
export const taxFor = (a: Asset, month: string) => (a.status === "active" ? depreciationFor(a.cost, a.residual, a.taxLifeMonths, a.acquiredOn, month) : 0);

/** Accumulated depreciation through `month` (books or tax): every month from the start through it. */
export function accumulated(a: Asset, month: string, basis: "book" | "tax" = "book"): Centavos {
  const life = basis === "book" ? a.lifeMonths : a.taxLifeMonths;
  if (a.status !== "active" || !life) return 0;
  const through = Math.min(monthIndex(a.acquiredOn, month), life);
  if (through < 1) return 0;
  const base = a.cost - a.residual;
  const monthly = Math.round(base / life);
  return through === life ? base : monthly * through;
}

/** The first month of depreciation: the month after purchase (decision 15), as YYYY-MM-01. */
export function startMonth(acquiredOn: string): string {
  const y = Number(acquiredOn.slice(0, 4));
  const m = Number(acquiredOn.slice(5, 7));
  return m === 12 ? `${y + 1}-01-01` : `${y}-${String(m + 1).padStart(2, "0")}-01`;
}

/** The register's totals for a month: additions (bought in it), depreciation, and the schedule's tax column. */
export function monthTotals(assets: Asset[], month: string) {
  const key = month.slice(0, 7);
  return {
    additions: assets.filter((a) => a.source === "register" && a.acquiredOn.slice(0, 7) === key).reduce((s, a) => s + a.cost, 0),
    book: assets.reduce((s, a) => s + bookFor(a, month), 0),
    tax: assets.reduce((s, a) => s + taxFor(a, month), 0),
    waiting: assets.filter((a) => a.status === "setup"),
  };
}

/** Depreciation over a date range (each month whose first day falls in it), books and tax. */
export function rangeTotals(assets: Asset[], from: string, to: string): { book: Centavos; tax: Centavos } {
  let book = 0;
  let tax = 0;
  if (to < from) return { book, tax };
  let y = Number(from.slice(0, 4));
  let m = Number(from.slice(5, 7));
  if (Number(from.slice(8, 10)) > 1) m += 1;
  for (;;) {
    if (m > 12) {
      m = 1;
      y += 1;
    }
    const month = `${y}-${String(m).padStart(2, "0")}-01`;
    if (month > to) break;
    for (const a of assets) {
      book += bookFor(a, month);
      tax += taxFor(a, month);
    }
    m += 1;
  }
  return { book, tax };
}
