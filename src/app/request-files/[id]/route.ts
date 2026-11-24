import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Opens a file attached to a request or ticket message. The database decides
 * whether the signed-in person may see it (RLS on the message); the browser is
 * then sent to a link that works for one minute.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/request-files/[id]">) {
  const { id } = await ctx.params;
  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) return NextResponse.redirect(new URL(`/login?next=/request-files/${id}`, request.url));
  const { data: m } = await supabase.from("client_request_messages").select("storage_path, file_name").eq("id", id).maybeSingle();
  if (!m?.storage_path) return new NextResponse("Not found", { status: 404 });
  const { data: signed, error } = await supabase.storage.from("requests").createSignedUrl(m.storage_path, 60, { download: m.file_name ?? true });
  if (error || !signed) return new NextResponse("File not available", { status: 404 });
  return NextResponse.redirect(signed.signedUrl);
}
