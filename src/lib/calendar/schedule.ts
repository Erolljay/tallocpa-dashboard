/**
 * The Chief of Staff's schedule (docs/AI-WORKFORCE.md §8b): turns the rows of
 * public.ai_my_schedule() into one list, day by day. Within a day the all-day items
 * (returns due, registration targets, tasks, requests) come first, then the meetings by
 * start time. Times are shown in Manila.
 */

export const SCHEDULE_MAX_DAYS = 31;

export type ScheduleKind = "meeting" | "call" | "returns" | "task" | "request" | "registration";

export interface ScheduleRow {
  kind: ScheduleKind;
  starts_at: Date | string | null;
  ends_at: Date | string | null;
  on_date: Date | string;
  title: string;
  client_code: string | null;
  client_name: string | null;
  place: string | null;
  source: string;
}

export interface ScheduleItem {
  kind: ScheduleKind;
  date: string;
  /** "09:00–10:00" in Manila, or null for an all-day item. */
  time: string | null;
  title: string;
  client: string | null;
  place: string | null;
  source: string;
}

const KIND_ORDER: Record<ScheduleKind, number> = { returns: 0, registration: 1, task: 2, request: 3, meeting: 4, call: 4 };

const manilaTime = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const manilaDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" });

const asDate = (v: Date | string) => (v instanceof Date ? v : new Date(v));
/** A date column (no time zone) as YYYY-MM-DD; pg may return it as a Date at local midnight. */
const isoDay = (v: Date | string) =>
  typeof v === "string" ? v.slice(0, 10) : `${v.getFullYear()}-${String(v.getMonth() + 1).padStart(2, "0")}-${String(v.getDate()).padStart(2, "0")}`;

export function scheduleItems(rows: ScheduleRow[]): ScheduleItem[] {
  return rows
    .map((r) => {
      const start = r.starts_at ? asDate(r.starts_at) : null;
      const end = r.ends_at ? asDate(r.ends_at) : null;
      const date = start ? manilaDay.format(start) : isoDay(r.on_date);
      const item: ScheduleItem = {
        kind: r.kind,
        date,
        time: start ? `${manilaTime.format(start)}${end ? `–${manilaTime.format(end)}` : ""}` : null,
        title: r.title,
        client: r.client_code ? `${r.client_code} ${r.client_name ?? ""}`.trim() : null,
        place: r.place,
        source: r.source,
      };
      return { key: [date, KIND_ORDER[r.kind], start?.getTime() ?? 0, r.title] as const, item };
    })
    .sort((a, b) => {
      for (let i = 0; i < a.key.length; i++) {
        const x = a.key[i];
        const y = b.key[i];
        if (x !== y) return x < y ? -1 : 1;
      }
      return 0;
    })
    .map((x) => x.item);
}
