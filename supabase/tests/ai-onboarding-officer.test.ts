/**
 * The Onboarding Officer's connector tools (migration 20270108000003,
 * src/lib/onboarding/ai-tools.ts; docs/AI-WORKFORCE.md §3, §7.2), end to end through the
 * MCP handler on a real database:
 *
 *   - its tools are listed only when granted, and only for its clients;
 *   - the checklist it reads is the one staff see (the app's own onboardingChecklist());
 *   - ai_onboarding_facts() and ai_staff_load() refuse staff, strangers, switched-off and
 *     marketing AI employees, and staff load carries no emails or user ids;
 *   - its drafts land on the client for staff on the client to decide; opening balances
 *     that do not balance, unknown staff and other clients are refused.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashKey, newKey } from "../../src/lib/ai/credentials";
import { handleMcp } from "../../src/lib/mcp/handler";
import type { Connector } from "../../src/lib/mcp/types";
import { onboardingChecklist } from "../../src/lib/onboarding/checklist";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_onboarding_officer_test";

const OWNER = "00000000-0000-0000-0000-00000000e201";
const PREPARER = "00000000-0000-0000-0000-00000000e202";
const REVIEWER = "00000000-0000-0000-0000-00000000e203";
const STRANGER = "00000000-0000-0000-0000-00000000e204";
const CONTACT = "00000000-0000-0000-0000-00000000e205";
const OFFICER = "00000000-0000-0000-0000-00000000e2a1";
const WRITER = "00000000-0000-0000-0000-00000000e2a2";
const NOW = new Date("2026-02-02T02:00:00Z");
const TOOLS = ["onboarding_clients", "onboarding_checklist", "staff_for_team", "draft_onboarding_item"];

describe.skipIf(!url)("AI Onboarding Officer: checklist, staff load and drafts", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let jaro: string;
  let molo: string;
  const key = newKey();
  let id = 0;

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
  const rpc = (method: string, params?: Record<string, unknown>) =>
    handleMcp(conn, { aiKey: "onboarding_officer", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method, ...(params ? { params } : {}) }, now: NOW });
  const call = async (name: string, args: Record<string, unknown> = {}) =>
    ((await rpc("tools/call", { name, arguments: args })).json as { result?: { isError?: boolean; structuredContent?: Record<string, unknown>; content: { text: string }[] }; error?: { message: string } });

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

    await db.query(`insert into auth.users (id, email, last_sign_in_at) values ($1, null, null), ($2, null, null), ($3, null, null), ($4, null, null), ($5, 'jaro@example.com', now()), ($6, null, null), ($7, null, null)`, [OWNER, PREPARER, REVIEWER, STRANGER, CONTACT, OFFICER, WRITER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role, capacity_points) values ($1, $4, 'Owner Tallo', 'owner', 60), ($2, $4, 'Ana Cruz', 'staff', 60), ($3, $4, 'Ben Reyes', 'reviewer', 80)`,
      [OWNER, PREPARER, REVIEWER, brand],
    );
    jaro = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, status, tin, rdo_code) values ($1, 'TC-9961', 'Jaro Trading', 'corporation', 'firm_remits', 'onboarding', '123-456-789-000', '074') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, status) values ($1, 'TC-9962', 'Molo Foods', 'corporation', 'firm_remits', 'onboarding') returning id`, [brand])).rows[0].id;
    // Jaro: engagement, a contract not yet dated, the COR read, 2 returns, a preparer, a portal contact who signed in, a kickoff tick.
    await db.query(`insert into public.engagements (client_id, service_line, monthly_retainer, start_date, status) values ($1, 'tax_compliance', 5000, '2026-01-01', 'active')`, [jaro]);
    await db.query(`insert into public.client_files (client_id, kind, title, file_name, storage_path, mime_type, size_bytes, uploaded_by) values ($1, 'contract', 'Engagement letter', 'letter.pdf', 'x/letter.pdf', 'application/pdf', 100, $2)`, [jaro, OWNER]);
    await db.query(`insert into public.client_registrations (client_id, tax_types, registration_date) values ($1, '["IT","VAT"]'::jsonb, '2026-01-05')`, [jaro]);
    await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2026-01-01'), ($1, '1702Q', 'quarterly', '2026-01-01')`, [jaro]);
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [jaro, PREPARER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Jaro owner')`, [CONTACT, jaro]);
    await db.query(`insert into public.onboarding_ticks (client_id, item, note, done_by) values ($1, 'kickoff', 'Met on site', $2)`, [jaro, OWNER]);

    await db.query(
      `insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, books_level, enabled, client_data) values
       ($1, $3, 'onboarding_officer', 'Onboarding Officer', 'client_services', 'both', 'full', true, true),
       ($2, $3, 'content_writer', 'Content Writer', 'marketing', 'cowork', 'none', true, false)`,
      [OFFICER, WRITER, brand],
    );
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [OFFICER, jaro]);
    await db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at) values ($1, $2, right($3, 4), '2026-01-01', '2026-06-01')`, [OFFICER, hashKey(key), key]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lists its tools only once the Owner grants them", async () => {
    expect((await rpc("tools/list")).json).toMatchObject({ result: { tools: [] } });
    await db.query(`insert into public.ai_tool_grants (ai_user_id, tool) select $1, unnest($2::text[])`, [OFFICER, TOOLS]);
    const names = ((await rpc("tools/list")).json as { result: { tools: { name: string }[] } }).result.tools.map((t) => t.name);
    expect(names.filter((n) => TOOLS.includes(n)).sort()).toEqual([...TOOLS].sort());
  });

  it("lists only its own clients being onboarded, with progress", async () => {
    const r = (await call("onboarding_clients")).result?.structuredContent as { clients: { code: string; done: number; total: number; next: string[] }[] };
    expect(r.clients.map((c) => c.code)).toEqual(["TC-9961"]);
    expect(r.clients[0].done).toBeLessThan(r.clients[0].total);
    expect(r.clients[0].next.length).toBeGreaterThan(0);
  });

  it("reads the same checklist staff see, with the COR facts", async () => {
    const r = (await call("onboarding_checklist", { client: "tc-9961" })).result?.structuredContent as {
      checklist: { key: string; state: string }[];
      registration: { tax_types: string[]; returns: { form: string }[] };
      engagements: { monthly_retainer: number }[];
      client: { rdo_code: string };
    };
    const expected = onboardingChecklist({
      clientId: jaro,
      files: { proposal: 0, contract: 1, contractSigned: false },
      engagementActive: true,
      corRecorded: true,
      obligations: 2,
      hasPayrollObligation: false,
      preparer: true,
      reviewer: false,
      portalUsers: 1,
      portalSignedIn: true,
      booksStart: null,
      openingPosted: false,
      yearStartMonth: 1,
      batchUploads: 0,
      employees: 0,
      ticks: new Map([["kickoff", { by: OWNER, at: "2026-02-02", note: null }]]),
    });
    expect(Object.fromEntries(r.checklist.map((i) => [i.key, i.state]))).toEqual(Object.fromEntries(expected.map((i) => [i.key, i.state])));
    expect(r.registration.tax_types).toEqual(["IT", "VAT"]);
    expect(r.registration.returns.map((x) => x.form)).toEqual(["1702Q", "2550Q"]);
    expect(r.client.rdo_code).toBe("074");
    expect(Number(r.engagements[0].monthly_retainer)).toBe(5000);
  });

  it("cannot read another client's checklist", async () => {
    const r = await call("onboarding_checklist", { client: "TC-9962" });
    expect(r.result?.isError).toBe(true);
    await expect(as(OFFICER, `select public.ai_onboarding_facts($1)`, [molo])).rejects.toThrow(/Not one of your clients/);
  });

  it("gets staff load without emails or user ids", async () => {
    const r = (await call("staff_for_team")).result?.structuredContent as { staff: Record<string, unknown>[] };
    expect(Object.keys(r.staff[0]).sort()).toEqual(["branch", "capacity", "clients", "full_name", "load", "role"]);
    expect(r.staff.find((s) => s.full_name === "Ana Cruz")).toMatchObject({ role: "staff", load: 5, clients: 1, capacity: 60 });
    expect(r.staff.find((s) => s.full_name === "Ben Reyes")).toMatchObject({ load: 0, clients: 0 });
  });

  it("refuses the facts and staff load to staff, strangers, contacts, marketing and a switched-off AI employee", async () => {
    for (const who of [PREPARER, STRANGER, CONTACT, WRITER]) {
      await expect(as(who, `select * from public.ai_staff_load()`), who).rejects.toThrow(/Only a switched-on AI employee/);
      await expect(as(who, `select public.ai_onboarding_facts($1)`, [jaro]), who).rejects.toThrow(/Only a switched-on AI employee/);
    }
    await db.query(`update public.ai_employees set enabled = false where user_id = $1`, [OFFICER]);
    await expect(as(OFFICER, `select * from public.ai_staff_load()`)).rejects.toThrow(/Only a switched-on AI employee/);
    await db.query(`update public.ai_employees set enabled = true where user_id = $1`, [OFFICER]);
  });

  it("refuses opening balances that do not balance, and staff who do not exist", async () => {
    const bad = await call("draft_onboarding_item", {
      kind: "opening_balances",
      client: "TC-9961",
      reason: "From the 2025 AFS.",
      opening_balances: { as_of: "2025-12-31", lines: [{ account_code: "1010", debit: 1000 }, { account_code: "3010", credit: 900 }] },
    });
    expect(bad.result?.isError).toBe(true);
    expect(bad.result?.content[0].text).toMatch(/do not balance/);
    const ghost = await call("draft_onboarding_item", { kind: "team", client: "TC-9961", reason: "x", team: { preparer: "Ana Cruz", reviewer: "Nobody Here" } });
    expect(ghost.result?.content[0].text).toMatch(/not an active member of staff/);
    expect((await db.query(`select count(*)::int as n from public.ai_drafts`)).rows[0].n).toBe(0);
  });

  it("saves drafts on the client for staff on the client to decide", async () => {
    const ok = await call("draft_onboarding_item", { kind: "team", client: "TC-9961", reason: "Ben has the lightest load.", team: { preparer: "Ana Cruz", reviewer: "Ben Reyes" } });
    expect(ok.result?.isError).toBeUndefined();
    const ob = await call("draft_onboarding_item", {
      kind: "opening_balances",
      client: "TC-9961",
      reason: "From the 2025 AFS.",
      opening_balances: { as_of: "2025-12-31", lines: [{ account_code: "1010", debit: 1000.5 }, { account_code: "3010", credit: 1000.5 }], source: "2025 AFS" },
    });
    expect(ob.result?.isError).toBeUndefined();
    const { rows } = await as(PREPARER, `select kind, subject_table, subject_id::text, status, note, payload->'summary'->0->>'value' as first from public.ai_drafts order by kind`);
    expect(rows).toEqual([
      { kind: "opening_balances", subject_table: "clients", subject_id: jaro, status: "open", note: "From the 2025 AFS.", first: "2025-12-31" },
      { kind: "team", subject_table: "clients", subject_id: jaro, status: "open", note: "Ben has the lightest load.", first: "Ana Cruz" },
    ]);
    expect((await as(REVIEWER, `select count(*)::int as n from public.ai_drafts`)).rows[0].n).toBe(0);
  });

  it("refuses a draft for another client", async () => {
    const r = await call("draft_onboarding_item", { kind: "kickoff_brief", client: "TC-9962", reason: "x", kickoff_brief: { text: "Hello" } });
    expect(r.result?.isError).toBe(true);
    expect((await db.query(`select count(*)::int as n from public.ai_drafts where client_id = $1`, [molo])).rows[0].n).toBe(0);
  });
});
