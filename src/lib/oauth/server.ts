/**
 * The OAuth endpoints' work (step 2b), run by the server without a session: register a
 * connector (RFC 7591), redeem a code (with PKCE) and refresh tokens (rotating). Access
 * tokens are AI employee keys (ai_credentials, source 'oauth'), so the MCP server checks
 * them as in step 2. Takes a Queryable that bypasses row-level security (the service
 * connection); the Owner's part (approving) happens on the consent page.
 */
import { hashKey, keyHint, newKey } from "@/lib/ai/credentials";
import type { Queryable } from "@/lib/mcp/types";
import { ACCESS_SECONDS, allowedRedirect, newClientId, pkceMatches, REFRESH_DAYS, SCOPE, secret, sha256hex } from "./rules";

export interface OAuthReply {
  status: number;
  json: Record<string, unknown>;
}

const err = (status: number, error: string, description: string): OAuthReply => ({ status, json: { error, error_description: description } });

/** RFC 7591 dynamic client registration: public clients, authorization code + PKCE. */
export async function registerClient(db: Queryable, body: unknown, now: Date): Promise<OAuthReply> {
  if (typeof body !== "object" || body === null) return err(400, "invalid_client_metadata", "Send the client's metadata as JSON.");
  const b = body as Record<string, unknown>;
  const uris = b.redirect_uris;
  if (!Array.isArray(uris) || uris.length === 0 || uris.length > 10 || !uris.every((u) => typeof u === "string" && allowedRedirect(u))) {
    return err(400, "invalid_redirect_uri", "redirect_uris must be 1 to 10 https addresses (or http on localhost).");
  }
  const name = typeof b.client_name === "string" ? b.client_name.trim().slice(0, 120) : "";
  const { rows: recent } = await db.query<{ n: number }>(`select count(*)::int as n from public.oauth_clients where created_at > $1`, [new Date(now.getTime() - 86_400_000).toISOString()]);
  if ((recent[0]?.n ?? 0) >= 200) return err(429, "temporarily_unavailable", "Too many registrations today; try again tomorrow.");
  const clientId = newClientId();
  await db.query(`insert into public.oauth_clients (client_id, client_name, redirect_uris, created_at) values ($1, $2, $3, $4)`, [clientId, name, uris, now.toISOString()]);
  return {
    status: 201,
    json: {
      client_id: clientId,
      client_id_issued_at: Math.floor(now.getTime() / 1000),
      client_name: name,
      redirect_uris: uris,
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
      scope: SCOPE,
    },
  };
}

/** A new access token (an AI employee key) and refresh token for a connection. */
async function issue(db: Queryable, grantId: string, aiUserId: string, clientName: string, now: Date): Promise<{ access: string; refresh: string }> {
  const access = newKey();
  const refresh = secret("tcor_");
  await db.query(
    `insert into public.ai_credentials (ai_user_id, label, token_hash, token_hint, created_at, expires_at, source, oauth_grant_id)
     values ($1, $2, $3, $4, $5, $6, 'oauth', $7)`,
    [aiUserId, (clientName || "Connected app").slice(0, 80), hashKey(access), keyHint(access), now.toISOString(), new Date(now.getTime() + ACCESS_SECONDS * 1000).toISOString(), grantId],
  );
  // Expired tokens of this connection are no longer needed.
  await db.query(`delete from public.ai_credentials where oauth_grant_id = $1 and expires_at < $2`, [grantId, new Date(now.getTime() - 86_400_000).toISOString()]);
  return { access, refresh };
}

const tokenReply = (t: { access: string; refresh: string }): OAuthReply => ({
  status: 200,
  json: { access_token: t.access, token_type: "Bearer", expires_in: ACCESS_SECONDS, refresh_token: t.refresh, scope: SCOPE },
});

interface CodeRow extends Record<string, unknown> {
  client_id: string;
  ai_user_id: string;
  redirect_uri: string;
  code_challenge: string;
  approved_by: string;
  expires_at: Date;
  used_at: Date | null;
  client_name: string;
}

/** POST /oauth/token: grant_type=authorization_code or refresh_token. */
export async function token(db: Queryable, form: URLSearchParams, now: Date): Promise<OAuthReply> {
  const grantType = form.get("grant_type");
  const clientId = form.get("client_id");
  if (!clientId) return err(401, "invalid_client", "client_id is required.");

  if (grantType === "authorization_code") {
    const code = form.get("code");
    const verifier = form.get("code_verifier");
    const redirectUri = form.get("redirect_uri");
    if (!code || !verifier) return err(400, "invalid_request", "code and code_verifier are required.");
    // Claim the code: it works once, even if two requests race.
    const { rows } = await db.query<CodeRow>(
      `update public.oauth_codes oc set used_at = $2
       from public.oauth_clients c
       where oc.code_hash = $1 and oc.used_at is null and c.client_id = oc.client_id
       returning oc.client_id, oc.ai_user_id, oc.redirect_uri, oc.code_challenge, oc.approved_by, oc.expires_at, oc.used_at, c.client_name`,
      [sha256hex(code), now.toISOString()],
    );
    const c = rows[0];
    if (!c || new Date(c.expires_at) <= now) return err(400, "invalid_grant", "The code is not valid: it expired, was used already, or never existed.");
    if (c.client_id !== clientId) return err(400, "invalid_grant", "The code was issued to another app.");
    if (redirectUri !== c.redirect_uri) return err(400, "invalid_grant", "redirect_uri must match the one used to get the code.");
    if (!pkceMatches(verifier, c.code_challenge)) return err(400, "invalid_grant", "code_verifier does not match the code_challenge.");
    const refreshPlaceholder = sha256hex(secret("x"));
    const { rows: g } = await db.query<{ id: string }>(
      `insert into public.oauth_grants (client_id, ai_user_id, approved_by, refresh_hash, refresh_expires_at, created_at, last_used_at)
       values ($1, $2, $3, $4, $5, $6, $6) returning id`,
      [c.client_id, c.ai_user_id, c.approved_by, refreshPlaceholder, new Date(now.getTime() + REFRESH_DAYS * 86_400_000).toISOString(), now.toISOString()],
    );
    const t = await issue(db, g[0].id, c.ai_user_id, c.client_name, now);
    await db.query(`update public.oauth_grants set refresh_hash = $2 where id = $1`, [g[0].id, sha256hex(t.refresh)]);
    await db.query(`update public.oauth_clients set last_used_at = $2 where client_id = $1`, [clientId, now.toISOString()]);
    return tokenReply(t);
  }

  if (grantType === "refresh_token") {
    const refresh = form.get("refresh_token");
    if (!refresh) return err(400, "invalid_request", "refresh_token is required.");
    const { rows } = await db.query<{ id: string; client_id: string; ai_user_id: string; refresh_expires_at: Date; revoked_at: Date | null; client_name: string }>(
      `select g.id, g.client_id, g.ai_user_id, g.refresh_expires_at, g.revoked_at, c.client_name
       from public.oauth_grants g join public.oauth_clients c on c.client_id = g.client_id
       where g.refresh_hash = $1`,
      [sha256hex(refresh)],
    );
    const g = rows[0];
    if (!g || g.revoked_at || new Date(g.refresh_expires_at) <= now || g.client_id !== clientId) {
      return err(400, "invalid_grant", "The refresh token is not valid: it was revoked, replaced, expired, or belongs to another app.");
    }
    const t = await issue(db, g.id, g.ai_user_id, g.client_name, now);
    // Rotate: the refresh token just used stops working.
    await db.query(`update public.oauth_grants set refresh_hash = $2, refresh_expires_at = $3, last_used_at = $4 where id = $1`, [
      g.id,
      sha256hex(t.refresh),
      new Date(now.getTime() + REFRESH_DAYS * 86_400_000).toISOString(),
      now.toISOString(),
    ]);
    return tokenReply(t);
  }

  return err(400, "unsupported_grant_type", "Use grant_type=authorization_code or refresh_token.");
}
