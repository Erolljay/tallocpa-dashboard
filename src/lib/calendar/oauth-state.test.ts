import { describe, expect, it } from "vitest";
import { accountProblem, newState, redirectUri, stateMatches } from "./oauth-state";

describe("calendar OAuth", () => {
  it("accepts only the state this user started", () => {
    const { state, cookie } = newState("u1");
    expect(stateMatches(cookie, state, "u1")).toBe(true);
    expect(stateMatches(cookie, state, "u2")).toBe(false);
    expect(stateMatches(cookie, `${state.slice(0, -1)}0`.replace(/.$/, state.endsWith("0") ? "1" : "0"), "u1")).toBe(false);
    expect(stateMatches(undefined, state, "u1")).toBe(false);
    expect(stateMatches(cookie, null, "u1")).toBe(false);
  });

  it("redirects to APP_URL when set", () => {
    expect(redirectUri("https://os.tallocpa.com", "https://preview.vercel.app/app/calendar/connect")).toBe("https://os.tallocpa.com/app/calendar/callback");
    expect(redirectUri(null, "https://preview.vercel.app/app/calendar/connect")).toBe("https://preview.vercel.app/app/calendar/callback");
  });

  it("takes only the person's own verified firm account", () => {
    const ok = { email: "ana@tallocpa.com", hd: "tallocpa.com", verified: true };
    expect(accountProblem(ok, "tallocpa.com", "Ana@tallocpa.com")).toBeNull();
    expect(accountProblem({ ...ok, verified: false }, "tallocpa.com", null)).toMatch(/verified/);
    expect(accountProblem({ email: "ana@gmail.com", hd: null, verified: true }, "tallocpa.com", null)).toMatch(/tallocpa.com Google account/);
    expect(accountProblem(ok, "tallocpa.com", "ben@tallocpa.com")).toMatch(/ben@tallocpa.com/);
  });
});
