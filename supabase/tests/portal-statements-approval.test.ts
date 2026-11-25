/**
 * Owner's decision (option b), migration 20261207000001: the financial statements of a
 * closed month show in the client's portal only once every monthly or quarterly return
 * covering it has reached the client's approval (client_approved, owner_approved or
 * filed; a nil return once past that step). A month no return covers shows on the lock
 * alone; a range (quarter, year) only when none of its months is held. Staff see every
 * closed month; the loose-leaf books keep the lock-only rule.
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
const DB_NAME = "portal_statements_approval_test";

const OWNER = "00000000-0000-0000-0000-000000000f01";
const PREPARER = "00000000-0000-0000-0000-000000000f02";
const REVIEWER = "00000000-0000-0000-0000-000000000f03";
const USER_A = "00000000-0000-0000-0000-000000000f04";
const USER_B = "00000000-0000-0000-0000-000000000f05";

const MONTHS = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"];
const monthEnd = (ym: string) => new Date(Date.UTC(Number(ym.slice(0, 4)), Number(ym.slice(5, 7)), 0)).toISOString().slice(0, 10);

describe.skipIf(!url)("portal statements wait for the client's approval of the returns", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let clientA: string;
  let clientB: string;
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
  const tb = (user: string, from: string, to: string, client = clientA) =>
    as(user, `select code, closing::text from public.portal_trial_balance($1, $2, $3) where closing <> 0 order by code`, [client, from, to]);
  const holds = async (user = USER_A, client = clientA) =>
    ((await as(user, `select public.portal_books($1) as b`, [client])).rows[0].b.statement_holds as { month: string; form: string; period_label: string; status: string }[]);
  const heldMonths = async () => [...new Set((await holds()).map((h) => h.month.slice(0, 7)))].sort();
  const advance = (user: string, id: string, action: string, data: Record<string, unknown> = {}) =>
    as(user, `select public.advance_filing($1, $2, null, $3)`, [id, action, JSON.stringify(data)]);
  /** Prepared, reviewed and approved by the client, through the real sign-off chain. */
  const approve = async (id: string, taxDue = 100) => {
    await advance(PREPARER, id, "prepare", { tax_due: taxDue });
    await advance(REVIEWER, id, "review");
    if (taxDue > 0) await advance(USER_A, id, "client_approve");
  };
  const status = async (id: string) => (await db.query(`select status from public.filing_instances where id = $1`, [id])).rows[0].status;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, REVIEWER, USER_A, USER_B]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Reviewer', 'reviewer')`,
      [OWNER, PREPARER, REVIEWER, brand],
    );
    clientA = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9931', 'Molo Bakery', 'corporation') returning id`, [brand])).rows[0].id;
    clientB = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9932', 'Jaro Hardware', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer'), ($4, $2, 'preparer'), ($4, $3, 'reviewer')`, [clientA, PREPARER, REVIEWER, clientB]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Molo'), ($3, $4, 'Owner of Jaro')`, [USER_A, clientA, USER_B, clientB]);

    for (const client of [clientA, clientB]) {
      await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
      const sales = (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = 'sales'`, [client])).rows[0].id;
      for (const m of MONTHS) {
        await as(PREPARER, `select public.save_book_invoice($1, $2)`, [
          client, JSON.stringify({ kind: "sales", party_name: "Walk-in", issue_date: `${m}-10`, lines: [{ account_id: sales, amount: "1000" }] }),
        ]);
        await as(REVIEWER, `select public.lock_books_month($1, $2)`, [client, `${m}-01`]);
      }
    }

    // Client A: 1601-C each month, 2550Q each quarter, and the annual 1702-RT.
    const obligation = async (form: string, frequency: string) =>
      (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, $3, '2026-01-01') returning id`, [clientA, form, frequency])).rows[0].id;
    const add = async (key: string, ob: string, form: string, rule: string, label: string, start: string, end: string) => {
      filing[key] = (await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
         values ($1, $2, $3, $4, $5, $6, $7, $6::date + 25, $6::date + 25) returning id`,
        [ob, clientA, form, label, start, end, rule],
      )).rows[0].id;
    };
    const c = await obligation("1601-C", "monthly");
    for (const m of MONTHS) await add(`c${m.slice(5)}`, c, "1601-C", "1601C", m, `${m}-01`, monthEnd(m));
    const q = await obligation("2550Q", "quarterly");
    await add("q1", q, "2550Q", "2550Q", "Q1 2026", "2026-01-01", "2026-03-31");
    await add("q2", q, "2550Q", "2550Q", "Q2 2026", "2026-04-01", "2026-06-30");
    const yearly = await obligation("1702-RT", "annual");
    await add("annual", yearly, "1702-RT", "1702RT", "2026", "2026-01-01", "2026-12-31");
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("hold every closed month while its monthly and quarterly returns wait, with the returns named", async () => {
    expect(await heldMonths()).toEqual(MONTHS);
    const jan = (await holds()).filter((h) => h.month === "2026-01-01").map((h) => `${h.form} ${h.period_label} ${h.status}`).sort();
    // The annual 1702-RT covers January too but holds nothing.
    expect(jan).toEqual(["1601-C 2026-01 not_started", "2550Q Q1 2026 not_started"]);
    await expect(tb(USER_A, "2026-01-01", "2026-01-31")).rejects.toThrow(/statements for January 2026 wait for your approval/);
  });

  it("leave staff unaffected", async () => {
    expect(await holds(REVIEWER)).toEqual([]);
    expect((await tb(REVIEWER, "2026-01-01", "2026-06-30")).rows.length).toBeGreaterThan(0);
  });

  it("leave the loose-leaf books on the lock alone", async () => {
    const d = (await as(USER_A, `select public.portal_book_entries($1, '2026-01-01', '2026-01-31') as d`, [clientA])).rows[0].d;
    expect(d.entries).toHaveLength(1);
    const openings = (await as(USER_A, `select count(*)::int as n from public.portal_book_openings($1, '2026-02-01', '2026-02-28') where opening <> 0`, [clientA])).rows[0].n;
    expect(openings).toBeGreaterThan(0);
    await expect(as(USER_A, `select * from public.portal_book_openings($1, '2026-07-01', '2026-07-31')`, [clientA])).rejects.toThrow(/not locked yet/);
  });

  it("hold months 1 and 2 of a quarter until the quarter's return is approved", async () => {
    await approve(filing.c01);
    await approve(filing.c02);
    expect(await status(filing.c01)).toBe("client_approved");
    // January's and February's own 1601-C are approved; the Q1 2550Q is not.
    expect(await heldMonths()).toEqual(MONTHS);
    await approve(filing.q1);
    expect(await heldMonths()).toEqual(["2026-03", "2026-04", "2026-05", "2026-06"]);
    expect((await tb(USER_A, "2026-01-01", "2026-02-28")).rows.find((r) => r.code.startsWith("4"))?.closing).toBe("-2000.00");
    // The quarter waits for March.
    await expect(tb(USER_A, "2026-01-01", "2026-03-31")).rejects.toThrow(/March 2026 wait for your approval/);
  });

  it("count a nil return once it is past the client's approval", async () => {
    await approve(filing.c03, 0);
    expect(await status(filing.c03)).toBe("client_approved");
    expect(await heldMonths()).toEqual(["2026-04", "2026-05", "2026-06"]);
    expect((await tb(USER_A, "2026-01-01", "2026-03-31")).rows.find((r) => r.code.startsWith("4"))?.closing).toBe("-3000.00");
  });

  it("show a quarter or a longer range only when all its months show", async () => {
    for (const k of ["c04", "c05", "c06"]) await approve(filing[k]);
    expect(await heldMonths()).toEqual(["2026-04", "2026-05", "2026-06"]);
    await expect(tb(USER_A, "2026-01-01", "2026-06-30")).rejects.toThrow(/April 2026 wait/);
    await db.query(`update public.filing_instances set status = 'filed' where id = $1`, [filing.q2]);
    expect(await heldMonths()).toEqual([]);
    expect((await tb(USER_A, "2026-01-01", "2026-06-30")).rows.find((r) => r.code.startsWith("4"))?.closing).toBe("-6000.00");
  });

  it("keep an approved original when an amended return starts over, but not an approval sent back", async () => {
    await db.query(`update public.filing_instances set status = 'filed' where id = $1`, [filing.q1]);
    const amended = (await as(REVIEWER, `select public.amend_filing($1, 'Missed invoice') as id`, [filing.q1])).rows[0].id;
    expect(await status(amended)).toBe("not_started");
    expect(await heldMonths()).toEqual([]);
    // February's approved 1601-C sent back by the reviewer: its approval no longer stands.
    await as(REVIEWER, `select public.advance_filing($1, 'kick_back', 'Wrong figure', '{}')`, [filing.c02]);
    expect(await status(filing.c02)).toBe("not_started");
    expect(await heldMonths()).toEqual(["2026-02"]);
    await expect(tb(USER_A, "2026-02-01", "2026-02-28")).rejects.toThrow(/February 2026 wait/);
    expect((await tb(USER_A, "2026-01-01", "2026-01-31")).rows.length).toBeGreaterThan(0);
    await approve(filing.c02);
    expect(await heldMonths()).toEqual([]);
  });

  it("show a month no return covers on the lock alone", async () => {
    expect(await holds(USER_B, clientB)).toEqual([]);
    expect((await tb(USER_B, "2026-01-01", "2026-06-30", clientB)).rows.find((r) => r.code.startsWith("4"))?.closing).toBe("-6000.00");
    await expect(tb(USER_B, "2026-01-01", "2026-07-31", clientB)).rejects.toThrow(/not locked yet/);
    await expect(tb(USER_B, "2026-01-01", "2026-01-31", clientA)).rejects.toThrow(/Client not found/);
  });
});
