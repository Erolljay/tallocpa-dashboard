"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import type { BookingState } from "@/components/booking/slot-picker";
import { getIdentity } from "@/lib/auth";
import { slotsFor } from "@/lib/calendar/booking";
import { CLIENT_MEETING } from "@/lib/calendar/slots";
import { bookOn } from "@/lib/calendar/staff";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";

/** The signed-in client books a meeting with its reviewer (or preparer) at `start`, with a Meet link. */
export async function bookClientMeetingAction(clientId: string, start: string, topic: string): Promise<BookingState> {
  const id = await getIdentity();
  if (id.staff || !id.clients.some((c) => c.clientId === clientId)) return { error: "Business not found." };
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
  try {
    const event = await bookOn(host.user_id, {
      summary: `${client.name} · meeting with Tallo CPA`,
      description: `Booked from the client portal${id.email ? ` by ${id.email}` : ""}.${about ? `\n\nTopic: ${about}` : ""}`,
      start: slot.start,
      end: slot.end,
      attendees: id.email ? [{ email: id.email }] : [],
      requestId: randomUUID(),
    });
    const { error: saveError } = await supabaseAdmin().from("client_meetings").insert({
      client_id: clientId, staff_user_id: host.user_id, starts_at: slot.start, ends_at: slot.end, topic: about || null,
      calendar_event_id: event.id, meet_url: event.meetUrl, booked_by: id.userId,
    });
    if (saveError) console.error("Meeting booked but not saved:", saveError.message);
    revalidatePath("/portal/book");
    return { ok: `Booked with ${host.full_name}. The invitation is in your email.`, meetUrl: event.meetUrl };
  } catch (e) {
    console.error("Portal booking failed:", e instanceof Error ? e.message : e);
    return { error: "The meeting could not be put on the calendar. Please try again, or email your team." };
  }
}
