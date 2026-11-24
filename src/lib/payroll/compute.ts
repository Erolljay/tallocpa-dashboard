/**
 * Withholding tax on compensation, per employee per month, and the year-end
 * annualization. Ported from taxify.ph helpers/payroll-helpers.js
 * (`computeEmployee1601C`, `computeAnnualTax`): same 1601-C item numbers, same
 * MWE exemptions, the same cumulative 13th-month ceiling. Rates come from the
 * effective-dated table shared with the return worksheets (src/lib/returns/tax-rates.ts,
 * a port of taxify shared/tax-rates.js + tax-rates-data.json).
 */
import { roundHalfAway } from "@/lib/returns/money";
import { graduatedTax, incomeTaxTable, thirteenthMonthCap } from "@/lib/returns/tax-rates";
import type { Centavos } from "@/lib/returns/types";
import type { Employee, PayAmounts } from "./types";

/** taxify `dateForYear`: rates for a calendar-year computation are those in force on 31 December. */
export const dateForYear = (year: number) => `${year}-12-31`;

/** One employee's 1601-C Part II figures for one month (taxify computeEmployee1601C output). */
export interface MonthLines {
  /** 14 Total amount of compensation (all earnings; employer contributions excluded). */
  l14: Centavos;
  /** 15 Statutory minimum wage (MWE only), net of the employee's SSS/PhilHealth/Pag-IBIG. */
  l15: Centavos;
  /** 16 Holiday, overtime, night-shift differential and hazard pay (MWE only). */
  l16: Centavos;
  /** 17 13th month pay and other benefits, up to what is left of the yearly ceiling. */
  l17: Centavos;
  /** 18 De minimis benefits. */
  l18: Centavos;
  /** 19 SSS, GSIS, PhilHealth, Pag-IBIG contributions and union dues (employee share). */
  l19: Centavos;
  /** 20 Other non-taxable compensation. */
  l20: Centavos;
  /** 21 Total non-taxable compensation (15 to 20). */
  l21: Centavos;
  /** 22 Total taxable compensation (14 less 21). */
  l22: Centavos;
  /** 23 Taxable compensation not subject to withholding (non-MWEs with no tax withheld this month). */
  l23: Centavos;
  /** 24 Net taxable compensation (22 less 23). */
  l24: Centavos;
  /** 25 Total taxes withheld (as entered on the payroll). */
  l25: Centavos;
  /** 26 Adjustment of taxes withheld from previous months (the entry's adjustment). */
  l26: Centavos;
  /** 13th month pay and other benefits over the ceiling (taxable; 2316 item 48). */
  thirteenthExcess: Centavos;
  /** Whether the employee has a payroll entry for the month. */
  hasEntry: boolean;
}

const ZERO_LINES: MonthLines = { l14: 0, l15: 0, l16: 0, l17: 0, l18: 0, l19: 0, l20: 0, l21: 0, l22: 0, l23: 0, l24: 0, l25: 0, l26: 0, thirteenthExcess: 0, hasEntry: false };

/** Line 14: every earning category (taxify: all PH_CAT earnings; employee deductions and employer contributions excluded). */
export function grossCompensation(a: PayAmounts): Centavos {
  return (
    a.basic + a.overtime + a.holidayPay + a.nightDifferential + a.hazardPay + a.thirteenthMonth + a.deMinimis +
    a.otherTaxable + a.separation + a.commission + a.profitShare + a.directorFee
  );
}

export const employeeContributions = (a: PayAmounts): Centavos => a.sssEmployee + a.philhealthEmployee + a.pagibigEmployee;

/**
 * taxify computeEmployee1601C: the twelve months of one employee's year.
 * `months[m]` is the employee's pay for month m (0 = January), or null.
 * The 13th-month ceiling (₱90,000 since 2018) is cumulative over the year.
 */
export function computeEmployeeYear(months: (PayAmounts | null)[], isMwe: boolean, year: number): MonthLines[] {
  const cap = thirteenthMonthCap(dateForYear(year));
  let thirteenthYtd = 0;
  const out: MonthLines[] = [];
  for (let m = 0; m < 12; m++) {
    const b = months[m];
    if (!b) {
      out.push({ ...ZERO_LINES });
      continue;
    }
    const l14 = grossCompensation(b);
    // Contributions first: an MWE's basic pay is reported net of them (item 15), so the same peso is not exempted twice.
    const l19 = employeeContributions(b);
    const l15 = isMwe ? Math.max(0, b.basic - l19) : 0;
    const l16 = isMwe ? b.overtime + b.holidayPay + b.nightDifferential + b.hazardPay : 0;
    const remainingCap = Math.max(0, cap - thirteenthYtd);
    const l17 = Math.min(b.thirteenthMonth, remainingCap);
    const thirteenthExcess = b.thirteenthMonth - l17;
    thirteenthYtd += l17;
    const l18 = b.deMinimis;
    // taxify: separation / retirement pay is the only "other non-taxable" category (PH_CAT.SEPARATION).
    const l20 = b.separation;
    const l21 = l15 + l16 + l17 + l18 + l19 + l20;
    const l22 = l14 - l21;
    // taxify: a non-MWE with taxable pay but nothing withheld this month goes to item 23 (tax due is zero).
    const l23 = !isMwe && l22 > 0 && b.taxWithheld <= 0 ? l22 : 0;
    const l24 = l22 - l23;
    out.push({ l14, l15, l16, l17, l18, l19, l20, l21, l22, l23, l24, l25: b.taxWithheld, l26: b.adjustment, thirteenthExcess, hasEntry: true });
  }
  return out;
}

/** taxify computeAnnualTax: graduated income tax on a year's taxable compensation. */
export function annualTax(taxable: Centavos, year: number): Centavos {
  return graduatedTax(taxable, dateForYear(year));
}

/**
 * The BIR monthly withholding table derived from the annual table in force on
 * `onDate`: each bracket's bound is the annual bound ÷ 12 rounded to the peso,
 * and the fixed tax of each bracket adds up the brackets below it. For 2023
 * onward this gives the published table exactly (₱20,833 / 33,333 / 66,667 /
 * 166,667 / 666,667; ₱1,875 / 8,541.80 / 33,541.80 / 183,541.80).
 */
export function monthlyTable(onDate: string): { from: Centavos; to: Centavos; rate: number; fixed: Centavos }[] {
  let from = 0;
  let fixed = 0;
  return incomeTaxTable(onDate).map((b) => {
    const to = b.to === Infinity ? Infinity : Math.round(b.to / 100 / 12) * 100;
    const row = { from, to, rate: b.rate, fixed };
    if (to !== Infinity) fixed += roundHalfAway((to - from) * b.rate);
    from = to;
    return row;
  });
}

/** Tax to withhold on a month's taxable compensation under the monthly table. */
export function monthlyWithholding(taxable: Centavos, onDate: string): Centavos {
  const t = Math.max(0, taxable);
  const table = monthlyTable(onDate);
  const b = table.find((x) => t >= x.from && t <= x.to) ?? table[table.length - 1];
  return b.fixed + roundHalfAway((t - b.from) * b.rate);
}

export interface Suggestion {
  /** "monthly": the monthly table on this month's taxable pay; "annualized": year-end (December or separation) adjustment. */
  method: "monthly" | "annualized";
  /** Net tax for the month: tax withheld plus adjustment. Negative when the employee is owed a refund. */
  net: Centavos;
  /** Annualized only: tax due on the year's taxable compensation to date, and what was withheld before this month. */
  annualTaxDue?: Centavos;
  withheldBefore?: Centavos;
}

/** True if the employee was separated during month m (0-based) of `year`. */
export function separatedInMonth(e: Pick<Employee, "separationDate">, year: number, m: number): boolean {
  return !!e.separationDate && e.separationDate.slice(0, 7) === `${year}-${String(m + 1).padStart(2, "0")}`;
}

/**
 * Suggested tax to withhold for month m. January–November: the monthly table on
 * the month's taxable compensation (item 22). December, or the month the
 * employee leaves: the year-end adjustment — tax due on the year's taxable
 * compensation so far, less everything withheld in earlier months (tax withheld
 * plus adjustments). A negative result is a refund of over-withholding.
 */
export function suggestWithholding(e: Pick<Employee, "separationDate">, lines: MonthLines[], m: number, year: number, prior?: PriorAmounts | null): Suggestion {
  if (m === 11 || separatedInMonth(e, year, m)) {
    // RR 2-98 sec. 2.79(B)(5): the year-end adjustment covers compensation from a previous employer within the year,
    // and credits the tax it withheld.
    let taxable = prior?.taxable ?? 0;
    let before = prior?.withheld ?? 0;
    for (let i = 0; i <= m; i++) taxable += lines[i].l22;
    for (let i = 0; i < m; i++) before += lines[i].l25 + lines[i].l26;
    const due = annualTax(taxable, year);
    return { method: "annualized", net: due - before, annualTaxDue: due, withheldBefore: before };
  }
  return { method: "monthly", net: monthlyWithholding(lines[m].l22, `${year}-${String(m + 1).padStart(2, "0")}-01`) };
}

/** Entered tax for the month in the same terms as a suggestion: tax withheld plus adjustment. */
export const enteredNet = (l: MonthLines) => l.l25 + l.l26;

/** More than ₱1 apart: worth a warning. */
export const differsFromSuggestion = (l: MonthLines, s: Suggestion) => Math.abs(enteredNet(l) - s.net) > 100;

/** What a previous employer within the year paid and withheld (PriorEmployer's amounts). */
export interface PriorAmounts {
  taxable: Centavos;
  nonTaxable: Centavos;
  withheld: Centavos;
}

/** One employee's year, for the alphalist and the 2316 (taxify generateAlphalist / render2316Cert totals). */
export interface AnnualSummary {
  /** Present employer: gross, non-taxable and taxable compensation. */
  gross: Centavos;
  nonTaxable: Centavos;
  taxable: Centavos;
  /** Previous employer within the year (zero when none): taxable compensation and tax withheld. */
  priorTaxable: Centavos;
  priorWithheld: Centavos;
  /** Tax due on the year's taxable compensation from both employers (2316 item 24, alphalist 14). */
  taxDue: Centavos;
  /** Tax withheld by the present employer: items 25 plus adjustments (26). */
  withheld: Centavos;
  /** Tax due not withheld by either employer (alphalist 17a: to be withheld / paid by the employee). */
  under: Centavos;
  /** Withheld by both over tax due (alphalist 17b: to be refunded to the employee). */
  over: Centavos;
}

export function annualSummary(lines: MonthLines[], year: number, prior?: PriorAmounts | null): AnnualSummary {
  const sum = (k: keyof MonthLines) => lines.reduce((a, l) => a + (l[k] as number), 0);
  const gross = sum("l14");
  const nonTaxable = sum("l21");
  const taxable = sum("l22");
  const priorTaxable = prior?.taxable ?? 0;
  const priorWithheld = prior?.withheld ?? 0;
  const taxDue = annualTax(taxable + priorTaxable, year);
  const withheld = sum("l25") + sum("l26");
  const credited = withheld + priorWithheld;
  return { gross, nonTaxable, taxable, priorTaxable, priorWithheld, taxDue, withheld, under: Math.max(0, taxDue - credited), over: Math.max(0, credited - taxDue) };
}
