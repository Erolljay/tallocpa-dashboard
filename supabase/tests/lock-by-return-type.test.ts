/**
 * A filed return locks only the documents it was prepared from
 * (migration 20261231000004_lock_by_return_type.sql). A filed 1601-C (payroll)
 * leaves the month's purchases and sales open: approved, corrected, taken back and
 * booked in their own month. A filed 0619-E locks purchases, not sales. Manual
 * entries in the Books stay locked by any filed return.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { lockFormsFor } from "../../src/lib/documents/lock";
import { templatePayload } from "../../src/lib/ledger/coa";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "lock_by_return_type_test";

const OWNER = "00000000-0000-0000-0000-000000000e01";
const PREPARER = "00000000-0000-0000-0000-000000000e02";
const REVIEWER = "00000000-0000-0000-0000-000000000e03";

describe.skipIf(!url)("a filed return locks only the documents it was prepared from", () => {
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
  const upload = async (docType: string, month: string) =>
    (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', $3, $4, $4, 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [client, PREPARER, docType, month],
    )).rows[0].id as string;
  const fields = (date: string, number: string, total = "1120.00") =>
    JSON.stringify({ date, number, party_name: "Visayas Flour Mills", vatable: "1000.00", vat: "120.00", total, payment_terms: "charge" });
  const approve = (d: string, date: string, number: string, account: string, total?: string) =>
    as(PREPARER, `select public.approve_and_post_document($1, $2, true, $3, null, null, false) as r`, [d, fields(date, number, total), acct[account]]);
  const invoiceOf = async (d: string) => (await db.query(`select issue_date::text, total::text from public.book_invoices where document_id = $1 and voided_at is null`, [d])).rows[0];
  async function file(form: string, rule: string, label: string, start: string, end: string) {
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, 'monthly', '2026-01-01') returning id`, [client, form])).rows[0].id;
    await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, $3, $4, $5, $6, $7, $6::date + 10, $6::date + 10, 'filed')`,
      [ob, client, form, label, start, end, rule],
    );
  }

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
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Reviewer', 'reviewer')`,
      [OWNER, PREPARER, REVIEWER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9941', 'Arevalo Bakeshop', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
    // October 2026's 1601-C (payroll) has been filed; nothing else.
    await file("1601-C", "1601C", "2026-10", "2026-10-01", "2026-10-31");
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("keeps the database's lists equal to the screens'", async () => {
    for (const t of ["sales_invoice", "bir_2307_received", "purchase_receipt", "bir_2307_issued", "payroll", "other"]) {
      expect((await db.query(`select private.book_lock_forms($1::text) as f`, [t])).rows[0].f).toEqual([...lockFormsFor(t)]);
    }
  });

  it("a filed 1601-C locks October for payroll and manual entries, not for purchases or sales", async () => {
    const by = async (t: string | null) => (await db.query(`select private.books_locked_by($1, '2026-10-15', $2::text) as w`, [client, t])).rows[0].w;
    expect(await by(null)).toBe("1601-C 2026-10");
    expect(await by("payroll")).toBe("1601-C 2026-10");
    expect(await by("purchase_receipt")).toBeNull();
    expect(await by("sales_invoice")).toBeNull();
    expect((await db.query(`select private.books_locked_by($1, '2026-10-15') as w`, [client])).rows[0].w).toBe("1601-C 2026-10");
  });

  it("approves and books an October purchase in October, then lets it be corrected and taken back", async () => {
    const d = await upload("purchase_receipt", "2026-10-01");
    await approve(d, "2026-10-20", "OR-5521", "office_supplies");
    expect(await invoiceOf(d)).toEqual({ issue_date: "2026-10-20", total: "1120.00" });

    // Corrected after approval: still open.
    await approve(d, "2026-10-21", "OR-5521", "office_supplies", "1120.00");
    expect(await invoiceOf(d)).toEqual({ issue_date: "2026-10-21", total: "1120.00" });

    // Taken back by the reviewer.
    expect((await as(REVIEWER, `select status from public.unapprove_document($1, 'Wrong supplier')`, [d])).rows[0].status).toBe("under_review");
    expect(await invoiceOf(d)).toBeUndefined();
  });

  it("approves and books an October sale in October", async () => {
    const d = await upload("sales_invoice", "2026-10-01");
    await approve(d, "2026-10-22", "SI-1001", "sales");
    expect((await invoiceOf(d)).issue_date).toBe("2026-10-22");
  });

  it("a filed 0619-E locks October's purchases, not its sales", async () => {
    await file("0619-E", "0619E", "2026-10", "2026-10-01", "2026-10-31");
    const p = await upload("purchase_receipt", "2026-10-01");
    await expect(approve(p, "2026-10-25", "OR-6001", "office_supplies")).rejects.toThrow(/October 2026 is locked \(0619-E 2026-10 filed\)/);
    const s = await upload("sales_invoice", "2026-10-01");
    await approve(s, "2026-10-25", "SI-1002", "sales");
    expect((await invoiceOf(s)).issue_date).toBe("2026-10-25");
  });
});
