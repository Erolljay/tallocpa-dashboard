import { describe, expect, it } from "vitest";
import { buildQuote, documentBand, EWT_NOTE, matches, suggestedAnnualItems, type QuoteInput } from "./quote";
import { FEE_TEMPLATE } from "./template";
import type { ClientProfile, FeeItem, ScheduleSettings } from "./types";

/*
 * Test prices only — the real prices are the Owner's (open item O2). Each is
 * distinct so a test can tell which band was picked.
 */
const TEST_PRICES: Record<string, number> = {
  "A.individual": 1000,
  "A.corporate": 2000,
  "A.non_stock": 2100,
  "B.individual": 1100,
  "B.non_individual": 2200,
  "C.rental": 500,
  "C.regular": 1500,
  "D.1-9": 501,
  "D.10-29": 1001,
  "D.30-49": 2001,
  "D.50plus": 3001,
  "D.per_employee": 20,
  "E.1-9": 502,
  "E.10-29": 1002,
  "E.30-49": 2002,
  "E.50plus": 3002,
  "E.per_employee": 10,
  "F.0-50": 0,
  "F.51-150": 700,
  "F.151-300": 1400,
  "G.light": 3000,
  "G.standard": 5000,
  "G.heavy": 8000,
  "G.x_inventory": 1.25,
  "G.x_manufacturing": 1.5,
  "G.x_construction": 1.3,
  "G.per_branch": 1200,
  "H.1604c": 1500,
  "H.1604e": 1500,
  "H.sawt": 600,
  "H.inventory_list": 1000,
  "H.afs_itr": 10000,
  "I.backlog_month": 1,
  "I.orus": 1500,
  "I.business_permit": 3500,
  "I.sec": 1500,
};

const priced = (overrides: Record<string, number | null> = {}): FeeItem[] =>
  FEE_TEMPLATE.map((t) => ({ ...t, price: t.isCustomQuote ? null : code(t.code, overrides) }));
const code = (c: string, o: Record<string, number | null>) => (c in o ? o[c] : (TEST_PRICES[c] ?? null));

const settings: ScheduleSettings = { pricesIncludeTax: true, quoteValidDays: 30, minimumMonthlyRetainer: null, lateSurchargeAmount: null, lateSurchargeAuto: false };

const base: ClientProfile = {
  taxpayerType: "individual",
  vatRegistered: false,
  ewt: "none",
  employees: 0,
  remitsContributions: false,
  documentsPerMonth: 10,
  bookkeeping: "none",
  complexity: [],
  branches: 0,
  annualItems: [],
  oneTimeItems: [],
};

const quote = (p: Partial<ClientProfile> = {}, extra: Partial<QuoteInput> = {}) =>
  buildQuote({ profile: { ...base, ...p }, items: priced(), settings, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-23", ...extra });
const codes = (lines: { code: string }[]) => lines.map((l) => l.code);

describe("template", () => {
  it("has unique codes and no prices", () => {
    const all = FEE_TEMPLATE.map((t) => t.code);
    expect(new Set(all).size).toBe(all.length);
    expect(FEE_TEMPLATE.every((t) => !("price" in t))).toBe(true);
  });

  it("prices every template item in the test fixture except quotes on request", () => {
    const unpriced = FEE_TEMPLATE.filter((t) => !t.isCustomQuote && !(t.code in TEST_PRICES)).map((t) => t.code);
    expect(unpriced).toEqual([]);
  });

  it("puts every taxpayer type in exactly one base band", () => {
    for (const t of ["individual", "opc", "partnership", "corporation", "non_stock"] as const) {
      expect(FEE_TEMPLATE.filter((i) => i.component === "A" && matches(i.conditions, { ...base, taxpayerType: t }))).toHaveLength(1);
    }
  });
});

describe("buildQuote — base, VAT, EWT", () => {
  it("charges the base by taxpayer type", () => {
    expect(codes(quote().monthly)).toEqual(["A.individual", "F.0-50"]);
    expect(codes(quote({ taxpayerType: "opc" }).monthly)).toContain("A.corporate");
    expect(codes(quote({ taxpayerType: "partnership" }).monthly)).toContain("A.corporate");
    expect(codes(quote({ taxpayerType: "corporation" }).monthly)).toContain("A.corporate");
    expect(codes(quote({ taxpayerType: "non_stock" }).monthly)).toContain("A.non_stock");
  });

  it("adds VAT only when VAT-registered, by individual / non-individual", () => {
    expect(codes(quote({ vatRegistered: false }).monthly)).not.toContain("B.individual");
    expect(codes(quote({ vatRegistered: true }).monthly)).toContain("B.individual");
    expect(codes(quote({ vatRegistered: true, taxpayerType: "corporation" }).monthly)).toContain("B.non_individual");
    expect(codes(quote({ vatRegistered: true, taxpayerType: "non_stock" }).monthly)).toContain("B.non_individual");
  });

  it("charges expanded withholding by kind", () => {
    expect(codes(quote({ ewt: "none" }).monthly).filter((c) => c.startsWith("C."))).toEqual([]);
    expect(codes(quote({ ewt: "rental" }).monthly)).toContain("C.rental");
    expect(codes(quote({ ewt: "tamp_regular" }).monthly)).toContain("C.regular");
    expect(codes(quote({ ewt: "tamp_regular" }).monthly)).not.toContain("C.rental");
  });
});

describe("buildQuote — payroll and contribution bands", () => {
  const payroll = (employees: number, remitsContributions = false) =>
    quote({ employees, remitsContributions }).monthly.filter((l) => l.component === "D" || l.component === "E");

  it("no employees, no payroll", () => {
    expect(payroll(0)).toEqual([]);
  });

  it.each([
    [1, "D.1-9"],
    [9, "D.1-9"],
    [10, "D.10-29"],
    [29, "D.10-29"],
    [30, "D.30-49"],
    [49, "D.30-49"],
    [50, "D.50plus"],
  ])("%i employees → %s, nothing per head", (n, band) => {
    expect(codes(payroll(n))).toEqual([band]);
  });

  it("charges each employee above 50", () => {
    const lines = payroll(51);
    expect(codes(lines)).toEqual(["D.50plus", "D.per_employee"]);
    expect(lines[1]).toMatchObject({ quantity: 1, unitPrice: 20, amount: 20 });
    expect(payroll(75).find((l) => l.code === "D.per_employee")).toMatchObject({ quantity: 25, amount: 500 });
  });

  it("adds contributions on the same bands only when we remit them", () => {
    expect(codes(payroll(9, true))).toEqual(["D.1-9", "E.1-9"]);
    expect(codes(payroll(10, true))).toEqual(["D.10-29", "E.10-29"]);
    expect(codes(payroll(29, true))).toEqual(["D.10-29", "E.10-29"]);
    expect(codes(payroll(30, true))).toEqual(["D.30-49", "E.30-49"]);
    expect(codes(payroll(49, true))).toEqual(["D.30-49", "E.30-49"]);
    expect(codes(payroll(50, true))).toEqual(["D.50plus", "E.50plus"]);
    expect(codes(payroll(51, true))).toEqual(["D.50plus", "D.per_employee", "E.50plus", "E.per_employee"]);
    expect(codes(payroll(0, true))).toEqual([]);
  });
});

describe("buildQuote — document volume", () => {
  it.each([
    [0, "F.0-50"],
    [50, "F.0-50"],
    [51, "F.51-150"],
    [150, "F.51-150"],
    [151, "F.151-300"],
    [300, "F.151-300"],
  ])("%i documents → %s", (n, band) => {
    const q = quote({ documentsPerMonth: n });
    expect(codes(q.monthly).filter((c) => c.startsWith("F."))).toEqual([band]);
    expect(q.customQuote).toEqual([]);
  });

  it("301 or more is quoted on request and left out of the total", () => {
    const q = quote({ documentsPerMonth: 301 });
    expect(codes(q.monthly).filter((c) => c.startsWith("F."))).toEqual([]);
    expect(q.customQuote).toEqual([{ code: "F.301plus", label: "Document volume", band: "301 or more a month" }]);
    expect(q.monthlyRetainer).toBe(1000);
    expect(q.complete).toBe(false);
  });

  it("documentBand finds the band for a volume", () => {
    expect(documentBand(priced(), 50)?.code).toBe("F.0-50");
    expect(documentBand(priced(), 51)?.code).toBe("F.51-150");
    expect(documentBand(priced(), 1000)?.code).toBe("F.301plus");
  });
});

describe("buildQuote — bookkeeping", () => {
  it("charges the level chosen", () => {
    expect(quote({ bookkeeping: "light" }).monthly.find((l) => l.component === "G")?.code).toBe("G.light");
    expect(quote({ bookkeeping: "standard" }).monthly.find((l) => l.component === "G")?.code).toBe("G.standard");
    expect(quote({ bookkeeping: "heavy" }).monthly.find((l) => l.component === "G")?.code).toBe("G.heavy");
    expect(quote({ bookkeeping: "none", complexity: ["inventory"], branches: 2 }).monthly.filter((l) => l.component === "G")).toEqual([]);
  });

  it("applies the complexity factor to the bookkeeping fee", () => {
    const q = quote({ bookkeeping: "standard", complexity: ["inventory"] });
    expect(q.monthly.find((l) => l.code === "G.x_inventory")).toMatchObject({ unitPrice: 1.25, amount: 1250 });
    expect(q.monthlyRetainer).toBe(1000 + 0 + 5000 + 1250);
  });

  it("uses only the highest factor when several apply", () => {
    const q = quote({ bookkeeping: "light", complexity: ["inventory", "manufacturing", "construction"] });
    const factors = q.monthly.filter((l) => l.billing === "multiplier");
    expect(factors).toHaveLength(1);
    expect(factors[0]).toMatchObject({ code: "G.x_manufacturing", amount: 1500 });
  });

  it("does not multiply the per-branch charge", () => {
    const q = quote({ bookkeeping: "light", complexity: ["inventory"], branches: 2 });
    expect(q.monthly.find((l) => l.code === "G.per_branch")).toMatchObject({ quantity: 2, amount: 2400 });
    expect(q.monthly.find((l) => l.code === "G.x_inventory")?.amount).toBe(750);
  });

  it("treats a factor of 1 as no extra charge", () => {
    const q = buildQuote({ profile: { ...base, bookkeeping: "light", complexity: ["construction"] }, items: priced({ "G.x_construction": 1 }), settings, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-23" });
    expect(q.monthly.find((l) => l.code === "G.x_construction")?.amount).toBe(0);
  });
});

describe("buildQuote — minimum retainer", () => {
  const withMin = (min: number | null, p: Partial<ClientProfile> = {}) =>
    buildQuote({ profile: { ...base, ...p }, items: priced(), settings: { ...settings, minimumMonthlyRetainer: min }, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-23" });

  it("tops up to the minimum", () => {
    const q = withMin(1500);
    expect(q.monthlySubtotal).toBe(1000);
    expect(q.minimumTopUp).toBe(500);
    expect(q.monthlyRetainer).toBe(1500);
    expect(q.firstYearTotal).toBe(18000);
  });

  it("does nothing when the subtotal is at or above the minimum", () => {
    expect(withMin(1000)).toMatchObject({ minimumTopUp: 0, monthlyRetainer: 1000 });
    expect(withMin(800)).toMatchObject({ minimumTopUp: 0, monthlyRetainer: 1000 });
    expect(withMin(null)).toMatchObject({ minimumTopUp: 0, monthlyRetainer: 1000 });
  });
});

describe("buildQuote — annual, one-time and first-year total", () => {
  it("adds the annual package and one-time work to twelve months", () => {
    const q = quote({
      taxpayerType: "corporation",
      vatRegistered: true,
      employees: 12,
      annualItems: ["H.afs_itr", "H.1604c"],
      oneTimeItems: [{ code: "I.orus", quantity: 1 }, { code: "I.backlog_month", quantity: 3 }],
    });
    const monthly = 2000 + 2200 + 1001 + 0;
    expect(q.monthlyRetainer).toBe(monthly);
    expect(q.annualTotal).toBe(11500);
    expect(q.oneTime.find((l) => l.code === "I.backlog_month")).toMatchObject({ quantity: 3, amount: monthly * 3 });
    expect(q.oneTimeTotal).toBe(1500 + monthly * 3);
    expect(q.firstYearTotal).toBe(12 * monthly + 11500 + 1500 + monthly * 3);
    expect(q.complete).toBe(true);
  });

  it("prices backlog months on the retainer after the minimum", () => {
    const q = buildQuote({
      profile: { ...base, oneTimeItems: [{ code: "I.backlog_month", quantity: 2 }] },
      items: priced(),
      settings: { ...settings, minimumMonthlyRetainer: 1500 },
      taxOnFee: "percentage_tax_3",
      quoteDate: "2026-11-23",
    });
    expect(q.oneTimeTotal).toBe(3000);
  });

  it("lists services quoted on request and codes it does not know", () => {
    const q = quote({ annualItems: ["H.nope"], oneTimeItems: [{ code: "K.fs_audit", quantity: 1 }, { code: "I.sec", quantity: 0 }, { code: "A.individual", quantity: 1 }] });
    expect(q.customQuote.map((c) => c.code)).toEqual(["K.fs_audit"]);
    expect(q.unknownCodes).toEqual(["H.nope", "A.individual"]);
    expect(q.oneTime).toEqual([]);
    expect(q.complete).toBe(false);
  });

  it("suggests annual items from the profile", () => {
    expect(suggestedAnnualItems(priced(), base)).toEqual(["H.sawt", "H.afs_itr"]);
    expect(suggestedAnnualItems(priced(), { ...base, employees: 3, ewt: "rental", complexity: ["inventory"] })).toEqual(["H.1604c", "H.1604e", "H.sawt", "H.inventory_list", "H.afs_itr"]);
  });
});

describe("buildQuote — missing prices", () => {
  it("lists items without a price and leaves them out of the totals", () => {
    const q = buildQuote({
      profile: { ...base, vatRegistered: true, annualItems: ["H.afs_itr"], oneTimeItems: [{ code: "I.backlog_month", quantity: 1 }] },
      items: priced({ "B.individual": null, "H.afs_itr": null, "I.backlog_month": null }),
      settings,
      taxOnFee: "percentage_tax_3",
      quoteDate: "2026-11-23",
    });
    expect(codes(q.missingPrices)).toEqual(["B.individual", "H.afs_itr", "I.backlog_month"]);
    expect(q.monthly.find((l) => l.code === "B.individual")?.amount).toBeNull();
    expect(q.monthlyRetainer).toBe(1000);
    expect(q.annualTotal).toBe(0);
    expect(q.complete).toBe(false);
  });

  it("does not apply a factor that has no price", () => {
    const q = buildQuote({ profile: { ...base, bookkeeping: "light", complexity: ["inventory", "construction"] }, items: priced({ "G.x_inventory": null }), settings, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-23" });
    expect(codes(q.missingPrices)).toEqual(["G.x_inventory"]);
    expect(q.monthlyRetainer).toBe(1000 + 3000);
  });

  it("an empty template gives an empty, incomplete quote", () => {
    const q = buildQuote({ profile: base, items: FEE_TEMPLATE.map((t) => ({ ...t, price: null })), settings, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-23" });
    expect(q.monthlyRetainer).toBe(0);
    expect(codes(q.missingPrices)).toEqual(["A.individual", "F.0-50"]);
  });
});

describe("buildQuote — tax on our fee, EWT note, validity", () => {
  it("non-VAT, prices include the 3% percentage tax", () => {
    const q = quote();
    expect(q.tax).toMatchObject({ kind: "percentage_tax_3", inclusive: true, monthly: 30, firstYear: 360, monthlyWithTax: 1000, firstYearWithTax: 12000 });
    expect(q.tax.note).toMatch(/not VAT-registered.*include the 3% percentage tax/);
  });

  it("non-VAT, 3% added on top", () => {
    const q = buildQuote({ profile: base, items: priced(), settings: { ...settings, pricesIncludeTax: false }, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-23" });
    expect(q.tax).toMatchObject({ monthly: 30, monthlyWithTax: 1030, firstYearWithTax: 12360 });
    expect(q.tax.note).toMatch(/before the 3% percentage tax/);
  });

  it("VAT-registered, inclusive and exclusive", () => {
    const inc = buildQuote({ profile: base, items: priced(), settings, taxOnFee: "vat_12", quoteDate: "2026-11-23" });
    expect(inc.tax).toMatchObject({ monthly: 107.14, monthlyWithTax: 1000 });
    expect(inc.tax.note).toBe("Our fees include 12% VAT.");
    const exc = buildQuote({ profile: base, items: priced(), settings: { ...settings, pricesIncludeTax: false }, taxOnFee: "vat_12", quoteDate: "2026-11-23" });
    expect(exc.tax).toMatchObject({ monthly: 120, monthlyWithTax: 1120 });
  });

  it("states that clients may withhold EWT on our fee (Q53)", () => {
    expect(quote().ewtNote).toBe(EWT_NOTE);
    expect(EWT_NOTE).toMatch(/may withhold expanded withholding tax/);
  });

  it("is valid for the schedule's number of days", () => {
    expect(quote().validUntil).toBe("2026-12-23");
    expect(buildQuote({ profile: base, items: priced(), settings: { ...settings, quoteValidDays: 45 }, taxOnFee: "percentage_tax_3", quoteDate: "2026-12-20" }).validUntil).toBe("2027-02-03");
  });

  it("shows the late-submission surcharge and whether it is automatic", () => {
    expect(quote().lateSurcharge).toBeNull();
    const q = buildQuote({ profile: base, items: priced(), settings: { ...settings, lateSurchargeAmount: 500, lateSurchargeAuto: false }, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-23" });
    expect(q.lateSurcharge).toEqual({ amount: 500, auto: false });
  });

  it("adds centavos without drift", () => {
    const q = buildQuote({ profile: { ...base, annualItems: ["H.sawt", "H.afs_itr"] }, items: priced({ "A.individual": 0.1, "F.0-50": 0.2, "H.sawt": 0.1, "H.afs_itr": 0.2 }), settings, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-23" });
    expect(q.monthlyRetainer).toBe(0.3);
    expect(q.annualTotal).toBe(0.3);
    expect(q.firstYearTotal).toBe(3.9);
  });
});
