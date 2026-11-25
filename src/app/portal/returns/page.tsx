import { Suspense } from "react";
import { Badge, Notice, peso, Skeleton } from "@/components/ui";
import { filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";
import { isNilReturn } from "@/lib/filings/sign-off";
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
    .in("status", ["reviewed", "client_approved", "owner_approved", "filed"])
    .order("due_date", { ascending: false })
    .limit(100);
  const rows = (data ?? []) as unknown as Row[];
  const waiting = rows.filter((r) => r.status === "reviewed");
  const recent = rows.filter((r) => r.status !== "reviewed").slice(0, 30);
  const ids = recent.map((r) => r.id);
  // The scanned copy and the BIR's validation report (decisions 14 and 15), and files attached before them.
  const [{ data: files }, { data: copies }] = ids.length
    ? await Promise.all([
        supabase.from("documents").select("id, filing_instance_id, doc_type").in("filing_instance_id", ids).in("status", ["received", "under_review", "posted"]),
        supabase.from("filing_files").select("id, filing_instance_id, kind").in("filing_instance_id", ids).is("replaced_at", null).order("created_at"),
      ])
    : [{ data: [] as { id: string; filing_instance_id: string; doc_type: string }[] }, { data: [] as { id: string; filing_instance_id: string; kind: string }[] }];
  const several = clients.length > 1;

  return (
    <div className="space-y-8">
      <h1 className="text-title-1-medium text-text-primary">Returns</h1>
      <section className="space-y-3">
        <h2 className="text-title-3-semibold text-text-primary">Waiting for your approval</h2>
        {waiting.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">Nothing to approve right now.</p>
        ) : (
          waiting.map((r) => (
            <article key={r.id} className="space-y-4 rounded-3xl border border-border-button-default bg-background-primary-default p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-headline-semibold text-text-primary">{r.form} · {r.period_label}</p>
                  <p className="text-body-regular text-text-secondary">{several && r.clients ? `${r.clients.name} · ` : ""}Due {showDate(r.due_date)}</p>
                </div>
                <p className="text-body-regular text-text-secondary">Tax due <span className="amount font-medium tabular-nums text-text-primary">{r.tax_due == null ? "—" : peso.format(Number(r.tax_due))}</span></p>
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
          <h2 className="text-title-3-semibold text-text-primary">Your returns</h2>
          <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular">
            {recent.map((r) => {
              const mine = (files ?? []).filter((f) => f.filing_instance_id === r.id);
              const kept = (copies ?? []).filter((f) => f.filing_instance_id === r.id);
              const nil = isNilReturn(r.tax_due == null ? null : Number(r.tax_due));
              return (
                <li key={r.id} className="space-y-1 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-text-primary">{r.form} · {r.period_label}</p>
                    <Badge tone={filingStatusTone[r.status] ?? "neutral"}>
                      {r.status === "client_approved" ? (nil ? "Nil return: no approval needed" : "Approved by you") : r.status === "owner_approved" ? "Approved, being filed" : (filingStatusLabel[r.status] ?? r.status)}
                    </Badge>
                  </div>
                  <p className="text-caption-1-regular text-text-secondary">{several && r.clients ? `${r.clients.name} · ` : ""}{r.filing_reference ? `Ref. ${r.filing_reference}` : `Due ${showDate(r.due_date)}`}</p>
                  {(kept.length > 0 || mine.length > 0) && (
                    <p className="flex flex-wrap gap-3 text-caption-1-regular">
                      {kept.map((f) => (
                        <a key={f.id} href={`/filing-files/${f.id}`} target="_blank" rel="noopener" className="text-button-ghost-foreground underline">
                          {f.kind === "filed_copy" ? "Filed return and proof of payment" : "BIR validation report"}
                        </a>
                      ))}
                      {mine.map((f) => (
                        <a key={f.id} href={`/files/${f.id}`} target="_blank" rel="noopener" className="text-button-ghost-foreground underline">
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
