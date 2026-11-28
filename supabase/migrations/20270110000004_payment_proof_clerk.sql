-- AI employees: the Payment Proof Clerk (docs/ai-desks/payment-proof-clerk/). The Owner
-- asked for an agent that finds the proof of payment of the taxes the firm paid in the
-- mailbox, matches it to the return, and attaches it as a PDF. AI employees never change
-- a return, pay, file or remit, so the work is split three ways:
--
--   1. The app fetches (src/lib/payment-proof/poll.ts, cron, service role; never the AI):
--      payment confirmations from the listed senders (UnionBank "Successful Bills
--      Payment", LANDBANK, DBP, GCash, Maya; mail from the BIR itself is the BIR Mail
--      Clerk's) are read from Gmail and kept in
--      public.payment_mail with what was read from them (amount, bank and BIR references,
--      TIN, form, tax type, return period) and a PDF: the email's own PDF attachment, or
--      one the app writes from the email's text. The bank account number is masked to
--      its last 4 digits before anything is stored.
--   2. The AI matches: two read functions, for the switched-on Payment Proof Clerk only,
--      list and read the mail still unmatched; it reads returns through its existing
--      read access (clients, filing_instances) and saves a draft (kind payment_proof) on
--      the return it believes the payment is for.
--   3. A person attaches, with one click: public.attach_payment_proof() checks the staff
--      member may attach files to the client's returns, keeps the PDF on the return as a
--      new kind of file, 'payment_proof' (staff only; the scanned copy stays the one file
--      the client sees), records the bank and BIR references and the date paid on the
--      mail, and accepts the draft. The return's Filed & paid step then offers those
--      references and the date; the person still files the return as before.
--
-- The PDFs sit in the private "filing-files" bucket under _payment-mail/<message id>.pdf,
-- written by the job only. Who may open one follows public.payment_mail.

alter table public.filing_files drop constraint filing_files_kind_check;
alter table public.filing_files add constraint filing_files_kind_check
  check (kind in ('filed_copy', 'validation_report', 'esubmission_dat', 'payment_proof'));

create table public.payment_mail (
  id uuid primary key default gen_random_uuid(),
  gmail_message_id text not null unique,
  mailbox text not null,
  received_at timestamptz not null,
  sender text not null,
  subject text not null default '',
  -- Which sender of src/lib/payment-proof/parse.ts (unionbank, landbank, …).
  channel text not null check (channel ~ '^[a-z][a-z0-9_]{1,30}$'),
  -- The email's text with account numbers masked.
  body_text text not null default '' check (length(body_text) <= 20000),
  -- What was read from it (PaymentFacts): amount, bank_reference, bir_reference, tin,
  -- form, tax_type, period_end, paid_on, client_name, biller.
  extracted jsonb not null default '{}'::jsonb check (jsonb_typeof(extracted) = 'object'),
  pdf_path text unique check (pdf_path is null or pdf_path like '\_payment-mail/%'),
  pdf_name text,
  pdf_size bigint check (pdf_size is null or pdf_size > 0),
  -- 'attachment': the email's own PDF; 'rendered': written by the app from the email.
  pdf_source text check (pdf_source in ('attachment', 'rendered')),
  status text not null default 'unmatched' check (status in ('unmatched', 'attached', 'ignored')),
  filing_instance_id uuid references public.filing_instances (id) on delete set null,
  client_id uuid references public.clients (id) on delete set null,
  payment_reference text,
  bir_reference text,
  paid_on date,
  attached_by uuid references auth.users (id),
  attached_at timestamptz,
  created_at timestamptz not null default now()
);

create index payment_mail_unmatched on public.payment_mail (received_at desc) where status = 'unmatched';
create index payment_mail_filing on public.payment_mail (filing_instance_id) where filing_instance_id is not null;
create trigger audit after insert or update or delete on public.payment_mail for each row execute function private.audit();
alter table public.payment_mail enable row level security;

-- The Owner reads every payment email. Other staff read one once it is on a return of a
-- client they see, or while an open suggestion of the Clerk about it is in front of them
-- (ai_drafts' own policies decide which suggestions they see). No one writes it directly;
-- AI employees read it only through the functions below.
create policy payment_mail_owner_read on public.payment_mail for select to authenticated
  using (private.is_owner());
create policy payment_mail_staff_read on public.payment_mail for select to authenticated using (
  private.is_staff() and (
    (client_id is not null and private.can_access_client(client_id))
    or exists (
      select 1 from public.ai_drafts d
      where d.kind = 'payment_proof' and d.status = 'open' and d.payload ->> 'mail_id' = payment_mail.id::text
    )
  )
);

-- The PDF follows the row.
create policy payment_mail_object_read on storage.objects for select to authenticated using (
  bucket_id = 'filing-files' and left(name, 14) = '_payment-mail/'
  and exists (select 1 from public.payment_mail pm where pm.pdf_path = name)
);

-- ---------------------------------------------------------------------------
-- What the Payment Proof Clerk reads.
-- ---------------------------------------------------------------------------
create or replace function private.ai_payment_proof_caller() returns public.ai_employees
language sql stable security definer set search_path = '' as $$
  select e.* from public.ai_employees e
  where e.user_id = auth.uid() and e.enabled and e.client_data and e.key = 'payment_proof_clerk'
$$;

-- Unmatched payment emails, newest first, each with the Clerk's own latest suggestion on
-- it (open, accepted or rejected; withdrawn ones do not count). The text is not included.
create or replace function public.ai_payment_mail()
returns table (
  id uuid,
  received_at timestamptz,
  sender text,
  subject text,
  channel text,
  extracted jsonb,
  has_pdf boolean,
  my_suggestion text
)
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_payment_proof_caller();
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Payment Proof Clerk can read payment emails' using errcode = '42501';
  end if;
  return query
    select m.id, m.received_at, m.sender, m.subject, m.channel, m.extracted, m.pdf_path is not null,
           (select d.status from public.ai_drafts d
             where d.ai_user_id = me.user_id and d.kind = 'payment_proof' and d.status <> 'withdrawn'
               and d.payload ->> 'mail_id' = m.id::text
             order by d.created_at desc limit 1)
    from public.payment_mail m
    where m.status = 'unmatched'
    order by m.received_at desc, m.id
    limit 200;
end;
$$;

-- One payment email, with its (masked) text. Attached or ignored mail is not returned.
create or replace function public.ai_payment_mail_detail(p_id uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_payment_proof_caller();
  m public.payment_mail;
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Payment Proof Clerk can read payment emails' using errcode = '42501';
  end if;
  select * into m from public.payment_mail where id = p_id;
  if m.id is null or m.status <> 'unmatched' then
    raise exception 'No unmatched payment email %', p_id using errcode = 'P0002';
  end if;
  return jsonb_build_object(
    'id', m.id, 'received_at', m.received_at, 'sender', m.sender, 'subject', m.subject, 'channel', m.channel,
    'extracted', m.extracted, 'text', m.body_text, 'has_pdf', m.pdf_path is not null, 'pdf_source', m.pdf_source
  );
end;
$$;

-- Which of these returns (of the Clerk's clients) already have a proof of payment.
create or replace function public.ai_filings_with_payment_proof(p_filings uuid[]) returns setof uuid
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_payment_proof_caller();
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Payment Proof Clerk can check proofs of payment' using errcode = '42501';
  end if;
  return query
    select distinct ff.filing_instance_id from public.filing_files ff
    where ff.filing_instance_id = any (p_filings) and ff.kind = 'payment_proof' and ff.replaced_at is null
      and ff.client_id = any (private.ai_client_ids());
end;
$$;

-- ---------------------------------------------------------------------------
-- The person's one click.
-- ---------------------------------------------------------------------------
/**
 * Attaches the payment email's PDF to the return a suggestion of the Payment Proof Clerk
 * is about, records the references and the date paid, and accepts the suggestion. For
 * the Owner and staff who may attach files to the client's returns (as add_filing_file).
 * The return's status is not changed: Filed & paid stays the person's step.
 */
create or replace function public.attach_payment_proof(p_draft uuid, p_reference text, p_paid_on date, p_bir_reference text default null)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  d public.ai_drafts;
  f public.filing_instances;
  m public.payment_mail;
  v_id uuid;
begin
  select * into d from public.ai_drafts where id = p_draft for update;
  if d.id is null or d.kind <> 'payment_proof' or d.subject_table is distinct from 'filing_instances' then
    raise exception 'No such suggestion' using errcode = 'P0002';
  end if;
  select * into f from public.filing_instances where id = d.subject_id;
  if f.id is null or not (private.is_staff() and private.can_access_client(f.client_id)) then
    raise exception 'Return not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(f.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can attach files to its returns' using errcode = '42501';
  end if;
  if d.status <> 'open' then
    raise exception 'This suggestion was already %', d.status using errcode = '23514';
  end if;
  select * into m from public.payment_mail where id = (d.payload ->> 'mail_id')::uuid for update;
  if m.id is null or m.pdf_path is null then
    raise exception 'The payment email has no PDF to attach' using errcode = '22023';
  end if;
  if m.status <> 'unmatched' then
    raise exception 'This payment email is already attached to a return' using errcode = '23514';
  end if;
  if nullif(btrim(coalesce(p_reference, '')), '') is null or p_paid_on is null then
    raise exception 'Enter the payment reference and the date paid' using errcode = '22023';
  end if;
  insert into public.filing_files (filing_instance_id, client_id, kind, file_name, mime_type, size_bytes, storage_path, source)
  values (f.id, f.client_id, 'payment_proof', coalesce(nullif(btrim(m.pdf_name), ''), 'proof-of-payment.pdf'), 'application/pdf', m.pdf_size, m.pdf_path, 'mailbox')
  returning id into v_id;
  update public.payment_mail
  set status = 'attached', filing_instance_id = f.id, client_id = f.client_id,
      payment_reference = btrim(p_reference),
      bir_reference = coalesce(nullif(btrim(coalesce(p_bir_reference, '')), ''), m.extracted ->> 'bir_reference'),
      paid_on = p_paid_on, attached_by = auth.uid(), attached_at = now()
  where id = m.id;
  perform public.decide_ai_draft(p_draft, true, 'Attached the proof of payment');
  return v_id;
end;
$$;

revoke all on function private.ai_payment_proof_caller() from public;
revoke all on function public.ai_payment_mail() from public;
revoke all on function public.ai_payment_mail_detail(uuid) from public;
revoke all on function public.ai_filings_with_payment_proof(uuid[]) from public;
revoke all on function public.attach_payment_proof(uuid, text, date, text) from public;
grant execute on function private.ai_payment_proof_caller() to authenticated;
grant execute on function public.ai_payment_mail() to authenticated;
grant execute on function public.ai_payment_mail_detail(uuid) to authenticated;
grant execute on function public.ai_filings_with_payment_proof(uuid[]) to authenticated;
grant execute on function public.attach_payment_proof(uuid, text, date, text) to authenticated;
