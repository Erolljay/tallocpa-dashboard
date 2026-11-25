import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Opens a stored document. The database decides whether the signed-in person may
 * see it (RLS); every view is written to the access log (spec §3.14), then the
 * browser is sent to a link that works for one minute.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/files/[id]">) {
  const { id } = await ctx.params;
  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) return NextResponse.redirect(new URL(`/login?next=/files/${id}`, request.url));

  const { data: doc } = await supabase.from("documents").select("id, storage_path, file_name").eq("id", id).maybeSingle();
  if (!doc) return new NextResponse("Not found", { status: 404 });
  // A batch row (B1) has no image behind it.
  if (!doc.storage_path) return new NextResponse("This line came from a batch upload: there is no image.", { status: 404 });

  const { error: logError } = await supabase.from("access_log").insert({ actor: claims.claims.sub, document_id: doc.id, action: "view" });
  if (logError) return new NextResponse("Could not record the view", { status: 500 });

  const { data: signed, error } = await supabase.storage.from("documents").createSignedUrl(doc.storage_path, 60);
  if (error || !signed) return new NextResponse("File not available", { status: 404 });
  return NextResponse.redirect(signed.signedUrl);
}
