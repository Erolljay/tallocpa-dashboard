import { describe, expect, it } from "vitest";
import { isIloiloCity, birForm, branchStepsFor, certificateStepsFor, closureStepsFor, employerStepsFor, feeJobsFor, secFilingStepsFor, updateChangesFor, updateStepsFor, daysBetween, dtiRenewalDue, renewalStepsFor, daysOpen, nextStep, progress, routingSlip, stepsFor, stepsPayload, waitingOn } from "./steps";
import { FEE_TEMPLATE } from "../fees/template";

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

describe("renewalStepsFor", () => {
  it("renews the barangay, fire, sanitary and mayor's permits, then the books for the new year (the GIS has its own case)", () => {
    expect(renewalStepsFor("corporation", { lguServed: true, dtiDue: false }).map((s) => s.code)).toEqual([
      "barangay_clearance", "fire_safety", "sanitary_permit", "mayors_permit", "bir_books", "bir_display",
    ]);
  });
  it("renews a sole proprietor's DTI name only when due", () => {
    const due = (dtiDue: boolean) => renewalStepsFor("individual", { lguServed: false, dtiDue }).find((s) => s.code === "dti_renewal");
    expect(due(true)?.status).toBe("pending");
    expect(due(false)).toMatchObject({ status: "not_applicable", notes: "Not due this year." });
    expect(renewalStepsFor("individual", { lguServed: false, dtiDue: true }).find((s) => s.code === "mayors_permit")?.status).toBe("not_applicable");
  });
  it("counts the DTI renewal every 5 years from registration", () => {
    expect(dtiRenewalDue("2022-03-01", 2027)).toBe(true);
    expect(dtiRenewalDue("2022-03-01", 2032)).toBe(true);
    expect(dtiRenewalDue("2022-03-01", 2026)).toBe(false);
    expect(dtiRenewalDue("2027-03-01", 2027)).toBe(false);
    expect(dtiRenewalDue(null, 2027)).toBe(false);
  });
});

describe("closureStepsFor", () => {
  it("closes City Hall first, then BIR, then SEC, then the employer numbers", () => {
    expect(closureStepsFor("corporation", { lguServed: true, employer: true }).map((s) => s.code)).toEqual([
      "barangay_closure", "mayors_retirement", "bir_1905", "bir_final_returns", "bir_invoices_surrender", "bir_verification", "bir_cancelled",
      "sec_dissolution", "sss_employer_closure", "philhealth_employer_closure", "pagibig_employer_closure",
    ]);
  });
  it("cancels a sole proprietor's DTI name and skips what does not apply", () => {
    const steps = closureStepsFor("individual", { lguServed: false, employer: false });
    expect(steps.map((s) => s.code)).toContain("dti_cancellation");
    expect(steps.filter((s) => s.status === "not_applicable").map((s) => s.code)).toEqual([
      "barangay_closure", "mayors_retirement", "sss_employer_closure", "philhealth_employer_closure", "pagibig_employer_closure",
    ]);
  });
});

describe("updateStepsFor", () => {
  const codes = (...a: Parameters<typeof updateStepsFor>) => updateStepsFor(...a).map((s) => s.code);
  const all = { lguServed: true, employer: true };

  it("registers VAT with Form 1905, an updated COR, new invoices and books", () => {
    expect(codes("corporation", ["tax_types"], all)).toEqual(["bir_1905", "bir_cor", "bir_invoices", "bir_books", "bir_display"]);
  });
  it("moves a corporation to another city: SEC, barangay, both City Halls, BIR transfer, employer records", () => {
    expect(codes("corporation", ["rdo_transfer"], all)).toEqual([
      "sec_board_approval", "sec_amendment", "sec_amendment_approved", "barangay_clearance", "mayors_permit_new", "mayors_retirement_old",
      "bir_1905", "bir_rdo_transfer", "bir_cor", "bir_invoices", "bir_books", "bir_display",
      "sss_employer_update", "philhealth_employer_update", "pagibig_employer_update",
    ]);
  });
  it("changes a sole proprietor's address in the same city through DTI and an amended permit", () => {
    expect(codes("individual", ["address"], all)).toEqual([
      "dti_amendment", "barangay_clearance", "mayors_permit_amendment", "bir_1905", "bir_cor", "bir_invoices", "bir_display",
      "sss_employer_update", "philhealth_employer_update", "pagibig_employer_update",
    ]);
  });
  it("lists each step once when changes are combined, and marks what the firm does not handle", () => {
    const steps = updateStepsFor("individual", ["name", "address", "tax_types"], { lguServed: false, employer: false });
    expect(new Set(steps.map((s) => s.code)).size).toBe(steps.length);
    expect(steps.find((s) => s.code === "mayors_permit_amendment")?.status).toBe("not_applicable");
    expect(steps.find((s) => s.code === "sss_employer_update")?.notes).toBe("No employer numbers.");
    expect(codes("individual", ["line_of_business"], all)).toEqual(["mayors_permit_amendment", "bir_1905", "bir_cor", "bir_display"]);
  });
});

describe("branchStepsFor", () => {
  it("registers a branch with its own permits, branch code, COR, books and invoices", () => {
    expect(branchStepsFor("corporation", { lguServed: true }).map((s) => s.code)).toEqual([
      "barangay_clearance", "mayors_permit", "bir_registration", "bir_cor", "bir_books", "bir_invoices", "bir_display",
    ]);
    expect(branchStepsFor("individual", { lguServed: false }).map((s) => [s.code, s.status]).slice(0, 3)).toEqual([
      ["dti_scope", "pending"], ["barangay_clearance", "not_applicable"], ["mayors_permit", "not_applicable"],
    ]);
  });
});

describe("SEC amendments", () => {
  const codes = (...a: Parameters<typeof updateStepsFor>) => updateStepsFor(...a).map((s) => s.code);
  const all = { lguServed: true, employer: true };

  it("files an SEC-only amendment without Form 1905", () => {
    expect(codes("corporation", ["directors"], all)).toEqual(["sec_board_approval", "sec_amendment", "sec_amendment_approved", "sec_gis_update"]);
    expect(updateStepsFor("corporation", ["directors"], all).find((s) => s.code === "sec_amendment")?.label).toContain("number of directors");
  });
  it("pays for a capital increase and its DST before filing, then amends the GIS", () => {
    expect(codes("corporation", ["capital_increase"], all)).toEqual([
      "sec_board_approval", "sec_capital_paid", "bir_dst", "sec_amendment", "sec_amendment_approved", "sec_gis_update",
    ]);
    expect(codes("corporation", ["capital_decrease"], all)).toContain("sec_creditors");
  });
  it("changes the fiscal year with SEC and the BIR, with a short-period return", () => {
    expect(codes("corporation", ["fiscal_year"], all)).toEqual([
      "sec_board_approval", "sec_amendment", "sec_amendment_approved", "bir_1905", "bir_cor", "bir_books", "bir_short_period", "bir_display",
    ]);
  });
  it("changes the primary purpose with SEC, City Hall and the BIR", () => {
    expect(codes("corporation", ["primary_purpose"], all)).toEqual([
      "sec_board_approval", "sec_amendment", "sec_amendment_approved", "mayors_permit_amendment", "bir_1905", "bir_cor", "bir_display",
    ]);
  });
  it("reserves the new name and lists every change once in one amendment", () => {
    const steps = updateStepsFor("partnership", ["name", "primary_purpose", "other_amendment"], all);
    expect(steps.map((s) => s.code).slice(0, 4)).toEqual(["sec_board_approval", "sec_name", "sec_amendment", "sec_amendment_approved"]);
    expect(steps[0].label).toContain("Partners");
    expect(steps.find((s) => s.code === "sec_amendment")?.label).toContain("corporate name, primary purpose, other provisions");
  });
  it("offers sole proprietors no SEC amendments and ignores any given", () => {
    expect(updateChangesFor("individual")).toEqual(["address", "rdo_transfer", "tax_types", "name", "line_of_business"]);
    expect(updateChangesFor("corporation")).toContain("capital_increase");
    expect(codes("individual", ["directors"], all)).toEqual([]);
  });
});

describe("SEC filings, certificates and employer registration", () => {
  it("files the GIS and AFS through eFAST, keeping what the case does not cover", () => {
    expect(secFilingStepsFor("corporation", { gis: true, afs: true }).map((s) => s.code)).toEqual([
      "sec_efast", "sec_gis", "sec_afs_ready", "sec_afs", "sec_fees", "sec_acknowledgment",
    ]);
    const gisOnly = secFilingStepsFor("opc", { gis: true, afs: false });
    expect(gisOnly.filter((s) => s.status === "not_applicable").map((s) => s.code)).toEqual(["sec_afs_ready", "sec_afs"]);
    expect(gisOnly.find((s) => s.code === "sec_gis")?.label).toContain("OPC");
  });
  it("settles open cases first for a tax clearance, then applies and waits for the release", () => {
    expect(certificateStepsFor("tax_clearance").map((s) => s.code)).toEqual([
      "bir_open_cases", "bir_application", "bir_requirements", "bir_certification_fee", "bir_evaluation", "bir_release",
    ]);
    expect(certificateStepsFor("cor_replacement").map((s) => s.code)[0]).toBe("bir_application");
    expect(certificateStepsFor("cor_replacement")[0].label).toContain("1905");
  });
  it("registers the employer with each agency not yet registered", () => {
    const steps = employerStepsFor({ sss: true, philhealth: false, pagibig: true });
    expect(steps.map((s) => s.code)).toEqual(["sss_employer", "sss_employees", "philhealth_employer", "philhealth_employees", "pagibig_employer", "pagibig_employees"]);
    expect(steps.filter((s) => s.status === "not_applicable").map((s) => s.code)).toEqual(["philhealth_employer", "philhealth_employees"]);
  });
});

describe("isIloiloCity", () => {
  it("knows Iloilo City however it is written, and nothing else", () => {
    for (const c of ["Iloilo City", "iloilo city", "City of Iloilo", "Jaro, Iloilo City", "La Paz, ILOILO CITY"]) expect(isIloiloCity(c)).toBe(true);
    for (const c of ["Iloilo", "Pavia, Iloilo", "Oton", "Iloilo Province", "", null, undefined]) expect(isIloiloCity(c)).toBe(false);
  });
});

describe("feeJobsFor", () => {
  const facts = { lguServed: true, lgu: "Iloilo City", employer: false };

  it("bills new businesses by taxpayer type, the Iloilo City permit, plus each employer registration not skipped", () => {
    expect(feeJobsFor("new_business", "individual", facts)).toEqual(["I.registration_individual", "I.business_permit"]);
    expect(feeJobsFor("new_business", "individual", { ...facts, lguServed: false })).toEqual(["I.registration_individual"]);
    expect(feeJobsFor("new_business", "corporation", { lguServed: true, lgu: "Pavia, Iloilo", employer: true, notNeeded: ["philhealth_employer"] })).toEqual([
      "I.registration_non_individual", "I.sss_registration", "I.pagibig_registration",
    ]);
  });
  it("bills the permit renewal only where the firm handles the permits, in Iloilo City", () => {
    expect(feeJobsFor("renewal", "corporation", facts)).toEqual(["I.business_permit"]);
    expect(feeJobsFor("renewal", "corporation", { ...facts, lgu: "Jaro, City of Iloilo" })).toEqual(["I.business_permit"]);
    expect(feeJobsFor("renewal", "corporation", { ...facts, lgu: "Oton" })).toEqual([]);
    expect(feeJobsFor("renewal", "corporation", { ...facts, lgu: null })).toEqual([]);
    expect(feeJobsFor("renewal", "corporation", { lguServed: false, employer: false })).toEqual([]);
    expect(feeJobsFor("renewal", "corporation", { ...facts, notNeeded: ["mayors_permit"] })).toEqual([]);
  });
  it("bills a BIR update as ORUS and an SEC amendment as the SEC amendment job", () => {
    expect(feeJobsFor("bir_update", "individual", { ...facts, changes: ["address"] })).toEqual(["I.orus"]);
    expect(feeJobsFor("bir_update", "corporation", { ...facts, changes: ["directors"] })).toEqual(["I.sec_amendment"]);
    expect(feeJobsFor("bir_update", "corporation", { ...facts, changes: ["name"] })).toEqual(["I.orus", "I.sec_amendment"]);
    expect(feeJobsFor("bir_update", "corporation", { ...facts, changes: ["tax_types"] })).toEqual(["I.orus"]);
  });
  it("bills the other kinds as their one job", () => {
    expect(feeJobsFor("branch", "corporation", facts)).toEqual(["I.orus"]);
    expect(feeJobsFor("sec_filing", "corporation", facts)).toEqual(["I.sec"]);
    expect(feeJobsFor("certificate", "individual", facts)).toEqual(["I.certificate"]);
    expect(feeJobsFor("closure", "individual", facts)).toEqual(["I.closure"]);
    expect(feeJobsFor("employer", "individual", { ...facts, notNeeded: ["sss_employer"] })).toEqual(["I.philhealth_registration", "I.pagibig_registration"]);
  });
  it("covers every ad hoc job on the fee schedule except the amended return, and only those", () => {
    const kinds = ["new_business", "renewal", "bir_update", "branch", "sec_filing", "certificate", "employer", "closure"] as const;
    const billed = new Set(kinds.flatMap((k) => ["individual", "corporation"].flatMap((t) =>
      feeJobsFor(k, t as "individual" | "corporation", { lguServed: true, lgu: "Iloilo City", employer: true, changes: ["name", "directors"] }))));
    const adHoc = FEE_TEMPLATE.filter((i) => i.component === "I" && i.code !== "I.amended_return" && i.code !== "I.backlog_month").map((i) => i.code);
    expect([...billed].sort()).toEqual([...adHoc].sort());
  });
});
