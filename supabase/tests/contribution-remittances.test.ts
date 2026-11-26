/**
 * SSS, PhilHealth and Pag-IBIG remittances (migrations 20261216000002 and 20261216000003):
 * the posted payroll makes them (EE, ER and EC, per employee) for clients we handle;
 * staff prepare (PRN attached); the Owner approves (the total goes on the statement when
 * the firm remits) and it is recorded remitted with the proof; a client that pays the
 * agency itself gets the payment in its books.
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
const DB_NAME = "contribution_remittances_test";

const OWNER = "00000000-0000-0000-0000-000000000b81";
const STAFF = "00000000-0000-0000-0000-000000000b82";
const OUTSIDER = "00000000-0000-0000-0000-000000000b83";
const CLIENT_USER = "00000000-0000-0000-0000-000000000b84";

describe.skipIf(!url)("contribution remittances", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let alpha: string; // the firm remits
  let beta: string; // pays the agencies itself

  async function as<T = Record<string, unknown>>(user: string | null, sql: string, params: unknown[] = []): Promise<T[]> {
    await db.query("begin");
    if (user) {
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
      await db.query("set local role authenticated");
    }
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r.rows as T[];
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const one = async <T = Record<string, unknown>>(user: string | null, sql: string, params: unknown[] = []) => (await as<T>(user, sql, params))[0];
  const remittance = (client: string, kind: string, month: string) =>
    db.query(`select * from public.contribution_remittances where client_id = $1 and kind = $2 and period_month = $3`, [client, kind, month]).then((r) => r.rows[0]);
  async function attach(r: { id: string; client_id: string }, kind: string) {
    const p = `${r.client_id}/${r.id}/${Math.random().toString(36).slice(2)}.pdf`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('remittance-files', $1)`, [p]);
    return (await one<{ id: string }>(STAFF, `select public.add_remittance_file($1, $2, $3, 'file.pdf', 'application/pdf', 1000) as id`, [r.id, kind, p])).id;
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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, OUTSIDER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Outsider', 'staff')`,
      [OWNER, STAFF, OUTSIDER, brand],
    );
    alpha = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-8001', 'Alpha Trading', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    beta = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-8002', 'Mango Bakery', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $3, 'preparer'), ($2, $3, 'preparer')`, [alpha, beta, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Ana')`, [CLIENT_USER, alpha]);
    // The seed has 2026-12-30 and 2026-12-31 as holidays; 2027-01-01 too. 2027-01-31 is a Sunday.
    await db.query(`insert into public.holidays (date, name, kind) values ('2027-01-01', 'New Year', 'regular') on conflict do nothing`);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("works out each agency's deadline", async () => {
    const due = (kind: string, month: string, num: string, name: string) =>
      db.query(`select private.remittance_statutory_due($1, $2, $3, $4)::text as d`, [kind, month, num, name]).then((r) => r.rows[0].d as string);
    expect(await due("sss", "2026-11-01", "03-1234567-8", "Alpha")).toBe("2026-12-31");
    expect(await due("sss_loan", "2026-12-01", "x", "Alpha")).toBe("2027-01-31");
    expect(await due("philhealth", "2026-11-01", "01-000000012-3", "Alpha")).toBe("2026-12-15");
    expect(await due("philhealth", "2026-11-01", "01-000000012-7", "Alpha")).toBe("2026-12-20");
    expect(await due("pagibig", "2026-11-01", "1", "Alpha Trading")).toBe("2026-12-14");
    expect(await due("pagibig", "2026-11-01", "1", "Golden")).toBe("2026-12-19");
    expect(await due("pagibig_loan", "2026-11-01", "1", "Mango")).toBe("2026-12-24");
    expect(await due("pagibig", "2026-11-01", "1", "Zeta")).toBe("2026-12-31");
    const work = (d: string) => db.query(`select private.remittance_working_day($1)::text as d`, [d]).then((r) => r.rows[0].d as string);
    expect(await work("2027-01-31")).toBe("2027-02-01"); // Sunday
    expect(await work("2026-12-30")).toBe("2027-01-04"); // Dec 30, 31 and Jan 1 are holidays, then a weekend
  });

  /** Posts a payroll run for a client: one employee's lines by category (pesos). */
  async function postRun(client: string, emp: string, periodEnd: string, amounts: Record<string, number>) {
    const items = Object.fromEntries((await db.query(`select bir_category, id from public.payroll_items where client_id = $1 and active`, [client])).rows.map((r) => [r.bir_category, r.id]));
    const month = `${periodEnd.slice(0, 7)}-01`;
    await as(STAFF, `select public.save_payroll_month($1, $2, $3::jsonb)`, [client, month, JSON.stringify([{
      employee_id: emp, pay_period_end: periodEnd,
      lines: Object.entries(amounts).map(([cat, amount]) => ({ item_id: items[cat], amount: String(amount) })),
    }])]);
    return (await one<{ e: string }>(STAFF, `select public.post_payroll($1, $2, $3) as e`, [client, month, periodEnd])).e;
  }
  const RUN = { basic: 15000, sss_ee: 750, sss_er: 1510, sss_ec: 10, phic_ee: 375, phic_er: 375, hdmf_ee: 200, hdmf_er: 200, sss_loan: 1000 };
  let alphaEmp: string;
  let betaEmp: string;

  it("comes from the posted payroll, once the Owner says we handle the client's contributions", async () => {
    for (const [c, code] of [[alpha, "stock_corporation"], [beta, "stock_corporation"]] as const) {
      await as(STAFF, `select public.setup_books($1, $2, '2026-01-01', $3)`, [c, code, JSON.stringify(templatePayload(code))]);
      await as(STAFF, `select public.ensure_payroll_items($1)`, [c]);
      await db.query(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, 'SSS Loan', 'deduction', 'sss_loan')`, [c]);
    }
    expect((await db.query(`select count(*)::int as n from public.payroll_items where client_id = $1 and bir_category = 'sss_ec'`, [alpha])).rows[0].n).toBe(1);
    alphaEmp = (await db.query(`insert into public.employees (client_id, last_name, first_name, sss_no) values ($1, 'Cruz', 'Lea', '34-1234567-8') returning id`, [alpha])).rows[0].id;
    betaEmp = (await db.query(`insert into public.employees (client_id, last_name, first_name) values ($1, 'Reyes', 'Ana') returning id`, [beta])).rows[0].id;
    await postRun(alpha, alphaEmp, "2026-11-15", RUN);
    expect(await db.query(`select id from public.contribution_remittances`).then((r) => r.rowCount)).toBe(0); // not handled yet
    await expect(as(STAFF, `select public.set_handles_contributions($1, true)`, [alpha])).rejects.toThrow(/Owner/);
    await as(OWNER, `select public.set_handles_contributions($1, true)`, [alpha]);
    // The second run of the month adds to the same remittances.
    await postRun(alpha, alphaEmp, "2026-11-30", RUN);
    const rows = (await db.query(`select kind, ee_share::text ee, er_share::text er, ec_share::text ec, total::text, employees, status from public.contribution_remittances where client_id = $1 order by kind`, [alpha])).rows;
    expect(rows).toEqual([
      { kind: "pagibig", ee: "400.00", er: "400.00", ec: "0.00", total: "800.00", employees: 1, status: "not_started" },
      { kind: "philhealth", ee: "750.00", er: "750.00", ec: "0.00", total: "1500.00", employees: 1, status: "not_started" },
      { kind: "sss", ee: "1500.00", er: "3020.00", ec: "20.00", total: "4540.00", employees: 1, status: "not_started" },
      { kind: "sss_loan", ee: "2000.00", er: "0.00", ec: "0.00", total: "2000.00", employees: 1, status: "not_started" },
    ]);
    // EC goes to SSS Payable with the shares.
    const sssPayable = (await db.query(
      `select coalesce(sum(l.credit - l.debit), 0)::text as b from public.journal_lines l join public.journal_entries j on j.id = l.entry_id and j.status = 'posted'
       join public.ledger_accounts a on a.id = l.account_id and a.template_key = 'sss_payable' where l.client_id = $1`, [alpha])).rows[0].b;
    expect(sssPayable).toBe("4540.00");
    // The contribution list per employee, for the agency's site.
    const sss = await remittance(alpha, "sss", "2026-11-01");
    expect(await as(STAFF, `select last_name, agency_no, ee::text, er::text, ec::text, total::text from public.remittance_employees($1)`, [sss.id])).toEqual([
      { last_name: "Cruz", agency_no: "34-1234567-8", ee: "1500.00", er: "3020.00", ec: "20.00", total: "4540.00" },
    ]);
    await expect(as(OUTSIDER, `select * from public.remittance_employees($1)`, [sss.id])).rejects.toThrow(/not found/);
  });

  it("prepares with the PRN attached; a payroll change sends it back for a new PRN", async () => {
    const r = await remittance(alpha, "sss", "2026-11-01");
    await expect(as(STAFF, `select public.prepare_contribution_remittance($1, 'PRN-1')`, [r.id])).rejects.toThrow(/Attach the PRN/);
    await attach(r, "prn");
    await expect(as(STAFF, `select public.prepare_contribution_remittance($1, ' ')`, [r.id])).rejects.toThrow(/PRN/);
    await expect(as(OUTSIDER, `select public.prepare_contribution_remittance($1, 'PRN-1')`, [r.id])).rejects.toThrow(/not found/);
    expect((await one<{ status: string }>(STAFF, `select * from public.prepare_contribution_remittance($1, 'PRN 0312345678')`, [r.id])).status).toBe("prepared");
    expect((await db.query(`select title, body from public.notifications where user_id = $1 and kind = 'remittance_ready_for_approval'`, [OWNER])).rows).toEqual([
      { title: "Alpha Trading: SSS contributions, November 2026 is ready for approval", body: "₱4,540.00 due Jan 4" },
    ]);
    // The second run is reversed: the amount halves and the PRN no longer fits.
    const run2 = (await db.query(`select entry_id from public.payroll_postings where client_id = $1 and period_end = '2026-11-30'`, [alpha])).rows[0].entry_id;
    await as(STAFF, `select public.reverse_journal_entry($1, '2026-11-30', 'Wrong rates')`, [run2]);
    const back = await remittance(alpha, "sss", "2026-11-01");
    expect(back).toMatchObject({ status: "not_started", prn: null, total: "2270.00" });
    expect(back.note).toMatch(/new PRN/);
    // Posted again: the amounts follow.
    await as(STAFF, `select public.post_payroll($1, '2026-11-01', '2026-11-30')`, [alpha]);
    expect((await remittance(alpha, "sss", "2026-11-01")).total).toBe("4540.00");
    await as(STAFF, `select public.prepare_contribution_remittance($1, 'PRN 0312345679')`, [r.id]);
  });

  it("goes on the statement when approved, and is recorded remitted with the proof", async () => {
    const r = await remittance(alpha, "sss", "2026-11-01");
    await expect(as(STAFF, `select public.approve_contribution_remittance($1)`, [r.id])).rejects.toThrow(/Owner/);
    const manual = (await one<{ id: string }>(OWNER, `select public.add_client_charge($1, 'contribution', 'SSS contributions, November 2026', 3000, '2026-12-31', 'sss') as id`, [alpha])).id;
    const a = await one<{ status: string; due_id: string }>(OWNER, `select * from public.approve_contribution_remittance($1)`, [r.id]);
    expect(a).toMatchObject({ status: "approved", due_id: manual });
    expect((await db.query(`select amount::text, contribution from public.client_dues where id = $1`, [manual])).rows[0]).toEqual({ amount: "4540.00", contribution: "sss" });
    // Approved: the payroll no longer moves it.
    expect(await as(CLIENT_USER, `select prn from public.contribution_remittances`)).toEqual([{ prn: "PRN 0312345679" }]);
    expect((await as<{ kind: string }>(CLIENT_USER, `select kind from public.contribution_remittance_files`)).map((f) => f.kind)).toEqual(["prn"]);

    await expect(as(OWNER, `select public.remit_contribution_remittance($1, '2026-11-25', 'OR 1')`, [r.id])).rejects.toThrow(/proof of payment/);
    await attach(r, "proof");
    await expect(as(STAFF, `select public.remit_contribution_remittance($1, '2026-11-25', 'OR 1')`, [r.id])).rejects.toThrow(/Owner/);
    const done = await one<{ status: string }>(OWNER, `select * from public.remit_contribution_remittance($1, '2026-11-25', 'SSS OR 998877')`, [r.id]);
    expect(done.status).toBe("remitted");
    expect((await db.query(`select remitted_on::text, remit_reference from public.client_dues where id = $1`, [manual])).rows[0]).toEqual({ remitted_on: "2026-11-25", remit_reference: "SSS OR 998877" });
    // Firm-remits: the books take the payment when the client's payment to us is verified, not here.
    expect(await db.query(`select id from public.return_book_entries where remittance_id = $1`, [r.id]).then((x) => x.rowCount)).toBe(0);
    expect((await db.query(`select title from public.notifications where user_id = $1 and kind = 'remittance_remitted'`, [CLIENT_USER])).rows).toEqual([{ title: "SSS contributions, November 2026 was paid" }]);
  });

  it("books the payment of a client that pays the agency itself: Dr SSS Payable, Cr Cash; stepping back reverses it", async () => {
    await as(OWNER, `select public.set_handles_contributions($1, true)`, [beta]);
    await postRun(beta, betaEmp, "2026-11-30", { basic: 12000, sss_ee: 600, sss_er: 1210, sss_ec: 10 });
    const r = await remittance(beta, "sss", "2026-11-01");
    expect(r.total).toBe("1820.00");
    expect(await remittance(beta, "philhealth", "2026-11-01")).toBeUndefined();
    await attach(r, "prn");
    await as(STAFF, `select public.prepare_contribution_remittance($1, 'PRN-B')`, [r.id]);
    expect((await one<{ due_id: string | null }>(OWNER, `select * from public.approve_contribution_remittance($1)`, [r.id])).due_id).toBeNull();
    await attach(r, "proof");
    expect((await one<{ status: string }>(STAFF, `select * from public.remit_contribution_remittance($1, '2026-11-26', 'BDO 55')`, [r.id])).status).toBe("remitted");
    const be = (await db.query(`select status, entry_id, note from public.return_book_entries where remittance_id = $1`, [r.id])).rows[0];
    expect(be).toMatchObject({ status: "posted" });
    const lines = (await db.query(
      `select a.template_key, a.control, l.debit::text, l.credit::text, j.book from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id join public.journal_entries j on j.id = l.entry_id where l.entry_id = $1 order by l.debit desc`, [be.entry_id])).rows;
    expect(lines).toEqual([
      { template_key: "sss_payable", control: null, debit: "1820.00", credit: "0.00", book: "cash_disbursements" },
      expect.objectContaining({ debit: "0.00", credit: "1820.00", book: "cash_disbursements" }),
    ]);
    await as(OWNER, `select public.reopen_contribution_remittance($1)`, [r.id]);
    expect((await db.query(`select status from public.return_book_entries where remittance_id = $1`, [r.id])).rows[0].status).toBe("reversed");
    expect((await db.query(`select status from public.journal_entries where id = $1`, [be.entry_id])).rows[0].status).toBe("reversed");
  });

  it("marks a month not required, and refreshes from the payroll for the nightly job", async () => {
    const loan = await remittance(alpha, "sss_loan", "2026-11-01");
    await expect(as(STAFF, `select public.skip_contribution_remittance($1, ' ')`, [loan.id])).rejects.toThrow(/Say why/);
    expect((await one<{ status: string }>(STAFF, `select * from public.skip_contribution_remittance($1, 'Paid by the employee directly')`, [loan.id])).status).toBe("not_required");
    await expect(as(CLIENT_USER, `select public.generate_contribution_remittances('2026-11-26')`)).rejects.toThrow(/Only staff/);
    expect((await one<{ n: number }>(null, `select public.generate_contribution_remittances('2026-11-26') as n`)).n).toBe(5);
    expect((await remittance(alpha, "sss_loan", "2026-11-01")).status).toBe("not_required"); // same amounts: left as it is
  });

  it("moves the deadlines of open months when an employer number changes", async () => {
    await as(STAFF, `select public.set_employer_number($1, 'philhealth', '01-000000012-7', '2026-09-01')`, [alpha]);
    expect((await db.query(`select due_date::text from public.contribution_remittances where client_id = $1 and kind = 'philhealth'`, [alpha])).rows[0].due_date).toBe("2026-12-21");
    await as(STAFF, `select public.set_employer_number($1, 'philhealth', '01-000000012-3', '2026-09-01')`, [alpha]);
    expect((await db.query(`select due_date::text from public.contribution_remittances where client_id = $1 and kind = 'philhealth'`, [alpha])).rows[0].due_date).toBe("2026-12-15");
  });
});
