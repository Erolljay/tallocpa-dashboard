import { describe, expect, it } from "vitest";
import { renderEmail } from "@/lib/email/layout";
import { proposalEmail } from "./proposal-email";

describe("proposalEmail", () => {
  const base = {
    brandName: "Tallo CPA",
    businessName: "Jaro Print Shop",
    contactName: "Ben Cruz",
    monthlyRetainer: 4000,
    taxNote: "Our fees include 12% VAT.",
    validUntil: "2026-12-27",
    url: "https://os.example/proposal/abc123",
    senderName: "Erika Tallo",
  };

  it("summarises the proposal and links to it", () => {
    const m = proposalEmail(base);
    expect(m.subject).toBe("Your proposal from Tallo CPA for Jaro Print Shop");
    expect(m.heading).toBe("Your proposal for Jaro Print Shop");
    expect(m.bodyText).toContain("Hi Ben,");
    expect(m.bodyText).toContain("Here is our proposal for Jaro Print Shop.");
    expect(m.bodyText).toContain("- Monthly retainer: ₱4,000.00\n  Our fees include 12% VAT.");
    expect(m.bodyText).toContain("- Valid until: December 27, 2026");
    expect(m.bodyText).toContain("accept it online");
    expect(m.bodyText.trim().endsWith("Erika Tallo\nTallo CPA")).toBe(true);
    expect(m.action).toEqual({ label: "View the proposal", url: "https://os.example/proposal/abc123" });
    expect(m.preheader).toBe("Monthly retainer ₱4,000.00, valid until December 27, 2026.");
  });

  it("marks test leads in the subject", () => {
    expect(proposalEmail({ ...base, test: true }).subject).toBe("[Test] Your proposal from Tallo CPA for Jaro Print Shop");
  });

  it("puts the personal note after the greeting, and leaves it out when empty", () => {
    const withNote = proposalEmail({ ...base, note: "  Good talking to you today.\r\nAs promised.  " });
    expect(withNote.bodyText).toMatch(/^Hi Ben,\n\nGood talking to you today\.\nAs promised\.\n\nHere is our proposal/);
    expect(proposalEmail({ ...base, note: "   " }).bodyText).toMatch(/^Hi Ben,\n\nHere is our proposal/);
  });

  it("renders in the branded layout with the button, escaped, without notification settings", () => {
    const m = proposalEmail({ ...base, businessName: "R&B <Shop>", note: "<b>hi</b>" });
    const { html, text } = renderEmail({ brand: { displayName: "Tallo CPA" }, heading: m.heading, bodyText: m.bodyText, action: m.action, footerNote: "you asked Tallo CPA for a proposal", hideSettings: true });
    expect(html).toContain("R&amp;B &lt;Shop&gt;");
    expect(html).toContain("&lt;b&gt;hi&lt;/b&gt;");
    expect(html).not.toContain("<b>hi</b>");
    expect(html).toContain('href="https://os.example/proposal/abc123"');
    expect(html).toContain("<li");
    expect(html).not.toContain("Settings → Notifications");
    expect(text).toContain("View the proposal: https://os.example/proposal/abc123");
    expect(text).toContain("You are receiving this because you asked Tallo CPA for a proposal.");
  });
});
