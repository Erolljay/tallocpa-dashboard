import { NextResponse, type NextRequest } from "next/server";
import { ATTR_COOKIE, ATTR_COOKIE_MAX_AGE, normalizeCode, parseAttrCookie, referrerHost, serializeAttrCookie, targetUrl, isBot } from "@/lib/marketing/attribution";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Link = { code: string; target_path: string; utm_source: string; utm_medium: string; utm_campaign: string; utm_content: string | null };

/**
 * A campaign link (https://tallocpa.com/go/<code>), as pasted in a Facebook post
 * or ad: counts the click (not for link-preview robots), keeps the visitor's first
 * touch in the tc_attr cookie for 90 days (an earlier first touch is kept), and
 * sends them to the link's page with the utm_* tags. An unknown or archived code
 * goes to the home page.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/go/[code]">) {
  const { code: raw } = await ctx.params;
  const code = normalizeCode(raw);
  const home = NextResponse.redirect(new URL("/", request.url), 302);
  home.headers.set("Cache-Control", "no-store");
  if (!code) return home;

  let link: Link | null = null;
  try {
    const { data, error } = await supabaseAdmin().rpc("record_marketing_click", { p_code: code, p_count: !isBot(request.headers.get("user-agent")) });
    if (!error) link = (data as Link | null) ?? null;
  } catch {
    link = null;
  }
  if (!link) return home;

  const res = NextResponse.redirect(targetUrl(request.url, link.target_path, link), 302);
  res.headers.set("Cache-Control", "no-store");
  if (!parseAttrCookie(request.cookies.get(ATTR_COOKIE)?.value)) {
    const value = serializeAttrCookie({
      utm_source: link.utm_source,
      utm_medium: link.utm_medium,
      utm_campaign: link.utm_campaign,
      utm_content: link.utm_content ?? undefined,
      ref: link.code,
      referrer: referrerHost(request.headers.get("referer"), [request.nextUrl.hostname]),
      landing_path: link.target_path,
      first_touch_at: new Date().toISOString(),
    });
    res.cookies.set(ATTR_COOKIE, value, {
      path: "/",
      maxAge: ATTR_COOKIE_MAX_AGE,
      sameSite: "lax",
      httpOnly: true,
      secure: request.nextUrl.protocol === "https:",
    });
  }
  return res;
}
