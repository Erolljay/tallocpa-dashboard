import { NextResponse, type NextRequest } from "next/server";
import { handleMcp } from "@/lib/mcp/handler";
import { mcpConnector } from "@/lib/mcp/pool";

/** Tool calls read the database and may take a few seconds. (Route handlers run on Node, which pg needs.) */
export const maxDuration = 30;

/**
 * The TalloCPA OS MCP server (docs/AI-WORKFORCE.md §7), one address per AI employee:
 * /api/mcp/document_clerk, /api/mcp/fs_preparer, … Streamable HTTP, stateless: each POST
 * gets one JSON answer. The key in `Authorization: Bearer tcai_…` must belong to the AI
 * employee in the address (src/lib/mcp/handler.ts).
 */
export async function POST(request: NextRequest, ctx: RouteContext<"/api/mcp/[ai]">) {
  const { ai } = await ctx.params;
  const conn = mcpConnector();
  if (!conn) return NextResponse.json({ error: "not_configured", error_description: "The connector is not set up: SUPABASE_DB_URL is missing (docs/SETUP.md)." }, { status: 503 });
  const body = await request.json().catch(() => undefined);
  if (body === undefined) {
    return NextResponse.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "The body is not JSON." } }, { status: 400 });
  }
  try {
    const res = await handleMcp(conn, { aiKey: ai, authorization: request.headers.get("authorization"), body, now: new Date() });
    if (res.status === 202) return new Response(null, { status: 202 });
    return NextResponse.json(res.json, { status: res.status, headers: res.headers });
  } catch (e) {
    console.error("MCP:", e instanceof Error ? e.message : e);
    return NextResponse.json({ jsonrpc: "2.0", id: null, error: { code: -32603, message: "Internal error." } }, { status: 500 });
  }
}

/** No server-sent event stream: this server answers each POST directly. */
export function GET() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}

export function DELETE() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
