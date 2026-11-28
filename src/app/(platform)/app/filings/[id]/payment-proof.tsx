import { RiRobot2Line } from "@remixicon/react";
import { Card } from "@/components/ui";
import { draftLines } from "@/lib/ai/drafts";
import { supabaseServer } from "@/lib/supabase/server";
import { AttachProofForm } from "./payment-proof-form";

interface DraftRow {
  id: string;
  note: string;
  payload: { mail_id?: string; bank_reference?: string | null; bir_reference?: string | null; paid_on?: string | null } & Record<string, unknown>;
  created_at: string;
  ai_employees: { name: string } | null;
}

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });

/**
 * The Payment Proof Clerk's suggestions for this return: which payment email is its proof
 * of payment. Staff open the PDF, then attach it with one click (references and date
 * prefilled) or say it is not this return. Renders nothing without a suggestion.
 */
export async function PaymentProofSuggestions({ filingId, canAttach }: { filingId: string; canAttach: boolean }) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("ai_drafts")
    .select("id, note, payload, created_at, ai_employees(name)")
    .eq("status", "open")
    .eq("kind", "payment_proof")
    .eq("subject_table", "filing_instances")
    .eq("subject_id", filingId)
    .order("created_at", { ascending: false })
    .limit(5);
  const drafts = (data ?? []) as unknown as DraftRow[];
  if (drafts.length === 0) return null;
  return (
    <Card title="Suggested by the Payment Proof Clerk">
      <ul className="flex flex-col divide-y divide-separator-border">
        {drafts.map((d) => (
          <li key={d.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-center gap-2">
              <RiRobot2Line aria-hidden className="size-4 text-foreground-icon-tertiary" />
              <p className="text-body-medium text-text-primary">Proof of payment</p>
              <p className="text-caption-1-regular text-text-tertiary">
                {d.ai_employees?.name ?? "AI employee"} · {when.format(new Date(d.created_at))}
              </p>
            </div>
            <dl className="grid grid-cols-[minmax(0,10rem)_1fr] gap-x-4 gap-y-1 text-body-regular">
              {draftLines(d.payload).map((l, i) => (
                <div key={i} className="contents">
                  <dt className="text-text-tertiary">{l.label}</dt>
                  <dd className="min-w-0 whitespace-pre-wrap break-words text-text-primary">{l.value}</dd>
                </div>
              ))}
            </dl>
            {d.note && <p className="text-body-regular text-text-secondary">{d.note}</p>}
            {d.payload.mail_id && (
              <p className="text-body-regular">
                <a href={`/payment-mail/${d.payload.mail_id}`} target="_blank" rel="noopener" className="text-button-ghost-foreground hover:underline">
                  Open the payment PDF
                </a>
              </p>
            )}
            <AttachProofForm
              draftId={d.id}
              filingId={filingId}
              reference={d.payload.bank_reference ?? d.payload.bir_reference ?? ""}
              birReference={d.payload.bir_reference ?? ""}
              paidOn={d.payload.paid_on ?? ""}
              canAttach={canAttach}
            />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-caption-1-regular text-text-tertiary">Attaching keeps the PDF on this return and records the payment&rsquo;s references and date for Filed &amp; paid. AI employees never attach or change anything themselves.</p>
    </Card>
  );
}
