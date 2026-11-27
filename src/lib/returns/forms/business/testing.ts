/** Fixture builders for the business-tax worksheet tests. */
import type { LedgerMovement, SourceDocument, WorksheetContext, WorksheetResult } from "../../types";

let seq = 0;
const P = (pesos: number) => Math.round(pesos * 100);

type DocInput = Partial<Omit<SourceDocument, "vatable" | "vatExempt" | "zeroRated" | "vat" | "total" | "withholding">> & {
  month: string;
  vatable?: number;
  vatExempt?: number;
  zeroRated?: number;
  vat?: number;
  total?: number;
  withholding?: number;
};

/** A document; amounts in pesos for readability, stored in centavos. `month` is "YYYY-MM". */
export function doc(docType: SourceDocument["docType"], d: DocInput): SourceDocument {
  seq++;
  return {
    id: d.id ?? `doc-${seq}`,
    docType,
    month: `${d.month}-01`,
    date: d.date ?? `${d.month}-15`,
    number: d.number ?? String(1000 + seq),
    partyName: d.partyName ?? null,
    partyTin: d.partyTin ?? null,
    partyAddress: d.partyAddress ?? null,
    partyZip: d.partyZip ?? null,
    vatable: P(d.vatable ?? 0),
    vatExempt: P(d.vatExempt ?? 0),
    zeroRated: P(d.zeroRated ?? 0),
    vat: P(d.vat ?? 0),
    total: P(d.total ?? 0),
    atc: d.atc ?? null,
    withholding: P(d.withholding ?? 0),
    ...(d.slpCategory !== undefined ? { slpCategory: d.slpCategory } : {}),
  };
}

export const sale = (d: DocInput) => doc("sales_invoice", d);
export const purchase = (d: DocInput) => doc("purchase_receipt", d);
export const cert2307 = (d: DocInput) => doc("bir_2307_received", d);

export function ctxFor(opts: {
  form: string;
  periodStart: string;
  periodEnd: string;
  documents: SourceDocument[];
  inputs?: Record<string, string>;
  priorFigures?: WorksheetContext["priorFigures"];
  client?: Partial<WorksheetContext["client"]>;
  ledger?: WorksheetContext["ledger"];
}): WorksheetContext {
  return {
    client: {
      id: "client-1",
      name: "Acme Trading, Inc.",
      tin: "000-123-456-000",
      rdoCode: "050",
      registeredAddress: "1 Ayala Ave., Makati City",
      taxpayerType: "corporation",
      fiscalYearEndMonth: 12,
      vatRegistered: false,
      ...opts.client,
    },
    filing: { id: "filing-1", form: opts.form, periodLabel: "", periodStart: opts.periodStart, periodEnd: opts.periodEnd, dueDate: "" },
    documents: opts.documents,
    inputs: opts.inputs ?? {},
    priorFigures: opts.priorFigures ?? {},
    ...(opts.ledger ? { ledger: opts.ledger } : {}),
  };
}

/** An income or expense account's movement for the ledger context; `net` in pesos, debit − credit (income negative). */
export function mv(birLine: string | null, net: number, type: LedgerMovement["type"] = net < 0 ? "revenue" : "expense", code = birLine ?? "9999"): LedgerMovement {
  return { code, name: birLine ?? "Unmapped", type, birLine, net: Math.round(net * 100) };
}

/** Line amounts by key, in pesos. */
export function amounts(r: WorksheetResult): Record<string, number | null> {
  const out: Record<string, number | null> = {};
  for (const s of r.sections) for (const l of s.lines) out[l.key] = l.amount == null ? null : l.amount / 100;
  return out;
}

export const lineNo = (r: WorksheetResult, key: string) => r.sections.flatMap((s) => s.lines).find((l) => l.key === key)?.line;
