import { NextResponse, type NextRequest } from "next/server";
import { getIdentity } from "@/lib/auth";
import { buildRegisterTemplate, monthTitle, XLSX_TYPE } from "@/lib/payroll/register-xlsx";
import { employeesForMonth } from "@/lib/payroll/data";
import { employeeFromRow, itemFromRow, ITEM_COLUMNS } from "@/lib/payroll/rows";
import { byName } from "@/lib/payroll/year";
import { supabaseServer } from "@/lib/supabase/server";

/** The payroll register for a client user's business and a month (?client=…&month=YYYY-MM). No amounts are prefilled. */
export async function GET(request: NextRequest) {
  const id = await getIdentity();
  const q = request.nextUrl.searchParams;
  const clientId = q.get("client") ?? "";
  const ym = q.get("month") ?? "";
  const link = id.clients.find((c) => c.clientId === clientId);
  if (!link) return new NextResponse("Not found", { status: 404 });
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(ym)) return new NextResponse("Bad month", { status: 400 });
  const supabase = await supabaseServer();
  const [items, roster] = await Promise.all([
    supabase.from("payroll_items").select(ITEM_COLUMNS).eq("client_id", clientId),
    supabase.rpc("payroll_roster", { p_client: clientId }),
  ]);
  const itemList = (items.data ?? []).map((r) => itemFromRow(r as unknown as Record<string, unknown>));
  if (!itemList.length) return new NextResponse("Payroll is not set up for this business yet.", { status: 409 });
  const month = `${ym}-01`;
  const employees = employeesForMonth(((roster.data ?? []) as Record<string, unknown>[]).map(employeeFromRow), month, new Set()).sort(byName);
  const buf = await buildRegisterTemplate({ clientName: link.clientName, month, employees, items: itemList });
  const name = `Payroll_Register_${monthTitle(month).replace(" ", "_")}.xlsx`;
  return new NextResponse(new Uint8Array(buf), { headers: { "Content-Type": XLSX_TYPE, "Content-Disposition": `attachment; filename="${name}"`, "Cache-Control": "no-store" } });
}
