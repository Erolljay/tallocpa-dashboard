import { describe, expect, it } from "vitest";
import { canonicalContent } from "@/lib/funnel/terms";
import { OWNER_PRICES, OWNER_SETTINGS } from "./owner-prices.fixture";
import { auditIndependenceWarning, buildProposalQuote, jobField, jobOptions, readJobs, type ProposalJob } from "./proposal";
import { buildQuote } from "./quote";
import { FEE_TEMPLATE } from "./template";
import type { ClientProfile, FeeItem } from "./types";

/** The Owner's prices of 26 Nov 2026, with 1604-C at ₱2,000 so a test can tell an override. */
const PRICES: Record<string, number> = { ...OWNER_PRICES, "H.1604c": 2000 };
const items: FeeItem[] = FEE_TEMPLATE.map((t) => ({ ...t, price: t.isCustomQuote ? null : (PRICES[t.code] ?? null) }));

const corp: ClientProfile = {
  taxpayerType: "corporation", vatRegistered: true, ewt: "rental", employees: 5, remitsContributions: true, documentsPerMonth: 120, complexity: [], branches: 0, monthsBehind: 2,
};
const quoteFor = (p: ClientProfile) => buildQuote({ profile: p, items, settings: OWNER_SETTINGS, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-26" });
const form = (values: Record<string, string>) => (field: string) => values[field] ?? null;

describe("jobOptions", () => {
  it("offers every annual and ad hoc job, those that apply first, with the schedule's price", () => {
    const options = jobOptions(items, corp);
    expect(options.filter((o) => o.group === "annual").map((o) => [o.code, o.suggested])).toEqual([
      ["H.itr_afs_corporation", true], ["H.1604c", true], ["H.1604e", true], ["H.sawt", true],
      ["H.itr_afs_individual", false], ["H.itr_afs_partnership", false], ["H.inventory_list", false],
    ]);
    expect(options.find((o) => o.code === "H.itr_afs_corporation")).toMatchObject({ label: "Annual ITR with AFS (preparation)", schedulePrice: 10000, bands: null, billed: "billed in April" });
    expect(options.find((o) => o.code === "H.itr_afs_partnership")?.schedulePrice).toBe(7500);
    expect(options.find((o) => o.code === "H.itr_afs_individual")?.schedulePrice).toBe(5000);
    expect(options.find((o) => o.code === "K.bir_audit_support")).toMatchObject({ group: "ad_hoc", onRequest: true, schedulePrice: null, billed: "billed when done" });
    expect(options.some((o) => /^[A-F]\./.test(o.code))).toBe(false);
  });
});

describe("readJobs", () => {
  const options = jobOptions(items, corp);

  it("reads the ticked jobs with their prices", () => {
    const r = readJobs(options, form({ [jobField.ticked("H.1604c")]: "1", [jobField.price("H.1604c")]: "2,000", [jobField.ticked("I.orus")]: "1", [jobField.price("I.orus")]: "1500", [jobField.price("H.sawt")]: "900" }));
    expect(r).toEqual({
      jobs: [
        { code: "H.1604c", label: "Annual information return 1604-C", band: null, group: "annual", amount: 2000, schedulePrice: 2000, note: null, billed: "billed in January" },
        { code: "I.orus", label: "ORUS and BIR registration updates", band: null, group: "ad_hoc", amount: 1500, schedulePrice: 1500, note: null, billed: "billed when done" },
      ],
    });
  });

  it("takes the schedule's price when none is typed, and needs a note when the price differs", () => {
    expect(readJobs(options, form({ [jobField.ticked("H.itr_afs_corporation")]: "1" }))).toMatchObject({ jobs: [{ code: "H.itr_afs_corporation", amount: 10000, schedulePrice: 10000, note: null }] });
    const ticked = { [jobField.ticked("H.itr_afs_corporation")]: "1", [jobField.price("H.itr_afs_corporation")]: "12000" };
    expect(readJobs(options, form(ticked))).toEqual({ error: "Annual ITR with AFS (preparation) (Corporation, OPC or non-stock): the price differs from the schedule's, so add a note saying why." });
    const r = readJobs(options, form({ ...ticked, [jobField.note("H.itr_afs_corporation")]: "Two companies' consolidation" }));
    expect(r).toMatchObject({ jobs: [{ amount: 12000, schedulePrice: 10000, note: "Two companies' consolidation" }] });
  });

  it("a ticked job needs a price; a job on request takes the price typed", () => {
    expect(readJobs(options, form({ [jobField.ticked("K.bir_audit_support")]: "1" }))).toEqual({ error: "BIR audit / LOA support: enter its price (quoted on request), or untick it." });
    expect(readJobs(options, form({ [jobField.ticked("K.bir_audit_support")]: "1", [jobField.price("K.bir_audit_support")]: "abc" }))).toHaveProperty("error");
    expect(readJobs(options, form({ [jobField.ticked("K.bir_audit_support")]: "1", [jobField.price("K.bir_audit_support")]: "25000" }))).toMatchObject({ jobs: [{ amount: 25000, note: null }] });
  });
});

describe("buildProposalQuote", () => {
  const jobs: ProposalJob[] = [
    { code: "H.itr_afs_corporation", label: "Annual ITR with AFS (preparation)", band: "Corporation, OPC or non-stock", group: "annual", amount: 10000, schedulePrice: 10000, note: null, billed: "billed in April" },
    { code: "H.1604c", label: "Annual information return 1604-C", band: null, group: "annual", amount: 2000, schedulePrice: 2000, note: null, billed: "billed in January" },
    { code: "I.orus", label: "ORUS and BIR registration updates", band: null, group: "ad_hoc", amount: 1500, schedulePrice: 1500, note: null, billed: "billed when done" },
  ];

  it("monthly + catch-up + 2 annual + 1 ad hoc job, in separate groups and with no grand total", () => {
    const r = buildProposalQuote(quoteFor(corp), jobs, { monthly: null, catchUpFactor: 0.5 });
    if (!("quote" in r)) throw new Error(r.error);
    const q = r.quote;
    expect(q.monthlyRetainer).toBe(4900);
    expect(q.catchUp?.amount).toBe(4900);
    expect(q.annualJobs.map((j) => j.code)).toEqual(["H.itr_afs_corporation", "H.1604c"]);
    expect(q.adHocJobs.map((j) => j.code)).toEqual(["I.orus"]);
    expect(q.notIncluded.map((n) => n.code)).not.toContain("H.1604c");
    expect(q).not.toHaveProperty("firstYearTotal");
  });

  it("the accepted content's hash covers every job and its price", () => {
    const r = buildProposalQuote(quoteFor(corp), jobs, { monthly: null, catchUpFactor: 0.5 });
    if (!("quote" in r)) throw new Error(r.error);
    const content = (quote: unknown) => canonicalContent({ firm: "Tallo CPA", client: "Client A Corp.", quote, terms: "Terms.", validUntil: "2026-12-26" });
    const text = content(r.quote);
    expect(text).toContain('"annualJobs":[');
    expect(text).toContain('"code":"I.orus"');
    const cheaper = { ...r.quote, adHocJobs: [{ ...r.quote.adHocJobs[0], amount: 1000 }] };
    expect(content(cheaper)).not.toBe(text);
  });

  it("over the cap: needs the agreed monthly retainer, and works catch-up out on it", () => {
    const big: ClientProfile = { ...corp, ewt: "tamp_regular", employees: 25, complexity: ["inventory"], documentsPerMonth: 250, monthsBehind: 2 };
    const q = quoteFor(big);
    expect(q.overCap).toBe(true);
    expect(buildProposalQuote(q, [], { monthly: null, catchUpFactor: 0.5 })).toHaveProperty("error");
    const r = buildProposalQuote(q, [], { monthly: 7000, catchUpFactor: 0.5 });
    if (!("quote" in r)) throw new Error(r.error);
    expect(r.quote).toMatchObject({ agreedMonthly: 7000, monthlyRetainer: 7000, catchUp: { months: 2, amount: 7000 }, oneTimeTotal: 7000 });
    expect(r.quote.tax.monthly).toBe(210);
  });

  it("refuses a schedule from before 26 Nov 2026", () => {
    expect(buildProposalQuote({ ...quoteFor(corp), outdatedSchedule: true }, [], { monthly: null, catchUpFactor: 0.5 })).toHaveProperty("error");
  });
});

describe("the audit, by taxpayer type and annual gross sales (Owner, 26 Nov 2026)", () => {
  const ticked = (extra: Record<string, string> = {}) => form({ [jobField.ticked("H.audit_corporation_0-3m")]: "1", ...extra });

  it("is one choice, with the bands for the lead's taxpayer type (OPC and non-stock at the corporation price)", () => {
    const audit = jobOptions(items, corp).filter((o) => o.label === "Audit of financial statements");
    expect(audit).toHaveLength(1);
    expect(audit[0].group).toBe("audit");
    expect(jobOptions(items, corp).at(-1)?.group).toBe("audit");
    expect(audit[0].bands?.map((b) => [b.code, b.price])).toEqual([
      ["H.audit_corporation_0-3m", 16000], ["H.audit_corporation_3m-10m", 24000], ["H.audit_corporation_10m-20m", 32000],
      ["H.audit_corporation_20m-50m", 48000], ["H.audit_corporation_50m-100m", 56000], ["H.audit_corporation_100mplus", null],
    ]);
    for (const t of ["opc", "non_stock"] as const) expect(jobOptions(items, { ...corp, taxpayerType: t }).find((o) => o.label === "Audit of financial statements")?.code).toBe("H.audit_corporation_0-3m");
    expect(jobOptions(items, { ...corp, taxpayerType: "partnership" }).find((o) => o.label === "Audit of financial statements")?.bands?.[0].price).toBe(12000);
    expect(jobOptions(items, { ...corp, taxpayerType: "individual" }).find((o) => o.label === "Audit of financial statements")?.bands?.[0].price).toBe(8000);
  });

  it.each([
    [0, "H.audit_corporation_0-3m", 16000],
    [3_000_000, "H.audit_corporation_0-3m", 16000],
    [3_000_000.01, "H.audit_corporation_3m-10m", 24000],
    [3_000_001, "H.audit_corporation_3m-10m", 24000],
    [10_000_000, "H.audit_corporation_3m-10m", 24000],
    [10_000_001, "H.audit_corporation_10m-20m", 32000],
    [20_000_000, "H.audit_corporation_10m-20m", 32000],
    [50_000_000, "H.audit_corporation_20m-50m", 48000],
    [100_000_000, "H.audit_corporation_50m-100m", 56000],
  ])("sales ₱%d → %s at %d (an edge stays in the lower band)", (sales, code, price) => {
    expect(readJobs(jobOptions(items, corp), ticked(), sales)).toMatchObject({ jobs: [{ code, amount: price, schedulePrice: price, note: null, billed: "billed when the audit report is issued" }] });
  });

  it("needs the sales; over ₱100M is quoted on request; an override needs a note", () => {
    const options = jobOptions(items, corp);
    expect(readJobs(options, ticked(), null)).toEqual({ error: "Audit of financial statements: enter the client's annual gross sales; the price depends on them." });
    expect(readJobs(options, ticked(), 100_000_001)).toEqual({ error: "Audit of financial statements (Corporation, OPC or non-stock · sales over ₱100M): enter its price (quoted on request), or untick it." });
    expect(readJobs(options, ticked({ [jobField.price("H.audit_corporation_0-3m")]: "90,000" }), 150_000_000)).toMatchObject({ jobs: [{ code: "H.audit_corporation_100mplus", amount: 90000, schedulePrice: null }] });
    expect(readJobs(options, ticked({ [jobField.price("H.audit_corporation_0-3m")]: "20000" }), 2_000_000)).toHaveProperty("error");
    expect(readJobs(options, ticked({ [jobField.price("H.audit_corporation_0-3m")]: "20000", [jobField.note("H.audit_corporation_0-3m")]: "Two branches" }), 2_000_000)).toMatchObject({ jobs: [{ amount: 20000, schedulePrice: 16000 }] });
  });

  it("warns, without blocking, when the audit comes with bookkeeping for the same client", () => {
    const r = readJobs(jobOptions(items, corp), ticked(), 2_000_000);
    if (!("jobs" in r)) throw new Error(r.error);
    expect(auditIndependenceWarning(r.jobs, true)).toMatch(/We do not audit statements we prepared/);
    expect(auditIndependenceWarning(r.jobs, false)).toBeNull();
    expect(auditIndependenceWarning([{ label: "Annual information return 1604-C" }], true)).toBeNull();
    const built = buildProposalQuote(quoteFor(corp), r.jobs, { monthly: null, catchUpFactor: 0.5, annualSales: 2_000_000 });
    expect(built).toMatchObject({ quote: { annualSales: 2_000_000, annualJobs: [], audit: { code: "H.audit_corporation_0-3m", amount: 16000, indicative: true } } });
    if ("quote" in built) expect(built.quote.notIncluded.map((n) => n.label)).not.toContain("Audit of financial statements");
  });
});
