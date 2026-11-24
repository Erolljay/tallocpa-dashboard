import { z } from "zod";

const email = z.preprocess((v) => (typeof v === "string" ? v.trim().toLowerCase() : v), z.email("Enter a valid email address."));
const name = z.string().trim().min(2, "Enter the person's full name.").max(120);

export const inviteStaffSchema = z.object({
  full_name: name,
  email,
  role: z.enum(["reviewer", "staff"], "Choose a role."),
  branch_id: z.uuid("Choose a branch."),
});

export const updateStaffSchema = z.object({
  role: z.enum(["reviewer", "staff"]),
  capacity_points: z.coerce.number().min(0).max(500),
  branch_id: z.uuid("Choose a branch."),
  active: z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean()),
});

export const clientUserSchema = z.object({
  full_name: name,
  email,
  position: z.preprocess((v) => (v === "" || v == null ? undefined : v), z.string().trim().max(80).optional()),
});

/** Load points (Q51): monthly retainer ÷ ₱1,000. */
export function loadPoints(monthlyRetainers: readonly number[]): number {
  return Math.round((monthlyRetainers.reduce((s, r) => s + r, 0) / 1000) * 100) / 100;
}
