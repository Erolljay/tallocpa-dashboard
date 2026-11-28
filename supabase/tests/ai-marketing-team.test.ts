/**
 * The Marketing Team connector (migration 20270112000001, src/lib/marketing/ai-tools.ts;
 * docs/AI-WORKFORCE.md §3, §6, §7.2), end to end through the connector handler:
 *
 *   - its eight tools are listed once granted; the client-data tools are not for it at all;
 *   - it reads the firm's public facts, the active fee schedule, the leads (no email or
 *     mobile in the list; contact details only on one lead), the marketing report by
 *     month and channel, and the website copy; test leads are left out;
 *   - a lead that became a client shows only "converted", never the client's records;
 *   - proposals price only from the schedule; proposals and follow-ups are drafts with no
 *     client id, which only the Owner reads and decides;
 *   - the marketing functions refuse staff, client contacts and other AI employees;
 *   - it reads 0 rows of client data and leads directly and cannot change anything.
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
const DB_NAME = "ai_marketing_team_test";

const OWNER = "00000000-0000-0000-0000-00000000e501";
const REVIEWER = "00000000-0000-0000-0000-00000000e502";
const CLIENT_USER = "00000000-0000-0000-0000-00000000e503";
const TEAM = "00000000-0000-0000-0000-00000000e5a1";
const CHIEF = "00000000-0000-0000-0000-00000000e5a2";
// 10:00 AM, 10 March 2026 in Manila.
const NOW = new Date("2026-03-10T02:00:00Z");
const TOOLS = ["draft_follow_up", "draft_proposal", "fee_schedule", "firm_profile", "lead", "leads_pipeline", "marketing_report", "website_pages"];

describe.skipIf(!url)("AI Marketing Team: one connector for marketing, never client data", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let client: string;
  const lead: Record<string, string> = {};
  const key = newKey();
  let id = 0;

  type Reply = { result?: { isError?: boolean; structuredContent?: Record<string, unknown>; content: { text: string }[] }; error?: { message: string } };
  const call = async (name: string, args: Record<string, unknown> = {}) =>
    (await handleMcp(conn, { aiKey: "marketing_team", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name, arguments: args } }, now: NOW })).json as Reply;
  const ok = async (name: string, args: Record<string, unknown> = {}) => {
    const r = await call(name, args);
    expect(r.result?.isError, JSON.stringify(r)).toBeUndefined();
    return r.result!.structuredContent as Record<string, unknown>;
  };
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

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, REVIEWER, CLIENT_USER, TEAM, CHIEF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`update public.brands set cpa_license_no = '0123456', business_address = 'Iloilo City' where id = $1`, [brand]);
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Reviewer', 'reviewer')`, [OWNER, REVIEWER, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, status) values ($1, 'TC-9951', 'Arevalo Bakery Inc.', 'corporation', 'firm_remits', 'active') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Bakery owner')`, [CLIENT_USER, client]);

    // The active fee schedule.
    const sched = (await db.query(`insert into public.fee_schedules (brand_id, name, effective_from, status) values ($1, '2026 rates', '2026-01-01', 'draft') returning id`, [brand])).rows[0].id;
    await db.query(
      `insert into public.fee_items (schedule_id, code, component, label, band_label, billing, price, is_custom_quote, unit_label, sort_order) values
         ($1, 'D.10-29', 'D', 'Bookkeeping', '10–29 documents', 'monthly', 3500, false, null, 1),
         ($1, 'A.reg', 'A', 'BIR registration', null, 'one_time', 5000, false, null, 2),
         ($1, 'K.audit', 'K', 'Audit', null, 'one_time', null, true, null, 3)`,
      [sched],
    );
    // Activation checks every item has a price (the Owner's Activate does that); set it directly here.
    await db.query(`set session_replication_role = replica`);
    await db.query(`update public.fee_schedules set status = 'active', activated_at = now() where id = $1`, [sched]);
    await db.query(`set session_replication_role = origin`);
    // A campaign link with clicks.
    const link = (await db.query(`insert into public.marketing_links (brand_id, code, label, platform, campaign) values ($1, 'fb-feb', 'February post', 'facebook', 'tax-season') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.marketing_link_clicks (link_id, day, clicks) values ($1, '2026-02-10', 40), ($1, '2026-03-02', 10)`, [link]);
    const addLead = async (name: string, at: string, extra: Record<string, unknown> = {}) =>
      (
        await db.query(
          `insert into public.leads (brand_id, business_name, contact_name, email, mobile, taxpayer_type, services, quote, stage, lost_reason, test, client_id, marketing_link_id, created_at, message)
           values ($1, $2, 'Ana Cruz', $3, '09171234567', 'individual', '{bookkeeping}', $4::jsonb, $5, $6, $7, $8, $9, $10, 'Need help with books')
           returning id`,
          [brand, name, `${name.toLowerCase().replace(/\W+/g, "")}@example.com`, JSON.stringify({ monthlyRetainer: 3500 }), extra.stage ?? "lead", extra.lost ?? null, extra.test ?? false, extra.client ?? null, extra.link ?? null, at],
        )
      ).rows[0].id as string;
    // Leads in their stages directly (the funnel's own triggers move them step by step).
    await db.query(`set session_replication_role = replica`);
    lead.molo = await addLead("Molo Sari-Sari", "2026-02-12T02:00:00Z", { link });
    lead.jaro = await addLead("Jaro Printing", "2026-03-03T02:00:00Z");
    lead.won = await addLead("Arevalo Bakery", "2026-01-15T02:00:00Z", { stage: "won", client });
    lead.test = await addLead("Staff test", "2026-03-05T02:00:00Z", { test: true });
    await db.query(`set session_replication_role = origin`);

    await db.query(
      `insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, books_level, all_clients, client_data, enabled) values
         ($1, $3, 'marketing_team', 'Marketing Team', 'marketing', 'claude_code', 'none', false, false, true),
         ($2, $3, 'chief_of_staff', 'Chief of Staff', 'managing_partner', 'cowork', 'summary', true, true, true)`,
      [TEAM, CHIEF, brand],
    );
    await db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at) values ($1, $2, right($3, 4), '2026-01-01', '2026-06-01')`, [TEAM, hashKey(key), key]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lists its eight tools once granted, and no client tool even when granted", async () => {
    expect((await call("leads_pipeline")).error?.message).toMatch(/Unknown tool/);
    const all = [...TOOLS, "list_my_clients", "get_client", "upcoming_filings", "trial_balance", "receivables_aging", "documents_to_review"];
    for (const t of all) await db.query(`insert into public.ai_tool_grants (ai_user_id, tool) values ($1, $2)`, [TEAM, t]);
    const r = await handleMcp(conn, { aiKey: "marketing_team", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/list" }, now: NOW });
    const tools = (r.json as { result: { tools: { name: string }[] } }).result.tools.map((t) => t.name).sort();
    expect(tools).toEqual(TOOLS);
    for (const t of ["list_my_clients", "get_client", "upcoming_filings", "trial_balance", "receivables_aging", "documents_to_review"]) {
      expect((await call(t, t === "get_client" ? { client: "TC-9951" } : {})).error?.message, t).toMatch(/Unknown tool/);
    }
  });

  it("gives the marketing house rules in its instructions and resources", async () => {
    const init = await handleMcp(conn, { aiKey: "marketing_team", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "1" } } }, now: NOW });
    expect(JSON.stringify(init.json)).toMatch(/never see client data/);
    const rules = await handleMcp(conn, { aiKey: "marketing_team", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "resources/read", params: { uri: "tallocpa://ai/house-rules" } }, now: NOW });
    expect(JSON.stringify(rules.json)).toMatch(/Never promise or imply a tax result/);
  });

  it("reads the firm's public facts, the fee schedule and the website", async () => {
    const p = await ok("firm_profile");
    expect(p.from_settings).toMatchObject({ cpa_license_no: "0123456", business_address: "Iloilo City" });
    expect((p.services as unknown[]).length).toBeGreaterThan(3);
    const f = await ok("fee_schedule");
    expect(f).toMatchObject({ active: true, name: "2026 rates" });
    expect((f.items as { code: string }[]).map((i) => i.code)).toEqual(["A.reg", "D.10-29", "K.audit"]);
    const w = await ok("website_pages");
    expect((w.pages as unknown[]).length).toBeGreaterThan(3);
    expect((w.faqs as unknown[]).length).toBeGreaterThan(0);
  });

  it("lists the pipeline without contact details or test leads, and a converted lead only as converted", async () => {
    const r = await ok("leads_pipeline");
    const leads = r.leads as { id: string; business: string; channel: string; converted: boolean }[];
    expect(leads.map((l) => l.business)).toEqual(["Jaro Printing", "Molo Sari-Sari", "Arevalo Bakery"]);
    expect(leads.find((l) => l.business === "Molo Sari-Sari")?.channel).toBe("facebook");
    expect(leads.find((l) => l.business === "Arevalo Bakery")?.converted).toBe(true);
    expect(JSON.stringify(r)).not.toMatch(/@example\.com|09171234567|Staff test|Arevalo Bakery Inc\.|TC-9951/);
    expect(r.by_stage).toEqual({ lead: 2, won: 1 });
    expect(((await ok("leads_pipeline", { stage: "won" })).leads as unknown[]).length).toBe(1);

    const one = await ok("lead", { lead_id: lead.jaro });
    expect(one).toMatchObject({ business_name: "Jaro Printing", email: "jaroprinting@example.com", mobile: "09171234567", converted: false });
    const won = await ok("lead", { lead_id: lead.won });
    expect(won.converted).toBe(true);
    expect(JSON.stringify(won)).not.toMatch(/TC-9951|Arevalo Bakery Inc\.|client_id/);
    expect((await call("lead", { lead_id: lead.test })).result?.isError).toBe(true);
  });

  it("reports leads and clicks by month and channel", async () => {
    const r = await ok("marketing_report", { from: "2026-01-01", to: "2026-03-31" });
    expect(r.totals).toMatchObject({ clicks: 50, leads: 3, won: 1 });
    const lines = r.lines as { month: string; channel: string; clicks: number; leads: number }[];
    expect(lines.filter((l) => l.channel === "facebook").map((l) => [l.month, l.clicks, l.leads])).toEqual([["2026-02", 40, 1], ["2026-03", 10, 0]]);
  });

  it("drafts a proposal priced from the schedule and a follow-up, for the Owner only", async () => {
    const p = await ok("draft_proposal", {
      lead_id: lead.jaro,
      lines: [{ code: "D.10-29" }, { code: "A.reg" }, { code: "K.audit" }],
      cover_message: "Thank you for asking about our bookkeeping. Here is our proposal for monthly books and your BIR registration.",
      reason: "They asked about bookkeeping and are not yet registered.",
    });
    expect(p.saved).toBe(true);
    const bad = await call("draft_proposal", { lead_id: lead.jaro, lines: [{ code: "Z.none" }], cover_message: "x".repeat(50), reason: "Testing an unknown item." });
    expect(bad.result?.content[0].text).toMatch(/No fee item Z\.none/);
    const toClient = await call("draft_proposal", { lead_id: lead.won, lines: [{ code: "D.10-29" }], cover_message: "x".repeat(50), reason: "Testing a converted lead." });
    expect(toClient.result?.content[0].text).toMatch(/already a client/);
    expect((await ok("draft_follow_up", { lead_id: lead.molo, channel: "email", subject: "Your quote", message: "Hi Ana, following up on the quote you asked for.", reason: "No reply in 3 weeks." })).saved).toBe(true);

    const { rows } = await db.query(`select kind, client_id, subject_table, subject_id, payload->'totals' as totals from public.ai_drafts order by created_at`);
    expect(rows.map((r) => [r.kind, r.client_id, r.subject_table])).toEqual([["proposal", null, "leads"], ["lead_follow_up", null, "leads"]]);
    expect(rows[0].totals).toMatchObject({ monthly: 3500, one_time: 5000, first_year: 47000, on_request: ["K.audit Audit"] });
    expect((await as(OWNER, `select count(*)::int as n from public.ai_drafts`)).rows[0].n).toBe(2);
    expect((await as(REVIEWER, `select count(*)::int as n from public.ai_drafts`)).rows[0].n).toBe(0);
  });

  it("the marketing functions answer only the switched-on Marketing Team", async () => {
    for (const who of [OWNER, REVIEWER, CLIENT_USER, CHIEF]) {
      for (const sql of [`select public.ai_leads()`, `select public.ai_fee_schedule()`, `select public.ai_marketing_profile()`, `select public.ai_marketing_report('2026-01-01', '2026-03-31')`]) {
        await expect(as(who, sql), `${who} ${sql}`).rejects.toThrow(/Only the switched-on Marketing Team/);
      }
    }
    await db.query(`update public.ai_employees set enabled = false where user_id = $1`, [TEAM]);
    await expect(as(TEAM, `select public.ai_leads()`)).rejects.toThrow(/Only the switched-on Marketing Team/);
    await db.query(`update public.ai_employees set enabled = true where user_id = $1`, [TEAM]);
  });

  it("reads no client data or leads directly, and changes nothing", async () => {
    const counts = await asAi(conn, TEAM, true, async (q) => {
      const out: Record<string, number> = {};
      for (const t of ["clients", "client_users", "documents", "filing_instances", "journal_entries", "soas", "client_dues", "leads", "proposals", "fee_items", "marketing_links"]) {
        out[t] = Number((await q.query<{ n: string }>(`select count(*) as n from public.${t}`)).rows[0].n);
      }
      return out;
    });
    for (const [t, n] of Object.entries(counts)) expect(n, t).toBe(0);
    const changed = await asAi(conn, TEAM, false, async (q) => [
      (await q.query(`update public.leads set stage = 'lost', lost_reason = 'x' returning id`)).rows.length,
      (await q.query(`update public.fee_items set price = 1 returning id`)).rows.length,
    ]);
    expect(changed).toEqual([0, 0]);
    await expect(asAi(conn, TEAM, false, (q) => q.query(`insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type) select id, 'x', 'x', 'x@x.com', 'individual' from public.brands limit 1`))).rejects.toThrow(/row-level security|permission/);
    await expect(asAi(conn, TEAM, false, (q) => q.query(`select public.create_proposal($1, '{}'::jsonb, 'terms', 1, 1, '2026-04-01')`, [lead.jaro]))).rejects.toThrow();
  });
});
