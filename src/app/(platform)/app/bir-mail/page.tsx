import Link from "next/link";
import { Suspense } from "react";
import { FilingsTabs } from "@/app/(platform)/app/nav/section-tabs";
import { CheckMailboxButton } from "@/components/bir-mail/forms";
import { birMailLabel, showWhen } from "@/components/bir-mail/panels";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { URGENT_NOTICES, type NoticeType } from "@/lib/bir-mail/classify";
import { supabaseServer } from "@/lib/supabase/server";

export default function BirMailPage() {
  return (
    <>
      <PageHeader
        title="BIR mail"
        description="Emails from the BIR in the firm's mailboxes (Settings → Mailboxes), checked every two days: filing confirmations, replies and notices. The BIR Mail Clerk proposes which client and return each is about; a person links it, and attaches a filing confirmation to its return to print with the form."
      />
      <FilingsTabs active="bir_mail" />
      <Suspense fallback={<Skeleton rows={8} />}>
        <MailList />
      </Suspense>
    </>
  );
}

interface Row {
  id: string;
  received_at: string;
  from_address: string;
  subject: string;
  kind: string;
  notice_type: string | null;
  status: string;
  clients: { name: string; code: string } | null;
}

async function MailList() {
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const [mail, proposals] = await Promise.all([
    supabase.from("bir_mail").select("id, received_at, from_address, subject, kind, notice_type, status, clients(name, code)").order("received_at", { ascending: false }).limit(200),
    supabase.from("ai_drafts").select("subject_id").eq("kind", "bir_mail_match").eq("status", "open"),
  ]);
  const rows = (mail.data ?? []) as unknown as Row[];
  const proposed = new Set(((proposals.data ?? []) as { subject_id: string }[]).map((p) => p.subject_id));
  const waiting = rows.filter((r) => r.status === "unmatched");
  const linked = rows.filter((r) => r.status === "matched");

  return (
    <div className="flex flex-col gap-6">
      {owner && (
        <Card title="Not linked yet" actions={<CheckMailboxButton />}>
          {waiting.length === 0 ? (
            <p className="text-body-regular text-text-secondary">Nothing waiting. The mailbox is read every night; check it now for anything newer.</p>
          ) : (
            <MailTable rows={waiting} proposed={proposed} />
          )}
        </Card>
      )}
      {!owner && waiting.length === 0 && linked.length === 0 && <Notice tone="waiting">No BIR mail linked to your clients yet.</Notice>}
      {linked.length > 0 && (
        <Card title="Linked to clients">
          <MailTable rows={linked} proposed={proposed} />
        </Card>
      )}
    </div>
  );
}

function MailTable({ rows, proposed }: { rows: Row[]; proposed: Set<string> }) {
  return (
    <ul className="flex flex-col divide-y divide-separator-border">
      {rows.map((r) => (
        <li key={r.id} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/app/bir-mail/${r.id}`} className="text-body-medium text-text-primary hover:underline">{r.subject || "(no subject)"}</Link>
            {r.notice_type && URGENT_NOTICES.includes(r.notice_type as NoticeType) && <Badge tone="blocked">{birMailLabel(r.kind, r.notice_type)}</Badge>}
            {r.status === "unmatched" && proposed.has(r.id) && <Badge tone="progress">Match proposed</Badge>}
          </div>
          <p className="text-caption-1-regular text-text-tertiary">
            {showWhen(r.received_at)} · {birMailLabel(r.kind, r.notice_type)}
            {r.clients ? ` · ${r.clients.code} ${r.clients.name}` : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}
