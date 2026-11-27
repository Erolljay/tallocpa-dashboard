import Link from "next/link";
import { Suspense } from "react";
import { RiArrowRightSLine, RiFileList3Line, RiGroupLine, RiShoppingBag3Line, RiStore2Line, type RemixiconComponentType } from "@remixicon/react";
import { DocumentUpload } from "@/components/document-upload";
import { TelegramLinkButton, TelegramUnlinkButton } from "@/components/telegram/telegram-link";
import { NothingToSubmitButton } from "@/components/cycle-forms";
import { Badge, Card, Notice, Skeleton } from "@/components/ui";
import { monthChoices, nextCutoff } from "@/lib/documents/cutoff";
import { showMonth, STREAMS, type DocType, type Stream } from "@/lib/documents/labels";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { cx } from "@/utils/cx";
import { portalContext } from "../client-context";

/**
 * Portal Upload (rework decisions 1–3): one place to send the month's documents, by
 * the four Inbox streams. Photos and PDFs for every stream; Payroll also takes the
 * client's own Excel. The Tallo payroll register (Payroll page) and the list of
 * everything sent (Documents page) open from here.
 */
export default function PortalUpload(props: PageProps<"/portal/upload">) {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Upload searchParams={props.searchParams} />
    </Suspense>
  );
}

const STREAM_INFO: Record<Stream, { icon: RemixiconComponentType; hint: string }> = {
  sales: { icon: RiStore2Line, hint: "Sales invoices, official receipts, 2307s from customers" },
  purchases: { icon: RiShoppingBag3Line, hint: "Receipts and invoices for what you bought or paid, 2307s you issued" },
  payroll: { icon: RiGroupLine, hint: "Your payroll in any format: Excel, PDF or a photo" },
  other: { icon: RiFileList3Line, hint: "Bank statements, contracts, your COR, anything else" },
};
const ORDER = Object.keys(STREAMS) as Stream[];
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

async function Upload({ searchParams }: Pick<PageProps<"/portal/upload">, "searchParams">) {
  const sp = await searchParams;
  const stream: Stream = ORDER.find((s) => s === one(sp.stream)) ?? "sales";
  const { id, supabase, clients } = await portalContext();
  if (clients.length === 0) {
    return <p className="rounded-3xl border border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">Your portal is being set up. Please check back soon.</p>;
  }
  const today = manilaToday();
  const ids = clients.map((c) => c.id);
  const months = clients.map((x) => ({ client: x, ...nextCutoff(today, x.submission_cutoff_day) }));
  const periods = [...new Set(months.map((m) => m.month))];
  const [{ data: cycles }, { data: sent }, { count: returned }] = await Promise.all([
    supabase.from("document_cycles").select("client_id, period, closed_at, nothing_to_submit_at, client_confirmed_at").in("client_id", ids).in("period", periods),
    supabase.from("documents").select("client_id, document_month").in("client_id", ids).in("document_month", periods).neq("status", "uploading").not("doc_type", "in", "(filed_return,payment_proof)").limit(2000),
    supabase.from("documents").select("id", { count: "exact", head: true }).in("client_id", ids).eq("status", "returned"),
  ]);
  const status = months.map(({ client, month, cutoff, daysLeft }) => {
    const y = (cycles ?? []).find((r) => r.client_id === client.id && r.period === month);
    const count = (sent ?? []).filter((d) => d.client_id === client.id && d.document_month === month).length;
    return { client, month, cutoff, daysLeft, open: !!y && !y.closed_at, nothing: !!y?.nothing_to_submit_at, confirmed: !!y?.client_confirmed_at, count };
  });
  const main = status[0];
  // Telegram is opt-in per client (staff switch it on); others never see it.
  const telegram = clients.filter((c) => c.telegram_enabled);
  const { data: links } = telegram.length
    ? await supabase.from("telegram_links").select("chat_id, client_id, username").in("client_id", telegram.map((c) => c.id)).eq("user_id", id.userId)
    : { data: [] as { chat_id: number; client_id: string; username: string | null }[] };
  const types = STREAMS[stream].types as readonly DocType[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-1-medium text-text-primary">Upload</h1>
        <p className="mt-1 text-body-regular text-text-secondary">
          {showMonth(main.month)} documents are due by <span className="text-body-medium text-text-primary">{showDate(main.cutoff)}</span>
          {main.daysLeft > 0 ? ` — ${main.daysLeft} day${main.daysLeft === 1 ? "" : "s"} left.` : main.daysLeft === 0 ? " — today is the last day." : "."}
        </p>
      </div>

      {(returned ?? 0) > 0 && (
        <Notice tone="blocked">
          {returned} document{returned === 1 ? " was" : "s were"} returned to you. <Link href="/portal/documents" className="underline">See why</Link>
        </Notice>
      )}

      <nav aria-label="What are you sending?">
        <ul className="grid grid-cols-2 gap-3">
          {ORDER.map((s) => {
            const { icon: Icon, hint } = STREAM_INFO[s];
            const on = s === stream;
            return (
              <li key={s}>
                <Link
                  href={`/portal/upload?stream=${s}`}
                  scroll={false}
                  aria-current={on ? "page" : undefined}
                  className={cx(
                    "flex h-full min-h-24 flex-col gap-1 rounded-2xl border px-3 py-3 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                    on ? "border-accent-500 bg-accent-50" : "border-border-button-default bg-background-primary-default hover:border-border-button-hover hover:bg-background-secondary-hover",
                  )}
                >
                  <Icon aria-hidden className={cx("size-6", on ? "text-button-ghost-foreground" : "text-foreground-icon-secondary")} />
                  <span className="text-headline-medium text-text-primary">{STREAMS[s].label}</span>
                  <span className="text-caption-1-regular text-text-secondary max-sm:sr-only">{hint}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Card title={`Send ${STREAMS[stream].label}`}>
        <p className="mb-4 text-body-regular text-text-secondary">
          {STREAM_INFO[stream].hint}.{" "}
          {stream === "payroll" ? "Send it as you have it; we copy it into our template for you." : "Take a clear photo of each one, flat and in good light, or choose PDFs."}
        </p>
        <DocumentUpload
          key={stream}
          clients={clients.map((x) => ({ id: x.id, name: x.name }))}
          docTypes={[...types]}
          months={monthChoices(today, 6)}
          defaultMonth={main.month}
        />
      </Card>

      {telegram.length > 0 && (
        <Card title="Send by Telegram">
          <p className="mb-4 text-body-regular text-text-secondary">
            Send photos or PDFs to our Telegram bot, many at a time if you like, then tap what they are. Each file arrives here as its own document.
            For the clearest reading, send photos as files.
          </p>
          <ul className="space-y-4">
            {telegram.map((c) => {
              const mine = (links ?? []).filter((l) => l.client_id === c.id);
              return (
                <li key={c.id} className="flex flex-col gap-2">
                  {telegram.length > 1 && <span className="text-body-medium text-text-primary">{c.name}</span>}
                  {mine.map((l) => (
                    <p key={l.chat_id} className="flex flex-wrap items-center gap-3 text-body-regular text-text-secondary">
                      Linked{l.username ? <> to <bdi dir="ltr">@{l.username}</bdi></> : null}
                      <TelegramUnlinkButton chatId={l.chat_id} />
                    </p>
                  ))}
                  <div className="max-w-xs">
                    <TelegramLinkButton clientId={c.id} label={mine.length ? "Link another chat" : "Link Telegram"} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      <Card title="This month">
        <ul className="space-y-3">
          {status.map((x) => (
            <li key={x.client.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-body-regular">
              {clients.length > 1 && <span className="text-body-medium text-text-primary">{x.client.name}:</span>}
              {x.nothing ? (
                <Badge tone="done">Nothing to submit for {showMonth(x.month)}</Badge>
              ) : x.confirmed ? (
                <Badge tone="done">{showMonth(x.month)} complete</Badge>
              ) : x.count > 0 ? (
                <Badge tone="progress">{x.count} document{x.count === 1 ? "" : "s"} sent for {showMonth(x.month)}</Badge>
              ) : (
                <>
                  <span className="text-text-secondary">Nothing sent yet for {showMonth(x.month)}.</span>
                  {x.open && <NothingToSubmitButton clientId={x.client.id} period={x.month} label="No transactions this month" />}
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-1 border-t border-separator-border pt-3">
          <Link href="/portal" className="flex items-center justify-between py-2 text-body-medium text-text-primary hover:text-button-ghost-foreground">
            Sent everything? Confirm the month on Home <RiArrowRightSLine aria-hidden className="size-5 text-foreground-icon-tertiary rtl:rotate-180" />
          </Link>
          <Link href="/portal/documents" className="flex items-center justify-between py-2 text-body-medium text-text-primary hover:text-button-ghost-foreground">
            Everything you&apos;ve sent <RiArrowRightSLine aria-hidden className="size-5 text-foreground-icon-tertiary rtl:rotate-180" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
