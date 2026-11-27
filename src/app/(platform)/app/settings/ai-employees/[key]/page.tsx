import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { keyState } from "@/lib/ai/credentials";
import { requestOrigin, siteOrigin } from "@/lib/email/brand";
import { TOOLS } from "@/lib/mcp/registry";
import { toolFor } from "@/lib/mcp/tool";
import { DEPARTMENTS, RUNS_ON, spendsOnApi, type BooksLevel, type Department, type RunsOn } from "@/lib/ai/workforce";
import { supabaseServer } from "@/lib/supabase/server";
import { ActivityList, type ActivityRow } from "../activity";
import { AssignForm, ConnectorAddress, CreateKeyForm, DisconnectButton, EnabledSwitch, GrantToolsButton, RemoveToolButton, RevokeKeyButton, SettingsForm, UnassignButton } from "../forms";

export default function AiEmployeePage(props: PageProps<"/app/settings/ai-employees/[key]">) {
  return (
    <>
      <p className="mb-3 text-body-regular">
        <Link href="/app/settings" className="text-button-ghost-foreground hover:underline">Settings</Link>
        <span className="text-text-tertiary"> / </span>
        <Link href="/app/settings/ai-employees" className="text-button-ghost-foreground hover:underline">AI employees</Link>
      </p>
      <Suspense fallback={<Skeleton rows={12} />}>
        <Employee params={props.params} />
      </Suspense>
    </>
  );
}

interface Ai {
  user_id: string;
  key: string;
  name: string;
  department: Department;
  job: string;
  runs_on: RunsOn;
  enabled: boolean;
  books_level: BooksLevel;
  all_clients: boolean;
  client_data: boolean;
  supervisor_user_id: string | null;
  daily_limit: number;
  monthly_cap: string;
}

interface Key {
  id: string;
  label: string;
  token_hint: string;
  created_at: string;
  expires_at: string;
  revoked_at: string | null;
  last_used_at: string | null;
}

const day = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" });
const keyBadge = { active: { tone: "done", word: "Active" }, expired: { tone: "neutral", word: "Expired" }, revoked: { tone: "blocked", word: "Revoked" } } as const;

async function Employee({ params }: Pick<PageProps<"/app/settings/ai-employees/[key]">, "params">) {
  const { key } = await params;
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const { data: ai } = await supabase
    .from("ai_employees")
    .select("user_id, key, name, department, job, runs_on, enabled, books_level, all_clients, client_data, supervisor_user_id, daily_limit, monthly_cap")
    .eq("brand_id", owner.staff.brandId)
    .eq("key", key)
    .maybeSingle<Ai>();
  if (!ai) notFound();

  const [{ data: staff }, { data: assigned }, { data: clients }, { data: keys }, { data: activity }, { data: grants }, origin, { data: apps }] = await Promise.all([
    supabase.from("staff_profiles").select("user_id, full_name").eq("active", true).order("full_name"),
    supabase.from("ai_assignments").select("client_id, clients(id, name, code)").eq("ai_user_id", ai.user_id),
    ai.client_data ? supabase.from("clients").select("id, name, code").eq("brand_id", owner.staff.brandId).order("name") : Promise.resolve({ data: [] }),
    supabase.from("ai_credentials").select("id, label, token_hint, created_at, expires_at, revoked_at, last_used_at").eq("ai_user_id", ai.user_id).eq("source", "key").order("created_at", { ascending: false }),
    supabase.from("ai_activity").select("id, ai_user_id, tool, outcome, created_at, clients(name)").eq("ai_user_id", ai.user_id).order("created_at", { ascending: false }).limit(50),
    supabase.from("ai_tool_grants").select("tool").eq("ai_user_id", ai.user_id),
    requestOrigin(),
    supabase.from("oauth_grants").select("id, created_at, last_used_at, oauth_clients(client_name)").eq("ai_user_id", ai.user_id).is("revoked_at", null).order("created_at", { ascending: false }),
  ]);
  const connected = (apps ?? []) as unknown as { id: string; created_at: string; last_used_at: string | null; oauth_clients: { client_name: string } | null }[];
  const granted = new Set((grants ?? []).map((g) => g.tool));
  const jobTools = TOOLS.filter((t) => toolFor(t, ai.key) && (ai.client_data || t.employees === "all"));
  const ungranted = jobTools.filter((t) => !granted.has(t.name)).map((t) => t.name);
  const address = `${siteOrigin() ?? origin ?? "https://app.tallocpa.com"}/api/mcp/${ai.key}`;
  const assignedClients = ((assigned ?? []) as unknown as { client_id: string; clients: { id: string; name: string; code: string } | null }[])
    .flatMap((a) => (a.clients ? [a.clients] : []))
    .sort((a, b) => a.name.localeCompare(b.name));
  const assignedIds = new Set(assignedClients.map((c) => c.id));
  const unassigned = ((clients ?? []) as { id: string; name: string; code: string }[]).filter((c) => !assignedIds.has(c.id));
  const now = new Date();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={ai.name} description={ai.job} />
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone={ai.enabled ? "done" : "neutral"}>{ai.enabled ? "On" : "Off"}</Badge>
        <span className="text-body-regular text-text-secondary">{DEPARTMENTS[ai.department]} · {RUNS_ON[ai.runs_on]}</span>
        <EnabledSwitch userId={ai.user_id} aiKey={ai.key} enabled={ai.enabled} name={ai.name} />
      </div>

      <Card title="Settings">
        <SettingsForm
          userId={ai.user_id}
          aiKey={ai.key}
          staff={staff ?? []}
          clientData={ai.client_data}
          spendsOnApi={spendsOnApi(ai.runs_on)}
          values={{ supervisor_user_id: ai.supervisor_user_id, books_level: ai.books_level, all_clients: ai.all_clients, daily_limit: ai.daily_limit, monthly_cap: String(ai.monthly_cap) }}
        />
      </Card>

      {ai.client_data && (
        <Card title="Clients">
          <div className="flex flex-col gap-4">
            {ai.all_clients && <Notice tone="waiting">Set to every client: the list below is not used while that box is ticked.</Notice>}
            {assignedClients.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No clients assigned. It reads no client records until you assign one.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-separator-border">
                {assignedClients.map((c) => (
                  <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0">
                    <Link href={`/app/clients/${c.id}`} className="min-w-0 text-body-regular text-text-primary hover:underline">
                      {c.name} <span className="text-text-tertiary">({c.code})</span>
                    </Link>
                    <UnassignButton userId={ai.user_id} aiKey={ai.key} clientId={c.id} name={c.name} />
                  </li>
                ))}
              </ul>
            )}
            <AssignForm userId={ai.user_id} aiKey={ai.key} clients={unassigned} />
          </div>
        </Card>
      )}

      <Card title="Connector">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-body-regular text-text-secondary">
              The TalloCPA OS connector address for {ai.name}. Each AI employee has its own address and its own keys, so every call is logged under its name.
            </p>
            <ConnectorAddress address={address} />
            <p className="text-caption-1-regular text-text-tertiary">
              <strong className="text-text-secondary">Cowork, claude.ai or the Claude app:</strong> Customize → Connectors → Add custom connector, paste this address, then sign in and allow it here. Add only this connector to {ai.name}&apos;s Cowork project.{" "}
              <strong className="text-text-secondary">Claude Code:</strong> <code dir="ltr" className="font-mono">claude mcp add --transport http {ai.key.replace(/_/g, "-")} {address}</code> (it signs in the same way), or add <code dir="ltr" className="font-mono">--header &quot;Authorization: Bearer &lt;key&gt;&quot;</code> with a key below.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-headline-medium text-text-primary">Connected apps</h3>
            {connected.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No app is signed in as {ai.name}.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-separator-border">
                {connected.map((g) => {
                  const app = g.oauth_clients?.client_name || "Connected app";
                  return (
                    <li key={g.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <p className="text-body-medium text-text-primary">{app}</p>
                        <p className="text-caption-1-regular text-text-tertiary">
                          Connected {day.format(new Date(g.created_at))}
                          {g.last_used_at ? ` · last signed in ${day.format(new Date(g.last_used_at))}` : ""}
                        </p>
                      </div>
                      <DisconnectButton grantId={g.id} aiKey={ai.key} app={app} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-headline-medium text-text-primary">Tools</h3>
              {ungranted.length > 1 && <GrantToolsButton userId={ai.user_id} aiKey={ai.key} tools={ungranted} label={`Grant all ${ungranted.length}`} />}
            </div>
            {jobTools.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No tools for this job yet. They come with the steps that build its work.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-separator-border">
                {jobTools.map((t) => (
                  <li key={t.name} className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0">
                    <div className="min-w-0 flex-1 basis-64">
                      <p className="flex flex-wrap items-center gap-2 text-body-medium text-text-primary">
                        {t.title} <code dir="ltr" className="font-mono text-caption-1-regular text-text-tertiary">{t.name}</code>
                        <Badge tone={granted.has(t.name) ? "done" : "neutral"}>{granted.has(t.name) ? "Granted" : "Not granted"}</Badge>
                      </p>
                      <p className="text-caption-1-regular text-text-tertiary">{t.description}</p>
                    </div>
                    {granted.has(t.name) ? (
                      <RemoveToolButton userId={ai.user_id} aiKey={ai.key} tool={t.name} />
                    ) : (
                      <GrantToolsButton userId={ai.user_id} aiKey={ai.key} tools={[t.name]} label="Grant" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Card>

      <Card title="Keys">
        <div className="flex flex-col gap-5">
          <p className="text-body-regular text-text-secondary">
            A key lets this AI employee use the TalloCPA OS connector. It is shown once, stored only as a fingerprint, and works until it expires or you revoke it.
          </p>
          {(keys ?? []).length > 0 && (
            <ul className="flex flex-col divide-y divide-separator-border">
              {((keys ?? []) as Key[]).map((k) => {
                const state = keyState(k, now);
                return (
                  <li key={k.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 text-body-regular text-text-primary">
                        {k.label || "Key"} <code dir="ltr" className="font-mono text-caption-1-regular text-text-secondary">…{k.token_hint}</code>
                        <Badge tone={keyBadge[state].tone}>{keyBadge[state].word}</Badge>
                      </p>
                      <p className="text-caption-1-regular text-text-tertiary">
                        Created {day.format(new Date(k.created_at))} · {state === "revoked" && k.revoked_at ? `revoked ${day.format(new Date(k.revoked_at))}` : `${state === "expired" ? "expired" : "expires"} ${day.format(new Date(k.expires_at))}`} ·{" "}
                        {k.last_used_at ? `last used ${day.format(new Date(k.last_used_at))}` : "never used"}
                      </p>
                    </div>
                    {state === "active" && <RevokeKeyButton id={k.id} aiKey={ai.key} />}
                  </li>
                );
              })}
            </ul>
          )}
          <CreateKeyForm userId={ai.user_id} aiKey={ai.key} />
        </div>
      </Card>

      <Card title="Activity">
        <ActivityList rows={(activity ?? []) as unknown as ActivityRow[]} />
      </Card>
    </div>
  );
}
