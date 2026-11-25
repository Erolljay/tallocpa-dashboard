/**
 * Refresh tokens at rest: AES-256-GCM with the server-only key GOOGLE_TOKEN_KEY (32 bytes,
 * base64). Stored as "iv.ciphertext.tag" in base64. The database never sees the key, so a
 * copy of the database alone cannot use a staff member's calendar.
 */
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

export function parseKey(b64: string): Buffer {
  const key = Buffer.from(b64, "base64");
  if (key.length !== 32) throw new Error("GOOGLE_TOKEN_KEY must be 32 bytes, base64 encoded (openssl rand -base64 32).");
  return key;
}

export function sealToken(plain: string, key: Buffer): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return [iv, body, cipher.getAuthTag()].map((b) => b.toString("base64")).join(".");
}

export function openToken(sealed: string, key: Buffer): string {
  const [iv, body, tag] = sealed.split(".").map((p) => Buffer.from(p, "base64"));
  if (!iv || !body || !tag || iv.length !== 12 || tag.length !== 16) throw new Error("Stored token is not in the expected form.");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(body), decipher.final()]).toString("utf8");
}
