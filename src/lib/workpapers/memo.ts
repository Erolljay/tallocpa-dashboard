/**
 * The approval memo (W4; docs/UX-REVIEW.md, recommendation 6): what the Owner reads
 * before the final approval of a return — tax due against the previous period, the rate
 * on sales, the tie-outs it needs, the adjustments, the review notes raised and cleared,
 * the workpapers' sign-off, and who prepared and reviewed it. The payment check follows
 * as before. Pure; the return's page gathers the figures from the period files.
 */
import type { Centavos } from "@/lib/returns/types";
import { REFS_FOR_FORM, type SignedRef, type Signoff } from "./review";
import { TIES_FOR_FORM, type TieOut } from "./tieouts";

export interface MemoMonth {
  month: string;
  ties: TieOut[];
  adjustments: { label: string; amount: Centavos; ticked: boolean; reversed: boolean }[];
  notes: { cleared: boolean }[];
  signoffs: Signoff[];
  /** The register's gross sales for the month. */
  sales: Centavos;
}

export interface MemoInput {
  form: string;
  taxDue: Centavos | null;
  previous: { periodLabel: string; taxDue: Centavos | null } | null;
  months: MemoMonth[];
  preparedBy: string | null;
  reviewedBy: string | null;
}

export interface Memo {
  taxDue: Centavos | null;
  previous: { periodLabel: string; taxDue: Centavos | null } | null;
  change: Centavos | null;
  /** Percent change from the previous period, one decimal; null when there is no base. */
  changePct: number | null;
  sales: Centavos;
  /** Tax due as a percent of sales, two decimals; null without sales. */
  rateOnSales: number | null;
  ties: { id: string; month: string; status: TieOut["status"]; difference: Centavos | null; explanation: string | null }[];
  adjustments: { label: string; month: string; amount: Centavos; ticked: boolean }[];
  notes: { raised: number; cleared: number; open: number };
  workpapers: { ref: SignedRef; month: string; reviewed: boolean }[];
  preparedBy: string | null;
  reviewedBy: string | null;
  /** What to look at before approving. */
  attention: string[];
}

export function approvalMemo(i: MemoInput): Memo {
  const needed = TIES_FOR_FORM[i.form] ?? [];
  const refs = REFS_FOR_FORM[i.form] ?? [];
  const sales = i.months.reduce((s, m) => s + m.sales, 0);
  const prevTax = i.previous?.taxDue ?? null;
  const change = i.taxDue != null && prevTax != null ? i.taxDue - prevTax : null;
  const changePct = change != null && prevTax ? Math.round((change / prevTax) * 1000) / 10 : null;
  const ties = i.months.flatMap((m) =>
    m.ties.filter((t) => needed.includes(t.id) && t.status !== "not_applicable").map((t) => ({ id: t.id, month: m.month, status: t.status, difference: t.difference, explanation: t.explanation })),
  );
  const adjustments = i.months.flatMap((m) => m.adjustments.filter((a) => !a.reversed).map((a) => ({ label: a.label, month: m.month, amount: a.amount, ticked: a.ticked })));
  const allNotes = i.months.flatMap((m) => m.notes);
  const notes = { raised: allNotes.length, cleared: allNotes.filter((n) => n.cleared).length, open: allNotes.filter((n) => !n.cleared).length };
  const workpapers = i.months.flatMap((m) => refs.map((ref) => ({ ref, month: m.month, reviewed: Boolean(m.signoffs.find((s) => s.ref === ref)?.reviewedAt) })));

  const attention: string[] = [];
  if (changePct != null && Math.abs(changePct) >= 30) attention.push(`Tax due ${change! > 0 ? "rose" : "fell"} ${Math.abs(changePct)}% from ${i.previous!.periodLabel}.`);
  if (i.taxDue === 0 && (prevTax ?? 0) > 0) attention.push(`No tax due, against ${i.previous!.periodLabel}'s.`);
  const explained = ties.filter((t) => t.status === "explained");
  if (explained.length) attention.push(`${explained.length} tie-out difference${explained.length === 1 ? " is" : "s are"} explained rather than clean.`);
  const open = ties.filter((t) => t.status === "open");
  if (open.length) attention.push(`${open.length} tie-out${open.length === 1 ? " is" : "s are"} still open.`);
  const unticked = adjustments.filter((a) => !a.ticked);
  if (unticked.length) attention.push(`${unticked.length} adjustment${unticked.length === 1 ? " is" : "s are"} not ticked by the reviewer.`);
  if (notes.open) attention.push(`${notes.open} review note${notes.open === 1 ? " is" : "s are"} still open.`);
  if (i.preparedBy && i.preparedBy === i.reviewedBy) attention.push("The same person prepared and reviewed it.");
  return { taxDue: i.taxDue, previous: i.previous, change, changePct, sales, rateOnSales: sales > 0 && i.taxDue != null ? Math.round((i.taxDue / sales) * 10000) / 100 : null, ties, adjustments, notes, workpapers, preparedBy: i.preparedBy, reviewedBy: i.reviewedBy, attention };
}
