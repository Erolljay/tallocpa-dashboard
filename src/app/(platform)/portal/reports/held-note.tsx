import Link from "next/link";
import { Notice } from "@/components/ui";
import { periodTitle } from "@/lib/ledger/statements";
import type { StatementHold, WaitingReturn } from "@/lib/portal/report-periods";
import { monthEnd, waitingReturns } from "@/lib/portal/report-periods";
import { cx } from "@/utils/cx";
import { linkClass, monthLabel } from "./shared";

/** "January to March 2026", "annual statements, year ended December 31, 2026", or both. */
function holdsWhat(r: WaitingReturn): string {
  const parts: string[] = [];
  if (r.months.length > 0) {
    const first = r.months[0];
    const last = r.months[r.months.length - 1];
    parts.push(first === last ? monthLabel(first) : `${monthLabel(first)} to ${monthLabel(last)}`);
  }
  if (r.yearEnding) parts.push(periodTitle("annual", monthEnd(r.yearEnding)).replace(/^For the /, "annual statements, "));
  return parts.join("; ");
}

/** "Q1 2026" for an amended return's label ("Q1 2026 Amended", "Q1 2026 Amended 2"). */
const basePeriod = (label: string) => label.replace(/ Amended( \d+)?$/, "");

/**
 * The statements that wait for the client's approval of their returns (REWORK 19a):
 * each return (an amended one as a correction), what it holds, and a link to approve it in Returns once it is there (a
 * return still with us has no link yet).
 */
export function HeldNote({ holds }: { holds: StatementHold[] }) {
  const returns = waitingReturns(holds);
  if (returns.length === 0) return null;
  return (
    <Notice tone="waiting">
      <p>Some of your statements show once you approve their returns.</p>
      <ul className="mt-1 space-y-1">
        {returns.map((r) => (
          <li key={r.filingId} className="flex flex-wrap items-baseline gap-x-3">
            {r.amended ? (
              <span className="text-body-medium">Corrected — waiting for your approval of the amended {r.form} for {basePeriod(r.periodLabel)}</span>
            ) : (
              <span className="text-body-medium">{r.form} · {r.periodLabel}</span>
            )}
            <span className="text-caption-1-regular text-text-secondary">{holdsWhat(r)}</span>
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
