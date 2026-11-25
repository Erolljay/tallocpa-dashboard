import "server-only";
/**
 * The firm's eSubmission mailbox through the Gmail REST API, with the mailbox's stored
 * refresh token (src/lib/env.ts, docs/SETUP.md). Only what eSubmission needs: send a
 * message, read a thread, fetch an attachment.
 */
import type { EsubmissionMailEnv } from "@/lib/env";
import { buildMime, toRaw, type OutgoingMail } from "./mime";

const API = "https://gmail.googleapis.com/gmail/v1/users/me";

async function accessToken(env: EsubmissionMailEnv): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: env.clientId, client_secret: env.clientSecret, refresh_token: env.refreshToken, grant_type: "refresh_token" }),
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as { access_token?: string; error?: string; error_description?: string };
  if (!res.ok || !body.access_token) throw new Error(`Google sign-in for the eSubmission mailbox failed: ${body.error_description ?? body.error ?? res.status}`);
  return body.access_token;
}

async function call<T>(env: EsubmissionMailEnv, token: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(`Gmail: ${body.error?.message ?? res.status}`);
  return body;
}

/** Sends a message from the mailbox. Returns Gmail's message and thread ids. */
export async function sendMail(env: EsubmissionMailEnv, mail: Omit<OutgoingMail, "from" | "to">): Promise<{ id: string; threadId: string }> {
  const token = await accessToken(env);
  const raw = toRaw(buildMime({ ...mail, from: env.mailbox, to: env.to }));
  return call<{ id: string; threadId: string }>(env, token, "/messages/send", { method: "POST", body: JSON.stringify({ raw }) });
}

export interface MailPart {
  mimeType?: string;
  filename?: string;
  headers?: { name: string; value: string }[];
  body?: { data?: string; attachmentId?: string; size?: number };
  parts?: MailPart[];
}
export interface MailMessage {
  id: string;
  internalDate?: string;
  payload?: MailPart;
}

/** A thread's messages, oldest first, with their parts. */
export async function readThread(env: EsubmissionMailEnv, threadId: string): Promise<{ token: string; messages: MailMessage[] }> {
  const token = await accessToken(env);
  const t = await call<{ messages?: MailMessage[] }>(env, token, `/threads/${encodeURIComponent(threadId)}?format=full`);
  return { token, messages: t.messages ?? [] };
}

/** An attachment's bytes. */
export async function readAttachment(env: EsubmissionMailEnv, token: string, messageId: string, attachmentId: string): Promise<Buffer> {
  const a = await call<{ data?: string }>(env, token, `/messages/${encodeURIComponent(messageId)}/attachments/${encodeURIComponent(attachmentId)}`);
  return Buffer.from(a.data ?? "", "base64url");
}

/** Every part of a message, flattened. */
export function partsOf(p: MailPart | undefined): MailPart[] {
  if (!p) return [];
  return [p, ...(p.parts ?? []).flatMap(partsOf)];
}

export const headerOf = (m: MailMessage, name: string) =>
  m.payload?.headers?.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ?? "";

/** The message's text (plain parts, else HTML without tags). */
export function textOf(m: MailMessage): string {
  const parts = partsOf(m.payload).filter((p) => !p.filename && p.body?.data);
  const plain = parts.filter((p) => p.mimeType === "text/plain");
  const use = plain.length ? plain : parts.filter((p) => p.mimeType === "text/html");
  return use
    .map((p) => Buffer.from(p.body!.data!, "base64url").toString("utf8"))
    .map((s) => s.replace(/<[^>]+>/g, " "))
    .join("\n")
    .trim();
}
