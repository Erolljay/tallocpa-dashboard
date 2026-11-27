import { NextResponse, type NextRequest } from "next/server";
import { mcpConnector } from "@/lib/mcp/pool";
import { CORS, preflight } from "@/lib/oauth/cors";
import { registerEndpoint } from "@/lib/oauth/endpoints";

/** RFC 7591 dynamic client registration for Claude connectors (docs/SETUP.md). */
export async function POST(request: NextRequest) {
  const conn = mcpConnector();
  if (!conn) return NextResponse.json({ error: "temporarily_unavailable", error_description: "Sign-in is not set up (SUPABASE_DB_URL)." }, { status: 503, headers: CORS });
  const body = await request.json().catch(() => null);
  try {
    const r = await registerEndpoint(conn, body, new Date());
    return NextResponse.json(r.json, { status: r.status, headers: { ...CORS, "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("OAuth register:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "server_error" }, { status: 500, headers: CORS });
  }
}

export const OPTIONS = preflight;
