/**
 * Rework phase 1 (migration 20261126000004_books_from_documents.sql): documents the
 * old flow already approved and booked move across to the Books without posting
 * twice — every account keeps its total — and those approved but never posted are
 * posted now.
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
const DB_NAME = "books_migration_test";

const STAFF = "00000000-0000-0000-0000-000000000c01";
const CUSTOMER = "123-456-789";
const SUPPLIER = "222-333-444";

describe.skipIf(!url)("books: moving the approved documents across", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  const acct: Record<string, string> = {};
  const doc: Record<string, string> = {};

  async function as(sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [STAFF]);
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
  async function approved(docType: string, fields: Record<string, string>): Promise<string> {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', $3, '2026-02-01', '2026-02-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [client, STAFF, docType],
    )).rows[0].id;
    await as(`select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
    return d;
  }
  const book = async (d: string, key: string) => (await as(`select public.book_document($1, $2) as id`, [d, acct[key]])).rows[0].id as string;
  const confirm = (e: string) => as(`select public.confirm_journal_entry($1)`, [e]);
  const totals = async () =>
    Object.fromEntries((await db.query(`select code, closing::text from public.trial_balance($1, '2026-01-01', '2026-12-31') where closing <> 0 or debit <> 0`, [client])).rows.map((r) => [r.code, r.closing]));

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
    await db.query(`insert into auth.users (id) values ($1)`, [STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $2, 'Staff', 'staff')`, [STAFF, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9901', 'Arevalo Hardware', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    await db.query(`insert into public.parties (tin, registered_name) values ($1, 'Bacolod Feeds Corp'), ($2, 'Jaro Steel Supply')`, [CUSTOMER, SUPPLIER]);
    await as(`select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;

    // Booked and confirmed the old way.
    doc.cashSale = await approved("sales_invoice", { date: "2026-02-03", number: "SI-1", party_tin: CUSTOMER, vatable: "10000.00", vat: "1200.00", total: "11200.00", withholding: "100.00", atc: "WC158" });
    await confirm(await book(doc.cashSale, "sales"));
    doc.chargeSale = await approved("sales_invoice", { date: "2026-02-04", number: "SI-2", party_tin: CUSTOMER, vatable: "20000.00", vat: "2400.00", total: "22400.00", payment_terms: "charge" });
    await confirm(await book(doc.chargeSale, "sales"));
    doc.chargePurchase = await approved("purchase_receipt", { date: "2026-02-05", number: "INV-7", party_tin: SUPPLIER, vatable: "5000.00", vat: "600.00", total: "5600.00", payment_terms: "charge" });
    await confirm(await book(doc.chargePurchase, "purchases"));
    // Half of it paid through the monthly AR/AP update.
    const item = (await db.query(`select id from public.open_items where client_id = $1 and kind = 'payable'`, [client])).rows[0].id;
    await as(`select public.submit_arap_update($1, '2026-02-01', $2)`, [client, JSON.stringify([{ open_item_id: item, amount: "2800.00", date: "2026-02-20", account_id: acct.cash_on_hand }])]);
    // Approved, only suggested; approved, never booked.
    doc.suggested = await approved("purchase_receipt", { date: "2026-02-06", number: "OR-8", vat_exempt: "300.00", total: "300.00" });
    await book(doc.suggested, "office_supplies");
    doc.unbooked = await approved("sales_invoice", { date: "2026-02-07", number: "SI-3", vat_exempt: "1000.00", total: "1000.00" });
    await db.query(`update public.documents set ledger_account_id = $2 where id = $1`, [doc.unbooked, acct.service_income]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("links the booked documents to their entries, posts the rest, and keeps every account's total", async () => {
    const before = await totals();
    const openBefore = (await db.query(`select id, balance from public.open_items where client_id = $1 order by id`, [client])).rows;
    const outcome = Object.fromEntries((await db.query(`select * from private.migrate_documents_to_books($1)`, [client])).rows.map((r) => [r.document_id, r.outcome]));
    expect(outcome).toEqual({
      [doc.cashSale]: "linked", [doc.chargeSale]: "linked", [doc.chargePurchase]: "linked", [doc.suggested]: "posted", [doc.unbooked]: "posted",
    });

    // Nothing booked twice: each linked document still has its one entry.
    for (const d of [doc.cashSale, doc.chargeSale, doc.chargePurchase]) {
      expect((await db.query(`select count(*)::int as n from public.journal_entries where document_id = $1`, [d])).rows[0].n).toBe(1);
    }
    // Totals by account after = before + what was newly posted (the two unposted documents).
    const after = await totals();
    const added = Object.fromEntries((await db.query(
      `select a.code, sum(l.debit - l.credit)::text as amt from public.journal_lines l join public.journal_entries e on e.id = l.entry_id
       join public.ledger_accounts a on a.id = l.account_id where e.client_id = $1 and e.source in ('invoice', 'settlement') group by a.code having sum(l.debit - l.credit) <> 0`, [client])).rows.map((r) => [r.code, Number(r.amt)]));
    const codes = new Set([...Object.keys(before), ...Object.keys(after), ...Object.keys(added)]);
    for (const c of codes) expect(Number(after[c] ?? 0), c).toBeCloseTo(Number(before[c] ?? 0) + (added[c] ?? 0), 2);
    // Cash sale and purchase into the first bank account; AR and AP net to zero.
    expect(added).toEqual({ "1020": 700, "4020": -1000, "6090": 300 });
    // The open receivables and payables of the old entries are untouched.
    const openAfter = (await db.query(`select id, balance from public.open_items where client_id = $1 and source_entry_id in (select id from public.journal_entries where source = 'document') order by id`, [client])).rows;
    expect(openAfter).toEqual(openBefore);
  });

  it("shows each moved document with its balance: cash paid in full, charges as the old receivable or payable", async () => {
    const inv = async (d: string) => (await db.query(`select * from public.book_invoice_list where document_id = $1`, [d])).rows[0];
    expect(await inv(doc.cashSale)).toMatchObject({ legacy: true, balance_due: "0.00", withholding: "100.00", withholding_code: "WC158" });
    const cash = (await db.query(`select * from public.book_settlements where document_id = $1`, [doc.cashSale])).rows[0];
    expect(cash).toMatchObject({ kind: "receipt", legacy: true, amount: "11100.00", cash_account_id: acct.cash_on_hand, journal_entry_id: (await inv(doc.cashSale)).journal_entry_id });
    expect(await inv(doc.chargeSale)).toMatchObject({ legacy: true, amount_due: "22400.00", balance_due: "22400.00" });
    expect(await inv(doc.chargePurchase)).toMatchObject({ legacy: true, amount_due: "5600.00", balance_due: "2800.00" });
    const posted = await inv(doc.unbooked);
    expect(posted).toMatchObject({ legacy: false, balance_due: "0.00" });
    expect((await db.query(`select book from public.journal_entries where id = $1`, [posted.journal_entry_id])).rows[0].book).toBe("sales");
    expect((await db.query(`select count(*)::int as n from public.journal_entries where document_id = $1 and status = 'suggested'`, [doc.suggested])).rows[0].n).toBe(0);
  });

  it("is safe to run again", async () => {
    expect((await db.query(`select * from private.migrate_documents_to_books($1)`, [client])).rows).toEqual([]);
  });

  it("voids a moved cash sale and its receipt together by reversing the one old entry", async () => {
    const before = await totals();
    await as(`select public.unpost_document_from_books($1, 'Wrong customer')`, [doc.cashSale]);
    expect((await db.query(`select count(*)::int as n from public.book_settlements where document_id = $1 and voided_at is null`, [doc.cashSale])).rows[0].n).toBe(0);
    expect((await db.query(`select status from public.journal_entries where document_id = $1`, [doc.cashSale])).rows[0].status).toBe("reversed");
    const after = await totals();
    expect(before["4010"]).toBe("-30000.00");
    expect(after["4010"]).toBe("-20000.00");
  });
});
