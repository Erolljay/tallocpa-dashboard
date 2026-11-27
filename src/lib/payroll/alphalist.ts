/**
 * BIR Form 1604-C alphalist of employees: Schedule 1 (other than minimum wage
 * earners) and Schedule 2 (MWEs), the DAT file and the Excel layout. Ported from
 * taxify.ph reports/alphalist-report.js (`generateAlphalist`, `alphaCols`,
 * `exportAlphalistDat`, `exportAlphalistExcel`). The DAT field order, quoting,
 * defaults and CRLF line ends are taxify's, which the BIR validation module has
 * accepted. Deliberate differences, each marked "(differs from taxify)":
 *   - column 7b is the non-taxable 13th month pay (up to the ceiling), not the
 *     whole 13th month pay, so 7a = 7f + 7j still holds when it exceeds ₱90,000;
 *   - the DAT carries the employee's region and TIN branch (taxify left the region
 *     empty and wrote branch 0000);
 *   - tax withheld (15b) includes the entries' adjustments (refunds and corrections);
 *   - the Excel rows fill columns 13 and 15a, which taxify skipped, so every
 *     figure sits under its heading;
 *   - an employee's previous employer within the year (employee_prior_employers)
 *     fills the previous-employer columns: 13 = 7j + 12j, tax due (14) on that,
 *     15a its tax withheld, 17a/17b against 15a + 15b. taxify always wrote zeros.
 *     In the DAT the eleven previous-employer fields are written in the same order
 *     as the present employer's eleven (12a, 12e, 12b, 12c, 12d, 0.00, 12f, 12g,
 *     12h, 12i, 12j), with the non-taxable total in 12e/12f and the taxable total
 *     in 12i/12j, since only those totals are captured. Validate the DAT in the BIR
 *     module when a previous employer is present.
 * The Excel workbook is written as one CSV per schedule (Excel opens them).
 */
import { branch4 as branch4Of, branchOfTin, tin9, tinDashed } from "@/lib/parties/tin";
import { toDecimalString } from "@/lib/returns/money";
import type { AttachmentFile, Centavos } from "@/lib/returns/types";
import { annualSummary, type AnnualSummary } from "./compute";
import type { Employee } from "./types";
import { sortName, type EmployeeYear } from "./year";

export interface AlphalistRow extends AnnualSummary {
  employee: Employee;
  basic: Centavos;
  overtime: Centavos;
  holidayPay: Centavos;
  nightDifferential: Centavos;
  hazardPay: Centavos;
  /** All 13th month pay and other benefits paid. */
  thirteenthMonth: Centavos;
  /** The non-taxable part (up to the yearly ceiling). */
  thirteenthExempt: Centavos;
  /** The part over the ceiling (taxable). */
  thirteenthExcess: Centavos;
  deMinimis: Centavos;
  otherTaxable: Centavos;
  separation: Centavos;
  commission: Centavos;
  profitShare: Centavos;
  directorFee: Centavos;
  /** SSS + PhilHealth + Pag-IBIG, employee share. */
  contributions: Centavos;
  /** Previous employer within the year: non-taxable compensation (taxable and withheld are in the summary). */
  priorNonTaxable: Centavos;
}

export interface Alphalist {
  /** Schedule 1: employees other than MWEs. */
  schedule1: AlphalistRow[];
  /** Schedule 2: minimum wage earners. */
  schedule2: AlphalistRow[];
}

/** taxify generateAlphalist: one row per employee paid in the year, split by MWE status, sorted by name. */
export function buildAlphalist(years: EmployeeYear[], year: number): Alphalist {
  const schedule1: AlphalistRow[] = [];
  const schedule2: AlphalistRow[] = [];
  for (const y of years) {
    const summary = annualSummary(y.lines, year, y.prior);
    if (!summary.gross) continue;
    const cat = (f: keyof Omit<NonNullable<EmployeeYear["months"][number]>, "employeeId" | "payMonth" | "note">) =>
      y.months.reduce((a, m) => a + (m ? m[f] : 0), 0);
    const sumLines = (k: "l17" | "thirteenthExcess" | "l19") => y.lines.reduce((a, l) => a + l[k], 0);
    const row: AlphalistRow = {
      employee: y.employee,
      ...summary,
      basic: cat("basic"),
      overtime: cat("overtime"),
      holidayPay: cat("holidayPay"),
      nightDifferential: cat("nightDifferential"),
      hazardPay: cat("hazardPay"),
      thirteenthMonth: cat("thirteenthMonth"),
      thirteenthExempt: sumLines("l17"),
      thirteenthExcess: sumLines("thirteenthExcess"),
      deMinimis: cat("deMinimis"),
      otherTaxable: cat("otherTaxable"),
      separation: cat("separation"),
      commission: cat("commission"),
      profitShare: cat("profitShare"),
      directorFee: cat("directorFee"),
      contributions: sumLines("l19"),
      priorNonTaxable: y.prior?.nonTaxable ?? 0,
    };
    (y.employee.isMwe ? schedule2 : schedule1).push(row);
  }
  const cmp = (a: AlphalistRow, b: AlphalistRow) => sortName(a.employee).localeCompare(sortName(b.employee), "en");
  return { schedule1: schedule1.sort(cmp), schedule2: schedule2.sort(cmp) };
}

/** taxify alphaCols: the BIR columns for one row — previous employer 12a–12j, present employer 7a–7j, 13–18. */
export interface AlphaCols {
  c12a: Centavos; c12b: Centavos; c12c: Centavos; c12d: Centavos; c12e: Centavos; c12f: Centavos;
  c12g: Centavos; c12h: Centavos; c12i: Centavos; c12j: Centavos;
  c7a: Centavos; c7b: Centavos; c7c: Centavos; c7d: Centavos; c7e: Centavos; c7f: Centavos;
  c7g: Centavos; c7h: Centavos; c7i: Centavos; c7j: Centavos;
  c13: Centavos; c14: Centavos; c15a: Centavos; c15b: Centavos; c16: Centavos; c17a: Centavos; c17b: Centavos; c18: Centavos;
}

export function alphaCols(r: AlphalistRow): AlphaCols {
  const c7b = r.thirteenthExempt; // (differs from taxify: the non-taxable part only)
  const c7c = r.deMinimis;
  const c7d = r.contributions;
  const c7e = Math.max(0, r.nonTaxable - c7b - c7c - c7d);
  const c7f = c7b + c7c + c7d + c7e;
  const c7j = r.taxable;
  // Previous employer (differs from taxify, which left these zero): only its non-taxable and taxable totals are captured.
  const c12f = r.priorNonTaxable;
  const c12j = r.priorTaxable;
  const c15a = r.priorWithheld;
  const credited = c15a + r.withheld;
  return {
    c12a: c12f + c12j, c12b: 0, c12c: 0, c12d: 0, c12e: c12f, c12f, c12g: 0, c12h: 0, c12i: c12j, c12j,
    c7a: r.gross, c7b, c7c, c7d, c7e, c7f,
    c7g: 0, c7h: 0, c7i: c7j, c7j,
    c13: c7j + c12j, c14: r.taxDue, c15a, c15b: r.withheld, c16: 0,
    c17a: Math.max(0, r.taxDue - credited), c17b: Math.max(0, credited - r.taxDue), c18: 0,
  };
}

/** The eleven previous-employer DAT fields, in the order of the present employer's eleven. */
const prevDat = (c: Pick<AlphaCols, "c12a" | "c12b" | "c12c" | "c12d" | "c12e" | "c12f" | "c12g" | "c12h" | "c12i" | "c12j">) =>
  [c.c12a, c.c12e, c.c12b, c.c12c, c.c12d, 0, c.c12f, c.c12g, c.c12h, c.c12i, c.c12j].map(toDecimalString);

/** The withholding agent (the client) as the alphalist needs it. */
export interface AlphalistAgent {
  tin: string | null;
  name: string;
}

/** taxify tin9Alpha / tinDashed1601: the shared TIN helpers. */
export { tin9, tinDashed };

/**
 * Branch code as four digits (last four, zero-padded): from the TIN's digits after the
 * ninth (123-456-789-00002 → 0002), or from a branch code given on its own; "0000" when none.
 */
export function branch4(tinOrBranch: string | null | undefined, fromTin = true): string {
  return fromTin ? branchOfTin(tinOrBranch) : branch4Of(tinOrBranch);
}

/** taxify datDateAlpha: YYYY-MM-DD → MM/DD/YYYY ("" if empty). */
export function datDate(iso: string | null | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? "");
  return m ? `${m[2]}/${m[3]}/${m[1]}` : "";
}

const num = toDecimalString;
const quoted = (s: string | null | undefined) => `"${(s ?? "").replace(/"/g, "").toUpperCase()}"`;

/**
 * taxify exportAlphalistDat:
 *   H1604C,<agent TIN9>,<branch4>,12/31/<year>
 *   D1,1604C,<agent TIN9>,<branch4>,12/31/<year>,<seq>,<employee TIN9>,<branch4>,"<LAST>","<FIRST>","<MIDDLE>",<region>,
 *      <12a>,<12e>,<12b>,<12c>,<12d>,0.00,<12f>,<12g>,<12h>,<12i>,<12j> (previous employer; taxify: 11 × 0.00),<from>,<to>,<7a>,<7e>,<7b>,<7c>,<7d>,0.00,<7f>,<7g>,<7h>,<7i>,<7j>,
 *      <13>,<14>,<15a>,<15b>,<16>,<17a>,<17b>,<18>,<NATIONALITY>,<status>,<reason>,<Y|N>,0.00
 *   C1,1604C,<agent TIN9>,<branch4>,12/31/<year>,<Σ previous-employer fields>,<Σ7a>,<Σ7e>,<Σ7b>,<Σ7c>,<Σ7d>,0.00,<Σ7f>,[13 × 0.00]
 * Schedule 1 rows first, then Schedule 2, numbered in one sequence. File name <TIN9><branch4>1231<year>1604C.DAT.
 */
export function alphalistDat(list: Alphalist, agent: AlphalistAgent, year: number): AttachmentFile {
  const ourTin = tin9(agent.tin);
  const ourBranch = branch4(agent.tin);
  const asOf = `12/31/${year}`;
  const prevTot = { c12a: 0, c12b: 0, c12c: 0, c12d: 0, c12e: 0, c12f: 0, c12g: 0, c12h: 0, c12i: 0, c12j: 0 };
  const lines: string[] = [["H1604C", ourTin, ourBranch, asOf].join(",")];
  let totGross = 0, tot7e = 0, tot7b = 0, tot7c = 0, tot7d = 0, tot7f = 0;
  let seq = 0;
  for (const r of [...list.schedule1, ...list.schedule2]) {
    seq++;
    const c = alphaCols(r);
    const e = r.employee;
    totGross += c.c7a; tot7e += c.c7e; tot7b += c.c7b; tot7c += c.c7c; tot7d += c.c7d; tot7f += c.c7f;
    for (const k of Object.keys(prevTot) as (keyof typeof prevTot)[]) prevTot[k] += c[k];
    lines.push(
      [
        "D1", "1604C", ourTin, ourBranch, asOf,
        seq, tin9(e.tin), branch4(e.tinBranch, false),
        quoted(e.lastName), quoted(e.firstName), quoted(e.middleName),
        e.region ?? "",
        ...prevDat(c),
        datDate(e.hireDate) || `01/01/${year}`,
        datDate(e.separationDate) || `12/31/${year}`,
        num(c.c7a), num(c.c7e), num(c.c7b), num(c.c7c), num(c.c7d),
        "0.00", num(c.c7f),
        num(c.c7g), num(c.c7h), num(c.c7i), num(c.c7j),
        num(c.c13), num(c.c14), num(c.c15a), num(c.c15b),
        num(c.c16), num(c.c17a), num(c.c17b), num(c.c18),
        (e.nationality || "FILIPINO").toUpperCase(), e.employmentStatus || "R", e.separationReason ?? "NA",
        e.substitutedFiling ? "Y" : "N", "0.00",
      ].join(","),
    );
  }
  lines.push(
    [
      "C1", "1604C", ourTin, ourBranch, asOf,
      ...prevDat(prevTot),
      num(totGross), num(tot7e), num(tot7b), num(tot7c), num(tot7d),
      "0.00", num(tot7f),
      ...Array(13).fill("0.00"),
    ].join(","),
  );
  return {
    fileName: `${ourTin}${ourBranch}1231${year}1604C.DAT`,
    contentType: "text/plain; charset=utf-8",
    body: lines.join("\r\n") + "\r\n",
  };
}

function csvCell(v: string | number): string {
  if (typeof v === "number") return String(v);
  return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/** taxify exportAlphalistExcel, one schedule ("BIR FORM 1604C - SCHEDULE 1/2" sheet), as CSV. */
export function alphalistCsv(list: Alphalist, schedule: 1 | 2, agent: AlphalistAgent, year: number): AttachmentFile {
  const rows = schedule === 1 ? list.schedule1 : list.schedule2;
  const data: (string | number)[][] = [
    [`BIR FORM 1604C - SCHEDULE ${schedule}`],
    [schedule === 1 ? "ALPHABETICAL LIST EMPLOYEES (Declared and Certified using BIR Form No. 2316)" : "ALPHABETICAL LIST OF MINIMUM WAGE EARNERS (MWE)"],
    [`AS OF DECEMBER 31,${year}`],
    [],
    [`TIN : ${tinDashed(agent.tin)}-${branch4(agent.tin)}`],
    [],
    [`WITHHOLDING AGENT'S NAME: ${agent.name.toUpperCase()}`],
    [],
    [
      "SEQ", "NAME OF EMPLOYEES", "NATIONALITY/", "CURRENT EMPLOYMENT",
      "", "", "REASON OF", "GROSS", "13th MONTH PAY", "DE MINIMIS", "SSS, GSIS, PHIC &",
      "SALARIES (P250K & below) &", "TOTAL", "BASIC SALARY", "13th MONTH PAY", "SALARIES & OTHER",
      "TOTAL TAXABLE", "TAXPAYER", "EMPLOYMENT", "PERIOD OF", "", "TAX DUE", "AMOUNT OF TAX",
      "(Jan. - Dec.)", "PREVIOUS EMPLOYER", "PRESENT EMPLOYER", "AMT WITHHELD AND PAID FOR IN DECEMBER OR LAST SALARY",
      "OVER", "AMOUNT OF TAX", "SUBSTITUTED FILING",
    ],
    [
      "NO", "(Last Name, First Name, Middle Name)", "RESIDENT", "STATUS", "From", "To",
      "SEPARATION", "COMPENSATION", "& OTHER BENEFITS", "BENEFITS", "PAG-IBIG CONTRIBUTIONS",
      "OTHER FORMS OF", "NON-TAXABLE/EXEMPT", "(Net of SSS,GSIS,PHIC,", "& OTHER BENEFITS", "FORMS OF",
      "COMPENSATION INCOME", "IDENTIFICATION NUMBER", "STATUS", "", "", "COMPENSATION INCOME",
      "WITHHELD AS", "", "WITHHELD TAX", "WITHHELD TAX", "", "REFUNDED TO", "ADJUSTED", "YES/NO",
    ],
    [
      "", "(2a)(2b)(2c)", "(for foreigners only)", "(*)", "(5a)", "(5b)", "(**)", "7a=(7f+7j)",
      "(7b)", "(7c)", "(7d)", "(7e)", "7f=(7b+7c+7d+7e)", "(7g)", "(7h)", "(7i)", "7j=(7g+7h+7i)",
      "(8)", "(9)", "(10a)", "(10b)", "13=(7j+12j)", "(14)", "15a", "(15b)", "16", "17a", "17b", "(18)", "(19)",
    ],
  ];
  const tot = { c7a: 0, c7b: 0, c7c: 0, c7d: 0, c7e: 0, c7f: 0, c7j: 0, c13: 0, c14: 0, c15a: 0, c15b: 0, c17a: 0, c17b: 0 };
  rows.forEach((r, i) => {
    const c = alphaCols(r);
    const e = r.employee;
    for (const k of Object.keys(tot) as (keyof typeof tot)[]) tot[k] += c[k];
    data.push([
      i + 1,
      sortName(e),
      (e.nationality || "FILIPINO").toUpperCase(),
      e.employmentStatus || "R",
      datDate(e.hireDate),
      datDate(e.separationDate),
      e.separationReason ?? "NA",
      num(c.c7a), num(c.c7b), num(c.c7c), num(c.c7d), num(c.c7e), num(c.c7f),
      num(c.c7g), num(c.c7h), num(c.c7i), num(c.c7j),
      `${tinDashed(e.tin)}-${branch4(e.tinBranch, false)}`,
      "", "", "",
      num(c.c13), num(c.c14), num(c.c15a), num(c.c15b), num(c.c16), num(c.c17a), num(c.c17b), num(c.c18),
      e.substitutedFiling ? "Y" : "N",
    ]);
  });
  data.push([
    "Grand Total :", "", "", "", "", "", "",
    num(tot.c7a), num(tot.c7b), num(tot.c7c), num(tot.c7d), num(tot.c7e), num(tot.c7f), "0.00", "0.00", num(tot.c7j), num(tot.c7j),
    "", "", "", "",
    num(tot.c13), num(tot.c14), num(tot.c15a), num(tot.c15b), "0.00", num(tot.c17a), num(tot.c17b), "0.00", "",
  ]);
  data.push(["------------------"]);
  data.push(["=================="]);
  data.push(["END OF REPORT"]);
  return {
    fileName: `1604C_Alphalist_${year}_Schedule${schedule}.csv`,
    contentType: "text/csv; charset=utf-8",
    body: "﻿" + data.map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n",
  };
}
