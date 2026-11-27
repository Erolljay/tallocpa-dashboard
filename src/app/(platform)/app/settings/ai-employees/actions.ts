"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { expiryFrom, hashKey, keyHint, newKey, type KeyLifetime } from "@/lib/ai/credentials";
import { aiSettingsSchema, assignSchema, keySchema, settingsFor } from "@/lib/ai/schema";
import { aiLoginEmail, STANDARD_WORKFORCE } from "@/lib/ai/workforce";
import { formToObject } from "@/lib/clients/schema";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { TOOLS } from "@/lib/mcp/registry";
import { toolFor } from "@/lib/mcp/tool";
import { supabaseServer } from "@/lib/supabase/server";

export type AiState = { ok?: string; error?: string; fieldErrors?: Record<string, string>; key?: string };

const BASE = "/app/settings/ai-employees";

function refresh(key?: string) {
  revalidatePath(BASE);
  if (key) revalidatePath(`${BASE}/${key}`);
}

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

/**
 * A login for an AI employee: on a domain no mail can reach, and banned from signing
 * in. It acts only through a key (step 2), never through the sign-in page.
 */
async function createAiLogin(key: string): Promise<string> {
  const { data, error } = await supabaseAdmin().auth.admin.createUser({
    email: aiLoginEmail(key, randomBytes(3).toString("hex")),
    email_confirm: true,
    ban_duration: "876000h",
    user_metadata: { ai_employee: key },
  });
  if (error || !data.user) throw new Error(error?.message ?? "Could not create the login.");
  return data.user.id;
}

/** Adds every standard AI employee the firm does not have yet, all switched off. */
export async function addWorkforceAction(): Promise<AiState> {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const { data: existing, error: readError } = await supabase.from("ai_employees").select("key").eq("brand_id", owner.staff.brandId);
  if (readError) return { error: readError.message };
  const have = new Set((existing ?? []).map((e) => e.key));
  const missing = STANDARD_WORKFORCE.filter((e) => !have.has(e.key));
  let added = 0;
  for (const e of missing) {
    let userId: string;
    try {
      userId = await createAiLogin(e.key);
    } catch (err) {
      refresh();
      return { error: `Added ${added}; could not create the login for ${e.name}: ${(err as Error).message}` };
    }
    const { error } = await supabase.from("ai_employees").insert({
      user_id: userId,
      brand_id: owner.staff.brandId,
      key: e.key,
      name: e.name,
      department: e.department,
      job: e.job,
      runs_on: e.runsOn,
      books_level: e.booksLevel,
      all_clients: e.allClients,
      client_data: e.clientData,
      created_by: owner.userId,
    });
    if (error) {
      await supabaseAdmin().auth.admin.deleteUser(userId).catch(() => undefined);
      refresh();
      return { error: `Added ${added}; could not add ${e.name}: ${error.message}` };
    }
    added++;
  }
  refresh();
  return { ok: added ? `Added ${added} AI employee${added === 1 ? "" : "s"}, all switched off.` : "The standard workforce is already here." };
}

export async function setAiEnabledAction(userId: string, key: string, enabled: boolean): Promise<AiState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("ai_employees").update({ enabled }).eq("user_id", userId);
  if (error) return { error: error.message };
  refresh(key);
  return { ok: enabled ? "Switched on." : "Switched off." };
}

export async function updateAiSettingsAction(userId: string, key: string, _: AiState, form: FormData): Promise<AiState> {
  await requireOwner();
  const parsed = aiSettingsSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const supabase = await supabaseServer();
  const { data: row, error: readError } = await supabase.from("ai_employees").select("client_data").eq("user_id", userId).single();
  if (readError) return { error: readError.message };
  const { error } = await supabase.from("ai_employees").update(settingsFor(row.client_data, parsed.data)).eq("user_id", userId);
  if (error) return { error: error.message };
  refresh(key);
  return { ok: "Saved." };
}

export async function assignClientAction(userId: string, key: string, _: AiState, form: FormData): Promise<AiState> {
  const owner = await requireOwner();
  const parsed = assignSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Choose a client." };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("ai_assignments").insert({ ai_user_id: userId, client_id: parsed.data.client_id, created_by: owner.userId });
  if (error) return { error: error.code === "23505" ? "Already assigned." : error.message };
  refresh(key);
  return { ok: "Assigned." };
}

export async function unassignClientAction(userId: string, key: string, clientId: string): Promise<AiState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("ai_assignments").delete().eq("ai_user_id", userId).eq("client_id", clientId);
  if (error) return { error: error.message };
  refresh(key);
  return { ok: "Removed." };
}

/** Creates a key and returns it once; only its hash is stored. */
export async function createKeyAction(userId: string, key: string, _: AiState, form: FormData): Promise<AiState> {
  const owner = await requireOwner();
  const parsed = keySchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const secret = newKey();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("ai_credentials").insert({
    ai_user_id: userId,
    label: parsed.data.label,
    token_hash: hashKey(secret),
    token_hint: keyHint(secret),
    expires_at: expiryFrom(new Date(), parsed.data.days as KeyLifetime).toISOString(),
    created_by: owner.userId,
  });
  if (error) return { error: error.message };
  refresh(key);
  return { ok: "Key created. Copy it now: it is not shown again.", key: secret };
}

export async function revokeKeyAction(id: string, key: string): Promise<AiState> {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("ai_credentials").update({ revoked_at: new Date().toISOString(), revoked_by: owner.userId }).eq("id", id).is("revoked_at", null);
  if (error) return { error: error.message };
  refresh(key);
  return { ok: "Revoked." };
}

/** Grants tools (the connector's tool names) to an AI employee; only tools meant for its job. */
export async function grantToolsAction(userId: string, key: string, tools: string[]): Promise<AiState> {
  const owner = await requireOwner();
  const allowed = new Set(TOOLS.filter((t) => toolFor(t, key)).map((t) => t.name));
  const chosen = tools.filter((t) => allowed.has(t));
  if (chosen.length === 0) return { error: "No tool to grant." };
  const supabase = await supabaseServer();
  const { error } = await supabase
    .from("ai_tool_grants")
    .upsert(chosen.map((tool) => ({ ai_user_id: userId, tool, granted_by: owner.userId })), { onConflict: "ai_user_id,tool", ignoreDuplicates: true });
  if (error) return { error: error.message };
  refresh(key);
  return { ok: chosen.length === 1 ? "Granted." : `Granted ${chosen.length} tools.` };
}

export async function removeToolAction(userId: string, key: string, tool: string): Promise<AiState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("ai_tool_grants").delete().eq("ai_user_id", userId).eq("tool", tool);
  if (error) return { error: error.message };
  refresh(key);
  return { ok: "Removed." };
}

/** Disconnects an app (OAuth connection): its tokens stop working at once (the database revokes them). */
export async function disconnectAppAction(grantId: string, key: string): Promise<AiState> {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("oauth_grants").update({ revoked_at: new Date().toISOString(), revoked_by: owner.userId }).eq("id", grantId).is("revoked_at", null);
  if (error) return { error: error.message };
  refresh(key);
  return { ok: "Disconnected." };
}
