/**
 * Ledger slice 4 database tests (migration 20261124000007_ledger_period_lock.sql):
 * a filed return locks its months of the books; late documents move to the next
 * open month; amendments (reviewer asks, Owner approves) reopen and relock them.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { templatePayload } from "../../src/lib/ledger/coa";
import { BOOK_LOCK_FORMS } from "../../src/lib/ledger/types";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ledger_lock_test";

const OWNER = "00000000-0000-0000-0000-000000000051";
const STAFF = "00000000-0000-0000-0000-000000000052";
const REVIEWER = "00000000-0000-0000-0000-000000000053";

describe.skipIf(!url)("ledger: period lock and amendments", () => {
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

  const cashLines = (amount: string) =>
    JSON.stringify([{ account_id: acct.representation, debit: amount, credit: "0" }, { account_id: acct.cash_on_hand, debit: "0", credit: amount }]);
  const post = (date: string, user = STAFF) =>
    as(user, `select public.post_journal_entry($1, $2, 'Meals', null, $3) as id`, [client, date, cashLines("100")]).then((r) => r.rows[0].id as string);
  const setStatus = (form: string, status: string) => db.query(`update public.filing_instances set status = $2 where id = $1`, [filing[form], status]);

  async function doc(date: string): Promise<string> {
    const d = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'staff', 'purchase_receipt', '2027-01-01', '2027-01-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'posted') returning id`,
      [client, STAFF],
    )).rows[0].id;
    await db.query(`insert into public.extractions (document_id, status, fields, approved_fields, approved_by, approved_at) values ($1, 'done', '{}', $2, $3, now())`, [
      d, JSON.stringify({ date, number: `OR-${date}`, party_name: "Grocer", total: "224.00" }), STAFF,
    ]);
    return d;
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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [OWNER, STAFF, REVIEWER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Reviewer', 'reviewer')`,
      [OWNER, STAFF, REVIEWER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9501', 'Client L', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, STAFF, REVIEWER]);
    await db.query(`insert into public.engagements (client_id, service_line, start_date) values ($1, 'bookkeeping', '2027-01-01')`, [client]);
    const returns: [string, string, string, string, string, string][] = [
      // form, rule, label, start, end, due
      ["2550Q", "2550Q", "Q1 2027", "2027-01-01", "2027-03-31", "2027-04-25"],
      ["0619-E", "0619E", "2027-04", "2027-04-01", "2027-04-30", "2027-05-10"],
      ["1604-C", "1604C", "2027", "2027-01-01", "2027-12-31", "2028-01-31"],
    ];
    for (const [form, rule, label, start, end, due] of returns) {
      const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, 'quarterly', '2020-01-01') returning id`, [client, form])).rows[0].id;
      filing[form] = (await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $8, 'reviewed') returning id`,
        [ob, client, form, label, start, end, rule, due],
      )).rows[0].id;
    }
    await as(STAFF, `select public.setup_books($1, 'stock_corporation', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("stock_corporation"))]);
    for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [client])).rows) acct[r.template_key] = r.id;
    await as(STAFF, `select public.save_opening_balances($1, $2)`, [
      client,
      JSON.stringify([{ account_id: acct.cash_on_hand, debit: "50000", credit: "0" }, { account_id: acct.share_capital, debit: "0", credit: "50000" }]),
    ]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("locks with the same returns as the app lists", async () => {
    expect((await db.query(`select private.book_lock_forms() as f`)).rows[0].f).toEqual([...BOOK_LOCK_FORMS]);
  });

  let febEntry: string;
  let marSuggestion: string;
  let lateDoc: string;

  it("keeps the months open until the return is filed", async () => {
    febEntry = await post("2027-02-15");
    expect(febEntry).toBeTruthy();
    // Suggested from a document while March was open; not confirmed yet.
    marSuggestion = (await as(STAFF, `select public.book_document($1) as id`, [await doc("2027-03-05")])).rows[0].id;
    expect((await db.query(`select entry_date::text from public.journal_entries where id = $1`, [marSuggestion])).rows[0].entry_date).toBe("2027-03-05");
  });

  it("locks the return's months once it is filed: no posting, confirming, reversing into them or replacing the opening balances", async () => {
    await setStatus("2550Q", "filed");
    await expect(post("2027-03-01")).rejects.toThrow(/March 2027 is locked: 2550Q Q1 2027 filed/);
    await expect(post("2027-01-31", OWNER)).rejects.toThrow(/January 2027 is locked/);
    await expect(as(STAFF, `select public.confirm_journal_entry($1)`, [marSuggestion])).rejects.toThrow(/March 2027 is locked/);
    await expect(as(STAFF, `select public.reverse_journal_entry($1, '2027-03-31', 'wrong')`, [febEntry])).rejects.toThrow(/March 2027 is locked/);
    await expect(
      as(STAFF, `select public.save_opening_balances($1, $2)`, [
        client,
        JSON.stringify([{ account_id: acct.cash_on_hand, debit: "1", credit: "0" }, { account_id: acct.share_capital, debit: "0", credit: "1" }]),
      ]),
    ).rejects.toThrow(/January 2027 is locked/);
    // Paid and proof uploaded keep it locked.
    await setStatus("2550Q", "proof_uploaded");
    await expect(post("2027-02-01")).rejects.toThrow(/February 2027 is locked/);
  });

  it("corrects a locked month's entry by reversing it in an open month", async () => {
    const r = (await as(STAFF, `select public.reverse_journal_entry($1, '2027-05-02', 'wrong account') as id`, [febEntry])).rows[0].id;
    expect((await db.query(`select status from public.journal_entries where id = $1`, [febEntry])).rows[0].status).toBe("reversed");
    expect((await db.query(`select entry_date::text from public.journal_entries where id = $1`, [r])).rows[0].entry_date).toBe("2027-05-02");
  });

  it("information returns do not lock the books", async () => {
    await setStatus("1604-C", "filed");
    expect(await post("2027-06-30")).toBeTruthy();
  });

  it("books a late document on the first open month of the taxable year, and shows each month's lock", async () => {
    await setStatus("0619-E", "filed");
    lateDoc = await doc("2027-02-20");
    const e = (await as(STAFF, `select public.book_document($1) as id`, [lateDoc])).rows[0].id;
    const row = (await db.query(`select entry_date::text, memo from public.journal_entries where id = $1`, [e])).rows[0];
    // March is locked by the 2550Q and April by the 0619-E: May is the first open month.
    expect(row.entry_date).toBe("2027-05-01");
    expect(row.memo).toMatch(/dated Feb 20, 2027, booked late/);
    await as(STAFF, `select public.confirm_journal_entry($1)`, [e]);

    const months = (await as(STAFF, `select month::text, filed, amendment_id from public.books_periods($1, '2027-05-31')`, [client])).rows;
    expect(months.map((m) => [m.month, m.filed])).toEqual([
      ["2027-01-01", "2550Q Q1 2027"],
      ["2027-02-01", "2550Q Q1 2027"],
      ["2027-03-01", "2550Q Q1 2027"],
      ["2027-04-01", "0619-E 2027-04"],
      ["2027-05-01", null],
    ]);
  });

  let amendment: string;

  it("only the Owner or the client's reviewer asks for an amendment, of a filed return that locks the books", async () => {
    await expect(as(STAFF, `select public.request_ledger_amendment($1, 'Missed invoice')`, [filing["2550Q"]])).rejects.toThrow(/Owner or the client's reviewer/);
    await expect(as(REVIEWER, `select public.request_ledger_amendment($1, ' ')`, [filing["2550Q"]])).rejects.toThrow(/reason/);
    await expect(as(REVIEWER, `select public.request_ledger_amendment($1, 'x')`, [filing["1604-C"]])).rejects.toThrow(/does not lock the books/);
    amendment = (await as(REVIEWER, `select public.request_ledger_amendment($1, 'Unrecorded February purchase') as id`, [filing["2550Q"]])).rows[0].id;
    await expect(as(REVIEWER, `select public.request_ledger_amendment($1, 'again')`, [filing["2550Q"]])).rejects.toThrow(/already in progress/);
    // Requested, not yet approved: still locked.
    await expect(post("2027-02-10")).rejects.toThrow(/February 2027 is locked/);
  });

  it("the Owner approves: the months reopen until they are locked again", async () => {
    await expect(as(REVIEWER, `select public.decide_ledger_amendment($1, true)`, [amendment])).rejects.toThrow(/Only the Owner/);
    await as(OWNER, `select public.decide_ledger_amendment($1, true)`, [amendment]);
    const feb = await post("2027-02-10");
    expect(feb).toBeTruthy();
    const months = (await as(STAFF, `select month::text, amendment_id from public.books_periods($1, '2027-04-30')`, [client])).rows;
    expect(months.map((m) => m.amendment_id)).toEqual([amendment, amendment, amendment, null]);
    // April (0619-E) stays locked.
    await expect(post("2027-04-10")).rejects.toThrow(/April 2027 is locked/);

    await expect(as(STAFF, `select public.relock_ledger_amendment($1, 'done')`, [amendment])).rejects.toThrow(/Owner or the client's reviewer/);
    await expect(as(REVIEWER, `select public.relock_ledger_amendment($1, '')`, [amendment])).rejects.toThrow(/what was changed/);
    await as(REVIEWER, `select public.relock_ledger_amendment($1, 'Booked OR-77 on Feb 10')`, [amendment]);
    await expect(post("2027-02-11")).rejects.toThrow(/February 2027 is locked/);
    const a = (await db.query(`select status, decided_by, relocked_by, changes_note from public.ledger_amendments where id = $1`, [amendment])).rows[0];
    expect(a).toEqual({ status: "relocked", decided_by: OWNER, relocked_by: REVIEWER, changes_note: "Booked OR-77 on Feb 10" });
  });

  it("a rejection needs a reason; an Owner's own request reopens at once", async () => {
    const req = (await as(REVIEWER, `select public.request_ledger_amendment($1, 'Typo') as id`, [filing["0619-E"]])).rows[0].id;
    await expect(as(OWNER, `select public.decide_ledger_amendment($1, false)`, [req])).rejects.toThrow(/reason for rejecting/);
    await as(OWNER, `select public.decide_ledger_amendment($1, false, 'Correct it in May instead')`, [req]);
    await expect(post("2027-04-10")).rejects.toThrow(/April 2027 is locked/);

    const own = (await as(OWNER, `select public.request_ledger_amendment($1, 'Late payroll accrual') as id`, [filing["0619-E"]])).rows[0].id;
    expect((await db.query(`select status, decided_by from public.ledger_amendments where id = $1`, [own])).rows[0]).toEqual({ status: "reopened", decided_by: OWNER });
    expect(await post("2027-04-10")).toBeTruthy();
  });

  it("amendments are written only through the functions", async () => {
    await expect(as(OWNER, `update public.ledger_amendments set status = 'reopened' where id = $1`, [amendment])).resolves.toMatchObject({ rowCount: 0 });
    await expect(as(OWNER, `insert into public.ledger_amendments (client_id, filing_instance_id, period_start, period_end, reason) values ($1, $2, '2027-01-01', '2027-03-31', 'x')`, [client, filing["2550Q"]])).rejects.toThrow(/row-level security/);
  });
});
