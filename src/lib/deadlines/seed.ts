/**
 * Starting deadline rules and holidays.
 *
 * ⚠️ UNVERIFIED (spec open item O3): every rule and holiday here is a starting
 * figure. Each must be checked against current BIR issuances and the 2027
 * holiday proclamation before the deadline engine goes live. Rules carry
 * `source: "UNVERIFIED"` until a person checks them and records the issuance.
 */
import type { DeadlineRule } from "./engine";

const FROM = "2026-01-01";
const UNVERIFIED = "UNVERIFIED";

export const seedDeadlineRules: DeadlineRule[] = [
  // Monthly withholding remittance, first two months of each quarter.
  { id: "0619E-ebir", form: "0619-E", frequency: "monthly", periodFilter: "exclude_quarter_end_months", channel: "ebirforms", due: { kind: "day_of_month_after", monthsAfter: 1, day: 10 }, effectiveFrom: FROM, source: UNVERIFIED },
  // Monthly compensation withholding.
  { id: "1601C-ebir", form: "1601-C", frequency: "monthly", periodFilter: "all", channel: "ebirforms", due: { kind: "day_of_month_after", monthsAfter: 1, day: 10 }, effectiveFrom: FROM, source: UNVERIFIED },
  // eFPS filers file in staggered groups (Group A last, Group E first).
  ...(["A", "B", "C", "D", "E"] as const).flatMap((group, i): DeadlineRule[] => [
    { id: `0619E-efps-${group}`, form: "0619-E", frequency: "monthly", periodFilter: "exclude_quarter_end_months", channel: "efps", efpsGroup: group, due: { kind: "day_of_month_after", monthsAfter: 1, day: 15 - i }, effectiveFrom: FROM, source: UNVERIFIED },
    { id: `1601C-efps-${group}`, form: "1601-C", frequency: "monthly", periodFilter: "all", channel: "efps", efpsGroup: group, due: { kind: "day_of_month_after", monthsAfter: 1, day: 15 - i }, effectiveFrom: FROM, source: UNVERIFIED },
  ]),
  // Quarterly.
  { id: "1601EQ", form: "1601-EQ", frequency: "quarterly", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: "last" }, effectiveFrom: FROM, source: UNVERIFIED },
  { id: "2550Q", form: "2550Q", frequency: "quarterly", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: 25 }, effectiveFrom: FROM, source: UNVERIFIED },
  { id: "2551Q", form: "2551Q", frequency: "quarterly", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: 25 }, effectiveFrom: FROM, source: UNVERIFIED },
  // 1701Q: 15 May, 15 Aug, 15 Nov for calendar-year filers = 15th of the 2nd month after the quarter.
  { id: "1701Q", form: "1701Q", frequency: "quarterly", periodFilter: "exclude_last_quarter", due: { kind: "day_of_month_after", monthsAfter: 2, day: 15 }, effectiveFrom: FROM, source: UNVERIFIED },
  { id: "1702Q", form: "1702Q", frequency: "quarterly", periodFilter: "exclude_last_quarter", due: { kind: "days_after", days: 60 }, effectiveFrom: FROM, source: UNVERIFIED },
  // Annual: 15th day of the 4th month after the taxable year ends.
  { id: "1701", form: "1701", frequency: "annual", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 4, day: 15 }, effectiveFrom: FROM, source: UNVERIFIED },
  { id: "1701A", form: "1701A", frequency: "annual", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 4, day: 15 }, effectiveFrom: FROM, source: UNVERIFIED },
  { id: "1702RT", form: "1702-RT", frequency: "annual", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 4, day: 15 }, effectiveFrom: FROM, source: UNVERIFIED },
  // Annual information returns (calendar year).
  { id: "1604C", form: "1604-C", frequency: "annual", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: "last" }, effectiveFrom: FROM, source: UNVERIFIED },
  { id: "1604E", form: "1604-E", frequency: "annual", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 3, day: 1 }, effectiveFrom: FROM, source: UNVERIFIED },
  { id: "INVLIST", form: "Inventory List", frequency: "annual", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: 30 }, effectiveFrom: FROM, source: UNVERIFIED },
];

/** 2027 non-working days. ⚠️ Verify against the 2027 holiday proclamation. */
export const seedHolidays2027: { date: string; name: string; kind: "regular" | "special" }[] = [
  { date: "2027-01-01", name: "New Year's Day", kind: "regular" },
  { date: "2027-02-06", name: "Chinese New Year", kind: "special" },
  { date: "2027-03-25", name: "Maundy Thursday", kind: "regular" },
  { date: "2027-03-26", name: "Good Friday", kind: "regular" },
  { date: "2027-03-27", name: "Black Saturday", kind: "special" },
  { date: "2027-04-09", name: "Araw ng Kagitingan", kind: "regular" },
  { date: "2027-05-01", name: "Labor Day", kind: "regular" },
  { date: "2027-06-12", name: "Independence Day", kind: "regular" },
  { date: "2027-08-21", name: "Ninoy Aquino Day", kind: "special" },
  { date: "2027-08-30", name: "National Heroes Day", kind: "regular" },
  { date: "2027-11-01", name: "All Saints' Day", kind: "special" },
  { date: "2027-11-02", name: "All Souls' Day", kind: "special" },
  { date: "2027-11-30", name: "Bonifacio Day", kind: "regular" },
  { date: "2027-12-08", name: "Feast of the Immaculate Conception", kind: "special" },
  { date: "2027-12-24", name: "Christmas Eve", kind: "special" },
  { date: "2027-12-25", name: "Christmas Day", kind: "regular" },
  { date: "2027-12-30", name: "Rizal Day", kind: "regular" },
  { date: "2027-12-31", name: "Last Day of the Year", kind: "special" },
];
