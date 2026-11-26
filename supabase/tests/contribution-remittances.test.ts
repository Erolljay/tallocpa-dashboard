/**
 * SSS, PhilHealth and Pag-IBIG remittances (migration 20261216000002_contribution_remittances.sql):
 * employer numbers decide the months and deadlines; staff prepare (shares, PRN, report
 * attached); the Owner approves (the total goes on the statement when the firm remits)
 * and records it remitted with the proof of payment; the client sees it in the portal.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

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

  it("creates the months from the employer numbers; staff on the client set the numbers", async () => {
    await expect(as(OUTSIDER, `select public.set_employer_number($1, 'sss', '03-1', '2026-09-01')`, [alpha])).rejects.toThrow(/Only the Owner or staff assigned/);
    await expect(as(STAFF, `select public.set_employer_number($1, 'sss', '03-1', '2026-09-15')`, [alpha])).rejects.toThrow(/first month/);
    await as(STAFF, `select public.set_employer_number($1, 'sss', '03-1234567-8', '2026-09-01')`, [alpha]);
    await as(STAFF, `select public.set_employer_number($1, 'philhealth', '01-000000012-7', '2026-09-01')`, [alpha]);
    await as(STAFF, `select public.set_employer_number($1, 'pagibig', '2000-1234-5678', '2026-09-01')`, [alpha]);
    await as(STAFF, `select public.set_employer_number($1, 'sss', '07-7654321-0', '2026-11-01')`, [beta]);
    await expect(as(CLIENT_USER, `select public.generate_contribution_remittances('2026-11-26')`)).rejects.toThrow(/Only staff/);
    // The nightly job (no signed-in user): Sept to Nov for Alpha's three agencies, Nov for Beta's SSS.
    expect((await one<{ n: number }>(null, `select public.generate_contribution_remittances('2026-11-26') as n`)).n).toBe(10);
    expect((await one<{ n: number }>(null, `select public.generate_contribution_remittances('2026-11-26') as n`)).n).toBe(0);
    const nov = await remittance(alpha, "philhealth", "2026-11-01");
    expect(nov).toMatchObject({ status: "not_started", total: "0.00" });
    expect((await db.query(`select due_date::text from public.contribution_remittances where id = $1`, [nov.id])).rows[0].due_date).toBe("2026-12-21"); // the 20th is a Sunday
    // Loans are added by hand, once the agency's number is in.
    await expect(as(STAFF, `select public.add_contribution_remittance($1, 'pagibig_loan', '2026-11-01')`, [beta])).rejects.toThrow(/Pag-IBIG employer number/);
    await expect(as(STAFF, `select public.add_contribution_remittance($1, 'sss_loan', '2027-05-01')`, [beta])).rejects.toThrow(/not started/);
    await as(STAFF, `select public.add_contribution_remittance($1, 'sss_loan', '2026-11-01')`, [beta]);
    // The client's users see nothing before approval.
    expect(await as(CLIENT_USER, `select id from public.contribution_remittances`)).toHaveLength(0);
    expect(await as(OUTSIDER, `select id from public.contribution_remittances`)).toHaveLength(0);
  });

  it("prepares with the shares, PRN and report; the Owner approves and it goes on the statement", async () => {
    const r = await remittance(alpha, "sss", "2026-11-01");
    await expect(as(STAFF, `select public.prepare_contribution_remittance($1, 1000, 2000, 30, 3, 'PRN-1')`, [r.id])).rejects.toThrow(/Attach the contribution report/);
    await attach(r, "report");
    await expect(as(STAFF, `select public.prepare_contribution_remittance($1, 0, 0, 0, 3, 'PRN-1')`, [r.id])).rejects.toThrow(/Not required/);
    await expect(as(STAFF, `select public.prepare_contribution_remittance($1, 1000, 2000, 30, 3, ' ')`, [r.id])).rejects.toThrow(/PRN/);
    await expect(as(OUTSIDER, `select public.prepare_contribution_remittance($1, 1000, 2000, 30, 3, 'PRN-1')`, [r.id])).rejects.toThrow(/not found/);
    const p = await one<{ status: string; total: string }>(STAFF, `select * from public.prepare_contribution_remittance($1, 1125, 2375, 30, 3, 'PRN 0312345678')`, [r.id]);
    expect(p).toMatchObject({ status: "prepared", total: "3530.00" });
    expect((await db.query(`select title, body from public.notifications where user_id = $1 and kind = 'remittance_ready_for_approval'`, [OWNER])).rows).toEqual([
      { title: "Alpha Trading: SSS contributions, November 2026 is ready for approval", body: "₱3,530.00 due Jan 4" },
    ]);
    // EC only on SSS; a loan has no employer share.
    const ph = await remittance(alpha, "philhealth", "2026-11-01");
    await attach(ph, "report");
    await expect(as(STAFF, `select public.prepare_contribution_remittance($1, 500, 500, 10, 3, 'P')`, [ph.id])).rejects.toThrow(/EC is paid with SSS/);

    await expect(as(STAFF, `select public.approve_contribution_remittance($1)`, [r.id])).rejects.toThrow(/Owner/);
    // An unbilled item the Owner entered by hand for the same month is used, not doubled.
    const manual = (await one<{ id: string }>(OWNER, `select public.add_client_charge($1, 'contribution', 'SSS contributions, November 2026', 3000, '2026-12-31', 'sss') as id`, [alpha])).id;
    const a = await one<{ status: string; due_id: string }>(OWNER, `select * from public.approve_contribution_remittance($1)`, [r.id]);
    expect(a).toMatchObject({ status: "approved", due_id: manual });
    expect((await db.query(`select amount::text, due_on::text, contribution from public.client_dues where id = $1`, [manual])).rows[0]).toEqual({ amount: "3530.00", due_on: "2027-01-04", contribution: "sss" });
    // The client sees the approved remittance and its PRN statement, not the report yet.
    expect(await as(CLIENT_USER, `select prn from public.contribution_remittances`)).toEqual([{ prn: "PRN 0312345678" }]);
    await attach(r, "prn");
    expect((await as<{ kind: string }>(CLIENT_USER, `select kind from public.contribution_remittance_files`)).map((f) => f.kind)).toEqual(["prn"]);
  });

  it("records the remittance with the proof; the statement item is no longer held", async () => {
    const r = await remittance(alpha, "sss", "2026-11-01");
    await expect(as(OWNER, `select public.remit_contribution_remittance($1, '2026-11-25', 'OR 1')`, [r.id])).rejects.toThrow(/proof of payment/);
    await attach(r, "proof");
    await expect(as(STAFF, `select public.remit_contribution_remittance($1, '2026-11-25', 'OR 1')`, [r.id])).rejects.toThrow(/Owner/);
    await expect(as(OWNER, `select public.remit_contribution_remittance($1, '2099-01-01', 'OR 1')`, [r.id])).rejects.toThrow(/future/);
    const done = await one<{ status: string; remit_reference: string }>(OWNER, `select * from public.remit_contribution_remittance($1, '2026-11-25', 'SSS OR 998877')`, [r.id]);
    expect(done).toMatchObject({ status: "remitted", remit_reference: "SSS OR 998877" });
    expect((await db.query(`select remitted_on::text, remit_reference from public.client_dues where id = $1`, [r.due_id])).rows[0]).toEqual({ remitted_on: "2026-11-25", remit_reference: "SSS OR 998877" });
    expect((await db.query(`select title from public.notifications where user_id = $1 and kind = 'remittance_remitted'`, [CLIENT_USER])).rows).toEqual([{ title: "SSS contributions, November 2026 was paid" }]);
    expect((await as<{ kind: string }>(CLIENT_USER, `select kind from public.contribution_remittance_files order by kind`)).map((f) => f.kind)).toEqual(["prn", "proof", "report"]);
    await expect(attach(r, "report")).rejects.toThrow(/closed/);

    // The Owner steps back: remitted → approved holds the money again; approved with the item on a statement stays.
    const back = await one<{ status: string }>(OWNER, `select * from public.reopen_contribution_remittance($1)`, [r.id]);
    expect(back.status).toBe("approved");
    expect((await db.query(`select remitted_on from public.client_dues where id = $1`, [r.due_id])).rows[0].remitted_on).toBeNull();
    const soa = (await db.query(`insert into public.soas (client_id, billing_date, reference, due_on) values ($1, '2026-12-10', 'TC-8001-2026-12-10', '2026-12-20') returning id`, [alpha])).rows[0].id;
    await db.query(`update public.client_dues set soa_id = $2 where id = $1`, [r.due_id, soa]);
    await expect(as(OWNER, `select public.reopen_contribution_remittance($1)`, [r.id])).rejects.toThrow(/already on a statement/);
  });

  it("lets staff record a client that pays the agency itself, and mark a month not required", async () => {
    const r = await remittance(beta, "sss", "2026-11-01");
    await attach(r, "report");
    await as(STAFF, `select public.prepare_contribution_remittance($1, 500, 1000, 10, 1, 'PRN-B')`, [r.id]);
    const a = await one<{ due_id: string | null }>(OWNER, `select * from public.approve_contribution_remittance($1)`, [r.id]);
    expect(a.due_id).toBeNull(); // nothing billed: the client pays the agency
    await attach(r, "proof");
    expect((await one<{ status: string }>(STAFF, `select * from public.remit_contribution_remittance($1, '2026-11-26', null)`, [r.id])).status).toBe("remitted");

    const loan = await remittance(beta, "sss_loan", "2026-11-01");
    await expect(as(STAFF, `select public.skip_contribution_remittance($1, ' ')`, [loan.id])).rejects.toThrow(/Say why/);
    expect((await one<{ status: string }>(STAFF, `select * from public.skip_contribution_remittance($1, 'No loans this month')`, [loan.id])).status).toBe("not_required");
    expect((await one<{ status: string }>(OWNER, `select * from public.reopen_contribution_remittance($1)`, [loan.id])).status).toBe("not_started");
  });

  it("moves the deadlines of open months when a number changes, but keeps a date staff set", async () => {
    const dec = await one<{ id: string }>(STAFF, `select public.add_contribution_remittance($1, 'philhealth', '2026-10-01') as id`, [alpha]);
    const oct = (await db.query(`select id, due_date::text from public.contribution_remittances where client_id = $1 and kind = 'philhealth' order by period_month`, [alpha])).rows;
    expect(oct.map((x) => x.due_date)).toEqual(["2026-10-20", "2026-11-20", "2026-12-21"]);
    await as(STAFF, `select public.set_remittance_due_date($1, '2026-11-18')`, [oct[1].id]);
    await as(STAFF, `select public.set_employer_number($1, 'philhealth', '01-000000012-3', '2026-09-01')`, [alpha]);
    const after = (await db.query(`select due_date::text from public.contribution_remittances where client_id = $1 and kind = 'philhealth' order by period_month`, [alpha])).rows;
    expect(after.map((x) => x.due_date)).toEqual(["2026-10-15", "2026-11-18", "2026-12-15"]);
    expect(dec.id).toBeTruthy();
  });
});
