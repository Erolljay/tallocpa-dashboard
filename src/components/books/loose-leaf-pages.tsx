import type { PrintBook, PrintPage } from "@/lib/ledger/print";
import { splitAmount } from "@/lib/ledger/print";
import { cx } from "@/utils/cx";
import s from "./pad.module.css";

export interface LooseLeafHead {
  name: string;
  tin: string | null;
  address: string | null;
  /** Manual books: the pages are for copying into the bound book. */
  manual: boolean;
  /** The loose-leaf books permit / registration reference. */
  permit: string | null;
  /** "January 1, 2026 to January 31, 2026". */
  period: string;
}

/**
 * A book of account on ruled pad pages (decision 8), as staff print it from the
 * Books and as the client prints it from the portal. Each page has the business,
 * the book and period, the permit, and its page number.
 */
export function LooseLeafPages({ head, book, pages }: { head: LooseLeafHead; book: PrintBook; pages: PrintPage[] }) {
  return pages.map((p) => (
    <section key={p.number} className={cx(s.sheet, book.orientation === "portrait" ? s.portrait : s.landscape)}>
      <header className={s.head}>
        <div className={s.who}>
          <strong>{head.name}</strong>
          <br />
          TIN {head.tin ?? "—"}
          <br />
          {head.address ?? ""}
        </div>
        <div className={s.book}>
          <strong>{book.title}</strong>
          <br />
          {head.period}
          <br />
          {head.manual ? <span className={s.note}>For copying into the bound book</span> : head.permit ? `Loose-leaf books: ${head.permit}` : ""}
        </div>
      </header>
      <Pad book={book} lines={p.lines} />
      <footer className={s.foot}>
        <span>{head.manual ? "" : "Loose-leaf books of account"}</span>
        <span>Page {p.number}</span>
      </footer>
    </section>
  ));
}

function Pad({ book, lines }: { book: PrintBook; lines: PrintPage["lines"] }) {
  const textCols = book.columns.filter((c) => c.kind === "text");
  const moneyWidth = book.orientation === "portrait" ? 92 : 88;
  const textTotal = textCols.reduce((n, c) => n + (c.width ?? 1), 0);
  const firstText = book.columns[0].key;
  return (
    <table className={s.pad}>
      <colgroup>
        <col style={{ width: 24 }} />
        {book.columns.map((c) =>
          c.kind === "money"
            ? [<col key={`${c.key}p`} style={{ width: moneyWidth - 20 }} />, <col key={`${c.key}c`} style={{ width: 20 }} />]
            : <col key={c.key} style={{ width: `${((c.width ?? 1) / textTotal) * 100}%` }} />,
        )}
        <col style={{ width: 24 }} />
      </colgroup>
      <thead>
        <tr>
          <th className={s.no} />
          {book.columns.map((c) => (
            <th key={c.key} colSpan={c.kind === "money" ? 2 : 1} className={cx(c.kind === "money" && s.money, c.key === firstText && s.first)}>{c.label}</th>
          ))}
          <th className={cx(s.no, s.noEnd)} />
        </tr>
      </thead>
      <tbody>
        {lines.map((l, i) => (
          <tr key={i} className={cx(l?.style === "heading" && s.heading, l?.style === "total" && s.total, l?.style === "indent" && s.indent, l?.style === "note" && s.noteRow)}>
            <td className={s.no}>{i + 1}</td>
            {book.columns.map((c) => {
              if (c.kind === "money") {
                const [p, ct] = splitAmount(l?.money[c.key]);
                return [<td key={`${c.key}p`} className={s.pesos}>{p}</td>, <td key={`${c.key}c`} className={s.cents}>{ct}</td>];
              }
              const isParticulars = c.key === "particulars";
              return (
                <td key={c.key} className={cx(c.key === firstText && s.first, isParticulars && s.text1)} title={l?.text[c.key] || undefined}>
                  {l?.text[c.key] ?? ""}
                </td>
              );
            })}
            <td className={cx(s.no, s.noEnd)}>{i + 1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
