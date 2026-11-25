/**
 * Portal Home (rework decision 18; migration 20261202000001_portal_home.sql): the
 * client reads a summary of their own Books (balances, monthly income and expenses,
 * locked months) and their assigned team, and nobody else's.
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
const DB_NAME = "portal_home_test";

const OWNER = "00000000-0000-0000-0000-000000000e01";
const PREPARER = "00000000-0000-0000-0000-000000000e02";
const REVIEWER = "00000000-0000-0000-0000-000000000e03";
const CLIENT_USER = "00000000-0000-0000-0000-000000000e04";
const OTHER_CLIENT_USER = "00000000-0000-0000-0000-000000000e05";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000e06";

describe.skipIf(!url)("portal home: books summary and team", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let other: string;
  const acct: Record<string, string> = {};

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
  const invoice = async (p: object) => (await as(PREPARER, `select public.save_book_invoice($1, $2) as id`, [client, JSON.stringify(p)])).rows[0].id as string;
  const summary = async (user: string, c = client, from = "2026-01-01", to = "2026-06-30") =>
    (await as(user, `select public.portal_books_summary($1, $2, $3) as s`, [c, from, to])).rows[0].s;

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
    await db.query(
      `insert into auth.users (id, email, raw_user_meta_data) values
        ($1, 'owner@tallocpa.com', null), ($2, 'prep@tallocpa.com', '{"avatar_url": "https://example.com/p.jpg"}'),
        ($3, 'rev@tallocpa.com', '{}'), ($4, 'client@lapaz.ph', null), ($5, 'client@other.ph', null), ($6, 'staff2@tallocpa.com', null)`,
      [OWNER, PREPARER, REVIEWER, CLIENT_USER, OTHER_CLIENT_USER, OTHER_STAFF],
    );
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values
        ($1, $5, 'Olivia Owner', 'owner'), ($2, $5, 'Paolo Preparer', 'staff'), ($3, $5, 'Rina Reviewer', 'reviewer'), ($4, $5, 'Sam Staff', 'staff')`,
      [OWNER, PREPARER, REVIEWER, OTHER_STAFF, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9921', 'Lapaz Bakery', 'corporation') returning id`, [brand])).rows[0].id;
    other = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9922', 'Jaro Hardware', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer'), ($4, $5, 'preparer')`, [client, PREPARER, REVIEWER, other, OTHER_STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Lapaz'), ($3, $4, 'Owner of Jaro')`, [CLIENT_USER, client, OTHER_CLIENT_USER, other]);
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;

    // February: a sale on account of 10,000, 4,000 of it received; March: rent of 3,000 on account.
    const sale = await invoice({ kind: "sales", party_name: "Walk-in", issue_date: "2026-02-10", lines: [{ account_id: acct.sales, amount: "10000" }] });
    await as(PREPARER, `select public.save_book_settlement($1, $2)`, [
      client, JSON.stringify({ kind: "receipt", settle_date: "2026-02-20", cash_account_id: acct.cash_in_bank, allocations: [{ invoice_id: sale, amount: "4000" }] }),
    ]);
    await invoice({ kind: "purchase", party_name: "Landlord", issue_date: "2026-03-01", lines: [{ account_id: acct.rent, amount: "3000" }] });
    await as(REVIEWER, `select public.lock_books_month($1, '2026-02-01')`, [client]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("gives the client their balances, monthly income and expenses and locked months", async () => {
    const s = await summary(CLIENT_USER);
    expect(s.as_of).toBe("2026-06-30");
    expect(s.has_books).toBe(true);
    expect(s.locked).toEqual(["2026-02-01"]);
    const bal = (control: string) => s.balances.filter((b: { control: string }) => b.control === control);
    expect(bal("ar")).toEqual([{ type: "asset", control: "ar", debit: 10000, credit: 4000 }]);
    expect(bal("ap")).toEqual([{ type: "liability", control: "ap", debit: 0, credit: 3000 }]);
    expect(s.months).toEqual([
      { month: "2026-02-01", type: "revenue", debit: 0, credit: 10000 },
      { month: "2026-03-01", type: "expense", debit: 3000, credit: 0 },
    ]);
  });

  it("counts balances only up to the end of the range", async () => {
    const s = await summary(CLIENT_USER, client, "2026-01-01", "2026-02-28");
    expect(s.balances.find((b: { control: string }) => b.control === "ap")).toBeUndefined();
    expect(s.months).toHaveLength(1);
  });

  it("refuses another business's client user, unassigned staff and anonymous callers", async () => {
    await expect(summary(OTHER_CLIENT_USER)).rejects.toThrow(/Business not found/);
    await expect(summary(OTHER_STAFF)).rejects.toThrow(/Business not found/);
    await expect(as(OTHER_CLIENT_USER, `select * from public.portal_client_team($1)`, [client])).rejects.toThrow(/Business not found/);
    await db.query("begin");
    await db.query("set local role anon");
    await expect(db.query(`select public.portal_books_summary($1, '2026-01-01', '2026-06-30')`, [client])).rejects.toThrow(/permission denied/);
    await db.query("rollback");
  });

  it("lets the assigned staff and the Owner read it too, and refuses a range over two years", async () => {
    expect((await summary(REVIEWER)).locked).toEqual(["2026-02-01"]);
    expect((await summary(OWNER)).has_books).toBe(true);
    await expect(summary(CLIENT_USER, client, "2023-01-01", "2026-06-30")).rejects.toThrow(/up to two years/);
    expect((await summary(OTHER_CLIENT_USER, other)).has_books).toBe(false);
  });

  it("does not expose the Books tables to the client directly", async () => {
    expect((await as(CLIENT_USER, `select count(*)::int as n from public.journal_lines`)).rows[0].n).toBe(0);
  });

  it("lists the client's preparer and reviewer with email and photo", async () => {
    const team = (await as(CLIENT_USER, `select * from public.portal_client_team($1)`, [client])).rows;
    expect(team).toEqual([
      { role: "preparer", full_name: "Paolo Preparer", email: "prep@tallocpa.com", photo_url: "https://example.com/p.jpg" },
      { role: "reviewer", full_name: "Rina Reviewer", email: "rev@tallocpa.com", photo_url: null },
    ]);
    await db.query(`update public.staff_profiles set active = false where user_id = $1`, [REVIEWER]);
    expect((await as(CLIENT_USER, `select role from public.portal_client_team($1)`, [client])).rows).toEqual([{ role: "preparer" }]);
  });
});
