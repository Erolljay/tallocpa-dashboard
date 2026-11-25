/**
 * Payroll (spec §3.7): a client's employees and their monthly pay, the source of
 * BIR Form 1601-C, 1604-C and the alphalist of employees. Amounts are integer
 * centavos, as in the return worksheets (src/lib/returns/types.ts).
 */
import type { Centavos } from "@/lib/returns/types";

/** BIR alphalist employment status codes (taxify shared/custom-fields.js EMPLOYEE_FIELDS[4]). */
export const EMPLOYMENT_STATUSES = {
  R: "Regular",
  C: "Casual",
  CP: "Contractual / project-based",
  S: "Seasonal",
  P: "Probationary",
  AL: "Apprentice / learner",
} as const;
export type EmploymentStatus = keyof typeof EMPLOYMENT_STATUSES;

/** Reason for separation (taxify EMPLOYEE_FIELDS[8]); "NA" on the alphalist when the employee is not separated. */
export const SEPARATION_REASONS = {
  T: "Terminated / resigned",
  TR: "Transferred",
  R: "Retired",
  D: "Death",
} as const;
export type SeparationReason = keyof typeof SEPARATION_REASONS;

export interface Employee {
  id: string;
  /** The account title their pay is booked to (Salaries and Wages when not set; payroll to the books). */
  payAccountId?: string | null;
  employeeNo: string | null;
  lastName: string;
  firstName: string;
  middleName: string | null;
  /** "123-456-789" (9 digits); the branch is separate. */
  tin: string | null;
  tinBranch: string;
  birthDate: string | null;
  address: string | null;
  zipCode: string | null;
  region: string | null;
  nationality: string;
  employmentStatus: EmploymentStatus;
  isMwe: boolean;
  mweDailyRate: Centavos | null;
  /** Statutory minimum wage per month (BIR 2316 item 10), when known. */
  mweMonthlyRate: Centavos | null;
  hireDate: string | null;
  separationDate: string | null;
  separationReason: SeparationReason | null;
  substitutedFiling: boolean;
  active: boolean;
  needsDetails: boolean;
}

/**
 * A month's pay for one employee, totalled by BIR reporting category (the
 * payslip items' categories, items.ts). These category totals are what every
 * BIR figure is computed from (taxify helpers/payroll-helpers.js PH_CAT), plus
 * the entry's tax adjustment.
 */
export const AMOUNT_FIELDS = [
  "basic",
  "overtime",
  "holidayPay",
  "nightDifferential",
  "hazardPay",
  "thirteenthMonth",
  "deMinimis",
  "otherTaxable",
  "separation",
  "commission",
  "profitShare",
  "directorFee",
  "taxWithheld",
  "sssEmployee",
  "philhealthEmployee",
  "pagibigEmployee",
  /** Deductions that do not affect tax (loans, cash advances…): net pay only. */
  "otherDeductions",
  "sssEmployer",
  "philhealthEmployer",
  "pagibigEmployer",
  /** Employer costs that are not BIR figures (HMO…). */
  "otherEmployer",
  /** Correction of tax withheld from the employee in earlier months (1601-C item 26), negative for a refund. Entered on the entry, not as an item. */
  "adjustment",
] as const;
export type AmountField = (typeof AMOUNT_FIELDS)[number];

export type PayAmounts = Record<AmountField, Centavos>;

/** One employee's pay for one month (payroll_entries). */
export interface PayrollEntry extends PayAmounts {
  employeeId: string;
  /** First day of the month, YYYY-MM-01. */
  payMonth: string;
  note: string | null;
}

/**
 * What a payroll form needs (WorksheetContext.payroll), from `loadPayrollContext`:
 * the client's employees and their entries from January of the return's year up
 * to the last month of the return's period (the 13th-month ceiling and the
 * year-end annualization are cumulative).
 */
export interface PayrollContext {
  /** Calendar year of the return (withholding returns follow the calendar year, §3.3). */
  year: number;
  /** Last month of the period, 1–12: the month of a 1601-C, 12 for a 1604-C. */
  throughMonth: number;
  employees: Employee[];
  /** Entries for January … throughMonth of `year`. */
  entries: PayrollEntry[];
  /** Employees' previous employers within `year` (BIR 2316 Part III); none when absent. */
  priorEmployers?: PriorEmployer[];
}

/**
 * An employee's previous employer within the year (employee_prior_employers),
 * from that employer's 2316: BIR 2316 Part III (items 16–18) and the amounts
 * that enter items 22 and 25B and the alphalist's previous-employer columns.
 */
export interface PriorEmployer {
  employeeId: string;
  year: number;
  /** "123-456-789" or with the branch, "123-456-789-00000". */
  tin: string | null;
  name: string;
  address: string | null;
  zipCode: string | null;
  /** Taxable compensation (the previous employer's item 21). */
  taxable: Centavos;
  /** Non-taxable / exempt compensation (its item 20). */
  nonTaxable: Centavos;
  /** Tax withheld (its item 26). */
  withheld: Centavos;
}

export const emptyAmounts = (): PayAmounts => Object.fromEntries(AMOUNT_FIELDS.map((f) => [f, 0])) as PayAmounts;
