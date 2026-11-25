import { describe, expect, it } from "vitest";
import type { CalendarEvent } from "@/lib/google/calendar";
import { manilaInstant } from "./slots";
import { manilaTime, mondayOf, weekCells, weekDays, weekRange } from "./week";

const ev = (over: Partial<CalendarEvent>): CalendarEvent => ({
  id: "e", summary: "Review: Molo Hardware 2550Q", start: manilaInstant("2026-12-01", 10), end: manilaInstant("2026-12-01", 11),
  allDay: false, private: false, free: false, meetUrl: null, htmlLink: null, ...over,
});

describe("team calendar week", () => {
  it("starts on Monday, Manila midnight to midnight", () => {
    expect(mondayOf("2026-12-03")).toBe("2026-11-30");
    expect(mondayOf("2026-11-30")).toBe("2026-11-30");
    expect(mondayOf("2026-12-06")).toBe("2026-11-30");
    expect(weekDays("2026-11-30")).toHaveLength(7);
    expect(weekRange("2026-11-30")).toEqual({ from: "2026-11-29T16:00:00.000Z", to: "2026-12-06T16:00:00.000Z" });
  });

  it("shows Tallo events in full and private or personal ones as Busy, per day", () => {
    const days = weekDays("2026-11-30");
    const cells = weekCells(
      days,
      [ev({}), ev({ id: "p", private: true, start: manilaInstant("2026-12-02", 13), end: manilaInstant("2026-12-02", 14) }), ev({ id: "f", free: true })],
      [{ start: "2026-12-02T23:00:00Z", end: "2026-12-03T01:00:00Z" }],
    );
    expect(cells[1].map((c) => [manilaTime(c.start), c.title])).toEqual([["10:00", "Review: Molo Hardware 2550Q"]]);
    expect(cells[2].map((c) => [manilaTime(c.start), c.title])).toEqual([["13:00", null]]);
    // A personal block from 07:00 to 09:00 on Thursday, Manila time.
    expect(cells[3].map((c) => [manilaTime(c.start), manilaTime(c.end), c.title])).toEqual([["07:00", "09:00", null]]);
    expect(cells[0]).toEqual([]);
  });
});
