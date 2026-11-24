/**
 * BIR income tax lines that income and expense accounts feed (BIR Forms
 * 1701/1701Q for individuals, 1702-RT/1702Q for non-individuals, January 2018
 * ENCS). Deductions follow the Schedule of Ordinary Allowable Itemized
 * Deductions, which is the same list on 1701 and 1702-RT. Slice 5 reads the
 * year-to-date ledger grouped by these keys to compute the returns.
 */
export type BirGroup = "gross_income" | "cost" | "other_income" | "excluded" | "deduction" | "nondeductible";

export interface BirLine {
  label: string;
  group: BirGroup;
}

export const BIR_LINES = {
  sales: { label: "Sales / revenues / receipts / fees", group: "gross_income" },
  sales_returns: { label: "Less: sales returns, allowances and discounts", group: "gross_income" },
  cost_of_sales: { label: "Cost of sales", group: "cost" },
  cost_of_services: { label: "Cost of services", group: "cost" },
  other_taxable_income: { label: "Other taxable income (not subject to final tax)", group: "other_income" },
  final_tax_income: { label: "Income subject to final tax (excluded)", group: "excluded" },
  exempt_income: { label: "Exempt income (excluded)", group: "excluded" },
  ded_advertising: { label: "Advertising and promotions", group: "deduction" },
  ded_amortization: { label: "Amortizations", group: "deduction" },
  ded_bad_debts: { label: "Bad debts", group: "deduction" },
  ded_charitable: { label: "Charitable and other contributions", group: "deduction" },
  ded_commissions: { label: "Commissions", group: "deduction" },
  ded_utilities: { label: "Communication, light and water", group: "deduction" },
  ded_depletion: { label: "Depletion", group: "deduction" },
  ded_depreciation: { label: "Depreciation", group: "deduction" },
  ded_directors_fees: { label: "Director's fees", group: "deduction" },
  ded_fringe_benefits: { label: "Fringe benefits", group: "deduction" },
  ded_fuel_oil: { label: "Fuel and oil", group: "deduction" },
  ded_insurance: { label: "Insurance", group: "deduction" },
  ded_interest: { label: "Interest", group: "deduction" },
  ded_janitorial: { label: "Janitorial and messengerial services", group: "deduction" },
  ded_losses: { label: "Losses", group: "deduction" },
  ded_management_fees: { label: "Management and consultancy fee", group: "deduction" },
  ded_miscellaneous: { label: "Miscellaneous", group: "deduction" },
  ded_office_supplies: { label: "Office supplies", group: "deduction" },
  ded_other_services: { label: "Other services", group: "deduction" },
  ded_professional_fees: { label: "Professional fees", group: "deduction" },
  ded_rental: { label: "Rental", group: "deduction" },
  ded_repairs: { label: "Repairs and maintenance", group: "deduction" },
  ded_representation: { label: "Representation and entertainment", group: "deduction" },
  ded_research: { label: "Research and development", group: "deduction" },
  ded_royalties: { label: "Royalties", group: "deduction" },
  ded_salaries: { label: "Salaries and allowances", group: "deduction" },
  ded_security: { label: "Security services", group: "deduction" },
  ded_contributions: { label: "SSS, GSIS, PhilHealth, HDMF and other contributions", group: "deduction" },
  ded_taxes_licenses: { label: "Taxes and licenses", group: "deduction" },
  ded_tolling_fees: { label: "Tolling fees", group: "deduction" },
  ded_training: { label: "Training and seminars", group: "deduction" },
  ded_transportation_travel: { label: "Transportation and travel", group: "deduction" },
  ded_others: { label: "Others", group: "deduction" },
  nondeductible: { label: "Not deductible (income tax, fines and penalties…)", group: "nondeductible" },
} as const satisfies Record<string, BirLine>;
export type BirLineKey = keyof typeof BIR_LINES;

export const isBirLine = (k: string): k is BirLineKey => k in BIR_LINES;
