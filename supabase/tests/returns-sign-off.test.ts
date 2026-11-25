/**
 * Rework phase 3 (migrations 20261127100001–4): the five-step sign-off (nil returns skip
 * the client's approval; the Owner approves once the return's own item is paid), the
 * scanned copy at Filed & paid, the VAT closing of a filed 2550Q, the dues payment in
 * the client's Books when a verified payment pays a return's or a contribution's item,
 * eSubmission states, existing returns moved to the new steps, and the restart of the
 * steps when a month is unlocked (amended returns included).
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
const DB_NAME = "returns_sign_off_test";

const OWNER = "00000000-0000-0000-0000-000000000e01";
const PREPARER = "00000000-0000-0000-0000-000000000e02";
const REVIEWER = "00000000-0000-0000-0000-000000000e03";
const CLIENT_USER = "00000000-0000-0000-0000-000000000e04";
const OTHER_CLIENT_USER = "00000000-0000-0000-0000-000000000e05";

describe.skipIf(!url)("returns: five-step sign-off, filed copy, Books entries, eSubmission", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  /** Firm remits its taxes; VAT registered, keeps books. */
  let remits: string;
  /** Pays the BIR directly; keeps books. */
  let direct: string;
  const acct: Record<string, Record<string, string>> = {};
  const code: Record<string, string> = {};
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
  async function asService(sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("set local role service_role");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const step = async (user: string, f: string, action: string, data: object = {}, note: string | null = null) =>
    (await as(user, `select (x).status, (x).tax_due::text from public.advance_filing($1, $2, $3, $4::jsonb) as x`, [f, action, note, JSON.stringify(data)])).rows[0];
  const statusOf = async (f: string) => (await db.query(`select status from public.filing_instances where id = $1`, [f])).rows[0].status as string;
  const lock = (client: string, month: string) => as(REVIEWER, `select public.lock_books_month($1, $2)`, [client, month]);
  const invoice = (client: string, p: object) => as(PREPARER, `select public.save_book_invoice($1, $2) as id`, [client, JSON.stringify(p)]);
  const entryLines = async (entry: string) =>
    (await db.query(
      `select a.template_key as account, l.debit::text, l.credit::text from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by l.line_no`,
      [entry],
    )).rows;
  /** Stores a file in the return's folder (as the upload would) and records it. */
  async function attach(f: string, client: string, kind: "filed_copy" | "validation_report", name = "copy.pdf") {
    const p = `${client}/${f}/${Math.random().toString(36).slice(2)}/${name}`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('filing-files', $1)`, [p]);
    return (await as(PREPARER, `select public.add_filing_file($1, $2, $3, $4, 'application/pdf', 1000) as id`, [f, kind, p, name])).rows[0].id as string;
  }
  const fileIt = (f: string, extra: object = {}) =>
    step(PREPARER, f, "file", { filing_reference: "EFPS-1", filed_on: "2026-04-22", payment_reference: "BANK-1", paid_on: "2026-04-22", ...extra });

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    for (const f of readdirSync(path.join(root, "migrations")).sort()) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(`grant usage on schema public to service_role`);
    await db.query(read("seed.sql"));
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, REVIEWER, CLIENT_USER, OTHER_CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Reviewer', 'reviewer')`,
      [OWNER, PREPARER, REVIEWER, brand],
    );
    remits = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9921', 'Jaro Trading', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    direct = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9922', 'Molo Foods', 'corporation', 'client_pays_direct') returning id`, [brand])).rows[0].id;
    for (const c of [remits, direct]) {
      await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [c, PREPARER, REVIEWER]);
    }
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Jaro owner'), ($3, $4, 'Molo owner')`, [CLIENT_USER, remits, OTHER_CLIENT_USER, direct]);
    const returns: [string, string, string, string, string, string, string][] = [
      ["2550Q", remits, "2550Q", "Q1 2026", "2026-01-01", "2026-03-31", "2026-04-25"],
      ["0619-E Jan", remits, "0619E", "2026-01", "2026-01-01", "2026-01-31", "2026-02-10"],
      ["0619-E Feb", remits, "0619E", "2026-02", "2026-02-01", "2026-02-28", "2026-03-10"],
      ["2550Q direct", direct, "2550Q", "Q1 2026", "2026-01-01", "2026-03-31", "2026-04-25"],
    ];
    const obligation: Record<string, string> = {};
    for (const [key, client, rule, label, start, end, due] of returns) {
      const form = key.split(" ")[0];
      const ok = `${client}-${form}`;
      obligation[ok] ??= (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, 'quarterly', '2020-01-01') returning id`, [client, form])).rows[0].id;
      filing[key] = (await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $8) returning id`,
        [obligation[ok], client, form, label, start, end, rule, due],
      )).rows[0].id;
    }
    for (const c of [remits, direct]) {
      await as(PREPARER, `select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [c, JSON.stringify(templatePayload("stock_corporation"))]);
      acct[c] = {};
      for (const r of (await db.query(`select id, template_key from public.ledger_accounts where client_id = $1`, [c])).rows) acct[c][r.template_key] = r.id;
    }
    for (const r of (await db.query(`select id, code from public.tax_codes`)).rows) code[r.code] = r.id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("existing returns", () => {
    it("move to the nearest of the five steps", async () => {
      const section = read("migrations/20261127100003_sign_off_five_steps.sql").split("-- Existing returns.")[1].split("alter table public.filing_instances drop constraint")[0];
      await db.query("begin");
      try {
        await db.query(`alter table public.filing_instances drop constraint filing_instances_status_check`);
        const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601-C', 'monthly', '2020-01-01') returning id`, [direct])).rows[0].id;
        const old: Record<string, string> = {};
        for (const [i, [st, tax]] of ([["filed", 10], ["paid", 10], ["proof_uploaded", 10], ["reviewed", 0], ["reviewed", 5]] as const).entries()) {
          old[`${st}-${tax}`] = (await db.query(
            `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status, tax_due)
             values ($1, $2, '1601-C', $3, $4, $4, '1601C', '2025-12-10', '2025-12-10', $5, $6) returning id`,
            [ob, direct, `2025-0${i + 1}`, `2025-0${i + 1}-28`, st, tax],
          )).rows[0].id;
        }
        await db.query(section);
        const after = (await db.query(`select id, status from public.filing_instances where obligation_id = $1`, [ob])).rows;
        const byId = Object.fromEntries(after.map((r) => [r.id, r.status]));
        expect(byId[old["filed-10"]]).toBe("filed");
        expect(byId[old["paid-10"]]).toBe("filed");
        expect(byId[old["proof_uploaded-10"]]).toBe("filed");
        expect(byId[old["reviewed-0"]]).toBe("client_approved");
        expect(byId[old["reviewed-5"]]).toBe("reviewed");
        const events = (await db.query(`select action from public.filing_events where filing_instance_id = $1`, [old["reviewed-0"]])).rows;
        expect(events).toEqual([{ action: "skip_client_approval" }]);
      } finally {
        await db.query("rollback");
      }
    });
  });

  describe("Books of the first quarter", () => {
    it("are posted, and a return cannot be prepared until its months are locked", async () => {
      await invoice(remits, {
        kind: "sales", party_name: "City of Iloilo", issue_date: "2026-01-15", vat_withholding_code_id: code.WV010,
        lines: [{ account_id: acct[remits].sales, amount: "100000", tax_code_id: code.OVAT12 }],
      });
      await invoice(remits, { kind: "purchase", party_name: "Supplier Inc", issue_date: "2026-02-10", lines: [{ account_id: acct[remits].purchases, amount: "50000", tax_code_id: code["IVAT12-OG"] }] });
      await invoice(direct, { kind: "sales", party_name: "Walk-in", issue_date: "2026-01-20", lines: [{ account_id: acct[direct].sales, amount: "10000", tax_code_id: code.OVAT12 }] });
      await invoice(direct, { kind: "purchase", party_name: "Supplier Inc", issue_date: "2026-02-20", lines: [{ account_id: acct[direct].purchases, amount: "50000", tax_code_id: code["IVAT12-OG"] }] });
      await expect(step(PREPARER, filing["2550Q"], "prepare", { tax_due: 1000 })).rejects.toThrow(/Books for this return's period are still open/);
      for (const c of [remits, direct]) for (const m of ["2026-01-01", "2026-02-01", "2026-03-01"]) await lock(c, m);
    });
  });

  describe("sign-off", () => {
    it("skips the client's approval for a nil return", async () => {
      const f = filing["0619-E Jan"];
      expect(await step(PREPARER, f, "prepare", { tax_due: 0 })).toMatchObject({ status: "prepared" });
      expect(await step(REVIEWER, f, "review")).toMatchObject({ status: "client_approved" });
      const ev = (await db.query(`select action, to_status, data from public.filing_events where filing_instance_id = $1 order by id desc limit 1`, [f])).rows[0];
      expect(ev).toMatchObject({ action: "review", to_status: "client_approved", data: { client_approval: "skipped", nil: true } });
      await expect(step(CLIENT_USER, f, "client_approve")).rejects.toThrow(/Only a reviewed return/);
      // Nothing to collect on a nil return: the Owner approves at once.
      expect(await step(OWNER, f, "owner_approve")).toMatchObject({ status: "owner_approved" });
    });

    it("lets the Owner approve only once the return's own item is paid; retainer balances do not count", async () => {
      const f = filing["2550Q"];
      await step(PREPARER, f, "prepare", { tax_due: 1000 });
      expect(await step(REVIEWER, f, "review")).toMatchObject({ status: "reviewed" });
      await expect(step(OWNER, f, "client_approve")).rejects.toThrow(/how the client approved/);
      expect(await step(CLIENT_USER, f, "client_approve")).toMatchObject({ status: "client_approved" });
      await expect(step(OWNER, f, "owner_approve")).rejects.toThrow(/not verified yet \(not on a statement yet\)/);

      await as(OWNER, `select public.run_billing('2026-04-10', $1)`, [remits]);
      const due = (await db.query(`select id from public.client_dues where filing_instance_id = $1`, [f])).rows[0].id;
      // An unpaid retainer charge of the client does not hold the return.
      await as(OWNER, `select public.add_client_charge($1, 'other', 'Retainer, March 2026', 3000, '2026-03-31')`, [remits]);
      await expect(step(OWNER, f, "owner_approve")).rejects.toThrow(/not verified yet \(unpaid\)/);
      await as(OWNER, `select public.record_deposit($1, '2026-04-20', 600, null, 'BDO-1', null, null, $2)`, [remits, [due]]);
      await expect(step(OWNER, f, "owner_approve")).rejects.toThrow(/partly paid/);
      await as(OWNER, `select public.record_deposit($1, '2026-04-21', 400, null, 'BDO-2', null, null, $2)`, [remits, [due]]);
      const check = (await as(OWNER, `select public.filing_payment_check($1) as c`, [f])).rows[0].c;
      expect(check).toMatchObject({ status: "paid", tax_paid: 1000, other_open: 3000 });
      expect(await step(OWNER, f, "owner_approve", { approve_unpaid: true, dat_files: ["SLS.DAT", "SLP.DAT"] })).toMatchObject({ status: "owner_approved" });
      const row = (await db.query(`select esubmission_required, esubmission_files from public.filing_instances where id = $1`, [f])).rows[0];
      expect(row).toEqual({ esubmission_required: true, esubmission_files: ["SLS.DAT", "SLP.DAT"] });
    });

    it("records Filed & paid only with the references and the one scanned copy, which the client then sees", async () => {
      const f = filing["2550Q"];
      await expect(fileIt(f, { payment_reference: "" })).rejects.toThrow(/payment reference/);
      await expect(fileIt(f)).rejects.toThrow(/scanned copy/);
      const first = await attach(f, remits, "filed_copy", "first.pdf");
      const second = await attach(f, remits, "filed_copy", "second.pdf");
      expect((await db.query(`select id, replaced_at is not null as replaced from public.filing_files where filing_instance_id = $1 and kind = 'filed_copy' order by created_at, file_name`, [f])).rows)
        .toEqual([{ id: first, replaced: true }, { id: second, replaced: false }]);
      expect((await as(CLIENT_USER, `select id from public.filing_files`)).rows).toEqual([]);
      expect(await fileIt(f)).toMatchObject({ status: "filed" });
      expect((await as(CLIENT_USER, `select id from public.filing_files`)).rows).toEqual([{ id: second }]);
      expect((await as(OTHER_CLIENT_USER, `select id from public.filing_files`)).rows).toEqual([]);
      await expect(step(PREPARER, f, "pay")).rejects.toThrow(/Unknown action/);
    });
  });

  describe("Books entries from returns", () => {
    it("closes the VAT of a filed 2550Q: Dr Output VAT, Cr VAT withheld, Cr Input VAT, Cr VAT payable, balanced", async () => {
      const r = (await db.query(`select status, entry_id, entry_date::text, amount::text from public.return_book_entries where filing_instance_id = $1 and kind = 'vat_closing'`, [filing["2550Q"]])).rows;
      expect(r).toMatchObject([{ status: "posted", entry_date: "2026-03-31", amount: "1000.00" }]);
      expect(await entryLines(r[0].entry_id)).toEqual([
        { account: "output_vat", debit: "12000.00", credit: "0.00" },
        { account: "vat_withheld", debit: "0.00", credit: "5000.00" },
        { account: "input_vat", debit: "0.00", credit: "6000.00" },
        { account: "vat_payable", debit: "0.00", credit: "1000.00" },
      ]);
      const sums = (await db.query(`select sum(debit)::text as d, sum(credit)::text as c from public.journal_lines where entry_id = $1`, [r[0].entry_id])).rows[0];
      expect(sums.d).toBe(sums.c);
      // The quarter's figures still show its VAT (a closing entry is left out of the range).
      const tb = (await as(PREPARER, `select closing::text from public.trial_balance($1, '2026-01-01', '2026-03-31') where account_id = $2`, [remits, acct[remits].output_vat])).rows[0];
      expect(tb.closing).toBe("-12000.00");
    });

    it("posts each verified payment of a return's item as a dues payment dated the day the client paid; VAT payable clears", async () => {
      const rows = (await db.query(
        `select r.status, r.entry_date::text, r.amount::text, r.entry_id, j.book, j.source from public.return_book_entries r join public.journal_entries j on j.id = r.entry_id
         where r.filing_instance_id = $1 and r.kind = 'dues_payment' order by r.entry_date`, [filing["2550Q"]])).rows;
      expect(rows.map(({ entry_id: _, ...x }) => x)).toEqual([
        { status: "posted", entry_date: "2026-04-20", amount: "600.00", book: "cash_disbursements", source: "dues_payment" },
        { status: "posted", entry_date: "2026-04-21", amount: "400.00", book: "cash_disbursements", source: "dues_payment" },
      ]);
      expect(await entryLines(rows[0].entry_id)).toEqual([
        { account: "vat_payable", debit: "600.00", credit: "0.00" },
        { account: "cash_in_bank", debit: "0.00", credit: "600.00" },
      ]);
      const vat = (await db.query(`select coalesce(sum(debit - credit), 0)::text as b from public.journal_lines where account_id = $1`, [acct[remits].vat_payable])).rows[0].b;
      expect(vat).toBe("0.00");
      // The retainer charge is not a due the client's books pay.
      expect((await db.query(`select count(*)::int as n from public.return_book_entries r join public.client_dues d on d.id = r.due_id where d.kind = 'other'`)).rows[0].n).toBe(0);
    });

    it("posts a contribution's payment to SSS, PhilHealth and Pag-IBIG Payable and reverses it when the deposit is voided", async () => {
      const due = (await as(OWNER, `select public.add_client_charge($1, 'contribution', 'SSS contribution, March 2026', 1500, '2026-04-15') as id`, [remits])).rows[0].id;
      const dep = (await as(OWNER, `select public.record_deposit($1, '2026-04-12', 1500, null, null, null, null, $2, 'cash', $3) as id`, [remits, [due], PREPARER])).rows[0].id;
      const r = (await db.query(`select id, status, entry_id from public.return_book_entries where due_id = $1`, [due])).rows[0];
      expect(r.status).toBe("posted");
      expect(await entryLines(r.entry_id)).toEqual([
        { account: "government_contributions_payable", debit: "1500.00", credit: "0.00" },
        { account: "cash_on_hand", debit: "0.00", credit: "1500.00" },
      ]);
      await as(OWNER, `select public.void_deposit($1, 'Bounced')`, [dep]);
      const after = (await db.query(`select status, reversal_id is not null as reversed from public.return_book_entries where id = $1`, [r.id])).rows[0];
      expect(after).toEqual({ status: "reversed", reversed: true });
      expect((await db.query(`select status from public.journal_entries where id = $1`, [r.entry_id])).rows[0].status).toBe("reversed");
    });

    it("records why an entry could not be posted, without stopping the payment, and posts it on retry", async () => {
      // The payable account is switched off in the chart: the entry cannot be posted.
      await db.query(`update public.ledger_accounts set active = false where id = $1`, [acct[remits].government_contributions_payable]);
      const due = (await as(OWNER, `select public.add_client_charge($1, 'contribution', 'PhilHealth, March 2026', 800, '2026-04-15') as id`, [remits])).rows[0].id;
      await as(OWNER, `select public.record_deposit($1, '2026-04-14', 800, null, null, null, null, $2)`, [remits, [due]]);
      expect((await db.query(`select open_amount::text from public.due_balances where id = $1`, [due])).rows[0].open_amount).toBe("0.00");
      const r = (await db.query(`select id, status, note from public.return_book_entries where due_id = $1`, [due])).rows[0];
      expect(r).toMatchObject({ status: "failed", note: expect.stringMatching(/lacks the payable account/) });
      await expect(as(PREPARER, `select public.retry_return_book_entry($1)`, [r.id])).rejects.toThrow(/lacks the payable account/);
      await db.query(`update public.ledger_accounts set active = true where id = $1`, [acct[remits].government_contributions_payable]);
      await as(PREPARER, `select public.retry_return_book_entry($1)`, [r.id]);
      expect((await db.query(`select status from public.return_book_entries where due_id = $1`, [due])).rows).toEqual([{ status: "posted" }]);
    });

    it("keeps excess input VAT carried over with no VAT payable line, and books a direct client's own payment", async () => {
      const f = filing["2550Q direct"];
      await step(PREPARER, f, "prepare", { tax_due: 0 });
      expect(await step(REVIEWER, f, "review")).toMatchObject({ status: "client_approved" });
      expect(await step(OWNER, f, "owner_approve", { dat_files: [] })).toMatchObject({ status: "owner_approved" });
      await attach(f, direct, "filed_copy");
      expect(await fileIt(f, { payment_reference: "", paid_on: "" })).toMatchObject({ status: "filed" });
      const r = (await db.query(`select status, entry_id, amount::text, note from public.return_book_entries where filing_instance_id = $1 and kind = 'vat_closing'`, [f])).rows[0];
      expect(r).toMatchObject({ status: "posted", amount: "0.00", note: "Input VAT carried over: 4,800.00" });
      expect(await entryLines(r.entry_id)).toEqual([
        { account: "output_vat", debit: "1200.00", credit: "0.00" },
        { account: "input_vat", debit: "0.00", credit: "1200.00" },
      ]);
      expect((await db.query(`select count(*)::int as n from public.return_book_entries where filing_instance_id = $1 and kind = 'dues_payment'`, [f])).rows[0].n).toBe(0);
      expect((await db.query(`select esubmission_required from public.filing_instances where id = $1`, [f])).rows[0].esubmission_required).toBe(false);
    });
  });

  describe("eSubmission", () => {
    const state = async (f: string) => (await as(PREPARER, `select public.filing_esubmission_state($1) as s, public.filing_complete($1) as c`, [f])).rows[0];

    it("goes Not sent → Sent → Errors → (resend) Sent → Validated; the return is complete only then", async () => {
      const f = filing["2550Q"];
      expect(await state(f)).toEqual({ s: "not_sent", c: false });
      expect(await state(filing["2550Q direct"])).toEqual({ s: "not_required", c: true });
      await expect(as(PREPARER, `select public.record_esubmission_result($1, 'validated')`, [f])).rejects.toThrow(/Send the DAT files first/);
      await expect(as(PREPARER, `select public.record_esubmission_sent($1, 'manual', null)`, [filing["2550Q direct"]])).rejects.toThrow(/no DAT attachments/);
      await expect(as(PREPARER, `select public.record_esubmission_sent($1, 'gmail', $2)`, [f, ["SLS.DAT"]])).rejects.toThrow(/message id/);
      await expect(as(CLIENT_USER, `select public.record_esubmission_sent($1, 'manual', null)`, [f])).rejects.toThrow(/Return not found/);

      const first = (await as(PREPARER, `select public.record_esubmission_sent($1, 'manual', null) as id`, [f])).rows[0].id;
      expect(await state(f)).toEqual({ s: "sent", c: false });
      await expect(as(PREPARER, `select public.record_esubmission_sent($1, 'manual', null)`, [f])).rejects.toThrow(/wait for the BIR's reply/);
      expect((await db.query(`select files from public.esubmissions where id = $1`, [first])).rows[0].files).toEqual(["SLS.DAT", "SLP.DAT"]);
      await expect(as(PREPARER, `select public.record_esubmission_result($1, 'errors')`, [f])).rejects.toThrow(/what the BIR found wrong/);
      await as(PREPARER, `select public.record_esubmission_result($1, 'errors', 'SLP: invalid TIN of Supplier Inc')`, [f]);
      expect(await state(f)).toEqual({ s: "errors", c: false });

      const second = (await as(PREPARER, `select public.record_esubmission_sent($1, 'gmail', $2, 'msg-2', 'thread-2') as id`, [f, ["SLS.DAT", "SLP.DAT"]])).rows[0].id;
      expect((await db.query(`select superseded_at is not null as s from public.esubmissions where id = $1`, [first])).rows[0].s).toBe(true);
      // The mailbox job sees it and records the BIR's reply.
      await expect(as(PREPARER, `select * from public.esubmissions_waiting()`)).rejects.toThrow(/permission denied/);
      expect((await asService(`select id, gmail_thread_id from public.esubmissions_waiting()`)).rows).toEqual([{ id: second, gmail_thread_id: "thread-2" }]);
      await expect(asService(`select public.esubmission_mailbox_result($1, 'validated', null, null, null, null, null)`, [second])).rejects.toThrow(/needs its validation report/);
      const p = `${remits}/${f}/reply/validation.pdf`;
      await db.query(`insert into storage.objects (bucket_id, name) values ('filing-files', $1)`, [p]);
      expect((await asService(`select public.esubmission_mailbox_result($1, 'validated', 'No errors', $2, 'validation.pdf', 'application/pdf', 2048) as ok`, [second, p])).rows[0].ok).toBe(true);
      expect((await asService(`select public.esubmission_mailbox_result($1, 'errors', 'late', null, null, null, null) as ok`, [second])).rows[0].ok).toBe(false);
      expect(await state(f)).toEqual({ s: "validated", c: true });
      expect((await as(CLIENT_USER, `select kind from public.filing_files order by kind`)).rows).toEqual([{ kind: "filed_copy" }, { kind: "validation_report" }]);
      await expect(as(PREPARER, `select public.record_esubmission_sent($1, 'manual', null)`, [f])).rejects.toThrow(/already validated/);
    });

    it("takes a validation report uploaded by staff as the manual fallback", async () => {
      // A return approved with DAT files: send by hand, upload the report, mark validated.
      const f = filing["0619-E Jan"];
      await db.query(`update public.filing_instances set esubmission_required = true, esubmission_files = '{QAP.DAT}' where id = $1`, [f]);
      await as(PREPARER, `select public.record_esubmission_sent($1, 'manual', null)`, [f]);
      await expect(as(PREPARER, `select public.record_esubmission_result($1, 'validated')`, [f])).rejects.toThrow(/Attach the BIR's validation report/);
      const report = await attach(f, remits, "validation_report", "report.pdf");
      await as(PREPARER, `select public.record_esubmission_result($1, 'validated', null, $2)`, [f, report]);
      expect(await state(f)).toEqual({ s: "validated", c: false });
    });
  });

  describe("unlocking a month", () => {
    it("restarts an unfiled return that covers it", async () => {
      const f = filing["0619-E Feb"];
      await step(PREPARER, f, "prepare", { tax_due: 250 });
      await step(REVIEWER, f, "review");
      expect(await statusOf(f)).toBe("reviewed");
      await as(OWNER, `select public.request_books_unlock($1, '2026-02-01', 'Late supplier invoice')`, [remits]);
      expect(await statusOf(f)).toBe("not_started");
      const ev = (await db.query(`select action, from_status, note from public.filing_events where filing_instance_id = $1 order by id desc limit 1`, [f])).rows[0];
      expect(ev).toMatchObject({ action: "restart", from_status: "reviewed", note: expect.stringMatching(/February 2026 were unlocked/) });
      // The filed 2550Q covering February is flagged for an amended return instead.
      expect(await statusOf(filing["2550Q"])).toBe("filed");
      expect((await as(REVIEWER, `select filing_id from public.filings_needing_amendment($1)`, [remits])).rows).toEqual([{ filing_id: filing["2550Q"] }]);
    });

    it("runs the amended return through the five steps from the start and closes the quarter's VAT again", async () => {
      await invoice(remits, { kind: "sales", party_name: "Late Customer", issue_date: "2026-02-25", lines: [{ account_id: acct[remits].sales, amount: "10000", tax_code_id: code.OVAT12 }] });
      const a = (await as(REVIEWER, `select public.amend_filing($1, 'Late sales invoice') as id`, [filing["2550Q"]])).rows[0].id as string;
      expect(await statusOf(a)).toBe("not_started");
      await expect(step(PREPARER, a, "prepare", { tax_due: 1200 })).rejects.toThrow(/still open/);
      await lock(remits, "2026-02-01");
      await step(PREPARER, a, "prepare", { tax_due: 1200 });
      await step(REVIEWER, a, "review");
      await step(CLIENT_USER, a, "client_approve");
      await expect(step(OWNER, a, "owner_approve")).rejects.toThrow(/not verified yet/);
      await as(OWNER, `select public.run_billing('2026-04-20', $1)`, [remits]);
      const due = (await db.query(`select id, amount::text from public.client_dues where filing_instance_id = $1`, [a])).rows[0];
      expect(due.amount).toBe("1200.00");
      await as(OWNER, `select public.record_deposit($1, '2026-04-24', 1200, null, null, null, null, $2)`, [remits, [due.id]]);
      await step(OWNER, a, "owner_approve", { dat_files: ["SLS.DAT"] });
      await attach(a, remits, "filed_copy");
      expect(await fileIt(a, { filed_on: "2026-04-25", paid_on: "2026-04-25" })).toMatchObject({ status: "filed" });
      const closings = (await db.query(
        `select r.filing_instance_id as f, r.status, r.amount::text from public.return_book_entries r where r.client_id = $1 and r.kind = 'vat_closing' order by r.created_at`, [remits])).rows;
      expect(closings).toEqual([
        { f: filing["2550Q"], status: "reversed", amount: "1000.00" },
        { f: a, status: "posted", amount: "2200.00" },
      ]);
      expect((await db.query(`select count(*)::int as n from public.journal_entries where client_id = $1 and source = 'vat_closing' and status = 'posted'`, [remits])).rows[0].n).toBe(1);
      expect((await as(REVIEWER, `select count(*)::int as n from public.filings_needing_amendment($1)`, [remits])).rows[0].n).toBe(0);
    });
  });
});
