import { Suspense } from "react";
import { Badge, Notice, peso, Skeleton } from "@/components/ui";
import { filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";
import { SignOffActions } from "../../app/filings/sign-off-actions";
import { portalContext } from "../client-context";

export default function PortalReturns() {
  return (
    <Suspense fallback={<Skeleton rows={5} />}>
      <Returns />
    </Suspense>
  );
}

interface Row {
  id: string;
  client_id: string;
  form: string;
  period_label: string;
  due_date: string;
  status: keyof typeof filingStatusTone;
  tax_due: string | null;
  open_query: string | null;
  filing_reference: string | null;
  clients: { name: string; payment_mode: string } | null;
}

async function Returns() {
  const { supabase, clients } = await portalContext();
  const { data } = await supabase
    .from("filing_instances")
    .select("id, client_id, form, period_label, due_date, status, tax_due, open_query, filing_reference, clients(name, payment_mode)")
    .in("status", ["reviewed", "client_approved", "owner_approved", "filed", "paid", "proof_uploaded"])
    .order("due_date", { ascending: false })
    .limit(100);
  const rows = (data ?? []) as unknown as Row[];
  const waiting = rows.filter((r) => r.status === "reviewed");
  const recent = rows.filter((r) => r.status !== "reviewed").slice(0, 30);
  const ids = recent.map((r) => r.id);
  const { data: files } = ids.length
    ? await supabase.from("documents").select("id, filing_instance_id, doc_type").in("filing_instance_id", ids).in("status", ["received", "under_review", "posted"])
    : { data: [] as { id: string; filing_instance_id: string; doc_type: string }[] };
  const several = clients.length > 1;

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="font-display text-xl font-semibold text-ink-heading">Waiting for your approval</h1>
        {waiting.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border-strong bg-surface p-6 text-sm text-ink-muted">Nothing to approve right now.</p>
        ) : (
          waiting.map((r) => (
            <article key={r.id} className="space-y-4 rounded-2xl border border-border bg-surface p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-medium text-ink-heading">{r.form} · {r.period_label}</p>
                  <p className="text-sm text-ink-muted">{several && r.clients ? `${r.clients.name} · ` : ""}Due {showDate(r.due_date)}</p>
                </div>
                <p className="text-sm text-ink-muted">Tax due <span className="amount font-medium tabular-nums text-ink-heading">{r.tax_due == null ? "—" : peso.format(Number(r.tax_due))}</span></p>
              </div>
              {r.open_query ? (
                <Notice tone="waiting">You asked: “{r.open_query}” — we will reply before you approve.</Notice>
              ) : (
                <SignOffActions filingId={r.id} actions={["client_approve", "client_query"]} taxDue={r.tax_due == null ? null : Number(r.tax_due)} paymentMode={r.clients?.payment_mode ?? ""} audience="client" />
              )}
            </article>
          ))
        )}
      </section>

      {recent.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-ink-heading">Your returns</h2>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-surface text-sm">
            {recent.map((r) => {
              const mine = (files ?? []).filter((f) => f.filing_instance_id === r.id);
              return (
                <li key={r.id} className="space-y-1 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-ink-heading">{r.form} · {r.period_label}</p>
                    <Badge tone={filingStatusTone[r.status]}>{r.status === "client_approved" ? "Approved by you" : filingStatusLabel[r.status]}</Badge>
                  </div>
                  <p className="text-xs text-ink-subtle">{several && r.clients ? `${r.clients.name} · ` : ""}{r.filing_reference ? `Ref. ${r.filing_reference}` : `Due ${showDate(r.due_date)}`}</p>
                  {mine.length > 0 && (
                    <p className="flex flex-wrap gap-3 text-xs">
                      {mine.map((f) => (
                        <a key={f.id} href={`/files/${f.id}`} target="_blank" rel="noopener" className="text-link underline">
                          {f.doc_type === "filed_return" ? "Filed return" : "Proof of payment"}
                        </a>
                      ))}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
