import type { ReactNode } from "react";
import { Lockup } from "@/components/brand/lockup";
import { Badge, Card, peso } from "@/components/ui";
import { firmBlockLines } from "@/lib/brand/profile";
import { showDate } from "@/lib/filings/labels";
import { statementStatus, type Statement, type StatementStatus } from "@/lib/collections/statement";
import { PayNow } from "./pay-now";
import { PrintButton } from "./print-button";
import { PaymentsList } from "./payments-list";

const statusBadge: Record<StatementStatus, { tone: "done" | "waiting" | "blocked" | "neutral"; label: string }> = {
  paid: { tone: "done", label: "Paid" },
  for_verification: { tone: "waiting", label: "Pending verification" },
  overdue: { tone: "blocked", label: "Overdue" },
  due: { tone: "neutral", label: "Unpaid" },
};

/**
 * One Statement of Account, as the Owner and the client both see it (spec §3.9).
 * The client uploads proof of payment under Pay; the Owner verifies it here.
 * `payments={false}` leaves out this statement's payments (portal Billing lists
 * all payments in one place).
 */
/** `payBlocked`: shown in place of Pay when the signed-in contact may not pay for this business. */
/** `signInHref`: the public share page, where uploading a proof means signing in first. */
export function StatementView({ s, today, owner = false, payments = true, payBlocked, signInHref, actions }: { s: Statement; today: string; owner?: boolean; payments?: boolean; payBlocked?: string; signInHref?: string; actions?: ReactNode }) {
  const settled = s.totalDue <= 0;
  const pending = s.proofs.filter((p) => p.status === "for_verification").length;
  const status = statusBadge[statementStatus(s.totalDue, pending, s.soa.due_on, today)];
  const payee = s.brand.legal_name || s.brand.display_name;
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
            <address className="space-y-0.5 text-caption-1-regular not-italic text-text-tertiary">
              {firmBlockLines(s.brand).map((line, i) => (
                <p key={i} className="break-words">{line}</p>
              ))}
            </address>
          </div>
          <div className="sm:text-end">
            <p className="text-title-3-semibold text-text-primary">Statement of Account</p>
            <p className="tabular-nums text-body-regular text-text-secondary">{s.soa.reference}</p>
            <div className="mt-2"><Badge tone={status.tone}>{status.label}</Badge></div>
            <div className="mt-2 flex flex-wrap items-center gap-1 sm:justify-end print:hidden"><PrintButton />{actions}</div>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 border-t border-separator-border pt-5 text-body-regular sm:grid-cols-4">
          <div className="sm:col-span-2">
            <dt className="text-caption-1-regular text-text-secondary">Billed to</dt>
            <dd className="font-medium text-text-primary">{s.client.name}</dd>
            {s.client.tin && <dd className="tabular-nums text-text-secondary">TIN {s.client.tin}</dd>}
            {s.client.registered_address && <dd className="text-text-secondary">{s.client.registered_address}</dd>}
          </div>
          <div>
            <dt className="text-caption-1-regular text-text-secondary">Statement date</dt>
            <dd className="tabular-nums text-text-primary">{showDate(s.soa.billing_date)}</dd>
          </div>
          <div>
            <dt className="text-caption-1-regular text-text-secondary">Pay by</dt>
            <dd className={`tabular-nums ${!settled && s.soa.due_on < today ? "font-medium text-text-error-primary" : "text-text-primary"}`}>{showDate(s.soa.due_on)}</dd>
          </div>
        </dl>

        {/* Phones: one block per line item, then the totals. Wider screens and print: the table. */}
        <ul className="mt-6 divide-y divide-separator-border border-y border-separator-border sm:hidden print:hidden">
          {s.lines.map((l) => (
            <li key={l.id} className="flex flex-col gap-1 py-3">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 text-body-medium text-text-primary">{l.description}</p>
                <p className="shrink-0 text-body-medium tabular-nums text-text-primary">{peso.format(l.open)}</p>
              </div>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-caption-1-regular text-text-secondary">
                <span>Due {showDate(l.due_on)}</span>
                <span className="tabular-nums">· {peso.format(l.amount)}{l.paid ? `, ${peso.format(l.paid)} paid` : ""}</span>
                {l.waived && <Badge tone="neutral">Waived</Badge>}
              </p>
            </li>
          ))}
        </ul>
        <dl className="mt-3 flex flex-col gap-1 text-body-regular sm:hidden print:hidden">
          <div className="flex justify-between gap-3 text-text-secondary"><dt>This statement</dt><dd className="tabular-nums">{peso.format(s.thisOpen)}</dd></div>
          <div className="flex justify-between gap-3 text-text-secondary"><dt>Unpaid from earlier statements</dt><dd className="tabular-nums">{peso.format(s.earlierOpen)}</dd></div>
          <div className="mt-1 flex items-baseline justify-between gap-3 text-text-primary"><dt className="text-headline-semibold">Total amount due</dt><dd className="text-title-3-semibold tabular-nums">{peso.format(s.totalDue)}</dd></div>
          {s.credit > 0 && <div className="flex justify-between gap-3 text-text-secondary"><dt>Your credit, used on the next statement</dt><dd className="tabular-nums">{peso.format(s.credit)}</dd></div>}
        </dl>

        <div className="mt-6 hidden overflow-x-auto sm:block print:block">
          <table className="w-full min-w-[34rem] text-body-regular">
            <thead className="border-y border-separator-border bg-background-secondary-default text-start text-body-medium text-text-tertiary">
              <tr>
                <th scope="col" className="text-start px-3 py-2.5">Item</th>
                <th scope="col" className="text-start px-3 py-2.5">Due</th>
                <th scope="col" className="px-3 py-2.5 text-end">Amount</th>
                <th scope="col" className="px-3 py-2.5 text-end">Paid</th>
                <th scope="col" className="px-3 py-2.5 text-end">Balance</th>
              </tr>
            </thead>
            <tbody>
              {s.lines.map((l) => (
                <tr key={l.id} className="border-b border-separator-border">
                  <td className="px-3 py-2.5 text-text-primary">
                    {l.description}
                    {l.waived && <span className="ms-2 align-middle"><Badge tone="neutral">Waived</Badge></span>}
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap tabular-nums text-text-secondary">{showDate(l.due_on)}</td>
                  <td className="amount px-3 py-2.5 text-text-primary">{peso.format(l.amount)}</td>
                  <td className="amount px-3 py-2.5 text-text-secondary">{l.paid ? peso.format(l.paid) : "—"}</td>
                  <td className="amount px-3 py-2.5 font-medium text-text-primary">{peso.format(l.open)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-text-primary">
              <tr>
                <td colSpan={4} className="px-3 pt-3 text-end text-text-secondary">This statement</td>
                <td className="amount px-3 pt-3">{peso.format(s.thisOpen)}</td>
              </tr>
              <tr>
                <td colSpan={4} className="px-3 pt-1 text-end text-text-secondary">Unpaid from earlier statements</td>
                <td className="amount px-3 pt-1">{peso.format(s.earlierOpen)}</td>
              </tr>
              <tr className="text-headline-semibold">
                <td colSpan={4} className="px-3 pt-3 text-end">Total amount due</td>
                <td className="amount px-3 pt-3 text-title-3-regular">{peso.format(s.totalDue)}</td>
              </tr>
              {s.credit > 0 && (
                <tr>
                  <td colSpan={4} className="px-3 pt-1 text-end text-text-secondary">Your credit, used on the next statement</td>
                  <td className="amount px-3 pt-1 text-text-secondary">{peso.format(s.credit)}</td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
        <footer className="mt-6 space-y-2 border-t border-separator-border pt-5 text-body-regular text-text-secondary">
          <p className="text-headline-semibold text-text-primary">Thank you for your business!</p>
          {s.brand.phone && (
            <p>
              If you have any questions about this statement, please contact our customer service at{" "}
              <span className="font-semibold tabular-nums text-text-primary">{s.brand.phone}</span>.
            </p>
          )}
          <p>
            Payment is due within <span className="font-semibold text-text-primary">{s.brand.paymentDays} day{s.brand.paymentDays === 1 ? "" : "s"}</span> of
            the date of this statement or prior to the deadline for tax due. Please make all checks payable to{" "}
            <span className="font-semibold text-text-primary">&ldquo;{payee}&rdquo;</span>.
          </p>
          <p>
            {signInHref === ""
              ? "For check payments and direct bank deposits, please send us the bank-validated deposit slip as your proof of payment."
              : "For check payments and direct bank deposits, please upload the bank-validated deposit slip as your proof of payment in your client portal, under Billing."}
          </p>
          <p className="text-caption-1-regular">This statement is not an official receipt. We issue the BIR invoice once your payment is received.</p>
        </footer>
      </Card>

      {payments && s.proofs.length > 0 && (
        <Card title="Payments" className="print:hidden">
          <PaymentsList proofs={s.proofs} owner={owner} openItems={owner ? s.openItems : undefined} />
        </Card>
      )}

      {!settled && (
        <Card title="Pay" className="print:hidden">
          {payBlocked ? (
            <p className="text-body-regular text-text-secondary">{payBlocked}</p>
          ) : (
            <PayNow accounts={s.accounts} reference={s.soa.reference} hasTax={s.hasTax} soaId={s.soa.id} amountDue={s.totalDue} today={today} signInHref={signInHref} />
          )}
        </Card>
      )}
      {settled && (
        <p className="rounded-3xl border border-border-button-default bg-background-primary-default p-5 text-body-regular text-text-secondary print:hidden">Nothing to pay on this statement. Thank you.</p>
      )}
    </div>
  );
}
