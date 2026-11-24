import { describe, expect, it } from "vitest";
import { reviewQueue, type QueueFiling } from "./review-queue";

const f = (id: string, status: QueueFiling["status"], over: Partial<QueueFiling> = {}): QueueFiling => ({
  id, client_id: "a", status, due_date: "2027-01-25", open_query: null, prepared_by: "p", ...over,
});
const ids = (xs: QueueFiling[]) => xs.map((x) => x.id);

describe("reviewQueue", () => {
  const filings = [
    f("late", "prepared", { due_date: "2027-01-10" }),
    f("mine", "prepared", { prepared_by: "r" }),
    f("other-client", "prepared", { client_id: "b" }),
    f("final", "client_approved"),
    f("waiting", "reviewed", { open_query: "Why?" }),
    f("filed", "filed"),
  ];

  it("gives a reviewer their clients' prepared returns, oldest due first, but not their own work", () => {
    const q = reviewQueue(filings, { userId: "r", owner: false, reviewerOf: new Set(["a"]) });
    expect(ids(q.toReview)).toEqual(["late"]);
    expect(q.toApprove).toEqual([]);
    expect(ids(q.withClient)).toEqual(["waiting"]);
  });

  it("gives the Owner every prepared return and the final approvals", () => {
    const q = reviewQueue(filings, { userId: "o", owner: true, reviewerOf: new Set() });
    expect(ids(q.toReview)).toEqual(["late", "mine", "other-client"]);
    expect(ids(q.toApprove)).toEqual(["final"]);
  });

  it("gives the acting approver the final approvals as well", () => {
    const q = reviewQueue(filings, { userId: "r", owner: false, reviewerOf: new Set(["a"]), acting: true });
    expect(ids(q.toApprove)).toEqual(["final"]);
    expect(ids(q.toReview)).toEqual(["late"]);
  });
});
