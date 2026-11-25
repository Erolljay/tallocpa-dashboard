import "server-only";
/**
 * Checks the eSubmission mailbox for the BIR's replies (decision 15): for each send
 * still waiting, reads its Gmail thread; the first message not from the mailbox is the
 * reply. Its attachment (or, without one, the message itself) is stored as the
 * return's validation report and the send is marked validated or errors. A reply the
 * app cannot read is recorded as errors with a note, for staff to check and correct.
 * Runs with the service role (cron) or for one return from the filing page.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { esubmissionMailEnv } from "@/lib/env";
import { headerOf, partsOf, readAttachment, readThread, textOf } from "./gmail";
import { classifyReply, fromMailbox } from "./mime";

interface Waiting {
  id: string;
  filing_instance_id: string;
  client_id: string;
  gmail_thread_id: string | null;
  gmail_message_id: string | null;
}

export type PollResult = { checked: number; answered: number; errors: string[] } | { error: string };

const REPORT_TYPES = /pdf|html|text|plain|octet-stream|excel|spreadsheet|csv/i;

/** Polls every waiting send, or only the one of `filingId`. `admin` is a service-role client. */
export async function pollEsubmissions(admin: SupabaseClient, filingId?: string): Promise<PollResult> {
  const env = esubmissionMailEnv();
  if (!env) return { error: "The eSubmission mailbox is not configured." };
  const { data, error } = await admin.rpc("esubmissions_waiting");
  if (error) return { error: error.message };
  const waiting = ((data ?? []) as Waiting[]).filter((w) => w.gmail_thread_id && (!filingId || w.filing_instance_id === filingId));
  let answered = 0;
  const errors: string[] = [];
  for (const w of waiting) {
    try {
      const { token, messages } = await readThread(env, w.gmail_thread_id!);
      const reply = messages.find((m) => m.id !== w.gmail_message_id && !fromMailbox(headerOf(m, "From"), env.mailbox));
      if (!reply) {
        await admin.rpc("esubmission_checked", { p_esubmission: w.id });
        continue;
      }
      const text = textOf(reply);
      const attachment = partsOf(reply.payload).find((p) => p.filename && p.body?.attachmentId && REPORT_TYPES.test(p.mimeType ?? ""));
      let bytes: Buffer;
      let name: string;
      let mime: string;
      if (attachment) {
        bytes = await readAttachment(env, token, reply.id, attachment.body!.attachmentId!);
        name = attachment.filename!;
        mime = attachment.mimeType || "application/octet-stream";
      } else {
        bytes = Buffer.from(`From: ${headerOf(reply, "From")}\nDate: ${headerOf(reply, "Date")}\nSubject: ${headerOf(reply, "Subject")}\n\n${text}\n`, "utf8");
        name = "bir-reply.txt";
        mime = "text/plain";
      }
      const verdict = classifyReply(`${text}\n${attachment?.filename ?? ""}`);
      const path = `${w.client_id}/${w.filing_instance_id}/${crypto.randomUUID()}/${name.replace(/[^A-Za-z0-9._-]/g, "_")}`;
      const up = await admin.storage.from("filing-files").upload(path, bytes, { contentType: mime, upsert: false });
      if (up.error) throw new Error(`Storing the reply: ${up.error.message}`);
      const note = verdict ? text.slice(0, 500) : `The BIR replied but the app could not tell whether the files were validated: open the reply and record the result. ${text.slice(0, 300)}`;
      const r = await admin.rpc("esubmission_mailbox_result", {
        p_esubmission: w.id,
        p_status: verdict ?? "errors",
        p_note: note,
        p_path: path,
        p_file_name: name,
        p_mime: mime,
        p_size: bytes.length || 1,
      });
      if (r.error) throw new Error(r.error.message);
      answered += 1;
    } catch (e) {
      errors.push(`${w.filing_instance_id}: ${(e as Error).message}`);
    }
  }
  return { checked: waiting.length, answered, errors };
}
