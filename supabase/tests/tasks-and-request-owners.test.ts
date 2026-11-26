/**
 * Tasks and request owners (migration 20261216000001_tasks_and_request_owners.sql):
 * every request and ticket has a staff member who answers for it; staff create tasks,
 * assign them, and make a task from a client's ticket.
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
const DB_NAME = "tasks_request_owners_test";

const OWNER = "00000000-0000-0000-0000-000000000a81";
const PREPARER = "00000000-0000-0000-0000-000000000a82";
const REVIEWER = "00000000-0000-0000-0000-000000000a83";
const OUTSIDER = "00000000-0000-0000-0000-000000000a84";
const CLIENT_USER = "00000000-0000-0000-0000-000000000a85";

describe.skipIf(!url)("tasks and request owners", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let other: string;

  async function as<T = Record<string, unknown>>(user: string, sql: string, params: unknown[] = []): Promise<T[]> {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r.rows as T[];
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const notes = (user: string, kind: string) =>
    db.query(`select title from public.notifications where user_id = $1 and kind = $2 order by id`, [user, kind]).then((r) => r.rows.map((x) => x.title as string));

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, REVIEWER, OUTSIDER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values
         ($1, $5, 'Owner', 'owner'), ($2, $5, 'Pia Preparer', 'staff'), ($3, $5, 'Rey Reviewer', 'reviewer'), ($4, $5, 'Olga Outsider', 'staff')`,
      [OWNER, PREPARER, REVIEWER, OUTSIDER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-7001', 'Alpha Trading', 'corporation') returning id`, [brand])).rows[0].id;
    other = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-7002', 'Beta Foods', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer'), ($4, $5, 'preparer')`, [client, PREPARER, REVIEWER, other, OUTSIDER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Juan')`, [CLIENT_USER, client]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("gives a request to whoever sent it, and a ticket to the client's preparer", async () => {
    const [req] = await as<{ assigned_to: string; priority: string }>(REVIEWER, `select * from public.create_client_request($1, 'Bank statements', 'Please', null, null)`, [client]);
    expect(req).toMatchObject({ assigned_to: REVIEWER, priority: "normal" });
    const [ticket] = await as<{ id: string; assigned_to: string }>(CLIENT_USER, `select * from public.open_client_ticket($1, 'Billing question', 'Why two items?')`, [client]);
    expect(ticket.assigned_to).toBe(PREPARER);
    // The client's message notifies only the person who answers for it.
    expect(await notes(PREPARER, "request_from_client")).toEqual(["Alpha Trading opened a request: Billing question"]);
    expect(await notes(REVIEWER, "request_from_client")).toEqual([]);
  });

  it("lets staff on the client hand a ticket to someone who sees the client", async () => {
    const [ticket] = await as<{ id: string }>(CLIENT_USER, `select * from public.open_client_ticket($1, 'COR copy', 'Need it')`, [client]);
    await expect(as(OUTSIDER, `select public.assign_client_request($1, $2, 'high')`, [ticket.id, OUTSIDER])).rejects.toThrow(/not found/);
    await expect(as(PREPARER, `select public.assign_client_request($1, $2, 'high')`, [ticket.id, OUTSIDER])).rejects.toThrow(/works on this client/);
    await expect(as(PREPARER, `select public.assign_client_request($1, $2, 'urgent')`, [ticket.id, REVIEWER])).rejects.toThrow(/Unknown priority/);
    const [r] = await as<{ assigned_to: string; priority: string }>(PREPARER, `select * from public.assign_client_request($1, $2, 'high')`, [ticket.id, REVIEWER]);
    expect(r).toMatchObject({ assigned_to: REVIEWER, priority: "high" });
    expect(await notes(REVIEWER, "request_assigned")).toEqual(["Alpha Trading: COR copy was handed to you"]);
    await as(CLIENT_USER, `select public.reply_client_request($1, 'Any update?')`, [ticket.id]);
    expect((await notes(REVIEWER, "request_from_client")).at(-1)).toBe("Alpha Trading replied: COR copy");
  });

  it("creates a task for a client and notifies the assignee; checks who may do it", async () => {
    await expect(as(CLIENT_USER, `select public.create_staff_task('x', $1)`, [PREPARER])).rejects.toThrow(/Only staff/);
    await expect(as(OWNER, `select public.create_staff_task('  ', $1)`, [PREPARER])).rejects.toThrow(/Say what needs doing/);
    await expect(as(OWNER, `select public.create_staff_task('Renew permit', $1, null, 'normal', null, $2)`, [OUTSIDER, client])).rejects.toThrow(/does not work on this client/);
    await expect(as(OUTSIDER, `select public.create_staff_task('Peek', $1, null, 'normal', null, $2)`, [OUTSIDER, client])).rejects.toThrow(/Client not found/);
    await expect(as(OWNER, `select public.create_staff_task('Renew permit', $1, null, 'normal', null, null, '2026-11-01')`, [PREPARER])).rejects.toThrow(/client the month is for/);
    const [t] = await as<{ id: string; status: string; client_id: string; created_by: string }>(
      OWNER, `select * from public.create_staff_task('Renew mayor''s permit', $1, '2027-01-20', 'high', 'Bring the lease', $2, '2027-01-01')`, [PREPARER, client],
    );
    expect(t).toMatchObject({ status: "open", client_id: client, created_by: OWNER });
    expect(await notes(PREPARER, "task_assigned")).toContain("Owner gave you a task: Renew mayor's permit");
    // Seen by the assignee, staff on the client, the Owner; not by staff elsewhere.
    expect(await as(REVIEWER, `select id from public.staff_tasks where id = $1`, [t.id])).toHaveLength(1);
    expect(await as(OUTSIDER, `select id from public.staff_tasks where id = $1`, [t.id])).toHaveLength(0);
    expect(await as(CLIENT_USER, `select id from public.staff_tasks where id = $1`, [t.id])).toHaveLength(0);
    // Only through the functions.
    await expect(as(PREPARER, `update public.staff_tasks set title = 'x' where id = $1 returning id`, [t.id]).then((r) => r.length)).resolves.toBe(0);
  });

  it("lets the assignee, the creator or the Owner change, finish and reopen a task", async () => {
    const [t] = await as<{ id: string }>(PREPARER, `select * from public.create_staff_task('Call BIR RDO', $1)`, [PREPARER]);
    await expect(as(OUTSIDER, `select public.set_staff_task_status($1, 'done')`, [t.id])).rejects.toThrow(/not found|Only the person/);
    await expect(as(REVIEWER, `select public.set_staff_task_status($1, 'done')`, [t.id])).rejects.toThrow(/Only the person/);
    const [moved] = await as<{ assigned_to: string }>(PREPARER, `select * from public.update_staff_task($1, 'Call BIR RDO 074', $2, '2027-02-01', 'low', null)`, [t.id, OUTSIDER]);
    expect(moved.assigned_to).toBe(OUTSIDER);
    expect(await notes(OUTSIDER, "task_assigned")).toContain("Pia Preparer handed you a task: Call BIR RDO 074");
    const [done] = await as<{ status: string; done_by: string }>(OUTSIDER, `select * from public.set_staff_task_status($1, 'done')`, [t.id]);
    expect(done).toMatchObject({ status: "done", done_by: OUTSIDER });
    await expect(as(OUTSIDER, `select public.update_staff_task($1, 'x', $2, null, 'normal', null)`, [t.id, OUTSIDER])).rejects.toThrow(/Reopen the task/);
    const [open] = await as<{ status: string; done_at: string | null }>(OWNER, `select * from public.set_staff_task_status($1, 'open')`, [t.id]);
    expect(open).toMatchObject({ status: "open", done_at: null });
  });

  it("makes a task from a client's ticket, linked to it", async () => {
    const [ticket] = await as<{ id: string }>(CLIENT_USER, `select * from public.open_client_ticket($1, 'Need 2307s', 'For Q3')`, [client]);
    await expect(as(OWNER, `select public.create_staff_task('2307s', $1, null, 'normal', null, $2, null, $3)`, [PREPARER, other, ticket.id])).rejects.toThrow(/another client's/);
    const [t] = await as<{ client_id: string; request_id: string }>(PREPARER, `select * from public.create_staff_task('Prepare Q3 2307s', $1, null, 'normal', null, null, null, $2)`, [PREPARER, ticket.id]);
    expect(t).toMatchObject({ client_id: client, request_id: ticket.id });
  });
});
