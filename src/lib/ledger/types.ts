/**
 * Bookkeeping (Phase 1B, spec §3.6): one double-entry ledger per client.
 * Amounts are integer centavos in TypeScript (src/lib/returns/money.ts) and
 * numeric(18,2) pesos in the database.
 */
import type { Centavos } from "@/lib/returns/types";

export type { Centavos };

export const ACCOUNT_TYPES = {
  asset: "Asset",
  liability: "Liability",
  equity: "Equity",
  revenue: "Revenue",
  cost: "Cost of sales / services",
  expense: "Expense",
  other_income: "Other income",
  income_tax: "Income tax",
} as const;
export type AccountType = keyof typeof ACCOUNT_TYPES;

import type { CashFlowClass } from "./cash-flow";

export type NormalSide = "debit" | "credit";

/** Accounts the app posts to by itself. The ones in SINGLE_CONTROLS appear once per client. */
export const CONTROLS = {
  cash: "Cash",
  bank: "Bank",
  ar: "Accounts receivable",
  ap: "Accounts payable",
  input_vat: "Input VAT",
  output_vat: "Output VAT",
  cwt: "Creditable withholding tax (2307)",
  ewt_payable: "Expanded withholding tax payable",
  percentage_tax_payable: "Percentage tax payable",
  income_tax_payable: "Income tax payable",
  inventory: "Inventory",
  capital: "Capital",
  drawings: "Drawings",
  retained_earnings: "Retained earnings / fund balance",
} as const;
export type Control = keyof typeof CONTROLS;
export const SINGLE_CONTROLS: readonly Control[] = [
  "ar", "ap", "input_vat", "output_vat", "cwt", "ewt_payable", "percentage_tax_payable", "income_tax_payable", "inventory", "retained_earnings",
];

/** The usual side of an account type (contra accounts set theirs explicitly). */
export const NORMAL_SIDE: Record<AccountType, NormalSide> = {
  asset: "debit",
  liability: "credit",
  equity: "credit",
  revenue: "credit",
  cost: "debit",
  expense: "debit",
  other_income: "credit",
  income_tax: "debit",
};

export const TEMPLATES = {
  sole_proprietorship: "Single proprietorship",
  partnership: "Partnership",
  stock_corporation: "Stock corporation",
  opc: "One Person Corporation (OPC)",
  non_stock: "Non-stock, non-profit (incl. schools)",
} as const;
export type TemplateCode = keyof typeof TEMPLATES;

/** clients.taxpayer_type → the template a new client's books start from. */
export const TEMPLATE_FOR_TAXPAYER: Record<string, TemplateCode> = {
  individual: "sole_proprietorship",
  partnership: "partnership",
  corporation: "stock_corporation",
  opc: "opc",
  non_stock: "non_stock",
};

/** One account of a template (and of a client's chart, plus its id). */
export interface AccountDef {
  /** Stable template key, the same in every client's books (e.g. "representation"). */
  key: string;
  code: string;
  name: string;
  type: AccountType;
  normalSide: NormalSide;
  /** FS line it is reported on (fs-lines.ts). */
  fsLine: string;
  /** BIR income tax line it feeds (bir-lines.ts); income and expense accounts only. */
  birLine: string | null;
  control: Control | null;
}

export interface LedgerAccount extends Omit<AccountDef, "key"> {
  id: string;
  /** Statement of cash flows class set on the account; null: from the FS line (cash-flow.ts `defaultCashFlow`). */
  cashFlow: CashFlowClass | null;
  /** Null for an account staff added themselves. */
  key: string | null;
  active: boolean;
  sortOrder: number;
}

export const BOOKS = {
  general_journal: "General Journal",
  cash_receipts: "Cash Receipts Book",
  cash_disbursements: "Cash Disbursements Book",
  sales: "Sales Journal",
  purchases: "Purchase Journal",
} as const;
export type Book = keyof typeof BOOKS;

export const ENTRY_SOURCES = {
  opening: "Opening balances",
  manual: "Manual entry",
  document: "From a document",
  arap_update: "AR/AP update",
  reversal: "Reversal",
  closing: "Closing entry",
} as const;
export type EntrySource = keyof typeof ENTRY_SOURCES;

/**
 * Returns that lock their months of the books once filed (spec §3.6, Q30). The
 * same list as private.book_lock_forms() in the database; a database test keeps
 * them equal. Information returns (1604-C, 1604-E, Inventory List) do not lock.
 */
export const BOOK_LOCK_FORMS = ["0619-E", "1601-C", "1601-EQ", "2550M", "2550Q", "2551M", "2551Q", "1701Q", "1702Q", "1701", "1701A", "1702-RT", "1702-EX", "1702-MX"] as const;
