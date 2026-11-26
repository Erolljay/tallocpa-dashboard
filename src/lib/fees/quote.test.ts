import { describe, expect, it } from "vitest";
import { OWNER_PRICES, OWNER_SETTINGS } from "./owner-prices.fixture";
import { buildQuote, documentBand, EWT_NOTE, instantView, matches, notIncludedItems, type QuoteInput } from "./quote";
import { FEE_TEMPLATE } from "./template";
import type { ClientProfile, FeeItem, ScheduleSettings } from "./types";

/* The Owner's prices of 26 Nov 2026 (owner-prices.fixture.ts); tests override some. */
const priced = (overrides: Record<string, number | null> = {}): FeeItem[] =>
  FEE_TEMPLATE.map((t) => ({ ...t, price: t.isCustomQuote ? null : code(t.code, overrides) }));
const code = (c: string, o: Record<string, number | null>) => (c in o ? o[c] : (OWNER_PRICES[c] ?? null));

const settings: ScheduleSettings = { ...OWNER_SETTINGS, monthlyCap: null };

const base: ClientProfile = {
  taxpayerType: "individual",
  vatRegistered: false,
  ewt: "none",
  employees: 0,
  remitsContributions: false,
  documentsPerMonth: 10,
  complexity: [],
  branches: 0,
  monthsBehind: 0,
};

const quote = (p: Partial<ClientProfile> = {}, extra: Partial<QuoteInput> = {}) =>
  buildQuote({ profile: { ...base, ...p }, items: priced(), settings, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-26", ...extra });
const withSettings = (p: Partial<ClientProfile>, s: Partial<ScheduleSettings>, items = priced()) =>
  buildQuote({ profile: { ...base, ...p }, items, settings: { ...settings, ...s }, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-26" });
const codes = (lines: { code: string }[]) => lines.map((l) => l.code);

describe("template", () => {
  it("has unique codes and no prices", () => {
    const all = FEE_TEMPLATE.map((t) => t.code);
    expect(new Set(all).size).toBe(all.length);
    expect(FEE_TEMPLATE.every((t) => !("price" in t))).toBe(true);
  });

  it("the Owner's prices cover every item a quote can charge", () => {
    const unpriced = FEE_TEMPLATE.filter((t) => !t.isCustomQuote && t.billing !== "annual" && t.billing !== "one_time" && !(t.code in OWNER_PRICES)).map((t) => t.code);
    expect(unpriced).toEqual([]);
    expect(Object.keys(OWNER_PRICES).filter((c) => !FEE_TEMPLATE.some((t) => t.code === c))).toEqual([]);
  });

  it("has no G: bookkeeping and document volume are one component (F)", () => {
    expect(FEE_TEMPLATE.filter((t) => t.component === "G")).toEqual([]);
    expect(FEE_TEMPLATE.filter((t) => t.component === "F").map((t) => t.code)).toEqual(["F.0-50", "F.51-150", "F.151-300", "F.301plus", "F.complexity", "F.per_branch"]);
    expect(FEE_TEMPLATE.some((t) => t.billing === "multiplier")).toBe(false);
  });

  it("puts every taxpayer type in exactly one base band, and every document count in one bookkeeping band", () => {
    for (const t of ["individual", "opc", "partnership", "corporation", "non_stock"] as const) {
      expect(FEE_TEMPLATE.filter((i) => i.component === "A" && matches(i.conditions, { ...base, taxpayerType: t }))).toHaveLength(1);
    }
    for (const n of [0, 50, 51, 150, 151, 300, 301, 5000]) {
      expect(FEE_TEMPLATE.filter((i) => i.component === "F" && i.conditions.documents && matches(i.conditions, { ...base, documentsPerMonth: n }))).toHaveLength(1);
    }
  });
});

describe("the Owner's examples (26 Nov 2026), monthly cap ₱6,000, catch-up at half", () => {
  const owner = (p: Partial<ClientProfile>) => buildQuote({ profile: { ...base, ...p }, items: priced(), settings: OWNER_SETTINGS, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-26" });

  it("non-VAT sole proprietor, up to 50 documents: ₱2,000", () => {
    const q = owner({ documentsPerMonth: 40 });
    expect(q.monthly.map((l) => [l.code, l.amount])).toEqual([["A.individual", 1000], ["F.0-50", 1000]]);
    expect(q).toMatchObject({ monthlyRetainer: 2000, overCap: false, complete: true });
  });

  it("VAT corporation, 5 employees, rent withholding, contributions remitted, ~120 documents: ₱4,900, catch-up 2 months ₱4,900", () => {
    const q = owner({ taxpayerType: "corporation", vatRegistered: true, ewt: "rental", employees: 5, remitsContributions: true, documentsPerMonth: 120, monthsBehind: 2 });
    expect(q.monthly.map((l) => [l.code, l.amount])).toEqual([
      ["A.corporate", 1500], ["B.non_individual", 1000], ["C.rental", 300], ["D.1-9", 300], ["E.1-9", 300], ["F.51-150", 1500],
    ]);
    expect(q.monthlyRetainer).toBe(4900);
    expect(q.catchUp).toEqual({ months: 2, factor: 0.5, perMonth: 2450, amount: 4900 });
    expect(q.oneTimeTotal).toBe(4900);
    expect(q.complete).toBe(true);
  });

  it("VAT online seller (individual), inventory, ~200 documents: ₱4,500", () => {
    const q = owner({ vatRegistered: true, complexity: ["inventory"], documentsPerMonth: 200 });
    expect(q.monthly.map((l) => [l.code, l.amount])).toEqual([["A.individual", 1000], ["B.individual", 500], ["F.151-300", 2500], ["F.complexity", 500]]);
    expect(q.monthlyRetainer).toBe(4500);
  });

  it("VAT corporation, 25 employees, regular withholding, inventory, contributions, ~250 documents: ₱7,200, over the cap so on request", () => {
    const q = owner({ taxpayerType: "corporation", vatRegistered: true, ewt: "tamp_regular", employees: 25, remitsContributions: true, complexity: ["inventory"], documentsPerMonth: 250, monthsBehind: 3 });
    expect(q.monthlyRetainer).toBe(7200);
    expect(q).toMatchObject({ monthlyCap: 6000, overCap: true, complete: false });
    expect(q.catchUp).toEqual({ months: 3, factor: null, perMonth: null, amount: null });
    expect(q.oneTimeTotal).toBe(0);
    const v = instantView(q);
    expect(v).toMatchObject({ priced: false, reason: "over_cap", monthlyRetainer: null, catchUp: { months: 3, amount: null } });
    expect(v.lines.map((l) => l.label)).toContain("Bookkeeping, by documents a month");
    expect(v.lines.every((l) => l.amount === null)).toBe(true);
    expect(JSON.stringify(v)).not.toMatch(/7200|2500/);
  });

  it("at the cap is still priced", () => {
    expect(withSettings({ documentsPerMonth: 40 }, { monthlyCap: 2000 })).toMatchObject({ overCap: false, complete: true });
    expect(withSettings({ documentsPerMonth: 40 }, { monthlyCap: 1999.99 })).toMatchObject({ overCap: true, complete: false });
  });
});

describe("buildQuote — base, VAT, EWT", () => {
  it("charges the base by taxpayer type", () => {
    expect(codes(quote().monthly)).toEqual(["A.individual", "F.0-50"]);
    expect(codes(quote({ taxpayerType: "opc" }).monthly)).toContain("A.corporate");
    expect(codes(quote({ taxpayerType: "partnership" }).monthly)).toContain("A.corporate");
    expect(codes(quote({ taxpayerType: "non_stock" }).monthly)).toContain("A.non_stock");
  });

  it("adds VAT only when VAT-registered, by individual / non-individual", () => {
    expect(codes(quote({ vatRegistered: false }).monthly)).not.toContain("B.individual");
    expect(codes(quote({ vatRegistered: true }).monthly)).toContain("B.individual");
    expect(codes(quote({ vatRegistered: true, taxpayerType: "non_stock" }).monthly)).toContain("B.non_individual");
  });

  it("charges expanded withholding by kind", () => {
    expect(codes(quote({ ewt: "none" }).monthly).filter((c) => c.startsWith("C."))).toEqual([]);
    expect(codes(quote({ ewt: "rental" }).monthly)).toContain("C.rental");
    expect(codes(quote({ ewt: "tamp_regular" }).monthly)).toEqual(["A.individual", "C.regular", "F.0-50"]);
  });
});

describe("buildQuote — payroll and contribution bands", () => {
  const payroll = (employees: number, remitsContributions = false) => quote({ employees, remitsContributions });

  it.each([
    [0, []],
    [1, ["D.1-9"]],
    [9, ["D.1-9"]],
    [10, ["D.10-29"]],
    [29, ["D.10-29"]],
    [30, ["D.30-49"]],
    [49, ["D.30-49"]],
  ])("%i employees → %j", (n, bands) => {
    expect(codes(payroll(n).monthly).filter((c) => c.startsWith("D."))).toEqual(bands);
  });

  it("50 or more employees is quoted on request, payroll and contributions", () => {
    const q = payroll(50, true);
    expect(codes(q.monthly).filter((c) => /^[DE]\./.test(c))).toEqual([]);
    expect(q.customQuote.map((c) => c.code)).toEqual(["D.50plus", "E.50plus"]);
    expect(q.complete).toBe(false);
  });

  it("adds contributions on the same bands only when we remit them", () => {
    expect(codes(payroll(9, true).monthly)).toEqual(["A.individual", "D.1-9", "E.1-9", "F.0-50"]);
    expect(codes(payroll(30, true).monthly)).toContain("E.30-49");
    expect(codes(payroll(0, true).monthly)).toEqual(["A.individual", "F.0-50"]);
  });

  it("still charges per employee above 50 on an older draft that has the item", () => {
    const perHead: FeeItem = { code: "D.per_employee", component: "D", label: "Payroll", band: "Each employee above 50", billing: "per_unit_monthly", isCustomQuote: false, unit: "employee", conditions: { employees: { min: 51, max: null }, per: "employee", above: 50 }, price: 20 };
    const q = withSettings({ employees: 75 }, {}, [...priced(), perHead]);
    expect(q.monthly.find((l) => l.code === "D.per_employee")).toMatchObject({ quantity: 25, amount: 500 });
  });
});

describe("buildQuote — bookkeeping, by documents a month (F)", () => {
  it.each([
    [0, "F.0-50", 1000],
    [50, "F.0-50", 1000],
    [51, "F.51-150", 1500],
    [150, "F.51-150", 1500],
    [151, "F.151-300", 2500],
    [300, "F.151-300", 2500],
  ])("%i documents → %s", (n, band, amount) => {
    const q = quote({ documentsPerMonth: n });
    const f = q.monthly.filter((l) => l.component === "F");
    expect(codes(f)).toEqual([band]);
    expect(f[0]).toMatchObject({ label: "Bookkeeping, by documents a month", amount });
  });

  it("every client is charged by documents: tax compliance only still needs them for the SLSP and the returns", () => {
    expect(quote().monthlyRetainer).toBe(2000);
  });

  it("301 or more is quoted on request and left out of the total", () => {
    const q = quote({ documentsPerMonth: 301, complexity: ["inventory"], branches: 1 });
    expect(codes(q.monthly)).toEqual(["A.individual", "F.complexity", "F.per_branch"]);
    expect(q.customQuote).toEqual([{ code: "F.301plus", label: "Bookkeeping, by documents a month", band: "301 or more a month" }]);
    expect(q.monthlyRetainer).toBe(2000);
    expect(q.complete).toBe(false);
  });

  it("documentBand finds the band for a volume", () => {
    expect(documentBand(priced(), 50)?.code).toBe("F.0-50");
    expect(documentBand(priced(), 1000)?.code).toBe("F.301plus");
  });

  it("the complexity add-on is flat and charged once, even if several apply", () => {
    expect(quote({ complexity: [] }).monthly.find((l) => l.code === "F.complexity")).toBeUndefined();
    const q = quote({ complexity: ["inventory", "manufacturing", "construction"] });
    expect(q.monthly.filter((l) => l.code === "F.complexity")).toEqual([expect.objectContaining({ quantity: 1, amount: 500 })]);
  });

  it("charges each branch", () => {
    expect(quote({ branches: 2 }).monthly.find((l) => l.code === "F.per_branch")).toMatchObject({ quantity: 2, amount: 1000 });
    expect(quote({ branches: 0 }).monthly.find((l) => l.code === "F.per_branch")).toBeUndefined();
  });
});

describe("buildQuote — minimum retainer", () => {
  it("tops up to the minimum, and does nothing at or above it", () => {
    expect(withSettings({}, { minimumMonthlyRetainer: 2500 })).toMatchObject({ monthlySubtotal: 2000, minimumTopUp: 500, monthlyRetainer: 2500 });
    expect(withSettings({}, { minimumMonthlyRetainer: 2000 })).toMatchObject({ minimumTopUp: 0, monthlyRetainer: 2000 });
    expect(withSettings({}, { minimumMonthlyRetainer: null })).toMatchObject({ minimumTopUp: 0, monthlyRetainer: 2000 });
  });
});

describe("buildQuote — monthly only, catch-up below it", () => {
  it("has no annual package and no first-year total", () => {
    const q = quote({ employees: 3 }) as unknown as Record<string, unknown>;
    expect(q).not.toHaveProperty("annual");
    expect(q).not.toHaveProperty("annualTotal");
    expect(q).not.toHaveProperty("firstYearTotal");
    expect(codes(q.monthly as { code: string }[]).some((c) => /^[HIK]\./.test(c))).toBe(false);
  });

  it("catch-up = months behind × factor × the monthly retainer, after the minimum", () => {
    expect(quote({ monthsBehind: 3 }).catchUp).toEqual({ months: 3, factor: 0.5, perMonth: 1000, amount: 3000 });
    expect(withSettings({ monthsBehind: 2 }, { minimumMonthlyRetainer: 3000, catchUpFactor: 1 }).catchUp?.amount).toBe(6000);
    expect(quote().catchUp).toBeNull();
    expect(quote().oneTimeTotal).toBe(0);
  });

  it("without a catch-up factor, catch-up is on request", () => {
    const q = withSettings({ monthsBehind: 1 }, { catchUpFactor: null });
    expect(q.catchUp).toEqual({ months: 1, factor: null, perMonth: null, amount: null });
    expect(q.customQuote).toEqual([{ code: "catch_up", label: "Backlog catch-up", band: "1 month behind" }]);
    expect(q.complete).toBe(false);
  });

  it("an older schedule without the setting uses its catch-up item as the factor", () => {
    const legacyItem: FeeItem = { code: "I.backlog_month", component: "I", label: "Backlog catch-up", band: "Per month behind", billing: "multiplier", isCustomQuote: false, unit: "month", conditions: { of: "monthly_retainer" }, price: 1 };
    expect(withSettings({ monthsBehind: 2 }, { catchUpFactor: null }, [...priced(), legacyItem]).catchUp?.amount).toBe(4000);
  });
});

describe("buildQuote — not included in this quote", () => {
  it("lists the annual and ad hoc jobs that apply, never as quote lines", () => {
    const q = quote();
    expect(q.notIncluded.filter((n) => n.group === "annual").map((n) => n.code)).toEqual(["H.itr_afs_individual", "H.sawt"]);
    expect(q.notIncluded.filter((n) => n.group === "audit")).toEqual([{ code: "H.audit_proprietor_0-3m", label: "Audit of financial statements", band: null, group: "audit", onRequest: false }]);
    expect(q.notIncluded.filter((n) => n.group === "ad_hoc").map((n) => n.code)).toEqual([
      "I.orus", "I.business_permit", "I.closure", "I.registration_individual", "I.amended_return", "I.certificate", "K.bir_audit_support", "K.aup", "K.cas", "K.systems_implementation", "K.ai_automation",
    ]);
    expect(q.notIncluded[0]).toEqual({ code: "H.itr_afs_individual", label: "Annual ITR with AFS (preparation)", band: "Individual", group: "annual", onRequest: false });
    expect(q.notIncluded.find((n) => n.code === "K.bir_audit_support")).toMatchObject({ group: "ad_hoc", onRequest: true });
  });

  it("follows the profile: ITR by taxpayer type, 1604-C with employees, 1604-E with withholding, inventory list, SEC for non-individuals", () => {
    const q = quote({ taxpayerType: "corporation", employees: 3, ewt: "rental", complexity: ["inventory"] });
    expect(q.notIncluded.filter((n) => n.group === "annual").map((n) => n.code)).toEqual(["H.itr_afs_corporation", "H.1604c", "H.1604e", "H.sawt", "H.inventory_list"]);
    expect(q.notIncluded.map((n) => n.code)).toContain("I.sec");
    expect(notIncludedItems(priced(), base).map((i) => i.code)).not.toContain("I.sec");
  });

  it("an annual-sales band (added later by the Owner) matches by sales; without sales only the lowest band", () => {
    const band = (code: string, min: number, max: number | null): FeeItem => ({ ...priced().find((i) => i.code === "H.itr_afs_individual")!, code, conditions: { taxpayer_types: ["individual"], annual_sales: { min, max } } });
    const items = [...priced().filter((i) => i.code !== "H.itr_afs_individual"), band("H.itr_afs_individual", 0, 3_000_000), band("H.itr_afs_individual.3m", 3_000_001, null)];
    const annual = (annualSales: number | null) => notIncludedItems(items, { ...base, annualSales }).filter((i) => i.code.startsWith("H.itr")).map((i) => i.code);
    expect(annual(null)).toEqual(["H.itr_afs_individual"]);
    expect(annual(2_000_000)).toEqual(["H.itr_afs_individual"]);
    expect(annual(5_000_000)).toEqual(["H.itr_afs_individual.3m"]);
  });

  it("prices on annual and one-time items never reach the quote", () => {
    const q = withSettings({}, {}, priced({ "H.afs_itr": 10000, "I.orus": 1500 }));
    expect(q).toMatchObject({ monthlyRetainer: 2000, oneTimeTotal: 0, complete: true });
  });
});

describe("buildQuote — missing prices and old schedules", () => {
  it("lists items without a price and leaves them out of the totals", () => {
    const q = withSettings({ vatRegistered: true }, {}, priced({ "B.individual": null }));
    expect(codes(q.missingPrices)).toEqual(["B.individual"]);
    expect(q.monthly.find((l) => l.code === "B.individual")?.amount).toBeNull();
    expect(q).toMatchObject({ monthlyRetainer: 2000, complete: false });
  });

  it("an empty template gives an empty, incomplete quote", () => {
    const q = withSettings({}, {}, FEE_TEMPLATE.map((t) => ({ ...t, price: null })));
    expect(q.monthlyRetainer).toBe(0);
    expect(codes(q.missingPrices)).toEqual(["A.individual", "F.0-50"]);
  });

  it("a schedule from before 26 Nov 2026 (with G) is flagged and its G levels are never charged", () => {
    const legacy: FeeItem[] = [
      ...priced(),
      { code: "G.light", component: "G", label: "Bookkeeping", band: "Light", billing: "monthly", isCustomQuote: false, unit: null, conditions: { bookkeeping: "light" }, price: 3000 },
      { code: "G.per_branch", component: "G", label: "Bookkeeping", band: "Each branch", billing: "per_unit_monthly", isCustomQuote: false, unit: "branch", conditions: { bookkeeping: "any", per: "branch" }, price: 1200 },
    ];
    const q = withSettings({ branches: 2 }, {}, legacy);
    expect(q.outdatedSchedule).toBe(true);
    expect(q.complete).toBe(false);
    expect(codes(q.monthly).some((c) => c.startsWith("G."))).toBe(false);
    expect(quote().outdatedSchedule).toBe(false);
  });
});

describe("buildQuote — tax on our fee, EWT note, validity", () => {
  it("non-VAT, prices include the 3% percentage tax", () => {
    const q = quote({ monthsBehind: 2 });
    expect(q.tax).toMatchObject({ kind: "percentage_tax_3", inclusive: true, monthly: 60, oneTime: 60, monthlyWithTax: 2000, oneTimeWithTax: 2000 });
    expect(q.tax.note).toMatch(/not VAT-registered.*include the 3% percentage tax/);
  });

  it("non-VAT, 3% added on top", () => {
    const q = withSettings({ monthsBehind: 1 }, { pricesIncludeTax: false });
    expect(q.tax).toMatchObject({ monthly: 60, monthlyWithTax: 2060, oneTime: 30, oneTimeWithTax: 1030 });
  });

  it("VAT-registered, inclusive and exclusive", () => {
    const inc = buildQuote({ profile: base, items: priced(), settings, taxOnFee: "vat_12", quoteDate: "2026-11-26" });
    expect(inc.tax).toMatchObject({ monthly: 214.29, monthlyWithTax: 2000 });
    expect(inc.tax.note).toBe("Our fees include 12% VAT.");
    const exc = buildQuote({ profile: base, items: priced(), settings: { ...settings, pricesIncludeTax: false }, taxOnFee: "vat_12", quoteDate: "2026-11-26" });
    expect(exc.tax).toMatchObject({ monthly: 240, monthlyWithTax: 2240 });
  });

  it("states that clients may withhold EWT on our fee (Q53)", () => {
    expect(quote().ewtNote).toBe(EWT_NOTE);
  });

  it("is valid for the schedule's number of days", () => {
    expect(quote().validUntil).toBe("2026-12-26");
  });

  it("shows the late-submission surcharge and whether it is automatic", () => {
    expect(quote().lateSurcharge).toBeNull();
    expect(withSettings({}, { lateSurchargeAmount: 500 }).lateSurcharge).toEqual({ amount: 500, auto: false });
  });

  it("adds centavos without drift", () => {
    const q = withSettings({ monthsBehind: 3 }, { catchUpFactor: 1 }, priced({ "A.individual": 0.1, "F.0-50": 0.2 }));
    expect(q.monthlyRetainer).toBe(0.3);
    expect(q.oneTimeTotal).toBe(0.9);
  });
});

describe("instantView", () => {
  it("shows the price and catch-up when the quote is complete", () => {
    const v = instantView(quote({ monthsBehind: 2 }));
    expect(v).toMatchObject({ priced: true, reason: null, monthlyRetainer: 2000, catchUp: { months: 2, amount: 2000 } });
    expect(v.lines).toEqual([{ label: "Base", band: "Individual", amount: 1000 }, { label: "Bookkeeping, by documents a month", band: "Up to 50 a month", amount: 1000 }]);
    expect(v.notIncluded.annual).toEqual(["Annual ITR with AFS (preparation) (Individual)", "Summary alphalist of withholding taxes (SAWT)"]);
    expect(v.notIncluded.audit).toEqual(["Audit of financial statements"]);
    expect(v.notIncluded.adHoc).toContain("BIR audit / LOA support");
  });

  it("an item on request hides every amount", () => {
    const v = instantView(quote({ documentsPerMonth: 400 }));
    expect(v).toMatchObject({ priced: false, reason: "on_request", monthlyRetainer: null });
    expect(v.lines.map((l) => l.band)).toContain("301 or more a month");
  });
});
