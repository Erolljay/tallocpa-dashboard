import { describe, expect, it } from "vitest";
import { estimateProfile, gapFor, lastWholeMonths } from "./gap";
import { OWNER_PRICES, OWNER_SETTINGS } from "./owner-prices.fixture";
import { FEE_TEMPLATE } from "./template";
import type { FeeItem } from "./types";

const items: FeeItem[] = FEE_TEMPLATE.map((t) => ({ ...t, price: t.isCustomQuote ? null : (OWNER_PRICES[t.code] ?? null) }));
const schedule = { items, settings: OWNER_SETTINGS, taxOnFee: "percentage_tax_3" as const };

describe("estimateProfile", () => {
  it("reads VAT, withholding and payroll from the open forms, and lists what it assumed", () => {
    const e = estimateProfile({ taxpayerType: "corporation", openForms: ["1702Q", "2550Q", "0619-E", "1601-EQ", "1601-C"], monthlyDocuments: [40, 60, 80] });
    expect(e.profile).toEqual({
      taxpayerType: "corporation", vatRegistered: true, ewt: "rental", employees: 1, remitsContributions: false, documentsPerMonth: 60, complexity: [], branches: 0, monthsBehind: 0,
    });
    expect(e.assumptions).toHaveLength(2);
  });

  it("a plain non-VAT individual has nothing to assume but missing history", () => {
    const e = estimateProfile({ taxpayerType: "individual", openForms: ["1701Q", "2551Q"], monthlyDocuments: [] });
    expect(e.profile).toMatchObject({ vatRegistered: false, ewt: "none", employees: 0, documentsPerMonth: 0 });
    expect(e.assumptions).toEqual(["No document history yet; volume taken as 0."]);
  });
});

describe("gapFor", () => {
  it("compares the current retainer with the computed monthly one, bookkeeping by the documents sent", () => {
    const g = gapFor({ taxpayerType: "individual", openForms: ["2551Q"], monthlyDocuments: [10, 20, 30], currentMonthly: 1800 }, schedule, "2026-11-26");
    expect(g).toMatchObject({ currentMonthly: 1800, computedMonthly: 2000, gap: 200, averageDocuments: 20, aboveFirstBand: false, volumeNeedsCustomQuote: false, incomplete: false });
    expect(g).not.toHaveProperty("annualPackage");
  });

  it("flags volume above the first band (50/51 edge) and volume that needs a custom quote", () => {
    const at = gapFor({ taxpayerType: "individual", openForms: [], monthlyDocuments: [50], currentMonthly: 1000 }, schedule, "2026-11-26");
    expect(at).toMatchObject({ aboveFirstBand: false, volumeBand: "Up to 50 a month" });
    const over = gapFor({ taxpayerType: "individual", openForms: [], monthlyDocuments: [51], currentMonthly: 1000 }, schedule, "2026-11-26");
    expect(over).toMatchObject({ aboveFirstBand: true, volumeBand: "51–150 a month", computedMonthly: 2500, gap: 1500 });
    const custom = gapFor({ taxpayerType: "individual", openForms: [], monthlyDocuments: [300, 302, 310], currentMonthly: 1000 }, schedule, "2026-11-26");
    expect(custom).toMatchObject({ averageDocuments: 304, volumeNeedsCustomQuote: true, aboveFirstBand: true, incomplete: true, peakDocuments: 310 });
  });

  it("a negative gap means the client pays more than the schedule", () => {
    expect(gapFor({ taxpayerType: "individual", openForms: [], monthlyDocuments: [], currentMonthly: 2500 }, schedule, "2026-11-26").gap).toBe(-500);
  });
});

describe("lastWholeMonths", () => {
  it("returns the whole months before today's month, across a year end", () => {
    expect(lastWholeMonths("2026-11-23", 3)).toEqual(["2026-08-01", "2026-09-01", "2026-10-01"]);
    expect(lastWholeMonths("2027-02-01", 3)).toEqual(["2026-11-01", "2026-12-01", "2027-01-01"]);
  });
});
