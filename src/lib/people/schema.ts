import { z } from "zod";
import { CONTACT_ACCESS } from "@/lib/contacts/access";

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

const position = z.preprocess((v) => (v === "" || v == null ? undefined : v), z.string().trim().max(80).optional());
/** A contact's mobile number: digits, spaces, +, - and brackets (e.g. 0917 123 4567, +63 917 123 4567). */
export const mobile = z.preprocess(
  (v) => (typeof v === "string" ? (v.trim() === "" ? undefined : v.trim().replace(/\s+/g, " ")) : v),
  z.string().regex(/^[0-9+() -]{7,30}$/, "Enter a mobile number, e.g. 0917 123 4567.").optional(),
);
/** What a contact may do for a business; full when the form leaves it out. */
const access = z.preprocess((v) => (v === "" || v == null ? undefined : v), z.enum(CONTACT_ACCESS, "Choose the access level.").default("full"));

export const clientUserSchema = z.object({
  full_name: name,
  email,
  mobile,
  position,
  access,
});

/** A new contact from Clients → Contacts: the person and their first business. */
export const newContactSchema = clientUserSchema.extend({
  client_id: z.uuid("Choose a business."),
});

/** Linking an existing contact to one more business. */
export const contactLinkSchema = z.object({
  client_id: z.uuid("Choose a business."),
  position,
  access,
});

/** Changing what a contact may do for one business. */
export const contactAccessSchema = z.object({ position, access });

/** A contact's own details, the same on every business they are linked to. */
export const contactDetailsSchema = z.object({ full_name: name, mobile });

/** Load points (Q51): monthly retainer ÷ ₱1,000. */
export function loadPoints(monthlyRetainers: readonly number[]): number {
  return Math.round((monthlyRetainers.reduce((s, r) => s + r, 0) / 1000) * 100) / 100;
}
