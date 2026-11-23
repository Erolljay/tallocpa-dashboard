/**
 * BIR Form 2316 (Certificate of Compensation Payment / Tax Withheld) figures for
 * one employee and year. Ported from taxify.ph reports/2316-report.js
 * (`render2316Cert`): Part IV-A items 19–28 and Part IV-B items 29–52, with the
 * same treatment (MWE basic pay net of contributions in item 29; non-MWE basic
 * pay net of contributions in item 39; 13th month over the ceiling in item 48).
 */
import type { Centavos } from "@/lib/returns/types";
import { annualSummary } from "./compute";
import type { EmployeeYear } from "./year";

export interface Certificate2316 {
  items: { no: string; label: string; amount: Centavos }[];
  partA: { no: string; label: string; amount: Centavos }[];
  partB: { no: string; label: string; amount: Centavos }[];
  taxDue: Centavos;
  withheld: Centavos;
}

export function certificate2316(y: EmployeeYear, year: number): Certificate2316 {
  const isMwe = y.employee.isMwe;
  const s = annualSummary(y.lines, year);
  const sumL = (k: "l15" | "l17" | "l19" | "thirteenthExcess") => y.lines.reduce((a, l) => a + l[k], 0);
  const cat = (f: "basic" | "overtime" | "holidayPay" | "nightDifferential" | "hazardPay" | "deMinimis" | "otherTaxable" | "commission" | "profitShare" | "directorFee" | "separation") =>
    y.months.reduce((a, m) => a + (m ? m[f] : 0), 0);
  const contributions = sumL("l19");
  const [basic, ot, holiday, nd, hazard] = [cat("basic"), cat("overtime"), cat("holidayPay"), cat("nightDifferential"), cat("hazardPay")];

  const i29 = sumL("l15");
  const i30 = isMwe ? holiday : 0;
  const i31 = isMwe ? ot : 0;
  const i32 = isMwe ? nd : 0;
  const i33 = isMwe ? hazard : 0;
  const i34 = sumL("l17");
  const i35 = cat("deMinimis");
  const i36 = contributions;
  const i37 = cat("separation");
  const i38 = i29 + i30 + i31 + i32 + i33 + i34 + i35 + i36 + i37;
  const i39 = isMwe ? 0 : Math.max(0, basic - contributions);
  const i44 = cat("otherTaxable");
  const i45 = cat("commission");
  const i46 = cat("profitShare");
  const i47 = cat("directorFee");
  const i48 = sumL("thirteenthExcess");
  const i49 = isMwe ? 0 : hazard;
  const i50 = isMwe ? 0 : ot;
  const i51 = isMwe ? 0 : holiday + nd;
  const i52 = i39 + i44 + i45 + i46 + i47 + i48 + i49 + i50 + i51;

  return {
    items: [
      { no: "19", label: "Gross Compensation Income from Present Employer", amount: s.gross },
      { no: "20", label: "Less: Total Non-Taxable/Exempt Compensation Income", amount: i38 },
      { no: "21", label: "Taxable Compensation Income from Present Employer", amount: i52 },
      { no: "22", label: "Add: Taxable Compensation Income from Previous Employer", amount: 0 },
      { no: "23", label: "Gross Taxable Compensation Income", amount: s.taxable },
      { no: "24", label: "Tax Due", amount: s.taxDue },
      { no: "25A", label: "Amount of Taxes Withheld — Present Employer", amount: s.withheld },
      { no: "25B", label: "Amount of Taxes Withheld — Previous Employer", amount: 0 },
      { no: "26", label: "Total Amount of Taxes Withheld as Adjusted", amount: s.withheld },
      { no: "27", label: "5% Tax Credit (PERA Act of 2008)", amount: 0 },
      { no: "28", label: "Total Taxes Withheld", amount: s.withheld },
    ],
    partA: [
      { no: "29", label: "Basic Salary (incl. exempt ₱250,000 & below) or SMW of the MWE", amount: i29 },
      { no: "30", label: "Holiday Pay (MWE)", amount: i30 },
      { no: "31", label: "Overtime Pay (MWE)", amount: i31 },
      { no: "32", label: "Night Shift Differential (MWE)", amount: i32 },
      { no: "33", label: "Hazard Pay (MWE)", amount: i33 },
      { no: "34", label: "13th Month Pay and Other Benefits (max. ₱90,000)", amount: i34 },
      { no: "35", label: "De Minimis Benefits", amount: i35 },
      { no: "36", label: "SSS, GSIS, PHIC & HDMF Contributions and Union Dues (employee share)", amount: i36 },
      { no: "37", label: "Salaries and Other Forms of Compensation", amount: i37 },
      { no: "38", label: "Total Non-Taxable/Exempt Compensation Income", amount: i38 },
    ],
    partB: [
      { no: "39", label: "Basic Salary", amount: i39 },
      { no: "44A", label: "Others — Other Taxable Compensation", amount: i44 },
      { no: "45", label: "Commission", amount: i45 },
      { no: "46", label: "Profit Sharing", amount: i46 },
      { no: "47", label: "Fees Including Director's Fees", amount: i47 },
      { no: "48", label: "Taxable 13th Month Benefits", amount: i48 },
      { no: "49", label: "Hazard Pay", amount: i49 },
      { no: "50", label: "Overtime Pay", amount: i50 },
      { no: "51A", label: "Others — Holiday Pay / Night Shift Differential", amount: i51 },
      { no: "52", label: "Total Taxable Compensation Income", amount: i52 },
    ],
    taxDue: s.taxDue,
    withheld: s.withheld,
  };
}
