/**
 * A directory party and how its name and address go on BIR attachments,
 * following the Owner's taxify extension (`partyNameCols`, `stripSpecial`, the
 * SLS/SLP, QAP and SAWT DAT exporters): a non-individual has a registered
 * (company) name; an individual has last / first / middle name columns and an
 * empty registered-name column.
 */
import { partyKeyOf } from "./tin";

export const PARTY_KINDS = { non_individual: "Non-individual", individual: "Individual" } as const;
export type PartyKind = keyof typeof PARTY_KINDS;
export const VAT_STATUSES = { vat: "VAT-registered", non_vat: "Non-VAT", unknown: "Unknown" } as const;
export type VatStatus = keyof typeof VAT_STATUSES;
export const PARTY_SOURCES = { manual: "Typed by staff", ocr: "From an approved document", cor: "From a COR" } as const;
export type PartySource = keyof typeof PARTY_SOURCES;
export const PARTY_ROLES = { customer: "Customer", supplier: "Supplier", both: "Customer & supplier" } as const;
export type PartyRole = keyof typeof PARTY_ROLES;

export interface Party {
  id: string;
  tin: string;
  branch_code: string;
  kind: PartyKind;
  registered_name: string | null;
  last_name: string | null;
  first_name: string | null;
  middle_name: string | null;
  trade_name: string | null;
  registered_address: string | null;
  zip_code: string | null;
  vat_status: VatStatus;
  source: PartySource;
  verified_at: string | null;
  verified_by: string | null;
  notes: string | null;
  display_name: string | null;
}

/** Columns to select for a `Party`. */
export const PARTY_COLUMNS =
  "id, tin, branch_code, kind, registered_name, last_name, first_name, middle_name, trade_name, registered_address, zip_code, vat_status, source, verified_at, verified_by, notes, display_name";

type Names = Pick<Party, "kind" | "registered_name" | "last_name" | "first_name" | "middle_name">;

/** "Acme Trading Corp." or "Dela Cruz, Juan Santos" (taxify `partyNameCols`). */
export function displayName(p: Names): string {
  if (p.kind === "individual") {
    const given = [p.first_name, p.middle_name].filter(Boolean).join(" ");
    return [p.last_name, given].filter(Boolean).join(", ");
  }
  return p.registered_name ?? "";
}

/** "123-456-789-00000" */
export const partyTinLabel = (p: Pick<Party, "tin" | "branch_code">) => partyKeyOf(p.tin, p.branch_code);

/** The registered address with the ZIP code. */
export const fullAddress = (p: Pick<Party, "registered_address" | "zip_code">) => [p.registered_address, p.zip_code].filter(Boolean).join(" ");

/** BIR's Validation Module rejects other characters in names and addresses (taxify `stripSpecial`). */
export const stripSpecial = (v: string | null | undefined) => (v ?? "").replace(/[^A-Za-z0-9\s.\-/]/g, "");

/**
 * The two name columns of the SLS / SLP / QAP / SAWT listings (Excel):
 * [registered name, "Last, First Middle"], one of them empty (taxify `partyNameCols`).
 */
export function listNameCols(p: Names): [string, string] {
  return p.kind === "individual" ? ["", displayName(p)] : [p.registered_name ?? "", ""];
}

/** The name columns of a DAT detail row: upper case, special characters removed; individuals leave the registered name empty. */
export function datNameCols(p: Names): { registeredName: string; lastName: string; firstName: string; middleName: string } {
  const up = (v: string | null | undefined) => stripSpecial(v).trim().toUpperCase();
  return p.kind === "individual"
    ? { registeredName: "", lastName: up(p.last_name), firstName: up(p.first_name), middleName: up(p.middle_name) }
    : { registeredName: up(p.registered_name), lastName: "", firstName: "", middleName: "" };
}

/** Address columns of a DAT detail row: address 1 = the address, address 2 = the ZIP code (taxify party fields). */
export function datAddress(p: Pick<Party, "registered_address" | "zip_code">): { address1: string; address2: string } {
  return { address1: stripSpecial(p.registered_address).trim().toUpperCase(), address2: p.zip_code ?? "" };
}
