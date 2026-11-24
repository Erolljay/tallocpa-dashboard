/**
 * BIR Form 2316 (Certificate of Compensation Payment / Tax Withheld, September
 * 2021 ENCS) for one employee and year: every field the printed form needs
 * (src/components/bir/form-2316.tsx). Ported from taxify.ph
 * reports/2316-report.js (`render2316Cert`): Part IV-B items 29–52 with the same
 * treatment (MWE basic pay net of contributions in item 29; non-MWE basic pay net
 * of contributions in item 39; 13th month over the ceiling in item 48; holiday
 * pay and night-shift differential of a non-MWE in item 51A).
 *
 * Deliberate differences from taxify, each marked "(differs from taxify)":
 *   - Part III and items 22 / 25B carry the previous employer within the year
 *     (employee_prior_employers); taxify always printed them empty / zero. Item 23
 *     is item 21 + item 22, tax due (24) is on item 23, item 26 = 25A + 25B and
 *     item 28 = 26 + 27, as the form instructs.
 *   - Item 2 (period) runs from the hire date and to the separation date when they
 *     fall in the year; taxify always printed 01/01–12/31.
 *   - TINs carry a five-digit branch code (3-3-3-5); taxify printed 3-3-3-3.
 *   - Items 9 and 10 (statutory minimum wage per day / month) are filled for MWEs.
 *   - The substituted-filing signatures (55, 56) are printed only when the
 *     employee qualifies: marked so, no previous employer, tax due = tax withheld.
 */
import type { Centavos } from "@/lib/returns/types";
import { annualSummary } from "./compute";
import { employeeFromRow, itemFromRow, priorEmployerFromRow, storedMonthsFromRows, toEntries } from "./rows";
import type { Employee, PayrollContext } from "./types";
import { buildYear, sortName, type EmployeeYear } from "./year";

/** One numbered amount line of the form; `amount` null prints an empty box. */
export interface Form2316Line {
  no: string;
  label: string;
  amount: Centavos | null;
  /** Totals (items 24, 28, 38, 52) print in bold. */
  total?: boolean;
  /** A heading line with no box ("44 Others (specify)"). */
  heading?: boolean;
}

export interface Form2316Party {
  /** Digits only: nine TIN digits followed by the branch code, padded to five ("12345678900000"), or "" if unknown. */
  tin: string;
  name: string;
  address: string | null;
  zipCode: string | null;
}

/** The present employer (the client) as the 2316 needs it. */
export interface Form2316Employer {
  name: string;
  /** "123-456-789" or with the branch, "123-456-789-000" / "-00000". */
  tin: string | null;
  rdoCode: string | null;
  registeredAddress: string | null;
  zipCode: string | null;
}

export interface Form2316Signatory {
  name: string | null;
  title: string | null;
}

/** Everything printed on one certificate. */
export interface Form2316Data {
  employeeId: string;
  /** Item 1. */
  year: number;
  /** Item 2, "MMDD". */
  periodFrom: string;
  periodTo: string;
  /** Part I, items 3–11. */
  employee: Form2316Party & {
    /** Item 5: the RDO where the employee is registered; the employer's RDO is used (as taxify does). */
    rdoCode: string | null;
    /** Item 6D: not captured. */
    foreignAddress: string | null;
    /** Item 7, YYYY-MM-DD. */
    birthDate: string | null;
    /** Item 8: not captured. */
    contactNumber: string | null;
  };
  /** Items 9–11. */
  mwe: { isMwe: boolean; dailyRate: Centavos | null; monthlyRate: Centavos | null };
  /** Part II, items 12–15. */
  employer: Form2316Party & { type: "main" | "secondary" };
  /** Part III, items 16–18 (null prints empty). */
  previous: Form2316Party | null;
  /** Part IV-A, items 19–28. */
  summary: Form2316Line[];
  /** Part IV-B A, items 29–38. */
  nonTaxable: Form2316Line[];
  /** Part IV-B B regular, items 39–44. */
  taxableRegular: Form2316Line[];
  /** Part IV-B B supplementary, items 45–52. */
  taxableSupplementary: Form2316Line[];
  /** Every amount by item number, for checks and tests. */
  amounts: Record<string, Centavos>;
  /** The employee qualifies for substituted filing: items 55 and 56 are printed. */
  substitutedFiling: boolean;
  /** Items 53 and 55: the employer's authorized representative. */
  signatory: Form2316Signatory;
  /** Item 54 / 56: "LAST, FIRST, MIDDLE". */
  employeeName: string;
  /** What staff should check before releasing the certificate. */
  warnings: string[];
}

/** TIN digits with a five-digit branch: "123-456-789" + "0000" → "12345678900000". */
export function tin14(tin: string | null | undefined, branch?: string | null): string {
  const d = (tin ?? "").replace(/\D/g, "");
  if (d.length < 9) return "";
  const b = (branch != null ? branch.replace(/\D/g, "") : d.slice(9)) || "0";
  return d.slice(0, 9) + b.padStart(5, "0").slice(-5);
}

const mmdd = (iso: string) => iso.slice(5, 7) + iso.slice(8, 10);

/** Item 2: from the hire date and to the separation date when they fall within the year. */
export function period2316(e: Pick<Employee, "hireDate" | "separationDate">, year: number): { from: string; to: string } {
  const y = String(year);
  return {
    from: e.hireDate && e.hireDate.startsWith(y) ? mmdd(e.hireDate) : "0101",
    to: e.separationDate && e.separationDate.startsWith(y) ? mmdd(e.separationDate) : "1231",
  };
}

/** The BIR 2316 for one employee's year. */
export function form2316(y: EmployeeYear, year: number, employer: Form2316Employer, signatory: Form2316Signatory): Form2316Data {
  const e = y.employee;
  const isMwe = e.isMwe;
  const prior = y.prior;
  const s = annualSummary(y.lines, year, prior);
  const sumL = (k: "l15" | "l17" | "l19" | "thirteenthExcess") => y.lines.reduce((a, l) => a + l[k], 0);
  const cat = (f: "basic" | "overtime" | "holidayPay" | "nightDifferential" | "hazardPay" | "deMinimis" | "otherTaxable" | "commission" | "profitShare" | "directorFee" | "separation") =>
    y.months.reduce((a, m) => a + (m ? m[f] : 0), 0);
  const contributions = sumL("l19");
  const [basic, ot, holiday, nd, hazard] = [cat("basic"), cat("overtime"), cat("holidayPay"), cat("nightDifferential"), cat("hazardPay")];

  // Part IV-B A. Non-taxable / exempt compensation (taxify render2316Cert).
  const i29 = sumL("l15");
  const i30 = isMwe ? holiday : 0;
  const i31 = isMwe ? ot : 0;
  const i32 = isMwe ? nd : 0;
  const i33 = isMwe ? hazard : 0;
  const i34 = sumL("l17");
  const i35 = cat("deMinimis");
  const i36 = contributions;
  const i37 = cat("separation");
  const i38 = i29 + i30 + i31 + i32 + i33 + i34 + i35 + i36 + i37;
  // B. Taxable compensation.
  const i39 = isMwe ? 0 : Math.max(0, basic - contributions);
  const i44a = cat("otherTaxable");
  const i45 = cat("commission");
  const i46 = cat("profitShare");
  const i47 = cat("directorFee");
  const i48 = sumL("thirteenthExcess");
  const i49 = isMwe ? 0 : hazard;
  const i50 = isMwe ? 0 : ot;
  const i51a = isMwe ? 0 : holiday + nd;
  const i52 = i39 + i44a + i45 + i46 + i47 + i48 + i49 + i50 + i51a;

  // Part IV-A summary, per the form's instructions (differs from taxify: previous employer included).
  const i19 = s.gross;
  const i20 = i38;
  const i21 = i19 - i20;
  const i22 = s.priorTaxable;
  const i23 = i21 + i22;
  const i24 = s.taxDue;
  const i25a = s.withheld;
  const i25b = s.priorWithheld;
  const i26 = i25a + i25b;
  const i27 = 0;
  const i28 = i26 + i27;

  const amounts: Record<string, Centavos> = {
    "19": i19, "20": i20, "21": i21, "22": i22, "23": i23, "24": i24, "25A": i25a, "25B": i25b, "26": i26, "27": i27, "28": i28,
    "29": i29, "30": i30, "31": i31, "32": i32, "33": i33, "34": i34, "35": i35, "36": i36, "37": i37, "38": i38,
    "39": i39, "40": 0, "41": 0, "42": 0, "43": 0, "44A": i44a, "44B": 0,
    "45": i45, "46": i46, "47": i47, "48": i48, "49": i49, "50": i50, "51A": i51a, "51B": 0, "52": i52,
  };
  const line = (no: string, label: string, total = false): Form2316Line => ({ no, label, amount: amounts[no], ...(total ? { total } : {}) });

  const hasPrior = !!prior && (prior.taxable !== 0 || prior.nonTaxable !== 0 || prior.withheld !== 0 || !!prior.name);
  const settled = Math.abs(i24 - i28) <= 100;
  const substitutedFiling = e.substitutedFiling && !hasPrior && settled;
  const name = sortName(e).toUpperCase();

  const warnings: string[] = [];
  if (!e.tin) warnings.push("No employee TIN (item 3).");
  if (!employer.tin) warnings.push("No employer TIN (item 12): add it to the client's record.");
  if (!employer.zipCode) warnings.push("No employer ZIP code (item 14A): set it in Payroll setup.");
  if (!signatory.name) warnings.push("No authorized representative (items 53 and 55): set the signatory in Payroll setup.");
  if (isMwe && e.mweMonthlyRate == null) warnings.push("Minimum wage earner with no monthly minimum wage on file: item 10 is blank.");
  if (i52 !== i21) warnings.push(`Item 52 (${(i52 / 100).toFixed(2)}) does not equal item 21 (${(i21 / 100).toFixed(2)}): basic pay is less than the contributions in some month. Check the payroll.`);
  if (e.substitutedFiling && hasPrior) warnings.push("Marked for substituted filing, but had a previous employer this year: not qualified (items 55–56 left blank).");
  else if (e.substitutedFiling && !settled) warnings.push(`Marked for substituted filing, but tax due (${(i24 / 100).toFixed(2)}) does not equal tax withheld (${(i28 / 100).toFixed(2)}): items 55–56 left blank.`);

  return {
    employeeId: e.id,
    year,
    periodFrom: period2316(e, year).from,
    periodTo: period2316(e, year).to,
    employee: {
      tin: tin14(e.tin, e.tinBranch),
      name,
      rdoCode: employer.rdoCode,
      address: e.address,
      zipCode: e.zipCode,
      foreignAddress: null,
      birthDate: e.birthDate,
      contactNumber: null,
    },
    mwe: { isMwe, dailyRate: isMwe ? e.mweDailyRate : null, monthlyRate: isMwe ? e.mweMonthlyRate : null },
    employer: { tin: tin14(employer.tin), name: employer.name, address: employer.registeredAddress, zipCode: employer.zipCode, type: "main" },
    previous: hasPrior ? { tin: tin14(prior!.tin), name: prior!.name, address: prior!.address, zipCode: prior!.zipCode } : null,
    summary: [
      line("19", "Gross Compensation Income from Present Employer (Sum of Items 38 and 52)"),
      line("20", "Less: Total Non-Taxable/Exempt Compensation Income from Present Employer (From Item 38)"),
      line("21", "Taxable Compensation Income from Present Employer (Item 19 Less Item 20) (From Item 52)"),
      line("22", "Add: Taxable Compensation Income from Previous Employer, if applicable"),
      line("23", "Gross Taxable Compensation Income (Sum of Items 21 and 22)"),
      line("24", "Tax Due", true),
      line("25A", "Amount of Taxes Withheld — Present Employer"),
      line("25B", "Amount of Taxes Withheld — Previous Employer, if applicable"),
      line("26", "Total Amount of Taxes Withheld as adjusted (Sum of Items 25A and 25B)"),
      line("27", "5% Tax Credit (PERA Act of 2008)"),
      line("28", "Total Taxes Withheld (Sum of Items 26 and 27)", true),
    ],
    nonTaxable: [
      line("29", "Basic Salary (including the exempt P250,000 & below) or the Statutory Minimum Wage of the MWE"),
      line("30", "Holiday Pay (MWE)"),
      line("31", "Overtime Pay (MWE)"),
      line("32", "Night Shift Differential (MWE)"),
      line("33", "Hazard Pay (MWE)"),
      line("34", "13th Month Pay and Other Benefits (maximum of P90,000)"),
      line("35", "De Minimis Benefits"),
      line("36", "SSS, GSIS, PHIC & PAG-IBIG Contributions and Union Dues (Employee share only)"),
      line("37", "Salaries and Other Forms of Compensation"),
      line("38", "Total Non-Taxable/Exempt Compensation Income (Sum of Items 29 to 37)", true),
    ],
    taxableRegular: [
      line("39", "Basic Salary"),
      line("40", "Representation"),
      line("41", "Transportation"),
      line("42", "Cost of Living Allowance (COLA)"),
      line("43", "Fixed Housing Allowance"),
      { no: "44", label: "Others (specify)", amount: null, heading: true },
      line("44A", i44a ? "Other taxable compensation" : ""),
      line("44B", ""),
    ],
    taxableSupplementary: [
      line("45", "Commission"),
      line("46", "Profit Sharing"),
      line("47", "Fees Including Director's Fees"),
      line("48", "Taxable 13th Month Benefits"),
      line("49", "Hazard Pay"),
      line("50", "Overtime Pay"),
      { no: "51", label: "Others (specify)", amount: null, heading: true },
      line("51A", i51a ? "Holiday pay / night shift differential" : ""),
      line("51B", ""),
      line("52", "Total Taxable Compensation Income (Sum of Items 39 to 51B)", true),
    ],
    amounts,
    substitutedFiling,
    signatory,
    employeeName: name,
    warnings,
  };
}

/** Employees with compensation in the year (as on the alphalist: gross compensation not zero). */
export function paidInYear(years: EmployeeYear[]): EmployeeYear[] {
  return years.filter((y) => y.lines.some((l) => l.hasEntry) && y.lines.reduce((a, l) => a + l.l14, 0) !== 0);
}

/** What public.payroll_2316_data() returns (migration 20261123000018_payroll_2316.sql). */
export interface Payroll2316Raw {
  client: { id: string; name: string; tin: string | null; rdo_code: string | null; registered_address: string | null } | null;
  settings: { employer_zip_code: string | null; signatory_name: string | null; signatory_title: string | null } | null;
  release: { released_at: string } | null;
  employees: Record<string, unknown>[];
  items: Record<string, unknown>[];
  entries: Record<string, unknown>[];
  prior_employers: Record<string, unknown>[];
}

export interface Certificates2316 {
  clientName: string;
  releasedAt: string | null;
  forms: Form2316Data[];
}

/**
 * Every employee's 2316 for the year (those with compensation), from
 * payroll_2316_data(), sorted by name; `employeeId` limits it to one employee.
 */
export function certificatesFromRaw(raw: Payroll2316Raw, year: number, employeeId?: string): Certificates2316 {
  const items = raw.items.map(itemFromRow);
  const ctx: PayrollContext = {
    year,
    throughMonth: 12,
    employees: raw.employees.map(employeeFromRow),
    entries: toEntries(storedMonthsFromRows(raw.entries), items),
    priorEmployers: raw.prior_employers.map(priorEmployerFromRow),
  };
  const employer: Form2316Employer = {
    name: raw.client?.name ?? "",
    tin: raw.client?.tin ?? null,
    rdoCode: raw.client?.rdo_code ?? null,
    registeredAddress: raw.client?.registered_address ?? null,
    zipCode: raw.settings?.employer_zip_code ?? null,
  };
  const signatory: Form2316Signatory = { name: raw.settings?.signatory_name ?? null, title: raw.settings?.signatory_title ?? null };
  const forms = paidInYear(buildYear(ctx))
    .filter((y) => !employeeId || y.employee.id === employeeId)
    .map((y) => form2316(y, year, employer, signatory));
  return { clientName: employer.name, releasedAt: raw.release?.released_at ?? null, forms };
}
