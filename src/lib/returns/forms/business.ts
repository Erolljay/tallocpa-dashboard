/** Business-tax return worksheets: percentage tax, VAT and quarterly income tax (spec §3.7). */
import type { FormModule } from "../types";
import { form2551Q } from "./business/percentage";
import { form2550Q } from "./business/vat";
import { form1701Q, form1702Q } from "./business/income";
import { form1701, form1702RT } from "./business/annual";

export const BUSINESS_TAX_FORMS: FormModule[] = [form2551Q, form2550Q, form1701Q, form1702Q, form1701, form1702RT];

export { form2551Q, form2550Q, form1701Q, form1702Q, form1701, form1702RT };
