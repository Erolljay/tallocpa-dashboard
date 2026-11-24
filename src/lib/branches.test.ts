import { describe, expect, it } from "vitest";
import { branchSchema, groupByBranch, type Branch } from "./branches";

const ilo: Branch = { id: "i", code: "ILO", name: "Iloilo", address: null, active: true };
const bac: Branch = { id: "b", code: "BAC", name: "Bacolod", address: null, active: true };

describe("branches", () => {
  it("upper-cases the code and checks it", () => {
    expect(branchSchema.parse({ code: " bac ", name: "Bacolod", address: "" })).toEqual({ code: "BAC", name: "Bacolod" });
    expect(branchSchema.safeParse({ code: "B1", name: "Bacolod" }).success).toBe(false);
  });

  it("lists the client's branch first, then the others, then people without a branch", () => {
    const people = [
      { id: 1, branch_id: "i" },
      { id: 2, branch_id: "b" },
      { id: 3, branch_id: null },
    ];
    const g = groupByBranch(people, [ilo, bac], "i");
    expect(g.map((x) => x.branch?.code ?? null)).toEqual(["ILO", "BAC", null]);
    expect(groupByBranch(people, [ilo, bac]).map((x) => x.branch?.code ?? null)).toEqual(["BAC", "ILO", null]);
  });
});
