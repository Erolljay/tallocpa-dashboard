"use server";

import { redirect } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { requestOrigin } from "@/lib/email/brand";
import { aiKeyOfResource, allowedRedirect, CODE_SECONDS, redirectWith, resourceFor, secret, sha256hex } from "@/lib/oauth/rules";
import { supabaseServer } from "@/lib/supabase/server";

export type ConsentState = { error?: string };

interface Checked {
  clientId: string;
  redirectUri: string;
  state: string | null;
  origin: string;
}

/** Checks the request again on the server: the form's hidden fields are not trusted. */
async function check(form: FormData): Promise<Checked | { error: string }> {
  const clientId = String(form.get("client_id") ?? "");
  const redirectUri = String(form.get("redirect_uri") ?? "");
  const state = form.get("state") ? String(form.get("state")) : null;
  const origin = await requestOrigin();
  if (!origin) return { error: "Could not tell this app's address." };
  if (!allowedRedirect(redirectUri)) return { error: "The app's return address is not allowed." };
  const supabase = await supabaseServer();
  const { data: client } = await supabase.from("oauth_clients").select("client_id, redirect_uris").eq("client_id", clientId).maybeSingle();
  if (!client || !(client.redirect_uris as string[]).includes(redirectUri)) return { error: "This app is not registered with that return address." };
  return { clientId, redirectUri, state, origin };
}

/** The Owner allows the connection: a one-time code (5 minutes) goes back to the app. */
export async function allowAction(_: ConsentState, form: FormData): Promise<ConsentState> {
  const owner = await requireOwner();
  const c = await check(form);
  if ("error" in c) return c;
  const aiKey = String(form.get("ai_key") ?? "");
  const challenge = String(form.get("code_challenge") ?? "");
  if (!/^[A-Za-z0-9_-]{43}$/.test(challenge)) return { error: "The app's PKCE challenge is missing." };
  const resource = resourceFor(c.origin, aiKey);
  if (aiKeyOfResource(resource, c.origin) !== aiKey) return { error: "Choose an AI employee." };
  const supabase = await supabaseServer();
  const { data: ai } = await supabase.from("ai_employees").select("user_id").eq("brand_id", owner.staff.brandId).eq("key", aiKey).maybeSingle();
  if (!ai) return { error: "That AI employee does not exist." };
  const code = secret("tcac_");
  const now = new Date();
  const { error } = await supabase.from("oauth_codes").insert({
    code_hash: sha256hex(code),
    client_id: c.clientId,
    ai_user_id: ai.user_id,
    redirect_uri: c.redirectUri,
    code_challenge: challenge,
    resource,
    approved_by: owner.userId,
    created_at: now.toISOString(),
    expires_at: new Date(now.getTime() + CODE_SECONDS * 1000).toISOString(),
  });
  if (error) return { error: `Could not approve: ${error.message}` };
  redirect(redirectWith(c.redirectUri, { code, state: c.state, iss: c.origin }));
}

/** The Owner refuses: the app is told so. */
export async function denyAction(_: ConsentState, form: FormData): Promise<ConsentState> {
  await requireOwner();
  const c = await check(form);
  if ("error" in c) return c;
  redirect(redirectWith(c.redirectUri, { error: "access_denied", error_description: "The Owner did not allow this connection.", state: c.state, iss: c.origin }));
}
