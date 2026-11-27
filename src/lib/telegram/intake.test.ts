import { describe, expect, it } from "vitest";
import {
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
  type TgMessage,
} from "./intake";

const base: TgMessage = { message_id: 7, chat: { id: 1, type: "private" } };
const ID = "0f8fad5b-d9cb-469f-a165-70867728950e";

describe("fileFromMessage", () => {
  it("takes the largest size of a photo", () => {
    const f = fileFromMessage({ ...base, photo: [
      { file_id: "small", file_unique_id: "a", width: 90, height: 120, file_size: 1000 },
      { file_id: "big", file_unique_id: "b", width: 960, height: 1280, file_size: 90000 },
    ] });
    expect(f).toEqual({ fileId: "big", fileName: "photo_7.jpg", mimeType: "image/jpeg", size: 90000 });
  });

  it("accepts a PDF and guesses a missing type from the name", () => {
    expect(fileFromMessage({ ...base, document: { file_id: "d", file_unique_id: "u", file_name: "OR 123.PDF", file_size: 5 } })).toMatchObject({ mimeType: "application/pdf" });
  });

  it("refuses other files and files over 20 MB", () => {
    expect(fileFromMessage({ ...base, document: { file_id: "d", file_unique_id: "u", file_name: "x.zip", mime_type: "application/zip", file_size: 5 } })).toHaveProperty("error");
    expect(fileFromMessage({ ...base, document: { file_id: "d", file_unique_id: "u", file_name: "x.pdf", mime_type: "application/pdf", file_size: 21 * 1024 * 1024 } })).toHaveProperty("error");
  });

  it("is null for a message without a file", () => {
    expect(fileFromMessage({ ...base, text: "hello" })).toBeNull();
  });
});

describe("buttons", () => {
  it("offers every client type for a photo, and round-trips the choice", () => {
    const rows = typeButtons(ID, "image/jpeg");
    const all = rows.flat();
    expect(all).toHaveLength(8);
    for (const b of all) expect(Buffer.byteLength(b.callback_data)).toBeLessThanOrEqual(64);
    expect(parseChoice(all[0].callback_data)).toEqual({ action: "file", docType: "sales_invoice", uploadId: ID });
    expect(parseChoice(all.at(-1)!.callback_data)).toEqual({ action: "cancel", uploadId: ID });
  });

  it("offers only Payroll for a spreadsheet", () => {
    const all = typeButtons(ID, "text/csv").flat();
    expect(all.map((b) => parseChoice(b.callback_data)?.action === "file" && parseChoice(b.callback_data))).toContainEqual({ action: "file", docType: "payroll", uploadId: ID });
    expect(all).toHaveLength(2);
  });

  it("ignores data the bot did not send", () => {
    expect(parseChoice("f:z:" + ID)).toBeNull();
    expect(parseChoice("f:s:not-a-uuid")).toBeNull();
    expect(parseChoice(undefined)).toBeNull();
  });
});

describe("startCode and safeName", () => {
  it("reads the link code from /start", () => {
    expect(startCode("/start 0123456789abcdef0123456789abcdef")).toBe("0123456789abcdef0123456789abcdef");
    expect(startCode("/start")).toBeNull();
    expect(startCode("/start hello")).toBeNull();
  });

  it("names the stored file as register_document() does", () => {
    expect(safeName("Resibo ng Jollibee (1).jpg")).toBe("Resibo_ng_Jollibee_1_.jpg");
    expect(safeName("  ")).toBe("document");
  });
});

describe("staff: client and month", () => {
  it("reads /client with or without words", () => {
    expect(clientQuery("/client molo")).toBe("molo");
    expect(clientQuery("/client")).toBe("");
    expect(clientQuery("molo")).toBeNull();
  });

  it("round-trips a client button", () => {
    expect(parseChoice(clientButtons([{ id: ID, code: "TC-1", name: "Molo Bakeshop" }])[0][0].callback_data)).toEqual({ action: "client", clientId: ID });
  });

  it("round-trips a month button within Telegram's 64 bytes", () => {
    const all = monthButtons(ID, "purchase_receipt", ["2026-11-01", "2026-10-01"]).flat();
    expect(all.map((b) => b.text)).toEqual(["Nov 2026", "Oct 2026", "Cancel"]);
    for (const b of all) expect(Buffer.byteLength(b.callback_data)).toBeLessThanOrEqual(64);
    expect(parseChoice(all[1].callback_data)).toEqual({ action: "month", docType: "purchase_receipt", month: "2026-10-01", uploadId: ID });
    expect(parseChoice(`m:p:202613:${ID}`)).toBeNull();
  });
});

describe("/send: the type first", () => {
  it("offers every client type, round-trips the choice, and stays within 64 bytes", () => {
    const all = sendTypeButtons().flat();
    expect(all).toHaveLength(7);
    for (const b of all) expect(Buffer.byteLength(b.callback_data)).toBeLessThanOrEqual(64);
    expect(all.map((b) => parseChoice(b.callback_data))).toContainEqual({ action: "sendType", docType: "purchase_receipt" });
    expect(parseChoice("t:z")).toBeNull();
    expect(parseChoice("t:p:extra")).toBeNull();
  });

  it("round-trips a staff month button", () => {
    const all = sendMonthButtons("payroll", ["2026-11-01", "2026-10-01", "2026-09-01", "2026-08-01"]).flat();
    expect(all.map((b) => b.text)).toEqual(["Nov 2026", "Oct 2026", "Sep 2026", "Aug 2026"]);
    for (const b of all) expect(Buffer.byteLength(b.callback_data)).toBeLessThanOrEqual(64);
    expect(parseChoice(all[1].callback_data)).toEqual({ action: "sendMonth", docType: "payroll", month: "2026-10-01" });
    expect(parseChoice("tm:y:202600")).toBeNull();
    expect(parseChoice(`tm:y:202610:${ID}`)).toBeNull();
  });

  it("reads /send and /done, with or without the bot's name", () => {
    expect(isCommand("/send", "send")).toBe(true);
    expect(isCommand(" /done@TalloCpaBot ", "done")).toBe(true);
    expect(isCommand("/sending", "send")).toBe(false);
    expect(isCommand("/send now", "send")).toBe(false);
    expect(isCommand(undefined, "done")).toBe(false);
  });

  it("is active for 30 minutes after the last file, then expired", () => {
    const now = new Date("2026-11-27T10:00:00Z");
    expect(sendModeState({ send_doc_type: null, send_active_at: null }, now)).toBe("none");
    expect(sendModeState({ send_doc_type: "payroll", send_active_at: "2026-11-27T09:31:00Z" }, now)).toBe("active");
    expect(sendModeState({ send_doc_type: "payroll", send_active_at: "2026-11-27T09:29:59Z" }, now)).toBe("expired");
  });

  it("takes a spreadsheet only as payroll", () => {
    expect(fitsType("payroll", "text/csv")).toBe(true);
    expect(fitsType("purchase_receipt", "text/csv")).toBe(false);
    expect(fitsType("purchase_receipt", "application/pdf")).toBe(true);
  });

  it("words the one reply for a file or album as it fills", () => {
    expect(sendResult({ filed: 0, failed: [], pending: 1 }, "Purchase / expense", "", "November 2026")).toBe("Sending to Tallo CPA as Purchase / expense, November 2026…");
    expect(sendResult({ filed: 2, failed: [], pending: 3 }, "Payroll", " for Molo Bakeshop", "October 2026")).toBe("Sending to Tallo CPA as Payroll for Molo Bakeshop, October 2026… 2 of 5 done.");
    expect(sendResult({ filed: 4, failed: ["a.jpg"], pending: 0 }, "Other", "", "November 2026")).toBe(
      "✓ Sent to Tallo CPA: 4 files as Other for November 2026.\nCould not send a.jpg. Please send it again or use the portal.",
    );
  });
});
