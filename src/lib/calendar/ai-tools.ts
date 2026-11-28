/**
 * The Chief of Staff's schedule tool (docs/AI-WORKFORCE.md §8b). One list of everything
 * dated for the Owner, from TalloCPA OS: client meetings and discovery calls booked with
 * the Owner, returns due, the Owner's tasks and requests due, and registration target
 * dates. Read only: it never creates, changes, accepts or declines anything.
 *
 * Nothing is read from the tables directly: public.ai_my_schedule() (migration
 * 20270110000003_ai_my_schedule.sql) answers only the switched-on Chief of Staff, and
 * names a client only when the Chief of Staff may read that client.
 *
 * Google Calendar events are not included: the app keeps no copy of them (it reads a
 * staff member's calendar live with that person's Google sign-in), and an AI employee
 * never gets a Google sign-in. The desk reads Google Calendar through Cowork's connector.
 */
import { z } from "zod";
import { addDays, parseIso } from "@/lib/deadlines/dates";
import { defineTool, ToolRefusal } from "@/lib/mcp/tool";
import { SCHEDULE_MAX_DAYS, scheduleItems, type ScheduleRow } from "./schedule";

const DAY = /^\d{4}-\d{2}-\d{2}$/;

export const mySchedule = defineTool({
  name: "my_schedule",
  title: "The Owner's schedule",
  description: `Everything dated for the Owner in TalloCPA OS between two days (Manila; default today only, at most ${SCHEDULE_MAX_DAYS} days), in one list ordered by day and time: client meetings and discovery calls booked with the Owner (with the Meet link), returns of your clients due and not yet filed (one line per due date, counted per form), the Owner's open tasks and requests due, and open registration cases' target dates. Google Calendar events are not included: read those with your Google Calendar connector and leave out the meetings this list already has.`,
  input: z.object({
    from: z.string().regex(DAY, "Use YYYY-MM-DD.").optional().describe("First day, YYYY-MM-DD (default today)"),
    to: z.string().regex(DAY, "Use YYYY-MM-DD.").optional().describe("Last day, YYYY-MM-DD (default the first day)"),
  }),
  employees: ["chief_of_staff"],
  effect: "read",
  async run({ db, today }, { from, to }) {
    const first = from ?? today;
    const last = to ?? first;
    const days = Math.round((parseIso(last).getTime() - parseIso(first).getTime()) / 86_400_000) + 1;
    if (days < 1) throw new ToolRefusal("The last day comes before the first day.");
    if (days > SCHEDULE_MAX_DAYS) throw new ToolRefusal(`Ask for at most ${SCHEDULE_MAX_DAYS} days at a time (for example ${first} to ${addDays(first, SCHEDULE_MAX_DAYS - 1)}).`);
    const { rows } = await db.query<ScheduleRow & Record<string, unknown>>(
      `select kind, starts_at, ends_at, on_date::text as on_date, title, client_code, client_name, place, source from public.ai_my_schedule($1::date, $2::date)`,
      [first, last],
    );
    return {
      from: first,
      to: last,
      for: "the Owner",
      items: scheduleItems(rows),
      google_calendar: "Not included: read the Owner's Google Calendar with your Google Calendar connector, and leave out the meetings already listed here.",
    };
  },
});
