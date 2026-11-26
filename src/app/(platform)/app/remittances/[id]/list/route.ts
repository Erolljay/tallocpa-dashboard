import ExcelJS from "exceljs";
import { NextResponse, type NextRequest } from "next/server";
import { AGENCIES, agencyOf, isLoan, monthLabel, REMITTANCE_KINDS, type RemittanceKind } from "@/lib/remittances/labels";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * The month's contribution list as an Excel file, from the posted payroll: one row per
 * employee with the agency number and the EE, ER and EC (or the loan payment), to copy
 * into the SSS, PhilHealth or Pag-IBIG site. Staff of the client only (the function checks).
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/app/remittances/[id]/list">) {
  const { id } = await ctx.params;
  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) return NextResponse.redirect(new URL(`/login?next=/app/remittances/${id}`, request.url));
  const { data: r } = await supabase.from("contribution_remittances").select("kind, period_month, clients(name)").eq("id", id).maybeSingle();
  if (!r) return new NextResponse("Not found", { status: 404 });
  const { data: rows, error } = await supabase.rpc("remittance_employees", { p_id: id });
  if (error) return new NextResponse(error.message, { status: 404 });
  const kind = r.kind as RemittanceKind;
  const loan = isLoan(kind);
  const agency = AGENCIES[agencyOf(kind)].name;
  const client = (r.clients as unknown as { name: string } | null)?.name ?? "";

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(REMITTANCE_KINDS[kind].option.slice(0, 31));
  ws.addRow([`${client} · ${REMITTANCE_KINDS[kind].item}, ${monthLabel(r.period_month)}`]).font = { bold: true };
  ws.addRow([]);
  const head = ["Employee No.", "Last name", "First name", "Middle name", `${agency} no.`, loan ? "Loan payment" : "EE", ...(loan ? [] : ["ER"]), ...(kind === "sss" ? ["EC"] : []), "Total"];
  ws.addRow(head).font = { bold: true };
  for (const e of (rows ?? []) as { employee_no: string | null; last_name: string; first_name: string; middle_name: string | null; agency_no: string | null; ee: string; er: string; ec: string; total: string }[]) {
    ws.addRow([e.employee_no ?? "", e.last_name, e.first_name, e.middle_name ?? "", e.agency_no ?? "", Number(e.ee), ...(loan ? [] : [Number(e.er)]), ...(kind === "sss" ? [Number(e.ec)] : []), Number(e.total)]);
  }
  const first = 4;
  const last = ws.rowCount;
  const totals: (string | { formula: string })[] = ["", "Total", "", "", ""];
  for (let c = 6; c <= head.length; c++) {
    const col = ws.getColumn(c).letter;
    totals.push({ formula: `SUM(${col}${first}:${col}${Math.max(last, first)})` });
  }
  ws.addRow(totals).font = { bold: true };
  for (let c = 6; c <= head.length; c++) ws.getColumn(c).numFmt = "#,##0.00";
  ws.columns.forEach((col, i) => { col.width = i < 5 ? 18 : 14; });

  const buf = await wb.xlsx.writeBuffer();
  const name = `${client} ${REMITTANCE_KINDS[kind].option} ${r.period_month.slice(0, 7)}.xlsx`.replace(/[^\w .-]/g, "");
  return new NextResponse(buf as ArrayBuffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${name}"`,
    },
  });
}
