export const taxpayerTypeLabel: Record<string, string> = {
  individual: "Individual",
  opc: "One Person Corporation",
  partnership: "Partnership",
  corporation: "Corporation",
  non_stock: "Non-stock / Non-profit",
};

export const statusTone = {
  onboarding: "progress",
  active: "done",
  inactive: "neutral",
  archived: "neutral",
} as const;

/** Clients the firm is working for. Inactive and archived ones are left out of dashboard counts. */
export const currentClientStatuses = ["onboarding", "active"];

/**
 * The last day (YYYY-MM-DD, Manila) a client's portal contacts can still sign in to see
 * an inactive or archived client: two months after it was marked inactive, less a day.
 * Mirrors current_identity() in supabase/migrations/20270106000001_inactive_client_portal.sql.
 */
export function portalAccessEndsOn(inactiveSince: string): string {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date(inactiveSince)).split("-").map(Number);
  // Two months on, kept to the last day of a shorter month (as Postgres does), then a day back.
  const lastDay = new Date(Date.UTC(y, m + 2, 0)).getUTCDate();
  const end = new Date(Date.UTC(y, m + 1, Math.min(d, lastDay)));
  end.setUTCDate(end.getUTCDate() - 1);
  return end.toISOString().slice(0, 10);
}

export const statusLabel: Record<string, string> = {
  onboarding: "Onboarding",
  active: "Active",
  inactive: "Inactive",
  archived: "Archived",
};

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
