"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireStaff } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export type RunnerSendState = { ok?: string; error?: string };

const item = z.object({
  step_code: z.string(),
  subject: z.string().trim().min(1).max(200),
  message: z.string().max(4000).default(""),
  due_date: z.string().nullable().optional(),
});

/**
 * A staff member accepts the Registration Runner's drafted requests to the client and
 * sends them, as themselves, with public.create_client_request() (each one puts its step
 * on "Waiting on client"). A step finished meanwhile, or one that already has the same
 * open request, is skipped. The AI employee never sends anything: this is the person's act.
 */
export async function sendRunnerRequestsAction(draftId: string, caseId: string): Promise<RunnerSendState> {
  await requireStaff();
  const supabase = await supabaseServer();
  const { data: d } = await supabase
    .from("ai_drafts")
    .select("id, kind, status, client_id, subject_table, subject_id, payload")
    .eq("id", draftId)
    .maybeSingle();
  if (!d || d.kind !== "registration_requests" || d.subject_table !== "registration_cases" || d.subject_id !== caseId || !d.client_id) {
    return { error: "That draft is not this case's requests." };
  }
  if (d.status !== "open") return { error: `This draft was already ${d.status}.` };
  const parsed = z.array(item).safeParse((d.payload as { requests?: unknown }).requests);
  if (!parsed.success || parsed.data.length === 0) return { error: "The draft has no requests to send." };

  const { data: steps } = await supabase.from("registration_steps").select("id, code, status").eq("case_id", caseId);
  const stepByCode = new Map((steps ?? []).map((s) => [s.code as string, s as { id: string; code: string; status: string }]));
  const { data: open } = steps?.length
    ? await supabase.from("client_requests").select("subject, registration_step_id").in("registration_step_id", steps.map((s) => s.id)).eq("direction", "to_client").neq("status", "closed")
    : { data: [] };
  const asked = new Set((open ?? []).map((r) => `${r.registration_step_id}|${String(r.subject).trim().toLowerCase()}`));

  let sent = 0;
  const skipped: string[] = [];
  for (const r of parsed.data) {
    const s = stepByCode.get(r.step_code);
    if (!s || s.status === "done" || s.status === "not_applicable") {
      skipped.push(`${r.subject} (step finished)`);
      continue;
    }
    if (asked.has(`${s.id}|${r.subject.toLowerCase()}`)) {
      skipped.push(`${r.subject} (already asked)`);
      continue;
    }
    const { error } = await supabase.rpc("create_client_request", {
      p_client: d.client_id,
      p_subject: r.subject,
      p_body: r.message,
      p_due: r.due_date || null,
      p_step: s.id,
    });
    if (error) return { error: `Sent ${sent}; stopped at "${r.subject}": ${error.message}` };
    asked.add(`${s.id}|${r.subject.toLowerCase()}`);
    sent += 1;
  }
  const note = `Sent ${sent} request${sent === 1 ? "" : "s"} to the client${skipped.length ? `; skipped ${skipped.join(", ")}` : ""}.`;
  const { error } = await supabase.rpc("decide_ai_draft", { p_id: draftId, p_accept: true, p_note: note.slice(0, 1000) });
  if (error) return { error: error.message };
  revalidatePath(`/app/registrations/${caseId}`);
  revalidatePath("/app/requests");
  revalidatePath("/portal/requests");
  revalidatePath("/portal/registration");
  return { ok: note };
}
