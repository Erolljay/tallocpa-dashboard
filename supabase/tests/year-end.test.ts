/**
 * Rework phase 5 (migration 20261210000002): year-end. The closing entry is the Owner's
 * (ledger-closing.test.ts), the checklist ticks, the client's decision on a missing 2307
 * (and the SAWT leaving a stopped claim out, in src/lib), and a year's 2316s released only
 * once its months are locked.
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
const DB_NAME = "year_end_test";

const OWNER = "00000000-0000-0000-0000-000000000f01";
const PREPARER = "00000000-0000-0000-0000-000000000f02";
const REVIEWER = "00000000-0000-0000-0000-000000000f03";
const OTHER = "00000000-0000-0000-0000-000000000f04";
const CLIENT_USER = "00000000-0000-0000-0000-000000000f05";

describe.skipIf(!url)("year-end", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  const acct: Record<string, string> = {};
  const code: Record<string, string> = {};
  const inv: Record<string, string> = {};

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
  const invoice = async (p: Record<string, unknown>) => (await as(PREPARER, `select public.save_book_invoice($1, $2) as id`, [client, JSON.stringify(p)])).rows[0].id as string;
  const lock = (month: string) => as(REVIEWER, `select public.lock_books_month($1, $2)`, [client, month]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, REVIEWER, OTHER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $5, 'Owner', 'owner'), ($2, $5, 'Preparer', 'staff'), ($3, $5, 'Reviewer', 'reviewer'), ($4, $5, 'Other', 'staff')`,
      [OWNER, PREPARER, REVIEWER, OTHER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9931', 'Mandurriao Foods', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Mandurriao')`, [CLIENT_USER, client]);
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2025-11-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
    for (const r of (await db.query(`select id, code from public.tax_codes`)).rows) code[r.code] = r.id;
    inv.nov = await invoice({ kind: "sales", party_name: "Arevalo Builders", party_tin: "111-222-333-00000", reference: "SI-1", issue_date: "2025-11-10", withholding_code_id: code.WC158, lines: [{ account_id: acct.sales, amount: "1000", tax_code_id: code.OVAT12 }] });
    inv.dec = await invoice({ kind: "sales", party_name: "Arevalo Builders", party_tin: "111-222-333-00000", reference: "SI-2", issue_date: "2025-12-10", withholding_code_id: code.WC158, lines: [{ account_id: acct.sales, amount: "500", tax_code_id: code.OVAT12 }] });
    await lock("2025-11-01");
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("refuses to release a year's 2316s while a month of it is open", async () => {
    await expect(as(OWNER, `insert into public.payroll_2316_releases (client_id, year) values ($1, 2025)`, [client])).rejects.toThrow(/Lock the Books for December 2025/);
  });

  describe("checklist", () => {
    const ticks = async () => (await as(PREPARER, `select item, note from public.year_end_checks where client_id = $1 order by item`, [client])).rows;

    it("is ticked and cleared by the Owner or the staff assigned", async () => {
      await as(PREPARER, `select public.set_year_end_check($1, '2025-12-31', 'bank_reconciliation', true, 'BDO and BPI agree')`, [client]);
      await as(OWNER, `select public.set_year_end_check($1, '2025-12-31', 'afs', true)`, [client]);
      expect(await ticks()).toEqual([{ item: "afs", note: null }, { item: "bank_reconciliation", note: "BDO and BPI agree" }]);
      await as(PREPARER, `select public.set_year_end_check($1, '2025-12-31', 'afs', false)`, [client]);
      expect((await ticks()).map((r) => r.item)).toEqual(["bank_reconciliation"]);
    });

    it("refuses other staff, unknown steps and a date that is not a year end", async () => {
      await expect(as(OTHER, `select public.set_year_end_check($1, '2025-12-31', 'afs', true)`, [client])).rejects.toThrow(/Client not found/);
      await expect(as(PREPARER, `select public.set_year_end_check($1, '2025-12-31', 'party', true)`, [client])).rejects.toThrow(/check constraint/);
      await expect(as(PREPARER, `select public.set_year_end_check($1, '2025-12-30', 'afs', true)`, [client])).rejects.toThrow(/last day/);
      expect((await as(OTHER, `select * from public.year_end_checks`)).rows).toEqual([]);
    });
  });

  describe("missing 2307: the client's decision", () => {
    const list = async (user: string) => (await as(user, `select reference, claim, closed from public.missing_2307s($1)`, [client])).rows;

    it("gives each invoice's taxable year end, and whether it has passed", async () => {
      expect((await as(CLIENT_USER, `select to_char(year_end, 'YYYY-MM-DD') as year_end, year_ended from public.missing_2307s($1)`, [client])).rows).toEqual([{ year_end: "2025-12-31", year_ended: true }]);
    });

    it("lists the CWT with no 2307 in locked months only, to the client and to staff", async () => {
      expect(await list(CLIENT_USER)).toEqual([{ reference: "SI-1", claim: null, closed: false }]);
      expect(await list(PREPARER)).toEqual([{ reference: "SI-1", claim: null, closed: false }]);
      expect(await list(OTHER)).toEqual([]);
    });

    it("is the client's (or the Owner's for them), for locked months", async () => {
      await expect(as(PREPARER, `select public.decide_missing_2307($1, false)`, [inv.nov])).rejects.toThrow(/client's decision/);
      await expect(as(CLIENT_USER, `select public.decide_missing_2307($1, false)`, [inv.dec])).rejects.toThrow(/still open/);
      await as(CLIENT_USER, `select public.decide_missing_2307($1, false)`, [inv.nov]);
      expect(await list(CLIENT_USER)).toEqual([{ reference: "SI-1", claim: "stop", closed: false }]);
      await as(OWNER, `select public.decide_missing_2307($1, true)`, [inv.nov]);
      expect(await list(PREPARER)).toEqual([{ reference: "SI-1", claim: "keep", closed: false }]);
    });

    it("closes once the year's annual income tax return is Filed & paid", async () => {
      const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1702-RT', 'annual', '2020-01-01') returning id`, [client])).rows[0].id;
      await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
         values ($1, $2, '1702-RT', 'FY2025', '2025-01-01', '2025-12-31', '1702RT', '2026-04-15', '2026-04-15', 'filed')`,
        [ob, client],
      );
      // A filed annual return also locks December, so SI-2 now waits for a decision too, already closed.
      expect(await list(CLIENT_USER)).toEqual([{ reference: "SI-1", claim: "keep", closed: true }, { reference: "SI-2", claim: null, closed: true }]);
      await expect(as(CLIENT_USER, `select public.decide_missing_2307($1, false)`, [inv.nov])).rejects.toThrow(/can no longer change/);
    });

    it("is asked only once the taxable year has ended", async () => {
      const dec26 = await invoice({ kind: "sales", party_name: "Arevalo Builders", party_tin: "111-222-333-00000", reference: "SI-9", issue_date: "2026-01-10", withholding_code_id: code.WC158, lines: [{ account_id: acct.sales, amount: "100", tax_code_id: code.OVAT12 }] });
      await lock("2026-01-01");
      await expect(as(CLIENT_USER, `select public.decide_missing_2307($1, false)`, [dec26])).rejects.toThrow(/has not ended yet/);
      expect((await as(CLIENT_USER, `select reference, year_ended from public.missing_2307s($1) where reference = 'SI-9'`, [client])).rows).toEqual([{ reference: "SI-9", year_ended: false }]);
    });
  });

  describe("a final 2316", () => {
    it("is released once the year's months are locked", async () => {
      await as(OWNER, `insert into public.payroll_2316_releases (client_id, year) values ($1, 2025)`, [client]);
      expect((await db.query(`select year from public.payroll_2316_releases where client_id = $1`, [client])).rows).toEqual([{ year: 2025 }]);
    });
  });
});
