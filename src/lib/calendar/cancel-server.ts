import "server-only";
/**
 * Cancels a discovery call or a client meeting as the signed-in person: the database
 * checks who may, records it and writes the bell notices (migration
 * 20270101000402_cancel_meetings.sql). Then the Google Calendar event is removed from the
 * host's calendar, which emails the guests, when that calendar is connected; when it is
 * not, the cancellation still stands and the message says so.
 */
import { sendBrandedEmail } from "@/lib/cycle/email";
import { loadEmailBrand, requestOrigin, siteOrigin } from "@/lib/email/brand";
import { supabaseServer } from "@/lib/supabase/server";
import { cancelledMessage, leadCancellationEmail, type CalendarOutcome } from "./cancel";
import { removeFrom } from "./staff";

export type CancelResult = { ok: string } | { error: string };

async function removeEvent(host: string | null, eventId: string | null): Promise<CalendarOutcome> {
  return host && eventId ? removeFrom(host, eventId) : "none";
}

/** The Owner or the lead's reviewer cancels the lead's booked call; the lead gets a branded email. */
export async function cancelDiscoveryCall(callId: string, reason: string | null): Promise<CancelResult> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("cancel_discovery_call", { p_call: callId, p_reason: reason });
  if (error) return { error: error.message };
  const r = data as {
    host_user_id: string | null; calendar_event_id: string | null; scheduled_at: string | null; reason: string | null;
    email: string; contact_name: string; business_name: string; brand_id: string | null; booking_token: string | null;
  };
  const outcome = await removeEvent(r.host_user_id, r.calendar_event_id);
  // The lead has no account (no bell): tell them by email. Best effort.
  let emailed = false;
  try {
    const brand = await loadEmailBrand(r.brand_id);
    const origin = siteOrigin() ?? (await requestOrigin());
    const content = leadCancellationEmail({
      contactName: r.contact_name,
      businessName: r.business_name,
      scheduledAt: r.scheduled_at,
      reason: r.reason,
      firm: brand.displayName,
      bookingUrl: r.booking_token && origin ? `${origin}/book/${r.booking_token}` : null,
    });
    emailed = (await sendBrandedEmail(r.email, content, { brand })) === "sent";
  } catch (e) {
    console.error("Cancellation email to the lead not sent:", e instanceof Error ? e.message : e);
  }
  return { ok: cancelledMessage(outcome, r.contact_name?.trim() || "the lead", emailed) };
}

/** Staff on the client, or the client's own portal user, cancel an upcoming meeting. */
export async function cancelClientMeeting(meetingId: string, reason: string | null, by: "staff" | "client"): Promise<CancelResult> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("cancel_client_meeting", { p_meeting: meetingId, p_reason: reason });
  if (error) return { error: error.message };
  const m = data as { staff_user_id: string; calendar_event_id: string | null };
  const outcome = await removeEvent(m.staff_user_id, m.calendar_event_id);
  if (by === "client") {
    return { ok: outcome === "removed" ? "Cancelled. Your team has been told, and Google sent you the cancellation." : "Cancelled. Your team has been told." };
  }
  return { ok: cancelledMessage(outcome, "the client") };
}
