/**
 * Telegram intake rules (docs/SETUP.md, "Telegram uploads"): what the bot accepts and the
 * buttons it shows. Pure, so the webhook and the tests share them.
 */
import { CLIENT_DOC_TYPES, fitsDocType, SPREADSHEET_TYPES, type DocType } from "@/lib/documents/labels";

/** The Bot API lets a bot download files up to 20 MB, the same limit as the portal. */
export const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];

/** The parts of a Telegram message the bot reads. */
export interface TgMessage {
  message_id: number;
  chat: { id: number; type: string };
  from?: { id: number; username?: string; first_name?: string };
  text?: string;
  caption?: string;
  media_group_id?: string;
  photo?: { file_id: string; file_unique_id: string; file_size?: number; width: number; height: number }[];
  document?: { file_id: string; file_unique_id: string; file_name?: string; mime_type?: string; file_size?: number };
}

export interface IncomingFile {
  fileId: string;
  fileName: string;
  mimeType: string;
  size: number;
}

/** The file in a message, or why it cannot be taken. Null when the message has no file. */
export function fileFromMessage(m: TgMessage): IncomingFile | { error: string } | null {
  if (m.photo?.length) {
    // Telegram sends each photo in several sizes; take the largest.
    const p = [...m.photo].sort((a, b) => b.width * b.height - a.width * a.height)[0];
    return checked({ fileId: p.file_id, fileName: `photo_${m.message_id}.jpg`, mimeType: "image/jpeg", size: p.file_size ?? 0 });
  }
  if (m.document) {
    const d = m.document;
    const name = d.file_name?.trim() || `file_${m.message_id}`;
    return checked({ fileId: d.file_id, fileName: name, mimeType: (d.mime_type || mimeFromName(name)).toLowerCase(), size: d.file_size ?? 0 });
  }
  return null;
}

function checked(f: IncomingFile): IncomingFile | { error: string } {
  if (!ALLOWED.includes(f.mimeType) && !SPREADSHEET_TYPES.includes(f.mimeType)) {
    return { error: `${f.fileName}: only photos, PDF files, and Excel or CSV for payroll can be sent.` };
  }
  if (f.size > MAX_BYTES) return { error: `${f.fileName} is over 20 MB. Send it from the portal in smaller parts.` };
  return f;
}

function mimeFromName(name: string): string {
  const ext = name.toLowerCase().split(".").pop() ?? "";
  return (
    {
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      heic: "image/heic",
      heif: "image/heif",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      xls: "application/vnd.ms-excel",
      csv: "text/csv",
    }[ext] ?? "application/octet-stream"
  );
}

/** Short button labels; a spreadsheet can only be payroll, and payroll only a spreadsheet. */
export const BUTTON_LABELS: Partial<Record<DocType, string>> = {
  sales_invoice: "Sales invoice / OR",
  bir_2307_received: "2307 from customer",
  purchase_receipt: "Purchase / expense",
  bir_2307_issued: "2307 we issued",
  payroll: "Payroll",
  cor: "BIR COR",
  other: "Other",
};

const CODES: Record<string, DocType> = { s: "sales_invoice", r: "bir_2307_received", p: "purchase_receipt", i: "bir_2307_issued", y: "payroll", c: "cor", o: "other" };
const CODE_OF = Object.fromEntries(Object.entries(CODES).map(([k, v]) => [v, k])) as Record<DocType, string>;

export type InlineKeyboard = { text: string; callback_data: string }[][];

/** The buttons under a received file (callback data "f:<code>:<upload id>", under Telegram's 64 bytes). */
export function typeButtons(uploadId: string, mimeType: string): InlineKeyboard {
  const types: DocType[] = CLIENT_DOC_TYPES.filter((t) => fitsDocType(t, mimeType));
  const buttons = types.map((t) => ({ text: BUTTON_LABELS[t] ?? t, callback_data: `f:${CODE_OF[t]}:${uploadId}` }));
  const rows: InlineKeyboard = [];
  for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));
  rows.push([{ text: "Cancel", callback_data: `x:${uploadId}` }]);
  return rows;
}

const monthLabel = new Intl.DateTimeFormat("en-PH", { month: "short", year: "numeric", timeZone: "UTC" });

/** Staff: after the kind, the month it is for (callback "m:<code>:<yyyymm>:<upload id>"). Months are "YYYY-MM-01", newest first. */
export function monthButtons(uploadId: string, docType: DocType, months: string[]): InlineKeyboard {
  const buttons = months.map((m) => ({ text: monthLabel.format(new Date(`${m}T00:00:00Z`)), callback_data: `m:${CODE_OF[docType]}:${m.slice(0, 4)}${m.slice(5, 7)}:${uploadId}` }));
  const rows: InlineKeyboard = [];
  for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));
  rows.push([{ text: "Cancel", callback_data: `x:${uploadId}` }]);
  return rows;
}

/** Staff: the clients matching /client, one button each (callback "c:<client id>"). */
export function clientButtons(clients: { id: string; code: string; name: string }[]): InlineKeyboard {
  return clients.map((c) => [{ text: `${c.name} (${c.code})`.slice(0, 60), callback_data: `c:${c.id}` }]);
}

/**
 * /send ("choose the type first"): the kind before any file arrives (callback "t:<code>").
 * Every client type is offered; a spreadsheet sent later is taken only as Payroll, and Payroll only takes a spreadsheet.
 */
export function sendTypeButtons(): InlineKeyboard {
  const buttons = CLIENT_DOC_TYPES.map((t) => ({ text: BUTTON_LABELS[t] ?? t, callback_data: `t:${CODE_OF[t]}` }));
  const rows: InlineKeyboard = [];
  for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));
  return rows;
}

/** /send, staff: the month after the kind (callback "tm:<code>:<yyyymm>"). Months are "YYYY-MM-01", newest first. */
export function sendMonthButtons(docType: DocType, months: string[]): InlineKeyboard {
  const buttons = months.map((m) => ({ text: monthLabel.format(new Date(`${m}T00:00:00Z`)), callback_data: `tm:${CODE_OF[docType]}:${m.slice(0, 4)}${m.slice(5, 7)}` }));
  const rows: InlineKeyboard = [];
  for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));
  return rows;
}

/** A /send choice lapses after this long without a file. */
export const SEND_IDLE_MS = 30 * 60 * 1000;

/** The /send choice on a chat: "active" while chosen and used within 30 minutes, "expired" once idle longer. */
export function sendModeState(mode: { send_doc_type: string | null; send_active_at: string | null }, now: Date): "active" | "expired" | "none" {
  if (!mode.send_doc_type || !mode.send_active_at) return "none";
  return now.getTime() - Date.parse(mode.send_active_at) <= SEND_IDLE_MS ? "active" : "expired";
}

/** A spreadsheet can only be payroll, and payroll only a spreadsheet (lib/documents/labels fitsDocType). */
export function fitsType(docType: DocType, mimeType: string): boolean {
  return fitsDocType(docType, mimeType);
}

export type Choice =
  | { action: "file"; docType: DocType; uploadId: string }
  | { action: "sendType"; docType: DocType }
  | { action: "sendMonth"; docType: DocType; month: string }
  | { action: "month"; docType: DocType; month: string; uploadId: string }
  | { action: "client"; clientId: string }
  | { action: "cancel"; uploadId: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Reads a button press; null for anything the bot did not send. */
export function parseChoice(data: string | undefined): Choice | null {
  if (!data) return null;
  const parts = data.split(":");
  if (parts[0] === "x" && parts.length === 2 && UUID.test(parts[1])) return { action: "cancel", uploadId: parts[1] };
  if (parts[0] === "f" && parts.length === 3 && CODES[parts[1]] && UUID.test(parts[2])) return { action: "file", docType: CODES[parts[1]], uploadId: parts[2] };
  if (parts[0] === "m" && parts.length === 4 && CODES[parts[1]] && /^\d{4}(0[1-9]|1[0-2])$/.test(parts[2]) && UUID.test(parts[3])) {
    return { action: "month", docType: CODES[parts[1]], month: `${parts[2].slice(0, 4)}-${parts[2].slice(4)}-01`, uploadId: parts[3] };
  }
  if (parts[0] === "t" && parts.length === 2 && CODES[parts[1]]) return { action: "sendType", docType: CODES[parts[1]] };
  if (parts[0] === "tm" && parts.length === 3 && CODES[parts[1]] && /^\d{4}(0[1-9]|1[0-2])$/.test(parts[2])) {
    return { action: "sendMonth", docType: CODES[parts[1]], month: `${parts[2].slice(0, 4)}-${parts[2].slice(4)}-01` };
  }
  if (parts[0] === "c" && parts.length === 2 && UUID.test(parts[1])) return { action: "client", clientId: parts[1] };
  return null;
}

/** "/client <words>": the words (may be empty), or null for any other message. */
export function clientQuery(text: string | undefined): string | null {
  const m = text?.trim().match(/^\/client(?:@\w+)?(?:\s+([\s\S]*))?$/);
  return m ? (m[1] ?? "").trim().slice(0, 60) : null;
}

/** What became of a file or album sent under /send so far (its rows' statuses). */
export interface SendTally {
  filed: number;
  failed: string[];
  pending: number;
}

/**
 * The bot's one message for a file or album sent under /send, edited as each file is
 * filed: "Sending…" while any are still on their way, then the result.
 */
export function sendResult(t: SendTally, label: string, forWhom: string, month: string): string {
  const total = t.filed + t.failed.length + t.pending;
  const files = (n: number) => (n === 1 ? "1 file" : `${n} files`);
  if (t.pending) {
    const done = t.filed + t.failed.length;
    return `Sending to Tallo CPA as ${label}${forWhom}, ${month}…${done ? ` ${done} of ${total} done.` : ""}`;
  }
  const lines: string[] = [];
  if (t.filed) lines.push(`✓ Sent to Tallo CPA${forWhom}: ${files(t.filed)} as ${label} for ${month}.`);
  if (t.failed.length) lines.push(`Could not send ${t.failed.join(", ")}. Please send ${t.failed.length === 1 ? "it" : "them"} again or use the portal.`);
  return lines.join("\n");
}

/** Is the message this bare command ("/send", "/send@TalloBot")? */
export function isCommand(text: string | undefined, name: string): boolean {
  return new RegExp(`^/${name}(@\\w+)?$`).test(text?.trim() ?? "");
}

/** "/start <code>" from the portal's link; the code is 32 hex characters. */
export function startCode(text: string | undefined): string | null {
  const m = text?.trim().match(/^\/start(?:@\w+)?\s+([0-9a-f]{32})$/);
  return m ? m[1] : null;
}

/** The storage name the portal would give the file (mirrors register_document()). */
export function safeName(fileName: string): string {
  const base = fileName.trim() || "document";
  return base.replace(/[^A-Za-z0-9._-]+/g, "_").slice(0, 120);
}
