import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { describeDue, FREQUENCY_SECTIONS, taxTypeOfForm } from "@/lib/deadlines/describe";
import type { DueRule, Frequency } from "@/lib/deadlines/engine";
import { supabaseServer } from "@/lib/supabase/server";
import { HolidayForm, RemoveHolidayButton, RuleEditor } from "./forms";
import { AddPaymentAccountForm, PaymentDaysForm, ReplaceQrForm, ToggleAccountButton } from "./payment-forms";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Where clients pay, BIR deadline rules and non-working days. Rule changes move the due dates of filings not yet filed; filed ones keep their dates."
      />
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
          <Card key={section.frequency} title={section.title} actions={<span className="text-xs text-ink-subtle">{section.hint}</span>}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] text-sm">
                <thead className="text-left text-ink-subtle">
                  <tr>
                    <th scope="col" className="pb-2 font-medium">Form</th>
                    <th scope="col" className="pb-2 font-medium">Applies to</th>
                    <th scope="col" className="pb-2 font-medium">Deadline</th>
                    <th scope="col" className="pb-2 font-medium">Source</th>
                    <th scope="col" className="pb-2 font-medium"><span className="sr-only">Edit</span></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-border align-top">
                      <td className="py-3 pr-4">
                        <p className="font-medium text-ink-heading">{r.form}</p>
                        <p className="text-xs text-ink-subtle">{taxTypeOfForm(r.form)}{r.calendar_year ? " · calendar year" : ""}{periodNote[r.period_filter]}</p>
                      </td>
                      <td className="py-3 pr-4 text-ink-muted">{appliesTo(r)}</td>
                      <td className="py-3 pr-4 text-ink-heading">
                        {describeDue(r.due, r.frequency)}
                        <p className="text-xs text-ink-subtle">From periods ending {fmtDate(r.effective_from)}</p>
                      </td>
                      <td className="py-3 pr-4">
                        {r.verified_at ? <Badge tone="done">{r.source}</Badge> : <Badge tone="waiting">Unverified</Badge>}
                      </td>
                      <td className="py-3 text-right">
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
      {unverified > 0 && <p className="text-sm text-ink-muted">{unverified} rule(s) still to check against current BIR issuances.</p>}

      <Card title="Non-working days" actions={<span className="text-xs text-ink-subtle">A due date on a weekend or one of these days moves to the next working day.</span>}>
        <ul className="divide-y divide-border text-sm">
          {(holidays ?? []).map((h) => (
            <li key={h.date} className="flex items-center justify-between gap-4 py-2">
              <span className="w-32 shrink-0 tabular-nums text-ink-heading">{fmtDate(h.date)}</span>
              <span className="flex-1 text-ink-heading">{h.name}</span>
              <span className="hidden w-40 text-ink-muted sm:block">{kindLabel[h.kind] ?? h.kind}</span>
              <span className="hidden w-28 text-xs text-ink-subtle sm:block">{h.source === "UNVERIFIED" ? "Unverified" : h.source}</span>
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
    supabase.from("brand_payment_accounts").select("id, kind, institution, account_name, account_number, purpose, instructions, qr_path, active").eq("brand_id", owner.staff.brandId).order("active", { ascending: false }).order("sort_order").order("institution"),
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
    <Card title="Where Clients Pay" actions={<span className="text-xs text-ink-subtle">Shown on every statement under Pay Now</span>}>
      {rows.length === 0 ? (
        <p className="mb-4 text-sm text-ink-muted">No accounts yet. Add the banks and e-wallets clients pay into, with their QR codes.</p>
      ) : (
        <ul className="mb-4 divide-y divide-border">
          {rows.map((a) => (
            <li key={a.id} className={`flex flex-wrap items-center gap-4 py-3 ${a.active ? "" : "opacity-60"}`}>
              {a.qr_path && signed.get(a.qr_path) ? (
                // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from storage
                <img src={signed.get(a.qr_path)} alt={`QR code for ${a.institution}`} className="size-16 rounded-lg border border-border bg-white object-contain p-1" />
              ) : (
                <div className="grid size-16 place-items-center rounded-lg border border-dashed border-border-strong text-center text-[10px] text-ink-subtle">No QR</div>
              )}
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-medium text-ink-heading">
                  {a.institution} <span className="font-normal text-ink-subtle">· {a.kind === "bank" ? "Bank" : "E-wallet"}</span>
                </p>
                <p className="text-ink-strong">{a.account_name} · <span className="tabular-nums">{a.account_number}</span></p>
                {a.instructions && <p className="text-xs text-ink-muted">{a.instructions}</p>}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {a.purpose === "client_tax_funds" ? <Badge tone="progress">Client tax payments</Badge> : <Badge tone="neutral">Our fees</Badge>}
                {!a.active && <Badge tone="neutral">Hidden</Badge>}
                <ReplaceQrForm accountId={a.id} oldPath={a.qr_path} />
                <ToggleAccountButton accountId={a.id} active={a.active} />
              </div>
            </li>
          ))}
        </ul>
      )}
      <AddPaymentAccountForm />
      <div className="mt-6 border-t border-border pt-5">
        <PaymentDaysForm days={brand?.soa_payment_days ?? 5} />
      </div>
    </Card>
  );
}
