import { Lockup } from "@/components/brand/lockup";
import { Badge, Card, peso } from "@/components/ui";
import { firmBlockLines } from "@/lib/brand/profile";
import { showDate } from "@/lib/filings/labels";
import type { Statement } from "@/lib/collections/statement";
import { PayNow } from "./pay-now";
import { PrintButton } from "./print-button";

/** One Statement of Account, as the Owner and the client both see it (spec §3.9). */
export function StatementView({ s, today }: { s: Statement; today: string }) {
  const settled = s.totalDue <= 0;
  return (
    <div className="space-y-6">
      <Card className="print:border-0 print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0 max-w-sm space-y-2">
            {s.brand.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from storage
              <img src={s.brand.logoUrl} alt={s.brand.display_name} className="h-12 w-auto max-w-56 object-contain object-left" />
            ) : (
              <Lockup />
            )}
            <address className="space-y-0.5 text-xs not-italic text-ink-subtle">
              {firmBlockLines(s.brand).map((line, i) => (
                <p key={i} className="break-words">{line}</p>
              ))}
            </address>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-semibold text-ink-heading">Statement of Account</p>
            <p className="tabular-nums text-sm text-ink-muted">{s.soa.reference}</p>
            <div className="mt-2 print:hidden"><PrintButton /></div>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 border-t border-border pt-5 text-sm sm:grid-cols-4">
          <div className="sm:col-span-2">
            <dt className="text-xs text-ink-subtle">Billed to</dt>
            <dd className="font-medium text-ink-heading">{s.client.name}</dd>
            {s.client.tin && <dd className="tabular-nums text-ink-muted">TIN {s.client.tin}</dd>}
            {s.client.registered_address && <dd className="text-ink-muted">{s.client.registered_address}</dd>}
          </div>
          <div>
            <dt className="text-xs text-ink-subtle">Statement date</dt>
            <dd className="tabular-nums text-ink-heading">{showDate(s.soa.billing_date)}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-subtle">Pay by</dt>
            <dd className={`tabular-nums ${!settled && s.soa.due_on < today ? "font-medium text-danger-text" : "text-ink-heading"}`}>{showDate(s.soa.due_on)}</dd>
          </div>
        </dl>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead className="border-y border-border bg-surface-muted text-left text-xs text-ink-muted">
              <tr>
                <th scope="col" className="px-3 py-2.5 font-medium">Item</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Due</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Amount</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Paid</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {s.lines.map((l) => (
                <tr key={l.id} className="border-b border-border">
                  <td className="px-3 py-2.5 text-ink-heading">
                    {l.description}
                    {l.waived && <span className="ml-2 align-middle"><Badge tone="neutral">Waived</Badge></span>}
                  </td>
                  <td className="px-3 py-2.5 tabular-nums text-ink-muted">{showDate(l.due_on)}</td>
                  <td className="amount px-3 py-2.5 text-ink">{peso.format(l.amount)}</td>
                  <td className="amount px-3 py-2.5 text-ink-muted">{l.paid ? peso.format(l.paid) : "—"}</td>
                  <td className="amount px-3 py-2.5 font-medium text-ink-heading">{peso.format(l.open)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-ink-heading">
              <tr>
                <td colSpan={4} className="px-3 pt-3 text-right text-ink-muted">This statement</td>
                <td className="amount px-3 pt-3">{peso.format(s.thisOpen)}</td>
              </tr>
              <tr>
                <td colSpan={4} className="px-3 pt-1 text-right text-ink-muted">Unpaid from earlier statements</td>
                <td className="amount px-3 pt-1">{peso.format(s.earlierOpen)}</td>
              </tr>
              <tr className="text-base font-semibold">
                <td colSpan={4} className="px-3 pt-3 text-right">Total amount due</td>
                <td className="amount px-3 pt-3 text-lg">{peso.format(s.totalDue)}</td>
              </tr>
              {s.credit > 0 && (
                <tr>
                  <td colSpan={4} className="px-3 pt-1 text-right text-ink-muted">Your credit, used on the next statement</td>
                  <td className="amount px-3 pt-1 text-ink-muted">{peso.format(s.credit)}</td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
        <p className="mt-6 text-xs text-ink-subtle">
          This statement is not an official receipt. We issue the BIR invoice once your payment is received.
        </p>
      </Card>

      {!settled && (
        <Card title="Pay Now" className="print:hidden">
          <PayNow accounts={s.accounts} reference={s.soa.reference} hasTax={s.hasTax} />
        </Card>
      )}
      {settled && (
        <p className="rounded-2xl border border-border bg-surface p-5 text-sm text-ink-muted shadow-sm print:hidden">Nothing to pay on this statement. Thank you.</p>
      )}
    </div>
  );
}
