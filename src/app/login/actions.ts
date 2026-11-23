"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

export type SignInState =
  | { step: "email"; error?: string; email?: string }
  | { step: "code"; email: string; error?: string };

const email = z.email("Enter a valid email address.").transform((e) => e.trim().toLowerCase());
const code = z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code from the email.");

/** Safe in-app path to return to after sign-in. */
function safeNext(value: FormDataEntryValue | null): string {
  const v = typeof value === "string" ? value : "";
  return v.startsWith("/") && !v.startsWith("//") ? v : "/app";
}

export async function sendSignInEmail(_: SignInState, form: FormData): Promise<SignInState> {
  const parsed = email.safeParse(form.get("email"));
  if (!parsed.success) return { step: "email", error: parsed.error.issues[0].message };
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
  const next = safeNext(form.get("next"));
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    // Only people the Owner has invited can sign in.
    options: { shouldCreateUser: false, emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}` },
  });
  // Same message whether or not the address is registered, so the form does not reveal who is a client.
  if (error && error.status !== 400 && error.status !== 422) {
    return { step: "email", email: parsed.data, error: "We could not send the email. Please try again in a minute." };
  }
  return { step: "code", email: parsed.data };
}

export async function verifySignInCode(_: SignInState, form: FormData): Promise<SignInState> {
  const addr = email.safeParse(form.get("email"));
  const token = code.safeParse(form.get("code"));
  if (!addr.success) return { step: "email", error: "Start again with your email address." };
  if (!token.success) return { step: "code", email: addr.data, error: token.error.issues[0].message };
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.verifyOtp({ email: addr.data, token: token.data, type: "email" });
  if (error) return { step: "code", email: addr.data, error: "That code is wrong or has expired. Request a new one." };
  redirect(safeNext(form.get("next")));
}

export async function signInWithGoogle(form: FormData): Promise<void> {
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
  const next = safeNext(form.get("next"));
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
  });
  if (error || !data.url) redirect("/login?error=google");
  redirect(data.url);
}
