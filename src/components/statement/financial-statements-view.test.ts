import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { buildStatements, type StatementRow } from "@/lib/ledger/statements";
import { FinancialStatementsView } from "./financial-statements-view";

const row = (code: string, name: string, fsLine: string, opening: number, move: number): StatementRow => ({
  code, name, fsLine, opening: opening * 100, debit: Math.max(move, 0) * 100, credit: Math.max(-move, 0) * 100, closing: (opening + move) * 100,
});

describe("FinancialStatementsView", () => {
  it("renders the statements, columns and notes", () => {
    const fs = buildStatements({
      kind: "monthly",
      periodStart: "2027-02-01",
      periodEnd: "2027-02-28",
      yearStart: "2027-01-01",
      client: { name: "Client A Corp.", tin: "123-456-789-000", address: "Iloilo City" },
      year: [row("1010", "Cash", "cash_and_equivalents", 100_000, 5_000), row("3010", "Share Capital", "share_capital", -100_000, 0), row("4010", "Sales", "revenue", 0, -8_000), row("6040", "Rent", "operating_expenses", 0, 3_000)],
      period: [row("4010", "Sales", "revenue", -3_000, -5_000), row("6040", "Rent", "operating_expenses", 1_000, 2_000)],
    });
    const html = renderToStaticMarkup(createElement(FinancialStatementsView, { fs }));
    for (const text of ["Client A Corp.", "For the month ended February 28, 2027", "Statement of Financial Position", "Statement of Comprehensive Income", "Statement of Changes in Equity", "Notes to the financial statements", "February 2027", "Year to date", "105,000.00", "6040 Rent", "NET INCOME (LOSS)"]) {
      expect(html).toContain(text);
    }
  });
});
