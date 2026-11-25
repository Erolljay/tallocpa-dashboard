/**
 * One register, slice 3 (migration 20261125000003_register_books.sql): the books
 * post from the register line — Cash at the net receipt or net paid, CWT awaiting
 * the 2307, EWT payable at payment, the SC/PWD discount on its own account — and
 * the entry is the one the Register page shows (src/lib/register/parts.ts).
 * Documents without withholding or a discount book as before (ledger-documents.test.ts).
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templatePayload } from "../../src/lib/ledger/coa";
import { bookkeepingPart, toRegisterLine, type RegisterRow } from "../../src/lib/register/parts";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "register_books_test";

const STAFF = "00000000-0000-0000-0000-000000000071";
const CUSTOMER = "123-456-789";
const LANDLORD = "222-333-444";

describe.skipIf(!url)("register: the books post from the register line", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;

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
       values ($1, $2, 'staff', $3, '2027-01-01', '2027-01-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [client, STAFF, docType],
    )).rows[0].id;
    await as(`select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
    return d;
  }
  const accountId = async (key: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [client, key])).rows[0].id as string;
  const book = async (d: string, key?: string) => (await as(`select public.book_document($1, $2) as id`, [d, key ? await accountId(key) : null])).rows[0].id as string | null;
  const confirm = (e: string) => as(`select public.confirm_journal_entry($1)`, [e]);
  const lines = async (e: string) =>
    (await db.query(`select a.template_key as acct, l.debit, l.credit from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by l.line_no`, [e])).rows;

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
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9701', 'Jaro Agri Supply', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.engagements (client_id, service_line, start_date) values ($1, 'bookkeeping', '2027-01-01')`, [client]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    await db.query(`insert into public.parties (tin, registered_name) values ($1, 'Bacolod Feeds Corp'), ($2, 'Sta. Barbara Realty Corp')`, [CUSTOMER, LANDLORD]);
    await as(`select public.setup_books($1, 'sole_proprietorship', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("sole_proprietorship"))]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  let sale: string;
  let saleEntry: string;

  it("debits Cash with the net receipt and parks the CWT until the 2307 arrives", async () => {
    sale = await approved("sales_invoice", { date: "2027-01-05", number: "SI 0412", party_name: "Bacolod Feeds Corp", party_tin: CUSTOMER, vatable: "120000.00", vat: "14400.00", total: "134400.00", withholding: "1200.00", atc: "WC158" });
    saleEntry = (await book(sale))!;
    expect(await lines(saleEntry)).toEqual([
      { acct: "cash_on_hand", debit: "133200.00", credit: "0.00" },
      { acct: "cwt_awaiting", debit: "1200.00", credit: "0.00" },
      { acct: "sales", debit: "0.00", credit: "120000.00" },
      { acct: "output_vat", debit: "0.00", credit: "14400.00" },
    ]);
    await confirm(saleEntry);
  });

  it("moves the CWT from awaiting to the 2307 account when the certificate comes, without touching cash", async () => {
    const cert = await approved("bir_2307_received", { date: "2027-03-31", party_tin: CUSTOMER, atc: "WC158", withholding: "1200.00" });
    const e = (await book(cert))!;
    expect(await lines(e)).toEqual([
      { acct: "cwt", debit: "1200.00", credit: "0.00" },
      { acct: "cwt_awaiting", debit: "0.00", credit: "1200.00" },
    ]);
  });

  it("books the SC/PWD discount on its own and credits sales before it", async () => {
    const d = await approved("sales_invoice", { date: "2027-01-06", number: "SI 0415", vat_exempt: "2000.00", total: "2000.00", discount: "500.00" });
    expect(await lines((await book(d))!)).toEqual([
      { acct: "cash_on_hand", debit: "2000.00", credit: "0.00" },
      { acct: "sales_discount_scpwd", debit: "500.00", credit: "0.00" },
      { acct: "sales", debit: "0.00", credit: "2500.00" },
    ]);
  });

  let rent: string;

  it("credits Cash with the net paid and books EWT payable at payment", async () => {
    rent = await approved("purchase_receipt", { date: "2027-01-01", number: "OR 2201", party_name: "Sta. Barbara Realty", party_tin: LANDLORD, vatable: "45000.00", vat: "5400.00", total: "50400.00", withholding: "2250.00", atc: "WC100" });
    expect(await lines((await book(rent, "rent"))!)).toEqual([
      { acct: "rent", debit: "45000.00", credit: "0.00" },
      { acct: "input_vat", debit: "5400.00", credit: "0.00" },
      { acct: "cash_on_hand", debit: "0.00", credit: "48150.00" },
      { acct: "ewt_payable", debit: "0.00", credit: "2250.00" },
    ]);
  });

  it("opens a payable for the amount owed, net of the EWT, on a charge purchase", async () => {
    const d = await approved("purchase_receipt", { date: "2027-02-01", number: "OR 2202", party_tin: LANDLORD, vatable: "45000.00", vat: "5400.00", total: "50400.00", withholding: "2250.00", atc: "WC100", payment_terms: "charge" });
    const e = (await book(d, "rent"))!;
    expect((await lines(e)).slice(2)).toEqual([
      { acct: "accounts_payable", debit: "0.00", credit: "48150.00" },
      { acct: "ewt_payable", debit: "0.00", credit: "2250.00" },
    ]);
    await confirm(e);
    expect((await db.query(`select balance from public.open_items where client_id = $1 and kind = 'payable'`, [client])).rows.map((r) => r.balance)).toEqual(["48150.00"]);
  });

  it("books no entry for a 2307 issued whose EWT the quarter's purchases already booked", async () => {
    const d = await approved("bir_2307_issued", { date: "2027-03-31", party_tin: LANDLORD, atc: "WC100", withholding: "4500.00" });
    expect(await book(d, "rent")).toBeNull();
    expect((await db.query(`select count(*)::int as n from public.journal_entries where document_id = $1`, [d])).rows[0].n).toBe(0);
  });

  it("still books a 2307 issued when the purchases did not carry the EWT, and a 2307 received with nothing awaiting", async () => {
    // The landlord has an open payable (the charge purchase above), so the EWT settles it, as before.
    const issued = await approved("bir_2307_issued", { date: "2027-06-30", party_tin: LANDLORD, atc: "WC100", withholding: "300.00" });
    expect((await lines((await book(issued))!)).map((l) => [l.acct, l.debit, l.credit])).toEqual([["accounts_payable", "300.00", "0.00"], ["ewt_payable", "0.00", "300.00"]]);
    // The customer's ₱1,200 awaiting is already drawn by the first 2307, still only suggested: it is not drawn twice.
    const received = await approved("bir_2307_received", { date: "2027-06-30", party_tin: CUSTOMER, atc: "WC158", withholding: "500.00" });
    expect((await lines((await book(received))!)).map((l) => [l.acct, l.debit, l.credit])).toEqual([["cwt", "500.00", "0.00"], ["cash_on_hand", "0.00", "500.00"]]);
  });

  it("posts the same entry the Register page shows for the line", async () => {
    const r = (await db.query(
      `select r.*, json_build_object('name', a.name, 'fs_line', a.fs_line, 'bir_line', a.bir_line) as ledger_accounts
       from public.register_lines r left join public.ledger_accounts a on a.id = r.account_id where r.document_id = $1`, [rent])).rows[0] as RegisterRow;
    const shown = bookkeepingPart(toRegisterLine(r)).map((l) => [l.account === "Cash" ? "Cash on Hand" : l.account, (l.debit / 100).toFixed(2), (l.credit / 100).toFixed(2)]);
    const e = (await db.query(`select id from public.journal_entries where document_id = $1`, [rent])).rows[0].id;
    const posted = (await db.query(`select a.name, l.debit, l.credit from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by l.line_no`, [e])).rows.map((l) => [l.name, l.debit, l.credit]);
    expect(posted).toEqual(shown);
  });
});
