/**
 * Cancelling a discovery call or a client meeting (migration 20270101000402_cancel_meetings.sql):
 * who may cancel, the slot freed (the lead can book again, the host's time is open), the
 * reason kept, and the notices in the bell (the person who cancelled is not notified).
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
const DB_NAME = "cancel_meetings_test";

const OWNER = "00000000-0000-0000-0000-000000000d01";
const REVIEWER = "00000000-0000-0000-0000-000000000d02";
const OTHER = "00000000-0000-0000-0000-000000000d03";
const CLIENT_USER = "00000000-0000-0000-0000-000000000d04";
const CLIENT_USER_2 = "00000000-0000-0000-0000-000000000d05";
const PREPARER = "00000000-0000-0000-0000-000000000d06";

describe.skipIf(!url)("cancelling a discovery call or a client meeting", () => {
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
  const inDays = (d: number, h = 2) => new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + d, h)).toISOString();
  const plus = (iso: string, min: number) => new Date(Date.parse(iso) + min * 60_000).toISOString();
  const notices = async (kind: string) =>
    (await db.query(`select user_id, title, body, href from public.notifications where kind = $1 order by user_id`, [kind])).rows;
  const bookCall = async (start: string) => {
    const id = (await server(`select public.booking_claim($1, $2, $3) as id`, [lead, start, plus(start, 45)])).rows[0].id;
    await server(`select public.booking_confirm($1, 'evt-call', 'https://meet.google.com/abc')`, [id]);
    return id as string;
  };
  const bookMeeting = async (start: string) => {
    const id = (await server(`select public.client_meeting_claim($1, $2, $3, $4, 'Year-end', $5) as id`, [client, REVIEWER, start, plus(start, 30), CLIENT_USER])).rows[0].id;
    await server(`select public.client_meeting_confirm($1, 'evt-meeting', 'https://meet.google.com/xyz')`, [id]);
    return id as string;
  };

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5), ($6)`, [OWNER, REVIEWER, OTHER, CLIENT_USER, CLIENT_USER_2, PREPARER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $5, 'Owner', 'owner'), ($2, $5, 'Rhea Reviewer', 'reviewer'), ($3, $5, 'Other', 'staff'), ($4, $5, 'Pia Preparer', 'staff')`,
      [OWNER, REVIEWER, OTHER, PREPARER, brand],
    );
    lead = (await db.query(`insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type) values ($1, 'Arevalo Bakery', 'Ana Cruz', 'ana@example.com', 'individual') returning id`, [brand])).rows[0].id;
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9942', 'Jaro Clinic', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'reviewer'), ($1, $3, 'preparer')`, [client, REVIEWER, PREPARER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $3, 'Dr. Jaro'), ($2, $3, 'Clinic manager')`, [CLIENT_USER, CLIENT_USER_2, client]);
    await as(OWNER, `select public.assign_lead_reviewer($1, $2)`, [lead, REVIEWER]);
    await as(REVIEWER, `select public.lead_booking_token($1)`, [lead]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("a discovery call", () => {
    it("is cancelled by the Owner or the lead's reviewer, not other staff", async () => {
      const call = await bookCall(inDays(3));
      await expect(as(OTHER, `select public.cancel_discovery_call($1, 'x')`, [call])).rejects.toThrow(/Discovery call not found/);
      await expect(as(CLIENT_USER, `select public.cancel_discovery_call($1, 'x')`, [call])).rejects.toThrow(/Discovery call not found/);
      const r = (await as(REVIEWER, `select public.cancel_discovery_call($1, '  Client   asked to move it  ') as r`, [call])).rows[0].r;
      expect(r).toMatchObject({ id: call, lead_id: lead, host_user_id: REVIEWER, calendar_event_id: "evt-call", reason: "Client asked to move it", email: "ana@example.com", contact_name: "Ana Cruz" });
      expect(r.booking_token).toMatch(/^[0-9a-f]{64}$/);
      const row = (await db.query(`select cancelled_at is not null as cancelled, cancelled_by, cancel_reason from public.discovery_calls where id = $1`, [call])).rows[0];
      expect(row).toEqual({ cancelled: true, cancelled_by: REVIEWER, cancel_reason: "Client asked to move it" });
      await expect(as(OWNER, `select public.cancel_discovery_call($1)`, [call])).rejects.toThrow(/already cancelled/);
    });

    it("tells the Owner (not the reviewer who cancelled) in the bell", async () => {
      const n = await notices("discovery_call_cancelled");
      expect(n).toHaveLength(1);
      expect(n[0]).toMatchObject({ user_id: OWNER, title: "Discovery call cancelled: Arevalo Bakery", href: `/app/leads/${lead}` });
      expect(n[0].body).toMatch(/^Was .* \(Manila\) · Reason: Client asked to move it$/);
    });

    it("frees the lead and the host's time: the lead books again, the slot is open", async () => {
      const token = (await db.query(`select booking_token from public.leads where id = $1`, [lead])).rows[0].booking_token;
      expect((await server(`select booked_at from public.booking_lead($1)`, [token])).rows).toEqual([{ booked_at: null }]);
      // The same time as the cancelled call, now for a client meeting with the same host.
      const meeting = await bookMeeting(inDays(3));
      await as(REVIEWER, `select public.cancel_client_meeting($1)`, [meeting]);
      const again = await bookCall(inDays(3));
      expect((await as(REVIEWER, `select id from public.discovery_calls where lead_id = $1 and held_at is null and cancelled_at is null`, [lead])).rows).toEqual([{ id: again }]);
    });

    it("cannot be cancelled once held; recording the notes fills the booked call, not a cancelled one", async () => {
      await as(REVIEWER, `select public.record_discovery_call($1, now(), 'Wants bookkeeping')`, [lead]);
      const calls = (await db.query(`select calendar_event_id, held_at is not null as held, cancelled_at is not null as cancelled from public.discovery_calls where lead_id = $1 order by created_at`, [lead])).rows;
      expect(calls).toEqual([
        { calendar_event_id: "evt-call", held: false, cancelled: true },
        { calendar_event_id: "evt-call", held: true, cancelled: false },
      ]);
      const held = (await db.query(`select id from public.discovery_calls where lead_id = $1 and held_at is not null`, [lead])).rows[0].id;
      await expect(as(OWNER, `select public.cancel_discovery_call($1)`, [held])).rejects.toThrow(/was held/);
    });
  });

  describe("a client meeting", () => {
    it("is cancelled by the client's own user, with a notice to the host and the client's other users", async () => {
      await db.query(`delete from public.notifications`);
      const m = await bookMeeting(inDays(5));
      await as(CLIENT_USER, `select public.cancel_client_meeting($1, 'Sick')`, [m]);
      const row = (await db.query(`select cancelled_at is not null as cancelled, cancelled_by, cancel_reason from public.client_meetings where id = $1`, [m])).rows[0];
      expect(row).toEqual({ cancelled: true, cancelled_by: CLIENT_USER, cancel_reason: "Sick" });
      const staff = await notices("client_meeting_cancelled");
      expect(staff).toHaveLength(1);
      expect(staff[0]).toMatchObject({ user_id: REVIEWER, href: "/app/calendar" });
      expect(staff[0].title).toMatch(/^Jaro Clinic: meeting on .* cancelled$/);
      expect(staff[0].body).toBe("Cancelled by Jaro Clinic · Reason: Sick · Topic: Year-end");
      // The client who cancelled is not told; the other user of the business is.
      const clients = await notices("meeting_cancelled");
      expect(clients.map((n) => n.user_id)).toEqual([CLIENT_USER_2]);
      expect(clients[0]).toMatchObject({ href: "/portal/book", body: "It was cancelled from your portal. Reason: Sick. You can book another time from the portal." });
    });

    it("is cancelled by staff on the client: the client's users and the host are told", async () => {
      await db.query(`delete from public.notifications`);
      const m = await bookMeeting(inDays(6));
      await as(PREPARER, `select public.cancel_client_meeting($1)`, [m]);
      expect((await notices("client_meeting_cancelled")).map((n) => [n.user_id, n.body])).toEqual([[REVIEWER, "Cancelled by Pia Preparer · Topic: Year-end"]]);
      const clients = await notices("meeting_cancelled");
      expect(clients.map((n) => n.user_id)).toEqual([CLIENT_USER, CLIENT_USER_2]);
      expect(clients[0].body).toBe("Your team had to cancel it. You can book another time from the portal.");
      // The host cancelling their own meeting is not notified of it.
      await db.query(`delete from public.notifications`);
      const m2 = await bookMeeting(inDays(7));
      await as(REVIEWER, `select public.cancel_client_meeting($1)`, [m2]);
      expect(await notices("client_meeting_cancelled")).toEqual([]);
    });

    it("is not for a contact who may only view the business", async () => {
      const m = await bookMeeting(inDays(8));
      await db.query(`update public.client_users set access = 'viewer' where user_id = $1`, [CLIENT_USER_2]);
      try {
        await expect(as(CLIENT_USER_2, `select public.cancel_client_meeting($1)`, [m])).rejects.toThrow();
        expect((await db.query(`select cancelled_at from public.client_meetings where id = $1`, [m])).rows[0].cancelled_at).toBeNull();
      } finally {
        await db.query(`update public.client_users set access = 'full' where user_id = $1`, [CLIENT_USER_2]);
        await as(OWNER, `select public.cancel_client_meeting($1)`, [m]);
      }
    });

    it("is not for other staff or another business's users, nor a meeting already started or cancelled", async () => {
      const m = await bookMeeting(inDays(8));
      await expect(as(OTHER, `select public.cancel_client_meeting($1)`, [m])).rejects.toThrow(/Meeting not found/);
      await expect(as(null, `select public.cancel_client_meeting($1)`, [m], "anon")).rejects.toThrow(/permission denied/);
      await as(OWNER, `select public.cancel_client_meeting($1, 'Owner away')`, [m]);
      await expect(as(CLIENT_USER, `select public.cancel_client_meeting($1)`, [m])).rejects.toThrow(/already cancelled/);
      const past = (await db.query(
        `insert into public.client_meetings (client_id, staff_user_id, starts_at, ends_at, booked_by, calendar_event_id) values ($1, $2, now() - interval '1 hour', now() - interval '30 minutes', $3, 'evt-old') returning id`,
        [client, REVIEWER, CLIENT_USER],
      )).rows[0].id;
      await expect(as(CLIENT_USER, `select public.cancel_client_meeting($1)`, [past])).rejects.toThrow(/has not started/);
      // The cancelled time is free for the host again.
      await bookMeeting(inDays(8));
    });

    it("leaves the cancelled meetings out of the client's two upcoming", async () => {
      await db.query(`delete from public.client_meetings where cancelled_at is null`);
      await bookMeeting(inDays(10));
      await bookMeeting(inDays(11));
      await expect(bookMeeting(inDays(12))).rejects.toThrow(/2 meetings coming up/);
    });
  });
});
