import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Opens the PDF of a payment confirmation email (the Payment Proof Clerk's suggestions).
 * Row-level security decides who may: the Owner, and staff once a suggestion about it is
 * open for one of their clients or it is attached to one of their clients' returns. The
 * link works for one minute.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/payment-mail/[id]">) {
  const { id } = await ctx.params;
  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) return NextResponse.redirect(new URL(`/login?next=/payment-mail/${id}`, request.url));
  const { data: m } = await supabase.from("payment_mail").select("pdf_path, pdf_name").eq("id", id).maybeSingle();
  if (!m?.pdf_path) return new NextResponse("Not found", { status: 404 });
  const { data: signed, error } = await supabase.storage.from("filing-files").createSignedUrl(m.pdf_path, 60, { download: m.pdf_name ?? "proof-of-payment.pdf" });
  if (error || !signed) return new NextResponse("File not available", { status: 404 });
  return NextResponse.redirect(signed.signedUrl);
}
