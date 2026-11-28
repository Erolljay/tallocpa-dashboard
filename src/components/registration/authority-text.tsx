import { Fragment } from "react";
import { cx } from "@/utils/cx";

export type Blank = { kind: "missing" | "staff"; label: string };
export type Piece = string | Blank;

/** Splits an authority document's marked text (⟦missing:Label⟧ / ⟦staff:Label⟧) into text and blanks. */
export function piecesOf(marked: string): Piece[] {
  const out: Piece[] = [];
  let last = 0;
  for (const m of marked.matchAll(/⟦(missing|staff):([^⟧]+)⟧/g)) {
    if (m.index > last) out.push(marked.slice(last, m.index));
    out.push({ kind: m[1] as Blank["kind"], label: m[2] });
    last = m.index + m[0].length;
  }
  if (last < marked.length) out.push(marked.slice(last));
  return out;
}

/** The distinct blanks of a document, in order: what staff fill (the representative) first, then what the app lacks. */
export function blanksOf(marked: string): Blank[] {
  const seen = new Map<string, Blank>();
  for (const p of piecesOf(marked)) if (typeof p !== "string" && !seen.has(p.label)) seen.set(p.label, p);
  return [...seen.values()].sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "staff" ? -1 : 1));
}

/**
 * An authority document's text with its blanks highlighted: what the app does not hold in
 * the error colour, the firm's representative (filled by staff for each client) in the
 * accent colour. `values` fills blanks by label (the print page's inputs, never saved).
 */
export function AuthorityText({ marked, values = {}, className }: { marked: string; values?: Record<string, string>; className?: string }) {
  return (
    <div className={cx("whitespace-pre-wrap break-words text-body-regular text-text-primary", className)}>
      {piecesOf(marked).map((p, i) => {
        if (typeof p === "string") return <Fragment key={i}>{p}</Fragment>;
        const v = values[p.label]?.trim();
        if (v) return <Fragment key={i}>{v}</Fragment>;
        return (
          <span
            key={i}
            title={p.kind === "staff" ? `For staff to fill: ${p.label}` : `Not in the app: ${p.label}`}
            className={cx(
              "rounded-sm px-0.5 print:bg-transparent print:text-text-primary",
              p.kind === "staff" ? "bg-accent-50 text-text-primary" : "bg-background-secondary-default text-text-error-primary",
            )}
          >
            [__________<span className="print:hidden"> {p.label}</span>]
          </span>
        );
      })}
    </div>
  );
}
