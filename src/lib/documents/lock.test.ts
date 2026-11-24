import { describe, expect, it } from "vitest";
import { lockingFiling, type LockFiling } from "./lock";

const f = (over: Partial<LockFiling>): LockFiling => ({ id: "f1", client_id: "c1", form: "2550Q", period_label: "Q3 2026", period_start: "2026-07-01", period_end: "2026-09-30", status: "filed", ...over });

describe("lockingFiling", () => {
  it("locks every month the filed return covers", () => {
    for (const m of ["2026-07-01", "2026-08-01", "2026-09-01"]) expect(lockingFiling("c1", m, [f({})])?.id).toBe("f1");
    expect(lockingFiling("c1", "2026-10-01", [f({})])).toBeNull();
    expect(lockingFiling("c1", "2026-06-01", [f({})])).toBeNull();
  });
  it("ignores returns not yet filed and other clients", () => {
    expect(lockingFiling("c1", "2026-08-01", [f({ status: "client_approved" })])).toBeNull();
    expect(lockingFiling("c1", "2026-08-01", [f({ client_id: "c2" })])).toBeNull();
    expect(lockingFiling("c1", "2026-08-01", [f({ status: "paid" })])?.id).toBe("f1");
  });
  it("names the latest-ending filed return when several cover the month", () => {
    const annual = f({ id: "a", form: "1701", period_start: "2026-01-01", period_end: "2026-12-31" });
    expect(lockingFiling("c1", "2026-08-01", [f({}), annual])?.id).toBe("a");
  });
});
