import Link from "next/link";
import { Suspense } from "react";
import { Badge, peso, Skeleton } from "@/components/ui";
import { showDate } from "@/lib/filings/labels";
import { monthLabel, REMITTANCE_KINDS, type RemittanceKind } from "@/lib/remittances/labels";
import { portalContext } from "../client-context";

export default function PortalRemittances() {
  return (
    <Suspense fallback={<Skeleton rows={5} />}>
      <Remittances />
    </Suspense>
  );
}

interface Row {
  id: string;
  client_id: string;
  kind: RemittanceKind;
  period_month: string;
  due_date: string;
  status: "approved" | "remitted";
  total: string;
  prn: string | null;
  remitted_on: string | null;
  remit_reference: string | null;
  clients: { name: string; payment_mode: string } | null;
}

/**
 * The client's SSS, PhilHealth and Pag-IBIG remittances once approved: the PRN and amount
 * (to pay, when the client pays the agency itself), then the proof once remitted.
 */
async function Remittances() {
  const { supabase, clients } = await portalContext();
  const { data } = await supabase
    .from("contribution_remittances")
    .select("id, client_id, kind, period_month, due_date, status, total, prn, remitted_on, remit_reference, clients(name, payment_mode)")
    .order("period_month", { ascending: false })
    .order("kind")
    .limit(120);
  const rows = (data ?? []) as unknown as Row[];
  const ids = rows.map((r) => r.id);
  const { data: files } = ids.length
    ? await supabase.from("contribution_remittance_files").select("id, remittance_id, kind, file_name").in("remittance_id", ids).order("created_at")
    : { data: [] as { id: string; remittance_id: string; kind: string; file_name: string }[] };
  const toPay = rows.filter((r) => r.status === "approved");
  const paid = rows.filter((r) => r.status === "remitted");
  const several = clients.length > 1;
  const label = (r: Row) => `${REMITTANCE_KINDS[r.kind].item}, ${monthLabel(r.period_month)}`;
  const filesOf = (id: string) => (files ?? []).filter((f) => f.remittance_id === id);

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-body-regular"><Link href="/portal/returns" className="text-button-ghost-foreground hover:underline">Returns</Link></p>
        <h1 className="text-title-1-medium text-text-primary">SSS, PhilHealth and Pag-IBIG</h1>
      </div>
      <section className="space-y-3">
        <h2 className="text-title-3-semibold text-text-primary">To pay</h2>
        {toPay.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">Nothing to pay right now.</p>
        ) : (
          <ul className="space-y-3">
            {toPay.map((r) => (
              <li key={r.id} className="space-y-2 rounded-3xl border border-border-button-default bg-background-primary-default p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-body-medium text-text-primary">{label(r)}{several ? ` · ${r.clients?.name}` : ""}</p>
                  <p className="text-headline-medium tabular-nums text-text-primary">{peso.format(Number(r.total))}</p>
                </div>
                <p className="text-body-regular text-text-secondary">
                  {r.clients?.payment_mode === "firm_remits"
                    ? `On your statement under Billing; we remit it by ${showDate(r.due_date)}.`
                    : <>Pay by {showDate(r.due_date)} with PRN <span dir="ltr" className="font-mono text-text-primary">{r.prn}</span>, then send us the receipt under Requests.</>}
                </p>
                {filesOf(r.id).map((f) => <a key={f.id} href={`/remittance-files/${f.id}`} className="block text-body-regular text-button-ghost-foreground hover:underline">{f.file_name}</a>)}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="text-title-3-semibold text-text-primary">Paid</h2>
        {paid.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">Paid remittances and their receipts show here.</p>
        ) : (
          <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default">
            {paid.map((r) => (
              <li key={r.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
                <div className="min-w-0 space-y-1">
                  <p className="text-body-medium text-text-primary">{label(r)}{several ? ` · ${r.clients?.name}` : ""}</p>
                  <p className="text-caption-1-regular text-text-tertiary">Paid {r.remitted_on ? showDate(r.remitted_on) : ""}{r.remit_reference ? ` · ${r.remit_reference}` : ""} · {peso.format(Number(r.total))}</p>
                  <div className="flex flex-wrap gap-x-4">
                    {filesOf(r.id).map((f) => <a key={f.id} href={`/remittance-files/${f.id}`} className="text-body-regular text-button-ghost-foreground hover:underline">{f.kind === "proof" ? "Proof of payment" : f.kind === "prn" ? "PRN" : "Report"}</a>)}
                  </div>
                </div>
                <Badge tone="done">Remitted</Badge>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
