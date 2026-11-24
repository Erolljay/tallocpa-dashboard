/**
 * Ledger slice 2 database tests (migration 20261124000005_ledger_documents.sql):
 * approved documents become suggested entries booked to the right account title
 * (client history → supplier preset → default), cash or charge; confirming
 * opens receivables and payables; 2307s and the monthly AR/AP update settle
 * them; reversals undo the subledger; AR equals the open items.
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
const DB_NAME = "ledger_documents_test";

const OWNER = "00000000-0000-0000-0000-000000000041";
const STAFF = "00000000-0000-0000-0000-000000000042";
const CLIENT_USER = "00000000-0000-0000-0000-000000000043";
const ABC = "123-456-789";
const STARBUCKS = "222-333-444";

describe.skipIf(!url)("ledger: documents and AR/AP", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  const acct: Record<string, string> = {};

  async function asCommit(user: string, sql: string, params: unknown[] = []) {
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

  /** An approved document of the client with these approved fields. */
  async function doc(docType: string, fields: Record<string, string>): Promise<string> {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', $3, '2027-01-01', '2027-01-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'posted') returning id`,
      [client, STAFF, docType],
    )).rows[0].id;
    await db.query(`insert into public.extractions (document_id, status, fields, approved_fields, approved_by, approved_at) values ($1, 'done', '{}', $2, $3, now())`, [d, JSON.stringify(fields), STAFF]);
    return d;
  }

  const book = (d: string, account: string | null = null) => asCommit(STAFF, `select public.book_document($1, $2) as id`, [d, account]).then((r) => r.rows[0].id as string | null);
  const confirm = (e: string) => asCommit(STAFF, `select public.confirm_journal_entry($1)`, [e]);
  const lines = async (e: string) =>
    (await db.query(`select a.template_key as acct, l.debit, l.credit from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by l.line_no`, [e])).rows;
  const items = async () =>
    (await db.query(`select party_name, doc_number, amount, balance from public.open_items where client_id = $1 and kind = 'receivable' order by doc_date, created_at`, [client])).rows;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [OWNER, STAFF, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9401', 'Client A', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client User')`, [CLIENT_USER, client]);
    await db.query(`insert into public.engagements (client_id, service_line, start_date) values ($1, 'bookkeeping', '2027-01-01')`, [client]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    await db.query(`insert into public.parties (tin, registered_name) values ($1, 'ABC Trading Corp'), ($2, 'Starbucks Coffee Philippines')`, [ABC, STARBUCKS]);
    await db.query(`update public.parties set preset_account_key = 'representation' where tin = $1`, [STARBUCKS]);
    await asCommit(STAFF, `select public.setup_books($1, 'stock_corporation', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
    await asCommit(STAFF, `select public.save_opening_balances($1, $2, $3)`, [
      client,
      JSON.stringify([{ account_id: acct.cash_on_hand, debit: "75000", credit: "0" }, { account_id: acct.accounts_receivable, debit: "25000", credit: "0" }, { account_id: acct.share_capital, debit: "0", credit: "100000" }]),
      JSON.stringify([{ kind: "receivable", party_name: "ABC Trading Corp", party_tin: ABC, doc_number: "SI-100", doc_date: "2026-12-10", amount: "25000" }]),
    ]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  let saleEntry: string;

  it("books a charge sale: Dr AR, Cr sales net of VAT, Cr output VAT — and opens a receivable when confirmed", async () => {
    const d = await doc("sales_invoice", { date: "2027-01-05", number: "SI-201", party_name: "ABC Trading Corp", party_tin: ABC, vatable: "10000.00", vat: "1200.00", total: "11200.00", payment_terms: "charge" });
    saleEntry = (await book(d))!;
    expect(await lines(saleEntry)).toEqual([
      { acct: "accounts_receivable", debit: "11200.00", credit: "0.00" },
      { acct: "sales", debit: "0.00", credit: "10000.00" },
      { acct: "output_vat", debit: "0.00", credit: "1200.00" },
    ]);
    const e = (await db.query(`select book, status, source, reference from public.journal_entries where id = $1`, [saleEntry])).rows[0];
    expect(e).toEqual({ book: "sales", status: "suggested", source: "document", reference: "SI-201" });
    expect(await items()).toHaveLength(1);
    await confirm(saleEntry);
    expect((await items()).map((i) => [i.doc_number, i.balance])).toEqual([["SI-100", "25000.00"], ["SI-201", "11200.00"]]);
    await expect(confirm(saleEntry)).rejects.toThrow(/already posted/);
  });

  it("books a supplier to its preset account title, then to the client's own last choice", async () => {
    const fields = { date: "2027-01-08", number: "OR-55", party_name: "Starbucks", party_tin: STARBUCKS, vatable: "500.00", vat: "60.00", total: "560.00" };
    const d1 = await doc("purchase_receipt", fields);
    const e1 = (await book(d1))!;
    expect(await lines(e1)).toEqual([
      { acct: "representation", debit: "500.00", credit: "0.00" },
      { acct: "input_vat", debit: "60.00", credit: "0.00" },
      { acct: "cash_on_hand", debit: "0.00", credit: "560.00" },
    ]);
    expect((await db.query(`select book from public.journal_entries where id = $1`, [e1])).rows[0].book).toBe("cash_disbursements");
    // Staff book it to Meals instead: the suggestion is replaced and the choice remembered.
    const e2 = (await book(d1, acct.meals))!;
    expect((await db.query(`select count(*) from public.journal_entries where document_id = $1`, [d1])).rows[0].count).toBe("1");
    expect((await lines(e2))[0].acct).toBe("meals");
    const d2 = await doc("purchase_receipt", { ...fields, number: "OR-56" });
    expect(await asCommit(STAFF, `select public.document_account_default($1) as id`, [d2]).then((r) => r.rows[0].id)).toBe(acct.meals);
  });

  it("does not change a booked document's figures, nor book it twice", async () => {
    const d = (await db.query(`select document_id from public.journal_entries where id = $1`, [saleEntry])).rows[0].document_id;
    await expect(book(d)).rejects.toThrow(/already in the books/);
    // As the database owner (approve_document runs with these rights): the guard trigger still refuses.
    await expect(db.query(`update public.extractions set approved_fields = approved_fields || '{"total":"1"}' where document_id = $1`, [d])).rejects.toThrow(/reverse its journal entry/);
  });

  it("leaves documents dated before the books start out of the books", async () => {
    const d = await doc("purchase_receipt", { date: "2026-12-28", number: "OR-1", total: "100.00" });
    expect(await book(d)).toBeNull();
  });

  it("applies a 2307 received to the customer's oldest open invoice", async () => {
    const d = await doc("bir_2307_received", { date: "2027-01-31", party_name: "ABC Trading Corp", party_tin: ABC, atc: "WC158", withholding: "200.00" });
    const e = (await book(d))!;
    expect(await lines(e)).toEqual([
      { acct: "cwt", debit: "200.00", credit: "0.00" },
      { acct: "accounts_receivable", debit: "0.00", credit: "200.00" },
    ]);
    await confirm(e);
    expect((await items()).map((i) => i.balance)).toEqual(["24800.00", "11200.00"]);
  });

  let si201: string;
  let collection: string;

  it("posts a staff AR/AP update to the Cash Receipts Book against the invoice named", async () => {
    si201 = (await db.query(`select id from public.open_items where doc_number = 'SI-201'`)).rows[0].id;
    const rows = (amount: string, date = "2027-01-20") => JSON.stringify([{ open_item_id: si201, amount, date, account_id: acct.cash_in_bank, reference: "DS-1" }]);
    const submit = (user: string, r: string) => asCommit(user, `select public.submit_arap_update($1, '2027-01-01', $2) as id`, [client, r]);
    await expect(submit(STAFF, rows("12000"))).rejects.toThrow(/more than the 11200.00 still open/);
    await expect(submit(STAFF, rows("100", "2027-02-01"))).rejects.toThrow(/must fall in January 2027/);
    await submit(STAFF, rows("5000"));
    const e = (await db.query(`select id, book, status from public.journal_entries where source = 'arap_update'`)).rows;
    expect(e).toHaveLength(1);
    expect(e[0]).toMatchObject({ book: "cash_receipts", status: "posted" });
    collection = e[0].id;
    expect(await lines(collection)).toEqual([
      { acct: "cash_in_bank", debit: "5000.00", credit: "0.00" },
      { acct: "accounts_receivable", debit: "0.00", credit: "5000.00" },
    ]);
    expect((await items()).map((i) => i.balance)).toEqual(["24800.00", "6200.00"]);
  });

  it("holds a client's update for staff, who post or return it", async () => {
    const workbook = (await asCommit(CLIENT_USER, `select public.arap_workbook($1) as w`, [client])).rows[0].w;
    expect(workbook.items.map((i: { doc_number: string }) => i.doc_number)).toEqual(["SI-100", "SI-201"]);
    expect(workbook.accounts.length).toBeGreaterThanOrEqual(3);
    const rows = JSON.stringify([{ open_item_id: si201, amount: "1000", date: "2027-01-25", account_id: acct.cash_on_hand, reference: null }]);
    const u1 = (await asCommit(CLIENT_USER, `select public.submit_arap_update($1, '2027-01-01', $2) as id`, [client, rows])).rows[0].id;
    const u2 = (await asCommit(CLIENT_USER, `select public.submit_arap_update($1, '2027-01-01', $2) as id`, [client, rows])).rows[0].id;
    expect((await db.query(`select status, source from public.arap_updates where id = $1`, [u1])).rows[0]).toEqual({ status: "submitted", source: "portal" });
    await expect(asCommit(CLIENT_USER, `select public.post_arap_update($1)`, [u1])).rejects.toThrow(/Only the Owner or staff assigned/);
    await asCommit(STAFF, `select public.return_arap_update($1, 'Duplicate')`, [u2]);
    await asCommit(STAFF, `select public.post_arap_update($1)`, [u1]);
    await expect(asCommit(STAFF, `select public.post_arap_update($1)`, [u2])).rejects.toThrow(/already returned/);
    expect((await items()).map((i) => i.balance)).toEqual(["24800.00", "5200.00"]);
  });

  it("reverses a collection (restoring the invoice) but not an invoice that has collections", async () => {
    const rev = `select public.reverse_journal_entry($1, '2027-01-31', 'test')`;
    await expect(asCommit(STAFF, rev, [saleEntry])).rejects.toThrow(/reverse those first/);
    await asCommit(STAFF, rev, [collection]);
    expect((await items()).map((i) => i.balance)).toEqual(["24800.00", "10200.00"]);
  });

  it("keeps Accounts Receivable equal to the open receivables", async () => {
    const ar = (await db.query(
      `select sum(l.debit - l.credit) as s from public.journal_lines l join public.journal_entries e on e.id = l.entry_id
       where l.account_id = $1 and e.status in ('posted', 'reversed')`,
      [acct.accounts_receivable],
    )).rows[0].s;
    const open = (await db.query(`select sum(balance) as s from public.open_items where client_id = $1 and kind = 'receivable'`, [client])).rows[0].s;
    expect(ar).toBe(open);
    expect(open).toBe("35000.00");
  });
});
