import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Opens a file kept on an SSS, PhilHealth or Pag-IBIG remittance (the report, the PRN,
 * the proof of payment). Row-level security decides who may: staff of the client, and
 * the client's users for the PRN once approved and every file once remitted. The link
 * works for one minute.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/remittance-files/[id]">) {
  const { id } = await ctx.params;
  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) return NextResponse.redirect(new URL(`/login?next=/remittance-files/${id}`, request.url));
  const { data: f } = await supabase.from("contribution_remittance_files").select("storage_path, file_name").eq("id", id).maybeSingle();
  if (!f) return new NextResponse("Not found", { status: 404 });
  const { data: signed, error } = await supabase.storage.from("remittance-files").createSignedUrl(f.storage_path, 60, { download: f.file_name });
  if (error || !signed) return new NextResponse("File not available", { status: 404 });
  return NextResponse.redirect(signed.signedUrl);
}
