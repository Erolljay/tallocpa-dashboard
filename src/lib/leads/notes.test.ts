import { describe, expect, it } from "vitest";
import { inquiryAnswers, notesTimeline, type NoteRow } from "./notes";

const inquiry: NoteRow = {
  source: "inquiry",
  source_id: "l1",
  at: "2026-11-01T02:00:00Z",
  author: null,
  body: "We are behind on our 2551Q.",
  details: {
    from: "website", business_name: "Jaro Print Shop", contact_name: "Ben Cruz", email: "ben@example.com", mobile: null,
    taxpayer_type: "individual", services: ["tax_compliance", "bookkeeping"], monthly_quote: 4000,
    profile: { vatRegistered: false, documentsPerMonth: 30, employees: 1, branches: 2, remitsContributions: true, bookkeeping: "standard", complexity: [] },
  },
};

describe("notes timeline", () => {
  it("turns the inquiry into its answers", () => {
    expect(inquiryAnswers(inquiry.details!)).toEqual([
      { question: "Business", answer: "Jaro Print Shop" },
      { question: "Type", answer: "Individual" },
      { question: "Profile", answer: "Non-VAT · 30 documents a month · 1 employee · 2 branches besides the main office · remits SSS, PhilHealth, Pag-IBIG" },
      { question: "Services", answer: "Tax Compliance, Bookkeeping" },
      { question: "Bookkeeping load", answer: "standard" },
      { question: "Website quote", answer: "₱4,000.00 a month" },
      { question: "Contact", answer: "Ben Cruz · ben@example.com" },
    ]);
  });

  it("labels each source and lists the newest first", () => {
    const rows: NoteRow[] = [
      inquiry,
      { source: "discovery_call", source_id: "c1", at: "2026-11-03T02:00:00Z", author: "u1", body: "Needs catch-up.", details: null },
      { source: "onboarding", source_id: "kickoff", at: "2026-11-10T02:00:00Z", author: "u2", body: null, details: { item: "kickoff" } },
      { source: "note", source_id: "n1", at: "2026-11-12T02:00:00Z", author: "u2", body: "  Prefers Viber. ", details: null },
    ];
    const t = notesTimeline(rows);
    expect(t.map((e) => e.label)).toEqual(["Note", "Onboarding · Kickoff meeting held", "Discovery call", "Website inquiry"]);
    expect(t[0].body).toBe("Prefers Viber.");
    expect(t[1].body).toBeNull();
    expect(t[3].answers.length).toBeGreaterThan(0);
    expect(notesTimeline([{ ...inquiry, details: { ...inquiry.details, from: "staff" } }])[0].label).toBe("Inquiry taken by staff");
  });
});
