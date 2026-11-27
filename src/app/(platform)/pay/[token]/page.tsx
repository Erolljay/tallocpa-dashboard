import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { StatementView } from "@/components/statement/statement-view";
import { loadStatement } from "@/lib/collections/statement";
import { manilaToday } from "@/lib/filings/run";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Statement of Account · Tallo CPA", robots: { index: false, follow: false }, referrer: "no-referrer" };

/**
 * A statement's share link (migration 20270105000001): the Owner sends it to the
 * client, who sees what is due and the firm's payment channels without signing in.
 * Uploading a proof of payment still happens in the portal, signed in.
 */
export default function SharedStatementPage(props: PageProps<"/pay/[token]">) {
  return (
    <main className="flex flex-1 justify-center bg-background-full px-4 py-8 sm:py-10">
      <div className="w-full max-w-3xl">
        <Suspense fallback={<Skeleton rows={8} />}>
          <Shared params={props.params} />
        </Suspense>
      </div>
    </main>
  );
}

async function Shared({ params }: Pick<PageProps<"/pay/[token]">, "params">) {
  const { token } = await params;
  if (!/^[0-9a-f]{64}$/.test(token)) notFound();
  // The secret key reads past RLS: the token is the permission, so it is matched exactly first.
  const supabase = supabaseAdmin();
  const { data: soa } = await supabase.from("soas").select("id").eq("share_token", token).maybeSingle();
  if (!soa) notFound();
  const s = await loadStatement(supabase, soa.id);
  if (!s) notFound();
  // Ad hoc job clients often have no portal sign-in: they send the proof back on Messenger or email instead.
  const { count } = await supabase.from("client_users").select("user_id", { count: "exact", head: true }).eq("client_id", s.client.id);
  return <StatementView s={s} today={manilaToday()} payments={false} signInHref={count ? `/portal/billing/${s.soa.id}` : ""} />;
}
