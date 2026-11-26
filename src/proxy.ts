import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, formatIdleCookie, idleAudienceFor, isIdle } from "@/lib/session/idle";

const PROTECTED = ["/app", "/portal"];

/**
 * Refreshes the Supabase session on every request and sends signed-out
 * visitors to the sign-in page. Pages still check access themselves; the
 * database enforces it with row-level security.
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(list, headers) {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) response.cookies.set(name, value, options);
        for (const [k, v] of Object.entries(headers ?? {})) response.headers.set(k, v);
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims);
  const path = request.nextUrl.pathname;

  // Sign-out after no activity (src/lib/session/idle.ts): staff 30 minutes, clients 15.
  const audience = idleAudienceFor(path);
  const sessionId = typeof data?.claims?.session_id === "string" ? data.claims.session_id : null;
  if (signedIn && audience && sessionId) {
    const now = Date.now();
    if (isIdle(request.cookies.get(IDLE_COOKIE)?.value, sessionId, audience, now)) {
      await supabase.auth.signOut({ scope: "local" });
      response.cookies.delete(IDLE_COOKIE);
      return redirectKeepingCookies(request, response, `/login?error=idle_${audience}&next=${encodeURIComponent(path)}`);
    }
    // A prefetch is the router guessing, not the person acting: it does not count as activity.
    const prefetch = request.headers.has("next-router-prefetch") || /prefetch/i.test(request.headers.get("sec-purpose") ?? request.headers.get("purpose") ?? "");
    if (!prefetch) {
      response.cookies.set(IDLE_COOKIE, formatIdleCookie(sessionId, now), {
        path: "/",
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
        maxAge: IDLE_COOKIE_MAX_AGE,
      });
    }
  }

  if (path === "/") {
    return redirectKeepingCookies(request, response, signedIn ? "/app" : "/login");
  }
  if (!signedIn && PROTECTED.some((p) => path === p || path.startsWith(`${p}/`))) {
    const target = new URL("/login", request.url);
    target.searchParams.set("next", path);
    return redirectKeepingCookies(request, response, target.pathname + target.search);
  }
  return response;
}

function redirectKeepingCookies(request: NextRequest, from: NextResponse, to: string) {
  const res = NextResponse.redirect(new URL(to, request.url));
  for (const c of from.cookies.getAll()) res.cookies.set(c);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)"],
};
