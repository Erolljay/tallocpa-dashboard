/**
 * The year-end checklist of one client and taxable year (docs/REWORK.md, decision 23):
 *
 *   Close the books     every month locked, suggested entries confirmed, adjustments,
 *                       bank reconciliation, trial balance in balance, the closing entry
 *                       (the Owner's, once the rest is done);
 *   Annual payroll      13th month, annualization, the 2316s released (final);
 *   Annual returns      1604-C and 1604-E (with eSubmission), the annual income tax
 *                       return, inventory list, loose-leaf binding, AFS;
 *   Client's decisions  missing 2307s: keep claiming or stop.
 *
 * Built from what the page loads; the app sees most steps for itself, the rest are ticked
 * (year_end_checks).
 */
import type { Centavos } from "@/lib/returns/types";

export type CheckItem = "adjustments" | "bank_reconciliation" | "thirteenth_month" | "annualization" | "inventory_list" | "loose_leaf" | "afs";

export const CHECK_ITEMS: Record<CheckItem, string> = {
  adjustments: "Year-end adjustments (depreciation, accruals, prepayments) entered",
  bank_reconciliation: "Bank accounts reconciled to the December statements",
  thirteenth_month: "13th month pay and other benefits paid and in the payroll",
  annualization: "Withholding on compensation annualized in the last payroll",
  inventory_list: "Inventory list prepared (and submitted, when required)",
  loose_leaf: "Loose-leaf books printed and bound for the year",
  afs: "Audited or certified financial statements done",
};

export type StepState = "done" | "waiting" | "blocked" | "not_needed";

export interface Step {
  key: string;
  label: string;
  state: StepState;
  detail?: string;
  href?: string;
  /** A step staff tick by hand. */
  tick?: CheckItem;
}

export interface Group {
  title: string;
  steps: Step[];
}

export interface AnnualFiling {
  id: string;
  form: string;
  periodLabel: string;
  dueDate: string;
  status: string;
  esubmissionRequired: boolean;
  /** The current eSubmission's status, if sent. */
  esubmission: "sent" | "validated" | "errors" | null;
}

export interface YearEndInput {
  clientId: string;
  yearEnd: string;
  today: string;
  hasBooks: boolean;
  /** Months of the year still open, as "January 2026"; empty when all are locked. */
  openMonths: string[];
  suggestedEntries: number;
  /** Debit less credit of the trial balance at the year end (0 when it balances). */
  trialBalanceDifference: Centavos;
  closedAt: string | null;
  ticks: Partial<Record<CheckItem, { doneAt: string; note: string | null }>>;
  payroll: boolean;
  /** The calendar year of the 2316s (the year of the year end). */
  released2316: boolean;
  inventory: boolean;
  looseLeaf: boolean;
  filings: AnnualFiling[];
  missing2307: { undecided: number; total: number };
}

const INCOME_TAX = new Set(["1700", "1701", "1701A", "1702-RT", "1702-EX", "1702-MX"]);

const filingState = (f: AnnualFiling): StepState => {
  if (f.status !== "filed") return "waiting";
  if (f.esubmissionRequired && f.esubmission !== "validated") return f.esubmission === "errors" ? "blocked" : "waiting";
  return "done";
};

const STATUS_WORDS: Record<string, string> = {
  not_started: "Not started",
  prepared: "Prepared",
  reviewed: "Reviewed",
  client_approved: "Client approved",
  owner_approved: "Owner approved",
  filed: "Filed & paid",
};

function filingDetail(f: AnnualFiling): string {
  const parts = [`${STATUS_WORDS[f.status] ?? f.status} · due ${f.dueDate}`];
  if (f.status === "filed" && f.esubmissionRequired) {
    parts.push(f.esubmission === "validated" ? "validation report in" : f.esubmission === "errors" ? "eSubmission came back with errors: fix and resend" : f.esubmission === "sent" ? "eSubmission sent, waiting for the BIR's reply" : "eSubmission not sent yet");
  }
  return parts.join(" · ");
}

export function yearEndChecklist(input: YearEndInput): Group[] {
  const c = `/app/clients/${input.clientId}`;
  const year = input.yearEnd.slice(0, 4);
  const ticked = (item: CheckItem, extra: Partial<Step> = {}): Step => {
    const t = input.ticks[item];
    return { key: item, label: CHECK_ITEMS[item], state: t ? "done" : "waiting", detail: t?.note ?? undefined, tick: item, ...extra };
  };

  const books: Step[] = input.hasBooks
    ? [
        {
          key: "locked",
          label: "Every month of the year locked by the reviewer",
          state: input.openMonths.length ? "waiting" : "done",
          detail: input.openMonths.length ? `Still open: ${input.openMonths.join(", ")}` : undefined,
          href: `${c}/books/months`,
        },
        {
          key: "suggested",
          label: "Suggested entries confirmed",
          state: input.suggestedEntries ? "waiting" : "done",
          detail: input.suggestedEntries ? `${input.suggestedEntries} waiting` : undefined,
          href: `${c}/books/tools`,
        },
        ticked("adjustments", { href: `${c}/books/journal/new` }),
        ticked("bank_reconciliation", { href: `${c}/books/bank-accounts` }),
        {
          key: "trial_balance",
          label: "Trial balance in balance",
          state: input.trialBalanceDifference === 0 ? "done" : "blocked",
          detail: input.trialBalanceDifference === 0 ? undefined : "Debits and credits differ; check the books.",
          href: `${c}/books/reports`,
        },
        {
          key: "closing",
          label: "Closing entry posted by the Owner",
          state: input.closedAt ? "done" : "waiting",
          detail: input.closedAt ? `Posted ${input.closedAt.slice(0, 10)}` : undefined,
        },
      ]
    : [{ key: "no_books", label: "Books kept by the app", state: "not_needed", detail: "This client has no Books here; close the year in its own books." }];

  const forms = (pred: (f: AnnualFiling) => boolean) => input.filings.filter(pred);
  const filingSteps = (list: AnnualFiling[]): Step[] =>
    list.map((f) => ({ key: `filing-${f.id}`, label: `${f.form} · ${f.periodLabel}`, state: filingState(f), detail: filingDetail(f), href: `/app/filings/${f.id}` }));

  const payroll: Step[] = input.payroll
    ? [
        ticked("thirteenth_month", { href: `${c}/payroll` }),
        ticked("annualization", { href: `${c}/payroll` }),
        {
          key: "2316",
          label: `BIR 2316 for ${year} released to the client (final once the year is locked)`,
          state: input.released2316 ? "done" : "waiting",
          href: `${c}/payroll/year/${year}`,
        },
      ]
    : [{ key: "no_payroll", label: "Annual payroll", state: "not_needed", detail: "No withholding on compensation registered." }];

  const withholding = forms((f) => f.form === "1604-C" || f.form === "1604-E");
  const income = forms((f) => INCOME_TAX.has(f.form));
  const other = forms((f) => !INCOME_TAX.has(f.form) && f.form !== "1604-C" && f.form !== "1604-E");
  const returns: Step[] = [
    ...filingSteps(withholding),
    ...filingSteps(income),
    ...filingSteps(other),
    ...(input.inventory ? [ticked("inventory_list")] : []),
    ...(input.looseLeaf ? [ticked("loose_leaf", { href: `${c}/books/print` })] : []),
    ticked("afs", { href: `${c}/books/reports/statements` }),
  ];
  if (!withholding.length && !income.length && !other.length) {
    returns.unshift({ key: "no_returns", label: "Annual returns", state: "not_needed", detail: "No annual return of this year is on the calendar." });
  }

  const m = input.missing2307;
  const decisions: Step[] = [
    m.total === 0
      ? { key: "missing_2307", label: "Missing 2307s", state: "not_needed", detail: "Every CWT of the year has its 2307." }
      : {
          key: "missing_2307",
          label: "Missing 2307s: keep claiming or stop (the client decides on the portal)",
          state: m.undecided ? "waiting" : "done",
          detail: m.undecided ? `${m.undecided} of ${m.total} waiting for the client` : `${m.total} decided`,
        },
  ];

  return [
    { title: "Close the books", steps: books },
    { title: "Annual payroll", steps: payroll },
    { title: "Annual returns", steps: returns },
    { title: "Client's decisions", steps: decisions },
  ];
}

/** Ready for the Owner's closing entry: books kept here, every month locked, nothing suggested, the trial balance in balance, not yet closed. */
export function readyToClose(input: Pick<YearEndInput, "hasBooks" | "openMonths" | "suggestedEntries" | "trialBalanceDifference" | "closedAt" | "today" | "yearEnd">): { ready: boolean; why: string | null } {
  if (!input.hasBooks) return { ready: false, why: "No Books here." };
  if (input.closedAt) return { ready: false, why: null };
  if (input.yearEnd >= input.today) return { ready: false, why: "The year has not ended yet." };
  if (input.openMonths.length) return { ready: false, why: "Lock every month of the year first." };
  if (input.suggestedEntries) return { ready: false, why: "Confirm or remove the suggested entries first." };
  if (input.trialBalanceDifference !== 0) return { ready: false, why: "The trial balance does not balance." };
  return { ready: true, why: null };
}

/** Counts done steps (not counting those not needed). */
export function progress(groups: Group[]): { done: number; total: number } {
  const steps = groups.flatMap((g) => g.steps).filter((s) => s.state !== "not_needed");
  return { done: steps.filter((s) => s.state === "done").length, total: steps.length };
}

/** The last day of each taxable year ending in `fyeMonth`, from the year of `from` to the year ending on or after `today`, newest first. */
export function taxableYearEnds(fyeMonth: number, from: string, today: string): string[] {
  const out: string[] = [];
  const end = (y: number) => new Date(Date.UTC(y, fyeMonth, 0)).toISOString().slice(0, 10);
  let y = Number(today.slice(0, 4)) + 1;
  while (end(y - 1) >= today) y--;
  // `y` is now the year whose end is the first on or after today.
  for (let yy = y; end(yy) >= from.slice(0, 10) || yy === y; yy--) {
    out.push(end(yy));
    if (out.length > 12) break;
  }
  return out;
}
