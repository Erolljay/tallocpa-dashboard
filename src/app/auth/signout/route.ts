import { NextResponse, type NextRequest } from "next/server";
import { IDLE_COOKIE } from "@/lib/session/idle";
import { supabaseServer } from "@/lib/supabase/server";

/** Sign out. `?reason=idle_staff|idle_client` comes from the IdleWatcher and shows on the sign-in page. */
export async function POST(request: NextRequest) {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  const reason = request.nextUrl.searchParams.get("reason");
  const target = new URL("/login", request.url);
  if (reason === "idle_staff" || reason === "idle_client") {
    target.searchParams.set("error", reason);
    const next = request.nextUrl.searchParams.get("next");
    if (next) target.searchParams.set("next", next);
  }
  const res = NextResponse.redirect(target, { status: 303 });
  res.cookies.delete(IDLE_COOKIE);
  return res;
}
