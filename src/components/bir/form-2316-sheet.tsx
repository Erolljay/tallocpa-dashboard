/**
 * The printable sheet around one or more 2316s: scrolls sideways on narrow
 * screens; in print, only the certificates show, one per A4 page (the app's
 * navigation is print:hidden in the layouts).
 */
import type { Form2316Data } from "@/lib/payroll/certificate";
import { Form2316Set } from "./form-2316";

export function Form2316Sheet({ forms }: { forms: Form2316Data[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 print:m-0 print:overflow-visible print:p-0">
      <Form2316Set forms={forms} />
    </div>
  );
}
