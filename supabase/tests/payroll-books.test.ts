/**
 * Payroll to the books (migration 20261125000010_payroll_books.sql): payroll runs per
 * pay period that do not replace each other, a run's totals and dues to SSS,
 * PhilHealth and Pag-IBIG, and its entry — each employee's pay account, the direct
 * contributions account for cost-of-services staff, net pay to Cash.
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
const DB_NAME = "payroll_books_test";
const STAFF = "00000000-0000-0000-0000-0000000000b1";

describe.skipIf(!url)("payroll to the books", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let office: string;
  let crew: string;
  const item: Record<string, string> = {};

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
  const acct = async (k: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and template_key = $2`, [client, k])).rows[0].id as string;
  const pay = (employee: string, period: string | null, amounts: Record<string, string>) => ({
    employee_id: employee, pay_period_end: period, lines: Object.entries(amounts).map(([cat, amount]) => ({ item_id: item[cat], amount })),
  });
  const save = (entries: unknown[]) => as(`select public.save_payroll_month($1, '2027-03-01', $2::jsonb)`, [client, JSON.stringify(entries)]);
  const run = async (period: string | null) => (await as(`select public.payroll_run($1, '2027-03-01', $2) as r`, [client, period])).rows[0].r;

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
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9961', 'Jaro Agri Supply', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await as(`select public.setup_books($1, 'sole_proprietorship', '2027-01-01', $2)`, [client, JSON.stringify(templatePayload("sole_proprietorship"))]);
    await as(`select public.ensure_payroll_items($1)`, [client]);
    for (const r of (await db.query(`select id, bir_category from public.payroll_items where client_id = $1`, [client])).rows) item[r.bir_category] = r.id;
    office = (await db.query(`insert into public.employees (client_id, last_name, first_name) values ($1, 'Santos', 'Ana') returning id`, [client])).rows[0].id;
    crew = (await db.query(`insert into public.employees (client_id, last_name, first_name, pay_account_id) values ($1, 'Reyes', 'Ben', $2) returning id`, [client, await acct("direct_labor")])).rows[0].id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("keeps the 15th and the 30th payroll side by side; a later upload replaces only its own period", async () => {
    await save([pay(office, "2027-03-15", { basic: "10000", withholding_tax: "500", sss_ee: "450", sss_er: "950" })]);
    await save([pay(office, "2027-03-31", { basic: "10000", withholding_tax: "500" }), pay(crew, "2027-03-31", { basic: "8000", sss_ee: "360", phic_ee: "200", hdmf_ee: "100", sss_er: "760", phic_er: "200", hdmf_er: "100" })]);
    await save([pay(office, "2027-03-31", { basic: "11000", withholding_tax: "600" })]);
    const rows = (await db.query(`select employee_id = $2 as office, pay_period_end::text from public.payroll_entries where client_id = $1 order by pay_period_end, office`, [client, office])).rows;
    expect(rows).toEqual([{ office: true, pay_period_end: "2027-03-15" }, { office: false, pay_period_end: "2027-03-31" }, { office: true, pay_period_end: "2027-03-31" }]);
  });

  it("totals a run and its dues to SSS, PhilHealth and Pag-IBIG", async () => {
    const r = await run("2027-03-31");
    expect(r).toMatchObject({ employees: 2, gross: 19000, tax_withheld: 600, employer: 1060, problems: [] });
    expect(r.dues).toEqual({ sss: { ee: 360, er: 760 }, phic: { ee: 200, er: 200 }, hdmf: { ee: 100, er: 100 }, sss_loan: 0, hdmf_loan: 0 });
    expect(r.net).toBe(19000 - 600 - 660);
  });

  it("posts the run: each employee's pay account, direct contributions for cost-of-services staff, net pay to Cash", async () => {
    const e = (await as(`select public.post_payroll($1, '2027-03-01', '2027-03-31') as id`, [client])).rows[0].id;
    const lines = (await db.query(
      `select a.template_key as acct, l.debit, l.credit from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by a.template_key`, [e],
    )).rows;
    expect(lines).toEqual([
      { acct: "cash_on_hand", debit: "0.00", credit: "17740.00" },
      { acct: "contributions_direct", debit: "1060.00", credit: "0.00" },
      { acct: "direct_labor", debit: "8000.00", credit: "0.00" },
      { acct: "pagibig_payable", debit: "0.00", credit: "200.00" },
      { acct: "philhealth_payable", debit: "0.00", credit: "400.00" },
      { acct: "salaries", debit: "11000.00", credit: "0.00" },
      { acct: "sss_payable", debit: "0.00", credit: "1120.00" },
      { acct: "wtc_payable", debit: "0.00", credit: "600.00" },
    ]);
    expect((await db.query(`select status, entry_date::text, book from public.journal_entries where id = $1`, [e])).rows[0]).toEqual({ status: "posted", entry_date: "2027-03-31", book: "cash_disbursements" });
    await expect(as(`select public.post_payroll($1, '2027-03-01', '2027-03-31')`, [client])).rejects.toThrow(/already in the books/);
  });

  it("posts the 15th separately, with the operating contributions account, and the books tie to the payroll (T-6, T-7)", async () => {
    await as(`select public.post_payroll($1, '2027-03-01', '2027-03-15')`, [client]);
    expect(Number((await db.query(`select sum(l.debit) as d from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where a.template_key = 'government_contributions' and l.client_id = $1`, [client])).rows[0].d)).toBe(950);
    const j = (await as(`select public.workpaper_ledger($1, '2027-03-01', '2027-03-31') as j`, [client])).rows[0].j;
    expect(Number(j.compensation)).toBe(10000 + 11000 + 8000);
    expect(Number(j.wtc_payable)).toBe(500 + 600);
  });

  it("credits each agency's shares and SSS and Pag-IBIG loan payments to their own payables; payslips show the loans apart", async () => {
    const add = async (name: string, cat: string) =>
      (await db.query(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, $2, 'deduction', $3) returning id`, [client, name, cat])).rows[0].id as string;
    item.sss_loan = await add("SSS Salary Loan", "none"); // entered before loans had their own category
    item.hdmf_loan = await add("Pag-IBIG MPL", "hdmf_loan");
    item.none = await add("Cash Advance", "none");
    await save([pay(crew, "2027-03-20", {
      basic: "5000", sss_ee: "100", phic_ee: "50", hdmf_ee: "40", sss_loan: "700", hdmf_loan: "300", none: "200", sss_er: "200", phic_er: "50", hdmf_er: "40",
    })]);
    // A used deduction moves between 'none' and the loan categories (no BIR figure changes), never to a BIR figure.
    await as(`update public.payroll_items set bir_category = 'sss_loan' where id = $1`, [item.sss_loan]);
    await expect(as(`update public.payroll_items set bir_category = 'sss_ee' where id = $1`, [item.sss_loan])).rejects.toThrow(/cannot change/);
    const r = await run("2027-03-20");
    expect(r.dues).toEqual({ sss: { ee: 100, er: 200 }, phic: { ee: 50, er: 50 }, hdmf: { ee: 40, er: 40 }, sss_loan: 700, hdmf_loan: 300 });
    const e = (await as(`select public.post_payroll($1, '2027-03-01', '2027-03-20') as id`, [client])).rows[0].id;
    const lines = (await db.query(
      `select a.template_key as acct, l.debit, l.credit from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id where l.entry_id = $1 order by a.template_key`, [e],
    )).rows;
    expect(lines).toEqual([
      { acct: "cash_on_hand", debit: "0.00", credit: "3610.00" },
      { acct: "contributions_direct", debit: "290.00", credit: "0.00" },
      { acct: "direct_labor", debit: "5000.00", credit: "0.00" },
      { acct: "other_payables", debit: "0.00", credit: "200.00" },
      { acct: "pagibig_loans_payable", debit: "0.00", credit: "300.00" },
      { acct: "pagibig_payable", debit: "0.00", credit: "80.00" },
      { acct: "philhealth_payable", debit: "0.00", credit: "100.00" },
      { acct: "sss_loans_payable", debit: "0.00", credit: "700.00" },
      { acct: "sss_payable", debit: "0.00", credit: "300.00" },
    ]);
    const slip = (await as(`select sss, philhealth, pagibig, deductions, sss_loan, pagibig_loan, other_deductions, net from public.payslips($1, '2027-03-01') where pay_period_end = '2027-03-20'`, [client])).rows;
    expect(slip).toEqual([{ sss: "100.00", philhealth: "50.00", pagibig: "40.00", deductions: "190.00", sss_loan: "700.00", pagibig_loan: "300.00", other_deductions: "200.00", net: "3610.00" }]);
  });

  it("will not post a merged whole-month run on top of the month's runs already in the books", async () => {
    // Editing the grid grosses the month up into one entry per employee (as taxify).
    await save([pay(office, null, { basic: "21000", withholding_tax: "1100", sss_ee: "450", sss_er: "950" })]);
    expect((await run(null)).gross).toBe(21000 + 8000 - 8000);
    await expect(as(`select public.post_payroll($1, '2027-03-01', null)`, [client])).rejects.toThrow(/already in the books; reverse them first/);
  });
});
