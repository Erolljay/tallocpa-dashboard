/**
 * One request to the TalloCPA OS MCP server (docs/AI-WORKFORCE.md §5, §7), for the AI
 * employee named in the address (/api/mcp/<key>):
 *
 *   1. the key (Authorization: Bearer tcai_…) must be a live key of that AI employee,
 *      which must be switched on; otherwise 401 or 403;
 *   2. it sees only the tools that are for its job AND granted by the Owner;
 *   3. each call counts against its daily limit and is logged in ai_activity;
 *   4. each tool runs in its own transaction as the AI employee (role `authenticated`,
 *      its user id), read-only for read tools, so row-level security decides what it
 *      can see, exactly as supabase/tests/ai-employees.test.ts checks.
 *
 * Takes its database connections from a Connector, so tests run it on a real Postgres.
 */
import { hashKey, isKeyShaped } from "@/lib/ai/credentials";
import type { BooksLevel, Department } from "@/lib/ai/workforce";
import { handleBody, toolError, toolResult, type McpServer, type ToolInfo } from "./protocol";
import { toolByName, TOOLS } from "./registry";
import { listResources, readResource } from "./resources";
import { toolFor, ToolRefusal, type AiTool } from "./tool";
import type { AiCaller, Borrowed, Connector, Queryable } from "./types";
import { z } from "zod";

export interface McpRequest {
  /** The AI employee's key from the address, e.g. document_clerk. */
  aiKey: string;
  authorization: string | null;
  body: unknown;
  now: Date;
}

export interface McpResponse {
  status: number;
  json?: unknown;
  headers?: Record<string, string>;
}

const REALM = 'Bearer realm="TalloCPA OS"';
const denied = (status: 401 | 403, message: string): McpResponse => ({
  status,
  json: { error: status === 401 ? "invalid_token" : "forbidden", error_description: message },
  headers: status === 401 ? { "WWW-Authenticate": `${REALM}, error="invalid_token"` } : undefined,
});

export const manilaDay = (now: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);

async function borrow<T>(conn: Connector, fn: (db: Borrowed) => Promise<T>): Promise<T> {
  const db = await conn.connect();
  try {
    return await fn(db);
  } finally {
    db.release();
  }
}

/** Runs fn in a transaction as the AI employee, under row-level security. */
export async function asAi<T>(conn: Connector, aiUserId: string, readOnly: boolean, fn: (db: Queryable) => Promise<T>): Promise<T> {
  return borrow(conn, async (db) => {
    await db.query("begin");
    try {
      if (readOnly) await db.query("set transaction read only");
      await db.query("set local role authenticated");
      await db.query("select set_config('request.jwt.claim.sub', $1, true), set_config('request.jwt.claims', $2, true)", [
        aiUserId,
        JSON.stringify({ sub: aiUserId, role: "authenticated" }),
      ]);
      const result = await fn(db);
      await db.query("commit");
      return result;
    } catch (e) {
      await db.query("rollback").catch(() => undefined);
      throw e;
    }
  });
}

interface CallerRow extends Record<string, unknown> {
  credential_id: string;
  expires_at: Date;
  revoked_at: Date | null;
  last_used_at: Date | null;
  user_id: string;
  key: string;
  name: string;
  brand_id: string;
  department: Department;
  job: string;
  books_level: BooksLevel;
  client_data: boolean;
  daily_limit: number;
  enabled: boolean;
  grants: string[];
}

/** The AI employee behind a key, or why it is refused. Runs as the service (no RLS). */
export async function findCaller(service: Queryable, aiKey: string, authorization: string | null, now: Date): Promise<AiCaller | McpResponse> {
  const token = /^Bearer\s+(\S+)\s*$/i.exec(authorization ?? "")?.[1];
  if (!token || !isKeyShaped(token)) return denied(401, "Send the AI employee's key as Authorization: Bearer tcai_…");
  const { rows } = await service.query<CallerRow>(
    `select c.id as credential_id, c.expires_at, c.revoked_at, c.last_used_at,
            e.user_id, e.key, e.name, e.brand_id, e.department, e.job, e.books_level, e.client_data, e.daily_limit, e.enabled,
            coalesce((select array_agg(g.tool order by g.tool) from public.ai_tool_grants g where g.ai_user_id = e.user_id), '{}') as grants
     from public.ai_credentials c join public.ai_employees e on e.user_id = c.ai_user_id
     where c.token_hash = $1`,
    [hashKey(token)],
  );
  const r = rows[0];
  if (!r || r.revoked_at || new Date(r.expires_at) <= now) return denied(401, "This key is not valid: it was revoked, has expired, or never existed.");
  if (r.key !== aiKey) return denied(403, "This key belongs to another AI employee. Use the address for that AI employee.");
  if (!r.enabled) return denied(403, `${r.name} is switched off. The Owner switches AI employees on in Settings → AI Employees.`);
  if (!r.last_used_at || now.getTime() - new Date(r.last_used_at).getTime() > 5 * 60_000) {
    await service.query(`update public.ai_credentials set last_used_at = $2 where id = $1`, [r.credential_id, now.toISOString()]);
  }
  return {
    userId: r.user_id,
    key: r.key,
    name: r.name,
    brandId: r.brand_id,
    department: r.department,
    job: r.job,
    booksLevel: r.books_level,
    clientData: r.client_data,
    dailyLimit: r.daily_limit,
    grants: new Set(r.grants),
    credentialId: r.credential_id,
  };
}

/** The tools this AI employee may use: for its job, and granted by the Owner. */
export const usableTools = (caller: AiCaller) => TOOLS.filter((t) => toolFor(t, caller.key) && caller.grants.has(t.name));

export function toolInfo(t: AiTool): ToolInfo {
  const schema = z.toJSONSchema(t.input, { io: "input" }) as Record<string, unknown>;
  delete schema.$schema;
  return { name: t.name, title: t.title, description: t.description, inputSchema: schema, annotations: { readOnlyHint: t.effect === "read", destructiveHint: false, openWorldHint: false } };
}

type Outcome = "ok" | "refused" | "error";

async function log(conn: Connector, caller: AiCaller, now: Date, tool: string, clientId: string | null, outcome: Outcome, detail: Record<string, unknown>) {
  const text = JSON.stringify(detail);
  await borrow(conn, (db) =>
    db.query(`insert into public.ai_activity (ai_user_id, tool, client_id, outcome, detail, created_at) values ($1, $2, $3, $4, $5::jsonb, $6)`, [
      caller.userId,
      tool,
      clientId,
      outcome,
      text.length > 2000 ? JSON.stringify({ note: "detail too long to keep" }) : text,
      now.toISOString(),
    ]),
  );
}

async function callsToday(conn: Connector, caller: AiCaller, now: Date): Promise<number> {
  const { rows } = await borrow(conn, (db) =>
    db.query<{ n: number }>(
      `select count(*)::int as n from public.ai_activity
       where ai_user_id = $1 and created_at >= ($2::date::timestamp at time zone 'Asia/Manila') and created_at < (($2::date + 1)::timestamp at time zone 'Asia/Manila')`,
      [
      caller.userId,
        manilaDay(now),
      ],
    ),
  );
  return rows[0]?.n ?? 0;
}

const pgCode = (e: unknown) => (typeof e === "object" && e !== null && "code" in e ? String((e as { code: unknown }).code) : null);

export function serverFor(conn: Connector, caller: AiCaller, now: Date): McpServer {
  return {
    info: { name: "tallocpa-os", title: "TalloCPA OS", version: "1.0.0" },
    instructions:
      `You are ${caller.name}, an AI employee of Tallo CPA. Read tallocpa://ai/house-rules and tallocpa://ai/my-job before you start. ` +
      "You prepare work for people to review; you never approve, sign, post, file or pay anything.",
    listTools: () => usableTools(caller).map(toolInfo),
    async callTool(name, args) {
      const tool = toolByName(name);
      if (!tool || !toolFor(tool, caller.key) || !caller.grants.has(name)) {
        await log(conn, caller, now, name, null, "refused", { reason: tool ? "not granted" : "no such tool" });
        return null;
      }
      if ((await callsToday(conn, caller, now)) >= caller.dailyLimit) {
        await log(conn, caller, now, name, null, "refused", { reason: "daily limit" });
        return toolError(`Daily limit reached (${caller.dailyLimit} calls). It resets at midnight, Manila time.`);
      }
      const parsed = tool.input.safeParse(args);
      if (!parsed.success) {
        await log(conn, caller, now, name, null, "error", { reason: "invalid input" });
        return toolError(`Invalid input: ${parsed.error.issues.map((i) => `${i.path.join(".") || "input"}: ${i.message}`).join("; ")}`);
      }
      let clientId: string | null = null;
      try {
        const value = await asAi(conn, caller.userId, tool.effect === "read", (db) =>
          tool.run({ db, caller, today: manilaDay(now), noteClient: (id) => (clientId = id) }, parsed.data),
        );
        await log(conn, caller, now, name, clientId, "ok", { args });
        return toolResult(value);
      } catch (e) {
        const refused = e instanceof ToolRefusal || pgCode(e) === "42501";
        await log(conn, caller, now, name, clientId, refused ? "refused" : "error", { args, message: (e as Error).message });
        return toolError(refused ? (e as Error).message : `The tool failed: ${(e as Error).message}`);
      }
    },
    listResources,
    readResource: async (uri) => readResource(caller, uri),
  };
}

export async function handleMcp(conn: Connector, req: McpRequest): Promise<McpResponse> {
  const caller = await borrow(conn, (db) => findCaller(db, req.aiKey, req.authorization, req.now));
  if ("status" in caller) return caller;
  return handleBody(serverFor(conn, caller, req.now), req.body);
}
