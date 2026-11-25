import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { ageOpenItems, dueKindLabel, methodLabel, readyReasonLabel, toCents, totalHeld, type DepositMethod, type DueKind, type ReadyItem, type RemittanceItem } from "@/lib/collections/collections";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { AddChargeForm, ApplyCreditButton, RecordDepositForm, RemittedForm, RunBillingForm, VoidDepositForm, WaiveDueForm } from "../forms";

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
  const { data: client } = await supabase.from("clients").select("id, name, code, payment_mode, brand_id").eq("id", clientId).maybeSingle();
  if (!client) notFound();

  const [ready, dues, deposits, soas, accounts, staff, remittance] = await Promise.all([
    // Decision 16c: what a billing run would bill for this client today.
    supabase.rpc("ready_to_bill", { p_date: today }).eq("client_id", clientId),
    supabase.from("due_balances").select("id, soa_id, kind, description, due_on, amount, paid, open_amount, waived_at, waive_reason").eq("client_id", clientId).order("due_on").order("created_at"),
    supabase.from("deposit_balances").select("id, received_on, amount, allocated, unallocated, method, reference, bir_invoice_number, note, voided_at, void_reason, payment_account_id, deposited_by").eq("client_id", clientId).order("received_on", { ascending: false }),
    supabase.from("soas").select("id, reference, billing_date, due_on").eq("client_id", clientId).order("billing_date", { ascending: false }),
    supabase.from("brand_payment_accounts").select("id, institution, account_number, purpose, active").eq("brand_id", client.brand_id).order("sort_order").order("institution"),
    supabase.from("staff_profiles").select("user_id, full_name").eq("active", true).order("full_name"),
    supabase
      .from("remittance_items")
      .select("due_id, kind, description, due_on, received, remitted, remitted_on, remit_reference, held")
      .eq("client_id", clientId)
      .order("due_on", { ascending: false }),
  ]);

  const allDues = (dues.data ?? []) as Due[];
  const open = allDues.filter((d) => Number(d.open_amount) > 0);
  const unbilled = open.filter((d) => !d.soa_id);
  const aging = ageOpenItems(open, today);
  const deps = (deposits.data ?? []) as Deposit[];
  const credit = deps.reduce((s, d) => s + Number(d.unallocated), 0);
  const accountLabel = new Map((accounts.data ?? []).map((a) => [a.id, `${a.institution} ${maskNumber(a.account_number)}${a.purpose === "client_tax_funds" ? " (tax funds)" : ""}`]));
  const staffName = new Map((staff.data ?? []).map((s) => [s.user_id, s.full_name]));
  const readyItems = (ready.data ?? []) as ReadyItem[];
  const readyTotal = readyItems.reduce((sum, i) => sum + toCents(i.amount), 0) / 100;
  // Decision 16: tax and contribution items with money received, newest first; held until remitted.
  const remitItems = ((remittance.data ?? []) as RemittanceItem[]).filter((r) => Number(r.received) > 0 || (r.kind === "contribution" && r.remitted));
  const held = totalHeld(remitItems.map((r) => ({ client_id: clientId, held: r.held }))).total;

  return (
    <>
      <PageHeader
        title={client.name}
        description={
          <>
            {client.code} · {client.payment_mode === "firm_remits" ? "We remit this client's taxes, so returns are billed once the client approves them (or two days before the deadline)." : "The client pays BIR directly; we bill fees and charges only."}{" "}
            <Link href={`/app/clients/${client.id}`} className="text-button-ghost-foreground hover:underline">Client details</Link>
          </>
        }
        actions={<RunBillingForm clientId={client.id} today={today} />}
      />
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <p className="text-body-medium text-text-secondary">Owes now</p>
            <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{peso.format(aging.total)}</p>
            <p className={`mt-2 text-body-regular ${aging.overdue > 0 ? "font-medium text-text-error-primary" : "text-text-secondary"}`}>{aging.overdue > 0 ? `${peso.format(aging.overdue)} overdue` : "Nothing overdue."}</p>
          </Card>
          <Card>
            <p className="text-body-medium text-text-secondary">Credit</p>
            <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{peso.format(credit)}</p>
            <div className="mt-2">{credit > 0 && open.length > 0 ? <ApplyCreditButton clientId={client.id} /> : <p className="text-body-regular text-text-secondary">Overpayments are used on the next statement.</p>}</div>
          </Card>
          <Card>
            <p className="text-body-medium text-text-secondary">Cash for remittance</p>
            <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{peso.format(held)}</p>
            <p className="mt-2 text-body-regular text-text-secondary">Tax and contribution money received, not yet remitted.</p>
          </Card>
          <Card>
            <p className="text-body-medium text-text-secondary">Ready to bill</p>
            <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{peso.format(readyTotal)}</p>
            {readyItems.length === 0 ? (
              <p className="mt-2 text-body-regular text-text-secondary">Nothing to bill today.</p>
            ) : (
              <ul className="mt-2 space-y-0.5 text-body-regular text-text-secondary">
                {readyItems.map((i) => (
                  <li key={`${i.kind}-${i.filing_instance_id ?? i.due_id ?? i.description}`}>
                    {i.description}
                    {i.kind === "tax" ? ` · ${readyReasonLabel(i)}` : ""}
                  </li>
                ))}
              </ul>
            )}
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
                <p className="mt-4 text-body-regular text-text-secondary">
                  Waiting for the next statement: {unbilled.map((d) => d.description).join("; ")}.
                </p>
              )}
            </Card>
          </div>
        </div>

        <section>
          <h2 className="mb-3 text-title-3-semibold text-text-primary">Items billed</h2>
          {allDues.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-8 text-center text-body-regular text-text-secondary">Nothing billed yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
              <table className="w-full min-w-[48rem] text-body-regular">
                <thead className="border-b border-separator-border bg-background-secondary-default text-start text-body-medium text-text-tertiary">
                  <tr>
                    <th scope="col" className="text-start px-4 py-3">Item</th>
                    <th scope="col" className="text-start px-4 py-3">Due</th>
                    <th scope="col" className="px-4 py-3 text-end">Amount</th>
                    <th scope="col" className="px-4 py-3 text-end">Paid</th>
                    <th scope="col" className="px-4 py-3 text-end">Open</th>
                    <th scope="col" className="text-start px-4 py-3">Status</th>
                    <th scope="col" className="text-start px-4 py-3"><span className="sr-only">Waive</span></th>
                  </tr>
                </thead>
                <tbody>
                  {[...allDues].reverse().map((d) => {
                    const openAmt = Number(d.open_amount);
                    return (
                      <tr key={d.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover align-top first:border-t-0">
                        <td className="px-4 py-3">
                          <p className="text-text-primary">{d.description}</p>
                          <p className="text-caption-1-regular text-text-tertiary">{dueKindLabel[d.kind]}{d.waive_reason ? ` · waived: ${d.waive_reason}` : ""}</p>
                        </td>
                        <td className="px-4 py-3 tabular-nums text-text-secondary">{showDate(d.due_on)}</td>
                        <td className="amount px-4 py-3 text-text-primary">{peso.format(Number(d.amount))}</td>
                        <td className="amount px-4 py-3 text-text-secondary">{Number(d.paid) ? peso.format(Number(d.paid)) : "—"}</td>
                        <td className="amount px-4 py-3 font-medium text-text-primary">{peso.format(openAmt)}</td>
                        <td className="px-4 py-3">
                          {d.waived_at ? <Badge tone="neutral">Waived</Badge> : openAmt <= 0 ? <Badge tone="done">Paid</Badge> : d.due_on < today ? <Badge tone="blocked">Overdue</Badge> : Number(d.paid) > 0 ? <Badge tone="waiting">Partly paid</Badge> : <Badge tone="neutral">{d.soa_id ? "Billed" : "Not billed yet"}</Badge>}
                        </td>
                        <td className="px-4 py-3 text-end">{openAmt > 0 && <WaiveDueForm clientId={client.id} dueId={d.id} />}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {remitItems.length > 0 && (
          <section id="remittance" className="scroll-mt-6">
            <h2 className="mb-1 text-title-3-semibold text-text-primary">Cash for remittance</h2>
            <p className="mb-3 text-body-regular text-text-secondary">
              Money the client paid for taxes and contributions is held for them until it is remitted: a return when it is Filed &amp; paid, a contribution when you mark it remitted.
            </p>
            <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
              <table className="w-full min-w-[48rem] text-body-regular">
                <thead className="border-b border-separator-border bg-background-secondary-default text-body-medium text-text-tertiary">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-start">Item</th>
                    <th scope="col" className="px-4 py-3 text-end">Received</th>
                    <th scope="col" className="px-4 py-3 text-end">Held</th>
                    <th scope="col" className="px-4 py-3 text-start">Remitted</th>
                  </tr>
                </thead>
                <tbody>
                  {remitItems.map((r) => (
                    <tr key={r.due_id} className="border-t border-separator-border align-top first:border-t-0">
                      <td className="px-4 py-3">
                        <p className="text-text-primary">{r.description}</p>
                        <p className="text-caption-1-regular text-text-tertiary">{dueKindLabel[r.kind]} · due {showDate(r.due_on)}</p>
                      </td>
                      <td className="amount px-4 py-3 text-text-secondary">{peso.format(Number(r.received))}</td>
                      <td className="amount px-4 py-3 font-medium text-text-primary">{Number(r.held) ? peso.format(Number(r.held)) : "—"}</td>
                      <td className="space-y-1 px-4 py-3">
                        {r.remitted ? (
                          <p className="text-text-primary">
                            <Badge tone="done">Remitted</Badge>{" "}
                            <span className="tabular-nums text-text-secondary">
                              {r.remitted_on ? showDate(r.remitted_on) : ""}
                              {r.remit_reference ? ` · ${r.remit_reference}` : ""}
                            </span>
                          </p>
                        ) : r.kind === "tax" ? (
                          <p className="text-text-secondary">When the return is Filed &amp; paid</p>
                        ) : null}
                        {r.kind === "contribution" && <RemittedForm clientId={client.id} dueId={r.due_id} today={today} remitted={r.remitted} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border-button-default bg-background-secondary-default font-semibold text-text-primary">
                    <td className="px-4 py-3">Total held</td>
                    <td />
                    <td className="amount px-4 py-3">{peso.format(held)}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Payments Received">
            {deps.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No payments recorded yet.</p>
            ) : (
              <ul className="divide-y divide-separator-border text-body-regular">
                {deps.map((d) => (
                  <li key={d.id} className="space-y-1 py-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className={`tabular-nums font-medium ${d.voided_at ? "text-text-tertiary line-through" : "text-text-primary"}`}>{peso.format(Number(d.amount))}</span>
                      <span className="tabular-nums text-text-secondary">{showDate(d.received_on)}</span>
                    </div>
                    <p className="text-caption-1-regular text-text-tertiary">
                      {methodLabel[d.method]}
                      {d.reference ? ` · ${d.method === "check" ? "check" : "ref."} ${d.reference}` : ""}
                      {d.payment_account_id ? ` · into ${accountLabel.get(d.payment_account_id) ?? "firm account"}` : ""}
                      {d.deposited_by ? ` · deposited by ${staffName.get(d.deposited_by) ?? "staff"}` : ""}
                      {d.bir_invoice_number ? ` · BIR invoice ${d.bir_invoice_number}` : ""}
                    </p>
                    {d.note && <p className="text-caption-1-regular text-text-secondary">{d.note}</p>}
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
              <p className="text-body-regular text-text-secondary">No statements yet.</p>
            ) : (
              <ul className="divide-y divide-separator-border text-body-regular">
                {(soas.data ?? []).map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-4 py-2.5">
                    <Link href={`/app/collections/statements/${s.id}`} className="font-medium tabular-nums text-button-ghost-foreground hover:underline">{s.reference}</Link>
                    <span className="tabular-nums text-text-secondary">{showDate(s.billing_date)}</span>
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
