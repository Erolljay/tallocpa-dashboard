/**
 * Branches (Q68): where a client is served from and where staff work. The firm has one
 * branch (Iloilo) now; access does not depend on the branch yet, only assignments do.
 */
import { z } from "zod";

export interface Branch {
  id: string;
  code: string;
  name: string;
  address: string | null;
  active: boolean;
}

const optional = (v: unknown) => (v === "" || v == null ? undefined : v);

export const branchSchema = z.object({
  code: z.preprocess((v) => (typeof v === "string" ? v.trim().toUpperCase() : v), z.string().regex(/^[A-Z]{2,6}$/, "Use 2 to 6 letters, e.g. ILO.")),
  name: z.string().trim().min(2, "Enter the branch name.").max(80),
  address: z.preprocess(optional, z.string().trim().max(200).optional()),
});

export const branchUpdateSchema = branchSchema.omit({ code: true }).extend({
  active: z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean()),
});

/**
 * People grouped by branch for a picker: the chosen branch first, then the others by
 * name, then anyone without a branch. Closed branches keep their people listed.
 */
export function groupByBranch<T extends { branch_id: string | null }>(people: readonly T[], branches: readonly Branch[], first?: string | null) {
  const order = [...branches].sort((a, b) => (a.id === first ? -1 : b.id === first ? 1 : a.name.localeCompare(b.name)));
  const groups = order.map((b) => ({ branch: b, people: people.filter((p) => p.branch_id === b.id) })).filter((g) => g.people.length > 0);
  const none = people.filter((p) => !p.branch_id || !branches.some((b) => b.id === p.branch_id));
  return none.length ? [...groups, { branch: null, people: none }] : groups;
}
