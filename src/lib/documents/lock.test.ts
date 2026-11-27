import { describe, expect, it } from "vitest";
import { lockFormsFor, lockingFiling, type LockFiling } from "./lock";

const f = (over: Partial<LockFiling>): LockFiling => ({ id: "f1", client_id: "c1", form: "2550Q", period_label: "Q3 2026", period_start: "2026-07-01", period_end: "2026-09-30", status: "filed", ...over });
const P = "purchase_receipt";

describe("lockingFiling", () => {
  it("locks every month the filed return covers", () => {
    for (const m of ["2026-07-01", "2026-08-01", "2026-09-01"]) expect(lockingFiling("c1", m, [f({})], P)?.id).toBe("f1");
    expect(lockingFiling("c1", "2026-10-01", [f({})], P)).toBeNull();
    expect(lockingFiling("c1", "2026-06-01", [f({})], P)).toBeNull();
  });
  it("ignores returns not yet filed and other clients", () => {
    expect(lockingFiling("c1", "2026-08-01", [f({ status: "client_approved" })], P)).toBeNull();
    expect(lockingFiling("c1", "2026-08-01", [f({ client_id: "c2" })], P)).toBeNull();
    expect(lockingFiling("c1", "2026-08-01", [f({ status: "paid" })], P)?.id).toBe("f1");
  });
  it("names the latest-ending filed return when several cover the month", () => {
    const annual = f({ id: "a", form: "1701", period_start: "2026-01-01", period_end: "2026-12-31" });
    expect(lockingFiling("c1", "2026-08-01", [f({}), annual], P)?.id).toBe("a");
  });
  it("is locked only by a return prepared from that kind of document", () => {
    const c = f({ id: "c", form: "1601-C", period_label: "2026-10", period_start: "2026-10-01", period_end: "2026-10-31" });
    const e = f({ id: "e", form: "0619-E", period_label: "2026-10", period_start: "2026-10-01", period_end: "2026-10-31" });
    const pt = f({ id: "pt", form: "2551Q", period_label: "Q4 2026", period_start: "2026-10-01", period_end: "2026-12-31" });
    // A filed 1601-C (payroll) leaves October's sales and purchases open.
    expect(lockingFiling("c1", "2026-10-01", [c], "purchase_receipt")).toBeNull();
    expect(lockingFiling("c1", "2026-10-01", [c], "sales_invoice")).toBeNull();
    expect(lockingFiling("c1", "2026-10-01", [c], "payroll")?.id).toBe("c");
    // Expanded withholding locks purchases, not sales; percentage tax locks sales, not purchases.
    expect(lockingFiling("c1", "2026-10-01", [e], "purchase_receipt")?.id).toBe("e");
    expect(lockingFiling("c1", "2026-10-01", [e], "sales_invoice")).toBeNull();
    expect(lockingFiling("c1", "2026-10-01", [pt], "sales_invoice")?.id).toBe("pt");
    expect(lockingFiling("c1", "2026-10-01", [pt], "purchase_receipt")).toBeNull();
    // VAT locks both.
    expect(lockingFiling("c1", "2026-08-01", [f({})], "sales_invoice")?.id).toBe("f1");
  });
  it("any other kind of document is locked by every return that locks the Books", () => {
    expect(lockFormsFor("other")).toContain("1601-C");
    expect(lockFormsFor("cor")).toContain("2551Q");
  });
});
