import "server-only";
/**
 * Staff calendars through their stored Google connections (google_calendar_links). Server
 * only: reads the encrypted refresh tokens with the secret key, so call it only after
 * checking who is asking (staff for the team calendar; a valid booking link or the signed-in
 * client for a booking page).
 */
import { googleCalendarEnv, type GoogleCalendarEnv } from "@/lib/env";
import { accessToken, freeBusy, GoogleAuthError, insertEvent, listEvents, otherCalendars, type CalendarEvent, type NewEvent } from "@/lib/google/calendar";
import { openToken, parseKey } from "@/lib/google/crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Interval } from "./slots";

type Admin = ReturnType<typeof supabaseAdmin>;

interface Connection {
  userId: string;
  email: string;
  access: string;
}

/** Access tokens for the connected staff among `userIds`; those Google refuses are marked so the team page shows it. */
async function connect(env: GoogleCalendarEnv, admin: Admin, userIds: string[]): Promise<Map<string, Connection>> {
  const out = new Map<string, Connection>();
  if (!userIds.length) return out;
  const { data, error } = await admin.rpc("calendar_tokens", { p_users: userIds });
  if (error) throw new Error(`Could not read the calendar connections: ${error.message}`);
  const key = parseKey(env.tokenKey);
  await Promise.all(
    ((data ?? []) as { user_id: string; google_email: string; refresh_token: string; last_error: string | null }[]).map(async (r) => {
      let refresh: string;
      try {
        refresh = openToken(r.refresh_token, key, r.user_id);
      } catch {
        await admin.rpc("calendar_link_error", { p_user: r.user_id, p_error: "The stored connection can no longer be read; connect the calendar again." });
        return;
      }
      try {
        const access = await accessToken(env, refresh);
        out.set(r.user_id, { userId: r.user_id, email: r.google_email, access });
        if (r.last_error) await admin.rpc("calendar_link_error", { p_user: r.user_id, p_error: "" });
      } catch (e) {
        // Only a refused grant means the person must connect again; a network or Google error is passing.
        if (e instanceof GoogleAuthError) await admin.rpc("calendar_link_error", { p_user: r.user_id, p_error: "Google refused the connection; connect the calendar again." });
        else console.error("Calendar token refresh failed:", e instanceof Error ? e.message : e);
      }
    }),
  );
  return out;
}

export interface PersonWeek {
  userId: string;
  /** Primary-calendar events, private ones as Busy (no title). */
  events: CalendarEvent[];
  /** Busy times from the person's other (personal) calendars. */
  busy: Interval[];
  error: string | null;
}

/** Each connected person's week: Tallo events in full, private and personal ones as Busy. */
export async function teamWeek(userIds: string[], from: string, to: string): Promise<Map<string, PersonWeek>> {
  const env = googleCalendarEnv();
  const out = new Map<string, PersonWeek>();
  if (!env) return out;
  const admin = supabaseAdmin();
  const conns = await connect(env, admin, userIds);
  await Promise.all(
    [...conns.values()].map(async (c) => {
      try {
        const [events, others] = await Promise.all([listEvents(c.access, from, to), otherCalendars(c.access)]);
        const busy = await freeBusy(c.access, others, from, to);
        out.set(c.userId, {
          userId: c.userId,
          events: events.map((e) => (e.private ? { ...e, summary: null, meetUrl: null, htmlLink: null } : e)),
          busy,
          error: null,
        });
      } catch (e) {
        out.set(c.userId, { userId: c.userId, events: [], busy: [], error: e instanceof Error ? e.message : String(e) });
      }
    }),
  );
  return out;
}

/** Everything that makes the person busy between two instants (all their calendars). Null when their calendar is not connected. */
export async function busyOf(userId: string, from: string, to: string): Promise<Interval[] | null> {
  const env = googleCalendarEnv();
  if (!env) return null;
  const conn = (await connect(env, supabaseAdmin(), [userId])).get(userId);
  if (!conn) return null;
  const others = await otherCalendars(conn.access);
  return freeBusy(conn.access, ["primary", ...others], from, to);
}

/** Creates the meeting on the person's calendar, with a Meet link, and invites the guests. */
export async function bookOn(userId: string, event: NewEvent): Promise<{ id: string; meetUrl: string | null }> {
  const env = googleCalendarEnv();
  if (!env) throw new Error("Google Calendar is not set up.");
  const conn = (await connect(env, supabaseAdmin(), [userId])).get(userId);
  if (!conn) throw new Error("This calendar is not connected right now.");
  const r = await insertEvent(conn.access, event);
  return { id: r.id, meetUrl: r.meetUrl };
}

/** Holidays (public.holidays) between two dates, for the booking pages. */
export async function holidaysBetween(admin: Admin, from: string, to: string): Promise<Set<string>> {
  const { data } = await admin.from("holidays").select("date").gte("date", from).lte("date", to).in("kind", ["regular", "special"]);
  return new Set(((data ?? []) as { date: string }[]).map((h) => String(h.date).slice(0, 10)));
}

/**
 * Of these calendar events, the ones the app booked for a client or a lead (client meetings,
 * discovery calls). The team calendar shows those in full only to staff who can see that
 * client or lead; to others they are Busy.
 */
export async function appBookedEvents(eventIds: string[]): Promise<Set<string>> {
  if (!eventIds.length) return new Set();
  const admin = supabaseAdmin();
  const [{ data: m }, { data: d }] = await Promise.all([
    admin.from("client_meetings").select("calendar_event_id").in("calendar_event_id", eventIds),
    admin.from("discovery_calls").select("calendar_event_id").in("calendar_event_id", eventIds),
  ]);
  return new Set([...(m ?? []), ...(d ?? [])].map((r) => (r as { calendar_event_id: string }).calendar_event_id));
}
