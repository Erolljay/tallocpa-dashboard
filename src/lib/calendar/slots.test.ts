import { describe, expect, it } from "vitest";
import { byDay, freeSlots, isFree, manilaDate, manilaInstant, type SlotRules } from "./slots";

const rules: SlotRules = { dayStart: 9, dayEnd: 12, minutes: 45, step: 30, noticeHours: 24, days: 3 };
// Wednesday 2 December 2026, 10:00 in Manila.
const now = manilaInstant("2026-12-02", 10);
const local = (iso: string) => `${manilaDate(iso)} ${new Date(Date.parse(iso) + 8 * 3_600_000).toISOString().slice(11, 16)}`;

describe("free slots", () => {
  it("offers working hours in Manila time, after the notice, skipping weekends", () => {
    const s = freeSlots(now, [], new Set(), rules).map((x) => local(x.start));
    // Thursday from 10:00 (24 hours' notice), Friday all morning; Saturday and Sunday skipped.
    expect(s).toEqual([
      "2026-12-03 10:00", "2026-12-03 10:30", "2026-12-03 11:00",
      "2026-12-04 09:00", "2026-12-04 09:30", "2026-12-04 10:00", "2026-12-04 10:30", "2026-12-04 11:00",
    ]);
    expect(manilaInstant("2026-12-04", 9)).toBe("2026-12-04T01:00:00.000Z");
  });

  it("leaves out busy times and holidays", () => {
    const busy = [{ start: manilaInstant("2026-12-04", 9, 45), end: manilaInstant("2026-12-04", 10, 30) }];
    const s = freeSlots(now, busy, new Set(["2026-12-03"]), rules).map((x) => local(x.start));
    // 9:00–9:45 only touches the meeting at 9:45, so it stays free.
    expect(s).toEqual(["2026-12-04 09:00", "2026-12-04 10:30", "2026-12-04 11:00"]);
  });

  it("checks a chosen slot again and groups by day", () => {
    const busy = [{ start: manilaInstant("2026-12-04", 9), end: manilaInstant("2026-12-04", 9, 30) }];
    expect(isFree(manilaInstant("2026-12-04", 9), now, busy, new Set(), rules)).toBeNull();
    expect(isFree(manilaInstant("2026-12-04", 10), now, busy, new Set(), rules)).toEqual({ start: manilaInstant("2026-12-04", 10), end: manilaInstant("2026-12-04", 10, 45) });
    expect(isFree("not a date", now, busy, new Set(), rules)).toBeNull();
    expect(byDay(freeSlots(now, [], new Set(), rules)).map((d) => [d.date, d.slots.length])).toEqual([["2026-12-03", 3], ["2026-12-04", 5]]);
  });
});
