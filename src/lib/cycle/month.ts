/**
 * "I've sent everything for <month>" in the client portal (docs/UX-REVIEW.md,
 * recommendation 14; P1): the missing sales invoice numbers grouped into ranges
 * the client can answer, and a plain-language "what happens next" timeline with
 * dates from the deadline steps (src/lib/deadlines/safeguards.ts). Pure.
 */
import { stepsFor, workingDaysBefore } from "@/lib/deadlines/safeguards";
import type { IsoDate } from "@/lib/deadlines/dates";
import { showDate } from "@/lib/filings/labels";

/** One missing number, as month_check() returns it. */
export interface MissingNumber {
  prefix: string;
  num: number;
  width: number;
}

/** Consecutive missing numbers of one series: "SI 0450 to SI 0452". */
export interface MissingRange {
  key: string;
  prefix: string;
  label: string;
  numbers: MissingNumber[];
}

export const invoiceLabel = (n: MissingNumber) => `${n.prefix ? `${n.prefix} ` : ""}${String(n.num).padStart(n.width, "0")}`;

export function missingRanges(missing: MissingNumber[]): MissingRange[] {
  const sorted = [...missing].sort((a, b) => a.prefix.localeCompare(b.prefix) || a.num - b.num);
  const out: MissingRange[] = [];
  for (const n of sorted) {
    const last = out.at(-1);
    const prev = last?.numbers.at(-1);
    if (last && prev && prev.prefix === n.prefix && prev.num + 1 === n.num) last.numbers.push(n);
    else out.push({ key: "", prefix: n.prefix, label: "", numbers: [n] });
  }
  for (const r of out) {
    const first = r.numbers[0];
    const end = r.numbers[r.numbers.length - 1];
    r.key = `${r.prefix}-${first.num}`;
    r.label = r.numbers.length === 1 ? invoiceLabel(first) : `${invoiceLabel(first)} to ${invoiceLabel(end)}`;
  }
  return out;
}

/** What a return is, in the client's words. */
const PLAIN: Record<string, string> = {
  "1601-C": "withholding tax on wages (1601-C)",
  "0619-E": "expanded withholding tax (0619-E)",
  "0619-F": "final withholding tax (0619-F)",
  "1601-EQ": "quarterly expanded withholding tax (1601-EQ)",
  "1601-FQ": "quarterly final withholding tax (1601-FQ)",
  "2550M": "monthly VAT return (2550M)",
  "2550Q": "quarterly VAT return (2550Q)",
  "2551Q": "percentage tax return (2551Q)",
  "1701Q": "quarterly income tax return (1701Q)",
  "1702Q": "quarterly income tax return (1702Q)",
  "1701": "annual income tax return (1701)",
  "1701A": "annual income tax return (1701A)",
  "1702-RT": "annual income tax return (1702-RT)",
  "1604-C": "annual information return on wages (1604-C)",
  "1604-E": "annual information return (1604-E)",
};
export const plainForm = (form: string) => PLAIN[form] ?? `${form} return`;

export interface TimelineFiling {
  form: string;
  periodLabel: string;
  periodStart: IsoDate;
  periodEnd: IsoDate;
  dueDate: IsoDate;
  status: string;
}

export interface TimelineItem {
  date: IsoDate;
  title: string;
  detail?: string;
  done: boolean;
}

/**
 * The next steps after the client's documents are in: we finish checking them
 * (the working day after the cutoff), then for each return covering the month,
 * when it is ready for the client's approval and when we file it.
 */
export function monthTimeline(opts: {
  cutoff: IsoDate;
  confirmedOn: IsoDate | null;
  cutoffDay: number;
  filings: TimelineFiling[];
  holidays: ReadonlySet<IsoDate>;
}): TimelineItem[] {
  const items: TimelineItem[] = [
    opts.confirmedOn
      ? { date: opts.confirmedOn, title: "You sent everything", done: true }
      : { date: opts.cutoff, title: "You confirm the month is complete", detail: "By the cutoff at the latest.", done: false },
    { date: workingDaysBefore(opts.cutoff, -1, opts.holidays), title: "We finish checking your documents", detail: "If something needs fixing we'll ask you under Requests.", done: false },
  ];
  const AFTER_APPROVAL = ["client_approved", "owner_approved", "filed", "paid", "proof_uploaded"];
  const FILED = ["filed", "paid", "proof_uploaded"];
  for (const f of [...opts.filings].sort((a, b) => a.dueDate.localeCompare(b.dueDate))) {
    const steps = stepsFor({ dueDate: f.dueDate, periodStart: f.periodStart, periodEnd: f.periodEnd, cutoffDay: opts.cutoffDay, holidays: opts.holidays });
    const at = (key: string) => steps.find((s) => s.key === key)!.target;
    items.push({
      date: at("client_approved"),
      title: `Your ${f.periodLabel} ${plainForm(f.form)} is ready for your approval`,
      detail: "You approve it here in the portal, under Returns.",
      done: AFTER_APPROVAL.includes(f.status),
    });
    items.push({ date: at("filed"), title: `We file and pay your ${f.form}`, detail: `The BIR deadline is ${showDate(f.dueDate)}.`, done: FILED.includes(f.status) });
  }
  return items.sort((a, b) => a.date.localeCompare(b.date));
}
