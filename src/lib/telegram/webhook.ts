import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { openMonth } from "@/lib/documents/cutoff";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { runOcr } from "@/lib/ocr/run";
import type { TelegramApi } from "./api";
import { BUTTON_LABELS, fileFromMessage, parseChoice, safeName, startCode, typeButtons, type TgMessage } from "./intake";

export interface TgUpdate {
  update_id: number;
  message?: TgMessage;
  callback_query?: { id: string; from: { id: number }; data?: string; message?: { message_id: number; chat: { id: number } } };
}

const NOT_LINKED =
  "Hello! This is the Tallo CPA upload bot. To send documents here, sign in to the Tallo CPA portal, open Upload, and tap “Link Telegram”.";
const TURNED_OFF = "Telegram uploads are not on for your account. Please send your documents through the Tallo CPA portal.";

interface Link {
  chat_id: number;
  user_id: string;
  client_id: string;
  clients: { name: string; telegram_enabled: boolean } | null;
}

/**
 * Handles one webhook update. Returns work to run after the response (filing files
 * can take a while; Telegram retries a webhook that does not answer quickly).
 */
export async function handleUpdate(admin: SupabaseClient, tg: TelegramApi, update: TgUpdate): Promise<(() => Promise<void>) | null> {
  if (update.callback_query) return onChoice(admin, tg, update.callback_query);
  const m = update.message;
  if (!m || m.chat.type !== "private") return null;
  const chatId = m.chat.id;

  const code = startCode(m.text);
  if (code) {
    const { data, error } = await admin.rpc("telegram_link_chat", { p_code: code, p_chat: chatId, p_username: m.from?.username ?? null });
    await tg.sendMessage(
      chatId,
      error
        ? error.message
        : `Linked to ${data as string}. Send photos or PDFs of your receipts, invoices and 2307s here, then tap what each one is. They go straight to Tallo CPA.`,
    );
    return null;
  }

  const { data: link } = await admin
    .from("telegram_links")
    .select("chat_id, user_id, client_id, clients(name, telegram_enabled)")
    .eq("chat_id", chatId)
    .maybeSingle<Link>();

  if (m.text?.trim().match(/^\/unlink(@\w+)?$/)) {
    if (link) await admin.from("telegram_links").delete().eq("chat_id", chatId);
    await tg.sendMessage(chatId, link ? "This chat is no longer linked. Nothing more will be sent to Tallo CPA from here." : NOT_LINKED);
    return null;
  }

  const file = fileFromMessage(m);
  if (!link) {
    await tg.sendMessage(chatId, NOT_LINKED);
    return null;
  }
  if (!link.clients?.telegram_enabled) {
    await tg.sendMessage(chatId, TURNED_OFF);
    return null;
  }
  if (!file) {
    await tg.sendMessage(chatId, `This chat sends documents to Tallo CPA for ${link.clients.name}. Send a photo or PDF, then tap what it is. Send /unlink to stop.`);
    return null;
  }
  if ("error" in file) {
    await tg.sendMessage(chatId, file.error, { replyTo: m.message_id });
    return null;
  }

  const row = {
    chat_id: chatId,
    user_id: link.user_id,
    client_id: link.client_id,
    media_group_id: m.media_group_id ?? null,
    file_id: file.fileId,
    file_name: file.fileName,
    mime_type: file.mimeType,
    size_bytes: Math.max(file.size, 1),
  };
  // One set of buttons per album: the first photo of an album to arrive holds the prompt.
  const { data: saved, error } = await admin.from("telegram_uploads").insert({ ...row, prompt: true }).select("id").single<{ id: string }>();
  if (error?.code === "23505") {
    await admin.from("telegram_uploads").insert({ ...row, prompt: false });
    return null;
  }
  if (error || !saved) {
    await tg.sendMessage(chatId, "Sorry, that file could not be received. Please try again or use the portal.", { replyTo: m.message_id });
    return null;
  }
  const what = m.media_group_id ? "these files" : file.fileName.startsWith("photo_") ? "this photo" : file.fileName;
  await tg.sendMessage(chatId, `What is ${what}?`, { replyTo: m.message_id, keyboard: typeButtons(saved.id, file.mimeType) });
  return null;
}

interface Upload {
  id: string;
  chat_id: number;
  client_id: string;
  media_group_id: string | null;
  file_id: string;
  file_name: string;
  mime_type: string;
}

async function onChoice(admin: SupabaseClient, tg: TelegramApi, q: NonNullable<TgUpdate["callback_query"]>): Promise<(() => Promise<void>) | null> {
  const choice = parseChoice(q.data);
  const chatId = q.message?.chat.id;
  const messageId = q.message?.message_id;
  if (!choice || !chatId || !messageId) {
    await tg.answerCallback(q.id);
    return null;
  }
  const { data: first } = await admin.from("telegram_uploads").select("id, chat_id, client_id, media_group_id").eq("id", choice.uploadId).maybeSingle<Upload>();
  if (!first || first.chat_id !== chatId) {
    await tg.answerCallback(q.id, "This file is no longer waiting.");
    return null;
  }

  // Claim the file (and the rest of its album) so a second tap does nothing.
  let claim = admin.from("telegram_uploads").update({ status: choice.action === "cancel" ? "failed" : "filing", ...(choice.action === "cancel" ? { error: "cancelled" } : {}) }).eq("status", "waiting").eq("chat_id", chatId);
  claim = first.media_group_id ? claim.eq("media_group_id", first.media_group_id) : claim.eq("id", first.id);
  const { data: claimed } = await claim.select("id, chat_id, client_id, media_group_id, file_id, file_name, mime_type").returns<Upload[]>();
  if (!claimed?.length) {
    await tg.answerCallback(q.id, "Already done.");
    return null;
  }
  if (choice.action === "cancel") {
    await tg.answerCallback(q.id, "Cancelled");
    await tg.editMessage(chatId, messageId, "Cancelled. Nothing was sent to Tallo CPA.");
    return null;
  }

  const docType = choice.docType;
  const label = BUTTON_LABELS[docType] ?? docType;
  await tg.answerCallback(q.id, "Sending…");
  await tg.editMessage(chatId, messageId, `Sending ${claimed.length === 1 ? "it" : `${claimed.length} files`} to Tallo CPA as ${label}…`);

  return async () => {
    const { data: client } = await admin.from("clients").select("submission_cutoff_day").eq("id", first.client_id).single<{ submission_cutoff_day: number }>();
    const month = openMonth(manilaToday(), client?.submission_cutoff_day ?? 10);
    const filed: string[] = [];
    const failed: string[] = [];
    for (const u of claimed) {
      try {
        const bytes = await tg.download(u.file_id);
        const id = crypto.randomUUID();
        const path = `${u.client_id}/${id}/${safeName(u.file_name)}`;
        const { error: upError } = await admin.storage.from("documents").upload(path, bytes, { contentType: u.mime_type, upsert: false });
        if (upError) throw new Error(upError.message);
        const { data: doc, error } = await admin.rpc("telegram_file_document", { p_upload: u.id, p_id: id, p_doc_type: docType, p_month: month, p_path: path });
        if (error) throw new Error(error.message);
        filed.push((doc as { id: string }).id);
      } catch (e) {
        failed.push(u.file_name);
        await admin.from("telegram_uploads").update({ status: "failed", error: (e as Error).message.slice(0, 500) }).eq("id", u.id);
      }
    }
    const lines: string[] = [];
    if (filed.length) lines.push(`✓ Sent to Tallo CPA: ${filed.length === 1 ? "1 file" : `${filed.length} files`} as ${label} for ${showMonth(month)}.`);
    if (failed.length) lines.push(`Could not send ${failed.join(", ")}. Please send ${failed.length === 1 ? "it" : "them"} again or use the portal.`);
    await tg.editMessage(chatId, messageId, lines.join("\n"));
    // Read each document with OCR, as a portal upload is; the nightly job retries any it misses.
    for (const id of filed) await runOcr(admin, id).catch(() => undefined);
  };
}
