/**
 * Rework phase 1 (migrations 20261126000002–4): tax codes, Books transactions
 * (Sales / Purchase Invoices, Receipts, Payments) and Inbox approval into the Books,
 * with the tax codes per document and the party defaults.
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
const DB_NAME = "books_test";

const OWNER = "00000000-0000-0000-0000-000000000b01";
const STAFF = "00000000-0000-0000-0000-000000000b02";
const OTHER = "00000000-0000-0000-0000-000000000b03";
const CLIENT_USER = "00000000-0000-0000-0000-000000000b04";
const CUSTOMER = "123-456-789";
const LANDLORD = "222-333-444";
const VENDOR = "333-444-555";

describe.skipIf(!url)("books transactions", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  const acct: Record<string, string> = {};
  const code: Record<string, string> = {};
  const party: Record<string, string> = {};

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
  const saveInvoice = async (p: object, user = STAFF, c = client) =>
    (await as(user, `select public.save_book_invoice($1, $2) as id`, [c, JSON.stringify(p)])).rows[0].id as string;
  const saveSettlement = async (p: object, user = STAFF) => (await as(user, `select public.save_book_settlement($1, $2) as id`, [client, JSON.stringify(p)])).rows[0].id as string;
  const invoice = async (id: string) => (await db.query(`select * from public.book_invoice_list where id = $1`, [id])).rows[0];
  const entry = async (id: string) => (await db.query(`select * from public.journal_entries where id = $1`, [id])).rows[0];
  const lines = async (e: string) =>
    (await db.query(`select a.template_key as acct, l.debit, l.credit from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by l.line_no`, [e])).rows.map(
      (r) => [r.acct, r.debit, r.credit],
    );

  async function approved(docType: string, fields: Record<string, string>, status = "posted"): Promise<string> {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', $3, '2026-03-01', '2026-03-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'under_review') returning id`,
      [client, STAFF, docType],
    )).rows[0].id;
    if (status === "posted") await as(STAFF, `select public.approve_document($1, $2)`, [d, JSON.stringify(fields)]);
    else await db.query(`insert into public.extractions (document_id, status, fields) values ($1, 'done', $2)`, [d, JSON.stringify(fields)]);
    return d;
  }
  const toBooks = async (d: string, account?: string, cash?: string, codes?: object) =>
    (await as(STAFF, `select public.post_document_to_books($1, $2, $3, $4) as r`, [d, account ?? null, cash ?? null, codes ? JSON.stringify(codes) : null])).rows[0].r;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, OTHER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, STAFF, OTHER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9801', 'Molo Trading', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Molo')`, [CLIENT_USER, client]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01')`, [client]);
    for (const [tin, name] of [[CUSTOMER, "Bacolod Feeds Corp"], [LANDLORD, "Sta. Barbara Realty Corp"], [VENDOR, "Iloilo Office Depot"]]) {
      party[tin] = (await db.query(`insert into public.parties (tin, registered_name) values ($1, $2) returning id`, [tin, name])).rows[0].id;
    }
    await as(STAFF, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
    for (const r of (await db.query(`select id, code from public.tax_codes`)).rows) code[r.code] = r.id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("tax codes", () => {
    it("are seeded with their kinds, rates and ATCs", async () => {
      const rows = (await as(STAFF, `select code, kind, rate::text, atc, payee_type, applies_to from public.tax_codes order by sort_order`)).rows;
      expect(rows).toHaveLength(18);
      expect(rows.find((r) => r.code === "OVAT12")).toMatchObject({ kind: "output_vat", rate: "0.1200", applies_to: "sales" });
      expect(rows.find((r) => r.code === "IVAT12-CG")).toMatchObject({ kind: "input_vat_capital", applies_to: "purchases" });
      expect(rows.find((r) => r.code === "WI010")).toMatchObject({ kind: "withholding", rate: "0.1000", atc: "WI010", payee_type: "individual", applies_to: "both" });
      expect(rows.find((r) => r.code === "WV020")).toMatchObject({ kind: "govt_vat_withheld", rate: "0.0500", applies_to: "sales" });
    });

    it("are changed only by the Owner, and client users do not read them", async () => {
      await expect(as(STAFF, `insert into public.tax_codes (code, name, kind) values ('X1', 'x', 'vat_exempt_sales')`)).rejects.toThrow(/row-level security/);
      await as(OWNER, `update public.tax_codes set name = 'Output VAT 12%' where code = 'OVAT12'`);
      expect((await as(CLIENT_USER, `select count(*)::int as n from public.tax_codes`)).rows[0].n).toBe(0);
    });
  });

  let sale: string;
  let rent: string;

  describe("invoices", () => {
    it("posts a Sales Invoice in the sales book: AR less CWT, CWT, revenue and Output VAT, and opens the receivable", async () => {
      sale = await saveInvoice({
        kind: "sales", party_id: party[CUSTOMER], reference: "SI-0001", issue_date: "2026-03-02", due_date: "2026-04-01",
        withholding_code_id: code.WC158, lines: [{ account_id: acct.sales, amount: "100000", tax_code_id: code.OVAT12 }],
      });
      const inv = await invoice(sale);
      expect(inv).toMatchObject({ party_name: "Bacolod Feeds Corp", subtotal: "100000.00", tax_total: "12000.00", total: "112000.00", withholding: "1000.00", amount_due: "111000.00", balance_due: "111000.00" });
      const e = await entry(inv.journal_entry_id);
      expect(e).toMatchObject({ book: "sales", source: "invoice", status: "posted", reference: "SI-0001" });
      expect(await lines(e.id)).toEqual([
        ["accounts_receivable", "111000.00", "0.00"],
        ["cwt", "1000.00", "0.00"],
        ["sales", "0.00", "100000.00"],
        ["output_vat", "0.00", "12000.00"],
      ]);
      const oi = (await db.query(`select balance, due_date::text, party_id, party_tin from public.open_items where id = $1`, [inv.open_item_id])).rows[0];
      expect(oi).toEqual({ balance: "111000.00", due_date: "2026-04-01", party_id: party[CUSTOMER], party_tin: CUSTOMER });
    });

    it("posts a Purchase Invoice in the purchases book: expense, Input VAT, AP less EWT, EWT payable", async () => {
      rent = await saveInvoice({
        kind: "purchase", party_id: party[LANDLORD], reference: "BILL-3", issue_date: "2026-03-01",
        withholding_code_id: code.WC100, lines: [{ account_id: acct.rent, amount: "45000", tax_code_id: code["IVAT12-S"] }],
      });
      const inv = await invoice(rent);
      expect(inv).toMatchObject({ total: "50400.00", withholding: "2250.00", amount_due: "48150.00", balance_due: "48150.00" });
      expect((await entry(inv.journal_entry_id)).book).toBe("purchases");
      expect(await lines(inv.journal_entry_id)).toEqual([
        ["rent", "45000.00", "0.00"],
        ["input_vat", "5400.00", "0.00"],
        ["accounts_payable", "0.00", "48150.00"],
        ["ewt_payable", "0.00", "2250.00"],
      ]);
    });

    it("splits VATable and exempt lines, and books the SC/PWD discount and VAT withheld by a government customer", async () => {
      const id = await saveInvoice({
        kind: "sales", party_name: "City of Iloilo", issue_date: "2026-03-03", withholding_code_id: code.WC160, vat_withholding_code_id: code.WV020, discount: "100",
        lines: [
          { account_id: acct.service_income, amount: "10000", tax_code_id: code.OVAT12 },
          { account_id: acct.service_income, amount: "1000", tax_code_id: code.VES },
        ],
      });
      const inv = await invoice(id);
      // total 11000 + 1200 − 100; CWT 2% of 10900; VAT withheld 5% of 11000.
      expect(inv).toMatchObject({ total: "12100.00", withholding: "218.00", vat_withheld: "550.00", amount_due: "11332.00" });
      expect(await lines(inv.journal_entry_id)).toEqual([
        ["accounts_receivable", "11332.00", "0.00"],
        ["cwt", "218.00", "0.00"],
        ["vat_withheld", "550.00", "0.00"],
        ["sales_discount_scpwd", "100.00", "0.00"],
        ["service_income", "0.00", "10000.00"],
        ["service_income", "0.00", "1000.00"],
        ["output_vat", "0.00", "1200.00"],
      ]);
    });

    it("takes tax codes only on invoices, and only codes of the invoice's side", async () => {
      const base = { kind: "sales", party_name: "Walk-in", issue_date: "2026-03-04" };
      await expect(saveInvoice({ ...base, lines: [{ account_id: acct.sales, amount: "100", tax_code_id: code["IVAT12-OG"] }] })).rejects.toThrow(/cannot go on a sales invoice/);
      await expect(saveInvoice({ ...base, lines: [{ account_id: acct.sales, amount: "100", tax_code_id: code.WC158 }] })).rejects.toThrow(/withholding code; put it on the invoice/);
      await expect(saveInvoice({ ...base, withholding_code_id: code.OVAT12, lines: [{ account_id: acct.sales, amount: "100" }] })).rejects.toThrow(/withholding tax code/);
      await expect(
        saveInvoice({ kind: "purchase", party_name: "X", issue_date: "2026-03-04", vat_withholding_code_id: code.WV010, lines: [{ account_id: acct.rent, amount: "100" }] }),
      ).rejects.toThrow(/only on a Sales Invoice/);
      await expect(saveInvoice({ ...base, lines: [{ account_id: acct.sales, amount: "100", tax_code_id: code.VES, tax_amount: "12" }] })).rejects.toThrow(/only a 12% VAT code/);
      await expect(saveInvoice({ ...base, lines: [{ account_id: acct.accounts_receivable, amount: "100" }] })).rejects.toThrow(/posted by the Books itself/);
      // Receipts and payments have no tax code at all.
      const cols = (await db.query(`select column_name from information_schema.columns where table_name in ('book_settlements', 'book_settlement_allocations') and column_name like '%code%'`)).rows;
      expect(cols).toEqual([]);
    });

    it("is written only by staff assigned to the client or the Owner, never directly", async () => {
      const p = { kind: "sales", party_name: "Walk-in", issue_date: "2026-03-04", lines: [{ account_id: acct.sales, amount: "100" }] };
      await expect(saveInvoice(p, OTHER)).rejects.toThrow(/Only the Owner or staff assigned/);
      await expect(saveInvoice(p, CLIENT_USER)).rejects.toThrow(/Only the Owner or staff assigned/);
      await expect(as(STAFF, `insert into public.book_invoices (client_id, kind, party_name, issue_date) values ($1, 'sales', 'x', '2026-03-01')`, [client])).rejects.toThrow(/row-level security/);
      expect((await as(CLIENT_USER, `select count(*)::int as n from public.book_invoices`)).rows[0].n).toBe(0);
      expect((await as(OTHER, `select count(*)::int as n from public.book_invoice_list`)).rows[0].n).toBe(0);
      expect(await saveInvoice(p, OWNER)).toBeTruthy();
      await expect(saveInvoice({ ...p, issue_date: "2025-12-31" })).rejects.toThrow(/on or after the start of the books/);
    });
  });

  describe("receipts and payments", () => {
    let receipt: string;

    it("posts a Receipt in the cash receipts book, settling part of the invoice", async () => {
      receipt = await saveSettlement({ kind: "receipt", settle_date: "2026-03-20", cash_account_id: acct.cash_in_bank, reference: "OR-77", allocations: [{ invoice_id: sale, amount: "50000" }] });
      const s = (await db.query(`select * from public.book_settlements where id = $1`, [receipt])).rows[0];
      expect(s).toMatchObject({ party_name: "Bacolod Feeds Corp", amount: "50000.00" });
      expect((await entry(s.journal_entry_id)).book).toBe("cash_receipts");
      expect(await lines(s.journal_entry_id)).toEqual([["cash_in_bank", "50000.00", "0.00"], ["accounts_receivable", "0.00", "50000.00"]]);
      expect((await invoice(sale)).balance_due).toBe("61000.00");
      expect((await db.query(`select amount from public.open_item_applications where entry_id = $1`, [s.journal_entry_id])).rows).toEqual([{ amount: "50000.00" }]);
    });

    it("refuses more than is due, a payment against a sales invoice, and a non-cash account", async () => {
      await expect(saveSettlement({ kind: "receipt", settle_date: "2026-03-21", cash_account_id: acct.cash_in_bank, allocations: [{ invoice_id: sale, amount: "61000.01" }] })).rejects.toThrow(/Only 61000.00 is still due/);
      await expect(saveSettlement({ kind: "payment", settle_date: "2026-03-21", cash_account_id: acct.cash_in_bank, allocations: [{ invoice_id: sale, amount: "1" }] })).rejects.toThrow(/settles only purchase invoices/);
      await expect(saveSettlement({ kind: "receipt", settle_date: "2026-03-21", cash_account_id: acct.sales, allocations: [{ invoice_id: sale, amount: "1" }] })).rejects.toThrow(/cash or bank account/);
    });

    it("posts a Payment in the cash disbursements book that pays the invoice in full", async () => {
      const pay = await saveSettlement({ kind: "payment", settle_date: "2026-03-25", cash_account_id: acct.cash_on_hand, allocations: [{ invoice_id: rent, amount: "48150" }] });
      const e = (await db.query(`select journal_entry_id from public.book_settlements where id = $1`, [pay])).rows[0].journal_entry_id;
      expect((await entry(e)).book).toBe("cash_disbursements");
      expect(await lines(e)).toEqual([["accounts_payable", "48150.00", "0.00"], ["cash_on_hand", "0.00", "48150.00"]]);
      expect((await invoice(rent)).balance_due).toBe("0.00");
      // Editing a paid invoice is refused until its payment is voided.
      await expect(saveInvoice({ id: rent, kind: "purchase", party_id: party[LANDLORD], issue_date: "2026-03-01", lines: [{ account_id: acct.rent, amount: "40000" }] })).rejects.toThrow(/already applied/);
      await expect(as(STAFF, `select public.void_book_settlement($1, '')`, [pay])).rejects.toThrow(/reason/);
      await as(STAFF, `select public.void_book_settlement($1, 'Wrong account')`, [pay]);
      expect((await invoice(rent)).balance_due).toBe("48150.00");
      expect((await entry(e)).status).toBe("reversed");
    });

    it("edits an invoice by reversing its entry and posting a new one", async () => {
      const before = (await invoice(rent)).journal_entry_id;
      await saveInvoice({ id: rent, kind: "purchase", party_id: party[LANDLORD], reference: "BILL-3", issue_date: "2026-03-01", lines: [{ account_id: acct.rent, amount: "40000", tax_code_id: code["IVAT12-S"] }] });
      const inv = await invoice(rent);
      expect(inv.id).toBe(rent);
      expect(inv.journal_entry_id).not.toBe(before);
      expect((await entry(before)).status).toBe("reversed");
      expect(inv).toMatchObject({ total: "44800.00", withholding: "0.00", balance_due: "44800.00" });
    });

    it("keeps invoice entries out of the journal's own reversal", async () => {
      const e = (await invoice(rent)).journal_entry_id;
      await expect(as(STAFF, `select public.reverse_journal_entry($1, '2026-03-31', 'x')`, [e])).rejects.toThrow(/edit or void it there/);
    });

    it("voids an invoice only once nothing settles it", async () => {
      await expect(as(STAFF, `select public.void_book_invoice($1, 'Cancelled')`, [sale])).rejects.toThrow(/void them first/);
      await as(STAFF, `select public.void_book_settlement($1, 'Bounced')`, [receipt]);
      await as(STAFF, `select public.void_book_invoice($1, 'Cancelled')`, [sale]);
      expect((await invoice(sale)).balance_due).toBe("0.00");
      // The receivable is closed (kept, at zero, for the reversed receipt that pointed at it).
      expect((await db.query(`select coalesce(sum(balance), 0)::text as b from public.open_items o join public.journal_entries e on e.id = o.source_entry_id where e.id = (select journal_entry_id from public.book_invoices where id = $1)`, [sale])).rows[0].b).toBe("0.00");
    });

    it("leaves every entry balanced", async () => {
      const unbalanced = (await db.query(
        `select entry_id from public.journal_lines where client_id = $1 group by entry_id having sum(debit) <> sum(credit)`, [client])).rows;
      expect(unbalanced).toEqual([]);
    });
  });

  describe("Inbox approval posts to the Books", () => {
    it("makes a cash sale a Sales Invoice and its Receipt into the first bank account", async () => {
      const d = await approved("sales_invoice", { date: "2026-03-05", number: "SI-0100", party_tin: CUSTOMER, party_name: "Bacolod Feeds Corp", vatable: "10000.00", vat: "1200.00", total: "11200.00", withholding: "100.00", atc: "WC158" });
      const r = await toBooks(d, acct.sales);
      const inv = await invoice(r.invoice_id);
      expect(inv).toMatchObject({ document_id: d, reference: "SI-0100", amount_due: "11100.00", withholding_code: "WC158", balance_due: "0.00" });
      expect(await lines(inv.journal_entry_id)).toEqual([
        ["accounts_receivable", "11100.00", "0.00"], ["cwt", "100.00", "0.00"], ["sales", "0.00", "10000.00"], ["output_vat", "0.00", "1200.00"],
      ]);
      const s = (await db.query(`select * from public.book_settlements where id = $1`, [r.settlement_id])).rows[0];
      expect(s).toMatchObject({ kind: "receipt", document_id: d, amount: "11100.00", cash_account_id: acct.cash_in_bank });
      expect(await lines(s.journal_entry_id)).toEqual([["cash_in_bank", "11100.00", "0.00"], ["accounts_receivable", "0.00", "11100.00"]]);
      // Calling it again returns what is there; the register line is still kept.
      expect(await toBooks(d, acct.sales)).toEqual(r);
      expect((await db.query(`select count(*)::int as n from public.register_lines where document_id = $1`, [d])).rows[0].n).toBe(1);
    });

    it("makes a charge purchase a Purchase Invoice only, its balance waiting under the supplier", async () => {
      const d = await approved("purchase_receipt", { date: "2026-03-06", number: "INV-9", party_tin: VENDOR, vatable: "1000.00", vat: "120.00", total: "1120.00", payment_terms: "charge" });
      const r = await toBooks(d, acct.office_supplies);
      expect(r.settlement_id).toBeNull();
      expect(await invoice(r.invoice_id)).toMatchObject({ kind: "purchase", balance_due: "1120.00", party_id: party[VENDOR] });
    });

    it("splits a document with VATable and exempt amounts into two lines with two tax codes", async () => {
      const d = await approved("sales_invoice", { date: "2026-03-07", number: "SI-0101", vatable: "5000.00", vat_exempt: "2000.00", vat: "600.00", total: "7600.00", payment_terms: "charge" });
      const r = await toBooks(d, acct.sales);
      const ls = (await db.query(`select l.amount, l.tax_amount, c.code from public.book_invoice_lines l join public.tax_codes c on c.id = l.tax_code_id where l.invoice_id = $1 order by l.line_no`, [r.invoice_id])).rows;
      expect(ls).toEqual([{ amount: "5000.00", tax_amount: "600.00", code: "OVAT12" }, { amount: "2000.00", tax_amount: "0.00", code: "VES" }]);
    });

    it("suggests the tax codes of a waiting document from its figures (OCR)", async () => {
      const d = await approved("purchase_receipt", { date: "2026-03-08", party_tin: LANDLORD, vatable: "20000.00", vat: "2400.00", total: "22400.00", withholding: "400.00", atc: "WC160", slp_category: "services" }, "pending");
      const s = (await as(STAFF, `select * from public.pending_document_tax_codes($1) where document_id = $2`, [client, d])).rows[0];
      expect(s.lines).toEqual([{ portion: "vatable", amount: 20000, tax_amount: 2400, tax_code_id: code["IVAT12-S"], source: "ocr" }]);
      expect(s).toMatchObject({ withholding_code_id: code.WC160, withholding_source: "ocr" });
      await expect(as(OTHER, `select * from public.pending_document_tax_codes($1)`, [client])).rejects.toThrow(/cannot see this client/);
    });

    it("rejects a code from the wrong side, and saves the confirmed codes as the party's default, which then wins", async () => {
      const d = await approved("purchase_receipt", { date: "2026-03-09", number: "OR-55", party_tin: LANDLORD, vatable: "30000.00", vat: "3600.00", total: "33600.00", withholding: "600.00", atc: "WC160" });
      await expect(toBooks(d, acct.rent, undefined, { lines: [{ portion: "vatable", tax_code_id: code.OVAT12 }] })).rejects.toThrow(/cannot go on a purchase invoice/);
      await expect(toBooks(d, acct.rent, undefined, { vat_withholding_code_id: code.WV010 })).rejects.toThrow(/only on a Sales Invoice/);
      const r = await toBooks(d, acct.rent, undefined, { lines: [{ portion: "vatable", tax_code_id: code["IVAT12-CG"] }], withholding_code_id: code.WC100 });
      expect(await invoice(r.invoice_id)).toMatchObject({ withholding_code: "WC100" });
      const saved = (await db.query(`select tax_code_id, withholding_code_id from public.client_party_tax_codes where client_id = $1 and party_id = $2 and kind = 'purchase'`, [client, party[LANDLORD]])).rows[0];
      expect(saved).toEqual({ tax_code_id: code["IVAT12-CG"], withholding_code_id: code.WC100 });
      // The waiting document of the same landlord now takes the party's codes over what OCR read.
      const pending = (await as(STAFF, `select * from public.pending_document_tax_codes($1)`, [client])).rows.find((x) => x.lines[0].amount === 20000);
      expect(pending.lines[0]).toMatchObject({ tax_code_id: code["IVAT12-CG"], source: "party" });
      expect(pending).toMatchObject({ withholding_code_id: code.WC100, withholding_source: "party" });
    });

    it("marks the CWT of the matching Sales Invoice as supported when the customer's 2307 is approved, with no new entry", async () => {
      const d = await approved("sales_invoice", { date: "2026-03-10", number: "SI-0102", party_tin: CUSTOMER, vatable: "50000.00", vat: "6000.00", total: "56000.00", withholding: "500.00", atc: "WC158", payment_terms: "charge" });
      const r = await toBooks(d, acct.sales);
      const entries = (await db.query(`select count(*)::int as n from public.journal_entries where client_id = $1`, [client])).rows[0].n;
      const cert = await approved("bir_2307_received", { date: "2026-04-05", party_tin: CUSTOMER, atc: "WC158", withholding: "500.00" });
      expect(await toBooks(cert)).toEqual({ cwt_marked: 1 });
      expect(await invoice(r.invoice_id)).toMatchObject({ cwt_document_id: cert });
      expect((await db.query(`select count(*)::int as n from public.journal_entries where client_id = $1`, [client])).rows[0].n).toBe(entries);
    });

    it("does not post payroll documents, and unposts a document so its figures can be corrected", async () => {
      const p = (await db.query(
        `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
         values ($1, $2, 'staff', 'payroll', '2026-03-01', '2026-03-01', 'p.xlsx', 'text/csv', 1, gen_random_uuid()::text, 'posted') returning id`, [client, STAFF])).rows[0].id;
      expect(await toBooks(p)).toBeNull();

      const d = await approved("purchase_receipt", { date: "2026-03-11", number: "OR-60", total: "500.00", vat_exempt: "500.00" });
      const r = await toBooks(d, acct.office_supplies);
      await expect(as(STAFF, `select public.approve_document($1, $2)`, [d, JSON.stringify({ date: "2026-03-11", number: "OR-60", total: "600.00", vat_exempt: "600.00" })])).rejects.toThrow(/reverse its journal entry/);
      await as(STAFF, `select public.unpost_document_from_books($1, 'Wrong amount')`, [d]);
      expect((await invoice(r.invoice_id)).voided_at).not.toBeNull();
      await as(STAFF, `select public.approve_document($1, $2)`, [d, JSON.stringify({ date: "2026-03-11", number: "OR-60", total: "600.00", vat_exempt: "600.00" })]);
      const again = await toBooks(d, acct.office_supplies);
      expect(again.invoice_id).not.toBe(r.invoice_id);
      expect(await invoice(again.invoice_id)).toMatchObject({ total: "600.00", balance_due: "0.00" });
    });
  });
});
