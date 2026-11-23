import { describe, expect, it } from "vitest";
import { complianceScore, type ClientMonth } from "./compliance";
import { lateReason } from "./late";
import { kpis, lastMonths, monthEnd, pct, type StaffMonth } from "./staff";

const month = (o: Partial<ClientMonth> = {}): ClientMonth => ({
  cycles_due: 1,
  cycles_missed: 0,
  documents: 10,
  documents_returned: 0,
  documents_late: 0,
  dues_due: 1,
  dues_late: 0,
  filings_due: 2,
  filings_late: 0,
  late_client: 0,
  ...o,
});

describe("complianceScore", () => {
  it("is green when every part is green", () => {
    const s = complianceScore(Array.from({ length: 6 }, () => month()));
    expect(s.overall).toBe("green");
    expect(s.submission.detail).toBe("6 of 6 months on time");
  });

  it("takes the worst part", () => {
    // One missed cutoff in six months = 83% → yellow; everything else green.
    const s = complianceScore([month({ cycles_missed: 1 }), ...Array.from({ length: 5 }, () => month())]);
    expect(s.submission.tone).toBe("yellow");
    expect(s.overall).toBe("yellow");
    // Two client-caused late returns → red.
    expect(complianceScore([month({ late_client: 1 }), month({ late_client: 1 })]).overall).toBe("red");
  });

  it("rates returned documents and payments at the thresholds", () => {
    expect(complianceScore([month({ documents: 20, documents_returned: 1 })]).quality.tone).toBe("green"); // 5%
    expect(complianceScore([month({ documents: 20, documents_returned: 3 })]).quality.tone).toBe("yellow"); // 15%
    expect(complianceScore([month({ documents: 20, documents_returned: 4 })]).quality.tone).toBe("red"); // 20%
    expect(complianceScore([month({ dues_due: 10, dues_late: 3 })]).payment.tone).toBe("yellow"); // 70%
    expect(complianceScore([month({ dues_due: 10, dues_late: 4 })]).payment.tone).toBe("red"); // 60%
  });

  it("leaves out parts with no data, and has no score without any", () => {
    const s = complianceScore([month({ dues_due: 0, documents: 0 })]);
    expect(s.payment).toEqual({ tone: null, value: null, detail: "nothing billed yet" });
    expect(s.quality.tone).toBeNull();
    expect(s.overall).toBe("green");
    expect(complianceScore([]).overall).toBeNull();
  });

  it("mentions documents sent after the cutoff", () => {
    expect(complianceScore([month({ documents_late: 3 })]).submission.detail).toBe("1 of 1 month on time · 3 documents after the cutoff");
  });
});

const sm = (o: Partial<StaffMonth> = {}): StaffMonth => ({
  month: "2026-11-01",
  filings_due: 0,
  late_staff: 0,
  late_client: 0,
  prepared: 0,
  kicked_back: 0,
  filed: 0,
  days_to_file: null,
  documents_processed: 0,
  ocr_corrections: 0,
  ...o,
});

describe("kpis", () => {
  it("does not count client-caused late returns against staff", () => {
    const k = kpis([sm({ filings_due: 10, late_staff: 1, late_client: 3 })]);
    expect(k.onTimeRate).toBe(0.9);
    expect(k.lateClient).toBe(3);
  });

  it("weights days to file by returns filed and works out the kickback rate", () => {
    const k = kpis([sm({ filed: 3, days_to_file: "4.0", prepared: 4, kicked_back: 1 }), sm({ filed: 1, days_to_file: 8 }), sm({ filed: 0, days_to_file: null })]);
    expect(k.daysToFile).toBe(5);
    expect(k.kickbackRate).toBe(0.25);
  });

  it("has no rates without data", () => {
    expect(kpis([])).toMatchObject({ onTimeRate: null, kickbackRate: null, daysToFile: null });
    expect(pct(null)).toBe("—");
    expect(pct(0.857)).toBe("86%");
  });
});

describe("months", () => {
  it("lists the last n months, oldest first, across a year end", () => {
    expect(lastMonths("2027-02-14", 4)).toEqual(["2026-11-01", "2026-12-01", "2027-01-01", "2027-02-01"]);
    expect(lastMonths("2026-11-23", 12)[0]).toBe("2025-12-01");
  });

  it("gives the month's last day", () => {
    expect(monthEnd("2028-02-01")).toBe("2028-02-29");
    expect(monthEnd("2026-11-01")).toBe("2026-11-30");
  });
});

describe("lateReason", () => {
  const base = { missed_cutoff: false, late_documents: false, waited_for_client: false, unpaid_tax: false };
  it("names what the client did", () => {
    expect(lateReason({ ...base, missed_cutoff: true, cause: "client" })).toBe("Client missed the cutoff");
    expect(lateReason({ ...base, late_documents: true, waited_for_client: true, unpaid_tax: true, cause: "client" })).toBe(
      "Client sent documents after the cutoff, had not approved the return by the due date and had not paid the tax by the due date",
    );
    expect(lateReason({ ...base, cause: "staff" })).toBe("Documents and approvals were in on time");
  });
});
