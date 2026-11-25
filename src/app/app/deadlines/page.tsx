import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { loadBoard, loadCoverage, type BoardRow } from "@/lib/deadlines/safeguards-load";
import { RISK_LABELS, type RiskState, type StepWho } from "@/lib/deadlines/safeguards";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { GenerateButton } from "./generate-button";
import { FilingsTabs } from "@/app/app/nav/section-tabs";

export default function DeadlinesPage(props: PageProps<"/app/deadlines">) {
  return (
    <>
      <PageHeader
        title="Filings"
        description="Every BIR filing due in the next 60 days, and any overdue, with the person on it, its steps and a status. A filing is done once its proof is recorded."
      />
      <FilingsTabs active="deadlines" />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Deadlines searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

const TONE: Record<RiskState, "blocked" | "waiting" | "progress" | "done"> = { overdue: "blocked", critical: "blocked", at_risk: "waiting", on_track: "progress", filed: "done" };
const WHO: Record<StepWho, string> = { client: "Client", preparer: "Preparer", reviewer: "Reviewer", owner: "Owner" };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

async function Deadlines({ searchParams }: Pick<PageProps<"/app/deadlines">, "searchParams">) {
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const sp = await searchParams;
  // Staff and reviewers see the filings of their own clients first; the Owner sees all.
  const mine = one(sp.show) === "mine" || (!owner && one(sp.show) !== "all");
  const supabase = await supabaseServer();
  const today = manilaToday();
  const [board, gaps] = await Promise.all([loadBoard(supabase, today, mine ? { userId: me.userId } : {}), owner ? loadCoverage(supabase, today) : Promise.resolve([])]);
  const count = (s: RiskState) => board.filter((r) => r.risk.state === s).length;

  return (
    <div className="space-y-6">
      {owner && (
        <Notice>
          Deadline rules and holidays are starting figures until checked. Review and edit them in <Link href="/app/settings" className="text-button-ghost-foreground underline">Settings</Link>.
        </Notice>
      )}
      {owner && <GenerateButton />}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["overdue", "critical", "at_risk", "on_track"] as const).map((s) => (
          <div key={s} className="rounded-2xl border border-border-button-default bg-background-primary-default px-4 py-3">
            <p className="text-caption-1-regular text-text-tertiary">{RISK_LABELS[s]}</p>
            <p className={cx("text-title-2-medium tabular-nums", count(s) > 0 && (s === "overdue" || s === "critical") ? "text-text-error-primary" : "text-text-primary")}>{count(s)}</p>
          </div>
        ))}
      </div>

      {owner && gaps.length > 0 && (
        <Card title={`Coverage gaps (${gaps.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">A missing obligation is a filing that never turns red</span>}>
          <ul className="divide-y divide-separator-border text-body-regular">
            {gaps.map((g, i) => (
              <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2">
                <Link href={`/app/clients/${g.clientId}`} className="font-medium text-text-primary hover:underline">{g.clientName}</Link>
                <span className="text-text-secondary">{g.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <nav aria-label="Filter" className="flex gap-2 text-body-regular">
        <Link href="/app/deadlines?show=mine" aria-current={mine ? "page" : undefined} className={cx("rounded-full border px-3 py-1", mine ? "border-accent-600 text-accent-600" : "border-border-button-default text-text-secondary hover:text-text-primary")}>My clients</Link>
        <Link href="/app/deadlines?show=all" aria-current={!mine ? "page" : undefined} className={cx("rounded-full border px-3 py-1", !mine ? "border-accent-600 text-accent-600" : "border-border-button-default text-text-secondary hover:text-text-primary")}>All clients</Link>
      </nav>

      <BoardTable rows={board} empty={mine ? "None of your clients has a filing due in the next 60 days." : "No filings yet. Add clients with tax types, then generate filings."} />
    </div>
  );
}

function BoardTable({ rows, empty }: { rows: BoardRow[]; empty: string }) {
  if (rows.length === 0) return <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-8 text-center text-body-regular text-text-secondary">{empty}</p>;
  return (
    <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
      <table className="w-full min-w-[52rem] text-body-regular">
        <thead className="border-b border-separator-border bg-background-secondary-default text-start text-body-medium text-text-tertiary">
          <tr>
            <th scope="col" className="px-4 py-3 text-start">Due</th>
            <th scope="col" className="px-4 py-3 text-start">Client</th>
            <th scope="col" className="px-4 py-3 text-start">Return</th>
            <th scope="col" className="px-4 py-3 text-start">Preparer</th>
            <th scope="col" className="px-4 py-3 text-start">Status</th>
            <th scope="col" className="px-4 py-3 text-start">Next step</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const next = r.risk.next;
            const late = next != null && r.risk.late.some((s) => s.key === next.key);
            return (
              <tr key={r.id} className="border-t border-separator-border align-top transition-colors duration-150 hover:bg-background-secondary-hover">
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-text-primary">
                  {showDate(r.dueDate)}
                  {r.risk.state !== "overdue" && r.risk.daysLeft <= 5 && <p className="text-caption-1-regular text-text-tertiary">{r.risk.daysLeft} working day{r.risk.daysLeft === 1 ? "" : "s"} left</p>}
                </td>
                <td className="px-4 py-3"><Link href={`/app/clients/${r.clientId}`} className="text-text-primary hover:underline">{r.clientName}</Link></td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Link href={`/app/filings/${r.id}`} className="font-medium text-button-ghost-foreground hover:underline">{r.form}</Link>
                  <p className="text-caption-1-regular text-text-tertiary">{r.periodLabel}</p>
                </td>
                <td className="px-4 py-3">{r.preparer ? <span className="text-text-primary">{r.preparer.name}</span> : <Badge tone="blocked">None</Badge>}</td>
                <td className="px-4 py-3">
                  <Badge tone={TONE[r.risk.state]}>{RISK_LABELS[r.risk.state]}</Badge>
                  {r.risk.cause && r.risk.state !== "on_track" && <p className="mt-1 text-caption-1-regular text-text-tertiary">{r.risk.cause === "client" ? "Waiting on the client" : "Waiting on us"}</p>}
                </td>
                <td className="px-4 py-3">
                  {next ? (
                    <>
                      <span className="text-text-primary">{next.label}</span>
                      <p className={cx("text-caption-1-regular", late ? "text-text-error-primary" : "text-text-tertiary")}>
                        {WHO[next.who]} · {late ? "was due" : "by"} {showDate(next.target)}
                      </p>
                    </>
                  ) : (
                    <span className="text-text-tertiary">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
