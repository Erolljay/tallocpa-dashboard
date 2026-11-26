/**
 * Approving a document and posting it to the Books together (migration
 * 20261216000002): either both happen or neither; a sale or purchase dated in a
 * locked month is offered the first open month after it and, when staff choose it,
 * posted on that month's first day; a month cannot be locked while an approved sale
 * or purchase dated in it is not in the Books.
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
const DB_NAME = "approve_and_post_test";

const PREPARER = "00000000-0000-0000-0000-000000000e02";
const REVIEWER = "00000000-0000-0000-0000-000000000e03";

describe.skipIf(!url)("approving and posting together", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
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
  const upload = async (month: string) =>
    (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', 'purchase_receipt', $3, $3, 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [client, PREPARER, month],
    )).rows[0].id as string;
  const fields = (date: string, extra: Record<string, string> = {}) =>
    JSON.stringify({ date, number: `OR-${date}`, party_name: "Molo Supply", vatable: "1000.00", vat: "120.00", total: "1120.00", payment_terms: "charge", ...extra });
  const approve = (d: string, date: string, redate = false, extra: Record<string, string> = {}) =>
    as(PREPARER, `select public.approve_and_post_document($1, $2, true, $3, null, null, $4) as r`, [d, fields(date, extra), acct.office_supplies, redate]);
  const docOf = async (d: string) => (await db.query(`select status, document_month::text, deferred_from::text, deferred_reason from public.documents where id = $1`, [d])).rows[0];
  const invoiceOf = async (d: string) => (await db.query(`select issue_date::text from public.book_invoices where document_id = $1 and voided_at is null`, [d])).rows[0];

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
    await db.query(`insert into auth.users (id) values ($1), ($2)`, [PREPARER, REVIEWER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Preparer', 'staff'), ($2, $3, 'Reviewer', 'reviewer')`, [PREPARER, REVIEWER, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9931', 'Molo Bakery', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
    // June is locked by the reviewer.
    await as(REVIEWER, `select public.lock_books_month($1, '2026-06-01')`, [client]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("approves an open month's purchase and posts it on its own date", async () => {
    const d = await upload("2026-05-01");
    expect((await approve(d, "2026-05-20")).rows[0].r).toMatchObject({ doc_type: "purchase_receipt", moved_to: null });
    expect(await docOf(d)).toMatchObject({ status: "posted", document_month: "2026-05-01", deferred_from: null });
    expect(await invoiceOf(d)).toEqual({ issue_date: "2026-05-20" });
  });

  it("does not approve what cannot be posted", async () => {
    const d = await upload("2026-05-01");
    await expect(approve(d, "2026-05-21", false, { vat_withheld: "50.00" })).rejects.toThrow(/VAT withheld on a purchase/);
    expect(await docOf(d)).toMatchObject({ status: "under_review" });
    expect(await invoiceOf(d)).toBeUndefined();
  });

  it("offers the first open month for a purchase dated in a locked month, and posts it there when chosen", async () => {
    const d = await upload("2026-06-01");
    const err = await approve(d, "2026-06-28").then(() => null, (e) => e);
    expect(err).toMatchObject({ code: "TL001", hint: "2026-07-01" });
    expect(err.message).toMatch(/June 2026 is locked \(locked by the reviewer\)/);
    expect(await docOf(d)).toMatchObject({ status: "under_review", document_month: "2026-06-01" });

    expect((await approve(d, "2026-06-28", true)).rows[0].r).toMatchObject({ moved_to: "2026-07-01" });
    expect(await docOf(d)).toMatchObject({ status: "posted", document_month: "2026-07-01", deferred_from: "2026-06-01", deferred_reason: "June 2026 was locked when it was approved" });
    expect(await invoiceOf(d)).toEqual({ issue_date: "2026-07-01" });
    // The register keeps the document's own date, reported in July.
    expect((await db.query(`select month::text, line_date::text from public.register_lines where document_id = $1`, [d])).rows[0]).toEqual({ month: "2026-07-01", line_date: "2026-06-28" });
  });

  it("does not lock a month while an approved purchase dated in it is not in the Books", async () => {
    const d = await upload("2026-08-01");
    await as(PREPARER, `select public.approve_document($1, $2)`, [d, fields("2026-08-05")]);
    await expect(as(REVIEWER, `select public.lock_books_month($1, '2026-08-01')`, [client])).rejects.toThrow(/1 approved sale or purchase of August 2026 is not in the Books/);
    await as(PREPARER, `select public.post_document_to_books($1, $2)`, [d, acct.office_supplies]);
    await as(REVIEWER, `select public.lock_books_month($1, '2026-08-01')`, [client]);
  });
});
