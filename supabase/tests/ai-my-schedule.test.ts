/**
 * The Chief of Staff's my_schedule (migration 20270110000003, src/lib/calendar/ai-tools.ts;
 * docs/AI-WORKFORCE.md §8b), end to end through the connector handler:
 *
 *   - one list for the Owner, in day and time order: returns due (counted per form, its
 *     clients only), registration target dates, the Owner's tasks and requests due, then
 *     discovery calls and client meetings by start time (Manila);
 *   - other staff's and other brands' items, cancelled meetings, done tasks and filed
 *     returns are left out; a client it may not read shows without its code and name;
 *   - at most 31 days;
 *   - only the switched-on Chief of Staff may call it, and it still cannot read or
 *     change the underlying tables.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashKey, newKey } from "../../src/lib/ai/credentials";
import { asAi, handleMcp } from "../../src/lib/mcp/handler";
import type { Connector } from "../../src/lib/mcp/types";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_my_schedule_test";

const OWNER = "00000000-0000-0000-0000-00000000c301";
const STAFF = "00000000-0000-0000-0000-00000000c302";
const CLIENT_USER = "00000000-0000-0000-0000-00000000c303";
const OTHER_OWNER = "00000000-0000-0000-0000-00000000c304";
const CHIEF = "00000000-0000-0000-0000-00000000c3a1";
const CLERK = "00000000-0000-0000-0000-00000000c3a2";
// 08:00 on 1 December 2026 in Manila.
const NOW = new Date("2026-12-01T00:00:00Z");

describe.skipIf(!url)("AI Chief of Staff: my_schedule, the Owner's dated items in one list", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let jaro: string;
  let molo: string;
  const key = newKey();
  let id = 0;

  type Item = { kind: string; date: string; time: string | null; title: string; client: string | null; place: string | null; source: string };
  type Reply = { result?: { isError?: boolean; structuredContent?: { items: Item[] } & Record<string, unknown>; content: { text: string }[] }; error?: { message: string } };
  const call = async (args: Record<string, unknown> = {}) =>
    (await handleMcp(conn, { aiKey: "chief_of_staff", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name: "my_schedule", arguments: args } }, now: NOW })).json as Reply;

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
    conn = { connect: async () => ({ query: (sql: string, params?: unknown[]) => db.query(sql, params), release: () => undefined }) } as unknown as Connector;

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5), ($6)`, [OWNER, STAFF, CLIENT_USER, OTHER_OWNER, CHIEF, CLERK]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    const other = (await db.query(`insert into public.brands (code, display_name, legal_name) values ('XB', 'Other', 'Other Firm') returning id`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Staff', 'staff'), ($3, $5, 'Other owner', 'owner')`,
      [OWNER, STAFF, OTHER_OWNER, brand, other],
    );
    const client = async (b: string, code: string, name: string) =>
      (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, $2, $3, 'corporation', 'firm_remits') returning id`, [b, code, name])).rows[0].id as string;
    jaro = await client(brand, "TC-9931", "Jaro Trading");
    molo = await client(brand, "TC-9932", "Molo Foods");
    const elsewhere = await client(other, "XB-9933", "Elsewhere Inc.");

    // Meetings booked from the portal.
    const meeting = (staff: string, c: string, start: string, end: string, topic: string, cancelled = false) =>
      db.query(
        `insert into public.client_meetings (client_id, staff_user_id, starts_at, ends_at, topic, meet_url, booked_by, cancelled_at) values ($1, $2, $3, $4, $5, 'https://meet.google.com/abc-defg-hij', $6, $7)`,
        [c, staff, start, end, topic, staff, cancelled ? NOW : null],
      );
    await meeting(OWNER, jaro, "2026-12-01T06:00:00Z", "2026-12-01T07:00:00Z", "Year-end planning");
    await meeting(OWNER, molo, "2026-12-01T02:00:00Z", "2026-12-01T02:30:00Z", "Payroll");
    await meeting(STAFF, jaro, "2026-12-01T03:00:00Z", "2026-12-01T04:00:00Z", "Not the Owner's");
    await meeting(OWNER, jaro, "2026-12-01T05:00:00Z", "2026-12-01T05:30:00Z", "Cancelled", true);
    await meeting(OWNER, jaro, "2026-12-10T01:00:00Z", "2026-12-10T02:00:00Z", "Later this month");
    await meeting(OTHER_OWNER, elsewhere, "2026-12-01T01:00:00Z", "2026-12-01T02:00:00Z", "Other firm");

    // A discovery call booked with the Owner.
    const lead = (await db.query(
      `insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type) values ($1, 'Arevalo Bakery', 'Ana Cruz', 'ana@example.com', 'individual') returning id`,
      [brand],
    )).rows[0].id;
    await db.query(
      `insert into public.discovery_calls (lead_id, scheduled_at, scheduled_until, host_user_id, booked_via, meet_url) values ($1, '2026-12-01T01:00:00Z', '2026-12-01T01:30:00Z', $2, 'booking_page', 'https://meet.google.com/xyz')`,
      [lead, OWNER],
    );

    // Returns due on 1 December: three of Jaro's not yet filed, one filed, one of Molo's.
    const filing = async (c: string, form: string, rule: string, period: string, status = "not_started") => {
      const ob =
        (await db.query(`select id from public.obligations where client_id = $1 and form = $2`, [c, form])).rows[0]?.id ??
        (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, $2, 'monthly', '2026-01-01') returning id`, [c, form])).rows[0].id;
      await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
         values ($1, $2, $3, $4, ($4 || '-01')::date, (($4 || '-01')::date + interval '1 month' - interval '1 day')::date, $5, '2026-12-01', '2026-12-01', $6)`,
        [ob, c, form, period, rule, status],
      );
    };
    await filing(jaro, "1601-C", "1601C", "2026-10");
    await filing(jaro, "1601-C", "1601C", "2026-11");
    await filing(jaro, "0619-E", "0619E", "2026-11");
    await filing(jaro, "2550M", "0619E", "2026-11", "filed");
    await filing(molo, "1601-C", "1601C", "2026-11");

    // Tasks and requests.
    await db.query(
      `insert into public.staff_tasks (title, client_id, assigned_to, due_date, priority, status, done_at) values
         ('Sign engagement letter', $1, $2, '2026-12-01', 'high', 'open', null),
         ('Someone else''s task', $1, $3, '2026-12-01', 'normal', 'open', null),
         ('Already done', $1, $2, '2026-12-01', 'normal', 'done', now())`,
      [jaro, OWNER, STAFF],
    );
    await db.query(
      `insert into public.client_requests (client_id, direction, subject, due_date, assigned_to) values ($1, 'to_client', 'Send bank statements', '2026-12-01', $2), ($1, 'to_client', 'Not the Owner''s', '2026-12-01', $3)`,
      [molo, OWNER, STAFF],
    );

    // Registration cases with a target date.
    await db.query(
      `insert into public.registration_cases (client_id, kind, period_year, lgu_served, employer, lgu, target_date) values ($1, 'renewal', 2027, true, false, 'Iloilo City', '2026-12-01'), ($2, 'renewal', 2027, true, false, 'Iloilo City', '2026-12-01')`,
      [jaro, molo],
    );

    // The Chief of Staff: Jaro only, supervised by the Owner. A Document Clerk too.
    await db.query(
      `insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, books_level, enabled, supervisor_user_id) values
         ($1, $3, 'chief_of_staff', 'Chief of Staff', 'managing_partner', 'cowork', 'summary', true, $4),
         ($2, $3, 'document_clerk', 'Document Clerk', 'compliance', 'both', 'full', true, null)`,
      [CHIEF, CLERK, brand, OWNER],
    );
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $3), ($2, $3)`, [CHIEF, CLERK, jaro]);
    await db.query(`insert into public.ai_tool_grants (ai_user_id, tool) values ($1, 'my_schedule')`, [CHIEF]);
    await db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at) values ($1, $2, right($3, 4), '2026-11-01', '2027-02-01')`, [CHIEF, hashKey(key), key]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lists today's items for the Owner in one list, all-day items first, then by time in Manila", async () => {
    const r = await call();
    expect(r.result?.isError).toBeUndefined();
    const out = r.result!.structuredContent!;
    expect(out).toMatchObject({ from: "2026-12-01", to: "2026-12-01", for: "the Owner" });
    expect(out.items.map((i) => [i.kind, i.time, i.title, i.client])).toEqual([
      ["returns", null, "3 returns due: 0619-E, 1601-C ×2", null],
      ["registration", null, "Registration target date: renewal", "TC-9931 Jaro Trading"],
      ["task", null, "Sign engagement letter (high priority)", "TC-9931 Jaro Trading"],
      ["request", null, "Request to client: Send bank statements", null],
      ["call", "09:00–09:30", "Discovery call: Arevalo Bakery", null],
      ["meeting", "10:00–10:30", "Client meeting: Payroll", null],
      ["meeting", "14:00–15:00", "Client meeting: Year-end planning", "TC-9931 Jaro Trading"],
    ]);
    expect(out.items.find((i) => i.title.endsWith("Year-end planning"))?.place).toBe("https://meet.google.com/abc-defg-hij");
    expect(out.google_calendar).toMatch(/Google Calendar connector/);
  });

  it("covers up to 31 days, and refuses more or a backwards period", async () => {
    const month = (await call({ from: "2026-12-01", to: "2026-12-31" })).result!.structuredContent!;
    expect(month.items.filter((i) => i.kind === "meeting").map((i) => i.date)).toEqual(["2026-12-01", "2026-12-01", "2026-12-10"]);
    const tooLong = await call({ from: "2026-12-01", to: "2027-01-01" });
    expect(tooLong.result?.isError).toBe(true);
    expect(tooLong.result?.content[0].text).toMatch(/at most 31 days/);
    expect((await call({ from: "2026-12-05", to: "2026-12-01" })).result?.isError).toBe(true);
  });

  it("is the Owner's schedule even when the supervisor is someone else", async () => {
    await db.query(`update public.ai_employees set supervisor_user_id = $2 where user_id = $1`, [CHIEF, STAFF]);
    const items = (await call()).result!.structuredContent!.items;
    expect(items.some((i) => i.title.endsWith("Year-end planning"))).toBe(true);
    expect(items.some((i) => i.title.endsWith("Not the Owner's"))).toBe(false);
    await db.query(`update public.ai_employees set supervisor_user_id = $2 where user_id = $1`, [CHIEF, OWNER]);
  });

  it("only the switched-on Chief of Staff may call it", async () => {
    await expect(asAi(conn, CLERK, true, (q) => q.query(`select * from public.ai_my_schedule('2026-12-01', '2026-12-01')`))).rejects.toThrow(/Only the switched-on Chief of Staff/);
    await db.query(`update public.ai_employees set enabled = false where user_id = $1`, [CHIEF]);
    await expect(asAi(conn, CHIEF, true, (q) => q.query(`select * from public.ai_my_schedule('2026-12-01', '2026-12-01')`))).rejects.toThrow(/Only the switched-on Chief of Staff/);
    await db.query(`update public.ai_employees set enabled = true where user_id = $1`, [CHIEF]);
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [OWNER]);
    await db.query("set local role authenticated");
    await expect(db.query(`select * from public.ai_my_schedule('2026-12-01', '2026-12-01')`)).rejects.toThrow(/Only the switched-on Chief of Staff/);
    await db.query("rollback");
  });

  it("still cannot read or change the meetings, calls, tasks or requests themselves", async () => {
    const seen = await asAi(conn, CHIEF, true, async (q) => {
      const n = async (t: string) => (await q.query<{ n: number }>(`select count(*)::int as n from public.${t}`)).rows[0].n;
      return [await n("client_meetings"), await n("discovery_calls"), await n("staff_tasks"), await n("leads")];
    });
    expect(seen).toEqual([0, 0, 0, 0]);
    const changed = await asAi(conn, CHIEF, false, async (q) => [
      (await q.query(`update public.client_meetings set cancelled_at = now() returning id`).catch(() => ({ rows: [] }))).rows.length,
      (await q.query(`update public.staff_tasks set status = 'done', done_at = now() returning id`).catch(() => ({ rows: [] }))).rows.length,
    ]);
    expect(changed).toEqual([0, 0]);
    await expect(asAi(conn, CHIEF, false, (q) => q.query(`insert into public.staff_tasks (title, assigned_to) values ('x', $1)`, [OWNER]))).rejects.toThrow(/permission denied|row-level security/);
  });
});
