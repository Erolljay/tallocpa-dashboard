import { describe, expect, it } from "vitest";
import { onboardingChecklist, onboardingProgress, type OnboardingFacts } from "./checklist";

const facts = (over: Partial<OnboardingFacts> = {}): OnboardingFacts => ({
  clientId: "c1",
  files: { proposal: 0, contract: 0, contractSigned: false },
  engagementActive: false,
  corRecorded: false,
  obligations: 0,
  hasPayrollObligation: false,
  preparer: false,
  reviewer: false,
  portalUsers: 0,
  portalSignedIn: false,
  booksStart: null,
  openingPosted: false,
  yearStartMonth: 1,
  batchUploads: 0,
  employees: 0,
  ticks: new Map(),
  ...over,
});
const state = (f: OnboardingFacts) => Object.fromEntries(onboardingChecklist(f).map((i) => [i.key, i.state]));

describe("onboarding checklist", () => {
  it("starts with everything to do, and leaves out what does not apply yet", () => {
    expect(state(facts())).toEqual({
      proposal: "todo", contract: "todo", engagement: "todo", cor: "todo", obligations: "todo", team: "todo",
      portal: "todo", portal_login: "na", bir_access: "todo", chart: "todo", opening: "na", prior_returns: "na", history: "na", employees: "na", kickoff: "todo",
    });
    expect(onboardingProgress(onboardingChecklist(facts()))).toEqual({ done: 0, total: 10 });
  });

  it("needs the contract both attached and dated", () => {
    const items = onboardingChecklist(facts({ files: { proposal: 1, contract: 1, contractSigned: false } }));
    expect(items.find((i) => i.key === "contract")).toMatchObject({ state: "todo", hint: "Attached; enter the date it was signed." });
    expect(state(facts({ files: { proposal: 1, contract: 1, contractSigned: true } })).contract).toBe("done");
  });

  it("asks for this year's filed returns only when the books start mid-year (fiscal years too)", () => {
    expect(state(facts({ booksStart: "2027-01-01" })).prior_returns).toBe("na");
    expect(state(facts({ booksStart: "2027-04-01" })).prior_returns).toBe("todo");
    // June year end: the taxable year starts in July.
    expect(state(facts({ booksStart: "2027-07-01", yearStartMonth: 7 })).prior_returns).toBe("na");
  });

  it("counts payroll only with a 1601-C, and manual items once ticked", () => {
    const f = facts({ hasPayrollObligation: true, employees: 3, ticks: new Map([["kickoff", { by: "u1", at: "2026-12-01", note: null }]]) });
    const s = state(f);
    expect(s.employees).toBe("done");
    expect(s.kickoff).toBe("done");
    expect(onboardingChecklist(f).find((i) => i.key === "kickoff")?.tick).toEqual({ by: "u1", at: "2026-12-01", note: null });
  });

  it("is complete when every applicable item is done", () => {
    const f = facts({
      files: { proposal: 1, contract: 1, contractSigned: true }, engagementActive: true, corRecorded: true, obligations: 5, preparer: true, reviewer: true,
      portalUsers: 1, portalSignedIn: true, booksStart: "2027-01-01", openingPosted: true, batchUploads: 2,
      ticks: new Map([["bir_access", { by: "u", at: "2026-12-01", note: null }], ["kickoff", { by: "u", at: "2026-12-01", note: null }]]),
    });
    expect(onboardingProgress(onboardingChecklist(f))).toEqual({ done: 13, total: 13 });
  });
});
