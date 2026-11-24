/** Shared by the payroll worksheets (1601-C, 1604-C). */
import { formatAmount } from "../../money";
import type { WorksheetContext, WorksheetLine, WorksheetSchedule } from "../../types";
import type { PayrollContext } from "@/lib/payroll/types";
import { tinDashed } from "@/lib/payroll/alphalist";

export const PAYROLL_NOT_LOADED = "Payroll not loaded";

export function payrollOf(ctx: WorksheetContext): PayrollContext | null {
  return ctx.payroll ?? null;
}

/** Part I lines about the withholding agent (the client). */
export function agentLines(ctx: Pick<WorksheetContext, "client">, nos: [string, string, string, string]): WorksheetLine[] {
  const c = ctx.client;
  const rows: [string, string, string, string | null][] = [
    [nos[0], "agent_tin", "Taxpayer Identification Number (TIN)", c.tin ? tinDashed(c.tin) : null],
    [nos[1], "agent_rdo", "RDO Code", c.rdoCode],
    [nos[2], "agent_name", "Withholding Agent's Name", c.name],
    [nos[3], "agent_address", "Registered Address", c.registeredAddress],
  ];
  return rows.map(([line, key, label, value]) => ({ key, line, label, amount: null, basis: value ?? "—" }));
}

export function agentProblems(ctx: Pick<WorksheetContext, "client">): string[] {
  const out: string[] = [];
  if (!ctx.client.tin) out.push("The client has no TIN on file. Add it on the client's page.");
  if (!ctx.client.rdoCode) out.push("The client has no RDO code on file. Add it on the client's page.");
  return out;
}

export const amountText = (c: number) => formatAmount(c);

export function emptyResult(errors: string[]) {
  return { sections: [], schedules: [] as WorksheetSchedule[], errors, warnings: [], documentIds: [] };
}
