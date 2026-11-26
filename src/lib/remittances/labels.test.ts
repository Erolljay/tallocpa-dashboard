import { describe, expect, it } from "vitest";
import { agencyOf, deadlineRule, monthLabel, remittanceBadge, reportName } from "./labels";

describe("remittance labels", () => {
  it("names the agency of a loan", () => {
    expect(agencyOf("sss_loan")).toBe("sss");
    expect(agencyOf("pagibig_loan")).toBe("pagibig");
    expect(agencyOf("philhealth")).toBe("philhealth");
    expect(reportName("sss")).toMatch(/R-3/);
  });

  it("turns red once an open remittance is past due", () => {
    expect(remittanceBadge("prepared", "2026-11-25", "2026-11-26")).toEqual({ label: "Prepared · overdue", tone: "blocked" });
    expect(remittanceBadge("approved", "2026-12-31", "2026-11-26")).toEqual({ label: "Approved: to remit", tone: "waiting" });
    expect(remittanceBadge("remitted", "2026-11-01", "2026-11-26")).toEqual({ label: "Remitted", tone: "done" });
  });

  it("explains each agency's deadline", () => {
    expect(deadlineRule("sss", null, null)).toBe("Last day of the following month.");
    expect(deadlineRule("philhealth", "01-000000012-7", null)).toBe("20th of the following month (PEN ends in 7).");
    expect(deadlineRule("philhealth", "01-000000012-3", null)).toBe("15th of the following month (PEN ends in 3).");
    expect(deadlineRule("pagibig", "x", "Golden Bakery")).toBe("19th of the following month (employer name starts with G).");
    expect(deadlineRule("pagibig_loan", "x", "Zeta")).toBe("Last day of the following month (employer name starts with Z).");
  });

  it("names the month", () => {
    expect(monthLabel("2026-11-01")).toBe("November 2026");
  });
});
