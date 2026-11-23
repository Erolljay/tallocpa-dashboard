/** Late returns and who caused them (spec §3.11), from public.late_filings. */

export interface LateFiling {
  filing_id: string;
  client_id: string;
  form: string;
  period_label: string;
  period_end: string;
  due_date: string;
  filed_on: string | null;
  status: string;
  preparer: string | null;
  missed_cutoff: boolean;
  late_documents: boolean;
  waited_for_client: boolean;
  unpaid_tax: boolean;
  cause: "client" | "staff";
}

/** Why the return went late, in plain words. */
export function lateReason(l: Pick<LateFiling, "missed_cutoff" | "late_documents" | "waited_for_client" | "unpaid_tax" | "cause">): string {
  const why = [
    l.missed_cutoff && "missed the cutoff",
    l.late_documents && "sent documents after the cutoff",
    l.waited_for_client && "had not approved the return by the due date",
    l.unpaid_tax && "had not paid the tax by the due date",
  ].filter(Boolean);
  if (l.cause === "staff" || why.length === 0) return "Documents and approvals were in on time";
  const text = why.join(", ").replace(/, ([^,]*)$/, " and $1");
  return `Client ${text}`;
}
