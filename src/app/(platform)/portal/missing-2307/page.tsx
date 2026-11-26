import { Suspense } from "react";
import { Badge, Notice, peso, Skeleton } from "@/components/ui";
import { showDate } from "@/lib/filings/labels";
import { portalContext } from "../client-context";
import { Decision } from "./decision";

/**
 * Missing 2307s at year end (docs/REWORK.md, decision 12). A customer withheld tax from
 * the client's sales but never sent its 2307. We claim the tax as a credit and follow up;
 * once the taxable year has ended, keeping or stopping the claim is the client's decision.
 * A stopped claim leaves the SAWT and the annual return's tax credits. The choice closes
 * when the year's annual income tax return is filed.
 */
export default function Missing2307Page() {
  return (
    <Suspense fallback={<Skeleton rows={5} />}>
      <Missing />
    </Suspense>
  );
}

interface Row {
  invoice_id: string;
  issue_date: string;
  reference: string | null;
  party_name: string | null;
  atc: string | null;
  withholding: string | number;
  followed_up_at: string | null;
  claim: "keep" | "stop" | null;
  closed: boolean;
  year_end: string;
  year_ended: boolean;
}

async function Missing() {
  const { supabase, clients } = await portalContext();
  const lists = await Promise.all(clients.map((c) => supabase.rpc("missing_2307s", { p_client: c.id })));
  const several = clients.length > 1;
  const sections = clients
    .map((c, i) => ({ client: c, rows: ((lists[i].data ?? []) as Row[]).filter((r) => r.year_ended) }))
    .filter((s) => s.rows.length > 0);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-title-1-medium text-text-primary">Missing 2307s</h1>
        <p className="text-body-regular text-text-secondary">
          These customers withheld tax from your sales but never sent us their BIR Form 2307. We claimed the tax as a credit on your returns and asked them for it. Now that the year has ended, decide for each: keep claiming it on the annual income tax return, or stop. Without the 2307 the BIR may disallow the credit; stopping means you pay that tax yourself.
        </p>
      </div>
      {sections.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">Nothing to decide.</p>
      ) : (
        sections.map(({ client, rows }) => (
          <section key={client.id} className="space-y-3">
            {several && <h2 className="text-title-3-semibold text-text-primary">{client.name}</h2>}
            <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default px-4 sm:px-5">
              {rows.map((r) => (
                <li key={r.invoice_id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-body-medium text-text-primary">{r.party_name ?? "Customer"}</p>
                    <p className="text-body-regular text-text-secondary">
                      Sales invoice {r.reference ?? "(no number)"} · {showDate(String(r.issue_date).slice(0, 10))}
                      {r.atc ? ` · ${r.atc}` : ""} · tax withheld <span className="amount tabular-nums">{peso.format(Number(r.withholding))}</span>
                    </p>
                  </div>
                  {r.closed ? (
                    <Badge tone="neutral">{r.claim === "stop" ? "Not claimed" : "Claimed"} · annual return filed</Badge>
                  ) : (
                    <Decision invoiceId={r.invoice_id} claim={r.claim} />
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
      <Notice tone="waiting">Got the 2307 after all? Upload it under Sales; we&rsquo;ll attach it to the invoice and the question goes away.</Notice>
    </div>
  );
}
