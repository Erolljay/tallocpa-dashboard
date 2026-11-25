/**
 * Rework phase 2 (migrations 20261126000005–6): the reviewer locks a month of the
 * Books; the preparer asks once the Inbox is clear; the Owner or the acting approver
 * unlocks on the reviewer's request; unlocking a filed month flags the return for an
 * amended return; returns appear only for locked periods; Books still open; payslips.
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
const DB_NAME = "books_lock_test";

const OWNER = "00000000-0000-0000-0000-000000000d01";
const PREPARER = "00000000-0000-0000-0000-000000000d02";
const REVIEWER = "00000000-0000-0000-0000-000000000d03";
const ACTING = "00000000-0000-0000-0000-000000000d04";
const CLIENT_USER = "00000000-0000-0000-0000-000000000d05";

describe.skipIf(!url)("books: month lock, returns for locked periods, payslips", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  const acct: Record<string, string> = {};
  const filing: Record<string, string> = {};

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
  const post = (date: string) =>
    as(PREPARER, `select public.save_book_invoice($1, $2) as id`, [
      client, JSON.stringify({ kind: "sales", party_name: "Walk-in", issue_date: date, lines: [{ account_id: acct.sales, amount: "100" }] }),
    ]);
  const status = async (month: string) =>
    (await as(PREPARER, `select status, lock_source, request_kind, waiting_documents from public.books_month_status($1, 2026) where month = $2`, [client, month])).rows[0];
  const lock = (user: string, month: string) => as(user, `select public.lock_books_month($1, $2)`, [client, month]);
  const unlock = async (user: string, month: string, reason = "Missed invoice") => (await as(user, `select public.request_books_unlock($1, $2, $3) as id`, [client, month, reason])).rows[0].id as string;
  const ready = async (f: string, user = REVIEWER) => (await as(user, `select public.filing_books_ready($1) as r`, [f])).rows[0].r;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, REVIEWER, ACTING, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $5, 'Owner', 'owner'), ($2, $5, 'Preparer', 'staff'), ($3, $5, 'Reviewer', 'reviewer'), ($4, $5, 'Acting', 'reviewer')`,
      [OWNER, PREPARER, REVIEWER, ACTING, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9911', 'Lapaz Bakery', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Owner of Lapaz')`, [CLIENT_USER, client]);
    const returns: [string, string, string, string, string, string][] = [
      ["2550Q", "2550Q", "Q1 2026", "2026-01-01", "2026-03-31", "2026-04-25"],
      ["2550Q-2", "2550Q", "Q2 2026", "2026-04-01", "2026-06-30", "2026-07-25"],
      ["0619-E", "0619E", "2026-04", "2026-04-01", "2026-04-30", "2026-05-10"],
      ["1604-C", "1604C", "2026", "2026-01-01", "2026-12-31", "2027-01-31"],
    ];
    const obligation: Record<string, string> = {};
    for (const [key, rule, label, start, end, due] of returns) {
      const form = key.replace("-2", "");
      obligation[form] ??= (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, 'quarterly', '2020-01-01') returning id`, [client, form])).rows[0].id;
      filing[key] = (await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $8, 'not_started') returning id`,
        [obligation[form], client, form, label, start, end, rule, due],
      )).rows[0].id;
    }
    await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("locking a month", () => {
    let waiting: string;

    it("lets the preparer ask for a lock only once the month's Inbox is clear", async () => {
      waiting = (await db.query(
        `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
         values ($1, $2, 'staff', 'sales_invoice', '2026-01-01', '2026-01-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'received') returning id`, [client, PREPARER])).rows[0].id;
      expect(await status("2026-01-01")).toEqual({ status: "open", lock_source: null, request_kind: null, waiting_documents: 1 });
      await expect(as(PREPARER, `select public.request_books_lock($1, '2026-01-01')`, [client])).rejects.toThrow(/1 document of January 2026 is still in the Inbox/);
      await expect(lock(REVIEWER, "2026-01-01")).rejects.toThrow(/still in the Inbox/);
      await db.query(`update public.documents set status = 'returned', return_reason = 'Blurred' where id = $1`, [waiting]);
      await as(PREPARER, `select public.request_books_lock($1, '2026-01-15')`, [client]);
      expect(await status("2026-01-01")).toMatchObject({ status: "lock_requested", request_kind: "lock" });
      await expect(as(PREPARER, `select public.request_books_lock($1, '2026-01-01')`, [client])).rejects.toThrow(/already requested/);
    });

    it("lets only the client's reviewer or the Owner lock, and then refuses posting in the month", async () => {
      expect((await post("2026-01-20")).rows[0].id).toBeTruthy();
      await expect(lock(PREPARER, "2026-01-01")).rejects.toThrow(/Only the client's reviewer or the Owner locks a month/);
      await expect(lock(ACTING, "2026-01-01")).rejects.toThrow(/Client not found|Only the client's reviewer/);
      await lock(REVIEWER, "2026-01-01");
      expect(await status("2026-01-01")).toMatchObject({ status: "locked", lock_source: "reviewer", request_kind: null });
      expect((await db.query(`select status from public.books_lock_requests where client_id = $1 and kind = 'lock'`, [client])).rows[0].status).toBe("approved");
      await expect(post("2026-01-21")).rejects.toThrow(/January 2026 is locked by the reviewer/);
      await expect(as(PREPARER, `select public.post_journal_entry($1, '2026-01-22', 'x', null, $2)`, [client, JSON.stringify([{ account_id: acct.cash_on_hand, debit: "1" }, { account_id: acct.sales, credit: "1" }])])).rejects.toThrow(/locked by the reviewer/);
      await expect(lock(REVIEWER, "2026-01-01")).rejects.toThrow(/already locked/);
      await expect(lock(REVIEWER, "2099-01-01")).rejects.toThrow(/has not started yet/);
    });
  });

  describe("unlocking", () => {
    let request: string;

    it("is asked by the reviewer with a reason, not by the preparer", async () => {
      await expect(unlock(PREPARER, "2026-01-01")).rejects.toThrow(/Only the client's reviewer or the Owner asks/);
      await expect(unlock(REVIEWER, "2026-01-01", " ")).rejects.toThrow(/reason/);
      await expect(unlock(REVIEWER, "2026-02-01")).rejects.toThrow(/not locked/);
      request = await unlock(REVIEWER, "2026-01-01");
      expect(await status("2026-01-01")).toMatchObject({ status: "unlock_requested", request_kind: "unlock" });
      await expect(post("2026-01-21")).rejects.toThrow(/locked by the reviewer/);
    });

    it("is decided only by the Owner or the acting approver in office", async () => {
      await expect(as(REVIEWER, `select public.decide_books_unlock($1, true)`, [request])).rejects.toThrow(/Only the Owner or the acting approver/);
      await expect(as(PREPARER, `select public.decide_books_unlock($1, true)`, [request])).rejects.toThrow(/Only the Owner or the acting approver/);
      await expect(as(ACTING, `select public.decide_books_unlock($1, true)`, [request])).rejects.toThrow(/Only the Owner or the acting approver/);
      await expect(as(OWNER, `select public.decide_books_unlock($1, false)`, [request])).rejects.toThrow(/reason for rejecting/);
      expect((await as(ACTING, `select * from public.books_unlock_requests()`)).rows).toEqual([]);
      await db.query(
        `insert into public.acting_approver_delegations (delegate_user_id, starts_at, ends_at, max_tax_due, reason, created_by)
         values ($1, now() - interval '1 hour', now() + interval '7 days', 50000, 'Owner on leave', $2)`, [ACTING, OWNER]);
      expect((await as(ACTING, `select id, reason from public.books_unlock_requests()`)).rows).toEqual([{ id: request, reason: "Missed invoice" }]);
      await as(ACTING, `select public.decide_books_unlock($1, true)`, [request]);
      expect(await status("2026-01-01")).toMatchObject({ status: "open" });
      expect((await post("2026-01-21")).rows[0].id).toBeTruthy();
      await expect(as(OWNER, `select public.decide_books_unlock($1, true)`, [request])).rejects.toThrow(/already decided/);
    });

    it("unlocks at once when the Owner asks", async () => {
      await lock(REVIEWER, "2026-01-01");
      await unlock(OWNER, "2026-01-01", "Owner's correction");
      expect(await status("2026-01-01")).toMatchObject({ status: "open" });
    });
  });

  describe("a month whose return was filed", () => {
    it("flags the return for an amended return when unlocked; the return's other months stay locked", async () => {
      for (const m of ["2026-01-01", "2026-02-01", "2026-03-01"]) await lock(REVIEWER, m);
      await db.query(`update public.filing_instances set status = 'filed', filed_on = '2026-04-20' where id = $1`, [filing["2550Q"]]);
      expect(await ready(filing["2550Q"])).toBe(true);
      const r = await unlock(REVIEWER, "2026-02-01", "Supplier invoice found");
      await as(OWNER, `select public.decide_books_unlock($1, true, 'OK')`, [r]);
      const a = (await db.query(`select status, unlock_request_id, period_start::text, period_end::text from public.ledger_amendments where filing_instance_id = $1`, [filing["2550Q"]])).rows;
      expect(a).toEqual([{ status: "reopened", unlock_request_id: r, period_start: "2026-01-01", period_end: "2026-03-31" }]);
      expect((await as(REVIEWER, `select filing_id, form, reason from public.filings_needing_amendment($1)`, [client])).rows).toEqual([
        { filing_id: filing["2550Q"], form: "2550Q", reason: "Month unlocked: Supplier invoice found" },
      ]);
      expect((await post("2026-02-10")).rows[0].id).toBeTruthy();
      await expect(post("2026-03-10")).rejects.toThrow(/March 2026 is locked/);
      await expect(post("2026-01-10")).rejects.toThrow(/January 2026 is locked/);
      expect(await ready(filing["2550Q"])).toBe(false);
    });

    it("keeps the flag when the month is locked again, until the amended return is started", async () => {
      await lock(REVIEWER, "2026-02-01");
      expect((await db.query(`select status from public.ledger_amendments where filing_instance_id = $1`, [filing["2550Q"]])).rows[0].status).toBe("relocked");
      await expect(post("2026-02-11")).rejects.toThrow(/February 2026 is locked/);
      expect((await as(REVIEWER, `select count(*)::int as n from public.filings_needing_amendment($1)`, [client])).rows[0].n).toBe(1);
      await as(REVIEWER, `select public.amend_filing($1, 'Supplier invoice found')`, [filing["2550Q"]]);
      expect((await as(REVIEWER, `select count(*)::int as n from public.filings_needing_amendment($1)`, [client])).rows[0].n).toBe(0);
    });
  });

  describe("returns appear only for locked periods", () => {
    it("lists the open months with the nearest BIR due date among the returns covering them", async () => {
      const rows = (await as(REVIEWER, `select month::text, status, nearest_due_date::text, form, period_label, filings from public.books_still_open('2026-11-25') where client_id = $1`, [client])).rows;
      expect(rows).toEqual([
        { month: "2026-04-01", status: "open", nearest_due_date: "2026-05-10", form: "0619-E", period_label: "2026-04", filings: 2 },
        { month: "2026-05-01", status: "open", nearest_due_date: "2026-07-25", form: "2550Q", period_label: "Q2 2026", filings: 1 },
        { month: "2026-06-01", status: "open", nearest_due_date: "2026-07-25", form: "2550Q", period_label: "Q2 2026", filings: 1 },
      ]);
      expect((await as(CLIENT_USER, `select count(*)::int as n from public.books_still_open('2026-11-25')`)).rows[0].n).toBe(0);
    });

    it("is ready only when every month of the return's period is locked", async () => {
      expect(await ready(filing["2550Q-2"])).toBe(false);
      await lock(REVIEWER, "2026-04-01");
      expect(await ready(filing["0619-E"])).toBe(true);
      expect(await ready(filing["2550Q-2"])).toBe(false);
      await lock(REVIEWER, "2026-05-01");
      await lock(REVIEWER, "2026-06-01");
      expect(await ready(filing["2550Q-2"])).toBe(true);
      // An information return does not wait on the books.
      expect(await ready(filing["1604-C"])).toBe(true);
      const many = (await as(REVIEWER, `select filing_id, ready from public.filings_books_ready($1) order by ready`, [[filing["2550Q"], filing["2550Q-2"]]])).rows;
      expect(many).toHaveLength(2);
      expect(many.every((r) => r.ready === true)).toBe(true);
      expect(await ready(filing["2550Q-2"], CLIENT_USER)).toBeNull();
    });
  });

  describe("payslips", () => {
    it("lists each employee's pay period with gross, deductions and net pay", async () => {
      const emp = (await db.query(`insert into public.employees (client_id, last_name, first_name, middle_name, employee_no) values ($1, 'Santos', 'Ana', 'Cruz', 'E-1') returning id`, [client])).rows[0].id;
      const items: Record<string, string> = {};
      for (const [name, kind, cat] of [
        ["Basic", "earning", "basic"], ["SSS", "deduction", "sss_ee"], ["PhilHealth", "deduction", "phic_ee"], ["Pag-IBIG", "deduction", "hdmf_ee"],
        ["Tax", "deduction", "withholding_tax"], ["Loan", "deduction", "none"], ["SSS ER", "employer_contribution", "sss_er"],
      ]) items[name] = (await db.query(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, $2, $3, $4) returning id`, [client, name, kind, cat])).rows[0].id;
      const entry = (await db.query(`insert into public.payroll_entries (client_id, employee_id, pay_month, pay_period_end, adjustment) values ($1, $2, '2026-07-01', '2026-07-15', 50) returning id`, [client, emp])).rows[0].id;
      for (const [name, amount] of [["Basic", 20000], ["SSS", 900], ["PhilHealth", 500], ["Pag-IBIG", 200], ["Tax", 1000], ["Loan", 300], ["SSS ER", 1800]]) {
        await db.query(`insert into public.payroll_entry_lines (entry_id, client_id, item_id, amount) values ($1, $2, $3, $4)`, [entry, client, items[name as string], amount]);
      }
      const rows = (await as(PREPARER, `select employee_name, employee_no, pay_period_end::text, gross, sss, philhealth, pagibig, tax, deductions, other_deductions, net, employer_contributions, journal_entry_id from public.payslips($1, '2026-07-01')`, [client])).rows;
      expect(rows).toEqual([{
        employee_name: "Santos, Ana C.", employee_no: "E-1", pay_period_end: "2026-07-15", gross: "20000.00", sss: "900.00", philhealth: "500.00", pagibig: "200.00",
        tax: "1050.00", deductions: "2650.00", other_deductions: "300.00", net: "17050.00", employer_contributions: "1800.00", journal_entry_id: null,
      }]);
      expect((await as(CLIENT_USER, `select count(*)::int as n from public.payslips($1, '2026-07-01')`, [client])).rows[0].n).toBe(0);
    });
  });
});
