/**
 * Display helpers for the bell and the notifications pages. Pure and browser-safe: the
 * bell's client component and the server pages both use them.
 *
 * Days are Manila days (UTC+8, no daylight saving), whatever the device's time zone, so
 * "Today" means the same thing to the firm and to its clients.
 */

const MANILA_OFFSET_MS = 8 * 60 * 60 * 1000;
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** The badge on the bell: nothing at 0, the count up to 99, then "99+". */
export function badgeText(unread: number): string | null {
  if (!Number.isFinite(unread) || unread <= 0) return null;
  return unread > 99 ? "99+" : String(Math.floor(unread));
}

/** The bell button's accessible name. */
export function bellLabel(unread: number): string {
  const n = Number.isFinite(unread) && unread > 0 ? Math.floor(unread) : 0;
  return `Notifications, ${n} unread`;
}

/** `YYYY-MM-DD` of the Manila day a moment falls on. */
export function manilaDay(at: string | Date): string {
  const t = typeof at === "string" ? Date.parse(at) : at.getTime();
  return new Date(t + MANILA_OFFSET_MS).toISOString().slice(0, 10);
}

/** Whole Manila days from `day` to `today` (both `YYYY-MM-DD`). */
function daysBetween(day: string, today: string): number {
  return Math.round((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${day}T00:00:00Z`)) / DAY);
}

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", ...opts });
const shortDate = fmt({ month: "short", day: "numeric" });
const shortDateYear = fmt({ month: "short", day: "numeric", year: "numeric" });
const weekdayShort = fmt({ weekday: "short" });
const clock = fmt({ hour: "numeric", minute: "2-digit" });
const longDay = fmt({ weekday: "long", month: "long", day: "numeric" });
const longDayYear = fmt({ weekday: "long", month: "long", day: "numeric", year: "numeric" });

/**
 * Short relative time for a list row: "Just now", "5 min ago", "3 h ago", "Yesterday",
 * a weekday within the week, then a date ("Nov 3", or "Nov 3, 2025" in another year).
 */
export function relativeTime(at: string | Date, now: Date = new Date()): string {
  const t = typeof at === "string" ? Date.parse(at) : at.getTime();
  const diff = now.getTime() - t;
  if (diff < MINUTE) return "Just now";
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)} min ago`;
  const days = daysBetween(manilaDay(new Date(t)), manilaDay(now));
  if (days <= 0) return `${Math.floor(diff / HOUR)} h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return weekdayShort.format(t);
  return manilaDay(new Date(t)).slice(0, 4) === manilaDay(now).slice(0, 4) ? shortDate.format(t) : shortDateYear.format(t);
}

/** Clock time in Manila, e.g. "1:30 PM". */
export function timeOfDay(at: string | Date): string {
  return clock.format(typeof at === "string" ? Date.parse(at) : at);
}

/** Full date and time for a tooltip, e.g. "Nov 20, 2026, 1:30 PM". */
export function fullDateTime(at: string | Date): string {
  const t = typeof at === "string" ? Date.parse(at) : at.getTime();
  return `${shortDateYear.format(t)}, ${clock.format(t)}`;
}

/** A day heading: "Today", "Yesterday", "Friday, November 20" (with the year when not this year). */
export function dayLabel(day: string, now: Date = new Date()): string {
  const today = manilaDay(now);
  const days = daysBetween(day, today);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  // Noon Manila keeps the formatted date on the same day.
  const t = Date.parse(`${day}T04:00:00Z`);
  return day.slice(0, 4) === today.slice(0, 4) ? longDay.format(t) : longDayYear.format(t);
}

export interface DayGroup<T> {
  day: string;
  label: string;
  items: T[];
}

/** Groups rows (newest first) by Manila day, keeping their order. */
export function groupByDay<T extends { created_at: string }>(rows: readonly T[], now: Date = new Date()): DayGroup<T>[] {
  const groups: DayGroup<T>[] = [];
  for (const row of rows) {
    const day = manilaDay(row.created_at);
    const last = groups.at(-1);
    if (last?.day === day) last.items.push(row);
    else groups.push({ day, label: dayLabel(day, now), items: [row] });
  }
  return groups;
}
