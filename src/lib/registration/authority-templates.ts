/**
 * The authority documents a registration case needs before the firm can transact with
 * the BIR (and the LGU, SEC or DTI) for a client: a Secretary's Certificate for a
 * corporation (a Partners' Certificate for a partnership), a Special Power of Attorney
 * for an individual. The Registration Runner fills them from what the app holds
 * (src/lib/registration/ai-tools.ts, draft_authority_document); staff print them for
 * the client to sign and notarize.
 *
 * THE TEMPLATES ARE DATA: replace the text of SECRETARY_CERTIFICATE, PARTNERS_CERTIFICATE
 * or SPECIAL_POWER_OF_ATTORNEY below with the firm's own wording, keeping the
 * {{placeholders}} (see PLACEHOLDERS). Nothing else needs to change.
 *
 * Blanks:
 *   - a value the app does not hold is left as a blank and listed in `missing`
 *     (never guessed);
 *   - the firm's representative (name, position, ID) is always left blank and listed in
 *     `to_fill_by_staff`: it differs per client (Owner's rule);
 *   - the notary's block uses plain underscores: the notary fills it.
 */
import type { TaxpayerType } from "@/lib/clients/obligations";
import { AGENCIES, CASE_KINDS, type Agency, type CaseKind } from "./steps";

export type AuthorityDocument = "secretary_certificate" | "partners_certificate" | "special_power_of_attorney";

export const AUTHORITY_DOCUMENTS: Record<AuthorityDocument, string> = {
  secretary_certificate: "Secretary's Certificate",
  partners_certificate: "Partners' Certificate",
  special_power_of_attorney: "Special Power of Attorney",
};

/** The notarized document the client signs so the firm may transact for it. */
export function authorityDocumentFor(t: TaxpayerType): AuthorityDocument {
  if (t === "individual") return "special_power_of_attorney";
  if (t === "partnership") return "partners_certificate";
  return "secretary_certificate"; // corporation, one person corporation, non-stock
}

/** What a placeholder stands for, for people (the blank's label and the `missing` list). */
export const PLACEHOLDERS = {
  client_name: "Registered / business name",
  client_tin: "Client's TIN",
  rdo_code: "RDO code",
  client_address: "Principal office / business address",
  sec_no: "SEC registration no.",
  dti_no: "DTI business name certificate no.",
  secretary_name: "Corporate Secretary's full name",
  governing_body: "Board",
  resolution_heading: "Resolution heading",
  meeting_date: "Date of the board / partners' meeting",
  meeting_place: "Place of the meeting",
  partners: "Names of all partners",
  principal_name: "Owner's full name",
  civil_status: "Civil status",
  citizenship: "Citizenship",
  principal_address: "Owner's residence address",
  firm_legal_name: "Firm's registered name",
  firm_display_name: "Firm's trade name",
  firm_address: "Firm's office address",
  representative_name: "Representative's full name",
  representative_position: "Representative's position",
  representative_id: "Representative's valid ID no.",
  transaction: "Transaction",
  offices: "Offices",
  execution_date: "Date of signing",
  execution_place: "Place of signing",
} as const;
export type Placeholder = keyof typeof PLACEHOLDERS;

/** Placeholders the firm's staff fill for each client (never filled by the app). */
export const STAFF_BLANKS: readonly Placeholder[] = ["representative_name", "representative_position", "representative_id"];

const NOTARY_JURAT = `SUBSCRIBED AND SWORN to before me this ____ day of ______________ 20___ at ______________, affiant exhibiting to me competent evidence of identity ______________ issued on ______________ at ______________.

Doc. No. ______;
Page No. ______;
Book No. ______;
Series of 20___.`;

export const SECRETARY_CERTIFICATE = `REPUBLIC OF THE PHILIPPINES )
{{execution_place}} ) S.S.

SECRETARY'S CERTIFICATE

I, {{secretary_name}}, of legal age, Filipino, with office address at {{client_address}}, after having been duly sworn in accordance with law, hereby certify that:

1. I am the duly elected and qualified Corporate Secretary of {{client_name}} (the "Corporation"), a corporation organized and existing under the laws of the Republic of the Philippines, with SEC Registration No. {{sec_no}}, Taxpayer Identification No. {{client_tin}} (RDO {{rdo_code}}), and principal office at {{client_address}}.

2. {{resolution_heading}} held on {{meeting_date}} at {{meeting_place}}, at which a quorum was present and acted throughout, the following resolution was approved and adopted:

"RESOLVED, as it is hereby resolved, that the Corporation authorizes {{firm_legal_name}} ({{firm_display_name}}), with office address at {{firm_address}}, through its representative {{representative_name}}, {{representative_position}}, with valid ID no. {{representative_id}}, to transact with {{offices}} on behalf of the Corporation for its {{transaction}}, including to file and submit the required forms and supporting documents; to sign on the Corporation's behalf such application forms as the rules of those offices allow a duly authorized representative to sign; to pay the required fees and charges; to receive the Certificate of Registration, Authority to Print, registered books of accounts, permits and other documents released; and to follow up the application until it is completed;

RESOLVED FURTHER, that this authority remains in force until revoked in writing and the revocation is received by the offices concerned."

3. The foregoing resolution has not been amended, revoked or rescinded, and remains in full force and effect.

IN WITNESS WHEREOF, I have hereunto set my hand this {{execution_date}} at {{execution_place}}.


______________________________
{{secretary_name}}
Corporate Secretary


${NOTARY_JURAT}`;

export const PARTNERS_CERTIFICATE = `REPUBLIC OF THE PHILIPPINES )
{{execution_place}} ) S.S.

PARTNERS' CERTIFICATE

We, the undersigned partners of {{client_name}} (the "Partnership"), a partnership organized and existing under the laws of the Republic of the Philippines, with SEC Registration No. {{sec_no}}, Taxpayer Identification No. {{client_tin}} (RDO {{rdo_code}}), and principal office at {{client_address}}, after having been duly sworn in accordance with law, hereby certify that at the meeting of the partners held on {{meeting_date}} at {{meeting_place}}, the partners unanimously resolved as follows:

"RESOLVED, as it is hereby resolved, that the Partnership authorizes {{firm_legal_name}} ({{firm_display_name}}), with office address at {{firm_address}}, through its representative {{representative_name}}, {{representative_position}}, with valid ID no. {{representative_id}}, to transact with {{offices}} on behalf of the Partnership for its {{transaction}}, including to file and submit the required forms and supporting documents; to sign on the Partnership's behalf such application forms as the rules of those offices allow a duly authorized representative to sign; to pay the required fees and charges; to receive the Certificate of Registration, Authority to Print, registered books of accounts, permits and other documents released; and to follow up the application until it is completed;

RESOLVED FURTHER, that this authority remains in force until revoked in writing and the revocation is received by the offices concerned."

The foregoing resolution has not been amended, revoked or rescinded, and remains in full force and effect.

IN WITNESS WHEREOF, we have hereunto set our hands this {{execution_date}} at {{execution_place}}.

Partners: {{partners}}


______________________________          ______________________________
Partner                                  Partner


${NOTARY_JURAT}`;

export const SPECIAL_POWER_OF_ATTORNEY = `SPECIAL POWER OF ATTORNEY

KNOW ALL PERSONS BY THESE PRESENTS:

I, {{principal_name}}, of legal age, {{civil_status}}, {{citizenship}}, with residence address at {{principal_address}}, Taxpayer Identification No. {{client_tin}} (RDO {{rdo_code}}), doing business under the name {{client_name}} (DTI Business Name Certificate No. {{dti_no}}) at {{client_address}}, do hereby name, constitute and appoint {{firm_legal_name}} ({{firm_display_name}}), with office address at {{firm_address}}, acting through its representative {{representative_name}}, {{representative_position}}, with valid ID no. {{representative_id}}, to be my true and lawful attorney-in-fact, for me and in my name, place and stead, to do and perform the following specific acts in connection with my {{transaction}} with {{offices}}:

1. To file and submit the required forms, applications and supporting documents;
2. To sign on my behalf such application forms as the rules of those offices allow an authorized representative to sign;
3. To pay the required fees and charges;
4. To receive the Certificate of Registration, Authority to Print, registered books of accounts, permits and any other documents released;
5. To follow up and do all acts necessary to complete the transaction.

HEREBY GIVING AND GRANTING my said attorney-in-fact full power and authority to do and perform the acts above as fully as I could do if personally present, and hereby ratifying and confirming all that my attorney-in-fact shall lawfully do by virtue of these presents. This authority remains in force until revoked in writing.

IN WITNESS WHEREOF, I have hereunto set my hand this {{execution_date}} at {{execution_place}}.


______________________________          ______________________________
{{principal_name}}                         {{representative_name}}
Principal                                  Attorney-in-fact (for {{firm_display_name}})


SIGNED IN THE PRESENCE OF:

______________________________          ______________________________
Witness                                  Witness


ACKNOWLEDGMENT

REPUBLIC OF THE PHILIPPINES )
______________________ ) S.S.

BEFORE ME, a Notary Public for and in ______________, this ____ day of ______________ 20___, personally appeared {{principal_name}}, with valid ID ______________ issued on ______________ at ______________, known to me to be the same person who executed the foregoing Special Power of Attorney, consisting of ____ pages including this page, and acknowledged to me that the same is a free and voluntary act and deed.

WITNESS MY HAND AND SEAL on the date and place first above written.

Doc. No. ______;
Page No. ______;
Book No. ______;
Series of 20___.`;

export const TEMPLATES: Record<AuthorityDocument, string> = {
  secretary_certificate: SECRETARY_CERTIFICATE,
  partners_certificate: PARTNERS_CERTIFICATE,
  special_power_of_attorney: SPECIAL_POWER_OF_ATTORNEY,
};

/** What the transaction is called in the authority, by case kind. */
export const TRANSACTIONS: Record<CaseKind, string> = {
  new_business: "registration of its new business",
  branch: "registration of its new branch",
  renewal: "annual renewal of its business permits and registrations",
  bir_update: "update of its registration information",
  sec_filing: "annual filings with the Securities and Exchange Commission",
  certificate: "application for a BIR certificate or clearance",
  employer: "registration as an employer",
  closure: "cancellation of its registration and closure of the business",
};

const OFFICE_NAMES: Record<Agency, string> = {
  dti: "the Department of Trade and Industry (DTI)",
  sec: "the Securities and Exchange Commission (SEC)",
  barangay: "the Barangay",
  lgu: "the City / Municipal Government",
  bfp: "the Bureau of Fire Protection (BFP)",
  bir: "the Bureau of Internal Revenue (BIR)",
  sss: "the Social Security System (SSS)",
  philhealth: "the Philippine Health Insurance Corporation (PhilHealth)",
  pagibig: "the Home Development Mutual Fund (Pag-IBIG)",
} as Record<Agency, string>;

/** The offices named in the authority, in the order the case visits them (BIR always included). */
export function officesFor(agencies: readonly Agency[], lgu: string | null): string {
  const seen: Agency[] = [];
  for (const a of agencies) if (!seen.includes(a)) seen.push(a);
  if (!seen.includes("bir")) seen.unshift("bir");
  const names = seen.map((a) => (a === "lgu" && lgu ? `the City / Municipal Government of ${lgu}` : OFFICE_NAMES[a] ?? AGENCIES[a] ?? a));
  return names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export interface AuthorityFacts {
  kind: CaseKind;
  branch_name?: string | null;
  lgu: string | null;
  agencies: Agency[];
  client: { name: string; taxpayer_type: TaxpayerType; tin: string | null; rdo_code: string | null; registered_address: string | null };
  sec_no: string | null;
  dti_no: string | null;
  /** The client's contacts (name and position only). The Corporate Secretary is taken from here. */
  contacts: { full_name: string; position: string | null }[];
  firm: { legal_name: string | null; display_name: string | null; business_address: string | null; registered_address: string | null };
}

export interface FilledField {
  placeholder: Placeholder;
  field: string;
  value: string | null;
  source: string;
}

export interface FilledAuthority {
  document: AuthorityDocument;
  title: string;
  /** The text with each blank as `[__________]` (for reading and the draft summary). */
  text: string;
  /** The same text with each blank marked ⟦missing:Label⟧ or ⟦staff:Label⟧ (for the print page). */
  marked: string;
  fields: FilledField[];
  /** What the app does not hold: the client or staff must supply it. */
  missing: string[];
  /** Left blank on purpose for staff to fill for each client (the firm's representative). */
  to_fill_by_staff: string[];
}

const present = (v: string | null | undefined) => (v && v.trim() ? v.trim() : null);
export const BLANK = "[__________]";
export const MARK = /⟦(missing|staff):([^⟧]+)⟧/g;

/** Fill a template: every {{placeholder}} becomes its value, a blank listed in `missing`, or a staff blank. */
export function fillTemplate(template: string, values: Partial<Record<Placeholder, string | null>>) {
  const missing = new Set<string>();
  const staff = new Set<string>();
  const marked = template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const k = key as Placeholder;
    const label = PLACEHOLDERS[k] ?? key;
    if (STAFF_BLANKS.includes(k)) {
      staff.add(label);
      return `⟦staff:${label}⟧`;
    }
    const v = present(values[k] ?? null);
    if (v) return v;
    missing.add(label);
    return `⟦missing:${label}⟧`;
  });
  return { marked, text: marked.replace(MARK, BLANK), missing: [...missing], to_fill_by_staff: [...staff] };
}

/** The authority document a case needs, filled from what the app holds. */
export function buildAuthority(f: AuthorityFacts): FilledAuthority {
  const document = authorityDocumentFor(f.client.taxpayer_type);
  const t = f.client.taxpayer_type;
  const secretary = f.contacts.find((c) => /secretary/i.test(c.position ?? "")) ?? null;
  const partners = f.contacts.filter((c) => /partner/i.test(c.position ?? "")).map((c) => c.full_name);
  const branch = f.kind === "branch" && present(f.branch_name) ? ` (${present(f.branch_name)})` : "";
  const firmAddress = present(f.firm.business_address) ?? present(f.firm.registered_address);
  const v = (placeholder: Placeholder, value: string | null | undefined, source: string, missingWhy = "Not in the app"): FilledField => {
    const val = present(value ?? null);
    return { placeholder, field: PLACEHOLDERS[placeholder], value: val, source: val ? source : missingWhy };
  };
  const fields: FilledField[] = [
    v("client_name", f.client.name, "Client record"),
    v("client_tin", f.client.tin, "Client record", "No TIN on the client record"),
    v("rdo_code", f.client.rdo_code, "Client record", "No RDO on the client record"),
    v("client_address", f.client.registered_address, "Client record", "No registered address on the client record"),
    v("transaction", `${TRANSACTIONS[f.kind] ?? CASE_KINDS[f.kind]}${branch}`, "Case kind"),
    v("offices", officesFor(f.agencies, f.lgu), "The case's steps"),
    v("firm_legal_name", f.firm.legal_name, "Settings → Brand"),
    v("firm_display_name", f.firm.display_name, "Settings → Brand"),
    v("firm_address", firmAddress, "Settings → Brand", "No business or registered address in Settings → Brand"),
    v("execution_date", null, "", "Filled when signed"),
    v("execution_place", null, "", "Filled when signed"),
  ];
  if (document === "special_power_of_attorney") {
    fields.push(
      v("dti_no", f.dti_no, "Step \"dti_business_name\"", "DTI step not done yet"),
      v("principal_name", null, "", "Not kept in the app: from the owner's ID"),
      v("civil_status", null, "", "Not kept in the app"),
      v("citizenship", null, "", "Not kept in the app"),
      v("principal_address", null, "", "Not kept in the app: from the owner's ID"),
    );
  } else {
    const body = t === "non_stock" ? "Trustees" : "Directors";
    fields.push(
      v("sec_no", f.sec_no, "Step \"sec_registration\"", "SEC registration step not done yet"),
      v("meeting_date", null, "", "Not in the app: the date of the meeting"),
      v("meeting_place", null, "", "Not in the app: where the meeting was held"),
      v(
        "resolution_heading",
        t === "opc" ? "By the resolution of the Sole Director of the Corporation" : `At the meeting of the Board of ${body} of the Corporation`,
        "Taxpayer type",
      ),
    );
    if (document === "partners_certificate") {
      fields.push(v("partners", partners.length ? partners.join(", ") : null, "Client contacts with the position Partner", "No contact with the position Partner"));
    } else {
      fields.push(v("secretary_name", secretary?.full_name, `Client contact (position: ${secretary?.position ?? ""})`, "No contact with the position Corporate Secretary"));
    }
  }
  const values = Object.fromEntries(fields.map((x) => [x.placeholder, x.value])) as Partial<Record<Placeholder, string | null>>;
  const filled = fillTemplate(TEMPLATES[document], values);
  // A placeholder the template uses but no field supplied is missing too (fillTemplate lists it).
  return { document, title: AUTHORITY_DOCUMENTS[document], text: filled.text, marked: filled.marked, fields, missing: filled.missing, to_fill_by_staff: filled.to_fill_by_staff };
}

/** The notarized authority a case needs listed as a requirement (with the BIR form). */
export function authorityRequirement(t: TaxpayerType) {
  const d = authorityDocumentFor(t);
  return { document: d, requirement: `Notarized ${AUTHORITY_DOCUMENTS[d]} authorizing the firm`, signed_by: d === "special_power_of_attorney" ? "The owner (principal), before a notary" : d === "partners_certificate" ? "All partners, before a notary" : "The Corporate Secretary, before a notary" };
}
