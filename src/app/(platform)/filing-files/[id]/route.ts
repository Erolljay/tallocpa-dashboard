import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Opens a file kept on a return (the scanned copy, a validation report, a DAT copy).
 * Row-level security decides who may: staff of the client, and the client's users for
 * the scanned copy and the validation report once the return is Filed & paid. The link
 * works for one minute.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/filing-files/[id]">) {
  const { id } = await ctx.params;
  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) return NextResponse.redirect(new URL(`/login?next=/filing-files/${id}`, request.url));
  const { data: f } = await supabase.from("filing_files").select("storage_path, file_name").eq("id", id).maybeSingle();
  if (!f) return new NextResponse("Not found", { status: 404 });
  const { data: signed, error } = await supabase.storage.from("filing-files").createSignedUrl(f.storage_path, 60, { download: f.file_name });
  if (error || !signed) return new NextResponse("File not available", { status: 404 });
  return NextResponse.redirect(signed.signedUrl);
}
