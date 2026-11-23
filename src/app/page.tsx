import { generateFilingInstances, type Obligation } from "@/lib/deadlines/engine";
import { seedDeadlineRules, seedHolidays2027 } from "@/lib/deadlines/seed";

// Preview of the deadline engine for a sample VAT corporation with employees,
// until the database and sign-in are connected.
const sample: Obligation[] = [
  ["0619-E", "monthly"],
  ["1601-C", "monthly"],
  ["1601-EQ", "quarterly"],
  ["2550Q", "quarterly"],
  ["1702Q", "quarterly"],
  ["1702-RT", "annual"],
  ["1604-C", "annual"],
  ["1604-E", "annual"],
].map(([form, frequency]) => ({
  clientId: "sample",
  form,
  frequency: frequency as Obligation["frequency"],
  startDate: "2020-01-01",
  channel: "ebirforms",
  fiscalYearEndMonth: 12,
}));

const holidays = new Set(seedHolidays2027.map((h) => h.date));
const { instances } = generateFilingInstances(sample, seedDeadlineRules, holidays, "2027-01-01", "2027-06-30");

const fmt = new Intl.DateTimeFormat("en-PH", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
const show = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`));

export default function Home() {
  return (
    <div className="flex-1">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <div aria-hidden className="grid size-10 place-items-center rounded-lg bg-brand-navy font-display text-lg font-bold text-white">
            T
          </div>
          <div>
            <p className="font-display text-xl font-semibold leading-7 text-ink-heading">Tallo CPA</p>
            <p className="text-[10px] uppercase tracking-[0.05em] text-ink-subtle">Clear Numbers. Clean Compliance.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-ink-heading">Filing calendar preview</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          January to June 2027 for a sample VAT corporation with employees, filing through eBIRForms. Due dates that land
          on a weekend or holiday move to the next working day.
        </p>

        <div role="note" className="mt-6 rounded-xl border border-border bg-warning-surface p-4 text-sm text-warning">
          Deadline rules and 2027 holidays are starting figures and have not been checked against current BIR issuances
          yet. Do not rely on these dates until they are verified.
        </div>

        <section className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead className="bg-surface-sunken text-left text-ink-strong">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Due</th>
                <th scope="col" className="px-4 py-3 font-medium">Form</th>
                <th scope="col" className="px-4 py-3 font-medium">Period</th>
                <th scope="col" className="px-4 py-3 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {instances.map((i) => (
                <tr key={`${i.form}-${i.period.label}`} className="border-t border-border">
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-ink-heading">{show(i.dueDate)}</td>
                  <td className="px-4 py-3 font-medium text-ink-heading">{i.form}</td>
                  <td className="px-4 py-3 tabular-nums text-ink-muted">{i.period.label}</td>
                  <td className="px-4 py-3 text-ink-subtle">
                    {i.dueDate !== i.statutoryDueDate ? `Moved from ${show(i.statutoryDueDate)}` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
