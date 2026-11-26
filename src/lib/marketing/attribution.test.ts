import { describe, expect, it } from "vitest";
import {
  cleanText,
  firstTouch,
  fromPage,
  fromQuery,
  hasSource,
  isBot,
  normalizeCode,
  parseAttrCookie,
  referrerHost,
  safePath,
  sanitize,
  serializeAttrCookie,
  targetUrl,
} from "./attribution";
import { channelLabel, leadChannel, leadSourceLabel, linkUrl, referrerChannel, siteUrl } from "./links";

describe("cleaning", () => {
  it("trims, drops control characters and cuts to 100", () => {
    expect(cleanText("  spring\u0000promo \n")).toBe("spring promo");
    expect(cleanText("x".repeat(150))).toHaveLength(100);
    expect(cleanText("   ")).toBeUndefined();
    expect(cleanText(5)).toBeUndefined();
  });

  it("keeps link codes to lowercase a-z, 0-9 and -", () => {
    expect(normalizeCode(" Spring-Promo ")).toBe("spring-promo");
    expect(normalizeCode("bad code")).toBeUndefined();
    expect(normalizeCode("-edge")).toBeUndefined();
    expect(normalizeCode("a".repeat(41))).toBeUndefined();
  });

  it("allows paths on this site only", () => {
    expect(safePath("/services")).toBe("/services");
    expect(safePath("//evil.com")).toBeUndefined();
    expect(safePath("https://evil.com")).toBeUndefined();
    expect(safePath("/a b")).toBeUndefined();
    expect(safePath("/\\evil.com")).toBeUndefined();
  });

  it("keeps a referrer's host only, and not this site's own", () => {
    expect(referrerHost("https://l.facebook.com/l.php?u=x")).toBe("l.facebook.com");
    expect(referrerHost("https://www.tallocpa.com/services", ["tallocpa.com"])).toBeUndefined();
    expect(referrerHost("not a url")).toBeUndefined();
    expect(referrerHost("")).toBeUndefined();
    expect(referrerHost("http://localhost:3000/")).toBeUndefined();
  });
});

describe("the query string", () => {
  it("reads utm_* and ref, lowercasing source and medium", () => {
    expect(fromQuery(new URLSearchParams("utm_source=Facebook&utm_medium=Paid_Social&utm_campaign=Tax Season&utm_content=Post 1&ref=Spring-1&x=1"))).toEqual({
      utm_source: "facebook",
      utm_medium: "paid_social",
      utm_campaign: "Tax Season",
      utm_content: "Post 1",
      ref: "spring-1",
    });
  });

  it("takes fbclid alone as Facebook", () => {
    expect(fromQuery({ fbclid: "abc" })).toEqual({ utm_source: "facebook" });
    expect(fromQuery({ fbclid: "abc", utm_source: "ig" }).utm_source).toBe("ig");
  });

  it("adds the referrer's host and the page's path", () => {
    expect(fromPage({ search: "?utm_source=facebook&ref=spring-1", referrer: "https://m.facebook.com/", pathname: "/start", hostname: "tallocpa.com" })).toEqual({
      utm_source: "facebook",
      ref: "spring-1",
      referrer: "m.facebook.com",
      landing_path: "/start",
    });
    expect(fromPage({ search: "", referrer: "https://tallocpa.com/services", pathname: "/start", hostname: "tallocpa.com" })).toEqual({ landing_path: "/start" });
  });

  it("is empty with nothing to say", () => {
    expect(hasSource(fromQuery({ q: "x" }))).toBe(false);
  });
});

describe("the tc_attr cookie", () => {
  const a = { utm_source: "facebook", utm_campaign: "spring", ref: "spring-1", landing_path: "/services", first_touch_at: "2026-11-01T00:00:00.000Z" };

  it("round-trips, also when URL-encoded", () => {
    const v = serializeAttrCookie(a);
    expect(parseAttrCookie(v)).toEqual(a);
    expect(parseAttrCookie(encodeURIComponent(v))).toEqual(a);
  });

  it("ignores junk and unknown keys", () => {
    expect(parseAttrCookie("{not json")).toBeNull();
    expect(parseAttrCookie("[]")).toBeNull();
    expect(parseAttrCookie(undefined)).toBeNull();
    expect(sanitize({ utm_source: "fb", evil: "x", landing_path: "//x", first_touch_at: "nope", referrer: "a b" })).toEqual({ utm_source: "fb" });
  });

  it("first touch: the cookie wins, else the page", () => {
    const page = { utm_source: "instagram", referrer: "instagram.com" };
    expect(firstTouch(a, page)?.utm_source).toBe("facebook");
    expect(firstTouch(null, page)).toEqual(page);
    expect(firstTouch({}, {})).toBeNull();
  });
});

describe("/go redirects", () => {
  it("adds the utm tags to the link's page on this site", () => {
    const u = targetUrl("https://tallocpa.com/go/x", "/services", { utm_source: "facebook", utm_medium: "social", utm_campaign: "Tax season", utm_content: null });
    expect(u.toString()).toBe("https://tallocpa.com/services?utm_source=facebook&utm_medium=social&utm_campaign=Tax+season");
    expect(targetUrl("https://tallocpa.com/go/x", "//evil.com", {}).toString()).toBe("https://tallocpa.com/");
  });

  it("does not count link-preview robots", () => {
    expect(isBot("facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)")).toBe(true);
    expect(isBot("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 [FBAN/FBIOS]")).toBe(false);
    expect(isBot("")).toBe(true);
  });
});

describe("labels", () => {
  it("names channels and lead sources as the report does", () => {
    expect(channelLabel("facebook")).toBe("Facebook");
    expect(channelLabel("news.example.com")).toBe("news.example.com");
    expect(referrerChannel("lm.facebook.com")).toBe("facebook");
    expect(referrerChannel("www.google.com.ph")).toBe("google");
    expect(leadChannel({ source: "website" })).toBe("direct");
    expect(leadChannel({ source: "staff" })).toBe("staff");
    expect(leadSourceLabel({ marketing_links: { label: "Post", platform: "facebook", campaign: "spring", code: "s" }, utm_source: "x" })).toBe("Facebook · spring");
    expect(leadSourceLabel({ referrer: "m.facebook.com" })).toBe("Facebook");
  });

  it("builds the address to paste from SITE_URL", () => {
    expect(siteUrl({})).toBe("https://tallocpa.com");
    expect(siteUrl({ SITE_URL: "https://staging.tallocpa.com/" })).toBe("https://staging.tallocpa.com");
    expect(siteUrl({ SITE_URL: "javascript:alert(1)" })).toBe("https://tallocpa.com");
    expect(linkUrl("https://tallocpa.com", "spring-1")).toBe("https://tallocpa.com/go/spring-1");
  });
});
