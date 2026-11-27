/**
 * OAuth 2.1 for Claude connectors (docs/AI-WORKFORCE.md §5, step 2b): the pure rules.
 * PKCE (S256 only), redirect addresses, which AI employee a connector address names,
 * lifetimes, and the two metadata documents Claude reads to find out how to sign in.
 */
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const SCOPE = "mcp";
export const CODE_SECONDS = 5 * 60;
export const ACCESS_SECONDS = 60 * 60;
export const REFRESH_DAYS = 30;

/** Random secrets: codes and refresh tokens (32 bytes, base64url). */
export const secret = (prefix: string) => prefix + randomBytes(32).toString("base64url");
export const newClientId = () => "tcoc_" + randomBytes(16).toString("base64url");
export const sha256hex = (s: string) => createHash("sha256").update(s, "utf8").digest("hex");

/** RFC 7636: the verifier is 43–128 characters; S256 is the only method we accept. */
export function pkceMatches(verifier: string, challenge: string): boolean {
  if (!/^[A-Za-z0-9._~-]{43,128}$/.test(verifier) || !/^[A-Za-z0-9_-]{43}$/.test(challenge)) return false;
  const computed = createHash("sha256").update(verifier, "ascii").digest("base64url");
  return timingSafeEqual(Buffer.from(computed), Buffer.from(challenge));
}

/**
 * A redirect address a client may register: https anywhere, or http only on this
 * computer (desktop apps listening on a local port). No fragments, no credentials.
 */
export function allowedRedirect(uri: string): boolean {
  let u: URL;
  try {
    u = new URL(uri);
  } catch {
    return false;
  }
  if (u.hash || u.username || u.password || uri.length > 500) return false;
  if (u.protocol === "https:") return true;
  return u.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(u.hostname);
}

/** The AI employee key a connector address names, if it is this app's connector address. */
export function aiKeyOfResource(resource: string, origin: string): string | null {
  let u: URL;
  try {
    u = new URL(resource);
  } catch {
    return null;
  }
  if (u.origin !== origin || u.search || u.hash) return null;
  const m = /^\/api\/mcp\/([a-z][a-z0-9_]{1,40})\/?$/.exec(u.pathname);
  return m ? m[1] : null;
}

export const resourceFor = (origin: string, aiKey: string) => `${origin}/api/mcp/${aiKey}`;
export const resourceMetadataUrl = (origin: string, aiKey: string) => `${origin}/.well-known/oauth-protected-resource/api/mcp/${aiKey}`;

/** RFC 9728: what the connector at /api/mcp/<key> accepts and who signs in for it. */
export function protectedResourceMetadata(origin: string, aiKey: string) {
  return {
    resource: resourceFor(origin, aiKey),
    authorization_servers: [origin],
    bearer_methods_supported: ["header"],
    scopes_supported: [SCOPE],
    resource_name: "TalloCPA OS",
  };
}

/** RFC 8414: how to sign in. Dynamic client registration; public clients with PKCE. */
export function authorizationServerMetadata(origin: string) {
  return {
    issuer: origin,
    authorization_endpoint: `${origin}/oauth/authorize`,
    token_endpoint: `${origin}/oauth/token`,
    registration_endpoint: `${origin}/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
    scopes_supported: [SCOPE],
  };
}

export interface AuthorizeRequest {
  clientId: string;
  redirectUri: string;
  state: string | null;
  codeChallenge: string;
  resource: string | null;
}

/**
 * Reads /oauth/authorize's query. Errors are split the way OAuth requires: a bad
 * client or redirect address is shown on the page (never redirected to), anything
 * else goes back to the client's redirect address as `error=…`.
 */
export function readAuthorize(q: URLSearchParams): { ok: AuthorizeRequest } | { show: string } | { redirect: { redirectUri: string; state: string | null; error: string; description: string } } {
  const clientId = q.get("client_id");
  const redirectUri = q.get("redirect_uri");
  if (!clientId) return { show: "The app did not say who it is (client_id is missing)." };
  if (!redirectUri || !allowedRedirect(redirectUri)) return { show: "The app's return address is missing or not allowed." };
  const state = q.get("state");
  const back = (error: string, description: string) => ({ redirect: { redirectUri, state, error, description } });
  if (q.get("response_type") !== "code") return back("unsupported_response_type", "Only response_type=code is supported.");
  const codeChallenge = q.get("code_challenge");
  if (q.get("code_challenge_method") !== "S256" || !codeChallenge || !/^[A-Za-z0-9_-]{43}$/.test(codeChallenge)) {
    return back("invalid_request", "PKCE with code_challenge_method=S256 is required.");
  }
  return { ok: { clientId, redirectUri, state, codeChallenge, resource: q.get("resource") } };
}

/** The client's redirect address with the answer added (code or error, and state). */
export function redirectWith(redirectUri: string, params: Record<string, string | null>): string {
  const u = new URL(redirectUri);
  for (const [k, v] of Object.entries(params)) if (v !== null) u.searchParams.set(k, v);
  return u.toString();
}
