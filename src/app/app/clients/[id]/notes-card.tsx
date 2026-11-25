import { NotesTimeline } from "@/components/leads/notes-timeline";
import { Card } from "@/components/ui";
import { notesTimeline, type NoteRow } from "@/lib/leads/notes";
import { supabaseServer } from "@/lib/supabase/server";
import { ClientNoteForm } from "./notes-form";

/**
 * The client's Notes (rework decision 21): the website inquiry answers, the
 * discovery-call notes, every onboarding answer and note, and notes staff write
 * here, in one timeline labelled by source (view client_notes_timeline).
 */
export async function NotesCard({ clientId, canWrite }: { clientId: string; canWrite: boolean }) {
  const supabase = await supabaseServer();
  const [{ data: rows }, { data: staff }] = await Promise.all([
    supabase.from("client_notes_timeline").select("source, source_id, at, author, body, details").eq("client_id", clientId),
    supabase.from("staff_profiles").select("user_id, full_name"),
  ]);
  const nameOf = new Map((staff ?? []).map((s) => [s.user_id as string, s.full_name as string]));
  return (
    <Card title="Notes" className="xl:col-span-2">
      <NotesTimeline entries={notesTimeline((rows ?? []) as NoteRow[])} nameOf={nameOf} empty="No notes yet. A client from the website brings its inquiry and discovery-call notes here." />
      {canWrite && <ClientNoteForm clientId={clientId} />}
    </Card>
  );
}
