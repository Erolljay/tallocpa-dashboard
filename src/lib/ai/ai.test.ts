import { describe, expect, it } from "vitest";
import { expiryFrom, hashKey, isKeyShaped, keyHint, keyMatches, keyState, newKey } from "./credentials";
import { aiSettingsSchema, keySchema, settingsFor } from "./schema";
import { aiLoginEmail, DEPARTMENT_ORDER, STANDARD_WORKFORCE } from "./workforce";

describe("standard workforce", () => {
  it("has the 16 AI employees of the design note, each with a unique key in a known department", () => {
    expect(STANDARD_WORKFORCE).toHaveLength(16);
    expect(new Set(STANDARD_WORKFORCE.map((e) => e.key)).size).toBe(16);
    for (const e of STANDARD_WORKFORCE) {
      expect(DEPARTMENT_ORDER).toContain(e.department);
      expect(e.key).toMatch(/^[a-z][a-z0-9_]{1,40}$/);
      expect(e.job.length).toBeLessThanOrEqual(600);
    }
  });

  it("keeps marketing away from client data, as the database requires", () => {
    for (const e of STANDARD_WORKFORCE.filter((x) => x.department === "marketing")) {
      expect(e.clientData).toBe(false);
      expect(e.booksLevel).toBe("none");
      expect(e.allClients).toBe(false);
    }
    for (const e of STANDARD_WORKFORCE.filter((x) => !x.clientData)) expect(e.booksLevel === "none" && !e.allClients).toBe(true);
  });

  it("gives Full books access only to the employees the note lists", () => {
    expect(STANDARD_WORKFORCE.filter((e) => e.booksLevel === "full").map((e) => e.key).sort()).toEqual(
      ["annual_reviewer", "document_clerk", "fs_preparer", "onboarding_officer", "pre_review_assistant"],
    );
    const chief = STANDARD_WORKFORCE.find((e) => e.key === "chief_of_staff")!;
    expect([chief.booksLevel, chief.allClients]).toEqual(["summary", true]);
  });

  it("logs in on a domain no mail can reach", () => {
    expect(aiLoginEmail("document_clerk", "x7k2")).toBe("ai.document-clerk.x7k2@agents.tallocpa.invalid");
  });
});

describe("keys", () => {
  const fixed = new Uint8Array(32).fill(7);

  it("are the prefix and 43 base64url characters", () => {
    const k = newKey(fixed);
    expect(k).toBe("tcai_BwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwc");
    expect(isKeyShaped(k)).toBe(true);
    expect(isKeyShaped(newKey())).toBe(true);
    expect(newKey()).not.toBe(newKey());
    expect(() => newKey(new Uint8Array(16))).toThrow();
  });

  it("are stored as a SHA-256 hash with a four-character hint", () => {
    const k = newKey(fixed);
    expect(hashKey(k)).toMatch(/^[0-9a-f]{64}$/);
    expect(hashKey(k)).toBe(hashKey(k));
    expect(keyHint(k)).toBe("HBwc");
  });

  it("match only their own hash", () => {
    const k = newKey(fixed);
    expect(keyMatches(k, hashKey(k))).toBe(true);
    expect(keyMatches(newKey(), hashKey(k))).toBe(false);
    expect(keyMatches("not-a-key", hashKey(k))).toBe(false);
    expect(keyMatches(k, "zz")).toBe(false);
  });

  it("expire after the chosen days and can be revoked", () => {
    const now = new Date("2026-11-27T00:00:00Z");
    expect(expiryFrom(now, 90).toISOString()).toBe("2027-02-25T00:00:00.000Z");
    expect(keyState({ expires_at: "2027-01-01T00:00:00Z", revoked_at: null }, now)).toBe("active");
    expect(keyState({ expires_at: "2026-11-01T00:00:00Z", revoked_at: null }, now)).toBe("expired");
    expect(keyState({ expires_at: "2027-01-01T00:00:00Z", revoked_at: "2026-11-20T00:00:00Z" }, now)).toBe("revoked");
  });
});

describe("settings form", () => {
  const form = { supervisor_user_id: "", books_level: "full", all_clients: "on", daily_limit: "500", monthly_cap: "1500.50" };

  it("reads the form, with no supervisor meaning the Owner", () => {
    expect(aiSettingsSchema.parse(form)).toEqual({ supervisor_user_id: null, books_level: "full", all_clients: true, daily_limit: 500, monthly_cap: 1500.5 });
    expect(aiSettingsSchema.parse({ ...form, all_clients: null }).all_clients).toBe(false);
  });

  it("refuses bad limits and caps", () => {
    expect(aiSettingsSchema.safeParse({ ...form, daily_limit: "-1" }).success).toBe(false);
    expect(aiSettingsSchema.safeParse({ ...form, daily_limit: "1.5" }).success).toBe(false);
    expect(aiSettingsSchema.safeParse({ ...form, monthly_cap: "10.001" }).success).toBe(false);
    expect(aiSettingsSchema.safeParse({ ...form, books_level: "everything" }).success).toBe(false);
  });

  it("keeps marketing at no books and no clients", () => {
    const s = aiSettingsSchema.parse(form);
    expect(settingsFor(false, s)).toMatchObject({ books_level: "none", all_clients: false });
    expect(settingsFor(true, s)).toEqual(s);
  });

  it("accepts only the offered key lifetimes", () => {
    expect(keySchema.parse({ label: " Cowork desk ", days: "90" })).toEqual({ label: "Cowork desk", days: 90 });
    expect(keySchema.safeParse({ label: "", days: "7" }).success).toBe(false);
  });
});
