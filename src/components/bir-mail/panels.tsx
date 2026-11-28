import { RiMailLine, RiRobot2Line } from "@remixicon/react";
import Link from "next/link";
import { Badge, Card, Notice } from "@/components/ui";
import { draftLines } from "@/lib/ai/drafts";
import { BIR_MAIL_KINDS, NOTICE_LABELS, type BirMailKind, type NoticeType } from "@/lib/bir-mail/classify";
import { supabaseServer } from "@/lib/supabase/server";
import { BirMailProposalButtons } from "./forms";

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });
export const showWhen = (iso: string) => when.format(new Date(iso));

export const birMailLabel = (kind: string, notice: string | null) =>
  notice ? NOTICE_LABELS[notice as NoticeType] ?? "BIR notice" : BIR_MAIL_KINDS[kind as BirMailKind] ?? "BIR mail";

export interface ProposalRow {
  id: string;
  note: string;
  payload: { urgency?: string; filing_id?: string | null; message_kind?: string; summary?: unknown } & Record<string, unknown>;
  created_at: string;
  subject_id: string;
  ai_employees: { name: string } | null;
}

/** The BIR Mail Clerk's open proposals, each with Accept and link / Reject. */
export function BirMailProposals({ proposals, path }: { proposals: ProposalRow[]; path: string }) {
  if (!proposals.length) return null;
  return (
    <ul className="flex flex-col divide-y divide-separator-border">
      {proposals.map((d) => (
        <li key={d.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-center gap-2">
            <RiRobot2Line aria-hidden className="size-4 text-foreground-icon-tertiary" />
            <p className="text-body-medium text-text-primary">Proposed match</p>
            {d.payload.urgency === "high" && <Badge tone="blocked">Urgent</Badge>}
            <p className="text-caption-1-regular text-text-tertiary">{d.ai_employees?.name ?? "BIR Mail Clerk"} · {showWhen(d.created_at)}</p>
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
          <BirMailProposalButtons draftId={d.id} path={path} confirmation={d.payload.message_kind === "filing_confirmation" && Boolean(d.payload.filing_id)} />
        </li>
      ))}
    </ul>
  );
}

const PROPOSAL_SELECT = "id, note, payload, created_at, subject_id, ai_employees(name)";

/**
 * On a return's page: BIR mail linked to it, and the BIR Mail Clerk's open proposals
 * naming it. Renders nothing when there are neither.
 */
export async function BirMailForFiling({ filingId }: { filingId: string }) {
  const supabase = await supabaseServer();
  const [linked, proposed, attached] = await Promise.all([
    supabase.from("bir_mail").select("id, received_at, subject, kind, notice_type").eq("filing_instance_id", filingId).order("received_at", { ascending: false }).limit(20),
    supabase.from("ai_drafts").select(PROPOSAL_SELECT).eq("kind", "bir_mail_match").eq("status", "open").eq("payload->>filing_id", filingId).order("created_at", { ascending: false }).limit(10),
    supabase.from("filing_files").select("id, file_name").eq("filing_instance_id", filingId).eq("kind", "bir_confirmation").is("replaced_at", null).order("created_at", { ascending: false }).limit(5),
  ]);
  const mail = (linked.data ?? []) as { id: string; received_at: string; subject: string; kind: string; notice_type: string | null }[];
  const proposals = (proposed.data ?? []) as unknown as ProposalRow[];
  const confirmations = (attached.data ?? []) as { id: string; file_name: string }[];
  if (!mail.length && !proposals.length) return null;
  return (
    <Card title="BIR mail">
      <div className="flex flex-col gap-4">
        {confirmations.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-body-medium text-text-primary">BIR confirmation attached</p>
            <p className="text-body-regular text-text-secondary">Print it with the return form for the scanned copy, then mark the return filed at Filed &amp; paid.</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {confirmations.map((c) => (
                <li key={c.id}>
                  <a href={`/filing-files/${c.id}`} target="_blank" rel="noreferrer" className="text-body-regular text-button-ghost-foreground hover:underline">
                    Open {c.file_name} to print
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {mail.length > 0 && (
          <ul className="flex flex-col gap-2">
            {mail.map((m) => (
              <li key={m.id} className="flex flex-wrap items-center gap-2">
                <RiMailLine aria-hidden className="size-4 text-foreground-icon-tertiary" />
                <Link href={`/app/bir-mail/${m.id}`} className="text-body-medium text-text-primary hover:underline">{m.subject || "(no subject)"}</Link>
                <span className="text-caption-1-regular text-text-tertiary">{birMailLabel(m.kind, m.notice_type)} · {showWhen(m.received_at)}</span>
              </li>
            ))}
          </ul>
        )}
        <BirMailProposals proposals={proposals} path={`/app/filings/${filingId}`} />
      </div>
    </Card>
  );
}

/** The Owner's dashboard: urgent BIR notices the Clerk found, and BIR mail not yet linked. */
export async function BirMailAlert() {
  const supabase = await supabaseServer();
  const [urgent, waiting] = await Promise.all([
    supabase.from("ai_drafts").select("id, subject_id, payload, clients(name)").eq("kind", "bir_mail_match").eq("status", "open").eq("payload->>urgency", "high").order("created_at").limit(10),
    supabase.from("bir_mail").select("id", { count: "exact", head: true }).eq("status", "unmatched"),
  ]);
  const notices = (urgent.data ?? []) as unknown as { id: string; subject_id: string; payload: { notice_label?: string; respond_by?: string | null }; clients: { name: string } | null }[];
  const unmatched = waiting.count ?? 0;
  if (!notices.length && !unmatched) return null;
  return (
    <div className="mb-6 flex flex-col gap-3">
      {notices.length > 0 && (
        <Notice tone="blocked">
          {notices.length === 1 ? "An urgent BIR notice needs you: " : `${notices.length} urgent BIR notices need you: `}
          {notices.map((n, i) => (
            <span key={n.id}>
              {i > 0 && "; "}
              <Link href={`/app/bir-mail/${n.subject_id}`} className="font-medium underline">
                {n.clients?.name ?? "A client"}, {n.payload.notice_label ?? "BIR notice"}
              </Link>
              {n.payload.respond_by ? ` (answer by ${n.payload.respond_by})` : ""}
            </span>
          ))}
        </Notice>
      )}
      {unmatched > 0 && (
        <Notice tone="waiting">
          {unmatched} BIR email{unmatched === 1 ? " is" : "s are"} not linked to a client yet. <Link href="/app/bir-mail" className="font-medium underline">Open BIR mail</Link>
        </Notice>
      )}
    </div>
  );
}
