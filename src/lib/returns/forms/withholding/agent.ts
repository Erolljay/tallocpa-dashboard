/** Part I lines about the withholding agent (the client), shared by the withholding forms. */
import type { WorksheetContext } from "../../types";

/** taxify `tinDashed`: first 9 digits as 123-456-789 (zero-padded). */
export function tinDashed(tin: string | null | undefined): string {
  const d = (tin ?? "").replace(/\D/g, "").padEnd(9, "0").substring(0, 9);
  return `${d.substring(0, 3)}-${d.substring(3, 6)}-${d.substring(6, 9)}`;
}

export function agentBackground(ctx: Pick<WorksheetContext, "client">, [tin, rdo, name, address]: [string, string, string, string]): [string, string, string, string | null][] {
  const c = ctx.client;
  return [
    [tin, "agent_tin", "Taxpayer Identification Number (TIN)", c.tin ? tinDashed(c.tin) : null],
    [rdo, "agent_rdo", "RDO Code", c.rdoCode],
    [name, "agent_name", "Withholding Agent's Name", c.name],
    [address, "agent_address", "Registered Address", c.registeredAddress],
  ];
}

/** Blocking problems with the client's own registration that the BIR form needs. */
export function agentErrors(ctx: Pick<WorksheetContext, "client">): string[] {
  const out: string[] = [];
  if (!ctx.client.tin) out.push("The client has no TIN on file. Add it on the client's page.");
  if (!ctx.client.rdoCode) out.push("The client has no RDO code on file. Add it on the client's page.");
  return out;
}
