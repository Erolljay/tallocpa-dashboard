import { NextResponse, type NextRequest } from "next/server";
import { loadEmployees, loadItems, loadStored, payrollAccess, employeesForMonth } from "@/lib/payroll/data";
import { buildEmployeeTemplate } from "@/lib/payroll/employees-xlsx";
import { buildRegisterTemplate, monthTitle, XLSX_TYPE } from "@/lib/payroll/register-xlsx";
import { draftToTemplate, initialDraft } from "@/lib/payroll/read/draft";
import type { PayrollDraft, PayrollRead } from "@/lib/payroll/read/types";
import { byName } from "@/lib/payroll/year";
import { yearWorksheet } from "../year-data";

const safe = (s: string) => s.replace(/[\\/:*?"<>|]+/g, "").trim().replace(/\s+/g, "_");

function file(body: string | Buffer, name: string, type: string) {
  return new NextResponse(typeof body === "string" ? body : new Uint8Array(body), {
    headers: { "Content-Type": type, "Content-Disposition": `attachment; filename="${name}"`, "Cache-Control": "no-store" },
  });
}

/**
 * Payroll downloads for staff (Owner and staff assigned to the client):
 *   ?kind=template&month=YYYY-MM   the month's payroll register (.xlsx), prefilled
 *   ?kind=employees                the employee master (.xlsx)
 *   ?kind=dat|csv1|csv2&year=YYYY  the 1604-C alphalist: DAT, Schedule 1 CSV, Schedule 2 CSV
 *   ?kind=submission&id=…          a register a client sent from the portal
 *   ?kind=read&document=…          the register prefilled from a payroll read from the client's own file
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/app/clients/[id]/payroll/export">) {
  const { id } = await ctx.params;
  const q = request.nextUrl.searchParams;
  const kind = q.get("kind");
  const { supabase, client } = await payrollAccess(id);

  if (kind === "template") {
    const ym = q.get("month") ?? "";
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(ym)) return new NextResponse("Bad month", { status: 400 });
    const month = `${ym}-01`;
    const [items, employees, stored] = await Promise.all([loadItems(supabase, id, true), loadEmployees(supabase, id), loadStored(supabase, id, month, month)]);
    const existing = new Map(stored.map((s) => [s.employeeId, s.lines]));
    const list = employeesForMonth(employees, month, new Set(existing.keys())).sort(byName);
    const buf = await buildRegisterTemplate({ clientName: client.name, month, employees: list, items, existing });
    return file(buf, `Payroll_Register_${safe(client.name)}_${monthTitle(month).replace(" ", "_")}.xlsx`, XLSX_TYPE);
  }
  if (kind === "read") {
    const { data: doc } = await supabase.from("documents").select("id, period").eq("id", q.get("document") ?? "").eq("client_id", id).eq("doc_type", "payroll").maybeSingle();
    const { data: ext } = doc ? await supabase.from("payroll_extractions").select("result, draft").eq("document_id", doc.id).maybeSingle() : { data: null };
    if (!doc || !ext?.result) return new NextResponse("Not found", { status: 404 });
    const month = String(doc.period).slice(0, 10);
    const [items, employees] = await Promise.all([loadItems(supabase, id), loadEmployees(supabase, id)]);
    const draft = (ext.draft as PayrollDraft | null) ?? initialDraft(ext.result as PayrollRead, employees);
    const { existing, newRows } = draftToTemplate(draft);
    const list = employeesForMonth(employees, month, new Set(existing.keys())).sort(byName);
    const buf = await buildRegisterTemplate({ clientName: client.name, month, employees: list, items, existing, newRows });
    return file(buf, `Payroll_Register_${safe(client.name)}_${monthTitle(month).replace(" ", "_")}_read.xlsx`, XLSX_TYPE);
  }
  if (kind === "employees") {
    const employees = (await loadEmployees(supabase, id)).sort(byName);
    return file(await buildEmployeeTemplate(client.name, employees), `Employees_${safe(client.name)}.xlsx`, XLSX_TYPE);
  }
  if (kind === "dat" || kind === "csv1" || kind === "csv2") {
    const year = Number(q.get("year"));
    if (!Number.isInteger(year) || year < 2018 || year > 2100) return new NextResponse("Bad year", { status: 400 });
    const w = await yearWorksheet(supabase, client, year);
    if (w.result.errors.length) return new NextResponse(`The alphalist cannot be exported yet:\n- ${w.result.errors.join("\n- ")}\n`, { status: 409, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    const a = w.attachments.find((x) => x.kind === { dat: "alphalist_dat", csv1: "alphalist_schedule1_csv", csv2: "alphalist_schedule2_csv" }[kind])!.build();
    return file(a.body, a.fileName, a.contentType);
  }
  if (kind === "submission") {
    const { data: sub } = await supabase.from("payroll_submissions").select("storage_path").eq("id", q.get("id") ?? "").eq("client_id", id).maybeSingle();
    if (!sub) return new NextResponse("Not found", { status: 404 });
    const { data: signed, error } = await supabase.storage.from("payroll").createSignedUrl(sub.storage_path, 60);
    if (error || !signed) return new NextResponse("File not available", { status: 404 });
    return NextResponse.redirect(signed.signedUrl);
  }
  return new NextResponse("Unknown download", { status: 400 });
}
