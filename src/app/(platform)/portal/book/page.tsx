import Link from "next/link";
import { Suspense } from "react";
import { CancelBooking } from "@/components/booking/cancel-booking";
import { SlotPicker } from "@/components/booking/slot-picker";
import { Notice, Skeleton } from "@/components/ui";
import { slotsFor } from "@/lib/calendar/booking";
import { labelledDays, CLIENT_MEETING } from "@/lib/calendar/slots";
import { accessNote, canAct } from "@/lib/contacts/access";
import { portalContext } from "../client-context";
import { bookClientMeetingAction, cancelMyMeetingAction } from "./actions";

/** Book a meeting with the client's reviewer (or preparer): their free times, a Meet link by email (decision 22). */
export default function PortalBookPage(props: PageProps<"/portal/book">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Book searchParams={props.searchParams} />
    </Suspense>
  );
}

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });

async function Book({ searchParams }: Pick<PageProps<"/portal/book">, "searchParams">) {
  const sp = await searchParams;
  const { supabase, clients } = await portalContext();
  const business = clients.find((c) => c.id === sp.business) ?? clients[0];
  if (!business) return <Notice tone="waiting">No business is linked to your account yet.</Notice>;
  const [{ data: hosts }, { data: meetings }] = await Promise.all([
    supabase.rpc("portal_meeting_host", { p_client: business.id }),
    supabase.from("client_meetings").select("id, starts_at, meet_url, topic").eq("client_id", business.id).is("cancelled_at", null).gte("ends_at", new Date().toISOString()).order("starts_at"),
  ]);
  const host = ((hosts ?? []) as { user_id: string; full_name: string; connected: boolean }[])[0];
  const free = host?.connected ? await slotsFor(host.user_id, CLIENT_MEETING) : null;
  const upcoming = (meetings ?? []) as { id: string; starts_at: string; meet_url: string | null; topic: string | null }[];
  // A meeting that has started can no longer be cancelled.
  const now = new Date().getTime();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-title-1-medium text-text-primary">Book a meeting</h1>
        <p className="text-body-regular text-text-secondary">
          {host ? `A 30-minute video call with ${host.full_name}` : "A 30-minute video call with your team"}
          {clients.length > 1 ? ` about ${business.name}` : ""}. You will get a Google Calendar invitation with a Meet link. Times are Philippine time.
        </p>
      </div>
      {upcoming.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-title-3-semibold text-text-primary">Coming up</h2>
          <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default px-4">
            {upcoming.map((m) => (
              <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-body-regular">
                <span className="text-text-primary">{when.format(new Date(m.starts_at))}{m.topic ? ` · ${m.topic}` : ""}</span>
                <span className="flex flex-wrap items-center gap-2">
                  {m.meet_url?.startsWith("https://") && <a href={m.meet_url} target="_blank" rel="noreferrer" className="text-button-ghost-foreground underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">Join on Meet</a>}
                  {Date.parse(m.starts_at) > now && canAct(business.access) && (
                    <CancelBooking action={cancelMyMeetingAction.bind(null, m.id)} reasonHint="Optional. Your team will see it." />
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="rounded-3xl border border-border-button-default bg-background-primary-default p-4 sm:p-6">
        {!canAct(business.access) ? (
          <Notice tone="waiting">{accessNote(business.access, "act")}</Notice>
        ) : !host ? (
          <Notice tone="waiting">Your team is being assigned. You can book once we introduce them on your Home page.</Notice>
        ) : !free ? (
          <Notice tone="waiting">Online booking with {host.full_name} is not available right now. Please email them from your <Link href="/portal" className="underline">Home</Link> page.</Notice>
        ) : (
          <SlotPicker days={labelledDays(free.slots)} action={bookClientMeetingAction.bind(null, business.id)} topic={{ label: "What would you like to talk about?", hint: "Optional." }} submitLabel="Book the meeting" />
        )}
      </div>
    </div>
  );
}
