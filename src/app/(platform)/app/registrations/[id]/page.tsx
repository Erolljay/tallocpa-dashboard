import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { taxpayerTypeLabel } from "@/lib/clients/labels";
import { AGENCIES, CASE_KINDS, CERTIFICATES, UPDATE_CHANGES, daysBetween, daysOpen, feeJobsFor, FEE_JOBS, progress, routingSlip, STEP_STATUSES, waitingOn, type CaseKind, type StepStatus } from "@/lib/registration/steps";
import type { TaxpayerType } from "@/lib/clients/obligations";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { CancelForm, CompleteButton, StepBadge, StepForm, type StepRow } from "../forms";
import { StepFileList, StepFileUpload, type StepFile } from "../step-files";
import { daysTone, manilaDate } from "@/lib/registration/slip";
import { NewRequestForm } from "../../requests/new-request-form";
import { statusFor, type Direction, type RequestStatus } from "@/lib/requests/labels";

export default function RegistrationPage(props: PageProps<"/app/registrations/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Registration params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const fmt = (d: string | null) => (d ? new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`)) : "—");
const caseStatus = { open: ["Open", "progress"], completed: ["Completed", "done"], cancelled: ["Cancelled", "neutral"] } as const;

async function Registration({ params, searchParams }: Pick<PageProps<"/app/registrations/[id]">, "params" | "searchParams">) {
  const { id } = await params;
  const { error: pageError } = await searchParams;
  const me = await requireStaff();
  const isOwner = me.staff.role === "owner";
  const supabase = await supabaseServer();

  const { data: k } = await supabase
    .from("registration_cases")
    .select("*, clients(id, brand_id, code, name, taxpayer_type, tin, status)")
    .eq("id", id)
    .maybeSingle();
  if (!k) notFound();
  const client = k.clients as unknown as { id: string; brand_id: string; code: string; name: string; taxpayer_type: string; tin: string | null; status: string };
  const { data: stepRows } = await supabase
    .from("registration_steps")
    .select("id, code, agency, label, reference_label, sort_order, status, reference_no, done_on, government_fee, notes, status_changed_at")
    .eq("case_id", id)
    .order("sort_order");
  const steps = ((stepRows ?? []) as (StepRow & { sort_order: number; status_changed_at: string })[]).map((s) => ({ ...s, sortOrder: s.sort_order, doneOn: s.done_on }));

  const { data: requestRows } = steps.length
    ? await supabase.from("client_requests").select("id, subject, status, direction, registration_step_id").in("registration_step_id", steps.map((s) => s.id)).order("created_at")
    : { data: [] };
  const requestsByStep = new Map<string, { id: string; subject: string; status: RequestStatus; direction: Direction }[]>();
  for (const r of (requestRows ?? []) as { id: string; subject: string; status: RequestStatus; direction: Direction; registration_step_id: string }[]) {
    requestsByStep.set(r.registration_step_id, [...(requestsByStep.get(r.registration_step_id) ?? []), r]);
  }

  const { data: fileRows } = await supabase
    .from("registration_step_files")
    .select("id, step_id, file_name, mime_type")
    .eq("case_id", id)
    .order("created_at");
  const filesByStep = new Map<string, StepFile[]>();
  for (const f of (fileRows ?? []) as (StepFile & { step_id: string })[]) filesByStep.set(f.step_id, [...(filesByStep.get(f.step_id) ?? []), f]);

  // The fee schedule jobs this case bills when completed, priced from the active schedule.
  const jobs = feeJobsFor(k.kind as CaseKind, client.taxpayer_type as TaxpayerType, {
    lguServed: k.lgu_served,
    lgu: k.lgu,
    employer: k.employer,
    changes: (k.details as { changes?: string[] }).changes,
    notNeeded: steps.filter((s) => s.status === "not_applicable").map((s) => s.code),
  });
  const { data: priced } = jobs.length && isOwner
    ? await supabase.from("fee_items").select("code, label, band_label, price, fee_schedules!inner(brand_id, status)").in("code", jobs).eq("fee_schedules.brand_id", client.brand_id).eq("fee_schedules.status", "active")
    : { data: [] };
  const priceOf = new Map((priced ?? []).map((i) => [i.code as string, i as { label: string; band_label: string | null; price: string | null }]));

  const today = manilaDate(new Date());
  const openedOn = manilaDate(new Date(k.opened_at));
  const slip = routingSlip(steps, openedOn, today);
  const here = slip.find((r) => r.current);
  const { done, total } = progress(steps);
  const waiting = waitingOn(steps);
  const fees = steps.reduce((sum, s) => sum + Number(s.government_fee ?? 0), 0);
  const isOpen = k.status === "open";
  const [statusLabel, statusTone] = caseStatus[k.status as keyof typeof caseStatus];
  const canComplete = isOpen && isOwner && here === undefined;

  return (
    <>
      <PageHeader
        title={client.name}
        description={<span className="tabular-nums">{CASE_KINDS[k.kind as keyof typeof CASE_KINDS]}{k.period_year ? ` ${k.period_year}` : ""}{k.kind === "closure" ? ` · closed ${fmt(k.effective_date)}` : k.kind === "bir_update" ? ` · effective ${fmt(k.effective_date)}` : ""}{k.kind === "branch" ? ` · ${(k.details as { branch_name?: string }).branch_name}` : ""}{k.kind === "certificate" ? ` · ${certificateLabel(k.details as CertificateDetails)}` : ""} · {client.code} · {taxpayerTypeLabel[client.taxpayer_type]}{k.lgu ? ` · ${k.lgu}` : ""}</span>}
        actions={
          <div className="flex items-center gap-3">
            <Badge tone={statusTone}>{statusLabel}</Badge>
            <LinkButton href={`/app/clients/${client.id}`} variant="secondary">Client</LinkButton>
          </div>
        }
      />
      {pageError === "assign_failed" && (
        <div className="mb-6"><Notice tone="blocked">The registration was opened, but the preparer could not be assigned. Assign them on the client page.</Notice></div>
      )}

      {k.kind === "bir_update" && (
        <div className="mb-4 flex flex-wrap gap-2">
          {((k.details as { changes?: string[] }).changes ?? []).map((c) => <Badge key={c}>{UPDATE_CHANGES[c as keyof typeof UPDATE_CHANGES] ?? c}</Badge>)}
        </div>
      )}
      {/* The slip's header: where the file is now and for how long. */}
      <section className="mb-6 grid gap-4 rounded-3xl border border-border-button-default bg-background-primary-default p-5 shadow-xs sm:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="text-caption-1-semibold text-text-tertiary">Now at</p>
          {here ? (
            <>
              <p className="text-title-3-semibold text-text-primary">{AGENCIES[here.step.agency]}</p>
              <p className="text-body-regular text-text-secondary">{here.step.label}</p>
              <p className="mt-1 text-caption-1-regular text-text-tertiary">
                {STEP_STATUSES[here.step.status]} for {daysBetween(manilaDate(new Date(here.step.status_changed_at)), today)} days
              </p>
            </>
          ) : (
            <p className="text-title-3-semibold text-text-primary">{isOpen ? "All steps finished" : statusLabel}</p>
          )}
        </div>
        <div>
          <p className="text-caption-1-semibold text-text-tertiary">Days here</p>
          <p className={cx("text-title-1-medium tabular-nums", here ? daysTone(here.days ?? 0).text : "text-text-primary")}>{here ? here.days : "—"}</p>
        </div>
        <div>
          <p className="text-caption-1-semibold text-text-tertiary">Days open</p>
          <p className="text-title-1-medium tabular-nums text-text-primary">{daysOpen(steps, openedOn, k.closed_at ? manilaDate(new Date(k.closed_at)) : today)}</p>
          <p className="text-caption-1-regular tabular-nums text-text-tertiary">{done} of {total} steps · since {fmt(openedOn)}</p>
        </div>
        {(waiting || k.target_date) && (
          <div className="flex flex-wrap gap-2 sm:col-span-4">
            {waiting === "client" && <Badge tone="waiting">Waiting on the client</Badge>}
            {waiting === "agency" && <Badge tone="waiting">Waiting on an agency</Badge>}
            {k.target_date && <Badge tone={isOpen && k.target_date < today ? "blocked" : "neutral"}>Target {fmt(k.target_date)}</Badge>}
          </div>
        )}
      </section>

      <Card title="Routing slip" actions={<span className="text-body-regular tabular-nums text-text-secondary">Gov&rsquo;t fees {peso.format(fees)}</span>}>
        <ol className="-mx-2">
          {slip.map(({ step, receivedOn, releasedOn, days, current }, i) => {
            const skipped = step.status === "not_applicable";
            return (
              <li
                key={step.id}
                aria-current={current ? "step" : undefined}
                className={cx("rounded-2xl px-2", current && "bg-accent-500/10 ring-1 ring-accent-500/40 ring-inset", i > 0 && !current && "border-t border-separator-border")}
              >
                <div className="grid grid-cols-[2rem_1fr] gap-x-3 py-3 sm:grid-cols-[2rem_1fr_7rem_7rem_4rem_9rem] sm:items-center">
                  <span
                    className={cx(
                      "flex size-7 items-center justify-center rounded-full text-caption-1-semibold tabular-nums",
                      step.status === "done" ? "bg-accent-600 text-text-white" : current ? "ring-2 ring-accent-600 text-text-primary" : "bg-background-tertiary-default text-text-tertiary",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className={cx("min-w-0", skipped && "text-text-tertiary")}>
                    <p className="text-caption-1-semibold text-text-tertiary">{AGENCIES[step.agency]}{current ? " · here now" : ""}</p>
                    <p className={cx("text-body-medium", skipped ? "text-text-tertiary line-through" : "text-text-primary")}>{step.label}</p>
                    {(step.reference_no || step.notes) && (
                      <p className="text-caption-1-regular text-text-tertiary">
                        {step.reference_no ? <span className="tabular-nums">{step.reference_label} {step.reference_no}</span> : null}
                        {step.reference_no && step.notes ? " · " : null}
                        {step.notes}
                      </p>
                    )}
                    <StepFileList caseId={id} files={filesByStep.get(step.id) ?? []} removable={isOpen} />
                    {(requestsByStep.get(step.id) ?? []).map((r) => {
                      const v = statusFor("firm", r.direction, r.status);
                      return (
                        <Link key={r.id} href={`/app/requests/${r.id}`} className="mt-1 flex flex-wrap items-center gap-2 text-caption-1-regular text-button-ghost-foreground hover:underline">
                          Asked: {r.subject} <Badge tone={v.tone}>{v.label}</Badge>
                        </Link>
                      );
                    })}
                  </div>
                  <SlipCell label="Received" value={fmt(receivedOn)} />
                  <SlipCell label="Released" value={fmt(releasedOn)} />
                  <div className="col-start-2 sm:col-start-auto">
                    <span className="me-1 text-caption-1-regular text-text-tertiary sm:hidden">Days</span>
                    <span className={cx("text-body-medium tabular-nums", days === null ? "text-text-tertiary" : current ? daysTone(days).text : "text-text-secondary")}>{days ?? "—"}</span>
                  </div>
                  <div className="col-start-2 mt-1 sm:col-start-auto sm:mt-0 sm:justify-self-end"><StepBadge status={step.status as StepStatus} /></div>
                </div>
                {isOpen && (
                  <details className="group pb-2 ps-10" open={current}>
                    <summary className="cursor-pointer list-none text-caption-1-semibold text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">
                      <span className="group-open:hidden">Update</span><span className="hidden group-open:inline">Close</span>
                    </summary>
                    <StepForm caseId={id} step={step} editable />
                    <div className="mt-2 border-t border-separator-border pt-4">
                      <StepFileUpload caseId={id} stepId={step.id} />
                    </div>
                    {step.status !== "done" && step.status !== "not_applicable" && (
                      <div className="mt-2 border-t border-separator-border pt-4">
                        <p className="mb-3 text-body-medium text-text-primary">Ask the client for documents</p>
                        <NewRequestForm clientId={client.id} stepId={step.id} defaultSubject={`Documents for: ${step.label}`} compact />
                      </div>
                    )}
                  </details>
                )}
                {k.status === "completed" && (
                  <details className="group pb-2 ps-10">
                    <summary className="cursor-pointer list-none text-caption-1-semibold text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">
                      <span className="group-open:hidden">Attach proof</span><span className="hidden group-open:inline">Close</span>
                    </summary>
                    <div className="pt-3"><StepFileUpload caseId={id} stepId={step.id} /></div>
                  </details>
                )}
              </li>
            );
          })}
        </ol>
      </Card>

      {isOpen && isOwner && (
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <Card title="Finish">
            {here ? (
              <p className="text-body-regular text-text-secondary">This can be completed once every step is done or not needed.</p>
            ) : k.kind === "renewal" ? (
              <p className="text-body-regular text-text-secondary">Completing closes this year&rsquo;s renewal.</p>
            ) : k.kind === "branch" ? (
              <p className="text-body-regular text-text-secondary">Completing closes the branch registration.</p>
            ) : k.kind === "sec_filing" ? (
              <p className="text-body-regular text-text-secondary">Completing closes this year&rsquo;s SEC filings.</p>
            ) : k.kind === "certificate" ? (
              <p className="text-body-regular text-text-secondary">Completing closes the certificate. Attach the released certificate to its step so the client has a copy.</p>
            ) : k.kind === "employer" ? (
              <Notice>
                Completing puts each employer number from its step on <Link href={`/app/clients/${client.id}`} className="font-medium underline">the client</Link>, with the month the step was done as the first month with employees (a number the client already has is kept). Switch on &ldquo;We handle this client&rsquo;s SSS, PhilHealth and Pag-IBIG&rdquo; there if we remit them.
              </Notice>
            ) : k.kind === "bir_update" ? (
              ((k.details as { changes?: string[] }).changes ?? []).includes("tax_types") ? (
                <Notice>
                  <Link href={`/app/clients/${client.id}/edit`} className="font-medium underline">Enter the new tax types on the client</Link> with {fmt(k.effective_date)} as the effective date, so the filing obligations start and end on that date; then complete. Update the RDO and address there too if they changed.
                </Notice>
              ) : (
                <Notice>
                  If the address, RDO or name changed, <Link href={`/app/clients/${client.id}/edit`} className="font-medium underline">update the client</Link>; then complete.
                </Notice>
              )
            ) : k.kind === "closure" ? (
              <Notice>Completing ends {client.name}&rsquo;s filing obligations after {fmt(k.effective_date)}, removes filings for later periods that were not started, ends its engagements and makes it inactive.</Notice>
            ) : !client.tin ? (
              <Notice>
                The COR is issued. <Link href={`/app/clients/${client.id}/edit`} className="font-medium underline">Enter it on the client</Link> (TIN, RDO, tax types and the registration date as the effective date) to start the filing obligations, then complete the registration.
              </Notice>
            ) : (
              <p className="text-body-regular text-text-secondary">Completing makes the client active and ends the Business Registration engagement.</p>
            )}
            <div className="mt-4 border-t border-separator-border pt-4">
              <p className="text-caption-1-semibold text-text-tertiary">Billed from the fee schedule when completed</p>
              {jobs.length === 0 ? (
                <p className="text-body-regular text-text-secondary">Nothing: the firm does not handle the billed work in this case.</p>
              ) : (
                <ul className="mt-1 space-y-1 text-body-regular">
                  {jobs.map((j) => {
                    const item = priceOf.get(j);
                    const price = item?.price ? Number(item.price) : 0;
                    return (
                      <li key={j} className="flex items-baseline justify-between gap-3">
                        <span className="text-text-primary">{item ? `${item.label}${item.band_label ? ` (${item.band_label})` : ""}` : FEE_JOBS[j]}</span>
                        <span className={cx("shrink-0 tabular-nums", price > 0 ? "text-text-primary" : "text-text-tertiary")}>{price > 0 ? peso.format(price) : "No price: you get a task to price it"}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {canComplete && <div className="mt-4 flex justify-end"><CompleteButton caseId={id} /></div>}
          </Card>
          <Card title="Cancel">
            <CancelForm caseId={id} />
          </Card>
        </div>
      )}
      {k.status === "cancelled" && k.cancel_reason && <div className="mt-6"><Notice>Cancelled: {k.cancel_reason}</Notice></div>}
    </>
  );
}

type CertificateDetails = { certificate?: string; purpose?: string };
const certificateLabel = (d: CertificateDetails) =>
  `${CERTIFICATES[d.certificate as keyof typeof CERTIFICATES] ?? d.certificate ?? ""}${d.purpose ? ` (${d.purpose})` : ""}`;

function SlipCell({ label, value }: { label: string; value: string }) {
  return (
    <p className="col-start-2 text-body-regular tabular-nums text-text-secondary sm:col-start-auto">
      <span className="me-1 text-caption-1-regular text-text-tertiary sm:hidden">{label}</span>
      {value}
    </p>
  );
}
