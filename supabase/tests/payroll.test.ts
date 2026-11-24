/**
 * Payroll database tests (migration 20261123000017_payroll.sql): who may read and
 * change employees and payroll, the lock once a month's 1601-C is filed, saving a
 * month in one step, and client users' payroll submissions.
 *
 * Runs in its own database so it can run alongside db.test.ts. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "payroll_test";

const OWNER = "00000000-0000-0000-0000-000000000021";
const STAFF = "00000000-0000-0000-0000-000000000022";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000023";
const CLIENT_USER = "00000000-0000-0000-0000-000000000024";

describe.skipIf(!url)("payroll database", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let clientA: string;
  let clientB: string;
  let juan: string;

  /** Runs `fn` signed in as `user` inside a transaction that is rolled back. */
  async function as<T>(user: string, fn: () => Promise<T>): Promise<T> {
    await db.query("begin");
    try {
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
      await db.query("set local role authenticated");
      return await fn();
    } finally {
      await db.query("rollback");
    }
  }

  async function fails(sql: string, params: unknown[], pattern: RegExp) {
    await db.query("savepoint s");
    await expect(db.query(sql, params)).rejects.toThrow(pattern);
    await db.query("rollback to savepoint s");
  }

  let items: Record<string, string> = {};
  /** One employee's month: basic pay, overtime and withholding tax lines. */
  const entry = (employeeId: string, over: { basic?: string; overtime?: string; tax?: string } = {}) =>
    JSON.stringify([
      {
        employee_id: employeeId, taxable_compensation: "27700", adjustment: "0", note: null,
        lines: [
          { item_id: items["Basic Pay"], amount: over.basic ?? "30000.00" },
          { item_id: items["Overtime Pay"], amount: over.overtime ?? "0" },
          { item_id: items["Withholding Tax"], amount: over.tax ?? "1035.00" },
        ],
      },
    ]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, OTHER_STAFF, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, STAFF, OTHER_STAFF, brand],
    );
    const ins = `insert into public.clients (brand_id, code, name, taxpayer_type, submission_cutoff_day) values ($1, $2, $3, 'corporation', 5) returning id`;
    clientA = (await db.query(ins, [brand, "TC-9201", "Client A"])).rows[0].id;
    clientB = (await db.query(ins, [brand, "TC-9202", "Client B"])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($3, $4, 'preparer')`, [clientA, STAFF, clientB, OTHER_STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client A owner')`, [CLIENT_USER, clientA]);
    await db.query(`select set_config('request.jwt.claim.sub', $1, false)`, [OWNER]);
    await db.query(`select public.ensure_payroll_items($1)`, [clientA]);
    await db.query(`select set_config('request.jwt.claim.sub', '', false)`);
    items = Object.fromEntries((await db.query(`select name, id from public.payroll_items where client_id = $1`, [clientA])).rows.map((r) => [r.name, r.id]));
    juan = (
      await db.query(`insert into public.employees (client_id, employee_no, last_name, first_name, tin) values ($1, '001', 'Dela Cruz', 'Juan', '111-222-333') returning id`, [clientA])
    ).rows[0].id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("assigned staff and the Owner see and add employees; others and client users do not", async () => {
    await as(STAFF, async () => {
      expect((await db.query(`select employee_no from public.employees`)).rows).toEqual([{ employee_no: "001" }]);
      await db.query(`insert into public.employees (client_id, last_name, first_name) values ($1, 'Abad', 'Ana')`, [clientA]);
      await fails(`insert into public.employees (client_id, last_name, first_name) values ($1, 'X', 'Y')`, [clientB], /row-level security/);
      // No delete policy: employees are kept (retention); separate or deactivate them instead.
      expect((await db.query(`delete from public.employees where id = $1`, [juan])).rowCount).toBe(0);
    });
    await as(OTHER_STAFF, async () => {
      expect((await db.query(`select id from public.employees`)).rows).toEqual([]);
    });
    await as(CLIENT_USER, async () => {
      expect((await db.query(`select id from public.employees`)).rows).toEqual([]);
      await fails(`insert into public.employees (client_id, last_name, first_name) values ($1, 'X', 'Y')`, [clientA], /row-level security/);
      // …but can list their own client's roster (numbers and names, no pay) to fill in the register.
      expect((await db.query(`select employee_no, last_name, tin from public.payroll_roster($1)`, [clientA])).rows).toEqual([{ employee_no: "001", last_name: "Dela Cruz", tin: "111-222-333" }]);
      await fails(`select * from public.payroll_roster($1)`, [clientB], /cannot see this client/);
    });
    await as(OWNER, async () => {
      expect((await db.query(`select count(*)::int as n from public.employees`)).rows[0].n).toBe(1);
    });
  });

  it("keeps employees unique by TIN and number within a client, and checks MWE details", async () => {
    await as(OWNER, async () => {
      await fails(`insert into public.employees (client_id, last_name, first_name, tin) values ($1, 'X', 'Y', '111-222-333')`, [clientA], /employees_client_tin_key/);
      await fails(`insert into public.employees (client_id, employee_no, last_name, first_name) values ($1, '001', 'X', 'Y')`, [clientA], /employees_client_id_employee_no_key/);
      await fails(`insert into public.employees (client_id, last_name, first_name, is_mwe) values ($1, 'X', 'Y', true)`, [clientA], /check constraint/);
      await fails(`insert into public.employees (client_id, last_name, first_name, separation_date) values ($1, 'X', 'Y', '2026-01-31')`, [clientA], /check constraint/);
      // The same TIN at another client is fine.
      await db.query(`insert into public.employees (client_id, last_name, first_name, tin) values ($1, 'X', 'Y', '111-222-333')`, [clientB]);
    });
  });

  it("saves a month in one step; client users cannot read or write payroll", async () => {
    await as(STAFF, async () => {
      expect((await db.query(`select public.save_payroll_month($1, '2026-01-01', $2::jsonb) as n`, [clientA, entry(juan)])).rows[0].n).toBe(1);
      // Saving again replaces the employee's month; zero lines are not stored.
      expect((await db.query(`select public.save_payroll_month($1, '2026-01-01', $2::jsonb) as n`, [clientA, entry(juan, { overtime: "500" })])).rows[0].n).toBe(1);
      const lines = async () =>
        (await db.query(`select i.name, l.amount from public.payroll_entry_lines l join public.payroll_items i on i.id = l.item_id order by i.name`)).rows;
      expect(await lines()).toEqual([
        { name: "Basic Pay", amount: "30000.00" },
        { name: "Overtime Pay", amount: "500.00" },
        { name: "Withholding Tax", amount: "1035.00" },
      ]);
      expect((await db.query(`select count(*)::int as n from public.payroll_entries`)).rows[0].n).toBe(1);
      // An employee listed with nothing clears the month.
      await db.query(`select public.save_payroll_month($1, '2026-01-01', $2::jsonb)`, [clientA, JSON.stringify([{ employee_id: juan, lines: [] }])]);
      expect((await db.query(`select count(*)::int as n from public.payroll_entries`)).rows[0].n).toBe(0);
      await fails(`select public.save_payroll_month($1, '2026-01-15', $2::jsonb)`, [clientA, entry(juan)], /check constraint/);
      // Another client's item cannot be used.
      const foreign = JSON.stringify([{ employee_id: juan, lines: [{ item_id: "00000000-0000-0000-0000-0000000000aa", amount: "1" }] }]);
      await fails(`select public.save_payroll_month($1, '2026-01-01', $2::jsonb)`, [clientA, foreign], /foreign key/);
      // An employee of client A cannot be booked under client B.
      await fails(`select public.save_payroll_month($1, '2026-01-01', $2::jsonb)`, [clientB, entry(juan)], /Only the Owner and staff assigned/);
    });
    await as(OWNER, async () => {
      await fails(`insert into public.payroll_entries (client_id, employee_id, pay_month) values ($1, $2, '2026-01-01')`, [clientB, juan], /foreign key/);
    });
    await as(CLIENT_USER, async () => {
      await fails(`select public.save_payroll_month($1, '2026-01-01', $2::jsonb)`, [clientA, entry(juan)], /Only the Owner and staff assigned/);
      expect((await db.query(`select id from public.payroll_entries`)).rows).toEqual([]);
    });
  });

  it("locks a month once its 1601-C is filed", async () => {
    await db.query("begin");
    try {
      await db.query(`select set_config('request.jwt.claim.sub', $1, true)`, [OWNER]);
      await db.query(`select public.save_payroll_month($1, '2026-02-01', $2::jsonb)`, [clientA, entry(juan)]);
      const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601-C', 'monthly', '2026-01-01') returning id`, [clientA])).rows[0].id;
      const filing = (
        await db.query(
          `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
           values ($1, $2, '1601-C', '2026-02', '2026-02-01', '2026-02-28', '1601C', '2026-03-10', '2026-03-10', 'reviewed') returning id`,
          [ob, clientA],
        )
      ).rows[0].id;
      await db.query("set local role authenticated");
      // Reviewed but not filed: still editable.
      await db.query(`select public.save_payroll_month($1, '2026-02-01', $2::jsonb)`, [clientA, entry(juan, { overtime: "1" })]);
      await db.query("reset role");
      await db.query(`update public.filing_instances set status = 'filed' where id = $1`, [filing]);
      await db.query("set local role authenticated");
      await fails(`select public.save_payroll_month($1, '2026-02-01', $2::jsonb)`, [clientA, entry(juan, { overtime: "2" })], /already filed: its payroll is locked/);
      await fails(`delete from public.payroll_entries where pay_month = '2026-02-01'`, [], /already filed/);
      await fails(`update public.payroll_entry_lines set amount = 1 where entry_id in (select id from public.payroll_entries where pay_month = '2026-02-01')`, [], /already filed/);
      // Other months stay open.
      await db.query(`select public.save_payroll_month($1, '2026-03-01', $2::jsonb)`, [clientA, entry(juan)]);
    } finally {
      await db.query("rollback");
    }
  });

  it("client users send payroll registers for their client; staff post or return them", async () => {
    await db.query("begin");
    try {
      await db.query("set local role authenticated");
      await db.query(`select set_config('request.jwt.claim.sub', $1, true)`, [CLIENT_USER]);
      const rows = JSON.stringify([{ line: 3, employeeNo: "001", name: "Dela Cruz, Juan", tin: "", payDate: "", amounts: { x: "30000" }, totals: { gross: null, deductions: null, net: null } }]);
      const sub = (
        await db.query(
          `insert into public.payroll_submissions (client_id, pay_month, file_name, storage_path, rows, status, late) values ($1::uuid, '2020-01-01', 'jan.xlsx', $1::text || '/2020-01/a.xlsx', $2::jsonb, 'posted', false)
           returning id, status, late, submitted_by, row_count`,
          [clientA, rows],
        )
      ).rows[0];
      // The server decides status and lateness: sent long after the 5 February 2020 cutoff.
      expect(sub).toMatchObject({ status: "pending", late: true, submitted_by: CLIENT_USER, row_count: 1 });
      await fails(`insert into public.payroll_submissions (client_id, pay_month, file_name, storage_path, rows) values ($1, '2020-01-01', 'x.xlsx', 'x/y.xlsx', '[]')`, [clientB], /row-level security/);
      await fails(`insert into public.payroll_submissions (client_id, pay_month, file_name, storage_path, rows, submitted_by) values ($1, '2020-01-01', 'x.xlsx', 'x/z.xlsx', '[]', $2)`, [clientA, STAFF], /row-level security/);
      // The client cannot mark it posted or change it.
      expect((await db.query(`update public.payroll_submissions set status = 'posted' where id = $1 returning id`, [sub.id])).rows).toEqual([]);
      expect((await db.query(`select status from public.payroll_submissions`)).rows).toEqual([{ status: "pending" }]);
      // Storage: own client's folder only.
      await db.query(`insert into storage.objects (bucket_id, name) values ('payroll', $1::text || '/2020-01/a.xlsx')`, [clientA]);
      await fails(`insert into storage.objects (bucket_id, name) values ('payroll', $1::text || '/2020-01/b.xlsx')`, [clientB], /row-level security/);

      // Other staff do not see it; assigned staff do, and post it.
      await db.query(`select set_config('request.jwt.claim.sub', $1, true)`, [OTHER_STAFF]);
      expect((await db.query(`select id from public.payroll_submissions`)).rows).toEqual([]);
      await db.query(`select set_config('request.jwt.claim.sub', $1, true)`, [STAFF]);
      await fails(`update public.payroll_submissions set rows = '[]' where id = $1`, [sub.id], /cannot be changed/);
      await db.query(`select public.save_payroll_month($1, '2020-01-01', $2::jsonb, $3)`, [clientA, entry(juan), sub.id]);
      const posted = (await db.query(`select status, reviewed_by from public.payroll_submissions where id = $1`, [sub.id])).rows[0];
      expect(posted).toEqual({ status: "posted", reviewed_by: STAFF });
      await fails(`update public.payroll_submissions set status = 'returned', return_reason = 'x' where id = $1`, [sub.id], /already posted/);
      await fails(`select public.save_payroll_month($1, '2020-02-01', $2::jsonb, $3)`, [clientA, entry(juan), sub.id], /not found for this client and month/);

      // A second register is returned with a reason; the client sees why.
      await db.query(`select set_config('request.jwt.claim.sub', $1, true)`, [CLIENT_USER]);
      const second = (await db.query(`insert into public.payroll_submissions (client_id, pay_month, file_name, storage_path, rows) values ($1, '2020-02-01', 'feb.xlsx', 'p/feb.xlsx', '[]') returning id`, [clientA])).rows[0].id;
      await db.query(`select set_config('request.jwt.claim.sub', $1, true)`, [STAFF]);
      await fails(`update public.payroll_submissions set status = 'returned' where id = $1`, [second], /check constraint/);
      await db.query(`update public.payroll_submissions set status = 'returned', return_reason = 'February is missing Ana' where id = $1`, [second]);
      await db.query(`select set_config('request.jwt.claim.sub', $1, true)`, [CLIENT_USER]);
      expect((await db.query(`select status, return_reason from public.payroll_submissions where id = $1`, [second])).rows).toEqual([{ status: "returned", return_reason: "February is missing Ana" }]);
    } finally {
      await db.query("rollback");
    }
  });

  it("payslip items: defaults once, readable by client users, category fixed once used", async () => {
    await as(STAFF, async () => {
      expect((await db.query(`select public.ensure_payroll_items($1) as n`, [clientA])).rows[0].n).toBe(0);
      expect((await db.query(`select count(*)::int as n from public.payroll_items`)).rows[0].n).toBe(13);
      await fails(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, 'basic pay', 'earning', 'basic')`, [clientA], /payroll_items_client_name_key/);
      await fails(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, 'Loan', 'earning', 'none')`, [clientA], /check constraint/);
      await db.query(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, 'Cash Advance', 'deduction', 'none')`, [clientA]);
      await fails(`insert into public.payroll_items (client_id, name, kind, bir_category) values ($1, 'X', 'deduction', 'none')`, [clientB], /row-level security/);
      // Unused: may change category or be deleted. Used: neither.
      await db.query(`update public.payroll_items set bir_category = 'other_taxable' where id = $1`, [items["Holiday Pay"]]);
      await db.query(`select public.save_payroll_month($1, '2026-05-01', $2::jsonb)`, [clientA, entry(juan)]);
      await fails(`update public.payroll_items set bir_category = 'commission' where id = $1`, [items["Basic Pay"]], /already used on the payroll/);
      await fails(`delete from public.payroll_items where id = $1`, [items["Basic Pay"]], /foreign key/);
      await db.query(`update public.payroll_items set active = false, name = 'Basic Salary' where id = $1`, [items["Basic Pay"]]);
      expect((await db.query(`delete from public.payroll_items where id = $1 returning id`, [items["Night Differential"]])).rows).toHaveLength(1);
    });
    await as(CLIENT_USER, async () => {
      expect((await db.query(`select count(*)::int as n from public.payroll_items`)).rows[0].n).toBe(13);
      expect((await db.query(`update public.payroll_items set name = 'X' returning id`)).rows).toEqual([]);
      expect((await db.query(`select id from public.payroll_entry_lines`)).rows).toEqual([]);
    });
    await as(CLIENT_USER, async () => {
      await fails(`select public.ensure_payroll_items($1)`, [clientA], /Only the Owner and staff/);
    });
  });

  it("BIR 2316: previous employers, signatory and release to the client's portal (migration 20261123000018)", async () => {
    await db.query("begin");
    try {
      await db.query("set local role authenticated");
      const asUser = (u: string) => db.query(`select set_config('request.jwt.claim.sub', $1, true)`, [u]);
      await asUser(STAFF);
      await db.query(`select public.save_payroll_month($1, '2025-03-01', $2::jsonb)`, [clientA, entry(juan)]);
      // Previous employer: one per employee and year, same access as employees.
      await db.query(
        `insert into public.employee_prior_employers (client_id, employee_id, year, tin, name, taxable_compensation, non_taxable_compensation, tax_withheld)
         values ($1, $2, 2025, '999-888-777-00000', 'Old Employer Corp.', 200000, 30000, 8000)`,
        [clientA, juan],
      );
      await fails(`insert into public.employee_prior_employers (client_id, employee_id, year, name) values ($1, $2, 2025, 'Again')`, [clientA, juan], /employee_prior_employers_employee_id_year_key/);
      await fails(`insert into public.employee_prior_employers (client_id, employee_id, year, name) values ($1, $2, 2024, 'Wrong client')`, [clientB, juan], /row-level security|foreign key/);
      await fails(`insert into public.employee_prior_employers (client_id, employee_id, year, name, tax_withheld) values ($1, $2, 2024, 'X', -1)`, [clientA, juan], /check constraint/);
      await fails(`update public.employees set mwe_monthly_rate = 0 where id = $1`, [juan], /check constraint/);
      // Signatory, per client.
      await db.query(`insert into public.payroll_settings (client_id, employer_zip_code, signatory_name, signatory_title) values ($1, '5000', 'Ana Reyes', 'HR Manager')`, [clientA]);
      expect((await db.query(`select updated_by from public.payroll_settings where client_id = $1`, [clientA])).rows[0].updated_by).toBe(STAFF);
      await fails(`insert into public.payroll_settings (client_id, employer_zip_code) values ($1, '50000')`, [clientB], /row-level security|check constraint/);

      // Staff read the data for the certificates at any time.
      const data = (await db.query(`select public.payroll_2316_data($1, 2025) as d`, [clientA])).rows[0].d;
      expect(data.client.name).toBe("Client A");
      expect(data.settings).toEqual({ employer_zip_code: "5000", signatory_name: "Ana Reyes", signatory_title: "HR Manager" });
      expect(data.release).toBeNull();
      expect(data.entries).toHaveLength(1);
      expect(data.entries[0].payroll_entry_lines).toHaveLength(2);
      expect(data.prior_employers[0]).toMatchObject({ name: "Old Employer Corp.", taxable_compensation: 200000, tax_withheld: 8000 });
      expect((await db.query(`select public.payroll_2316_data($1, 2024) as d`, [clientA])).rows[0].d.entries).toEqual([]);

      // Client users: no payroll tables, and no certificates until the year is released.
      await asUser(CLIENT_USER);
      expect((await db.query(`select id from public.employee_prior_employers`)).rows).toEqual([]);
      expect((await db.query(`select client_id from public.payroll_settings`)).rows).toEqual([]);
      await fails(`select public.payroll_2316_data($1, 2025)`, [clientA], /not available/);
      await fails(`insert into public.payroll_2316_releases (client_id, year) values ($1, 2025)`, [clientA], /row-level security/);

      // Other staff cannot release; assigned staff can, and who/when are set by the database.
      await asUser(OTHER_STAFF);
      await fails(`insert into public.payroll_2316_releases (client_id, year) values ($1, 2025)`, [clientA], /row-level security/);
      await fails(`select public.payroll_2316_data($1, 2025)`, [clientA], /not available/);
      await asUser(STAFF);
      const rel = (await db.query(`insert into public.payroll_2316_releases (client_id, year, released_by) values ($1, 2025, $2) returning released_by`, [clientA, OWNER])).rows[0];
      expect(rel.released_by).toBe(STAFF);

      await asUser(CLIENT_USER);
      expect((await db.query(`select year from public.payroll_2316_releases`)).rows).toEqual([{ year: 2025 }]);
      const released = (await db.query(`select public.payroll_2316_data($1, 2025) as d`, [clientA])).rows[0].d;
      expect(released.release).not.toBeNull();
      expect(released.employees.map((e: { last_name: string }) => e.last_name)).toEqual(["Dela Cruz"]);
      expect(released.entries).toHaveLength(1);
      // Still only for the released year, and never another client's.
      await fails(`select public.payroll_2316_data($1, 2024)`, [clientA], /not available/);
      await fails(`select public.payroll_2316_data($1, 2025)`, [clientB], /not available/);
      expect((await db.query(`select id from public.payroll_entries`)).rows).toEqual([]);
      expect((await db.query(`delete from public.payroll_2316_releases returning year`)).rows).toEqual([]);

      // Withdrawing the release hides them again.
      await asUser(STAFF);
      expect((await db.query(`delete from public.payroll_2316_releases where client_id = $1 and year = 2025 returning year`, [clientA])).rows).toHaveLength(1);
      await asUser(CLIENT_USER);
      await fails(`select public.payroll_2316_data($1, 2025)`, [clientA], /not available/);
    } finally {
      await db.query("rollback");
    }
  });

  it("writes payroll changes to the audit log", async () => {
    const n = (await db.query(`select count(*)::int as n from public.audit_log where table_name in ('employees', 'payroll_entries')`)).rows[0].n;
    expect(n).toBeGreaterThan(0);
  });
});
