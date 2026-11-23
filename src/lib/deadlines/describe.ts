/**
 * Plain-language wording for deadline rules, and which tax type each form belongs
 * to, for the Owner's Settings page (spec §3.3).
 */
import type { DueRule, Frequency } from "./engine";

/** 1 → "1st", 22 → "22nd". */
export const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
};

const periodWord: Record<Frequency, string> = { monthly: "month", quarterly: "quarter", annual: "year" };

/** e.g. "10th of the following month", "15th of the 4th month after the year", "60 days after the quarter". */
export function describeDue(due: DueRule, frequency: Frequency): string {
  const period = periodWord[frequency];
  if (due.kind === "days_after") return `${due.days} days after the ${period} ends`;
  const day = due.day === "last" ? "Last day" : ordinal(due.day);
  const month = due.monthsAfter === 1 ? `the month after the ${period}` : `the ${ordinal(due.monthsAfter)} month after the ${period}`;
  if (due.monthsAfter === 1 && frequency === "monthly") return `${day} of the following month`;
  return `${day} of ${month}`;
}

/** The tax type a form belongs to, shown beside each rule on the Settings page. */
export const TAX_TYPE_GROUPS: { label: string; forms: string[] }[] = [
  { label: "Income tax", forms: ["1701Q", "1701", "1701A", "1702Q", "1702-RT"] },
  { label: "Value-added tax", forms: ["2550Q"] },
  { label: "Percentage tax", forms: ["2551Q"] },
  { label: "Withholding tax – compensation", forms: ["1601-C", "1604-C"] },
  { label: "Withholding tax – expanded", forms: ["0619-E", "1601-EQ", "1604-E"] },
];

export function taxTypeOfForm(form: string): string {
  return TAX_TYPE_GROUPS.find((g) => g.forms.includes(form))?.label ?? "Other";
}

/** Settings page sections: each form is listed on its own, under how often it is filed. */
export const FREQUENCY_SECTIONS: { frequency: Frequency; title: string; hint: string }[] = [
  { frequency: "monthly", title: "Monthly returns", hint: "Counted from the end of the reporting month." },
  { frequency: "quarterly", title: "Quarterly returns", hint: "Counted from the end of the reporting quarter." },
  { frequency: "annual", title: "Annual returns", hint: "Counted from the end of the year (calendar or the client's taxable year)." },
];
