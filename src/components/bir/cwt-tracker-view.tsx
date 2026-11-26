import { RiArrowDownSLine } from "@remixicon/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge, peso } from "@/components/ui";
import { STATUS_LABEL, STATUS_TONE, type TrackerDocument, type TrackerGroup, type TrackerInvoice, type TrackerTotals } from "@/lib/books/cwt-tracker";
import { cx } from "@/utils/cx";

const dateFmt = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" });
const showDate = (iso: string) => dateFmt.format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
const stampFmt = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" });
const showStamp = (iso: string) => stampFmt.format(new Date(iso));
const money = (n: number | string) => peso.format(Number(n));

/** Three figures for the year: CWT on the invoices, 2307s received for them, still to receive. */
export function CwtTrackerSummary({ totals, audience }: { totals: TrackerTotals; audience: "staff" | "client" }) {
  const tiles = [
    { label: audience === "staff" ? "CWT on Sales Invoices" : "Tax your customers withheld", value: totals.cwt },
    { label: "Covered by 2307s received", value: totals.cwt - totals.awaiting },
    { label: "Still waiting for a 2307", value: totals.awaiting, strong: totals.awaiting > 0 },
  ];
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {tiles.map((t) => (
        <div key={t.label} className="rounded-3xl border border-border-button-default bg-background-primary-default px-5 py-4">
          <dt className="text-caption-1-regular text-text-tertiary">{t.label}</dt>
          <dd className={cx("mt-1 text-title-2-medium tabular-nums", t.strong ? "text-text-error-primary" : "text-text-primary")}>{money(t.value)}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Customer × quarter rows, each opening onto its Sales Invoices: the CWT, the 2307 that
 * supports it (or that it is still awaited, followed up, or not claimed).
 */
export function CwtTrackerGroups({
  groups,
  empty,
  docHref,
  invoiceAction,
}: {
  groups: TrackerGroup[];
  empty: string;
  /** Where a 2307 opens; null to show only its name. */
  docHref?: (d: TrackerDocument) => string | null;
  /** What sits beside an invoice still waiting for its 2307 (staff: Mark followed up). */
  invoiceAction?: (i: TrackerInvoice) => ReactNode;
}) {
  if (groups.length === 0) {
    return <p className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">{empty}</p>;
  }
  return (
    <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default">
      {groups.map((g) => {
        const docs = new Map(g.documents.map((d) => [d.document_id, d]));
        return (
          <li key={g.key} className="first:rounded-t-3xl last:rounded-b-3xl">
            <details className="group">
              <summary className="grid cursor-pointer list-none grid-cols-2 items-start gap-x-4 gap-y-2 rounded-3xl px-5 py-4 outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring sm:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto] [&::-webkit-details-marker]:hidden">
                <div className="col-span-2 min-w-0 sm:col-span-1">
                  <p className="flex items-center gap-1.5 text-body-medium text-text-primary">
                    <RiArrowDownSLine aria-hidden className="size-4 shrink-0 text-foreground-icon-tertiary transition-transform group-open:rotate-180" />
                    <span className="truncate">{g.partyName}</span>
                  </p>
                  <p className="ps-5.5 text-caption-1-regular text-text-tertiary">
                    {g.quarter.label}
                    {g.partyTin ? <> · TIN <span dir="ltr">{g.partyTin}</span></> : null}
                  </p>
                </div>
                <Figure label="CWT" value={g.cwt} />
                <Figure label="2307s received" value={g.received} />
                <Figure label="Difference" value={g.difference} alert={g.difference > 0} />
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <Badge tone={g.stopped ? "neutral" : STATUS_TONE[g.status]}>{g.stopped ? "Not claimed" : STATUS_LABEL[g.status]}</Badge>
                  {g.followedUpAt && !g.stopped && <span className="text-caption-1-regular text-text-tertiary">Followed up {showStamp(g.followedUpAt)}</span>}
                </div>
              </summary>
              <div className="overflow-x-auto px-5 pb-4">
                <table className="w-full min-w-[36rem] text-body-regular">
                  <thead>
                    <tr className="border-b border-separator-border text-start text-caption-1-semibold text-text-tertiary">
                      <th scope="col" className="py-2 pe-3 text-start font-[inherit]">Sales Invoice</th>
                      <th scope="col" className="py-2 pe-3 text-start font-[inherit]">ATC</th>
                      <th scope="col" className="py-2 pe-3 text-end font-[inherit]">CWT</th>
                      <th scope="col" className="py-2 text-start font-[inherit]">2307</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-separator-border">
                    {g.invoices.map((i) => {
                      const d = i.document_id ? docs.get(i.document_id) : undefined;
                      const href = d && docHref ? docHref(d) : null;
                      return (
                        <tr key={i.invoice_id} className="align-top">
                          <td className="py-2 pe-3 text-text-primary">
                            {i.reference ?? "(no number)"}
                            <span className="block text-caption-1-regular text-text-tertiary">{showDate(i.issue_date)}{i.locked ? "" : " · month open"}</span>
                          </td>
                          <td className="py-2 pe-3 text-text-secondary">{i.atc ?? "—"}</td>
                          <td className="py-2 pe-3 text-end tabular-nums text-text-primary">{money(i.withholding)}</td>
                          <td className="py-2 text-text-secondary">
                            {d ? (
                              <span>
                                {href ? <Link href={href} className="text-button-ghost-foreground hover:underline">{d.number || d.file_name}</Link> : d.number || d.file_name}
                                <span className="block text-caption-1-regular text-text-tertiary">{money(d.withholding)} · {showDate(d.date)}</span>
                              </span>
                            ) : i.claim === "stop" ? (
                              <span>Not claimed (client&rsquo;s decision)</span>
                            ) : (
                              <span className="block space-y-1">
                                <span className="block text-text-error-primary">Awaiting 2307</span>
                                {i.followed_up_at && (
                                  <span className="block text-caption-1-regular text-text-tertiary">
                                    Followed up {showStamp(i.followed_up_at)}{i.follow_up_note ? `: ${i.follow_up_note}` : ""}
                                  </span>
                                )}
                                {invoiceAction?.(i)}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </details>
          </li>
        );
      })}
    </ul>
  );
}

function Figure({ label, value, alert }: { label: string; value: number; alert?: boolean }) {
  return (
    <div className="min-w-0 sm:text-end">
      <p className="text-caption-1-regular text-text-tertiary">{label}</p>
      <p className={cx("tabular-nums text-body-medium", alert ? "text-text-error-primary" : "text-text-primary")}>{money(value)}</p>
    </div>
  );
}

/** 2307s on their own: approved but supporting no invoice, or still waiting for review. */
export function CwtLooseDocuments({ title, text, docs, docHref }: { title: string; text: string; docs: TrackerDocument[]; docHref?: (d: TrackerDocument) => string | null }) {
  if (docs.length === 0) return null;
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-headline-semibold text-text-primary">{title}</h3>
        <p className="text-body-regular text-text-secondary">{text}</p>
      </div>
      <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default">
        {docs.map((d) => {
          const href = docHref?.(d) ?? null;
          return (
            <li key={d.document_id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3">
              <div className="min-w-0">
                {href ? <Link href={href} className="text-body-medium text-button-ghost-foreground hover:underline">{d.party_name || d.file_name}</Link> : <p className="text-body-medium text-text-primary">{d.party_name || d.file_name}</p>}
                <p className="text-caption-1-regular text-text-tertiary">
                  {d.number ? `${d.number} · ` : ""}{showDate(d.date)}{d.atc ? ` · ${d.atc}` : ""}{d.party_tin ? <> · TIN <span dir="ltr">{d.party_tin}</span></> : null}
                </p>
              </div>
              <span className="tabular-nums text-body-medium text-text-primary">{money(d.withholding)}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
