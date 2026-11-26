import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Rematch2307Button } from "@/components/bir/cwt-forms";
import { Card, Notice, peso } from "@/components/ui";
import { explainMatch, matchWindow, type MatchCandidate } from "@/lib/books/cwt-tracker";
import type { OcrFields } from "@/lib/ocr/fields";
import { parseTin } from "@/lib/parties/tin";

const dateFmt = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" });
const showDate = (iso: string) => dateFmt.format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
const amount = (v: string | null | undefined) => {
  const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

/**
 * A 2307 received: the client's Sales Invoices it supports (their CWT is backed), or why
 * none matched. Before approval, the customer's invoices it would be matched against.
 */
export async function CwtMatch({
  supabase,
  doc,
  fields,
  partyId,
  canAct,
}: {
  supabase: SupabaseClient;
  doc: { id: string; client_id: string; document_month: string; status: string };
  fields: OcrFields;
  /** The customer in the parties directory, from the 2307's TIN. */
  partyId: string | null;
  canAct: boolean;
}) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(fields.date ?? "") ? fields.date! : doc.document_month;
  const tin = parseTin(fields.party_tin);
  const w = matchWindow(date);
  const cols = "id, issue_date, reference, withholding, cwt_document_id, withholding_code_id";
  const base = () => supabase.from("book_invoices").select(cols).eq("client_id", doc.client_id).eq("kind", "sales").is("voided_at", null).gt("withholding", 0);
  const byParty = [partyId && `party_id.eq.${partyId}`, tin && `and(party_id.is.null,party_tin.like.${tin.tin}*)`].filter(Boolean).join(",");
  const [{ data: linked }, { data: near }] = await Promise.all([
    base().eq("cwt_document_id", doc.id),
    byParty ? base().gte("issue_date", w.from).lte("issue_date", w.to).or(byParty).order("issue_date") : Promise.resolve({ data: [] }),
  ]);
  type Row = { id: string; issue_date: string; reference: string | null; withholding: string | number; cwt_document_id: string | null; withholding_code_id: string | null };
  const rows = new Map<string, Row>();
  for (const r of [...((linked ?? []) as Row[]), ...((near ?? []) as Row[])]) rows.set(r.id, r);
  const codeIds = [...new Set([...rows.values()].map((r) => r.withholding_code_id).filter((x): x is string => Boolean(x)))];
  const { data: codes } = codeIds.length ? await supabase.from("tax_codes").select("id, atc").in("id", codeIds) : { data: [] };
  const atcOf = new Map(((codes ?? []) as { id: string; atc: string | null }[]).map((c) => [c.id, c.atc]));
  const candidates: MatchCandidate[] = [...rows.values()].map((r) => ({
    id: r.id,
    issue_date: String(r.issue_date).slice(0, 10),
    reference: r.reference,
    atc: r.withholding_code_id ? atcOf.get(r.withholding_code_id) ?? null : null,
    withholding: Number(r.withholding),
    document_id: r.cwt_document_id,
  }));

  const posted = doc.status === "posted";
  const x = explainMatch({ id: doc.id, date, atc: fields.atc ?? null, withholding: amount(fields.withholding), approved: posted }, candidates, Boolean(partyId || tin));
  const open = candidates.filter((c) => !c.document_id && c.issue_date >= w.from && c.issue_date <= w.to);
  const tracker = `/app/clients/${doc.client_id}/books/reports/cwt-2307?month=${date.slice(0, 7)}`;

  return (
    <Card title="Sales Invoices this 2307 supports" actions={<Link href={tracker} className="text-body-medium text-button-ghost-foreground hover:underline">2307 tracker</Link>}>
      {x.matched.length > 0 ? (
        <div className="space-y-3">
          <InvoiceList rows={x.matched} clientId={doc.client_id} />
          {x.unexplained !== 0 && (
            <Notice tone="waiting">
              {x.unexplained > 0
                ? `${peso.format(x.unexplained)} of this 2307 is more than the CWT on the invoices it supports. Check for an invoice not yet in the Books.`
                : `The invoices' CWT is ${peso.format(-x.unexplained)} more than this 2307.`}
            </Notice>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <Notice tone={posted ? "blocked" : "waiting"}>{posted ? `Not tied to any Sales Invoice. ${x.reason}` : x.reason}</Notice>
          {open.length > 0 && (
            <div className="space-y-2">
              <p className="text-caption-1-regular text-text-tertiary">This customer&rsquo;s Sales Invoices still waiting for a 2307, {w.label}:</p>
              <InvoiceList rows={open} clientId={doc.client_id} />
            </div>
          )}
          {posted && canAct && <Rematch2307Button clientId={doc.client_id} documentId={doc.id} />}
        </div>
      )}
    </Card>
  );
}

function InvoiceList({ rows, clientId }: { rows: MatchCandidate[]; clientId: string }) {
  return (
    <ul className="divide-y divide-separator-border rounded-2xl border border-separator-border">
      {rows.map((r) => (
        <li key={r.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5">
          <div className="min-w-0">
            <Link href={`/app/clients/${clientId}/books/sales-invoices/${r.id}`} className="text-body-medium text-button-ghost-foreground hover:underline">
              {r.reference ?? "(no number)"}
            </Link>
            <p className="text-caption-1-regular text-text-tertiary">{showDate(r.issue_date)}{r.atc ? ` · ${r.atc}` : ""}</p>
          </div>
          <span className="tabular-nums text-body-medium text-text-primary">{peso.format(r.withholding)}</span>
        </li>
      ))}
    </ul>
  );
}
