import Link from "next/link";
import { Badge } from "@/components/ui";
import { filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";

export interface FilingListRow {
  id: string;
  form: string;
  period_label: string;
  due_date: string;
  statutory_due_date: string;
  status: keyof typeof filingStatusTone;
  clients: { id: string; name: string; code: string } | null;
}

export function FilingTable({ rows, today, empty }: { rows: FilingListRow[]; today: string; empty: string }) {
  if (rows.length === 0) return <p className="rounded-2xl border border-dashed border-border-strong bg-surface p-8 text-center text-sm text-ink-muted">{empty}</p>;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
      <table className="w-full min-w-[40rem] text-sm">
        <thead className="bg-surface-sunken text-left text-ink-strong">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">Due</th>
            <th scope="col" className="px-4 py-3 font-medium">Client</th>
            <th scope="col" className="px-4 py-3 font-medium">Form</th>
            <th scope="col" className="px-4 py-3 font-medium">Period</th>
            <th scope="col" className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const overdue = r.due_date < today && !["filed", "paid", "proof_uploaded"].includes(r.status);
            return (
              <tr key={r.id} className="border-t border-border">
                <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                  <span className={overdue ? "font-medium text-danger-text" : "text-ink-heading"}>{showDate(r.due_date)}</span>
                  {r.due_date !== r.statutory_due_date && <p className="text-xs text-ink-subtle">moved from {showDate(r.statutory_due_date)}</p>}
                </td>
                <td className="px-4 py-3">
                  {r.clients ? <Link href={`/app/clients/${r.clients.id}`} className="text-ink-heading hover:underline">{r.clients.name}</Link> : "—"}
                </td>
                <td className="px-4 py-3 font-medium"><Link href={`/app/filings/${r.id}`} className="text-link hover:underline">{r.form}</Link></td>
                <td className="px-4 py-3 tabular-nums text-ink-muted">{r.period_label}</td>
                <td className="px-4 py-3">{overdue ? <Badge tone="blocked">Overdue</Badge> : <Badge tone={filingStatusTone[r.status]}>{filingStatusLabel[r.status]}</Badge>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
