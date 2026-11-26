import type { ProposalJob, ProposalQuote } from "@/lib/fees/proposal";
import { notIncludedName, type QuoteLine } from "@/lib/fees/quote";
import { auditNote } from "@/lib/fees/template";
import { SERVICE_LABELS } from "@/lib/funnel/terms";
import { cx } from "@/utils/cx";

/**
 * A proposal's quote as stored. Since 26 Nov 2026 it is a ProposalQuote: monthly
 * retainer, catch-up, annual jobs and ad hoc jobs, each in its own section, with no
 * grand total. Proposals made before then keep their annual package and first-year
 * total, and are shown as they were accepted.
 */
type StoredQuote = Partial<ProposalQuote> &
  Pick<ProposalQuote, "monthly" | "monthlyRetainer" | "minimumTopUp" | "tax" | "ewtNote"> & {
    annual?: QuoteLine[];
    annualTotal?: number;
    oneTime?: QuoteLine[];
    oneTimeTotal?: number;
    firstYearTotal?: number;
  };

export interface ProposalData {
  status: "sent" | "accepted" | "withdrawn";
  quote: StoredQuote;
  terms: string;
  valid_until: string;
  created_at: string;
  accepted_at: string | null;
  accepted_name: string | null;
  accepted_position: string | null;
  lead: { business_name: string; contact_name: string; email: string; services: string[]; taxpayer_type: string };
  brand: { display_name: string; legal_name: string; tin: string | null };
}

const php = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
const money = (n: number | null) => (n == null ? "To be confirmed" : php.format(n));
const longDate = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "Asia/Manila" }).format(new Date(iso.length === 10 ? `${iso}T00:00:00+08:00` : iso));

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-headline-medium text-text-primary">{title}</h3>
      {hint && <p className="text-body-regular text-text-secondary">{hint}</p>}
      {children}
    </section>
  );
}

function Rows({ rows, total }: { rows: { key: string; name: React.ReactNode; amount: React.ReactNode }[]; total?: { label: string; value: number } }) {
  return (
    <table className="w-full text-body-regular">
      <tbody>
        {rows.map((r) => (
          <tr key={r.key} className="border-t border-separator-border align-top">
            <td className="py-1.5 pe-3 text-text-primary">{r.name}</td>
            <td className="py-1.5 text-end tabular-nums text-text-primary">{r.amount}</td>
          </tr>
        ))}
        {total && (
          <tr className="border-t border-separator-border">
            <td className="py-1.5 pe-3 text-body-medium text-text-primary">{total.label}</td>
            <td className="py-1.5 text-end text-body-medium tabular-nums text-text-primary">{php.format(total.value)}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

const lineName = (l: QuoteLine) => (
  <>
    {l.label}
    {l.band ? <span className="text-text-tertiary"> · {l.band}</span> : null}
    {l.quantity > 1 ? <span className="text-text-tertiary"> × {l.quantity}</span> : null}
  </>
);

const jobName = (j: ProposalJob) => (
  <>
    {j.label}
    {j.band ? <span className="text-text-tertiary"> · {j.band}</span> : null}
    <span className="block text-caption-1-regular text-text-tertiary">{j.billed.charAt(0).toUpperCase() + j.billed.slice(1)}{j.note ? ` · ${j.note}` : ""}</span>
  </>
);

/** A proposal as the prospect sees it (public link) and as the Owner sees it (lead page). */
export function ProposalView({ p }: { p: ProposalData }) {
  const q = p.quote;
  const agreed = q.agreedMonthly != null;
  const catchUp = q.catchUp;
  const annualJobs = q.annualJobs ?? [];
  const adHocJobs = q.adHocJobs ?? [];
  const notIncluded = q.notIncluded ?? [];
  return (
    <article className="space-y-6 rounded-3xl border border-border-button-default bg-background-primary-default p-6 print:border-0 print:p-0">
      <header className="space-y-1">
        <p className="text-caption-1-medium text-text-tertiary">Proposal · {longDate(p.created_at)}</p>
        <h1 className="text-title-1-medium text-text-primary">{p.lead.business_name}</h1>
        <p className="text-body-regular text-text-secondary">
          For {p.lead.contact_name}, from {p.brand.legal_name}{p.brand.tin ? ` (TIN ${p.brand.tin})` : ""}. Valid until {longDate(p.valid_until)}.
        </p>
        <p className="text-body-regular text-text-secondary">Services: {(p.lead.services.length ? p.lead.services : ["tax_compliance"]).map((s) => SERVICE_LABELS[s] ?? s).join(", ")}</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-background-secondary-default p-4">
          <p className="text-caption-1-regular text-text-tertiary">Monthly retainer</p>
          <p className="text-title-2-medium tabular-nums text-text-primary">{php.format(q.monthlyRetainer)}</p>
        </div>
        {q.firstYearTotal !== undefined ? (
          <div className="rounded-2xl bg-background-secondary-default p-4">
            <p className="text-caption-1-regular text-text-tertiary">First year, all in</p>
            <p className="text-title-2-medium tabular-nums text-text-primary">{php.format(q.firstYearTotal)}</p>
          </div>
        ) : catchUp && catchUp.amount != null ? (
          <div className="rounded-2xl bg-background-secondary-default p-4">
            <p className="text-caption-1-regular text-text-tertiary">Catch-up, one time</p>
            <p className="text-title-2-medium tabular-nums text-text-primary">{php.format(catchUp.amount)}</p>
          </div>
        ) : null}
      </div>

      <Section title="Monthly retainer" hint={agreed ? "The work each month. The retainer is agreed for your business." : "The work each month."}>
        <Rows
          rows={q.monthly.map((l) => ({ key: l.code, name: lineName(l), amount: agreed ? "" : money(l.amount) }))}
          total={{ label: "Monthly retainer", value: q.monthlyRetainer }}
        />
        {q.minimumTopUp > 0 && !agreed && <p className="text-caption-1-regular text-text-secondary">Includes {php.format(q.minimumTopUp)} to reach the minimum monthly retainer.</p>}
        <div className="space-y-1 text-caption-1-regular text-text-secondary">
          <p>{q.tax.note}</p>
          <p>{q.ewtNote}</p>
        </div>
      </Section>

      {catchUp && (
        <Section title="Catch-up (one time)" hint="The months of books and returns behind, billed once.">
          <Rows
            rows={[{
              key: "catch_up",
              name: catchUp.perMonth != null ? `${catchUp.months} month${catchUp.months === 1 ? "" : "s"} behind × ${php.format(catchUp.perMonth)}` : `${catchUp.months} month${catchUp.months === 1 ? "" : "s"} behind`,
              amount: money(catchUp.amount),
            }]}
          />
        </Section>
      )}

      {annualJobs.length > 0 && (
        <Section title="Annual jobs" hint="Once a year, billed in the month shown.">
          <Rows rows={annualJobs.map((j) => ({ key: j.code, name: jobName(j), amount: php.format(j.amount) }))} />
        </Section>
      )}

      {adHocJobs.length > 0 && (
        <Section title="Ad hoc jobs" hint="Each billed when done.">
          <Rows rows={adHocJobs.map((j) => ({ key: j.code, name: jobName(j), amount: php.format(j.amount) }))} />
        </Section>
      )}

      {q.audit && (
        <section className="space-y-2 rounded-2xl border border-separator-border p-4">
          <h3 className="text-headline-medium text-text-primary">Audit (separate engagement)</h3>
          <p className="text-body-regular text-text-secondary">{auditNote(p.brand.legal_name)}</p>
          <Rows rows={[{ key: q.audit.code, name: jobName(q.audit), amount: <>{php.format(q.audit.amount)}<span className="block text-caption-1-regular text-text-tertiary">For information</span></> }]} />
          {q.annualSales != null && <p className="text-caption-1-regular text-text-tertiary">From annual gross sales of {php.format(q.annualSales)}.</p>}
        </section>
      )}

      {/* Proposals made before 26 Nov 2026 */}
      {(q.annual ?? []).length > 0 && (
        <Section title="Once a year">
          <Rows rows={(q.annual ?? []).map((l) => ({ key: l.code, name: lineName(l), amount: money(l.amount) }))} total={{ label: "Total", value: q.annualTotal ?? 0 }} />
        </Section>
      )}
      {(q.oneTime ?? []).length > 0 && (
        <Section title="One time">
          <Rows rows={(q.oneTime ?? []).map((l) => ({ key: l.code, name: lineName(l), amount: money(l.amount) }))} total={{ label: "Total", value: q.oneTimeTotal ?? 0 }} />
        </Section>
      )}

      {(q.customQuote ?? []).length > 0 && (
        <p className="text-body-regular text-text-secondary">Quoted separately: {(q.customQuote ?? []).map((c) => c.label).join(", ")}.</p>
      )}
      {notIncluded.length > 0 && (
        <p className="text-body-regular text-text-secondary">Not in this proposal, priced when you need them: {notIncluded.map(notIncludedName).join("; ")}.</p>
      )}

      <section className="space-y-2">
        <h3 className="text-headline-medium text-text-primary">Terms of engagement</h3>
        <div className="space-y-3 text-body-regular whitespace-pre-line text-text-primary">{p.terms}</div>
      </section>

      {p.status === "accepted" && p.accepted_at && (
        <p className={cx("rounded-2xl bg-background-secondary-default p-4 text-body-medium text-text-primary")}>
          Accepted online on {longDate(p.accepted_at)} by {p.accepted_name}{p.accepted_position ? `, ${p.accepted_position}` : ""}.
        </p>
      )}
    </article>
  );
}
