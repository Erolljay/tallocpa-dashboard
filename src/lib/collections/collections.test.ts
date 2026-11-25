import { describe, expect, it } from "vitest";
import { ageOpenItems, agingBucket, describeBillingDays, groupPaidItems, nextBillingDate, parseBillingDays, suggestTicks, tickedSplit, totalHeld } from "./collections";

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

describe("groupPaidItems", () => {
  it("lists what each payment paid, in allocation order, joining parts of the same item", () => {
    const items = groupPaidItems([
      { deposit_id: "d1", due_id: "retainer", amount: "3000.00", client_dues: { description: "Retainer, October" } },
      { deposit_id: "d1", due_id: "tax", amount: "1500.00", client_dues: { description: "1601-C October" } },
      { deposit_id: "d2", due_id: "tax", amount: "500.00", client_dues: { description: "1601-C October" } },
      { deposit_id: "d1", due_id: "retainer", amount: "0.50", client_dues: null },
    ]);
    expect(items.get("d1")).toEqual([
      { dueId: "retainer", description: "Retainer, October", amount: 3000.5, fromCredit: false },
      { dueId: "tax", description: "1601-C October", amount: 1500, fromCredit: false },
    ]);
    expect(items.get("d2")).toEqual([{ dueId: "tax", description: "1601-C October", amount: 500, fromCredit: false }]);
    expect(items.get("d3")).toBeUndefined();
  });
});

describe("ticked items", () => {
  const items = [
    { id: "a", open: 3000 },
    { id: "b", open: 1000 },
    { id: "c", open: 500.1 },
  ];

  it("suggests the oldest items the amount reaches, the last possibly in part", () => {
    expect(suggestTicks(items, 3000)).toEqual(["a"]);
    expect(suggestTicks(items, 3000.01)).toEqual(["a", "b"]);
    expect(suggestTicks(items, 10000)).toEqual(["a", "b", "c"]);
    expect(suggestTicks(items, 0)).toEqual([]);
  });

  it("splits a payment into applied, credit and what stays open on the ticked items", () => {
    expect(tickedSplit([items[1], items[2]], 2000)).toEqual({ applied: 1500.1, credit: 499.9, stillOpen: 0 });
    expect(tickedSplit([items[0]], 1200)).toEqual({ applied: 1200, credit: 0, stillOpen: 1800 });
    expect(tickedSplit([], 700)).toEqual({ applied: 0, credit: 700, stillOpen: 0 });
  });

  it("keeps the items ticked and those paid later from credit apart", () => {
    const paid = groupPaidItems([
      { deposit_id: "d", due_id: "tax", amount: 1000, from_credit: false, client_dues: { description: "Tax" } },
      { deposit_id: "d", due_id: "ret", amount: 200, from_credit: true, client_dues: { description: "Retainer" } },
    ]);
    expect(paid.get("d")?.map((p) => [p.dueId, p.fromCredit])).toEqual([["tax", false], ["ret", true]]);
  });
});

describe("totalHeld", () => {
  it("totals cash for remittance per client and firm-wide without drift", () => {
    const r = totalHeld([
      { client_id: "x", held: "0.10" },
      { client_id: "x", held: "0.20" },
      { client_id: "y", held: 1000 },
    ]);
    expect(r.byClient.get("x")).toBe(0.3);
    expect(r.total).toBe(1000.3);
  });
});
