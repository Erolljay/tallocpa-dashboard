import { describe, expect, it } from "vitest";
import { shareMessage } from "./share-message";

const base = { soa: { reference: "TC-0101-2026-11-20", due_on: "2026-11-25" }, client: { name: "Iloilo Bakery" }, brand: { display_name: "Tallo CPA" } };

describe("shareMessage", () => {
  it("names the statement, the amount due and the pay-by date", () => {
    const m = shareMessage({ ...base, totalDue: 12500 });
    expect(m).toContain("Hi Iloilo Bakery, here is your Statement of Account TC-0101-2026-11-20 from Tallo CPA.");
    expect(m).toContain("Total amount due: ₱12,500.00, payable by");
    expect(m).toContain("put TC-0101-2026-11-20 in the transfer note");
  });

  it("says nothing is due on a settled statement", () => {
    expect(shareMessage({ ...base, totalDue: 0 })).toContain("Nothing is due on it.");
  });
});
