import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { it, expect } from "vitest";
import { Form2307 } from "./form-2307";
import { forms2307, parsePeriod2307 } from "@/lib/books/form-2307";

it("prints the figures, the nature of payment and the signatory on the form", () => {
  const set = forms2307(
    {
      client: { id: "c", name: "Molo", tin: "111-222-333", rdo_code: null, registered_address: "Molo", taxpayer_type: "corporation" },
      settings: { zip_code: "5000", signatory_name: "Ana", signatory_title: "President" },
      books_start: null,
      months: [],
      locked_months: [],
      rows: [{ invoice_id: "i", issue_date: "2026-02-03", reference: "OR", party_id: null, party_name: "Sup", party_tin: "444-555-666", atc: "WC158", tax_code: "WC158", tax_code_name: null, tax_code_rate: null, income_payment: "1000", withholding: "10", payee: null }],
    },
    parsePeriod2307("2026-Q1")!,
    "quarter",
  );
  const html = renderToStaticMarkup(createElement(Form2307, { data: set.forms[0] }));
  expect(html).toContain("1,000.00");
  expect(html).toContain("ANA");
  expect(html).toContain("Top WA supplier - goods");
});
