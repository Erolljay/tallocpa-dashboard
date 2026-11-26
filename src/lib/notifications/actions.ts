"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";
import { isNotificationKind } from "./kinds";

export type NotificationActionResult = { ok: true; count?: number } | { ok: false; error: string };

const MAX_IDS = 200;

function revalidateLists() {
  revalidatePath("/app/notifications");
  revalidatePath("/portal/notifications");
}

/** Marks the given notifications read, or every unread one when `ids` is omitted. */
export async function markRead(ids?: number[]): Promise<NotificationActionResult> {
  if (ids !== undefined) {
    if (!Array.isArray(ids) || ids.length > MAX_IDS || !ids.every((id) => Number.isSafeInteger(id) && id > 0)) {
      return { ok: false, error: "Choose which notifications to mark as read." };
    }
    if (ids.length === 0) return { ok: true, count: 0 };
  }
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("mark_notifications_read", { p_ids: ids ?? null });
  if (error) return { ok: false, error: error.message };
  revalidateLists();
  return { ok: true, count: typeof data === "number" ? data : undefined };
}

/** Marks every unread notification read. */
export async function markAllRead(): Promise<NotificationActionResult> {
  return markRead();
}

/** Turns one kind's email on or off for the signed-in person. The bell always shows every kind. */
export async function setEmailPreference(kind: string, on: boolean): Promise<NotificationActionResult> {
  if (typeof kind !== "string" || !isNotificationKind(kind)) return { ok: false, error: "Unknown kind of notification." };
  if (typeof on !== "boolean") return { ok: false, error: "Choose on or off." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_notification_email", { p_kind: kind, p_email: on });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/app/settings/notifications");
  revalidatePath("/portal/settings/notifications");
  return { ok: true };
}
