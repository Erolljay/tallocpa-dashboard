import { describe, expect, it } from "vitest";
import { birForm, daysBetween, daysOpen, nextStep, progress, routingSlip, stepsFor, stepsPayload, waitingOn } from "./steps";

const codes = (...args: Parameters<typeof stepsFor>) => stepsFor(...args).map((s) => s.code);
const all = { lguServed: true, employer: true };

describe("stepsFor", () => {
  it("registers a sole proprietor's business name with DTI and files Form 1901", () => {
    const steps = stepsFor("individual", all);
    expect(steps[0].code).toBe("dti_business_name");
    expect(codes("individual", all)).not.toContain("sec_registration");
    expect(steps.find((s) => s.code === "bir_registration")?.label).toContain("1901");
  });

  it("registers partnerships, corporations, OPCs and non-stock with SEC and files Form 1903", () => {
    for (const t of ["opc", "partnership", "corporation", "non_stock"] as const) {
      expect(codes(t, all).slice(0, 2)).toEqual(["sec_name", "sec_registration"]);
      expect(codes(t, all)).not.toContain("dti_business_name");
      expect(birForm(t)).toBe("1903");
    }
    expect(stepsFor("partnership", all)[1].label).toContain("Recording");
    expect(stepsFor("non_stock", all)[1].label).toContain("non-stock");
  });

  it("orders the steps DTI/SEC, barangay, City Hall, BIR, then SSS, PhilHealth and Pag-IBIG", () => {
    expect(codes("corporation", all)).toEqual([
      "sec_name", "sec_registration", "barangay_clearance", "mayors_permit",
      "bir_registration", "bir_cor", "bir_books", "bir_invoices", "bir_efiling", "bir_display",
      "sss_employer", "philhealth_employer", "pagibig_employer",
    ]);
    expect(stepsFor("corporation", all).map((s) => s.sortOrder)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    expect(stepsFor("corporation", all).every((s) => s.status === "pending" && s.notes === null)).toBe(true);
  });

  it("keeps the steps the firm does not handle, marked not needed with the reason", () => {
    const steps = stepsFor("individual", { lguServed: false, employer: false });
    const status = Object.fromEntries(steps.map((s) => [s.code, [s.status, s.notes]]));
    expect(status.barangay_clearance).toEqual(["not_applicable", "The client handles this."]);
    expect(status.mayors_permit).toEqual(["not_applicable", "The client handles this."]);
    expect(status.sss_employer).toEqual(["not_applicable", "No employees yet."]);
    expect(status.bir_cor).toEqual(["pending", null]);
  });

  it("builds the database payload", () => {
    expect(stepsPayload(stepsFor("individual", all))[0]).toEqual({
      code: "dti_business_name", agency: "dti", label: "Business name registration (BNRS)", reference_label: "Certificate no.", sort_order: 1, status: "pending", notes: null,
    });
  });
});

describe("progress, next step and waiting on", () => {
  const steps = [
    { code: "a", status: "done", sortOrder: 1 },
    { code: "b", status: "not_applicable", sortOrder: 2 },
    { code: "d", status: "pending", sortOrder: 4 },
    { code: "c", status: "waiting_agency", sortOrder: 3 },
  ] as const;

  it("counts finished steps, leaving out those not needed", () => {
    expect(progress(steps)).toEqual({ done: 1, total: 3 });
  });
  it("finds the first unfinished step in order", () => {
    expect(nextStep(steps)?.code).toBe("c");
    expect(nextStep([{ code: "a", status: "done", sortOrder: 1 }])).toBeNull();
  });
  it("says who the case waits on, the client first", () => {
    expect(waitingOn(steps)).toBe("agency");
    expect(waitingOn([...steps, { code: "e", status: "waiting_client", sortOrder: 5 }])).toBe("client");
    expect(waitingOn([{ code: "a", status: "pending", sortOrder: 1 }])).toBeNull();
  });
});

describe("routingSlip", () => {
  const s = (code: string, sortOrder: number, status: string, doneOn: string | null = null) => ({ code, sortOrder, status, doneOn }) as import("./steps").SlipStep;

  it("passes the file from step to step and counts the days held at each", () => {
    const rows = routingSlip(
      [s("dti", 1, "done", "2027-02-05"), s("brgy", 2, "not_applicable"), s("city", 3, "done", "2027-02-12"), s("bir", 4, "waiting_agency"), s("sss", 5, "pending")],
      "2027-02-01",
      "2027-02-20",
    );
    const view = rows.map((r) => [r.step.code, r.receivedOn, r.releasedOn, r.days, r.current]);
    expect(view).toEqual([
      ["dti", "2027-02-01", "2027-02-05", 4, false],
      ["brgy", null, null, null, false],
      ["city", "2027-02-05", "2027-02-12", 7, false],
      ["bir", "2027-02-12", null, 8, true],
      ["sss", null, null, null, false],
    ]);
  });

  it("keeps a step done out of order on its own dates without going below zero", () => {
    const rows = routingSlip([s("a", 1, "in_progress"), s("b", 2, "done", "2027-02-03")], "2027-02-01", "2027-02-10");
    expect(rows.map((r) => [r.step.code, r.receivedOn, r.releasedOn, r.days, r.current])).toEqual([
      ["a", "2027-02-01", null, 9, true],
      ["b", "2027-02-01", "2027-02-03", 2, false],
    ]);
  });

  it("counts the days the case has been open, up to the last release once finished", () => {
    expect(daysOpen([s("a", 1, "pending")], "2027-02-01", "2027-02-11")).toBe(10);
    expect(daysOpen([s("a", 1, "done", "2027-02-04"), s("b", 2, "not_applicable")], "2027-02-01", "2027-03-01")).toBe(3);
    expect(daysBetween("2027-02-10", "2027-02-01")).toBe(0);
  });
});
