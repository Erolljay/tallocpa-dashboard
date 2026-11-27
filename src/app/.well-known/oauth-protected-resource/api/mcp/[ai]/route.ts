import { NextResponse, type NextRequest } from "next/server";
import { CORS, preflight } from "@/lib/oauth/cors";
import { publicOrigin } from "@/lib/oauth/origin";
import { protectedResourceMetadata } from "@/lib/oauth/rules";

/** RFC 9728 for the connector at /api/mcp/<key>: which server signs connectors in. */
export async function GET(request: NextRequest, ctx: RouteContext<"/.well-known/oauth-protected-resource/api/mcp/[ai]">) {
  const { ai } = await ctx.params;
  if (!/^[a-z][a-z0-9_]{1,40}$/.test(ai)) return NextResponse.json({ error: "not_found" }, { status: 404, headers: CORS });
  return NextResponse.json(protectedResourceMetadata(publicOrigin(request), ai), { headers: { ...CORS, "Cache-Control": "public, max-age=3600" } });
}

export const OPTIONS = preflight;
