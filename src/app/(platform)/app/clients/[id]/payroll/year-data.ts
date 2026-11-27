import "server-only";
import { loadPayrollContext } from "@/lib/payroll/load";
import { form1604C } from "@/lib/returns/forms/payroll/form-1604c";
import type { WorksheetContext } from "@/lib/returns/types";
import type { PayrollClient } from "@/lib/payroll/data";
import type { SupabaseClient } from "@supabase/supabase-js";

/** The 1604-C worksheet for a calendar year, computed from the payroll (same module the filing worksheet uses). */
export async function yearWorksheet(supabase: SupabaseClient, client: PayrollClient, year: number) {
  const payroll = await loadPayrollContext(supabase, client.id, "1604-C", `${year}-01-01`, `${year}-12-31`);
  const ctx: WorksheetContext = {
    client: {
      id: client.id,
      name: client.name,
      tin: client.tin,
      rdoCode: client.rdo_code,
      registeredAddress: client.registered_address,
      zipCode: client.zip_code,
      taxpayerType: "corporation",
      fiscalYearEndMonth: 12,
      vatRegistered: false,
    },
    filing: { id: "", form: "1604-C", periodLabel: String(year), periodStart: `${year}-01-01`, periodEnd: `${year}-12-31`, dueDate: `${year + 1}-01-31` },
    documents: [],
    inputs: {},
    priorFigures: {},
    payroll,
  };
  const result = form1604C.compute(ctx);
  return { ctx, payroll, result, attachments: form1604C.attachments!(ctx, result) };
}
