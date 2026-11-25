/** Lead statuses for the Leads pages: label and badge tone. */
export const LEAD_STATUS = {
  new: ["New", "waiting"],
  proposal_sent: ["Proposal sent", "neutral"],
  accepted: ["Accepted", "done"],
  converted: ["Client", "done"],
  lost: ["Lost", "blocked"],
} as const;
export type LeadStatus = keyof typeof LEAD_STATUS;
