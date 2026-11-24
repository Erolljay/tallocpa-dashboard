/**
 * Financial statement lines, in the order of the firm's FS working papers
 * (Drive: 0001 AUDIT, e.g. "FS - Template Individual", the corporation and OPC
 * FSs). Every account reports on one line; the note is the FS note the line's
 * schedule appears in (slice 6 builds the statements and notes from these).
 */
export type Statement = "sfp" | "sci";
export type Section =
  | "current_assets" | "noncurrent_assets" | "current_liabilities" | "noncurrent_liabilities" | "equity"
  | "revenue" | "cost" | "operating_expenses" | "other_income" | "finance_costs" | "income_tax";

export interface FsLine {
  label: string;
  statement: Statement;
  section: Section;
  /** Title of the FS note holding this line's schedule, if any. */
  note?: string;
}

export const FS_LINES = {
  cash_and_equivalents: { label: "Cash and cash equivalents", statement: "sfp", section: "current_assets", note: "Cash and cash equivalents" },
  receivables: { label: "Trade and other receivables", statement: "sfp", section: "current_assets", note: "Trade and other receivables" },
  inventories: { label: "Inventories", statement: "sfp", section: "current_assets", note: "Inventories" },
  prepaid_taxes: { label: "Prepaid tax assets", statement: "sfp", section: "current_assets", note: "Prepaid tax assets" },
  other_current_assets: { label: "Prepayments and other current assets", statement: "sfp", section: "current_assets", note: "Prepayments and other current assets" },
  ppe: { label: "Property and equipment, net", statement: "sfp", section: "noncurrent_assets", note: "Property and equipment" },
  other_noncurrent_assets: { label: "Other non-current assets", statement: "sfp", section: "noncurrent_assets" },
  accounts_payable: { label: "Trade and other payables", statement: "sfp", section: "current_liabilities", note: "Trade and other payables" },
  accrued_liabilities: { label: "Accrued and other liabilities", statement: "sfp", section: "current_liabilities", note: "Accrued and other liabilities" },
  income_tax_payable: { label: "Income tax payable", statement: "sfp", section: "current_liabilities", note: "Income tax payable" },
  loans_payable_current: { label: "Loans payable, current portion", statement: "sfp", section: "current_liabilities", note: "Loans payable" },
  loans_payable_noncurrent: { label: "Loans payable, net of current portion", statement: "sfp", section: "noncurrent_liabilities", note: "Loans payable" },
  advances_from_related: { label: "Advances from related parties", statement: "sfp", section: "noncurrent_liabilities" },
  owners_capital: { label: "Owner's capital", statement: "sfp", section: "equity" },
  owners_drawings: { label: "Owner's drawings", statement: "sfp", section: "equity" },
  partners_capital: { label: "Partners' capital", statement: "sfp", section: "equity" },
  partners_drawings: { label: "Partners' drawings", statement: "sfp", section: "equity" },
  share_capital: { label: "Share capital", statement: "sfp", section: "equity", note: "Equity" },
  additional_paid_in_capital: { label: "Additional paid-in capital", statement: "sfp", section: "equity", note: "Equity" },
  retained_earnings: { label: "Retained earnings", statement: "sfp", section: "equity", note: "Equity" },
  fund_balance: { label: "Fund balance", statement: "sfp", section: "equity" },
  revenue: { label: "Revenues", statement: "sci", section: "revenue", note: "Revenues" },
  cost_of_sales: { label: "Cost of sales", statement: "sci", section: "cost", note: "Cost of sales" },
  cost_of_services: { label: "Cost of services", statement: "sci", section: "cost", note: "Cost of services" },
  operating_expenses: { label: "Operating expenses", statement: "sci", section: "operating_expenses", note: "Operating expenses" },
  other_income: { label: "Other income", statement: "sci", section: "other_income" },
  finance_costs: { label: "Finance costs", statement: "sci", section: "finance_costs" },
  income_tax_expense: { label: "Income tax expense", statement: "sci", section: "income_tax" },
} as const satisfies Record<string, FsLine>;
export type FsLineKey = keyof typeof FS_LINES;

export const isFsLine = (k: string): k is FsLineKey => k in FS_LINES;
