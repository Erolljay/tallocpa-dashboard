import { describe, expect, it } from "vitest";
import {
  formKey,
  formatTin,
  gmailQuery,
  htmlToText,
  maskAccounts,
  namesMatch,
  parseAmount,
  parseDate,
  paymentSender,
  proofLines,
  readPaymentMail,
  tinMatches,
} from "./parse";
import { pdfText, textPdf, wrap } from "@/lib/pdf/text";

import { UNIONBANK_FROM, UNIONBANK_HTML, UNIONBANK_RECEIVED, UNIONBANK_SUBJECT } from "./fixtures";

describe("payment confirmation emails", () => {
  const text = maskAccounts(htmlToText(UNIONBANK_HTML));
  const facts = readPaymentMail({ subject: UNIONBANK_SUBJECT, text, receivedAt: UNIONBANK_RECEIVED });

  it("recognises UnionBank's bills payment confirmation, not other mail", () => {
    expect(paymentSender(UNIONBANK_FROM, UNIONBANK_SUBJECT)?.channel).toBe("unionbank");
    expect(paymentSender(UNIONBANK_FROM, "Your monthly statement is ready")).toBeNull();
    expect(paymentSender("Promos <hello@shop.ph>", UNIONBANK_SUBJECT)).toBeNull();
    expect(gmailQuery(14)).toMatch(/^from:\(unionbank OR .*\) -in:sent newer_than:14d$/);
  });

  it("reads every match key from the email", () => {
    expect(facts).toEqual({
      client_name: "CHARLIE SINDOL",
      biller: "Bureau of Internal Revenue (BIR)",
      amount: 20578.58,
      bank_reference: "UB661855",
      bir_reference: "So202611101440361634313861",
      tin: "180-359-760-00000",
      form: "0619E",
      tax_type: "WE",
      tax_type_label: "Expanded withholding tax",
      period_end: "2026-10-31",
      paid_on: "2026-11-10",
      created_by: "Maria Santos",
    });
  });

  it("never keeps the source account number", () => {
    expect(text).not.toMatch(/0001 8002/);
    expect(text).toContain("**** 5831");
    expect(JSON.stringify(facts)).not.toMatch(/8002/);
    // The TIN and the BIR reference are not mistaken for account numbers.
    expect(text).toContain("180359760");
    expect(text).toContain("So20261110144036163431386 1");
  });

  it("reads label and value on separate lines, and other date and amount forms", () => {
    const f = readPaymentMail({ subject: "Payment (Molo Foods Inc.)", text: "Biller\nBureau of Internal Revenue\nTIN\n123-456-789-000\nForm Type\nBIR Form No. 1601-C\nReturn Period\n09/2026\nAmount Paid\n₱1,234.50" });
    expect(f).toMatchObject({ client_name: "Molo Foods Inc.", tin: "123-456-789-000", form: "1601-C", period_end: "2026-09-30", amount: 1234.5, paid_on: null });
    expect(parseDate("Sept 5, 2026")).toBe("2026-09-05");
    expect(parseDate("02/30/2026")).toBeNull();
    expect(parseAmount("PHP 1,000,000.00")).toBe(1000000);
  });

  it("compares TINs, forms and names the way the app stores them", () => {
    expect(formatTin("180359760", "00000")).toBe("180-359-760-00000");
    expect(tinMatches("180-359-760-000", "180-359-760-00000")).toBe(true);
    expect(tinMatches("180-359-760", "180-359-760-00000")).toBe(true);
    expect(tinMatches("180-359-760-00001", "180-359-760-00000")).toBe(false);
    expect(tinMatches("180-359-761-000", "180-359-760-00000")).toBe(false);
    expect(formKey("0619E")).toBe(formKey("0619-E"));
    expect(formKey("BIR Form No. 1601-C")).toBe("1601C");
    expect(formKey("0619E-ebir")).toBe("0619E");
    expect(namesMatch("CHARLIE SINDOL", "Charlie Sindol")).toBe(true);
    expect(namesMatch("JARO TRADING CORP.", "Jaro Trading Corporation")).toBe(true);
    expect(namesMatch("Jaro", "Molo")).toBe(false);
    expect(namesMatch("", "")).toBe(false);
  });

  it("makes a readable PDF with the BIR reference, without the account number", () => {
    const lines = proofLines({ channel: "unionbank", sender: UNIONBANK_FROM, receivedAt: UNIONBANK_RECEIVED, subject: UNIONBANK_SUBJECT, facts, text });
    expect(lines).toContain("BIR reference number: So202611101440361634313861");
    expect(lines).toContain("Bank reference: UB661855");
    expect(lines.join("\n")).not.toMatch(/0001 8002/);
    const pdf = textPdf(lines).toString("latin1");
    expect(pdf.startsWith("%PDF-1.4")).toBe(true);
    expect(pdf.trimEnd().endsWith("%%EOF")).toBe(true);
    expect(pdf).toContain("(BIR reference number: So202611101440361634313861) Tj");
    expect(pdf).toContain("(Amount: PHP 20,578.58) Tj");
    // The cross-reference table points at each object.
    const xref = Number(pdf.match(/startxref\n(\d+)/)![1]);
    expect(pdf.slice(xref, xref + 4)).toBe("xref");
    const offsets = [...pdf.slice(xref).matchAll(/^(\d{10}) 00000 n $/gm)].map((m) => Number(m[1]));
    offsets.forEach((o, i) => expect(pdf.slice(o, o + `${i + 1} 0 obj`.length)).toBe(`${i + 1} 0 obj`));
  });

  it("escapes PDF text, wraps long lines and adds pages", () => {
    expect(pdfText("a (b) \\ ₱5 “ok” é 中")).toBe("a \\(b\\) \\\\ PHP 5 \"ok\" é ?");
    expect(wrap("word ".repeat(40).trim(), 20).every((l) => l.length <= 20)).toBe(true);
    const many = textPdf(Array.from({ length: 120 }, (_, i) => `Line ${i + 1}`)).toString("latin1");
    expect(many).toContain("/Count 3");
  });
});
