import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/** Opens a client's onboarding file (proposal, contract). RLS decides who may; the link works for one minute. */
export async function GET(request: NextRequest, ctx: RouteContext<"/client-files/[id]">) {
  const { id } = await ctx.params;
  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) return NextResponse.redirect(new URL(`/login?next=/client-files/${id}`, request.url));
  const { data: f } = await supabase.from("client_files").select("storage_path, file_name").eq("id", id).maybeSingle();
  if (!f) return new NextResponse("Not found", { status: 404 });
  const { data: signed, error } = await supabase.storage.from("client-files").createSignedUrl(f.storage_path, 60);
  if (error || !signed) return new NextResponse("File not available", { status: 404 });
  return NextResponse.redirect(signed.signedUrl);
}
