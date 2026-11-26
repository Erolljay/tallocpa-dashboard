import { describe, expect, it } from "vitest";
import { kindsFor } from "./kinds";
import { badgeText, bellLabel, dayLabel, groupByDay, manilaDay, relativeTime, timeOfDay } from "./format";

// 26 Nov 2026, 14:00 in Manila.
const now = new Date("2026-11-26T06:00:00Z");

describe("badgeText", () => {
  it("shows nothing at zero, the count up to 99, then 99+", () => {
    expect(badgeText(0)).toBeNull();
    expect(badgeText(-1)).toBeNull();
    expect(badgeText(Number.NaN)).toBeNull();
    expect(badgeText(1)).toBe("1");
    expect(badgeText(99)).toBe("99");
    expect(badgeText(100)).toBe("99+");
    expect(badgeText(2500)).toBe("99+");
  });
});

describe("bellLabel", () => {
  it("names the button with the unread count", () => {
    expect(bellLabel(0)).toBe("Notifications, 0 unread");
    expect(bellLabel(3)).toBe("Notifications, 3 unread");
    expect(bellLabel(150)).toBe("Notifications, 150 unread");
  });
});

describe("manilaDay", () => {
  it("uses the Manila calendar day, not UTC's", () => {
    expect(manilaDay("2026-11-25T15:59:00Z")).toBe("2026-11-25");
    expect(manilaDay("2026-11-25T16:00:00Z")).toBe("2026-11-26");
  });
});

describe("relativeTime", () => {
  it("counts minutes and hours today", () => {
    expect(relativeTime("2026-11-26T05:59:30Z", now)).toBe("Just now");
    expect(relativeTime("2026-11-26T05:55:00Z", now)).toBe("5 min ago");
    expect(relativeTime("2026-11-26T03:00:00Z", now)).toBe("3 h ago");
    // 00:30 Manila today.
    expect(relativeTime("2026-11-25T16:30:00Z", now)).toBe("13 h ago");
  });

  it("says Yesterday for the previous Manila day, even under 24 hours ago", () => {
    // 23:30 Manila yesterday.
    expect(relativeTime("2026-11-25T15:30:00Z", now)).toBe("Yesterday");
  });

  it("uses the weekday within the week, then the date", () => {
    expect(relativeTime("2026-11-23T02:00:00Z", now)).toBe("Mon");
    expect(relativeTime("2026-11-03T02:00:00Z", now)).toBe("Nov 3");
    expect(relativeTime("2025-12-30T02:00:00Z", now)).toBe("Dec 30, 2025");
  });

  it("treats a time slightly in the future as now", () => {
    expect(relativeTime("2026-11-26T06:00:05Z", now)).toBe("Just now");
  });
});

describe("dayLabel and timeOfDay", () => {
  it("names today, yesterday, then the date", () => {
    expect(dayLabel("2026-11-26", now)).toBe("Today");
    expect(dayLabel("2026-11-25", now)).toBe("Yesterday");
    expect(dayLabel("2026-11-20", now)).toBe("Friday, November 20");
    expect(dayLabel("2025-11-20", now)).toBe("Thursday, November 20, 2025");
  });

  it("formats Manila clock time", () => {
    expect(timeOfDay("2026-11-26T05:30:00Z")).toBe("1:30 PM");
  });
});

describe("groupByDay", () => {
  it("groups newest-first rows by Manila day, in order", () => {
    const rows = [
      { id: 1, created_at: "2026-11-26T05:00:00Z" },
      { id: 2, created_at: "2026-11-25T16:10:00Z" },
      { id: 3, created_at: "2026-11-25T15:50:00Z" },
      { id: 4, created_at: "2026-11-20T01:00:00Z" },
    ];
    const groups = groupByDay(rows, now);
    expect(groups.map((g) => g.label)).toEqual(["Today", "Yesterday", "Friday, November 20"]);
    expect(groups.map((g) => g.items.map((r) => r.id))).toEqual([[1, 2], [3], [4]]);
  });

  it("returns no groups for no rows", () => {
    expect(groupByDay([], now)).toEqual([]);
  });
});


describe("kindsFor", () => {
  it("shows the Owner every staff kind, a reviewer the approver ones, staff neither", () => {
    expect(kindsFor("staff", "owner")).toContain("payment_proof_submitted");
    expect(kindsFor("staff", "reviewer")).toContain("return_ready_for_approval");
    expect(kindsFor("staff", "reviewer")).not.toContain("lead_new");
    expect(kindsFor("staff", "staff")).not.toContain("return_ready_for_approval");
    expect(kindsFor("client", null)).toEqual(expect.arrayContaining(["statement_issued", "return_filed"]));
    expect(kindsFor("client", null)).not.toContain("lead_new");
  });
});
