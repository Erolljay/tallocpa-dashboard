"use server";

import { revalidatePath } from "next/cache";
import { decideBooksUnlock, lockBooksMonth, requestBooksLock, requestBooksUnlock } from "@/lib/books/actions";
import { getIdentity } from "@/lib/auth";

/** Month lock (docs/REWORK.md, decision 9). The database decides who may do what. */
export type LockState = { ok?: string; error?: string };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const MONTH = /^\d{4}-\d{2}-01$/;

function refresh(clientId: string | null) {
  if (clientId) {
    revalidatePath(`/app/clients/${clientId}/books`, "layout");
    revalidatePath(`/app/clients/${clientId}/returns`);
  }
  revalidatePath("/app");
  revalidatePath("/app/deadlines");
  revalidatePath("/app/review");
  revalidatePath("/app/work");
}

async function run(clientId: string | null, ok: string, fn: () => Promise<unknown>): Promise<LockState> {
  await getIdentity();
  try {
    await fn();
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Something went wrong. Try again." };
  }
  refresh(clientId);
  return { ok };
}

export async function requestLockAction(clientId: string, month: string): Promise<LockState> {
  if (!MONTH.test(month)) return { error: "Choose the month." };
  return run(clientId, "Lock requested. The reviewer has it.", () => requestBooksLock(clientId, month));
}

export async function lockMonthAction(clientId: string, month: string, _: LockState, form: FormData): Promise<LockState> {
  if (!MONTH.test(month)) return { error: "Choose the month." };
  return run(clientId, "Month locked.", () => lockBooksMonth(clientId, month, text(form.get("note")) || null));
}

export async function requestUnlockAction(clientId: string, month: string, _: LockState, form: FormData): Promise<LockState> {
  if (!MONTH.test(month)) return { error: "Choose the month." };
  const reason = text(form.get("reason"));
  if (!reason) return { error: "Give the reason for unlocking." };
  return run(clientId, "Done.", () => requestBooksUnlock(clientId, month, reason));
}

export async function decideUnlockAction(requestId: string, clientId: string | null, _: LockState, form: FormData): Promise<LockState> {
  const approve = form.get("decision") === "approve";
  const note = text(form.get("note"));
  if (!approve && !note) return { error: "Give the reason for rejecting it." };
  return run(clientId, approve ? "Unlocked." : "Rejected.", () => decideBooksUnlock(requestId, approve, note || null));
}
