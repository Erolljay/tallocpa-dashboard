import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { describeDue, FREQUENCY_SECTIONS, taxTypeOfForm } from "@/lib/deadlines/describe";
import type { DueRule, Frequency } from "@/lib/deadlines/engine";
import { supabaseServer } from "@/lib/supabase/server";
import { HolidayForm, RemoveHolidayButton, RuleEditor } from "./forms";
import { AddPaymentAccountForm, EditPaymentAccountForm, MoveAccountButtons, PaymentDaysForm, ReplaceQrForm, ToggleAccountButton } from "./payment-forms";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Brand, fee schedule, branches and your stand-in, where clients pay, BIR deadline rules and non-working days. Rule changes move the due dates of filings not yet filed; filed ones keep their dates."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card title="Brand" actions={<Link href="/app/settings/brand" className="text-body-regular text-button-ghost-foreground hover:underline">Open</Link>}>
          <p className="text-body-regular text-text-secondary">Legal name, TIN and COR, contact details on statements, credentials, invoicing, tax on our fee and the gross receipts watch.</p>
        </Card>
        <Card title="Fee schedule" actions={<Link href="/app/settings/fees" className="text-body-regular text-button-ghost-foreground hover:underline">Open</Link>}>
          <p className="text-body-regular text-text-secondary">Prices for new clients, quote preview, and how current clients&apos; fees compare.</p>
        </Card>
        <Card title="Branches" actions={<Link href="/app/settings/branches" className="text-body-regular text-button-ghost-foreground hover:underline">Open</Link>}>
          <p className="text-body-regular text-text-secondary">Iloilo now; add branches as the firm grows. Clients and staff each belong to one.</p>
        </Card>
        <Card title="Acting approver" actions={<Link href="/app/settings/acting-approver" className="text-body-regular text-button-ghost-foreground hover:underline">Open</Link>}>
          <p className="text-body-regular text-text-secondary">Name a Reviewer to give the final approval while you are away, with a peso limit and a daily digest.</p>
        </Card>
      </div>
      <Suspense fallback={<Skeleton rows={4} />}>
        <PaymentSettings />
      </Suspense>
      <div className="h-6" />
      <Suspense fallback={<Skeleton rows={10} />}>
        <DeadlineSettings />
      </Suspense>
    </>
  );
}

interface Rule {
  id: string;
  form: string;
  frequency: Frequency;
  due: DueRule;
  channel: "efps" | "ebirforms" | null;
  efps_group: string | null;
  calendar_year: boolean;
  period_filter: "all" | "exclude_quarter_end_months" | "exclude_last_quarter";
  effective_from: string;
  source: string;
  verified_at: string | null;
}

const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
const kindLabel: Record<string, string> = { regular: "Regular", special: "Special non-working", suspension: "Work suspension" };

/** Which periods the rule files for, when it is not every period. */
const periodNote: Record<Rule["period_filter"], string> = {
  all: "",
  exclude_quarter_end_months: " · 1st and 2nd month of each quarter only",
  exclude_last_quarter: " · Q1 to Q3 only",
};

function appliesTo(r: Rule) {
  if (r.channel === "efps") return `eFPS · Group ${r.efps_group}`;
  if (r.channel === "ebirforms") return "eBIRForms";
  return "All filers";
}

async function DeadlineSettings() {
  await requireOwner();
  const supabase = await supabaseServer();
  const [{ data: rules }, { data: holidays }] = await Promise.all([
    supabase.from("deadline_rules").select("id, form, frequency, due, channel, efps_group, calendar_year, period_filter, effective_from, source, verified_at").is("effective_to", null).order("form").order("channel", { nullsFirst: true }).order("efps_group", { nullsFirst: true }),
    supabase.from("holidays").select("date, name, kind, source").order("date"),
  ]);
  const all = (rules ?? []) as Rule[];
  const unverified = all.filter((r) => !r.verified_at).length;

  return (
    <div className="space-y-6">
      {FREQUENCY_SECTIONS.map((section) => {
        const rows = all.filter((r) => r.frequency === section.frequency);
        if (rows.length === 0) return null;
        return (
          <Card key={section.frequency} title={section.title} actions={<span className="text-caption-1-regular text-text-tertiary">{section.hint}</span>}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] text-body-regular">
                <thead className="text-start text-body-medium text-text-tertiary">
                  <tr>
                    <th scope="col" className="text-start pb-2">Form</th>
                    <th scope="col" className="text-start pb-2">Applies to</th>
                    <th scope="col" className="text-start pb-2">Deadline</th>
                    <th scope="col" className="text-start pb-2">Source</th>
                    <th scope="col" className="text-start pb-2"><span className="sr-only">Edit</span></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover align-top">
                      <td className="py-3 pr-4">
                        <p className="font-medium text-text-primary">{r.form}</p>
                        <p className="text-caption-1-regular text-text-tertiary">{taxTypeOfForm(r.form)}{r.calendar_year ? " · calendar year" : ""}{periodNote[r.period_filter]}</p>
                      </td>
                      <td className="py-3 pr-4 text-text-secondary">{appliesTo(r)}</td>
                      <td className="py-3 pr-4 text-text-primary">
                        {describeDue(r.due, r.frequency)}
                        <p className="text-caption-1-regular text-text-tertiary">From periods ending {fmtDate(r.effective_from)}</p>
                      </td>
                      <td className="py-3 pr-4">
                        {r.verified_at ? <Badge tone="done">{r.source}</Badge> : <Badge tone="waiting">Unverified</Badge>}
                      </td>
                      <td className="py-3 text-end">
                        <RuleEditor
                          ruleId={r.id}
                          form={r.form}
                          frequency={r.frequency}
                          due={r.due}
                          effectiveFrom={r.effective_from}
                          source={r.source}
                          verified={Boolean(r.verified_at)}
                          isEfps={r.channel === "efps"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        );
      })}
      {unverified > 0 && <p className="text-body-regular text-text-secondary">{unverified} rule(s) still to check against current BIR issuances.</p>}

      <Card title="Non-working days" actions={<span className="text-caption-1-regular text-text-tertiary">A due date on a weekend or one of these days moves to the next working day.</span>}>
        <ul className="divide-y divide-separator-border text-body-regular">
          {(holidays ?? []).map((h) => (
            <li key={h.date} className="flex items-center justify-between gap-4 py-2">
              <span className="w-32 shrink-0 tabular-nums text-text-primary">{fmtDate(h.date)}</span>
              <span className="flex-1 text-text-primary">{h.name}</span>
              <span className="hidden w-40 text-text-secondary sm:block">{kindLabel[h.kind] ?? h.kind}</span>
              <span className="hidden w-28 text-caption-1-regular text-text-tertiary sm:block">{h.source === "UNVERIFIED" ? "Unverified" : h.source}</span>
              <RemoveHolidayButton date={h.date} />
            </li>
          ))}
        </ul>
        <div className="mt-4"><HolidayForm /></div>
      </Card>
    </div>
  );
}

/** Bank and e-wallet accounts shown under "Pay now" on statements, with their QR codes. */
async function PaymentSettings() {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const [{ data: accounts }, { data: brand }] = await Promise.all([
    supabase.from("brand_payment_accounts").select("id, kind, institution, account_name, account_number, purpose, instructions, qr_path, active").eq("brand_id", owner.staff.brandId).order("sort_order").order("institution").order("id"),
    supabase.from("brands").select("soa_payment_days").eq("id", owner.staff.brandId).single(),
  ]);
  const rows = accounts ?? [];
  const paths = rows.map((a) => a.qr_path).filter((p): p is string => Boolean(p));
  const signed = new Map<string, string>();
  if (paths.length) {
    const { data } = await supabase.storage.from("payment-qr").createSignedUrls(paths, 600);
    for (const s of data ?? []) if (s.path && s.signedUrl) signed.set(s.path, s.signedUrl);
  }
  return (
    <Card title="Where Clients Pay" actions={<span className="text-caption-1-regular text-text-tertiary">Clients choose one under Billing, in this order, and see only its QR</span>}>
      {rows.length === 0 ? (
        <p className="mb-4 text-body-regular text-text-secondary">No payment channels yet. Add the banks and e-wallets clients pay into, with their QR codes.</p>
      ) : (
        <ul className="mb-4 divide-y divide-separator-border">
          {rows.map((a, i) => (
            <li key={a.id} className="flex flex-wrap items-center gap-4 py-3">
              <MoveAccountButtons accountId={a.id} first={i === 0} last={i === rows.length - 1} label={a.institution} />
              {a.qr_path && signed.get(a.qr_path) ? (
                // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from storage
                <img src={signed.get(a.qr_path)} alt={`QR code for ${a.institution}`} className="size-16 rounded-lg border border-separator-border bg-white object-contain p-1" />
              ) : (
                <div className="grid size-16 place-items-center rounded-lg border border-dashed border-border-button-default text-center text-caption-2-regular text-text-tertiary">No QR</div>
              )}
              <div className="min-w-0 flex-1 basis-48 text-body-regular">
                <p className="font-medium text-text-primary">
                  {a.institution} <span className="font-normal text-text-tertiary">· {a.kind === "bank" ? "Bank" : "E-wallet"}</span>
                </p>
                <p className="text-text-primary">{a.account_name} · <span className="tabular-nums">{a.account_number}</span></p>
                {a.instructions && <p className="text-caption-1-regular text-text-secondary">{a.instructions}</p>}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {a.purpose === "client_tax_funds" ? <Badge tone="progress">Client tax payments</Badge> : <Badge tone="neutral">Our fees</Badge>}
                {!a.active && <Badge tone="neutral">Hidden</Badge>}
                <ReplaceQrForm accountId={a.id} oldPath={a.qr_path} />
                <ToggleAccountButton accountId={a.id} active={a.active} />
              </div>
              <EditPaymentAccountForm accountId={a.id} values={{ kind: a.kind, institution: a.institution, account_name: a.account_name, account_number: a.account_number, purpose: a.purpose, instructions: a.instructions }} />
            </li>
          ))}
        </ul>
      )}
      <AddPaymentAccountForm />
      <div className="mt-6 border-t border-separator-border pt-5">
        <PaymentDaysForm days={brand?.soa_payment_days ?? 5} />
      </div>
    </Card>
  );
}
