/**
 * The MCP wire protocol, as much of it as the TalloCPA OS server needs: JSON-RPC 2.0
 * over Streamable HTTP, stateless. Every POST gets one `application/json` answer (the
 * spec lets a server answer that way instead of opening an SSE stream), there is no
 * session id, and notifications get 202 with no body. Pure, so it can be tested.
 */

export const SUPPORTED_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26"] as const;
export const LATEST_VERSION = SUPPORTED_VERSIONS[0];

export interface ToolInfo {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean; destructiveHint: false; openWorldHint: false };
}

export interface ToolResult {
  content: { type: "text"; text: string }[];
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
}

export interface ResourceInfo {
  uri: string;
  name: string;
  title: string;
  description: string;
  mimeType: string;
}

/** What the protocol layer needs from the server for one caller. */
export interface McpServer {
  info: { name: string; title: string; version: string };
  instructions: string;
  listTools(): ToolInfo[];
  /** null when the tool does not exist for this caller. */
  callTool(name: string, args: Record<string, unknown>): Promise<ToolResult | null>;
  listResources(): ResourceInfo[];
  readResource(uri: string): Promise<{ uri: string; mimeType: string; text: string } | null>;
}

type Id = string | number;
interface Request {
  jsonrpc: "2.0";
  id?: Id | null;
  method: string;
  params?: Record<string, unknown>;
}

export type Reply = { jsonrpc: "2.0"; id: Id | null; result: unknown } | { jsonrpc: "2.0"; id: Id | null; error: { code: number; message: string } };

export const ERR = { parse: -32700, invalidRequest: -32600, methodNotFound: -32601, invalidParams: -32602, internal: -32603 } as const;

const fail = (id: Id | null, code: number, message: string): Reply => ({ jsonrpc: "2.0", id, error: { code, message } });
const ok = (id: Id | null, result: unknown): Reply => ({ jsonrpc: "2.0", id, result });

function isRequest(m: unknown): m is Request {
  if (typeof m !== "object" || m === null) return false;
  const r = m as Record<string, unknown>;
  const idOk = r.id === undefined || r.id === null || typeof r.id === "string" || typeof r.id === "number";
  const paramsOk = r.params === undefined || (typeof r.params === "object" && r.params !== null && !Array.isArray(r.params));
  return r.jsonrpc === "2.0" && typeof r.method === "string" && idOk && paramsOk;
}

/** The protocol version to answer with: the client's if supported, else the latest. */
export function negotiateVersion(requested: unknown): string {
  return typeof requested === "string" && (SUPPORTED_VERSIONS as readonly string[]).includes(requested) ? requested : LATEST_VERSION;
}

/** Answers one message; null for a notification (no reply is sent). */
export async function handleMessage(server: McpServer, message: unknown): Promise<Reply | null> {
  if (!isRequest(message)) {
    const id = typeof message === "object" && message !== null && "id" in message ? ((message as { id: Id }).id ?? null) : null;
    return fail(id, ERR.invalidRequest, "Not a JSON-RPC 2.0 request.");
  }
  if (message.id === undefined) return null;
  const id = message.id ?? null;
  const params = message.params ?? {};
  switch (message.method) {
    case "initialize":
      return ok(id, {
        protocolVersion: negotiateVersion(params.protocolVersion),
        capabilities: { tools: { listChanged: false }, resources: { listChanged: false, subscribe: false } },
        serverInfo: server.info,
        instructions: server.instructions,
      });
    case "ping":
      return ok(id, {});
    case "tools/list":
      return ok(id, { tools: server.listTools() });
    case "tools/call": {
      const name = params.name;
      const args = params.arguments ?? {};
      if (typeof name !== "string" || typeof args !== "object" || args === null || Array.isArray(args)) {
        return fail(id, ERR.invalidParams, "tools/call needs a tool name and an arguments object.");
      }
      const result = await server.callTool(name, args as Record<string, unknown>);
      return result ? ok(id, result) : fail(id, ERR.invalidParams, `Unknown tool: ${name}`);
    }
    case "resources/list":
      return ok(id, { resources: server.listResources() });
    case "resources/templates/list":
      return ok(id, { resourceTemplates: [] });
    case "resources/read": {
      const uri = params.uri;
      if (typeof uri !== "string") return fail(id, ERR.invalidParams, "resources/read needs a uri.");
      const r = await server.readResource(uri);
      return r ? ok(id, { contents: [r] }) : fail(id, ERR.invalidParams, `Unknown resource: ${uri}`);
    }
    case "prompts/list":
      return ok(id, { prompts: [] });
    default:
      return fail(id, ERR.methodNotFound, `Method not found: ${message.method}`);
  }
}

/** Answers a POST body: one message, or a batch (allowed by the 2025-03-26 revision). */
export async function handleBody(server: McpServer, body: unknown): Promise<{ status: number; json?: unknown }> {
  if (Array.isArray(body)) {
    if (body.length === 0) return { status: 400, json: fail(null, ERR.invalidRequest, "Empty batch.") };
    const replies: Reply[] = [];
    for (const m of body) {
      const r = await handleMessage(server, m);
      if (r) replies.push(r);
    }
    return replies.length ? { status: 200, json: replies } : { status: 202 };
  }
  const reply = await handleMessage(server, body);
  return reply ? { status: 200, json: reply } : { status: 202 };
}

/** A tool's answer as MCP content: JSON text, plus structured content for objects. */
export function toolResult(value: unknown): ToolResult {
  const structured = typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }], ...(structured ? { structuredContent: structured } : {}) };
}

export const toolError = (message: string): ToolResult => ({ content: [{ type: "text", text: message }], isError: true });
