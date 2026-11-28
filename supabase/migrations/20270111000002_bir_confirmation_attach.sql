-- BIR filing confirmations onto the return (the Owner: "I need the confirmation receipt
-- from eBIRForms to mark a return filed, so we just print and attach the form plus the
-- confirmation").
--
--   * Each BIR email the mailbox job stores now also gets a PDF in the private
--     "filing-files" bucket under _bir-mail/<mail id>.pdf: the email's own PDF attachment
--     when it has one, else one the app writes from its text (src/lib/pdf/text.ts),
--     headed "BIR filing confirmation" with the TIN, form, period, date received and
--     reference. Readable by whoever may read the mail (the Owner; staff once linked).
--   * public.attach_bir_confirmation(draft): staff accept the BIR Mail Clerk's proposal
--     that a confirmation belongs to a return. As the Owner or staff who keep the
--     client's books (the same check as add_filing_file), it links the mail to the
--     return and adds the PDF to the return's files as kind 'bir_confirmation' (staff
--     see it; it is printed with the form for the scanned copy). It never marks the
--     return filed: the person does that at Filed & paid (advance_filing), as always.
--   * AI employees cannot call it with effect: it refuses anyone who is not staff.

alter table public.bir_mail add column pdf_path text unique check (pdf_path is null or pdf_path like '\_bir-mail/%');
alter table public.bir_mail add column pdf_name text check (length(pdf_name) <= 200);
alter table public.bir_mail add column pdf_size bigint check (pdf_size is null or pdf_size > 0);

alter table public.filing_files drop constraint filing_files_kind_check;
alter table public.filing_files add constraint filing_files_kind_check
  check (kind in ('filed_copy', 'validation_report', 'esubmission_dat', 'payment_proof', 'bir_confirmation'));

-- The PDF follows the mail row (the Owner reads all; staff once it is linked to their client).
create policy bir_mail_pdf_object_read on storage.objects for select to authenticated using (
  bucket_id = 'filing-files' and left(name, 10) = '_bir-mail/'
  and exists (select 1 from public.bir_mail bm where bm.pdf_path = name)
);

create or replace function public.attach_bir_confirmation(p_draft uuid, p_note text default null) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  d public.ai_drafts;
  f public.filing_instances;
  m public.bir_mail;
  v_filing uuid;
  v_id uuid;
begin
  select * into d from public.ai_drafts where id = p_draft for update;
  if d.id is null or d.kind <> 'bir_mail_match' or d.subject_table is distinct from 'bir_mail' then
    raise exception 'No such BIR mail proposal' using errcode = 'P0002';
  end if;
  v_filing := nullif(d.payload->>'filing_id', '')::uuid;
  if v_filing is null then
    raise exception 'The proposal names no return to attach the confirmation to' using errcode = '22023';
  end if;
  select * into f from public.filing_instances where id = v_filing;
  if f.id is null or f.client_id is distinct from d.client_id or not (private.is_staff() and private.can_access_client(f.client_id)) then
    raise exception 'Return not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(f.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can attach files to its returns' using errcode = '42501';
  end if;
  if d.status <> 'open' then
    raise exception 'This proposal was already %', d.status using errcode = '23514';
  end if;
  select * into m from public.bir_mail where id = d.subject_id for update;
  if m.id is null then raise exception 'No such BIR mail' using errcode = 'P0002'; end if;
  if m.status <> 'unmatched' then
    raise exception 'This BIR mail is already %', case m.status when 'matched' then 'linked' else 'set aside' end using errcode = '23514';
  end if;
  if m.pdf_path is null or m.pdf_size is null then
    raise exception 'The BIR email has no PDF to attach (check the mailbox again)' using errcode = '22023';
  end if;
  perform private.link_bir_mail_row(m.id, f.client_id, f.id);
  insert into public.filing_files (filing_instance_id, client_id, kind, file_name, mime_type, size_bytes, storage_path, source)
  values (f.id, f.client_id, 'bir_confirmation', coalesce(nullif(btrim(m.pdf_name), ''), 'bir-confirmation.pdf'), 'application/pdf', m.pdf_size, m.pdf_path, 'mailbox')
  returning id into v_id;
  update public.ai_drafts
  set status = 'accepted', decided_by = auth.uid(), decided_at = now(),
      decision_note = coalesce(nullif(btrim(coalesce(p_note, '')), ''), 'Attached the confirmation to the return')
  where id = d.id;
  return v_id;
end;
$$;

revoke all on function public.attach_bir_confirmation(uuid, text) from public, anon;
grant execute on function public.attach_bir_confirmation(uuid, text) to authenticated;
