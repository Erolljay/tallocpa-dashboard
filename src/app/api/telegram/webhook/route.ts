import { after, NextResponse, type NextRequest } from "next/server";
import { telegramEnv } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { telegramApi } from "@/lib/telegram/api";
import { handleUpdate, type TgUpdate } from "@/lib/telegram/webhook";

/** Filing an album downloads each file from Telegram; give it time after the reply. */
export const maxDuration = 60;

/**
 * The Telegram bot's webhook (docs/SETUP.md, "Telegram uploads"). Telegram sends the
 * secret set with setWebhook in a header; anything else is refused. Always answers 200
 * quickly once checked (Telegram retries otherwise) and files documents afterwards.
 */
export async function POST(request: NextRequest) {
  const env = telegramEnv();
  if (!env || request.headers.get("x-telegram-bot-api-secret-token") !== env.webhookSecret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const update = (await request.json().catch(() => null)) as TgUpdate | null;
  if (!update) return NextResponse.json({ ok: true });
  try {
    const later = await handleUpdate(supabaseAdmin(), telegramApi(env.token), update);
    if (later) after(() => later().catch((e: Error) => console.error("Telegram filing:", e.message)));
  } catch (e) {
    console.error("Telegram webhook:", e instanceof Error ? e.message : e);
  }
  return NextResponse.json({ ok: true });
}
