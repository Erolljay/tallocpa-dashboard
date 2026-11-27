import { describe, expect, it } from "vitest";
import { ToolRefusal } from "@/lib/mcp/tool";
import { onboardingChecklist } from "./checklist";
import { draftBody, factsFromAi, type AiOnboardingFacts } from "./ai-tools";

const facts = (over: Partial<AiOnboardingFacts> = {}): AiOnboardingFacts => ({
  client_id: "c1",
  status: "onboarding",
  fiscal_year_end_month: 12,
  files: { proposal: 1, contract: 1, contract_signed: false },
  engagement_active: true,
  engagements: [],
  accepted_proposal: null,
  tax_types: ["IT"],
  registration_date: "2026-01-05",
  obligations: "3" as unknown as number,
  has_payroll_obligation: false,
  preparer: true,
  reviewer: false,
  portal_users: 0,
  portal_signed_in: false,
  books_start: "2026-01-01",
  opening_posted: false,
  batch_uploads: 0,
  employees: 0,
  ticks: [{ item: "kickoff", at: "2026-01-10T00:00:00", note: null }],
  ...over,
});
const base = { client: "TC-0001", reason: "Because." };

describe("onboarding facts for the AI employee", () => {
  it("give the same checklist staff see", () => {
    const items = onboardingChecklist(factsFromAi(facts()));
    const state = Object.fromEntries(items.map((i) => [i.key, i.state]));
    expect(state).toMatchObject({ proposal: "done", contract: "todo", engagement: "done", cor: "done", obligations: "done", team: "todo", portal: "todo", portal_login: "na", chart: "done", opening: "todo", kickoff: "done" });
    expect(items.find((i) => i.key === "team")?.hint).toMatch(/reviewer/);
  });

  it("keep when an item was ticked but not who ticked it", () => {
    expect(factsFromAi(facts()).ticks.get("kickoff")).toEqual({ by: "", at: "2026-01-10", note: null });
  });

  it("read the fiscal year start from the year end", () => {
    expect(factsFromAi(facts({ fiscal_year_end_month: 6 })).yearStartMonth).toBe(7);
    expect(factsFromAi(facts()).yearStartMonth).toBe(1);
  });
});

describe("onboarding drafts", () => {
  it("need the details of their kind", () => {
    expect(() => draftBody({ ...base, kind: "engagement" })).toThrow(ToolRefusal);
    expect(() => draftBody({ ...base, kind: "kickoff_brief" })).toThrow(/kickoff_brief/);
  });

  it("refuse opening balances that do not balance, or lines with both or neither side", () => {
    const ob = (lines: { account_code: string; debit: number; credit: number }[]) => draftBody({ ...base, kind: "opening_balances", opening_balances: { as_of: "2025-12-31", lines } });
    expect(() => ob([{ account_code: "1010", debit: 1000, credit: 0 }, { account_code: "3010", debit: 0, credit: 999.99 }])).toThrow(/do not balance.*₱0\.01/);
    expect(() => ob([{ account_code: "1010", debit: 1000, credit: 1000 }, { account_code: "3010", debit: 0, credit: 0 }])).toThrow(/debit or a credit/);
    expect(() => ob([{ account_code: "1010", debit: 10.005, credit: 0 }, { account_code: "3010", debit: 0, credit: 10.005 }])).toThrow(/centavo/);
    const ok = ob([{ account_code: "1010", debit: 0.1, credit: 0 }, { account_code: "1020", debit: 0.2, credit: 0 }, { account_code: "3010", debit: 0, credit: 0.3 }]);
    expect(ok.summary.find((l) => l.label === "Total debits = credits")?.value).toBe("₱0.30");
  });

  it("name only active staff for the team", () => {
    expect(() => draftBody({ ...base, kind: "team", team: { preparer: "Ana Cruz", reviewer: "Nobody" } }, ["Ana Cruz", "Ben Reyes"])).toThrow(/Nobody/);
    expect(draftBody({ ...base, kind: "team", team: { preparer: "ana cruz", reviewer: "Ben Reyes" } }, ["Ana Cruz", "Ben Reyes"]).summary).toEqual([
      { label: "Preparer", value: "ana cruz" },
      { label: "Reviewer", value: "Ben Reyes" },
    ]);
  });

  it("show the template's name and the client request's items", () => {
    expect(draftBody({ ...base, kind: "chart_of_accounts", chart_of_accounts: { template: "opc", books_start: "2026-01-01" } }).summary[0].value).toBe("One Person Corporation (OPC)");
    expect(draftBody({ ...base, kind: "client_request", client_request: { title: "Documents for opening balances", items: ["2025 AFS", "Bank statement Dec 2025"] } }).summary).toHaveLength(3);
  });
});
