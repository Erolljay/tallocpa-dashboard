import { describe, expect, it } from "vitest";
import { aiKeyOfResource, allowedRedirect, authorizationServerMetadata, pkceMatches, protectedResourceMetadata, readAuthorize, redirectWith, resourceMetadataUrl } from "./rules";

const ORIGIN = "https://app.tallocpa.com";

describe("PKCE", () => {
  // RFC 7636, appendix B.
  const verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
  const challenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM";

  it("accepts the verifier that hashes to the challenge (S256)", () => {
    expect(pkceMatches(verifier, challenge)).toBe(true);
  });

  it("refuses another verifier, a short one, or a plain (unhashed) challenge", () => {
    expect(pkceMatches(verifier.replace("d", "e"), challenge)).toBe(false);
    expect(pkceMatches("short", challenge)).toBe(false);
    expect(pkceMatches(verifier, verifier)).toBe(false);
    expect(pkceMatches(verifier, "")).toBe(false);
  });
});

describe("return addresses", () => {
  it("allow https, and http only on this computer", () => {
    expect(allowedRedirect("https://claude.ai/api/mcp/auth_callback")).toBe(true);
    expect(allowedRedirect("http://localhost:6274/callback")).toBe(true);
    expect(allowedRedirect("http://127.0.0.1:33418/cb")).toBe(true);
    expect(allowedRedirect("http://evil.example/cb")).toBe(false);
    expect(allowedRedirect("javascript:alert(1)")).toBe(false);
    expect(allowedRedirect("https://claude.ai/cb#frag")).toBe(false);
    expect(allowedRedirect("https://user:pw@claude.ai/cb")).toBe(false);
    expect(allowedRedirect("not a url")).toBe(false);
  });

  it("carry the code or error back, with state", () => {
    expect(redirectWith("https://claude.ai/api/mcp/auth_callback?x=1", { code: "abc", state: "s 1", iss: ORIGIN })).toBe(
      "https://claude.ai/api/mcp/auth_callback?x=1&code=abc&state=s+1&iss=https%3A%2F%2Fapp.tallocpa.com",
    );
    expect(redirectWith("https://claude.ai/cb", { error: "access_denied", state: null })).toBe("https://claude.ai/cb?error=access_denied");
  });
});

describe("connector addresses", () => {
  it("name the AI employee only for this app's /api/mcp/<key>", () => {
    expect(aiKeyOfResource(`${ORIGIN}/api/mcp/document_clerk`, ORIGIN)).toBe("document_clerk");
    expect(aiKeyOfResource(`${ORIGIN}/api/mcp/document_clerk/`, ORIGIN)).toBe("document_clerk");
    expect(aiKeyOfResource("https://evil.example/api/mcp/document_clerk", ORIGIN)).toBeNull();
    expect(aiKeyOfResource(`${ORIGIN}/api/mcp/Document-Clerk`, ORIGIN)).toBeNull();
    expect(aiKeyOfResource(`${ORIGIN}/api/mcp/document_clerk?x=1`, ORIGIN)).toBeNull();
    expect(aiKeyOfResource(`${ORIGIN}/app`, ORIGIN)).toBeNull();
  });

  it("publish metadata that points from the connector to this app's sign-in", () => {
    expect(protectedResourceMetadata(ORIGIN, "fs_preparer")).toMatchObject({ resource: `${ORIGIN}/api/mcp/fs_preparer`, authorization_servers: [ORIGIN] });
    expect(resourceMetadataUrl(ORIGIN, "fs_preparer")).toBe(`${ORIGIN}/.well-known/oauth-protected-resource/api/mcp/fs_preparer`);
    const as = authorizationServerMetadata(ORIGIN);
    expect(as).toMatchObject({
      issuer: ORIGIN,
      authorization_endpoint: `${ORIGIN}/oauth/authorize`,
      token_endpoint: `${ORIGIN}/oauth/token`,
      registration_endpoint: `${ORIGIN}/oauth/register`,
      code_challenge_methods_supported: ["S256"],
      token_endpoint_auth_methods_supported: ["none"],
    });
  });
});

describe("authorization request", () => {
  const good = {
    response_type: "code",
    client_id: "tcoc_abcdefghijklmnopqrstuv",
    redirect_uri: "https://claude.ai/api/mcp/auth_callback",
    code_challenge: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
    code_challenge_method: "S256",
    state: "xyz",
    resource: `${ORIGIN}/api/mcp/document_clerk`,
  };
  const q = (over: Record<string, string | null>) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...good, ...over })) if (v !== null) p.set(k, v);
    return p;
  };

  it("reads a good request", () => {
    expect(readAuthorize(q({}))).toEqual({ ok: { clientId: good.client_id, redirectUri: good.redirect_uri, state: "xyz", codeChallenge: good.code_challenge, resource: good.resource } });
  });

  it("shows, never redirects, a missing client or a bad return address", () => {
    expect(readAuthorize(q({ client_id: null }))).toHaveProperty("show");
    expect(readAuthorize(q({ redirect_uri: "http://evil.example/cb" }))).toHaveProperty("show");
  });

  it("sends other problems back to the app", () => {
    expect(readAuthorize(q({ response_type: "token" }))).toMatchObject({ redirect: { error: "unsupported_response_type", state: "xyz" } });
    expect(readAuthorize(q({ code_challenge_method: "plain" }))).toMatchObject({ redirect: { error: "invalid_request" } });
    expect(readAuthorize(q({ code_challenge: null }))).toMatchObject({ redirect: { error: "invalid_request" } });
  });
});
