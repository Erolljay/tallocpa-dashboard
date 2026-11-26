"use client";

import { useActionState, useState, useTransition, type ReactNode } from "react";
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/base/table/table";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { MEDIUMS, PLATFORMS, TARGET_PATHS } from "@/lib/marketing/links";
import { cx } from "@/utils/cx";
import { archiveLinkAction, createLinkAction, type MarketingState } from "./actions";

/** The Owner makes a campaign link for a post or an ad. */
export function CreateLinkForm({ base }: { base: string }) {
  const [state, action, pending] = useActionState(createLinkAction, {} as MarketingState);
  const [target, setTarget] = useState<string>("/");
  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Label" htmlFor="m-label" hint="For you: which post or ad this is.">
          <Input id="m-label" name="label" required maxLength={100} placeholder="Tax season post, 3 Dec" />
        </Field>
        <Field label="Campaign" htmlFor="m-campaign" hint="Links of one campaign add up in the report.">
          <Input id="m-campaign" name="campaign" required maxLength={100} placeholder="tax-season-2027" />
        </Field>
        <Field label="Platform" htmlFor="m-platform">
          <Select id="m-platform" name="platform" defaultValue="facebook">
            {PLATFORMS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </Select>
        </Field>
        <Field label="Kind" htmlFor="m-medium">
          <Select id="m-medium" name="medium" defaultValue="social">
            {MEDIUMS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </Select>
        </Field>
        <Field label="Content (optional)" htmlFor="m-content" hint="Tells apart two posts of one campaign, like “video” or “carousel”.">
          <Input id="m-content" name="content" maxLength={100} />
        </Field>
        <Field label="Page it opens" htmlFor="m-target">
          <Select id="m-target" name="target" value={target} onChange={(e) => setTarget(e.target.value)}>
            {TARGET_PATHS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            <option value="other">Another page…</option>
          </Select>
        </Field>
        {target === "other" && (
          <Field label="Path on the site" htmlFor="m-target-custom" hint="Starts with /, like /services/bookkeeping.">
            <Input id="m-target-custom" name="target_custom" required pattern="/[A-Za-z0-9._~%/\-]*" maxLength={200} placeholder="/services/bookkeeping" />
          </Field>
        )}
        <Field label="Short code (optional)" htmlFor="m-code" hint={`${base}/go/<code>. Left empty, one is made from the campaign.`}>
          <Input id="m-code" name="code" maxLength={40} pattern="[a-z0-9]([a-z0-9\-]*[a-z0-9])?" placeholder="tax-dec3" />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Making…" : "Make the link"}</Button>
      </div>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      {state.ok && state.code && (
        <Notice tone="done">
          <span className="flex flex-wrap items-center gap-2">
            {state.ok} <CopyLink url={`${base}/go/${state.code}`} />
          </span>
        </Notice>
      )}
    </form>
  );
}

/** The full address, with a copy button. */
export function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <bdi dir="ltr" className="min-w-0 truncate font-mono text-body-2-regular text-text-secondary">{url}</bdi>
      <button
        type="button"
        aria-label={copied ? "Copied" : `Copy ${url}`}
        onClick={() => navigator.clipboard?.writeText(url).then(() => setCopied(true), () => setCopied(false))}
        className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-caption-1-semibold text-text-secondary transition-colors duration-150 hover:bg-background-secondary-hover hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
      >
        {copied ? <RiCheckLine aria-hidden className="size-4 text-foreground-icon-secondary" /> : <RiFileCopyLine aria-hidden className="size-4 text-foreground-icon-tertiary" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}

export function ArchiveButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <span className="inline-flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        disabled={pending}
        onClick={() => start(async () => {
          const r = await archiveLinkAction(id);
          setError(r.error ?? null);
        })}
      >
        {pending ? "Archiving…" : "Archive"}
      </Button>
      {error && <span className="text-caption-1-regular text-text-error-primary">{error}</span>}
    </span>
  );
}

export type ReportLine = {
  key: string;
  channel: string;
  campaign: string | null;
  link: string | null;
  clicks: number;
  leads: number;
  won: number;
  lost: number;
  quotedMonthly: number;
};

const php = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });
const pct = (won: number, leads: number) => (leads ? `${Math.round((won / leads) * 100)}%` : "—");

/** A number cell. The table's cells align start (styles/globals.css .bui-table), so the number sits end-aligned in a block. */
function N({ children, strong }: { children: ReactNode; strong?: boolean }) {
  return <span className={cx("block text-end tabular-nums", strong && "text-body-2-semibold")}>{children}</span>;
}

/** The report, on BoardUI's table. */
export function ReportTable({ lines }: { lines: ReportLine[] }) {
  const total = lines.reduce(
    (t, l) => ({ clicks: t.clicks + l.clicks, leads: t.leads + l.leads, won: t.won + l.won, lost: t.lost + l.lost, quotedMonthly: t.quotedMonthly + l.quotedMonthly }),
    { clicks: 0, leads: 0, won: 0, lost: 0, quotedMonthly: 0 },
  );
  return (
    <Table aria-label="Leads by source" size="sm" className="min-w-[48rem]">
      <TableHeader>
        <TableColumn isRowHeader>Channel</TableColumn>
        <TableColumn>Campaign</TableColumn>
        <TableColumn><N>Clicks</N></TableColumn>
        <TableColumn><N>Leads</N></TableColumn>
        <TableColumn><N>Won</N></TableColumn>
        <TableColumn><N>Lost</N></TableColumn>
        <TableColumn><N>Conversion</N></TableColumn>
        <TableColumn><N>Quoted / month</N></TableColumn>
      </TableHeader>
      <TableBody>
        {[
          ...lines.map((l) => (
            <TableRow key={l.key} id={l.key}>
              <TableCell>{l.channel}</TableCell>
              <TableCell>
                <span className="block">{l.campaign ?? <span className="text-text-tertiary">—</span>}</span>
                {l.link && <span className="block text-caption-1-regular text-text-tertiary">{l.link}</span>}
              </TableCell>
              <TableCell><N>{l.clicks || "—"}</N></TableCell>
              <TableCell><N>{l.leads}</N></TableCell>
              <TableCell><N>{l.won}</N></TableCell>
              <TableCell><N>{l.lost}</N></TableCell>
              <TableCell><N>{pct(l.won, l.leads)}</N></TableCell>
              <TableCell><N>{l.quotedMonthly ? php.format(l.quotedMonthly) : "—"}</N></TableCell>
            </TableRow>
          )),
          <TableRow key="total" id="total" className="bg-background-secondary-default">
            <TableCell><span className="text-body-2-semibold">Total</span></TableCell>
            <TableCell>{""}</TableCell>
            <TableCell><N strong>{total.clicks}</N></TableCell>
            <TableCell><N strong>{total.leads}</N></TableCell>
            <TableCell><N strong>{total.won}</N></TableCell>
            <TableCell><N strong>{total.lost}</N></TableCell>
            <TableCell><N strong>{pct(total.won, total.leads)}</N></TableCell>
            <TableCell><N strong>{total.quotedMonthly ? php.format(total.quotedMonthly) : "—"}</N></TableCell>
          </TableRow>,
        ]}
      </TableBody>
    </Table>
  );
}
