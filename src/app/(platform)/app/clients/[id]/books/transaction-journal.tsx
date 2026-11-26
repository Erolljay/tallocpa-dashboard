import type { ReactNode } from "react";
import { journalTotals, type JournalRow } from "@/lib/books/ui";
import { formatAmount } from "@/lib/returns/money";

/**
 * The Transaction Journal of an invoice, receipt or payment, as Manager.io shows it:
 * the client, the title, what it is (Sales Invoice · SI 0451), the date, then each
 * line's account with the party and invoice date under it, Debit and Credit, and the
 * totals between rules. Invoice lines carry their tax code.
 */
export function TransactionJournal({ clientName, type, date, rows, status, children }: { clientName: string; type: string; date: string; rows: JournalRow[]; status?: ReactNode; children?: ReactNode }) {
  const t = journalTotals(rows);
  return (
    <section className="min-w-0 rounded-3xl border border-border-button-default bg-background-primary-default p-5 sm:p-8">
      <header className="mb-6 space-y-1 text-center">
        <p className="text-body-medium text-text-secondary">{clientName}</p>
        <h2 className="text-title-2-medium text-text-primary">Transaction Journal</h2>
        <p className="text-body-regular text-text-secondary">{type}</p>
        {status && <div className="flex justify-center pt-1">{status}</div>}
      </header>
      {rows.length === 0 ? (
        <p className="text-body-regular text-text-secondary">Nothing posted for this transaction.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-body-regular">
            <thead className="text-body-medium text-text-tertiary">
              <tr className="border-b border-separator-border">
                <th scope="col" className="py-2 pe-4 text-start">{date}</th>
                <th scope="col" className="w-36 py-2 text-end">Debit</th>
                <th scope="col" className="w-36 py-2 ps-4 text-end">Credit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="align-top">
                  <td className="py-2 pe-4">
                    <span className="text-text-primary">{r.account}</span>
                    {r.detail && <span className="text-text-secondary"> — {r.detail}</span>}
                    {r.taxCode && <span className="block text-caption-1-regular text-text-tertiary">Tax code: {r.taxCode}</span>}
                  </td>
                  <td className="py-2 text-end tabular-nums text-text-primary">{r.debit ? formatAmount(r.debit) : ""}</td>
                  <td className="py-2 ps-4 text-end tabular-nums text-text-primary">{r.credit ? formatAmount(r.credit) : ""}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-body-medium text-text-primary">
              <tr className="border-y-2 border-separator-border">
                <td className="py-2 pe-4"><span className="sr-only">Total</span></td>
                <td className="py-2 text-end tabular-nums">{formatAmount(t.debit)}</td>
                <td className="py-2 ps-4 text-end tabular-nums">{formatAmount(t.credit)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      {children && <div className="mt-6 space-y-3">{children}</div>}
    </section>
  );
}
