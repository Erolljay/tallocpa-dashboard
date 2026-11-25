import Link from "next/link";
import { Suspense } from "react";
import { RiArrowRightSLine } from "@remixicon/react";
import { Badge, Card, peso, Skeleton } from "@/components/ui";
import { PaymentsList } from "@/components/statement/payments-list";
import { StatementView } from "@/components/statement/statement-view";
import { loadPayments, loadStatement } from "@/lib/collections/statement";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { portalContext } from "../client-context";

/**
 * Portal Billing (rework decision 17): the current statement with its items and
 * balance; Pay, where the client chooses a bank or e-wallet, sees only its QR
 * and account details and uploads the proof; their payments, each Pending
 * verification, Verified (with the items it paid) or Rejected (with the
 * reason); and the previous statements.
 */
export default function PortalBilling() {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Billing />
    </Suspense>
  );
}

const statementHref = (id: string) => `/portal/billing/${id}`;

async function Billing() {
  const { supabase, clients } = await portalContext();
  const today = manilaToday();
  const ids = clients.map((c) => c.id);
  const { data: soas } = ids.length
    ? await supabase.from("soas").select("id, reference, billing_date, due_on, client_id").in("client_id", ids).order("billing_date", { ascending: false }).limit(60)
    : { data: [] };
  const rows = soas ?? [];
  if (rows.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-title-1-medium text-text-primary">Billing</h1>
        <p className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">No statements yet. Your first statement appears here once we bill you for the month.</p>
      </div>
    );
  }

  const soaIds = rows.map((r) => r.id);
  const [{ data: dues }, { data: pending }] = await Promise.all([
    supabase.from("due_balances").select("soa_id, open_amount").in("soa_id", soaIds),
    supabase.from("payment_proofs").select("soa_id").in("soa_id", soaIds).eq("status", "for_verification"),
  ]);
  const verifying = new Set((pending ?? []).map((p) => p.soa_id as string));
  const openBySoa = new Map<string, number>();
  for (const d of dues ?? []) openBySoa.set(d.soa_id, (openBySoa.get(d.soa_id) ?? 0) + Number(d.open_amount));

  // One current statement per business, the latest; the rest are previous statements.
  const businesses = clients
    .map((c) => ({ client: c, statements: rows.filter((r) => r.client_id === c.id) }))
    .filter((b) => b.statements.length > 0);
  const loaded = await Promise.all(
    businesses.map(async (b) => ({
      ...b,
      current: await loadStatement(supabase, b.statements[0].id),
      payments: await loadPayments(supabase, { clientIds: [b.client.id] }),
    })),
  );
  const several = loaded.length > 1;

  return (
    <div className="space-y-10">
      <h1 className="text-title-1-medium text-text-primary">Billing</h1>
      {loaded.map(({ client, current, payments, statements }) => (
        <div key={client.id} className="space-y-6">
          {several && <h2 className="text-title-2-medium text-text-primary">{client.name}</h2>}
          {current && <StatementView s={current} today={today} payments={false} />}

          <Card title="Your payments" className="print:hidden">
            {payments.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No payments sent yet. After you pay, upload your proof of payment above and it appears here.</p>
            ) : (
              <PaymentsList proofs={payments} statementHref={statementHref} />
            )}
          </Card>

          {statements.length > 1 && (
            <section className="space-y-3 print:hidden" aria-labelledby={`previous-${client.id}`}>
              <h2 id={`previous-${client.id}`} className="text-title-3-semibold text-text-primary">Previous statements</h2>
              <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular">
                {statements.slice(1).map((r) => {
                  const open = openBySoa.get(r.id) ?? 0;
                  return (
                    <li key={r.id}>
                      <Link
                        href={statementHref(r.id)}
                        className="flex items-center gap-3 px-4 py-3 outline-none first:rounded-t-3xl last:rounded-b-3xl hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-14"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-body-medium tabular-nums text-text-primary">{r.reference}</span>
                          <span className="block text-caption-1-regular text-text-secondary">{showDate(r.billing_date)}</span>
                        </span>
                        {open <= 0 ? (
                          <Badge tone="done">Paid</Badge>
                        ) : verifying.has(r.id) ? (
                          <Badge tone="waiting">Pending verification</Badge>
                        ) : r.due_on < today ? (
                          <Badge tone="blocked">{peso.format(open)} overdue</Badge>
                        ) : (
                          <Badge tone="neutral">{peso.format(open)} due {showDate(r.due_on)}</Badge>
                        )}
                        <RiArrowRightSLine aria-hidden className="size-5 shrink-0 text-foreground-icon-tertiary rtl:rotate-180" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      ))}
    </div>
  );
}
