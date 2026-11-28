import { RiRobot2Line } from "@remixicon/react";
import { DecideDraftButtons } from "@/components/ai/decide-draft";
import { AuthorityText } from "@/components/registration/authority-text";
import { Card, LinkButton } from "@/components/ui";
import { draftKindLabel, draftLines } from "@/lib/ai/drafts";
import { supabaseServer } from "@/lib/supabase/server";
import { SendRunnerRequestsButtons } from "./runner-send";

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
 * The Registration Runner's open drafts on one case: the BIR registration form it filled
 * (accept or reject) and the requests it worded for the client (staff send them, as
 * themselves, or reject). Renders nothing when there are none.
 */
export async function RunnerDrafts({ caseId, open }: { caseId: string; open: boolean }) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("ai_drafts")
    .select("id, kind, note, payload, created_at, ai_employees(name)")
    .eq("status", "open")
    .eq("subject_table", "registration_cases")
    .eq("subject_id", caseId)
    .in("kind", ["bir_registration_form", "registration_requests", "authority_document"])
    .order("created_at", { ascending: false })
    .limit(10);
  const drafts = (data ?? []) as unknown as DraftRow[];
  if (drafts.length === 0) return null;
  const path = `/app/registrations/${caseId}`;
  return (
    <div className="mb-6">
      <Card title="Suggested by the Registration Runner">
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
              {d.kind === "authority_document" && typeof (d.payload as { marked?: unknown }).marked === "string" ? (
                <>
                  <AuthorityText
                    marked={(d.payload as { marked: string }).marked}
                    className="rounded-xl border border-separator-border p-4"
                  />
                  <p className="text-caption-1-regular text-text-tertiary">
                    Highlighted blanks: what the app does not hold, and the firm&rsquo;s representative, which staff fill for each client.
                  </p>
                  <div>
                    <LinkButton href={`/app/registrations/${caseId}/authority/${d.id}`} size="sm" variant="secondary">Print / download</LinkButton>
                  </div>
                </>
              ) : (
              <dl className="grid grid-cols-[minmax(0,12rem)_1fr] gap-x-4 gap-y-1 text-body-regular">
                {draftLines(d.payload).map((l, i) => (
                  <div key={i} className="contents">
                    <dt className="text-text-tertiary">{l.label}</dt>
                    <dd className={l.value.startsWith("Missing") ? "min-w-0 whitespace-pre-wrap break-words text-text-error-primary" : "min-w-0 whitespace-pre-wrap break-words text-text-primary"}>{l.value}</dd>
                  </div>
                ))}
              </dl>
              )}
              {d.note && <p className="text-body-regular text-text-secondary">{d.note}</p>}
              {d.kind === "registration_requests" && open ? (
                <SendRunnerRequestsButtons draftId={d.id} caseId={caseId} path={path} />
              ) : (
                <DecideDraftButtons id={d.id} path={path} />
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-caption-1-regular text-text-tertiary">
          The form and the authority document are for the preparer to check, print and have the client sign; nothing was submitted. Requests reach the client only when you send them. AI employees never change anything themselves.
        </p>
      </Card>
    </div>
  );
}
