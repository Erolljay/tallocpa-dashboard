/**
 * The sections of a fee schedule (Settings → Fee schedule): monthly, annual jobs,
 * ad hoc jobs and the audit. Shared by the editor (client) and the read-only view
 * of an active schedule (server), so it must not live in a "use client" file.
 */
import { auditNote, isAuditItem } from "./template";

export const PRICE_SECTIONS = [
  { key: "monthly", title: "Monthly", hint: "The monthly retainer on every quote. Each needs a price before activating (0 if included)." },
  { key: "annual", title: "Annual jobs", hint: "Not on the quote: priced in the proposal, billed once a year. A price is optional; it fills in the proposal." },
  { key: "ad_hoc", title: "Ad hoc jobs", hint: "Not on the quote: priced in the proposal, billed when done. A price is optional; it fills in the proposal." },
  { key: "audit", title: "Audit (separate engagement)", hint: auditNote(null) + " Priced by taxpayer type and annual gross sales." },
] as const;

export type PriceSectionKey = (typeof PRICE_SECTIONS)[number]["key"];

export const priceSection = (r: { billing: string; code: string }): PriceSectionKey =>
  isAuditItem(r) ? "audit" : r.billing === "annual" ? "annual" : r.billing === "one_time" ? "ad_hoc" : "monthly";
