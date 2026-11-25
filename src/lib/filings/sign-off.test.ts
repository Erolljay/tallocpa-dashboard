import { describe, expect, it } from "vitest";
import { availableActions, isNilReturn, stepIndex, type FilingState, type Viewer } from "./sign-off";

const owner: Viewer = { userId: "o", role: "owner", assignedAs: [] };
const preparer: Viewer = { userId: "p", role: "staff", assignedAs: ["preparer"] };
const reviewer: Viewer = { userId: "r", role: "reviewer", assignedAs: ["reviewer"] };
const stranger: Viewer = { userId: "s", role: "staff", assignedAs: [] };
const client: Viewer = { userId: "c", role: "client", assignedAs: [] };
const at = (status: FilingState["status"], over: Partial<FilingState> = {}): FilingState => ({ status, openQuery: null, preparedBy: "p", ...over });

describe("availableActions", () => {
  it("lets the assigned preparer or the Owner start", () => {
    expect(availableActions(at("not_started"), preparer)).toEqual(["prepare"]);
    expect(availableActions(at("not_started"), owner)).toEqual(["prepare"]);
    expect(availableActions(at("not_started"), stranger)).toEqual([]);
    expect(availableActions(at("not_started"), client)).toEqual([]);
  });
  it("lets the reviewer review or send back, but not their own work", () => {
    expect(availableActions(at("prepared"), reviewer)).toEqual(["review", "kick_back"]);
    expect(availableActions(at("prepared", { preparedBy: "r" }), reviewer)).toEqual(["kick_back"]);
    expect(availableActions(at("prepared"), preparer)).toEqual([]);
  });
  it("puts the client's approval with the client, or the Owner on their behalf", () => {
    expect(availableActions(at("reviewed"), client)).toEqual(["client_approve", "client_query"]);
    expect(availableActions(at("reviewed"), owner)).toEqual(["client_approve", "kick_back"]);
    expect(availableActions(at("reviewed", { openQuery: "Why?" }), preparer)).toEqual(["answer_query"]);
  });
  it("keeps final approval with the Owner; the reviewer can still send it back", () => {
    expect(availableActions(at("client_approved"), owner)).toEqual(["owner_approve", "kick_back"]);
    expect(availableActions(at("client_approved"), reviewer)).toEqual(["kick_back"]);
    expect(availableActions(at("client_approved"), preparer)).toEqual([]);
  });
  it("lets the acting approver give it within the limit, not on their own work", () => {
    const acting: Viewer = { ...reviewer, actingLimit: 50000 };
    expect(availableActions(at("client_approved", { taxDue: 50000 }), acting)).toEqual(["owner_approve", "kick_back"]);
    expect(availableActions(at("client_approved", { taxDue: 50000.01 }), acting)).toEqual(["kick_back"]);
    expect(availableActions(at("client_approved", { taxDue: 100, preparedBy: "r" }), acting)).toEqual(["kick_back"]);
  });
  it("lets assigned staff record Filed & paid, the last step", () => {
    expect(availableActions(at("owner_approved"), preparer)).toEqual(["file"]);
    expect(availableActions(at("owner_approved"), stranger)).toEqual([]);
    expect(availableActions(at("filed"), owner)).toEqual([]);
  });
});

describe("stepIndex", () => {
  it("counts the five steps done", () => {
    expect(stepIndex("not_started")).toBe(0);
    expect(stepIndex("reviewed")).toBe(2);
    expect(stepIndex("filed")).toBe(5);
  });
  it("knows a nil return", () => {
    expect(isNilReturn(0)).toBe(true);
    expect(isNilReturn(null)).toBe(false);
    expect(isNilReturn(10)).toBe(false);
  });
});
