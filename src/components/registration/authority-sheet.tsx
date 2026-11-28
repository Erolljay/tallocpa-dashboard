"use client";

import { useState } from "react";
import { Field, Input } from "@/components/ui";
import { AuthorityText, blanksOf } from "./authority-text";
import styles from "./authority-sheet.module.css";

/**
 * The authority document on an A4 sheet, with a box per blank above it. What staff type
 * (the firm's representative, and anything the app did not hold) shows on the sheet and
 * prints, but is never saved: the printed, signed and notarized copy is the record.
 */
export function AuthoritySheet({ marked }: { marked: string }) {
  const blanks = blanksOf(marked);
  const [values, setValues] = useState<Record<string, string>>({});
  return (
    <>
      {blanks.length > 0 && (
        <div className="mb-6 grid gap-4 rounded-3xl border border-border-button-default bg-background-primary-default p-4 sm:grid-cols-2 print:hidden">
          <p className="text-body-regular text-text-secondary sm:col-span-2">
            Fill the blanks before printing, or leave them to write in by hand. Nothing typed here is saved.
          </p>
          {blanks.map((b, i) => (
            <Field key={b.label} htmlFor={`blank-${i}`} label={b.label} hint={b.kind === "staff" ? "The firm's representative for this client" : "Not in the app"}>
              <Input id={`blank-${i}`} value={values[b.label] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [b.label]: e.target.value }))} />
            </Field>
          ))}
        </div>
      )}
      <article className={`${styles.sheet} rounded-3xl border border-border-button-default bg-background-primary-default p-8 print:rounded-none print:border-0 print:p-0`}>
        <AuthorityText marked={marked} values={values} className={styles.text} />
      </article>
    </>
  );
}
