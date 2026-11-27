import { z } from "zod";
import { TAX_TYPES, TAXPAYER_TYPES } from "./obligations";

const optional = <T extends z.ZodType>(s: T) => z.preprocess((v) => (v === "" || v == null ? undefined : v), s.optional());

/** Fields shared by the new-client and edit-client forms (spec §3.2). Names match the form inputs. */
const clientFields = {
  name: z.string().trim().min(2, "Enter the registered name."),
  taxpayer_type: z.enum(TAXPAYER_TYPES, "Choose the taxpayer type."),
  tin: optional(z.string().trim().regex(/^\d{3}-\d{3}-\d{3}(-\d{3,5})?$/, "Use the format 123-456-789-00000.")),
  rdo_code: optional(z.string().trim().max(10)),
  registered_address: optional(z.string().trim().max(300)),
  zip_code: optional(z.string().trim().regex(/^\d{4}$/, "Four digits.")),
  fiscal_year_end_month: z.coerce.number().int().min(1).max(12),
  filing_channel: z.enum(["ebirforms", "efps"]),
  efps_group: optional(z.enum(["A", "B", "C", "D", "E"])),
  book_type: z.enum(["manual", "loose_leaf"]),
  payment_mode: z.enum(["client_pays_direct", "firm_remits"]),
  submission_cutoff_day: z.coerce.number().int().min(1).max(28),
  branch_id: z.uuid("Choose the branch."),
  tax_types: z.array(z.enum(Object.keys(TAX_TYPES) as [keyof typeof TAX_TYPES, ...(keyof typeof TAX_TYPES)[]])).default([]),
};

const needsEfpsGroup = (v: { filing_channel: string; efps_group?: string }) => v.filing_channel !== "efps" || Boolean(v.efps_group);
const efpsGroupError = { path: ["efps_group"], message: "Choose the eFPS group." };
const dropUnusedGroup = <T extends { filing_channel: string; efps_group?: string }>(v: T): T => ({
  ...v,
  efps_group: v.filing_channel === "efps" ? v.efps_group : undefined,
});

/** New-client form. Preparer and reviewer are optional and can be assigned later. */
export const newClientSchema = z
  .object({
    ...clientFields,
    registration_date: z.iso.date("Enter the COR registration date."),
    preparer_id: optional(z.uuid("Choose a preparer.")),
    reviewer_id: optional(z.uuid("Choose a reviewer.")),
  })
  .refine(needsEfpsGroup, efpsGroupError)
  .transform(dropUnusedGroup);

/** Edit-client form. `effective_date` is needed only when the tax setup changes. */
export const editClientSchema = z
  .object({
    ...clientFields,
    effective_date: optional(z.iso.date("Enter the date the change took effect.")),
  })
  .refine(needsEfpsGroup, efpsGroupError)
  .transform(dropUnusedGroup);

export type NewClient = z.infer<typeof newClientSchema>;

export function formToObject(form: FormData) {
  const obj: Record<string, unknown> = {};
  for (const key of new Set(form.keys())) {
    obj[key] = key === "tax_types" || key === "changes" ? form.getAll(key) : form.get(key);
  }
  return obj;
}

export const engagementSchema = z.object({
  service_line: z.string().min(1, "Choose a service line."),
  monthly_retainer: z.coerce.number().min(0, "Enter zero or more.").multipleOf(0.01),
  start_date: z.iso.date("Enter the start date."),
});

export const assignmentSchema = z.object({
  user_id: z.uuid("Choose a staff member."),
  role: z.enum(["preparer", "reviewer"]),
});
