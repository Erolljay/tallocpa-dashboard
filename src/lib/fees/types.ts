/**
 * Fee schedule types (spec §3.12, Appendix A; Q48–Q54; Owner, 26 Nov 2026).
 * The structure lives in code (template.ts); the prices live in the database and
 * are the Owner's decision (open item O2), so nothing here carries a price.
 *
 * Since 26 Nov 2026 a quote is monthly only: the monthly retainer, plus backlog
 * catch-up as a one-time line. Annual jobs (income tax return with AFS, 1604-C,
 * 1604-E, SAWT, inventory list, audit) and ad hoc jobs (registration, permits,
 * filings, amendments, services on request) are listed as "Not included in this
 * quote" and priced in the proposal, each group in its own section.
 */
import type { TaxpayerType } from "@/lib/clients/obligations";

/**
 * Appendix A components A–J, plus K for services that are always quoted on request.
 * G is retired (merged into F on 26 Nov 2026); it stays here only so schedules made
 * before then can still be read.
 */
export const COMPONENTS = {
  A: { title: "Base", hint: "Income tax returns, 2551Q when non-VAT, portal access." },
  B: { title: "VAT", hint: "2550Q and the summary lists of sales and purchases." },
  C: { title: "Expanded withholding", hint: "0619-E, 1601-EQ, QAP and 2307s." },
  D: { title: "Payroll withholding (1601-C)", hint: "By number of employees." },
  E: { title: "SSS, PhilHealth, Pag-IBIG", hint: "Same employee bands as payroll, when we remit contributions." },
  F: {
    title: "Bookkeeping, by documents a month",
    hint: "Sales, purchases and 2307s a month, recorded for the books and the returns. Factors for complex businesses; per branch.",
  },
  G: { title: "Bookkeeping (retired)", hint: "Merged into F on 26 Nov 2026. Start a new version to move to the new structure." },
  H: { title: "Annual jobs", hint: "Annual returns and statements. Not in the quote: priced in the proposal. A price here is optional; it fills in the proposal." },
  I: { title: "Ad hoc jobs", hint: "Registration, permits, filings and amendments, billed when done. Not in the quote: priced in the proposal; a price here is optional." },
  J: { title: "Late-submission surcharge", hint: "Documents after the cutoff (Q54). Set under schedule settings." },
  K: { title: "On request", hint: "Always quoted for the job: listed under annual or ad hoc jobs in the proposal." },
} as const;
export type ComponentLetter = keyof typeof COMPONENTS;
export const COMPONENT_LETTERS = Object.keys(COMPONENTS) as ComponentLetter[];

/**
 * How an item is charged:
 *  - monthly:          a fixed amount every month;
 *  - annual:           an annual job, once a year (not in the quote: priced in the proposal);
 *  - one_time:         an ad hoc job, once, billed when done (not in the quote: priced in the proposal);
 *  - per_unit_monthly: every month, per unit (employee above a threshold, branch);
 *  - multiplier:       the price is a factor of something else (the bookkeeping band, or the
 *                      monthly retainer for each month of backlog catch-up).
 */
export const BILLINGS = ["monthly", "annual", "one_time", "per_unit_monthly", "multiplier"] as const;
export type Billing = (typeof BILLINGS)[number];

export const EWT_KINDS = ["none", "rental", "tamp_regular"] as const;
export type EwtKind = (typeof EWT_KINDS)[number];

/** Bookkeeping levels of schedules made before 26 Nov 2026 (component G). Read only. */
export const LEGACY_BOOKKEEPING_LEVELS = ["light", "standard", "heavy"] as const;

/** Billings that are never on a quote: listed as not included and priced in the proposal. */
export const PROPOSAL_ONLY_BILLINGS = ["annual", "one_time"] as const;
export const isProposalOnly = (i: { billing: Billing }) => (PROPOSAL_ONLY_BILLINGS as readonly string[]).includes(i.billing);

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
  /** "any" = rent or contractors (rental) or TAMP (tamp_regular). */
  ewt?: Exclude<EwtKind, "none"> | "any";
  employees?: Range;
  remits_contributions?: boolean;
  documents?: Range;
  /**
   * Annual gross sales in pesos, for sales bands the Owner may add later (e.g. the
   * annual return with AFS by sales). A profile without sales matches only the
   * lowest band (min 0).
   */
  annual_sales?: Range;
  /** Schedules made before 26 Nov 2026 only (component G). Never matches a profile now. */
  bookkeeping?: (typeof LEGACY_BOOKKEEPING_LEVELS)[number] | "any";
  /** "any" = at least one of inventory, manufacturing, construction (a flat add-on, once). */
  complexity?: ComplexityFlag | "any";
  /** per_unit_monthly: what is counted. */
  per?: "employee" | "branch";
  /** per employee: only employees above this number are counted. */
  above?: number;
  /** multiplier: what the factor applies to ("bookkeeping" = the F band fee). */
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
  /** Above this monthly retainer the quote shows no price: the business is quoted on request in the proposal. Null = no cap. */
  monthlyCap: number | null;
  /** Catch-up per month behind, as a share of the monthly retainer (0.5 = half). Null = catch-up on request. */
  catchUpFactor: number | null;
}

export type TaxOnFee = "percentage_tax_3" | "vat_12";

/**
 * What a quote is worked out from. Every client is charged bookkeeping by the
 * documents they send a month (F): with or without the bookkeeping service, each
 * document is recorded for the summary lists (SLSP), the 2307s and the returns.
 */
export interface ClientProfile {
  taxpayerType: TaxpayerType;
  vatRegistered: boolean;
  ewt: EwtKind;
  employees: number;
  remitsContributions: boolean;
  documentsPerMonth: number;
  complexity: ComplexityFlag[];
  /** Branches besides the head office. */
  branches: number;
  /** Months of backlog to catch up (one-time line on the quote). */
  monthsBehind: number;
  /** Annual gross sales in pesos, when known (not asked on /start yet). */
  annualSales?: number | null;
}
