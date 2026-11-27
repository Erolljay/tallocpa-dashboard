import { NextResponse, type NextRequest } from "next/server";
import { CORS, preflight } from "@/lib/oauth/cors";
import { publicOrigin } from "@/lib/oauth/origin";
import { authorizationServerMetadata } from "@/lib/oauth/rules";

/** RFC 8414: how Claude connectors sign in to TalloCPA OS. */
export function GET(request: NextRequest) {
  return NextResponse.json(authorizationServerMetadata(publicOrigin(request)), { headers: { ...CORS, "Cache-Control": "public, max-age=3600" } });
}

export const OPTIONS = preflight;
