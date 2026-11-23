/**
 * The fee schedule's structure, from spec Appendix A. "Create draft from template"
 * inserts these items into a new draft schedule with every price empty: the prices
 * are the Owner's decision (open item O2) and are entered in Settings → Fee schedule.
 *
 * Codes are stable keys: quotes, proposals and the gap report find items by them,
 * so change a code only together with a migration of existing schedules.
 */
import type { FeeItemTemplate } from "./types";

const NON_INDIVIDUAL = ["opc", "partnership", "corporation", "non_stock"] as const;

/** Employee bands shared by payroll (D) and contributions (E). */
export const EMPLOYEE_BANDS = [
  { key: "1-9", band: "1–9 employees", min: 1, max: 9 },
  { key: "10-29", band: "10–29 employees", min: 10, max: 29 },
  { key: "30-49", band: "30–49 employees", min: 30, max: 49 },
  { key: "50plus", band: "50 or more employees", min: 50, max: null },
] as const;
export const EMPLOYEE_PER_HEAD_ABOVE = 50;

/** Monthly document volume bands (F). The last band is quoted on request. */
export const DOCUMENT_BANDS = [
  { key: "0-50", band: "Up to 50 a month (included)", min: 0, max: 50 },
  { key: "51-150", band: "51–150 a month", min: 51, max: 150 },
  { key: "151-300", band: "151–300 a month", min: 151, max: 300 },
  { key: "301plus", band: "301 or more a month", min: 301, max: null },
] as const;

const employeeItems = (component: "D" | "E", label: string, extra: { remits_contributions?: true }): FeeItemTemplate[] => [
  ...EMPLOYEE_BANDS.map(
    (b): FeeItemTemplate => ({
      code: `${component}.${b.key}`,
      component,
      label,
      band: b.band,
      billing: "monthly",
      isCustomQuote: false,
      unit: null,
      conditions: { ...extra, employees: { min: b.min, max: b.max } },
    }),
  ),
  {
    code: `${component}.per_employee`,
    component,
    label,
    band: `Each employee above ${EMPLOYEE_PER_HEAD_ABOVE}`,
    billing: "per_unit_monthly",
    isCustomQuote: false,
    unit: "employee",
    conditions: { ...extra, employees: { min: EMPLOYEE_PER_HEAD_ABOVE + 1, max: null }, per: "employee", above: EMPLOYEE_PER_HEAD_ABOVE },
  },
];

const item = (code: string, component: FeeItemTemplate["component"], label: string, band: string | null, billing: FeeItemTemplate["billing"], conditions: FeeItemTemplate["conditions"] = {}, extra: Partial<FeeItemTemplate> = {}): FeeItemTemplate => ({
  code,
  component,
  label,
  band,
  billing,
  isCustomQuote: false,
  unit: null,
  conditions,
  ...extra,
});

export const FEE_TEMPLATE: readonly FeeItemTemplate[] = [
  // A. Base
  item("A.individual", "A", "Base", "Individual", "monthly", { taxpayer_types: ["individual"] }),
  item("A.corporate", "A", "Base", "Corporation, OPC or partnership", "monthly", { taxpayer_types: ["opc", "partnership", "corporation"] }),
  item("A.non_stock", "A", "Base", "Non-stock, non-profit", "monthly", { taxpayer_types: ["non_stock"] }),

  // B. VAT
  item("B.individual", "B", "VAT returns", "Individual", "monthly", { vat: true, taxpayer_types: ["individual"] }),
  item("B.non_individual", "B", "VAT returns", "Non-individual", "monthly", { vat: true, taxpayer_types: [...NON_INDIVIDUAL] }),

  // C. Expanded withholding
  item("C.rental", "C", "Expanded withholding", "Rental only", "monthly", { ewt: "rental" }),
  item("C.regular", "C", "Expanded withholding", "TAMP or regular", "monthly", { ewt: "tamp_regular" }),

  // D. Payroll 1601-C, E. Contributions
  ...employeeItems("D", "Payroll withholding (1601-C)", {}),
  ...employeeItems("E", "SSS, PhilHealth, Pag-IBIG", { remits_contributions: true }),

  // F. Document volume
  ...DOCUMENT_BANDS.map((b) =>
    item(`F.${b.key}`, "F", "Document volume", b.band, "monthly", { documents: { min: b.min, max: b.max } }, { isCustomQuote: b.max === null }),
  ),

  // G. Bookkeeping
  item("G.light", "G", "Bookkeeping", "Light", "monthly", { bookkeeping: "light" }),
  item("G.standard", "G", "Bookkeeping", "Standard", "monthly", { bookkeeping: "standard" }),
  item("G.heavy", "G", "Bookkeeping", "Heavy", "monthly", { bookkeeping: "heavy" }),
  item("G.x_inventory", "G", "Bookkeeping factor", "Inventory", "multiplier", { bookkeeping: "any", complexity: "inventory", of: "bookkeeping" }, { unit: "×" }),
  item("G.x_manufacturing", "G", "Bookkeeping factor", "Manufacturing", "multiplier", { bookkeeping: "any", complexity: "manufacturing", of: "bookkeeping" }, { unit: "×" }),
  item("G.x_construction", "G", "Bookkeeping factor", "Construction", "multiplier", { bookkeeping: "any", complexity: "construction", of: "bookkeeping" }, { unit: "×" }),
  item("G.per_branch", "G", "Bookkeeping", "Each branch", "per_unit_monthly", { bookkeeping: "any", per: "branch" }, { unit: "branch" }),

  // H. Annual package (conditions say when the item is suggested)
  item("H.1604c", "H", "Annual information return 1604-C", null, "annual", { employees: { min: 1, max: null } }),
  item("H.1604e", "H", "Annual information return 1604-E", null, "annual", { ewt: "any" }),
  item("H.sawt", "H", "Summary alphalist of withholding taxes (SAWT)", null, "annual"),
  item("H.inventory_list", "H", "Inventory list", null, "annual", { complexity: "inventory" }),
  item("H.afs_itr", "H", "Annual financial statements and income tax return", null, "annual"),

  // I. One-time
  item("I.backlog_month", "I", "Backlog catch-up", "Per month behind", "multiplier", { of: "monthly_retainer" }, { unit: "month" }),
  item("I.orus", "I", "ORUS registration", null, "one_time"),
  item("I.business_permit", "I", "Business permit", "Where we serve", "one_time"),
  item("I.sec", "I", "SEC filing", null, "one_time"),

  // K. Price on request
  item("K.fs_audit", "K", "Financial statement audit", null, "one_time", {}, { isCustomQuote: true }),
  item("K.aup", "K", "Agreed-upon procedures", null, "one_time", {}, { isCustomQuote: true }),
  item("K.systems_implementation", "K", "Systems implementation", null, "one_time", {}, { isCustomQuote: true }),
  item("K.ai_automation", "K", "AI and business automation", null, "one_time", {}, { isCustomQuote: true }),
  item("K.bir_audit_support", "K", "BIR audit support", null, "one_time", {}, { isCustomQuote: true }),
];

/** Rows for fee_items, in template order. */
export function templateRows(template: readonly FeeItemTemplate[] = FEE_TEMPLATE) {
  return template.map((t, i) => ({
    code: t.code,
    component: t.component,
    label: t.label,
    band_label: t.band,
    billing: t.billing,
    price: null,
    is_custom_quote: t.isCustomQuote,
    unit_label: t.unit,
    conditions: t.conditions,
    sort_order: (i + 1) * 10,
  }));
}
