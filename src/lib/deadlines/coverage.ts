/**
 * Coverage checks (docs/UX-REVIEW.md, deadline safeguard 1). The deadline
 * engine creates filings only from obligations, so a missing obligation is a
 * filing that never turns red. These checks find the gaps before a deadline does:
 *
 *   - a tax type on the client's COR with no open obligation for its forms;
 *   - payroll posted for a recent month but no open 1601-C obligation;
 *   - EWT on a recent purchase but no open 0619-E or 1601-EQ obligation;
 *   - an active client with no preparer or no reviewer;
 *   - a client with no account titles (Owner's decision 2: every client keeps them).
 * Pure, so it can be tested; src/lib/deadlines/coverage-load.ts queries.
 */
import { obligationsForTaxTypes, TAX_TYPES, type TaxpayerType, type TaxType } from "@/lib/clients/obligations";

export interface CoverageClient {
  id: string;
  name: string;
  taxpayerType: TaxpayerType;
  /** From the latest COR (client_registrations.tax_types). */
  taxTypes: TaxType[];
  /** Forms with an open obligation. */
  openForms: string[];
  hasPreparer: boolean;
  hasReviewer: boolean;
  /** Payroll was posted in the last months checked. */
  recentPayroll: boolean;
  /** A purchase in the last months checked carried EWT. */
  recentEwt: boolean;
  /** The client has a chart of accounts. Missing means not checked. */
  hasChart?: boolean;
}

export type GapKind = "missing_obligation" | "payroll_without_1601c" | "ewt_without_obligation" | "no_preparer" | "no_reviewer" | "no_chart";

export interface Gap {
  clientId: string;
  clientName: string;
  kind: GapKind;
  text: string;
}

export function coverageGaps(clients: CoverageClient[]): Gap[] {
  const out: Gap[] = [];
  for (const c of clients) {
    const open = new Set(c.openForms);
    const gap = (kind: GapKind, text: string) => out.push({ clientId: c.id, clientName: c.name, kind, text });
    let planned: { form: string; taxType: TaxType }[] = [];
    try {
      planned = obligationsForTaxTypes(c.taxpayerType, c.taxTypes);
    } catch {
      planned = [];
    }
    const missing = new Set(planned.filter((p) => !open.has(p.form)).map((p) => p.form));
    for (const p of planned) {
      if (missing.has(p.form)) gap("missing_obligation", `The COR lists ${TAX_TYPES[p.taxType]}, but there is no ${p.form} obligation.`);
    }
    // Payroll and EWT gaps that the COR check above has not already named.
    if (c.recentPayroll && !open.has("1601-C") && !missing.has("1601-C")) gap("payroll_without_1601c", "Payroll was posted, but there is no 1601-C obligation.");
    const ewtForms = ["0619-E", "1601-EQ"];
    if (c.recentEwt && !ewtForms.some((f) => open.has(f)) && !ewtForms.some((f) => missing.has(f)))
      gap("ewt_without_obligation", "A purchase carried EWT, but there is no 0619-E or 1601-EQ obligation.");
    if (!c.hasPreparer) gap("no_preparer", "No preparer is assigned.");
    if (!c.hasReviewer) gap("no_reviewer", "No reviewer is assigned.");
    if (c.hasChart === false) gap("no_chart", "No account titles yet: documents are not booked. Set up its chart on the Clients page.");
  }
  return out;
}
