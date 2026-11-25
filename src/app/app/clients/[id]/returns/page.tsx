import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { booksStillOpen, filingsNeedingAmendment } from "@/lib/books/actions";
import { booksReadyMap } from "@/lib/filings/books-ready";
import { FILED, filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { monthName } from "@/lib/lock/month-lock";
import { supabaseServer } from "@/lib/supabase/server";
import { ClientTabs } from "../client-tabs";

/**
 * A client's returns (docs/REWORK.md, decision 10): only those whose Books period is
 * locked. Returns whose months are still open are named below the list, with the
 * months that hold them, so none is lost.
 */
export default function ClientReturnsPage(props: PageProps<"/app/clients/[id]/returns">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Returns params={props.params} />
    </Suspense>
  );
}

interface FilingRow {
  id: string;
  form: string;
  period_label: string;
  period_end: string;
  due_date: string;
  status: keyof typeof filingStatusTone;
  tax_due: string | number | null;
}

async function Returns({ params }: Pick<PageProps<"/app/clients/[id]/returns">, "params">) {
  const { id } = await params;
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const today = manilaToday();

  const { data: client } = await supabase.from("clients").select("id, name, code").eq("id", id).maybeSingle();
  if (!client) notFound();
  const [{ data: team }, { data: engagements }, { data: filingRows }, flags, stillOpen] = await Promise.all([
    supabase.from("staff_assignments").select("user_id").eq("client_id", id),
    supabase.from("engagements").select("service_line, status").eq("client_id", id),
    supabase.from("filing_instances").select("id, form, period_label, period_end, due_date, status, tax_due").eq("client_id", id).order("due_date", { ascending: false }).order("form").limit(300),
    filingsNeedingAmendment(id),
    booksStillOpen(today),
  ]);
  const filings = (filingRows ?? []) as FilingRow[];
  const ready = await booksReadyMap(filings.map((f) => f.id), supabase);
  const shown = filings.filter((f) => ready.get(f.id) === true);
  const held = filings.filter((f) => ready.get(f.id) === false && !FILED.includes(f.status)).sort((a, b) => a.due_date.localeCompare(b.due_date));
  const openMonths = [...new Set(stillOpen.filter((r) => r.client_id === id).map((r) => r.month.slice(0, 10)))].sort();
  const flagOf = new Map(flags.map((f) => [f.filing_id, f]));

  return (
    <>
      <PageHeader title={client.name} description={<span className="tabular-nums">{client.code} · Returns for locked months</span>} />
      <ClientTabs
        clientId={id}
        active="returns"
        work={owner || (team ?? []).some((a) => a.user_id === me.userId)}
        books={(engagements ?? []).some((e) => e.service_line === "bookkeeping" && e.status === "active")}
      />
      <div className="space-y-4">
        <Card title={`Returns (${shown.length})`} actions={<Link href={`/app/clients/${id}/books/months`} className="text-body-regular text-button-ghost-foreground hover:underline">Month locks</Link>}>
          {shown.length === 0 ? (
            <p className="text-body-regular text-text-secondary">No return has its Books period locked yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] text-body-regular">
                <thead className="text-body-medium text-text-tertiary">
                  <tr>
                    <th scope="col" className="pb-2 text-start">Form</th>
                    <th scope="col" className="pb-2 text-start">Period</th>
                    <th scope="col" className="pb-2 text-start">Due</th>
                    <th scope="col" className="pb-2 text-end">Amount</th>
                    <th scope="col" className="ps-4 pb-2 text-start">Step</th>
                    <th scope="col" className="pb-2 text-end"><span className="sr-only">Open</span></th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((f) => {
                    const overdue = f.due_date < today && !FILED.includes(f.status);
                    const flag = flagOf.get(f.id);
                    return (
                      <tr key={f.id} className="border-t border-separator-border align-top transition-colors duration-150 hover:bg-background-secondary-hover">
                        <td className="py-2 pe-4 font-medium text-text-primary">{f.form}</td>
                        <td className="py-2 pe-4 text-text-secondary">{f.period_label}</td>
                        <td className={overdue ? "py-2 pe-4 font-medium tabular-nums text-text-error-primary" : "py-2 pe-4 tabular-nums text-text-primary"}>{showDate(f.due_date)}</td>
                        <td className="amount py-2 text-end tabular-nums text-text-primary">{f.tax_due == null ? "—" : Number(f.tax_due) === 0 ? "Nil" : peso.format(Number(f.tax_due))}</td>
                        <td className="py-2 ps-4">
                          <div className="flex flex-wrap gap-1">
                            {overdue ? <Badge tone="blocked">Overdue</Badge> : <Badge tone={filingStatusTone[f.status]}>{filingStatusLabel[f.status]}</Badge>}
                            {flag && <Badge tone="blocked">Needs amended return</Badge>}
                          </div>
                          {flag && <p className="mt-1 text-caption-1-regular text-text-tertiary">Unlocked: {flag.reason}</p>}
                        </td>
                        <td className="py-2 text-end">
                          <Link href={`/app/filings/${f.id}`} className="rounded-sm font-medium text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">Open</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        {held.length > 0 && (
          <p className="text-body-regular text-text-secondary">
            <span className="text-body-medium text-text-primary">Not shown yet:</span>{" "}
            {held.map((f, i) => (
              <span key={f.id}>
                {i > 0 && ", "}
                {f.form} {f.period_label} (due {showDate(f.due_date)})
              </span>
            ))}
            {openMonths.length > 0 ? `. The Books are still open for ${openMonths.map(monthName).join(", ")}.` : ". Their Books months are not locked yet."}{" "}
            <Link href={`/app/clients/${id}/books/months`} className="text-button-ghost-foreground underline">Lock the months</Link>
          </p>
        )}
      </div>
    </>
  );
}
