/** Form checks for Settings → AI Employees. The database enforces the same rules. */
import { z } from "zod";
import { KEY_LIFETIMES } from "./credentials";

const uuid = z.string().uuid();

export const aiSettingsSchema = z.object({
  supervisor_user_id: z.union([uuid, z.literal("")]).transform((v) => (v === "" ? null : v)),
  books_level: z.enum(["none", "summary", "full"]),
  all_clients: z.union([z.literal("on"), z.null(), z.undefined()]).transform((v) => v === "on"),
  daily_limit: z.coerce.number().int("Whole number of calls.").min(0, "0 or more.").max(100000, "At most 100,000."),
  monthly_cap: z.coerce.number().min(0, "0 or more.").max(1_000_000, "At most ₱1,000,000.").multipleOf(0.01, "Up to centavos."),
});

export type AiSettings = z.output<typeof aiSettingsSchema>;

/** Marketing (no client data) keeps no books access and no clients, whatever the form says. */
export function settingsFor(clientData: boolean, s: AiSettings): AiSettings {
  return clientData ? s : { ...s, books_level: "none", all_clients: false };
}

export const assignSchema = z.object({ client_id: uuid });

export const keySchema = z.object({
  label: z.string().trim().max(80, "At most 80 characters.").default(""),
  days: z.coerce.number().refine((d) => d in KEY_LIFETIMES, "Choose how long the key lasts."),
});
