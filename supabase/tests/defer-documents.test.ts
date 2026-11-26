/**
 * Moving a sale or purchase to a later period, and taking an approval back
 * (migration 20261215000001_defer_documents.sql): the client's reviewer or the Owner
 * only, with a reason; never out of or into a month whose return is filed. An approved
 * document taken back leaves the Books and the register; one moved is reported, and
 * posts, in its new month.
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
const DB_NAME = "defer_documents_test";

const OWNER = "00000000-0000-0000-0000-000000000d01";
const PREPARER = "00000000-0000-0000-0000-000000000d02";
const REVIEWER = "00000000-0000-0000-0000-000000000d03";
const CUSTOMER = "123-456-789";
const SUPPLIER = "222-333-444";

describe.skipIf(!url)("documents: moving to a later period and taking an approval back", () => {
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
  async function waiting(docType: string, month: string, fields: Record<string, string>): Promise<string> {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', $3, $4, $4, 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [client, PREPARER, docType, month],
    )).rows[0].id as string;
    await db.query(`insert into public.extractions (document_id, status, fields, confidence) values ($1, 'done', $2, '{}')`, [d, JSON.stringify(fields)]);
    return d;
  }
  const approve = (d: string, fields: Record<string, string>) => as(PREPARER, `select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
  const post = (d: string, key: string) => as(PREPARER, `select public.post_document_to_books($1, $2)`, [d, acct[key]]);
  const doc = async (d: string) => (await db.query(`select * from public.documents where id = $1`, [d])).rows[0];
  const line = async (d: string) => (await db.query(`select month::text, line_date::text from public.register_lines where document_id = $1`, [d])).rows[0];
  const liveInvoice = async (d: string) => (await db.query(`select issue_date::text from public.book_invoices where document_id = $1 and voided_at is null`, [d])).rows[0];
  const defer = (user: string, d: string, to: string, reason = "Client asked to report it next quarter") =>
    as(user, `select document_month::text, period::text, deferred_from::text, status from public.defer_document($1, $2, $3)`, [d, to, reason]);
  const unapprove = (user: string, d: string, reason = "Figures to be checked again") => as(user, `select status from public.unapprove_document($1, $2)`, [d, reason]);

  const SALE = { date: "2026-09-28", number: "SI-90", party_tin: CUSTOMER, vatable: "10000.00", vat: "1200.00", total: "11200.00", payment_terms: "charge" };
  const PURCHASE = { date: "2026-09-29", number: "INV-41", party_tin: SUPPLIER, vatable: "5000.00", vat: "600.00", total: "5600.00", payment_terms: "charge" };

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
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9931', 'Mandurriao Trading', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01') returning id`, [client])).rows[0].id;
    // Q2 2026 has been filed; Q3 and Q4 are open.
    await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, '2550Q', 'Q2 2026', '2026-04-01', '2026-06-30', '2550Q', '2026-07-25', '2026-07-25', 'filed')`,
      [ob, client],
    );
    await db.query(`insert into public.parties (tin, registered_name) values ($1, 'Bacolod Feeds Corp'), ($2, 'Jaro Steel Supply')`, [CUSTOMER, SUPPLIER]);
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lets only the client's reviewer or the Owner move a document, with a reason, to a later month", async () => {
    const d = await waiting("sales_invoice", "2026-09-01", SALE);
    await expect(defer(PREPARER, d, "2026-10-01")).rejects.toThrow(/reviewer or the Owner/);
    await expect(defer(REVIEWER, d, "2026-10-01", "  ")).rejects.toThrow(/Give the reason/);
    await expect(defer(REVIEWER, d, "2026-09-15")).rejects.toThrow(/Choose a month after September 2026/);
    await expect(defer(REVIEWER, d, "2026-05-01")).rejects.toThrow(/Choose a month after/);
  });

  it("moves a waiting sale to the next quarter: reported there once approved, posted on the first day of that month", async () => {
    const d = await waiting("sales_invoice", "2026-09-01", SALE);
    expect((await defer(REVIEWER, d, "2026-10-01")).rows[0]).toEqual({ document_month: "2026-10-01", period: "2026-10-01", deferred_from: "2026-09-01", status: "under_review" });
    expect(await doc(d)).toMatchObject({ deferred_reason: "Client asked to report it next quarter", deferred_by: REVIEWER });

    // Approving keeps it in October, though its date is in September.
    await approve(d, SALE);
    expect((await doc(d)).document_month).toEqual(new Date(Date.UTC(2026, 9, 1)));
    expect(await line(d)).toEqual({ month: "2026-10-01", line_date: "2026-09-28" });
    await post(d, "sales");
    expect(await liveInvoice(d)).toEqual({ issue_date: "2026-10-01" });
  });

  it("puts an approved purchase back in the Inbox: the Book invoice is voided and the register line goes", async () => {
    const d = await waiting("purchase_receipt", "2026-09-01", PURCHASE);
    await approve(d, PURCHASE);
    await post(d, "purchases");
    expect(await liveInvoice(d)).toEqual({ issue_date: "2026-09-29" });

    await expect(unapprove(PREPARER, d)).rejects.toThrow(/reviewer or the Owner/);
    expect((await unapprove(OWNER, d)).rows[0].status).toBe("under_review");
    expect(await liveInvoice(d)).toBeUndefined();
    expect(await line(d)).toBeUndefined();
    expect(await doc(d)).toMatchObject({ unapproved_reason: "Figures to be checked again", unapproved_by: OWNER });
    const e = (await db.query(`select approved_fields, fields ->> 'number' as number from public.extractions where document_id = $1`, [d])).rows[0];
    expect(e).toEqual({ approved_fields: null, number: "INV-41" });

    // Approved and posted again, as before.
    await approve(d, PURCHASE);
    await post(d, "purchases");
    expect(await line(d)).toEqual({ month: "2026-09-01", line_date: "2026-09-29" });
  });

  it("moves an approved sale: taken back first, then waits for approval in its new month", async () => {
    const d = await waiting("sales_invoice", "2026-09-01", { ...SALE, number: "SI-91" });
    await approve(d, { ...SALE, number: "SI-91" });
    await post(d, "sales");
    expect((await defer(OWNER, d, "2026-10-01")).rows[0]).toMatchObject({ document_month: "2026-10-01", status: "under_review" });
    expect(await liveInvoice(d)).toBeUndefined();
    expect(await line(d)).toBeUndefined();
    expect((await doc(d)).unapproved_reason).toBe("Moved to October 2026: Client asked to report it next quarter");
  });

  it("follows a corrected date that falls in the new month or later", async () => {
    const d = await waiting("sales_invoice", "2026-09-01", { ...SALE, number: "SI-92" });
    await defer(REVIEWER, d, "2026-10-01");
    await approve(d, { ...SALE, number: "SI-92", date: "2026-11-03" });
    expect(await doc(d)).toMatchObject({ deferred_from: null, deferred_reason: null });
    expect((await line(d)).month).toBe("2026-11-01");
  });

  it("refuses a month already filed, either way", async () => {
    const filed = await waiting("sales_invoice", "2026-06-01", { ...SALE, number: "SI-60", date: "2026-06-20" });
    await expect(defer(OWNER, filed, "2026-07-01")).rejects.toThrow(/2550Q Q2 2026 return already declared/);

    const old = await waiting("purchase_receipt", "2026-03-01", { ...PURCHASE, number: "INV-3", date: "2026-03-20" });
    await expect(defer(OWNER, old, "2026-05-01")).rejects.toThrow(/May 2026 is already filed \(2550Q Q2 2026\)/);

    const posted = await waiting("purchase_receipt", "2026-05-01", { ...PURCHASE, number: "INV-5", date: "2026-05-20" });
    await approve(posted, { ...PURCHASE, number: "INV-5", date: "2026-05-20" });
    await expect(unapprove(OWNER, posted)).rejects.toThrow(/2550Q Q2 2026 return for its month has been filed/);
  });

  it("moves only sales and purchases", async () => {
    const d = await waiting("bir_2307_received", "2026-09-01", { date: "2026-09-10", party_tin: CUSTOMER, withholding: "100.00" });
    await expect(defer(OWNER, d, "2026-10-01")).rejects.toThrow(/Only a sale or purchase/);
  });
});
