import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui";
import {
  SLP_COLUMNS, SLS_COLUMNS, STATUS_LABELS, WITHHOLDING_LABELS,
  type AtcComparison, type DocumentDifference, type Figure, type MonthComparison, type MonthStatus, type PartyComparison,
} from "@/lib/parallel-run/compare";
import { formatAmount } from "@/lib/returns/money";
import { cx } from "@/utils/cx";

/**
 * The parallel run of one month: old figures (register) beside new (Books by tax code),
 * the difference to the centavo, and the documents behind it. Server-rendered.
 */

const STATUS_TONE: Record<MonthStatus, "done" | "blocked" | "waiting" | "neutral"> = { agree: "done", differ: "blocked", no_old: "waiting", empty: "neutral" };

export function StatusBadge({ status }: { status: MonthStatus }) {
  return <Badge tone={STATUS_TONE[status]}>{STATUS_LABELS[status]}</Badge>;
}

export const monthName = (m: string) => new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${m.slice(0, 7)}-01T00:00:00Z`));
const shortDate = (d: string | null) => (d ? new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d.slice(0, 10)}T00:00:00Z`)) : "—");

const th = "px-3 py-2.5 whitespace-nowrap";
const num = "px-3 py-2 text-end tabular-nums whitespace-nowrap";

function Table({ head, children, minWidth }: { head: ReactNode; children: ReactNode; minWidth: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-body-regular" style={{ minWidth }}>
        <thead className="text-body-medium text-text-tertiary">{head}</thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Diff({ old, nw, compared = true }: { old: number; nw: number; compared?: boolean }) {
  const d = nw - old;
  if (d === 0) return <span className="text-text-tertiary">0.00</span>;
  return <span className={cx(compared ? "text-text-error-primary" : "text-text-tertiary")}>{formatAmount(d)}</span>;
}

function Section({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <div className="border-t border-separator-border">
      <h4 className="px-5 pt-4 text-headline-medium text-text-primary">{title}</h4>
      {note && <p className="px-5 pt-1 text-caption-1-regular text-text-tertiary">{note}</p>}
      <div className="pt-2 pb-3">{children}</div>
    </div>
  );
}

function FigureRows({ title, figures }: { title: string; figures: Figure[] }) {
  return (
    <>
      <tr className="border-t border-separator-border">
        <th scope="rowgroup" colSpan={5} className="px-3 py-2 ps-5 text-start text-caption-1-semibold text-text-secondary">{title}</th>
      </tr>
      {figures.map((f) => {
        const off = f.old !== f.new;
        return (
          <tr key={`${title}-${f.key}`} className={cx("border-t border-separator-border", !f.compared && "text-text-tertiary")}>
            <th scope="row" className="px-3 py-2 ps-5 text-start text-body-regular">
              {f.label}
              {!f.compared && <span className="ms-2 text-caption-1-regular">not on this client&rsquo;s returns</span>}
            </th>
            <td className={num}>{formatAmount(f.old)}</td>
            <td className={num}>{formatAmount(f.new)}</td>
            <td className={num}><Diff old={f.old} nw={f.new} compared={f.compared} /></td>
            <td className="px-3 py-2 pe-5">{f.compared ? off ? <Badge tone="blocked">Differs</Badge> : <Badge tone="done">Same</Badge> : null}</td>
          </tr>
        );
      })}
    </>
  );
}

function Parties({ rows, columns, label }: { rows: PartyComparison[]; columns: readonly (readonly [string, string])[]; label: string }) {
  if (rows.length === 0) return <p className="px-5 text-body-regular text-text-secondary">None either side.</p>;
  const off = rows.filter((r) => !r.agrees);
  return (
    <>
      <p className="px-5 pb-2 text-body-regular text-text-secondary">
        {off.length === 0 ? `All ${rows.length} agree.` : `${off.length} of ${rows.length} differ; the ones that agree are not listed.`}
      </p>
      {off.length > 0 && (
        <Table
          minWidth="48rem"
          head={
            <tr>
              <th scope="col" className={cx(th, "ps-5 text-start")}>{label}</th>
              <th scope="col" className={cx(th, "text-start")}>Side</th>
              {columns.map(([k, l]) => <th key={k} scope="col" className={cx(th, "text-end")}>{l}</th>)}
            </tr>
          }
        >
          {off.map((r) => (
            <PartyRow key={r.key} r={r} columns={columns} />
          ))}
        </Table>
      )}
    </>
  );
}

function PartyRow({ r, columns }: { r: PartyComparison; columns: readonly (readonly [string, string])[] }) {
  const cells = (side: "old" | "new") => columns.map(([k]) => <td key={k} className={num}>{formatAmount(r[side][k])}</td>);
  return (
    <>
      <tr className="border-t border-separator-border">
        <th scope="row" rowSpan={3} className="px-3 py-2 ps-5 text-start align-top text-body-regular">
          <span className="block text-text-primary">{r.name || "(no name)"}</span>
          <span className="block text-caption-1-regular text-text-tertiary tabular-nums" dir="ltr">{r.tin || "No TIN"}</span>
        </th>
        <td className="px-3 py-2 text-text-secondary">Old</td>
        {cells("old")}
      </tr>
      <tr>
        <td className="px-3 py-2 text-text-secondary">New</td>
        {cells("new")}
      </tr>
      <tr>
        <td className="px-3 py-2 text-text-secondary">Difference</td>
        {columns.map(([k]) => <td key={k} className={num}><Diff old={r.old[k]} nw={r.new[k]} /></td>)}
      </tr>
    </>
  );
}

function Atcs({ rows }: { rows: AtcComparison[] }) {
  if (rows.length === 0) return <p className="px-5 text-body-regular text-text-secondary">No tax withheld either side.</p>;
  return (
    <Table
      minWidth="52rem"
      head={
        <tr>
          <th scope="col" className={cx(th, "ps-5 text-start")}>ATC</th>
          <th scope="col" className={cx(th, "text-start")}>For</th>
          <th scope="col" className={cx(th, "text-end")}>Income payment, old</th>
          <th scope="col" className={cx(th, "text-end")}>Income payment, new</th>
          <th scope="col" className={cx(th, "text-end")}>Tax withheld, old</th>
          <th scope="col" className={cx(th, "text-end")}>Tax withheld, new</th>
          <th scope="col" className={cx(th, "text-end")}>Difference</th>
          <th scope="col" className={cx(th, "pe-5")}><span className="sr-only">Result</span></th>
        </tr>
      }
    >
      {rows.map((a) => (
        <tr key={`${a.kind}-${a.atc}`} className="border-t border-separator-border">
          <th scope="row" className="px-3 py-2 ps-5 text-start text-body-regular">
            <span className="block tabular-nums text-text-primary">{a.atc}</span>
            <span className="block text-caption-1-regular text-text-tertiary">{a.desc}</span>
          </th>
          <td className="px-3 py-2 text-text-secondary">{WITHHOLDING_LABELS[a.kind]}</td>
          <td className={num}>{formatAmount(a.old.base)}</td>
          <td className={num}>{formatAmount(a.new.base)}</td>
          <td className={num}>{formatAmount(a.old.withheld)}</td>
          <td className={num}>{formatAmount(a.new.withheld)}</td>
          <td className={num}><Diff old={a.old.withheld} nw={a.new.withheld} /></td>
          <td className="px-3 py-2 pe-5">{a.agrees ? <Badge tone="done">Same</Badge> : <Badge tone="blocked">Differs</Badge>}</td>
        </tr>
      ))}
    </Table>
  );
}

const REASON: Record<DocumentDifference["reason"], string> = {
  old_only: "Only in the register",
  new_only: "Only in the Books",
  other_month: "Another month",
  figures: "Other figures",
};
const KIND: Record<DocumentDifference["kind"], string> = { sale: "Sale", purchase: "Purchase", cwt: "2307 received" };

function Documents({ rows, clientId }: { rows: DocumentDifference[]; clientId: string }) {
  if (rows.length === 0) return <p className="px-5 text-body-regular text-text-secondary">Every document is on both sides, in this month, with the same figures.</p>;
  const invoiceHref = (d: DocumentDifference) => (d.invoiceId ? `/app/clients/${clientId}/books/${d.kind === "purchase" ? "purchase-invoices" : "sales-invoices"}/${d.invoiceId}` : null);
  return (
    <Table
      minWidth="56rem"
      head={
        <tr>
          <th scope="col" className={cx(th, "ps-5 text-start")}>What</th>
          <th scope="col" className={cx(th, "text-start")}>Document</th>
          <th scope="col" className={cx(th, "text-end")}>Old</th>
          <th scope="col" className={cx(th, "text-end")}>New</th>
          <th scope="col" className={cx(th, "pe-5 text-start")}>Why</th>
        </tr>
      }
    >
      {rows.map((d, i) => {
        const href = invoiceHref(d);
        return (
          <tr key={`${d.reason}-${d.documentId ?? ""}-${d.invoiceId ?? ""}-${i}`} className="border-t border-separator-border align-top">
            <td className="px-3 py-2 ps-5">
              <span className="block text-text-primary">{REASON[d.reason]}</span>
              <span className="block text-caption-1-regular text-text-tertiary">{KIND[d.kind]}</span>
            </td>
            <td className="px-3 py-2">
              <span className="block text-text-primary">
                {d.reference ?? "(no number)"}
                {d.party ? <> · <bdi>{d.party}</bdi></> : null}
              </span>
              <span className="block text-caption-1-regular text-text-tertiary">
                {shortDate(d.date)}
                {href && (
                  <>
                    {" · "}
                    <Link href={href} className="rounded-sm text-button-ghost-foreground hover:underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">Open invoice</Link>
                  </>
                )}
              </span>
            </td>
            <td className={num}>{d.old == null ? "—" : formatAmount(d.old)}</td>
            <td className={num}>{d.new == null ? "—" : formatAmount(d.new)}</td>
            <td className="px-3 py-2 pe-5 text-body-regular text-text-secondary">{d.note}</td>
          </tr>
        );
      })}
    </Table>
  );
}

/** One month in full. */
export function MonthDetail({ m, clientId }: { m: MonthComparison; clientId: string }) {
  return (
    <section aria-labelledby={`pr-${m.month}`} className="min-w-0 rounded-3xl border border-border-button-default bg-background-primary-default">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <h3 id={`pr-${m.month}`} className="text-title-3-semibold text-text-primary">{monthName(m.month)}</h3>
          <p className="text-caption-1-regular text-text-tertiary">
            {m.vatRegistered ? "VAT-registered" : "Not VAT-registered: the VAT columns, SLS and SLP are not compared"} · {m.counts.old} register line{m.counts.old === 1 ? "" : "s"} · {m.counts.new} Book invoice{m.counts.new === 1 ? "" : "s"}
          </p>
        </div>
        <StatusBadge status={m.status} />
      </div>
      {m.status === "empty" ? (
        <p className="border-t border-separator-border px-5 py-4 text-body-regular text-text-secondary">No register lines and no Book invoices this month.</p>
      ) : (
        <>
          <Table
            minWidth="40rem"
            head={
              <tr className="border-t border-separator-border">
                <th scope="col" className={cx(th, "ps-5 text-start")}>Figure</th>
                <th scope="col" className={cx(th, "text-end")}>Old (register)</th>
                <th scope="col" className={cx(th, "text-end")}>New (Books)</th>
                <th scope="col" className={cx(th, "text-end")}>Difference</th>
                <th scope="col" className={cx(th, "pe-5")}><span className="sr-only">Result</span></th>
              </tr>
            }
          >
            <FigureRows title="Sales" figures={m.sales} />
            <FigureRows title="Purchases (SLP columns)" figures={m.purchases} />
          </Table>
          {m.vatRegistered && (
            <>
              <Section title="SLS per customer" note="Grouped by the first nine digits of the TIN, else the name, as on the 2550Q.">
                <Parties rows={m.sls} columns={SLS_COLUMNS} label="Customer" />
              </Section>
              <Section title="SLP per supplier">
                <Parties rows={m.slp} columns={SLP_COLUMNS} label="Supplier" />
              </Section>
            </>
          )}
          <Section title="Tax withheld per ATC" note="SAWT: 2307s received (old) and CWT or VAT withheld on Sales Invoices (new). QAP: 2307s issued (old) and EWT on Purchase Invoices (new).">
            <Atcs rows={[...m.sawt, ...m.qap]} />
          </Section>
          <Section title="Documents behind the differences" note="Matched by document: a register line's document and the Book invoice posted from it, or the 2307 that supports a Sales Invoice.">
            <Documents rows={m.documents} clientId={clientId} />
          </Section>
        </>
      )}
    </section>
  );
}
