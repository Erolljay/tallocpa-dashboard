import { describe, expect, it } from "vitest";
import { ageOpenItems, agingBucket, groupPaidItems, groupReady, readyReasonLabel, suggestTicks, tickedSplit, totalHeld, type ReadyItem } from "./collections";

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

describe("ready to bill", () => {
  const row = (client: string, amount: string, over: Partial<ReadyItem> = {}): ReadyItem => ({
    client_id: client,
    client_code: `TC-${client}`,
    client_name: `Client ${client}`,
    kind: "tax",
    description: "Tax due",
    amount,
    reason: "client_approved",
    days_to_due: 10,
    filing_instance_id: null,
    due_id: null,
    ...over,
  });

  it("says why each item is ready", () => {
    expect(readyReasonLabel({ reason: "client_approved", days_to_due: 12 })).toBe("Client approved");
    expect(readyReasonLabel({ reason: "due_soon", days_to_due: 2 })).toBe("Due in 2 days");
    expect(readyReasonLabel({ reason: "due_soon", days_to_due: 1 })).toBe("Due in 1 day");
    expect(readyReasonLabel({ reason: "due_soon", days_to_due: 0 })).toBe("Due today");
    expect(readyReasonLabel({ reason: "due_soon", days_to_due: -3 })).toBe("Past due");
    expect(readyReasonLabel({ reason: "retainer", days_to_due: null })).toBe("This month's retainer");
    expect(readyReasonLabel({ reason: "retainer_unbilled", days_to_due: null })).toBe("Not billed");
    expect(readyReasonLabel({ reason: "charge", days_to_due: null })).toBe("Not yet billed");
  });

  it("groups the rows by client in order and totals without drift", () => {
    const groups = groupReady([row("A", "0.10"), row("A", "0.20", { kind: "retainer", reason: "retainer" }), row("B", "1450")]);
    expect(groups.map((g) => [g.id, g.items.length, g.total])).toEqual([["A", 2, 0.3], ["B", 1, 1450]]);
    expect(groupReady([])).toEqual([]);
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
