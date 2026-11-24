import type { FormModule } from "./types";
import { WITHHOLDING_FORMS } from "./forms/withholding";
import { BUSINESS_TAX_FORMS } from "./forms/business";
import { PAYROLL_FORMS } from "./forms/payroll";

const modules: FormModule[] = [...WITHHOLDING_FORMS, ...BUSINESS_TAX_FORMS, ...PAYROLL_FORMS];

/** The worksheet module for a form code, or null if the OS has no worksheet for it yet. */
export function moduleForForm(form: string): FormModule | null {
  return modules.find((m) => m.forms.includes(form)) ?? null;
}
