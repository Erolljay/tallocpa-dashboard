import { describe, expect, it } from "vitest";
import { lockActionFor, lockActionLabel, lockStatusText, type LockMonth, type LockViewer } from "./month-lock";

const month = (over: Partial<LockMonth> = {}): LockMonth => ({
  month: "2026-10-01",
  status: "open",
  lock_source: null,
  locked_by: null,
  locked_at: null,
  request_id: null,
  request_kind: null,
  requested_by: null,
  requested_at: null,
  request_reason: null,
  waiting_documents: 0,
  in_books: true,
  ...over,
});
const viewer = (over: Partial<LockViewer> = {}): LockViewer => ({ userId: "u", owner: false, preparer: false, reviewer: false, acting: false, ...over });
const today = "2026-11-25";

describe("lockActionFor", () => {
  it("lets the preparer ask for a lock once the Inbox is clear", () => {
    expect(lockActionFor(month(), viewer({ preparer: true }), today)).toEqual({ kind: "request_lock", disabled: null });
    const held = lockActionFor(month({ waiting_documents: 2 }), viewer({ preparer: true }), today);
    expect(held).toEqual({ kind: "request_lock", disabled: "2 documents of October 2026 still in the Inbox: approve or return them first." });
  });

  it("lets the reviewer or the Owner lock an open or requested month", () => {
    expect(lockActionFor(month(), viewer({ reviewer: true }), today)).toEqual({ kind: "lock" });
    expect(lockActionFor(month({ status: "lock_requested" }), viewer({ owner: true }), today)).toEqual({ kind: "lock" });
    expect(lockActionFor(month({ status: "lock_requested" }), viewer({ preparer: true }), today)).toBeNull();
  });

  it("has the reviewer ask to unlock and the Owner unlock", () => {
    expect(lockActionFor(month({ status: "locked" }), viewer({ reviewer: true }), today)).toEqual({ kind: "request_unlock" });
    expect(lockActionFor(month({ status: "locked" }), viewer({ owner: true }), today)).toEqual({ kind: "unlock" });
    expect(lockActionFor(month({ status: "locked" }), viewer({ preparer: true }), today)).toBeNull();
  });

  it("lets the acting approver unlock a locked month directly, as the Owner does", () => {
    const locked = { month: "2026-01-01", status: "locked", lock_source: "reviewer", locked_by: "x", locked_at: null, request_id: null, request_kind: null, requested_by: null, requested_at: null, request_reason: null, waiting_documents: 0, in_books: true } as never;
    expect(lockActionFor(locked, viewer({ acting: true }), today)).toEqual({ kind: "unlock" });
    expect(lockActionFor(locked, viewer({ owner: true }), today)).toEqual({ kind: "unlock" });
    expect(lockActionFor(locked, viewer({ reviewer: true }), today)).toEqual({ kind: "request_unlock" });
  });

  it("lets the Owner or the acting approver decide an unlock request", () => {
    const m = month({ status: "unlock_requested", request_id: "r1", request_kind: "unlock" });
    expect(lockActionFor(m, viewer({ acting: true }), today)).toEqual({ kind: "decide", requestId: "r1" });
    expect(lockActionFor(m, viewer({ owner: true }), today)).toEqual({ kind: "decide", requestId: "r1" });
    expect(lockActionFor(m, viewer({ reviewer: true }), today)).toBeNull();
  });

  it("offers nothing before the books start or for a month not yet begun", () => {
    expect(lockActionFor(month({ in_books: false }), viewer({ owner: true }), today)).toBeNull();
    expect(lockActionFor(month({ month: "2026-12-01" }), viewer({ owner: true }), today)).toBeNull();
  });
});

describe("labels", () => {
  const names = (id: string | null) => (id === "a" ? "Ana Cruz" : null);
  it("says who locked it and when", () => {
    expect(lockStatusText(month({ status: "locked", locked_by: "a", locked_at: "2026-11-03T02:00:00Z" }), names)).toBe("Locked by Ana Cruz on Nov 3, 2026");
    expect(lockStatusText(month({ status: "locked", lock_source: "filed" }), names)).toBe("Locked: return filed");
    expect(lockStatusText(month({ status: "unlock_requested", requested_by: "a" }), names)).toBe("Unlock requested by Ana Cruz");
  });
  it("names the reviewer and the month on the buttons", () => {
    expect(lockActionLabel({ kind: "request_lock", disabled: null }, "2026-10-01", "Ben")).toBe("Ask Ben to lock October");
    expect(lockActionLabel({ kind: "lock" }, "2026-10-01", null)).toBe("Lock October");
  });
});
