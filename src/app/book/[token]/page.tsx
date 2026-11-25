import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { SlotPicker } from "@/components/booking/slot-picker";
import { Notice, Skeleton } from "@/components/ui";
import { slotsFor } from "@/lib/calendar/booking";
import { labelledDays, DISCOVERY_CALL } from "@/lib/calendar/slots";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { bookDiscoveryCallAction } from "./actions";

export const metadata: Metadata = { title: "Book your discovery call · Tallo CPA", robots: { index: false, follow: false } };

/** The lead's booking page (docs/REWORK.md, decision 22): the assigned reviewer's free times; booking sends a Meet invitation. */
export default function BookingPage(props: PageProps<"/book/[token]">) {
  return (
    <main className="flex flex-1 justify-center bg-background-full px-4 py-10">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <Lockup />
        <Suspense fallback={<Skeleton rows={8} />}>
          <Booking params={props.params} />
        </Suspense>
      </div>
    </main>
  );
}

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Manila" });

async function Booking({ params }: Pick<PageProps<"/book/[token]">, "params">) {
  const { token } = await params;
  if (!/^[0-9a-f]{64}$/.test(token)) notFound();
  const { data } = await supabaseAdmin().rpc("booking_lead", { p_token: token });
  const lead = ((data ?? []) as { business_name: string; contact_name: string; reviewer_id: string; reviewer_name: string; open: boolean; booked_at: string | null; meet_url: string | null }[])[0];
  if (!lead) notFound();
  const first = lead.contact_name.split(/\s+/)[0];

  const intro = (
    <div className="space-y-2">
      <h1 className="text-title-1-medium text-text-primary">Book your discovery call</h1>
      <p className="text-body-regular text-text-secondary">
        Hi {first}. Pick a time for a 45-minute call about {lead.business_name} with {lead.reviewer_name}, your reviewer at Tallo CPA. You will get a Google Calendar invitation with a Meet link. Times are Philippine time.
      </p>
    </div>
  );
  if (lead.booked_at) {
    return (
      <>
        {intro}
        <Notice tone="done">
          Your call is booked for {when.format(new Date(lead.booked_at))}.
          {lead.meet_url?.startsWith("https://") && <> <a href={lead.meet_url} className="underline">Join on Google Meet</a>.</>} Need another time? Reply to the invitation.
        </Notice>
      </>
    );
  }
  if (!lead.open) {
    return (
      <>
        {intro}
        <Notice tone="waiting">This booking link is closed. Please reply to our email and we will arrange the call.</Notice>
      </>
    );
  }
  const free = await slotsFor(lead.reviewer_id, DISCOVERY_CALL);
  return (
    <>
      {intro}
      <div className="rounded-3xl border border-border-button-default bg-background-primary-default p-4 sm:p-6">
        {free ? (
          <SlotPicker days={labelledDays(free.slots)} action={bookDiscoveryCallAction.bind(null, token)} submitLabel="Book the call" />
        ) : (
          <Notice tone="waiting">Online booking is not available right now. Please reply to our email and we will arrange the call.</Notice>
        )}
      </div>
    </>
  );
}
