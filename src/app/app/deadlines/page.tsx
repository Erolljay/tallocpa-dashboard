import { Notice, PageHeader } from "@/components/ui";
import { generateFilingInstances, type Obligation } from "@/lib/deadlines/engine";
import { seedDeadlineRules, seedHolidays2027 } from "@/lib/deadlines/seed";

// Sample calendar until filing instances are generated from real obligations (next release).
const sample: Obligation[] = (
  [
    ["0619-E", "monthly"], ["1601-C", "monthly"], ["1601-EQ", "quarterly"], ["2550Q", "quarterly"],
    ["1702Q", "quarterly"], ["1702-RT", "annual"], ["1604-C", "annual"], ["1604-E", "annual"],
  ] as const
).map(([form, frequency]) => ({ clientId: "sample", form, frequency, startDate: "2020-01-01", channel: "ebirforms", fiscalYearEndMonth: 12 }));

const holidays = new Set(seedHolidays2027.map((h) => h.date));
const { instances } = generateFilingInstances(sample, seedDeadlineRules, holidays, "2027-01-01", "2027-06-30");
const fmt = new Intl.DateTimeFormat("en-PH", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
const show = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`));

export default function DeadlinesPage() {
  return (
    <>
      <PageHeader
        title="Deadlines"
        description="Sample calendar for a VAT corporation with employees, January–June 2027. Client deadlines replace this in the next release."
      />
      <Notice>
        Deadline rules and 2027 holidays are starting figures and have not been checked against current BIR issuances. Do not rely on
        these dates until they are verified.
      </Notice>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
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
                <td className="px-4 py-3 text-ink-subtle">{i.dueDate !== i.statutoryDueDate ? `Moved from ${show(i.statutoryDueDate)}` : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
