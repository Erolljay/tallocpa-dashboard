/**
 * Leads pipeline (migration 20261129000001_leads_pipeline.sql): Lead → Prospect
 * → Won → Onboarding | Lost (with a reason); the Owner assigns a reviewer, who
 * sees only their leads and records the discovery call; the client's preparer and
 * reviewer are picked at onboarding; the inquiry, the discovery call, onboarding
 * answers and notes make one Notes timeline on the client.
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
const DB_NAME = "leads_pipeline_test";
const PIPELINE = "20261129000001_leads_pipeline.sql";

const OWNER = "00000000-0000-0000-0000-0000000001a1";
const REV1 = "00000000-0000-0000-0000-0000000001a2";
const REV2 = "00000000-0000-0000-0000-0000000001a3";
const PREP = "00000000-0000-0000-0000-0000000001a4";
const PREP2 = "00000000-0000-0000-0000-0000000001a5";
const HASH = "b".repeat(64);
const LEAD = { business_name: "Jaro Print Shop", contact_name: "Ben Cruz", email: "ben@example.com", taxpayer_type: "individual", services: ["tax_compliance"], profile: { employees: 1 }, message: "We are behind on our 2551Q." };

describe.skipIf(!url)("leads pipeline", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;
  const old: Record<string, string> = {};

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
  const stage = async (id: string) => (await db.query(`select stage from public.leads where id = $1`, [id])).rows[0].stage as string;
  const count = async (user: string) => (await as(user, `select count(*)::int as n from public.leads`)).rows[0].n as number;

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    const files = readdirSync(path.join(root, "migrations")).sort();
    const at = files.indexOf(PIPELINE);
    for (const f of files.slice(0, at)) await db.query(read(`migrations/${f}`));
    // Leads in the funnel's old statuses, to see them mapped onto the stages.
    brand = (await db.query(`insert into public.brands (code, display_name, legal_name) values ('TC', 'Tallo CPA', 'Tallo CPA') returning id`)).rows[0].id;
    for (const s of ["new", "proposal_sent", "accepted", "lost"]) {
      old[s] = (await db.query(
        `insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type, status) values ($1, $2, 'X', 'x@example.com', 'individual', $2) returning id`,
        [brand, s],
      )).rows[0].id;
    }
    for (const f of files.slice(at)) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    // Supabase also grants the public tables to anon; row-level security keeps them out.
    await db.query(`grant select on public.leads, public.discovery_calls, public.onboarding_ticks, public.client_notes, public.lead_notes, public.client_notes_timeline to anon`);
    await db.query(`delete from public.leads`);
    await db.query(read("seed.sql"));
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, REV1, REV2, PREP, PREP2]);
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values
        ($1, $6, 'Owner', 'owner'), ($2, $6, 'Rev One', 'reviewer'), ($3, $6, 'Rev Two', 'reviewer'), ($4, $6, 'Prep', 'staff'), ($5, $6, 'Prep Two', 'staff')`,
      [OWNER, REV1, REV2, PREP, PREP2, brand],
    );
  }, 120_000);

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  let lead: string;
  let client: string;

  it("maps the funnel's statuses onto the stages; a lost lead without a reason gets one", async () => {
    // Mapped before the rows were cleared: check the audit trail of the migration's update.
    const rows = (await db.query(
      `select row_pk, new_row ->> 'stage' as stage, new_row ->> 'lost_reason' as reason from public.audit_log
       where table_name = 'leads' and action = 'UPDATE' and new_row ? 'stage' order by id`,
    )).rows;
    const last = new Map(rows.map((r) => [r.row_pk, r]));
    expect(last.get(old.new)?.stage).toBe("lead");
    expect(last.get(old.proposal_sent)?.stage).toBe("prospect");
    expect(last.get(old.accepted)?.stage).toBe("won");
    expect(last.get(old.lost)).toMatchObject({ stage: "lost", reason: "Not recorded" });
  });

  it("lets only the Owner assign a reviewer, and only a reviewer", async () => {
    lead = await submit();
    expect(await stage(lead)).toBe("lead");
    await expect(as(REV1, `select public.assign_lead_reviewer($1, $2)`, [lead, REV1])).rejects.toThrow(/Only the Owner/);
    await expect(as(OWNER, `select public.assign_lead_reviewer($1, $2)`, [lead, PREP])).rejects.toThrow(/Assign a reviewer/);
    await as(OWNER, `select public.assign_lead_reviewer($1, $2)`, [lead, REV1]);
    expect((await db.query(`select reviewer_id from public.leads where id = $1`, [lead])).rows[0].reviewer_id).toBe(REV1);
  });

  it("shows a reviewer only their leads; the Owner sees all; others none", async () => {
    await submit();
    expect(await count(OWNER)).toBe(2);
    expect(await count(REV1)).toBe(1);
    expect(await count(REV2)).toBe(0);
    expect(await count(PREP)).toBe(0);
    expect((await as(null, `select count(*)::int as n from public.leads`)).rows[0].n).toBe(0);
  });

  it("lets the assigned reviewer record the discovery call, which makes the lead a Prospect", async () => {
    await expect(as(REV2, `select public.record_discovery_call($1, now(), 'Notes')`, [lead])).rejects.toThrow(/lead's reviewer/);
    await expect(as(REV1, `select public.record_discovery_call($1, now(), '  ')`, [lead])).rejects.toThrow(/notes/);
    await expect(as(REV1, `select public.record_discovery_call($1, now() + interval '3 days', 'Early')`, [lead])).rejects.toThrow(/not happened/);
    await as(REV1, `select public.record_discovery_call($1, now(), 'Needs 2551Q catch-up for 3 quarters; VAT soon.')`, [lead]);
    expect(await stage(lead)).toBe("prospect");
    expect((await as(REV1, `select count(*)::int as n from public.discovery_calls`)).rows[0].n).toBe(1);
    expect((await as(REV2, `select count(*)::int as n from public.discovery_calls`)).rows[0].n).toBe(0);
  });

  it("moves only along the pipeline", async () => {
    await expect(db.query(`update public.leads set stage = 'onboarding' where id = $1`, [lead])).rejects.toThrow(/cannot move from prospect to onboarding/);
    await expect(db.query(`update public.leads set stage = 'lead' where id = $1`, [lead])).rejects.toThrow(/cannot move from prospect to lead/);
    const fresh = await submit();
    await expect(db.query(`update public.leads set stage = 'won' where id = $1`, [fresh])).rejects.toThrow(/cannot move from lead to won/);
    await expect(db.query(`insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type, stage) values ($1, 'A', 'B', 'a@b.co', 'individual', 'won')`, [brand])).rejects.toThrow(/starts at the Lead stage/);
    await expect(as(OWNER, `select public.convert_lead($1, '2027-01-01')`, [lead])).rejects.toThrow(/Only a won lead/);
  });

  it("needs a reason to mark a lead Lost, and reopens it at the stage its record supports", async () => {
    await expect(as(REV1, `select public.mark_lead_lost($1, ' ')`, [lead])).rejects.toThrow(/reason/);
    await expect(db.query(`update public.leads set stage = 'lost' where id = $1`, [lead])).rejects.toThrow(/leads_lost_reason/);
    await expect(as(REV2, `select public.mark_lead_lost($1, 'Too expensive')`, [lead])).rejects.toThrow(/lead's reviewer/);
    await as(REV1, `select public.mark_lead_lost($1, 'Too expensive')`, [lead]);
    expect((await db.query(`select stage, lost_reason from public.leads where id = $1`, [lead])).rows[0]).toEqual({ stage: "lost", lost_reason: "Too expensive" });
    await expect(as(REV1, `select * from public.create_proposal($1, '{}', 'Terms', 1, 1, '2099-12-31')`, [lead])).rejects.toThrow(/Reopen/);
    expect((await as(REV1, `select public.reopen_lead($1) as s`, [lead])).rows[0].s).toBe("prospect");
    expect((await db.query(`select stage, lost_reason from public.leads where id = $1`, [lead])).rows[0]).toEqual({ stage: "prospect", lost_reason: null });
  });

  it("lets the reviewer send the proposal; acceptance makes it Won; the Owner converts with the client's own team", async () => {
    await expect(as(REV2, `select * from public.create_proposal($1, '{}', 'Terms', 4000, 48000, '2099-12-31')`, [lead])).rejects.toThrow(/lead's reviewer/);
    const token = (await as(REV1, `select * from public.create_proposal($1, '{"monthlyRetainer": 4000}', 'Terms', 4000, 48000, '2099-12-31')`, [lead])).rows[0].token;
    expect((await as(REV1, `select count(*)::int as n from public.proposals`)).rows[0].n).toBe(1);
    expect((await as(REV2, `select count(*)::int as n from public.proposals`)).rows[0].n).toBe(0);
    await as(OWNER, `select public.accept_proposal($1, 'Ben Cruz', 'Owner', $2, null, null)`, [token, HASH]);
    expect(await stage(lead)).toBe("won");

    await expect(as(REV1, `select public.convert_lead($1, '2027-01-01', $2, $3)`, [lead, PREP, REV2])).rejects.toThrow(/Only the Owner/);
    await expect(as(OWNER, `select public.convert_lead($1, '2027-01-01', $2, $3)`, [lead, PREP, PREP2])).rejects.toThrow(/reviewer for the client/);
    client = (await as(OWNER, `select public.convert_lead($1, '2027-01-01', $2, $3) as id`, [lead, PREP, REV2])).rows[0].id;
    expect(await stage(lead)).toBe("onboarding");
    expect((await db.query(`select user_id, role from public.staff_assignments where client_id = $1 order by role`, [client])).rows).toEqual([
      { user_id: PREP, role: "preparer" },
      { user_id: REV2, role: "reviewer" },
    ]);
    await expect(as(REV1, `select public.mark_lead_lost($1, 'Changed mind')`, [lead])).rejects.toThrow(/already onboarding/);
  });

  it("brings the inquiry, the discovery call, onboarding answers and notes into the client's Notes", async () => {
    await as(PREP, `select public.set_onboarding_item($1, 'kickoff', true, 'Cutoff on the 5th agreed')`, [client]);
    await as(PREP, `select public.add_client_note($1, 'Prefers Viber for reminders')`, [client]);
    await expect(as(PREP2, `select public.add_client_note($1, 'x')`, [client])).rejects.toThrow(/Client not found/);
    await expect(as(PREP, `select public.add_client_note($1, ' ')`, [client])).rejects.toThrow(/Write the note/);

    const notes = (await as(PREP, `select source, body, details from public.client_notes_timeline where client_id = $1 order by at`, [client])).rows;
    expect(notes.map((n) => n.source)).toEqual(["inquiry", "discovery_call", "onboarding", "note"]);
    expect(notes[0]).toMatchObject({ body: "We are behind on our 2551Q.", details: { business_name: "Jaro Print Shop", services: ["tax_compliance"], monthly_quote: 4000 } });
    expect(notes[1].body).toMatch(/2551Q catch-up/);
    expect(notes[2]).toMatchObject({ body: "Cutoff on the 5th agreed", details: { item: "kickoff" } });
    // The data is held once: the timeline is a view over the sources.
    expect((await db.query(`select relkind from pg_class where relname = 'client_notes_timeline'`)).rows[0].relkind).toBe("v");

    expect((await as(REV2, `select count(*)::int as n from public.client_notes_timeline where client_id = $1`, [client])).rows[0].n).toBe(4);
    expect((await as(PREP2, `select count(*)::int as n from public.client_notes_timeline where client_id = $1`, [client])).rows[0].n).toBe(0);
    expect((await as(null, `select count(*)::int as n from public.client_notes_timeline`)).rows[0].n).toBe(0);
  });
});
