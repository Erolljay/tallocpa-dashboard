/**
 * The Philippine holidays, as a list the Owner turns into a year's non-working days on the
 * Settings page (Owner, 26 November 2026). Each year the President proclaims the dates
 * (e.g. Proclamation No. 1006, s. 2025, for 2026); this list gives the usual ones:
 *
 *   fixed      the same date every year (New Year's Day, Independence Day, Christmas…);
 *   computed   from Easter (Holy Week) or the calendar (National Heroes Day, the last
 *              Monday of August), suggested and editable;
 *   proclaimed set each year by proclamation (Chinese New Year, Eid'l Fitr, Eid'l Adha):
 *              left blank to fill in once proclaimed.
 *
 * Local holidays (a city's or province's founding day, a local fiesta) are not here: the
 * Owner adds them with the RDOs they cover.
 */
export type HolidayKind = "regular" | "special";

export type HolidayRule =
  | { fixed: string } // "MM-DD"
  | { easter: number } // days from Easter Sunday
  | { lastMondayOf: number } // month 1-12
  | { proclaimed: true };

export interface StandardHoliday {
  key: string;
  name: string;
  kind: HolidayKind;
  rule: HolidayRule;
  /** Not proclaimed every year: offered unticked. */
  sometimes?: boolean;
}

export const STANDARD_HOLIDAYS: StandardHoliday[] = [
  { key: "new_year", name: "New Year's Day", kind: "regular", rule: { fixed: "01-01" } },
  { key: "chinese_new_year", name: "Chinese New Year", kind: "special", rule: { proclaimed: true } },
  { key: "edsa", name: "EDSA People Power Revolution Anniversary", kind: "special", rule: { fixed: "02-25" }, sometimes: true },
  { key: "maundy_thursday", name: "Maundy Thursday", kind: "regular", rule: { easter: -3 } },
  { key: "good_friday", name: "Good Friday", kind: "regular", rule: { easter: -2 } },
  { key: "black_saturday", name: "Black Saturday", kind: "special", rule: { easter: -1 } },
  { key: "araw_ng_kagitingan", name: "Araw ng Kagitingan", kind: "regular", rule: { fixed: "04-09" } },
  { key: "labor_day", name: "Labor Day", kind: "regular", rule: { fixed: "05-01" } },
  { key: "independence_day", name: "Independence Day", kind: "regular", rule: { fixed: "06-12" } },
  { key: "eid_fitr", name: "Eid'l Fitr", kind: "regular", rule: { proclaimed: true } },
  { key: "eid_adha", name: "Eid'l Adha", kind: "regular", rule: { proclaimed: true } },
  { key: "ninoy_aquino_day", name: "Ninoy Aquino Day", kind: "special", rule: { fixed: "08-21" } },
  { key: "national_heroes_day", name: "National Heroes Day", kind: "regular", rule: { lastMondayOf: 8 } },
  { key: "all_saints_eve", name: "All Saints' Day Eve", kind: "special", rule: { fixed: "10-31" }, sometimes: true },
  { key: "all_saints", name: "All Saints' Day", kind: "special", rule: { fixed: "11-01" } },
  { key: "all_souls", name: "All Souls' Day", kind: "special", rule: { fixed: "11-02" }, sometimes: true },
  { key: "bonifacio_day", name: "Bonifacio Day", kind: "regular", rule: { fixed: "11-30" } },
  { key: "immaculate_conception", name: "Feast of the Immaculate Conception", kind: "special", rule: { fixed: "12-08" } },
  { key: "christmas_eve", name: "Christmas Eve", kind: "special", rule: { fixed: "12-24" } },
  { key: "christmas", name: "Christmas Day", kind: "regular", rule: { fixed: "12-25" } },
  { key: "rizal_day", name: "Rizal Day", kind: "regular", rule: { fixed: "12-30" } },
  { key: "last_day", name: "Last Day of the Year", kind: "special", rule: { fixed: "12-31" } },
];

const iso = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10);

/** Easter Sunday (Gregorian), the anonymous algorithm. */
export function easterSunday(year: number): string {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return iso(year, month, day);
}

/** The suggested date of a holiday in `year`, or null when it is set by proclamation. */
export function suggestedDate(h: StandardHoliday, year: number): string | null {
  const r = h.rule;
  if ("fixed" in r) return `${year}-${r.fixed}`;
  if ("easter" in r) {
    const e = Date.parse(`${easterSunday(year)}T00:00:00Z`);
    return new Date(e + r.easter * 86_400_000).toISOString().slice(0, 10);
  }
  if ("lastMondayOf" in r) {
    const last = new Date(Date.UTC(year, r.lastMondayOf, 0));
    last.setUTCDate(last.getUTCDate() - ((last.getUTCDay() + 6) % 7));
    return last.toISOString().slice(0, 10);
  }
  return null;
}

export interface YearRow {
  key: string;
  name: string;
  kind: HolidayKind;
  date: string | null;
  /** Ticked by default: on the list every year and with a date. */
  include: boolean;
  proclaimed: boolean;
}

/** The standard list for a year, with suggested dates. */
export function holidayYear(year: number): YearRow[] {
  return STANDARD_HOLIDAYS.map((h) => {
    const date = suggestedDate(h, year);
    return { key: h.key, name: h.name, kind: h.kind, date, include: date != null && !h.sometimes, proclaimed: "proclaimed" in h.rule };
  });
}

/** "074, 75,RDO 76" → ["74", "75", "76"]: RDO codes compared without leading zeros. */
export function normalizeRdo(code: string | null | undefined): string {
  return (code ?? "").replace(/\D/g, "").replace(/^0+/, "");
}
export function parseRdoList(text: string): string[] {
  return [...new Set(text.split(/[,\s;]+/).map(normalizeRdo).filter(Boolean))];
}
