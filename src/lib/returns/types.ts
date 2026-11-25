/**
 * Return worksheets (spec §3.7): the figures for one filing, line by line on
 * the BIR form, computed from the client's approved documents (until the
 * Phase 1B ledger exists) plus any figures staff type in. Filing itself stays
 * in eFPS / eBIRForms.
 *
 * Every form module exports a `FormModule`; `registry.ts` maps form codes
 * (as stored in filing_instances.form, e.g. "0619-E") to modules.
 * Amounts are integers in centavos to avoid floating-point drift.
 */

import type { FinancialStatements } from "@/lib/ledger/statements";
import type { PayrollContext } from "@/lib/payroll/types";

export type Centavos = number;

export type TaxpayerType = "individual" | "opc" | "partnership" | "corporation" | "non_stock";

/** One approved document, with the reviewer-approved OCR fields (extractions.approved_fields). */
export interface SourceDocument {
  id: string;
  docType: "sales_invoice" | "purchase_receipt" | "bir_2307_received" | "bir_2307_issued" | "other";
  /** First day of the month the document counts in (documents.document_month). */
  month: string;
  date: string | null;
  number: string | null;
  partyName: string | null;
  partyTin: string | null;
  partyAddress: string | null;
  /**
   * The matching entry in the firm-wide parties directory, when the TIN is on
   * file. When present, partyName / partyAddress / partyTin above already hold
   * the directory's registered name, full address and TIN with branch code.
   */
  party?: {
    kind: "individual" | "non_individual";
    registeredName: string | null;
    lastName: string | null;
    firstName: string | null;
    middleName: string | null;
    verified: boolean;
  };
  vatable: Centavos;
  vatExempt: Centavos;
  zeroRated: Centavos;
  vat: Centavos;
  total: Centavos;
  atc: string | null;
  withholding: Centavos;
  /** SLP purchase category from the register line, when known (capital goods for property and equipment). */
  slpCategory?: "capital_goods" | "other_goods" | "services" | "zero_rated" | "exempt" | null;
}

export interface WorksheetContext {
  client: {
    id: string;
    name: string;
    tin: string | null;
    rdoCode: string | null;
    registeredAddress: string | null;
    taxpayerType: TaxpayerType;
    fiscalYearEndMonth: number;
    /** From the client's obligations: registered for VAT (files 2550Q). */
    vatRegistered: boolean;
  };
  filing: { id: string; form: string; periodLabel: string; periodStart: string; periodEnd: string; dueDate: string };
  /** Approved documents whose month falls in the filing period (and, for quarterly/annual forms, the year to date where the form needs it). */
  documents: SourceDocument[];
  /** Figures staff typed in for this worksheet, keyed by `ManualInput.key`. */
  inputs: Record<string, string>;
  /**
   * Figures from this client's earlier worksheets in the same taxable year, keyed by form then line key (e.g. prior quarters for 1701Q/1702Q, earlier months for 1601-EQ).
   * Each earlier worksheet appears under "<form>@<YYYY-MM of its period start>" (e.g. "0619-E@2026-01", see source.ts `priorKey`),
   * and the latest earlier one of each form also under the bare form code ("0619-E").
   * The taxable year is the calendar year for withholding forms (deadline rule `calendar_year`), else the client's fiscal year.
   */
  priorFigures: Record<string, Record<string, Centavos>>;
  /** Employees and their pay for the year to date (1601-C, 1604-C), from src/lib/payroll/load.ts `loadPayrollContext`. */
  payroll?: PayrollContext;
  /** The client's books (Phase 1B), for forms with `usesLedger`; absent when the client has no books. */
  ledger?: LedgerContext;
}

/** One income or expense account's movement over a date range: debit − credit (income is negative). */
export interface LedgerMovement {
  code: string;
  name: string;
  type: "revenue" | "cost" | "expense" | "other_income" | "income_tax";
  /** The BIR income tax line the account feeds (src/lib/ledger/bir-lines.ts), or null when not set. */
  birLine: string | null;
  net: Centavos;
}

/** Posted income and expenses from the client's ledger (database function ledger_income). */
export interface LedgerContext {
  /** First day of the books; the ledger is used only if it is on or before the start of the taxable year. */
  booksStart: string;
  /** This filing's period. */
  period: LedgerMovement[];
  /** From the start of the taxable year to the day before the period. */
  earlier: LedgerMovement[];
  /** Suggested entries dated in the taxable year to date, not yet posted. */
  suggested: number;
  /** For annual forms: the financial statements at the period end (balance sheet schedule). */
  statements?: FinancialStatements;
}

/** A figure staff must or may type in (payroll totals, prior-year credits, tax regime choice…). */
export interface ManualInput {
  key: string;
  label: string;
  kind: "amount" | "count" | "choice" | "text";
  choices?: { value: string; label: string }[];
  required: boolean;
  help?: string;
}

export interface WorksheetLine {
  /** Stable key used in priorFigures and tests, e.g. "total_taxes_withheld". */
  key: string;
  /** Item / line number as printed on the BIR form, e.g. "14" or "Part II 20A". */
  line: string;
  label: string;
  amount: Centavos | null;
  /** How the figure was arrived at, shown on hover/expand. */
  basis?: string;
  emphasis?: "subtotal" | "total" | "payable";
}

export interface WorksheetSection {
  title: string;
  lines: WorksheetLine[];
}

/** A detail table under the form (per ATC, per supplier, per month…). */
export interface WorksheetSchedule {
  title: string;
  columns: { key: string; label: string; numeric?: boolean }[];
  rows: Record<string, string | Centavos | null>[];
}

export interface WorksheetResult {
  sections: WorksheetSection[];
  schedules: WorksheetSchedule[];
  /** Blocking problems: missing required inputs, documents without TIN/ATC… */
  errors: string[];
  /** Things the reviewer should look at but that do not block. */
  warnings: string[];
  /** Ids of the documents the figures came from. */
  documentIds: string[];
}

/** A downloadable attachment, e.g. QAP / SAWT / SLSP in the BIR alphalist DAT layout, or Excel-compatible CSV. */
export interface AttachmentFile {
  fileName: string;
  contentType: string;
  body: string;
}

export interface FormModule {
  /** Form codes this module handles, exactly as in filing_instances.form. */
  forms: string[];
  title: string;
  manualInputs(ctx: Omit<WorksheetContext, "inputs" | "priorFigures">): ManualInput[];
  compute(ctx: WorksheetContext): WorksheetResult;
  /**
   * Which approved documents the loader passes in `documents`: those of the filing period (default),
   * or from the start of the taxable year to the end of the period (for cumulative returns).
   */
  documentScope?: "period" | "year_to_date";
  /** The loader also reads the client's books (`ledger`) for the taxable year to date. */
  usesLedger?: boolean;
  /**
   * Annual forms: earlier worksheets are those ending before this period's end
   * (the year's quarterly returns), not before its start.
   */
  priorWithinPeriod?: boolean;
  /** Attachments this form produces (empty if none). */
  attachments?(ctx: WorksheetContext, result: WorksheetResult): { kind: string; label: string; build(): AttachmentFile }[];
}
