import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { expiryStatus, formatTin, TAX_ON_FEE, type TaxOnFee } from "@/lib/brand/profile";
import { grossReceiptsWatch, type ReceiptRow } from "@/lib/brand/receipts";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { BrandFileUpload, SectionForm, TaxForm } from "./forms";

export default function BrandSettingsPage() {
  return (
    <>
      <p className="mb-3 text-sm">
        <Link href="/app/settings" className="text-link hover:underline">Settings</Link>
      </p>
      <PageHeader
        title="Brand"
        description="How the firm is registered and how it appears on statements, quotes and letters. Only you can change these."
      />
      <Suspense fallback={<Skeleton rows={12} />}>
        <BrandSettings />
      </Suspense>
    </>
  );
}

const COLUMNS = [
  "display_name", "legal_name", "logo_path", "tin", "tin_branch_code", "rdo_code", "registered_address", "cor_path",
  "business_address", "phone", "reply_to_email", "website", "facebook_url",
  "cpa_license_no", "dti_business_name_no", "boa_firm_accreditation_no", "boa_firm_accreditation_valid_until",
  "boa_individual_accreditation_no", "boa_individual_accreditation_valid_until",
  "bir_tax_agent_accreditation_no", "bir_tax_agent_accreditation_valid_until", "ptr_no", "ptr_date", "ptr_place",
  "signatory_name", "signatory_title", "invoice_method", "invoice_series_prefix", "atp_or_permit_no",
  "tax_on_fee", "gross_receipts_warning",
] as const;

const EXPIRING = [
  "boa_firm_accreditation_valid_until",
  "boa_individual_accreditation_valid_until",
  "bir_tax_agent_accreditation_valid_until",
] as const;

async function BrandSettings() {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const year = Number(today.slice(0, 4));
  const [{ data: brand, error }, receipts] = await Promise.all([
    supabase.from("brands").select(COLUMNS.join(", ")).eq("id", owner.staff.brandId).single(),
    supabase.rpc("brand_receipts_by_month", { p_brand: owner.staff.brandId, p_year: year }),
  ]);
  if (!brand) return <Card><p className="text-sm text-danger-text">Could not load the brand: {error?.message ?? "not found"}</p></Card>;

  const row = brand as unknown as Record<(typeof COLUMNS)[number], string | number | null>;
  const values: Record<string, string> = Object.fromEntries(COLUMNS.map((c) => [c, row[c] == null ? "" : String(row[c])]));
  const warning = Number(row.gross_receipts_warning);
  const taxOnFee = row.tax_on_fee as TaxOnFee;

  const paths = [row.logo_path, row.cor_path].filter((p): p is string => typeof p === "string" && p.length > 0);
  const signed = new Map<string, string>();
  if (paths.length) {
    const { data } = await supabase.storage.from("brand-files").createSignedUrls(paths, 600);
    for (const s of data ?? []) if (s.path && s.signedUrl) signed.set(s.path, s.signedUrl);
  }
  const logoUrl = row.logo_path ? signed.get(String(row.logo_path)) : undefined;
  const corUrl = row.cor_path ? signed.get(String(row.cor_path)) : undefined;

  const attention = EXPIRING.map((c) => expiryStatus((row[c] as string | null) ?? null, today)).filter((e) => e && e.tone !== "ok");
  const tin = formatTin(row.tin as string | null, row.tin_branch_code as string | null);

  return (
    <div className="space-y-6">
      <GrossReceiptsCard rows={(receipts.data ?? []) as ReceiptRow[]} failed={receipts.error?.message} today={today} warning={warning} taxOnFee={taxOnFee} />

      <Card title="Identity">
        <SectionForm section="identity" values={values} today={today} />
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from storage
            <img src={logoUrl} alt="Current logo" className="h-16 w-auto max-w-48 rounded-lg border border-border bg-white object-contain p-2" />
          ) : (
            <div className="grid h-16 w-24 place-items-center rounded-lg border border-dashed border-border-strong text-center text-[10px] text-ink-subtle">No logo</div>
          )}
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-sm text-ink-muted">Printed on statements in place of the built-in mark. Use the approved SVG (transparent background) or a PNG.</p>
            <BrandFileUpload kind="logo" hasFile={Boolean(row.logo_path)} />
          </div>
        </div>
      </Card>

      <Card title="BIR Registration" actions={tin ? <span className="text-xs tabular-nums text-ink-subtle">TIN {tin}</span> : undefined}>
        <SectionForm section="bir" values={values} today={today} />
        <div className="mt-6 space-y-2 border-t border-border pt-5">
          <p className="text-sm font-medium text-ink-strong">Certificate of Registration (BIR Form 2303)</p>
          {corUrl ? (
            <p className="text-sm">
              <a href={corUrl} target="_blank" rel="noreferrer" className="text-link hover:underline">View the COR</a>
              <span className="text-ink-subtle"> · link valid for 10 minutes</span>
            </p>
          ) : (
            <p className="text-sm text-ink-muted">Not uploaded yet. Keep a copy here so staff can find it when a client or bank asks.</p>
          )}
          <BrandFileUpload kind="cor" hasFile={Boolean(row.cor_path)} />
        </div>
      </Card>

      <Card title="Contact" actions={<span className="text-xs text-ink-subtle">Shown on statements</span>}>
        <SectionForm section="contact" values={values} today={today} />
      </Card>

      <Card
        title="Professional Credentials"
        actions={attention.length ? <Badge tone={attention.some((e) => e?.tone === "expired") ? "blocked" : "waiting"}>{attention.length} to renew</Badge> : undefined}
      >
        <SectionForm section="credentials" values={values} today={today} />
      </Card>

      <Card title="Signatory">
        <SectionForm section="signatory" values={values} today={today} />
      </Card>

      <Card title="Invoicing" actions={<span className="text-xs text-ink-subtle">Service Invoices under the EOPT Act</span>}>
        <p className="mb-4 text-sm text-ink-muted">Invoices are still issued by hand; the OS records the invoice number against each payment.</p>
        <SectionForm section="invoicing" values={values} today={today} />
      </Card>

      <Card title="Tax on Our Fee" actions={<span className="text-xs text-ink-subtle">{TAX_ON_FEE[taxOnFee]}</span>}>
        <TaxForm taxOnFee={taxOnFee} warning={warning} />
      </Card>
    </div>
  );
}

const fmtMonth = (m: string) => new Intl.DateTimeFormat("en-PH", { month: "short", timeZone: "UTC" }).format(new Date(`${m}T00:00:00Z`));

/** Gross receipts watch (Q55): year-to-date fees against the warning amount and the ₱3M VAT threshold. */
function GrossReceiptsCard({ rows, failed, today, warning, taxOnFee }: { rows: ReceiptRow[]; failed?: string; today: string; warning: number; taxOnFee: TaxOnFee }) {
  if (failed) return <Card title="Gross Receipts Watch"><p className="text-sm text-danger-text">Could not total this year&apos;s collections: {failed}</p></Card>;
  const w = grossReceiptsWatch(rows, { today, warning });
  const vat = taxOnFee === "vat_12";
  const tone = vat ? "neutral" : w.status === "over" ? "blocked" : w.status === "warning" ? "waiting" : "done";
  const label = vat ? "VAT-registered" : w.status === "over" ? "Over the VAT threshold" : w.status === "warning" ? "Near the VAT threshold" : "Below the warning";
  const pct = (n: number) => `${Math.min(100, (n / w.threshold) * 100).toFixed(2)}%`;
  const peak = Math.max(1, ...w.months.map((m) => m.fees));

  return (
    <Card title={`Gross Receipts Watch · ${w.year}`} actions={<Badge tone={tone}>{label}</Badge>}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs text-ink-subtle">Our fees collected this year</p>
          <p className="text-3xl leading-tight font-semibold tabular-nums text-ink-heading">{peso.format(w.fees)}</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <dt className="text-ink-muted">Warning at</dt>
          <dd className="text-right tabular-nums text-ink-heading">{peso.format(w.warning)}</dd>
          <dt className="text-ink-muted">VAT threshold</dt>
          <dd className="text-right tabular-nums text-ink-heading">{peso.format(w.threshold)}</dd>
          {w.projected !== null && (
            <>
              <dt className="text-ink-muted">Year-end at this pace</dt>
              <dd className={`text-right tabular-nums ${w.projected >= w.threshold && !vat ? "font-medium text-danger-text" : "text-ink-heading"}`}>{peso.format(w.projected)}</dd>
            </>
          )}
        </dl>
      </div>

      <div className="relative mt-5 h-3 rounded-full bg-surface-sunken" role="meter" aria-valuemin={0} aria-valuemax={w.threshold} aria-valuenow={w.fees} aria-label="Fees collected against the VAT threshold">
        <div className={`h-3 rounded-full ${w.status === "over" ? "bg-danger" : w.status === "warning" ? "bg-warning" : "bg-action"}`} style={{ width: pct(w.fees) }} />
        <div className="absolute -top-1 h-5 w-0.5 bg-ink-strong" style={{ left: pct(w.warning) }} aria-hidden />
      </div>
      <div className="mt-1 flex justify-between text-xs text-ink-subtle">
        <span>₱0</span>
        <span>₱3M</span>
      </div>

      {!vat && w.status === "over" && (
        <div className="mt-4">
          <Notice>Gross receipts have passed ₱3,000,000. The firm must register for VAT; talk to the BIR about the effective date, then switch the tax on our fee below.</Notice>
        </div>
      )}
      {!vat && w.status === "warning" && (
        <div className="mt-4">
          <Notice>{peso.format(w.toThreshold)} left before the ₱3,000,000 VAT threshold. Plan the VAT registration and the switch of our prices.</Notice>
        </div>
      )}

      {w.months.length > 1 && (
        <div className="mt-5 flex h-20 items-end gap-1" aria-label="Fees collected by month">
          {w.months.map((m) => (
            <div key={m.month} className="flex min-w-0 flex-1 flex-col items-center gap-1" title={`${fmtMonth(m.month)}: ${peso.format(m.fees)}`}>
              <div className="w-full rounded-t bg-brand-blue/70" style={{ height: `${Math.max(2, (m.fees / peak) * 56)}px` }} />
              <span className="text-[10px] text-ink-subtle">{fmtMonth(m.month)}</span>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-ink-subtle">
        Counts retainers and other fees matched to deposits received this year. Not counted: {peso.format(w.clientMoney)} of client tax and contributions we remit
        {w.unallocated > 0 ? `, and ${peso.format(w.unallocated)} received but not yet matched to a due` : ""}.
      </p>
    </Card>
  );
}
