import { describe, expect, it } from "vitest";
import { classifyBirMail } from "./classify";
import { confirmationLines, periodEnd, readFilingConfirmation, sameForm } from "./confirmation";

// What eBIRForms sends after an offline form is submitted online.
const EBIRFORMS_SUBJECT = "Tax Return Receipt Confirmation";
const EBIRFORMS_TEXT = `Dear Taxpayer,

This confirms receipt of your submission with the following details subject to validation by BIR:

File name: 180359760000-1601EQv2018-092026.xml
Date received by BIR: 10 Oct 2026
Time received by BIR: 09:15 AM

Penalties may be imposed for any violation of the provisions of the NIRC and issuances thereof.

This is a system-generated e-mail. Please do not reply.`;

// An eFPS-style confirmation with labelled fields.
const EFPS_TEXT = `Filing Reference Number: 0619E202610310A3B4C5
TIN: 180-359-760-00000
Form Type: 0619-E
Return Period: 10/31/2026
Date Filed: November 10, 2026 02:40 PM`;

describe("readFilingConfirmation", () => {
  it("reads TIN, form and period from eBIRForms' file name", () => {
    expect(readFilingConfirmation(EBIRFORMS_SUBJECT, EBIRFORMS_TEXT)).toEqual({
      tin: "180-359-760-00000",
      form: "1601EQ",
      period_end: "2026-09-30",
      reference: null,
      received: "10 Oct 2026 09:15 AM",
      file_name: "180359760000-1601EQv2018-092026.xml",
    });
  });

  it("reads labelled fields (eFPS)", () => {
    const r = readFilingConfirmation("eFPS Filing Confirmation", EFPS_TEXT);
    expect(r).toMatchObject({ tin: "180-359-760-00000", form: "0619-E", period_end: "2026-10-31", reference: "0619E202610310A3B4C5", received: "November 10, 2026 02:40 PM" });
    expect(sameForm(r.form, "0619E")).toBe(true);
  });

  it("is tolerant: nothing it cannot read", () => {
    expect(readFilingConfirmation("Hello", "Thank you for using eBIRForms.")).toEqual({ tin: null, form: null, period_end: null, reference: null, received: null, file_name: null });
  });

  it("classifies the eBIRForms email as a filing confirmation", () => {
    expect(classifyBirMail(EBIRFORMS_SUBJECT, EBIRFORMS_TEXT).kind).toBe("filing_confirmation");
  });
});

describe("periodEnd", () => {
  it.each([
    ["09/30/2026", "2026-09-30"],
    ["10/2026", "2026-10-31"],
    ["022028", "2028-02-29"],
    ["September 2026", "2026-09-30"],
    ["Dec. 2025", "2025-12-31"],
    ["2026-06", "2026-06-30"],
    ["soon", null],
    [null, null],
  ])("%s → %s", (raw, out) => expect(periodEnd(raw)).toBe(out));
});

describe("confirmationLines", () => {
  it("heads the PDF and lists what was read", () => {
    const facts = readFilingConfirmation(EBIRFORMS_SUBJECT, EBIRFORMS_TEXT);
    const lines = confirmationLines({ from: "eBIRForms <ebirforms-noreply@bir.gov.ph>", receivedAt: "2026-10-10T01:15:00.000Z", subject: EBIRFORMS_SUBJECT, text: EBIRFORMS_TEXT, kind: "filing_confirmation", facts });
    expect(lines[0]).toBe("# BIR filing confirmation");
    expect(lines).toContain("Form: 1601EQ");
    expect(lines).toContain("Period ending: 2026-09-30");
    expect(lines).toContain("TIN: 180-359-760-00000");
  });
});
