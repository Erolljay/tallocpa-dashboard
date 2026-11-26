import { describe, expect, it } from "vitest";
import { cycleMessage } from "./messages";

describe("cycleMessage", () => {
  const p = { clientName: "Client A", period: "2026-11-01", cutoff: "2026-12-05", portalUrl: "https://os.example/portal" };

  it("asks for the month's documents with the cutoff day", () => {
    const m = cycleMessage("request", p);
    expect(m.subject).toBe("November 2026 documents for Client A — due Saturday, December 5");
    expect(m.bodyText).toContain("Please send Client A's November 2026 documents by Saturday, December 5.");
    expect(m.action).toEqual({ label: "Upload documents", url: "https://os.example/portal" });
  });

  it("reminds the day before", () => {
    const m = cycleMessage("reminder", p);
    expect(m.subject).toBe("Reminder: November 2026 documents are due tomorrow");
    expect(m.bodyText).toContain("due tomorrow, Saturday, December 5");
  });
});
