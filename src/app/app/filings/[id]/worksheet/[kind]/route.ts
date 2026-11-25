import { NextResponse, type NextRequest } from "next/server";
import { requireStaff } from "@/lib/auth";
import { LOCKED_STATUSES, loadWorksheet } from "@/lib/returns/load";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Downloads one attachment of a worksheet (e.g. the QAP DAT file), built from
 * the same figures the worksheet page shows. Staff only; row-level security
 * decides which filings they can see. Refused while the worksheet has errors,
 * since rows with errors are left out of the file.
 */
export async function GET(_request: NextRequest, ctx: RouteContext<"/app/filings/[id]/worksheet/[kind]">) {
  const { id, kind } = await ctx.params;
  await requireStaff();
  const supabase = await supabaseServer();
  const loaded = await loadWorksheet(id, supabase);
  if (loaded?.notReady) return new NextResponse(`${loaded.notReady}.`, { status: 409 });
  if (!loaded?.module || !loaded.ctx) return new NextResponse("Not found", { status: 404 });

  const locked = LOCKED_STATUSES.includes(loaded.filing.status);
  const result = locked && loaded.saved?.result ? loaded.saved.result : loaded.module.compute(loaded.ctx);
  const attachment = loaded.module.attachments?.(loaded.ctx, result).find((a) => a.kind === kind);
  if (!attachment) return new NextResponse("Not found", { status: 404 });
  if (result.errors.length) return new NextResponse("The worksheet has problems to fix first; see the worksheet page.", { status: 409 });

  const file = attachment.build();
  return new NextResponse(file.body, {
    headers: {
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.fileName.replace(/[^A-Za-z0-9._-]/g, "_")}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
