import Link from "next/link";
import { Suspense } from "react";
import { Badge, peso, Skeleton } from "@/components/ui";
import { StatementView } from "@/components/statement/statement-view";
import { loadStatement } from "@/lib/collections/statement";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { portalContext } from "../client-context";

/** Client portal: the latest Statement of Account with Pay Now, and earlier statements (spec §3.4 item 6). */
export default function PortalStatement() {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Latest />
    </Suspense>
  );
}

async function Latest() {
  const { supabase, clients } = await portalContext();
  const today = manilaToday();
  const { data: soas } = await supabase
    .from("soas")
    .select("id, reference, billing_date, due_on, client_id")
    .in("client_id", clients.map((c) => c.id))
    .order("billing_date", { ascending: false })
    .limit(50);
  const rows = soas ?? [];
  if (rows.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-title-1-bold text-text-primary">Statement</h1>
        <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">No statements yet. Your first statement appears here on your billing day.</p>
      </div>
    );
  }

  const ids = rows.map((r) => r.id);
  const { data: dues } = await supabase.from("due_balances").select("soa_id, open_amount").in("soa_id", ids);
  const openBySoa = new Map<string, number>();
  for (const d of dues ?? []) openBySoa.set(d.soa_id, (openBySoa.get(d.soa_id) ?? 0) + Number(d.open_amount));
  const several = clients.length > 1;
  const nameOf = new Map(clients.map((c) => [c.id, c.name]));

  // One current statement per business: the latest.
  const latestPerClient = clients
    .map((c) => rows.find((r) => r.client_id === c.id))
    .filter((r): r is (typeof rows)[number] => Boolean(r));
  const statements = await Promise.all(latestPerClient.map((r) => loadStatement(supabase, r.id)));

  return (
    <div className="space-y-8">
      <h1 className="text-title-1-bold text-text-primary">Statement</h1>
      {statements.map((s) =>
        s ? (
          <section key={s.soa.id} className="space-y-3">
            {several && <h2 className="text-title-3-semibold text-text-primary">{s.client.name}</h2>}
            <StatementView s={s} today={today} />
          </section>
        ) : null,
      )}

      <section className="space-y-3 print:hidden">
        <h2 className="text-title-3-semibold text-text-primary">All statements</h2>
        <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular shadow-xs">
          {rows.map((r) => {
            const open = openBySoa.get(r.id) ?? 0;
            return (
              <li key={r.id}>
                <Link href={`/portal/statement/${r.id}`} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 hover:bg-background-secondary-hover pointer-coarse:min-h-14">
                  <span className="min-w-0">
                    <span className="block font-medium tabular-nums text-text-primary">{r.reference}</span>
                    <span className="block text-caption-1-regular text-text-tertiary">{several ? `${nameOf.get(r.client_id)} · ` : ""}{showDate(r.billing_date)}</span>
                  </span>
                  {open <= 0 ? <Badge tone="done">Paid</Badge> : r.due_on < today ? <Badge tone="blocked">{peso.format(open)} overdue</Badge> : <Badge tone="neutral">{peso.format(open)} due {showDate(r.due_on)}</Badge>}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
