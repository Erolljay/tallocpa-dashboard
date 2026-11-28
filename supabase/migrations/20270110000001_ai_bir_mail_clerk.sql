-- AI employees, step 6: the BIR Mail Clerk (docs/AI-WORKFORCE.md §3, §6, §7.2).
--
-- BIR mail in the firm's eSubmission mailbox. Until now the app read only the BIR's
-- replies to the DAT files it sent (20261127100002); every other BIR email (eFPS and
-- eBIRForms filing confirmations, replies outside a send's thread, and notices such as a
-- Letter of Authority, PAN, FAN or FLD) stayed in Gmail where nobody might see it.
--
--   * public.bir_mail: each BIR email the mailbox received, stored by the eSubmission
--     cron job (service role; src/lib/bir-mail/ingest.ts) with its text and its PDF /
--     image attachments (private bucket "bir-mail", <mail id>/<file>). It belongs to no
--     client until a person links it. The Owner reads all of it; other staff read mail
--     linked to a client they can access.
--   * The BIR Mail Clerk (AI employee) reads it only through two read-only functions
--     that refuse every caller but a switched-on `bir_mail_clerk` with client data:
--     public.ai_bir_mail() lists the mail not yet linked (newest first, skipping what it
--     already proposed on unless asked) and public.ai_bir_mail_message() reads one
--     message (not yet linked, or linked to one of its clients). It never writes: its
--     proposal is a draft (ai_save_draft, kind 'bir_mail_match') naming the client and
--     the return, and for a notice its type, date and the deadline to answer.
--   * A person accepts: public.accept_bir_mail_match() links the mail to the client and
--     the return and records the decision, only for the Owner or staff who keep the
--     client's books, and only as the draft proposed it. The Owner can also link or set
--     aside mail himself (link_bir_mail, dismiss_bir_mail).
--   * A notice the Clerk marks urgent (LOA, PAN, FAN, FLD, subpoena) notifies the Owner
--     at once (notification kind 'bir_notice_flagged'), whoever the client's staff are.

-- ---------------------------------------------------------------------------
-- BIR mail
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('bir-mail', 'bir-mail', false, 26214400, array['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'text/plain', 'text/html'])
on conflict (id) do nothing;

create table public.bir_mail (
  id uuid primary key default gen_random_uuid(),
  gmail_message_id text not null unique,
  gmail_thread_id text,
  received_at timestamptz not null,
  from_address text not null default '',
  subject text not null default '' check (length(subject) <= 500),
  -- The message's text (plain, else HTML without tags), at most 20,000 characters.
  body_text text not null default '' check (length(body_text) <= 20000),
  -- What the app guessed from the subject and text (src/lib/bir-mail/classify.ts).
  kind text not null default 'other' check (kind in ('filing_confirmation', 'esubmission_reply', 'payment_confirmation', 'notice', 'other')),
  notice_type text check (notice_type in ('loa', 'pan', 'fan', 'fld', 'subpoena', 'informal_conference', 'tvn', 'other_notice')),
  -- TINs written in the message (999-999-999 form), to find the client.
  tins text[] not null default '{}',
  -- [{ "path", "file_name", "mime_type", "size" }] in the "bir-mail" bucket.
  attachments jsonb not null default '[]'::jsonb check (jsonb_typeof(attachments) = 'array'),
  status text not null default 'unmatched' check (status in ('unmatched', 'matched', 'dismissed')),
  client_id uuid references public.clients (id) on delete cascade,
  filing_instance_id uuid references public.filing_instances (id) on delete set null,
  linked_by uuid references auth.users (id),
  linked_at timestamptz,
  created_at timestamptz not null default now(),
  check ((status = 'matched') = (client_id is not null)),
  check (filing_instance_id is null or client_id is not null)
);

create index bir_mail_status on public.bir_mail (status, received_at desc);
create index bir_mail_client on public.bir_mail (client_id, received_at desc) where client_id is not null;
create index bir_mail_filing on public.bir_mail (filing_instance_id) where filing_instance_id is not null;
create trigger audit after insert or update or delete on public.bir_mail for each row execute function private.audit();
alter table public.bir_mail enable row level security;

-- The Owner reads every message; staff read those linked to a client they can access.
-- Nobody writes it directly: the cron job (service role) adds mail, the functions below link it.
create policy bir_mail_owner_read on public.bir_mail for select to authenticated using (private.is_owner());
create policy bir_mail_staff_read on public.bir_mail for select to authenticated
  using (client_id is not null and private.is_staff() and private.can_access_client(client_id));

-- A file follows its message: whoever reads the message may open its attachments.
create policy bir_mail_object_read on storage.objects for select to authenticated using (
  bucket_id = 'bir-mail' and exists (
    select 1 from public.bir_mail m where m.attachments @> jsonb_build_array(jsonb_build_object('path', name))
  )
);

-- ---------------------------------------------------------------------------
-- What the BIR Mail Clerk reads
-- ---------------------------------------------------------------------------
create or replace function private.ai_bir_mail_caller() returns public.ai_employees
language sql stable security definer set search_path = '' as $$
  select e.* from public.ai_employees e
  where e.user_id = auth.uid() and e.enabled and e.client_data and e.key = 'bir_mail_clerk'
$$;

-- Mail not yet linked, newest first, with the Clerk's own latest proposal on each. Mail it
-- already proposed on (open, accepted or rejected) is left out unless p_include_drafted.
create or replace function public.ai_bir_mail(p_include_drafted boolean default false, p_limit integer default 50)
returns table (
  id uuid,
  received_at timestamptz,
  from_address text,
  subject text,
  snippet text,
  kind text,
  notice_type text,
  tins text[],
  attachment_count integer,
  my_proposal text
)
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_bir_mail_caller();
begin
  if me.user_id is null then
    raise exception 'Only the switched-on BIR Mail Clerk can read BIR mail' using errcode = '42501';
  end if;
  return query
    with mine as (
      select distinct on (d.subject_id) d.subject_id, d.status
      from public.ai_drafts d
      where d.ai_user_id = me.user_id and d.subject_table = 'bir_mail' and d.status <> 'withdrawn'
      order by d.subject_id, d.created_at desc
    )
    select m.id, m.received_at, m.from_address, m.subject, left(regexp_replace(m.body_text, '\s+', ' ', 'g'), 300),
           m.kind, m.notice_type, m.tins, jsonb_array_length(m.attachments), mine.status
    from public.bir_mail m
    left join mine on mine.subject_id = m.id
    where m.status = 'unmatched' and (p_include_drafted or mine.subject_id is null)
    order by m.received_at desc, m.id
    limit greatest(1, least(coalesce(p_limit, 50), 200));
end;
$$;

-- One message: not yet linked, or linked to one of the Clerk's clients. Attachments by
-- name, type and size only (the Clerk does not open the files).
create or replace function public.ai_bir_mail_message(p_id uuid)
returns table (
  id uuid,
  received_at timestamptz,
  from_address text,
  subject text,
  body_text text,
  kind text,
  notice_type text,
  tins text[],
  attachments jsonb,
  status text,
  client_id uuid,
  filing_instance_id uuid
)
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_bir_mail_caller();
begin
  if me.user_id is null then
    raise exception 'Only the switched-on BIR Mail Clerk can read BIR mail' using errcode = '42501';
  end if;
  return query
    select m.id, m.received_at, m.from_address, m.subject, m.body_text, m.kind, m.notice_type, m.tins,
           coalesce((select jsonb_agg(jsonb_build_object('file_name', a->>'file_name', 'mime_type', a->>'mime_type', 'size', a->'size'))
                     from jsonb_array_elements(m.attachments) a), '[]'::jsonb),
           m.status, m.client_id, m.filing_instance_id
    from public.bir_mail m
    where m.id = p_id
      and (m.status = 'unmatched' or (m.client_id is not null and m.client_id = any (private.ai_client_ids())));
end;
$$;

-- ---------------------------------------------------------------------------
-- People link the mail
-- ---------------------------------------------------------------------------
create or replace function private.link_bir_mail_row(p_mail uuid, p_client uuid, p_filing uuid) returns public.bir_mail
language plpgsql security definer set search_path = '' as $$
declare
  m public.bir_mail;
  f public.filing_instances;
begin
  select * into m from public.bir_mail where id = p_mail for update;
  if m.id is null then raise exception 'No such BIR mail' using errcode = 'P0002'; end if;
  if m.status = 'matched' then raise exception 'This BIR mail is already linked' using errcode = '23514'; end if;
  if p_filing is not null then
    select * into f from public.filing_instances where id = p_filing;
    if f.id is null or f.client_id <> p_client then
      raise exception 'The return is not this client''s' using errcode = '22023';
    end if;
  end if;
  update public.bir_mail
  set status = 'matched', client_id = p_client, filing_instance_id = p_filing, linked_by = auth.uid(), linked_at = now()
  where id = p_mail
  returning * into m;
  return m;
end;
$$;

-- Accept the BIR Mail Clerk's proposal: links the mail as proposed and records the
-- decision. The Owner, or staff who keep the client's books.
create or replace function public.accept_bir_mail_match(p_draft uuid, p_note text default null) returns public.bir_mail
language plpgsql security definer set search_path = '' as $$
declare
  d public.ai_drafts;
  m public.bir_mail;
  v_filing uuid;
begin
  select * into d from public.ai_drafts where id = p_draft for update;
  if d.id is null or d.kind <> 'bir_mail_match' or d.subject_table <> 'bir_mail' then
    raise exception 'No such BIR mail proposal' using errcode = 'P0002';
  end if;
  if d.client_id is null or not (private.is_owner() or (private.is_staff() and private.can_keep_books(d.client_id))) then
    raise exception 'Only the Owner or staff keeping this client''s books can accept it' using errcode = '42501';
  end if;
  if d.status <> 'open' then
    raise exception 'This proposal was already %', d.status using errcode = '23514';
  end if;
  v_filing := nullif(d.payload->>'filing_id', '')::uuid;
  m := private.link_bir_mail_row(d.subject_id, d.client_id, v_filing);
  update public.ai_drafts
  set status = 'accepted', decided_by = auth.uid(), decided_at = now(), decision_note = nullif(btrim(coalesce(p_note, '')), '')
  where id = d.id;
  return m;
end;
$$;

-- The Owner links mail himself (with or without a return).
create or replace function public.link_bir_mail(p_mail uuid, p_client uuid, p_filing uuid default null) returns public.bir_mail
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_owner() then raise exception 'Only the Owner links BIR mail by hand' using errcode = '42501'; end if;
  if not exists (select 1 from public.clients where id = p_client) then raise exception 'No such client' using errcode = 'P0002'; end if;
  return private.link_bir_mail_row(p_mail, p_client, p_filing);
end;
$$;

-- The Owner sets aside mail that is no one's (a newsletter, an advisory to everyone).
create or replace function public.dismiss_bir_mail(p_mail uuid) returns public.bir_mail
language plpgsql security definer set search_path = '' as $$
declare
  m public.bir_mail;
begin
  if not private.is_owner() then raise exception 'Only the Owner sets BIR mail aside' using errcode = '42501'; end if;
  update public.bir_mail set status = 'dismissed', linked_by = auth.uid(), linked_at = now()
  where id = p_mail and status = 'unmatched'
  returning * into m;
  if m.id is null then raise exception 'No such BIR mail waiting' using errcode = 'P0002'; end if;
  -- The Clerk's open proposals on it go away with it.
  update public.ai_drafts set status = 'withdrawn' where subject_table = 'bir_mail' and subject_id = p_mail and status = 'open';
  return m;
end;
$$;

revoke all on function private.ai_bir_mail_caller() from public;
revoke all on function private.link_bir_mail_row(uuid, uuid, uuid) from public;
revoke all on function public.ai_bir_mail(boolean, integer) from public;
revoke all on function public.ai_bir_mail_message(uuid) from public;
revoke all on function public.accept_bir_mail_match(uuid, text) from public;
revoke all on function public.link_bir_mail(uuid, uuid, uuid) from public;
revoke all on function public.dismiss_bir_mail(uuid) from public;
grant execute on function private.ai_bir_mail_caller() to authenticated;
grant execute on function public.ai_bir_mail(boolean, integer) to authenticated;
grant execute on function public.ai_bir_mail_message(uuid) to authenticated;
grant execute on function public.accept_bir_mail_match(uuid, text) to authenticated;
grant execute on function public.link_bir_mail(uuid, uuid, uuid) to authenticated;
grant execute on function public.dismiss_bir_mail(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- An urgent notice reaches the Owner at once
-- ---------------------------------------------------------------------------
-- Adds the kind to the notifications' kind check, keeping whatever kinds it already has
-- (other migrations of the same day may add theirs).
do $$
declare
  def text;
begin
  select pg_get_constraintdef(c.oid) into def
  from pg_constraint c where c.conname = 'notifications_kind_check' and c.conrelid = 'public.notifications'::regclass;
  if def is not null and position('bir_notice_flagged' in def) = 0 then
    execute 'alter table public.notifications drop constraint notifications_kind_check';
    execute 'alter table public.notifications add constraint notifications_kind_check '
      || replace(def, 'ARRAY[', 'ARRAY[''bir_notice_flagged''::text, ');
  end if;
end;
$$;

create or replace function private.notify_bir_notice_flagged() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  c text;
begin
  if new.kind <> 'bir_mail_match' or coalesce(new.payload->>'urgency', '') <> 'high' then return new; end if;
  select coalesce(code || ' ' || name, 'A client') into c from public.clients where id = new.client_id;
  perform private.notify(
    private.owner_ids(), 'bir_notice_flagged',
    coalesce(c, 'A client') || ': ' || coalesce(new.payload->>'notice_label', 'BIR notice') || ' received',
    coalesce('Answer by ' || (new.payload->>'respond_by') || '. ', '') || left(new.note, 400),
    '/app/bir-mail/' || new.subject_id, new.client_id
  );
  return new;
end;
$$;

create trigger notify_bir_notice_flagged after insert on public.ai_drafts
  for each row when (new.kind = 'bir_mail_match') execute function private.notify_bir_notice_flagged();
