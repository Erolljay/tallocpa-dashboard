import Link from "next/link";
import { Card } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { booksUnlockRequests } from "@/lib/books/actions";
import { monthName } from "@/lib/lock/month-lock";
import { supabaseServer } from "@/lib/supabase/server";
import { DecideUnlock } from "./clients/[id]/books/lock-controls";

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "Asia/Manila" }).format(new Date(iso));

/**
 * Unlock requests (docs/REWORK.md, decision 9) for the Owner, and for the acting
 * approver while in office: the database lists them only for those two.
 */
export async function UnlockRequests() {
  await requireStaff();
  const requests = await booksUnlockRequests();
  if (requests.length === 0) return null;
  const supabase = await supabaseServer();
  const { data: people } = await supabase.from("staff_profiles").select("user_id, full_name").in("user_id", [...new Set(requests.map((r) => r.requested_by))]);
  const nameOf = new Map(((people ?? []) as { user_id: string; full_name: string }[]).map((p) => [p.user_id, p.full_name]));
  return (
    <div className="mb-6">
      <Card title={`Unlock requests (${requests.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">A reviewer asks to reopen a locked month</span>}>
        <ul className="flex flex-col divide-y divide-separator-border">
          {requests.map((r) => {
            const month = monthName(String(r.month).slice(0, 10));
            const by = nameOf.get(r.requested_by) ?? null;
            return (
              <li key={r.id} className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <p className="text-body-medium text-text-primary">
                    <Link href={`/app/clients/${r.client_id}/books/months?year=${String(r.month).slice(0, 4)}`} className="hover:underline">{r.client_name}</Link>
                    <span className="text-text-secondary"> · {month}</span>
                  </p>
                  <p className="text-body-regular text-text-secondary">{r.reason}</p>
                  <p className="text-caption-1-regular text-text-tertiary">{by ?? "A reviewer"} · {when(r.requested_at)}</p>
                </div>
                <DecideUnlock requestId={r.id} clientId={r.client_id} monthLabel={month} reason={r.reason} by={by} inline />
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
