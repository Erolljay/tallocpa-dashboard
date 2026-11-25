"use server";

import { randomUUID } from "node:crypto";
import type { BookingState } from "@/components/booking/slot-picker";
import { slotsFor } from "@/lib/calendar/booking";
import { DISCOVERY_CALL } from "@/lib/calendar/slots";
import { bookOn } from "@/lib/calendar/staff";
import { supabaseAdmin } from "@/lib/supabase/admin";

const TOKEN = /^[0-9a-f]{64}$/;

/** Books the discovery call at `start` on the lead's reviewer's calendar, with a Meet link (decision 22). */
export async function bookDiscoveryCallAction(token: string, start: string): Promise<BookingState> {
  if (!TOKEN.test(token)) return { error: "This booking link is not valid." };
  const admin = supabaseAdmin();
  const { data } = await admin.rpc("booking_lead", { p_token: token });
  const lead = ((data ?? []) as { lead_id: string; business_name: string; contact_name: string; email: string; reviewer_id: string; reviewer_name: string; open: boolean; booked_at: string | null }[])[0];
  if (!lead || !lead.open) return { error: "This booking link is closed. Please reply to our email and we will arrange the call." };
  if (lead.booked_at) return { error: "Your call is already booked." };

  const free = await slotsFor(lead.reviewer_id, DISCOVERY_CALL);
  if (!free) return { error: "Online booking is not available right now. Please reply to our email and we will arrange the call." };
  const slot = free.slots.find((s) => Date.parse(s.start) === Date.parse(start));
  if (!slot) return { error: "That time was just taken. Please choose another." };

  const claim = await admin.rpc("booking_claim", { p_lead: lead.lead_id, p_at: slot.start, p_until: slot.end });
  if (claim.error) {
    if (claim.error.message.includes("already booked")) return { error: "Your call is already booked." };
    if (claim.error.message.includes("closed")) return { error: "This booking link is closed. Please reply to our email and we will arrange the call." };
    return { error: "That time was just taken. Please choose another." };
  }
  const callId = claim.data as string;
  try {
    const event = await bookOn(lead.reviewer_id, {
      summary: `Discovery call: ${lead.business_name} · Tallo CPA`,
      description: `Discovery call with ${lead.contact_name} of ${lead.business_name}, booked from the Tallo CPA booking page.`,
      start: slot.start,
      end: slot.end,
      attendees: [{ email: lead.email, displayName: lead.contact_name }],
      requestId: randomUUID(),
    });
    await admin.rpc("booking_confirm", { p_call: callId, p_event: event.id, p_meet: event.meetUrl });
    return { ok: `Booked with ${lead.reviewer_name}. The invitation is on its way to ${lead.email}.`, meetUrl: event.meetUrl };
  } catch (e) {
    await admin.rpc("booking_confirm", { p_call: callId, p_event: null, p_meet: null });
    console.error("Booking failed:", e instanceof Error ? e.message : e);
    return { error: "The call could not be put on the calendar. Please try again, or reply to our email." };
  }
}
