import { describe, expect, it } from "vitest";
import { escapeHtml, plainTextToHtml, renderEmail, renderPlainTextEmail, settingsUrlFor } from "./layout";

const brand = {
  displayName: "Tallo CPA",
  legalName: "Tallo Accounting Services",
  businessAddress: "2/F Example Bldg, Iloilo City",
  phone: "+63 917 000 0000",
  replyTo: "hello@tallocpa.example",
  website: "https://tallocpa.example",
};

describe("renderEmail", () => {
  const email = renderEmail({
    brand,
    heading: "Return ready for review: <Molo & Sons>",
    preheader: "Preview <b>",
    bodyText: "1601-C for \"Molo & Sons\" <script>alert(1)</script> is ready.\n\nSee https://os.example/app/filings/1.",
    action: { label: "Review the return", url: "https://os.example/app/filings/1?a=1&b=2" },
    footerNote: "you get emails for “A return is ready for my review”",
    settingsUrl: settingsUrlFor("https://os.example/", "staff"),
  });

  it("escapes every interpolated string", () => {
    expect(email.html).toContain("Return ready for review: &lt;Molo &amp; Sons&gt;");
    expect(email.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(email.html).not.toContain("<script>");
    expect(email.html).not.toContain("<Molo");
    expect(email.html).toContain("Preview &lt;b&gt;");
    expect(email.html).toContain('href="https://os.example/app/filings/1?a=1&amp;b=2"');
  });

  it("has the wordmark, the button and links in the body", () => {
    expect(email.html).toContain("Clear Numbers. Clean Compliance.");
    expect(email.html).toContain(">Review the return</a>");
    expect(email.html).toContain('<a href="https://os.example/app/filings/1"');
    expect(email.html).not.toMatch(/<img\b/);
    expect(email.html).toContain("max-width:600px");
  });

  it("has the footer with the firm's details and the settings link", () => {
    expect(email.html).toContain("Tallo Accounting Services");
    expect(email.html).toContain("2/F Example Bldg, Iloilo City");
    expect(email.html).toContain("mailto:hello@tallocpa.example");
    expect(email.html).toContain("tel:+639170000000");
    expect(email.html).toContain(">tallocpa.example</a>");
    expect(email.html).toContain("You are receiving this because you get emails for “A return is ready for my review”.");
    expect(email.html).toContain('href="https://os.example/app/settings/notifications"');
  });

  it("always includes a plain-text alternative", () => {
    expect(email.text).toContain("Return ready for review: <Molo & Sons>");
    expect(email.text).toContain("Review the return: https://os.example/app/filings/1?a=1&b=2");
    expect(email.text).toContain("Tallo Accounting Services");
    expect(email.text).toContain("hello@tallocpa.example");
    expect(email.text).toContain("Change which emails you get in Settings → Notifications: https://os.example/app/settings/notifications");
    expect(email.text).not.toContain("<a ");
  });

  it("falls back to Tallo CPA without a brand and drops unsafe links", () => {
    const e = renderEmail({ heading: "Hi", paragraphs: ["One", "Two"], action: { label: "Go", url: "javascript:alert(1)" } });
    expect(e.html).toContain("Tallo CPA");
    expect(e.html).not.toContain("javascript:");
    expect(e.text).toContain("One\n\nTwo");
    expect(e.html).toContain("Change which emails you get in Settings → Notifications.");
  });

  it("points clients at the portal settings", () => {
    expect(settingsUrlFor("https://os.example", "client")).toBe("https://os.example/portal/settings/notifications");
  });
});

describe("plainTextToHtml", () => {
  it("splits paragraphs, keeps line breaks, makes lists and links", () => {
    const html = plainTextToHtml("Hello,\n\nLine one\nLine two\n\nOverdue (1):\n- A & B · 1601-C\n  https://os/app/filings/1\n\nThanks");
    expect(html.match(/<p /g)).toHaveLength(4);
    expect(html).toContain("Line one<br>Line two");
    expect(html).toContain("<ul");
    expect(html).toContain("A &amp; B · 1601-C<br><a href=\"https://os/app/filings/1\"");
  });

  it("escapes quotes", () => {
    expect(escapeHtml(`"'<>&`)).toBe("&quot;&#39;&lt;&gt;&amp;");
  });
});

describe("renderPlainTextEmail", () => {
  it("wraps an existing plain-text email", () => {
    const e = renderPlainTextEmail({ heading: "Subject", text: "Body with https://x.example/a." });
    expect(e.html).toContain('<a href="https://x.example/a"');
    expect(e.text).toContain("Body with https://x.example/a.");
  });
});
