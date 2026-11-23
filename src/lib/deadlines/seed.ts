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
  // Every deadline applies to all clients whatever their filing channel. The firm
  // follows the manual (eBIRForms) due dates, not the staggered eFPS group dates.
  // Monthly withholding remittance, first two months of each quarter.
  { id: "0619E", calendarYear: true, form: "0619-E", frequency: "monthly", periodFilter: "exclude_quarter_end_months", due: { kind: "day_of_month_after", monthsAfter: 1, day: 10 }, effectiveFrom: FROM, source: UNVERIFIED },
  // Monthly compensation withholding.
  { id: "1601C", calendarYear: true, form: "1601-C", frequency: "monthly", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: 10 }, effectiveFrom: FROM, source: UNVERIFIED },
  // Quarterly.
  { id: "1601EQ", calendarYear: true, form: "1601-EQ", frequency: "quarterly", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: "last" }, effectiveFrom: FROM, source: UNVERIFIED },
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
  { id: "1604C", calendarYear: true, form: "1604-C", frequency: "annual", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: "last" }, effectiveFrom: FROM, source: UNVERIFIED },
  { id: "1604E", calendarYear: true, form: "1604-E", frequency: "annual", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 3, day: 1 }, effectiveFrom: FROM, source: UNVERIFIED },
  { id: "INVLIST", form: "Inventory List", frequency: "annual", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: 30 }, effectiveFrom: FROM, source: UNVERIFIED },
];

type SeedHoliday = { date: string; name: string; kind: "regular" | "special" };

/**
 * 2026 non-working days (Proclamation No. 1006, s. 2025). ⚠️ Verify against the
 * proclamation. Eid'l Fitr and Eid'l Adha are declared separately each year and
 * are not listed here; add them as they are proclaimed.
 */
export const seedHolidays2026: SeedHoliday[] = [
  { date: "2026-01-01", name: "New Year's Day", kind: "regular" },
  { date: "2026-02-17", name: "Chinese New Year", kind: "special" },
  { date: "2026-04-02", name: "Maundy Thursday", kind: "regular" },
  { date: "2026-04-03", name: "Good Friday", kind: "regular" },
  { date: "2026-04-04", name: "Black Saturday", kind: "special" },
  { date: "2026-04-09", name: "Araw ng Kagitingan", kind: "regular" },
  { date: "2026-05-01", name: "Labor Day", kind: "regular" },
  { date: "2026-06-12", name: "Independence Day", kind: "regular" },
  { date: "2026-08-21", name: "Ninoy Aquino Day", kind: "special" },
  { date: "2026-08-31", name: "National Heroes Day", kind: "regular" },
  { date: "2026-11-01", name: "All Saints' Day", kind: "special" },
  { date: "2026-11-02", name: "All Souls' Day", kind: "special" },
  { date: "2026-11-30", name: "Bonifacio Day", kind: "regular" },
  { date: "2026-12-08", name: "Feast of the Immaculate Conception", kind: "special" },
  { date: "2026-12-24", name: "Christmas Eve", kind: "special" },
  { date: "2026-12-25", name: "Christmas Day", kind: "regular" },
  { date: "2026-12-30", name: "Rizal Day", kind: "regular" },
  { date: "2026-12-31", name: "Last Day of the Year", kind: "special" },
];

/** 2027 non-working days. ⚠️ Verify against the 2027 holiday proclamation. */
export const seedHolidays2027: SeedHoliday[] = [
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

/** Every seeded holiday, oldest first. */
export const seedHolidays: SeedHoliday[] = [...seedHolidays2026, ...seedHolidays2027];
