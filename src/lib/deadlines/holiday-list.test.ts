import { describe, expect, it } from "vitest";
import { easterSunday, holidayYear, normalizeRdo, parseRdoList } from "./holiday-list";

describe("the standard holiday list", () => {
  it("knows Easter", () => {
    expect(easterSunday(2026)).toBe("2026-04-05");
    expect(easterSunday(2027)).toBe("2027-03-28");
    expect(easterSunday(2028)).toBe("2028-04-16");
  });

  it("suggests each year's dates, leaving proclaimed ones blank", () => {
    const y = Object.fromEntries(holidayYear(2027).map((r) => [r.key, r]));
    expect(y.new_year).toMatchObject({ date: "2027-01-01", include: true });
    expect(y.maundy_thursday.date).toBe("2027-03-25");
    expect(y.good_friday.date).toBe("2027-03-26");
    expect(y.black_saturday.date).toBe("2027-03-27");
    // The last Monday of August 2027 is the 30th.
    expect(y.national_heroes_day.date).toBe("2027-08-30");
    expect(y.eid_fitr).toMatchObject({ date: null, include: false, proclaimed: true });
    expect(y.chinese_new_year.date).toBeNull();
    // Not proclaimed every year: offered unticked.
    expect(y.all_souls).toMatchObject({ date: "2027-11-02", include: false });
    // 2026 matches the dates already loaded from Proclamation No. 1006.
    const z = Object.fromEntries(holidayYear(2026).map((r) => [r.key, r.date]));
    expect([z.maundy_thursday, z.good_friday, z.national_heroes_day]).toEqual(["2026-04-02", "2026-04-03", "2026-08-31"]);
  });

  it("reads RDO codes as typed", () => {
    expect(parseRdoList("074, 75;RDO 76  74")).toEqual(["74", "75", "76"]);
    expect(normalizeRdo("074")).toBe(normalizeRdo("74"));
  });
});
