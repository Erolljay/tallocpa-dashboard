/**
 * Phase 2 funnel: the engagement terms a proposal carries, and the exact content
 * a prospect accepts (whose hash is the e-signature's fingerprint). Pure.
 *
 * DRAFT TERMS for the Owner to review before the funnel opens. They follow the
 * firm's decisions already in the OS:
 *   - document cutoff the 5th (§3.10)
 *   - client approval of returns and the Owner's final approval (Q21)
 *   - EWT and the 2307 on fees
 *   - the Data Privacy Act
 */
export const SERVICE_LABELS: Record<string, string> = {
  tax_compliance: "Tax Compliance",
  bookkeeping: "Bookkeeping",
  business_registration: "Business Registration",
};

export function defaultTerms(firm: string, services: string[]): string {
  const scope = services.length ? services.map((s) => SERVICE_LABELS[s] ?? s).join(", ") : "Tax Compliance";
  return [
    `1. Services. ${firm} ("we") will provide ${scope} as listed in this proposal. Work outside the list, such as audits, amended returns for periods before the engagement, BIR audits and letters of authority, is quoted separately.`,
    "2. Your documents. You send each month's sales, purchases, payroll and 2307s through the client portal by the 5th of the following month. Documents sent after the cutoff are recorded in the next open month. You are responsible for the completeness and truth of what you send.",
    "3. Returns. We prepare each return from your documents and send it to you for approval before filing. We file only after your approval and our final review. Penalties caused by late or missing documents, or by late approval, are for your account.",
    "4. Fees. The monthly retainer is billed monthly in advance and is due within 15 days. The annual and one-time items are billed when the work is done. Fees exclude taxes on our fee as shown. If you are a withholding agent, you may withhold expanded withholding tax on our fee; send us the BIR Form 2307.",
    "5. Term. This engagement starts on the date the services begin and continues month to month. Either party may end it with 30 days' written notice. Work done up to the end date is billed.",
    "6. Confidentiality and data privacy. We keep your information confidential and process personal data under the Data Privacy Act of 2012 (RA 10173), only to provide the services and to comply with the law.",
    "7. Acceptance. Typing your name and accepting this proposal online is your electronic signature (RA 8792, the Electronic Commerce Act) and forms the engagement agreement between you and us.",
  ].join("\n\n");
}

export interface ProposalContent {
  firm: string;
  client: string;
  quote: unknown;
  terms: string;
  validUntil: string;
}

/** The exact text whose SHA-256 is recorded on acceptance; the same content always gives the same text. */
export function canonicalContent(p: ProposalContent): string {
  const sort = (v: unknown): unknown =>
    Array.isArray(v) ? v.map(sort) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, sort((v as Record<string, unknown>)[k])])) : v;
  return JSON.stringify(sort(p));
}
