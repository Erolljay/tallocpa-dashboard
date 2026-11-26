import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine, RiIndeterminateCircleLine } from "@remixicon/react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { statusLabel, statusTone } from "@/lib/clients/labels";
import { ONBOARDING_GROUPS, onboardingChecklist, onboardingProgress } from "@/lib/onboarding/checklist";
import { CLIENT_FILE_KINDS } from "@/lib/onboarding/files";
import { loadOnboarding } from "@/lib/onboarding/load";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { ClientTabs } from "../client-tabs";
import { StatusButton } from "../forms";
import { ClientFileForm, RemoveFileButton, TickForm } from "./forms";

export default function OnboardingPage(props: PageProps<"/app/clients/[id]/onboarding">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Onboarding params={props.params} />
    </Suspense>
  );
}

const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d.slice(0, 10)}T00:00:00Z`));

/**
 * A client's onboarding (spec §4.1): the checklist and the client's file, with
 * the proposal and the signed contract. Items follow the data where the data
 * records them; staff tick the rest.
 */
async function Onboarding({ params }: Pick<PageProps<"/app/clients/[id]/onboarding">, "params">) {
  const { id } = await params;
  const me = await requireStaff();
  const isOwner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const { data: client } = await supabase.from("clients").select("id, name, code, status, fiscal_year_end_month").eq("id", id).maybeSingle();
  if (!client) notFound();
  const [{ facts, files, accepted }, { data: team }, { data: staff }, { data: openCase }] = await Promise.all([
    loadOnboarding(supabase, id, client.fiscal_year_end_month),
    supabase.from("staff_assignments").select("user_id").eq("client_id", id),
    supabase.from("staff_profiles").select("user_id, full_name"),
    supabase.from("registration_cases").select("id").eq("client_id", id).eq("kind", "new_business").eq("status", "open").limit(1),
  ]);
  const canWork = isOwner || (team ?? []).some((t) => t.user_id === me.userId);
  const nameOf = new Map((staff ?? []).map((s) => [s.user_id, s.full_name as string]));
  const items = onboardingChecklist(facts);
  const progress = onboardingProgress(items);
  const complete = progress.done === progress.total;

  return (
    <>
      <PageHeader
        title={client.name}
        description={<span className="tabular-nums">{client.code} · onboarding</span>}
        actions={
          <div className="flex items-center gap-3">
            <Badge tone={statusTone[client.status as keyof typeof statusTone]}>{statusLabel[client.status]}</Badge>
            {isOwner && client.status === "onboarding" && !(openCase ?? []).length && <StatusButton clientId={id} to="active" label="Mark active" />}
          </div>
        }
      />
      <ClientTabs clientId={id} active="onboarding" work={canWork} onboarding={progress} />

      <div className="space-y-6">
        {client.status === "onboarding" && (
          <Notice tone={complete ? "done" : "waiting"}>
            {complete
              ? "Every item is done. The Owner can mark the client active."
              : `${progress.done} of ${progress.total} done. The client stays "Onboarding" until the Owner marks it active.`}
          </Notice>
        )}

        <Card title="Checklist" actions={<span className="text-body-regular tabular-nums text-text-secondary">{progress.done} / {progress.total}</span>}>
          <div className="space-y-5">
            {ONBOARDING_GROUPS.map((g) => {
              const list = items.filter((i) => i.group === g);
              if (list.length === 0) return null;
              return (
                <section key={g} className="space-y-2">
                  <h3 className="text-caption-1-semibold text-text-tertiary">{g}</h3>
                  <ul className="divide-y divide-separator-border">
                    {list.map((i) => {
                      const Icon = i.state === "done" ? RiCheckboxCircleFill : i.state === "na" ? RiIndeterminateCircleLine : RiCheckboxBlankCircleLine;
                      return (
                        <li key={i.key} className="flex flex-wrap items-start justify-between gap-3 py-2.5">
                          <div className="flex min-w-0 items-start gap-2.5">
                            <Icon aria-hidden className={cx("mt-0.5 size-5 shrink-0", i.state === "done" ? "text-chart-2" : "text-foreground-icon-quaternary")} />
                            <div className="min-w-0">
                              <p className={cx("text-body-medium", i.state === "na" ? "text-text-tertiary" : "text-text-primary")}>
                                {i.href ? <Link href={i.href} className="hover:underline">{i.label}</Link> : i.label}
                                <span className="sr-only"> ({i.state === "done" ? "done" : i.state === "na" ? "not needed" : "to do"})</span>
                              </p>
                              <p className="text-caption-1-regular text-text-secondary">
                                {i.state === "na" && !i.manual ? "Not needed for this client." : i.hint}
                                {i.tick && ` Done ${fmtDate(i.tick.at)} by ${nameOf.get(i.tick.by) ?? "—"}${i.tick.note ? `: ${i.tick.note}` : ""}.`}
                              </p>
                            </div>
                          </div>
                          {i.manual && i.state !== "na" && canWork && <TickForm clientId={id} item={i.key} done={i.state === "done"} />}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </Card>

        <div id="files">
          <Card title="Proposal, contract and other files">
            <div className="space-y-5">
              {accepted && (
                <p className="rounded-2xl bg-background-secondary-default p-4 text-body-regular text-text-primary">
                  Proposal and engagement terms accepted online on {fmtDate(accepted.acceptedAt)} by {accepted.acceptedName}
                  {accepted.acceptedPosition ? `, ${accepted.acceptedPosition}` : ""} (e-signature).{" "}
                  <a href={`/proposal/${accepted.token}`} target="_blank" rel="noreferrer" className="underline">Open the signed proposal</a>
                </p>
              )}
              {files.length === 0 && !accepted ? (
                <p className="text-body-regular text-text-secondary">Nothing attached yet.</p>
              ) : (
                <ul className="divide-y divide-separator-border">
                  {files.map((f) => (
                    <li key={f.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5">
                      <div className="min-w-0">
                        <p className="text-body-medium text-text-primary">
                          <a href={`/client-files/${f.id}`} target="_blank" rel="noreferrer" className="hover:underline">{f.title}</a>
                        </p>
                        <p className="text-caption-1-regular text-text-secondary">
                          {CLIENT_FILE_KINDS[f.kind]}
                          {f.kind === "contract" && (f.signed_on ? ` · signed ${fmtDate(f.signed_on)}` : " · signing date not entered")}
                          {` · ${f.file_name} · added ${fmtDate(f.created_at)} by ${nameOf.get(f.uploaded_by) ?? "—"}`}
                        </p>
                      </div>
                      {isOwner && <RemoveFileButton clientId={id} fileId={f.id} />}
                    </li>
                  ))}
                </ul>
              )}
              {canWork && <ClientFileForm clientId={id} />}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
