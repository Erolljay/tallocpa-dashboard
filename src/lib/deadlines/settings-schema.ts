import { z } from "zod";
import type { DueRule } from "./engine";
import { parseRdoList } from "./holiday-list";

const checkbox = z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean());

/** Owner's edit of a deadline rule on the Settings page. Field names match the form inputs. */
export const ruleEditSchema = z
  .object({
    due_kind: z.enum(["day_of_month_after", "days_after"]),
    months_after: z.coerce.number().int().min(1).max(12).optional(),
    day: z.union([z.literal("last"), z.coerce.number().int().min(1).max(31)]).optional(),
    days: z.coerce.number().int().min(1).max(366).optional(),
    applies_from: z.iso.date("Enter the first period end the rule applies to."),
    source: z.preprocess((v) => (typeof v === "string" && v.trim() ? v.trim() : "UNVERIFIED"), z.string().max(120)),
    verified: checkbox,
    all_efps_groups: checkbox,
  })
  .refine((v) => v.due_kind !== "day_of_month_after" || (v.months_after && v.day), { path: ["day"], message: "Choose the month and day." })
  .refine((v) => v.due_kind !== "days_after" || v.days, { path: ["days"], message: "Enter the number of days." })
  .refine((v) => !v.verified || v.source !== "UNVERIFIED", { path: ["source"], message: "Enter the BIR issuance before marking the rule verified." })
  .transform((v) => ({
    due: (v.due_kind === "days_after"
      ? { kind: "days_after", days: v.days! }
      : { kind: "day_of_month_after", monthsAfter: v.months_after!, day: v.day! }) as DueRule,
    appliesFrom: v.applies_from,
    source: v.source,
    verified: v.verified,
    allEfpsGroups: v.all_efps_groups,
  }));

export const holidaySchema = z
  .object({
    date: z.iso.date("Enter the date."),
    name: z.string().trim().min(2, "Enter the holiday's name.").max(120),
    kind: z.enum(["regular", "special", "suspension", "local"]),
    source: z.preprocess((v) => (typeof v === "string" && v.trim() ? v.trim() : "UNVERIFIED"), z.string().max(120)),
    place: z.preprocess((v) => (typeof v === "string" ? v.trim() : ""), z.string().max(120)),
    rdo_codes: z.preprocess((v) => (typeof v === "string" ? parseRdoList(v) : []), z.array(z.string())),
  })
  .refine((v) => v.kind !== "local" || v.place.length >= 2, { path: ["place"], message: "Name the city or province." })
  .refine((v) => v.kind !== "local" || v.rdo_codes.length > 0, { path: ["rdo_codes"], message: "Enter the RDO code(s) it covers, e.g. 074." })
  .transform((v) => ({
    date: v.date,
    name: v.name,
    kind: v.kind,
    source: v.source,
    place: v.kind === "local" ? v.place : null,
    rdo_codes: v.kind === "local" ? v.rdo_codes : [],
  }));

/** One row of a year's standard list, as the Owner ticks it. */
export const holidayYearRowSchema = z.object({
  date: z.iso.date(),
  name: z.string().trim().min(2).max(120),
  kind: z.enum(["regular", "special"]),
});

/** The day before an ISO date. */
export function dayBefore(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}
