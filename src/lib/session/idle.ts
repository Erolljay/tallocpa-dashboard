/**
 * Sign-out after no activity (Owner, 26 November 2026): staff after 30 minutes, clients
 * after 15, with a one-minute warning first.
 *
 * The time of the last activity lives in one cookie shared by every tab, so working in
 * one tab keeps the others signed in. The proxy reads it on each request (a browser
 * left closed past the limit is signed out on its next visit); the IdleWatcher in each
 * tab writes it on activity and shows the warning. The cookie carries the Supabase
 * session id, so a fresh sign-in is never judged by the previous session's last activity.
 *
 * Shared by the proxy (server) and the IdleWatcher (browser): no server-only imports.
 */

export const IDLE_COOKIE = "tc_last_active";

/** Minutes without activity before sign-out. */
export const IDLE_MINUTES = { staff: 30, client: 15 } as const;
export type IdleAudience = keyof typeof IDLE_MINUTES;

/** The warning shows this long before sign-out. */
export const IDLE_WARNING_SECONDS = 60;

/** Activity is written at most this often, so typing does not rewrite the cookie per key. */
export const IDLE_WRITE_EVERY_MS = 15_000;

/** The cookie outlives any limit; a stale value is what signs a person out, not its expiry. */
export const IDLE_COOKIE_MAX_AGE = 60 * 60 * 12;

/** Which limit applies to a path: the staff app or the client portal; other paths have none. */
export function idleAudienceFor(path: string): IdleAudience | null {
  if (path === "/app" || path.startsWith("/app/")) return "staff";
  if (path === "/portal" || path.startsWith("/portal/")) return "client";
  return null;
}

export const idleLimitMs = (audience: IdleAudience) => IDLE_MINUTES[audience] * 60_000;

/** `<session id>.<epoch ms>`. */
export function formatIdleCookie(sessionId: string, at: number): string {
  return `${sessionId}.${Math.floor(at)}`;
}

export function parseIdleCookie(value: string | undefined | null): { sessionId: string; at: number } | null {
  if (!value) return null;
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return null;
  const at = Number(value.slice(dot + 1));
  if (!Number.isFinite(at) || at <= 0) return null;
  return { sessionId: value.slice(0, dot), at };
}

/**
 * Whether this session has gone idle. Only a cookie from the same session counts: none,
 * or one from an earlier session, means the session has just started.
 */
export function isIdle(cookie: string | undefined | null, sessionId: string, audience: IdleAudience, now: number): boolean {
  const parsed = parseIdleCookie(cookie);
  if (!parsed || parsed.sessionId !== sessionId) return false;
  return now - parsed.at > idleLimitMs(audience);
}
