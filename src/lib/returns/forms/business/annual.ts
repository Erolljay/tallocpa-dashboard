/**
 * Annual income tax returns (spec §3.7, Phase 1B slice 7):
 *   - BIR Form 1702-RT (corporations, partnerships, non-stock: regular rate),
 *   - BIR Forms 1701 and 1701A (individuals; 1701A for purely business or
 *     professional income on OSD or 8%, 1701 otherwise).
 *
 * The year's sales, cost of sales, other income and itemized deductions come
 * from the books when they cover the year (the same source as 1701Q / 1702Q,
 * income.ts), else from the documents. Payments for the first three quarters
 * carry in from the last 1701Q / 1702Q worksheet of the year (or are typed);
 * creditable tax withheld is the year's 2307s.
 *
 * Lines are labelled by what they are rather than by item number: check the
 * item numbers against the current form when transcribing into eBIRForms. The
 * SAWT is shown as a schedule and attached as one DAT file for the taxable year
 * (form code 1702 or 1701, return period = the fiscal year-end month).
 */
import { BIR_LINES, type BirLineKey } from "@/lib/ledger/bir-lines";
import type { Centavos, FormModule, ManualInput, WorksheetContext, WorksheetLine, WorksheetResult, WorksheetSchedule } from "../../types";
import { corporateRates, eightPercentRate, graduatedIncomeTax, mcitRate, osdRate } from "../../rates";
import { bookIncome } from "./book-income";
import { EIGHT_PCT_REDUCTION, PROXY_WARNING, REGIMES, VAT_THRESHOLD, booksCover, cwt, incomeSource, periods, withoutBookFigures, type InputsCtx } from "./income";
import { buildSawt, sawtAnnualAttachments, sawtSchedule, type SawtAnnualForm } from "./sawt";
import { Inputs, amountInput, docsWithin, filerWarnings, labelsOf, line, ownerNameInputs, pct, peso, taxableYear } from "./util";

const empty = (errs: string[]): WorksheetResult => ({ sections: [], schedules: [], errors: errs, warnings: [], documentIds: [] });

/** A typed figure, else the last quarterly worksheet's carried figure(s), else 0 with a warning. */
function quarterlyPayments(inp: Inputs, ctx: WorksheetContext, form: string, inputKey: string, carried: string[]): { amount: Centavos; basis: string; found: boolean } {
  const typed = inp.optionalAmount(inputKey);
  if (typed != null) return { amount: typed, basis: "Typed in.", found: true };
  const prior = ctx.priorFigures[form];
  if (prior && carried.some((k) => prior[k] != null)) {
    return { amount: carried.reduce((s, k) => s + (prior[k] ?? 0), 0), basis: `From the last ${form} worksheet of the year (payments for the first three quarters).`, found: true };
  }
  return { amount: 0, basis: `No ${form} worksheet found for the year and nothing typed in.`, found: false };
}

/** Itemized deductions by BIR line (the Schedule of Ordinary Allowable Itemized Deductions), from the books. */
function deductionSchedule(ctx: WorksheetContext): WorksheetSchedule | null {
  if (!ctx.ledger || !booksCover(ctx)) return null;
  const b = bookIncome(ctx.ledger.period);
  const rows: { item: string; amount: Centavos }[] = (Object.keys(BIR_LINES) as BirLineKey[])
    .filter((k) => BIR_LINES[k].group === "deduction" && (b.byLine[k] ?? 0) !== 0)
    .map((k) => ({ item: BIR_LINES[k].label, amount: b.byLine[k] ?? 0 }));
  rows.push({ item: "Total ordinary allowable itemized deductions", amount: b.deductions });
  return { title: "Schedule of ordinary allowable itemized deductions (from the books)", columns: [{ key: "item", label: "" }, { key: "amount", label: "Amount", numeric: true }], rows };
}

/** Net income per books → taxable income, from the books. */
function reconciliation(ctx: WorksheetContext, taxable: Centavos): WorksheetSchedule | null {
  if (!ctx.ledger || !booksCover(ctx)) return null;
  const b = bookIncome(ctx.ledger.period);
  const perBooks = b.sales - b.costOfSales + b.otherIncome + b.excluded - b.deductions - b.nondeductible;
  const rows: { item: string; amount: Centavos }[] = [
    { item: "Net income (loss) per books", amount: perBooks },
    { item: "Add: non-deductible expenses and the provision for income tax", amount: b.nondeductible },
    { item: "Less: income subject to final tax and exempt income", amount: -b.excluded },
    { item: "Net income per books adjusted for tax", amount: perBooks + b.nondeductible - b.excluded },
    { item: "Taxable income on this return", amount: taxable },
    { item: "Difference (OSD, NOLCO, typed adjustments)", amount: taxable - (perBooks + b.nondeductible - b.excluded) },
  ];
  return { title: "Reconciliation of net income per books with taxable income", columns: [{ key: "item", label: "" }, { key: "amount", label: "Amount", numeric: true }], rows };
}

/** The balance sheet at the year end, from the books (the return's balance sheet schedule). */
function balanceSheet(ctx: WorksheetContext): WorksheetSchedule | null {
  const fs = ctx.ledger?.statements;
  if (!fs) return null;
  const rows = fs.position.lines.filter((l) => l.kind !== "heading").map((l) => ({ item: l.label, amount: l.amounts[0] ?? 0 }));
  return { title: `Balance sheet at ${ctx.filing.periodEnd} (from the books)`, columns: [{ key: "item", label: "" }, { key: "amount", label: "Amount", numeric: true }], rows };
}

const penaltyInputs = (n: string) => [amountInput("surcharge", `Surcharge${n}`), amountInput("interest", `Interest${n}`), amountInput("compromise", `Compromise${n}`)];

function penalties(inp: Inputs, due: Centavos): WorksheetLine[] {
  const [s, i, c] = ["surcharge", "interest", "compromise"].map((k) => inp.amount(k));
  return [
    line("surcharge", "—", "Surcharge", s),
    line("interest", "—", "Interest", i),
    line("compromise", "—", "Compromise", c),
    line("total_penalties", "—", "Total penalties", s + i + c, { emphasis: "subtotal" }),
    line("total_amount_payable", "—", "TOTAL AMOUNT PAYABLE/(OVERPAYMENT)", due + s + i + c, { emphasis: "payable" }),
  ];
}

// ── 1702-RT ────────────────────────────────────────────────

function inputs1702RT(ctx: InputsCtx): ManualInput[] {
  return withoutBookFigures(ctx, [
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
    amountInput("cost_of_sales", "Cost of sales/services for the year", "The part of the year's purchase receipts that is cost of sales; the rest counts as itemized deductions."),
    amountInput("non_operating_income", "Non-operating and other taxable income for the year"),
    amountInput("nolco", "Net operating loss carry-over (NOLCO) applied", "Itemized deductions only; not more than the taxable income before NOLCO."),
    amountInput("mcit_carryforward", "Unexpired excess of prior years' MCIT over regular income tax", "Only the unexpired part (3 taxable years)."),
    amountInput("prior_year_excess_credit", "Prior year's excess credits"),
    amountInput("quarterly_payments", "Income tax paid for the first three quarters", "Leave blank to use the last 1702Q worksheet of the year."),
    amountInput("other_credits", "Other tax credits/payments"),
    ...penaltyInputs(""),
  ]);
}

function compute1702RT(ctx: WorksheetContext): WorksheetResult {
  const FORM = "1702-RT";
  const inp = new Inputs(ctx.inputs, labelsOf(inputs1702RT(ctx)));
  const errors: string[] = [];
  const warnings: string[] = [];
  if (ctx.client.taxpayerType === "individual") return empty(["BIR Form 1702-RT is for corporations, partnerships and other non-individuals; this client files 1701 or 1701A."]);
  const deduction = inp.choice("deduction");
  const rateChoice = inp.choice("corporate_rate");
  const missing = [!deduction && "the deduction method (OSD or itemized)", !rateChoice && "the regular income tax rate"].filter(Boolean);
  if (missing.length) return empty([`Choose ${missing.join(" and ")}.`]);

  const p = periods(ctx);
  const rateDate = p.yearEnd;
  const rates = corporateRates(rateDate);
  const rate = rateChoice === "small" ? rates.small : rates.regular;
  if (rateChoice === "small") warnings.push(`The ${rates.small}% rate applies only if net taxable income is ₱5M or less and total assets (excluding land) are ₱100M or less; confirm.`);
  const osd = deduction === "osd";
  const osdPct = osdRate(rateDate);
  const credits = cwt(p);
  errors.push(...credits.thisQ.errors);
  warnings.push(...credits.thisQ.warnings);
  const src = incomeSource(ctx, p, inp, FORM, true, credits.thisQ.total, 0);
  errors.push(...src.errors);
  warnings.push(...src.warnings);
  if (!osd && !src.fromBooks) warnings.push(PROXY_WARNING);

  const grossOps = src.salesQ - src.cosQ;
  const totalGross = grossOps + src.otherQ;
  const allowable = osd ? pct(totalGross, osdPct) : src.dedQ;
  const beforeNolco = totalGross - allowable;
  let nolco = osd ? 0 : inp.amount("nolco");
  if (osd && inp.amount("nolco") > 0) warnings.push("NOLCO cannot be deducted under OSD; it is left out.");
  if (nolco > Math.max(0, beforeNolco)) {
    warnings.push(`NOLCO is limited to the taxable income before NOLCO (₱${peso(Math.max(0, beforeNolco))}).`);
    nolco = Math.max(0, beforeNolco);
  }
  const taxable = beforeNolco - nolco;
  const regular = pct(Math.max(0, taxable), rate);

  const commenced = inp.count("year_operations_commenced");
  if (commenced == null) warnings.push("Year operations commenced not entered; MCIT is computed as if it applies.");
  const mcitApplies = commenced == null || Number(rateDate.slice(0, 4)) - commenced >= 4;
  const mcitPct = mcitRate(rateDate);
  const mcit = mcitApplies ? pct(Math.max(0, totalGross), mcitPct) : 0;
  const taxDue = Math.max(regular, mcit);
  const regularHigher = regular >= mcit;
  const carryforward = inp.amount("mcit_carryforward");
  const mcitCredit = regularHigher ? Math.min(carryforward, taxDue) : 0;
  if (carryforward > 0 && !regularHigher) warnings.push("MCIT is higher than the regular income tax, so the prior years' excess MCIT cannot be credited.");
  const netDue = taxDue - mcitCredit;

  const priorExcess = inp.amount("prior_year_excess_credit");
  const quarterly = quarterlyPayments(inp, ctx, "1702Q", "quarterly_payments", ["regular_payments_to_date", "mcit_payments_to_date"]);
  if (!quarterly.found) warnings.push("Income tax paid for the first three quarters was not found; enter it.");
  const cwtYear = credits.thisQ.total;
  const other = inp.amount("other_credits");
  const totalCredits = priorExcess + quarterly.amount + cwtYear + other;
  const payable = netDue - totalCredits;
  errors.push(...inp.errors);
  if (credits.thisQ.rows.length) warnings.push(...filerWarnings(ctx));
  if (payable < 0) warnings.push("Overpayment: choose on the return whether it is refunded, issued as a tax credit certificate, or carried over as a tax credit next year.");

  const schedules = [src.detail, deductionSchedule(ctx), reconciliation(ctx, taxable), balanceSheet(ctx), sawtSchedule("SAWT — creditable income tax withheld for the year", credits.thisQ.rows)].filter(
    (x): x is WorksheetSchedule => x != null,
  );
  return {
    sections: [
      {
        title: "Computation of income tax (regular rate)",
        lines: [
          line("sales", "—", "Sales/receipts/revenues/fees (net of returns, allowances and discounts)", src.salesQ, { basis: src.basis.sales.replace("this quarter", "for the year") }),
          line("cost_of_sales", "—", "Less: Cost of sales/services", src.cosQ, { basis: src.basis.cos.replace("this quarter", "for the year") }),
          line("gross_income_operations", "—", "Gross income from operation", grossOps, { emphasis: "subtotal" }),
          line("non_operating_income", "—", "Add: Other taxable income not subject to final tax", src.otherQ, { basis: src.basis.other.replace("this quarter", "for the year") }),
          line("total_gross_income", "—", "Total gross income", totalGross, { emphasis: "subtotal" }),
          line("deductions", "—", osd ? `Less: Optional standard deduction (${osdPct}% of gross income)` : "Less: Ordinary allowable itemized deductions", allowable, osd ? {} : { basis: src.basis.ded.replace("this quarter", "for the year") }),
          line("nolco", "—", "Less: Net operating loss carry-over", nolco),
          line("taxable_income", "—", "Net taxable income", taxable, { emphasis: "subtotal" }),
          line("income_tax_rate", "—", `Applicable income tax rate: ${rate}%`, null),
          line("regular_income_tax", "—", "Income tax due other than MCIT", regular),
          line("mcit", "—", `Minimum corporate income tax (${mcitPct}% of gross income)`, mcit, {
            basis: mcitApplies ? `Gross income ₱${peso(totalGross)} × ${mcitPct}%.` : `Not yet subject to MCIT: operations commenced ${commenced}.`,
          }),
          line("income_tax_due", "—", "Income tax due (higher of regular income tax and MCIT)", taxDue, { emphasis: "total" }),
          line("mcit_carryforward", "—", "Less: Unexpired excess of prior years' MCIT over regular income tax", mcitCredit),
          line("net_tax_due", "—", "Income tax still due", netDue, { emphasis: "subtotal" }),
        ],
      },
      {
        title: "Tax credits/payments",
        lines: [
          line("prior_year_excess_credit", "—", "Prior year's excess credits", priorExcess),
          line("quarterly_payments", "—", "Income tax payments in the first three quarters", quarterly.amount, { basis: quarterly.basis }),
          line("cwt_year", "—", "Creditable tax withheld per BIR Form 2307 for the year", cwtYear, { basis: `${credits.thisQ.rows.length} SAWT row(s).` }),
          line("other_credits", "—", "Other tax credits/payments", other),
          line("total_credits", "—", "Total tax credits/payments", totalCredits, { emphasis: "subtotal" }),
          line("tax_payable", "—", "Net tax payable/(overpayment)", payable, { emphasis: "total" }),
          ...penalties(inp, payable),
        ],
      },
    ],
    schedules,
    errors,
    warnings,
    documentIds: [...new Set(p.thisQ.filter((d) => (src.fromBooks ? d.docType === "bir_2307_received" : d.docType !== "bir_2307_issued" && d.docType !== "other")).map((d) => d.id))],
  };
}

// ── 1701 / 1701A ───────────────────────────────────────────

function inputs1701(ctx: InputsCtx): ManualInput[] {
  return withoutBookFigures(ctx, [
    { key: "regime", label: "Income tax regime for the year", kind: "choice", choices: REGIMES, required: true },
    amountInput("compensation_income", "Taxable compensation income for the year (mixed income earners)", "From the BIR 2316(s); leave blank if purely self-employed."),
    amountInput("compensation_tax_withheld", "Tax withheld on compensation (BIR 2316)"),
    amountInput("cost_of_sales", "Cost of sales/services for the year (itemized only)", "The part of the year's purchase receipts that is cost of sales; the rest counts as itemized deductions."),
    amountInput("non_operating_income", "Other non-operating income for the year"),
    amountInput("nolco", "Net operating loss carry-over (NOLCO) applied (itemized only)"),
    amountInput("prior_year_excess_credit", "Prior year's excess credits"),
    amountInput("quarterly_payments", "Income tax paid for the first three quarters", "Leave blank to use the last 1701Q worksheet of the year."),
    amountInput("other_credits", "Other tax credits/payments"),
    ...penaltyInputs(""),
    ...ownerNameInputs(ctx),
  ]);
}

function compute1701(ctx: WorksheetContext): WorksheetResult {
  const FORM = ctx.filing.form;
  const inp = new Inputs(ctx.inputs, labelsOf(inputs1701(ctx)));
  const errors: string[] = [];
  const warnings: string[] = [];
  if (ctx.client.taxpayerType !== "individual") return empty([`BIR Form ${FORM} is for individuals; this client files 1702-RT.`]);
  const regime = inp.choice("regime");
  if (!regime) return empty(["Choose the client's income tax regime for the year (graduated + OSD, graduated + itemized, or 8%)."]);
  if (regime === "8pct" && ctx.client.vatRegistered) errors.push("A VAT-registered individual cannot use the 8% option; choose graduated rates.");

  const p = periods(ctx);
  const rateDate = p.yearEnd;
  const credits = cwt(p);
  errors.push(...credits.thisQ.errors);
  warnings.push(...credits.thisQ.warnings);
  const src = incomeSource(ctx, p, inp, "1701", regime === "graduated_itemized", credits.thisQ.total, 0);
  errors.push(...src.errors);
  warnings.push(...src.warnings);
  const compensation = inp.amount("compensation_income");
  const compTax = inp.amount("compensation_tax_withheld");
  if (FORM === "1701A" && compensation > 0) errors.push("BIR Form 1701A is for purely business or professional income; with compensation income, file 1701.");
  if (FORM === "1701A" && regime === "graduated_itemized") errors.push("BIR Form 1701A is for OSD or 8% only; with itemized deductions, file 1701.");

  let schedule: WorksheetLine[];
  let taxDue: Centavos;
  if (regime === "8pct") {
    const reduction = compensation > 0 ? 0 : EIGHT_PCT_REDUCTION;
    const rate = eightPercentRate(rateDate);
    const base = src.salesQ + src.otherQ;
    const taxable8 = Math.max(0, base - reduction);
    const tax8 = pct(taxable8, rate);
    const taxComp = compensation > 0 ? graduatedIncomeTax(compensation, rateDate) : 0;
    taxDue = tax8 + taxComp;
    if (src.salesQ > VAT_THRESHOLD) warnings.push(`Gross sales (₱${peso(src.salesQ)}) exceed ₱3,000,000; the 8% option does not apply for the year.`);
    schedule = [
      line("sales", "—", "Sales/revenues/receipts/fees (net of returns, allowances and discounts)", src.salesQ, { basis: src.basis.sales.replace("this quarter", "for the year") }),
      line("non_operating_income", "—", "Add: Other non-operating income", src.otherQ),
      line("total_income", "—", "Total gross sales/receipts and other income", base, { emphasis: "subtotal" }),
      line("allowable_reduction", "—", "Less: Allowable reduction (₱250,000, purely self-employed only)", reduction),
      line("taxable_income", "—", "Taxable income subject to 8%", taxable8, { emphasis: "subtotal" }),
      line("tax_8pct", "—", `Income tax at ${rate}%`, tax8),
      line("compensation_income", "—", "Taxable compensation income", compensation),
      line("tax_compensation", "—", "Income tax on compensation (graduated rates)", taxComp),
      line("tax_due", "—", "TOTAL INCOME TAX DUE", taxDue, { emphasis: "total" }),
    ];
  } else {
    const osd = regime === "graduated_osd";
    const osdPct = osdRate(rateDate);
    if (!osd && !src.fromBooks) warnings.push(PROXY_WARNING);
    const gross = src.salesQ - src.cosQ;
    const deduction = osd ? pct(src.salesQ, osdPct) : src.dedQ;
    const netBusiness = gross - deduction + src.otherQ;
    let nolco = osd ? 0 : inp.amount("nolco");
    if (nolco > Math.max(0, netBusiness)) nolco = Math.max(0, netBusiness);
    const taxable = netBusiness - nolco + compensation;
    taxDue = graduatedIncomeTax(Math.max(0, taxable), rateDate);
    schedule = [
      line("sales", "—", "Sales/revenues/receipts/fees (net of returns, allowances and discounts)", src.salesQ, { basis: src.basis.sales.replace("this quarter", "for the year") }),
      line("cost_of_sales", "—", "Less: Cost of sales/services", src.cosQ, { basis: osd ? "Not deducted under OSD." : src.basis.cos.replace("this quarter", "for the year") }),
      line("gross_income", "—", "Gross income from business/profession", gross, { emphasis: "subtotal" }),
      osd
        ? line("osd", "—", `Less: Optional standard deduction (${osdPct}% of gross sales/receipts)`, deduction)
        : line("itemized_deductions", "—", "Less: Ordinary allowable itemized deductions", deduction, { basis: src.basis.ded.replace("this quarter", "for the year") }),
      line("non_operating_income", "—", "Add: Other non-operating income", src.otherQ),
      line("nolco", "—", "Less: Net operating loss carry-over", nolco),
      line("net_business_income", "—", "Taxable income from business/profession", netBusiness - nolco, { emphasis: "subtotal" }),
      line("compensation_income", "—", "Add: Taxable compensation income", compensation),
      line("taxable_income", "—", "Total taxable income", taxable, { emphasis: "subtotal" }),
      line("tax_due", "—", "TOTAL INCOME TAX DUE (graduated rates)", taxDue, { emphasis: "total" }),
    ];
  }

  const priorExcess = inp.amount("prior_year_excess_credit");
  const quarterly = quarterlyPayments(inp, ctx, "1701Q", "quarterly_payments", ["tax_payments_to_date"]);
  if (!quarterly.found) warnings.push("Income tax paid for the first three quarters was not found; enter it.");
  const other = inp.amount("other_credits");
  const totalCredits = priorExcess + quarterly.amount + credits.thisQ.total + compTax + other;
  const payable = taxDue - totalCredits;
  errors.push(...inp.errors);
  if (credits.thisQ.rows.length) warnings.push(...filerWarnings(ctx));

  return {
    sections: [
      { title: regime === "8pct" ? "Computation of income tax (8%)" : "Computation of income tax (graduated rates)", lines: schedule },
      {
        title: "Tax credits/payments",
        lines: [
          line("prior_year_excess_credit", "—", "Prior year's excess credits", priorExcess),
          line("quarterly_payments", "—", "Income tax payments in the first three quarters", quarterly.amount, { basis: quarterly.basis }),
          line("cwt_year", "—", "Creditable tax withheld per BIR Form 2307 for the year", credits.thisQ.total, { basis: `${credits.thisQ.rows.length} SAWT row(s).` }),
          line("compensation_tax_withheld", "—", "Tax withheld on compensation per BIR Form 2316", compTax),
          line("other_credits", "—", "Other tax credits/payments", other),
          line("total_credits", "—", "Total tax credits/payments", totalCredits, { emphasis: "subtotal" }),
          line("tax_payable", "—", "Net tax payable/(overpayment)", payable, { emphasis: "total" }),
          ...penalties(inp, payable),
        ],
      },
    ],
    schedules: [src.detail, regime === "graduated_itemized" ? deductionSchedule(ctx) : null, balanceSheet(ctx), sawtSchedule("SAWT — creditable income tax withheld for the year", credits.thisQ.rows)].filter(
      (x): x is WorksheetSchedule => x != null,
    ),
    errors,
    warnings,
    documentIds: [...new Set(p.thisQ.filter((d) => (src.fromBooks ? d.docType === "bir_2307_received" : d.docType !== "bir_2307_issued" && d.docType !== "other")).map((d) => d.id))],
  };
}

/** The year's SAWT DAT and CSV: the 2307s received in the filing period, income ATCs only. */
function annualAttachments(form: SawtAnnualForm) {
  return (ctx: WorksheetContext) => {
    const sawt = buildSawt(docsWithin(ctx.documents, ctx.filing.periodStart, ctx.filing.periodEnd), ["income"]);
    const { start, end } = taxableYear(ctx.filing.periodStart, ctx.client.fiscalYearEndMonth);
    return sawtAnnualAttachments(ctx, form, sawt, start, end);
  };
}

export const form1702RT: FormModule = {
  forms: ["1702-RT"],
  title: "1702-RT — Annual Income Tax Return (corporations, partnerships, non-individuals: regular rate)",
  manualInputs: inputs1702RT,
  documentScope: "year_to_date",
  usesLedger: true,
  priorWithinPeriod: true,
  compute: compute1702RT,
  attachments: annualAttachments("1702"),
};

export const form1701: FormModule = {
  forms: ["1701", "1701A"],
  title: "1701 / 1701A — Annual Income Tax Return (individuals)",
  manualInputs: inputs1701,
  documentScope: "year_to_date",
  usesLedger: true,
  priorWithinPeriod: true,
  compute: compute1701,
  attachments: annualAttachments("1701"),
};
