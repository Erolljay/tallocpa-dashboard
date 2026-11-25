import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { ageOpenItems, AGING_BUCKETS, agingLabel, describeBillingDays, nextBillingDate } from "@/lib/collections/collections";
import { addDays } from "@/lib/deadlines/dates";
import { filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { RunBillingForm } from "./forms";

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        title="Collections"
        description="What each client owes, what they have paid, and the billing runs on the 10th and 20th."
        actions={
          <Suspense fallback={null}>
            <RunBilling />
          </Suspense>
        }
      />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Overview />
      </Suspense>
    </>
  );
}

async function RunBilling() {
  await requireOwner();
  return <RunBillingForm clientId={null} today={manilaToday()} />;
}

interface OpenDue { client_id: string; due_on: string; open_amount: string; kind: string; soa_id: string | null }
interface Client { id: string; name: string; code: string; billing_days: number[]; payment_mode: string; status: string }

async function Overview() {
  await requireOwner();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const [dues, credits, clients, taxPaid, notReady, soas, proofs] = await Promise.all([
    supabase.from("due_balances").select("client_id, due_on, open_amount, kind, soa_id").gt("open_amount", 0),
    supabase.from("deposit_balances").select("client_id, unallocated").gt("unallocated", 0),
    supabase.from("clients").select("id, name, code, billing_days, payment_mode, status").in("status", ["onboarding", "active"]).order("name"),
    supabase.from("due_balances").select("paid, filing_instances(status)").eq("kind", "tax").gt("paid", 0),
    supabase
      .from("filing_instances")
      .select("id, form, period_label, due_date, status, clients!inner(id, name, payment_mode, billing_days)")
      .eq("clients.payment_mode", "firm_remits")
      .in("status", ["not_started", "prepared"])
      .gte("due_date", today)
      .lte("due_date", addDays(today, 20))
      .order("due_date"),
    supabase.from("soas").select("id, reference, billing_date, due_on, client_id, clients(name)").order("billing_date", { ascending: false }).order("reference").limit(15),
    supabase
      .from("payment_proofs")
      .select("id, soa_id, amount, paid_on, method, submitted_at, soas(reference), clients(name), brand_payment_accounts(institution)")
      .eq("status", "for_verification")
      .order("submitted_at"),
  ]);
  const toVerify = (proofs.data ?? []) as unknown as {
    id: string;
    soa_id: string;
    amount: string;
    paid_on: string;
    method: "transfer" | "check" | "deposit";
    soas: { reference: string } | null;
    clients: { name: string } | null;
    brand_payment_accounts: { institution: string } | null;
  }[];
  const verifying = new Set(toVerify.map((p) => p.soa_id));

  const open = (dues.data ?? []) as OpenDue[];
  const all = ageOpenItems(open, today);
  const creditByClient = new Map<string, number>();
  for (const c of credits.data ?? []) creditByClient.set(c.client_id, (creditByClient.get(c.client_id) ?? 0) + Number(c.unallocated));
  const totalCredit = [...creditByClient.values()].reduce((a, b) => a + b, 0);
  // Q26: tax money received from clients and not yet remitted to BIR is held for them, not earned.
  const held = ((taxPaid.data ?? []) as unknown as { paid: string; filing_instances: { status: string } | null }[])
    .filter((r) => r.filing_instances?.status !== "filed")
    .reduce((s, r) => s + Number(r.paid), 0);

  const clientList = (clients.data ?? []) as Client[];
  const byClient = clientList
    .map((c) => ({ client: c, aging: ageOpenItems(open.filter((d) => d.client_id === c.id), today), credit: creditByClient.get(c.id) ?? 0 }))
    .filter((r) => r.aging.total > 0 || r.credit > 0)
    .sort((a, b) => b.aging.overdue - a.aging.overdue || b.aging.total - a.aging.total);

  const nextRuns = new Map<string, number>();
  for (const c of clientList) {
    const d = nextBillingDate(c.billing_days, today);
    if (d) nextRuns.set(d, (nextRuns.get(d) ?? 0) + 1);
  }
  const upcoming = [...nextRuns.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(0, 2);

  const soaRows = (soas.data ?? []) as unknown as { id: string; reference: string; billing_date: string; due_on: string; client_id: string; clients: { name: string } | null }[];
  const soaIds = soaRows.map((s) => s.id);
  const { data: soaDues } = soaIds.length
    ? await supabase.from("due_balances").select("soa_id, amount, open_amount").in("soa_id", soaIds)
    : { data: [] as { soa_id: string; amount: string; open_amount: string }[] };
  const soaTotals = new Map<string, { total: number; open: number }>();
  for (const d of soaDues ?? []) {
    const t = soaTotals.get(d.soa_id) ?? { total: 0, open: 0 };
    t.total += Number(d.amount);
    t.open += Number(d.open_amount);
    soaTotals.set(d.soa_id, t);
  }

  const notReadyRows = (notReady.data ?? []) as unknown as { id: string; form: string; period_label: string; due_date: string; status: keyof typeof filingStatusTone; clients: { id: string; name: string } }[];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Receivable" value={all.total} note="Everything clients owe now." />
        <Stat label="Overdue" value={all.overdue} note="Past its due date." tone={all.overdue > 0 ? "blocked" : undefined} />
        <Stat label="Client credits" value={totalCredit} note="Overpayments, used on the next statement." />
        <Stat label="Client tax money held" value={held} note="Received for taxes, not yet remitted to BIR." />
      </div>

      {toVerify.length > 0 && (
        <Card title="Payments to verify" actions={<span className="text-caption-1-regular text-text-tertiary">Proofs of payment uploaded by clients</span>}>
          <ul className="divide-y divide-separator-border text-body-regular">
            {toVerify.map((p) => (
              <li key={p.id}>
                <Link href={`/app/collections/statements/${p.soa_id}`} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5 hover:bg-background-secondary-hover pointer-coarse:min-h-11">
                  <span className="min-w-0">
                    <span className="font-medium text-text-primary">{p.clients?.name}</span>{" "}
                    <span className="tabular-nums text-text-secondary">{p.soas?.reference}</span>
                    <span className="block text-caption-1-regular text-text-tertiary">
                      {p.method === "check" ? "Check" : p.method === "deposit" ? "Bank deposit" : "Transfer"}
                      {p.brand_payment_accounts ? ` to ${p.brand_payment_accounts.institution}` : ""} · paid {showDate(p.paid_on)}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="amount font-medium text-text-primary">{peso.format(Number(p.amount))}</span>
                    <Badge tone="waiting">Pending verification</Badge>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card title="Next billing">
          {upcoming.length === 0 ? (
            <p className="text-body-regular text-text-secondary">No active clients.</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map(([d, n]) => (
                <li key={d} className="flex items-baseline justify-between gap-4">
                  <span className="text-headline-medium text-text-primary">{showDate(d)}</span>
                  <span className="text-body-regular text-text-secondary">{n} client{n === 1 ? "" : "s"} scheduled</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-body-regular text-text-secondary">
            Billing runs by itself early each billing day. A statement is issued only when there is something new on it: the month&apos;s retainer, a reviewed return the firm remits, or a contribution or charge you added.
          </p>
        </Card>
        <Card title="Returns not ready to bill" actions={<span className="text-caption-1-regular text-text-tertiary">Firm-remits clients, due in the next 20 days</span>}>
          {notReadyRows.length === 0 ? (
            <p className="text-body-regular text-text-secondary">Every return due soon is reviewed and ready to bill.</p>
          ) : (
            <ul className="divide-y divide-separator-border text-body-regular">
              {notReadyRows.map((f) => (
                <li key={f.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                  <span className="min-w-0">
                    <Link href={`/app/filings/${f.id}`} className="font-medium text-button-ghost-foreground hover:underline">{f.form}</Link>{" "}
                    <span className="text-text-primary">{f.clients.name}</span>
                    <span className="block text-caption-1-regular text-text-tertiary">{f.period_label} · due {showDate(f.due_date)}</span>
                  </span>
                  <Badge tone={filingStatusTone[f.status]}>{filingStatusLabel[f.status]}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-title-3-semibold text-text-primary">Receivables by client</h2>
        {byClient.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-8 text-center text-body-regular text-text-secondary">No client owes anything right now.</p>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
            <table className="w-full min-w-[56rem] text-body-regular">
              <thead className="border-b border-separator-border bg-background-secondary-default text-start text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="text-start px-4 py-3">Client</th>
                  {AGING_BUCKETS.map((b) => (
                    <th key={b} scope="col" className="px-4 py-3 text-end">{agingLabel[b]}</th>
                  ))}
                  <th scope="col" className="px-4 py-3 text-end">Total open</th>
                  <th scope="col" className="px-4 py-3 text-end">Credit</th>
                </tr>
              </thead>
              <tbody>
                {byClient.map(({ client, aging, credit }) => (
                  <tr key={client.id} className="border-t border-separator-border first:border-t-0 hover:bg-background-secondary-hover">
                    <td className="px-4 py-3">
                      <Link href={`/app/collections/${client.id}`} className="font-medium text-text-primary hover:underline">{client.name}</Link>
                      <p className="text-caption-1-regular text-text-tertiary">{client.code} · billed {describeBillingDays(client.billing_days)}</p>
                    </td>
                    {AGING_BUCKETS.map((b) => (
                      <td key={b} className={`amount px-4 py-3 ${b !== "current" && aging.buckets[b] > 0 ? "font-medium text-text-error-primary" : "text-text-primary"}`}>
                        {aging.buckets[b] ? peso.format(aging.buckets[b]) : "—"}
                      </td>
                    ))}
                    <td className="amount px-4 py-3 font-semibold text-text-primary">{peso.format(aging.total)}</td>
                    <td className="amount px-4 py-3 text-text-secondary">{credit ? peso.format(credit) : "—"}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border-button-default bg-background-secondary-default font-semibold text-text-primary">
                  <td className="px-4 py-3">Total</td>
                  {AGING_BUCKETS.map((b) => (
                    <td key={b} className="amount px-4 py-3">{peso.format(all.buckets[b])}</td>
                  ))}
                  <td className="amount px-4 py-3">{peso.format(all.total)}</td>
                  <td className="amount px-4 py-3">{peso.format(totalCredit)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-title-3-semibold text-text-primary">Recent statements</h2>
        {soaRows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-8 text-center text-body-regular text-text-secondary">No statements yet. The first ones are issued on the next billing day.</p>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
            <table className="w-full min-w-[40rem] text-body-regular">
              <thead className="border-b border-separator-border bg-background-secondary-default text-start text-body-medium text-text-tertiary">
                <tr>
                  <th scope="col" className="text-start px-4 py-3">Reference</th>
                  <th scope="col" className="text-start px-4 py-3">Client</th>
                  <th scope="col" className="text-start px-4 py-3">Billed</th>
                  <th scope="col" className="px-4 py-3 text-end">Amount</th>
                  <th scope="col" className="text-start px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {soaRows.map((s) => {
                  const t = soaTotals.get(s.id) ?? { total: 0, open: 0 };
                  return (
                    <tr key={s.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover first:border-t-0">
                      <td className="px-4 py-3"><Link href={`/app/collections/statements/${s.id}`} className="font-medium tabular-nums text-button-ghost-foreground hover:underline">{s.reference}</Link></td>
                      <td className="px-4 py-3 text-text-primary">{s.clients?.name}</td>
                      <td className="px-4 py-3 tabular-nums text-text-secondary">{showDate(s.billing_date)}</td>
                      <td className="amount px-4 py-3 text-text-primary">{peso.format(t.total)}</td>
                      <td className="px-4 py-3">
                        {t.open <= 0 ? <Badge tone="done">Paid</Badge> : verifying.has(s.id) ? <Badge tone="waiting">Pending verification</Badge> : t.open < t.total ? <Badge tone="waiting">Partly paid</Badge> : s.due_on < today ? <Badge tone="blocked">Overdue</Badge> : <Badge tone="neutral">Due {showDate(s.due_on)}</Badge>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, note, tone }: { label: string; value: number; note: string; tone?: "blocked" }) {
  return (
    <Card>
      <p className="text-body-medium text-text-secondary">{label}</p>
      <p className={`mt-2 text-title-1-semibold tabular-nums ${tone === "blocked" ? "text-text-error-primary" : "text-text-primary"}`}>{peso.format(value)}</p>
      <p className="mt-2 text-body-regular text-text-secondary">{note}</p>
    </Card>
  );
}
