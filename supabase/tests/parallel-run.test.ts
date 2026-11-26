/**
 * Parallel run (migration 20261211000001_parallel_run.sql): the Books' figures by tax code
 * for any months of a client (books_parallel_run), the same figures the returns read
 * (books_return_sources, unchanged for its callers), with the 2307 that supports a Sales
 * Invoice's CWT; for the Owner and the staff assigned to the client only. The register
 * line of each approved document is left as it was.
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
const DB_NAME = "parallel_run_test";

const OWNER = "00000000-0000-0000-0000-000000000f01";
const PREPARER = "00000000-0000-0000-0000-000000000f02";
const REVIEWER = "00000000-0000-0000-0000-000000000f03";
const OTHER = "00000000-0000-0000-0000-000000000f04";
const CUSTOMER = "123-456-789";
const SUPPLIER = "222-333-444";

type Row = Record<string, string | number | boolean | null>;

describe.skipIf(!url)("parallel run: the Books' figures beside the register", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let filingQ1: string;
  const acct: Record<string, string> = {};
  const doc: Record<string, string> = {};

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
  async function approved(docType: string, month: string, fields: Record<string, string>): Promise<string> {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', $3, $4, $4, 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [client, PREPARER, docType, month],
    )).rows[0].id;
    await as(PREPARER, `select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
    return d;
  }
  const post = async (d: string, key?: string) => (await as(PREPARER, `select public.post_document_to_books($1, $2) as r`, [d, key ? acct[key] : null])).rows[0].r;
  const numeric = (r: Row) => ({ ...r, ...Object.fromEntries(["vatable", "vat_exempt", "zero_rated", "non_vat", "vat", "total", "withholding", "uncoded"].map((k) => [k, Number(r[k])])) });
  const run = async (user: string, from: string, to: string) => (await as(user, `select * from public.books_parallel_run($1, $2, $3)`, [client, from, to])).rows.map(numeric) as Row[];

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, PREPARER, REVIEWER, OTHER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $5, 'Owner', 'owner'), ($2, $5, 'Preparer', 'staff'), ($3, $5, 'Reviewer', 'reviewer'), ($4, $5, 'Other', 'staff')`,
      [OWNER, PREPARER, REVIEWER, OTHER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9931', 'Mandurriao Trading', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01') returning id`, [client])).rows[0].id;
    filingQ1 = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, '2550Q', 'Q1 2026', '2026-01-01', '2026-03-31', '2550Q', '2026-04-25', '2026-04-25', 'not_started') returning id`,
      [ob, client],
    )).rows[0].id;
    await db.query(`insert into public.parties (tin, registered_name) values ('123-456-789', 'Bacolod Feeds Corp'), ('222-333-444', 'Jaro Steel Supply')`);
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;

    // February: a sale with CWT and its customer's 2307; a purchase with EWT.
    doc.sale = await approved("sales_invoice", "2026-02-01", { date: "2026-02-03", number: "SI-1", party_name: "Bacolod Feeds Corp", party_tin: CUSTOMER, vatable: "10000.00", vat: "1200.00", total: "11200.00", withholding: "100.00", atc: "WC158", payment_terms: "charge" });
    await post(doc.sale, "sales");
    doc.purchase = await approved("purchase_receipt", "2026-02-01", { date: "2026-02-05", number: "INV-7", party_name: "Jaro Steel Supply", party_tin: SUPPLIER, vatable: "5000.00", vat: "600.00", total: "5600.00", withholding: "50.00", atc: "WC158", payment_terms: "charge" });
    await post(doc.purchase, "purchases");
    doc.cert = await approved("bir_2307_received", "2026-02-01", { date: "2026-02-28", party_name: "Bacolod Feeds Corp", party_tin: CUSTOMER, total: "10000.00", withholding: "100.00", atc: "WC158" });
    await post(doc.cert);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("gives the Books' figures for months that are not locked, with the document and the 2307 behind each invoice", async () => {
    const rows = await run(PREPARER, "2026-02-01", "2026-02-28");
    const sale = rows.find((r) => r.source === "sales_invoice")!;
    expect(sale).toMatchObject({ document_id: doc.sale, vatable: 10000, vat: 1200, vat_exempt: 0, reference: "SI-1" });
    const cwt = rows.find((r) => r.source === "bir_2307_received")!;
    expect(cwt).toMatchObject({ document_id: doc.sale, cwt_document_id: doc.cert, atc: "WC158", withholding: 100, cwt_supported: true });
    const purchase = rows.filter((r) => r.source === "purchase_receipt");
    expect(purchase.reduce((s, r) => s + Number(r.vatable), 0)).toBe(5000);
    expect(purchase.reduce((s, r) => s + Number(r.vat), 0)).toBe(600);
    expect(purchase.every((r) => r.document_id === doc.purchase && r.cwt_document_id == null)).toBe(true);
    expect(rows.find((r) => r.source === "bir_2307_issued")).toMatchObject({ document_id: doc.purchase, atc: "WC158", withholding: 50 });
    // Nothing outside the months asked for.
    expect(await run(PREPARER, "2026-03-01", "2026-03-31")).toEqual([]);
  });

  it("leaves the register as it was: one line per approved document", async () => {
    const lines = (await as(PREPARER, `select document_id, kind, vatable::float8 as vatable, withholding::float8 as withholding from public.register_lines where client_id = $1 order by kind`, [client])).rows;
    expect(lines).toEqual([
      { document_id: doc.cert, kind: "cwt_received", vatable: 0, withholding: 100 },
      { document_id: doc.purchase, kind: "purchase", vatable: 5000, withholding: 50 },
      { document_id: doc.sale, kind: "sale", vatable: 10000, withholding: 100 },
    ]);
  });

  it("reads the very same figures as the returns once the months are locked", async () => {
    for (const m of ["2026-01-01", "2026-02-01", "2026-03-01"]) await as(REVIEWER, `select public.lock_books_month($1, $2)`, [client, m]);
    const strip = (r: Row) => {
      const { cwt_document_id: _ignored, ...rest } = r;
      void _ignored;
      return rest;
    };
    const fromReturns = (await as(PREPARER, `select * from public.books_return_sources($1)`, [filingQ1])).rows.map(numeric);
    const fromRun = (await run(PREPARER, "2026-01-01", "2026-03-31")).map(strip);
    expect(fromReturns.length).toBeGreaterThan(0);
    expect(fromRun).toEqual(fromReturns);
  });

  it("lets only the Owner and the staff assigned to the client read it", async () => {
    expect((await run(OWNER, "2026-02-01", "2026-02-28")).length).toBeGreaterThan(0);
    expect((await run(REVIEWER, "2026-02-01", "2026-02-28")).length).toBeGreaterThan(0);
    await expect(run(OTHER, "2026-02-01", "2026-02-28")).rejects.toThrow(/Client not found/);
    await expect(as(OTHER, `select * from private.books_sources($1, '2026-02-01', '2026-02-28')`, [client])).rejects.toThrow(/permission denied/);
  });

  it("asks for a sensible range", async () => {
    await expect(run(PREPARER, "2026-03-01", "2026-02-01")).rejects.toThrow(/first and last day/);
    await expect(run(PREPARER, "2025-01-01", "2026-06-30")).rejects.toThrow(/at most a year/);
  });
});
