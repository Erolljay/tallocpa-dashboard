import Link from "next/link";
import type { ReactNode } from "react";
import { RiAddLine, RiSearchLine } from "@remixicon/react";
import { Input, LinkButton } from "@/components/ui";
import { cx } from "@/utils/cx";

export interface Column {
  label: string;
  align?: "start" | "end";
}

export interface ListRow {
  key: string;
  cells: ReactNode[];
  editHref?: string | null;
  viewHref?: string | null;
  /** Void rows read struck through and quiet. */
  muted?: boolean;
}

/**
 * A Books list in Manager.io style: a toolbar (muted title, "New …" button, search),
 * a table with Edit and View on each row, and a totals row at the foot. The table
 * scrolls sideways inside its card when the screen is narrow.
 */
export function BooksList({
  title,
  newHref,
  newLabel,
  search,
  columns,
  rows,
  totals,
  empty,
  note,
  minWidth = "48rem",
}: {
  title: string;
  newHref?: string | null;
  newLabel?: string;
  /** GET search over the list: the form's action and the hidden query it keeps. */
  search?: { action: string; q: string; keep: Record<string, string | null | undefined> } | null;
  columns: Column[];
  rows: ListRow[];
  /** Cells under the columns (same length); null leaves a cell blank. */
  totals?: (ReactNode | null)[] | null;
  empty: string;
  note?: ReactNode;
  minWidth?: string;
}) {
  const actions = rows.some((r) => r.editHref !== undefined);
  const views = rows.some((r) => r.viewHref !== undefined);
  return (
    <section className="min-w-0 rounded-3xl border border-border-button-default bg-background-primary-default">
      <div className="flex flex-wrap items-center gap-3 border-b border-separator-border px-5 py-4">
        <h2 className="me-auto text-title-3-semibold text-text-secondary">{title}</h2>
        {search && (
          <form role="search" action={search.action} className="flex items-center gap-2">
            {Object.entries(search.keep).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
            <label htmlFor="books-search" className="sr-only">Search {title}</label>
            <span className="relative block">
              <RiSearchLine aria-hidden className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-icon-tertiary" />
              <Input id="books-search" name="q" type="search" defaultValue={search.q} placeholder="Search" className="w-52 ps-8" />
            </span>
          </form>
        )}
        {newHref && (
          <LinkButton href={newHref} size="sm">
            <RiAddLine aria-hidden className="size-4" />
            {newLabel}
          </LinkButton>
        )}
      </div>
      {note && <div className="border-b border-separator-border px-5 py-3 text-body-regular text-text-secondary">{note}</div>}
      {rows.length === 0 ? (
        <p className="px-5 py-6 text-body-regular text-text-secondary">{empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-body-regular" style={{ minWidth }}>
            <thead className="text-body-medium text-text-tertiary">
              <tr>
                {actions && <th scope="col" className="w-16 px-3 py-2.5 ps-5"><span className="sr-only">Edit</span></th>}
                {columns.map((c, i) => (
                  <th key={i} scope="col" className={cx("px-3 py-2.5 whitespace-nowrap", c.align === "end" ? "text-end" : "text-start", !actions && i === 0 && "ps-5")}>{c.label}</th>
                ))}
                {views && <th scope="col" className="w-16 px-3 py-2.5 pe-5"><span className="sr-only">View</span></th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className={cx("border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover", r.muted && "text-text-tertiary")}>
                  {actions && (
                    <td className="px-3 py-2 ps-5">
                      {r.editHref ? <RowLink href={r.editHref}>Edit</RowLink> : null}
                    </td>
                  )}
                  {r.cells.map((cell, i) => (
                    <td key={i} className={cx("px-3 py-2", columns[i]?.align === "end" ? "text-end tabular-nums" : "text-start", !actions && i === 0 && "ps-5", r.muted && i > 0 && "line-through")}>{cell}</td>
                  ))}
                  {views && (
                    <td className="px-3 py-2 pe-5 text-end">
                      {r.viewHref ? <RowLink href={r.viewHref}>View</RowLink> : null}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            {totals && (
              <tfoot className="border-t-2 border-separator-border text-body-medium text-text-primary">
                <tr>
                  {actions && <td className="px-3 py-2.5 ps-5" />}
                  {totals.map((t, i) => (
                    <td key={i} className={cx("px-3 py-2.5 whitespace-nowrap", columns[i]?.align === "end" ? "text-end tabular-nums" : "text-start", !actions && i === 0 && "ps-5")}>{t}</td>
                  ))}
                  {views && <td className="px-3 py-2.5 pe-5" />}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
    </section>
  );
}

function RowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-lg border border-border-button-default bg-background-primary-default px-2 py-0.5 text-caption-1-medium text-text-primary no-underline shadow-xs outline-none hover:border-border-button-hover hover:bg-background-primary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring"
    >
      {children}
    </Link>
  );
}
