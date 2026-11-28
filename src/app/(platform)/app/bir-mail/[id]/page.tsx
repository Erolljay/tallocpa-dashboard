import { RiAttachment2 } from "@remixicon/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DismissBirMailButton, LinkBirMailForm } from "@/components/bir-mail/forms";
import { BirMailProposals, birMailLabel, showWhen, type ProposalRow } from "@/components/bir-mail/panels";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { URGENT_NOTICES, respondBy, type NoticeType } from "@/lib/bir-mail/classify";
import { currentClientStatuses } from "@/lib/clients/labels";
import { supabaseServer } from "@/lib/supabase/server";

export default function BirMailMessagePage(props: PageProps<"/app/bir-mail/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Message params={props.params} />
    </Suspense>
  );
}

interface Mail {
  id: string;
  received_at: string;
  from_address: string;
  subject: string;
  body_text: string;
  kind: string;
  notice_type: string | null;
  tins: string[];
  attachments: { path: string; file_name: string; mime_type: string; size: number }[];
  status: string;
  client_id: string | null;
  filing_instance_id: string | null;
  mailbox: string | null;
  pdf_path: string | null;
  clients: { name: string; code: string } | null;
  filing_instances: { form: string; period_label: string } | null;
}

const manilaDay = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));

async function Message({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("bir_mail")
    .select("id, received_at, from_address, subject, body_text, kind, notice_type, tins, attachments, status, client_id, filing_instance_id, mailbox, pdf_path, clients(name, code), filing_instances(form, period_label)")
    .eq("id", id)
    .maybeSingle();
  const m = data as unknown as Mail | null;
  if (!m) notFound();

  const path = `/app/bir-mail/${m.id}`;
  const [proposals, files, clients, pdf] = await Promise.all([
    supabase.from("ai_drafts").select("id, note, payload, created_at, subject_id, ai_employees(name)").eq("kind", "bir_mail_match").eq("status", "open").eq("subject_table", "bir_mail").eq("subject_id", m.id).order("created_at", { ascending: false }),
    m.attachments.length ? supabase.storage.from("bir-mail").createSignedUrls(m.attachments.map((a) => a.path), 600) : Promise.resolve({ data: [] as { signedUrl: string }[] }),
    owner && m.status === "unmatched" ? supabase.from("clients").select("id, code, name, tin").in("status", currentClientStatuses).order("name") : Promise.resolve({ data: [] }),
    // The PDF the app keeps to attach to a return (the BIR's own, or one written from the email).
    m.pdf_path ? supabase.storage.from("filing-files").createSignedUrl(m.pdf_path, 600) : Promise.resolve({ data: null as { signedUrl: string } | null }),
  ]);
  const clientRows = (clients.data ?? []) as { id: string; code: string; name: string; tin: string | null }[];
  const named = clientRows.filter((c) => c.tin && m.tins.includes(c.tin.slice(0, 11)));
  const { data: returns } = named.length
    ? await supabase.from("filing_instances").select("id, client_id, form, period_label, due_date").in("client_id", named.map((c) => c.id)).order("due_date", { ascending: false }).limit(40)
    : { data: [] };
  const urgent = m.notice_type ? URGENT_NOTICES.includes(m.notice_type as NoticeType) : false;
  const deadline = m.kind === "notice" ? respondBy(m.body_text, manilaDay(m.received_at)) : null;

  return (
    <>
      <PageHeader title={m.subject || "(no subject)"} description={`${m.from_address} · ${showWhen(m.received_at)}`} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-6">
          {urgent && m.status === "unmatched" && (
            <Notice tone="blocked">
              This looks like a {birMailLabel(m.kind, m.notice_type)}.{deadline ? ` Answer by ${deadline} (worked out from the text; check the notice).` : " Read it for the deadline to answer."}
            </Notice>
          )}
          {(proposals.data ?? []).length > 0 && (
            <Card title="Suggested by the BIR Mail Clerk">
              <BirMailProposals proposals={(proposals.data ?? []) as unknown as ProposalRow[]} path={path} />
            </Card>
          )}
          <Card title="Message">
            <p className="whitespace-pre-wrap break-words text-body-regular text-text-primary">{m.body_text || "(no text)"}</p>
          </Card>
          {m.attachments.length > 0 && (
            <Card title="Attachments">
              <ul className="flex flex-col gap-2">
                {m.attachments.map((a, i) => {
                  const url = (files.data ?? [])[i]?.signedUrl;
                  return (
                    <li key={a.path} className="flex items-center gap-2">
                      <RiAttachment2 aria-hidden className="size-4 text-foreground-icon-tertiary" />
                      {url ? (
                        <a href={url} target="_blank" rel="noreferrer" className="text-body-medium text-text-primary hover:underline">{a.file_name}</a>
                      ) : (
                        <span className="text-body-regular text-text-secondary">{a.file_name}</span>
                      )}
                      <span className="text-caption-1-regular text-text-tertiary">{Math.max(1, Math.round(a.size / 1024))} KB</span>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}
        </div>
        <div className="space-y-6">
          <Card title="About">
            <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-2 text-body-regular">
              <dt className="text-text-tertiary">What it is</dt>
              <dd className="text-text-primary">{birMailLabel(m.kind, m.notice_type)}</dd>
              <dt className="text-text-tertiary">Status</dt>
              <dd>
                {m.status === "matched" ? <Badge tone="done">Linked</Badge> : m.status === "dismissed" ? <Badge>Set aside</Badge> : <Badge tone="waiting">Not linked</Badge>}
              </dd>
              {m.clients && (
                <>
                  <dt className="text-text-tertiary">Client</dt>
                  <dd className="text-text-primary">
                    <Link href={`/app/clients/${m.client_id}`} className="hover:underline">{m.clients.code} {m.clients.name}</Link>
                  </dd>
                </>
              )}
              {m.filing_instances && (
                <>
                  <dt className="text-text-tertiary">Return</dt>
                  <dd className="text-text-primary">
                    <Link href={`/app/filings/${m.filing_instance_id}`} className="hover:underline">{m.filing_instances.form} {m.filing_instances.period_label}</Link>
                  </dd>
                </>
              )}
              {m.tins.length > 0 && (
                <>
                  <dt className="text-text-tertiary">TINs named</dt>
                  <dd className="text-text-primary">{m.tins.join(", ")}</dd>
                </>
              )}
              {m.mailbox && (
                <>
                  <dt className="text-text-tertiary">Mailbox</dt>
                  <dd className="min-w-0 break-words text-text-primary" dir="ltr">{m.mailbox}</dd>
                </>
              )}
              {pdf.data?.signedUrl && (
                <>
                  <dt className="text-text-tertiary">PDF</dt>
                  <dd>
                    <a href={pdf.data.signedUrl} target="_blank" rel="noreferrer" className="text-body-regular text-button-ghost-foreground hover:underline">Open to print</a>
                  </dd>
                </>
              )}
            </dl>
          </Card>
          {owner && m.status === "unmatched" && (
            <Card title="Link it yourself">
              <div className="flex flex-col gap-4">
                <LinkBirMailForm
                  mailId={m.id}
                  clients={[...named, ...clientRows.filter((c) => !named.includes(c))].map((c) => ({ id: c.id, label: `${c.code} ${c.name}` }))}
                  returns={((returns ?? []) as { id: string; client_id: string; form: string; period_label: string }[]).map((r) => ({
                    id: r.id,
                    clientId: r.client_id,
                    label: `${named.find((c) => c.id === r.client_id)?.code ?? ""} ${r.form} ${r.period_label}`,
                  }))}
                />
                <DismissBirMailButton mailId={m.id} />
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
