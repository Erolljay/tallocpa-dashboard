/**
 * SLOT for the Books month lock (docs/REWORK.md, decision 9).
 *
 * Another branch builds `./lock-bar.tsx` exporting `BooksLockBar({ clientId, month })`.
 * At merge, replace this placeholder with:
 *
 *   import { BooksLockBar } from "./lock-bar";
 *   export function BooksLockBarSlot(props: { clientId: string; month: string }) {
 *     return <BooksLockBar {...props} />;
 *   }
 *
 * The Books header (books-frame.tsx) already renders it beside the month selector.
 */
export function BooksLockBarSlot(props: { clientId: string; month: string }) {
  void props;
  return null;
}
