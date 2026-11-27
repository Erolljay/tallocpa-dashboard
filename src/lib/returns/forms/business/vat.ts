/**
 * BIR Form 2550Q — Quarterly Value-Added Tax Return (April 2024 ENCS), with
 * its SLS / SLP (Summary List of Sales / Purchases) and SAWT attachments.
 *
 * Line structure and arithmetic ported from taxify 2550q.html (`generate` /
 * `recompute`): Part IV items 31–61, Part II items 15–26. In taxify the
 * figures came from Manager tax codes; here they come from the approved
 * sales invoices and purchase receipts (VATable / exempt / zero-rated / VAT),
 * and creditable VAT withheld (item 16, Schedule 3) from 2307s received with
 * a WV ATC.
 */
import type { AttachmentFile, Centavos, FormModule, ManualInput, SourceDocument, WorksheetContext, WorksheetResult } from "../../types";
import { vatRate } from "../../rates";
import { buildSawt, sawtAttachments, sawtSchedule } from "./sawt";
import {
  Inputs, MONTH_NAMES, amountInput, crlf, csv, datDate, docLabel, docsWithin, filerOf, filerWarnings, labelsOf, line, monthEnd, monthKeyOf, ownerNameInputs, pct, peso,
  plain, qd, quarterOf, stripSpecial, sum, tinDashed, tin9, tinDigits, uncodedErrors, vatSplit,
  withoutZip,
} from "./util";

const FORM = "2550Q";

const AMOUNT_INPUTS: [string, string, string?][] = [
  ["purchases_capital_goods", "VATable purchases that are capital goods (net of VAT)", "Receipts don't say what was bought. Enter the part of this quarter's VATable purchases that are capital goods; the rest is split between services (next) and other goods."],
  ["purchases_services", "VATable purchases that are services (net of VAT)", "Enter the part of this quarter's VATable purchases that are services; whatever is not capital goods or services counts as goods other than capital goods."],
  ["output_vat_uncollected", "Output VAT on uncollected receivables (Item 35)"],
  ["output_vat_recovered", "Output VAT on recovered uncollected receivables (Item 36)"],
  ["input_tax_carried_over", "Input tax carried over from previous quarter (Item 38)", "Leave blank to use the excess input tax on the previous quarter's worksheet, if any."],
  ["input_tax_deferred_prior", "Input tax deferred on capital goods > ₱1M from previous quarter (Item 39)"],
  ["transitional_input_tax", "Transitional input tax (Item 40)"],
  ["presumptive_input_tax", "Presumptive input tax (Item 41)"],
  ["other_input_tax", "Other allowable input tax (Item 42)"],
  ["input_tax_deferred_next", "Input tax on capital goods > ₱1M deferred to succeeding period (Item 52)"],
  ["input_tax_exempt_sales", "Input tax attributable to VAT-exempt sales (Item 53)"],
  ["vat_refund_tcc", "VAT refund / TCC claimed (Item 54)"],
  ["input_vat_unpaid_payables", "Input VAT on unpaid payables (Item 55)"],
  ["other_input_deductions", "Other deductions from input tax (Item 56)"],
  ["input_vat_settled_payables", "Input VAT on settled unpaid payables previously deducted (Item 58)"],
  ["advance_vat_payments", "Advance VAT payments (Item 17)"],
  ["amended_vat_paid", "VAT paid in return previously filed, if amended (Item 18)"],
  ["other_credits", "Other credits / payments (Item 19)"],
  ["surcharge", "Surcharge (Item 22)"],
  ["interest", "Interest (Item 23)"],
  ["compromise", "Compromise (Item 24)"],
];

function inputsFor(ctx: Pick<WorksheetContext, "client">): ManualInput[] {
  return [...AMOUNT_INPUTS.map(([k, l, h]) => amountInput(k, l, h)), ...ownerNameInputs(ctx)];
}

// ── SLS / SLP rows (taxify reports/sls-report.js buildSLSRows / buildSLPRows) ──

export interface SlsRow {
  monthKey: string;
  /** Month-end date "YYYY-MM-DD". */
  date: string;
  name: string;
  tin: string;
  address: string;
  /** The party's ZIP code from the parties directory ("" when not on file): DAT address 2. */
  zip: string;
  taxable: Centavos;
  zeroRated: Centavos;
  exempt: Centavos;
  vat: Centavos;
  txnCount: number;
}

export interface SlpRow extends Omit<SlsRow, "taxable"> {
  capGoods: Centavos;
  otherGoods: Centavos;
  services: Centavos;
}

interface Split {
  doc: SourceDocument;
  vatable: Centavos;
  vat: Centavos;
  exempt: Centavos;
  zeroRated: Centavos;
}

/** The SLS line for sales to customers with no TIN (walk-in sales; Owner, 26 November 2026). */
export const VARIOUS_CUSTOMERS = "VARIOUS CUSTOMERS";

/**
 * Groups per party (same TIN = same taxpayer, as in taxify; else by name) per month. With
 * `various`, parties with no TIN (walk-in customers on the SLS) are one line per month,
 * "VARIOUS CUSTOMERS", as the BIR's validation module accepts; the SLP has no such line.
 */
function groupByPartyMonth(splits: Split[], various = false) {
  const groups = new Map<string, { monthKey: string; doc: SourceDocument; vatable: number; vat: number; exempt: number; zeroRated: number; txnCount: number; cap: number; svc: number }>();
  for (const s of splits) {
    if (s.vatable + s.exempt + s.zeroRated === 0) continue;
    const mk = monthKeyOf(s.doc);
    const tin = tinDigits(s.doc.partyTin).substring(0, 9);
    const walkIn = various && tin.length < 9;
    const key = walkIn ? `various|${mk}` : `${tin || "n:" + (s.doc.partyName ?? "").trim().toUpperCase()}|${mk}`;
    const doc = walkIn ? { ...s.doc, partyName: VARIOUS_CUSTOMERS, partyTin: null, partyAddress: null } : s.doc;
    const g = groups.get(key) ?? { monthKey: mk, doc, vatable: 0, vat: 0, exempt: 0, zeroRated: 0, txnCount: 0, cap: 0, svc: 0 };
    g.vatable += s.vatable;
    // The register's SLP category of the line (capital goods, services), when known.
    if (s.doc.slpCategory === "capital_goods") g.cap += s.vatable;
    else if (s.doc.slpCategory === "services") g.svc += s.vatable;
    g.vat += s.vat;
    g.exempt += s.exempt;
    g.zeroRated += s.zeroRated;
    g.txnCount++;
    groups.set(key, g);
  }
  return [...groups.values()]
    .map((g) => ({ ...g, date: monthEnd(g.monthKey), name: g.doc.partyName ?? "", tin: g.doc.partyTin ?? "", address: g.doc.partyAddress ?? "", zip: g.doc.partyZip ?? "" }))
    .sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name));
}

/** Splits `total` over `weights` in proportion, largest remainder, so the parts add up exactly. */
function allocate(total: Centavos, weights: Centavos[]): Centavos[] {
  const w = sum(weights);
  if (w <= 0 || total === 0) return weights.map(() => 0);
  const raw = weights.map((x) => (total * x) / w);
  const out = raw.map(Math.floor);
  let rest = total - sum(out);
  const order = raw.map((r, i) => [r - Math.floor(r), i] as const).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  for (const [, i] of order) {
    if (rest <= 0) break;
    out[i]++;
    rest--;
  }
  return out;
}

// ── Computation ────────────────────────────────────────────

interface VatData {
  result: WorksheetResult;
  sls: SlsRow[];
  slp: SlpRow[];
}

function computeAll(ctx: WorksheetContext): VatData {
  const manual = inputsFor(ctx);
  const inp = new Inputs(ctx.inputs, labelsOf(manual));
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!ctx.client.vatRegistered) warnings.push("The client is not marked VAT-registered; check that a 2550Q is really due.");

  const { periodStart, periodEnd } = ctx.filing;
  const docs = docsWithin(ctx.documents, periodStart, periodEnd);
  const books = ctx.source === "books";
  errors.push(...uncodedErrors(docs));

  const split = (d: SourceDocument, side: "sale" | "purchase"): Split => {
    const rate = vatRate(d.month);
    const s = vatSplit(d, side, rate);
    if (s.assumption) warnings.push(`${docLabel(d)}: ${s.assumption}.`);
    else if (s.vatable > 0 && Math.abs(s.vat - pct(s.vatable, rate)) > 100)
      warnings.push(`${docLabel(d)}: VAT ₱${peso(s.vat)} is not ${rate}% of the VATable amount ₱${peso(s.vatable)}; check the OCR figures.`);
    if (s.vat > 0 && s.vatable === 0) warnings.push(`${docLabel(d)}: VAT without a VATable amount; check the OCR figures.`);
    // A sale with no customer TIN goes on the SLS under VARIOUS CUSTOMERS; a purchase needs the supplier's TIN.
    if (side === "purchase" && (s.vatable > 0 || s.vat > 0) && tinDigits(d.partyTin).length < 9)
      errors.push(`${docLabel(d)} is VATable but has no supplier TIN; the SLP needs one. ${d.fromBooks ? "Add it to the invoice in the Books." : "Add it in review."}`);
    return { doc: d, ...s };
  };
  const sales = docs.filter((d) => d.docType === "sales_invoice").map((d) => split(d, "sale"));
  const purchases = docs.filter((d) => d.docType === "purchase_receipt").map((d) => split(d, "purchase"));
  const nonVatSales = sum(docs.filter((d) => d.docType === "sales_invoice").map((d) => d.nonVat ?? 0));
  if (nonVatSales > 0) warnings.push(`Sales Invoices carry ₱${peso(nonVatSales)} of Non-VAT Sales (NVS), which is on no VAT return; a VAT-registered client codes its sales VATable, exempt or zero-rated.`);

  // Part IV — sales and output tax.
  const vatableSales = sum(sales.map((s) => s.vatable));
  const outputTax = sum(sales.map((s) => s.vat));
  const zeroRated = sum(sales.map((s) => s.zeroRated));
  const exemptSales = sum(sales.map((s) => s.exempt));
  const totalSales = vatableSales + zeroRated + exemptSales;
  const i35 = inp.amount("output_vat_uncollected");
  const i36 = inp.amount("output_vat_recovered");
  const i37 = outputTax - i35 + i36;

  // Purchases: the goods / services / capital-goods split is typed in, or taken from the
  // register lines' SLP categories (capital goods for property and equipment accounts).
  const vatablePurch = sum(purchases.map((s) => s.vatable));
  const inputTax = sum(purchases.map((s) => s.vat));
  const purZero = sum(purchases.map((s) => s.zeroRated));
  const purExempt = sum(purchases.map((s) => s.exempt));
  const capEntered = inp.optionalAmount("purchases_capital_goods");
  const svcEntered = inp.optionalAmount("purchases_services");
  const catTotal = (cat: "capital_goods" | "services") => sum(purchases.filter((s) => s.doc.slpCategory === cat).map((s) => s.vatable));
  // From the Books every purchase line has its SLP column by its tax code.
  const fromLines = capEntered == null && svcEntered == null && (books || purchases.some((s) => s.doc.slpCategory === "capital_goods" || s.doc.slpCategory === "services"));
  let capGoods = capEntered ?? (fromLines ? catTotal("capital_goods") : 0);
  let services = svcEntered ?? (fromLines ? catTotal("services") : 0);
  if (capEntered == null && svcEntered == null && vatablePurch > 0 && !fromLines)
    warnings.push("All VATable purchases are treated as goods other than capital goods. Enter the capital-goods and services amounts to split them (SLP columns; capital goods over ₱1M may need deferral, Items 39/52).");
  if (capGoods + services > vatablePurch) {
    errors.push(`Capital goods (₱${peso(capGoods)}) plus services (₱${peso(services)}) exceed the VATable purchases on the receipts (₱${peso(vatablePurch)}).`);
    capGoods = 0;
    services = 0;
  }
  const otherGoods = vatablePurch - capGoods - services;
  // Input tax follows the same proportions as the purchases.
  const [capInput, svcInput, otherInput] = allocate(inputTax, [capGoods, services, otherGoods]);
  const totalCurInTax = inputTax;
  const totalCurPurch = vatablePurch + purZero + purExempt;

  // Carry-over from the previous quarter (taxify left it for "a future phase"; here: typed, else the previous worksheet).
  let i38 = inp.optionalAmount("input_tax_carried_over");
  let i38Basis = "Typed in.";
  if (i38 == null && ctx.vatCarryOver !== undefined) {
    // The previous 2550Q, across taxable years (database function vat_carry_over).
    const co = ctx.vatCarryOver;
    i38 = co?.computed ? co.excess : 0;
    if (!co) i38Basis = "No earlier 2550Q on file.";
    else if (!co.computed) {
      i38Basis = `The ${co.periodLabel} 2550Q has no saved worksheet.`;
      warnings.push(`The ${co.periodLabel} 2550Q has no saved worksheet, so no input tax is carried over; save it, or enter Item 38 as filed.`);
    } else {
      i38Basis = `Excess input tax on the ${co.periodLabel} 2550Q worksheet${co.filed ? "" : " (not filed yet)"}.`;
      if (!co.filed && co.excess > 0) warnings.push(`The ${co.periodLabel} 2550Q is not filed yet; the carry-over (Item 38) is its worksheet's excess input tax and changes if that return does.`);
    }
  }
  if (i38 == null) {
    const prior = quarterOf(ctx) > 1 ? ctx.priorFigures[FORM]?.excess_input_tax : undefined;
    i38 = prior ?? 0;
    i38Basis = prior != null ? "Excess input tax on the previous quarter's worksheet." : "Nothing carried over (first quarter of the year or no previous worksheet) — enter it if there was excess input tax.";
    if (prior == null) warnings.push("No input tax carried over from the previous quarter was found; enter Item 38 if the previous return showed excess input tax.");
  }
  const [i39, i40, i41, i42] = ["input_tax_deferred_prior", "transitional_input_tax", "presumptive_input_tax", "other_input_tax"].map((k) => inp.amount(k));
  const i43 = i38 + i39 + i40 + i41 + i42;
  const i51 = i43 + totalCurInTax;
  const [i52, i53, i54, i55, i56] = ["input_tax_deferred_next", "input_tax_exempt_sales", "vat_refund_tcc", "input_vat_unpaid_payables", "other_input_deductions"].map((k) => inp.amount(k));
  const i57 = i52 + i53 + i54 + i55 + i56;
  const i58 = inp.amount("input_vat_settled_payables");
  const i59 = i57 + i58;
  const i60 = i51 - i59;
  const i61 = i37 - i60;
  if (exemptSales > 0 && totalCurInTax > 0 && i53 === 0)
    warnings.push("There are VAT-exempt sales and input tax this quarter; input tax attributable to exempt sales (Item 53, Schedule 2) is 0 — allocate it if it can't be traced to VATable sales.");

  // Part II.
  const sawt = buildSawt(docs, ["vat"]);
  errors.push(...sawt.errors);
  warnings.push(...sawt.warnings);
  const i16 = sawt.total;
  const [i17, i18, i19] = ["advance_vat_payments", "amended_vat_paid", "other_credits"].map((k) => inp.amount(k));
  const i20 = i16 + i17 + i18 + i19;
  const i21 = i61 - i20;
  const [i22, i23, i24] = ["surcharge", "interest", "compromise"].map((k) => inp.amount(k));
  const i25 = i22 + i23 + i24;
  const i26 = i21 + i25;
  errors.push(...inp.errors);
  if (sales.length + purchases.length > 0) warnings.push(...filerWarnings(ctx));

  // SLS / SLP rows.
  const sls: SlsRow[] = groupByPartyMonth(sales, true).map((g) => ({
    monthKey: g.monthKey, date: g.date, name: g.name, tin: g.tin, address: g.address, zip: g.zip,
    taxable: g.vatable, zeroRated: g.zeroRated, exempt: g.exempt, vat: g.vat, txnCount: g.txnCount,
  }));
  const slpGroups = groupByPartyMonth(purchases);
  // From the lines' categories each supplier keeps its own amounts; typed totals are spread in proportion.
  const capParts = fromLines && capGoods === catTotal("capital_goods") ? slpGroups.map((g) => g.cap) : allocate(capGoods, slpGroups.map((g) => g.vatable));
  const svcParts = fromLines && services === catTotal("services") ? slpGroups.map((g) => g.svc) : allocate(services, slpGroups.map((g) => g.vatable));
  const slp: SlpRow[] = slpGroups.map((g, i) => ({
    monthKey: g.monthKey, date: g.date, name: g.name, tin: g.tin, address: g.address, zip: g.zip,
    capGoods: capParts[i], services: svcParts[i], otherGoods: g.vatable - capParts[i] - svcParts[i],
    zeroRated: g.zeroRated, exempt: g.exempt, vat: g.vat, txnCount: g.txnCount,
  }));
  if ((capGoods > 0 || services > 0) && slpGroups.length > 1 && !fromLines)
    warnings.push("On the SLP, the capital-goods and services amounts are spread over suppliers in proportion to their VATable purchases; adjust per supplier if needed.");

  const result: WorksheetResult = {
    sections: [
      {
        title: "Part IV — Sales and output tax",
        lines: [
          line("vatable_sales", "31A", "VATable sales", vatableSales, { basis: books ? `${sales.length} Sales Invoice(s) in the Books, by tax code (Output VAT 12%).` : `${sales.length} approved sales invoice(s) in the quarter.` }),
          line("output_tax", "31B", "Output tax on VATable sales", outputTax),
          line("zero_rated_sales", "32A", "Zero-rated sales", zeroRated),
          line("exempt_sales", "33A", "Exempt sales", exemptSales),
          line("total_sales", "34A", "Total sales", totalSales, { emphasis: "subtotal" }),
          line("total_output_tax", "34B", "Total output tax due", outputTax, { emphasis: "subtotal" }),
          line("output_vat_uncollected", "35B", "Less: Output VAT on uncollected receivables", i35),
          line("output_vat_recovered", "36B", "Add: Output VAT on recovered uncollected receivables", i36),
          line("adjusted_output_tax", "37B", "Total adjusted output tax due (34B − 35B + 36B)", i37, { emphasis: "total" }),
        ],
      },
      {
        title: "Part IV — Allowable input tax",
        lines: [
          line("input_tax_carried_over", "38B", "Input tax carried over from previous quarter", i38, { basis: i38Basis }),
          line("input_tax_deferred_prior", "39B", "Input tax deferred on capital goods > ₱1M from previous quarter", i39),
          line("transitional_input_tax", "40B", "Transitional input tax", i40),
          line("presumptive_input_tax", "41B", "Presumptive input tax", i41),
          line("other_input_tax", "42B", "Others", i42),
          line("total_prior_input_tax", "43B", "Total (38B to 42B)", i43, { emphasis: "subtotal" }),
          line("domestic_purchases", "44A", "Domestic purchases (goods & services)", vatablePurch, {
            basis: `Capital goods ₱${peso(capGoods)}, services ₱${peso(services)}, other goods ₱${peso(otherGoods)}.`,
          }),
          line("domestic_purchases_input_tax", "44B", "Input tax on domestic purchases", totalCurInTax, {
            basis: `Capital goods ₱${peso(capInput)}, services ₱${peso(svcInput)}, other goods ₱${peso(otherInput)}.`,
          }),
          line("zero_rated_purchases", "48A", "Domestic purchases with no input tax (zero-rated)", purZero),
          line("exempt_purchases", "49A", "VAT-exempt purchases", purExempt),
          line("total_current_purchases", "50A", "Total current purchases", totalCurPurch, { emphasis: "subtotal", basis: books ? `Purchase Invoices in the Books by tax code (ND, NR and Non-VAT lines are on no VAT return).` : `${purchases.length} approved purchase receipt(s) in the quarter.` }),
          line("total_current_input_tax", "50B", "Total current input tax", totalCurInTax, { emphasis: "subtotal" }),
          line("total_available_input_tax", "51B", "Total available input tax (43B + 50B)", i51, { emphasis: "subtotal" }),
          line("input_tax_deferred_next", "52B", "Input tax on capital goods > ₱1M deferred for succeeding period", i52),
          line("input_tax_exempt_sales", "53B", "Input tax attributable to VAT-exempt sales", i53),
          line("vat_refund_tcc", "54B", "VAT refund / TCC claimed", i54),
          line("input_vat_unpaid_payables", "55B", "Input VAT on unpaid payables", i55),
          line("other_input_deductions", "56B", "Others", i56),
          line("total_input_deductions", "57B", "Total deductions from input tax (52B to 56B)", i57, { emphasis: "subtotal" }),
          line("input_vat_settled_payables", "58B", "Add: Input VAT on settled unpaid payables previously deducted", i58),
          line("adjusted_input_deductions", "59B", "Adjusted deductions from input tax (57B + 58B)", i59, { emphasis: "subtotal" }),
          line("total_allowable_input_tax", "60B", "Total allowable input tax (51B − 59B)", i60, { emphasis: "total" }),
          line("net_vat_payable", "61B", "Net VAT payable / (excess input tax) (37B − 60B)", i61, { emphasis: "total" }),
        ],
      },
      {
        title: "Part II — Total tax payable",
        lines: [
          line("net_vat_payable_part2", "15", "Net VAT payable / (excess input tax) (Item 61)", i61),
          line("creditable_vat_withheld", "16", "Creditable VAT withheld (Schedule 3)", i16, { basis: books ? `${sawt.rows.length} SAWT row(s): VAT withheld (WV010 / WV020) on Sales Invoices.` : `${sawt.rows.length} SAWT row(s) from 2307s received with a WV ATC.` }),
          line("advance_vat_payments", "17", "Advance VAT payments", i17),
          line("amended_vat_paid", "18", "VAT paid in return previously filed, if amended", i18),
          line("other_credits", "19", "Other credits / payment", i19),
          line("total_credits", "20", "Total tax credits / payment (16 to 19)", i20, { emphasis: "subtotal" }),
          line("tax_still_payable", "21", "Tax still payable / (excess credits) (15 − 20)", i21, { emphasis: "total" }),
          line("surcharge", "22", "Surcharge", i22),
          line("interest", "23", "Interest", i23),
          line("compromise", "24", "Compromise", i24),
          line("total_penalties", "25", "Total penalties (22 to 24)", i25, { emphasis: "subtotal" }),
          line("total_amount_payable", "26", "TOTAL AMOUNT PAYABLE / (excess credits) (21 + 25)", i26, { emphasis: "payable" }),
          line("excess_input_tax", "—", "Excess input tax to carry over to the next quarter", Math.max(0, -i61), { basis: "Not a form line; read by the next quarter's worksheet as Item 38." }),
        ],
      },
    ],
    schedules: [
      {
        title: "Summary list of sales (SLS)",
        columns: [
          { key: "month", label: "Month" }, { key: "tin", label: "TIN" }, { key: "name", label: "Customer" },
          { key: "taxable", label: "Taxable", numeric: true }, { key: "zero", label: "Zero-rated", numeric: true }, { key: "exempt", label: "Exempt", numeric: true }, { key: "vat", label: "Output VAT", numeric: true },
        ],
        rows: sls.map((r) => ({ month: r.monthKey, tin: r.tin ? tinDashed(r.tin) : "", name: r.name, taxable: r.taxable, zero: r.zeroRated, exempt: r.exempt, vat: r.vat })),
      },
      {
        title: "Summary list of purchases (SLP)",
        columns: [
          { key: "month", label: "Month" }, { key: "tin", label: "TIN" }, { key: "name", label: "Supplier" },
          { key: "cap", label: "Capital goods", numeric: true }, { key: "other", label: "Other goods", numeric: true }, { key: "svc", label: "Services", numeric: true },
          { key: "zero", label: "Zero-rated", numeric: true }, { key: "exempt", label: "Exempt", numeric: true }, { key: "vat", label: "Input VAT", numeric: true },
        ],
        rows: slp.map((r) => ({ month: r.monthKey, tin: r.tin ? tinDashed(r.tin) : "", name: r.name, cap: r.capGoods, other: r.otherGoods, svc: r.services, zero: r.zeroRated, exempt: r.exempt, vat: r.vat })),
      },
      sawtSchedule("Schedule 3 — Creditable VAT withheld", sawt.rows),
    ],
    errors,
    warnings,
    documentIds: [...new Set([...sales.map((s) => s.doc.id), ...purchases.map((s) => s.doc.id), ...sawt.documentIds])],
  };
  return { result, sls, slp };
}

// ── SLS / SLP files (taxify reports/sls-report.js exportDAT / exportExcel) ──

/** One month's SLS or SLP DAT in the BIR RELIEF layout. */
export function slDat(ctx: WorksheetContext, type: "sls" | "slp", mk: string, rows: (SlsRow | SlpRow)[]): AttachmentFile {
  const f = filerOf(ctx);
  const [ln, fn, mn] = f.isIndividual ? [f.lastName, f.firstName, f.middleName].map((v) => v.toUpperCase()) : ["", "", ""];
  const regName = stripSpecial(f.name).toUpperCase();
  const addr1 = stripSpecial(withoutZip(f.address, f.zip)).toUpperCase();
  const addr2 = f.zip;
  const dateStr = datDate(monthEnd(mk));
  const lines: string[] = [];
  const party = (r: SlsRow | SlpRow) => [`"${tin9(r.tin)}"`, qd(stripSpecial(r.name).toUpperCase()), "", "", "", qd(stripSpecial(withoutZip(r.address, r.zip)).toUpperCase()), qd(r.zip)];
  if (type === "sls") {
    const rs = rows as SlsRow[];
    lines.push(
      ["H", "S", `"${f.tin9}"`, '""', `"${ln}"`, `"${fn}"`, `"${mn}"`, `"${regName}"`, `"${addr1}"`, `"${addr2}"`,
        plain(sum(rs.map((r) => r.exempt))), plain(sum(rs.map((r) => r.zeroRated))), plain(sum(rs.map((r) => r.taxable))), plain(sum(rs.map((r) => r.vat))),
        f.rdo, dateStr, f.fiscalMonthEnd].join(","),
    );
    for (const r of rs) lines.push(["D", "S", ...party(r), plain(r.exempt), plain(r.zeroRated), plain(r.taxable), plain(r.vat), `"${f.tin9}"`, datDate(r.date)].join(","));
  } else {
    const rs = rows as SlpRow[];
    const vat = plain(sum(rs.map((r) => r.vat)));
    lines.push(
      ["H", "P", `"${f.tin9}"`, '""', `"${ln}"`, `"${fn}"`, `"${mn}"`, `"${regName}"`, `"${addr1}"`, `"${addr2}"`,
        plain(sum(rs.map((r) => r.exempt))), plain(sum(rs.map((r) => r.zeroRated))), plain(sum(rs.map((r) => r.services))), plain(sum(rs.map((r) => r.capGoods))),
        plain(sum(rs.map((r) => r.otherGoods))), vat, vat, plain(0), f.rdo, dateStr, f.fiscalMonthEnd].join(","),
    );
    for (const r of rs)
      lines.push(["D", "P", ...party(r), plain(r.exempt), plain(r.zeroRated), plain(r.services), plain(r.capGoods), plain(r.otherGoods), plain(r.vat), `"${f.tin9}"`, datDate(r.date)].join(","));
  }
  return { fileName: `${f.tin9}${type === "sls" ? "S" : "P"}${mk.slice(5, 7)}${mk.slice(0, 4)}.DAT`, contentType: "text/plain", body: crlf(lines) };
}

/** The Excel layout of the SLS or SLP ("Reconciliation of Listing for Enforcement"), as CSV. */
export function slCsv(ctx: WorksheetContext, type: "sls" | "slp", rows: (SlsRow | SlpRow)[]): AttachmentFile {
  const f = filerOf(ctx);
  const isSLS = type === "sls";
  const ownerName = f.isIndividual && f.lastName ? [f.lastName, [f.firstName, f.middleName].filter(Boolean).join(" ")].filter(Boolean).join(", ") : f.name;
  const data: (string | number | null)[][] = [
    [isSLS ? "SALES TRANSACTION" : "PURCHASE TRANSACTION"],
    ["RECONCILIATION OF LISTING FOR ENFORCEMENT"],
    [], [], [],
    [`TIN : ${tinDashed(ctx.client.tin)}`],
    [`OWNER'S NAME: ${ownerName.toUpperCase()}`],
    [`OWNER'S TRADE NAME : ${f.name.toUpperCase()}`],
    [`OWNER'S ADDRESS: ${f.address.toUpperCase()}`],
    [],
  ];
  const tot = Array<number>(9).fill(0);
  const add = (vals: number[]) => vals.forEach((v, i) => (tot[i] += v));
  if (isSLS) {
    data.push(["TAXABLE", "TAXPAYER", "REGISTERED NAME", "NAME OF CUSTOMER", "CUSTOMER'S ADDRESS", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF"]);
    data.push(["MONTH", "IDENTIFICATION", "", "(Last Name, First Name, Middle Name)", "", "GROSS SALES", "EXEMPT SALES", "ZERO RATED SALES", "TAXABLE SALES", "OUTPUT TAX", "GROSS TAXABLE SALES"]);
    data.push(["", "NUMBER", "", "", "", "", "", "", "", "", ""]);
    data.push(["(1)", "(2)", "(3)", "(4)", "(5)", "(6)", "(7)", "(8)", "(9)", "(10)", "(11)"]);
    for (const r of rows as SlsRow[]) {
      const vals = [r.exempt + r.zeroRated + r.taxable, r.exempt, r.zeroRated, r.taxable, r.vat, r.taxable + r.vat];
      add(vals);
      data.push([datDate(r.date), tinDashed(r.tin), r.name.toUpperCase(), "", r.address.toUpperCase(), ...vals.map(plain)]);
    }
    data.push(["", "", "", "", "Grand Total :", ...tot.slice(0, 6).map(plain)]);
  } else {
    data.push(["TAXABLE", "TAXPAYER", "REGISTERED NAME", "NAME OF SUPPLIER", "SUPPLIER'S ADDRESS", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF", "AMOUNT OF"]);
    data.push(["MONTH", "IDENTIFICATION", "", "(Last Name, First Name, Middle Name)", "", "GROSS PURCHASE", "EXEMPT PURCHASE", "ZERO-RATED PURCHASE", "TAXABLE PURCHASE", "PURCHASE OF SERVICES", "PURCHASE OF CAPITAL GOODS", "PURCHASE OF GOODS OTHER THAN CAPITAL GOODS", "INPUT TAX", "GROSS TAXABLE PURCHASE"]);
    data.push(["", "NUMBER", "", "", "", "", "", "", "", "", "", "", "", ""]);
    data.push(["(1)", "(2)", "(3)", "(4)", "(5)", "(6)", "(7)", "(8)", "(9)", "(10)", "(11)", "(12)", "(13)", "(14)"]);
    for (const r of rows as SlpRow[]) {
      const taxable = r.services + r.capGoods + r.otherGoods;
      const vals = [r.exempt + r.zeroRated + taxable, r.exempt, r.zeroRated, taxable, r.services, r.capGoods, r.otherGoods, r.vat, taxable + r.vat];
      add(vals);
      data.push([datDate(r.date), tinDashed(r.tin), r.name.toUpperCase(), "", r.address.toUpperCase(), ...vals.map(plain)]);
    }
    data.push(["", "", "", "", "Grand Total :", ...tot.map(plain)]);
  }
  data.push(["------------------"], ["=================="], ["END OF REPORT"]);
  const { periodStart, periodEnd } = ctx.filing;
  return { fileName: `${type.toUpperCase()}_${periodStart.slice(0, 7)}_${periodEnd.slice(0, 7)}.csv`, contentType: "text/csv; charset=utf-8", body: csv(data) };
}

function slAttachments(ctx: WorksheetContext, type: "sls" | "slp", rows: (SlsRow | SlpRow)[]) {
  if (!rows.length) return [];
  const label = type.toUpperCase();
  const months = [...new Set(rows.map((r) => r.monthKey))].sort();
  return [
    ...months.map((mk) => ({
      kind: `${type}_dat_${mk}`,
      label: `${label} DAT — ${MONTH_NAMES[Number(mk.slice(5, 7)) - 1]} ${mk.slice(0, 4)}`,
      build: () => slDat(ctx, type, mk, rows.filter((r) => r.monthKey === mk)),
    })),
    { kind: `${type}_csv`, label: `${label} (Excel CSV)`, build: () => slCsv(ctx, type, rows) },
  ];
}

export const form2550Q: FormModule = {
  forms: [FORM],
  title: "2550Q — Quarterly Value-Added Tax Return",
  manualInputs: inputsFor,
  compute: (ctx) => computeAll(ctx).result,
  attachments(ctx) {
    const { sls, slp } = computeAll(ctx);
    const sawt = buildSawt(docsWithin(ctx.documents, ctx.filing.periodStart, ctx.filing.periodEnd), ["vat"]);
    return [...slAttachments(ctx, "sls", sls), ...slAttachments(ctx, "slp", slp), ...sawtAttachments(ctx, FORM, sawt, ctx.filing.periodStart, ctx.filing.periodEnd)];
  },
};
