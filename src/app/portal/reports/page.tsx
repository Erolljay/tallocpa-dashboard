import { RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { BOOK_KINDS, BOOK_TITLES } from "@/lib/ledger/books";
import { periodTitle, REPORT_KINDS, type ReportKind } from "@/lib/ledger/statements";
import { loadPortalBooks, portalBooksClient } from "@/lib/portal/books";
import { filedYears, groupFiledReturns, type FiledFileRow, type FiledReturnRow, type LegacyFileRow } from "@/lib/portal/filed-returns";
import { booksYears, lockedMonths, monthEnd, statementPeriods, type StatementHold } from "@/lib/portal/report-periods";
import { cx } from "@/utils/cx";
import { portalContext } from "../client-context";
import { HeldNote } from "./held-note";
import { ParamSelect } from "./param-select";
import { emptyClass, linkClass, listClass, monthLabel, pickClient, reportsHref, rowLi } from "./shared";

export default function PortalReports(props: PageProps<"/portal/reports">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Reports searchParams={props.searchParams} />
    </Suspense>
  );
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" }).format(new Date(iso));

/**
 * Client portal Reports (decision 19), phone first: financial statements for locked
 * months whose returns the client has approved (Owner, option b), the loose-leaf
 * books for locked months, filed returns per year per tax type with
 * the scanned copy, the 2307s and the released 2316s. No payroll or BIR-list sections.
 */
async function Reports({ searchParams }: Pick<PageProps<"/portal/reports">, "searchParams">) {
  const q = await searchParams;
  const { supabase, clients } = await portalContext();
  const picked = pickClient(clients, q.client);
  if (!picked) {
    return (
      <div className="space-y-6">
        <h1 className="text-title-1-medium text-text-primary">Reports</h1>
        <p className={emptyClass}>Your reports will appear here once your business is set up with us.</p>
      </div>
    );
  }
  const clientId = picked.id;
  const [client, books, { data: filings }, { data: releases }, { data: released }] = await Promise.all([
    portalBooksClient(supabase, clientId),
    loadPortalBooks(supabase, clientId),
    supabase.from("filing_instances").select("id, client_id, form, period_label, period_end, filing_reference").eq("client_id", clientId).eq("status", "filed").order("period_end", { ascending: false }).limit(500),
    supabase.from("payroll_2316_releases").select("year, released_at").eq("client_id", clientId).order("year", { ascending: false }),
    supabase.from("client_reports").select("id, kind, period_end, note, released_at").eq("client_id", clientId).order("period_end", { ascending: false }).order("kind").limit(24),
  ]);
  const fye = client?.fiscal_year_end_month ?? 12;
  const months = lockedMonths(books?.booksStart ?? null, books?.lockedThrough ?? null);

  const rows = (filings ?? []) as FiledReturnRow[];
  const years = filedYears(rows);
  const year = years.find((y) => String(y) === q.year) ?? years[0] ?? null;
  const ids = rows.filter((r) => Number(r.period_end.slice(0, 4)) === year).map((r) => r.id);
  const [{ data: files }, { data: legacy }] = ids.length
    ? await Promise.all([
        supabase.from("filing_files").select("id, filing_instance_id, kind").in("filing_instance_id", ids).is("replaced_at", null).order("created_at"),
        supabase.from("documents").select("id, filing_instance_id, doc_type").in("filing_instance_id", ids).eq("doc_type", "filed_return").in("status", ["received", "under_review", "posted"]),
      ])
    : [{ data: [] }, { data: [] }];
  const groups = year == null ? [] : groupFiledReturns(rows, (files ?? []) as FiledFileRow[], (legacy ?? []) as LegacyFileRow[], year);

  const client1 = clients.length > 1 ? clientId : null;
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-title-1-medium text-text-primary">Reports</h1>
        {clients.length > 1 && (
          <ParamSelect name="client" label="Business" value={clientId} options={clients.map((c) => ({ value: c.id, label: c.name }))} clear={["year"]} className="max-w-full sm:w-64" />
        )}
      </div>

      <Statements clientId={client1} closed={months} holds={books?.statementHolds ?? []} fye={fye} released={(released ?? []) as Released[]} />

      <Section title="Filed returns" description="Each return we filed for you, with its scanned copy (the return, proof of payment and attachments) and the BIR's validation report." action={years.length > 1 && year != null ? (
        <ParamSelect name="year" label="Year" value={String(year)} options={years.map((y) => ({ value: String(y), label: String(y) }))} className="w-28" />
      ) : null}>
        {groups.length === 0 ? (
          <p className={emptyClass}>Your returns appear here once they are filed.</p>
        ) : (
          <div className="space-y-4">
            {groups.map((g) => (
              <div key={g.taxType} className="space-y-2">
                <h3 className="text-headline-semibold text-text-primary">{g.taxType}{years.length === 1 ? ` · ${year}` : ""}</h3>
                <ul className={listClass}>
                  {g.returns.map((r) => (
                    <li key={r.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3">
                      <span className="min-w-0">
                        <span className="block text-body-medium text-text-primary">{r.form} · {r.period_label}</span>
                        {r.filing_reference && <span className="block text-caption-1-regular text-text-tertiary">Ref. {r.filing_reference}</span>}
                      </span>
                      <span className="flex flex-wrap gap-x-4 gap-y-1">
                        {r.copyHref ? (
                          <a href={r.copyHref} target="_blank" rel="noopener" className={cx(linkClass, "pointer-coarse:py-2")}>Scanned copy</a>
                        ) : (
                          <span className="text-caption-1-regular text-text-tertiary">Copy to follow</span>
                        )}
                        {r.validationHref && <a href={r.validationHref} target="_blank" rel="noopener" className={cx(linkClass, "pointer-coarse:py-2")}>Validation report</a>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="BIR 2307" description="Certificates of creditable tax withheld from your suppliers: per supplier, per transaction, month or quarter.">
        <NavRow href={reportsHref("/portal/reports/2307", { client: client1 })} title="Open your 2307s" />
      </Section>

      <Section title="BIR 2316" description="Your employees' certificates of compensation and tax withheld, once we release the year.">
        {(releases ?? []).length === 0 ? (
          <p className={emptyClass}>Nothing released yet. We release the 2316s after the year&rsquo;s payroll is final.</p>
        ) : (
          <ul className={listClass}>
            {releases!.map((r) => (
              <li key={r.year} className={rowLi}>
                <NavRow href={`/portal/reports/2316/${clientId}/${r.year}`} title={`${r.year}`} detail={`Released ${when(r.released_at)}`} bare />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <BooksSection clientId={client1} months={months} fye={fye} />
    </div>
  );
}

interface Released {
  id: string;
  kind: ReportKind;
  period_end: string;
  note: string | null;
  released_at: string;
}

function Statements({ clientId, closed, holds, fye, released }: { clientId: string | null; closed: string[]; holds: StatementHold[]; fye: number; released: Released[] }) {
  // The latest report of each kind offered: on a closed month whose returns the client has approved.
  const periods = statementPeriods(closed, holds, fye).reverse();
  const latest = (["monthly", "quarterly", "annual"] as ReportKind[])
    .map((kind) => ({ kind, month: periods.find((p) => p.kinds.includes(kind))?.month }))
    .filter((x): x is { kind: ReportKind; month: string } => !!x.month);
  return (
    <Section title="Financial statements" description="Balance sheet, income statement and notes, from your books for the months we have closed and you have approved the returns.">
      <HeldNote holds={holds} />
      {latest.length === 0 ? (
        closed.length === 0 ? <p className={emptyClass}>Your statements appear here once we close the first month of your books.</p> : null
      ) : (
        <ul className={listClass}>
          {latest.map(({ kind, month }) => (
            <li key={kind} className={rowLi}>
              <NavRow
                href={reportsHref("/portal/reports/statements", { client: clientId, kind, month: month.slice(0, 7) })}
                title={`${REPORT_KINDS[kind]} · ${kind === "monthly" ? monthLabel(month) : periodTitle(kind, monthEnd(month)).replace(/^For the /, "")}`}
                bare
              />
            </li>
          ))}
          <li className={rowLi}>
            <NavRow href={reportsHref("/portal/reports/statements", { client: clientId })} title="Another month" detail="Any closed month, quarter or year" bare />
          </li>
        </ul>
      )}
      {released.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-headline-semibold text-text-primary">Sent to you with a note</h3>
          <ul className={listClass}>
            {released.map((r) => (
              <li key={r.id} className={rowLi}>
                <NavRow href={`/portal/reports/${r.id}`} title={`${REPORT_KINDS[r.kind]} · ${periodTitle(r.kind, r.period_end).replace(/^For the /, "")}`} detail={`Released ${when(r.released_at)}${r.note ? ` · ${r.note}` : ""}`} bare />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}

function BooksSection({ clientId, months, fye }: { clientId: string | null; months: string[]; fye: number }) {
  const [year] = booksYears(months, fye);
  return (
    <Section title="Books of account" description="Your loose-leaf books in the BIR format, for each closed month and bound for the year.">
      {!year ? (
        <p className={emptyClass}>Your books appear here once we close the first month.</p>
      ) : (
        <ul className={listClass}>
          {BOOK_KINDS.map((kind) => (
            <li key={kind} className={rowLi}>
              <NavRow
                href={reportsHref("/portal/reports/books/print", { client: clientId, book: kind, from: year.from, to: year.to })}
                title={BOOK_TITLES[kind]}
                detail={`${year.label}, ${year.complete ? "bound for the year" : `${monthLabel(year.from)} to ${monthLabel(year.to)} so far`}`}
                bare
              />
            </li>
          ))}
          <li className={rowLi}>
            <NavRow href={reportsHref("/portal/reports/books", { client: clientId })} title="Each month and earlier years" bare />
          </li>
        </ul>
      )}
    </Section>
  );
}

function Section({ title, description, action, children }: { title: string; description?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h2 className="text-title-3-semibold text-text-primary">{title}</h2>
          {description && <p className="text-body-regular text-text-secondary">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

/** A tappable row with a chevron; `bare` inside a list, else as its own card. */
function NavRow({ href, title, detail, bare = false }: { href: string; title: string; detail?: string; bare?: boolean }) {
  return (
    <Link
      href={href}
      className={cx(
        "flex items-center justify-between gap-3 px-4 py-3 outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-14",
        bare ? "focus-visible:ring-inset" : "rounded-3xl border border-border-button-default bg-background-primary-default",
      )}
    >
      <span className="min-w-0">
        <span className="block text-body-medium text-text-primary">{title}</span>
        {detail && <span className="block truncate text-caption-1-regular text-text-tertiary">{detail}</span>}
      </span>
      <RiArrowRightSLine aria-hidden className="size-5 shrink-0 text-foreground-icon-tertiary rtl:-scale-x-100" />
    </Link>
  );
}
