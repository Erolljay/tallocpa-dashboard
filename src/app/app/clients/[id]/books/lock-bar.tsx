import { RiLockLine, RiLockUnlockLine, RiTimeLine } from "@remixicon/react";
import { Suspense } from "react";
import { BOOKS_MONTH_STATUS_LABELS, isLocked } from "@/lib/books/periods";
import { manilaToday } from "@/lib/filings/run";
import { lockActionFor, lockActionLabel, lockStatusText, monthName, type LockMonth } from "@/lib/lock/month-lock";
import { cx } from "@/utils/cx";
import { loadLockContext, type LockContext } from "./lock-data";
import { LockControl } from "./lock-controls";

/**
 * The Books header's month lock (docs/REWORK.md, decision 9): the month's status and
 * the viewer's action on it. `month` is the first day of the month, YYYY-MM-DD.
 */
export function BooksLockBar({ clientId, month }: { clientId: string; month: string /* YYYY-MM-01 */ }) {
  return (
    <Suspense fallback={<div className="h-9 w-64 animate-pulse rounded-full bg-background-secondary-default" aria-busy="true" aria-label="Loading the month lock" />}>
      <LockBarFor clientId={clientId} month={`${month.slice(0, 7)}-01`} />
    </Suspense>
  );
}

async function LockBarFor({ clientId, month }: { clientId: string; month: string }) {
  const ctx = await loadLockContext(clientId, Number(month.slice(0, 4)));
  const m = ctx.months.find((r) => r.month.slice(0, 10) === month);
  if (!m) return null;
  return <MonthLock clientId={clientId} month={m} ctx={ctx} />;
}

const ICON = { open: RiLockUnlockLine, lock_requested: RiTimeLine, locked: RiLockLine, unlock_requested: RiTimeLine } as const;

/** One month's status pill, its detail and the viewer's control. Used by the bar and the months page. */
export function MonthLock({ clientId, month: m, ctx, compact = false }: { clientId: string; month: LockMonth; ctx: LockContext; compact?: boolean }) {
  const month = m.month.slice(0, 10);
  const action = lockActionFor({ ...m, month }, ctx.viewer, manilaToday());
  const nameOf = (id: string | null) => (id ? (ctx.names[id] ?? null) : null);
  const Icon = ICON[m.status];
  const locked = isLocked(m.status);
  return (
    <div className={cx("flex flex-wrap items-start gap-x-3 gap-y-2", compact ? "justify-between" : "")}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span
          className={cx(
            "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-caption-1-semibold",
            locked ? "border-accent-600 text-accent-600" : "border-border-button-default text-text-secondary",
          )}
          title={BOOKS_MONTH_STATUS_LABELS[m.status]}
        >
          <Icon aria-hidden className="size-3.5 shrink-0" />
          {lockStatusText({ ...m, month }, nameOf)}
        </span>
        {m.request_reason && (m.status === "unlock_requested" || m.status === "lock_requested") && (
          <p className="text-caption-1-regular text-text-tertiary">Reason: {m.request_reason}</p>
        )}
        {m.status === "open" && m.in_books && m.waiting_documents > 0 && !action && (
          <p className="text-caption-1-regular text-text-tertiary">{m.waiting_documents} in the Inbox</p>
        )}
      </div>
      {action && (
        <LockControl
          clientId={clientId}
          month={month}
          monthLabel={monthName(month)}
          action={action}
          label={lockActionLabel(action, month, ctx.reviewerName)}
          filed={m.lock_source === "filed"}
          request={m.status === "unlock_requested" ? { reason: m.request_reason, by: nameOf(m.requested_by) } : null}
        />
      )}
    </div>
  );
}
