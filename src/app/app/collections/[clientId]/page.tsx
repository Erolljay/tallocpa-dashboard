import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { ageOpenItems, describeBillingDays, dueKindLabel, methodLabel, nextBillingDate, type DepositMethod, type DueKind } from "@/lib/collections/collections";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { AddChargeForm, ApplyCreditButton, BillingDaysForm, RecordDepositForm, RunBillingForm, VoidDepositForm, WaiveDueForm } from "../forms";

export default function ClientCollectionsPage(props: PageProps<"/app/collections/[clientId]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Detail params={props.params} />
    </Suspense>
  );
}

interface Due {
  id: string;
  soa_id: string | null;
  kind: DueKind;
  description: string;
  due_on: string;
  amount: string;
  paid: string;
  open_amount: string;
  waived_at: string | null;
  waive_reason: string | null;
}

interface Deposit {
  id: string;
  received_on: string;
  amount: string;
  allocated: string;
  unallocated: string;
  method: DepositMethod;
  reference: string | null;
  bir_invoice_number: string | null;
  note: string | null;
  voided_at: string | null;
  void_reason: string | null;
  payment_account_id: string | null;
  deposited_by: string | null;
}

async function Detail({ params }: Pick<PageProps<"/app/collections/[clientId]">, "params">) {
  const { clientId } = await params;
  await requireOwner();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const { data: client } = await supabase.from("clients").select("id, name, code, billing_days, payment_mode, brand_id").eq("id", clientId).maybeSingle();
  if (!client) notFound();

  const [dues, deposits, soas, accounts, staff] = await Promise.all([
    supabase.from("due_balances").select("id, soa_id, kind, description, due_on, amount, paid, open_amount, waived_at, waive_reason").eq("client_id", clientId).order("due_on").order("created_at"),
    supabase.from("deposit_balances").select("id, received_on, amount, allocated, unallocated, method, reference, bir_invoice_number, note, voided_at, void_reason, payment_account_id, deposited_by").eq("client_id", clientId).order("received_on", { ascending: false }),
    supabase.from("soas").select("id, reference, billing_date, due_on").eq("client_id", clientId).order("billing_date", { ascending: false }),
    supabase.from("brand_payment_accounts").select("id, institution, account_number, purpose, active").eq("brand_id", client.brand_id).order("sort_order").order("institution"),
    supabase.from("staff_profiles").select("user_id, full_name").eq("active", true).order("full_name"),
  ]);

  const allDues = (dues.data ?? []) as Due[];
  const open = allDues.filter((d) => Number(d.open_amount) > 0);
  const unbilled = open.filter((d) => !d.soa_id);
  const aging = ageOpenItems(open, today);
  const deps = (deposits.data ?? []) as Deposit[];
  const credit = deps.reduce((s, d) => s + Number(d.unallocated), 0);
  const accountLabel = new Map((accounts.data ?? []).map((a) => [a.id, `${a.institution} ${maskNumber(a.account_number)}${a.purpose === "client_tax_funds" ? " (tax funds)" : ""}`]));
  const staffName = new Map((staff.data ?? []).map((s) => [s.user_id, s.full_name]));
  const next = nextBillingDate(client.billing_days, today);

  return (
    <>
      <PageHeader
        title={client.name}
        description={
          <>
            {client.code} · {client.payment_mode === "firm_remits" ? "We remit this client's taxes, so reviewed returns are billed." : "The client pays BIR directly; we bill fees and charges only."}{" "}
            <Link href={`/app/clients/${client.id}`} className="text-link hover:underline">Client details</Link>
          </>
        }
        actions={<RunBillingForm clientId={client.id} today={today} />}
      />
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-sm font-medium text-ink-muted">Owes now</p>
            <p className="mt-2 text-[28px] leading-none font-semibold tracking-tight tabular-nums text-ink-heading">{peso.format(aging.total)}</p>
            <p className={`mt-2 text-sm ${aging.overdue > 0 ? "font-medium text-danger-text" : "text-ink-muted"}`}>{aging.overdue > 0 ? `${peso.format(aging.overdue)} overdue` : "Nothing overdue."}</p>
          </Card>
          <Card>
            <p className="text-sm font-medium text-ink-muted">Credit</p>
            <p className="mt-2 text-[28px] leading-none font-semibold tracking-tight tabular-nums text-ink-heading">{peso.format(credit)}</p>
            <div className="mt-2">{credit > 0 && open.length > 0 ? <ApplyCreditButton clientId={client.id} /> : <p className="text-sm text-ink-muted">Overpayments are used on the next statement.</p>}</div>
          </Card>
          <Card>
            <p className="text-sm font-medium text-ink-muted">Billed on the {describeBillingDays(client.billing_days)}</p>
            <p className="mt-2 text-[28px] leading-none font-semibold tracking-tight tabular-nums text-ink-heading">{next ? showDate(next) : "—"}</p>
            <p className="mt-2 text-sm text-ink-muted">Next billing run.</p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card title="Record a Payment">
            <RecordDepositForm
              clientId={client.id}
              today={today}
              items={open.map((d) => ({ id: d.id, description: d.description, due_on: d.due_on, open_amount: Number(d.open_amount) }))}
              accounts={(accounts.data ?? []).filter((a) => a.active).map((a) => ({ id: a.id, label: accountLabel.get(a.id) ?? a.institution }))}
              staff={(staff.data ?? []).map((s) => ({ id: s.user_id, name: s.full_name }))}
            />
          </Card>
          <div className="space-y-6">
            <Card title="Add a Contribution or Charge">
              <AddChargeForm clientId={client.id} today={today} />
              {unbilled.length > 0 && (
                <p className="mt-4 text-sm text-ink-muted">
                  Waiting for the next statement: {unbilled.map((d) => d.description).join("; ")}.
                </p>
              )}
            </Card>
            <Card title="Billing Days">
              <BillingDaysForm clientId={client.id} days={client.billing_days} />
            </Card>
          </div>
        </div>

        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-ink-heading">Items billed</h2>
          {allDues.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border-strong bg-surface p-8 text-center text-sm text-ink-muted">Nothing billed yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
              <table className="w-full min-w-[48rem] text-sm">
                <thead className="border-b border-border bg-surface-muted text-left text-xs text-ink-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Item</th>
                    <th scope="col" className="px-4 py-3 font-medium">Due</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">Amount</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">Paid</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">Open</th>
                    <th scope="col" className="px-4 py-3 font-medium">Status</th>
                    <th scope="col" className="px-4 py-3"><span className="sr-only">Waive</span></th>
                  </tr>
                </thead>
                <tbody>
                  {[...allDues].reverse().map((d) => {
                    const openAmt = Number(d.open_amount);
                    return (
                      <tr key={d.id} className="border-t border-border align-top first:border-t-0">
                        <td className="px-4 py-3">
                          <p className="text-ink-heading">{d.description}</p>
                          <p className="text-xs text-ink-subtle">{dueKindLabel[d.kind]}{d.waive_reason ? ` · waived: ${d.waive_reason}` : ""}</p>
                        </td>
                        <td className="px-4 py-3 tabular-nums text-ink-muted">{showDate(d.due_on)}</td>
                        <td className="amount px-4 py-3 text-ink">{peso.format(Number(d.amount))}</td>
                        <td className="amount px-4 py-3 text-ink-muted">{Number(d.paid) ? peso.format(Number(d.paid)) : "—"}</td>
                        <td className="amount px-4 py-3 font-medium text-ink-heading">{peso.format(openAmt)}</td>
                        <td className="px-4 py-3">
                          {d.waived_at ? <Badge tone="neutral">Waived</Badge> : openAmt <= 0 ? <Badge tone="done">Paid</Badge> : d.due_on < today ? <Badge tone="blocked">Overdue</Badge> : Number(d.paid) > 0 ? <Badge tone="waiting">Partly paid</Badge> : <Badge tone="neutral">{d.soa_id ? "Billed" : "Not billed yet"}</Badge>}
                        </td>
                        <td className="px-4 py-3 text-right">{openAmt > 0 && <WaiveDueForm clientId={client.id} dueId={d.id} />}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Payments Received">
            {deps.length === 0 ? (
              <p className="text-sm text-ink-muted">No payments recorded yet.</p>
            ) : (
              <ul className="divide-y divide-border text-sm">
                {deps.map((d) => (
                  <li key={d.id} className="space-y-1 py-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className={`tabular-nums font-medium ${d.voided_at ? "text-ink-subtle line-through" : "text-ink-heading"}`}>{peso.format(Number(d.amount))}</span>
                      <span className="tabular-nums text-ink-muted">{showDate(d.received_on)}</span>
                    </div>
                    <p className="text-xs text-ink-subtle">
                      {methodLabel[d.method]}
                      {d.reference ? ` · ${d.method === "check" ? "check" : "ref."} ${d.reference}` : ""}
                      {d.payment_account_id ? ` · into ${accountLabel.get(d.payment_account_id) ?? "firm account"}` : ""}
                      {d.deposited_by ? ` · deposited by ${staffName.get(d.deposited_by) ?? "staff"}` : ""}
                      {d.bir_invoice_number ? ` · BIR invoice ${d.bir_invoice_number}` : ""}
                    </p>
                    {d.note && <p className="text-xs text-ink-muted">{d.note}</p>}
                    {d.voided_at ? (
                      <Badge tone="neutral">Voided: {d.void_reason}</Badge>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        {Number(d.unallocated) > 0 ? <Badge tone="progress">{peso.format(Number(d.unallocated))} unused credit</Badge> : <span />}
                        <VoidDepositForm clientId={client.id} depositId={d.id} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card title="Statements">
            {(soas.data ?? []).length === 0 ? (
              <p className="text-sm text-ink-muted">No statements yet.</p>
            ) : (
              <ul className="divide-y divide-border text-sm">
                {(soas.data ?? []).map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-4 py-2.5">
                    <Link href={`/app/collections/statements/${s.id}`} className="font-medium tabular-nums text-link hover:underline">{s.reference}</Link>
                    <span className="tabular-nums text-ink-muted">{showDate(s.billing_date)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

function maskNumber(n: string) {
  const digits = n.replace(/\s/g, "");
  return digits.length > 4 ? `····${digits.slice(-4)}` : digits;
}
