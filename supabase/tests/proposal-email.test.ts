/**
 * Emailing the proposal link (migration 20270101000501_proposal_email.sql):
 * record_proposal_email keeps to whom, when, by whom and how many times on the
 * proposal; only the Owner or the lead's reviewer, only for the open proposal; a
 * replaced proposal stays unacceptable.
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
const DB_NAME = "proposal_email_test";

const OWNER = "00000000-0000-0000-0000-0000000005e1";
const REV1 = "00000000-0000-0000-0000-0000000005e2";
const REV2 = "00000000-0000-0000-0000-0000000005e3";
const HASH = "c".repeat(64);
const LEAD = { business_name: "Jaro Print Shop", contact_name: "Ben Cruz", email: "ben@example.com", taxpayer_type: "individual", services: ["tax_compliance"], profile: { employees: 1 } };

type Row = { id: string; token: string; status: string; emailed_at: string | null; emailed_to: string | null; emailed_by: string | null; emailed_count: number };

describe.skipIf(!url)("proposal email record", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;

  async function as(user: string | null, sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user ?? ""]);
    await db.query(user ? "set local role authenticated" : "set local role anon");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const submit = () => as(OWNER, `select public.submit_lead('TC', $1, '{"monthlyRetainer": 4000}') as id`, [JSON.stringify(LEAD)]).then((r) => r.rows[0].id as string);
  const propose = (user: string, lead: string) =>
    as(user, `select * from public.create_proposal($1, '{"monthlyRetainer": 4000}', 'Terms', 4000, 0, (now() at time zone 'Asia/Manila')::date + 30)`, [lead]).then((r) => r.rows[0] as Row);
  const record = (user: string | null, proposal: string, to: string) => as(user, `select * from public.record_proposal_email($1, $2)`, [proposal, to]).then((r) => r.rows[0] as Row);
  const proposal = (id: string) => db.query(`select * from public.proposals where id = $1`, [id]).then((r) => r.rows[0] as Row);
  const stage = (id: string) => db.query(`select stage from public.leads where id = $1`, [id]).then((r) => r.rows[0].stage as string);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [OWNER, REV1, REV2]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Rev One', 'reviewer'), ($3, $4, 'Rev Two', 'reviewer')`, [OWNER, REV1, REV2, brand]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("records to whom, when and by whom, and counts each send", async () => {
    const lead = await submit();
    const p = await propose(OWNER, lead);
    expect(p.emailed_at).toBeNull();
    expect(p.emailed_count).toBe(0);
    const r = await record(OWNER, p.id, "  Ben@Example.com ");
    expect(r.emailed_to).toBe("ben@example.com");
    expect(r.emailed_by).toBe(OWNER);
    expect(r.emailed_at).not.toBeNull();
    expect(r.emailed_count).toBe(1);
    const again = await record(OWNER, p.id, "accounts@jaro.example");
    expect(again.emailed_to).toBe("accounts@jaro.example");
    expect(again.emailed_count).toBe(2);
    expect(await stage(lead)).toBe("prospect");
  });

  it("only the Owner or the lead's reviewer; never the public", async () => {
    const lead = await submit();
    await as(OWNER, `select public.assign_lead_reviewer($1, $2)`, [lead, REV1]);
    const p = await propose(REV1, lead);
    await expect(record(REV2, p.id, "ben@example.com")).rejects.toThrow(/Only the Owner or the lead's reviewer/);
    await expect(record(null, p.id, "ben@example.com")).rejects.toThrow(/permission denied/);
    expect((await proposal(p.id)).emailed_at).toBeNull();
    const r = await record(REV1, p.id, "ben@example.com");
    expect(r.emailed_by).toBe(REV1);
  });

  it("refuses a bad address", async () => {
    const p = await propose(OWNER, await submit());
    await expect(record(OWNER, p.id, "not-an-email")).rejects.toThrow(/valid email address/);
    await expect(record(OWNER, p.id, "")).rejects.toThrow(/valid email address/);
  });

  it("a replaced proposal cannot be emailed or accepted; an accepted one cannot be emailed", async () => {
    const lead = await submit();
    const old = await propose(OWNER, lead);
    await record(OWNER, old.id, "ben@example.com");
    const fresh = await propose(OWNER, lead);
    expect((await proposal(old.id)).status).toBe("withdrawn");
    await expect(record(OWNER, old.id, "ben@example.com")).rejects.toThrow(/replaced/);
    await expect(as(null, `select public.accept_proposal($1, 'Ben Cruz', null, $2, '1.1.1.1', 'ua')`, [old.token, HASH])).rejects.toThrow(/replaced|not found/i);
    // The old record stays on the replaced proposal; the new one starts unsent.
    expect((await proposal(old.id)).emailed_to).toBe("ben@example.com");
    expect((await proposal(fresh.id)).emailed_count).toBe(0);
    await as(OWNER, `select public.accept_proposal($1, 'Ben Cruz', null, $2, '1.1.1.1', 'ua')`, [fresh.token, HASH]);
    await expect(record(OWNER, fresh.id, "ben@example.com")).rejects.toThrow(/already been accepted/);
  });

  it("the record cannot be written directly", async () => {
    const p = await propose(OWNER, await submit());
    // No update policy on proposals: a direct write changes nothing (or is refused outright).
    const r = await as(OWNER, `update public.proposals set emailed_to = 'x@example.com' where id = $1`, [p.id]).catch((e: Error) => e);
    if (!(r instanceof Error)) expect(r.rowCount).toBe(0);
    expect((await proposal(p.id)).emailed_to).toBeNull();
  });
});
