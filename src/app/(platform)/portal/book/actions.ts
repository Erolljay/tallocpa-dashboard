"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import type { CancelState } from "@/components/booking/cancel-booking";
import type { BookingState } from "@/components/booking/slot-picker";
import { getIdentity } from "@/lib/auth";
import { slotsFor } from "@/lib/calendar/booking";
import { cancelReason } from "@/lib/calendar/cancel";
import { cancelClientMeeting } from "@/lib/calendar/cancel-server";
import { CLIENT_MEETING } from "@/lib/calendar/slots";
import { bookOn } from "@/lib/calendar/staff";
import { accessNote, canAct } from "@/lib/contacts/access";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";

/** The signed-in client books a meeting with its reviewer (or preparer) at `start`, with a Meet link. */
export async function bookClientMeetingAction(clientId: string, start: string, topic: string): Promise<BookingState> {
  const id = await getIdentity();
  const link = id.clients.find((c) => c.clientId === clientId);
  if (id.staff || !link) return { error: "Business not found." };
  if (!canAct(link.access)) return { error: accessNote(link.access, "act") };
  const supabase = await supabaseServer();
  const [{ data: hosts, error }, { data: client }] = await Promise.all([
    supabase.rpc("portal_meeting_host", { p_client: clientId }),
    supabase.from("clients").select("name").eq("id", clientId).maybeSingle(),
  ]);
  const host = ((hosts ?? []) as { user_id: string; full_name: string; connected: boolean }[])[0];
  if (error || !host || !client) return { error: "Your team is not assigned yet." };
  if (!host.connected) return { error: `Online booking with ${host.full_name} is not available right now. Please email them.` };

  const free = await slotsFor(host.user_id, CLIENT_MEETING);
  const slot = free?.slots.find((s) => Date.parse(s.start) === Date.parse(start));
  if (!slot) return { error: "That time was just taken. Please choose another." };
  const about = topic.trim().slice(0, 1000);
  const admin = supabaseAdmin();
  // Claim the time first: at most two upcoming meetings per client, and no overlap with the host's other bookings.
  const claim = await admin.rpc("client_meeting_claim", {
    p_client: clientId, p_staff: host.user_id, p_start: slot.start, p_end: slot.end, p_topic: about || null, p_booked_by: id.userId,
  });
  if (claim.error) {
    if (claim.error.message.includes("coming up")) return { error: "You already have two meetings coming up. Book another after them." };
    return { error: "That time was just taken. Please choose another." };
  }
  const meetingId = claim.data as string;
  try {
    const event = await bookOn(host.user_id, {
      summary: `${client.name} · meeting with Tallo CPA`,
      description: `Booked from the client portal${id.email ? ` by ${id.email}` : ""}.${about ? `\n\nTopic: ${about}` : ""}`,
      start: slot.start,
      end: slot.end,
      attendees: id.email ? [{ email: id.email }] : [],
      requestId: randomUUID(),
    });
    await admin.rpc("client_meeting_confirm", { p_meeting: meetingId, p_event: event.id, p_meet: event.meetUrl });
    revalidatePath("/portal/book");
    return { ok: `Booked with ${host.full_name}. The invitation is in your email.`, meetUrl: event.meetUrl };
  } catch (e) {
    await admin.rpc("client_meeting_confirm", { p_meeting: meetingId, p_event: null, p_meet: null });
    console.error("Portal booking failed:", e instanceof Error ? e.message : e);
    return { error: "The meeting could not be put on the calendar. Please try again, or email your team." };
  }
}

/** The signed-in client cancels one of its upcoming meetings, with an optional reason. */
export async function cancelMyMeetingAction(meetingId: string, _: CancelState, form: FormData): Promise<CancelState> {
  const id = await getIdentity();
  if (id.staff) return { error: "Meeting not found." };
  const r = await cancelClientMeeting(meetingId, cancelReason(form.get("reason")), "client");
  if ("error" in r) return r;
  revalidatePath("/portal/book");
  return r;
}
