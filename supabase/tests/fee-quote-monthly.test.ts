/**
 * Migration 20261214000002_fee_quote_monthly.sql (Owner, 26 Nov 2026): drafts move
 * to the new structure without losing a price silently, active schedules stay as
 * they were, and the Owner's prices are seeded as a new draft for TC that gives the
 * quotes the Owner asked for.
 *
 * Runs the migrations before it, adds schedules made on the old structure, then runs
 * it. Own database, like fees.test.ts. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { OWNER_PRICES } from "@/lib/fees/owner-prices.fixture";
import { buildQuote } from "@/lib/fees/quote";
import { FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, toFeeItem, toSettings, type FeeItemRow, type FeeScheduleRow } from "@/lib/fees/schedule";
import { templateRows } from "@/lib/fees/template";
import type { ClientProfile } from "@/lib/fees/types";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "fee_quote_monthly_test";
const MIGRATION = "20261214000002_fee_quote_monthly.sql";
const SEEDED = "2027 schedule (Owner's prices, 26 Nov 2026)";

const OWNER = "00000000-0000-0000-0000-000000000021";

/** The items of a schedule made from the template before 26 Nov 2026, with prices. */
const OLD_ITEMS: [string, string, string, string | null, string, number | null, boolean, object][] = [
  ["A.individual", "A", "Base", "Individual", "monthly", 1000, false, { taxpayer_types: ["individual"] }],
  ["D.50plus", "D", "Payroll withholding (1601-C)", "50 or more employees", "monthly", 3001, false, { employees: { min: 50, max: null } }],
  ["D.per_employee", "D", "Payroll withholding (1601-C)", "Each employee above 50", "per_unit_monthly", 20, false, { employees: { min: 51, max: null }, per: "employee", above: 50 }],
  ["F.0-50", "F", "Document volume", "Up to 50 a month (included)", "monthly", 0, false, { documents: { min: 0, max: 50 } }],
  ["F.51-150", "F", "Document volume", "51–150 a month", "monthly", 700, false, { documents: { min: 51, max: 150 } }],
  ["F.151-300", "F", "Document volume", "151–300 a month", "monthly", 1400, false, { documents: { min: 151, max: 300 } }],
  ["F.301plus", "F", "Document volume", "301 or more a month", "monthly", null, true, { documents: { min: 301, max: null } }],
  ["G.light", "G", "Bookkeeping", "Light", "monthly", 3000, false, { bookkeeping: "light" }],
  ["G.standard", "G", "Bookkeeping", "Standard", "monthly", 5000, false, { bookkeeping: "standard" }],
  ["G.heavy", "G", "Bookkeeping", "Heavy", "monthly", 8000, false, { bookkeeping: "heavy" }],
  ["G.x_inventory", "G", "Bookkeeping factor", "Inventory", "multiplier", 1.25, false, { bookkeeping: "any", complexity: "inventory", of: "bookkeeping" }],
  ["G.per_branch", "G", "Bookkeeping", "Each branch", "per_unit_monthly", 1200, false, { bookkeeping: "any", per: "branch" }],
  ["H.1604c", "H", "Annual information return 1604-C", null, "annual", 1500, false, { employees: { min: 1, max: null } }],
  ["H.afs_itr", "H", "Annual financial statements and income tax return", null, "annual", 10000, false, {}],
  ["I.backlog_month", "I", "Backlog catch-up", "Per month behind", "multiplier", 1, false, { of: "monthly_retainer" }],
  ["I.orus", "I", "ORUS registration", null, "one_time", 1500, false, {}],
  ["K.fs_audit", "K", "Financial statement audit", null, "one_time", null, true, {}],
];

describe.skipIf(!url)("fee schedule: monthly quotes (migration of 26 Nov 2026)", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;
  let draftId: string;
  let activeId: string;
  let activeBefore: unknown[];

  const items = async (id: string) =>
    (await db.query(`select ${FEE_ITEM_COLUMNS} from public.fee_items where schedule_id = $1 order by sort_order, code`, [id])).rows as FeeItemRow[];
  const schedule = async (id: string) => (await db.query(`select ${FEE_SCHEDULE_COLUMNS} from public.fee_schedules where id = $1`, [id])).rows[0] as FeeScheduleRow;

  async function oldSchedule(name: string, effectiveFrom: string) {
    const id = (await db.query(`insert into public.fee_schedules (brand_id, name, effective_from, notes) values ($1, $2, $3, 'Owner draft') returning id`, [brand, name, effectiveFrom])).rows[0].id as string;
    for (const [n, [code, component, label, band, billing, price, custom, conditions]] of OLD_ITEMS.entries()) {
      await db.query(
        `insert into public.fee_items (schedule_id, code, component, label, band_label, billing, price, is_custom_quote, conditions, sort_order) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [id, code, component, label, band, billing, price, custom, JSON.stringify(conditions), (n + 1) * 10],
      );
    }
    return id;
  }

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    const files = readdirSync(path.join(root, "migrations")).sort();
    const at = files.indexOf(MIGRATION);
    expect(at).toBeGreaterThan(0);
    for (const f of files.slice(0, at)) await db.query(read(`migrations/${f}`));

    brand = (await db.query(`insert into public.brands (code, display_name, legal_name) values ('TC', 'Tallo CPA', 'Tallo CPA') returning id`)).rows[0].id;
    await db.query(`insert into auth.users (id) values ($1)`, [OWNER]);
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $2, 'Owner', 'owner')`, [OWNER, brand]);

    // An active schedule and a draft, both on the old structure.
    activeId = await oldSchedule("2026 schedule", "2026-01-01");
    await db.query(`update public.fee_schedules set status = 'active' where id = $1`, [activeId]);
    activeBefore = (await db.query(`select code, price, label, billing, conditions from public.fee_items where schedule_id = $1 order by code`, [activeId])).rows;
    draftId = await oldSchedule("2027 draft", "2027-01-01");

    for (const f of files.slice(at)) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("leaves the active schedule exactly as it was", async () => {
    const after = (await db.query(`select code, price, label, billing, conditions from public.fee_items where schedule_id = $1 order by code`, [activeId])).rows;
    expect(after).toEqual(activeBefore);
    const s = await schedule(activeId);
    expect(s).toMatchObject({ status: "active", catch_up_factor: null, monthly_cap: null, notes: "Owner draft" });
  });

  it("moves a draft to the new structure, keeping the prices that map", async () => {
    const rows = await items(draftId);
    const by = new Map(rows.map((r) => [r.code, r]));
    const price = (c: string) => (by.get(c)?.price == null ? null : Number(by.get(c)!.price));
    expect(rows.some((r) => r.component === "G")).toBe(false);
    expect(by.has("I.backlog_month")).toBe(false);
    expect(by.has("H.afs_itr")).toBe(false);
    // Kept: base, payroll (incl. per employee), per branch (G → F), 1604-C, ORUS, the ITR on both new items.
    expect([price("A.individual"), price("D.50plus"), price("D.per_employee"), price("F.per_branch"), price("H.1604c"), price("I.orus")]).toEqual([1000, 3001, 20, 1200, 1500, 1500]);
    expect([price("H.itr_afs_individual"), price("H.itr_afs_partnership"), price("H.itr_afs_corporation")]).toEqual([10000, 10000, 10000]);
    expect(by.get("H.itr_afs_individual")).toMatchObject({ label: "Annual ITR with AFS (preparation)", band_label: "Individual", conditions: { taxpayer_types: ["individual"] } });
    // Cleared for the Owner: the bands now carry the whole bookkeeping fee; the add-on is new.
    expect([price("F.0-50"), price("F.51-150"), price("F.151-300"), price("F.complexity")]).toEqual([null, null, null, null]);
    expect(by.get("F.51-150")).toMatchObject({ label: "Bookkeeping, by documents a month", band_label: "51–150 a month" });
    expect(by.get("F.per_branch")).toMatchObject({ component: "F", conditions: { per: "branch" } });
    // The unpriced K.fs_audit gives way to the audit by sales band, to be priced.
    expect(by.has("K.fs_audit")).toBe(false);
    expect(by.get("H.audit_corporation_3m-10m")).toMatchObject({ price: null, billing: "annual", conditions: { taxpayer_types: ["corporation", "opc", "non_stock"], annual_sales: { min: 3000001, max: 10000000 } } });
    expect(by.get("I.registration_non_individual")).toMatchObject({ price: null, billing: "one_time" });
    // Every template code of F, H, I and K is there (A–E are left as the Owner had them).
    for (const t of templateRows().filter((r) => "FHIK".includes(r.component))) expect(by.has(t.code), t.code).toBe(true);

    const s = await schedule(draftId);
    expect(Number(s.catch_up_factor)).toBe(1);
    expect(s.notes).toMatch(/^Owner draft\n\n26 Nov 2026: moved to the new structure\./);
    for (const p of ["Document volume (Up to 50 a month (included)) ₱0.00", "Document volume (51–150 a month) ₱700.00", "Document volume (151–300 a month) ₱1,400.00",
      "Bookkeeping (Light) ₱3,000.00", "Bookkeeping (Standard) ₱5,000.00", "Bookkeeping (Heavy) ₱8,000.00", "Bookkeeping factor (Inventory) × 1.25"]) {
      expect(s.notes).toContain(p);
    }
  });

  it("the moved draft and the active schedule both read in the app", async () => {
    for (const id of [draftId, activeId]) expect(() => (async () => (await items(id)).map(toFeeItem))()).not.toThrow();
    const active = (await items(activeId)).map(toFeeItem);
    const q = buildQuote({ profile: { taxpayerType: "individual", vatRegistered: false, ewt: "none", employees: 0, remitsContributions: false, documentsPerMonth: 10, complexity: [], branches: 0, monthsBehind: 0 }, items: active, settings: toSettings(await schedule(activeId)), taxOnFee: "percentage_tax_3", quoteDate: "2026-11-26" });
    expect(q.outdatedSchedule).toBe(true);
    expect(q.complete).toBe(false);
  });

  describe("the seeded draft (the Owner's prices)", () => {
    let seededId: string;
    beforeAll(async () => {
      seededId = (await db.query(`select id from public.fee_schedules where name = $1`, [SEEDED])).rows[0].id;
    });

    it("is a draft for TC with the cap and catch-up at half, every template item, and the Owner's prices", async () => {
      const s = await schedule(seededId);
      expect(s).toMatchObject({ status: "draft", brand_id: brand, effective_from: expect.anything(), prices_include_tax: true });
      expect([Number(s.monthly_cap), Number(s.catch_up_factor)]).toEqual([6000, 0.5]);
      const rows = await items(seededId);
      expect(rows.map((r) => r.code)).toEqual(templateRows().map((r) => r.code));
      const prices = Object.fromEntries(rows.filter((r) => r.price !== null).map((r) => [r.code, Number(r.price)]));
      expect(prices).toEqual(OWNER_PRICES);
      expect(prices).toMatchObject({ "A.corporate": 1500, "H.sawt": 500, "I.business_permit": 3500, "I.closure": 20000, "I.registration_non_individual": 12500, "I.pagibig_registration": 1500 });
      const onRequest = rows.filter((r) => r.is_custom_quote).map((r) => r.code);
      expect(onRequest).toEqual([
        "D.50plus", "E.50plus", "F.301plus", "H.audit_proprietor_100mplus", "H.audit_partnership_100mplus", "H.audit_corporation_100mplus",
        "I.amended_return", "I.certificate", "K.bir_audit_support", "K.aup", "K.cas", "K.systems_implementation", "K.ai_automation",
      ]);
      expect(prices).toMatchObject({ "H.audit_proprietor_0-3m": 8000, "H.audit_partnership_10m-20m": 24000, "H.audit_corporation_50m-100m": 56000 });
      expect(prices).toMatchObject({ "H.itr_afs_individual": 5000, "H.itr_afs_partnership": 7500, "H.itr_afs_corporation": 10000 });
      expect(rows.find((r) => r.code === "I.business_permit")).toMatchObject({ label: "Business permit (Iloilo City)", band_label: "New or renewal · Iloilo City clients only" });
      expect(rows.find((r) => r.code === "I.sec_amendment")).toMatchObject({ label: "SEC amendment", price: "15000.00" });
    });

    it("gives the quotes the Owner asked for", async () => {
      const its = (await items(seededId)).map(toFeeItem);
      const settings = toSettings(await schedule(seededId));
      const base: ClientProfile = { taxpayerType: "individual", vatRegistered: false, ewt: "none", employees: 0, remitsContributions: false, documentsPerMonth: 40, complexity: [], branches: 0, monthsBehind: 0 };
      const quote = (p: Partial<ClientProfile>) => buildQuote({ profile: { ...base, ...p }, items: its, settings, taxOnFee: "percentage_tax_3", quoteDate: "2026-11-26" });

      expect(quote({})).toMatchObject({ monthlyRetainer: 2000, complete: true });
      const corp = quote({ taxpayerType: "corporation", vatRegistered: true, ewt: "rental", employees: 5, remitsContributions: true, documentsPerMonth: 120, monthsBehind: 2 });
      expect(corp).toMatchObject({ monthlyRetainer: 4900, oneTimeTotal: 4900, complete: true });
      expect(quote({ vatRegistered: true, complexity: ["inventory"], documentsPerMonth: 200 })).toMatchObject({ monthlyRetainer: 4500, complete: true });
      const big = quote({ taxpayerType: "corporation", vatRegistered: true, ewt: "tamp_regular", employees: 25, remitsContributions: true, complexity: ["inventory"], documentsPerMonth: 250 });
      expect(big).toMatchObject({ monthlyRetainer: 7200, overCap: true, complete: false });
      // Annual and ad hoc jobs are never quote lines.
      expect(corp.monthly.some((l) => /^[HIK]\./.test(l.code))).toBe(false);
    });

    it("the Owner can activate it as it is: annual and ad hoc jobs need no price", async () => {
      await db.query("begin");
      try {
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
        await db.query("set local role authenticated");
        await db.query(`update public.fee_schedules set effective_from = '2027-01-01' where id = $1`, [seededId]);
        const r = (await db.query(`update public.fee_schedules set status = 'active' where id = $1 returning status`, [seededId])).rows[0];
        expect(r.status).toBe("active");
      } finally {
        await db.query("rollback");
      }
    });

    it("a new draft takes the cap and the catch-up factor", async () => {
      await db.query("begin");
      try {
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
        await db.query("set local role authenticated");
        const id = (await db.query(`select public.create_fee_schedule_draft($1::jsonb, $2::jsonb) as id`, [
          JSON.stringify({ brand_id: brand, name: "From the app", effective_from: "2028-01-01", monthly_cap: 7000, catch_up_factor: 0.75 }),
          JSON.stringify(templateRows()),
        ])).rows[0].id;
        const s = (await db.query(`select monthly_cap::float as cap, catch_up_factor::float as f from public.fee_schedules where id = $1`, [id])).rows[0];
        expect(s).toEqual({ cap: 7000, f: 0.75 });
        expect((await db.query(`select count(*)::int as n from public.fee_items where schedule_id = $1`, [id])).rows[0].n).toBe(templateRows().length);
      } finally {
        await db.query("rollback");
      }
    });
  });
});
