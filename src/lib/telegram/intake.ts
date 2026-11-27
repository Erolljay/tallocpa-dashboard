/**
 * Telegram intake rules (docs/SETUP.md, "Telegram uploads"): what the bot accepts and the
 * buttons it shows. Pure, so the webhook and the tests share them.
 */
import { CLIENT_DOC_TYPES, SPREADSHEET_TYPES, type DocType } from "@/lib/documents/labels";

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

/** Short button labels; a spreadsheet can only be payroll (OCR reads photos and PDFs). */
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
  const types: DocType[] = SPREADSHEET_TYPES.includes(mimeType) ? ["payroll"] : [...CLIENT_DOC_TYPES];
  const buttons = types.map((t) => ({ text: BUTTON_LABELS[t] ?? t, callback_data: `f:${CODE_OF[t]}:${uploadId}` }));
  const rows: InlineKeyboard = [];
  for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));
  rows.push([{ text: "Cancel", callback_data: `x:${uploadId}` }]);
  return rows;
}

export type Choice = { action: "file"; docType: DocType; uploadId: string } | { action: "cancel"; uploadId: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Reads a button press; null for anything the bot did not send. */
export function parseChoice(data: string | undefined): Choice | null {
  if (!data) return null;
  const parts = data.split(":");
  if (parts[0] === "x" && parts.length === 2 && UUID.test(parts[1])) return { action: "cancel", uploadId: parts[1] };
  if (parts[0] === "f" && parts.length === 3 && CODES[parts[1]] && UUID.test(parts[2])) return { action: "file", docType: CODES[parts[1]], uploadId: parts[2] };
  return null;
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
