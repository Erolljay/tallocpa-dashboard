import Link from "next/link";
import { Notice } from "@/components/ui";
import type { StatementHold } from "@/lib/portal/report-periods";
import { waitingReturns } from "@/lib/portal/report-periods";
import { cx } from "@/utils/cx";
import { linkClass, monthLabel } from "./shared";

/**
 * The closed months whose statements wait for the client's approval of their returns
 * (Owner, option b): which months, and each return with a link to approve it in
 * Returns once it is there (a return still with us has no link yet).
 */
export function HeldNote({ holds }: { holds: StatementHold[] }) {
  const returns = waitingReturns(holds);
  if (returns.length === 0) return null;
  const months = [...new Set(holds.map((h) => h.month))].sort();
  const span = months.length === 1 ? monthLabel(months[0]) : `${monthLabel(months[0])} to ${monthLabel(months[months.length - 1])}`;
  return (
    <Notice tone="waiting">
      <p>Your statements for {span} show once you approve the returns for those months.</p>
      <ul className="mt-1 space-y-1">
        {returns.map((r) => (
          <li key={r.filingId} className="flex flex-wrap items-baseline gap-x-3">
            <span className="text-body-medium">{r.form} · {r.periodLabel}</span>
            {r.status === "reviewed" ? (
              <Link href={`/portal/returns#return-${r.filingId}`} className={cx(linkClass, "pointer-coarse:py-2")}>Review and approve</Link>
            ) : (
              <span className="text-caption-1-regular text-text-secondary">We are still preparing it</span>
            )}
          </li>
        ))}
      </ul>
    </Notice>
  );
}
