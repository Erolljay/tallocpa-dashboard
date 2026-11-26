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
  if (rows.length === 0) return <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-8 text-center text-body-regular text-text-secondary">{empty}</p>;
  return (
    <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
      <table className="w-full min-w-[40rem] text-body-regular">
        <thead className="border-b border-separator-border bg-background-secondary-default text-start text-body-medium text-text-tertiary">
          <tr>
            <th scope="col" className="text-start px-4 py-3">Due</th>
            <th scope="col" className="text-start px-4 py-3">Client</th>
            <th scope="col" className="text-start px-4 py-3">Form</th>
            <th scope="col" className="text-start px-4 py-3">Period</th>
            <th scope="col" className="text-start px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const overdue = r.due_date < today && !["filed", "paid", "proof_uploaded"].includes(r.status);
            return (
              <tr key={r.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                  <span className={overdue ? "font-medium text-text-error-primary" : "text-text-primary"}>{showDate(r.due_date)}</span>
                  {r.due_date !== r.statutory_due_date && <p className="text-caption-1-regular text-text-tertiary">moved from {showDate(r.statutory_due_date)}</p>}
                </td>
                <td className="px-4 py-3">
                  {r.clients ? <Link href={`/app/clients/${r.clients.id}`} className="text-text-primary hover:underline">{r.clients.name}</Link> : "—"}
                </td>
                <td className="px-4 py-3 font-medium"><Link href={`/app/filings/${r.id}`} className="text-button-ghost-foreground hover:underline">{r.form}</Link></td>
                <td className="px-4 py-3 tabular-nums text-text-secondary">{r.period_label}</td>
                <td className="px-4 py-3">{overdue ? <Badge tone="blocked">Overdue</Badge> : <Badge tone={filingStatusTone[r.status]}>{filingStatusLabel[r.status]}</Badge>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
