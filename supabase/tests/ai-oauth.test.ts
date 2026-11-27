/**
 * OAuth sign-in for Claude connectors (step 2b; migration 20270107000003,
 * src/lib/oauth/*), end to end on a real database:
 *
 *   register the app → the Owner approves on the consent page (a code) → the app trades
 *   the code and its PKCE verifier for tokens → the access token works on the connector
 *   for that AI employee only → refresh rotates → disconnecting stops everything.
 *
 * And every way it must fail: staff cannot approve, codes work once, PKCE must match,
 * codes and refresh tokens belong to one app, old refresh tokens stop working, a
 * disconnected connection cannot be restored, and a 401 says where to sign in.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { createHash, randomBytes } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { handleMcp } from "../../src/lib/mcp/handler";
import type { Connector } from "../../src/lib/mcp/types";
import { registerEndpoint, tokenEndpoint } from "../../src/lib/oauth/endpoints";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_oauth_test";
const ORIGIN = "https://app.tallocpa.com";
const CALLBACK = "https://claude.ai/api/mcp/auth_callback";

const OWNER = "00000000-0000-0000-0000-00000000c101";
const REVIEWER = "00000000-0000-0000-0000-00000000c102";
const CLERK = "00000000-0000-0000-0000-00000000c1a1";
const NOW = new Date("2026-03-02T01:00:00Z");
const later = (seconds: number) => new Date(NOW.getTime() + seconds * 1000);
const sha = (s: string) => createHash("sha256").update(s).digest("hex");

describe.skipIf(!url)("AI connector OAuth: register, consent, tokens, refresh, disconnect", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let clientId: string;
  let otherClient: string;
  let access: string;
  let refresh: string;

  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");

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
  /** What the consent page's Allow does: the Owner stores a code (as the Owner, under RLS). */
  async function approve(by = OWNER, client = clientId, ch = challenge) {
    const code = "tcac_" + randomBytes(32).toString("base64url");
    await as(
      by,
      `insert into public.oauth_codes (code_hash, client_id, ai_user_id, redirect_uri, code_challenge, resource, approved_by, created_at, expires_at)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [sha(code), client, CLERK, CALLBACK, ch, `${ORIGIN}/api/mcp/document_clerk`, by, NOW.toISOString(), later(300).toISOString()],
    );
    return code;
  }
  const exchange = (fields: Record<string, string>, now = NOW) => tokenEndpoint(conn, new URLSearchParams(fields), now);
  const codeForm = (code: string, over: Record<string, string> = {}) => ({ grant_type: "authorization_code", code, code_verifier: verifier, redirect_uri: CALLBACK, client_id: clientId, ...over });
  const mcp = (token: string | null, aiKey = "document_clerk", now = NOW) =>
    handleMcp(conn, { aiKey, authorization: token ? `Bearer ${token}` : null, body: { jsonrpc: "2.0", id: 1, method: "ping" }, now, origin: ORIGIN });

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3)`, [OWNER, REVIEWER, CLERK]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Reviewer', 'reviewer')`, [OWNER, REVIEWER, brand]);
    await db.query(`insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, enabled) values ($1, $2, 'document_clerk', 'Document Clerk', 'compliance', 'both', true)`, [CLERK, brand]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("a connector without a token is told where to sign in", async () => {
    const r = await mcp(null);
    expect(r.status).toBe(401);
    expect(r.headers?.["WWW-Authenticate"]).toBe(
      `Bearer realm="TalloCPA OS", resource_metadata="${ORIGIN}/.well-known/oauth-protected-resource/api/mcp/document_clerk", scope="mcp"`,
    );
    expect((await mcp("tcai_" + "x".repeat(43))).headers?.["WWW-Authenticate"]).toMatch(/error="invalid_token"/);
  });

  it("registers an app, and refuses bad return addresses", async () => {
    const r = await registerEndpoint(conn, { client_name: "Claude", redirect_uris: [CALLBACK], token_endpoint_auth_method: "none" }, NOW);
    expect(r.status).toBe(201);
    expect(r.json).toMatchObject({ client_name: "Claude", redirect_uris: [CALLBACK], token_endpoint_auth_method: "none" });
    clientId = r.json.client_id as string;
    expect(clientId).toMatch(/^tcoc_/);
    otherClient = (await registerEndpoint(conn, { client_name: "Other", redirect_uris: ["https://other.example/cb"] }, NOW)).json.client_id as string;
    expect((await registerEndpoint(conn, { redirect_uris: ["http://evil.example/cb"] }, NOW)).status).toBe(400);
    expect((await registerEndpoint(conn, null, NOW)).status).toBe(400);
  });

  it("only the Owner can approve (issue a code)", async () => {
    await expect(approve(REVIEWER)).rejects.toThrow(/row-level security/);
    await expect(as(OWNER, `insert into public.oauth_codes (code_hash, client_id, ai_user_id, redirect_uri, code_challenge, resource, approved_by, expires_at) values ($1, $2, $3, $4, $5, 'x', $6, now() + interval '5 minutes')`, [sha("x"), clientId, CLERK, CALLBACK, challenge, REVIEWER])).rejects.toThrow(/row-level security/);
  });

  it("refuses a wrong PKCE verifier, and the code is spent", async () => {
    const code = await approve();
    const bad = await exchange(codeForm(code, { code_verifier: randomBytes(32).toString("base64url") }));
    expect(bad).toMatchObject({ status: 400, json: { error: "invalid_grant" } });
    expect((await exchange(codeForm(code))).json.error).toBe("invalid_grant");
  });

  it("refuses a code presented by another app, with another return address, or too late", async () => {
    expect((await exchange(codeForm(await approve(), { client_id: otherClient }))).json.error).toBe("invalid_grant");
    expect((await exchange(codeForm(await approve(), { redirect_uri: "https://claude.ai/other" }))).json.error).toBe("invalid_grant");
    expect((await exchange(codeForm(await approve()), later(301))).json.error).toBe("invalid_grant");
    expect((await exchange({ grant_type: "password", client_id: clientId })).json.error).toBe("unsupported_grant_type");
  });

  it("trades a good code for tokens, once", async () => {
    const code = await approve();
    const r = await exchange(codeForm(code));
    expect(r.status).toBe(200);
    expect(r.json).toMatchObject({ token_type: "Bearer", expires_in: 3600, scope: "mcp" });
    access = r.json.access_token as string;
    refresh = r.json.refresh_token as string;
    expect(access).toMatch(/^tcai_[A-Za-z0-9_-]{43}$/);
    expect((await exchange(codeForm(code))).json.error).toBe("invalid_grant");
    const grant = (await db.query(`select approved_by, ai_user_id, client_id from public.oauth_grants`)).rows;
    expect(grant).toEqual([{ approved_by: OWNER, ai_user_id: CLERK, client_id: clientId }]);
  });

  it("the access token works on that AI employee's connector only, and expires in an hour", async () => {
    expect(await mcp(access)).toMatchObject({ status: 200, json: { result: {} } });
    expect((await mcp(access, "fs_preparer")).status).toBe(403);
    expect((await mcp(access, "document_clerk", later(3601))).status).toBe(401);
  });

  it("refresh gives new tokens and retires the old refresh token", async () => {
    const r = await exchange({ grant_type: "refresh_token", refresh_token: refresh, client_id: clientId }, later(3000));
    expect(r.status).toBe(200);
    const next = { access: r.json.access_token as string, refresh: r.json.refresh_token as string };
    expect(next.refresh).not.toBe(refresh);
    expect((await mcp(next.access, "document_clerk", later(3601))).status).toBe(200);
    expect((await exchange({ grant_type: "refresh_token", refresh_token: refresh, client_id: clientId })).json.error).toBe("invalid_grant");
    expect((await exchange({ grant_type: "refresh_token", refresh_token: next.refresh, client_id: otherClient })).json.error).toBe("invalid_grant");
    access = next.access;
    refresh = next.refresh;
  });

  it("stays signed in while used at least once every 90 days", async () => {
    const r = await exchange({ grant_type: "refresh_token", refresh_token: refresh, client_id: clientId }, later(3200));
    refresh = r.json.refresh_token as string;
    access = r.json.access_token as string;
    const { rows } = await db.query(`select extract(epoch from refresh_expires_at - last_used_at)::int as s from public.oauth_grants`);
    expect(rows[0].s).toBe(90 * 86400);
    const idle = (days: number) => new Date(later(3200).getTime() + days * 86_400_000);
    expect((await exchange({ grant_type: "refresh_token", refresh_token: refresh, client_id: clientId }, idle(91))).json.error).toBe("invalid_grant");
    const back = await exchange({ grant_type: "refresh_token", refresh_token: refresh, client_id: clientId }, idle(89));
    expect(back.status).toBe(200);
    refresh = back.json.refresh_token as string;
    access = back.json.access_token as string;
  });

  it("OAuth tokens are stored as hashes, never in the clear", async () => {
    const { rows } = await db.query(`select token_hash, source from public.ai_credentials`);
    expect(rows.every((r) => r.source === "oauth" && /^[0-9a-f]{64}$/.test(r.token_hash))).toBe(true);
    expect(JSON.stringify((await db.query(`select * from public.oauth_grants`)).rows)).not.toContain(refresh);
  });

  it("disconnecting stops the access and refresh tokens at once, for good", async () => {
    const grant = (await db.query(`select id from public.oauth_grants`)).rows[0].id;
    expect((await as(REVIEWER, `update public.oauth_grants set revoked_at = now() where id = $1 returning id`, [grant])).rows).toHaveLength(0);
    await as(OWNER, `update public.oauth_grants set revoked_at = $2, revoked_by = $3 where id = $1`, [grant, later(3100).toISOString(), OWNER]);
    const soon = new Date(later(3200).getTime() + 89 * 86_400_000 + 60_000);
    expect((await mcp(access, "document_clerk", soon)).status).toBe(401);
    expect((await exchange({ grant_type: "refresh_token", refresh_token: refresh, client_id: clientId }, soon)).json.error).toBe("invalid_grant");
    await expect(as(OWNER, `update public.oauth_grants set revoked_at = null where id = $1`, [grant])).rejects.toThrow(/cannot be restored/);
  });

  it("the Owner sees connected apps; staff and the AI employee do not", async () => {
    const count = async (user: string, t: string) => (await as(user, `select count(*)::int as n from public.${t}`)).rows[0].n;
    expect(await count(OWNER, "oauth_grants")).toBe(1);
    expect(await count(OWNER, "oauth_clients")).toBe(2);
    for (const t of ["oauth_grants", "oauth_clients", "oauth_codes"]) {
      expect(await count(REVIEWER, t), t).toBe(0);
      expect(await count(CLERK, t), t).toBe(0);
    }
  });
});
