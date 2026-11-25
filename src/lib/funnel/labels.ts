/**
 * The leads pipeline (rework decision 20): Lead → Prospect → Won → Onboarding,
 * or Lost with a reason. Label, badge tone and what the stage means, in board order.
 */
export const LEAD_STAGES = {
  lead: { label: "Lead", tone: "waiting", hint: "Inquiry received; the reviewer holds the discovery call." },
  prospect: { label: "Prospect", tone: "progress", hint: "Discovery call held or proposal sent." },
  won: { label: "Won", tone: "done", hint: "Proposal accepted; the Owner makes the client." },
  onboarding: { label: "Onboarding", tone: "done", hint: "The client is set up on its Onboarding tab." },
  lost: { label: "Lost", tone: "blocked", hint: "Not going ahead, with the reason." },
} as const;
export type LeadStage = keyof typeof LEAD_STAGES;
export const LEAD_STAGE_ORDER = Object.keys(LEAD_STAGES) as LeadStage[];

/** Open stages: a reviewer can still work the lead. */
export const isOpenStage = (s: LeadStage) => s === "lead" || s === "prospect" || s === "won";
