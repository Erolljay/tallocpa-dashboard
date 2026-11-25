/**
 * Any cut-off for the books (migration 20261125000013_any_cutoff.sql): a year-start
 * opening (calendar or fiscal) holds no income or expenses; a mid-year opening carries
 * the year to date, which ledger_income counts; the books start moves while only the
 * opening is in the books.
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
const DB_NAME = "any_cutoff_test";
const STAFF = "00000000-0000-0000-0000-0000000000e1";

describe.skipIf(!url)("books from any cut-off", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;

  async function as(sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
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
  async function client(code: string, fye: number, booksStart: string) {
    const id = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, fiscal_year_end_month) values ($1, $2, $2, 'corporation', $3) returning id`, [brand, code, fye])).rows[0].id as string;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [id, STAFF]);
    await as(`select public.setup_books($1, 'stock_corporation', $2, $3)`, [id, booksStart, JSON.stringify(templatePayload("stock_corporation"))]);
    return id;
  }
  const acct = async (c: string, k: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [c, k])).rows[0].id as string;
  const openingWithIncome = async (c: string) => JSON.stringify([
    { account_id: await acct(c, "cash_on_hand"), debit: "150000" },
    { account_id: await acct(c, "share_capital"), credit: "100000" },
    { account_id: await acct(c, "sales"), credit: "80000" },
    { account_id: await acct(c, "rent"), debit: "30000" },
  ]);

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
    await db.query(`insert into auth.users (id) values ($1)`, [STAFF]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $2, 'Staff', 'staff')`, [STAFF, brand]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("refuses income and expenses in a year-start opening, calendar or fiscal", async () => {
    const calendar = await client("TC-9991", 12, "2027-01-01");
    await expect(as(`select public.save_opening_balances($1, $2)`, [calendar, await openingWithIncome(calendar)])).rejects.toThrow(/hold no income or expenses/);
    const fiscal = await client("TC-9992", 6, "2026-07-01");
    await expect(as(`select public.save_opening_balances($1, $2)`, [fiscal, await openingWithIncome(fiscal)])).rejects.toThrow(/hold no income or expenses/);
  });

  it("takes the year to date in a mid-year opening and counts it as income for the year", async () => {
    const q2 = await client("TC-9993", 12, "2027-04-01");
    await as(`select public.save_opening_balances($1, $2)`, [q2, await openingWithIncome(q2)]);
    const rows = (await as(`select code, net from public.ledger_income($1, '2027-01-01', '2027-03-31') order by code`, [q2])).rows;
    expect(rows.map((r) => [r.code, Number(r.net)])).toEqual([["4010", -80000], ["6040", 30000]]);
    // The books from 1 April do not count it again.
    expect((await as(`select count(*)::int as n from public.ledger_income($1, '2027-04-01', '2027-06-30')`, [q2])).rows[0].n).toBe(0);
    // A June fiscal year: January is mid-year, so the opening may carry July to December.
    const fyJan = await client("TC-9994", 6, "2027-01-01");
    await as(`select public.save_opening_balances($1, $2)`, [fyJan, await openingWithIncome(fyJan)]);
  });

  it("moves the books start while only the opening is in the books", async () => {
    const c = await client("TC-9995", 12, "2027-04-01");
    await as(`select public.save_opening_balances($1, $2)`, [c, await openingWithIncome(c)]);
    await as(`select public.change_books_start($1, '2027-07-01')`, [c]);
    expect((await db.query(`select books_start::text from public.client_books where client_id = $1`, [c])).rows[0].books_start).toBe("2027-07-01");
    expect((await db.query(`select count(*)::int as n from public.journal_entries where client_id = $1`, [c])).rows[0].n).toBe(0);
    await expect(as(`select public.change_books_start($1, '2027-07-15')`, [c])).rejects.toThrow(/first day of a month/);
    await as(`select public.post_journal_entry($1, '2027-07-05', 'Owner put in cash', null, $2)`, [c, JSON.stringify([{ account_id: await acct(c, "cash_on_hand"), debit: "1000" }, { account_id: await acct(c, "share_capital"), credit: "1000" }])]);
    await expect(as(`select public.change_books_start($1, '2027-01-01')`, [c])).rejects.toThrow(/can no longer change/);
  });
});
