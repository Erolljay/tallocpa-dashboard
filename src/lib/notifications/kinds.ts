/**
 * The kinds of notification (migration 20261213000001_notifications.sql). Shared by the
 * bell, the settings switches and the email sender. Keep in step with the kind check
 * on public.notifications.
 */

export type NotificationGroup = "returns" | "remittances" | "payments" | "requests" | "leads";
export type NotificationAudience = "staff" | "client";

export interface NotificationKindInfo {
  group: NotificationGroup;
  /** Who receives it; the settings page shows each person only their own kinds. */
  audience: NotificationAudience;
  /** The switch's label in settings. */
  label: string;
  /** The email's button. */
  action: string;
  /** Staff kinds only the Owner receives; with `approver`, a reviewer acting for the Owner too. */
  ownerOnly?: boolean;
  approver?: boolean;
}

export const NOTIFICATION_KINDS = {
  return_ready_for_review: { group: "returns", audience: "staff", label: "A return is ready for my review", action: "Review the return" },
  return_ready_for_approval: { group: "returns", audience: "staff", label: "A return is ready for final approval", action: "Approve the return", ownerOnly: true, approver: true },
  return_sent_back: { group: "returns", audience: "staff", label: "My return was sent back", action: "See what to fix" },
  return_client_query: { group: "returns", audience: "staff", label: "A client asked a question on a return", action: "Answer the question" },
  return_approved: { group: "returns", audience: "staff", label: "A return is approved and ready to file", action: "File the return" },
  esubmission_result: { group: "returns", audience: "staff", label: "eSubmission validated or came back with errors", action: "Open the return" },
  unlock_requested: { group: "returns", audience: "staff", label: "Someone asked to lock or unlock a month", action: "Decide the request", ownerOnly: true, approver: true },
  unlock_decided: { group: "returns", audience: "staff", label: "My lock or unlock request was decided", action: "Open the books" },
  return_filed: { group: "returns", audience: "client", label: "A return was filed", action: "See your returns" },
  return_for_client_approval: { group: "returns", audience: "client", label: "A return is ready for my approval", action: "Review and approve" },
  return_query_answered: { group: "returns", audience: "client", label: "My question on a return was answered", action: "Read the answer" },

  remittance_ready_for_approval: { group: "remittances", audience: "staff", label: "An SSS, PhilHealth or Pag-IBIG remittance is ready for approval", action: "Approve the remittance", ownerOnly: true },
  remittance_remitted: { group: "remittances", audience: "client", label: "An SSS, PhilHealth or Pag-IBIG remittance was paid", action: "See the proof of payment" },

  payment_proof_submitted: { group: "payments", audience: "staff", label: "A client sent proof of payment", action: "Verify the payment", ownerOnly: true },
  payment_verified: { group: "payments", audience: "client", label: "My payment was verified", action: "See billing" },
  payment_rejected: { group: "payments", audience: "client", label: "My payment could not be verified", action: "See billing" },
  statement_issued: { group: "payments", audience: "client", label: "A new statement of account", action: "View the statement" },

  request_from_client: { group: "requests", audience: "staff", label: "A client opened a request or replied", action: "Open the request" },
  request_from_firm: { group: "requests", audience: "client", label: "Tallo CPA sent a request or replied", action: "Open the request" },
  request_assigned: { group: "requests", audience: "staff", label: "A request or ticket was handed to me", action: "Open the request" },
  task_assigned: { group: "requests", audience: "staff", label: "Someone gave me a task", action: "Open the task" },

  lead_new: { group: "leads", audience: "staff", label: "A new inquiry from the website", action: "Open the lead", ownerOnly: true },
  discovery_call_booked: { group: "leads", audience: "staff", label: "A discovery call was booked", action: "Open the lead" },
  client_meeting_booked: { group: "leads", audience: "staff", label: "A client booked a meeting with me", action: "Open the calendar" },
} as const satisfies Record<string, NotificationKindInfo>;

export type NotificationKind = keyof typeof NOTIFICATION_KINDS;

export const NOTIFICATION_GROUPS: Record<NotificationGroup, string> = {
  returns: "Returns",
  remittances: "SSS, PhilHealth and Pag-IBIG",
  payments: "Payments and billing",
  requests: "Requests and tasks",
  leads: "Leads and calendar",
};

export function isNotificationKind(v: string): v is NotificationKind {
  return Object.hasOwn(NOTIFICATION_KINDS, v);
}

/**
 * The kinds a person can receive, for their settings page. Reviewers also get the
 * approver kinds: whoever the Owner names acting approver receives those.
 */
export function kindsFor(audience: NotificationAudience, role: "owner" | "reviewer" | "staff" | null): NotificationKind[] {
  return (Object.keys(NOTIFICATION_KINDS) as NotificationKind[]).filter((k) => {
    const info: NotificationKindInfo = NOTIFICATION_KINDS[k];
    if (info.audience !== audience) return false;
    if (audience === "client" || !info.ownerOnly) return true;
    return role === "owner" || (role === "reviewer" && info.approver === true);
  });
}
