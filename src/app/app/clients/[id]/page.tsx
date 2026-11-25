import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import type { Branch } from "@/lib/branches";
import { months, statusLabel, statusTone, taxpayerTypeLabel } from "@/lib/clients/labels";
import { TAX_TYPES, type TaxType } from "@/lib/clients/obligations";
import { CASE_KINDS } from "@/lib/registration/steps";
import { PARTY_ROLES, type PartyRole } from "@/lib/parties/format";
import { supabaseServer } from "@/lib/supabase/server";
import { ClientTabs } from "./client-tabs";
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

  const [registration, obligations, engagements, team, serviceLines, staff, portalUsers, parties, branchRows, registrationCase] = await Promise.all([
    supabase.from("client_registrations").select("registration_date, tax_types").eq("client_id", id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("obligations").select("id, form, frequency, start_date, end_date").eq("client_id", id).order("form"),
    supabase.from("engagements").select("id, service_line, monthly_retainer, start_date, status, service_lines(name)").eq("client_id", id).order("start_date"),
    supabase.from("staff_assignments").select("user_id, role, staff_profiles(full_name)").eq("client_id", id),
    supabase.from("service_lines").select("code, name").eq("available", true).order("sort_order"),
    isOwner ? supabase.from("staff_profiles").select("user_id, full_name, role, branch_id").eq("active", true).order("full_name") : Promise.resolve({ data: [] }),
    supabase.from("client_users").select("user_id, full_name, position").eq("client_id", id).order("full_name"),
    supabase.from("client_parties").select("party_id, role, last_seen, parties(display_name, tin, branch_code)").eq("client_id", id).order("last_seen", { ascending: false }).limit(10),
    supabase.from("branches").select("id, code, name, address, active").order("name"),
    supabase.from("registration_cases").select("id, kind, period_year, details, status, opened_at").eq("client_id", id).order("opened_at", { ascending: false }),
  ]);
  const branches = (branchRows.data ?? []) as Branch[];
  const portalIds = (portalUsers.data ?? []).map((u) => u.user_id);
  const { data: portalEmails } = portalIds.length ? await supabase.rpc("user_emails", { p_user_ids: portalIds }) : { data: [] };
  const portalEmailOf = new Map(((portalEmails ?? []) as { user_id: string; email: string; last_sign_in_at: string | null }[]).map((e) => [e.user_id, e]));

  const cases = registrationCase.data ?? [];
  const openNewBusiness = cases.some((c) => c.kind === "new_business" && c.status === "open");
  const taxTypes = ((registration.data?.tax_types ?? []) as TaxType[]).map((t) => TAX_TYPES[t] ?? t);
  const canWork = isOwner || (team.data ?? []).some((a) => a.user_id === me.userId);
  const hasBooks = (engagements.data ?? []).some((e) => e.service_line === "bookkeeping" && e.status === "active");
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
            {isOwner && client.status === "onboarding" && !openNewBusiness && <StatusButton clientId={id} to="active" label="Mark active" />}
          </div>
        }
      />
      <ClientTabs clientId={id} active="overview" work={canWork} books={hasBooks} />
      <nav aria-label="Work areas" className="mb-6 flex flex-wrap gap-2">
        <LinkButton href={`/app/clients/${id}/onboarding`} variant="secondary" size="sm">Onboarding</LinkButton>
        {canWork && (
          <>
            <LinkButton href={`/app/clients/${id}/register`} variant="secondary" size="sm">Register</LinkButton>
            <LinkButton href={`/app/clients/${id}/batch`} variant="secondary" size="sm">Batch upload</LinkButton>
            <LinkButton href={`/app/clients/${id}/workpapers`} variant="secondary" size="sm">Workpapers</LinkButton>
            <LinkButton href={`/app/clients/${id}/payroll`} variant="secondary" size="sm">Payroll</LinkButton>
            <LinkButton href={`/app/clients/${id}/fixed-assets`} variant="secondary" size="sm">Fixed assets</LinkButton>
          </>
        )}
      </nav>
      {client.status === "onboarding" && (
        <div className="mb-6"><Notice tone="waiting">This client is onboarding. The <Link href={`/app/clients/${id}/onboarding`} className="underline">Onboarding tab</Link> has the checklist, the proposal and the signed contract.</Notice></div>
      )}
      {pageError === "assign_failed" && (
        <div className="mb-6"><Notice tone="blocked">The client was saved, but the preparer or reviewer could not be assigned. Assign them under Team below.</Notice></div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Registration">
          <dl className="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2 text-body-regular">
            <dt className="text-text-tertiary">Branch</dt><dd className="min-w-0 break-words text-text-primary">{branches.find((b) => b.id === client.branch_id)?.name ?? "—"}</dd>
            <dt className="text-text-tertiary">RDO</dt><dd className="min-w-0 break-words text-text-primary">{client.rdo_code ?? "—"}</dd>
            <dt className="text-text-tertiary">Address</dt><dd className="min-w-0 break-words text-text-primary">{client.registered_address ?? "—"}</dd>
            <dt className="text-text-tertiary">Registered</dt><dd className="min-w-0 break-words text-text-primary">{registration.data?.registration_date ? fmtDate(registration.data.registration_date) : "—"}</dd>
            <dt className="text-text-tertiary">Tax types</dt><dd className="min-w-0 break-words text-text-primary">{taxTypes.join(", ") || "—"}</dd>
            <dt className="text-text-tertiary">Taxable year</dt><dd className="min-w-0 break-words text-text-primary">Ends {months[client.fiscal_year_end_month - 1]}</dd>
            <dt className="text-text-tertiary">Filing</dt><dd className="min-w-0 break-words text-text-primary">{client.filing_channel === "efps" ? `eFPS, Group ${client.efps_group}` : "eBIRForms"}</dd>
            <dt className="text-text-tertiary">Books</dt><dd className="min-w-0 break-words text-text-primary">{client.book_type === "loose_leaf" ? "Loose-leaf" : "Manual"}</dd>
            <dt className="text-text-tertiary">BIR payment</dt><dd className="min-w-0 break-words text-text-primary">{client.payment_mode === "firm_remits" ? "We remit for the client" : "Client pays directly"}</dd>
            <dt className="text-text-tertiary">Document cutoff</dt><dd className="min-w-0 break-words text-text-primary">Day {client.submission_cutoff_day} of the following month</dd>
          </dl>
        </Card>

        <Card title="Filing obligations">
          {(obligations.data ?? []).length === 0 ? (
            <p className="text-body-regular text-text-secondary">No obligations yet.</p>
          ) : (
            <table className="w-full text-body-regular">
              <thead className="text-start text-body-medium text-text-tertiary">
                <tr><th scope="col" className="text-start pb-2">Form</th><th scope="col" className="text-start pb-2">Frequency</th><th scope="col" className="text-start pb-2">From</th></tr>
              </thead>
              <tbody>
                {obligations.data!.map((o) => (
                  <tr key={o.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                    <td className="py-2 font-medium text-text-primary">{o.form}</td>
                    <td className="py-2 text-text-secondary">{frequencyLabel[o.frequency]}</td>
                    <td className="py-2 tabular-nums text-text-secondary">{fmtDate(o.start_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card title="Engagements" actions={<span className="text-body-regular tabular-nums text-text-secondary">{peso.format(retainerTotal)} / month</span>}>
          {(engagements.data ?? []).length === 0 ? (
            <p className="text-body-regular text-text-secondary">No engagement recorded yet.</p>
          ) : (
            <ul className="divide-y divide-separator-border text-body-regular">
              {engagements.data!.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-4 py-2">
                  <div>
                    <p className="font-medium text-text-primary">{(e.service_lines as unknown as { name: string } | null)?.name ?? e.service_line}</p>
                    <p className="text-caption-1-regular text-text-tertiary">From {fmtDate(e.start_date)}</p>
                  </div>
                  <span className="amount tabular-nums text-text-primary">{peso.format(Number(e.monthly_retainer))}</span>
                </li>
              ))}
            </ul>
          )}
          {isOwner && <EngagementForm clientId={id} serviceLines={serviceLines.data ?? []} />}
        </Card>

        <Card title="Team">
          {(team.data ?? []).length === 0 ? (
            <p className="text-body-regular text-text-secondary">Nobody is assigned yet.</p>
          ) : (
            <ul className="divide-y divide-separator-border text-body-regular">
              {team.data!.map((a) => (
                <li key={`${a.user_id}-${a.role}`} className="flex items-center justify-between gap-4 py-2">
                  <span className="text-text-primary">{(a.staff_profiles as unknown as { full_name: string } | null)?.full_name}</span>
                  <span className="flex items-center gap-3">
                    <span className="text-text-secondary">{a.role === "preparer" ? "Preparer" : "Reviewer"}</span>
                    {isOwner && <RemoveAssignmentButton clientId={id} userId={a.user_id} role={a.role as "preparer" | "reviewer"} />}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {isOwner && <AssignForm clientId={id} staff={(staff.data ?? []) as { user_id: string; full_name: string; role: string; branch_id: string | null }[]} branches={branches} branch={client.branch_id} />}
        </Card>

        <Card title="Registration & changes">
          {cases.length === 0 ? (
            <p className="text-body-regular text-text-secondary">No registration cases.</p>
          ) : (
            <ul className="divide-y divide-separator-border text-body-regular">
              {cases.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 py-2">
                  <Link href={`/app/registrations/${c.id}`} className="font-medium text-text-primary hover:underline">
                    {CASE_KINDS[c.kind as keyof typeof CASE_KINDS]}{c.period_year ? ` ${c.period_year}` : ""}{c.kind === "branch" ? ` · ${(c.details as { branch_name?: string }).branch_name}` : ""}
                  </Link>
                  <Badge tone={c.status === "open" ? "progress" : c.status === "completed" ? "done" : "neutral"}>{c.status === "open" ? "Open" : c.status === "completed" ? "Completed" : "Cancelled"}</Badge>
                </li>
              ))}
            </ul>
          )}
          {isOwner && (client.status === "active" || client.status === "onboarding") && (
            <div className="mt-4 flex flex-wrap gap-2 border-t border-separator-border pt-4">
              <LinkButton href={`/app/registrations/new?client=${id}&kind=renewal`} variant="secondary" size="sm">Annual renewal</LinkButton>
              <LinkButton href={`/app/registrations/new?client=${id}&kind=bir_update`} variant="secondary" size="sm">BIR update (1905)</LinkButton>
              <LinkButton href={`/app/registrations/new?client=${id}&kind=branch`} variant="secondary" size="sm">New branch</LinkButton>
              <LinkButton href={`/app/registrations/new?client=${id}&kind=closure`} variant="secondary" size="sm">Close the business</LinkButton>
            </div>
          )}
        </Card>

        <DocumentsCard
          clientId={id}
          clientName={client.name}
          cutoffDay={client.submission_cutoff_day}
          canAct={isOwner || (team.data ?? []).some((a) => a.user_id === me.userId)}
        />

        <Card title="Customers & suppliers" actions={<Link href={`/app/parties?client=${id}`} className="text-body-regular text-button-ghost-foreground hover:underline">See all</Link>}>
          {(parties.data ?? []).length === 0 ? (
            <p className="text-body-regular text-text-secondary">None yet. They are added when this client&rsquo;s documents are approved.</p>
          ) : (
            <ul className="divide-y divide-separator-border text-body-regular">
              {parties.data!.map((cp) => {
                const p = cp.parties as unknown as { display_name: string; tin: string; branch_code: string } | null;
                return (
                  <li key={cp.party_id} className="flex items-center justify-between gap-4 py-2">
                    <div className="min-w-0">
                      <Link href={`/app/parties/${cp.party_id}`} className="font-medium text-text-primary hover:underline">{p?.display_name}</Link>
                      <p className="text-caption-1-regular tabular-nums text-text-tertiary">{p?.tin}-{p?.branch_code} · last {fmtDate(cp.last_seen)}</p>
                    </div>
                    <span className="shrink-0 text-text-secondary">{PARTY_ROLES[cp.role as PartyRole]}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card title="Portal users">
          {(portalUsers.data ?? []).length === 0 ? (
            <p className="text-body-regular text-text-secondary">Nobody from the client can sign in yet.</p>
          ) : (
            <ul className="divide-y divide-separator-border text-body-regular">
              {portalUsers.data!.map((u) => {
                const info = portalEmailOf.get(u.user_id);
                return (
                  <li key={u.user_id} className="flex items-center justify-between gap-4 py-2">
                    <div>
                      <p className="font-medium text-text-primary">{u.full_name}{u.position ? <span className="font-normal text-text-secondary"> · {u.position}</span> : null}</p>
                      <p className="text-caption-1-regular text-text-tertiary">{info?.email ?? "—"}{info && !info.last_sign_in_at ? " · has not signed in yet" : ""}</p>
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
