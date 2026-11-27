import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Opens a proof file on a registration step (a government receipt, certificate or
 * permit). Row-level security decides who may: staff on the client and the client's
 * own users. The link works for one minute.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/registration-files/[id]">) {
  const { id } = await ctx.params;
  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) return NextResponse.redirect(new URL(`/login?next=/registration-files/${id}`, request.url));
  const { data: f } = await supabase.from("registration_step_files").select("storage_path, file_name").eq("id", id).maybeSingle();
  if (!f) return new NextResponse("Not found", { status: 404 });
  const { data: signed, error } = await supabase.storage.from("registration-files").createSignedUrl(f.storage_path, 60, { download: f.file_name });
  if (error || !signed) return new NextResponse("File not available", { status: 404 });
  return NextResponse.redirect(signed.signedUrl);
}
