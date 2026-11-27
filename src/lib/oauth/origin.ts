/**
 * This app's public address for OAuth (issuer, endpoints, connector addresses): the
 * address the request came to, so the connector address in the metadata is exactly the
 * one pasted into Claude (OAuth requires the match). On Vercel the forwarded host and
 * protocol are set by Vercel itself.
 */
export function publicOrigin(request: Request): string {
  const h = request.headers;
  const host = (h.get("x-forwarded-host") ?? h.get("host"))?.split(",")[0]?.trim();
  if (!host || !/^[A-Za-z0-9.-]+(:\d+)?$|^\[[0-9a-fA-F:]+\](:\d+)?$/.test(host)) return new URL(request.url).origin;
  const local = /^(localhost|127\.0\.0\.1|\[::1\])(:|$)/.test(host);
  const forwarded = h.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const proto = forwarded === "http" || forwarded === "https" ? forwarded : local ? "http" : "https";
  return `${proto}://${host}`;
}
