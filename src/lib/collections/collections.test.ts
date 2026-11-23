import { describe, expect, it } from "vitest";
import { ageOpenItems, agingBucket, describeBillingDays, nextBillingDate, parseBillingDays } from "./collections";

describe("agingBucket", () => {
  it("puts amounts not yet due in current, then 30/60/90-day buckets", () => {
    expect(agingBucket("2026-11-30", "2026-11-23")).toBe("current");
    expect(agingBucket("2026-11-23", "2026-11-23")).toBe("current");
    expect(agingBucket("2026-11-22", "2026-11-23")).toBe("1-30");
    expect(agingBucket("2026-10-24", "2026-11-23")).toBe("1-30");
    expect(agingBucket("2026-10-23", "2026-11-23")).toBe("31-60");
    expect(agingBucket("2026-08-25", "2026-11-23")).toBe("61-90");
    expect(agingBucket("2026-08-24", "2026-11-23")).toBe("90+");
  });

  it("totals without floating-point drift", () => {
    const r = ageOpenItems(
      [
        { due_on: "2026-12-01", open_amount: "0.10" },
        { due_on: "2026-12-01", open_amount: "0.20" },
        { due_on: "2026-09-01", open_amount: 1250.5 },
      ],
      "2026-11-23",
    );
    expect(r.buckets.current).toBe(0.3);
    expect(r.buckets["61-90"]).toBe(1250.5);
    expect(r.total).toBe(1250.8);
    expect(r.overdue).toBe(1250.5);
  });
});

describe("nextBillingDate", () => {
  it("finds the next billing day this month, or the first one next month", () => {
    expect(nextBillingDate([10, 20], "2026-11-05")).toBe("2026-11-10");
    expect(nextBillingDate([10, 20], "2026-11-10")).toBe("2026-11-10");
    expect(nextBillingDate([10, 20], "2026-11-11")).toBe("2026-11-20");
    expect(nextBillingDate([20, 10], "2026-11-23")).toBe("2026-12-10");
    expect(nextBillingDate([10], "2026-12-15")).toBe("2027-01-10");
    expect(nextBillingDate([], "2026-12-15")).toBeNull();
  });
});

describe("billing days", () => {
  it("reads and parses the days a client is billed", () => {
    expect(describeBillingDays([20, 10])).toBe("10th and 20th");
    expect(describeBillingDays([1, 2, 3])).toBe("1st, 2nd and 3rd");
    expect(parseBillingDays("10, 20")).toEqual({ days: [10, 20] });
    expect(parseBillingDays("20 10 10")).toEqual({ days: [10, 20] });
    expect(parseBillingDays("31")).toHaveProperty("error");
    expect(parseBillingDays("")).toHaveProperty("error");
  });
});
