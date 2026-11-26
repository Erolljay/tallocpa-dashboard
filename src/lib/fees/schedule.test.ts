import { describe, expect, it } from "vitest";
import { conditionsSchema, itemName, parsePrice, settingsSchema, toFeeItem, toSettings, unpricedItems } from "./schedule";
import { FEE_TEMPLATE, templateRows } from "./template";

describe("parsePrice", () => {
  it("reads pesos as typed", () => {
    expect(parsePrice("")).toEqual({ value: null });
    expect(parsePrice("  ")).toEqual({ value: null });
    expect(parsePrice("1500")).toEqual({ value: 1500 });
    expect(parsePrice("₱1,500.50")).toEqual({ value: 1500.5 });
    expect(parsePrice("0")).toEqual({ value: 0 });
  });

  it("rejects what is not an amount", () => {
    expect(parsePrice("-5")).toHaveProperty("error");
    expect(parsePrice("1.005")).toHaveProperty("error");
    expect(parsePrice("abc")).toHaveProperty("error");
    expect(parsePrice("99999999999")).toHaveProperty("error");
  });

  it("factors are 1 or more", () => {
    expect(parsePrice("1.25", "factor")).toEqual({ value: 1.25 });
    expect(parsePrice("1", "factor")).toEqual({ value: 1 });
    expect(parsePrice("0.9", "factor")).toHaveProperty("error");
  });
});

describe("rows", () => {
  it("every template row survives a round trip through the database shape", () => {
    const rows = templateRows();
    expect(rows).toHaveLength(FEE_TEMPLATE.length);
    rows.forEach((r, i) => {
      const item = toFeeItem({ ...r, id: `id-${i}` });
      expect(item).toMatchObject({ ...FEE_TEMPLATE[i], price: null, sortOrder: (i + 1) * 10 });
    });
  });

  it("reads numeric strings from Postgres", () => {
    const [row] = templateRows();
    expect(toFeeItem({ ...row, id: "x", price: "1500.00" }).price).toBe(1500);
    expect(
      toSettings({
        id: "s", brand_id: "b", name: "n", effective_from: "2027-01-01", status: "draft", prices_include_tax: true, quote_valid_days: 30,
        minimum_monthly_retainer: "2500.00", late_surcharge_amount: null, late_surcharge_auto: false, monthly_cap: "6000.00", catch_up_factor: "0.50", notes: null, activated_at: null, retired_at: null, created_at: "",
      }),
    ).toEqual({ pricesIncludeTax: true, quoteValidDays: 30, minimumMonthlyRetainer: 2500, lateSurchargeAmount: null, lateSurchargeAuto: false, monthlyCap: 6000, catchUpFactor: 0.5 });
  });

  it("rejects unknown condition keys", () => {
    expect(conditionsSchema.safeParse({ employes: { min: 1, max: 9 } }).success).toBe(false);
    expect(conditionsSchema.safeParse({ employees: { min: 1, max: null } }).success).toBe(true);
    expect(conditionsSchema.safeParse({ annual_sales: { min: 3_000_001, max: 10_000_000 }, complexity: "any" }).success).toBe(true);
    // Schedules made before 26 Nov 2026 still read.
    expect(conditionsSchema.safeParse({ bookkeeping: "any", complexity: "inventory", of: "bookkeeping" }).success).toBe(true);
  });
});

describe("unpricedItems", () => {
  it("lists monthly items without a price; annual and ad hoc jobs and items on request are optional", () => {
    const items = [
      { label: "Base", band: "Individual", price: null, isCustomQuote: false, billing: "monthly" as const },
      { label: "Audit", band: null, price: null, isCustomQuote: true, billing: "annual" as const },
      { label: "Docs", band: "Up to 50", price: 0, isCustomQuote: false, billing: "monthly" as const },
      { label: "1604-C", band: null, price: null, isCustomQuote: false, billing: "annual" as const },
      { label: "ORUS", band: null, price: null, isCustomQuote: false, billing: "one_time" as const },
    ];
    expect(unpricedItems(items).map(itemName)).toEqual(["Base (Individual)"]);
  });
});

describe("settingsSchema", () => {
  const ok = { name: "2027 schedule", effective_from: "2027-01-01", prices_include_tax: true, quote_valid_days: "30", minimum_monthly_retainer: "", late_surcharge_amount: "₱500", late_surcharge_auto: false, monthly_cap: "6,000", catch_up_factor: "0.5", notes: "" };

  it("accepts empty optional amounts", () => {
    expect(settingsSchema.parse(ok)).toMatchObject({ quote_valid_days: 30, minimum_monthly_retainer: null, late_surcharge_amount: 500, monthly_cap: 6000, catch_up_factor: 0.5, notes: null });
    expect(settingsSchema.parse({ ...ok, monthly_cap: "", catch_up_factor: "" })).toMatchObject({ monthly_cap: null, catch_up_factor: null });
  });

  it("checks the catch-up factor", () => {
    expect(settingsSchema.safeParse({ ...ok, catch_up_factor: "0" }).success).toBe(false);
    expect(settingsSchema.safeParse({ ...ok, catch_up_factor: "half" }).success).toBe(false);
    expect(settingsSchema.safeParse({ ...ok, catch_up_factor: "11" }).success).toBe(false);
    expect(settingsSchema.safeParse({ ...ok, catch_up_factor: "1.5" }).success).toBe(true);
  });

  it("rejects bad days and amounts", () => {
    expect(settingsSchema.safeParse({ ...ok, quote_valid_days: "0" }).success).toBe(false);
    expect(settingsSchema.safeParse({ ...ok, minimum_monthly_retainer: "-1" }).success).toBe(false);
    expect(settingsSchema.safeParse({ ...ok, effective_from: "soon" }).success).toBe(false);
  });
});
