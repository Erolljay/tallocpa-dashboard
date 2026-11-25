/**
 * B1 batch upload (migration 20261125000014_batch_upload.sql): a checked file posts
 * whole. Each row becomes an approved document with no image ("Batch · no image"),
 * a register line and, from the books start, a posted entry. A bad row, a locked
 * month or a duplicate stops the whole file.
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
const DB_NAME = "batch_upload_test";

const STAFF = "00000000-0000-0000-0000-000000000081";
const OUTSIDER = "00000000-0000-0000-0000-000000000082";

describe.skipIf(!url)("batch upload posts a checked register whole", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;

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
  const accountId = async (key: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [client, key])).rows[0].id as string;
  const post = (kind: string, rows: unknown[], user = STAFF) => as(user, `select public.post_batch($1, $2, 'onboarding.xlsx', $3) as id`, [client, kind, JSON.stringify(rows)]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2)`, [STAFF, OUTSIDER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Staff', 'staff'), ($2, $3, 'Other', 'staff')`, [STAFF, OUTSIDER, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9801', 'Jaro Agri Supply', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    await as(STAFF, `select public.setup_books($1, 'sole_proprietorship', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("sole_proprietorship"))]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  const sale = (row: number, number: string, date: string, extra: Record<string, string> = {}) => ({
    row,
    fields: { date, number, party_kind: "non_individual", party_name: "Bacolod Feeds Corp", party_tin: "123-456-789", vatable: "120000.00", vat: "14400.00", total: "134400.00", atc: "WC158", withholding: "1200.00", payment_terms: "cash", ...extra },
  });

  it("posts every row as an approved document without an image, a register line and, from the books start, a posted entry", async () => {
    const sales = await accountId("sales");
    const id = (await post("sales", [
      { ...sale(3, "SI 0412", "2027-01-05"), account_id: sales },
      { ...sale(4, "SI 0300", "2026-12-20", { payment_terms: "charge" }), account_id: sales },
    ])).rows[0].id;

    const docs = (await db.query(`select source, status, storage_path, size_bytes, batch_row, late from public.documents where batch_id = $1 order by batch_row`, [id])).rows;
    expect(docs).toEqual([
      { source: "batch", status: "posted", storage_path: null, size_bytes: "0", batch_row: 3, late: false },
      { source: "batch", status: "posted", storage_path: null, size_bytes: "0", batch_row: 4, late: false },
    ]);
    const lines = (await db.query(`select r.reference, r.source, r.month::text, r.net, r.account_id = $2 as acct from public.register_lines r join public.documents d on d.id = r.document_id where d.batch_id = $1 order by r.reference`, [id, sales])).rows;
    expect(lines).toEqual([
      { reference: "SI 0300", source: "batch", month: "2026-12-01", net: "133200.00", acct: true },
      { reference: "SI 0412", source: "batch", month: "2027-01-01", net: "133200.00", acct: true },
    ]);
    // Only the row from the books start is in the ledger, and it is posted.
    const entries = (await db.query(`select j.status, j.entry_date::text from public.journal_entries j join public.documents d on d.id = j.document_id where d.batch_id = $1`, [id])).rows;
    expect(entries).toEqual([{ status: "posted", entry_date: "2027-01-05" }]);
    const b = (await db.query(`select row_count, booked_count, total, first_date::text, last_date::text from public.batch_uploads where id = $1`, [id])).rows[0];
    expect(b).toEqual({ row_count: 2, booked_count: 1, total: "268800.00", first_date: "2026-12-20", last_date: "2027-01-05" });
    // The customer joined the parties directory.
    expect((await db.query(`select count(*)::int as n from public.parties where tin = '123-456-789'`)).rows[0].n).toBe(1);
  });

  it("stops the whole file on a duplicate, naming the row", async () => {
    const sales = await accountId("sales");
    await expect(post("sales", [{ ...sale(3, "SI 0500", "2027-01-06"), account_id: sales }, { ...sale(4, "SI 0412", "2027-01-07"), account_id: sales }])).rejects.toThrow(/Row 4: invoice SI 0412 is already in the register/);
    expect((await db.query(`select count(*)::int as n from public.documents d join public.extractions e on e.document_id = d.id where e.approved_fields ->> 'number' = 'SI 0500'`)).rows[0].n).toBe(0);
  });

  it("refuses an account outside the client's chart, and a month locked by a filed return", async () => {
    await expect(post("sales", [{ ...sale(3, "SI 0600", "2027-01-06"), account_id: "00000000-0000-0000-0000-000000000000" }])).rejects.toThrow(/Row 3: the account title is not in the client's chart/);
    const ob = (await db.query(`select id from public.obligations where client_id = $1 and form = '2550Q'`, [client])).rows[0].id;
    await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, '2550Q', 'Q1 2027', '2027-01-01', '2027-03-31', '2550Q', '2027-04-25', '2027-04-25', 'filed')`,
      [ob, client],
    );
    await expect(post("sales", [{ ...sale(3, "SI 0601", "2027-02-06"), account_id: await accountId("sales") }])).rejects.toThrow(/Row 3: February 2027 is locked; its 2550Q has been filed/);
  });

  it("is for the Owner and staff assigned to the client", async () => {
    await expect(post("sales", [{ ...sale(3, "SI 0700", "2026-11-06"), account_id: await accountId("sales") }], OUTSIDER)).rejects.toThrow(/Client not found|Only the Owner/);
  });
});
