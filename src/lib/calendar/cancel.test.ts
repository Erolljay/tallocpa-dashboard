import { afterEach, describe, expect, it, vi } from "vitest";
import { cancelledMessage, cancelReason, leadCancellationEmail, MAX_CANCEL_REASON } from "./cancel";

vi.mock("server-only", () => ({}));
const { deleteEvent } = await import("@/lib/google/calendar");

describe("cancelReason", () => {
  it("is optional, trimmed, one line, and at most 500 characters", () => {
    expect(cancelReason(null)).toBeNull();
    expect(cancelReason("   ")).toBeNull();
    expect(cancelReason("  Sick \n\n today ")).toBe("Sick today");
    expect(cancelReason("x".repeat(600))).toHaveLength(MAX_CANCEL_REASON);
  });
});

describe("cancelledMessage", () => {
  it("says what became of the calendar event", () => {
    expect(cancelledMessage("removed", "Ana", true)).toBe("Cancelled. It is off the calendar, and Google sent Ana the cancellation. We emailed Ana the notice.");
    expect(cancelledMessage("not_connected", "the client")).toMatch(/^Cancelled\. The calendar is not connected right now, so remove the event from Google Calendar yourself/);
    expect(cancelledMessage("failed", "the client")).toMatch(/Google did not remove the event/);
    expect(cancelledMessage("none", "the client")).toBe("Cancelled.");
  });
});

describe("leadCancellationEmail", () => {
  const base = { contactName: "Ana Cruz", businessName: "Arevalo Bakery", scheduledAt: "2026-12-04T02:00:00Z", reason: null, firm: "Tallo CPA", bookingUrl: null };

  it("gives the time in Manila and asks the lead to reply when the link is closed", () => {
    const e = leadCancellationEmail(base);
    expect(e.subject).toBe("Your discovery call with Tallo CPA is cancelled");
    expect(e.bodyText).toContain("Hi Ana Cruz,");
    expect(e.bodyText).toMatch(/discovery call with Tallo CPA on Dec 4, 2026, 10:00\s?AM \(Philippine time\) about Arevalo Bakery/);
    expect(e.bodyText).toContain("Reply to this email");
    expect(e.bodyText).not.toContain("Reason");
    expect(e.action).toBeUndefined();
  });

  it("links the booking page while the lead can book again, with the reason", () => {
    const e = leadCancellationEmail({ ...base, reason: "Reviewer is ill", bookingUrl: "https://app.example.com/book/abc" });
    expect(e.bodyText).toContain("Reason: Reviewer is ill");
    expect(e.action).toEqual({ label: "Choose another time", url: "https://app.example.com/book/abc" });
  });
});

describe("deleteEvent", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("cancels the event and emails the guests", async () => {
    const fetch = vi.fn(async () => new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetch);
    await deleteEvent("token", "evt/1");
    expect(fetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events/evt%2F1?sendUpdates=all",
      expect.objectContaining({ method: "DELETE", headers: { Authorization: "Bearer token" } }),
    );
  });

  it("treats an event already gone as cancelled, and throws on other errors", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 410 })));
    await expect(deleteEvent("t", "e")).resolves.toBeUndefined();
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ error: { message: "Forbidden" } }, { status: 403 })));
    await expect(deleteEvent("t", "e")).rejects.toThrow("Google Calendar: Forbidden");
  });
});
