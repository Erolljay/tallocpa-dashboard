/** Worksheets for the expanded withholding returns (spec §3.7). 1601-C and 1604-C live in forms/payroll. */
import type { FormModule } from "../types";
import { form0619E } from "./withholding/form-0619e";
import { form1601EQ } from "./withholding/form-1601eq";
import { form1604E } from "./withholding/form-1604e";

export const WITHHOLDING_FORMS: FormModule[] = [form0619E, form1601EQ, form1604E];
