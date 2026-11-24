import Link from "next/link";
import { Suspense } from "react";
import { RiAddLine } from "@remixicon/react";
import { Badge, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { AGENCIES, CASE_KINDS, daysOpen, progress, routingSlip, STEP_STATUSES, waitingOn, type StepStatus } from "@/lib/registration/steps";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { YearRenewalsForm } from "./forms";
import { daysTone, manilaDate } from "@/lib/registration/slip";

export default function RegistrationsPage(props: PageProps<"/app/registrations">) {
  return (
    <Suspense fallback={<><PageHeader title="Registrations" /><Skeleton rows={6} /></>}>
      <RegistrationList searchParams={props.searchParams} />
    </Suspense>
  );
}

interface Row {
  id: string;
  kind: keyof typeof CASE_KINDS;
  period_year: number | null;
  details: { branch_name?: string };
  status: "open" | "completed" | "cancelled";
  opened_at: string;
  closed_at: string | null;
  target_date: string | null;
  clients: { name: string; code: string } | null;
  registration_steps: { code: string; agency: keyof typeof AGENCIES; label: string; status: StepStatus; sort_order: number; done_on: string | null }[];
}

async function RegistrationList({ searchParams }: Pick<PageProps<"/app/registrations">, "searchParams">) {
  const { show, kind } = await searchParams;
  const closed = show === "closed";
  const kindFilter = typeof kind === "string" && kind in CASE_KINDS ? (kind as keyof typeof CASE_KINDS) : null;
  const me = await requireStaff();
  const isOwner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const query = supabase
    .from("registration_cases")
    .select("id, kind, period_year, details, status, opened_at, closed_at, target_date, clients(name, code), registration_steps(code, agency, label, status, sort_order, done_on)")
    .order("opened_at", { ascending: false });
  const filtered = kindFilter ? query.eq("kind", kindFilter) : query;
  const { data, error } = await (closed ? filtered.neq("status", "open") : filtered.eq("status", "open"));
  if (error) throw error;
  const today = manilaDate(new Date());
  const renewalYear = Number(today.slice(0, 4)) + (Number(today.slice(5, 7)) >= 10 ? 1 : 0);
  const href = (p: { show?: string; kind?: string | null }) => {
    const q = new URLSearchParams();
    if (p.show) q.set("show", p.show);
    if (p.kind) q.set("kind", p.kind);
    return `/app/registrations${q.size ? `?${q}` : ""}`;
  };
  const pill = (on: boolean) => cx("rounded-full px-3 py-1", on ? "bg-background-tertiary-default text-text-primary" : "text-text-secondary hover:bg-background-secondary-hover");

  const rows = ((data ?? []) as unknown as Row[]).map((r) => {
    const steps = r.registration_steps.map((s) => ({ ...s, sortOrder: s.sort_order, doneOn: s.done_on }));
    const openedOn = manilaDate(new Date(r.opened_at));
    const here = routingSlip(steps, openedOn, today).find((x) => x.current);
    return { ...r, steps, here, open: daysOpen(steps, openedOn, r.closed_at ? manilaDate(new Date(r.closed_at)) : today), progress: progress(steps), waiting: waitingOn(steps) };
  });
  // Longest-held files first, so follow-ups are at the top.
  if (!closed) rows.sort((a, b) => (b.here?.days ?? -1) - (a.here?.days ?? -1));

  return (
    <>
      <PageHeader
        title="Registrations"
        description="New businesses, annual renewals and closures: where each file is now and how long it has been there."
        actions={
          isOwner && (
            <div className="flex flex-wrap items-center gap-3">
              <YearRenewalsForm year={renewalYear} />
              <LinkButton href="/app/registrations/new"><RiAddLine aria-hidden className="size-4" />New business</LinkButton>
            </div>
          )
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-body-medium">
        <div className="flex gap-1">
          <Link href={href({ kind: kindFilter })} aria-current={!closed ? "page" : undefined} className={pill(!closed)}>Open</Link>
          <Link href={href({ show: "closed", kind: kindFilter })} aria-current={closed ? "page" : undefined} className={pill(closed)}>Completed &amp; cancelled</Link>
        </div>
        <div className="flex flex-wrap gap-1">
          <Link href={href({ show: closed ? "closed" : undefined })} aria-current={!kindFilter ? "page" : undefined} className={pill(!kindFilter)}>All</Link>
          {(Object.keys(CASE_KINDS) as (keyof typeof CASE_KINDS)[]).map((k) => (
            <Link key={k} href={href({ show: closed ? "closed" : undefined, kind: k })} aria-current={kindFilter === k ? "page" : undefined} className={pill(kindFilter === k)}>{CASE_KINDS[k]}</Link>
          ))}
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-10 text-center">
          <p className="font-medium text-text-primary">{closed ? "Nothing closed yet" : "Nothing open"}</p>
          <p className="mt-1 text-body-regular text-text-secondary">{isOwner && !closed ? "Open a new business here, a renewal or closure from the client's page, or this year's renewals for every client above." : "Cases for clients assigned to you show here."}</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
          <table className="w-full min-w-[48rem] text-body-regular">
            <thead className="border-b border-separator-border bg-background-secondary-default text-body-medium text-text-tertiary">
              <tr>
                <th scope="col" className="px-4 py-3 text-start">Business</th>
                <th scope="col" className="px-4 py-3 text-start">Now at</th>
                <th scope="col" className="px-4 py-3 text-end">Days there</th>
                <th scope="col" className="px-4 py-3 text-start">Status</th>
                <th scope="col" className="px-4 py-3 text-end">Steps</th>
                <th scope="col" className="px-4 py-3 text-end">Days open</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-separator-border transition-colors first:border-t-0 hover:bg-background-secondary-hover">
                  <td className="px-4 py-3">
                    <Link href={`/app/registrations/${r.id}`} className="font-medium text-text-primary hover:underline">{r.clients?.name}</Link>
                    <p className="text-caption-1-regular tabular-nums text-text-tertiary">
                      {CASE_KINDS[r.kind]}{r.period_year ? ` ${r.period_year}` : ""}{r.details.branch_name ? ` (${r.details.branch_name})` : ""} · {r.clients?.code}{r.target_date ? ` · target ${r.target_date}` : ""}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {r.here ? (
                      <>
                        <p className="text-text-primary">{AGENCIES[r.here.step.agency]}</p>
                        <p className="text-caption-1-regular text-text-tertiary">{r.here.step.label}</p>
                      </>
                    ) : (
                      <span className="text-text-secondary">{r.status === "open" ? "All steps finished" : "—"}</span>
                    )}
                  </td>
                  <td className={cx("px-4 py-3 text-end text-body-medium tabular-nums", r.here ? daysTone(r.here.days ?? 0).text : "text-text-tertiary")}>{r.here?.days ?? "—"}</td>
                  <td className="px-4 py-3">
                    {r.status === "open" ? (
                      <Badge tone={r.waiting ? "waiting" : r.here ? "progress" : "done"}>{r.here ? STEP_STATUSES[r.here.step.status] : "Ready to complete"}</Badge>
                    ) : (
                      <Badge tone={r.status === "completed" ? "done" : "neutral"}>{r.status === "completed" ? "Completed" : "Cancelled"}</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-end tabular-nums text-text-secondary">{r.progress.done}/{r.progress.total}</td>
                  <td className="px-4 py-3 text-end tabular-nums text-text-secondary">{r.open}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
