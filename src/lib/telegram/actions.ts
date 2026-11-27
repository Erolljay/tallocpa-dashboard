"use server";

import { revalidatePath } from "next/cache";
import { getIdentity, requireStaff } from "@/lib/auth";
import { telegramEnv } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase/server";

export type LinkState = { url?: string; error?: string };

/** Portal user: a one-time t.me link that links their Telegram chat to this client. */
export async function telegramLinkAction(clientId: string): Promise<LinkState> {
  await getIdentity();
  const env = telegramEnv();
  if (!env) return { error: "Telegram is not set up yet. Please use the upload form for now." };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("telegram_link_code", { p_client: clientId });
  if (error) return { error: error.message };
  return { url: `https://t.me/${env.username}?start=${data as string}` };
}

/** Staff: a one-time t.me link that links their own Telegram chat (they choose the client in the bot). */
export async function telegramStaffLinkAction(): Promise<LinkState> {
  await requireStaff();
  const env = telegramEnv();
  if (!env) return { error: "The Telegram bot is not set up yet (docs/SETUP.md, “Telegram uploads”)." };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("telegram_staff_link_code");
  if (error) return { error: error.message };
  return { url: `https://t.me/${env.username}?start=${data as string}` };
}

/** Portal user or staff: stop a linked chat sending documents. */
export async function telegramUnlinkAction(chatId: number): Promise<{ ok?: true; error?: string }> {
  await getIdentity();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("telegram_links").delete().eq("chat_id", chatId);
  if (error) return { error: error.message };
  revalidatePath("/portal/upload");
  revalidatePath("/app/clients", "layout");
  revalidatePath("/app/settings/notifications");
  return { ok: true };
}

/** Staff who manage the client: switch Telegram uploads on or off for it. */
export async function setTelegramEnabledAction(clientId: string, on: boolean): Promise<{ ok?: true; error?: string }> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("clients").update({ telegram_enabled: on }).eq("id", clientId).select("id");
  if (error) return { error: error.message };
  if (!data?.length) return { error: "Only the Owner or staff assigned to this client can change this." };
  revalidatePath(`/app/clients/${clientId}`);
  revalidatePath("/portal", "layout");
  return { ok: true };
}
