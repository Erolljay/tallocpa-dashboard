import { Card } from "@/components/ui";
import { periodTitle, type FinancialStatements, type Statement } from "@/lib/ledger/statements";
import { formatAmount } from "@/lib/returns/money";
import { cx } from "@/utils/cx";
import { PrintButton } from "./print-button";

/**
 * A client's financial statements (spec §3.6 slice 6), for staff on the Books
 * reports page and for the client in the portal once released. Server-rendered
 * and print friendly: each statement is a card, notes follow.
 */
export function FinancialStatementsView({ fs, footer }: { fs: FinancialStatements; footer?: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <header className="space-y-1 text-center">
        <p className="text-title-3-semibold text-text-primary">{fs.client.name}</p>
        {fs.client.tin && <p className="text-body-regular text-text-secondary">TIN {fs.client.tin}</p>}
        {fs.client.address && <p className="text-body-regular text-text-secondary">{fs.client.address}</p>}
        <p className="text-body-medium text-text-secondary">{periodTitle(fs.kind, fs.periodEnd)}</p>
        <div className="flex justify-center print:hidden"><PrintButton /></div>
      </header>
      <StatementTable s={fs.position} />
      <StatementTable s={fs.income} />
      <StatementTable s={fs.equity} />
      {fs.cashFlows && <StatementTable s={fs.cashFlows} />}
      {fs.notes.length > 0 && (
        <Card title="Notes to the financial statements" className="print:break-before-page print:border-0 print:shadow-none">
          <div className="space-y-6">
            {fs.notes.map((n) => (
              <section key={n.number} className="break-inside-avoid">
                <h3 className="mb-1 text-body-semibold text-text-primary">{n.number}. {n.title}</h3>
                <div className="-mx-2 overflow-x-auto">
                  <table className="w-full min-w-[28rem] text-body-regular">
                    {n.columns.length > 1 && (
                      <thead className="text-caption-1-medium text-text-tertiary">
                        <tr>
                          <th scope="col" className="px-2 py-1 text-start"><span className="sr-only">Account</span></th>
                          {n.columns.map((c) => <th key={c} scope="col" className="w-36 px-2 py-1 text-end">{c}</th>)}
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {n.rows.map((r) => (
                        <tr key={r.label}>
                          <td className="px-2 py-1 text-text-secondary">{r.label}</td>
                          {r.amounts.map((a, i) => <td key={i} className="w-36 px-2 py-1 text-end tabular-nums text-text-primary">{formatAmount(a)}</td>)}
                        </tr>
                      ))}
                      <tr className="border-t border-separator-border text-body-medium">
                        <td className="px-2 py-1 text-text-primary">Total</td>
                        {n.total.map((a, i) => <td key={i} className="w-36 px-2 py-1 text-end tabular-nums text-text-primary">{formatAmount(a)}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        </Card>
      )}
      {footer}
    </div>
  );
}

function StatementTable({ s }: { s: Statement }) {
  return (
    <Card title={s.title} className="break-inside-avoid print:border-0 print:shadow-none">
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[30rem] text-body-regular">
          <thead className="border-b border-separator-border text-caption-1-medium text-text-tertiary">
            <tr>
              <th scope="col" className="px-2 py-1.5 text-start"><span className="sr-only">Line</span></th>
              <th scope="col" className="w-12 px-2 py-1.5 text-center">Note</th>
              {s.columns.map((c) => <th key={c} scope="col" className="w-36 px-2 py-1.5 text-end">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {s.lines.map((l, i) => (
              <tr
                key={`${l.label}-${i}`}
                className={cx(
                  l.kind === "subtotal" && "border-t border-separator-border",
                  l.kind === "total" && "border-t-2 border-separator-border",
                )}
              >
                <td
                  className={cx(
                    "px-2 py-1",
                    l.kind === "heading" && "pt-4 text-body-semibold text-text-primary",
                    l.kind === "line" && "ps-6 text-text-secondary",
                    l.kind === "subtotal" && "text-body-medium text-text-primary",
                    l.kind === "total" && "text-body-semibold text-text-primary",
                  )}
                >
                  {l.label}
                </td>
                <td className="w-12 px-2 py-1 text-center text-caption-1-regular text-text-tertiary">{l.note ?? ""}</td>
                {l.amounts.map((a, j) => (
                  <td
                    key={j}
                    className={cx("w-36 px-2 py-1 text-end tabular-nums text-text-primary", l.kind === "total" && "text-body-semibold", l.kind === "subtotal" && "text-body-medium")}
                  >
                    {a == null ? "" : formatAmount(a)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
