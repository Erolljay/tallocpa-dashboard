/**
 * Chart-of-accounts templates, one per kind of entity: single proprietorship,
 * partnership, stock corporation, OPC and non-stock. The accounts and their
 * grouping follow the firm's FS working papers (Drive: 0001 AUDIT — "FS -
 * Template Individual", MRJ Transport Services Corp, Rey-an Poultry Farm OPC,
 * the cooperative and lending FSs): cash, receivables, prepaid tax assets
 * (2307, input VAT), property and equipment with accumulated depreciation,
 * accrued liabilities (SSS/PhilHealth/HDMF, withholding and percentage tax
 * payable), income tax payable, advances from owners, then revenue, cost of
 * sales / services and operating expenses.
 *
 * Each account carries:
 *   - a stable `key`, the same in every client's books, so a supplier's preset
 *     account title (e.g. Starbucks → representation) finds each client's own
 *     account;
 *   - the FS line it is reported on (fs-lines.ts);
 *   - for income and expense accounts, the BIR income tax line it feeds
 *     (bir-lines.ts).
 *
 * A client's chart is copied from its template when its books are set up and
 * can then be changed.
 */
import { NORMAL_SIDE, type AccountDef, type AccountType, type Control, type NormalSide, type TemplateCode } from "../types";

type Spec = [key: string, code: string, name: string, type: AccountType, fsLine: string, birLine?: string | null, opts?: { control?: Control; side?: NormalSide }];

function acct([key, code, name, type, fsLine, birLine, opts]: Spec): AccountDef {
  return { key, code, name, type, normalSide: opts?.side ?? NORMAL_SIDE[type], fsLine, birLine: birLine ?? null, control: opts?.control ?? null };
}

const CONTRA: { side: NormalSide } = { side: "credit" };

// ── Assets (1xxx) ───────────────────────────────────────────
const ASSETS: Spec[] = [
  ["cash_on_hand", "1010", "Cash on Hand", "asset", "cash_and_equivalents", null, { control: "cash" }],
  ["petty_cash", "1015", "Petty Cash Fund", "asset", "cash_and_equivalents", null, { control: "cash" }],
  ["cash_in_bank", "1020", "Cash in Bank", "asset", "cash_and_equivalents", null, { control: "bank" }],
  ["accounts_receivable", "1100", "Accounts Receivable - Trade", "asset", "receivables", null, { control: "ar" }],
  ["allowance_doubtful", "1105", "Allowance for Doubtful Accounts", "asset", "receivables", null, CONTRA],
  ["advances_to_employees", "1110", "Advances to Officers and Employees", "asset", "receivables"],
  ["other_receivables", "1120", "Other Receivables", "asset", "receivables"],
  ["inventory", "1200", "Merchandise Inventory", "asset", "inventories", null, { control: "inventory" }],
  ["input_vat", "1300", "Input VAT", "asset", "prepaid_taxes", null, { control: "input_vat" }],
  // CWT booked on a cash sale waits here until the customer's 2307 arrives (one register, slice 3).
  ["cwt_awaiting", "1305", "Creditable Withholding Tax - Awaiting 2307", "asset", "prepaid_taxes", null, { control: "cwt_awaiting" }],
  ["cwt", "1310", "Creditable Withholding Tax (BIR 2307)", "asset", "prepaid_taxes", null, { control: "cwt" }],
  ["vat_withheld", "1315", "Creditable VAT Withheld", "asset", "prepaid_taxes", null, { control: "vat_withheld" }],
  ["prepaid_income_tax", "1320", "Prepaid Income Tax (quarterly payments)", "asset", "prepaid_taxes"],
  ["prepaid_expenses", "1350", "Prepaid Expenses", "asset", "other_current_assets"],
  ["prepaid_insurance", "1355", "Prepaid Insurance", "asset", "other_current_assets"],
  ["land", "1400", "Land", "asset", "ppe"],
  ["building", "1410", "Building and Improvements", "asset", "ppe"],
  ["accum_dep_building", "1411", "Accumulated Depreciation - Building and Improvements", "asset", "ppe", null, CONTRA],
  ["transportation_equipment", "1420", "Transportation Equipment", "asset", "ppe"],
  ["accum_dep_transportation", "1421", "Accumulated Depreciation - Transportation Equipment", "asset", "ppe", null, CONTRA],
  ["office_equipment", "1430", "Office Equipment", "asset", "ppe"],
  ["accum_dep_office", "1431", "Accumulated Depreciation - Office Equipment", "asset", "ppe", null, CONTRA],
  ["furniture_fixtures", "1440", "Furniture and Fixtures", "asset", "ppe"],
  ["accum_dep_furniture", "1441", "Accumulated Depreciation - Furniture and Fixtures", "asset", "ppe", null, CONTRA],
  ["it_equipment", "1450", "IT Equipment and Software", "asset", "ppe"],
  ["accum_dep_it", "1451", "Accumulated Depreciation - IT Equipment and Software", "asset", "ppe", null, CONTRA],
  ["deposits", "1500", "Security and Rental Deposits", "asset", "other_noncurrent_assets"],
  ["other_noncurrent_assets", "1590", "Other Non-current Assets", "asset", "other_noncurrent_assets"],
];

// ── Liabilities (2xxx) ──────────────────────────────────────
const liabilities = (advancesFrom: string): Spec[] => [
  ["accounts_payable", "2010", "Accounts Payable - Trade", "liability", "accounts_payable", null, { control: "ap" }],
  ["other_payables", "2015", "Other Payables", "liability", "accounts_payable"],
  ["accrued_expenses", "2020", "Accrued Expenses", "liability", "accrued_liabilities"],
  ["output_vat", "2030", "Output VAT", "liability", "accrued_liabilities", null, { control: "output_vat" }],
  ["vat_payable", "2035", "VAT Payable", "liability", "accrued_liabilities"],
  ["percentage_tax_payable", "2040", "Percentage Tax Payable", "liability", "accrued_liabilities", null, { control: "percentage_tax_payable" }],
  ["ewt_payable", "2050", "Withholding Tax Payable - Expanded", "liability", "accrued_liabilities", null, { control: "ewt_payable" }],
  ["wtc_payable", "2055", "Withholding Tax Payable - Compensation", "liability", "accrued_liabilities"],
  ["government_contributions_payable", "2060", "SSS, PhilHealth and Pag-IBIG Payable", "liability", "accrued_liabilities"],
  ["government_loans_payable", "2065", "SSS and Pag-IBIG Loans Payable", "liability", "accrued_liabilities"],
  ["income_tax_payable", "2070", "Income Tax Payable", "liability", "income_tax_payable", null, { control: "income_tax_payable" }],
  ["loans_payable_current", "2100", "Loans Payable - Current", "liability", "loans_payable_current"],
  ["loans_payable_noncurrent", "2500", "Loans Payable - Non-current", "liability", "loans_payable_noncurrent"],
  ["advances_from_owners", "2600", `Advances from ${advancesFrom}`, "liability", "advances_from_related"],
];

// ── Revenue (4xxx) ──────────────────────────────────────────
const REVENUE: Spec[] = [
  ["sales", "4010", "Sales", "revenue", "revenue", "sales"],
  ["service_income", "4020", "Service Income", "revenue", "revenue", "sales"],
  ["sales_returns", "4030", "Sales Returns, Allowances and Discounts", "revenue", "revenue", "sales_returns", { side: "debit" }],
  ["other_income", "4100", "Other Income", "other_income", "other_income", "other_taxable_income"],
  ["interest_income_bank", "4110", "Interest Income - Bank (final tax)", "other_income", "other_income", "final_tax_income"],
  ["gain_on_sale_of_assets", "4120", "Gain on Sale of Property and Equipment", "other_income", "other_income", "other_taxable_income"],
];

// ── Cost of sales / services (5xxx) ─────────────────────────
const COST: Spec[] = [
  ["purchases", "5010", "Purchases", "cost", "cost_of_sales", "cost_of_sales"],
  ["freight_in", "5020", "Freight In", "cost", "cost_of_sales", "cost_of_sales"],
  ["purchase_returns", "5030", "Purchase Returns and Discounts", "cost", "cost_of_sales", "cost_of_sales", CONTRA],
  ["direct_labor", "5100", "Direct Labor", "cost", "cost_of_services", "cost_of_services"],
  // Employer share of cost-of-services staff (as taxify; payroll to the books).
  ["contributions_direct", "5105", "SSS, PhilHealth and Pag-IBIG Contributions - Direct", "cost", "cost_of_services", "cost_of_services"],
  ["direct_materials", "5110", "Direct Materials and Supplies", "cost", "cost_of_services", "cost_of_services"],
  ["depreciation_direct", "5120", "Depreciation - Direct", "cost", "cost_of_services", "cost_of_services"],
  ["other_direct_costs", "5190", "Other Direct Costs", "cost", "cost_of_services", "cost_of_services"],
];

// ── Operating expenses (6xxx) and income tax (8xxx) ─────────
const EXPENSES: Spec[] = [
  ["salaries", "6010", "Salaries and Wages", "expense", "operating_expenses", "ded_salaries"],
  ["employee_benefits", "6020", "13th Month Pay and Employee Benefits", "expense", "operating_expenses", "ded_salaries"],
  ["government_contributions", "6030", "SSS, PhilHealth and Pag-IBIG Contributions", "expense", "operating_expenses", "ded_contributions"],
  ["rent", "6040", "Rent Expense", "expense", "operating_expenses", "ded_rental"],
  ["light_water", "6050", "Light and Water", "expense", "operating_expenses", "ded_utilities"],
  ["communication", "6055", "Communication", "expense", "operating_expenses", "ded_utilities"],
  ["fuel_oil", "6060", "Fuel and Oil", "expense", "operating_expenses", "ded_fuel_oil"],
  ["transportation_travel", "6070", "Transportation and Travel", "expense", "operating_expenses", "ded_transportation_travel"],
  ["representation", "6080", "Representation and Entertainment", "expense", "operating_expenses", "ded_representation"],
  ["meals", "6085", "Meals and Snacks", "expense", "operating_expenses", "ded_miscellaneous"],
  ["office_supplies", "6090", "Office Supplies", "expense", "operating_expenses", "ded_office_supplies"],
  ["repairs_maintenance", "6100", "Repairs and Maintenance", "expense", "operating_expenses", "ded_repairs"],
  ["professional_fees", "6110", "Professional Fees", "expense", "operating_expenses", "ded_professional_fees"],
  ["taxes_licenses", "6120", "Taxes and Licenses", "expense", "operating_expenses", "ded_taxes_licenses"],
  ["insurance", "6130", "Insurance", "expense", "operating_expenses", "ded_insurance"],
  ["depreciation", "6140", "Depreciation Expense", "expense", "operating_expenses", "ded_depreciation"],
  ["advertising", "6150", "Advertising and Promotions", "expense", "operating_expenses", "ded_advertising"],
  ["training", "6160", "Training and Seminars", "expense", "operating_expenses", "ded_training"],
  ["janitorial", "6170", "Janitorial and Messengerial Services", "expense", "operating_expenses", "ded_janitorial"],
  ["security_services", "6175", "Security Services", "expense", "operating_expenses", "ded_security"],
  ["commissions", "6180", "Commissions", "expense", "operating_expenses", "ded_commissions"],
  ["management_fees", "6185", "Management and Consultancy Fees", "expense", "operating_expenses", "ded_management_fees"],
  ["outside_services", "6190", "Outside Services", "expense", "operating_expenses", "ded_other_services"],
  ["freight_delivery", "6195", "Freight and Delivery", "expense", "operating_expenses", "ded_others"],
  ["bank_charges", "6200", "Bank Charges", "expense", "operating_expenses", "ded_miscellaneous"],
  ["bad_debts", "6210", "Bad Debts", "expense", "operating_expenses", "ded_bad_debts"],
  ["donations", "6220", "Donations and Contributions", "expense", "operating_expenses", "ded_charitable"],
  ["printing_documentation", "6230", "Printing and Documentation", "expense", "operating_expenses", "ded_others"],
  // SC/PWD discount, deducted from gross income (RR 7-2010; Owner's decision 9).
  ["sales_discount_scpwd", "6240", "Sales Discount - SC/PWD", "expense", "operating_expenses", "ded_others", { control: "sales_discount" }],
  ["penalties", "6280", "Fines, Penalties and Surcharges", "expense", "operating_expenses", "nondeductible"],
  ["miscellaneous", "6290", "Miscellaneous Expense", "expense", "operating_expenses", "ded_miscellaneous"],
  ["interest_expense", "7010", "Interest Expense", "expense", "finance_costs", "ded_interest"],
  ["income_tax_expense", "8010", "Provision for Income Tax", "income_tax", "income_tax_expense", "nondeductible"],
];

// ── Equity (3xxx), per kind of entity ───────────────────────
const EQUITY: Record<TemplateCode, Spec[]> = {
  sole_proprietorship: [
    ["owners_capital", "3010", "Owner's Capital", "equity", "owners_capital", null, { control: "capital" }],
    ["owners_drawings", "3020", "Owner's Drawings", "equity", "owners_drawings", null, { control: "drawings", side: "debit" }],
  ],
  partnership: [
    ["partner_a_capital", "3010", "Partner A - Capital", "equity", "partners_capital", null, { control: "capital" }],
    ["partner_b_capital", "3011", "Partner B - Capital", "equity", "partners_capital", null, { control: "capital" }],
    ["partner_a_drawings", "3020", "Partner A - Drawings", "equity", "partners_drawings", null, { control: "drawings", side: "debit" }],
    ["partner_b_drawings", "3021", "Partner B - Drawings", "equity", "partners_drawings", null, { control: "drawings", side: "debit" }],
  ],
  stock_corporation: [
    ["share_capital", "3010", "Capital Stock - Common", "equity", "share_capital", null, { control: "capital" }],
    ["subscription_receivable", "3015", "Subscription Receivable", "equity", "share_capital", null, { side: "debit" }],
    ["apic", "3020", "Additional Paid-in Capital", "equity", "additional_paid_in_capital"],
    ["retained_earnings", "3030", "Retained Earnings", "equity", "retained_earnings", null, { control: "retained_earnings" }],
    ["dividends", "3040", "Dividends Declared", "equity", "retained_earnings", null, { side: "debit" }],
  ],
  opc: [
    ["share_capital", "3010", "Capital Stock", "equity", "share_capital", null, { control: "capital" }],
    ["subscription_receivable", "3015", "Subscription Receivable", "equity", "share_capital", null, { side: "debit" }],
    ["apic", "3020", "Additional Paid-in Capital", "equity", "additional_paid_in_capital"],
    ["retained_earnings", "3030", "Retained Earnings", "equity", "retained_earnings", null, { control: "retained_earnings" }],
    ["dividends", "3040", "Dividends Declared", "equity", "retained_earnings", null, { side: "debit" }],
  ],
  non_stock: [
    ["fund_balance", "3010", "Fund Balance", "equity", "fund_balance", null, { control: "retained_earnings" }],
    ["restricted_fund", "3020", "Restricted Fund Balance", "equity", "fund_balance"],
  ],
};

const NON_STOCK_REVENUE: Spec[] = [
  ["tuition_fees", "4040", "Tuition and Other School Fees", "revenue", "revenue", "sales"],
  ["membership_fees", "4050", "Membership Fees and Dues", "revenue", "revenue", "exempt_income"],
  ["donations_received", "4060", "Donations and Grants Received", "revenue", "revenue", "exempt_income"],
];

const ADVANCES_FROM: Record<TemplateCode, string> = {
  sole_proprietorship: "Owner",
  partnership: "Partners",
  stock_corporation: "Stockholders",
  opc: "Sole Stockholder",
  non_stock: "Trustees and Members",
};

function build(code: TemplateCode): AccountDef[] {
  const revenue = code === "non_stock" ? [...REVENUE.slice(0, 3), ...NON_STOCK_REVENUE, ...REVENUE.slice(3)] : REVENUE;
  return [...ASSETS, ...liabilities(ADVANCES_FROM[code]), ...EQUITY[code], ...revenue, ...COST, ...EXPENSES].map(acct);
}

export const COA_TEMPLATES: Record<TemplateCode, AccountDef[]> = {
  sole_proprietorship: build("sole_proprietorship"),
  partnership: build("partnership"),
  stock_corporation: build("stock_corporation"),
  opc: build("opc"),
  non_stock: build("non_stock"),
};

/** The template as the setup_books payload, in chart order. */
export function templatePayload(code: TemplateCode) {
  return COA_TEMPLATES[code].map((a, i) => ({
    key: a.key, code: a.code, name: a.name, type: a.type, normal_side: a.normalSide,
    fs_line: a.fsLine, bir_line: a.birLine, control: a.control, sort_order: (i + 1) * 10,
  }));
}

/**
 * Account titles a supplier or customer can be preset to (parties directory):
 * every income and expense account of the templates, by key. The key finds the
 * same account in each client's books.
 */
export const PRESET_ACCOUNTS: { key: string; name: string; type: AccountType }[] = (() => {
  const seen = new Map<string, { key: string; name: string; type: AccountType }>();
  for (const list of Object.values(COA_TEMPLATES)) {
    for (const a of list) {
      if (["revenue", "cost", "expense", "other_income"].includes(a.type) && !seen.has(a.key)) seen.set(a.key, { key: a.key, name: a.name, type: a.type });
    }
  }
  return [...seen.values()];
})();
