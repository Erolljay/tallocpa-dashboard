/**
 * Standing monthly requests (migration 20270101000201_standing_requests.sql): staff on
 * a client switch on the monthly AR/AP update and bank statements; each open month gets
 * one request per kind (one per bank account), due on the cutoff, opened once; the client
 * uploads or says there was nothing; staff accept or return it with a reason.
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
const DB_NAME = "standing_requests_test";

const OWNER = "00000000-0000-0000-0000-000000000091";
const STAFF = "00000000-0000-0000-0000-000000000092";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000093";
const CLIENT_USER = "00000000-0000-0000-0000-000000000094";
const OTHER_CLIENT_USER = "00000000-0000-0000-0000-000000000095";
const OPEN = "2026-10-01"; // cutoff far ahead
const PAST = "2026-09-01"; // cutoff passed
const NEXT = "2026-11-01";

describe.skipIf(!url)("standing monthly requests", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let other: string;
  let bdo: string;

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
  const setStanding = (user: string, kind: string, on: boolean, accounts: string[] = [], clientId = client) =>
    as(user, `select public.set_standing_request($1, $2, $3, $4) as n`, [clientId, kind, on, accounts]).then((r) => r.rows[0].n as number);
  const standing = (period = OPEN) =>
    db.query(
      `select subject, standing_kind, standing_key, status, due_date::text, assigned_to from public.client_requests
       where client_id = $1 and period = $2 order by standing_kind, subject`,
      [client, period],
    ).then((r) => r.rows);
  const byKind = async (kind: string, period = OPEN) =>
    (await db.query(`select id from public.client_requests where client_id = $1 and period = $2 and standing_kind = $3 order by subject`, [client, period, kind])).rows.map((r) => r.id as string);
  const statusOf = (id: string) => db.query(`select status, no_activity from public.client_requests where id = $1`, [id]).then((r) => r.rows[0]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, STAFF, OTHER_STAFF, CLIENT_USER, OTHER_CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $4, 'Other', 'staff')`,
      [OWNER, STAFF, OTHER_STAFF, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, status) values ($1, 'TC-9901', 'Jaro Agri Supply', 'individual', 'active') returning id`, [brand])).rows[0].id;
    other = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, status) values ($1, 'TC-9902', 'Other Co', 'corporation', 'active') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Juan'), ($3, $4, 'Other user')`, [CLIENT_USER, client, OTHER_CLIENT_USER, other]);
    bdo = (await db.query(
      `insert into public.ledger_accounts (client_id, code, name, type, normal_side, fs_line, control)
       values ($1, '1020', 'Cash in Bank - BDO', 'asset', 'debit', 'cash', 'bank'), ($1, '1010', 'Cash on Hand', 'asset', 'debit', 'cash', 'cash') returning id`,
      [client],
    )).rows[0].id;
    await db.query(`insert into public.document_cycles (client_id, period, cutoff_date) values ($1, $2, '2099-01-05'), ($1, $3, '2026-10-05')`, [client, OPEN, PAST]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lets only staff on the client (or the Owner) switch them on", async () => {
    await expect(setStanding(OTHER_STAFF, "arap_update", true)).rejects.toThrow(/Only staff on this client/);
    await expect(setStanding(CLIENT_USER, "arap_update", true)).rejects.toThrow(/Only staff on this client/);
    await expect(setStanding(STAFF, "payroll", true)).rejects.toThrow(/Unknown standing request/);
  });

  it("opens the AR/AP update and one bank statement per books bank account for open months, due on the cutoff", async () => {
    expect(await setStanding(OWNER, "arap_update", true)).toBe(1);
    expect(await setStanding(STAFF, "bank_statements", true)).toBe(1);
    expect(await standing()).toEqual([
      { subject: "AR/AP update for October 2026", standing_kind: "arap_update", standing_key: "", status: "open", due_date: "2099-01-05", assigned_to: STAFF },
      { subject: "Bank statement for October 2026: Cash in Bank - BDO", standing_kind: "bank_statement", standing_key: bdo, status: "open", due_date: "2099-01-05", assigned_to: STAFF },
    ]);
    // A month whose cutoff has passed gets nothing.
    expect(await standing(PAST)).toEqual([]);
    // Opened once: switching on again, and the nightly run, open nothing more.
    expect(await setStanding(STAFF, "arap_update", true)).toBe(0);
    expect((await db.query(`select public.run_document_cycles('2026-10-20') as r`)).rows[0].r.standing).toBe(0);
  });

  it("opens them when the next month's cycle opens, and a bank account added later the next night", async () => {
    await db.query(`insert into public.document_cycles (client_id, period, cutoff_date) values ($1, $2, '2099-02-05')`, [client, NEXT]);
    expect((await standing(NEXT)).map((r) => r.subject)).toEqual(["AR/AP update for November 2026", "Bank statement for November 2026: Cash in Bank - BDO"]);
    await db.query(`insert into public.ledger_accounts (client_id, code, name, type, normal_side, fs_line, control) values ($1, '1021', 'Cash in Bank - BPI', 'asset', 'debit', 'cash', 'bank')`, [client]);
    expect((await db.query(`select public.run_document_cycles('2026-11-20') as r`)).rows[0].r.standing).toBe(2);
    expect((await standing(NEXT)).map((r) => r.subject)).toContain("Bank statement for November 2026: Cash in Bank - BPI");
  });

  it("uses the accounts staff list instead of the books when given", async () => {
    await expect(setStanding(STAFF, "bank_statements", true, ["x".repeat(81)])).rejects.toThrow(/under 80/);
    expect(await setStanding(STAFF, "bank_statements", true, ["Metrobank Savings", " metrobank savings ", "", "BDO Checking"])).toBe(4);
    const cfg = (await db.query(`select accounts from public.client_standing_requests where client_id = $1 and kind = 'bank_statements'`, [client])).rows[0];
    expect(cfg.accounts).toEqual(["Metrobank Savings", "BDO Checking"]);
    expect((await standing()).filter((r) => r.standing_key === "metrobank savings")).toHaveLength(1);
  });

  it("lets the client upload or answer 'no collections or payments'; staff return with a reason or accept", async () => {
    const [arap] = await byKind("arap_update");
    const [bank] = await byKind("bank_statement");
    await expect(as(STAFF, `select public.standing_no_activity($1)`, [arap])).rejects.toThrow(/Only the client/);
    await expect(as(OTHER_CLIENT_USER, `select public.standing_no_activity($1)`, [arap])).rejects.toThrow(/not found/);
    await expect(as(CLIENT_USER, `select public.standing_no_activity($1)`, [bank])).rejects.toThrow(/not an AR\/AP update/);
    await expect(as(STAFF, `select public.return_standing_request($1, 'blurry')`, [arap])).rejects.toThrow(/nothing from the client/);

    await as(CLIENT_USER, `select public.standing_no_activity($1)`, [arap]);
    expect(await statusOf(arap)).toEqual({ status: "answered", no_activity: true });
    await expect(as(STAFF, `select public.return_standing_request($1, ' ')`, [arap])).rejects.toThrow(/Say why/);
    await expect(as(OTHER_STAFF, `select public.return_standing_request($1, 'x')`, [arap])).rejects.toThrow(/not found/);
    await as(STAFF, `select public.return_standing_request($1, 'Your deposit slips show a collection on Oct 12')`, [arap]);
    expect(await statusOf(arap)).toEqual({ status: "open", no_activity: false });
    const last = (await db.query(`select from_firm, body from public.client_request_messages where request_id = $1 order by created_at desc limit 1`, [arap])).rows[0];
    expect(last).toEqual({ from_firm: true, body: "Returned: Your deposit slips show a collection on Oct 12" });

    // The bank statement comes as a file through the usual reply; staff accept it.
    const file = `${client}/${bank}/october.pdf`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('requests', $1)`, [file]);
    await as(CLIENT_USER, `select public.reply_client_request($1, null, $2, 'BDO Oct.pdf', 'application/pdf')`, [bank, file]);
    expect((await statusOf(bank)).status).toBe("answered");
    await as(STAFF, `select public.close_client_request($1)`, [bank]);
    expect((await statusOf(bank)).status).toBe("closed");
  });

  it("shows each client only its own, and switching off closes what still waits on the client", async () => {
    const seen = (user: string) => as(user, `select count(*)::int as n from public.client_standing_requests`).then((x) => x.rows[0].n);
    expect(await seen(CLIENT_USER)).toBe(2);
    expect(await seen(OTHER_CLIENT_USER)).toBe(0);
    expect(await seen(OTHER_STAFF)).toBe(0);
    await expect(as(STAFF, `insert into public.client_standing_requests (client_id, kind) values ($1, 'arap_update')`, [other])).rejects.toThrow();

    expect(await setStanding(STAFF, "bank_statements", false)).toBe(0);
    const left = (await db.query(`select status from public.client_requests where client_id = $1 and standing_kind = 'bank_statement' and status <> 'closed'`, [client])).rows;
    expect(left).toEqual([]);
    // The AR/AP update is untouched.
    expect((await standing()).find((r) => r.standing_kind === "arap_update")?.status).toBe("open");
  });
});
