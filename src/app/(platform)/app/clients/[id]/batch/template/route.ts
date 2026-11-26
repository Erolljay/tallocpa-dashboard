import { NextResponse, type NextRequest } from "next/server";
import { loadAccounts } from "@/lib/batch/load";
import { buildBatchTemplate, XLSX_TYPE } from "@/lib/batch/xlsx";
import { payrollAccess } from "@/lib/payroll/data";

const safe = (s: string) => s.replace(/[\\/:*?"<>|]+/g, "").trim().replace(/\s+/g, "_");

/** The batch upload template (B1) for a client: ?kind=sales|purchases, with the client's chart in the dropdowns. */
export async function GET(request: NextRequest, ctx: RouteContext<"/app/clients/[id]/batch/template">) {
  const { id } = await ctx.params;
  const kind = request.nextUrl.searchParams.get("kind");
  if (kind !== "sales" && kind !== "purchases") return new NextResponse("Unknown register", { status: 400 });
  const { supabase, client } = await payrollAccess(id);
  const buf = await buildBatchTemplate(kind, client.name, await loadAccounts(supabase, id));
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": XLSX_TYPE,
      "Content-Disposition": `attachment; filename="${kind === "sales" ? "Sales" : "Purchases"}_Register_${safe(client.name)}.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}
