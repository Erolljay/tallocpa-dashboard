import { describe, expect, it } from "vitest";
import { statusFor } from "./labels";

describe("statusFor", () => {
  it("words a request to the client for each side", () => {
    expect(statusFor("client", "to_client", "open")).toMatchObject({ label: "Needs your reply", actionNeeded: true });
    expect(statusFor("firm", "to_client", "open")).toMatchObject({ label: "Waiting on client", actionNeeded: false });
    expect(statusFor("client", "to_client", "answered")).toMatchObject({ label: "Sent to us", actionNeeded: false });
    expect(statusFor("firm", "to_client", "answered")).toMatchObject({ label: "Client replied", actionNeeded: true });
  });
  it("words a client's ticket for each side", () => {
    expect(statusFor("firm", "from_client", "open")).toMatchObject({ label: "Needs our reply", actionNeeded: true });
    expect(statusFor("client", "from_client", "open")).toMatchObject({ label: "Waiting on us", actionNeeded: false });
    expect(statusFor("client", "from_client", "answered")).toMatchObject({ label: "Answered", actionNeeded: false });
    expect(statusFor("firm", "from_client", "answered")).toMatchObject({ label: "Answered", actionNeeded: false });
  });
  it("closes the same for both", () => {
    expect(statusFor("client", "to_client", "closed")).toEqual({ label: "Closed", tone: "done", actionNeeded: false });
  });
});
