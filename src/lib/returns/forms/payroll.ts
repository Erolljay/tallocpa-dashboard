/** Worksheets for the compensation withholding returns (spec §3.7), from the client's payroll (src/lib/payroll). */
import type { FormModule } from "../types";
import { form1601C } from "./payroll/form-1601c";
import { form1604C } from "./payroll/form-1604c";

export const PAYROLL_FORMS: FormModule[] = [form1601C, form1604C];
