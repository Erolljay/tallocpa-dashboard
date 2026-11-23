/**
 * BIR Form 0619-E — Monthly Remittance Form of Creditable Income Taxes Withheld
 * (Expanded). Ported from taxify.ph reports/0619e-report.js (`render0619E`):
 * same items 5–10 and 14–18. The remittance is the tax withheld on the 2307s
 * the client issued in the month, all ATCs together (0619-E has no ATC
 * schedule; the breakdown is for the file only).
 */
import { backgroundLines, penaltyLines, PENALTY_INPUTS, readNonNegative } from "../../inputs";
import type { FormModule, ManualInput, WorksheetContext, WorksheetResult } from "../../types";
import { atcSchedule, detailSchedule, ewtLines, totalsByAtc } from "./ewt";
import { agentBackground, agentErrors } from "./agent";

const PREVIOUSLY_REMITTED: ManualInput = {
  key: "previously_remitted",
  label: "Amount remitted on the original form",
  kind: "amount",
  required: false,
  help: "Only for an amended 0619-E: what the earlier form remitted (item 15).",
};

export const form0619E: FormModule = {
  forms: ["0619-E"],
  title: "0619-E · Monthly Remittance of Creditable Income Taxes Withheld (Expanded)",
  manualInputs: () => [PREVIOUSLY_REMITTED, ...PENALTY_INPUTS],
  compute(ctx: WorksheetContext): WorksheetResult {
    const { lines, errors: docErrors, warnings } = ewtLines(ctx.documents);
    const errors = [...agentErrors(ctx), ...docErrors];
    const totals = totalsByAtc(lines);
    const remittance = totals.reduce((a, t) => a + t.withheld, 0);
    const previously = readNonNegative(ctx.inputs, PREVIOUSLY_REMITTED, errors) ?? 0;
    const net = remittance - previously;
    const penalties = penaltyLines(ctx, errors, ["17A", "17B", "17C", "17D"], "(Sum of Items 17A to 17C)");
    if (lines.length === 0 && errors.length === 0) warnings.push("No approved 2307s issued in this month: the remittance is zero.");

    return {
      sections: [
        {
          title: "Part I – Background Information",
          lines: backgroundLines([
            ["5", "atc_code", "ATC", "WME10"],
            ["6", "tax_type", "Tax Type Code", "WE"],
            ...agentBackground(ctx, ["7", "8", "9", "10"]),
          ]),
        },
        {
          title: "Part II – Tax Remittance",
          lines: [
            { key: "amount_of_remittance", line: "14", label: "Amount of Remittance", amount: remittance, emphasis: "subtotal", basis: `Tax withheld on ${lines.length} approved 2307(s) issued in ${ctx.filing.periodLabel}` },
            { key: "previously_remitted", line: "15", label: "Less: Amount Remitted from Previously Filed Form, if amended", amount: previously },
            { key: "net_remittance", line: "16", label: "Net Amount of Remittance (Item 14 Less Item 15)", amount: net, emphasis: "subtotal" },
            ...penalties.lines,
            { key: "total_remittance", line: "18", label: "TOTAL AMOUNT OF REMITTANCE (Sum of Items 16 and 17D)", amount: net + penalties.total, emphasis: "payable" },
          ],
        },
      ],
      schedules: [atcSchedule("EWT by ATC for the month (for the file; not part of 0619-E)", totals), detailSchedule("2307s issued in the month", lines)],
      errors,
      warnings,
      documentIds: lines.map((l) => l.documentId),
    };
  },
};
