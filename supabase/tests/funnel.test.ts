/**
 * Phase 2 funnel (migration 20261125000016_funnel.sql), built but not live:
 * quote request → lead → proposal → online acceptance (e-signature) → client in
 * Onboarding. While brands.funnel_open is false, the public functions answer
 * signed-in staff only and the leads they make are tests.
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
const DB_NAME = "funnel_test";

const OWNER = "00000000-0000-0000-0000-0000000000a1";
const STAFF = "00000000-0000-0000-0000-0000000000a2";
const HASH = "a".repeat(64);
const LEAD = { business_name: "Molo Bakery", contact_name: "Ana Reyes", email: "Ana@Example.com", mobile: "0917", taxpayer_type: "individual", services: ["tax_compliance", "bookkeeping", "hacking"], profile: { employees: 2 } };

describe.skipIf(!url)("funnel: quote request to client, not live", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;

  async function as(user: string | null, sql: string, params: unknown[] = []) {
    await db.query("begin");
    if (user) {
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
      await db.query("set local role authenticated");
    } else {
      await db.query("select set_config('request.jwt.claim.sub', '', true)");
      await db.query("set local role anon");
    }
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const submit = (user: string | null) => as(user, `select public.submit_lead('TC', $1, '{"monthlyRetainer": 5000}') as id`, [JSON.stringify(LEAD)]);
  const propose = (lead: string, valid = "2099-12-31") =>
    as(OWNER, `select * from public.create_proposal($1, '{"monthlyRetainer": 5000}', 'Terms', 5000, 60000, $2)`, [lead, valid]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2)`, [OWNER, STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  let lead: string;
  let token: string;

  it("is closed to the public while the funnel is not open; staff can try it, as a test lead", async () => {
    expect((await as(null, `select public.funnel_open('TC') as o`)).rows[0].o).toBe(false);
    expect((await as(STAFF, `select public.funnel_open('TC') as o`)).rows[0].o).toBe(true);
    await expect(submit(null)).rejects.toThrow(/Not found/);
    lead = (await submit(STAFF)).rows[0].id;
    const l = (await db.query(`select email, services, test, status, source from public.leads where id = $1`, [lead])).rows[0];
    expect(l).toEqual({ email: "ana@example.com", services: ["tax_compliance", "bookkeeping"], test: true, status: "new", source: "website" });
  });

  it("lets only the Owner read leads and send a proposal", async () => {
    expect((await as(STAFF, `select count(*)::int as n from public.leads`)).rows[0].n).toBe(0);
    await expect(as(STAFF, `select * from public.create_proposal($1, '{}', 'Terms', 1, 1, '2099-12-31')`, [lead])).rejects.toThrow(/Only the Owner/);
    const first = (await propose(lead)).rows[0];
    const second = (await propose(lead)).rows[0];
    token = second.token;
    expect(token).toMatch(/^[0-9a-f]{64}$/);
    expect((await db.query(`select status from public.proposals where id = $1`, [first.id])).rows[0].status).toBe("withdrawn");
    expect((await db.query(`select status from public.leads where id = $1`, [lead])).rows[0].status).toBe("proposal_sent");
  });

  it("shows the proposal at its link, to the public only once the funnel is open", async () => {
    expect((await as(null, `select public.proposal_by_token($1) as p`, [token])).rows[0].p).toBeNull();
    await db.query(`update public.brands set funnel_open = true where code = 'TC'`);
    const p = (await as(null, `select public.proposal_by_token($1) as p`, [token])).rows[0].p;
    expect(p).toMatchObject({ status: "sent", terms: "Terms", lead: { business_name: "Molo Bakery" }, brand: { display_name: expect.any(String) } });
    expect((await as(null, `select public.proposal_by_token('nope') as p`)).rows[0].p).toBeNull();
  });

  it("records the acceptance as the e-signature, once", async () => {
    await expect(as(null, `select public.accept_proposal($1, ' ', null, $2, '1.2.3.4', 'UA')`, [token, HASH])).rejects.toThrow(/Type your full name/);
    await expect(as(null, `select public.accept_proposal($1, 'Ana Reyes', null, 'bad', '1.2.3.4', 'UA')`, [token])).rejects.toThrow(/could not be verified/);
    await as(null, `select public.accept_proposal($1, 'Ana Reyes', 'Owner', $2, '1.2.3.4', 'UA')`, [token, HASH]);
    const p = (await db.query(`select status, accepted_name, accepted_position, accepted_ip, accepted_hash, accepted_at is not null as at from public.proposals where token = $1`, [token])).rows[0];
    expect(p).toEqual({ status: "accepted", accepted_name: "Ana Reyes", accepted_position: "Owner", accepted_ip: "1.2.3.4", accepted_hash: HASH, at: true });
    await expect(as(null, `select public.accept_proposal($1, 'Ana Reyes', null, $2, null, null)`, [token, HASH])).rejects.toThrow(/already been accepted/);
    await expect(propose(lead)).rejects.toThrow(/already accepted/);
  });

  it("refuses an expired proposal", async () => {
    const other = (await submit(null)).rows[0].id;
    const p = (await propose(other, "2020-01-01")).rows[0];
    await expect(as(null, `select public.accept_proposal($1, 'Ana Reyes', null, $2, null, null)`, [p.token, HASH])).rejects.toThrow(/expired/);
    expect((await db.query(`select test from public.leads where id = $1`, [other])).rows[0].test).toBe(false);
  });

  it("converts the accepted lead into a client in Onboarding, with the retainer on the first service", async () => {
    await expect(as(STAFF, `select public.convert_lead($1, '2027-01-01')`, [lead])).rejects.toThrow(/Only the Owner/);
    const c = (await as(OWNER, `select public.convert_lead($1, '2027-01-01') as id`, [lead])).rows[0].id;
    expect((await db.query(`select name, status, taxpayer_type from public.clients where id = $1`, [c])).rows[0]).toEqual({ name: "Molo Bakery", status: "onboarding", taxpayer_type: "individual" });
    expect((await db.query(`select service_line, monthly_retainer from public.engagements where client_id = $1 order by monthly_retainer desc`, [c])).rows).toEqual([
      { service_line: "tax_compliance", monthly_retainer: "5000.00" },
      { service_line: "bookkeeping", monthly_retainer: "0.00" },
    ]);
    expect((await db.query(`select status, client_id from public.leads where id = $1`, [lead])).rows[0]).toEqual({ status: "converted", client_id: c });
    await expect(as(OWNER, `select public.convert_lead($1, '2027-01-01')`, [lead])).rejects.toThrow(/already a client/);
  });

  it("marks a lead lost, and lets the Owner open or close the funnel", async () => {
    const other = (await submit(null)).rows[0].id;
    await as(OWNER, `select public.set_lead_status($1, 'lost', 'Went with another firm')`, [other]);
    expect((await db.query(`select status, lost_reason from public.leads where id = $1`, [other])).rows[0]).toEqual({ status: "lost", lost_reason: "Went with another firm" });
    await as(OWNER, `select public.set_funnel_open(false)`);
    expect((await as(null, `select public.funnel_open('TC') as o`)).rows[0].o).toBe(false);
    await expect(as(STAFF, `select public.set_funnel_open(true)`)).rejects.toThrow(/Only the Owner/);
  });
});
