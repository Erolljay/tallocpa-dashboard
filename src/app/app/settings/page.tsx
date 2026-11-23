import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { describeDue, FREQUENCY_SECTIONS, taxTypeOfForm } from "@/lib/deadlines/describe";
import type { DueRule, Frequency } from "@/lib/deadlines/engine";
import { supabaseServer } from "@/lib/supabase/server";
import { HolidayForm, RemoveHolidayButton, RuleEditor } from "./forms";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="BIR deadline rules and non-working days. Changes move the due dates of filings not yet filed; filed ones keep their dates."
      />
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
  effective_from: string;
  source: string;
  verified_at: string | null;
}

const fmtDate = (d: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
const kindLabel: Record<string, string> = { regular: "Regular", special: "Special non-working", suspension: "Work suspension" };

function appliesTo(r: Rule) {
  if (r.channel === "efps") return `eFPS · Group ${r.efps_group}`;
  if (r.channel === "ebirforms") return "eBIRForms";
  return "All filers";
}

async function DeadlineSettings() {
  await requireOwner();
  const supabase = await supabaseServer();
  const [{ data: rules }, { data: holidays }] = await Promise.all([
    supabase.from("deadline_rules").select("id, form, frequency, due, channel, efps_group, calendar_year, effective_from, source, verified_at").is("effective_to", null).order("form").order("channel", { nullsFirst: true }).order("efps_group", { nullsFirst: true }),
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
                        <p className="text-xs text-ink-subtle">{taxTypeOfForm(r.form)}{r.calendar_year ? " · calendar year" : ""}</p>
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
