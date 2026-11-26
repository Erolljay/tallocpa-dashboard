import { NextResponse, type NextRequest } from "next/server";
import { safeNextPath } from "@/lib/safe-redirect";
import { supabaseServer } from "@/lib/supabase/server";

/** Return point after signing in with Google or the emailed link. */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"));
  if (code) {
    const supabase = await supabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, request.url));
  }
  return NextResponse.redirect(new URL("/login?error=signin_failed", request.url));
}
