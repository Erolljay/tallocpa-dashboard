/**
 * The TalloCPA OS MCP server end to end (src/lib/mcp/handler.ts; docs/AI-WORKFORCE.md
 * §5, §7) on a real database, through the same handler the /api/mcp/<key> route uses:
 *
 *   - only a live key of the AI employee in the address gets in; revoked, expired,
 *     unknown, another employee's key, or a switched-off employee are refused;
 *   - it sees and calls only the tools for its job that the Owner granted;
 *   - each tool runs as the AI employee under row-level security, in a read-only
 *     transaction: it reads only its clients, the books only at Summary or Full;
 *   - the daily limit stops it, and every call is logged with its client.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashKey, newKey } from "../../src/lib/ai/credentials";
import { templatePayload } from "../../src/lib/ledger/coa";
import { asAi, handleMcp } from "../../src/lib/mcp/handler";
import type { Connector } from "../../src/lib/mcp/types";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_connector_test";

const OWNER = "00000000-0000-0000-0000-00000000b101";
const PREPARER = "00000000-0000-0000-0000-00000000b102";
const CLERK = "00000000-0000-0000-0000-00000000b1a1";
const WRITER = "00000000-0000-0000-0000-00000000b1a2";
const NOW = new Date("2026-02-01T02:00:00Z");

describe.skipIf(!url)("AI connector: keys, grants, row-level security, limits and the log", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let brand: string;
  let jaro: string;
  let molo: string;
  const key = { clerk: newKey(), writer: newKey(), revoked: newKey(), expired: newKey() };
  let id = 0;

  const rpc = (aiKey: string, token: string | null, method: string, params?: Record<string, unknown>, now = NOW) =>
    handleMcp(conn, { aiKey, authorization: token ? `Bearer ${token}` : null, body: { jsonrpc: "2.0", id: ++id, method, ...(params ? { params } : {}) }, now });
  const call = async (name: string, args: Record<string, unknown> = {}, token = key.clerk, aiKey = "document_clerk") => {
    const r = await rpc(aiKey, token, "tools/call", { name, arguments: args });
    return r.json as { result?: { isError?: boolean; structuredContent?: Record<string, unknown>; content: { text: string }[] }; error?: { code: number; message: string } };
  };
  const grant = (ai: string, ...tools: string[]) => db.query(`insert into public.ai_tool_grants (ai_user_id, tool) select $1, unnest($2::text[]) on conflict do nothing`, [ai, tools]);
  const setClerk = (fields: Record<string, unknown>) => {
    const keys = Object.keys(fields);
    return db.query(`update public.ai_employees set ${keys.map((k, i) => `${k} = $${i + 2}`).join(", ")} where user_id = $1`, [CLERK, ...keys.map((k) => fields[k])]);
  };
  const lastActivity = async () => (await db.query(`select tool, outcome, client_id from public.ai_activity order by id desc limit 1`)).rows[0];

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

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, PREPARER, CLERK, WRITER]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Preparer', 'staff')`, [OWNER, PREPARER, brand]);
    jaro = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, tin) values ($1, 'TC-9941', 'Jaro Trading', 'corporation', 'firm_remits', '123-456-789-000') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9942', 'Molo Foods', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    for (const c of [jaro, molo]) {
      await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [c, PREPARER]);
      await db.query("begin");
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [PREPARER]);
      await db.query("set local role authenticated");
      await db.query(`select public.setup_books($1, 'stock_corporation', '2026-01-01', $2)`, [c, JSON.stringify(templatePayload("stock_corporation"))]);
      const pick = async (type: string) => (await db.query(`select id from public.ledger_accounts where client_id = $1 and type = $2 and control is null order by code limit 1`, [c, type])).rows[0].id;
      const [cash, capital] = [await pick("asset"), await pick("equity")];
      await db.query(`select public.post_journal_entry($1, '2026-01-15', 'Opening cash', 'JV-1', $2)`, [c, JSON.stringify([{ account_id: cash, debit: "5000", credit: "0" }, { account_id: capital, debit: "0", credit: "5000" }])]);
      await db.query("commit");
      const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '0619E', 'monthly', '2020-01-01') returning id`, [c])).rows[0].id;
      await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date)
         values ($1, $2, '0619-E', '2026-01', '2026-01-01', '2026-01-31', '0619E', '2026-02-10', '2026-02-10')`,
        [ob, c],
      );
    }
    await db.query(
      `insert into public.ai_employees (user_id, brand_id, key, name, department, job, runs_on, books_level, enabled, daily_limit) values
       ($1, $3, 'document_clerk', 'Document Clerk', 'compliance', 'Reads documents.', 'both', 'full', true, 100),
       ($2, $3, 'content_writer', 'Content Writer', 'marketing', 'Writes articles.', 'cowork', 'none', true, 100)`,
      [CLERK, WRITER, brand],
    );
    await db.query(`update public.ai_employees set client_data = false where user_id = $1`, [WRITER]);
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [CLERK, jaro]);
    const addKey = (ai: string, k: string, expires: string, revoked: string | null = null) =>
      db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at, revoked_at) values ($1, $2, right($3, 4), '2026-01-01', $4, $5)`, [ai, hashKey(k), k, expires, revoked]);
    await addKey(CLERK, key.clerk, "2026-06-01");
    await addKey(WRITER, key.writer, "2026-06-01");
    await addKey(CLERK, key.revoked, "2026-06-01", "2026-01-20");
    await addKey(CLERK, key.expired, "2026-01-31");
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("signing in with a key", () => {
    it("refuses no key, a malformed key, an unknown, revoked or expired key", async () => {
      for (const token of [null, "not-a-key", newKey(), key.revoked, key.expired]) {
        const r = await rpc("document_clerk", token, "ping");
        expect(r.status, String(token)).toBe(401);
        expect(r.headers?.["WWW-Authenticate"]).toMatch(/Bearer/);
      }
    });

    it("refuses a key used at another AI employee's address", async () => {
      expect((await rpc("content_writer", key.clerk, "ping")).status).toBe(403);
      expect((await rpc("document_clerk", key.writer, "ping")).status).toBe(403);
    });

    it("lets a switched-off AI employee in with no tools and a plain explanation, and refuses every call", async () => {
      await setClerk({ enabled: false });
      const init = await rpc("document_clerk", key.clerk, "initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "1" } });
      expect(init.status).toBe(200);
      expect((init.json as { result: { instructions: string } }).result.instructions).toMatch(/Document Clerk is switched off.*Settings → AI employees/);
      expect((await rpc("document_clerk", key.clerk, "tools/list")).json).toMatchObject({ result: { tools: [] } });
      const refused = await call("whoami");
      expect(refused.result?.isError).toBe(true);
      expect(refused.result?.content[0].text).toMatch(/switched off/);
      expect(await lastActivity()).toMatchObject({ tool: "whoami", outcome: "refused" });
      await setClerk({ enabled: true });
      expect(await rpc("document_clerk", key.clerk, "ping")).toMatchObject({ status: 200, json: { result: {} } });
    });

    it("answers initialize and notes when the key was last used", async () => {
      const r = await rpc("document_clerk", key.clerk, "initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "1" } });
      expect(r.json).toMatchObject({ result: { protocolVersion: "2025-06-18", serverInfo: { name: "tallocpa-os" } } });
      expect((await db.query(`select last_used_at from public.ai_credentials where token_hash = $1`, [hashKey(key.clerk)])).rows[0].last_used_at).not.toBeNull();
      const note = await handleMcp(conn, { aiKey: "document_clerk", authorization: `Bearer ${key.clerk}`, body: { jsonrpc: "2.0", method: "notifications/initialized" }, now: NOW });
      expect(note).toEqual({ status: 202 });
    });
  });

  describe("tools", () => {
    it("lists no tools until the Owner grants them, then only those for its job", async () => {
      expect((await rpc("document_clerk", key.clerk, "tools/list")).json).toMatchObject({ result: { tools: [] } });
      const init = (await rpc("document_clerk", key.clerk, "initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "1" } })).json as { result: { instructions: string } };
      expect(init.result.instructions).toMatch(/No tools are granted to you yet.*Connector → Tools/);
      expect((await call("whoami")).error?.message).toMatch(/Unknown tool/);
      expect((await lastActivity()).outcome).toBe("refused");
      await grant(CLERK, "whoami", "list_my_clients", "get_client", "upcoming_filings", "trial_balance");
      const tools = ((await rpc("document_clerk", key.clerk, "tools/list")).json as { result: { tools: { name: string }[] } }).result.tools.map((t) => t.name);
      expect(tools.sort()).toEqual(["get_client", "list_my_clients", "trial_balance", "upcoming_filings", "whoami"]);
    });

    it("never offers marketing a client tool, even if granted", async () => {
      await grant(WRITER, "whoami", "list_my_clients", "trial_balance");
      const tools = ((await rpc("content_writer", key.writer, "tools/list")).json as { result: { tools: { name: string }[] } }).result.tools.map((t) => t.name);
      expect(tools).toEqual(["whoami"]);
      expect((await call("list_my_clients", {}, key.writer, "content_writer")).error?.message).toMatch(/Unknown tool/);
    });

    it("whoami describes the AI employee and its grants", async () => {
      const r = await call("whoami");
      expect(r.result?.structuredContent).toMatchObject({ name: "Document Clerk", department: "Tax Compliance & Bookkeeping", books_access: "Full", assigned_clients: 1 });
    });

    it("lists only its assigned clients and opens only those", async () => {
      expect((await call("list_my_clients")).result?.structuredContent?.clients).toEqual([
        expect.objectContaining({ code: "TC-9941", name: "Jaro Trading", tin: "123-456-789-000" }),
      ]);
      const mine = await call("get_client", { client: "tc-9941" });
      expect(mine.result?.structuredContent).toMatchObject({ client: { name: "Jaro Trading" }, returns: [{ form: "0619E" }] });
      expect(await lastActivity()).toEqual({ tool: "get_client", outcome: "ok", client_id: jaro });
      const other = await call("get_client", { client: "TC-9942" });
      expect(other.result?.isError).toBe(true);
      expect(other.result?.content[0].text).toMatch(/No client "TC-9942"/);
      expect((await lastActivity()).outcome).toBe("refused");
      expect((await call("get_client", { client: molo })).result?.isError).toBe(true);
    });

    it("lists its clients' returns due soon, and checks the input", async () => {
      const r = await call("upcoming_filings", { days: 30 });
      expect(r.result?.structuredContent).toMatchObject({ today: "2026-02-01", returns: [{ client_code: "TC-9941", form: "0619-E", due_date: "2026-02-10", overdue: false }] });
      const bad = await call("upcoming_filings", { days: 9999 });
      expect(bad.result?.isError).toBe(true);
      expect(bad.result?.content[0].text).toMatch(/Invalid input: days/);
    });

    it("gives the trial balance at Full or Summary access, and refuses it at None", async () => {
      for (const level of ["full", "summary"]) {
        await setClerk({ books_level: level });
        const r = await call("trial_balance", { client: "TC-9941", from: "2026-01-01", to: "2026-01-31" });
        const moved = (r.result?.structuredContent?.accounts as { debit: string; credit: string }[]).filter((a) => Number(a.debit) || Number(a.credit));
        expect(moved.map((a) => [Number(a.debit), Number(a.credit)]).sort(), level).toEqual([[0, 5000], [5000, 0]]);
      }
      await setClerk({ books_level: "none" });
      const none = await call("trial_balance", { client: "TC-9941", from: "2026-01-01", to: "2026-01-31" });
      expect(none.result?.isError).toBe(true);
      expect(none.result?.content[0].text).toMatch(/No books access/);
      expect((await lastActivity()).outcome).toBe("refused");
      await setClerk({ books_level: "full" });
    });

    it("runs tools as the AI employee in a read-only transaction", async () => {
      const who = await asAi(conn, CLERK, true, async (q) => (await q.query(`select auth.uid()::text as uid, current_user as role`)).rows[0]);
      expect(who).toEqual({ uid: CLERK, role: "authenticated" });
      await expect(asAi(conn, CLERK, true, (q) => q.query(`insert into public.ai_activity (ai_user_id, tool, outcome) values ($1, 'x', 'ok')`, [CLERK]))).rejects.toThrow(/read-only/);
      expect((await db.query(`select current_user as role`)).rows[0].role).not.toBe("authenticated");
    });
  });

  describe("limits and the log", () => {
    it("logs every call with its outcome", async () => {
      const { rows } = await db.query(`select outcome, count(*)::int as n from public.ai_activity where ai_user_id = $1 group by 1`, [CLERK]);
      const by = Object.fromEntries(rows.map((r) => [r.outcome, r.n]));
      expect(by.ok).toBeGreaterThan(3);
      expect(by.refused).toBeGreaterThan(2);
    });

    it("stops at the daily limit, and starts again the next day in Manila", async () => {
      const today = (await db.query(`select count(*)::int as n from public.ai_activity where ai_user_id = $1`, [CLERK])).rows[0].n;
      await setClerk({ daily_limit: today });
      const r = await call("whoami");
      expect(r.result?.isError).toBe(true);
      expect(r.result?.content[0].text).toMatch(/Daily limit reached/);
      const tomorrow = await rpc("document_clerk", key.clerk, "tools/call", { name: "whoami", arguments: {} }, new Date("2026-02-01T16:30:00Z"));
      expect((tomorrow.json as { result: { isError?: boolean } }).result.isError).toBeUndefined();
      await setClerk({ daily_limit: 100 });
    });
  });
});
