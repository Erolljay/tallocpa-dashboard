/**
 * BIR deadline engine.
 *
 * Deadline rules are data (spec §3.3, decision Q20): each rule says how to get a
 * due date from the end of a period. This module only does the arithmetic:
 *   1. split a client's year into periods (monthly / quarterly / annual),
 *   2. pick the rule in force for the period, the filing channel and eFPS group,
 *   3. compute the statutory due date,
 *   4. move it to the next working day if it falls on a weekend or holiday.
 */
import {
  addDays,
  addMonths,
  compareIso,
  isWeekend,
  lastDayOfMonth,
  ymd,
  type IsoDate,
} from "./dates";

export type Frequency = "monthly" | "quarterly" | "annual";
export type FilingChannel = "efps" | "ebirforms";
export type EfpsGroup = "A" | "B" | "C" | "D" | "E";

/** How the due date is found from the period's last day. */
export type DueRule =
  /** Day `day` of the month that is `monthsAfter` months after the period's last month. `day: "last"` = last day of that month. */
  | { kind: "day_of_month_after"; monthsAfter: number; day: number | "last" }
  /** A fixed number of days after the period's last day. */
  | { kind: "days_after"; days: number };

/**
 * Which periods of the year the rule covers.
 *
 * `exclude_quarter_end_months` and `exclude_last_quarter` say the form is not
 * filed at all for the other periods. `exclude_year_end_month` and
 * `year_end_month_only` split a form between two rules: the form is filed for
 * every period, and the period ending in the year's last month takes the other
 * rule's due date (e.g. December's 1601-C, due 15 January).
 */
export type PeriodFilter =
  | "all"
  /** Monthly forms filed only for the first two months of each quarter (e.g. 0619-E). */
  | "exclude_quarter_end_months"
  /** Quarterly forms filed only for the first three quarters (e.g. 1701Q, 1702Q). */
  | "exclude_last_quarter"
  /** Every period except the one ending in the year's last month, which another rule covers. */
  | "exclude_year_end_month"
  /** Only the period ending in the year's last month (e.g. December's 1601-C). */
  | "year_end_month_only";

/** Filters that hand the periods they leave out to another rule, rather than skip them. */
const SPLIT_FILTERS: ReadonlySet<PeriodFilter> = new Set(["exclude_year_end_month", "year_end_month_only"]);

export interface DeadlineRule {
  id: string;
  form: string;
  frequency: Frequency;
  periodFilter: PeriodFilter;
  due: DueRule;
  /** Applies to this channel only; omitted = every channel. */
  channel?: FilingChannel;
  /** Applies to this eFPS group only; omitted = every group. */
  efpsGroup?: EfpsGroup;
  /** First period end date the rule applies to (inclusive). */
  effectiveFrom: IsoDate;
  /** Last period end date the rule applies to (inclusive); omitted = still in force. */
  effectiveTo?: IsoDate;
  /** BIR issuance the rule comes from, e.g. "RR 8-2024". */
  source?: string;
  /**
   * The form follows the calendar year whatever the client's taxable year
   * (withholding returns such as 1601-EQ, 1604-C, 1604-E). Omitted = the
   * client's taxable year.
   */
  calendarYear?: boolean;
}

export interface Period {
  frequency: Frequency;
  start: IsoDate;
  end: IsoDate;
  /** e.g. "2027-01", "FY2027-Q1", "FY2027". */
  label: string;
}

export interface Obligation {
  clientId: string;
  form: string;
  frequency: Frequency;
  /** First day the client must file this form (registration date). */
  startDate: IsoDate;
  /** Last day the obligation applies (de-registration); omitted = open. */
  endDate?: IsoDate;
  channel: FilingChannel;
  efpsGroup?: EfpsGroup;
  /** Month the client's taxable year ends, 1–12. Calendar year = 12. */
  fiscalYearEndMonth: number;
}

export interface FilingInstance {
  clientId: string;
  form: string;
  period: Period;
  ruleId: string;
  /** Due date as written in the rule. */
  statutoryDueDate: IsoDate;
  /** Due date after moving off weekends and holidays. */
  dueDate: IsoDate;
}

/** Moves a date forward to the next day that is neither a weekend nor a holiday. */
export function nextWorkingDay(date: IsoDate, holidays: ReadonlySet<IsoDate>): IsoDate {
  let d = date;
  while (isWeekend(d) || holidays.has(d)) d = addDays(d, 1);
  return d;
}

/** Statutory due date for a period, before weekend/holiday adjustment. */
export function statutoryDueDate(due: DueRule, periodEnd: IsoDate): IsoDate {
  if (due.kind === "days_after") return addDays(periodEnd, due.days);
  const [y, m] = periodEnd.split("-").map(Number);
  const target = addMonths(y, m, due.monthsAfter);
  const last = lastDayOfMonth(target.year, target.month);
  const day = due.day === "last" ? last : Math.min(due.day, last);
  return ymd(target.year, target.month, day);
}

/**
 * Periods of the given frequency that overlap [from, to], aligned to the
 * client's fiscal year end. Quarter and year labels use the fiscal year in
 * which the period ends.
 */
export function periodsBetween(
  frequency: Frequency,
  fiscalYearEndMonth: number,
  from: IsoDate,
  to: IsoDate,
): Period[] {
  if (fiscalYearEndMonth < 1 || fiscalYearEndMonth > 12) {
    throw new Error(`fiscalYearEndMonth must be 1–12, got ${fiscalYearEndMonth}`);
  }
  const months = frequency === "monthly" ? 1 : frequency === "quarterly" ? 3 : 12;
  const fromYear = Number(from.slice(0, 4));
  // A fiscal year end is a period end for every frequency, so start two years back and step forward.
  let end = { year: fromYear - 2, month: fiscalYearEndMonth };
  const periods: Period[] = [];
  for (let guard = 0; guard < 2000; guard++) {
    const startYm = addMonths(end.year, end.month, -(months - 1));
    const start = ymd(startYm.year, startYm.month, 1);
    const endDate = ymd(end.year, end.month, lastDayOfMonth(end.year, end.month));
    if (compareIso(start, to) > 0) break;
    if (compareIso(endDate, from) >= 0) {
      periods.push({ frequency, start, end: endDate, label: periodLabel(frequency, end, fiscalYearEndMonth) });
    }
    end = addMonths(end.year, end.month, months);
  }
  return periods;
}

function fiscalYearOf(end: { year: number; month: number }, fiscalYearEndMonth: number): number {
  return end.month <= fiscalYearEndMonth ? end.year : end.year + 1;
}

function quarterOf(end: { month: number }, fiscalYearEndMonth: number): number {
  const monthsAfterFyEnd = (end.month - fiscalYearEndMonth + 12) % 12; // 0 for the year-end month
  return monthsAfterFyEnd === 0 ? 4 : Math.ceil(monthsAfterFyEnd / 3);
}

function periodLabel(frequency: Frequency, end: { year: number; month: number }, fyeMonth: number): string {
  if (frequency === "monthly") return `${end.year}-${String(end.month).padStart(2, "0")}`;
  const fy = fiscalYearOf(end, fyeMonth);
  return frequency === "quarterly" ? `FY${fy}-Q${quarterOf(end, fyeMonth)}` : `FY${fy}`;
}

/** Is the period one the form is filed for? */
export function periodApplies(filter: PeriodFilter, period: Period, fiscalYearEndMonth: number): boolean {
  if (filter === "all") return true;
  const month = Number(period.end.slice(5, 7));
  if (filter === "exclude_year_end_month") return month !== fiscalYearEndMonth;
  if (filter === "year_end_month_only") return month === fiscalYearEndMonth;
  if (filter === "exclude_quarter_end_months") {
    return (month - fiscalYearEndMonth + 12) % 3 !== 0;
  }
  return quarterOf({ month }, fiscalYearEndMonth) !== 4;
}

/**
 * The rule in force for a period. The most specific match wins:
 * channel + eFPS group > channel > any channel. Two equally specific rules in
 * force for the same period is a data error. A rule whose split filter
 * (`exclude_year_end_month`, `year_end_month_only`) leaves the period out is not
 * in force for it; `yearEndMonth` is the month the form's year ends
 * (see `formYearEndMonth`).
 */
export function selectRule(
  rules: readonly DeadlineRule[],
  form: string,
  frequency: Frequency,
  period: Period,
  yearEndMonth: number,
  channel: FilingChannel,
  efpsGroup?: EfpsGroup,
): DeadlineRule | undefined {
  const candidates = rules.filter(
    (r) =>
      r.form === form &&
      r.frequency === frequency &&
      (!SPLIT_FILTERS.has(r.periodFilter) || periodApplies(r.periodFilter, period, yearEndMonth)) &&
      compareIso(r.effectiveFrom, period.end) <= 0 &&
      (r.effectiveTo === undefined || compareIso(period.end, r.effectiveTo) <= 0) &&
      (r.channel === undefined || r.channel === channel) &&
      (r.efpsGroup === undefined || (channel === "efps" && r.efpsGroup === efpsGroup)),
  );
  const score = (r: DeadlineRule) => (r.channel ? 1 : 0) + (r.efpsGroup ? 1 : 0);
  candidates.sort((a, b) => score(b) - score(a));
  if (candidates.length > 1 && score(candidates[0]) === score(candidates[1])) {
    throw new Error(
      `Conflicting deadline rules for ${form} ${period.label}: ${candidates[0].id} and ${candidates[1].id}`,
    );
  }
  return candidates[0];
}

/** Does the form follow the calendar year? True when any of its rules says so. */
export function followsCalendarYear(rules: readonly DeadlineRule[], form: string, frequency: Frequency): boolean {
  return rules.some((r) => r.form === form && r.frequency === frequency && r.calendarYear);
}

/** The month the form's year ends for a client: 12 for calendar-year forms, else the client's taxable year end. */
export function formYearEndMonth(rules: readonly DeadlineRule[], form: string, frequency: Frequency, fiscalYearEndMonth: number): number {
  return followsCalendarYear(rules, form, frequency) ? 12 : fiscalYearEndMonth;
}

/**
 * Filing instances whose period overlaps the obligation and whose due date falls
 * in [from, to]. Periods with no rule in force are reported in `missingRules`
 * so a gap in the rule table is never silently skipped.
 */
export function generateFilingInstances(
  obligations: readonly Obligation[],
  rules: readonly DeadlineRule[],
  holidays: ReadonlySet<IsoDate>,
  from: IsoDate,
  to: IsoDate,
): { instances: FilingInstance[]; missingRules: { clientId: string; form: string; period: Period }[] } {
  const instances: FilingInstance[] = [];
  const missingRules: { clientId: string; form: string; period: Period }[] = [];
  // Look back far enough that periods whose due date falls in the window are included.
  const lookback = addDays(from, -400);
  for (const ob of obligations) {
    const yearEndMonth = formYearEndMonth(rules, ob.form, ob.frequency, ob.fiscalYearEndMonth);
    const periods = periodsBetween(ob.frequency, yearEndMonth, lookback, to);
    for (const period of periods) {
      if (compareIso(period.end, ob.startDate) < 0) continue;
      if (ob.endDate && compareIso(period.start, ob.endDate) > 0) continue;
      const rule = selectRule(rules, ob.form, ob.frequency, period, yearEndMonth, ob.channel, ob.efpsGroup);
      if (!rule) {
        if (compareIso(period.end, to) <= 0 && compareIso(period.end, from) >= 0) {
          missingRules.push({ clientId: ob.clientId, form: ob.form, period });
        }
        continue;
      }
      if (!periodApplies(rule.periodFilter, period, yearEndMonth)) continue;
      const statutory = statutoryDueDate(rule.due, period.end);
      const dueDate = nextWorkingDay(statutory, holidays);
      if (compareIso(dueDate, from) < 0 || compareIso(dueDate, to) > 0) continue;
      instances.push({ clientId: ob.clientId, form: ob.form, period, ruleId: rule.id, statutoryDueDate: statutory, dueDate });
    }
  }
  instances.sort((a, b) => compareIso(a.dueDate, b.dueDate) || a.clientId.localeCompare(b.clientId) || a.form.localeCompare(b.form));
  return { instances, missingRules };
}
