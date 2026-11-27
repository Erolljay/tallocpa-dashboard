/**
 * Catch-up accounting (migration 20270104000001_catch_up.sql): the Owner puts a client in
 * catch-up through a month end; staff record the past returns as filed outside the app and
 * the reviewer confirms them (no client approval, no payment check, no billing, never scored
 * late). They lock their months only when catch-up ends. Documents of the catch-up months
 * stay in their own month, on time, with no surcharge.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templatePayload } from "../../src/lib/ledger/coa";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "catch_up_test";

const OWNER = "00000000-0000-0000-0000-000000000f01";
const PREPARER = "00000000-0000-0000-0000-000000000f02";
const REVIEWER = "00000000-0000-0000-0000-000000000f03";

describe.skipIf(!url)("catch-up accounting", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;
  let client: string;
  const filing: Record<string, string> = {};

  async function as(user: string, sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  async function addFiling(key: string, form: string, rule: string, label: string, start: string, end: string, due: string) {
    const ob = (await db.query(
      `insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, 'monthly', '2026-01-01')
       on conflict (client_id, form, start_date) do update set form = excluded.form returning id`,
      [client, form],
    )).rows[0].id;
    filing[key] = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $8) returning id`,
      [ob, client, form, label, start, end, rule, due],
    )).rows[0].id;
  }
  const record = (user: string, key: string, data: Record<string, unknown>) =>
    as(user, `select status, catch_up, tax_due::text, filed_on::text from public.record_catch_up_filing($1, $2)`, [filing[key], JSON.stringify(data)]);
  const confirm = (user: string, key: string, action = "confirm", note: string | null = null) =>
    as(user, `select status from public.confirm_catch_up_filing($1, $2, $3)`, [filing[key], action, note]);
  const lockedBy = async (date: string) => (await db.query(`select private.books_locked_by($1, $2::date) as w`, [client, date])).rows[0].w;

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    for (const f of readdirSync(path.join(root, "migrations")).sort()) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(read("seed.sql"));
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [OWNER, PREPARER, REVIEWER]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Reviewer', 'reviewer')`,
      [OWNER, PREPARER, REVIEWER, brand],
    );
    client = (await db.query(
      `insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9961', 'Jaro Catch-up Trading', 'corporation', 'firm_remits') returning id`,
      [brand],
    )).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    // A fee schedule that bills a late-submission surcharge automatically.
    const sid = (await db.query(
      `insert into public.fee_schedules (brand_id, name, effective_from, late_surcharge_amount, late_surcharge_auto) values ($1, 'Catch-up test', '2026-01-01', 500, true) returning id`,
      [brand],
    )).rows[0].id;
    await db.query(`insert into public.fee_items (schedule_id, code, component, label, billing, price) values ($1, 'A.corporate', 'A', 'Bookkeeping', 'monthly', 1500)`, [sid]);
    await db.query(`update public.fee_schedules set status = 'active' where id = $1`, [sid]);

    await addFiling("jan0619", "0619-E", "0619E", "2026-01", "2026-01-01", "2026-01-31", "2026-02-10");
    await addFiling("feb1601", "1601-C", "1601C", "2026-02", "2026-02-01", "2026-02-28", "2026-03-10");
    await addFiling("nov0619", "0619-E", "0619E", "2026-11", "2026-11-01", "2026-11-30", "2026-12-10");
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("records nothing until the Owner puts the client in catch-up, and only the Owner can", async () => {
    await expect(record(PREPARER, "jan0619", { tax_due: 1000, filed_on: "2026-02-09", paid_on: "2026-02-09" })).rejects.toThrow(/not in catch-up/);
    await expect(as(PREPARER, `select public.set_catch_up($1, '2026-10-15')`, [client])).rejects.toThrow(/Only the Owner/);
    // Staff cannot change the client row directly either (nothing is updated).
    await as(PREPARER, `update public.clients set catch_up_through = '2026-10-31' where id = $1`, [client]).catch(() => null);
    expect((await db.query(`select catch_up_through from public.clients where id = $1`, [client])).rows[0].catch_up_through).toBeNull();
    await expect(as(OWNER, `select public.set_catch_up($1, '2027-03-01')`, [client])).rejects.toThrow(/this month at the latest/);
    const r = await as(OWNER, `select catch_up_through::text as t from public.set_catch_up($1, '2026-10-15')`, [client]);
    expect(r.rows[0].t).toBe("2026-10-31");
  });

  it("puts a past-month document in its own month: not late, no surcharge", async () => {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, late, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', 'purchase_receipt', '2026-11-01', '2026-03-01', true, 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'received') returning period::text, late`,
      [client, PREPARER],
    )).rows[0];
    expect(d).toEqual({ period: "2026-03-01", late: false });
    expect((await db.query(`select count(*)::int as n from public.late_surcharges where client_id = $1`, [client])).rows[0].n).toBe(0);
  });

  it("checks what is recorded, and refuses periods after the catch-up month", async () => {
    await expect(record(PREPARER, "jan0619", { filed_on: "2026-02-09" })).rejects.toThrow(/tax due/);
    await expect(record(PREPARER, "jan0619", { tax_due: 1000 })).rejects.toThrow(/date it was filed/);
    await expect(record(PREPARER, "jan0619", { tax_due: 1000, filed_on: "2026-02-09" })).rejects.toThrow(/date the tax was paid/);
    await expect(record(PREPARER, "nov0619", { tax_due: 0, filed_on: "2026-11-20" })).rejects.toThrow(/up to October 2026/);
  });

  it("staff record a return, the reviewer confirms it: Filed with no other step", async () => {
    const r = await record(PREPARER, "jan0619", { tax_due: 1000, filed_on: "2026-02-09", filing_reference: "EFPS-123", paid_on: "2026-02-09" });
    expect(r.rows[0]).toEqual({ status: "not_started", catch_up: true, tax_due: "1000.00", filed_on: "2026-02-09" });
    // The reviewer is told in the bell; the client is told nothing.
    const bell = (await db.query(`select user_id, kind from public.notifications where client_id = $1 order by created_at`, [client])).rows;
    expect(bell).toEqual([{ user_id: REVIEWER, kind: "return_ready_for_review" }]);
    await expect(confirm(PREPARER, "jan0619")).rejects.toThrow(/reviewer or the Owner/);
    expect((await confirm(REVIEWER, "jan0619")).rows[0].status).toBe("filed");
  });

  it("does not lock the month, bill the tax or score it late while the client is in catch-up", async () => {
    expect(await lockedBy("2026-01-15")).toBeNull();
    const bill = await as(OWNER, `select count(*)::int as n from public.ready_to_bill('2026-11-27') where client_id = $1 and kind = 'tax'`, [client]);
    expect(bill.rows[0].n).toBe(0);
    const late = await db.query(`select count(*)::int as n from private.late_filing_causes('2026-01-01', '2026-11-30', '2026-11-27') where client_id = $1`, [client]);
    expect(late.rows[0].n).toBe(0);
    // An unrecorded catch-up return (the February 1601-C) does not wait on the Books either.
    expect((await as(OWNER, `select public.filing_books_ready($1) as r`, [filing.feb1601])).rows[0].r).toBe(true);
  });

  it("sends a recorded return back with a reason, clearing what was recorded", async () => {
    await record(PREPARER, "feb1601", { tax_due: 0, filed_on: "2026-03-09" });
    await expect(confirm(REVIEWER, "feb1601", "send_back")).rejects.toThrow(/what needs fixing/);
    await confirm(REVIEWER, "feb1601", "send_back", "Wrong filing date");
    const f = (await db.query(`select catch_up, filed_on from public.filing_instances where id = $1`, [filing.feb1601])).rows[0];
    expect(f).toEqual({ catch_up: false, filed_on: null });
  });

  it("ends catch-up only once nothing waits for confirmation; then the filed months lock", async () => {
    await record(PREPARER, "feb1601", { tax_due: 0, filed_on: "2026-03-10" });
    await expect(as(OWNER, `select public.set_catch_up($1, null)`, [client])).rejects.toThrow(/still waiting/);
    await confirm(OWNER, "feb1601");
    await as(OWNER, `select public.set_catch_up($1, null)`, [client]);
    expect(await lockedBy("2026-01-15")).toBe("0619-E 2026-01");
    expect((await db.query(`select private.payroll_month_locked($1, '2026-02-01') as l`, [client])).rows[0].l).toBe(true);
    // Still never billed or scored late.
    const bill = await as(OWNER, `select count(*)::int as n from public.ready_to_bill('2026-11-27') where client_id = $1 and kind = 'tax'`, [client]);
    expect(bill.rows[0].n).toBe(0);
  });
});
