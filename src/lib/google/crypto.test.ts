import { randomBytes } from "node:crypto";
import { describe, expect, it } from "vitest";
import { openToken, parseKey, sealToken } from "./crypto";

describe("refresh token sealing", () => {
  const key = randomBytes(32);

  it("round-trips, with a fresh IV each time", () => {
    const a = sealToken("1//0g-refresh", key, "u1");
    const b = sealToken("1//0g-refresh", key, "u1");
    expect(a).not.toBe(b);
    expect(openToken(a, key, "u1")).toBe("1//0g-refresh");
  });

  it("refuses a tampered token or the wrong key", () => {
    const sealed = sealToken("1//0g-refresh", key, "u1");
    const [iv, body, tag] = sealed.split(".");
    const flipped = Buffer.from(body, "base64");
    flipped[0] ^= 1;
    expect(() => openToken([iv, flipped.toString("base64"), tag].join("."), key, "u1")).toThrow();
    expect(() => openToken(sealed, randomBytes(32), "u1")).toThrow();
    expect(() => openToken(sealed, key, "u2")).toThrow();
    expect(() => openToken("nope", key, "u1")).toThrow(/expected form/);
  });

  it("needs a 32-byte key", () => {
    expect(() => parseKey(Buffer.alloc(16).toString("base64"))).toThrow(/32 bytes/);
    expect(parseKey(key.toString("base64")).equals(key)).toBe(true);
  });
});
