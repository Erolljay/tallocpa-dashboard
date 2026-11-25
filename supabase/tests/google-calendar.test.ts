/**
 * Rework phase 5 (migration 20261210000003): Google Calendar. Staff connections with the
 * refresh token out of reach of browser roles, the lead's booking link, claiming a slot
 * (one booked call per lead), the notes filling the booked call, and the portal's host.
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
const DB_NAME = "google_calendar_test";

const OWNER = "00000000-0000-0000-0000-000000000c01";
const REVIEWER = "00000000-0000-0000-0000-000000000c02";
const OTHER = "00000000-0000-0000-0000-000000000c03";
const CLIENT_USER = "00000000-0000-0000-0000-000000000c04";

describe.skipIf(!url)("Google Calendar", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let lead: string;
  let client: string;

  async function as(user: string | null, sql: string, params: unknown[] = [], role = "authenticated") {
    await db.query("begin");
    if (user) await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query(`set local role ${role}`);
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const server = (sql: string, params: unknown[] = []) => as(null, sql, params, "service_role");

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, REVIEWER, OTHER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Rhea Reviewer', 'reviewer'), ($3, $4, 'Other', 'staff')`,
      [OWNER, REVIEWER, OTHER, brand],
    );
    lead = (await db.query(`insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type) values ($1, 'Arevalo Bakery', 'Ana Cruz', 'ana@example.com', 'individual') returning id`, [brand])).rows[0].id;
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9941', 'Jaro Clinic', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'reviewer'), ($1, $3, 'preparer')`, [client, REVIEWER, OTHER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Dr. Jaro')`, [CLIENT_USER, client]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("staff connections", () => {
    it("are saved and read only by the server", async () => {
      await expect(as(REVIEWER, `select public.calendar_link_save($1, 'rhea@tallocpa.com', 'sealed')`, [REVIEWER])).rejects.toThrow(/permission denied/);
      await server(`select public.calendar_link_save($1, 'Rhea@TalloCPA.com', 'iv.body.tag')`, [REVIEWER]);
      expect((await server(`select google_email, refresh_token, last_error from public.calendar_tokens($1)`, [[REVIEWER]])).rows).toEqual([{ google_email: "rhea@tallocpa.com", refresh_token: "iv.body.tag", last_error: null }]);
      await expect(as(OWNER, `select * from public.calendar_tokens($1)`, [[REVIEWER]])).rejects.toThrow(/permission denied/);
      await expect(as(OWNER, `select * from private.google_calendar_tokens`)).rejects.toThrow(/permission denied/);
    });

    it("show staff who is connected, never the token, and nothing to clients", async () => {
      expect((await as(OTHER, `select user_id, google_email from public.google_calendar_links`)).rows).toEqual([{ user_id: REVIEWER, google_email: "rhea@tallocpa.com" }]);
      expect((await as(CLIENT_USER, `select * from public.google_calendar_links`)).rows).toEqual([]);
      await expect(as(REVIEWER, `update public.google_calendar_links set google_email = 'x@y.z'`)).resolves.toMatchObject({ rowCount: 0 });
      const audit = (await db.query(`select new_row from public.audit_log where table_name = 'google_calendar_links'`)).rows;
      expect(JSON.stringify(audit)).not.toMatch(/iv\.body\.tag/);
    });

    it("records an error, and is removed with its token", async () => {
      await server(`select public.calendar_link_error($1, 'invalid_grant')`, [REVIEWER]);
      expect((await as(OTHER, `select last_error from public.google_calendar_links`)).rows).toEqual([{ last_error: "invalid_grant" }]);
      await server(`select public.calendar_link_save($1, 'rhea@tallocpa.com', 'iv2.body.tag')`, [REVIEWER]);
      expect((await as(OTHER, `select last_error from public.google_calendar_links`)).rows).toEqual([{ last_error: null }]);
    });
  });

  describe("a lead's booking link", () => {
    it("needs a reviewer, and is for the Owner or that reviewer", async () => {
      await expect(as(OWNER, `select public.lead_booking_token($1)`, [lead])).rejects.toThrow(/Assign a reviewer first/);
      await as(OWNER, `select public.assign_lead_reviewer($1, $2)`, [lead, REVIEWER]);
      await expect(as(OTHER, `select public.lead_booking_token($1)`, [lead])).rejects.toThrow(/Lead not found/);
      const t1 = (await as(REVIEWER, `select public.lead_booking_token($1) as t`, [lead])).rows[0].t;
      expect(t1).toMatch(/^[0-9a-f]{64}$/);
      expect((await as(OWNER, `select public.lead_booking_token($1) as t`, [lead])).rows[0].t).toBe(t1);
    });

    it("books one call: the slot is claimed, confirmed with its event, and a second claim fails", async () => {
      const token = (await db.query(`select booking_token from public.leads where id = $1`, [lead])).rows[0].booking_token;
      await expect(as(null, `select * from public.booking_lead($1)`, [token], "anon")).rejects.toThrow(/permission denied/);
      expect((await server(`select business_name, reviewer_name, open, booked_at from public.booking_lead($1)`, [token])).rows).toEqual([
        { business_name: "Arevalo Bakery", reviewer_name: "Rhea Reviewer", open: true, booked_at: null },
      ]);
      const call = (await server(`select public.booking_claim($1, '2026-11-20T02:00:00Z', '2026-11-20T02:45:00Z') as id`, [lead])).rows[0].id;
      await expect(server(`select public.booking_claim($1, '2026-12-04T03:00:00Z', '2026-12-04T03:45:00Z')`, [lead])).rejects.toThrow(/already booked/);
      await server(`select public.booking_confirm($1, 'evt-1', 'https://meet.google.com/abc-defg-hij')`, [call]);
      expect((await server(`select meet_url from public.booking_lead($1)`, [token])).rows[0].meet_url).toBe("https://meet.google.com/abc-defg-hij");
      // The booked call is not a note until it is held.
      expect((await as(REVIEWER, `select source from public.lead_notes where lead_id = $1`, [lead])).rows.map((r) => r.source)).toEqual(["inquiry"]);
    });

    it("releases a claim whose event could not be made, never a confirmed one", async () => {
      const confirmed = (await db.query(`select id from public.discovery_calls where lead_id = $1`, [lead])).rows[0].id;
      await server(`select public.booking_confirm($1, null, null)`, [confirmed]);
      expect((await db.query(`select count(*)::int as n from public.discovery_calls where lead_id = $1`, [lead])).rows[0].n).toBe(1);
      // An unconfirmed claim (the calendar event failed) is released and the lead can book again.
      await db.query(`delete from public.discovery_calls where id = $1`, [confirmed]);
      const failed = (await server(`select public.booking_claim($1, '2026-11-20T02:00:00Z', '2026-11-20T02:45:00Z') as id`, [lead])).rows[0].id;
      await server(`select public.booking_confirm($1, null, null)`, [failed]);
      expect((await db.query(`select count(*)::int as n from public.discovery_calls where lead_id = $1`, [lead])).rows[0].n).toBe(0);
      const again = (await server(`select public.booking_claim($1, '2026-11-20T02:00:00Z', '2026-11-20T02:45:00Z') as id`, [lead])).rows[0].id;
      await server(`select public.booking_confirm($1, 'evt-1', 'https://meet.google.com/abc-defg-hij')`, [again]);
    });

    it("fills the booked call with the notes after it is held", async () => {
      await as(REVIEWER, `select public.record_discovery_call($1, '2026-11-20T02:00:00Z', 'Wants monthly bookkeeping')`, [lead]);
      const calls = (await db.query(`select scheduled_at is not null as booked, held_at is not null as held, notes, calendar_event_id from public.discovery_calls where lead_id = $1`, [lead])).rows;
      expect(calls).toEqual([{ booked: true, held: true, notes: "Wants monthly bookkeeping", calendar_event_id: "evt-1" }]);
      expect((await db.query(`select stage from public.leads where id = $1`, [lead])).rows[0].stage).toBe("prospect");
      // Held: the link is closed; a new call needs a new link.
      expect((await db.query(`select booking_token from public.leads where id = $1`, [lead])).rows[0].booking_token).toBeNull();
      await expect(server(`select public.booking_claim($1, '2026-12-10T02:00:00Z', '2026-12-10T02:45:00Z')`, [lead])).rejects.toThrow(/closed/);
      await as(REVIEWER, `select public.lead_booking_token($1)`, [lead]);
      await server(`select public.booking_claim($1, '2026-12-10T02:00:00Z', '2026-12-10T02:45:00Z')`, [lead]);
    });

    it("closes once the lead is won or lost", async () => {
      await as(REVIEWER, `select public.mark_lead_lost($1, 'Went elsewhere')`, [lead]);
      await expect(server(`select public.booking_claim($1, '2026-12-11T02:00:00Z', '2026-12-11T02:45:00Z')`, [lead])).rejects.toThrow(/closed/);
      await expect(as(REVIEWER, `select public.lead_booking_token($1)`, [lead])).rejects.toThrow(/Lead or Prospect/);
    });
  });

  describe("the client's Book a meeting", () => {
    it("is with the client's reviewer, for the client's own users", async () => {
      expect((await as(CLIENT_USER, `select full_name, role, connected from public.portal_meeting_host($1)`, [client])).rows).toEqual([{ full_name: "Rhea Reviewer", role: "reviewer", connected: true }]);
      await expect(as(OTHER, `select * from public.portal_meeting_host($1)`, [client])).resolves.toBeTruthy();
      await expect(as(CLIENT_USER, `select public.client_meeting_claim($1, $2, '2027-01-04T02:00:00Z', '2027-01-04T02:30:00Z', null, $3)`, [client, REVIEWER, CLIENT_USER])).rejects.toThrow(/permission denied/);
      await expect(as(CLIENT_USER, `insert into public.client_meetings (client_id, staff_user_id, starts_at, ends_at, calendar_event_id, booked_by) values ($1, $2, now(), now() + interval '30 minutes', 'e', $3)`, [client, REVIEWER, CLIENT_USER])).rejects.toThrow(/row-level security/);
    });
  });

  describe("claiming a host's time", () => {
    const claimMeeting = (start: string, end: string, staff = REVIEWER, by = CLIENT_USER) =>
      server(`select public.client_meeting_claim($1, $2, $3, $4, 'Year-end', $5) as id`, [client, staff, start, end, by]);

    it("keeps client meetings off the host's booked discovery call, and each other", async () => {
      // The lead's call booked on 10 December 02:00–02:45 (UTC) with the same reviewer.
      await expect(claimMeeting("2026-12-10T02:30:00Z", "2026-12-10T03:00:00Z")).rejects.toThrow(/just taken/);
      const m = (await claimMeeting("2027-01-04T02:00:00Z", "2027-01-04T02:30:00Z")).rows[0].id;
      await expect(claimMeeting("2027-01-04T02:00:00Z", "2027-01-04T02:30:00Z")).rejects.toThrow(/just taken/);
      await server(`select public.client_meeting_confirm($1, 'evt-m1', 'https://meet.google.com/x')`, [m]);
      expect((await as(CLIENT_USER, `select topic, calendar_event_id from public.client_meetings`)).rows).toEqual([{ topic: "Year-end", calendar_event_id: "evt-m1" }]);
    });

    it("allows at most two upcoming meetings per client, only with its own team, only for its own users", async () => {
      await claimMeeting("2027-01-05T02:00:00Z", "2027-01-05T02:30:00Z");
      await expect(claimMeeting("2027-01-06T02:00:00Z", "2027-01-06T02:30:00Z")).rejects.toThrow(/2 meetings coming up/);
      await expect(claimMeeting("2027-01-06T02:00:00Z", "2027-01-06T02:30:00Z", OWNER)).rejects.toThrow(/own team/);
      await expect(claimMeeting("2027-01-06T02:00:00Z", "2027-01-06T02:30:00Z", REVIEWER, OTHER)).rejects.toThrow(/Business not found/);
    });

    it("releases a meeting whose event could not be made", async () => {
      const pending = (await db.query(`select id from public.client_meetings where calendar_event_id is null`)).rows[0].id;
      await server(`select public.client_meeting_confirm($1, null, null)`, [pending]);
      await claimMeeting("2027-01-06T02:00:00Z", "2027-01-06T02:30:00Z");
    });
  });
});
