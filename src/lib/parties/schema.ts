/** The party form (new and edit). Names match the form inputs and the parties columns. */
import { z } from "zod";
import { normalizeBranch, parseTin } from "./tin";

const blank = (v: unknown) => (typeof v === "string" && v.trim() === "") || v == null;
const optionalText = (max: number) => z.preprocess((v) => (blank(v) ? null : v), z.string().trim().max(max).nullable());

export const partySchema = z
  .object({
    tin: z.string().trim().refine((v) => parseTin(v) != null, "Enter the 9-digit TIN, like 123-456-789."),
    branch_code: z.preprocess((v) => (blank(v) ? "" : v), z.string().trim()).refine((v) => normalizeBranch(v) != null, "Branch code is 3 to 5 digits, like 000 or 00000."),
    kind: z.enum(["non_individual", "individual"]),
    registered_name: optionalText(200),
    last_name: optionalText(100),
    first_name: optionalText(100),
    middle_name: optionalText(100),
    trade_name: optionalText(200),
    registered_address: optionalText(300),
    zip_code: z.preprocess((v) => (blank(v) ? null : v), z.string().trim().regex(/^\d{4}$/, "ZIP code is 4 digits.").nullable()),
    vat_status: z.enum(["vat", "non_vat", "unknown"]),
    notes: optionalText(1000),
  })
  .superRefine((v, ctx) => {
    if (v.kind === "non_individual" && !v.registered_name) ctx.addIssue({ code: "custom", path: ["registered_name"], message: "Enter the registered name." });
    if (v.kind === "individual" && !v.last_name) ctx.addIssue({ code: "custom", path: ["last_name"], message: "Enter the last name." });
    if (v.kind === "individual" && !v.first_name) ctx.addIssue({ code: "custom", path: ["first_name"], message: "Enter the first name." });
  })
  .transform((v) => {
    const t = parseTin(v.tin)!;
    // A branch typed in the TIN ("123-456-789-001") counts when the branch box is left blank.
    const branch = v.branch_code ? normalizeBranch(v.branch_code)! : t.branch;
    const ind = v.kind === "individual";
    return {
      ...v,
      tin: t.tin,
      branch_code: branch,
      registered_name: ind ? null : v.registered_name,
      last_name: ind ? v.last_name : null,
      first_name: ind ? v.first_name : null,
      middle_name: ind ? v.middle_name : null,
    };
  });

export type PartyInput = z.infer<typeof partySchema>;
