import { describe, expect, it } from "vitest";
import { activeFor, appointmentRow, appointmentSchema, delegationState, lastDay } from "./period";

const REVIEWER = "00000000-0000-4000-8000-000000000001";

describe("acting approver appointment", () => {
  it("covers whole Manila days, the last day included", () => {
    const a = appointmentSchema.parse({ delegate_user_id: REVIEWER, from: "2026-12-01", to: "2026-12-07", max_tax_due: "50000", reason: "On leave" });
    const row = appointmentRow(a);
    expect(row).toMatchObject({ starts_at: "2026-12-01T00:00:00+08:00", ends_at: "2026-12-08T00:00:00+08:00", max_tax_due: 50000 });
    expect(lastDay(row.ends_at)).toBe("2026-12-07");
  });

  it("rejects a last day before the first, and a missing reason", () => {
    const r = appointmentSchema.safeParse({ delegate_user_id: REVIEWER, from: "2026-12-07", to: "2026-12-01", max_tax_due: "1", reason: "" });
    expect(r.success).toBe(false);
    const paths = r.error!.issues.map((i) => i.path[0]);
    expect(paths).toContain("to");
    expect(paths).toContain("reason");
  });

  it("is upcoming, active, then ended; ending early ends it", () => {
    const d = { starts_at: "2026-12-01T00:00:00+08:00", ends_at: "2026-12-08T00:00:00+08:00", ended_at: null };
    expect(delegationState(d, new Date("2026-11-30T12:00:00+08:00"))).toBe("upcoming");
    expect(delegationState(d, new Date("2026-12-07T23:59:00+08:00"))).toBe("active");
    expect(delegationState(d, new Date("2026-12-08T00:00:00+08:00"))).toBe("ended");
    expect(delegationState({ ...d, ended_at: "2026-12-03T10:00:00+08:00" }, new Date("2026-12-04T00:00:00+08:00"))).toBe("ended");
  });

  it("finds the person's appointment in force", () => {
    const rows = [
      { id: "a", delegate_user_id: REVIEWER, starts_at: "2026-12-01T00:00:00+08:00", ends_at: "2026-12-08T00:00:00+08:00", ended_at: null, max_tax_due: "1", reason: "x" },
    ];
    expect(activeFor(rows, REVIEWER, new Date("2026-12-02T09:00:00+08:00"))?.id).toBe("a");
    expect(activeFor(rows, "someone-else", new Date("2026-12-02T09:00:00+08:00"))).toBeNull();
  });
});
