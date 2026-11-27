import { describe, expect, it } from "vitest";
import { byText, matchesSearch, pickParam, searchParam } from "./match";

describe("matchesSearch", () => {
  it("matches everything when empty", () => {
    expect(matchesSearch("  ", ["Ace Trading"])).toBe(true);
  });
  it("is case-insensitive and needs every word somewhere", () => {
    expect(matchesSearch("ace 2024", ["Ace Trading", "Renewal", "2024"])).toBe(true);
    expect(matchesSearch("ace 2025", ["Ace Trading", "Renewal", "2024"])).toBe(false);
  });
  it("matches TINs typed in any grouping", () => {
    expect(matchesSearch("123456", ["Ace", "123-456-789-000"])).toBe(true);
    expect(matchesSearch("123 456 789", ["Ace", "123-456-789-000"])).toBe(true);
    expect(matchesSearch("999", ["Ace", "123-456-789-000"])).toBe(false);
  });
  it("ignores blank fields", () => {
    expect(matchesSearch("juan", [null, undefined, "Juan dela Cruz"])).toBe(true);
  });
});

describe("params and sorting", () => {
  it("reads the first value and trims", () => {
    expect(searchParam([" a ", "b"])).toBe("a");
    expect(searchParam(undefined)).toBe("");
  });
  it("keeps only allowed values", () => {
    expect(pickParam("active", ["active", "inactive"] as const)).toBe("active");
    expect(pickParam("drop table", ["active"] as const)).toBe("");
  });
  it("sorts A–Z with blanks last and numbers in order", () => {
    expect(["b", null, "A", "a10", "a2"].sort(byText)).toEqual(["A", "a2", "a10", "b", null]);
  });
});
