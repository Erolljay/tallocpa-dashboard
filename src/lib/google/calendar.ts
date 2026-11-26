import "server-only";
/**
 * Google OAuth and the Calendar REST API, only what the team calendar and the booking
 * pages need: connect a staff member, read their events and free/busy, and create an event
 * with a Google Meet link.
 */
import type { GoogleCalendarEnv } from "@/lib/env";

export const CALENDAR_SCOPES = [
  "openid",
  "email",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.calendarlist.readonly",
  "https://www.googleapis.com/auth/calendar.freebusy",
];

const API = "https://www.googleapis.com/calendar/v3";

export class GoogleAuthError extends Error {}

export function authUrl(env: GoogleCalendarEnv, redirectUri: string, state: string, loginHint: string | null): string {
  const u = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  u.searchParams.set("client_id", env.clientId);
  u.searchParams.set("redirect_uri", redirectUri);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("scope", CALENDAR_SCOPES.join(" "));
  u.searchParams.set("access_type", "offline");
  u.searchParams.set("prompt", "consent");
  u.searchParams.set("include_granted_scopes", "true");
  u.searchParams.set("hd", env.domain);
  u.searchParams.set("state", state);
  if (loginHint) u.searchParams.set("login_hint", loginHint);
  return u.toString();
}

async function token(body: Record<string, string>): Promise<{ access_token?: string; refresh_token?: string; id_token?: string; error?: string; error_description?: string }> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as Awaited<ReturnType<typeof token>>;
  if (!res.ok) {
    const msg = json.error_description ?? json.error ?? String(res.status);
    throw json.error === "invalid_grant" ? new GoogleAuthError(msg) : new Error(`Google sign-in failed: ${msg}`);
  }
  return json;
}

/** The email in an ID token received straight from Google's token endpoint (over TLS, so its signature need not be checked again). */
function emailOf(idToken: string | undefined): { email: string; verified: boolean; hd: string | null } | null {
  if (!idToken) return null;
  try {
    const payload = JSON.parse(Buffer.from(idToken.split(".")[1], "base64url").toString("utf8")) as { email?: string; email_verified?: boolean; hd?: string };
    return payload.email ? { email: payload.email.toLowerCase(), verified: payload.email_verified === true, hd: payload.hd?.toLowerCase() ?? null } : null;
  } catch {
    return null;
  }
}

/** Exchanges the code from the consent screen for a refresh token and the account's email. */
export async function exchangeCode(env: GoogleCalendarEnv, code: string, redirectUri: string): Promise<{ refreshToken: string; email: string; hd: string | null; verified: boolean }> {
  const t = await token({ code, client_id: env.clientId, client_secret: env.clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" });
  const who = emailOf(t.id_token);
  if (!t.refresh_token) throw new Error("Google did not return a refresh token. Remove the app's access in your Google account and connect again.");
  if (!who) throw new Error("Google did not say which account was connected.");
  return { refreshToken: t.refresh_token, email: who.email, hd: who.hd, verified: who.verified };
}

export async function accessToken(env: GoogleCalendarEnv, refreshToken: string): Promise<string> {
  const t = await token({ client_id: env.clientId, client_secret: env.clientSecret, refresh_token: refreshToken, grant_type: "refresh_token" });
  if (!t.access_token) throw new Error("Google sign-in failed: no access token");
  return t.access_token;
}

/** Best effort: tells Google to forget the token when a staff member disconnects. */
export async function revoke(refreshToken: string): Promise<void> {
  await fetch("https://oauth2.googleapis.com/revoke", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ token: refreshToken }),
    cache: "no-store",
  }).catch(() => undefined);
}

async function call<T>(access: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${access}`, "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(`Google Calendar: ${body.error?.message ?? res.status}`);
  return body;
}

export interface CalendarEvent {
  id: string;
  summary: string | null;
  start: string;
  end: string;
  allDay: boolean;
  /** Private or confidential on the primary calendar: shown as Busy. */
  private: boolean;
  /** Marked "free" (transparent): not shown as busy. */
  free: boolean;
  meetUrl: string | null;
  htmlLink: string | null;
  /** Everyone on the event other than the calendar's owner: organizer and guests, lower-case emails. */
  others: string[];
}

type RawEvent = {
  id: string;
  status?: string;
  summary?: string;
  visibility?: string;
  transparency?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  hangoutLink?: string;
  htmlLink?: string;
  organizer?: { email?: string; self?: boolean };
  attendees?: { email?: string; self?: boolean; resource?: boolean }[];
};

const instant = (t: { dateTime?: string; date?: string } | undefined) => (t?.dateTime ? new Date(t.dateTime).toISOString() : t?.date ? `${t.date}T00:00:00+08:00` : "");

/** The events of the primary calendar between two instants, recurring events expanded. */
export async function listEvents(access: string, from: string, to: string): Promise<CalendarEvent[]> {
  const q = new URLSearchParams({ timeMin: from, timeMax: to, singleEvents: "true", orderBy: "startTime", maxResults: "250" });
  const r = await call<{ items?: RawEvent[] }>(access, `/calendars/primary/events?${q}`);
  return (r.items ?? [])
    .filter((e) => e.status !== "cancelled")
    .map((e) => ({
      id: e.id,
      summary: e.summary ?? null,
      start: instant(e.start),
      end: instant(e.end),
      allDay: !e.start?.dateTime,
      private: e.visibility === "private" || e.visibility === "confidential",
      free: e.transparency === "transparent",
      meetUrl: e.hangoutLink ?? null,
      htmlLink: e.htmlLink ?? null,
      others: [
        ...new Set(
          [e.organizer, ...(e.attendees ?? [])]
            .filter((p): p is { email: string; self?: boolean; resource?: boolean } => !!p?.email && !p.self && !("resource" in p && p.resource))
            .map((p) => p.email.toLowerCase()),
        ),
      ],
    }));
}

/** The other calendars the person shows in Google Calendar (personal ones): only their busy times are read. */
export async function otherCalendars(access: string): Promise<string[]> {
  const r = await call<{ items?: { id: string; primary?: boolean; selected?: boolean; accessRole?: string }[] }>(access, "/users/me/calendarList?minAccessRole=freeBusyReader&maxResults=50");
  return (r.items ?? []).filter((c) => !c.primary && c.selected !== false && !c.id.endsWith("#holiday@group.v.calendar.google.com")).map((c) => c.id);
}

/** Busy intervals across the given calendars ("primary" included when asked). */
export async function freeBusy(access: string, calendars: string[], from: string, to: string): Promise<{ start: string; end: string }[]> {
  if (!calendars.length) return [];
  const r = await call<{ calendars?: Record<string, { busy?: { start: string; end: string }[] }> }>(access, "/freeBusy", {
    method: "POST",
    body: JSON.stringify({ timeMin: from, timeMax: to, timeZone: "Asia/Manila", items: calendars.map((id) => ({ id })) }),
  });
  return Object.values(r.calendars ?? {}).flatMap((c) => c.busy ?? []);
}

export interface NewEvent {
  summary: string;
  description: string;
  start: string;
  end: string;
  attendees: { email: string; displayName?: string }[];
  requestId: string;
}

/** Creates an event on the primary calendar with a Google Meet link and emails the invitation. */
export async function insertEvent(access: string, e: NewEvent): Promise<{ id: string; meetUrl: string | null; htmlLink: string | null }> {
  const body = {
    summary: e.summary,
    description: e.description,
    start: { dateTime: e.start, timeZone: "Asia/Manila" },
    end: { dateTime: e.end, timeZone: "Asia/Manila" },
    attendees: e.attendees,
    conferenceData: { createRequest: { requestId: e.requestId, conferenceSolutionKey: { type: "hangoutsMeet" } } },
    reminders: { useDefault: true },
  };
  const r = await call<RawEvent & { conferenceData?: { entryPoints?: { entryPointType?: string; uri?: string }[] } }>(
    access,
    "/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all",
    { method: "POST", body: JSON.stringify(body) },
  );
  const video = r.conferenceData?.entryPoints?.find((p) => p.entryPointType === "video")?.uri ?? r.hangoutLink ?? null;
  return { id: r.id, meetUrl: video, htmlLink: r.htmlLink ?? null };
}
