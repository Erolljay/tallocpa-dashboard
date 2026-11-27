/**
 * BIR 2307 issued to suppliers (migration 20261204000001): books_2307_data() gives the EWT
 * on posted, not void Purchase Invoices with the payee's registered details and the payor's
 * settings; staff who see the client get any month, the client's own users only locked
 * months, everyone else nothing.
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
const DB_NAME = "books_2307_test";

const OWNER = "00000000-0000-0000-0000-000000000f01";
const PREPARER = "00000000-0000-0000-0000-000000000f02";
const REVIEWER = "00000000-0000-0000-0000-000000000f03";
const OTHER = "00000000-0000-0000-0000-000000000f04";
const CLIENT_USER = "00000000-0000-0000-0000-000000000f05";
const OTHER_CLIENT_USER = "00000000-0000-0000-0000-000000000f06";

type Row = { invoice_id: string; issue_date: string; reference: string | null; party_id: string | null; atc: string | null; income_payment: string; withholding: string; payee: Record<string, unknown> | null };
type Data = { client: Record<string, unknown>; settings: Record<string, unknown> | null; months: { month: string; locked: boolean }[]; locked_months: string[]; rows: Row[] };

describe.skipIf(!url)("BIR 2307 to suppliers from the Books", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let other: string;
  let supply: string;
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
  const data = async (user: string, from: string, to: string, c = client) =>
    (await as(user, `select public.books_2307_data($1, $2, $3) as d`, [c, from, to])).rows[0].d as Data;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5), ($6)`, [OWNER, PREPARER, REVIEWER, OTHER, CLIENT_USER, OTHER_CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $5, 'Owner', 'owner'), ($2, $5, 'Preparer', 'staff'), ($3, $5, 'Reviewer', 'reviewer'), ($4, $5, 'Other', 'staff')`,
      [OWNER, PREPARER, REVIEWER, OTHER, brand],
    );
    client = (await db.query(
      `insert into public.clients (brand_id, code, name, taxpayer_type, tin, registered_address) values ($1, 'TC-9931', 'Molo Hardware', 'corporation', '111-222-333-000', 'Molo, Iloilo City') returning id`,
      [brand],
    )).rows[0].id;
    other = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9932', 'Jaro Clinic', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await db.query(`insert into public.client_users (client_id, user_id, full_name) values ($1, $2, 'Ana'), ($3, $4, 'Ben')`, [client, CLIENT_USER, other, OTHER_CLIENT_USER]);
    await db.query(`insert into public.payroll_settings (client_id, employer_zip_code, signatory_name, signatory_title) values ($1, '5000', 'Ana Reyes', 'President')`, [client]);
    supply = (await db.query(
      `insert into public.parties (tin, branch_code, kind, registered_name, registered_address, zip_code) values ('444-555-666', '00000', 'non_individual', 'Iloilo Supply Corp.', 'Jaro, Iloilo City', '5000') returning id`,
    )).rows[0].id;
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
    for (const r of (await db.query(`select id, code from public.tax_codes`)).rows) code[r.code] = r.id;

    // January: a purchase from a supplier in the directory (by party), with EWT; a purchase with no EWT.
    inv.p1 = await invoice({
      kind: "purchase", party_id: supply, party_name: "Iloilo Supply", party_tin: "444-555-666-00000", reference: "OR-9", issue_date: "2026-01-20", withholding_code_id: code.WC158,
      lines: [{ account_id: acct.office_supplies, amount: "1630.10", tax_code_id: code["IVAT12-OG"] }],
    });
    await invoice({ kind: "purchase", party_name: "No EWT Store", issue_date: "2026-01-21", lines: [{ account_id: acct.office_supplies, amount: "50", tax_code_id: code.VEP }] });
    // February: services from the same supplier, typed by TIN only (matched to the directory); a voided one.
    inv.p2 = await invoice({
      kind: "purchase", party_name: "Iloilo Supply", party_tin: "444-555-666-00000", reference: "OR-10", issue_date: "2026-02-03", withholding_code_id: code.WC160,
      lines: [{ account_id: acct.repairs_maintenance, amount: "333.33", tax_code_id: code["IVAT12-S"] }],
    });
    inv.p3 = await invoice({
      kind: "purchase", party_name: "Void Supplier", party_tin: "999-999-999-00000", issue_date: "2026-02-04", withholding_code_id: code.WC160,
      lines: [{ account_id: acct.repairs_maintenance, amount: "100", tax_code_id: code["IVAT12-S"] }],
    });
    await as(PREPARER, `select public.void_book_invoice($1, 'Duplicate')`, [inv.p3]);
    // A sale with CWT is a 2307 received, not issued.
    await invoice({ kind: "sales", party_name: "Arevalo Builders", issue_date: "2026-01-10", withholding_code_id: code.WC158, lines: [{ account_id: acct.sales, amount: "1000", tax_code_id: code.OVAT12 }] });
    // Lock January only.
    await as(REVIEWER, `select public.lock_books_month($1, '2026-01-01')`, [client]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("gives staff the EWT on every posted, not void Purchase Invoice of the period, centavo-exact, with the payee's registered details", async () => {
    const d = await data(PREPARER, "2026-01-01", "2026-03-31");
    expect(d.rows.map((r) => [r.reference, r.atc, r.income_payment, r.withholding])).toEqual([
      ["OR-9", "WC158", "1630.10", "16.30"],
      ["OR-10", "WC160", "333.33", "6.67"],
    ]);
    expect(d.rows.map((r) => r.party_id)).toEqual([supply, supply]);
    expect(d.rows[1].payee).toEqual({ tin: "444-555-666", branch_code: "00000", kind: "non_individual", name: "Iloilo Supply Corp.", registered_address: "Jaro, Iloilo City", zip_code: "5000" });
    expect(d.client).toMatchObject({ name: "Molo Hardware", tin: "111-222-333-000", registered_address: "Molo, Iloilo City" });
    expect(d.settings).toEqual({ zip_code: "5000", signatory_name: "Ana Reyes", signatory_title: "President" });
    expect(d.months).toEqual([
      { month: "2026-01-01", locked: true },
      { month: "2026-02-01", locked: false },
      { month: "2026-03-01", locked: false },
    ]);
    expect(d.locked_months).toEqual(["2026-01-01"]);
  });

  it("gives the ZIP code on the client's record before the one in Payroll setup", async () => {
    await db.query(`update public.clients set zip_code = '5001' where id = $1`, [client]);
    try {
      const d = await data(PREPARER, "2026-01-01", "2026-03-31");
      expect(d.client).toMatchObject({ zip_code: "5001" });
      expect(d.settings).toMatchObject({ zip_code: "5001", signatory_name: "Ana Reyes" });
    } finally {
      await db.query(`update public.clients set zip_code = null where id = $1`, [client]);
    }
  });

  it("refuses a client ZIP code that is not four digits", async () => {
    await expect(db.query(`update public.clients set zip_code = '500' where id = $1`, [client])).rejects.toThrow(/zip_code_check/);
  });

  it("gives the client's own users only the invoices of locked months", async () => {
    const d = await data(CLIENT_USER, "2026-01-01", "2026-03-31");
    expect(d.rows.map((r) => r.reference)).toEqual(["OR-9"]);
    expect((await data(CLIENT_USER, "2026-02-01", "2026-02-28")).rows).toEqual([]);
    await as(REVIEWER, `select public.lock_books_month($1, '2026-02-01')`, [client]);
    expect((await data(CLIENT_USER, "2026-01-01", "2026-03-31")).rows.map((r) => r.reference)).toEqual(["OR-9", "OR-10"]);
  });

  it("refuses another client's users, staff not assigned to the client, and a period over a year", async () => {
    await expect(data(OTHER_CLIENT_USER, "2026-01-01", "2026-03-31")).rejects.toThrow(/not available/);
    await expect(data(OTHER, "2026-01-01", "2026-03-31")).rejects.toThrow(/not available/);
    await expect(data(CLIENT_USER, "2026-01-01", "2026-03-31", other)).rejects.toThrow(/not available/);
    await expect(data(PREPARER, "2026-01-01", "2027-03-31")).rejects.toThrow(/at most a year/);
    expect((await data(OWNER, "2026-01-01", "2026-03-31")).rows).toHaveLength(2);
  });

  it("is not callable by anonymous users", async () => {
    await db.query("begin");
    await db.query("set local role anon");
    await expect(db.query(`select public.books_2307_data($1, '2026-01-01', '2026-03-31')`, [client])).rejects.toThrow(/permission denied/);
    await db.query("rollback");
  });
});
