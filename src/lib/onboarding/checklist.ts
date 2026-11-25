/**
 * The onboarding checklist of a client (Onboarding tab; spec §4.1). Items are
 * grouped the way onboarding runs: engagement, registration, client access,
 * books, payroll, then kickoff.
 *
 * Most items are worked out from what is already recorded. The rest are ticked
 * by staff (onboarding_ticks): BIR eFiling access, the returns already filed this
 * year, the kickoff meeting. An item that does not apply to the client (payroll
 * without a 1601-C, say) is marked so and does not count. Pure.
 */

export type ItemState = "done" | "todo" | "na";

export interface OnboardingFacts {
  clientId: string;
  files: { proposal: number; contract: number; contractSigned: boolean };
  engagementActive: boolean;
  corRecorded: boolean;
  obligations: number;
  hasPayrollObligation: boolean;
  preparer: boolean;
  reviewer: boolean;
  portalUsers: number;
  portalSignedIn: boolean;
  /** YYYY-MM-DD, or null without a chart. */
  booksStart: string | null;
  openingPosted: boolean;
  /** The client's taxable year starts in this month (1–12). */
  yearStartMonth: number;
  batchUploads: number;
  employees: number;
  /** Manual ticks: item → who and when. */
  ticks: Map<string, { by: string; at: string; note: string | null }>;
}

export interface OnboardingItem {
  key: string;
  group: string;
  label: string;
  /** What to do, or why it shows as done. */
  hint: string;
  state: ItemState;
  /** Staff tick it; otherwise it follows the data. */
  manual: boolean;
  href: string | null;
  tick: { by: string; at: string; note: string | null } | null;
}

export const ONBOARDING_GROUPS = ["Engagement", "Registration", "Client access", "Books", "Payroll", "Kickoff"] as const;

/** Keys of the items staff tick; set_onboarding_item accepts these. */
export const MANUAL_ITEMS = ["bir_access", "prior_returns", "kickoff"] as const;

export function onboardingChecklist(f: OnboardingFacts): OnboardingItem[] {
  const c = `/app/clients/${f.clientId}`;
  const auto = (key: string, group: string, label: string, done: boolean, hint: string, href: string | null, na = false): OnboardingItem => ({
    key, group, label, hint, state: na ? "na" : done ? "done" : "todo", manual: false, href, tick: null,
  });
  const manual = (key: (typeof MANUAL_ITEMS)[number], group: string, label: string, hint: string, href: string | null, na = false): OnboardingItem => {
    const tick = f.ticks.get(key) ?? null;
    return { key, group, label, hint, state: na ? "na" : tick ? "done" : "todo", manual: true, href, tick };
  };
  const midYear = f.booksStart != null && Number(f.booksStart.slice(5, 7)) !== f.yearStartMonth;

  return [
    auto("proposal", "Engagement", "Proposal", f.files.proposal > 0, f.files.proposal ? "Attached below." : "Attach the proposal the client accepted.", `${c}/onboarding#files`),
    auto(
      "contract", "Engagement", "Signed contract (engagement letter)", f.files.contract > 0 && f.files.contractSigned,
      f.files.contract === 0 ? "Attach the engagement letter both parties signed." : f.files.contractSigned ? "Attached and dated." : "Attached; enter the date it was signed.",
      `${c}/onboarding#files`,
    ),
    auto("engagement", "Engagement", "Engagement and retainer recorded", f.engagementActive, f.engagementActive ? "Service lines and retainer are on the Overview." : "Record the service lines and monthly retainer on the Overview.", c),
    auto("cor", "Registration", "COR (Form 2303) read", f.corRecorded, f.corRecorded ? "Tax types and registration date recorded." : "Read the COR so the tax types and RDO are recorded.", c),
    auto("obligations", "Registration", "Filing obligations", f.obligations > 0, f.obligations ? `${f.obligations} obligation${f.obligations === 1 ? "" : "s"} from the COR.` : "No obligations yet: they come from the COR's tax types.", c),
    auto("team", "Registration", "Preparer and reviewer assigned", f.preparer && f.reviewer, f.preparer && f.reviewer ? "Both assigned." : `Assign the ${[!f.preparer && "preparer", !f.reviewer && "reviewer"].filter(Boolean).join(" and ")} under Team.`, c),
    auto("portal", "Client access", "Portal user invited", f.portalUsers > 0, f.portalUsers ? `${f.portalUsers} portal user${f.portalUsers === 1 ? "" : "s"}.` : "Invite the client's contact person to the portal.", c),
    auto("portal_login", "Client access", "Client signed in to the portal", f.portalSignedIn, f.portalSignedIn ? "Signed in at least once." : "Walk the client through the first sign-in.", null, f.portalUsers === 0),
    manual("bir_access", "Client access", "BIR eFiling access arranged", "eBIRForms or eFPS: how returns will be filed and paid. Do not store passwords here.", null),
    auto("chart", "Books", "Chart of accounts and books start", f.booksStart != null, f.booksStart ? `Books start ${f.booksStart}.` : "Set up the chart of accounts and the books start.", `${c}/books`),
    auto("opening", "Books", "Opening balances", f.openingPosted, f.openingPosted ? "Entered; see the checklist on the Books page." : "Enter the opening balances as of the day before the books start (checklist on the Books page).", `${c}/books/tools#opening`, f.booksStart == null),
    manual("prior_returns", "Books", "Returns already filed this year", midYear ? "Books start mid-year: collect this year's filed returns and 2307s for the first returns after the cut-off." : "Not needed when the books start with the taxable year.", null, !midYear),
    auto("history", "Books", "Sales and purchases loaded", f.batchUploads > 0, f.batchUploads ? `${f.batchUploads} batch upload${f.batchUploads === 1 ? "" : "s"}.` : "Load the backlog by batch upload, or have the client send the documents.", `${c}/batch`, f.booksStart == null),
    auto("employees", "Payroll", "Employees set up", f.employees > 0, f.employees ? `${f.employees} employee${f.employees === 1 ? "" : "s"}, each with an account title.` : "Add the employees, each with the account title for their pay.", `${c}/payroll`, !f.hasPayrollObligation),
    manual("kickoff", "Kickoff", "Kickoff meeting held", "Document cutoff (the 5th), how to send documents, the portal, who approves returns.", null),
  ];
}

export function onboardingProgress(items: OnboardingItem[]): { done: number; total: number } {
  const counted = items.filter((i) => i.state !== "na");
  return { done: counted.filter((i) => i.state === "done").length, total: counted.length };
}
