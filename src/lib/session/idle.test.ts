import { describe, expect, it } from "vitest";
import { formatIdleCookie, idleAudienceFor, isIdle, parseIdleCookie } from "./idle";

const MIN = 60_000;

describe("idle sign-out", () => {
  it("applies the staff limit to the app and the client limit to the portal", () => {
    expect(idleAudienceFor("/app")).toBe("staff");
    expect(idleAudienceFor("/app/filings/1")).toBe("staff");
    expect(idleAudienceFor("/portal/billing")).toBe("client");
    expect(idleAudienceFor("/login")).toBeNull();
    expect(idleAudienceFor("/apple")).toBeNull();
  });

  it("reads back what it writes", () => {
    expect(parseIdleCookie(formatIdleCookie("abc-123", 1_700_000_000_000))).toEqual({ sessionId: "abc-123", at: 1_700_000_000_000 });
    expect(parseIdleCookie("nonsense")).toBeNull();
    expect(parseIdleCookie("abc.")).toBeNull();
  });

  it("signs staff out after 30 minutes and clients after 15", () => {
    const now = 10_000 * MIN;
    const c = (minsAgo: number) => formatIdleCookie("s1", now - minsAgo * MIN);
    expect(isIdle(c(29), "s1", "staff", now)).toBe(false);
    expect(isIdle(c(31), "s1", "staff", now)).toBe(true);
    expect(isIdle(c(14), "s1", "client", now)).toBe(false);
    expect(isIdle(c(16), "s1", "client", now)).toBe(true);
  });

  it("never judges a new session by the previous one's activity", () => {
    const now = 10_000 * MIN;
    expect(isIdle(formatIdleCookie("old", now - 600 * MIN), "new", "staff", now)).toBe(false);
    expect(isIdle(undefined, "new", "staff", now)).toBe(false);
  });
});
