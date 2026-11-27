/**
 * Cancelling a discovery call or a client meeting (migration 20270101000402_cancel_meetings.sql):
 * the wording shared by the screens, the server actions and the email to the lead.
 * The database decides who may cancel and writes the notices in the bell.
 */
import type { EmailContent } from "@/lib/email/layout";

/** What happened to the Google Calendar event: "none" when the booking had no event. */
export type CalendarOutcome = "removed" | "not_connected" | "failed" | "none";

export const MAX_CANCEL_REASON = 500;

/** The optional reason from a form: spaces collapsed, at most 500 characters, null when empty. */
export function cancelReason(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const v = raw.replace(/\s+/g, " ").trim().slice(0, MAX_CANCEL_REASON).trim();
  return v || null;
}

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });

/** "Nov 27, 2026, 10:00 AM" in Manila time. */
export function manilaWhen(iso: string): string {
  return when.format(new Date(iso));
}

/** The sentence after "Cancelled.": what became of the calendar event and the guests' invitation. */
export function calendarNote(outcome: CalendarOutcome, guest: string): string {
  switch (outcome) {
    case "removed":
      return `It is off the calendar, and Google sent ${guest} the cancellation.`;
    case "not_connected":
      return `The calendar is not connected right now, so remove the event from Google Calendar yourself; Google will tell ${guest}.`;
    case "failed":
      return `Google did not remove the event; remove it from Google Calendar yourself so ${guest} is told.`;
    case "none":
      return "";
  }
}

/** The staff screens' message after cancelling. */
export function cancelledMessage(outcome: CalendarOutcome, guest: string, emailed?: boolean): string {
  return [
    "Cancelled.",
    calendarNote(outcome, guest),
    emailed === true ? `We emailed ${guest} the notice.` : "",
  ].filter(Boolean).join(" ");
}

/** The branded email to a lead whose discovery call was cancelled (a lead has no account, so no bell). */
export function leadCancellationEmail(p: {
  contactName: string;
  businessName: string;
  scheduledAt: string | null;
  reason: string | null;
  firm: string;
  /** The booking page to choose another time, while the lead's link is open. */
  bookingUrl: string | null;
}): EmailContent {
  const at = p.scheduledAt ? ` on ${manilaWhen(p.scheduledAt)} (Philippine time)` : "";
  const paragraphs = [
    `Hi ${p.contactName.trim() || "there"},`,
    `We had to cancel your discovery call with ${p.firm}${at} about ${p.businessName.trim() || "your business"}.`,
    p.reason ? `Reason: ${p.reason}` : "",
    p.bookingUrl ? "Please choose another time that suits you." : "Reply to this email and we will arrange another time.",
  ];
  return {
    subject: `Your discovery call with ${p.firm} is cancelled`,
    heading: "Your discovery call is cancelled",
    preheader: `We had to cancel your call${at}.`,
    bodyText: paragraphs.filter(Boolean).join("\n\n"),
    action: p.bookingUrl ? { label: "Choose another time", url: p.bookingUrl } : undefined,
  };
}
