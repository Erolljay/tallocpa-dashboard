import { describe, expect, it } from "vitest";
import { estimateProfile, gapFor, lastWholeMonths } from "./gap";
import { FEE_TEMPLATE } from "./template";
import type { FeeItem, ScheduleSettings } from "./types";

const PRICES: Record<string, number> = {
  "A.individual": 1000, "A.corporate": 2000, "B.non_individual": 2000, "C.rental": 500, "D.1-9": 500,
  "F.0-50": 0, "F.51-150": 700, "F.151-300": 1400, "G.light": 3000, "H.afs_itr": 10000, "H.sawt": 600, "H.1604c": 1500, "H.1604e": 1500,
};
const items: FeeItem[] = FEE_TEMPLATE.map((t) => ({ ...t, price: PRICES[t.code] ?? (t.isCustomQuote ? null : 1) }));
const settings: ScheduleSettings = { pricesIncludeTax: true, quoteValidDays: 30, minimumMonthlyRetainer: null, lateSurchargeAmount: null, lateSurchargeAuto: false };
const schedule = { items, settings, taxOnFee: "percentage_tax_3" as const };

describe("estimateProfile", () => {
  it("reads VAT, withholding and payroll from the open forms, and lists what it assumed", () => {
    const e = estimateProfile({ taxpayerType: "corporation", openForms: ["1702Q", "2550Q", "0619-E", "1601-EQ", "1601-C"], serviceLines: ["tax_compliance", "bookkeeping"], monthlyDocuments: [40, 60, 80] });
    expect(e.profile).toMatchObject({ vatRegistered: true, ewt: "rental", employees: 1, remitsContributions: false, bookkeeping: "light", documentsPerMonth: 60 });
    expect(e.profile.annualItems).toEqual(["H.afs_itr", "H.sawt", "H.1604c", "H.1604e"]);
    expect(e.assumptions).toHaveLength(3);
  });

  it("a plain non-VAT individual has nothing to assume but missing history", () => {
    const e = estimateProfile({ taxpayerType: "individual", openForms: ["1701Q", "2551Q"], serviceLines: ["tax_compliance"], monthlyDocuments: [] });
    expect(e.profile).toMatchObject({ vatRegistered: false, ewt: "none", employees: 0, bookkeeping: "none", documentsPerMonth: 0 });
    expect(e.assumptions).toEqual(["No document history yet; volume taken as 0."]);
  });
});

describe("gapFor", () => {
  it("compares the current retainer with the computed one", () => {
    const g = gapFor({ taxpayerType: "individual", openForms: ["2551Q"], serviceLines: ["tax_compliance"], monthlyDocuments: [10, 20, 30], currentMonthly: 800 }, schedule, "2026-11-23");
    expect(g).toMatchObject({ currentMonthly: 800, computedMonthly: 1000, gap: 200, annualPackage: 10600, averageDocuments: 20, aboveIncludedVolume: false, volumeNeedsCustomQuote: false, incomplete: false });
  });

  it("flags volume above the included band (50/51 edge) and volume that needs a custom quote", () => {
    const at = gapFor({ taxpayerType: "individual", openForms: [], serviceLines: [], monthlyDocuments: [50], currentMonthly: 1000 }, schedule, "2026-11-23");
    expect(at).toMatchObject({ aboveIncludedVolume: false, volumeBand: "Up to 50 a month (included)" });
    const over = gapFor({ taxpayerType: "individual", openForms: [], serviceLines: [], monthlyDocuments: [51], currentMonthly: 1000 }, schedule, "2026-11-23");
    expect(over).toMatchObject({ aboveIncludedVolume: true, volumeBand: "51–150 a month", computedMonthly: 1700, gap: 700 });
    const custom = gapFor({ taxpayerType: "individual", openForms: [], serviceLines: [], monthlyDocuments: [300, 302, 310], currentMonthly: 1000 }, schedule, "2026-11-23");
    expect(custom).toMatchObject({ averageDocuments: 304, volumeNeedsCustomQuote: true, aboveIncludedVolume: true, incomplete: true, peakDocuments: 310 });
  });

  it("a negative gap means the client pays more than the schedule", () => {
    expect(gapFor({ taxpayerType: "individual", openForms: [], serviceLines: [], monthlyDocuments: [], currentMonthly: 1500 }, schedule, "2026-11-23").gap).toBe(-500);
  });
});

describe("lastWholeMonths", () => {
  it("returns the whole months before today's month, across a year end", () => {
    expect(lastWholeMonths("2026-11-23", 3)).toEqual(["2026-08-01", "2026-09-01", "2026-10-01"]);
    expect(lastWholeMonths("2027-02-01", 3)).toEqual(["2026-11-01", "2026-12-01", "2027-01-01"]);
  });
});
