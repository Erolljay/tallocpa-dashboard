import { describe, expect, it } from "vitest";
import { fileFromMessage, parseChoice, safeName, startCode, typeButtons, type TgMessage } from "./intake";

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
