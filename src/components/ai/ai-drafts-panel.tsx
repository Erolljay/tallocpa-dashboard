import { RiRobot2Line } from "@remixicon/react";
import { Card } from "@/components/ui";
import { draftKindLabel, draftLines } from "@/lib/ai/drafts";
import { supabaseServer } from "@/lib/supabase/server";
import { DecideDraftButtons } from "./decide-draft";

interface DraftRow {
  id: string;
  kind: string;
  note: string;
  payload: unknown;
  created_at: string;
  ai_employees: { name: string } | null;
}

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });

/**
 * Open drafts from AI employees about one subject (e.g. a document) or one client, for
 * staff to accept or reject. Renders nothing when there are none. `path` is the page to
 * refresh after a decision.
 */
export async function AiDraftsPanel({
  subject,
  clientId,
  kinds,
  path,
  title = "Suggested by AI employees",
}: {
  subject?: { table: string; id: string };
  clientId?: string;
  kinds?: string[];
  path: string;
  title?: string;
}) {
  const supabase = await supabaseServer();
  let q = supabase.from("ai_drafts").select("id, kind, note, payload, created_at, ai_employees(name)").eq("status", "open").order("created_at", { ascending: false }).limit(20);
  if (subject) q = q.eq("subject_table", subject.table).eq("subject_id", subject.id);
  if (clientId) q = q.eq("client_id", clientId);
  if (kinds?.length) q = q.in("kind", kinds);
  const { data } = await q;
  const drafts = (data ?? []) as unknown as DraftRow[];
  if (drafts.length === 0) return null;
  return (
    <Card title={title}>
      <ul className="flex flex-col divide-y divide-separator-border">
        {drafts.map((d) => (
          <li key={d.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-center gap-2">
              <RiRobot2Line aria-hidden className="size-4 text-foreground-icon-tertiary" />
              <p className="text-body-medium text-text-primary">{draftKindLabel(d.kind)}</p>
              <p className="text-caption-1-regular text-text-tertiary">
                {d.ai_employees?.name ?? "AI employee"} · {when.format(new Date(d.created_at))}
              </p>
            </div>
            <dl className="grid grid-cols-[minmax(0,10rem)_1fr] gap-x-4 gap-y-1 text-body-regular">
              {draftLines(d.payload).map((l, i) => (
                <div key={i} className="contents">
                  <dt className="text-text-tertiary">{l.label}</dt>
                  <dd className="min-w-0 whitespace-pre-wrap break-words text-text-primary">{l.value}</dd>
                </div>
              ))}
            </dl>
            {d.note && <p className="text-body-regular text-text-secondary">{d.note}</p>}
            <DecideDraftButtons id={d.id} path={path} />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-caption-1-regular text-text-tertiary">Accepting records your decision; make the change in the app as usual. AI employees never change anything themselves.</p>
    </Card>
  );
}
