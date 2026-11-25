import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { SectionTabs } from "@/app/app/nav/section-tabs";
import { requireStaff } from "@/lib/auth";
import { teamWeek } from "@/lib/calendar/staff";
import { manilaTime, mondayOf, weekCells, weekDays, weekRange } from "@/lib/calendar/week";
import { googleCalendarEnv } from "@/lib/env";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { DisconnectButton } from "./disconnect";

/**
 * Team calendar (docs/REWORK.md, decision 22): the week of every staff member from their
 * own Google Calendar. Events on their Tallo calendar show in full; private events and
 * their personal calendars show only as Busy.
 */
export default function TeamCalendarPage(props: PageProps<"/app/calendar">) {
  return (
    <Suspense fallback={<><PageHeader title="Team calendar" /><Skeleton rows={8} /></>}>
      <TeamCalendar searchParams={props.searchParams} />
    </Suspense>
  );
}

const ERRORS: Record<string, string> = {
  setup: "Google Calendar is not set up yet. The Owner adds the Google credentials (docs/SETUP.md).",
  state: "The connection could not be confirmed. Start again from this page.",
  denied: "Google access was not given.",
  account: "Connect your own tallocpa.com Google account: the one you sign in with.",
  google: "Google did not complete the connection. Try again; if it keeps failing, tell the Owner.",
};

const dayLabel = (d: string) => new Intl.DateTimeFormat("en-PH", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
const addDays = (d: string, n: number) => new Date(Date.parse(`${d}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);

async function TeamCalendar({ searchParams }: Pick<PageProps<"/app/calendar">, "searchParams">) {
  const me = await requireStaff();
  const sp = await searchParams;
  const today = manilaToday();
  const asked = typeof sp.week === "string" && /^\d{4}-\d{2}-\d{2}$/.test(sp.week) ? sp.week : today;
  const monday = mondayOf(asked);
  const days = weekDays(monday);
  const { from, to } = weekRange(monday);
  const env = googleCalendarEnv();

  const supabase = await supabaseServer();
  const [{ data: people }, { data: links }] = await Promise.all([
    supabase.from("staff_profiles").select("user_id, full_name, role").eq("active", true).order("full_name"),
    supabase.from("google_calendar_links").select("user_id, google_email, connected_at, last_error"),
  ]);
  const staff = (people ?? []) as { user_id: string; full_name: string; role: string }[];
  const linkOf = new Map(((links ?? []) as { user_id: string; google_email: string; last_error: string | null }[]).map((l) => [l.user_id, l]));
  const weeks = env ? await teamWeek(staff.filter((p) => linkOf.has(p.user_id)).map((p) => p.user_id), from, to) : new Map();
  const mine = linkOf.get(me.userId);
  const error = typeof sp.error === "string" ? ERRORS[sp.error] : undefined;

  return (
    <>
      <PageHeader
        title="Team calendar"
        description="Everyone's week from their Google Calendar. Tallo events in full; private and personal events as Busy. Times are Manila time."
        actions={
          mine ? (
            <div className="flex items-center gap-2">
              <span className="text-body-regular text-text-secondary">{mine.google_email}</span>
              <DisconnectButton />
            </div>
          ) : env ? (
            <LinkButton href="/app/calendar/connect" prefetch={false}>Connect my Google Calendar</LinkButton>
          ) : null
        }
      />
      <SectionTabs section="home" active="calendar" />
      <div className="space-y-4">
        {!env && <Notice tone="waiting">{ERRORS.setup}</Notice>}
        {error && <Notice tone="blocked">{error}</Notice>}
        {sp.connected === "1" && <Notice tone="done">Your Google Calendar is connected.</Notice>}
        {mine?.last_error && <Notice tone="blocked">Your calendar connection stopped working: {mine.last_error}</Notice>}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-headline-medium text-text-primary">{dayLabel(days[0])} – {dayLabel(days[6])}</p>
          <div className="flex gap-2">
            <LinkButton href={`/app/calendar?week=${addDays(monday, -7)}`} variant="secondary" size="sm">Previous week</LinkButton>
            <LinkButton href="/app/calendar" variant="ghost" size="sm">This week</LinkButton>
            <LinkButton href={`/app/calendar?week=${addDays(monday, 7)}`} variant="secondary" size="sm">Next week</LinkButton>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] table-fixed text-body-regular">
              <thead className="text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="w-40 pb-2 text-start">Staff</th>
                  {days.map((d) => (
                    <th key={d} scope="col" className={cx("pb-2 text-start", d === today && "text-accent-600")}>{dayLabel(d)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-separator-border">
                {staff.map((p) => {
                  const link = linkOf.get(p.user_id);
                  const week = weeks.get(p.user_id);
                  const cells = week ? weekCells(days, week.events, week.busy) : null;
                  return (
                    <tr key={p.user_id} className="align-top">
                      <th scope="row" className="py-2 pe-2 text-start">
                        <span className="block text-body-medium text-text-primary">{p.full_name}</span>
                        {!link ? (
                          <span className="text-caption-1-regular text-text-tertiary">Not connected</span>
                        ) : link.last_error || week?.error ? (
                          <Badge tone="blocked">Connection problem</Badge>
                        ) : null}
                      </th>
                      {days.map((d, i) => (
                        <td key={d} className="py-2 pe-2">
                          <ul className="space-y-1">
                            {(cells?.[i] ?? []).map((e, j) => (
                              <li
                                key={j}
                                className={cx(
                                  "rounded-md px-1.5 py-1 text-caption-1-regular",
                                  e.title ? "bg-accent-50 text-text-primary" : "bg-background-tertiary-default text-text-secondary",
                                )}
                              >
                                <span className="tabular-nums">{e.allDay ? "All day" : `${manilaTime(e.start)}–${manilaTime(e.end)}`}</span>{" "}
                                {e.title ? (
                                  e.htmlLink?.startsWith("https://") ? <a href={e.htmlLink} target="_blank" rel="noreferrer" className="hover:underline">{e.title}</a> : e.title
                                ) : (
                                  "Busy"
                                )}
                                {e.meetUrl?.startsWith("https://") && (
                                  <>
                                    {" · "}
                                    <a href={e.meetUrl} target="_blank" rel="noreferrer" className="text-button-ghost-foreground underline">Meet</a>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
