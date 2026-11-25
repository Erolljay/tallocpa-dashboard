import type { Quote, QuoteLine } from "@/lib/fees/quote";
import { SERVICE_LABELS } from "@/lib/funnel/terms";
import { cx } from "@/utils/cx";

export interface ProposalData {
  status: "sent" | "accepted" | "withdrawn";
  quote: Quote;
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

function Lines({ title, lines, total, per }: { title: string; lines: QuoteLine[]; total: number; per?: string }) {
  if (lines.length === 0) return null;
  return (
    <section className="space-y-2">
      <h3 className="text-headline-medium text-text-primary">{title}</h3>
      <table className="w-full text-body-regular">
        <tbody>
          {lines.map((l) => (
            <tr key={l.code} className="border-t border-separator-border">
              <td className="py-1.5 pe-3 text-text-primary">{l.label}{l.band ? <span className="text-text-tertiary"> · {l.band}</span> : null}{l.quantity > 1 ? <span className="text-text-tertiary"> × {l.quantity}</span> : null}</td>
              <td className="py-1.5 text-end tabular-nums">{money(l.amount)}</td>
            </tr>
          ))}
          <tr className="border-t border-separator-border">
            <td className="py-1.5 pe-3 text-body-medium">Total{per}</td>
            <td className="py-1.5 text-end text-body-medium tabular-nums">{php.format(total)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

/** A proposal as the prospect sees it (public link) and as the Owner sees it (lead page). */
export function ProposalView({ p }: { p: ProposalData }) {
  const q = p.quote;
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
        <div className="rounded-2xl bg-background-secondary-default p-4">
          <p className="text-caption-1-regular text-text-tertiary">First year, all in</p>
          <p className="text-title-2-medium tabular-nums text-text-primary">{php.format(q.firstYearTotal)}</p>
        </div>
      </div>

      <Lines title="Every month" lines={q.monthly} total={q.monthlyRetainer} per=" per month" />
      {q.minimumTopUp > 0 && <p className="text-caption-1-regular text-text-secondary">Includes {php.format(q.minimumTopUp)} to reach the minimum monthly retainer.</p>}
      <Lines title="Once a year" lines={q.annual} total={q.annualTotal} />
      <Lines title="One time" lines={q.oneTime} total={q.oneTimeTotal} />
      {q.customQuote.length > 0 && <p className="text-body-regular text-text-secondary">Quoted separately: {q.customQuote.map((c) => c.label).join(", ")}.</p>}
      <div className="space-y-1 text-caption-1-regular text-text-secondary">
        <p>{q.tax.note}</p>
        <p>{q.ewtNote}</p>
      </div>

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
