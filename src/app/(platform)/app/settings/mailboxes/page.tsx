import { RiMailLine } from "@remixicon/react";
import { Suspense } from "react";
import { AnchorButton, Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { esubmissionMailEnv, googleCalendarEnv, paymentMailEnv } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase/server";
import { CheckMailboxesButton, DisconnectMailboxButton, MailboxPurposesForm } from "./forms";

/**
 * Settings → Mailboxes (Owner only; migration 20270111000001): the Gmail inboxes the app
 * reads, read-only, for BIR mail and the banks' payment confirmations. The Owner's own
 * inbox and the shared support@ mailbox are connected here; the eSubmission mailbox is
 * set up once in the environment (docs/SETUP.md).
 */
export default function MailboxesPage(props: PageProps<"/app/settings/mailboxes">) {
  return (
    <>
      <PageHeader
        title="Mailboxes"
        description="The Gmail inboxes the app reads, read only, for BIR mail (filing confirmations, notices) and the banks' payment confirmations. It never sends, moves or deletes mail. BIR mail is checked every two days; payment confirmations twice a day."
      />
      <Suspense fallback={<Skeleton rows={6} />}>
        <Mailboxes searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

const ERRORS: Record<string, string> = {
  setup: "Google is not set up yet: add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_TOKEN_KEY (docs/SETUP.md).",
  state: "The connection could not be confirmed. Start again from this page.",
  denied: "Google access was not given.",
  scope: "Tick the box that lets the app read the mailbox's email, then connect again.",
  account: "Connect a mailbox of the firm's Google Workspace.",
  google: "Google did not complete the connection. Try again.",
};

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });

interface Row {
  id: string;
  email: string;
  for_bir_mail: boolean;
  for_payment_mail: boolean;
  connected_at: string;
  last_checked_at: string | null;
  last_error: string | null;
}

async function Mailboxes({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireOwner();
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? ERRORS[sp.error] ?? ERRORS.google : null;
  const connectedNow = sp.connected === "1";
  const supabase = await supabaseServer();
  const { data } = await supabase.from("connected_mailboxes").select("id, email, for_bir_mail, for_payment_mail, connected_at, last_checked_at, last_error").order("connected_at");
  const rows = (data ?? []) as Row[];
  const google = googleCalendarEnv();
  const esub = esubmissionMailEnv();
  const pay = paymentMailEnv();

  return (
    <div className="flex flex-col gap-6">
      {error && <Notice tone="blocked">{error}</Notice>}
      {connectedNow && <Notice tone="done">Mailbox connected. Choose below what it is read for.</Notice>}
      <Card
        title="Connected mailboxes"
        actions={google ? <AnchorButton href="/app/settings/mailboxes/connect" size="sm">Connect a Gmail mailbox</AnchorButton> : undefined}
      >
        {rows.length === 0 ? (
          <p className="text-body-regular text-text-secondary">
            None yet. Connect your own inbox, then sign in as support@ and connect it too. Google asks for read-only access to the mailbox&apos;s email.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-separator-border">
            {rows.map((m) => (
              <li key={m.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center gap-2">
                  <RiMailLine aria-hidden className="size-4 text-foreground-icon-tertiary" />
                  <span className="text-body-medium text-text-primary" dir="ltr">{m.email}</span>
                  {m.last_error ? <Badge tone="blocked">Needs reconnecting</Badge> : <Badge tone="done">Connected</Badge>}
                </div>
                <p className="text-caption-1-regular text-text-tertiary">
                  Connected {when.format(new Date(m.connected_at))}
                  {m.last_checked_at ? ` · last checked ${when.format(new Date(m.last_checked_at))}` : " · not checked yet"}
                </p>
                {m.last_error && <p className="text-body-regular text-text-error-primary">{m.last_error}</p>}
                <MailboxPurposesForm id={m.id} birMail={m.for_bir_mail} paymentMail={m.for_payment_mail} />
                <DisconnectMailboxButton id={m.id} />
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Card title="Set up in the environment">
        <ul className="flex flex-col gap-2 text-body-regular text-text-secondary">
          <li>
            <span className="text-text-primary">eSubmission mailbox</span>: {esub ? <span dir="ltr">{esub.mailbox}</span> : "not set up"}. Also read for BIR mail.
          </li>
          <li>
            <span className="text-text-primary">Payment mailbox</span>: {pay ? <span dir="ltr">{pay.mailbox}</span> : "not set up"}.
          </li>
        </ul>
      </Card>
      <CheckMailboxesButton />
    </div>
  );
}
