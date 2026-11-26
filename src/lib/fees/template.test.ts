import { describe, expect, it } from "vitest";
import { FEE_TEMPLATE, upgradeLegacyItems } from "./template";
import type { FeeItem } from "./types";

type Sorted = FeeItem & { sortOrder: number };
const legacy = (code: string, price: number | null, extra: Partial<FeeItem> = {}): Sorted => ({
  code, component: code[0] as FeeItem["component"], label: "Old", band: null, billing: "monthly", isCustomQuote: false, unit: null, conditions: {}, price, sortOrder: 0, ...extra,
});

describe("upgradeLegacyItems", () => {
  it("leaves a current schedule alone", () => {
    const items = FEE_TEMPLATE.map((t, n) => ({ ...t, price: 1, sortOrder: n }));
    expect(upgradeLegacyItems(items)).toEqual({ items, note: null, catchUpFactor: null });
  });

  it("moves an older schedule to the 26 Nov 2026 structure without losing a price silently", () => {
    const old: Sorted[] = [
      legacy("A.individual", 1000),
      legacy("D.per_employee", 20, { billing: "per_unit_monthly" }),
      legacy("F.0-50", 0, { label: "Document volume", band: "Up to 50 a month (included)", conditions: { documents: { min: 0, max: 50 } } }),
      legacy("F.51-150", 700, { label: "Document volume", band: "51–150 a month", conditions: { documents: { min: 51, max: 150 } } }),
      legacy("G.light", 3000, { label: "Bookkeeping", band: "Light", conditions: { bookkeeping: "light" } }),
      legacy("G.x_inventory", 1.25, { label: "Bookkeeping factor", band: "Inventory", billing: "multiplier" }),
      legacy("G.per_branch", 1200, { billing: "per_unit_monthly" }),
      legacy("H.afs_itr", 10000, { billing: "annual" }),
      legacy("I.backlog_month", 1, { billing: "multiplier" }),
    ];
    const { items, note, catchUpFactor } = upgradeLegacyItems(old);
    const price = (c: string) => items.find((i) => i.code === c)?.price;
    expect(items.map((i) => i.code)).toEqual([...FEE_TEMPLATE.map((t) => t.code), "D.per_employee"]);
    expect(price("A.individual")).toBe(1000);
    expect(price("F.per_branch")).toBe(1200);
    expect(price("H.itr_afs_individual")).toBe(10000);
    expect(price("H.itr_afs_partnership")).toBe(10000);
    expect(price("H.itr_afs_corporation")).toBe(10000);
    expect(price("F.0-50")).toBeNull();
    expect(price("F.complexity")).toBeNull();
    expect(items.find((i) => i.code === "F.0-50")?.label).toBe("Bookkeeping, by documents a month");
    expect(catchUpFactor).toBe(1);
    expect(note).toContain("Document volume (Up to 50 a month (included)) ₱0.00");
    expect(note).toContain("Document volume (51–150 a month) ₱700.00");
    expect(note).toContain("Bookkeeping (Light) ₱3,000.00");
    expect(note).toContain("Bookkeeping factor (Inventory) × 1.25");
  });
});
