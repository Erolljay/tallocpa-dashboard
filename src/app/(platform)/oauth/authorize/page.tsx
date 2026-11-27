import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { BOOKS_LEVELS, type BooksLevel } from "@/lib/ai/workforce";
import { requireOwner } from "@/lib/auth";
import { requestOrigin } from "@/lib/email/brand";
import { TOOLS } from "@/lib/mcp/registry";
import { toolFor } from "@/lib/mcp/tool";
import { aiKeyOfResource, readAuthorize, redirectWith } from "@/lib/oauth/rules";
import { supabaseServer } from "@/lib/supabase/server";
import { ConsentForm } from "./forms";

/**
 * The Owner's consent page for a Claude connector (OAuth, docs/AI-WORKFORCE.md step 2b).
 * The connector address names the AI employee; the app gets that AI employee's granted
 * tools and clients, nothing more, and can sign nothing off.
 */
export default function AuthorizePage(props: PageProps<"/oauth/authorize">) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-10">
      <Suspense fallback={<Skeleton rows={8} />}>
        <Consent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}

function Problem({ text }: { text: string }) {
  return (
    <>
      <PageHeader title="This connection cannot be made" description="Go back to the app and try connecting again. If it keeps happening, remove the connector there and add it again." />
      <Notice tone="blocked">{text}</Notice>
    </>
  );
}

async function Consent({ searchParams }: Pick<PageProps<"/oauth/authorize">, "searchParams">) {
  const raw = await searchParams;
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(raw)) if (typeof v === "string") q.set(k, v);

  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) redirect(`/login?next=${encodeURIComponent(`/oauth/authorize?${q.toString()}`)}`);
  const owner = await requireOwner();

  const read = readAuthorize(q);
  if ("show" in read) return <Problem text={read.show} />;
  const clientId = "ok" in read ? read.ok.clientId : q.get("client_id")!;
  const redirectUri = "ok" in read ? read.ok.redirectUri : read.redirect.redirectUri;
  const { data: client } = await supabase.from("oauth_clients").select("client_id, client_name, redirect_uris").eq("client_id", clientId).maybeSingle();
  if (!client) return <Problem text="This app is not registered here. Remove the connector in the app and add it again." />;
  if (!(client.redirect_uris as string[]).includes(redirectUri)) return <Problem text="The app's return address does not match the one it registered." />;
  // Only now is it safe to send errors back to the app.
  if ("redirect" in read) redirect(redirectWith(read.redirect.redirectUri, { error: read.redirect.error, error_description: read.redirect.description, state: read.redirect.state }));

  const req = read.ok;
  const origin = await requestOrigin();
  const aiKey = req.resource && origin ? aiKeyOfResource(req.resource, origin) : null;
  if (req.resource && !aiKey) {
    redirect(redirectWith(req.redirectUri, { error: "invalid_target", error_description: "That is not a TalloCPA OS connector address.", state: req.state }));
  }

  const { data: employees } = await supabase.from("ai_employees").select("user_id, key, name, enabled, books_level, client_data, all_clients").eq("brand_id", owner.staff.brandId).order("name");
  const ai = aiKey ? (employees ?? []).find((e) => e.key === aiKey) : null;
  if (aiKey && !ai) return <Problem text={`There is no AI employee "${aiKey}". Check the connector address in Settings → AI Employees.`} />;

  let grants: string[] = [];
  let clients = 0;
  if (ai) {
    const [{ data: g }, { count }] = await Promise.all([
      supabase.from("ai_tool_grants").select("tool").eq("ai_user_id", ai.user_id),
      supabase.from("ai_assignments").select("client_id", { count: "exact", head: true }).eq("ai_user_id", ai.user_id),
    ]);
    grants = (g ?? []).map((x) => x.tool).filter((t) => TOOLS.some((tool) => tool.name === t && toolFor(tool, ai.key)));
    clients = count ?? 0;
  }
  const appName = client.client_name || "An app";

  return (
    <>
      <PageHeader
        title={ai ? `Connect ${appName} as ${ai.name}?` : `Connect ${appName} to TalloCPA OS?`}
        description="The app will work as this AI employee: it can use only the tools and clients you gave it, it can read the books only at its books access, and it cannot approve, sign, post, file or pay anything. You can disconnect it any time in Settings → AI Employees."
      />
      <Card>
        <div className="flex flex-col gap-5">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-body-regular">
            <dt className="text-text-tertiary">App</dt>
            <dd className="min-w-0 text-text-primary">
              {appName} <span className="block break-all text-caption-1-regular text-text-tertiary" dir="ltr">returns to {new URL(req.redirectUri).host}</span>
            </dd>
            {ai && (
              <>
                <dt className="text-text-tertiary">AI employee</dt>
                <dd className="flex flex-wrap items-center gap-2 text-text-primary">
                  {ai.name} <Badge tone={ai.enabled ? "done" : "neutral"}>{ai.enabled ? "On" : "Off"}</Badge>
                </dd>
                <dt className="text-text-tertiary">Tools</dt>
                <dd className="text-text-primary">{grants.length ? grants.join(", ") : "None granted yet"}</dd>
                <dt className="text-text-tertiary">Clients</dt>
                <dd className="text-text-primary">{!ai.client_data ? "None (no client data)" : ai.all_clients ? "Every client" : `${clients} assigned`}</dd>
                <dt className="text-text-tertiary">Books</dt>
                <dd className="text-text-primary">{ai.client_data ? BOOKS_LEVELS[ai.books_level as BooksLevel].label : "None"}</dd>
              </>
            )}
          </dl>
          {ai && !ai.enabled && <Notice tone="waiting">{ai.name} is switched off. The connection is made, but it does nothing until you switch it on.</Notice>}
          <ConsentForm
            req={{ clientId: req.clientId, redirectUri: req.redirectUri, state: req.state, codeChallenge: req.codeChallenge }}
            aiKey={ai ? ai.key : null}
            choices={(employees ?? []).map((e) => ({ key: e.key, name: e.name }))}
          />
        </div>
      </Card>
    </>
  );
}
