/** The employee form (add / edit / separate). Names match the form inputs and the employees columns. */
import { z } from "zod";
import { EMPLOYMENT_STATUSES, SEPARATION_REASONS, type EmploymentStatus, type SeparationReason } from "./types";

const optional = <T extends z.ZodType>(s: T) => z.preprocess((v) => (v === "" || v == null ? undefined : v), s.optional());
const checkbox = z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean());

export const employeeSchema = z
  .object({
    employee_no: optional(z.string().trim().max(30)),
    last_name: z.string().trim().min(1, "Enter the last name."),
    first_name: z.string().trim().min(1, "Enter the first name."),
    middle_name: optional(z.string().trim().max(60)),
    tin: optional(z.string().trim().regex(/^\d{3}-?\d{3}-?\d{3}(-?\d{3,5})?$/, "Use the format 123-456-789 (branch optional).")),
    birth_date: optional(z.iso.date()),
    address: optional(z.string().trim().max(300)),
    zip_code: optional(z.string().trim().max(10)),
    region: optional(z.string().trim().max(40)),
    nationality: z.preprocess((v) => (v === "" || v == null ? "FILIPINO" : v), z.string().trim().max(40)),
    employment_status: z.enum(Object.keys(EMPLOYMENT_STATUSES) as [EmploymentStatus, ...EmploymentStatus[]]),
    is_mwe: checkbox,
    mwe_daily_rate: optional(z.coerce.number().positive("Enter the daily minimum wage.")),
    hire_date: optional(z.iso.date()),
    separation_date: optional(z.iso.date()),
    separation_reason: optional(z.enum(Object.keys(SEPARATION_REASONS) as [SeparationReason, ...SeparationReason[]])),
    substituted_filing: checkbox,
    active: checkbox,
  })
  .refine((v) => !v.is_mwe || v.region, { path: ["region"], message: "Enter the region for a minimum wage earner." })
  .refine((v) => !v.is_mwe || v.mwe_daily_rate, { path: ["mwe_daily_rate"], message: "Enter the daily minimum wage." })
  .refine((v) => !v.separation_date || v.separation_reason, { path: ["separation_reason"], message: "Choose the reason for separation." })
  .refine((v) => !v.separation_reason || v.separation_date, { path: ["separation_date"], message: "Enter the separation date." })
  .refine((v) => !v.separation_date || !v.hire_date || v.separation_date >= v.hire_date, { path: ["separation_date"], message: "Separation cannot be before the hire date." })
  .transform((v) => {
    const digits = (v.tin ?? "").replace(/\D/g, "");
    return {
      employee_no: v.employee_no ?? null,
      last_name: v.last_name,
      first_name: v.first_name,
      middle_name: v.middle_name ?? null,
      tin: digits ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}` : null,
      tin_branch: digits.length > 9 ? digits.slice(9).padStart(4, "0") : "0000",
      birth_date: v.birth_date ?? null,
      address: v.address ?? null,
      zip_code: v.zip_code ?? null,
      region: v.region ?? null,
      nationality: v.nationality.toUpperCase(),
      employment_status: v.employment_status,
      is_mwe: v.is_mwe,
      mwe_daily_rate: v.is_mwe ? (v.mwe_daily_rate ?? null) : null,
      hire_date: v.hire_date ?? null,
      separation_date: v.separation_date ?? null,
      separation_reason: v.separation_reason ?? null,
      substituted_filing: v.substituted_filing,
      // A separated employee is no longer on the monthly grid.
      active: v.separation_date ? false : v.active,
      needs_details: false,
    };
  });

export type EmployeeInput = z.output<typeof employeeSchema>;
