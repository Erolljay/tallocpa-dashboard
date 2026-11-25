/**
 * A1 (migration 20261125000009_fixed_assets.sql): capital goods on the purchases
 * register become assets (₱10,000 and up), staff set up each one's life, and a
 * month's depreciation posts one entry that matches src/lib/assets/schedule.ts; the
 * books then tie to the register (T-9, T-10).
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { depreciationFor } from "../../src/lib/assets/schedule";
import { templatePayload } from "../../src/lib/ledger/coa";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "fixed_assets_test";

const STAFF = "00000000-0000-0000-0000-0000000000a1";
const CLIENT_USER = "00000000-0000-0000-0000-0000000000a2";

describe.skipIf(!url)("fixed asset register and depreciation", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let tables: string;

  async function as(sql: string, params: unknown[] = [], user = STAFF) {
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
  const acct = async (k: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [client, k])).rows[0].id as string;
  async function purchase(fields: Record<string, string>, account: string) {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', 'purchase_receipt', '2027-03-01', '2027-03-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [client, STAFF],
    )).rows[0].id as string;
    await as(`select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
    const e = (await as(`select public.book_document($1, $2) as id`, [d, await acct(account)])).rows[0].id as string;
    await as(`select public.confirm_journal_entry($1)`, [e]);
    return d;
  }
  const entryLines = async (e: string) =>
    (await db.query(`select a.template_key as acct, l.debit, l.credit from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by l.line_no`, [e])).rows;
  const ledger = async (from: string, to: string) => (await as(`select public.workpaper_ledger($1, $2, $3) as j`, [client, from, to])).rows[0].j;

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
    await db.query(`insert into auth.users (id) values ($1), ($2)`, [STAFF, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $2, 'Staff', 'staff')`, [STAFF, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9951', 'Jaro Agri Supply', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Jaro')`, [CLIENT_USER, client]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    await as(`select public.setup_books($1, 'sole_proprietorship', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("sole_proprietorship"))]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("makes capital goods of ₱10,000 or more an asset waiting for setup, with its input VAT", async () => {
    tables = await purchase({ date: "2027-03-12", number: "SI 7781", party_name: "Iloilo Furniture Co", vatable: "85000.00", vat: "10200.00", total: "95200.00" }, "furniture_fixtures");
    await purchase({ date: "2027-03-14", number: "SI 120", vatable: "9000.00", vat: "1080.00", total: "10080.00" }, "office_equipment");
    const rows = (await db.query(`select number, source, document_id, cost, input_vat, residual, status, acquired_on::text, accum_account_id from public.fixed_assets where client_id = $1`, [client])).rows;
    expect(rows).toEqual([{ number: 1, source: "register", document_id: tables, cost: "85000.00", input_vat: "10200.00", residual: "1.00", status: "setup", acquired_on: "2027-03-12", accum_account_id: await acct("accum_dep_furniture") }]);
    // T-9: the ₱9,000 item booked to an asset account shows as a difference (decision 12).
    expect(Number((await ledger("2027-03-01", "2027-03-31")).ppe_additions)).toBe(94000);
  });

  it("will not run a month while an asset bought before it waits for setup", async () => {
    await expect(as(`select public.run_depreciation($1, '2027-04-01')`, [client])).rejects.toThrow(/Set up the depreciation of E-1 first/);
  });

  it("posts the month's depreciation from the month after purchase, as the schedule computes it", async () => {
    const id = (await db.query(`select id from public.fixed_assets where document_id = $1`, [tables])).rows[0].id;
    await as(`select public.setup_fixed_asset($1, 'Office tables (6)', 60)`, [id]);
    await expect(as(`select public.run_depreciation($1, '2027-03-01')`, [client])).rejects.toThrow(/Nothing to depreciate in March 2027/);
    // An opening car with a longer tax life; its tax column does not change the books.
    await as(`select public.add_opening_asset($1, 'Delivery van', $2, '2025-01-15', 1200000, 60, 120)`, [client, await acct("transportation_equipment")]);
    const e = (await as(`select public.run_depreciation($1, '2027-04-01') as id`, [client])).rows[0].id as string;
    const furniture = depreciationFor(8500000, 100, 60, "2027-03-12", "2027-04-01") / 100;
    const van = depreciationFor(120000000, 100, 60, "2025-01-15", "2027-04-01") / 100;
    expect((await entryLines(e))[0]).toEqual({ acct: "depreciation", debit: (furniture + van).toFixed(2), credit: "0.00" });
    expect((await entryLines(e)).slice(1).map((l) => [l.acct, l.credit]).sort()).toEqual([["accum_dep_furniture", furniture.toFixed(2)], ["accum_dep_transportation", van.toFixed(2)]]);
    expect(furniture).toBe(1416.65);
    expect((await db.query(`select status, entry_date::text, reference from public.journal_entries where id = $1`, [e])).rows[0]).toEqual({ status: "posted", entry_date: "2027-04-30", reference: "DEP 2027-04" });
    expect(Number((await ledger("2027-04-01", "2027-04-30")).depreciation)).toBeCloseTo(furniture + van, 2);
    await expect(as(`select public.run_depreciation($1, '2027-04-01')`, [client])).rejects.toThrow(/already posted/);
  });

  it("drops an asset still waiting for setup when its line no longer qualifies", async () => {
    const d = await purchase({ date: "2027-03-20", number: "SI 9", vatable: "20000.00", vat: "2400.00", total: "22400.00" }, "it_equipment");
    expect((await db.query(`select count(*)::int as n from public.fixed_assets where document_id = $1`, [d])).rows[0].n).toBe(1);
    await db.query(`update public.documents set ledger_account_id = $2 where id = $1`, [d, await acct("office_supplies")]);
    expect((await db.query(`select count(*)::int as n from public.fixed_assets where document_id = $1`, [d])).rows[0].n).toBe(0);
  });

  it("shows the register to staff only", async () => {
    expect((await as(`select * from public.fixed_assets`, [], CLIENT_USER)).rows).toEqual([]);
    expect((await as(`select number from public.fixed_assets order by number`)).rows.map((r) => r.number)).toEqual([1, 2]);
  });
});
