import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { Badge, Notice, peso, Skeleton } from "@/components/ui";
import { getIdentity } from "@/lib/auth";
import { filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { SignOffActions } from "../app/filings/sign-off-actions";

export default function PortalPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-8 px-4 py-10">
      <Lockup />
      <Suspense fallback={<Skeleton rows={4} />}>
        <Portal />
      </Suspense>
    </main>
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

async function Portal() {
  const id = await getIdentity();
  if (id.staff) redirect("/app");
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("filing_instances")
    .select("id, client_id, form, period_label, due_date, status, tax_due, open_query, filing_reference, clients(name, payment_mode)")
    .in("status", ["reviewed", "client_approved", "owner_approved", "filed", "paid", "proof_uploaded"])
    .order("due_date", { ascending: false })
    .limit(100);
  const rows = (data ?? []) as unknown as Row[];
  const waiting = rows.filter((r) => r.status === "reviewed");
  const recent = rows.filter((r) => r.status !== "reviewed").slice(0, 20);
  const several = id.clients.length > 1;
  const first = id.clients[0];

  return (
    <div className="space-y-8">
      <section className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-heading">Welcome{first ? `, ${first.fullName}` : ""}</h1>
          <p className="mt-1 text-sm text-ink-muted">{several ? id.clients.map((c) => c.clientName).join(" · ") : first?.clientName}</p>
        </div>
        <form action="/auth/signout" method="post">
          <button className="text-sm text-link hover:underline">Sign out</button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-ink-heading">Returns waiting for your approval</h2>
        {waiting.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border-strong bg-surface p-6 text-sm text-ink-muted">Nothing to approve right now.</p>
        ) : (
          waiting.map((r) => (
            <article key={r.id} className="space-y-4 rounded-2xl border border-border bg-surface p-5">
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
          <h2 className="font-display text-lg font-semibold text-ink-heading">Recent returns</h2>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-surface text-sm">
            {recent.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-medium text-ink-heading">{r.form} · {r.period_label}</p>
                  <p className="text-xs text-ink-subtle">{several && r.clients ? `${r.clients.name} · ` : ""}{r.filing_reference ? `Ref. ${r.filing_reference}` : `Due ${showDate(r.due_date)}`}</p>
                </div>
                <Badge tone={filingStatusTone[r.status]}>{r.status === "client_approved" ? "Approved by you" : filingStatusLabel[r.status]}</Badge>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
