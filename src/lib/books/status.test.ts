import { describe, expect, it } from "vitest";
import { daysBetween, invoiceStatus, invoiceTotals } from "./status";

describe("invoice status", () => {
  const inv = { balanceDue: "1120.00", issueDate: "2026-11-01", dueDate: "2026-11-30" };

  it("is Paid in full once nothing is due", () => {
    expect(invoiceStatus({ ...inv, balanceDue: "0.00" }, "2026-12-31")).toEqual({ kind: "paid", days: 0, label: "Paid in full" });
  });

  it("counts the days until or past the due date", () => {
    expect(invoiceStatus(inv, "2026-11-25")).toEqual({ kind: "due", days: 5, label: "Due in 5 days" });
    expect(invoiceStatus(inv, "2026-11-29").label).toBe("Due in 1 day");
    expect(invoiceStatus(inv, "2026-11-30")).toEqual({ kind: "due_today", days: 0, label: "Due today" });
    expect(invoiceStatus(inv, "2026-12-01")).toEqual({ kind: "overdue", days: 1, label: "Overdue 1 day" });
    expect(invoiceStatus(inv, "2027-01-30").label).toBe("Overdue 61 days");
  });

  it("is due on the issue date when there is no due date, and Void when voided", () => {
    expect(invoiceStatus({ ...inv, dueDate: null }, "2026-11-04").label).toBe("Overdue 3 days");
    expect(invoiceStatus({ ...inv, voided: true }, "2026-11-04").kind).toBe("void");
  });

  it("works across months and years in calendar days", () => {
    expect(daysBetween("2026-02-28", "2026-03-01")).toBe(1);
    expect(daysBetween("2028-02-28", "2028-03-01")).toBe(2);
    expect(daysBetween("2026-12-31", "2027-01-01")).toBe(1);
    expect(() => daysBetween("2026-1-1", "2026-01-02")).toThrow(/YYYY-MM-DD/);
  });

  it("totals a list, leaving out void invoices", () => {
    expect(invoiceTotals([{ total: "1120.00", balanceDue: "120.00" }, { total: "500.50", balanceDue: "0" }, { total: "99", balanceDue: "99", voided: true }])).toEqual({ total: 162_050, paid: 150_050, due: 12_000 });
  });
});
