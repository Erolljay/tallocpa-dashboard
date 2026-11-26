/**
 * Turns obligations into dated filing instances (spec §3.3): the nightly job and the
 * Owner's "Generate now" button both use this.
 */
import { addDays, type IsoDate } from "@/lib/deadlines/dates";
import { normalizeRdo } from "@/lib/deadlines/holiday-list";
import {
  formYearEndMonth,
  generateFilingInstances,
  nextWorkingDay,
  selectRule,
  statutoryDueDate,
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
  /** For local holidays: the client's RDO code. */
  rdo_code?: string | null;
}

/** A local holiday: its date and the RDO codes it covers (holidays.kind = 'local'). */
export interface LocalHoliday {
  date: IsoDate;
  rdo_codes: readonly string[];
}

/**
 * The non-working days for one client: the national ones, plus the local ones of its RDO
 * (Owner, 26 November 2026). Cached per RDO.
 */
function holidaysByClient(national: readonly IsoDate[], local: readonly LocalHoliday[] = []) {
  const base = new Set(national);
  const byRdo = new Map<string, Set<IsoDate>>();
  return (client: Pick<ClientRow, "rdo_code">): Set<IsoDate> => {
    const rdo = normalizeRdo(client.rdo_code);
    if (!rdo || local.length === 0) return base;
    let set = byRdo.get(rdo);
    if (!set) {
      set = new Set(base);
      for (const h of local) if (h.rdo_codes.some((c) => normalizeRdo(c) === rdo)) set.add(h.date);
      byRdo.set(rdo, set);
    }
    return set;
  };
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
  localHolidays?: readonly LocalHoliday[];
  today: IsoDate;
}): { rows: FilingRow[]; missing: MissingRule[] } {
  const clients = new Map(input.clients.map((c) => [c.id, c]));
  const rules = input.rules.map(toDeadlineRule);
  const holidaysOf = holidaysByClient(input.holidays, input.localHolidays);
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
      holidaysOf(client),
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

/** A filing not yet filed, as read for a due-date refresh. */
export interface OpenFilingRow {
  id: string;
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

export interface DueDateUpdate {
  id: string;
  rule_id: string;
  statutory_due_date: IsoDate;
  due_date: IsoDate;
}

/**
 * New due dates for filings not yet filed, after the Owner changes a deadline rule
 * or a holiday. Only the dates (and the rule used) change; the filing and its
 * sign-off progress stay. Filings whose period has no rule in force keep their dates.
 */
export function recomputeDueDates(input: {
  filings: readonly OpenFilingRow[];
  obligations: readonly Pick<ObligationRow, "id" | "frequency">[];
  clients: readonly ClientRow[];
  rules: readonly RuleRow[];
  holidays: readonly IsoDate[];
  localHolidays?: readonly LocalHoliday[];
}): DueDateUpdate[] {
  const frequencyOf = new Map(input.obligations.map((o) => [o.id, o.frequency]));
  const clients = new Map(input.clients.map((c) => [c.id, c]));
  const rules = input.rules.map(toDeadlineRule);
  const holidaysOf = holidaysByClient(input.holidays, input.localHolidays);
  const updates: DueDateUpdate[] = [];
  for (const f of input.filings) {
    const frequency = frequencyOf.get(f.obligation_id);
    const client = clients.get(f.client_id);
    if (!frequency || !client) continue;
    const period = { frequency, start: f.period_start, end: f.period_end, label: f.period_label };
    const yearEndMonth = formYearEndMonth(rules, f.form, frequency, client.fiscal_year_end_month);
    const rule = selectRule(rules, f.form, frequency, period, yearEndMonth, client.filing_channel, client.efps_group ?? undefined);
    if (!rule) continue;
    const statutory = statutoryDueDate(rule.due, f.period_end);
    const due = nextWorkingDay(statutory, holidaysOf(client));
    if (rule.id !== f.rule_id || statutory !== f.statutory_due_date || due !== f.due_date) {
      updates.push({ id: f.id, rule_id: rule.id, statutory_due_date: statutory, due_date: due });
    }
  }
  return updates;
}
