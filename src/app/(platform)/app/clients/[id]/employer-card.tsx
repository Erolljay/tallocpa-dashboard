import Link from "next/link";
import { Badge, Card, peso } from "@/components/ui";
import { AddRemittanceForm, EmployerNumberForm } from "@/components/remittances/forms";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { AGENCIES, AGENCY_KEYS, monthLabel, REMITTANCE_KINDS, remittanceBadge, type Agency, type RemittanceKind, type RemittanceStatus } from "@/lib/remittances/labels";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * A client's SSS, PhilHealth and Pag-IBIG employer numbers, which decide its monthly
 * remittances and their deadlines, and its latest remittances (migration 20261216000002).
 */
export async function EmployerCard({ clientId, canWork }: { clientId: string; canWork: boolean }) {
  const supabase = await supabaseServer();
  const [{ data: numbers }, { data: recent }] = await Promise.all([
    supabase.from("client_employer_numbers").select("agency, employer_number, registered_name, start_month, end_month").eq("client_id", clientId),
    supabase.from("contribution_remittances").select("id, kind, period_month, due_date, status, total").eq("client_id", clientId).order("period_month", { ascending: false }).order("kind").limit(10),
  ]);
  const byAgency = new Map((numbers ?? []).map((n) => [n.agency as Agency, n]));
  const today = manilaToday();

  return (
    <Card title="SSS, PhilHealth and Pag-IBIG" actions={<Link href="/app/remittances?queue=open" className="text-body-regular text-button-ghost-foreground hover:underline">Remittances</Link>}>
      <div className="flex flex-col gap-4">
        {(recent ?? []).length > 0 && (
          <ul className="divide-y divide-separator-border">
            {(recent ?? []).map((r) => {
              const badge = remittanceBadge(r.status as RemittanceStatus, r.due_date, today);
              return (
                <li key={r.id} className="flex items-center justify-between gap-3 py-2 text-body-regular">
                  <span className="min-w-0">
                    <Link href={`/app/remittances/${r.id}`} className="text-text-primary hover:underline">{REMITTANCE_KINDS[r.kind as RemittanceKind].option} · {monthLabel(r.period_month)}</Link>
                    <span className="block text-caption-1-regular text-text-tertiary">Due {showDate(r.due_date)}{Number(r.total) > 0 ? ` · ${peso.format(Number(r.total))}` : ""}</span>
                  </span>
                  <Badge tone={badge.tone}>{badge.label}</Badge>
                </li>
              );
            })}
          </ul>
        )}
        {AGENCY_KEYS.map((a) => {
          const n = byAgency.get(a);
          return (
            <details key={a} className="rounded-xl border border-border-button-default px-3 py-2" open={canWork && !n && byAgency.size === 0 && a === "sss"}>
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-body-medium text-text-primary">
                <span>{AGENCIES[a].name}</span>
                <span className="text-caption-1-regular text-text-tertiary" dir="ltr">{n ? `${n.employer_number}${n.end_month ? " · ended" : ""}` : "Not registered"}</span>
              </summary>
              <div className="mt-3">
                {canWork ? (
                  <EmployerNumberForm clientId={clientId} agency={a} current={n ?? null} />
                ) : (
                  <p className="text-body-regular text-text-secondary">{n ? `Since ${monthLabel(n.start_month)}.` : "Only the Owner and staff assigned to this client enter it."}</p>
                )}
              </div>
            </details>
          );
        })}
        {canWork && byAgency.size > 0 && (
          <details className="rounded-xl border border-border-button-default px-3 py-2">
            <summary className="cursor-pointer text-body-medium text-text-primary">Add a loan or an earlier month</summary>
            <div className="mt-3"><AddRemittanceForm clientId={clientId} agencies={[...byAgency.keys()]} thisMonth={today.slice(0, 7)} /></div>
          </details>
        )}
      </div>
    </Card>
  );
}
