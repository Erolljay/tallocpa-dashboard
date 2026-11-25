import { describe, expect, it } from "vitest";
import { invoiceLabel, missingRanges, monthTimeline, plainForm } from "./month";

const none = new Set<string>();

describe("missing invoice ranges", () => {
  it("groups consecutive numbers of a series and keeps the printed width", () => {
    const r = missingRanges([
      { prefix: "SI", num: 452, width: 4 },
      { prefix: "SI", num: 450, width: 4 },
      { prefix: "SI", num: 451, width: 4 },
      { prefix: "SI", num: 447, width: 4 },
      { prefix: "OR", num: 11, width: 4 },
      { prefix: "", num: 7, width: 3 },
    ]);
    expect(r.map((x) => x.label)).toEqual(["007", "OR 0011", "SI 0447", "SI 0450 to SI 0452"]);
    expect(r[3].numbers).toHaveLength(3);
    expect(invoiceLabel({ prefix: "SI", num: 12345, width: 4 })).toBe("SI 12345");
  });
});

describe("what happens next", () => {
  it("puts checking after the cutoff, then each return's approval and filing, in date order", () => {
    const items = monthTimeline({
      cutoff: "2027-04-05",
      confirmedOn: "2027-04-03",
      cutoffDay: 5,
      holidays: none,
      filings: [
        { form: "2550Q", periodLabel: "Q1 2027", periodStart: "2027-01-01", periodEnd: "2027-03-31", dueDate: "2027-04-26", status: "not_started" },
        { form: "1601-C", periodLabel: "March 2027", periodStart: "2027-03-01", periodEnd: "2027-03-31", dueDate: "2027-04-12", status: "not_started" },
      ],
    });
    expect(items.map((i) => [i.date, i.title])).toEqual([
      ["2027-04-03", "You sent everything"],
      ["2027-04-06", "We finish checking your documents"],
      ["2027-04-08", "Your March 2027 withholding tax on wages (1601-C) is ready for your approval"],
      ["2027-04-09", "We file and pay your 1601-C"],
      ["2027-04-19", "Your Q1 2027 quarterly VAT return (2550Q) is ready for your approval"],
      ["2027-04-20", "We file and pay your 2550Q"],
    ]);
    expect(items[0].done).toBe(true);
  });

  it("asks the client to confirm by the cutoff when they have not, and marks returns already approved", () => {
    const items = monthTimeline({
      cutoff: "2027-04-05", confirmedOn: null, cutoffDay: 5, holidays: none,
      filings: [{ form: "1601-C", periodLabel: "March 2027", periodStart: "2027-03-01", periodEnd: "2027-03-31", dueDate: "2027-04-12", status: "client_approved" }],
    });
    expect(items[0]).toMatchObject({ title: "You confirm the month is complete", done: false });
    expect(items.find((i) => i.title.includes("approval"))?.done).toBe(true);
    expect(items.find((i) => i.title.includes("file"))?.done).toBe(false);
  });

  it("names a form it does not know plainly", () => {
    expect(plainForm("9999")).toBe("9999 return");
  });
});
