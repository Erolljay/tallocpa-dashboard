import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { telegramEnv } from "@/lib/env";
import type { ClaimedNotification } from "@/lib/notifications/dispatch";
import { telegramApi, type TelegramApi } from "./api";

/**
 * Sends a client's notification to each Telegram chat they linked, for clients with
 * Telegram on. Runs alongside the notification email (same settings decide what is
 * sent). At most once per notification; never throws. Staff are not messaged.
 */
export async function notifyTelegram(admin: SupabaseClient, n: ClaimedNotification, origin: string, api?: TelegramApi): Promise<void> {
  if (n.is_staff) return;
  const env = telegramEnv();
  if (!env) return;
  try {
    let q = admin.from("telegram_links").select("chat_id, clients!inner(telegram_enabled)").eq("user_id", n.user_id).eq("clients.telegram_enabled", true);
    if (n.client_id) q = q.eq("client_id", n.client_id);
    const { data: chats } = await q.returns<{ chat_id: number }[]>();
    if (!chats?.length) return;
    // Claim the notification for Telegram first, so a retried email does not resend it.
    const { data: claimed } = await admin.from("notifications").update({ telegram_sent_at: new Date().toISOString() }).eq("id", n.id).is("telegram_sent_at", null).select("id");
    if (!claimed?.length) return;
    const tg = api ?? telegramApi(env.token);
    const link = n.href ? `\n\n${origin.replace(/\/+$/, "")}${n.href}` : "";
    const text = [n.title, n.body?.trim()].filter(Boolean).join("\n\n") + link;
    for (const c of chats) await tg.sendMessage(c.chat_id, text.slice(0, 4000));
  } catch (e) {
    console.error(`Notification ${n.id}: Telegram:`, e instanceof Error ? e.message : e);
  }
}
