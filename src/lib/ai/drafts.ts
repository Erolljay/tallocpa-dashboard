/**
 * AI employees' drafts (migration 20270108000001; docs/AI-WORKFORCE.md §2). A tool with
 * effect "draft" saves what it prepares here, for a person to accept or reject; nothing is
 * applied by itself.
 *
 * Convention for the payload: put what a reviewer should read in `summary`, an array of
 * { label, value } in the order to show them; keep machine-readable fields beside it.
 */
import type { Queryable } from "@/lib/mcp/types";

export interface DraftLine {
  label: string;
  value: string;
}

export interface NewDraft {
  kind: string;
  clientId: string | null;
  subject?: { table: string; id: string };
  /** What the reviewer reads, in order. */
  summary: DraftLine[];
  /** Machine-readable details (e.g. suggested account code) kept with the draft. */
  data?: Record<string, unknown>;
  /** The AI employee's short reason, shown to the reviewer. */
  note: string;
}

/** Saves a draft as the AI employee (the caller of the tool). Replaces its open draft of the same kind on the same subject. */
export async function saveDraft(db: Queryable, d: NewDraft): Promise<{ id: string; kind: string; status: string }> {
  const payload = { summary: d.summary.map((l) => ({ label: String(l.label), value: String(l.value) })), ...(d.data ?? {}) };
  const { rows } = await db.query<{ id: string; kind: string; status: string }>(
    `select id, kind, status from public.ai_save_draft($1, $2, $3, $4, $5::jsonb, $6)`,
    [d.kind, d.clientId, d.subject?.table ?? null, d.subject?.id ?? null, JSON.stringify(payload), d.note],
  );
  return rows[0];
}

/** Lines to show for a stored payload: its summary, or its simple top-level values. */
export function draftLines(payload: unknown): DraftLine[] {
  if (typeof payload !== "object" || payload === null) return [];
  const p = payload as Record<string, unknown>;
  if (Array.isArray(p.summary)) {
    return p.summary.flatMap((l) =>
      typeof l === "object" && l !== null && "label" in l && "value" in l ? [{ label: String((l as DraftLine).label), value: String((l as DraftLine).value) }] : [],
    );
  }
  return Object.entries(p)
    .filter(([, v]) => ["string", "number", "boolean"].includes(typeof v))
    .map(([k, v]) => ({ label: k.replace(/_/g, " "), value: String(v) }));
}

export const DRAFT_KIND_LABELS: Record<string, string> = {};

/** A kind's label for people: registered by the feature that uses it, else from its name. */
export const draftKindLabel = (kind: string) => DRAFT_KIND_LABELS[kind] ?? kind.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
