/**
 * One register (migration 20261125000001_register.sql): every approved sales
 * invoice, purchase receipt and 2307 is a register line, kept in step with the
 * document by the database: written on approval, rewritten when the figures,
 * month or account title change, removed when the document is no longer
 * approved. Staff of the client read it; client users and other staff do not.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templatePayload } from "../../src/lib/ledger/coa";
import { fromRegisterLine, toSourceDocument, type DocumentRow, type RegisterSourceRow } from "../../src/lib/returns/source";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "register_test";

const OWNER = "00000000-0000-0000-0000-000000000051";
const STAFF = "00000000-0000-0000-0000-000000000052";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000053";
const CLIENT_USER = "00000000-0000-0000-0000-000000000054";
const ABC = "123-456-789";
const SUPPLIER = "222-333-444";

describe.skipIf(!url)("register: one line per approved document", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let taxOnly: string;
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

  /** An approved document of a client, through approve_document as its staff. */
  async function approved(forClient: string, docType: string, fields: Record<string, string>, source = "staff"): Promise<string> {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, $4, $3, '2027-01-01', '2027-01-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [forClient, STAFF, docType, source],
    )).rows[0].id;
    await as(STAFF, `select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
    return d;
  }

  const line = async (d: string) => (await db.query(`select * from public.register_lines where document_id = $1`, [d])).rows[0];

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, OTHER_STAFF, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, STAFF, OTHER_STAFF, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9501', 'Client A', 'corporation') returning id`, [brand])).rows[0].id;
    taxOnly = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9502', 'Client B', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $3, 'preparer'), ($2, $3, 'preparer')`, [client, taxOnly, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client User')`, [CLIENT_USER, client]);
    await db.query(`insert into public.engagements (client_id, service_line, start_date) values ($1, 'bookkeeping', '2027-01-01')`, [client]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    await db.query(`insert into public.parties (tin, registered_name) values ($1, 'ABC Trading Corp'), ($2, 'Office Depot Inc')`, [ABC, SUPPLIER]);
    await as(STAFF, `select public.setup_books($1, 'stock_corporation', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  let sale: string;

  it("writes a line when a sales invoice is approved, with the net that reached cash and the default account title", async () => {
    sale = await approved(client, "sales_invoice", {
      date: "2027-01-05", number: "SI-201", party_name: "ABC Trading Corp", party_tin: ABC,
      vatable: "120000.00", vat: "14400.00", total: "134400.00", withholding: "1200.00", atc: "wc158",
    }, "email");
    const l = await line(sale);
    expect(l).toMatchObject({
      kind: "sale", source: "email", month: new Date("2027-01-01T00:00:00"), reference: "SI-201", party_name: "ABC Trading Corp", party_tin: ABC,
      terms: "cash", vatable: "120000.00", vat: "14400.00", total: "134400.00", withholding: "1200.00", atc: "WC158",
      net: "133200.00", account_id: acct.sales, vat_registered: true, slp_category: null,
    });
    expect(l.party_id).not.toBeNull();
  });

  it("rewrites the line when the approved figures are corrected", async () => {
    await as(STAFF, `select public.approve_document($1, $2)`, [sale, JSON.stringify({ date: "2027-01-05", number: "SI-201", party_tin: ABC, vatable: "100000.00", vat: "12000.00", total: "112000.00", payment_terms: "charge" })]);
    const l = await line(sale);
    expect(l).toMatchObject({ vatable: "100000.00", total: "112000.00", withholding: "0.00", net: "112000.00", terms: "charge", atc: null });
    expect((await db.query(`select count(*)::int as n from public.register_lines where document_id = $1`, [sale])).rows[0].n).toBe(1);
  });

  it("follows the account title chosen when the document is booked", async () => {
    const d = await approved(client, "purchase_receipt", { date: "2027-01-08", number: "OR-55", party_name: "Office Depot", party_tin: SUPPLIER, vatable: "500.00", vat: "60.00", total: "560.00" });
    expect((await line(d)).account_id).toBe(acct.miscellaneous);
    await as(STAFF, `select public.book_document($1, $2)`, [d, acct.representation]);
    expect(await line(d)).toMatchObject({ kind: "purchase", account_id: acct.representation, net: "560.00", slp_category: null });
  });

  it("marks a purchase booked to a property and equipment account as capital goods", async () => {
    const d = await approved(client, "purchase_receipt", { date: "2027-01-12", number: "SI-7734", party_tin: SUPPLIER, vatable: "85000.00", vat: "10200.00", total: "95200.00" });
    await as(STAFF, `select public.book_document($1, $2)`, [d, acct.furniture_fixtures]);
    expect(await line(d)).toMatchObject({ account_id: acct.furniture_fixtures, slp_category: "capital_goods" });
  });

  it("takes EWT off what left cash, and moves no cash on a 2307", async () => {
    const p = await approved(client, "purchase_receipt", { date: "2027-01-01", number: "OR-2201", party_tin: SUPPLIER, vatable: "45000.00", vat: "5400.00", total: "50400.00", withholding: "2250.00", atc: "WC100" });
    expect(await line(p)).toMatchObject({ withholding: "2250.00", net: "48150.00" });
    const c = await approved(client, "bir_2307_received", { date: "2027-01-31", party_tin: ABC, atc: "WC158", withholding: "1200.00" });
    expect(await line(c)).toMatchObject({ kind: "cwt_received", withholding: "1200.00", net: "0.00", account_id: null });
  });

  it("removes the line when the document is no longer approved", async () => {
    await db.query(`update public.documents set status = 'returned' where id = $1`, [sale]);
    expect(await line(sale)).toBeUndefined();
  });

  it("keeps lines for a client without books: no account title yet, and not VAT-registered", async () => {
    const d = await approved(taxOnly, "sales_invoice", { date: "2027-01-09", number: "OR-9", vatable: "0", vat_exempt: "5000.00", total: "5000.00" });
    expect(await line(d)).toMatchObject({ client_id: taxOnly, account_id: null, vat_registered: false, net: "5000.00" });
  });

  it("is read by the client's staff and the Owner only, and written by nobody directly", async () => {
    const count = async (user: string) => (await as(user, `select count(*)::int as n from public.register_lines where client_id = $1`, [client])).rows[0].n;
    expect(await count(STAFF)).toBeGreaterThan(0);
    expect(await count(OWNER)).toBe(await count(STAFF));
    expect(await count(OTHER_STAFF)).toBe(0);
    expect(await count(CLIENT_USER)).toBe(0);
    await expect(as(STAFF, `update public.register_lines set net = 0 where client_id = $1`, [client]).then((r) => r.rowCount)).resolves.toBe(0);
    await expect(as(STAFF, `delete from public.register_lines where client_id = $1`, [client]).then((r) => r.rowCount)).resolves.toBe(0);
  });

  it("gives the worksheets the same figures as the approved documents (slice 2)", async () => {
    await approved(client, "sales_invoice", { date: "2027-01-22", number: "SI-301", party_name: "ABC", party_tin: ABC, party_address: "Iloilo City", vatable: "1000.00", vat_exempt: "500.00", vat: "120.00", total: "", atc: "wc158", withholding: "10.00" });
    const docs = (await db.query(
      `select d.id, d.doc_type, d.document_month::text as document_month, d.status, json_build_object('approved_fields', e.approved_fields) as extractions
       from public.documents d join public.extractions e on e.document_id = d.id where d.client_id = $1 and d.status = 'posted'`, [client])).rows as DocumentRow[];
    const lines = (await db.query(
      `select document_id, kind, month::text as month, line_date::text as line_date, reference, party_name, party_tin, party_address, vatable, vat_exempt, zero_rated, vat, total, atc, withholding, slp_category
       from public.register_lines where client_id = $1`, [client])).rows as RegisterSourceRow[];
    expect(lines.length).toBe(docs.length);
    for (const d of docs) {
      const l = lines.find((x) => x.document_id === d.id)!;
      const { slpCategory, ...fromLine } = fromRegisterLine(l);
      expect(fromLine).toEqual(toSourceDocument(d));
      expect(slpCategory === null || typeof slpCategory === "string").toBe(true);
    }
  });

  it("accepts documents that came in by email or batch upload", async () => {
    const d = await approved(client, "sales_invoice", { date: "2027-01-20", number: "SI-300", vatable: "1000.00", vat: "120.00", total: "1120.00" }, "batch");
    expect((await line(d)).source).toBe("batch");
  });
});
