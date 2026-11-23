/**
 * Fee schedule types (spec §3.12, Appendix A; Q48–Q54).
 * The structure lives in code (template.ts); the prices live in the database and
 * are the Owner's decision (open item O2), so nothing here carries a price.
 */
import type { TaxpayerType } from "@/lib/clients/obligations";

/** Appendix A components A–J, plus K for services that are always quoted on request. */
export const COMPONENTS = {
  A: { title: "Base", hint: "Income tax returns, 2551Q when non-VAT, portal access." },
  B: { title: "VAT", hint: "2550Q and the summary lists of sales and purchases." },
  C: { title: "Expanded withholding", hint: "0619-E, 1601-EQ, QAP and 2307s." },
  D: { title: "Payroll withholding (1601-C)", hint: "By number of employees." },
  E: { title: "SSS, PhilHealth, Pag-IBIG", hint: "Same employee bands as payroll, when we remit contributions." },
  F: { title: "Document volume", hint: "Sales, purchases and 2307s a month." },
  G: { title: "Bookkeeping", hint: "By volume; factors for complex businesses; per branch." },
  H: { title: "Annual package", hint: "Shown on every quote as part of the first-year total (Q50)." },
  I: { title: "One-time", hint: "Catch-up and registration work." },
  J: { title: "Late-submission surcharge", hint: "Documents after the cutoff (Q54). Set under schedule settings." },
  K: { title: "Other services", hint: "Always quoted on request." },
} as const;
export type ComponentLetter = keyof typeof COMPONENTS;
export const COMPONENT_LETTERS = Object.keys(COMPONENTS) as ComponentLetter[];

/**
 * How an item is charged:
 *  - monthly:          a fixed amount every month;
 *  - annual:           once a year (annual package);
 *  - one_time:         once, times the quantity chosen;
 *  - per_unit_monthly: every month, per unit (employee above a threshold, branch);
 *  - multiplier:       the price is a factor of something else (bookkeeping, or the monthly retainer).
 */
export const BILLINGS = ["monthly", "annual", "one_time", "per_unit_monthly", "multiplier"] as const;
export type Billing = (typeof BILLINGS)[number];

export const EWT_KINDS = ["none", "rental", "tamp_regular"] as const;
export type EwtKind = (typeof EWT_KINDS)[number];

export const BOOKKEEPING_LEVELS = ["none", "light", "standard", "heavy"] as const;
export type BookkeepingLevel = (typeof BOOKKEEPING_LEVELS)[number];

export const COMPLEXITY_FLAGS = ["inventory", "manufacturing", "construction"] as const;
export type ComplexityFlag = (typeof COMPLEXITY_FLAGS)[number];

/** Inclusive range; max null means no upper limit. */
export interface Range {
  min: number;
  max: number | null;
}

/**
 * When an item applies. Every key given must match the client profile; an item
 * with no conditions always applies. Stored as jsonb on fee_items.conditions.
 */
export interface Conditions {
  taxpayer_types?: TaxpayerType[];
  vat?: boolean;
  /** "any" = rental or TAMP/regular. */
  ewt?: Exclude<EwtKind, "none"> | "any";
  employees?: Range;
  remits_contributions?: boolean;
  documents?: Range;
  /** "any" = any bookkeeping level except none. */
  bookkeeping?: Exclude<BookkeepingLevel, "none"> | "any";
  complexity?: ComplexityFlag;
  /** per_unit_monthly: what is counted. */
  per?: "employee" | "branch";
  /** per employee: only employees above this number are counted. */
  above?: number;
  /** multiplier: what the factor applies to. */
  of?: "bookkeeping" | "monthly_retainer";
}

export interface FeeItemTemplate {
  code: string;
  component: ComponentLetter;
  label: string;
  band: string | null;
  billing: Billing;
  isCustomQuote: boolean;
  unit: string | null;
  conditions: Conditions;
}

/** A fee item as stored, with its price (null = not set yet). */
export interface FeeItem extends FeeItemTemplate {
  price: number | null;
}

export interface ScheduleSettings {
  pricesIncludeTax: boolean;
  quoteValidDays: number;
  minimumMonthlyRetainer: number | null;
  lateSurchargeAmount: number | null;
  lateSurchargeAuto: boolean;
}

export type TaxOnFee = "percentage_tax_3" | "vat_12";

/** What a quote is worked out from. */
export interface ClientProfile {
  taxpayerType: TaxpayerType;
  vatRegistered: boolean;
  ewt: EwtKind;
  employees: number;
  remitsContributions: boolean;
  documentsPerMonth: number;
  bookkeeping: BookkeepingLevel;
  complexity: ComplexityFlag[];
  /** Branches besides the head office. */
  branches: number;
  /** Codes of annual items chosen. */
  annualItems: string[];
  /** One-time items chosen, with quantity (backlog: number of months). */
  oneTimeItems: { code: string; quantity: number }[];
}
