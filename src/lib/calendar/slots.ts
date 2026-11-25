/**
 * Free times for booking (docs/REWORK.md, decision 22): the staff member's working hours
 * in Manila (UTC+8, no daylight saving), less what their Google Calendar shows busy,
 * weekends and holidays, and too-short notice.
 */
export interface Interval {
  start: string;
  end: string;
}

export interface SlotRules {
  /** Working hours, Manila time, whole hours. */
  dayStart: number;
  dayEnd: number;
  /** Length of a meeting and the step between start times, in minutes. */
  minutes: number;
  step: number;
  /** No booking sooner than this many hours from now. */
  noticeHours: number;
  /** How many calendar days ahead to offer. */
  days: number;
}

export const DISCOVERY_CALL: SlotRules = { dayStart: 9, dayEnd: 17, minutes: 45, step: 30, noticeHours: 24, days: 14 };
export const CLIENT_MEETING: SlotRules = { dayStart: 9, dayEnd: 17, minutes: 30, step: 30, noticeHours: 24, days: 21 };

const MANILA = 8 * 3_600_000;

/** "2026-12-03" in Manila for an instant. */
export const manilaDate = (iso: string) => new Date(Date.parse(iso) + MANILA).toISOString().slice(0, 10);

/** The instant of a Manila wall-clock time. */
export function manilaInstant(date: string, hour: number, minute = 0): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hour, minute) - MANILA).toISOString();
}

const addDays = (date: string, n: number) => new Date(Date.parse(`${date}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);
const weekday = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay();

const overlaps = (a: { s: number; e: number }, b: { s: number; e: number }) => a.s < b.e && b.s < a.e;

/** The free start times from the day after `now` (Manila) for `rules.days` days. */
export function freeSlots(now: string, busy: Interval[], holidays: Set<string>, rules: SlotRules): Interval[] {
  const earliest = Date.parse(now) + rules.noticeHours * 3_600_000;
  const blocks = busy.map((b) => ({ s: Date.parse(b.start), e: Date.parse(b.end) }));
  const out: Interval[] = [];
  const today = manilaDate(now);
  for (let i = 0; i <= rules.days; i++) {
    const date = addDays(today, i);
    const wd = weekday(date);
    if (wd === 0 || wd === 6 || holidays.has(date)) continue;
    for (let min = rules.dayStart * 60; min + rules.minutes <= rules.dayEnd * 60; min += rules.step) {
      const s = Date.parse(manilaInstant(date, Math.floor(min / 60), min % 60));
      const slot = { s, e: s + rules.minutes * 60_000 };
      if (s < earliest || blocks.some((b) => overlaps(slot, b))) continue;
      out.push({ start: new Date(slot.s).toISOString(), end: new Date(slot.e).toISOString() });
    }
  }
  return out;
}

/** Whether `start` is one of the free slots (checked again just before booking). */
export function isFree(start: string, now: string, busy: Interval[], holidays: Set<string>, rules: SlotRules): Interval | null {
  const t = Date.parse(start);
  if (!Number.isFinite(t)) return null;
  return freeSlots(now, busy, holidays, rules).find((s) => Date.parse(s.start) === t) ?? null;
}

/** Slots grouped by Manila date, in order. */
export function byDay(slots: Interval[]): { date: string; slots: Interval[] }[] {
  const map = new Map<string, Interval[]>();
  for (const s of slots) {
    const d = manilaDate(s.start);
    map.set(d, [...(map.get(d) ?? []), s]);
  }
  return [...map.entries()].map(([date, list]) => ({ date, slots: list }));
}

export interface LabelledDay {
  date: string;
  label: string;
  slots: (Interval & { label: string })[];
}

const DAY_LABEL = new Intl.DateTimeFormat("en-PH", { weekday: "long", month: "long", day: "numeric", timeZone: "Asia/Manila" });
const TIME_LABEL = new Intl.DateTimeFormat("en-PH", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Manila" });

/** Slots by Manila day with their labels, formatted once on the server so the page and the browser show the same text. */
export function labelledDays(slots: Interval[]): LabelledDay[] {
  return byDay(slots).map((d) => ({
    date: d.date,
    label: DAY_LABEL.format(new Date(d.slots[0].start)),
    slots: d.slots.map((s) => ({ ...s, label: TIME_LABEL.format(new Date(s.start)) })),
  }));
}
