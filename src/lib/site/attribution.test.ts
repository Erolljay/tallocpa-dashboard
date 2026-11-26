import { describe, expect, it } from "vitest";
import { pickAttribution, withAttribution } from "./attribution";

describe("pickAttribution", () => {
  it("keeps utm_*, ref and click ids, drops the rest", () => {
    expect(pickAttribution("?utm_source=facebook&utm_campaign=bir-2026&ref=post-12&fbclid=abc&page=2")).toBe(
      "utm_source=facebook&utm_campaign=bir-2026&ref=post-12&fbclid=abc",
    );
  });
  it("is empty when nothing applies", () => {
    expect(pickAttribution("")).toBe("");
    expect(pickAttribution("?q=vat")).toBe("");
  });
  it("ignores empty values and keeps the first of a repeated key", () => {
    expect(pickAttribution("?utm_source=&ref=a&ref=b")).toBe("ref=a");
  });
});

describe("withAttribution", () => {
  it("appends to a bare path", () => {
    expect(withAttribution("/start", "utm_source=facebook&ref=x")).toBe("/start?utm_source=facebook&ref=x");
  });
  it("keeps the link's own query and fragment, and its own values win", () => {
    expect(withAttribution("/start?ref=footer#form", "ref=post&utm_medium=social")).toBe("/start?ref=footer&utm_medium=social#form");
  });
  it("leaves mailto and external links alone", () => {
    expect(withAttribution("mailto:hello@example.com", "ref=x")).toBe("mailto:hello@example.com");
    expect(withAttribution("https://example.com", "ref=x")).toBe("https://example.com");
  });
  it("is a no-op without attribution", () => {
    expect(withAttribution("/start", "")).toBe("/start");
  });
});
