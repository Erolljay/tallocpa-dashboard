import { formatPeso } from "@/lib/returns/money";
import { seriesMax, type MonthPoint } from "@/lib/portal/home";
import { cx } from "@/utils/cx";

const shortMonth = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", timeZone: "UTC" }).format(new Date(`${iso.slice(0, 7)}-01T00:00:00Z`));
const longMonth = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso.slice(0, 7)}-01T00:00:00Z`));
/** ₱12.3k, ₱1.2M: short labels that fit under a bar on a phone. */
const compact = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", notation: "compact", maximumFractionDigits: 1 });
const short = (c: number) => compact.format(c / 100);

/**
 * Six months of revenue and expenses from the Books, as paired bars, with the net
 * income under each month. Months not yet locked are drawn lighter and marked, since
 * their figures can still change. A table carries the same figures for screen readers.
 * Physical layout (bars left to right, oldest first) is kept in RTL, like any chart.
 */
export function BooksChart({ points }: { points: MonthPoint[] }) {
  const max = seriesMax(points);
  const pct = (c: number) => `${Math.max(0, Math.round((c / max) * 100))}%`;
  return (
    <figure className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption-1-medium text-text-secondary" aria-hidden>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-chart-1-active" />Revenue</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-chart-3-active" />Expenses</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full border border-dashed border-foreground-icon-tertiary" />Not yet final</span>
      </div>
      <div dir="ltr" className="grid grid-cols-6 gap-1 sm:gap-3" aria-hidden>
        {points.map((p) => (
          <div key={p.month} className="flex min-w-0 flex-col items-center gap-1.5">
            <div className={cx("flex h-36 w-full items-end justify-center gap-0.5 rounded-lg px-0.5 sm:gap-1", !p.locked && "border border-dashed border-separator-border")}>
              <span className={cx("w-1/2 max-w-5 rounded-t bg-chart-1-active", !p.locked && "opacity-60")} style={{ height: pct(p.revenue) }} />
              <span className={cx("w-1/2 max-w-5 rounded-t bg-chart-3-active", !p.locked && "opacity-60")} style={{ height: pct(p.expenses) }} />
            </div>
            <span className="text-caption-1-medium text-text-secondary">{shortMonth(p.month)}</span>
            <span className={cx("max-w-full truncate text-caption-2-medium tabular-nums", p.net < 0 ? "text-text-error-primary" : "text-text-primary")}>{p.net === 0 ? "—" : short(p.net)}</span>
          </div>
        ))}
      </div>
      <figcaption className="text-caption-1-regular text-text-tertiary">Net income under each month. Dashed months are not locked yet, so their figures may still change.</figcaption>
      <table className="sr-only">
        <caption>Revenue, expenses and net income per month</caption>
        <thead>
          <tr><th scope="col">Month</th><th scope="col">Revenue</th><th scope="col">Expenses</th><th scope="col">Net income</th><th scope="col">Status</th></tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.month}>
              <th scope="row">{longMonth(p.month)}</th>
              <td>{formatPeso(p.revenue)}</td>
              <td>{formatPeso(p.expenses)}</td>
              <td>{formatPeso(p.net)}</td>
              <td>{p.locked ? "Final" : "Not yet final"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
