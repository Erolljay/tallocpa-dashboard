import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton, peso } from "@/components/ui";
import { DueDateForm, PrepareForm, RemitForm, RemittanceButton, RemittanceFileUpload, SkipForm } from "@/components/remittances/forms";
import { requireStaff } from "@/lib/auth";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import {
  AGENCIES,
  agencyOf,
  deadlineRule,
  FILE_KINDS,
  isLoan,
  monthLabel,
  REMITTANCE_KINDS,
  remittanceBadge,
  reportName,
  type RemittanceFileKind,
  type RemittanceKind,
  type RemittanceStatus,
} from "@/lib/remittances/labels";
import { supabaseServer } from "@/lib/supabase/server";

export default function RemittancePage(props: PageProps<"/app/remittances/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Remittance params={props.params} />
    </Suspense>
  );
}

const STEPS: [RemittanceStatus, string][] = [["prepared", "Prepared"], ["approved", "Approved"], ["remitted", "Remitted"]];
const ORDER: Record<RemittanceStatus, number> = { not_started: 0, not_required: 0, prepared: 1, approved: 2, remitted: 3 };
interface ListRow {
  employee_id: string;
  employee_no: string | null;
  last_name: string;
  first_name: string;
  middle_name: string | null;
  agency_no: string | null;
  ee: string;
  er: string;
  ec: string;
  total: string;
}

async function Remittance({ params }: Pick<PageProps<"/app/remittances/[id]">, "params">) {
  const { id } = await params;
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const { data: r } = await supabase
    .from("contribution_remittances")
    .select("*, clients(name, payment_mode)")
    .eq("id", id)
    .maybeSingle();
  if (!r) notFound();
  const kind = r.kind as RemittanceKind;
  const status = r.status as RemittanceStatus;
  const client = r.clients as unknown as { name: string; payment_mode: "firm_remits" | "client_pays_direct" };
  const firmRemits = client.payment_mode === "firm_remits";
  const [{ data: files }, { data: number }, { data: assigned }, { data: people }, { data: due }] = await Promise.all([
    supabase.from("contribution_remittance_files").select("id, kind, file_name, created_at").eq("remittance_id", id).order("created_at"),
    supabase.from("client_employer_numbers").select("employer_number, registered_name").eq("client_id", r.client_id).eq("agency", agencyOf(kind)).maybeSingle(),
    supabase.from("staff_assignments").select("user_id").eq("client_id", r.client_id).eq("user_id", me.userId),
    supabase.from("staff_profiles").select("user_id, full_name"),
    r.due_id ? supabase.from("client_dues").select("id, soa_id, remitted_on").eq("id", r.due_id).maybeSingle() : Promise.resolve({ data: null }),
  ]);
  const canWork = owner || (assigned ?? []).length > 0;
  const names = new Map((people ?? []).map((p) => [p.user_id, p.full_name]));
  const today = manilaToday();
  const badge = remittanceBadge(status, r.due_date, today);

  // The month's contribution list from the posted payroll, to copy into the agency's site.
  const { data: list } = await supabase.rpc("remittance_employees", { p_id: id });
  const employees = (list ?? []) as ListRow[];
  const loan = isLoan(kind);
  const byKind = (k: RemittanceFileKind) => (files ?? []).filter((f) => f.kind === k);
  const canRemit = status === "approved" && (firmRemits || r.due_id ? owner : canWork);

  return (
    <>
      <PageHeader
        title={`${REMITTANCE_KINDS[kind].option} · ${monthLabel(r.period_month)}`}
        description={<><Link href={`/app/clients/${r.client_id}`} className="hover:underline">{client.name}</Link> · due {showDate(r.due_date)} · {firmRemits ? "we remit for the client" : "the client pays the agency"}</>}
        actions={
          <div className="flex items-center gap-3">
            <Badge tone={badge.tone}>{badge.label}</Badge>
            {owner && status !== "not_started" && status !== "prepared" && (
              <RemittanceButton id={id} action="reopen" label={status === "not_required" ? "Reopen" : "Step back"} busyLabel="Moving…" variant="secondary" />
            )}
          </div>
        }
      />

      <ol className="mb-6 grid grid-cols-3 gap-2" aria-label="Steps">
        {STEPS.map(([s, label]) => {
          const done = ORDER[status] >= ORDER[s] && status !== "not_required";
          const who = s === "prepared" ? r.prepared_by : s === "approved" ? r.approved_by : r.remitted_by;
          const when = s === "prepared" ? r.prepared_at?.slice(0, 10) : s === "approved" ? r.approved_at?.slice(0, 10) : r.remitted_on;
          return (
            <li key={s} className={done ? "rounded-2xl border border-border-button-default bg-background-secondary-default px-3 py-2" : "rounded-2xl border border-dashed border-border-button-default px-3 py-2"}>
              <p className={done ? "text-body-medium text-text-primary" : "text-body-medium text-text-tertiary"}>{label}</p>
              <p className="text-caption-1-regular text-text-tertiary">{done && when ? `${showDate(when)}${who ? ` · ${names.get(who) ?? ""}` : ""}` : "—"}</p>
            </li>
          );
        })}
      </ol>

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-6">
          {status === "not_required" && <Notice tone="waiting">Not required: {r.note}</Notice>}

          {r.note && status !== "not_required" && <Notice tone="waiting">{r.note}</Notice>}
          <Card
            title={`From the payroll · ${monthLabel(r.period_month)}`}
            actions={employees.length > 0 ? <a href={`/app/remittances/${id}/list`} className="text-body-medium text-button-ghost-foreground hover:underline">Download Excel</a> : undefined}
          >
            {Number(r.total) === 0 ? (
              <p className="text-body-regular text-text-secondary">Nothing posted yet. Post the month&rsquo;s payroll in the client&rsquo;s books: the amounts and the employee list come from it.</p>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[36rem] text-body-regular">
                    <thead>
                      <tr className="border-b border-border-table text-caption-1-semibold text-text-tertiary">
                        <th className="py-2 pe-3 text-start">Employee</th>
                        <th className="py-2 pe-3 text-start">{AGENCIES[agencyOf(kind)].name} no.</th>
                        <th className="py-2 pe-3 text-end">{loan ? "Loan payment" : "EE"}</th>
                        {!loan && <th className="py-2 pe-3 text-end">ER</th>}
                        {kind === "sss" && <th className="py-2 pe-3 text-end">EC</th>}
                        <th className="py-2 text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-separator-border">
                      {employees.map((e) => (
                        <tr key={e.employee_id}>
                          <td className="py-2 pe-3 text-text-primary">{e.last_name}, {e.first_name}{e.middle_name ? ` ${e.middle_name.slice(0, 1)}.` : ""}</td>
                          <td className="py-2 pe-3 font-mono text-text-secondary" dir="ltr">{e.agency_no ?? <span className="font-sans text-text-error-primary">missing</span>}</td>
                          <td className="py-2 pe-3 text-end tabular-nums">{peso.format(Number(e.ee))}</td>
                          {!loan && <td className="py-2 pe-3 text-end tabular-nums">{peso.format(Number(e.er))}</td>}
                          {kind === "sss" && <td className="py-2 pe-3 text-end tabular-nums">{peso.format(Number(e.ec))}</td>}
                          <td className="py-2 text-end tabular-nums text-text-primary">{peso.format(Number(e.total))}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-border-table text-body-medium text-text-primary">
                        <td className="py-2 pe-3" colSpan={2}>{r.employees ?? employees.length} employee{(r.employees ?? employees.length) === 1 ? "" : "s"}</td>
                        <td className="py-2 pe-3 text-end tabular-nums">{peso.format(Number(r.ee_share))}</td>
                        {!loan && <td className="py-2 pe-3 text-end tabular-nums">{peso.format(Number(r.er_share))}</td>}
                        {kind === "sss" && <td className="py-2 pe-3 text-end tabular-nums">{peso.format(Number(r.ec_share))}</td>}
                        <td className="py-2 text-end tabular-nums">{peso.format(Number(r.total))}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {employees.some((e) => !e.agency_no) && <p className="text-caption-1-regular text-text-tertiary">Add the missing numbers on the employees&rsquo; records (Payroll → Employees).</p>}
                {(status === "approved" || status === "remitted") && employees.reduce((t, e) => t + Number(e.total), 0).toFixed(2) !== Number(r.total).toFixed(2) && (
                  <Notice tone="blocked">The posted payroll now adds up to {peso.format(employees.reduce((t, e) => t + Number(e.total), 0))}, not the approved {peso.format(Number(r.total))}. Step back to bring it in line.</Notice>
                )}
              </div>
            )}
          </Card>

          <Card title="PRN">
            {(status === "not_started" || status === "prepared") && canWork ? (
              <div className="flex flex-col gap-3">
                <p className="text-body-regular text-text-secondary">Enter the list on the {AGENCIES[agencyOf(kind)].name} site, generate the PRN for {peso.format(Number(r.total))}, attach it under Files, then enter it here.</p>
                {byKind("prn").length === 0 && <Notice tone="waiting">Attach the PRN from the agency&rsquo;s site first (Files).</Notice>}
                <PrepareForm id={id} prn={r.prn ?? ""} ready={byKind("prn").length > 0 && Number(r.total) > 0} />
              </div>
            ) : (
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-body-regular">
                <dt className="text-text-secondary">PRN</dt>
                <dd className="text-end font-mono text-text-primary" dir="ltr">{r.prn ?? "—"}</dd>
                {r.remitted_on && (<><dt className="text-text-secondary">Paid</dt><dd className="text-end text-text-primary">{showDate(r.remitted_on)}{r.remit_reference ? ` · ${r.remit_reference}` : ""}</dd></>)}
              </dl>
            )}
          </Card>

          {status === "prepared" && (
            <Card title="Approval">
              {owner ? (
                <div className="flex flex-col gap-3">
                  <p className="text-body-regular text-text-secondary">
                    {firmRemits
                      ? `Approving puts ${peso.format(Number(r.total))} on ${client.name}'s next statement as "${REMITTANCE_KINDS[kind].item}, ${monthLabel(r.period_month)}".`
                      : "Approving shows the PRN and amount to the client in the portal, to pay the agency."}
                  </p>
                  <div><RemittanceButton id={id} action="approve" label="Approve" busyLabel="Approving…" /></div>
                </div>
              ) : (
                <p className="text-body-regular text-text-secondary">Waiting for the Owner&rsquo;s approval.</p>
              )}
            </Card>
          )}

          {status === "approved" && (
            <Card title="Remit">
              {due && <p className="mb-3 text-body-regular text-text-secondary">On the client&rsquo;s statement{due.soa_id ? "" : " (not billed yet)"}. <Link href={`/app/collections/${r.client_id}`} className="text-button-ghost-foreground hover:underline">Open collections</Link></p>}
              {canRemit ? (
                byKind("proof").length === 0 ? <Notice tone="waiting">Attach the proof of payment (Files), then record it.</Notice> : <RemitForm id={id} today={today} />
              ) : (
                <p className="text-body-regular text-text-secondary">{firmRemits ? "The Owner records the remittance once paid." : "Staff on the client record it from the client's proof of payment."}</p>
              )}
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-6 self-start">
          <Card title="Files">
            <div className="flex flex-col gap-4">
              {(["report", "prn", "proof"] as RemittanceFileKind[]).map((k) => (
                <div key={k} className="flex flex-col gap-2">
                  <p className="text-body-medium text-text-primary">{k === "report" ? `${reportName(kind)} (optional)` : FILE_KINDS[k]}</p>
                  {byKind(k).length > 0 ? (
                    <ul className="flex flex-col gap-1">
                      {byKind(k).map((f) => (
                        <li key={f.id} className="flex items-center justify-between gap-2 text-body-regular">
                          <a href={`/remittance-files/${f.id}`} className="min-w-0 truncate text-button-ghost-foreground hover:underline">{f.file_name}</a>
                          {canWork && status !== "remitted" && <RemittanceButton id={id} fileId={f.id} action="remove_file" label="Remove" busyLabel="…" variant="ghost" />}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-caption-1-regular text-text-tertiary">None yet.</p>
                  )}
                  {canWork && status !== "remitted" && status !== "not_required" && (k !== "proof" || status === "approved") && (
                    <RemittanceFileUpload id={id} kind={k} hint={k === "proof" ? "The agency's receipt, bank or e-wallet confirmation." : k === "prn" ? "The PRN page or slip generated on the agency's site." : undefined} />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card title="Deadline">
            <p className="mb-3 text-body-regular text-text-secondary">
              {AGENCIES[agencyOf(kind)].name}: {deadlineRule(kind, number?.employer_number ?? null, number?.registered_name ?? client.name)}
              {r.due_date !== r.statutory_due_date && ` Moved from ${showDate(r.statutory_due_date)}.`}
            </p>
            {number && <p className="mb-3 text-caption-1-regular text-text-tertiary">Employer number <span dir="ltr" className="font-mono">{number.employer_number}</span></p>}
            {canWork && status !== "remitted" && status !== "not_required" && <DueDateForm id={id} due={r.due_date} />}
          </Card>

          {canWork && (status === "not_started" || status === "prepared") && (
            <Card title="Nothing to remit?">
              <SkipForm id={id} />
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
