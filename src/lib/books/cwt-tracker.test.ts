import { describe, expect, it } from "vitest";
import { buildTracker, explainMatch, looseDocuments, matchWindow, quarterOf, taxableYear, trackerTotals, type MatchCandidate, type TrackerData, type TrackerDocument, type TrackerInvoice } from "./cwt-tracker";

const inv = (p: Partial<TrackerInvoice> & { invoice_id: string; issue_date: string; withholding: number }): TrackerInvoice => ({
  reference: p.invoice_id.toUpperCase(), party_key: "hotel", party_name: "Iloilo Grand Hotel Corp.", party_tin: "004-555-111-000", atc: "WC158",
  document_id: null, followed_up_at: null, follow_up_note: null, claim: null, locked: true, ...p,
});
const doc = (p: Partial<TrackerDocument> & { document_id: string; withholding: number }): TrackerDocument => ({
  status: "posted", approved: true, file_name: `${p.document_id}.png`, date: "2026-10-31", number: null, party_key: "hotel",
  party_name: "Iloilo Grand Hotel Corp.", party_tin: "004-555-111-000", atc: "WC158", created_at: "2026-11-02T00:00:00Z", ...p,
});

describe("taxable year and quarters", () => {
  it("calendar year", () => {
    expect(taxableYear("2026-10-15", 12)).toEqual({ start: "2026-01-01", end: "2026-12-31", label: "2026" });
    expect(quarterOf("2026-10-15", "2026-01-01")).toMatchObject({ n: 4, start: "2026-10-01", end: "2026-12-31" });
  });
  it("fiscal year ending June", () => {
    const y = taxableYear("2026-03-10", 6);
    expect(y.start).toBe("2025-07-01");
    expect(y.end).toBe("2026-06-30");
    expect(quarterOf("2026-03-10", y.start)).toMatchObject({ n: 3, start: "2026-01-01", end: "2026-03-31" });
  });
});

describe("buildTracker", () => {
  const data: TrackerData = {
    months: [],
    invoices: [
      inv({ invoice_id: "si1", issue_date: "2026-10-05", withholding: 400, document_id: "d1" }),
      inv({ invoice_id: "si2", issue_date: "2026-10-20", withholding: 200, document_id: "d1" }),
      inv({ invoice_id: "si3", issue_date: "2026-11-03", withholding: 150, followed_up_at: "2026-11-20T01:00:00Z" }),
      inv({ invoice_id: "si4", issue_date: "2026-08-03", withholding: 100, party_key: "cafe", party_name: "Jaro Cafe" }),
      inv({ invoice_id: "si5", issue_date: "2026-05-03", withholding: 50, document_id: "d2" }),
    ],
    documents: [doc({ document_id: "d1", withholding: 600 }), doc({ document_id: "d2", withholding: 50, date: "2026-06-30" }), doc({ document_id: "d3", withholding: 99 }), doc({ document_id: "d4", withholding: 10, status: "received", approved: false })],
  };
  const groups = buildTracker(data, "2026-01-01");

  it("groups by customer and quarter, customers by name", () => {
    expect(groups.map((g) => `${g.partyName} Q${g.quarter.n}`)).toEqual(["Iloilo Grand Hotel Corp. Q2", "Iloilo Grand Hotel Corp. Q4", "Jaro Cafe Q3"]);
  });
  it("partial: one 2307 for two invoices, one invoice still waiting and followed up", () => {
    const q4 = groups[1];
    expect(q4).toMatchObject({ cwt: 750, received: 600, difference: 150, awaiting: 150, status: "partial", followedUpAt: "2026-11-20T01:00:00Z" });
    expect(q4.documents.map((d) => d.document_id)).toEqual(["d1"]);
  });
  it("complete and missing", () => {
    expect(groups[0]).toMatchObject({ status: "complete", difference: 0, followedUpAt: null });
    expect(groups[2]).toMatchObject({ status: "missing", awaiting: 100, received: 0, followedUpAt: null });
  });
  it("totals", () => {
    expect(trackerTotals(groups)).toEqual({ cwt: 900, received: 650, awaiting: 250, missing: 1, partial: 1 });
  });
  it("loose documents: approved without an invoice, and waiting for review", () => {
    const { unmatched, pending } = looseDocuments(data);
    expect(unmatched.map((d) => d.document_id)).toEqual(["d3"]);
    expect(pending.map((d) => d.document_id)).toEqual(["d4"]);
  });
  it("stopped when every waiting invoice is not claimed", () => {
    const g = buildTracker({ ...data, invoices: [inv({ invoice_id: "x", issue_date: "2026-01-02", withholding: 5, claim: "stop" })] }, "2026-01-01");
    expect(g[0].stopped).toBe(true);
  });
});

describe("explainMatch", () => {
  const cand = (p: Partial<MatchCandidate> & { id: string; issue_date: string; withholding: number }): MatchCandidate => ({ reference: p.id.toUpperCase(), atc: "WC158", document_id: null, ...p });
  const d = { id: "d1", date: "2026-10-31", atc: "WC158", withholding: 600, approved: true };

  it("searches the quarter before and the 2307's own", () => {
    expect(matchWindow("2026-10-31")).toMatchObject({ from: "2026-07-01", to: "2026-12-31" });
    expect(matchWindow("2026-02-10")).toMatchObject({ from: "2025-10-01", to: "2026-03-31" });
  });
  it("matched invoices and what is left of the 2307", () => {
    const r = explainMatch(d, [cand({ id: "a", issue_date: "2026-10-05", withholding: 500, document_id: "d1" })], true);
    expect(r.matched.map((c) => c.id)).toEqual(["a"]);
    expect(r.unexplained).toBe(100);
    expect(r.reason).toBeNull();
  });
  it("not approved yet", () => {
    expect(explainMatch({ ...d, approved: false }, [], true).reason).toMatch(/approved/);
  });
  it("no customer", () => {
    expect(explainMatch(d, [], false).reason).toMatch(/TIN/);
  });
  it("no invoice in the window", () => {
    expect(explainMatch(d, [cand({ id: "old", issue_date: "2026-03-01", withholding: 600 })], true).reason).toMatch(/No Sales Invoice .* Jul 2026 to Dec 2026/);
  });
  it("every invoice already has its 2307", () => {
    expect(explainMatch(d, [cand({ id: "a", issue_date: "2026-10-05", withholding: 600, document_id: "other" })], true).reason).toMatch(/already has its 2307/);
  });
  it("ATC differs", () => {
    expect(explainMatch(d, [cand({ id: "a", issue_date: "2026-10-05", withholding: 600, atc: "WC160" })], true).reason).toMatch(/use WC160; this 2307 says WC158/);
  });
  it("2307 smaller than the earliest invoice", () => {
    expect(explainMatch(d, [cand({ id: "a", issue_date: "2026-10-05", withholding: 700, reference: "SI-12" })], true).reason).toMatch(/less than the tax withheld on the earliest invoice SI-12/);
  });
  it("an invoice fits: match again", () => {
    expect(explainMatch(d, [cand({ id: "a", issue_date: "2026-10-05", withholding: 300 })], true).reason).toMatch(/Match again/);
  });
});
