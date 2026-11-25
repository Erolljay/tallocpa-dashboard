/**
 * BIR Form 2551Q — Quarterly Percentage Tax Return (January 2018 ENCS),
 * for non-VAT taxpayers under NIRC Sec. 116 (ATC PT010).
 *
 * taxify has no 2551Q report; this follows the BIR form. The rate comes from
 * the dated percentage-tax series (taxify tax-rates-data.json `pt`: 3%, the
 * CREATE Act's 1% from 1 July 2020 to 30 June 2023, then 3%), picked per
 * document month so a quarter straddling a change is split by rate.
 */
import type { FormModule, ManualInput, WorksheetContext, WorksheetResult, WorksheetSchedule } from "../../types";
import { percentageTaxRate } from "../../rates";
import { buildSawt, sawtAttachments, sawtSchedule } from "./sawt";
import { Inputs, amountInput, docLabel, docsWithin, filerWarnings, labelsOf, line, netOfVat, ownerNameInputs, pct, peso, quarterOf, sum, uncodedErrors } from "./util";

const FORM = "2551Q";

function inputsFor(ctx: Pick<WorksheetContext, "client">): ManualInput[] {
  const list: ManualInput[] = [];
  // The client's income tax method (client settings) answers Item 13; asked here only while it is not set.
  if (ctx.client.taxpayerType === "individual" && !ctx.client.incomeTaxMethod) {
    list.push({
      key: "income_tax_option",
      label: "Income tax rate option for the year (Item 13)",
      kind: "choice",
      choices: [
        { value: "graduated", label: "Graduated income tax rates" },
        { value: "8pct", label: "8% income tax (in lieu of graduated rates and percentage tax)" },
      ],
      required: true,
      help: "An individual on the 8% option pays no percentage tax, so no 2551Q is due.",
    });
  }
  list.push(
    amountInput("amended_tax_paid", "Tax paid in return previously filed, if amended (Item 16)"),
    amountInput("prior_overpayment", "Overpayment carried over from the previous quarter (shown in Item 17)", "Leave blank to use the previous quarter's worksheet, if any."),
    amountInput("other_credits", "Other tax credits / payments (Item 17)"),
    amountInput("surcharge", "Surcharge (Item 20)"),
    amountInput("interest", "Interest (Item 21)"),
    amountInput("compromise", "Compromise (Item 22)"),
    ...ownerNameInputs(ctx),
  );
  return list;
}

function compute(ctx: WorksheetContext): WorksheetResult {
  const manual = inputsFor(ctx);
  const inp = new Inputs(ctx.inputs, labelsOf(manual));
  const errors: string[] = [];
  const warnings: string[] = [];
  const empty = (errs: string[]): WorksheetResult => ({ sections: [], schedules: [], errors: errs, warnings, documentIds: [] });

  if (ctx.client.taxpayerType === "individual") {
    const method = ctx.client.incomeTaxMethod;
    const option = method ? (method === "eight_percent" ? "8pct" : "graduated") : inp.choice("income_tax_option");
    if (!option) return empty(["Choose the client's income tax rate option (graduated or 8%) — it decides whether a 2551Q is due."]);
    if (option === "8pct")
      return empty([
        "The client is on the 8% income tax option, which is in lieu of the graduated rates AND the percentage tax (NIRC Sec. 24(A)(2)(b)). No 2551Q is due for this quarter; mark the filing as not applicable.",
      ]);
  }
  if (ctx.client.vatRegistered) warnings.push("The client is VAT-registered; percentage tax under Sec. 116 applies only to non-VAT taxpayers. Check that this 2551Q is really due.");

  const { periodStart, periodEnd } = ctx.filing;
  const docs = docsWithin(ctx.documents, periodStart, periodEnd);
  const sales = docs.filter((d) => d.docType === "sales_invoice");
  errors.push(...uncodedErrors(docs));
  const books = ctx.source === "books";

  // Schedule 1: one row per rate in force during the quarter.
  const byRate = new Map<number, { amount: number; months: Set<string> }>();
  for (const d of sales) {
    if (d.vat > 0) warnings.push(`${docLabel(d)} shows VAT of ₱${peso(d.vat)} although the client files percentage tax; the VAT is left out of gross sales.`);
    const rate = percentageTaxRate(d.month);
    const g = byRate.get(rate) ?? { amount: 0, months: new Set<string>() };
    g.amount += netOfVat(d);
    g.months.add(d.month.slice(0, 7));
    byRate.set(rate, g);
  }
  const rows = [...byRate.entries()].sort((a, b) => [...a[1].months].sort()[0].localeCompare([...b[1].months].sort()[0]));
  if (rows.length === 0) rows.push([percentageTaxRate(periodStart), { amount: 0, months: new Set() }]);
  if (rows.length > 1) warnings.push("The percentage tax rate changed within this quarter; Schedule 1 shows one row per rate.");
  const schedLines = rows.map(([rate, g], i) =>
    line(`schedule1_row${i + 1}_tax_due`, `Sch. 1 row ${i + 1}`, `PT010 — gross sales/receipts ₱${peso(g.amount)} × ${rate}%`, pct(g.amount, rate), {
      basis: `Sales invoices${g.months.size ? ` for ${[...g.months].sort().join(", ")}` : ""} net of VAT, at the ${rate}% rate in force.`,
    }),
  );
  const grossSales = sum(rows.map(([, g]) => g.amount));
  const taxDue = sum(schedLines.map((l) => l.amount ?? 0));

  const sawt = buildSawt(docs, ["percentage"]);
  errors.push(...sawt.errors);
  warnings.push(...sawt.warnings);

  const amended = inp.amount("amended_tax_paid");
  let priorOver = inp.optionalAmount("prior_overpayment");
  let priorOverBasis = "Typed in.";
  if (priorOver == null) {
    const fromPrior = quarterOf(ctx) > 1 ? ctx.priorFigures[FORM]?.overpayment : undefined;
    priorOver = fromPrior ?? 0;
    priorOverBasis = fromPrior != null ? "Overpayment on the previous quarter's worksheet." : "None entered.";
  }
  const other = inp.amount("other_credits");
  const i17 = priorOver + other;
  const i18 = sawt.total + amended + i17;
  const i19 = taxDue - i18;
  const pen = [inp.amount("surcharge"), inp.amount("interest"), inp.amount("compromise")];
  const i23 = sum(pen);
  errors.push(...inp.errors);
  warnings.push(...filerWarnings(ctx).filter(() => sawt.rows.length > 0));

  const schedule1: WorksheetSchedule = {
    title: "Schedule 1 — Computation of tax",
    columns: [
      { key: "atc", label: "ATC" },
      { key: "taxable", label: "Taxable amount", numeric: true },
      { key: "rate", label: "Tax rate" },
      { key: "due", label: "Tax due", numeric: true },
    ],
    rows: rows.map(([rate, g]) => ({ atc: "PT010", taxable: g.amount, rate: `${rate}%`, due: pct(g.amount, rate) })),
  };

  return {
    sections: [
      {
        title: "Schedule 1 — Computation of tax",
        lines: [
          line("gross_sales", "Sch. 1", "Gross sales/receipts for the quarter (net of VAT)", grossSales, {
            basis: books
              ? `${sales.length} Sales Invoice(s) in the Books: Non-VAT Sales (NVS) and any exempt or zero-rated lines.`
              : `${sales.length} approved sales invoice(s) in the quarter.`,
          }),
          ...schedLines,
          line("total_tax_due_schedule1", "Sch. 1 total", "Total tax due", taxDue, { emphasis: "subtotal" }),
        ],
      },
      {
        title: "Part II — Total tax payable",
        lines: [
          line("total_tax_due", "14", "Total tax due (Schedule 1)", taxDue, { emphasis: "subtotal" }),
          line("creditable_pt_withheld", "15", "Less: Creditable percentage tax withheld per BIR Form 2307", sawt.total, { basis: `${sawt.rows.length} SAWT row(s) from 2307s received with a WB ATC.` }),
          line("amended_tax_paid", "16", "Tax paid in return previously filed, if amended", amended),
          line("other_credits", "17", "Other tax credit/payment (incl. previous quarter's overpayment)", i17, { basis: `Previous quarter's overpayment ₱${peso(priorOver)} (${priorOverBasis}) + other credits ₱${peso(other)}.` }),
          line("total_credits", "18", "Total tax credits/payments (15 to 17)", i18, { emphasis: "subtotal" }),
          line("tax_still_payable", "19", "Tax still payable/(overpayment) (14 less 18)", i19, { emphasis: "total" }),
          line("surcharge", "20", "Surcharge", pen[0]),
          line("interest", "21", "Interest", pen[1]),
          line("compromise", "22", "Compromise", pen[2]),
          line("total_penalties", "23", "Total penalties (20 to 22)", i23, { emphasis: "subtotal" }),
          line("total_amount_payable", "24", "TOTAL AMOUNT PAYABLE/(Overpayment) (19 + 23)", i19 + i23, { emphasis: "payable" }),
          line("overpayment", "—", "Overpayment to carry to the next quarter", Math.max(0, -i19), { basis: "Not a form line; read by the next quarter's worksheet." }),
        ],
      },
    ],
    schedules: [schedule1, sawtSchedule("SAWT — creditable percentage tax withheld", sawt.rows)],
    errors,
    warnings,
    documentIds: [...new Set([...sales.map((d) => d.id), ...sawt.documentIds])],
  };
}

export const form2551Q: FormModule = {
  forms: [FORM],
  title: "2551Q — Quarterly Percentage Tax Return",
  manualInputs: inputsFor,
  compute,
  attachments(ctx) {
    const sawt = buildSawt(docsWithin(ctx.documents, ctx.filing.periodStart, ctx.filing.periodEnd), ["percentage"]);
    return sawtAttachments(ctx, FORM, sawt, ctx.filing.periodStart, ctx.filing.periodEnd);
  },
};
