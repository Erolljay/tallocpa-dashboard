/**
 * The BIR filing calendar for a registered business: the home page's calendar and
 * the /bir-filing-calendar guide are both built from this one list.
 *
 * OWNER REVIEW before each filing season: form numbers and due dates follow the
 * rules for manual and eBIRForms filers on a calendar year. eFPS filers file
 * withholding returns on staggered dates by industry group (11th to 15th), dates
 * that fall on a weekend or holiday move to the next working day, and the BIR
 * extends deadlines from time to time by revenue memorandum circular.
 */

export type FormGroup = "withholding" | "business" | "income" | "information";

export const GROUPS: Record<FormGroup, { title: string; blurb: string }> = {
  withholding: { title: "Withholding tax", blurb: "Tax withheld from salaries and from payments to suppliers, remitted to the BIR." },
  business: { title: "Business tax", blurb: "VAT, or percentage tax for non-VAT businesses." },
  income: { title: "Income tax", blurb: "Quarterly and annual income tax returns." },
  information: { title: "Annual information returns", blurb: "Alphalists of tax withheld during the year, sent through eSubmission." },
};

export interface BirForm {
  code: string;
  name: string;
  group: FormGroup;
  /** Who files it. */
  who: string;
  /** The due-date rule in words. */
  rule: string;
  /** Due day by month (1 to 12) for a calendar-year taxpayer; months without an entry have none. */
  due: Partial<Record<number, number>>;
}

const every = (day: number, except: Partial<Record<number, number>> = {}) =>
  Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 1, except[i + 1] ?? day])) as Record<number, number>;

export const BIR_FORMS: BirForm[] = [
  {
    code: "1601-C",
    name: "Withholding tax on compensation",
    group: "withholding",
    who: "Employers",
    rule: "on the 10th day of the following month (December's return by January 15)",
    due: every(10, { 1: 15 }),
  },
  {
    code: "0619-E",
    name: "Expanded withholding, monthly",
    group: "withholding",
    who: "Withholding agents",
    rule: "on the 10th day of the following month, for the first two months of each quarter",
    due: { 2: 10, 3: 10, 5: 10, 6: 10, 8: 10, 9: 10, 11: 10, 12: 10 },
  },
  {
    code: "1601-EQ",
    name: "Expanded withholding, quarterly",
    group: "withholding",
    who: "Withholding agents",
    rule: "on the last day of the month after the quarter, with the quarterly alphalist of payees",
    due: { 1: 31, 4: 30, 7: 31, 10: 31 },
  },
  {
    code: "2550Q",
    name: "Quarterly VAT return",
    group: "business",
    who: "VAT-registered businesses",
    rule: "on the 25th day after the close of the quarter",
    due: { 1: 25, 4: 25, 7: 25, 10: 25 },
  },
  {
    code: "2551Q",
    name: "Quarterly percentage tax return",
    group: "business",
    who: "Non-VAT businesses",
    rule: "on the 25th day after the close of the quarter",
    due: { 1: 25, 4: 25, 7: 25, 10: 25 },
  },
  {
    code: "1701Q",
    name: "Quarterly income tax, individuals",
    group: "income",
    who: "Self-employed individuals",
    rule: "on May 15, August 15 and November 15",
    due: { 5: 15, 8: 15, 11: 15 },
  },
  {
    code: "1702Q",
    name: "Quarterly income tax, corporations",
    group: "income",
    who: "Corporations, partnerships and OPCs",
    rule: "within 60 days after the close of each of the first three quarters",
    due: { 5: 30, 8: 29, 11: 29 },
  },
  {
    code: "1701 / 1702",
    name: "Annual income tax return",
    group: "income",
    who: "Individuals and corporations",
    rule: "on April 15 for the calendar year",
    due: { 4: 15 },
  },
  {
    code: "1604-C",
    name: "Annual information return, compensation",
    group: "information",
    who: "Employers",
    rule: "on January 31, with the alphalist of employees",
    due: { 1: 31 },
  },
  {
    code: "1604-E",
    name: "Annual information return, expanded",
    group: "information",
    who: "Withholding agents",
    rule: "on March 1, with the alphalist of payees",
    due: { 3: 1 },
  },
];

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Every deadline in a month, earliest first. */
export function deadlinesIn(month: number): { day: number; form: BirForm }[] {
  return BIR_FORMS.flatMap((form) => (form.due[month] ? [{ day: form.due[month] as number, form }] : [])).sort(
    (a, b) => a.day - b.day || a.form.code.localeCompare(b.form.code),
  );
}

export const formsIn = (group: FormGroup) => BIR_FORMS.filter((f) => f.group === group);
