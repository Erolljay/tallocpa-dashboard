/**
 * AI employee keys (docs/AI-WORKFORCE.md §5). A key is shown to the Owner once; the
 * database keeps only its SHA-256 hash and last four characters. Pure apart from the
 * random bytes, so it can be tested.
 */
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const KEY_PREFIX = "tcai_";
const KEY_PATTERN = /^tcai_[A-Za-z0-9_-]{43}$/;

export const KEY_LIFETIMES = { 30: "30 days", 90: "90 days", 365: "1 year" } as const;
export type KeyLifetime = keyof typeof KEY_LIFETIMES;

/** A new key: the prefix and 32 random bytes in base64url (43 characters). */
export function newKey(bytes: Uint8Array = randomBytes(32)): string {
  if (bytes.length !== 32) throw new Error("A key needs 32 random bytes.");
  return KEY_PREFIX + Buffer.from(bytes).toString("base64url");
}

export const isKeyShaped = (key: string) => KEY_PATTERN.test(key);

/** What the database stores: SHA-256 of the key, hex. */
export const hashKey = (key: string) => createHash("sha256").update(key, "utf8").digest("hex");

/** The last four characters, so the Owner can tell keys apart. */
export const keyHint = (key: string) => key.slice(-4);

/** Constant-time comparison of a presented key with a stored hash. */
export function keyMatches(key: string, storedHash: string): boolean {
  if (!isKeyShaped(key) || !/^[0-9a-f]{64}$/.test(storedHash)) return false;
  return timingSafeEqual(Buffer.from(hashKey(key), "hex"), Buffer.from(storedHash, "hex"));
}

export function expiryFrom(now: Date, days: KeyLifetime): Date {
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}

export type KeyState = "active" | "expired" | "revoked";

export function keyState(k: { expires_at: string; revoked_at: string | null }, now: Date): KeyState {
  if (k.revoked_at) return "revoked";
  return new Date(k.expires_at) <= now ? "expired" : "active";
}
