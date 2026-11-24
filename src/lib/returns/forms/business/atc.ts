/**
 * ATCs on a BIR 2307 the client RECEIVED (tax withheld from the client by its
 * customers), and which return each one is credited on.
 *
 * Creditable EWT (WI/WC) rates come from the shared table in returns/atc.ts
 * (taxify helpers/ewt-helpers.js ATC_MASTER). The VAT and percentage-tax
 * withholding ATCs, which that table deliberately leaves out, come from taxify
 * shared/tax-codes.js (GOVT group).
 */
import { lookupAtc, normalizeAtc as normalize } from "../../atc";

export type AtcKind = "income" | "vat" | "percentage";

export interface AtcInfo {
  desc: string;
  /** Percent, e.g. 5 for 5%. */
  rate: number;
}

/** Withholding VAT and percentage tax (government money payments), from taxify shared/tax-codes.js. */
const BUSINESS_TAX_ATCS: Record<string, AtcInfo> = {
  WV010: { desc: "Final withholding VAT on goods (government)", rate: 5 },
  WV020: { desc: "Final withholding VAT on services (government)", rate: 5 },
  WB080: { desc: "Percentage tax withheld by government (Sec. 109BB)", rate: 3 },
};

export const normalizeAtc = (atc: string | null | undefined) => normalize(atc) ?? "";

/**
 * Which return a withholding counts against. Per taxify sawt-report.js, WV
 * (VAT) and WB (percentage tax) ATCs belong to the 25XX forms and everything
 * else to the income tax returns.
 */
export function atcKind(atc: string): AtcKind {
  const a = normalizeAtc(atc);
  if (a.startsWith("WV")) return "vat";
  if (a.startsWith("WB")) return "percentage";
  return "income";
}

export function atcInfo(atc: string): AtcInfo | null {
  const a = normalizeAtc(atc);
  if (Object.hasOwn(BUSINESS_TAX_ATCS, a)) return BUSINESS_TAX_ATCS[a];
  const ewt = lookupAtc(a);
  return ewt ? { desc: ewt.desc, rate: ewt.rate } : null;
}
