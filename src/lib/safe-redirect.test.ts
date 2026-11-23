import { describe, expect, it } from "vitest";
import { safeNextPath } from "./safe-redirect";

describe("safeNextPath", () => {
  it("keeps in-app paths", () => {
    expect(safeNextPath("/app/clients")).toBe("/app/clients");
    expect(safeNextPath("/app/clients?status=active#top")).toBe("/app/clients?status=active#top");
  });
  it.each([
    ["absolute URL", "https://evil.example/login"],
    ["protocol-relative URL", "//evil.example"],
    ["backslash trick", "/\\evil.example"],
    ["backslash inside", "/app\\..\\//evil.example"],
    ["javascript URL", "javascript:alert(1)"],
    ["control character", "/app\n//evil.example"],
    ["relative path", "app/clients"],
    ["empty", ""],
    ["not a string", undefined],
    ["very long", `/${"a".repeat(600)}`],
  ])("falls back for %s", (_, value) => {
    expect(safeNextPath(value)).toBe("/app");
  });
});
