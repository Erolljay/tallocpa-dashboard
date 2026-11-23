import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { months, statusLabel, statusTone, taxpayerTypeLabel } from "@/lib/clients/labels";
import { TAX_TYPES, type TaxType } from "@/lib/clients/obligations";
import { supabaseServer } from "@/lib/supabase/server";
import { DocumentsCard } from "./documents-card";
import { AssignForm, ClientUserForm, EngagementForm, RemoveAssignmentButton, RemoveClientUserButton, StatusButton } from "./forms";

export default function ClientPage(props: PageProps<"/app/clients/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <ClientDetail params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

const frequencyLabel: Record<string, string> = { monthly: "Monthly", quarterly: "Quarterly", annual: "Annual" };
const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));

async function ClientDetail({ params, searchParams }: Pick<PageProps<"/app/clients/[id]">, "params" | "searchParams">) {
  const { id } = await params;
  const { error: pageError } = await searchParams;
  const me = await requireStaff();
  const isOwner = me.staff.role === "owner";
  const supabase = await supabaseServer();

  const { data: client } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (!client) notFound();

  const [registration, obligations, engagements, team, serviceLines, staff, portalUsers] = await Promise.all([
    supabase.from("client_registrations").select("registration_date, tax_types").eq("client_id", id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("obligations").select("id, form, frequency, start_date, end_date").eq("client_id", id).order("form"),
    supabase.from("engagements").select("id, service_line, monthly_retainer, start_date, status, service_lines(name)").eq("client_id", id).order("start_date"),
    supabase.from("staff_assignments").select("user_id, role, staff_profiles(full_name)").eq("client_id", id),
    supabase.from("service_lines").select("code, name").eq("available", true).order("sort_order"),
    isOwner ? supabase.from("staff_profiles").select("user_id, full_name").eq("active", true).order("full_name") : Promise.resolve({ data: [] }),
    supabase.from("client_users").select("user_id, full_name, position").eq("client_id", id).order("full_name"),
  ]);
  const portalIds = (portalUsers.data ?? []).map((u) => u.user_id);
  const { data: portalEmails } = portalIds.length ? await supabase.rpc("user_emails", { p_user_ids: portalIds }) : { data: [] };
  const portalEmailOf = new Map(((portalEmails ?? []) as { user_id: string; email: string; last_sign_in_at: string | null }[]).map((e) => [e.user_id, e]));

  const taxTypes = ((registration.data?.tax_types ?? []) as TaxType[]).map((t) => TAX_TYPES[t] ?? t);
  const retainerTotal = (engagements.data ?? []).filter((e) => e.status === "active").reduce((s, e) => s + Number(e.monthly_retainer), 0);

  return (
    <>
      <PageHeader
        title={client.name}
        description={<span className="tabular-nums">{client.code} · {taxpayerTypeLabel[client.taxpayer_type]}{client.tin ? ` · TIN ${client.tin}` : ""}</span>}
        actions={
          <div className="flex items-center gap-3">
            <Badge tone={statusTone[client.status as keyof typeof statusTone]}>{statusLabel[client.status]}</Badge>
            {isOwner && <LinkButton href={`/app/clients/${id}/edit`} variant="secondary">Edit</LinkButton>}
            {isOwner && client.status === "onboarding" && <StatusButton clientId={id} to="active" label="Mark active" />}
          </div>
        }
      />
      {pageError === "assign_failed" && (
        <div className="mb-6"><Notice tone="blocked">The client was saved, but the preparer or reviewer could not be assigned. Assign them under Team below.</Notice></div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Registration">
          <dl className="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-ink-subtle">RDO</dt><dd className="text-ink-heading">{client.rdo_code ?? "—"}</dd>
            <dt className="text-ink-subtle">Address</dt><dd className="text-ink-heading">{client.registered_address ?? "—"}</dd>
            <dt className="text-ink-subtle">Registered</dt><dd className="text-ink-heading">{registration.data?.registration_date ? fmtDate(registration.data.registration_date) : "—"}</dd>
            <dt className="text-ink-subtle">Tax types</dt><dd className="text-ink-heading">{taxTypes.join(", ") || "—"}</dd>
            <dt className="text-ink-subtle">Taxable year</dt><dd className="text-ink-heading">Ends {months[client.fiscal_year_end_month - 1]}</dd>
            <dt className="text-ink-subtle">Filing</dt><dd className="text-ink-heading">{client.filing_channel === "efps" ? `eFPS, Group ${client.efps_group}` : "eBIRForms"}</dd>
            <dt className="text-ink-subtle">Books</dt><dd className="text-ink-heading">{client.book_type === "loose_leaf" ? "Loose-leaf" : "Manual"}</dd>
            <dt className="text-ink-subtle">BIR payment</dt><dd className="text-ink-heading">{client.payment_mode === "firm_remits" ? "We remit for the client" : "Client pays directly"}</dd>
            <dt className="text-ink-subtle">Document cutoff</dt><dd className="text-ink-heading">Day {client.submission_cutoff_day} of the following month</dd>
          </dl>
        </Card>

        <Card title="Filing obligations">
          {(obligations.data ?? []).length === 0 ? (
            <p className="text-sm text-ink-muted">No obligations yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-ink-subtle">
                <tr><th scope="col" className="pb-2 font-medium">Form</th><th scope="col" className="pb-2 font-medium">Frequency</th><th scope="col" className="pb-2 font-medium">From</th></tr>
              </thead>
              <tbody>
                {obligations.data!.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="py-2 font-medium text-ink-heading">{o.form}</td>
                    <td className="py-2 text-ink-muted">{frequencyLabel[o.frequency]}</td>
                    <td className="py-2 tabular-nums text-ink-muted">{fmtDate(o.start_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card title="Engagements" actions={<span className="text-sm tabular-nums text-ink-muted">{peso.format(retainerTotal)} / month</span>}>
          {(engagements.data ?? []).length === 0 ? (
            <p className="text-sm text-ink-muted">No engagement recorded yet.</p>
          ) : (
            <ul className="divide-y divide-border text-sm">
              {engagements.data!.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-4 py-2">
                  <div>
                    <p className="font-medium text-ink-heading">{(e.service_lines as unknown as { name: string } | null)?.name ?? e.service_line}</p>
                    <p className="text-xs text-ink-subtle">From {fmtDate(e.start_date)}</p>
                  </div>
                  <span className="amount tabular-nums text-ink-heading">{peso.format(Number(e.monthly_retainer))}</span>
                </li>
              ))}
            </ul>
          )}
          {isOwner && <EngagementForm clientId={id} serviceLines={serviceLines.data ?? []} />}
        </Card>

        <Card title="Team">
          {(team.data ?? []).length === 0 ? (
            <p className="text-sm text-ink-muted">Nobody is assigned yet.</p>
          ) : (
            <ul className="divide-y divide-border text-sm">
              {team.data!.map((a) => (
                <li key={`${a.user_id}-${a.role}`} className="flex items-center justify-between gap-4 py-2">
                  <span className="text-ink-heading">{(a.staff_profiles as unknown as { full_name: string } | null)?.full_name}</span>
                  <span className="flex items-center gap-3">
                    <span className="text-ink-muted">{a.role === "preparer" ? "Preparer" : "Reviewer"}</span>
                    {isOwner && <RemoveAssignmentButton clientId={id} userId={a.user_id} role={a.role as "preparer" | "reviewer"} />}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {isOwner && <AssignForm clientId={id} staff={staff.data ?? []} />}
        </Card>

        <DocumentsCard
          clientId={id}
          clientName={client.name}
          cutoffDay={client.submission_cutoff_day}
          canAct={isOwner || (team.data ?? []).some((a) => a.user_id === me.userId)}
        />

        <Card title="Portal users">
          {(portalUsers.data ?? []).length === 0 ? (
            <p className="text-sm text-ink-muted">Nobody from the client can sign in yet.</p>
          ) : (
            <ul className="divide-y divide-border text-sm">
              {portalUsers.data!.map((u) => {
                const info = portalEmailOf.get(u.user_id);
                return (
                  <li key={u.user_id} className="flex items-center justify-between gap-4 py-2">
                    <div>
                      <p className="font-medium text-ink-heading">{u.full_name}{u.position ? <span className="font-normal text-ink-muted"> · {u.position}</span> : null}</p>
                      <p className="text-xs text-ink-subtle">{info?.email ?? "—"}{info && !info.last_sign_in_at ? " · has not signed in yet" : ""}</p>
                    </div>
                    {isOwner && <RemoveClientUserButton clientId={id} userId={u.user_id} />}
                  </li>
                );
              })}
            </ul>
          )}
          {isOwner && <ClientUserForm clientId={id} />}
        </Card>
      </div>
    </>
  );
}
