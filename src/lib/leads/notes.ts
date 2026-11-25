/**
 * One Notes timeline (rework decision 21): the website inquiry answers, the
 * discovery-call notes, every onboarding answer and note, and notes written on
 * the client. The rows come from the lead_notes and client_notes_timeline views;
 * this turns each into what the timeline shows. Pure.
 */
import { taxpayerTypeLabel } from "@/lib/clients/labels";
import { MANUAL_ITEM_LABELS } from "@/lib/onboarding/checklist";
import { SERVICE_LABELS } from "../funnel/terms";

export type NoteSource = "inquiry" | "discovery_call" | "onboarding" | "note";

export interface NoteRow {
  source: NoteSource;
  source_id: string;
  at: string;
  author: string | null;
  body: string | null;
  details: Record<string, unknown> | null;
}

export interface NoteEntry {
  key: string;
  source: NoteSource;
  /** What the note is, e.g. "Website inquiry" or "Onboarding · Kickoff meeting held". */
  label: string;
  at: string;
  author: string | null;
  /** The inquiry's answers, one per line. */
  answers: { question: string; answer: string }[];
  body: string | null;
}

const SOURCE_LABEL: Record<NoteSource, string> = {
  inquiry: "Website inquiry",
  discovery_call: "Discovery call",
  onboarding: "Onboarding",
  note: "Note",
};

const php = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
const plural = (n: number, one: string) => `${n} ${one}${n === 1 ? "" : "s"}`;

/** The inquiry form's answers, in the order the form asks them. */
export function inquiryAnswers(d: Record<string, unknown>): { question: string; answer: string }[] {
  const out: { question: string; answer: string }[] = [];
  const add = (question: string, answer: unknown) => {
    if (answer != null && String(answer).trim() !== "") out.push({ question, answer: String(answer) });
  };
  add("Business", d.business_name);
  add("Type", taxpayerTypeLabel[String(d.taxpayer_type)] ?? d.taxpayer_type);
  const p = (d.profile ?? {}) as Record<string, unknown>;
  if (Object.keys(p).length) {
    const parts = [
      p.vatRegistered ? "VAT-registered" : "Non-VAT",
      p.documentsPerMonth != null ? `${p.documentsPerMonth} documents a month` : null,
      p.employees != null ? plural(Number(p.employees), "employee") : null,
      p.branches ? `${p.branches} branch${Number(p.branches) === 1 ? "" : "es"} besides the main office` : null,
      p.remitsContributions ? "remits SSS, PhilHealth, Pag-IBIG" : null,
      Array.isArray(p.complexity) && p.complexity.length ? (p.complexity as string[]).join(", ") : null,
    ].filter(Boolean);
    add("Profile", parts.join(" · "));
  }
  const services = Array.isArray(d.services) ? (d.services as string[]).map((s) => SERVICE_LABELS[s] ?? s).join(", ") : "";
  add("Services", services);
  if (p.bookkeeping && p.bookkeeping !== "none") add("Bookkeeping load", p.bookkeeping);
  if (typeof d.monthly_quote === "number") add("Website quote", `${php.format(d.monthly_quote)} a month`);
  add("Contact", [d.contact_name, d.email, d.mobile].filter(Boolean).join(" · "));
  return out;
}

export function noteEntry(r: NoteRow): NoteEntry {
  let label = SOURCE_LABEL[r.source];
  if (r.source === "inquiry" && r.details?.from === "staff") label = "Inquiry taken by staff";
  if (r.source === "onboarding") {
    const item = String(r.details?.item ?? r.source_id);
    label = `Onboarding · ${MANUAL_ITEM_LABELS[item as keyof typeof MANUAL_ITEM_LABELS] ?? item.replaceAll("_", " ")}`;
  }
  return {
    key: `${r.source}:${r.source_id}`,
    source: r.source,
    label,
    at: r.at,
    author: r.author,
    answers: r.source === "inquiry" && r.details ? inquiryAnswers(r.details) : [],
    body: r.body?.trim() ? r.body.trim() : null,
  };
}

/** Newest first. */
export function notesTimeline(rows: NoteRow[]): NoteEntry[] {
  return rows.map(noteEntry).sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0));
}
