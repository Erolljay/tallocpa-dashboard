import { z } from "zod";
import { TAXPAYER_TYPES } from "@/lib/clients/obligations";
import { STEP_STATUSES, UPDATE_CHANGES, type StepStatus, type UpdateChange } from "./steps";

const optional = <T extends z.ZodType>(s: T) => z.preprocess((v) => (v === "" || v == null ? undefined : v), s.optional());
const checkbox = z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean());

/** New registration: the proposed business and what the firm handles. */
export const newRegistrationSchema = z.object({
  name: z.string().trim().min(2, "Enter the proposed business name."),
  taxpayer_type: z.enum(TAXPAYER_TYPES, "Choose the kind of business."),
  registered_address: optional(z.string().trim().max(300)),
  lgu: optional(z.string().trim().max(120)),
  fiscal_year_end_month: z.coerce.number().int().min(1).max(12),
  branch_id: z.uuid("Choose the branch."),
  lgu_served: checkbox,
  employer: checkbox,
  start_date: z.iso.date("Enter the start date."),
  target_date: optional(z.iso.date("Enter a valid date.")),
  notes: optional(z.string().trim().max(1000)),
  preparer_id: optional(z.uuid("Choose a preparer.")),
});

/** One step's progress. */
export const stepUpdateSchema = z
  .object({
    status: z.enum(Object.keys(STEP_STATUSES) as [StepStatus, ...StepStatus[]], "Choose a status."),
    reference_no: optional(z.string().trim().max(120)),
    done_on: optional(z.iso.date("Enter a valid date.")),
    government_fee: optional(z.coerce.number().min(0, "Enter zero or more.").multipleOf(0.01, "Use pesos and centavos.")),
    notes: optional(z.string().trim().max(1000)),
  })
  .refine((v) => v.status !== "done" || Boolean(v.done_on), { path: ["done_on"], message: "Enter the date this step was done." });

/** Annual renewal for an existing client. */
export const renewalSchema = z.object({
  period_year: z.coerce.number().int().min(2000).max(2100),
  lgu_served: checkbox,
  dti_due: checkbox,
  target_date: optional(z.iso.date("Enter a valid date.")),
  notes: optional(z.string().trim().max(1000)),
});

/** Closing an existing client's business. */
export const closureSchema = z.object({
  effective_date: z.iso.date("Enter the day the business stopped operating."),
  lgu_served: checkbox,
  employer: checkbox,
  target_date: optional(z.iso.date("Enter a valid date.")),
  notes: optional(z.string().trim().max(1000)),
});

/** BIR update (Form 1905) for an existing client. */
export const updateSchema = z.object({
  effective_date: z.iso.date("Enter the date of the change."),
  changes: z.array(z.enum(Object.keys(UPDATE_CHANGES) as [UpdateChange, ...UpdateChange[]])).min(1, "Choose what changes."),
  lgu_served: checkbox,
  employer: checkbox,
  lgu: optional(z.string().trim().max(120)),
  target_date: optional(z.iso.date("Enter a valid date.")),
  notes: optional(z.string().trim().max(1000)),
});

/** New branch of an existing client. */
export const branchSchema = z.object({
  branch_name: z.string().trim().min(2, "Enter the branch name or address.").max(200),
  lgu: optional(z.string().trim().max(120)),
  lgu_served: checkbox,
  target_date: optional(z.iso.date("Enter a valid date.")),
  notes: optional(z.string().trim().max(1000)),
});
