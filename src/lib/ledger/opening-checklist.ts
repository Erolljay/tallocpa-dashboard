/**
 * The opening balance checklist for a client's books, worked out for its own cut-off
 * (Owner, 25 November 2026): the start of a calendar or fiscal year, or part-way through
 * it (e.g. the second quarter). Each item says what to bring in as of the cut-off and,
 * where the app can tell, whether it is done. Pure, so it can be tested; the Books page
 * gathers the figures.
 */
import { accumulated, type Asset } from "@/lib/assets/schedule";
import { formatAmount } from "@/lib/returns/money";
import type { Centavos } from "@/lib/returns/types";
import type { Cutoff } from "./cutoff";
import type { AccountType, Control } from "./types";
import { PNL_TYPES } from "./cutoff";

export type ItemStatus = "done" | "todo" | "warn" | "info" | "na";

export interface ChecklistItem {
  key: string;
  title: string;
  status: ItemStatus;
  detail: string;
  /** Where to do it in the app. */
  where?: "opening" | "fixed_assets" | "payroll" | "documents" | "returns" | "books_start";
}

/** One line of the opening entry, with its account. */
export interface OpeningBalance {
  type: AccountType;
  fsLine: string;
  control: Control | null;
  key: string | null;
  normalSide: "debit" | "credit";
  /** Debit − credit, centavos. */
  net: Centavos;
}

export interface ChecklistInput {
  cutoff: Cutoff;
  /** The opening entry's lines; null when the opening balances are not entered. */
  opening: OpeningBalance[] | null;
  /** Assets entered as opening assets (bought before the cut-off). */
  openingAssets: Asset[];
  /** Employees on the payroll, and the payroll months already entered (YYYY-MM-01). */
  payroll: { employees: number; months: string[] };
  /** Returns of the taxable year whose period ends before the cut-off, as the OS has them. */
  earlierReturns: { form: string; periodLabel: string; filed: boolean }[];
  /** 2307s received on file for the taxable year before the cut-off. */
  certificatesBefore: number;
}

const TOLERANCE = 100; // ₱1, as the tie-outs
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const longDate = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8, 10))}, ${iso.slice(0, 4)}`;
const peso = (c: Centavos) => `₱${formatAmount(c)}`;

export function openingChecklist(i: ChecklistInput): ChecklistItem[] {
  const { cutoff: c, opening } = i;
  const out: ChecklistItem[] = [];
  const asOf = longDate(c.openingAsOf);
  const sumOf = (f: (b: OpeningBalance) => boolean) => (opening ?? []).filter(f).reduce((s, b) => s + b.net, 0);

  // 1. The cut-off itself.
  out.push({
    key: "cutoff",
    title: `Cut-off: books from ${longDate(c.booksStart)}, opening balances as of ${asOf}`,
    status: c.atYearStart || c.atQuarterStart ? "info" : "warn",
    where: "books_start",
    detail: c.atYearStart
      ? `The books start on the first day of the taxable year. The opening balances are the trial balance as of ${asOf} after closing: income and expenses are already in retained earnings or capital.`
      : `The books start in quarter ${c.quarter} of the taxable year that began ${longDate(c.yearStart)}. The opening balances include the income and expenses from ${longDate(c.yearStart)} to ${asOf}, so the quarterly and annual income tax returns read the whole year from the books.` +
        (c.atQuarterStart ? "" : " Start on the first day of a quarter if you can, so each quarterly return splits cleanly between the opening and the books."),
  });

  // 2. The trial balance.
  out.push({
    key: "trial_balance",
    title: `Trial balance as of ${asOf}`,
    status: opening ? "done" : "todo",
    where: "opening",
    detail: opening
      ? "Entered and balanced. Uploading the workbook again replaces it."
      : `Download the opening balances workbook, enter every account's balance as of ${asOf} from the previous books or working papers, and upload it.`,
  });

  // 3. Income and expenses for the year to date (mid-year only).
  if (!c.atYearStart) {
    const pnl = (opening ?? []).filter((b) => PNL_TYPES.includes(b.type) && b.net !== 0).length;
    out.push({
      key: "year_to_date",
      title: `Income and expenses from ${longDate(c.yearStart)} to ${asOf}`,
      status: pnl > 0 ? "done" : "todo",
      where: "opening",
      detail: pnl > 0
        ? `${pnl} income and expense account${pnl === 1 ? "" : "s"} carry the year to date. Check them against the returns already filed for the year.`
        : "Put the year to date's balance of each income and expense account in the opening trial balance (not closed into equity). Without them the income tax returns fall back to documents for this year.",
    });
  }

  // 4. Receivables and payables by customer and supplier.
  out.push({
    key: "receivables_payables",
    title: "Unpaid customer and supplier invoices behind Accounts Receivable and Payable",
    status: opening ? "done" : "todo",
    where: "opening",
    detail: opening
      ? "Listed invoice by invoice; the import checked that they add up to the AR and AP balances."
      : "List each unpaid invoice (customer or supplier, TIN, number, date, balance) on the workbook's Receivables and Payables sheets; they must add up to the AR and AP balances.",
  });

  // 5. Property and equipment: the opening assets against the trial balance.
  const tbCost = sumOf((b) => b.fsLine === "ppe" && b.normalSide === "debit" && b.key !== "land");
  const tbAccum = -sumOf((b) => b.fsLine === "ppe" && b.normalSide === "credit");
  const regCost = i.openingAssets.reduce((s, a) => s + a.cost, 0);
  const regAccum = i.openingAssets.reduce((s, a) => s + accumulated(a, c.openingAsOf), 0);
  if (tbCost !== 0 || regCost !== 0) {
    const ties = Math.abs(tbCost - regCost) <= TOLERANCE && Math.abs(tbAccum - regAccum) <= TOLERANCE;
    out.push({
      key: "fixed_assets",
      title: "Property and equipment, asset by asset",
      status: ties ? "done" : "todo",
      where: "fixed_assets",
      detail: ties
        ? `${i.openingAssets.length} opening asset${i.openingAssets.length === 1 ? "" : "s"} tie to the trial balance: cost ${peso(regCost)}, accumulated depreciation ${peso(regAccum)}.`
        : `Add each asset bought before the cut-off on the Fixed assets page (date bought, cost, life). Register: cost ${peso(regCost)}, accumulated depreciation ${peso(regAccum)} as of ${asOf}; trial balance: cost ${peso(tbCost)}, accumulated ${peso(tbAccum)}. A difference in accumulated depreciation means the life or date differs from the old books.`,
    });
  }

  // 6. CWT still waiting for 2307s.
  const awaiting = sumOf((b) => b.control === "cwt_awaiting");
  if (awaiting > 0) {
    out.push({
      key: "cwt_awaiting",
      title: "CWT waiting for 2307s at the cut-off",
      status: "warn",
      detail: `${peso(awaiting)} of CWT waits for customers' 2307s. The opening amount is not tied to customers, so when each of those 2307s arrives, move it by journal entry from CWT – Awaiting 2307 to CWT (BIR 2307).`,
    });
  }

  // 7. Excess input VAT carried over.
  const inputVat = sumOf((b) => b.control === "input_vat");
  if (inputVat > 0) {
    out.push({
      key: "input_vat",
      title: "Excess input VAT carried over",
      status: "info",
      where: "returns",
      detail: `${peso(inputVat)} of input VAT as of ${asOf}. Unless it is already on the previous quarter's worksheet in the OS, type it as "Input tax carried over" (Item 38) on the first 2550Q after the cut-off.`,
    });
  }

  // 8. Inventory.
  const inventory = sumOf((b) => b.control === "inventory");
  if (inventory > 0) {
    out.push({ key: "inventory", title: "Inventory count", status: "info", detail: `${peso(inventory)} of inventory: keep the count sheet as of ${asOf} with the opening balances.` });
  }

  // 9. Payroll before the cut-off in the same calendar year (2316s and the year-end adjustment are by calendar year).
  const month = Number(c.booksStart.slice(5, 7));
  if (i.payroll.employees > 0 && month > 1) {
    const year = c.booksStart.slice(0, 4);
    const needed = Array.from({ length: month - 1 }, (_, k) => `${year}-${String(k + 1).padStart(2, "0")}-01`);
    const missing = needed.filter((m) => !i.payroll.months.includes(m));
    out.push({
      key: "payroll",
      title: `Payroll from January to ${MONTHS[month - 2]} ${year}`,
      status: missing.length ? "todo" : "done",
      where: "payroll",
      detail: missing.length
        ? `Enter the payroll for ${missing.map((m) => MONTHS[Number(m.slice(5, 7)) - 1]).join(", ")} on the Payroll page (upload the registers), so the 2316s, the alphalist and the year-end tax adjustment cover the whole calendar year. These months are not posted to the books; the opening balances carry them.`
        : "Every month of the calendar year before the cut-off is entered, for the 2316s and the year-end adjustment.",
    });
  }

  // 10. Returns already filed for the year, and the 2307s behind them (mid-year only).
  if (!c.atYearStart) {
    const open = i.earlierReturns.filter((r) => !r.filed);
    out.push({
      key: "earlier_returns",
      title: `Returns filed for ${longDate(c.yearStart)} to ${asOf}`,
      status: open.length ? "todo" : "warn",
      where: "returns",
      detail:
        (i.earlierReturns.length
          ? open.length
            ? `Not yet marked filed in the OS: ${open.map((r) => `${r.form} ${r.periodLabel}`).join(", ")}. `
            : `${i.earlierReturns.length} return${i.earlierReturns.length === 1 ? " is" : "s are"} on file. `
          : "These returns were filed outside the OS. ") +
        "The first returns after the cut-off carry figures from them: type the previous quarters' tax payments on the 1701Q/1702Q and the input tax carried over on the 2550Q where no earlier worksheet exists.",
    });
    out.push({
      key: "certificates",
      title: `2307s received from ${longDate(c.yearStart)} to ${asOf}`,
      status: i.certificatesBefore > 0 ? "done" : "todo",
      where: "documents",
      detail: i.certificatesBefore > 0
        ? `${i.certificatesBefore} on file. Add any missing so the annual return and its SAWT credit the whole year.`
        : "Upload the 2307s received earlier in the year so the annual income tax return and its SAWT credit the whole year.",
    });
  }

  return out;
}
