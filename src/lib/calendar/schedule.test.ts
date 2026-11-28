import { describe, expect, it } from "vitest";
import { scheduleItems, type ScheduleRow } from "./schedule";

const row = (r: Partial<ScheduleRow>): ScheduleRow => ({
  kind: "task",
  starts_at: null,
  ends_at: null,
  on_date: "2026-12-01",
  title: "x",
  client_code: null,
  client_name: null,
  place: null,
  source: "Task",
  ...r,
});

describe("scheduleItems", () => {
  it("orders by day, all-day items first, then meetings by start time, in Manila time", () => {
    const items = scheduleItems([
      row({ kind: "meeting", starts_at: "2026-12-01T06:00:00Z", ends_at: "2026-12-01T07:00:00Z", title: "Late", client_code: "TC-1", client_name: "Jaro" }),
      row({ kind: "call", starts_at: "2026-12-01T01:00:00Z", ends_at: "2026-12-01T01:30:00Z", title: "Early" }),
      row({ kind: "task", on_date: "2026-12-02", title: "Next day" }),
      row({ kind: "returns", title: "3 returns due" }),
      // 16:30 UTC on 30 November is 00:30 on 1 December in Manila.
      row({ kind: "meeting", starts_at: "2026-11-30T16:30:00Z", title: "Midnight" }),
    ]);
    expect(items.map((i) => [i.date, i.time, i.title])).toEqual([
      ["2026-12-01", null, "3 returns due"],
      ["2026-12-01", "00:30", "Midnight"],
      ["2026-12-01", "09:00–09:30", "Early"],
      ["2026-12-01", "14:00–15:00", "Late"],
      ["2026-12-02", null, "Next day"],
    ]);
    expect(items[3].client).toBe("TC-1 Jaro");
    expect(items[0].client).toBeNull();
  });

  it("reads a date column given as a Date", () => {
    expect(scheduleItems([row({ on_date: new Date(2026, 11, 5) })])[0].date).toBe("2026-12-05");
  });
});
