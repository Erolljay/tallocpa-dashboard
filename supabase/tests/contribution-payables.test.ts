/**
 * Contributions and loans to their own payables (migration
 * 20261212000004_contribution_payables.sql) on books set up before it: the five
 * payables join the chart beside the combined ones, and deductions named as an SSS or a
 * Pag-IBIG loan move to their loan categories even when already used on the payroll.
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
const DB_NAME = "contribution_payables_test";
const STAFF = "00000000-0000-0000-0000-0000000000c7";
const MIGRATION = "20261212000004_contribution_payables.sql";

describe.skipIf(!url)("contribution payables on books set up before", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
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

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    const files = readdirSync(path.join(root, "migrations")).sort();
    const before = files.filter((f) => f < MIGRATION);
    for (const f of before) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(read("seed.sql"));
    await db.query(`insert into auth.users (id) values ($1)`, [STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $2, 'Staff', 'staff')`, [STAFF, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9971', 'Lapaz Bakery', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    // The chart as the template made it before: the combined 2060 and 2065.
    const old = templatePayload("sole_proprietorship").filter((a) => !/^20(61|62|63|66|67)$/.test(a.code));
    const at = old.findIndex((a) => a.key === "wtc_payable") + 1;
    old.splice(at, 0,
      { ...old[at - 1], key: "government_contributions_payable", code: "2060", name: "SSS, PhilHealth and Pag-IBIG Payable", sort_order: old[at - 1].sort_order + 3 },
      { ...old[at - 1], key: "government_loans_payable", code: "2065", name: "SSS and Pag-IBIG Loans Payable", sort_order: old[at - 1].sort_order + 6 });
    await as(`select public.setup_books($1, 'sole_proprietorship', '2027-01-01', $2)`, [client, JSON.stringify(old)]);
    await as(`select public.ensure_payroll_items($1)`, [client]);
    for (const [name, cat] of [["SSS Loan", "none"], ["HDMF Calamity Loan", "none"], ["Company Loan", "none"], ["SSS/Pag-IBIG Loans", "none"]]) {
      item[name] = (await db.query(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, $2, 'deduction', $3) returning id`, [client, name, cat])).rows[0].id;
    }
    for (const r of (await db.query(`select id, bir_category from public.payroll_items where client_id = $1 and kind = 'earning' and bir_category = 'basic'`, [client])).rows) item.basic = r.id;
    const emp = (await db.query(`insert into public.employees (client_id, last_name, first_name) values ($1, 'Cruz', 'Lea') returning id`, [client])).rows[0].id;
    await as(`select public.save_payroll_month($1, '2027-01-01', $2::jsonb)`, [client, JSON.stringify([{
      employee_id: emp, pay_period_end: "2027-01-31",
      lines: [{ item_id: item.basic, amount: "9000" }, { item_id: item["SSS Loan"], amount: "500" }, { item_id: item["HDMF Calamity Loan"], amount: "300" }],
    }])]);
    for (const f of files.filter((x) => x >= MIGRATION)) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("adds the five payables beside the combined accounts, which stay", async () => {
    const rows = (await db.query(
      `select template_key, code, name, type, normal_side, fs_line, active from public.ledger_accounts where client_id = $1 and code between '2055' and '2070' order by sort_order, code`, [client])).rows;
    expect(rows.map((r) => [r.template_key, r.code, r.name])).toEqual([
      ["wtc_payable", "2055", "Withholding Tax Payable - Compensation"],
      ["government_contributions_payable", "2060", "SSS, PhilHealth and Pag-IBIG Payable"],
      ["sss_payable", "2061", "SSS Payable"],
      ["philhealth_payable", "2062", "PhilHealth Payable"],
      ["pagibig_payable", "2063", "Pag-IBIG Payable"],
      ["government_loans_payable", "2065", "SSS and Pag-IBIG Loans Payable"],
      ["sss_loans_payable", "2066", "SSS Loans Payable"],
      ["pagibig_loans_payable", "2067", "Pag-IBIG Loans Payable"],
      ["income_tax_payable", "2070", "Income Tax Payable"],
    ]);
    expect(rows.filter((r) => /^20(6[0-7])/.test(r.code)).every((r) => r.type === "liability" && r.normal_side === "credit" && r.fs_line === "accrued_liabilities" && r.active)).toBe(true);
  });

  it("moves deductions named as one agency's loan to its loan category, even when used on the payroll", async () => {
    const cats = Object.fromEntries((await db.query(`select name, bir_category from public.payroll_items where client_id = $1 and kind = 'deduction'`, [client])).rows.map((r) => [r.name, r.bir_category]));
    expect(cats).toMatchObject({ "SSS Loan": "sss_loan", "HDMF Calamity Loan": "hdmf_loan", "Company Loan": "none", "SSS/Pag-IBIG Loans": "none" });
    const r = (await as(`select public.payroll_run($1, '2027-01-01', '2027-01-31') as r`, [client])).rows[0].r;
    expect(r.dues).toMatchObject({ sss_loan: 500, hdmf_loan: 300 });
    const names = r.lines.filter((l: { credit: number }) => l.credit > 0).map((l: { name: string; credit: number }) => [l.name, l.credit]);
    expect(names).toEqual(expect.arrayContaining([["SSS Loans Payable", 500], ["Pag-IBIG Loans Payable", 300]]));
  });
});
