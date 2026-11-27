import Link from "next/link";
import { Suspense } from "react";
import { Badge, Skeleton } from "@/components/ui";
import { statusFor, type Direction, type RequestStatus } from "@/lib/requests/labels";
import { RiFileTextLine, RiImageLine } from "@remixicon/react";
import { AGENCIES, CASE_KINDS, CERTIFICATES, daysOpen, progress, routingSlip, type CaseKind, type StepStatus } from "@/lib/registration/steps";
import { cx } from "@/utils/cx";
import { daysTone, manilaDate } from "@/lib/registration/slip";
import { portalContext } from "../client-context";

export default function PortalRegistration() {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Registration />
    </Suspense>
  );
}

/** Step status in the client's words. */
const clientStatus: Record<StepStatus, { label: string; tone: "neutral" | "progress" | "done" | "waiting" }> = {
  pending: { label: "Not started", tone: "neutral" },
  in_progress: { label: "We're working on it", tone: "progress" },
  waiting_client: { label: "Waiting on you", tone: "waiting" },
  waiting_agency: { label: "With the agency", tone: "progress" },
  done: { label: "Done", tone: "done" },
  not_applicable: { label: "Not needed", tone: "neutral" },
};

const fmt = (d: string | null) => (d ? new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`)) : "—");

interface CaseRow {
  id: string;
  client_id: string;
  kind: CaseKind;
  period_year: number | null;
  details: { branch_name?: string; certificate?: string };
  status: "open" | "completed" | "cancelled";
  opened_at: string;
  closed_at: string | null;
  registration_steps: { id: string; code: string; agency: keyof typeof AGENCIES; label: string; status: StepStatus; sort_order: number; done_on: string | null; reference_no: string | null; reference_label: string }[];
}

/**
 * The client's registration work as routing slips (spec §3.7c): where each
 * file is now and how long it has been there, each office's received and
 * released dates, and what we have asked the client for on each step.
 */
async function Registration() {
  const { supabase, clients } = await portalContext();
  const ids = clients.map((c) => c.id);
  const now = new Date();
  const since = new Date(now.getTime() - 90 * 86_400_000).toISOString();
  const { data } = await supabase
    .from("registration_cases")
    .select("id, client_id, kind, period_year, details, status, opened_at, closed_at, registration_steps(id, code, agency, label, status, sort_order, done_on, reference_no, reference_label)")
    .in("client_id", ids)
    .or(`status.eq.open,closed_at.gte.${since}`)
    .neq("status", "cancelled")
    .order("opened_at", { ascending: false });
  const cases = (data ?? []) as unknown as CaseRow[];
  const stepIds = cases.flatMap((c) => c.registration_steps.map((s) => s.id));
  const { data: reqs } = stepIds.length
    ? await supabase.from("client_requests").select("id, subject, status, direction, registration_step_id").in("registration_step_id", stepIds).neq("status", "closed")
    : { data: [] };
  const asked = new Map<string, { id: string; subject: string; status: RequestStatus; direction: Direction }[]>();
  for (const r of (reqs ?? []) as { id: string; subject: string; status: RequestStatus; direction: Direction; registration_step_id: string }[]) {
    asked.set(r.registration_step_id, [...(asked.get(r.registration_step_id) ?? []), r]);
  }
  const { data: fileRows } = cases.length
    ? await supabase.from("registration_step_files").select("id, step_id, file_name, mime_type").in("case_id", cases.map((c) => c.id)).order("created_at")
    : { data: [] };
  const files = new Map<string, { id: string; file_name: string; mime_type: string }[]>();
  for (const f of (fileRows ?? []) as { id: string; step_id: string; file_name: string; mime_type: string }[]) files.set(f.step_id, [...(files.get(f.step_id) ?? []), f]);
  const nameOf = new Map(clients.map((c) => [c.id, c.name]));
  const today = manilaDate(now);

  return (
    <div className="space-y-6">
      <h1 className="text-title-1-medium text-text-primary">Registration</h1>
      {cases.length === 0 && (
        <p className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">
          When we register, renew or update your business, you can follow each step here.
        </p>
      )}
      {cases.map((k) => {
        const steps = k.registration_steps.map((s) => ({ ...s, sortOrder: s.sort_order, doneOn: s.done_on }));
        const openedOn = manilaDate(new Date(k.opened_at));
        const slip = routingSlip(steps, openedOn, today).filter((r) => r.step.status !== "not_applicable");
        const here = slip.find((r) => r.current);
        const { done, total } = progress(steps);
        return (
          <section key={k.id} className="overflow-hidden rounded-3xl border border-border-button-default bg-background-primary-default">
            <header className="flex flex-wrap items-start justify-between gap-3 border-b border-separator-border bg-background-secondary-default px-4 py-3">
              <div className="min-w-0">
                <p className="text-caption-1-semibold text-text-tertiary">
                  {CASE_KINDS[k.kind]}{k.period_year ? ` ${k.period_year}` : ""}{k.details.branch_name ? ` · ${k.details.branch_name}` : ""}{k.details.certificate ? ` · ${CERTIFICATES[k.details.certificate as keyof typeof CERTIFICATES] ?? k.details.certificate}` : ""}{clients.length > 1 ? ` · ${nameOf.get(k.client_id)}` : ""}
                </p>
                {here ? (
                  <p className="text-headline-medium text-text-primary">Now at {AGENCIES[here.step.agency]}: {here.step.label}</p>
                ) : (
                  <p className="text-headline-medium text-text-primary">{k.status === "completed" ? "Completed" : "All steps done"}</p>
                )}
                <p className="text-caption-1-regular tabular-nums text-text-tertiary">{done} of {total} steps · {daysOpen(steps, openedOn, k.closed_at ? manilaDate(new Date(k.closed_at)) : today)} days since we started</p>
              </div>
              {here && (
                <div className="text-end">
                  <p className={cx("text-title-2-medium tabular-nums", daysTone(here.days ?? 0).text)}>{here.days}</p>
                  <p className="text-caption-1-regular text-text-tertiary">days there</p>
                </div>
              )}
            </header>
            <ol>
              {slip.map(({ step, receivedOn, releasedOn, days, current }, i) => {
                const st = clientStatus[step.status];
                return (
                  <li key={step.id} aria-current={current ? "step" : undefined} className={cx("flex gap-3 px-4 py-3", i > 0 && "border-t border-separator-border", current && "bg-accent-500/10")}>
                    <span className={cx(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-caption-1-semibold tabular-nums",
                      step.status === "done" ? "bg-accent-600 text-text-white" : current ? "ring-2 ring-accent-600 text-text-primary" : "bg-background-tertiary-default text-text-tertiary",
                    )}>{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-caption-1-semibold text-text-tertiary">{AGENCIES[step.agency]}</p>
                          <p className="text-body-medium text-text-primary">{step.label}</p>
                        </div>
                        <Badge tone={st.tone}>{st.label}</Badge>
                      </div>
                      <p className="mt-1 text-caption-1-regular tabular-nums text-text-tertiary">
                        {receivedOn ? `Received ${fmt(receivedOn)}` : "Not reached yet"}
                        {releasedOn ? ` · Released ${fmt(releasedOn)}` : ""}
                        {days !== null ? ` · ${days} day${days === 1 ? "" : "s"}` : ""}
                        {step.status === "done" && step.reference_no ? ` · ${step.reference_label} ${step.reference_no}` : ""}
                      </p>
                      {(files.get(step.id) ?? []).length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {(files.get(step.id) ?? []).map((f) => {
                            const Icon = f.mime_type.startsWith("image/") ? RiImageLine : RiFileTextLine;
                            return (
                              <li key={f.id}>
                                <a href={`/registration-files/${f.id}`} className="flex max-w-full items-center gap-1.5 rounded-full border border-border-button-default bg-background-primary-default px-3 py-1 text-caption-1-medium text-button-ghost-foreground outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11">
                                  <Icon aria-hidden className="size-4 shrink-0 text-foreground-icon-tertiary" />
                                  <span className="min-w-0 truncate">{f.file_name}</span>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {(asked.get(step.id) ?? []).map((r) => {
                        const v = statusFor("client", r.direction, r.status);
                        return (
                          <Link key={r.id} href={`/portal/requests/${r.id}`} className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-background-tertiary-default px-3 py-2 text-body-regular text-text-primary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11">
                            <span className="min-w-0 truncate">We need: {r.subject}</span>
                            <Badge tone={v.tone}>{v.label}</Badge>
                          </Link>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
