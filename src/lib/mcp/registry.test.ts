/**
 * The rules every connector tool must keep (docs/AI-WORKFORCE.md §7.3). A new feature's
 * tools cannot be forgotten (every ai-tools.ts file must be collected) and cannot sign
 * anything off (read or draft only, no sign-off verbs in the name).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { STANDARD_WORKFORCE } from "@/lib/ai/workforce";
import { toolInfo } from "./handler";
import { TOOLS } from "./registry";

const SRC = path.resolve(import.meta.dirname, "../..");
const KEYS = new Set(STANDARD_WORKFORCE.map((e) => e.key));
const MARKETING = new Set(STANDARD_WORKFORCE.filter((e) => !e.clientData).map((e) => e.key));
/** Words that mean signing something off: these stay with people. */
const SIGN_OFF = /(^|_)(approve|approval|sign|signoff|post|file|release|lock|unlock|reverse|pay|paid|remit|void|close|delete|grant|revoke)(_|$)/;

function aiToolFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) return aiToolFiles(p);
    return name === "ai-tools.ts" ? [p] : [];
  });
}

describe("connector tool registry", () => {
  it("collects every ai-tools.ts file in the code", () => {
    const registry = readFileSync(path.join(SRC, "lib/mcp/registry.ts"), "utf8");
    const missing = aiToolFiles(SRC)
      .map((f) => path.relative(SRC, f).replace(/\.ts$/, ""))
      .filter((rel) => !registry.includes(`"@/${rel}"`) && !(rel === "lib/mcp/ai-tools" && registry.includes(`"./ai-tools"`)));
    expect(missing).toEqual([]);
  });

  it("has tools, each with a unique, valid name that can be granted", () => {
    expect(TOOLS.length).toBeGreaterThan(0);
    const names = TOOLS.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
    for (const n of names) expect(n).toMatch(/^[a-z][a-z0-9_.]{1,80}$/);
  });

  it("names only real AI employees, and gives marketing no client-data tool", () => {
    for (const t of TOOLS) {
      if (t.employees === "all") continue;
      expect(t.employees.length, t.name).toBeGreaterThan(0);
      for (const k of t.employees) expect(KEYS.has(k), `${t.name}: ${k}`).toBe(true);
      if (/client|filing|trial|ledger|books/.test(t.name)) {
        for (const k of t.employees) expect(MARKETING.has(k), `${t.name} given to ${k}`).toBe(false);
      }
    }
  });

  it("only reads or drafts, and never signs anything off", () => {
    for (const t of TOOLS) {
      expect(["read", "draft"]).toContain(t.effect);
      expect(t.name, t.name).not.toMatch(SIGN_OFF);
    }
  });

  it("describes each tool and gives it an object input schema", () => {
    for (const t of TOOLS) {
      expect(t.title.length, t.name).toBeGreaterThan(2);
      expect(t.description.length, t.name).toBeGreaterThan(20);
      expect(t.input).toBeInstanceOf(z.ZodObject);
      const info = toolInfo(t);
      expect(info.inputSchema.type, t.name).toBe("object");
      expect(info.annotations.readOnlyHint).toBe(t.effect === "read");
    }
  });
});
