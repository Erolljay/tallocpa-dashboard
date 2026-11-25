import { describe, expect, it } from "vitest";
import { buildMime, classifyReply, esubmissionSubject, fromMailbox, isDatKind, toRaw } from "./mime";

describe("buildMime", () => {
  it("builds a multipart message with the DAT files attached in base64", () => {
    const mime = buildMime(
      { from: "attachments@tallocpa.com", to: "esubmission@bir.gov.ph", subject: "2550Q Q1 2027 - Jaro", text: "Attached.", attachments: [{ fileName: "123456789S0320270.DAT", contentType: "text/plain", body: "H,SLS\n" }] },
      "B",
    );
    expect(mime).toContain("To: esubmission@bir.gov.ph\r\n");
    expect(mime).toContain('Content-Type: multipart/mixed; boundary="B"');
    expect(mime).toContain('Content-Disposition: attachment; filename="123456789S0320270.DAT"');
    expect(mime).toContain(Buffer.from("H,SLS\n").toString("base64"));
    expect(mime.trimEnd().endsWith("--B--")).toBe(true);
  });

  it("encodes a subject that is not plain ASCII, and makes Gmail's raw URL-safe", () => {
    const mime = buildMime({ from: "a@b", to: "c@d", subject: "Niño Foods", text: "x", attachments: [] }, "B");
    expect(mime).toContain(`Subject: =?UTF-8?B?${Buffer.from("Niño Foods").toString("base64")}?=`);
    expect(toRaw(mime)).not.toMatch(/[+/=]/);
  });
});

describe("classifyReply", () => {
  it("reads errors and validations", () => {
    expect(classifyReply("Your file 123.DAT has 2 errors: invalid TIN on line 4")).toBe("errors");
    expect(classifyReply("The submission was REJECTED")).toBe("errors");
    expect(classifyReply("Your attachment has been validated with no errors.")).toBe("validated");
    expect(classifyReply("Errors: 0. Validation report attached")).toBe("validated");
    expect(classifyReply("We have received your email")).toBeNull();
  });
});

describe("helpers", () => {
  it("names the email, tells our mailbox from the BIR, and picks DAT attachments", () => {
    expect(esubmissionSubject({ form: "1601-EQ", periodLabel: "Q1 2027", clientName: "Jaro Trading", tin: "123-456-789-000" })).toBe("1601-EQ Q1 2027 - Jaro Trading (TIN 123-456-789-000)");
    expect(fromMailbox("Tallo CPA <Attachments@tallocpa.com>", "attachments@tallocpa.com")).toBe(true);
    expect(fromMailbox("eSubmission <esubmission@bir.gov.ph>", "attachments@tallocpa.com")).toBe(false);
    expect(["qap-dat", "qap-csv", "sls_dat_2027-01", "sawt_csv", "alphalist_dat", "sawt_dat_2027-03"].filter(isDatKind)).toEqual(["qap-dat", "sls_dat_2027-01", "alphalist_dat", "sawt_dat_2027-03"]);
  });
});
