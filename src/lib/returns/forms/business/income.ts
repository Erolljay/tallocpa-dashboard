/**
 * Quarterly income tax returns, cumulative for the taxable year to date:
 *   - BIR Form 1701Q (individuals; January 2018 ENCS), ported from taxify
 *     reports/1701q-report.js (`netIncomeFor`, `recompute1701Q`): Schedule I
 *     (graduated rates, itemized or OSD), Schedule II (8%), Schedule III
 *     (credits), Part III and penalties.
 *   - BIR Form 1702Q (non-individuals; January 2018 ENCS), ported from taxify
 *     reports/1702q-report.js (`netIncomeFor1702`, `recompute1702Q`) and
 *     helpers/pnl-helpers.js (`isMcitApplicable`): Schedule 2 (regular rate),
 *     Schedule 3 (MCIT), Schedule 4 (credits), Part II.
 *
 * In taxify, sales / cost of sales / expenses came from the Manager chart of
 * accounts and carry-overs from dedicated balance-sheet accounts. Here, for a
 * bookkeeping client whose books cover the taxable year to date, sales, cost
 * of sales, other income and itemized deductions come from the ledger, grouped
 * by each account's BIR line (book-income.ts), with lines coded ND added back
 * (NR and NVP lines stay deductible). Otherwise sales come from approved sales
 * invoices and expenses from purchase receipts (a rough proxy), with cost of
 * sales and other income typed in. Creditable tax withheld (the SAWT) comes from
 * the CWT codes on the Sales Invoices in the Books, or for a client without
 * Books from the 2307s received; prior quarters' payments from typed figures or
 * the previous quarter's worksheet (`priorFigures`). OSD, itemized or 8% is the
 * client's income tax method (client settings), else the worksheet's choice.
 */
import { BIR_LINES } from "@/lib/ledger/bir-lines";
import type { Centavos, FormModule, IncomeTaxMethod, ManualInput, SourceDocument, WorksheetContext, WorksheetLine, WorksheetResult, WorksheetSchedule } from "../../types";
import { bookIncome, linesWithMovement } from "./book-income";
import { corporateRates, eightPercentRate, graduatedIncomeTax, mcitRate, osdRate } from "../../rates";
import { buildSawt, sawtAttachments, sawtSchedule, type SawtResult } from "./sawt";
import { Inputs, addMonths, amountInput, docsWithin, filerWarnings, labelsOf, line, monthEnd, netOfVat, ownerNameInputs, pct, peso, quarterOf, sum, taxableYear } from "./util";

/** ₱250,000 allowable reduction under the 8% option (NIRC Sec. 24(A)(2)(b)), for purely self-employed individuals. */
export const EIGHT_PCT_REDUCTION: Centavos = 250_000_00;
/** Gross sales/receipts ceiling for the 8% option and for non-VAT status. */
export const VAT_THRESHOLD: Centavos = 3_000_000_00;

export const PROXY_WARNING =
  "Itemized deductions are taken from the purchase receipts on file — only a rough proxy until the Phase 1B ledger: payroll, depreciation, non-deductible items and capital purchases are not separated, and cost of sales is only what was typed in. Review before filing.";

// ── Shared figures ─────────────────────────────────────────

export interface Periods {
  quarter: number;
  yearStart: string;
  yearEnd: string;
  /** Documents of this quarter / of the earlier quarters of the taxable year. */
  thisQ: SourceDocument[];
  prevQ: SourceDocument[];
}

export function periods(ctx: WorksheetContext): Periods {
  const { start, end } = taxableYear(ctx.filing.periodStart, ctx.client.fiscalYearEndMonth);
  const quarter = quarterOf(ctx);
  const thisQ = docsWithin(ctx.documents, ctx.filing.periodStart, ctx.filing.periodEnd);
  const prevQ = quarter > 1 ? docsWithin(ctx.documents, start, monthEnd(addMonths(ctx.filing.periodStart, -1))) : [];
  return { quarter, yearStart: start, yearEnd: end, thisQ, prevQ };
}

const salesOf = (docs: SourceDocument[]) => sum(docs.filter((d) => d.docType === "sales_invoice").map(netOfVat));

/** Cost of a purchase: net of VAT for a VAT-registered client (input VAT is credited), the full amount otherwise. */
function costsOf(docs: SourceDocument[], vatRegistered: boolean): Centavos {
  return sum(
    docs
      .filter((d) => d.docType === "purchase_receipt")
      .map((d) => (vatRegistered ? netOfVat(d) : d.total > 0 ? d.total : d.vatable + d.vatExempt + d.zeroRated + d.vat)),
  );
}

/** A typed figure, else the previous quarter's worksheet (only after the first quarter), else 0. */
function typedOrPrior(inp: Inputs, ctx: WorksheetContext, form: string, inputKey: string, priorKey: string, quarter: number) {
  const typed = inp.optionalAmount(inputKey);
  if (typed != null) return { amount: typed, basis: "Typed in.", found: true };
  const prior = quarter > 1 ? ctx.priorFigures[form]?.[priorKey] : undefined;
  if (prior != null) return { amount: prior, basis: "From the previous quarter's worksheet.", found: true };
  return { amount: 0, basis: quarter > 1 ? "No previous worksheet found and nothing typed in." : "First quarter of the taxable year.", found: quarter === 1 };
}

// ── Income and deductions: from the books, else from documents ──

/**
 * The client's books cover the taxable year to date: they started on or before its first
 * day, or part-way through it with the year to date's income and expenses in the opening
 * balances (a mid-year cut-off; src/lib/ledger/cutoff.ts).
 */
export function booksCover(ctx: Pick<WorksheetContext, "ledger" | "filing" | "client">): boolean {
  if (!ctx.ledger) return false;
  const start = taxableYear(ctx.filing.periodStart, ctx.client.fiscalYearEndMonth).start;
  return ctx.ledger.booksStart <= start || (ctx.ledger.openingYtd === true && ctx.ledger.booksStart <= ctx.filing.periodEnd);
}

export interface IncomeSource {
  fromBooks: boolean;
  salesQ: Centavos;
  salesPrev: Centavos;
  cosQ: Centavos;
  cosPrev: Centavos;
  otherQ: Centavos;
  otherPrev: Centavos;
  dedQ: Centavos;
  dedPrev: Centavos;
  errors: string[];
  warnings: string[];
  /** Year-to-date detail for the schedules. */
  detail: WorksheetSchedule;
  basis: { sales: string; cos: string; other: string; ded: string; prev: string };
}

/**
 * This quarter's and the earlier quarters' sales, cost of sales, other taxable
 * income and itemized deductions. `useCos`: cost of sales is deducted (not for
 * an individual on OSD or 8%).
 */
export function incomeSource(ctx: WorksheetContext, p: Periods, inp: Inputs, form: string, useCos: boolean, cwtQ: Centavos, cwtPrev: Centavos): IncomeSource {
  if (ctx.ledger && booksCover(ctx)) {
    const q = bookIncome(ctx.ledger.period);
    const prev = bookIncome(ctx.ledger.earlier);
    const errors: string[] = [];
    const warnings: string[] = [];
    const unmapped = [...new Set([...q.unmapped, ...prev.unmapped])];
    if (unmapped.length) errors.push(`These accounts have no BIR income tax line, so they are left out: ${unmapped.join(", ")}. Set the line in the chart of accounts.`);
    if (ctx.ledger.suggested > 0)
      warnings.push(`${ctx.ledger.suggested} suggested entr${ctx.ledger.suggested === 1 ? "y is" : "ies are"} not posted yet for the taxable year to date; confirm them on the Books page, then compute again.`);
    if (q.excluded + prev.excluded !== 0) warnings.push(`Income subject to final tax or exempt (₱${peso(q.excluded + prev.excluded)} to date) is left out of taxable income.`);
    const nd = ctx.ledger.nonDeductible;
    if (q.nondeductible + prev.nondeductible !== 0)
      warnings.push(
        `Non-deductible expenses (₱${peso(q.nondeductible + prev.nondeductible)} to date) are not deducted${nd && nd.period + nd.earlier !== 0 ? `, including ₱${peso(nd.period + nd.earlier)} of lines coded ND (added back)` : ""}.`,
      );
    const rows: Record<string, string | Centavos>[] = linesWithMovement(q, prev).map((k) => {
      const a = q.byLine[k] ?? 0;
      const b = prev.byLine[k] ?? 0;
      return { item: BIR_LINES[k].label, thisQ: a, prevQ: b, ytd: a + b };
    });
    // Decision 17: depreciation is deducted per the fixed asset register's tax column, in place of the books.
    let adjQ = 0;
    let adjPrev = 0;
    const dep = ctx.ledger.depreciation;
    if (dep) {
      const bookQ = q.byLine.ded_depreciation ?? 0;
      const bookPrev = prev.byLine.ded_depreciation ?? 0;
      adjQ = dep.periodTax - bookQ;
      adjPrev = dep.earlierTax - bookPrev;
      if (adjQ !== 0 || adjPrev !== 0) {
        rows.push({ item: "Depreciation per the tax column, in place of the books", thisQ: dep.periodTax, prevQ: dep.earlierTax, ytd: dep.periodTax + dep.earlierTax });
        rows.push({ item: "Difference from the books (book–tax reconciliation)", thisQ: adjQ, prevQ: adjPrev, ytd: adjQ + adjPrev });
      }
      if (dep.periodBook + dep.earlierBook !== bookQ + bookPrev)
        warnings.push(`Depreciation in the books (₱${peso(bookQ + bookPrev)} to date) differs from the fixed asset register (₱${peso(dep.periodBook + dep.earlierBook)}): run the missing months on the Fixed assets page.`);
    }
    rows.push({ item: "Creditable tax withheld (2307s on file)", thisQ: cwtQ, prevQ: cwtPrev, ytd: cwtQ + cwtPrev });
    return {
      fromBooks: true,
      salesQ: q.sales,
      salesPrev: prev.sales,
      cosQ: useCos ? q.costOfSales : 0,
      cosPrev: useCos ? prev.costOfSales : 0,
      otherQ: q.otherIncome,
      otherPrev: prev.otherIncome,
      dedQ: q.deductions + adjQ,
      dedPrev: prev.deductions + adjPrev,
      errors,
      warnings,
      detail: { title: "Year to date from the books, by BIR line", columns: COMPARISON_COLUMNS, rows },
      basis: {
        sales: "From the books: accounts on the sales line, net of returns and discounts, this quarter.",
        cos: useCos ? "From the books: cost of sales / services accounts this quarter." : "Not deducted under this regime.",
        other: "From the books: other taxable income accounts this quarter (income subject to final tax is left out).",
        ded: dep
          ? "From the books: expense accounts by BIR deduction line this quarter, with depreciation per the fixed asset register's tax column (see the schedule below)."
          : "From the books: expense accounts by BIR deduction line this quarter (see the schedule below).",
        prev: "From the books: the earlier quarters of the taxable year.",
      },
    };
  }

  const salesQ = salesOf(p.thisQ);
  const salesPrev = salesOf(p.prevQ);
  const costsQ = costsOf(p.thisQ, ctx.client.vatRegistered);
  const costsPrev = costsOf(p.prevQ, ctx.client.vatRegistered);
  const cosQ = useCos ? inp.amount("cost_of_sales") : 0;
  const cosPrev = useCos ? (ctx.priorFigures[form]?.cost_of_sales_to_date ?? 0) : 0;
  const errors: string[] = [];
  const warnings: string[] = [];
  if (cosQ > costsQ) errors.push(`Cost of sales (₱${peso(cosQ)}) is more than this quarter's purchase receipts (₱${peso(costsQ)}).`);
  if (ctx.ledger)
    warnings.push(`The books start on ${ctx.ledger.booksStart}, after the start of the taxable year, and the opening balances carry no income or expenses for the year to date: figures come from documents. Enter the year to date's income and expenses in the opening balances to use the books.`);
  return {
    fromBooks: false,
    salesQ,
    salesPrev,
    cosQ,
    cosPrev,
    otherQ: inp.amount("non_operating_income"),
    otherPrev: ctx.priorFigures[form]?.non_operating_income_to_date ?? 0,
    dedQ: Math.max(0, costsQ - cosQ),
    dedPrev: Math.max(0, costsPrev - cosPrev),
    errors,
    warnings,
    detail: comparisonSchedule([
      ["Sales (net of VAT)", salesQ, salesPrev],
      ["Purchase receipts", costsQ, costsPrev],
      ["Creditable tax withheld (2307)", cwtQ, cwtPrev],
    ]),
    basis: {
      sales: "Approved sales invoices this quarter, net of VAT.",
      cos: useCos ? "Typed in." : "Not deducted under this regime.",
      other: "Typed in.",
      ded: `Purchase receipts this quarter ₱${peso(costsQ)} less cost of sales.`,
      prev: "Recomputed from the documents of the earlier quarters, plus other income and cost of sales on earlier worksheets.",
    },
  };
}

/** Documents the figures came from: only the 2307s when the books give the income and deductions. */
const usedDocuments = (p: Periods, fromBooks: boolean) =>
  [...new Set([...p.thisQ, ...p.prevQ].filter((d) => (fromBooks ? d.docType === "bir_2307_received" : d.docType !== "bir_2307_issued" && d.docType !== "other")).map((d) => d.id))];

const COMPARISON_COLUMNS: WorksheetSchedule["columns"] = [
  { key: "item", label: "" },
  { key: "thisQ", label: "This quarter", numeric: true },
  { key: "prevQ", label: "Previous quarters", numeric: true },
  { key: "ytd", label: "Year to date", numeric: true },
];

function comparisonSchedule(rows: [string, Centavos, Centavos][]): WorksheetSchedule {
  return {
    title: "Year to date from documents",
    columns: COMPARISON_COLUMNS,
    rows: rows.map(([item, a, b]) => ({ item, thisQ: a, prevQ: b, ytd: a + b })),
  };
}

function priorDiffWarning(ctx: WorksheetContext, form: string, key: string, computed: Centavos, what: string): string[] {
  const prior = ctx.priorFigures[form]?.[key];
  return prior != null && prior !== computed
    ? [`${what} recomputed (₱${peso(computed)}) differs from the previous quarter's worksheet (₱${peso(prior)}); documents may have been added or changed since. Use the figure actually filed.`]
    : [];
}

export function cwt(p: Periods): { thisQ: SawtResult; prevQ: SawtResult } {
  return { thisQ: buildSawt(p.thisQ, ["income"]), prevQ: buildSawt(p.prevQ, ["income"]) };
}

// ── 1701Q ──────────────────────────────────────────────────

export const REGIMES = [
  { value: "graduated_osd", label: "Graduated rates, optional standard deduction (40%)" },
  { value: "graduated_itemized", label: "Graduated rates, itemized deductions" },
  { value: "8pct", label: "8% on gross sales/receipts" },
];

/** Inputs the books replace: cost of sales and other income come from the ledger when it covers the year. */
const BOOK_FIGURES = new Set(["cost_of_sales", "non_operating_income"]);
export type InputsCtx = Pick<WorksheetContext, "client" | "filing" | "ledger">;
export const withoutBookFigures = (ctx: InputsCtx, xs: ManualInput[]) => (booksCover(ctx) ? xs.filter((x) => !BOOK_FIGURES.has(x.key)) : xs);

/** 1701Q regime from the client's income tax method (client settings). */
const REGIME_OF_METHOD: Record<IncomeTaxMethod, string> = { osd: "graduated_osd", itemized: "graduated_itemized", eight_percent: "8pct" };
const METHOD_LABEL: Record<IncomeTaxMethod, string> = { osd: "optional standard deduction (OSD)", itemized: "itemized deductions", eight_percent: "8% on gross sales or receipts" };

/** The choice set on the client wins; the worksheet asks only while it is not set. */
const withoutMethodChoice = (ctx: InputsCtx, key: string, xs: ManualInput[]) => (ctx.client.incomeTaxMethod ? xs.filter((x) => x.key !== key) : xs);

/** A warning while the client has no income tax method set (the worksheet's own choice is used). */
const methodNote = (ctx: WorksheetContext): string[] =>
  ctx.client.incomeTaxMethod ? [] : ["No income tax method is set on the client; the choice on this worksheet is used. Set it on the client's page so every return uses it."];

/** The method line under Part I: where the deduction method came from. */
const methodLine = (ctx: WorksheetContext, chosen: string): WorksheetLine =>
  line("income_tax_method", "—", "Income tax method", null, {
    basis: ctx.client.incomeTaxMethod ? `${METHOD_LABEL[ctx.client.incomeTaxMethod]} (set on the client)` : `${chosen} (chosen on this worksheet)`,
  });

function inputs1701Q(ctx: InputsCtx): ManualInput[] {
  return withoutMethodChoice(ctx, "regime", withoutBookFigures(ctx, [
    { key: "regime", label: "Income tax regime for the year", kind: "choice", choices: REGIMES, required: true },
    {
      key: "has_compensation_income",
      label: "Also earns compensation income? (8% only)",
      kind: "choice",
      choices: [{ value: "no", label: "No — purely self-employed / professional" }, { value: "yes", label: "Yes — mixed income earner" }],
      required: false,
      help: "Only purely self-employed individuals deduct ₱250,000 under the 8% option.",
    },
    amountInput("cost_of_sales", "Cost of sales/services this quarter (Item 37, itemized only)", "The part of this quarter's purchase receipts that is cost of sales; the rest counts as itemized deductions."),
    amountInput("non_operating_income", "Non-operating income this quarter (Item 43 / 48)"),
    amountInput("gpp_share", "Share in income from a general professional partnership this quarter (Item 44)"),
    amountInput("prior_year_excess_credit", "Prior year's excess credits (Item 55)"),
    amountInput("prior_tax_payments", "Tax payments for the previous quarter(s) (Item 56)", "Leave blank to use the previous quarter's worksheet."),
    amountInput("amended_tax_paid", "Tax paid in return previously filed, if amended (Item 59)"),
    amountInput("foreign_tax_credits", "Foreign tax credits (Item 60)"),
    amountInput("other_credits", "Other tax credits/payments (Item 61)"),
    amountInput("surcharge", "Surcharge (Item 64)"),
    amountInput("interest", "Interest (Item 65)"),
    amountInput("compromise", "Compromise (Item 66)"),
    ...ownerNameInputs(ctx),
  ]));
}

function compute1701Q(ctx: WorksheetContext): WorksheetResult {
  const FORM = "1701Q";
  const inp = new Inputs(ctx.inputs, labelsOf(inputs1701Q(ctx)));
  const errors: string[] = [];
  const warnings: string[] = [];
  const empty = (errs: string[]): WorksheetResult => ({ sections: [], schedules: [], errors: errs, warnings: [], documentIds: [] });
  if (ctx.client.taxpayerType !== "individual") return empty(["BIR Form 1701Q is for individuals; this client files 1702Q."]);
  const regime = ctx.client.incomeTaxMethod ? REGIME_OF_METHOD[ctx.client.incomeTaxMethod] : inp.choice("regime");
  if (!regime) return empty(["Set the client's income tax method (OSD, itemized, or 8%) on the client's page, or choose the regime here."]);
  warnings.push(...methodNote(ctx));
  if (regime === "8pct" && ctx.client.vatRegistered) errors.push("A VAT-registered individual cannot use the 8% option; choose graduated rates.");

  const p = periods(ctx);
  const rateDate = p.yearEnd;
  const credits = cwt(p);
  errors.push(...credits.thisQ.errors, ...credits.prevQ.errors);
  warnings.push(...credits.thisQ.warnings);
  const src = incomeSource(ctx, p, inp, FORM, regime === "graduated_itemized", credits.thisQ.total, credits.prevQ.total);
  errors.push(...src.errors);
  warnings.push(...src.warnings);
  const { salesQ, salesPrev } = src;
  const nonOp = src.otherQ;
  const priorNonOp = src.otherPrev;

  let schedule: WorksheetLine[];
  let taxDue: Centavos;
  const carry: Record<string, Centavos> = { non_operating_income_to_date: priorNonOp + nonOp };

  if (regime === "8pct") {
    const compensation = inp.choice("has_compensation_income");
    if (!compensation) warnings.push("Taken as purely self-employed (₱250,000 reduction applied); answer the compensation-income question to confirm.");
    const reduction = compensation === "yes" ? 0 : EIGHT_PCT_REDUCTION;
    const rate = eightPercentRate(rateDate);
    const i49 = salesQ + nonOp;
    const i50 = salesPrev + priorNonOp;
    const i51 = i49 + i50;
    const i53 = Math.max(0, i51 - reduction);
    taxDue = pct(i53, rate);
    if (salesQ + salesPrev > VAT_THRESHOLD)
      warnings.push(`Gross sales to date (₱${peso(salesQ + salesPrev)}) exceed ₱3,000,000; the 8% option no longer applies — the client moves to graduated rates and must register for VAT.`);
    warnings.push(...priorDiffWarning(ctx, FORM, "cumulative_income", i50, "Previous quarters' income"));
    schedule = [
      line("sales", "47", "Sales/revenues/receipts/fees (net of returns, allowances & discounts)", salesQ, { basis: src.basis.sales }),
      line("non_operating_income", "48", "Add: Non-operating income", nonOp, { basis: src.basis.other }),
      line("total_income_quarter", "49", "Total income for the quarter (47 + 48)", i49, { emphasis: "subtotal" }),
      line("previous_quarters_income", "50", "Add: Total taxable income/(loss) previous quarter(s)", i50, {
        basis: src.fromBooks ? `${src.basis.prev} Sales ₱${peso(salesPrev)} + non-operating income ₱${peso(priorNonOp)}.` : `Sales invoices of earlier quarters ₱${peso(salesPrev)} + non-operating income on earlier worksheets ₱${peso(priorNonOp)}.`,
      }),
      line("cumulative_income", "51", "Cumulative taxable income/(loss) as of this quarter (49 + 50)", i51, { emphasis: "subtotal" }),
      line("allowable_reduction", "52", "Less: Allowable reduction from gross sales/receipts (₱250,000)", reduction, { basis: compensation === "yes" ? "Mixed income earner: no reduction." : "Purely self-employed." }),
      line("taxable_income_to_date", "53", "Taxable income/(loss) to date (51 − 52)", i53, { emphasis: "subtotal" }),
      line("tax_due_8pct", "54", `TAX DUE (${rate}%)`, taxDue, { emphasis: "total" }),
    ];
  } else {
    const osd = regime === "graduated_osd";
    const osdPct = osdRate(rateDate);
    const cos = src.cosQ;
    const priorCos = src.cosPrev;
    if (!osd && !src.fromBooks) warnings.push(PROXY_WARNING);
    // OSD for individuals (RR 16-2008 §3): 40% of gross sales, cost of sales not separately deductible (taxify `netIncomeFor`).
    const net = (sales: Centavos, cogs: Centavos, ded: Centavos) => (osd ? sales - pct(sales, osdPct) : sales - cogs - ded);
    const i36 = salesQ;
    const i37 = cos;
    const i38 = i36 - i37;
    const deduction = osd ? pct(salesQ, osdPct) : src.dedQ;
    const i41 = i38 - deduction;
    const priorGpp = ctx.priorFigures[FORM]?.gpp_share_to_date ?? 0;
    const i42 = net(salesPrev, priorCos, src.dedPrev) + priorNonOp + priorGpp;
    const i43 = nonOp;
    const i44 = inp.amount("gpp_share");
    const i45 = i41 + i42 + i43 + i44;
    taxDue = graduatedIncomeTax(i45, rateDate);
    warnings.push(...priorDiffWarning(ctx, FORM, "taxable_income_to_date", i42, "Previous quarters' taxable income"));
    Object.assign(carry, { gpp_share_to_date: priorGpp + i44, cost_of_sales_to_date: priorCos + cos });
    schedule = [
      line("sales", "36", "Sales/revenues/receipts/fees (net of returns, allowances & discounts)", i36, { basis: src.basis.sales }),
      line("cost_of_sales", "37", "Less: Cost of sales/services", i37, { basis: osd ? "Not deducted under OSD." : src.basis.cos }),
      line("gross_income", "38", "Gross income/(loss) from operation (36 − 37)", i38, { emphasis: "subtotal" }),
      osd
        ? line("osd", "40", `Optional standard deduction (${osdPct}% of Item 36)`, deduction)
        : line("itemized_deductions", "39", "Total allowable itemized deductions", deduction, { basis: src.basis.ded }),
      line("net_income_quarter", "41", "Net income/(loss) this quarter (38 − 39/40)", i41, { emphasis: "subtotal" }),
      line("previous_quarters_income", "42", "Add: Taxable income/(loss) previous quarter(s)", i42, {
        basis: src.fromBooks ? `${src.basis.prev} Partnership income from earlier worksheets.` : "Recomputed from the documents of the earlier quarters, plus non-operating and partnership income on earlier worksheets.",
      }),
      line("non_operating_income", "43", "Non-operating income", i43, { basis: src.basis.other }),
      line("gpp_share", "44", "Share in income from general professional partnership", i44),
      line("taxable_income_to_date", "45", "Total taxable income/(loss) to date (41 to 44)", i45, { emphasis: "subtotal" }),
      line("tax_due_graduated", "46", "TAX DUE (graduated rates)", taxDue, { emphasis: "total", basis: "Annual graduated table applied to income to date." }),
    ];
  }

  const i55 = inp.amount("prior_year_excess_credit");
  const pay = typedOrPrior(inp, ctx, FORM, "prior_tax_payments", "tax_payments_to_date", p.quarter);
  if (!pay.found) warnings.push("Tax paid for the previous quarter(s) (Item 56) was not found; enter it.");
  const i57 = credits.prevQ.total;
  const i58 = credits.thisQ.total;
  const [i59, i60, i61] = ["amended_tax_paid", "foreign_tax_credits", "other_credits"].map((k) => inp.amount(k));
  const i62 = i55 + pay.amount + i57 + i58 + i59 + i60 + i61;
  const i28 = taxDue - i62;
  const [i64, i65, i66] = ["surcharge", "interest", "compromise"].map((k) => inp.amount(k));
  const i67 = i64 + i65 + i66;
  errors.push(...inp.errors);
  if (credits.thisQ.rows.length) warnings.push(...filerWarnings(ctx));
  carry.tax_payments_to_date = pay.amount + Math.max(0, i28);

  return {
    sections: [
      {
        title: regime === "8pct" ? "Schedule II — 8% income tax rate" : "Schedule I — Graduated income tax rates",
        lines: [methodLine(ctx, REGIMES.find((r) => r.value === regime)?.label ?? regime), ...schedule],
      },
      {
        title: "Schedule III — Tax credits/payments",
        lines: [
          line("prior_year_excess_credit", "55", "Prior year's excess credits", i55),
          line("prior_tax_payments", "56", "Tax payment(s) for the previous quarter(s)", pay.amount, { basis: pay.basis }),
          line("cwt_previous_quarters", "57", "Creditable tax withheld for the previous quarter(s)", i57, { basis: "2307s received in the earlier quarters of the taxable year." }),
          line("cwt_this_quarter", "58", "Creditable tax withheld per BIR Form 2307 for this quarter", i58, { basis: `${credits.thisQ.rows.length} SAWT row(s).` }),
          line("amended_tax_paid", "59", "Tax paid in return previously filed, if amended", i59),
          line("foreign_tax_credits", "60", "Foreign tax credits", i60),
          line("other_credits", "61", "Other tax credits/payments", i61),
          line("total_credits", "62", "Total tax credits/payments (55 to 61)", i62, { emphasis: "subtotal" }),
        ],
      },
      {
        title: "Part III — Total tax payable",
        lines: [
          line("tax_due", "26", "Tax due", taxDue),
          line("less_credits", "27", "Less: Tax credits/payments", i62),
          line("tax_payable", "28", "Tax payable/(overpayment) (26 − 27)", i28, { emphasis: "total" }),
          line("surcharge", "64", "Surcharge", i64),
          line("interest", "65", "Interest", i65),
          line("compromise", "66", "Compromise", i66),
          line("total_penalties", "67", "Total penalties (64 to 66)", i67, { emphasis: "subtotal" }),
          line("add_penalties", "29", "Add: Total penalties", i67),
          line("total_amount_payable", "30", "TOTAL AMOUNT PAYABLE/(OVERPAYMENT) (28 + 29)", i28 + i67, { emphasis: "payable" }),
        ],
      },
      { title: "Carried to the next quarter (not form lines)", lines: Object.entries(carry).map(([k, v]) => line(k, "—", k.replace(/_/g, " "), v)) },
    ],
    schedules: [
      src.detail,
      sawtSchedule("SAWT — creditable income tax withheld this quarter", credits.thisQ.rows),
    ],
    errors,
    warnings,
    documentIds: usedDocuments(p, src.fromBooks),
  };
}

// ── 1702Q ──────────────────────────────────────────────────

function inputs1702Q(ctx: InputsCtx): ManualInput[] {
  return withoutMethodChoice(ctx, "deduction", withoutBookFigures(ctx, [
    {
      key: "deduction",
      label: "Deduction method for the year",
      kind: "choice",
      choices: [{ value: "osd", label: "Optional standard deduction (40% of gross income)" }, { value: "itemized", label: "Itemized deductions" }],
      required: true,
    },
    {
      key: "corporate_rate",
      label: "Regular income tax rate",
      kind: "choice",
      choices: [
        { value: "regular", label: "Regular rate (domestic corporation in general)" },
        { value: "small", label: "Reduced rate (net taxable income ≤ ₱5M and total assets ≤ ₱100M excluding land)" },
      ],
      required: true,
    },
    { key: "year_operations_commenced", label: "Year business operations commenced", kind: "count", required: false, help: "MCIT applies from the 4th taxable year after the year operations commenced." },
    amountInput("cost_of_sales", "Cost of sales/services this quarter (Schedule 2 Item 2)", "The part of this quarter's purchase receipts that is cost of sales; the rest counts as itemized deductions."),
    amountInput("non_operating_income", "Non-operating and other taxable income this quarter (Schedule 2 Item 4)"),
    amountInput("prior_year_excess_credit", "Prior year's excess credits (Schedule 4 Item 1)"),
    amountInput("prior_regular_payments", "Tax payment(s) for the previous quarter(s), other than MCIT (Schedule 4 Item 2)", "Leave blank to use the previous quarter's worksheet."),
    amountInput("prior_mcit_payments", "MCIT payment(s) for the previous quarter(s) (Schedule 4 Item 3)", "Leave blank to use the previous quarter's worksheet."),
    amountInput("amended_tax_paid", "Tax paid in return previously filed, if amended (Schedule 4 Item 6)"),
    amountInput("other_credits", "Other tax credits/payments (Schedule 4)"),
    amountInput("mcit_carryforward", "Unexpired excess of prior years' MCIT over regular income tax (Part II Item 15)", "Only the unexpired part (3 taxable years)."),
    amountInput("surcharge", "Surcharge (Item 21)"),
    amountInput("interest", "Interest (Item 22)"),
    amountInput("compromise", "Compromise (Item 23)"),
    ...ownerNameInputs(ctx),
  ]));
}

function compute1702Q(ctx: WorksheetContext): WorksheetResult {
  const FORM = "1702Q";
  const inp = new Inputs(ctx.inputs, labelsOf(inputs1702Q(ctx)));
  const errors: string[] = [];
  const warnings: string[] = [];
  const empty = (errs: string[]): WorksheetResult => ({ sections: [], schedules: [], errors: errs, warnings: [], documentIds: [] });
  if (ctx.client.taxpayerType === "individual") return empty(["BIR Form 1702Q is for corporations, partnerships and other non-individuals; this client files 1701Q."]);
  const method = ctx.client.incomeTaxMethod;
  if (method === "eight_percent") return empty(["The 8% option is for individuals only; set the client's income tax method to OSD or itemized."]);
  const deduction = method ?? inp.choice("deduction");
  const rateChoice = inp.choice("corporate_rate");
  const missing = [!deduction && "the deduction method (OSD or itemized; set it on the client's page)", !rateChoice && "the regular income tax rate"].filter(Boolean);
  if (missing.length) return empty([`Choose ${missing.join(" and ")}.`]);
  warnings.push(...methodNote(ctx));

  const p = periods(ctx);
  const rateDate = p.yearEnd;
  const taxYear = Number(rateDate.slice(0, 4));
  const rates = corporateRates(rateDate);
  const rate = rateChoice === "small" ? rates.small : rates.regular;
  if (rateChoice === "small") warnings.push(`The ${rates.small}% rate applies only if net taxable income is ₱5M or less and total assets (excluding land) are ₱100M or less; confirm.`);
  const osd = deduction === "osd";
  const osdPct = osdRate(rateDate);
  const credits = cwt(p);
  const src = incomeSource(ctx, p, inp, FORM, true, credits.thisQ.total, credits.prevQ.total);
  errors.push(...src.errors);
  warnings.push(...src.warnings);
  if (!osd && !src.fromBooks) warnings.push(PROXY_WARNING);
  const cos = src.cosQ;
  const priorCos = src.cosPrev;
  const nonOp = src.otherQ;
  const priorNonOp = src.otherPrev;

  // taxify `netIncomeFor1702`: OSD for corporations is 40% of gross income (sales − cost of sales + other income).
  const figures = (sales: Centavos, cogs: Centavos, other: Centavos, ded: Centavos) => {
    const grossIncomeOps = sales - cogs;
    const totalGrossIncome = grossIncomeOps + other;
    const allowable = osd ? pct(totalGrossIncome, osdPct) : ded;
    return { sales, cogs, grossIncomeOps, totalGrossIncome, allowable, taxableIncome: totalGrossIncome - allowable };
  };
  const q = figures(src.salesQ, cos, nonOp, src.dedQ);
  const prev = figures(src.salesPrev, priorCos, priorNonOp, src.dedPrev);
  const i9 = q.taxableIncome + prev.taxableIncome;
  const i11 = pct(Math.max(0, i9), rate);
  warnings.push(...priorDiffWarning(ctx, FORM, "taxable_income_to_date", prev.taxableIncome, "Previous quarters' taxable income"));

  // MCIT (NIRC Sec. 27(E); taxify `isMcitApplicable`): from the 4th taxable year after operations commenced.
  const commenced = inp.count("year_operations_commenced");
  if (commenced == null) warnings.push("Year operations commenced not entered; MCIT is computed as if it applies.");
  const mcitApplies = commenced == null || taxYear - commenced >= 4;
  const mcitPct = mcitRate(rateDate);
  const mcitBase = q.totalGrossIncome + prev.totalGrossIncome;
  const mcit = mcitApplies ? pct(Math.max(0, mcitBase), mcitPct) : 0;
  const i13 = Math.max(i11, mcit);
  const regularHigher = i11 >= mcit;

  const carryforward = inp.amount("mcit_carryforward");
  const i15 = regularHigher ? Math.min(carryforward, i13) : 0;
  if (carryforward > 0 && !regularHigher) warnings.push("MCIT is higher than the regular income tax this quarter, so the prior years' excess MCIT cannot be credited (Item 15 is 0).");
  const i16 = i13 - i15;

  errors.push(...credits.thisQ.errors, ...credits.prevQ.errors);
  warnings.push(...credits.thisQ.warnings);
  const c1 = inp.amount("prior_year_excess_credit");
  const c2 = typedOrPrior(inp, ctx, FORM, "prior_regular_payments", "regular_payments_to_date", p.quarter);
  const c3 = typedOrPrior(inp, ctx, FORM, "prior_mcit_payments", "mcit_payments_to_date", p.quarter);
  if (!c2.found || !c3.found) warnings.push("Payments for the previous quarter(s) (Schedule 4 Items 2–3) were not found; enter them.");
  const c4 = credits.prevQ.total;
  const c5 = credits.thisQ.total;
  const c6 = inp.amount("amended_tax_paid");
  const c6b = inp.amount("other_credits");
  const c7 = c1 + c2.amount + c3.amount + c4 + c5 + c6 + c6b;
  const i20 = i16 - c7;
  const [i21, i22, i23] = ["surcharge", "interest", "compromise"].map((k) => inp.amount(k));
  const i24 = i21 + i22 + i23;
  errors.push(...inp.errors);
  if (credits.thisQ.rows.length) warnings.push(...filerWarnings(ctx));

  const paidNow = Math.max(0, i20);
  const carry: Record<string, Centavos> = {
    non_operating_income_to_date: priorNonOp + nonOp,
    cost_of_sales_to_date: priorCos + cos,
    regular_payments_to_date: c2.amount + (regularHigher ? paidNow : 0),
    mcit_payments_to_date: c3.amount + (regularHigher ? 0 : paidNow),
  };

  return {
    sections: [
      {
        title: "Schedule 2 — Declaration this quarter (regular/normal rate)",
        lines: [
          methodLine(ctx, osd ? "optional standard deduction (OSD)" : "itemized deductions"),
          line("sales", "S2-1", "Sales/receipts/revenues/fees", q.sales, { basis: src.basis.sales }),
          line("cost_of_sales", "S2-2", "Less: Cost of sales/services", q.cogs, { basis: src.basis.cos }),
          line("gross_income_operations", "S2-3", "Gross income from operation", q.grossIncomeOps, { emphasis: "subtotal" }),
          line("non_operating_income", "S2-4", "Add: Non-operating and other taxable income", nonOp, { basis: src.basis.other }),
          line("total_gross_income", "S2-5", "Total gross income", q.totalGrossIncome, { emphasis: "subtotal" }),
          line("deductions", "S2-6", osd ? `Less: Optional standard deduction (${osdPct}% of gross income)` : "Less: Itemized deductions", q.allowable, osd ? {} : { basis: src.basis.ded }),
          line("taxable_income_quarter", "S2-7", "Taxable income this quarter", q.taxableIncome, { emphasis: "subtotal" }),
          line("previous_quarters_income", "S2-8", "Add: Taxable income previous quarter(s)", prev.taxableIncome, { basis: src.basis.prev }),
          line("taxable_income_to_date", "S2-9", "Total taxable income to date", i9, { emphasis: "subtotal" }),
          line("income_tax_rate", "S2-10", `Applicable income tax rate: ${rate}%`, null),
          line("regular_income_tax", "S2-11", "Income tax due other than MCIT", i11),
          line("mcit", "S2-12", "Minimum corporate income tax (MCIT)", mcit),
          line("income_tax_due", "S2-13", "Income tax due (higher of 11 and 12)", i13, { emphasis: "total" }),
        ],
      },
      {
        title: "Schedule 3 — Computation of MCIT",
        lines: [
          line("mcit_gross_income", "S3-4", "Total gross income, year to date", mcitBase),
          line("mcit_rate", "S3-5", `MCIT rate: ${mcitPct}%`, null),
          line("mcit_computed", "S3-6", "Minimum corporate income tax", mcit, {
            basis: mcitApplies ? `Gross income to date × ${mcitPct}%.` : `Not yet subject to MCIT: operations commenced ${commenced}; MCIT starts taxable year ${(commenced ?? 0) + 4}.`,
          }),
        ],
      },
      {
        title: "Schedule 4 — Tax credits/payments",
        lines: [
          line("prior_year_excess_credit", "S4-1", "Prior year's excess credits", c1),
          line("prior_regular_payments", "S4-2", "Tax payment(s) for the previous quarter(s) (other than MCIT)", c2.amount, { basis: c2.basis }),
          line("prior_mcit_payments", "S4-3", "MCIT payment(s) for the previous quarter(s)", c3.amount, { basis: c3.basis }),
          line("cwt_previous_quarters", "S4-4", "Creditable tax withheld for the previous quarter(s)", c4, { basis: "2307s received in the earlier quarters of the taxable year." }),
          line("cwt_this_quarter", "S4-5", "Creditable tax withheld per BIR Form 2307 for this quarter", c5, { basis: `${credits.thisQ.rows.length} SAWT row(s).` }),
          line("amended_tax_paid", "S4-6", "Tax paid in return previously filed, if amended", c6),
          line("other_credits", "S4-6b", "Other tax credits/payments", c6b),
          line("total_credits", "S4-7", "Total tax credits/payments", c7, { emphasis: "subtotal" }),
        ],
      },
      {
        title: "Part II — Total tax payable",
        lines: [
          line("income_tax_due_regular", "14", "Income tax due — regular/normal rate", i13),
          line("mcit_carryforward", "15", "Less: Unexpired excess of prior years' MCIT over regular income tax", i15),
          line("balance_tax_due", "16", "Balance/income tax still due — regular/normal rate", i16, { emphasis: "subtotal" }),
          line("aggregate_tax_due", "18", "Aggregate income tax due", i16, { emphasis: "subtotal" }),
          line("less_credits", "19", "Less: Total tax credits/payments", c7),
          line("net_tax_payable", "20", "Net tax payable/(overpayment)", i20, { emphasis: "total" }),
          line("surcharge", "21", "Surcharge", i21),
          line("interest", "22", "Interest", i22),
          line("compromise", "23", "Compromise", i23),
          line("total_penalties", "24", "Total penalties", i24, { emphasis: "subtotal" }),
          line("total_amount_payable", "25", "TOTAL AMOUNT PAYABLE/(OVERPAYMENT)", i20 + i24, { emphasis: "payable" }),
        ],
      },
      { title: "Carried to the next quarter (not form lines)", lines: Object.entries(carry).map(([k, v]) => line(k, "—", k.replace(/_/g, " "), v)) },
    ],
    schedules: [
      src.detail,
      sawtSchedule("SAWT — creditable income tax withheld this quarter", credits.thisQ.rows),
    ],
    errors,
    warnings,
    documentIds: usedDocuments(p, src.fromBooks),
  };
}

function incomeAttachments(form: "1701Q" | "1702Q") {
  return (ctx: WorksheetContext) => {
    const sawt = buildSawt(docsWithin(ctx.documents, ctx.filing.periodStart, ctx.filing.periodEnd), ["income"]);
    return sawtAttachments(ctx, form, sawt, ctx.filing.periodStart, ctx.filing.periodEnd);
  };
}

export const form1701Q: FormModule = {
  forms: ["1701Q"],
  title: "1701Q — Quarterly Income Tax Return (individuals)",
  manualInputs: inputs1701Q,
  documentScope: "year_to_date",
  usesLedger: true,
  compute: compute1701Q,
  attachments: incomeAttachments("1701Q"),
};

export const form1702Q: FormModule = {
  forms: ["1702Q"],
  title: "1702Q — Quarterly Income Tax Return (corporations, partnerships, non-individuals)",
  manualInputs: inputs1702Q,
  documentScope: "year_to_date",
  usesLedger: true,
  compute: compute1702Q,
  attachments: incomeAttachments("1702Q"),
};
