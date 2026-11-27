import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { monthChoices, openMonth } from "@/lib/documents/cutoff";
import { showMonth, type DocType } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { runOcr } from "@/lib/ocr/run";
import type { TelegramApi } from "./api";
import {
  BUTTON_LABELS,
  clientButtons,
  clientQuery,
  fileFromMessage,
  fitsType,
  isCommand,
  monthButtons,
  parseChoice,
  safeName,
  sendModeState,
  sendMonthButtons,
  sendResult,
  sendTypeButtons,
  startCode,
  typeButtons,
  type IncomingFile,
  type TgMessage,
} from "./intake";

export interface TgUpdate {
  update_id: number;
  message?: TgMessage;
  callback_query?: { id: string; from: { id: number }; data?: string; message?: { message_id: number; chat: { id: number } } };
}

const NOT_LINKED =
  "Hello! This is the Tallo CPA upload bot. To send documents here, sign in to Tallo CPA and tap “Link Telegram” (clients: on the Upload page; staff: in Settings → Notifications).";
const TURNED_OFF = "Telegram uploads are not on for your account. Please send your documents through the Tallo CPA portal.";
const STAFF_HELP = "Choose the client first: send /client and part of the client's name or code, e.g. /client molo";
const SEND_HELP = "To send many files of one kind, send /send and choose the type first; /done when finished.";
/** Clears a chat's /send choice (on /done, a new client, or relinking). */
const NO_SEND_MODE = { send_doc_type: null, send_month: null, send_active_at: null };

interface Link {
  chat_id: number;
  user_id: string;
  client_id: string | null;
  staff: boolean;
  send_doc_type: DocType | null;
  send_month: string | null;
  send_active_at: string | null;
  clients: { name: string; code: string; telegram_enabled: boolean; submission_cutoff_day: number } | null;
}

const loadLink = (admin: SupabaseClient, chatId: number) =>
  admin
    .from("telegram_links")
    .select("chat_id, user_id, client_id, staff, send_doc_type, send_month, send_active_at, clients(name, code, telegram_enabled, submission_cutoff_day)")
    .eq("chat_id", chatId)
    .maybeSingle<Link>();

const label = (t: DocType) => BUTTON_LABELS[t] ?? t;

/**
 * Handles one webhook update. Returns work to run after the response (filing files
 * can take a while; Telegram retries a webhook that does not answer quickly).
 *
 * Who and where: a chat sends only once linked from a signed-in account. A client's chat
 * files for that client, in the month open for documents. A staff chat files for the
 * client chosen with /client (only clients that person may upload for), in the month
 * they tap.
 *
 * Two ways to say what a file is: tap a button under each file (or album) after sending
 * it, or choose first with /send (staff: and the month) and then send any number of
 * files, each filed as it arrives, until /done or 30 minutes without a file.
 */
export async function handleUpdate(admin: SupabaseClient, tg: TelegramApi, update: TgUpdate): Promise<(() => Promise<void>) | null> {
  if (update.callback_query) return onChoice(admin, tg, update.callback_query);
  const m = update.message;
  if (!m || m.chat.type !== "private") return null;
  const chatId = m.chat.id;

  const code = startCode(m.text);
  if (code) {
    const { data, error } = await admin.rpc("telegram_link_chat", { p_code: code, p_chat: chatId, p_username: m.from?.username ?? null });
    if (error) {
      await tg.sendMessage(chatId, error.message);
      return null;
    }
    // A relinked chat starts without a /send choice.
    await admin.from("telegram_links").update(NO_SEND_MODE).eq("chat_id", chatId);
    const { data: link } = await loadLink(admin, chatId);
    await tg.sendMessage(
      chatId,
      link?.staff
        ? `Linked to your staff account, ${data as string}. ${STAFF_HELP}. Then send photos or PDFs and tap what they are and the month. ${SEND_HELP}`
        : `Linked to ${data as string}. Send photos or PDFs of your receipts, invoices and 2307s here, then tap what each one is. They go straight to Tallo CPA. ${SEND_HELP}`,
    );
    return null;
  }

  const { data: link } = await loadLink(admin, chatId);

  if (m.text?.trim().match(/^\/unlink(@\w+)?$/)) {
    if (link) await admin.from("telegram_links").delete().eq("chat_id", chatId);
    await tg.sendMessage(chatId, link ? "This chat is no longer linked. Nothing more will be sent to Tallo CPA from here." : NOT_LINKED);
    return null;
  }
  if (!link) {
    await tg.sendMessage(chatId, NOT_LINKED);
    return null;
  }

  const query = clientQuery(m.text);
  if (query !== null) {
    if (!link.staff) {
      await tg.sendMessage(chatId, `This chat sends documents for ${link.clients?.name ?? "your business"}.`);
      return null;
    }
    const { data: found } = await admin.rpc("telegram_staff_clients", { p_chat: chatId, p_query: query });
    const list = (found ?? []) as { id: string; code: string; name: string }[];
    await tg.sendMessage(
      chatId,
      list.length ? "Which client are these documents for?" : `No client of yours matches “${query}”. Try part of the name or the client code.`,
      list.length ? { keyboard: clientButtons(list) } : undefined,
    );
    return null;
  }

  if (!link.staff && !link.clients?.telegram_enabled) {
    await tg.sendMessage(chatId, TURNED_OFF);
    return null;
  }

  if (isCommand(m.text, "send")) {
    if (link.staff && !link.client_id) {
      await tg.sendMessage(chatId, STAFF_HELP);
      return null;
    }
    const forWhom = link.staff ? `For ${link.clients?.name} (${link.clients?.code}): ` : "";
    await tg.sendMessage(chatId, `${forWhom}What are you sending?`, { keyboard: sendTypeButtons() });
    return null;
  }
  if (isCommand(m.text, "done")) {
    await admin.from("telegram_links").update(NO_SEND_MODE).eq("chat_id", chatId);
    await tg.sendMessage(chatId, "Done. Send /send to choose a type again, or just send files and I'll ask.");
    return null;
  }

  const file = fileFromMessage(m);
  if (!file) {
    await tg.sendMessage(
      chatId,
      link.staff
        ? link.clients
          ? `Now sending for ${link.clients.name} (${link.clients.code}). Send photos or PDFs and tap what they are, or change the client with /client. ${SEND_HELP} Send /unlink to stop.`
          : STAFF_HELP
        : `This chat sends documents to Tallo CPA for ${link.clients?.name}. Send a photo or PDF, then tap what it is. ${SEND_HELP} Send /unlink to stop.`,
    );
    return null;
  }
  if (link.staff && !link.client_id) {
    await tg.sendMessage(chatId, `${STAFF_HELP}, then send the file again.`, { replyTo: m.message_id });
    return null;
  }
  if ("error" in file) {
    await tg.sendMessage(chatId, file.error, { replyTo: m.message_id });
    return null;
  }

  const mode = sendModeState(link, new Date());
  if (mode === "active") return sendUnderMode(admin, tg, link, m, file);

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
  const forWhom = link.staff ? `For ${link.clients?.name} (${link.clients?.code}): ` : "";
  let expired = "";
  if (mode === "expired") {
    // Clear only the choice read here, so a /send made meanwhile is kept.
    await admin.from("telegram_links").update(NO_SEND_MODE).eq("chat_id", chatId).eq("send_active_at", link.send_active_at);
    expired = "Your /send type choice expired after 30 minutes without files, so tap what this is (or /send again).\n";
  }
  await tg.sendMessage(chatId, `${expired}${forWhom}What is ${what}?`, { replyTo: m.message_id, keyboard: typeButtons(saved.id, file.mimeType) });
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
const UPLOAD_COLUMNS = "id, chat_id, client_id, media_group_id, file_id, file_name, mime_type";

/**
 * A file sent while the chat's /send choice is active: filed straight away as that type
 * (staff: in the month they chose; clients: the month open for documents), no buttons.
 *
 * One reply per file or album, correct when Telegram delivers an album's files as
 * separate, concurrent webhook calls:
 * - Each file's row is inserted already claimed (status 'filing'), so no button can touch
 *   it. The album's first row to be inserted holds the prompt (the unique index on
 *   (chat_id, media_group_id) where prompt); only that call sends the reply, and it stores
 *   the reply's message id on its row (reply_message_id).
 * - Every call, once its own file is filed or has failed, reads the whole album back from
 *   the table and edits that one reply with the tally (reportSend). It edits, waits for
 *   Telegram, reads again, and stops only when the text it would show is the one it just
 *   showed. So the last edit Telegram applies was followed by a read that saw every file
 *   finished before it, and a file finishing after that read edits again later: the reply
 *   ends on the album's final result whatever order the calls finish in. A call finishing
 *   before the prompt call stored the message id skips the edit; the prompt call reads
 *   the album after storing it, so it counts that file.
 * - A file that fails is named in the same reply.
 */
async function sendUnderMode(admin: SupabaseClient, tg: TelegramApi, link: Link, m: TgMessage, file: IncomingFile): Promise<(() => Promise<void>) | null> {
  const chatId = link.chat_id;
  const docType = link.send_doc_type as DocType;
  if (!fitsType(docType, file.mimeType)) {
    await tg.sendMessage(chatId, `${file.fileName}: a spreadsheet can only be sent as Payroll, so it was not sent. Send /send, choose Payroll, then send it again.`, {
      replyTo: m.message_id,
    });
    return null;
  }
  // Keep the choice alive, unless /done or another /send changed it meanwhile.
  await admin.from("telegram_links").update({ send_active_at: new Date().toISOString() }).eq("chat_id", chatId).eq("send_doc_type", docType);

  const month = link.staff && link.send_month ? link.send_month : openMonth(manilaToday(), link.clients?.submission_cutoff_day ?? 10);
  const row = {
    chat_id: chatId,
    user_id: link.user_id,
    client_id: link.client_id,
    media_group_id: m.media_group_id ?? null,
    file_id: file.fileId,
    file_name: file.fileName,
    mime_type: file.mimeType,
    size_bytes: Math.max(file.size, 1),
    status: "filing",
  };
  const first = await admin.from("telegram_uploads").insert({ ...row, prompt: true }).select(UPLOAD_COLUMNS).single<Upload>();
  const prompt = !first.error;
  const { data: upload, error } = first.error?.code === "23505" ? await admin.from("telegram_uploads").insert({ ...row, prompt: false }).select(UPLOAD_COLUMNS).single<Upload>() : first;
  if (error || !upload) {
    await tg.sendMessage(chatId, `Sorry, ${file.fileName} could not be received. Please try again or use the portal.`, { replyTo: m.message_id });
    return null;
  }
  const say = { label: label(docType), forWhom: link.staff && link.clients ? ` for ${link.clients.name}` : "", month: showMonth(month) };
  if (prompt) {
    const sent = await tg.sendMessage(chatId, sendResult({ filed: 0, failed: [], pending: 1 }, say.label, say.forWhom, say.month), { replyTo: m.message_id });
    if (sent) await admin.from("telegram_uploads").update({ reply_message_id: sent.message_id }).eq("id", upload.id);
  }
  return async () => {
    const { filed } = await fileUploads(admin, tg, [upload], docType, month);
    await reportSend(admin, tg, upload, say);
    for (const id of filed) await runOcr(admin, id).catch(() => undefined);
  };
}

/** Edits the one reply for a file or album sent under /send with its current tally (see sendUnderMode). */
async function reportSend(admin: SupabaseClient, tg: TelegramApi, upload: Upload, say: { label: string; forWhom: string; month: string }) {
  let shown = "";
  for (let i = 0; i < 10; i++) {
    let q = admin.from("telegram_uploads").select("status, file_name, prompt, reply_message_id").eq("chat_id", upload.chat_id).neq("status", "waiting");
    q = upload.media_group_id ? q.eq("media_group_id", upload.media_group_id) : q.eq("id", upload.id);
    const { data: rows } = await q.returns<{ status: string; file_name: string; prompt: boolean; reply_message_id: number | null }[]>();
    const reply = rows?.find((r) => r.prompt)?.reply_message_id;
    if (!rows || !reply) return;
    const text = sendResult(
      {
        filed: rows.filter((r) => r.status === "filed").length,
        failed: rows.filter((r) => r.status === "failed").map((r) => r.file_name),
        pending: rows.filter((r) => r.status === "filing").length,
      },
      say.label,
      say.forWhom,
      say.month,
    );
    if (text === shown) return;
    await tg.editMessage(upload.chat_id, reply, text);
    shown = text;
  }
}

/**
 * Files claimed uploads (status 'filing') as documents: downloads each from Telegram,
 * stores it where a portal upload would go, and records it. A file that fails is marked
 * failed with the reason. Returns the new documents' ids (for OCR) and the failed names.
 */
async function fileUploads(admin: SupabaseClient, tg: TelegramApi, uploads: Upload[], docType: DocType, month: string): Promise<{ filed: string[]; failed: string[] }> {
  const filed: string[] = [];
  const failed: string[] = [];
  for (const u of uploads) {
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
  return { filed, failed };
}

async function onChoice(admin: SupabaseClient, tg: TelegramApi, q: NonNullable<TgUpdate["callback_query"]>): Promise<(() => Promise<void>) | null> {
  const choice = parseChoice(q.data);
  const chatId = q.message?.chat.id;
  const messageId = q.message?.message_id;
  if (!choice || !chatId || !messageId) {
    await tg.answerCallback(q.id);
    return null;
  }

  if (choice.action === "client") {
    const { data: name, error } = await admin.rpc("telegram_set_client", { p_chat: chatId, p_client: choice.clientId });
    // A /send choice was for the previous client.
    if (!error) await admin.from("telegram_links").update(NO_SEND_MODE).eq("chat_id", chatId);
    await tg.answerCallback(q.id, error ? "Not allowed" : undefined);
    await tg.editMessage(
      chatId,
      messageId,
      error ? error.message : `Now sending for ${name as string}. Send the photos or PDFs, or /send to choose the type first. Change the client any time with /client.`,
    );
    return null;
  }

  if (choice.action === "sendType" || choice.action === "sendMonth") {
    const { data: link } = await loadLink(admin, chatId);
    const refusal = !link ? NOT_LINKED : link.staff ? (link.client_id ? null : STAFF_HELP) : link.clients?.telegram_enabled ? null : TURNED_OFF;
    if (!link || refusal) {
      await tg.answerCallback(q.id);
      await tg.editMessage(chatId, messageId, refusal ?? NOT_LINKED);
      return null;
    }
    // Staff tapped the kind: ask the month next (this month and the three before it).
    if (choice.action === "sendType" && link.staff) {
      await tg.answerCallback(q.id);
      await tg.editMessage(chatId, messageId, `${label(choice.docType)}. Which month is it for?`, sendMonthButtons(choice.docType, monthChoices(manilaToday(), 4)));
      return null;
    }
    // Staff: the month they tapped (never a future one). Clients: none; each file goes in the month open when it arrives.
    const month = link.staff && choice.action === "sendMonth" ? choice.month : null;
    if (month && month > manilaToday()) {
      await tg.answerCallback(q.id, "Choose this month or an earlier one");
      return null;
    }
    await admin.from("telegram_links").update({ send_doc_type: choice.docType, send_month: month, send_active_at: new Date().toISOString() }).eq("chat_id", chatId);
    const shownMonth = month ?? openMonth(manilaToday(), link.clients?.submission_cutoff_day ?? 10);
    await tg.answerCallback(q.id);
    await tg.editMessage(
      chatId,
      messageId,
      `Sending as ${label(choice.docType)} (for ${link.clients?.name ?? "your business"}, ${showMonth(shownMonth)}). Send the files now. /done when finished.`,
    );
    return null;
  }

  const { data: first } = await admin.from("telegram_uploads").select("id, chat_id, client_id, media_group_id, status").eq("id", choice.uploadId).maybeSingle<Upload & { status: string }>();
  if (!first || first.chat_id !== chatId || first.status !== "waiting") {
    await tg.answerCallback(q.id, "This file is no longer waiting.");
    return null;
  }
  const { data: link } = await loadLink(admin, chatId);

  // Staff tapped the kind: ask the month next (this month and the three before it).
  if (choice.action === "file" && link?.staff) {
    await tg.answerCallback(q.id);
    await tg.editMessage(chatId, messageId, `${label(choice.docType)}. Which month is it for?`, monthButtons(first.id, choice.docType, monthChoices(manilaToday(), 4)));
    return null;
  }

  // Claim the file (and the rest of its album) so a second tap does nothing.
  const cancel = choice.action === "cancel";
  let claim = admin.from("telegram_uploads").update(cancel ? { status: "failed", error: "cancelled" } : { status: "filing" }).eq("status", "waiting").eq("chat_id", chatId);
  claim = first.media_group_id ? claim.eq("media_group_id", first.media_group_id) : claim.eq("id", first.id);
  const { data: claimed } = await claim.select(UPLOAD_COLUMNS).returns<Upload[]>();
  if (!claimed?.length) {
    await tg.answerCallback(q.id, "Already done.");
    return null;
  }
  if (choice.action === "cancel") {
    await tg.answerCallback(q.id, "Cancelled");
    await tg.editMessage(chatId, messageId, "Cancelled. Nothing was sent to Tallo CPA.");
    return null;
  }

  const docType: DocType = choice.docType;
  const kind = label(docType);
  await tg.answerCallback(q.id, "Sending…");
  await tg.editMessage(chatId, messageId, `Sending ${claimed.length === 1 ? "it" : `${claimed.length} files`} to Tallo CPA as ${kind}…`);

  return async () => {
    const { data: client } = await admin.from("clients").select("name, submission_cutoff_day").eq("id", first.client_id).single<{ name: string; submission_cutoff_day: number }>();
    // Clients: the month open for documents. Staff: the month they tapped.
    const month = choice.action === "month" ? choice.month : openMonth(manilaToday(), client?.submission_cutoff_day ?? 10);
    const { filed, failed } = await fileUploads(admin, tg, claimed, docType, month);
    const forWhom = link?.staff && client ? ` for ${client.name}` : "";
    const lines: string[] = [];
    if (filed.length) lines.push(`✓ Sent to Tallo CPA${forWhom}: ${filed.length === 1 ? "1 file" : `${filed.length} files`} as ${kind} for ${showMonth(month)}.`);
    if (failed.length) lines.push(`Could not send ${failed.join(", ")}. Please send ${failed.length === 1 ? "it" : "them"} again or use the portal.`);
    await tg.editMessage(chatId, messageId, lines.join("\n"));
    // Read each document with OCR, as a portal upload is; the nightly job retries any it misses.
    for (const id of filed) await runOcr(admin, id).catch(() => undefined);
  };
}
