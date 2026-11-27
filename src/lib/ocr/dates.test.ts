import { describe, expect, it } from "vitest";
import { dateFarFromMonth, parsePrintedDate } from "./dates";

describe("parsePrintedDate", () => {
  it("reads month first, as Philippine invoices print it", () => {
    expect(parsePrintedDate("11/27/2026")).toBe("2026-11-27");
    expect(parsePrintedDate("03/04/2026")).toBe("2026-03-04");
    expect(parsePrintedDate("3/4/2026")).toBe("2026-03-04");
    expect(parsePrintedDate("11-27-2026")).toBe("2026-11-27");
    expect(parsePrintedDate("11.27.2026")).toBe("2026-11-27");
    expect(parsePrintedDate("Date: 11 / 27 / 2026")).toBe("2026-11-27");
  });

  it("puts a two-digit year in the 2000s", () => {
    expect(parsePrintedDate("11/27/26")).toBe("2026-11-27");
    expect(parsePrintedDate("01/05/25")).toBe("2025-01-05");
  });

  it("reads day first only when the first number cannot be a month", () => {
    expect(parsePrintedDate("27/11/2026")).toBe("2026-11-27");
    expect(parsePrintedDate("13/01/2026")).toBe("2026-01-13");
  });

  it("reads month names either way round", () => {
    expect(parsePrintedDate("Nov 27, 2026")).toBe("2026-11-27");
    expect(parsePrintedDate("November 27 2026")).toBe("2026-11-27");
    expect(parsePrintedDate("Sept. 3, 2026")).toBe("2026-09-03");
    expect(parsePrintedDate("27 Nov 2026")).toBe("2026-11-27");
    expect(parsePrintedDate("27-Nov-26")).toBe("2026-11-27");
    expect(parsePrintedDate("27th of November, 2026")).toBe("2026-11-27");
  });

  it("keeps ISO dates (older readings) and rejects what is not a real date", () => {
    expect(parsePrintedDate("2026-11-27")).toBe("2026-11-27");
    expect(parsePrintedDate("02/30/2026")).toBeNull();
    expect(parsePrintedDate("13/13/2026")).toBeNull();
    expect(parsePrintedDate("next week")).toBeNull();
    expect(parsePrintedDate("")).toBeNull();
    expect(parsePrintedDate(null)).toBeNull();
  });
});

describe("dateFarFromMonth", () => {
  it("accepts dates in the month, a little before, or the next month", () => {
    expect(dateFarFromMonth("2026-11-27", "2026-11-01")).toBeNull();
    expect(dateFarFromMonth("2026-08-31", "2026-11-01")).toBeNull();
    expect(dateFarFromMonth("2026-12-02", "2026-11-01")).toBeNull();
  });

  it("flags a likely misread year or month", () => {
    expect(dateFarFromMonth("2024-11-27", "2026-11-01")).toMatch(/far from the month this was sent for \(November 2026\)/);
    expect(dateFarFromMonth("2027-11-27", "2026-11-01")).not.toBeNull();
  });
});
