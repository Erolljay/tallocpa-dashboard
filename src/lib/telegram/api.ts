import "server-only";
import type { InlineKeyboard } from "./intake";

/** The few Telegram Bot API calls the upload bot makes. */
export interface TelegramApi {
  sendMessage(chatId: number, text: string, opts?: { replyTo?: number; keyboard?: InlineKeyboard }): Promise<{ message_id: number } | null>;
  editMessage(chatId: number, messageId: number, text: string, keyboard?: InlineKeyboard): Promise<void>;
  answerCallback(callbackId: string, text?: string): Promise<void>;
  /** Downloads a file the client sent. */
  download(fileId: string): Promise<ArrayBuffer>;
}

export function telegramApi(token: string): TelegramApi {
  const base = `https://api.telegram.org/bot${token}`;
  async function call<T>(method: string, body: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${base}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const json = (await res.json().catch(() => null)) as { ok: boolean; result?: T; description?: string } | null;
    if (!json?.ok) throw new Error(`Telegram ${method}: ${json?.description ?? res.status}`);
    return json.result as T;
  }
  return {
    async sendMessage(chatId, text, opts) {
      return call<{ message_id: number }>("sendMessage", {
        chat_id: chatId,
        text,
        ...(opts?.replyTo ? { reply_parameters: { message_id: opts.replyTo, allow_sending_without_reply: true } } : {}),
        ...(opts?.keyboard ? { reply_markup: { inline_keyboard: opts.keyboard } } : {}),
      }).catch(() => null);
    },
    async editMessage(chatId, messageId, text, keyboard) {
      await call("editMessageText", { chat_id: chatId, message_id: messageId, text, ...(keyboard ? { reply_markup: { inline_keyboard: keyboard } } : {}) }).catch(() => undefined);
    },
    async answerCallback(callbackId, text) {
      await call("answerCallbackQuery", { callback_query_id: callbackId, ...(text ? { text } : {}) }).catch(() => undefined);
    },
    async download(fileId) {
      const file = await call<{ file_path?: string }>("getFile", { file_id: fileId });
      if (!file.file_path) throw new Error("Telegram did not return the file.");
      const res = await fetch(`https://api.telegram.org/file/bot${token}/${file.file_path}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Could not download the file (${res.status}).`);
      return res.arrayBuffer();
    },
  };
}
