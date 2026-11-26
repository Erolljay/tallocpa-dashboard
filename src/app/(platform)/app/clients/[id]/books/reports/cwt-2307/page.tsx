import Link from "next/link";
import { Suspense } from "react";
import { CwtFollowUpForm } from "@/components/bir/cwt-forms";
import { CwtLooseDocuments, CwtTrackerGroups, CwtTrackerSummary } from "@/components/bir/cwt-tracker-view";
import { Notice, Skeleton } from "@/components/ui";
import { loadCwtTracker } from "@/lib/books/load-cwt-tracker";
import { booksHref } from "@/lib/books/ui";
import { cx } from "@/utils/cx";
import { BooksFrame } from "../../books-frame";
import { booksContext, one } from "../../books-context";

export default function Cwt2307TrackerPage(props: PageProps<"/app/clients/[id]/books/reports/cwt-2307">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Tracker params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

/**
 * The 2307 tracker: for the taxable year of the Books month, the CWT customers withheld on
 * the client's Sales Invoices beside the 2307s the client sent us, per customer and quarter.
 * Staff mark the invoices whose 2307 they asked the customer for; the client sees the same
 * list (locked months only) in the portal.
 */
async function Tracker({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books/reports/cwt-2307">, "params" | "searchParams">) {
  const c = await booksContext(params, searchParams);
  const t = await loadCwtTracker(c.supabase, c.id, c.month, c.client.fiscal_year_end_month ?? 12);
  const open = one(c.sp.show) === "open";
  const shown = open ? t.groups.filter((g) => g.status !== "complete" && !g.stopped) : t.groups;
  const path = (show: string | null) => booksHref(c.id, "reports", c.month, { show }, "/cwt-2307");
  const docHref = (d: { document_id: string }) => `/app/documents/${d.document_id}`;
  const openMonths = t.months.filter((m) => !m.locked && m.month <= c.month);

  return (
    <BooksFrame supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="reports" sub="/cwt-2307" query={{ show: open ? "open" : null }}>
      <div className="min-w-0">
        <h2 className="text-title-2-medium text-text-primary">2307 tracker · {t.year.label}</h2>
        <p className="mt-1 text-body-regular text-text-secondary">
          Tax customers withheld on the client&rsquo;s Sales Invoices (CWT) against the BIR 2307s the client sent us, per customer and quarter. A 2307 is tied to its invoices when it is approved: same customer, same ATC, in its quarter or the one before. Open a row for its invoices.
        </p>
      </div>
      <CwtTrackerSummary totals={t.totals} audience="staff" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-body-regular text-text-secondary">
          {t.totals.missing + t.totals.partial === 0
            ? "Every customer's 2307s are in."
            : `${t.totals.missing} missing, ${t.totals.partial} partial.`}
        </p>
        <nav aria-label="Show" className="flex gap-1 rounded-full border border-border-button-default p-1">
          {[{ v: null, l: "All" }, { v: "open", l: "Outstanding" }].map((o) => (
            <Link
              key={o.l}
              href={path(o.v)}
              aria-current={(o.v === "open") === open ? "page" : undefined}
              className={cx(
                "rounded-full px-3 py-1 text-body-medium outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                (o.v === "open") === open ? "bg-background-tertiary-default text-text-primary" : "text-text-secondary hover:text-text-primary",
              )}
            >
              {o.l}
            </Link>
          ))}
        </nav>
      </div>
      {openMonths.length > 0 && (
        <Notice tone="waiting">Not locked yet: {openMonths.length} month{openMonths.length === 1 ? "" : "s"} up to this one. Those invoices may still change, and the client does not see them in the portal yet.</Notice>
      )}
      <CwtTrackerGroups
        groups={shown}
        empty={open ? "Nothing outstanding: every Sales Invoice with CWT has its 2307." : `No Sales Invoice with tax withheld (a WC / WI code) in ${t.year.label}.`}
        docHref={docHref}
        invoiceAction={(i) => <CwtFollowUpForm clientId={c.id} invoiceId={i.invoice_id} again={Boolean(i.followed_up_at)} />}
      />
      <CwtLooseDocuments
        title="2307s not tied to an invoice"
        text="Approved, but no Sales Invoice of the customer matched. Open one to see why and match it again once the invoice is in the Books."
        docs={t.unmatched}
        docHref={docHref}
      />
      <CwtLooseDocuments title="2307s waiting for review" text="In the Inbox. They are tied to the invoices once approved." docs={t.pending} docHref={docHref} />
    </BooksFrame>
  );
}
