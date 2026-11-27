import { NextResponse, type NextRequest } from "next/server";
import { mcpConnector } from "@/lib/mcp/pool";
import { CORS, preflight } from "@/lib/oauth/cors";
import { tokenEndpoint } from "@/lib/oauth/endpoints";

/**
 * OAuth token endpoint: exchanges a code (with PKCE) or a refresh token for an access
 * token, which is an AI employee key for the connector at /api/mcp/<key>.
 */
export async function POST(request: NextRequest) {
  const headers = { ...CORS, "Cache-Control": "no-store", Pragma: "no-cache" };
  const conn = mcpConnector();
  if (!conn) return NextResponse.json({ error: "temporarily_unavailable", error_description: "Sign-in is not set up (SUPABASE_DB_URL)." }, { status: 503, headers });
  const type = request.headers.get("content-type") ?? "";
  let form: URLSearchParams;
  if (type.includes("application/x-www-form-urlencoded")) form = new URLSearchParams(await request.text());
  else if (type.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    form = new URLSearchParams(Object.entries(body).filter(([, v]) => typeof v === "string") as [string, string][]);
  } else return NextResponse.json({ error: "invalid_request", error_description: "Send the form as application/x-www-form-urlencoded." }, { status: 400, headers });
  try {
    const r = await tokenEndpoint(conn, form, new Date());
    return NextResponse.json(r.json, { status: r.status, headers });
  } catch (e) {
    console.error("OAuth token:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "server_error" }, { status: 500, headers });
  }
}

export const OPTIONS = preflight;
