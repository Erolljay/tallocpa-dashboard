import Link from "next/link";
import { Suspense } from "react";
import { Badge, PageHeader, Skeleton, peso } from "@/components/ui";
import { RemittanceButton } from "@/components/remittances/forms";
import { requireStaff } from "@/lib/auth";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { isQueue, monthLabel, QUEUES, REMITTANCE_KINDS, remittanceBadge, type Queue, type RemittanceKind, type RemittanceStatus } from "@/lib/remittances/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { FilingsTabs } from "@/app/(platform)/app/nav/section-tabs";

export default function RemittancesPage(props: PageProps<"/app/remittances">) {
  return (
    <Suspense fallback={<><PageHeader title="SSS, PhilHealth and Pag-IBIG" /><Skeleton rows={8} /></>}>
      <Remittances searchParams={props.searchParams} />
    </Suspense>
  );
}

interface Row {
  id: string;
  client_id: string;
  kind: RemittanceKind;
  period_month: string;
  due_date: string;
  status: RemittanceStatus;
  total: string;
  prn: string | null;
  clients: { name: string; payment_mode: string } | null;
}

/**
 * The monthly SSS, PhilHealth and Pag-IBIG remittances (migration 20261216000002), run
 * like returns: staff prepare (shares, PRN, report), the Owner approves (the amount goes
 * on the statement when we remit), then it is remitted with the proof of payment.
 */
async function Remittances({ searchParams }: Pick<PageProps<"/app/remittances">, "searchParams">) {
  const me = await requireStaff();
  const sp = await searchParams;
  const owner = me.staff.role === "owner";
  const queue: Queue = typeof sp.queue === "string" && isQueue(sp.queue) ? sp.queue : owner ? "approve" : "prepare";
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("contribution_remittances")
    .select("id, client_id, kind, period_month, due_date, status, total, prn, clients(name, payment_mode)")
    .in("status", [...QUEUES[queue].statuses])
    .order("due_date", { ascending: queue !== "done" })
    .order("period_month", { ascending: false })
    .limit(400);
  if (error) throw error;
  const rows = (data ?? []) as unknown as Row[];
  const today = manilaToday();
  const counts = await Promise.all(
    (Object.keys(QUEUES) as Queue[]).filter((q) => q !== "done").map(async (q) => {
      const { count } = await supabase.from("contribution_remittances").select("id", { count: "exact", head: true }).in("status", [...QUEUES[q].statuses]);
      return [q, count ?? 0] as const;
    }),
  );
  const countOf = new Map<Queue, number>(counts);
  const pill = (on: boolean) => cx("inline-flex items-center gap-1.5 rounded-full px-3 py-1 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring", on ? "bg-background-tertiary-default text-text-primary" : "text-text-secondary hover:bg-background-secondary-hover");

  return (
    <>
      <PageHeader
        title="SSS, PhilHealth and Pag-IBIG"
        description="Each client's monthly contributions (EE, ER and EC) and loan payments from its posted payroll, beside the 1601-C: generate the PRN, the Owner approves, then remit with the proof of payment."
        actions={<RemittanceButton id="" action="generate" label="Refresh from payroll" busyLabel="Refreshing…" variant="secondary" />}
      />
      <FilingsTabs active="remittances" />
      <div className="mb-4 flex flex-wrap gap-1 text-body-medium">
        {(Object.keys(QUEUES) as Queue[]).map((q) => (
          <Link key={q} href={`/app/remittances?queue=${q}`} aria-current={q === queue ? "page" : undefined} className={pill(q === queue)}>
            {QUEUES[q].label}
            {countOf.get(q) ? <span className="text-caption-1-semibold text-text-tertiary">{countOf.get(q)}</span> : null}
          </Link>
        ))}
      </div>
      {rows.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-10 text-center">
          <p className="text-body-medium text-text-primary">Nothing here</p>
          <p className="mt-1 text-body-regular text-text-secondary">Remittances appear when a client&rsquo;s payroll is posted, for clients we handle SSS, PhilHealth and Pag-IBIG for (switched on in the client&rsquo;s Overview).</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
          <table className="w-full min-w-[44rem] text-body-regular">
            <thead>
              <tr className="border-b border-border-table text-start text-caption-1-semibold text-text-tertiary">
                <th className="px-4 py-2 text-start">Client</th>
                <th className="px-4 py-2 text-start">Remittance</th>
                <th className="px-4 py-2 text-start">Due</th>
                <th className="px-4 py-2 text-end">Amount</th>
                <th className="px-4 py-2 text-start">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-separator-border">
              {rows.map((r) => {
                const badge = remittanceBadge(r.status, r.due_date, today);
                return (
                  <tr key={r.id} className="hover:bg-background-secondary-hover">
                    <td className="px-4 py-2.5">
                      <Link href={`/app/clients/${r.client_id}`} className="text-text-primary hover:underline">{r.clients?.name}</Link>
                      {r.clients?.payment_mode === "firm_remits" && <span className="block text-caption-1-regular text-text-tertiary">We remit</span>}
                    </td>
                    <td className="px-4 py-2.5">
                      <Link href={`/app/remittances/${r.id}`} className="text-body-medium text-text-primary hover:underline">{REMITTANCE_KINDS[r.kind].option}</Link>
                      <span className="block text-caption-1-regular text-text-tertiary">{monthLabel(r.period_month)}</span>
                    </td>
                    <td className="px-4 py-2.5 text-text-secondary">{showDate(r.due_date)}</td>
                    <td className="px-4 py-2.5 text-end tabular-nums text-text-primary">{Number(r.total) > 0 ? peso.format(Number(r.total)) : "—"}</td>
                    <td className="px-4 py-2.5"><Badge tone={badge.tone}>{badge.label}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
