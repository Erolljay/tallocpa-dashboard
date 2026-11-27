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

export const statusLabel: Record<string, string> = {
  onboarding: "Onboarding",
  active: "Active",
  inactive: "Inactive",
  archived: "Archived",
};

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
