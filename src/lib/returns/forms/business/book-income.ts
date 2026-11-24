/**
 * Income and deductions from the client's books (Phase 1B slice 5): each income
 * and expense account's movement grouped by its BIR income tax line
 * (src/lib/ledger/bir-lines.ts). Income is shown positive, costs and deductions
 * positive. Accounts without a BIR line are listed so staff can map them; they
 * are left out of the figures.
 */
import { BIR_LINES, isBirLine, type BirLineKey } from "@/lib/ledger/bir-lines";
import type { Centavos, LedgerMovement } from "../../types";

export interface BookIncome {
  /** Net sales: the sales line less returns, allowances and discounts. */
  sales: Centavos;
  costOfSales: Centavos;
  /** Other taxable income (not subject to final tax). */
  otherIncome: Centavos;
  /** Ordinary allowable itemized deductions. */
  deductions: Centavos;
  /** Income subject to final tax and exempt income: not part of taxable income. */
  excluded: Centavos;
  /** Non-deductible expenses and the provision for income tax. */
  nondeductible: Centavos;
  /** Every BIR line with movement, in the order of BIR_LINES (sign as above). */
  byLine: Partial<Record<BirLineKey, Centavos>>;
  /** Income and expense accounts with no BIR line, e.g. "6999 Sundry". */
  unmapped: string[];
}

const INCOME_GROUPS = new Set(["gross_income", "other_income", "excluded"]);

export function bookIncome(rows: LedgerMovement[]): BookIncome {
  const out: BookIncome = { sales: 0, costOfSales: 0, otherIncome: 0, deductions: 0, excluded: 0, nondeductible: 0, byLine: {}, unmapped: [] };
  for (const r of rows) {
    if (r.net === 0) continue;
    // The provision for income tax is never deductible, whatever line it carries.
    const key: BirLineKey | null = r.type === "income_tax" ? "nondeductible" : r.birLine && isBirLine(r.birLine) ? r.birLine : null;
    if (!key) {
      out.unmapped.push(`${r.code} ${r.name}`);
      continue;
    }
    const group = BIR_LINES[key].group;
    const amount = INCOME_GROUPS.has(group) ? -r.net : r.net;
    out.byLine[key] = (out.byLine[key] ?? 0) + amount;
    if (group === "gross_income") out.sales += amount;
    else if (group === "cost") out.costOfSales += amount;
    else if (group === "other_income") out.otherIncome += amount;
    else if (group === "deduction") out.deductions += amount;
    else if (group === "excluded") out.excluded += amount;
    else out.nondeductible += amount;
  }
  return out;
}

/** BIR lines with movement in either range, in form order. */
export function linesWithMovement(...xs: BookIncome[]): BirLineKey[] {
  return (Object.keys(BIR_LINES) as BirLineKey[]).filter((k) => xs.some((x) => (x.byLine[k] ?? 0) !== 0));
}
