import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { loadMyWork } from "@/lib/work/load";
import { nextActions, URGENCY_LABELS, type Urgency, type WorkItem } from "@/lib/work/next-actions";
import { cx } from "@/utils/cx";

export default function MyWorkPage(props: PageProps<"/app/work">) {
  return (
    <Suspense fallback={<><PageHeader title="My work" /><Skeleton rows={8} /></>}>
      <MyWork searchParams={props.searchParams} />
    </Suspense>
  );
}

const TONE: Record<Urgency, "blocked" | "waiting" | "progress" | "neutral"> = { overdue: "blocked", critical: "blocked", at_risk: "waiting", due: "progress", open: "neutral" };
const short = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

/**
 * My work (W3; recommendation 5): one next action per client and period for the person
 * signed in — returns at their next step, documents to review, entries to confirm,
 * payroll to post, depreciation to run, review notes, reviews to sign, adjustments to
 * tick. The Owner sees their approvals, or every client's work.
 */
async function MyWork({ searchParams }: Pick<PageProps<"/app/work">, "searchParams">) {
  const me = await requireStaff();
  const sp = await searchParams;
  const owner = me.staff.role === "owner";
  const everything = owner && sp.show === "all";
  const supabase = await supabaseServer();
  const { items, roles } = await loadMyWork(supabase, { userId: me.userId, role: me.staff.role }, manilaToday(), everything);
  const rows = nextActions(items, roles);
  const total = items.filter((i) => roles.includes(i.role)).length;

  return (
    <>
      <PageHeader
        title="My work"
        description={owner ? (everything ? "Every client's next actions." : "Returns waiting for your approval, and your own clients.") : "The next action on each of your clients, most urgent first."}
        actions={
          owner && (
            <div className="flex gap-1 rounded-xl bg-background-secondary-default p-1 text-body-medium">
              {([["", "Mine"], ["all", "All clients"]] as const).map(([v, label]) => (
                <Link key={v} href={v ? "/app/work?show=all" : "/app/work"} aria-current={(v === "all") === everything ? "page" : undefined}
                  className={cx("rounded-lg px-3 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring", (v === "all") === everything ? "bg-background-primary-default text-text-primary shadow-xs" : "text-text-secondary hover:text-text-primary")}>
                  {label}
                </Link>
              ))}
            </div>
          )
        }
      />
      <Card title={rows.length ? `${rows.length} client-month${rows.length === 1 ? "" : "s"} · ${total} action${total === 1 ? "" : "s"}` : undefined}>
        {rows.length === 0 ? (
          <p className="text-body-regular text-text-secondary">Nothing waiting for you. New documents, returns at your step and review notes show up here.</p>
        ) : (
          <ul className="divide-y divide-separator-border">
            {rows.map((r) => (
              <li key={`${r.clientId}|${r.period}`} className="py-3">
                <div className="flex flex-wrap items-start gap-x-4 gap-y-1">
                  <div className="w-44 shrink-0">
                    <Link href={`/app/clients/${r.clientId}`} className="text-body-medium text-text-primary hover:underline">{r.clientName}</Link>
                    <p className="text-caption-1-regular text-text-tertiary">{showMonth(`${r.period}-01`)}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Action item={r.next} primary />
                    {r.more.length > 0 && (
                      <details className="mt-1">
                        <summary className="cursor-pointer text-caption-1-medium text-button-ghost-foreground hover:underline">{r.more.length} more</summary>
                        <ul className="mt-1 space-y-1 ps-3">
                          {r.more.map((m) => <li key={`${m.label}|${m.href}`}><Action item={m} /></li>)}
                        </ul>
                      </details>
                    )}
                  </div>
                  <Badge tone={TONE[r.next.urgency]}>{URGENCY_LABELS[r.next.urgency]}</Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}

function Action({ item, primary = false }: { item: WorkItem; primary?: boolean }) {
  return (
    <p className={primary ? "text-body-regular" : "text-caption-1-regular"}>
      <Link href={item.href} className="text-button-ghost-foreground hover:underline">{item.label}</Link>
      {item.due && <span className="text-text-tertiary"> · by {short(item.due)}</span>}
      {item.role !== "preparer" && <span className="text-text-tertiary"> · as {item.role}</span>}
    </p>
  );
}
