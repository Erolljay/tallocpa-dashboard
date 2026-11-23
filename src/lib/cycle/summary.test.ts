import { describe, expect, it } from "vitest";
import { parseMonth, submission, type CycleRow } from "./summary";

const y = (over: Partial<CycleRow> = {}): CycleRow => ({
  cutoff_date: "2026-12-05",
  requested_at: null,
  nothing_to_submit_at: null,
  missed_cutoff: null,
  closed_at: null,
  ...over,
});

describe("submission", () => {
  it("is in progress before the request and waiting after it", () => {
    expect(submission(y(), 0, "2026-11-23")).toBe("not_due");
    expect(submission(y({ requested_at: "2026-12-01T00:00:00Z" }), 0, "2026-12-03")).toBe("waiting");
  });

  it("is submitted once documents come in, or the client says there are none", () => {
    expect(submission(y(), 2, "2026-12-03")).toBe("submitted");
    expect(submission(y({ nothing_to_submit_at: "2026-12-02T00:00:00Z" }), 0, "2026-12-03")).toBe("nothing");
  });

  it("is missed after the cutoff with nothing in, even before the nightly job records it", () => {
    expect(submission(y(), 0, "2026-12-06")).toBe("missed");
    expect(submission(y({ missed_cutoff: true }), 3, "2026-12-20")).toBe("missed");
    expect(submission(y({ missed_cutoff: false }), 0, "2026-12-20")).toBe("submitted");
  });
});

describe("parseMonth", () => {
  it("accepts YYYY-MM and first-of-month dates only", () => {
    expect(parseMonth("2026-11")).toBe("2026-11-01");
    expect(parseMonth("2026-11-01")).toBe("2026-11-01");
    expect(parseMonth("2026-13")).toBeNull();
    expect(parseMonth("2026-11-15")).toBeNull();
    expect(parseMonth(undefined)).toBeNull();
  });
});
