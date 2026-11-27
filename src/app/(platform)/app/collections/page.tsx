import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { currentClientStatuses } from "@/lib/clients/labels";
import { ageOpenItems, AGING_BUCKETS, agingLabel, groupReady, readyReasonLabel, totalHeld, type ReadyItem } from "@/lib/collections/collections";
import { addDays } from "@/lib/deadlines/dates";
import { showMonth } from "@/lib/documents/labels";
import { filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { LateSurchargeActions, RunReadyButton } from "./forms";

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        title="Collections"
        description="What is ready to bill, what each client owes, and what they have paid."
        actions={<LinkButton href="/app/collections/new">New Bill</LinkButton>}
      />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Overview />
      </Suspense>
    </>
  );
}

interface OpenDue { client_id: string; due_on: string; open_amount: string; kind: string; soa_id: string | null }
interface Client { id: string; name: string; code: string; payment_mode: string; status: string }

async function Overview() {
  await requireOwner();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const [ready, dues, credits, clients, remittance, notReady, soas, proofs, surcharges] = await Promise.all([
    // Decision 16c: the Owner runs billing; this is what a run would bill today.
    supabase.rpc("ready_to_bill", { p_date: today }),
    supabase.from("due_balances").select("client_id, due_on, open_amount, kind, soa_id").gt("open_amount", 0),
    supabase.from("deposit_balances").select("client_id, unallocated").gt("unallocated", 0),
    // Every client, so balances left by inactive and archived ones can be noted below.
    supabase.from("clients").select("id, name, code, payment_mode, status").order("name"),
    supabase.rpc("cash_for_remittance"),
    supabase
      .from("filing_instances")
      .select("id, form, period_label, due_date, status, clients!inner(id, name, payment_mode)")
      .eq("clients.payment_mode", "firm_remits")
      .in("clients.status", currentClientStatuses)
      .in("status", ["not_started", "prepared", "reviewed"])
      .or("tax_due.is.null,tax_due.gt.0")
      .gte("due_date", today)
      .lte("due_date", addDays(today, 20))
      .order("due_date"),
    supabase.from("soas").select("id, reference, billing_date, due_on, client_id, clients!inner(name)").in("clients.status", currentClientStatuses).order("billing_date", { ascending: false }).order("reference").limit(15),
    supabase
      .from("payment_proofs")
      .select("id, soa_id, amount, paid_on, method, submitted_at, soas(reference), clients(name), brand_payment_accounts(institution)")
      .eq("status", "for_verification")
      .order("submitted_at"),
    // Late-submission surcharges waiting for the Owner (fee schedule's late_surcharge_auto off).
    supabase.from("late_surcharges").select("id, client_id, month, amount, clients(name, code)").eq("status", "pending").order("month").order("created_at"),
  ]);
  // Inactive and archived clients are left out of this page, as on Home, Filings and
  // Documents, except: payments they sent still wait here for verification, and cash
  // held for remittance stays in its total (it is owed to the BIR either way).
  const everyClient = (clients.data ?? []) as Client[];
  const isCurrent = new Set(everyClient.filter((c) => currentClientStatuses.includes(c.status)).map((c) => c.id));
  const current = <T extends { client_id: string }>(rows: T[]) => rows.filter((r) => isCurrent.has(r.client_id));
  const pendingSurcharges = current((surcharges.data ?? []) as unknown as { id: string; client_id: string; month: string; amount: string; clients: { name: string; code: string } | null }[]);
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

  const everyDue = (dues.data ?? []) as OpenDue[];
  const open = current(everyDue);
  const all = ageOpenItems(open, today);
  // What inactive and archived clients still owe, so it is not lost from sight.
  const formerOwing = everyClient
    .filter((c) => !isCurrent.has(c.id))
    .map((c) => ({ client: c, owed: everyDue.filter((d) => d.client_id === c.id).reduce((sum, d) => sum + Number(d.open_amount), 0) }))
    .filter((r) => r.owed > 0);
  const creditByClient = new Map<string, number>();
  for (const c of current((credits.data ?? []) as { client_id: string; unallocated: string }[])) creditByClient.set(c.client_id, (creditByClient.get(c.client_id) ?? 0) + Number(c.unallocated));
  const totalCredit = [...creditByClient.values()].reduce((a, b) => a + b, 0);
  // Decision 16: tax and contribution money received from clients is cash for
  // remittance (held for them, not earned) until the return is Filed & paid or the
  // contribution is remitted.
  const remitRows = (remittance.data ?? []) as { client_id: string; held: string }[];
  const held = totalHeld(remitRows);

  const clientList = everyClient.filter((c) => isCurrent.has(c.id));
  const byClient = clientList
    .map((c) => ({ client: c, aging: ageOpenItems(open.filter((d) => d.client_id === c.id), today), credit: creditByClient.get(c.id) ?? 0 }))
    .filter((r) => r.aging.total > 0 || r.credit > 0)
    .sort((a, b) => b.aging.overdue - a.aging.overdue || b.aging.total - a.aging.total);

  const readyClients = groupReady(current((ready.data ?? []) as ReadyItem[]));
  const readyTotal = readyClients.reduce((sum, c) => sum + Math.round(c.total * 100), 0) / 100;

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

  // A reviewed return two days or less from its deadline is in Ready to bill instead.
  const readySoon = addDays(today, 2);
  const notReadyRows = ((notReady.data ?? []) as unknown as { id: string; form: string; period_label: string; due_date: string; status: keyof typeof filingStatusTone; clients: { id: string; name: string } }[]).filter(
    (f) => !(f.status === "reviewed" && f.due_date <= readySoon),
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Receivable" value={all.total} note="Everything clients owe now." />
        <Stat label="Overdue" value={all.overdue} note="Past its due date." tone={all.overdue > 0 ? "blocked" : undefined} />
        <Stat label="Client credits" value={totalCredit} note="Overpayments, used on the next statement." />
        <Stat label="Cash for remittance" value={held.total} note="Tax and contribution money received, not yet remitted." />
      </div>

      {formerOwing.length > 0 && (
        <Notice tone="waiting">
          Not counted above: inactive or archived clients still owe{" "}
          {formerOwing.map(({ client, owed }, i) => (
            <span key={client.id}>
              {i > 0 && ", "}
              <Link href={`/app/collections/${client.id}`} className="text-body-medium underline">{client.name}</Link> <span className="amount">{peso.format(owed)}</span>
            </span>
          ))}
          .
        </Notice>
      )}

      <Card
        title="Ready to bill"
        actions={readyClients.length > 1 ? <RunReadyButton clientId={null} label="Run Billing for All Ready" variant="primary" /> : undefined}
      >
        {ready.error ? (
          <p className="text-body-regular text-text-error-primary">Could not load Ready to bill: {ready.error.message}</p>
        ) : readyClients.length === 0 ? (
          <p className="text-body-regular text-text-secondary">Nothing to bill today. Returns appear here once the client approves them, or two days before the BIR deadline if still waiting; retainers from the 1st of the month.</p>
        ) : (
          <>
            <p className="mb-3 text-body-regular text-text-secondary">
              {readyClients.length} client{readyClients.length === 1 ? "" : "s"}, {peso.format(readyTotal)} in all. Nothing is billed until you run billing; each run issues one statement per client, with every month&apos;s retainer not yet billed, each as its own item.
            </p>
            <ul className="divide-y divide-separator-border">
              {readyClients.map((c) => (
                <li key={c.id} className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <Link href={`/app/collections/${c.id}`} className="text-body-medium text-text-primary hover:underline">{c.name}</Link>
                      <span className="text-caption-1-regular text-text-tertiary">{c.code}</span>
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {c.items.map((i) => (
                        <li key={`${i.kind}-${i.filing_instance_id ?? i.due_id ?? i.description}`} className="flex items-center justify-between gap-3 text-body-regular">
                          <span className="flex min-w-0 flex-wrap items-center gap-2">
                            <span className="text-text-secondary">{i.description}</span>
                            {i.kind === "tax" && <Badge tone={i.reason === "client_approved" ? "done" : "waiting"}>{readyReasonLabel(i)}</Badge>}
                            {i.reason === "retainer_unbilled" && <Badge tone="waiting">{readyReasonLabel(i)}</Badge>}
                          </span>
                          <span className="amount shrink-0 text-text-primary">{peso.format(Number(i.amount))}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2 sm:w-44">
                    <span className="amount text-body-medium text-text-primary">{peso.format(c.total)}</span>
                    <RunReadyButton clientId={c.id} label="Run Billing" variant={readyClients.length === 1 ? "primary" : "secondary"} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      {pendingSurcharges.length > 0 && (
        <Card title="Late-submission surcharges to approve" actions={<span className="text-caption-1-regular text-text-tertiary">Documents sent after the cutoff</span>}>
          <p className="mb-3 text-body-regular text-text-secondary">Approve to put the surcharge in Ready to bill, or waive it with a reason. One per client per month.</p>
          <ul className="divide-y divide-separator-border text-body-regular">
            {pendingSurcharges.map((s) => (
              <li key={s.id} className="flex flex-col gap-2 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between">
                <span className="min-w-0">
                  <Link href={`/app/collections/${s.client_id}`} className="text-body-medium text-text-primary hover:underline">{s.clients?.name}</Link>{" "}
                  <span className="text-caption-1-regular text-text-tertiary">{s.clients?.code}</span>
                  <span className="block text-text-secondary">Late-submission surcharge — {showMonth(s.month)}</span>
                </span>
                <span className="flex shrink-0 items-start gap-4">
                  <span className="amount text-body-medium text-text-primary">{peso.format(Number(s.amount))}</span>
                  <LateSurchargeActions clientId={s.client_id} surchargeId={s.id} />
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

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

      <Card title="Returns not ready to bill" actions={<span className="text-caption-1-regular text-text-tertiary">Firm-remits clients, due in the next 20 days</span>}>
        {notReadyRows.length === 0 ? (
          <p className="text-body-regular text-text-secondary">Every return due soon is approved by the client or ready to bill.</p>
        ) : (
          <ul className="divide-y divide-separator-border text-body-regular">
            {notReadyRows.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                <span className="min-w-0">
                  <Link href={`/app/filings/${f.id}`} className="font-medium text-button-ghost-foreground hover:underline">{f.form}</Link>{" "}
                  <span className="text-text-primary">{f.clients.name}</span>
                  <span className="block text-caption-1-regular text-text-tertiary">{f.period_label} · due {showDate(f.due_date)}</span>
                </span>
                <Badge tone={filingStatusTone[f.status]}>{f.status === "reviewed" ? "Waiting for the client" : filingStatusLabel[f.status]}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {held.total > 0 && (
        <Card title="Cash for remittance" actions={<span className="text-caption-1-regular text-text-tertiary">Held until the return is Filed &amp; paid or the contribution is remitted</span>}>
          <ul className="divide-y divide-separator-border text-body-regular">
            {clientList
              .filter((c) => (held.byClient.get(c.id) ?? 0) > 0)
              .sort((a, b) => (held.byClient.get(b.id) ?? 0) - (held.byClient.get(a.id) ?? 0))
              .map((c) => (
                <li key={c.id}>
                  <Link href={`/app/collections/${c.id}#remittance`} className="flex items-center justify-between gap-4 py-2.5 hover:bg-background-secondary-hover pointer-coarse:min-h-11">
                    <span className="min-w-0">
                      <span className="text-body-medium text-text-primary">{c.name}</span>{" "}
                      <span className="text-caption-1-regular text-text-tertiary">{c.code}</span>
                    </span>
                    <span className="amount text-body-medium text-text-primary">{peso.format(held.byClient.get(c.id) ?? 0)}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </Card>
      )}

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
                      <p className="text-caption-1-regular text-text-tertiary">{client.code}</p>
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
          <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-8 text-center text-body-regular text-text-secondary">No statements yet. Run billing from Ready to bill to issue the first ones.</p>
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
      <p className={cx("mt-2 text-title-1-semibold tabular-nums", tone === "blocked" ? "text-text-error-primary" : "text-text-primary")}>{peso.format(value)}</p>
      <p className="mt-2 text-body-regular text-text-secondary">{note}</p>
    </Card>
  );
}
