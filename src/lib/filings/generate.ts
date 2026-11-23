/**
 * Turns obligations into dated filing instances (spec §3.3): the nightly job and the
 * Owner's "Generate now" button both use this.
 */
import { addDays, type IsoDate } from "@/lib/deadlines/dates";
import {
  generateFilingInstances,
  type DeadlineRule,
  type DueRule,
  type EfpsGroup,
  type FilingChannel,
  type Frequency,
  type PeriodFilter,
} from "@/lib/deadlines/engine";

export interface ObligationRow {
  id: string;
  client_id: string;
  form: string;
  frequency: Frequency;
  start_date: IsoDate;
  end_date: IsoDate | null;
}

export interface ClientRow {
  id: string;
  status: string;
  fiscal_year_end_month: number;
  filing_channel: FilingChannel;
  efps_group: EfpsGroup | null;
}

export interface RuleRow {
  id: string;
  form: string;
  frequency: Frequency;
  period_filter: PeriodFilter;
  due: DueRule;
  channel: FilingChannel | null;
  efps_group: EfpsGroup | null;
  effective_from: IsoDate;
  effective_to: IsoDate | null;
  calendar_year: boolean;
}

export interface FilingRow {
  obligation_id: string;
  client_id: string;
  form: string;
  period_label: string;
  period_start: IsoDate;
  period_end: IsoDate;
  rule_id: string;
  statutory_due_date: IsoDate;
  due_date: IsoDate;
}

export interface MissingRule {
  obligationId: string;
  clientId: string;
  form: string;
  period: string;
}

/** Days before today and after today that the job covers. */
export const WINDOW = { back: 60, ahead: 120 };

export function toDeadlineRule(r: RuleRow): DeadlineRule {
  return {
    id: r.id,
    form: r.form,
    frequency: r.frequency,
    periodFilter: r.period_filter,
    due: r.due,
    channel: r.channel ?? undefined,
    efpsGroup: r.efps_group ?? undefined,
    effectiveFrom: r.effective_from,
    effectiveTo: r.effective_to ?? undefined,
    calendarYear: r.calendar_year,
  };
}

const ACTIVE = new Set(["onboarding", "active"]);

export function buildFilingRows(input: {
  obligations: readonly ObligationRow[];
  clients: readonly ClientRow[];
  rules: readonly RuleRow[];
  holidays: readonly IsoDate[];
  today: IsoDate;
}): { rows: FilingRow[]; missing: MissingRule[] } {
  const clients = new Map(input.clients.map((c) => [c.id, c]));
  const rules = input.rules.map(toDeadlineRule);
  const holidays = new Set(input.holidays);
  const from = addDays(input.today, -WINDOW.back);
  const to = addDays(input.today, WINDOW.ahead);
  const rows: FilingRow[] = [];
  const missing: MissingRule[] = [];

  for (const ob of input.obligations) {
    const client = clients.get(ob.client_id);
    if (!client || !ACTIVE.has(client.status)) continue;
    const result = generateFilingInstances(
      [
        {
          clientId: ob.client_id,
          form: ob.form,
          frequency: ob.frequency,
          startDate: ob.start_date,
          endDate: ob.end_date ?? undefined,
          channel: client.filing_channel,
          efpsGroup: client.efps_group ?? undefined,
          fiscalYearEndMonth: client.fiscal_year_end_month,
        },
      ],
      rules,
      holidays,
      from,
      to,
    );
    for (const i of result.instances) {
      rows.push({
        obligation_id: ob.id,
        client_id: ob.client_id,
        form: ob.form,
        period_label: i.period.label,
        period_start: i.period.start,
        period_end: i.period.end,
        rule_id: i.ruleId,
        statutory_due_date: i.statutoryDueDate,
        due_date: i.dueDate,
      });
    }
    for (const m of result.missingRules) {
      missing.push({ obligationId: ob.id, clientId: ob.client_id, form: ob.form, period: m.period.label });
    }
  }
  return { rows, missing };
}
