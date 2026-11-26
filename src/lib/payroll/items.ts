/**
 * Payslip items (payroll_items): each client's own earnings, deductions and
 * employer contributions, each mapped to a BIR reporting category. Ported from
 * taxify.ph shared/custom-fields.js PAYSLIP_ITEM_TYPES and the payslip-item ↔
 * BIR category mapping (helpers/payroll-helpers.js PH_CAT): every BIR figure is
 * computed from the category totals, never from item names.
 */
import type { Centavos } from "@/lib/returns/types";
import { emptyAmounts, type AmountField, type PayAmounts } from "./types";

export type ItemKind = "earning" | "deduction" | "employer_contribution";

export const ITEM_KINDS: Record<ItemKind, string> = {
  earning: "Earning",
  deduction: "Deduction",
  employer_contribution: "Employer contribution",
};

export interface Category {
  label: string;
  kind: ItemKind;
  /** Which category total (types.ts AMOUNT_FIELDS) the item adds to. */
  field: AmountField;
  help: string;
}

/**
 * taxify PH_CAT (ph-bir-earn-01…12, ph-bir-ded-01…05, ph-bir-con-01…03), with "none" for items
 * that are not BIR figures. SSS and Pag-IBIG loan payments are not BIR figures either, but
 * each has its own category so the payroll credits its own loans payable in the Books.
 */
export const CATEGORIES = {
  basic: { label: "Basic salary", kind: "earning", field: "basic", help: "Regular pay for time worked (net of tardiness / absences if entered as negative items). Exempt for minimum wage earners." },
  overtime: { label: "Overtime pay", kind: "earning", field: "overtime", help: "Exempt for minimum wage earners; taxable for others." },
  holiday: { label: "Holiday pay", kind: "earning", field: "holidayPay", help: "Exempt for minimum wage earners; taxable for others." },
  night_diff: { label: "Night shift differential", kind: "earning", field: "nightDifferential", help: "Exempt for minimum wage earners; taxable for others." },
  hazard: { label: "Hazard pay", kind: "earning", field: "hazardPay", help: "Exempt for minimum wage earners; taxable for others." },
  thirteenth_month: { label: "13th month pay & other benefits", kind: "earning", field: "thirteenthMonth", help: "13th month pay, bonuses, excess de minimis. Non-taxable up to ₱90,000 a year per employee; the rest is taxable." },
  de_minimis: { label: "De minimis benefits", kind: "earning", field: "deMinimis", help: "Rice subsidy, uniform and laundry allowance, medical cash allowance… within the RR limits. Non-taxable." },
  other_taxable: { label: "Other taxable compensation", kind: "earning", field: "otherTaxable", help: "Taxable allowances (transportation, COLA, representation…) and other taxable pay." },
  separation: { label: "Separation / retirement pay (non-taxable)", kind: "earning", field: "separation", help: "Separation pay for causes beyond the employee's control, qualified retirement pay. Treated as exempt (1601-C item 20), as in taxify." },
  commission: { label: "Commission", kind: "earning", field: "commission", help: "Taxable (2316 item 45)." },
  profit_share: { label: "Profit sharing", kind: "earning", field: "profitShare", help: "Taxable (2316 item 46)." },
  director_fee: { label: "Fees incl. director's fees", kind: "earning", field: "directorFee", help: "Taxable (2316 item 47)." },
  withholding_tax: { label: "Withholding tax on compensation", kind: "deduction", field: "taxWithheld", help: "Tax withheld from the employee (1601-C item 25)." },
  sss_ee: { label: "SSS — employee share", kind: "deduction", field: "sssEmployee", help: "Mandatory contribution; non-taxable (item 19)." },
  phic_ee: { label: "PhilHealth — employee share", kind: "deduction", field: "philhealthEmployee", help: "Mandatory contribution; non-taxable (item 19)." },
  hdmf_ee: { label: "Pag-IBIG — employee share", kind: "deduction", field: "pagibigEmployee", help: "Mandatory contribution; non-taxable (item 19). Voluntary extra Pag-IBIG goes under “Not a BIR figure”." },
  sss_loan: { label: "SSS loan payment", kind: "deduction", field: "otherDeductions", help: "SSS salary or calamity loan amortization withheld from pay; goes to SSS Loans Payable. Reduces net pay only; no effect on tax." },
  hdmf_loan: { label: "Pag-IBIG loan payment", kind: "deduction", field: "otherDeductions", help: "Pag-IBIG multi-purpose, calamity or housing loan amortization withheld from pay; goes to Pag-IBIG Loans Payable. Reduces net pay only; no effect on tax." },
  none_deduction: { label: "Not a BIR figure (company loans, cash advances…)", kind: "deduction", field: "otherDeductions", help: "Reduces net pay only; no effect on tax." },
  sss_er: { label: "SSS — employer share", kind: "employer_contribution", field: "sssEmployer", help: "Employer cost; not compensation." },
  sss_ec: { label: "SSS — EC (Employees' Compensation)", kind: "employer_contribution", field: "sssEmployer", help: "Employer cost paid with the SSS contributions (₱10 or ₱30 per employee); goes to SSS Payable. Not compensation." },
  phic_er: { label: "PhilHealth — employer share", kind: "employer_contribution", field: "philhealthEmployer", help: "Employer cost; not compensation." },
  hdmf_er: { label: "Pag-IBIG — employer share", kind: "employer_contribution", field: "pagibigEmployer", help: "Employer cost; not compensation." },
  none_employer: { label: "Not a BIR figure (HMO…)", kind: "employer_contribution", field: "otherEmployer", help: "Employer cost shown on the register only." },
} as const satisfies Record<string, Category>;

export type BirCategory = keyof typeof CATEGORIES;
export const CATEGORY_KEYS = Object.keys(CATEGORIES) as BirCategory[];

export interface PayrollItem {
  id: string;
  name: string;
  kind: ItemKind;
  category: BirCategory;
  sortOrder: number;
  active: boolean;
}

/** The set a client starts with (all editable). */
export const DEFAULT_ITEMS: { name: string; kind: ItemKind; category: BirCategory }[] = [
  { name: "Basic Pay", kind: "earning", category: "basic" },
  { name: "Overtime Pay", kind: "earning", category: "overtime" },
  { name: "Holiday Pay", kind: "earning", category: "holiday" },
  { name: "Night Differential", kind: "earning", category: "night_diff" },
  { name: "13th Month Pay", kind: "earning", category: "thirteenth_month" },
  { name: "Rice Allowance", kind: "earning", category: "de_minimis" },
  { name: "Withholding Tax", kind: "deduction", category: "withholding_tax" },
  { name: "SSS (Employee)", kind: "deduction", category: "sss_ee" },
  { name: "PhilHealth (Employee)", kind: "deduction", category: "phic_ee" },
  { name: "Pag-IBIG (Employee)", kind: "deduction", category: "hdmf_ee" },
  { name: "SSS (Employer)", kind: "employer_contribution", category: "sss_er" },
  { name: "SSS EC", kind: "employer_contribution", category: "sss_ec" },
  { name: "PhilHealth (Employer)", kind: "employer_contribution", category: "phic_er" },
  { name: "Pag-IBIG (Employer)", kind: "employer_contribution", category: "hdmf_er" },
];

const KIND_ORDER: Record<ItemKind, number> = { earning: 0, deduction: 1, employer_contribution: 2 };

/** Register order: earnings, deductions, employer contributions; then sort order, then name. */
export function sortItems(items: PayrollItem[]): PayrollItem[] {
  return [...items].sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

/** Item amounts (by item id) → category totals. Unknown item ids are ignored. */
export function categoryTotals(lines: Iterable<[string, Centavos]>, items: PayrollItem[], adjustment: Centavos = 0): PayAmounts {
  const byId = new Map(items.map((i) => [i.id, i]));
  const a = emptyAmounts();
  for (const [itemId, amount] of lines) {
    const item = byId.get(itemId);
    if (item) a[CATEGORIES[item.category].field] += amount;
  }
  a.adjustment = adjustment;
  return a;
}

const EARNING_FIELDS: AmountField[] = ["basic", "overtime", "holidayPay", "nightDifferential", "hazardPay", "thirteenthMonth", "deMinimis", "otherTaxable", "separation", "commission", "profitShare", "directorFee"];
const DEDUCTION_FIELDS: AmountField[] = ["taxWithheld", "sssEmployee", "philhealthEmployee", "pagibigEmployee", "otherDeductions"];

/** Gross pay, total deductions and net pay, as on the client's payroll register. */
export function payTotals(a: PayAmounts): { gross: Centavos; deductions: Centavos; net: Centavos } {
  const gross = EARNING_FIELDS.reduce((s, f) => s + a[f], 0);
  const deductions = DEDUCTION_FIELDS.reduce((s, f) => s + a[f], 0);
  return { gross, deductions, net: gross - deductions };
}
