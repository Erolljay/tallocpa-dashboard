/**
 * Works out a client's BIR filing obligations from the tax types on their COR
 * (Form 2303) — spec §3.3, §4.1. Staff review the list before it is saved.
 */
import type { Frequency } from "@/lib/deadlines/engine";

export const TAXPAYER_TYPES = ["individual", "opc", "partnership", "corporation", "non_stock"] as const;
export type TaxpayerType = (typeof TAXPAYER_TYPES)[number];

export const TAX_TYPES = {
  income_tax: "Income Tax",
  vat: "Value-Added Tax",
  percentage_tax: "Percentage Tax",
  wt_compensation: "Withholding Tax – Compensation",
  wt_expanded: "Withholding Tax – Expanded",
} as const;
export type TaxType = keyof typeof TAX_TYPES;

export interface PlannedObligation {
  form: string;
  frequency: Frequency;
  taxType: TaxType;
}

export class TaxTypeError extends Error {}

export function obligationsForTaxTypes(taxpayerType: TaxpayerType, taxTypes: readonly TaxType[]): PlannedObligation[] {
  const set = new Set(taxTypes);
  if (set.has("vat") && set.has("percentage_tax")) {
    throw new TaxTypeError("A client is registered for either VAT or percentage tax, not both. Check the COR.");
  }
  const out: PlannedObligation[] = [];
  const add = (taxType: TaxType, form: string, frequency: Frequency) => out.push({ taxType, form, frequency });

  if (set.has("income_tax")) {
    if (taxpayerType === "individual") {
      add("income_tax", "1701Q", "quarterly");
      add("income_tax", "1701", "annual");
    } else {
      add("income_tax", "1702Q", "quarterly");
      add("income_tax", "1702-RT", "annual");
    }
  }
  if (set.has("vat")) add("vat", "2550Q", "quarterly");
  if (set.has("percentage_tax")) add("percentage_tax", "2551Q", "quarterly");
  if (set.has("wt_compensation")) {
    add("wt_compensation", "1601-C", "monthly");
    add("wt_compensation", "1604-C", "annual");
  }
  if (set.has("wt_expanded")) {
    add("wt_expanded", "0619-E", "monthly");
    add("wt_expanded", "1601-EQ", "quarterly");
    add("wt_expanded", "1604-E", "annual");
  }
  return out;
}
