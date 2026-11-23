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
        minimum_monthly_retainer: "2500.00", late_surcharge_amount: null, late_surcharge_auto: false, notes: null, activated_at: null, retired_at: null, created_at: "",
      }),
    ).toEqual({ pricesIncludeTax: true, quoteValidDays: 30, minimumMonthlyRetainer: 2500, lateSurchargeAmount: null, lateSurchargeAuto: false });
  });

  it("rejects unknown condition keys", () => {
    expect(conditionsSchema.safeParse({ employes: { min: 1, max: 9 } }).success).toBe(false);
    expect(conditionsSchema.safeParse({ employees: { min: 1, max: null } }).success).toBe(true);
  });
});

describe("unpricedItems", () => {
  it("lists items without a price, but not those quoted on request", () => {
    const items = [
      { label: "Base", band: "Individual", price: null, isCustomQuote: false },
      { label: "Audit", band: null, price: null, isCustomQuote: true },
      { label: "Docs", band: "Up to 50", price: 0, isCustomQuote: false },
    ];
    expect(unpricedItems(items).map(itemName)).toEqual(["Base (Individual)"]);
  });
});

describe("settingsSchema", () => {
  const ok = { name: "2027 schedule", effective_from: "2027-01-01", prices_include_tax: true, quote_valid_days: "30", minimum_monthly_retainer: "", late_surcharge_amount: "₱500", late_surcharge_auto: false, notes: "" };

  it("accepts empty optional amounts", () => {
    expect(settingsSchema.parse(ok)).toMatchObject({ quote_valid_days: 30, minimum_monthly_retainer: null, late_surcharge_amount: 500, notes: null });
  });

  it("rejects bad days and amounts", () => {
    expect(settingsSchema.safeParse({ ...ok, quote_valid_days: "0" }).success).toBe(false);
    expect(settingsSchema.safeParse({ ...ok, minimum_monthly_retainer: "-1" }).success).toBe(false);
    expect(settingsSchema.safeParse({ ...ok, effective_from: "soon" }).success).toBe(false);
  });
});
