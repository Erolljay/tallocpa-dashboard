/**
 * The team calendar's week (docs/REWORK.md, decision 22): each person's day, Tallo events
 * in full and anything private or personal as Busy, in Manila time.
 */
import type { CalendarEvent } from "@/lib/google/calendar";
import { manilaDate, manilaInstant, type Interval } from "./slots";

export interface Entry {
  start: string;
  end: string;
  /** Null for Busy. */
  title: string | null;
  allDay: boolean;
  meetUrl: string | null;
  htmlLink: string | null;
}

const addDays = (date: string, n: number) => new Date(Date.parse(`${date}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);

/** The Monday of the week holding `date`. */
export function mondayOf(date: string): string {
  const wd = new Date(`${date}T00:00:00Z`).getUTCDay();
  return addDays(date, -((wd + 6) % 7));
}

export const weekDays = (monday: string) => Array.from({ length: 7 }, (_, i) => addDays(monday, i));

/** The instants a week starts and ends (Manila midnight to midnight). */
export const weekRange = (monday: string) => ({ from: manilaInstant(monday, 0), to: manilaInstant(addDays(monday, 7), 0) });

/** Entries per day of the week; an event spanning days shows on each. Busy blocks that an event already covers are dropped. */
export function weekCells(days: string[], events: CalendarEvent[], busy: Interval[]): Entry[][] {
  const entries: Entry[] = [
    ...events.filter((e) => !e.free).map((e) => ({ start: e.start, end: e.end, title: e.private ? null : (e.summary ?? "(no title)"), allDay: e.allDay, meetUrl: e.meetUrl, htmlLink: e.htmlLink })),
    ...busy
      .filter((b) => !events.some((e) => !e.free && e.start === new Date(b.start).toISOString() && e.end === new Date(b.end).toISOString()))
      .map((b) => ({ start: new Date(b.start).toISOString(), end: new Date(b.end).toISOString(), title: null, allDay: false, meetUrl: null, htmlLink: null })),
  ].sort((a, b) => a.start.localeCompare(b.start));
  return days.map((day) => {
    const s = Date.parse(manilaInstant(day, 0));
    const e = s + 86_400_000;
    return entries.filter((x) => Date.parse(x.start) < e && Date.parse(x.end) > s);
  });
}

/**
 * Whether an event is Tallo work that colleagues see in full (Owner, 26 November 2026): a
 * meeting with someone else of the firm's domain. Everything else on a person's calendar
 * (runs, webinars, errands, events with outsiders only) is Busy to the rest of the team.
 * Meetings the app booked are decided separately (appBookedEvents).
 */
export function isTeamEvent(e: Pick<CalendarEvent, "others" | "private">, domain: string): boolean {
  if (e.private) return false;
  const d = `@${domain.toLowerCase()}`;
  return e.others.some((email) => email.endsWith(d));
}

/** "09:30" in Manila. */
export const manilaTime = (iso: string) => new Date(Date.parse(iso) + 8 * 3_600_000).toISOString().slice(11, 16);

export { manilaDate };
