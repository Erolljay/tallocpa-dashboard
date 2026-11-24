/**
 * How each account reports on the statement of cash flows (indirect method,
 * spec §3.6 slice 7). Staff may set it per account (ledger_accounts.cash_flow);
 * otherwise it follows the account's FS line.
 */
import { FS_LINES, isFsLine } from "./fs-lines";
import type { Control, NormalSide } from "./types";

export const CASH_FLOW_CLASSES = {
  cash: "Cash and cash equivalents",
  operating: "Operating (working capital)",
  investing: "Investing",
  financing: "Financing",
  noncash: "Non-cash item added back (e.g. accumulated depreciation)",
} as const;
export type CashFlowClass = keyof typeof CASH_FLOW_CLASSES;

export const isCashFlowClass = (v: string): v is CashFlowClass => v in CASH_FLOW_CLASSES;

/** The class an account gets when none is set. Income and expense accounts are "operating" (they make up net income). */
export function defaultCashFlow(a: { fsLine: string; control: Control | null; normalSide: NormalSide }): CashFlowClass {
  if (a.control === "cash" || a.control === "bank" || a.fsLine === "cash_and_equivalents") return "cash";
  if (!isFsLine(a.fsLine)) return "operating";
  const line = FS_LINES[a.fsLine];
  if (line.statement === "sci") return "operating";
  if (a.fsLine === "ppe") return a.normalSide === "credit" ? "noncash" : "investing";
  switch (line.section) {
    case "noncurrent_assets":
      return "investing";
    case "noncurrent_liabilities":
    case "equity":
      return "financing";
    default:
      return a.fsLine === "loans_payable_current" ? "financing" : "operating";
  }
}
