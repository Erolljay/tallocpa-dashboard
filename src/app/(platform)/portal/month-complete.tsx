"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Badge, Button, Card, peso } from "@/components/ui";
import { confirmMonthAction, undoMonthAction, type CycleState } from "@/lib/cycle/actions";
import type { MissingRange } from "@/lib/cycle/month";
import { cx } from "@/utils/cx";

export interface SentRow {
  label: string;
  count: number;
  /** How many staff have checked (approved or posted). */
  checked: number;
}

/** A standing monthly request of the month: open (to upload), sent (we are checking it) or done. */
export interface StandingRow {
  id: string;
  label: string;
  state: "open" | "sent" | "done";
}

export interface TimelineRow {
  date: string;
  title: string;
  detail?: string;
  done: boolean;
}

/**
 * "I've sent everything for <month>" (P1; Owner's decisions 18 and 19): what was
 * sent and how far each kind is checked, the missing invoice numbers to answer
 * first, a confirm step, and what happens next. Undo until the cutoff.
 */
export function MonthComplete(props: {
  clientId: string;
  business: string | null;
  period: string;
  month: string;
  cutoff: string;
  daysLeft: number;
  canUndo: boolean;
  confirmed: { on: string; count: number | null } | null;
  sent: SentRow[];
  standing: StandingRow[];
  ranges: MissingRange[];
  cwt: { party: string; amount: number }[];
  reading: number;
  timeline: TimelineRow[];
}) {
  const [cancelled, setCancelled] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState<Set<string>>(new Set());
  const [asking, setAsking] = useState(false);
  const numbers = props.ranges.filter((r) => cancelled.has(r.key)).flatMap((r) => r.numbers.map((n) => ({ prefix: n.prefix, num: n.num })));
  const [state, confirm, pending] = useActionState(() => confirmMonthAction(props.clientId, props.period, numbers), {} as CycleState);
  const [undoState, undo, undoing] = useActionState(() => undoMonthAction(props.clientId, props.period), {} as CycleState);
  const open = props.ranges.filter((r) => !cancelled.has(r.key));
  const total = props.sent.reduce((a, r) => a + r.count, 0);
  const title = `${props.business ? `${props.business}: ` : ""}${props.month} documents`;
  const toggle = (set: Set<string>, key: string, on: boolean) => {
    const next = new Set(set);
    if (on) next.add(key);
    else next.delete(key);
    return next;
  };

  return (
    <Card title={title} actions={<span className="text-caption-1-regular text-text-tertiary">Due {props.cutoff}{props.daysLeft > 0 ? ` · ${props.daysLeft} day${props.daysLeft === 1 ? "" : "s"} left` : props.daysLeft === 0 ? " · today" : ""}</span>}>
      <div className="space-y-5">
        {props.confirmed && (
          <div role="status" className="space-y-2 rounded-2xl bg-status-lime-background/50 px-4 py-3">
            <p className="text-body-medium text-text-primary">{props.month} is complete. Thank you.</p>
            <p className="text-body-regular text-text-secondary">
              You confirmed {props.confirmed.count ?? total} document{(props.confirmed.count ?? total) === 1 ? "" : "s"} on {props.confirmed.on}. Found something else? You can still send it; it will be marked late.
            </p>
            {props.canUndo ? (
              <form action={undo} className="flex flex-wrap items-center gap-2">
                <Button type="submit" size="sm" variant="secondary" disabled={undoing}>{undoing ? "Undoing…" : `Undo, until the cutoff on ${props.cutoff}`}</Button>
                {undoState.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{undoState.error}</span>}
              </form>
            ) : (
              <p className="text-caption-1-regular text-text-tertiary">The cutoff has passed. To reopen the month, ask us under Requests.</p>
            )}
          </div>
        )}

        <section aria-label={`What you've sent for ${props.month}`}>
          <h3 className="mb-2 text-headline-semibold text-text-primary">What you&apos;ve sent for {props.month}</h3>
          <table className="w-full text-body-regular">
            <tbody>
              {props.sent.map((r) => (
                <tr key={r.label} className="border-t border-separator-border first:border-t-0">
                  <td className="py-2 pe-3 text-text-primary">{r.label}</td>
                  <td className="py-2 pe-3 text-end tabular-nums text-text-primary">{r.count}</td>
                  <td className="py-2 text-end">
                    {r.checked >= r.count ? <Badge tone="done">Checked</Badge> : r.checked > 0 ? <Badge tone="progress">{r.checked} checked</Badge> : <Badge tone="progress">Being checked</Badge>}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-separator-border">
                <td className="py-2 pe-3 text-body-medium text-text-primary">Total</td>
                <td className="py-2 pe-3 text-end text-body-medium tabular-nums text-text-primary">{total}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </section>

        {props.standing.length > 0 && (
          <section aria-label="Every month we ask for" className="space-y-2">
            <h3 className="text-headline-semibold text-text-primary">Every month we also ask for</h3>
            <ul className="divide-y divide-separator-border text-body-regular">
              {props.standing.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-2">
                  <Link href={`/portal/requests/${r.id}`} className="min-w-0 text-text-primary hover:underline">{r.label}</Link>
                  {r.state === "done" ? <Badge tone="done">Received</Badge> : r.state === "sent" ? <Badge tone="progress">Being checked</Badge> : <Badge tone="waiting">To upload</Badge>}
                </li>
              ))}
            </ul>
            {props.standing.some((r) => r.state === "open") && (
              <p className="text-caption-1-regular text-text-tertiary">Upload {props.standing.filter((r) => r.state === "open").length === 1 ? "it" : "them"} under Requests when you have {props.standing.filter((r) => r.state === "open").length === 1 ? "it" : "them"}. {props.confirmed ? "" : "You can confirm the month without them."}</p>
            )}
          </section>
        )}

        {!props.confirmed && (
          <section aria-label="Before you confirm" className="space-y-3">
            <h3 className="text-headline-semibold text-text-primary">Before you confirm</h3>
            {props.ranges.length === 0 && props.cwt.length === 0 && (
              <p className="text-body-regular text-text-secondary">Nothing missing that we can see{props.reading ? ` so far (${props.reading} sales invoice${props.reading === 1 ? " is" : "s are"} still being read)` : ""}.</p>
            )}
            {props.ranges.map((r) => {
              const isCancelled = cancelled.has(r.key);
              return (
                <div key={r.key} className={cx("space-y-2 rounded-2xl px-4 py-3", isCancelled ? "bg-background-secondary-default" : "bg-status-yellow-background/50")}>
                  {isCancelled ? (
                    <p className="text-body-regular text-text-secondary">
                      {r.label}: you said {r.numbers.length === 1 ? "it was" : "they were"} cancelled. Please keep all copies of cancelled invoices.{" "}
                      <button type="button" onClick={() => setCancelled(toggle(cancelled, r.key, false))} className="text-button-ghost-foreground hover:underline">Change</button>
                    </p>
                  ) : (
                    <>
                      <p className="text-body-medium text-text-primary">
                        Sales invoice{r.numbers.length === 1 ? "" : "s"} {r.label} {r.numbers.length === 1 ? "isn't" : "aren't"} here. {r.numbers.length === 1 ? "Was it" : "Were they"} cancelled?
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button size="sm" variant="secondary" onClick={() => setUploading(toggle(uploading, r.key, true))}>Upload {r.numbers.length === 1 ? "it" : "them"}</Button>
                        <Button size="sm" variant="secondary" onClick={() => setCancelled(toggle(cancelled, r.key, true))}>{r.numbers.length === 1 ? "It was" : "They were"} cancelled</Button>
                      </div>
                      {uploading.has(r.key) && (
                        <p className="text-caption-1-regular text-text-secondary">Send {r.numbers.length === 1 ? "it" : "them"} under <Link href="/portal/upload?stream=sales" className="text-button-ghost-foreground underline">Upload, Sales</Link>. This list updates once we&apos;ve read {r.numbers.length === 1 ? "it" : "them"}, usually within a minute.</p>
                      )}
                    </>
                  )}
                </div>
              );
            })}
            {props.cwt.map((c) => (
              <p key={c.party} className="rounded-2xl bg-background-secondary-default px-4 py-3 text-body-regular text-text-secondary">
                {c.party} withheld {peso.format(c.amount)} from your sales this quarter, and we don&apos;t have its 2307 yet. Please ask them for it; you can still confirm {props.month}.
              </p>
            ))}
            {props.reading > 0 && (props.ranges.length > 0 || props.cwt.length > 0) && (
              <p className="text-caption-1-regular text-text-tertiary">{props.reading} sales invoice{props.reading === 1 ? " is" : "s are"} still being read and not counted yet.</p>
            )}

            {asking ? (
              <div className="space-y-3 rounded-2xl border border-accent-500 bg-accent-50 px-4 py-3">
                <p className="text-body-medium text-text-primary">Confirm {props.month} is complete?</p>
                <p className="text-body-regular text-text-secondary">You&apos;re confirming {total} document{total === 1 ? "" : "s"} for {props.month}. If you find something later you can still send it; it will be marked late.</p>
                <form action={confirm} className="flex flex-wrap items-center gap-2">
                  <Button type="submit" disabled={pending}>{pending ? "Confirming…" : `Yes, ${props.month} is complete`}</Button>
                  <Button variant="secondary" onClick={() => setAsking(false)}>Not yet</Button>
                </form>
                {state.error && <p role="alert" className="text-body-regular text-text-error-primary">{state.error}</p>}
              </div>
            ) : (
              <div className="space-y-1">
                <Button className="w-full justify-center" disabled={open.length > 0} onClick={() => setAsking(true)}>
                  I&apos;ve sent everything for {props.month}
                </Button>
                {open.length > 0 && <p className="text-center text-caption-1-regular text-text-tertiary">Answer the missing invoices first.</p>}
              </div>
            )}
          </section>
        )}

        <section aria-label="What happens next">
          <h3 className="mb-2 text-headline-semibold text-text-primary">What happens next</h3>
          <ol className="space-y-3">
            {props.timeline.map((t, i) => (
              <li key={`${t.date}-${i}`} className="flex gap-3">
                <span className={cx("w-16 shrink-0 text-caption-1-medium tabular-nums", t.done ? "text-status-lime-text" : "text-text-tertiary")}>{t.date}</span>
                <span className="min-w-0">
                  <span className={cx("block text-body-medium", t.done ? "text-text-secondary" : "text-text-primary")}>{t.title}{t.done ? " ✓" : ""}</span>
                  {t.detail && !t.done && <span className="block text-caption-1-regular text-text-tertiary">{t.detail}</span>}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Card>
  );
}
