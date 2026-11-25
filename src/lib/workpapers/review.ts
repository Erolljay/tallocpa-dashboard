/**
 * Sign-off per workpaper (W2; Owner's decision 8). The reviewer always signs 10 sales,
 * 20 purchases and 0-2 tie-outs; the others when they have activity in the month. A
 * return cannot be marked reviewed until the workpapers it draws on are reviewer-signed,
 * with no open review note, for every month it covers. Pure, so it can be tested.
 */
export type SignedRef = "0" | "0-2" | "10" | "20" | "30" | "B-2" | "BB-2" | "E";

export const SIGNED_REFS: Record<SignedRef, string> = {
  "0": "Lead",
  "0-2": "Tie-outs",
  "10": "Sales register",
  "20": "Purchases register",
  "30": "Payroll register",
  "B-2": "2307s received",
  "BB-2": "Withholding on payments",
  E: "Fixed assets",
};

/** Decision 8: signed every month whatever happened. */
export const ALWAYS: SignedRef[] = ["0-2", "10", "20"];

export interface MonthActivity {
  payroll: boolean;
  certificatesReceived: boolean;
  ewtOnPurchases: boolean;
  fixedAssets: boolean;
}

/** The workpapers the reviewer signs for a month. */
export function refsToSign(a: MonthActivity): SignedRef[] {
  const out = [...ALWAYS];
  if (a.payroll) out.push("30");
  if (a.certificatesReceived) out.push("B-2");
  if (a.ewtOnPurchases) out.push("BB-2");
  if (a.fixedAssets) out.push("E");
  return out;
}

/** The workpapers each return draws on (the lead, workpaper 0). */
export const REFS_FOR_FORM: Record<string, SignedRef[]> = {
  "2550M": ["10", "20", "0-2"],
  "2550Q": ["10", "20", "0-2"],
  "2551Q": ["10", "0-2"],
  "0619-E": ["20", "BB-2", "0-2"],
  "1601-EQ": ["20", "BB-2", "0-2"],
  "1601-C": ["30"],
  "1701Q": ["10", "20", "0-2", "B-2", "E"],
  "1702Q": ["10", "20", "0-2", "B-2", "E"],
  "1701": ["10", "20", "0-2", "B-2", "E"],
  "1701A": ["10", "20", "0-2", "B-2", "E"],
  "1702-RT": ["10", "20", "0-2", "B-2", "E"],
};

export interface Signoff {
  ref: SignedRef;
  preparedAt: string | null;
  reviewedAt: string | null;
}

/** What still keeps a return from being marked reviewed for one month, in words; empty when nothing. */
export function reviewGaps(form: string, activity: MonthActivity, signoffs: Signoff[], openNotes: SignedRef[]): string[] {
  const needed = new Set(refsToSign(activity));
  const out: string[] = [];
  for (const ref of REFS_FOR_FORM[form] ?? []) {
    if (!needed.has(ref)) continue;
    if (openNotes.includes(ref)) out.push(`${ref} has open review notes`);
    else if (!signoffs.find((s) => s.ref === ref)?.reviewedAt) out.push(`${ref} is not reviewer-signed`);
  }
  return out;
}
