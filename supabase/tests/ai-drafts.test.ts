/**
 * AI employees' drafts (migration 20270108000001; docs/AI-WORKFORCE.md §2):
 *
 *   - a switched-on AI employee saves drafts for its own clients (or about no client),
 *     only through ai_save_draft(); never for another client, never when switched off,
 *     never by writing the table directly; payloads are capped;
 *   - a newer draft of the same kind on the same subject withdraws the open one;
 *   - staff on the client (and the Owner) read and decide drafts; other staff, client
 *     contacts and the AI employee itself cannot decide; a decided draft stays decided;
 *   - staff see which AI employee prepared it.
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
const DB_NAME = "ai_drafts_test";

const OWNER = "00000000-0000-0000-0000-00000000d101";
const PREPARER = "00000000-0000-0000-0000-00000000d102";
const OTHER_STAFF = "00000000-0000-0000-0000-00000000d103";
const CLIENT_USER = "00000000-0000-0000-0000-00000000d104";
const CLERK = "00000000-0000-0000-0000-00000000d1a1";

describe.skipIf(!url)("AI drafts: saved by AI employees, decided by people", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let jaro: string;
  let molo: string;

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
  const save = (client: string | null, subject: string | null, payload: object = { summary: [{ label: "Type", value: "Purchase" }] }, kind = "document_suggestion") =>
    as(CLERK, `select id, status from public.ai_save_draft($1, $2, $3, $4, $5::jsonb, 'because')`, [kind, client, subject ? "documents" : null, subject, JSON.stringify(payload)]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, PREPARER, OTHER_STAFF, CLIENT_USER, CLERK]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Other', 'staff')`, [OWNER, PREPARER, OTHER_STAFF, brand]);
    jaro = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9951', 'Jaro Trading', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9952', 'Molo Foods', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [jaro, PREPARER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Jaro owner')`, [CLIENT_USER, jaro]);
    await db.query(`insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, enabled) values ($1, $2, 'document_clerk', 'Document Clerk', 'compliance', 'both', true)`, [CLERK, brand]);
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [CLERK, jaro]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("saves a draft for its own client, or about no client", async () => {
    expect((await save(jaro, "00000000-0000-0000-0000-0000000000f1")).rows[0].status).toBe("open");
    expect((await save(null, null, { summary: [] }, "kickoff_brief")).rows[0].status).toBe("open");
  });

  it("refuses another client, a switched-off AI employee, a direct insert, and an oversized draft", async () => {
    await expect(save(molo, null)).rejects.toThrow(/Not one of your clients/);
    await expect(as(CLERK, `insert into public.ai_drafts (ai_user_id, kind) values ($1, 'x')`, [CLERK])).rejects.toThrow(/row-level security/);
    await expect(save(jaro, null, { summary: [], big: "x".repeat(70_000) })).rejects.toThrow(/64 kB/);
    await db.query(`update public.ai_employees set enabled = false where user_id = $1`, [CLERK]);
    await expect(save(jaro, null)).rejects.toThrow(/switched-on AI employee/);
    await db.query(`update public.ai_employees set enabled = true where user_id = $1`, [CLERK]);
  });

  it("staff and client contacts cannot save drafts", async () => {
    await expect(as(PREPARER, `select public.ai_save_draft('x', $1, null, null, '{}'::jsonb, '')`, [jaro])).rejects.toThrow(/switched-on AI employee/);
    await expect(as(CLIENT_USER, `select public.ai_save_draft('x', $1, null, null, '{}'::jsonb, '')`, [jaro])).rejects.toThrow(/switched-on AI employee/);
  });

  it("a newer draft on the same subject withdraws the open one", async () => {
    await save(jaro, "00000000-0000-0000-0000-0000000000f1", { summary: [{ label: "Type", value: "Sales" }] });
    const { rows } = await db.query(`select status, payload->'summary'->0->>'value' as v from public.ai_drafts where subject_id = '00000000-0000-0000-0000-0000000000f1' order by created_at`);
    expect(rows.map((r) => r.status)).toEqual(["withdrawn", "open"]);
    expect(rows[1].v).toBe("Sales");
  });

  it("staff on the client and the Owner read drafts and the AI employee's name; others do not", async () => {
    const sel = `select d.kind, e.name from public.ai_drafts d left join public.ai_employees e on e.user_id = d.ai_user_id where d.status = 'open' and d.client_id = $1`;
    expect((await as(PREPARER, sel, [jaro])).rows).toEqual([{ kind: "document_suggestion", name: "Document Clerk" }]);
    expect((await as(OWNER, sel, [jaro])).rows).toHaveLength(1);
    expect((await as(OTHER_STAFF, sel, [jaro])).rows).toHaveLength(0);
    expect((await as(CLIENT_USER, `select count(*)::int as n from public.ai_drafts`)).rows[0].n).toBe(0);
    expect((await as(CLERK, `select count(*)::int as n from public.ai_drafts`)).rows[0].n).toBe(3);
  });

  it("only staff on the client (or the Owner) decide, once", async () => {
    const id = (await db.query(`select id from public.ai_drafts where status = 'open' and client_id = $1`, [jaro])).rows[0].id;
    await expect(as(CLERK, `select public.decide_ai_draft($1, true)`, [id])).rejects.toThrow(/Only staff/);
    await expect(as(OTHER_STAFF, `select public.decide_ai_draft($1, true)`, [id])).rejects.toThrow(/Only staff/);
    await expect(as(CLIENT_USER, `select public.decide_ai_draft($1, true)`, [id])).rejects.toThrow(/Only staff/);
    const r = (await as(PREPARER, `select (d).status, (d).decided_by::text from public.decide_ai_draft($1, true, 'Looks right') as d`, [id])).rows[0];
    expect(r).toEqual({ status: "accepted", decided_by: PREPARER });
    await expect(as(OWNER, `select public.decide_ai_draft($1, false)`, [id])).rejects.toThrow(/already accepted/);
    const noClient = (await db.query(`select id from public.ai_drafts where status = 'open' and client_id is null`)).rows[0].id;
    await expect(as(PREPARER, `select public.decide_ai_draft($1, false)`, [noClient])).rejects.toThrow(/Only staff/);
    expect((await as(OWNER, `select (d).status from public.decide_ai_draft($1, false) as d`, [noClient])).rows[0].status).toBe("rejected");
  });
});
