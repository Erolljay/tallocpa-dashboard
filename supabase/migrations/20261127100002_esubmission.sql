-- Rework phase 3 (docs/REWORK.md, decision 15): eSubmission of a return's DAT
-- attachments (SLS, SLP, SAWT, QAP, alphalist) and the BIR's validation report.
--
-- After the Owner's approval the app sends the DAT files from the firm's eSubmission
-- mailbox (attachments@tallocpa.com, Gmail API) to esubmission@bir.gov.ph, or staff
-- send them by hand and mark them sent. The reply in that mailbox carries the
-- validation report, which is attached to the return.
--
--   filing_instances.esubmission_required  the return has DAT attachments (set at the
--                                          Owner's approval from the worksheet)
--   filing_instances.esubmission_files     their file names
--   esubmissions                           each send; one current per return
--
-- State of a return: not_required | not_sent | sent | validated | errors
-- (errors: fix and resend). A return with attachments is complete only once Filed &
-- paid AND validated.

alter table public.filing_instances
  add column esubmission_required boolean not null default false,
  add column esubmission_files text[] not null default '{}';

create table public.esubmissions (
  id uuid primary key default gen_random_uuid(),
  filing_instance_id uuid not null references public.filing_instances (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  method text not null check (method in ('gmail', 'manual')),
  files text[] not null default '{}',
  status text not null default 'sent' check (status in ('sent', 'validated', 'errors')),
  -- Gmail ids of the message sent, to find the BIR's reply in the same thread.
  gmail_message_id text,
  gmail_thread_id text,
  sent_by uuid references auth.users (id) default auth.uid(),
  sent_at timestamptz not null default now(),
  -- Last time the mailbox was checked for the reply.
  checked_at timestamptz,
  result_at timestamptz,
  result_by uuid references auth.users (id),
  result_note text,
  -- A resend replaces this send.
  superseded_at timestamptz,
  check (method = 'manual' or gmail_message_id is not null),
  check ((status = 'sent') = (result_at is null))
);
create unique index esubmissions_one_current on public.esubmissions (filing_instance_id) where superseded_at is null;
create index esubmissions_waiting_idx on public.esubmissions (sent_at) where status = 'sent' and superseded_at is null;

alter table public.filing_files add column esubmission_id uuid references public.esubmissions (id) on delete set null;

create trigger audit after insert or update or delete on public.esubmissions for each row execute function private.audit();
alter table public.esubmissions enable row level security;
create policy esubmissions_read on public.esubmissions for select to authenticated using (
  (private.is_staff() and private.can_access_client(client_id)) or private.acting_sees_filing(filing_instance_id)
  or (private.is_client_user(client_id) and superseded_at is null)
);

-- ---------------------------------------------------------------------------
-- State.
-- ---------------------------------------------------------------------------

/** not_required | not_sent | sent | validated | errors, without access checks. */
create or replace function private.esubmission_state(p_filing uuid) returns text
language sql stable security definer set search_path = '' as $$
  select case
    when not f.esubmission_required then 'not_required'
    else coalesce((select e.status from public.esubmissions e where e.filing_instance_id = f.id and e.superseded_at is null), 'not_sent')
  end
  from public.filing_instances f where f.id = p_filing
$$;

/** Filed & paid, and validated by the BIR when the return has DAT attachments. */
create or replace function private.filing_complete(p_filing uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select f.status = 'filed' and private.esubmission_state(f.id) in ('not_required', 'validated')
  from public.filing_instances f where f.id = p_filing
$$;

create or replace function public.filing_esubmission_state(p_filing uuid) returns text
language sql stable security definer set search_path = '' as $$
  select private.esubmission_state(f.id) from public.filing_instances f
  where f.id = p_filing
    and ((private.is_staff() and private.can_access_client(f.client_id)) or private.acting_sees_filing(f.id) or private.is_client_user(f.client_id))
$$;

create or replace function public.filing_complete(p_filing uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.filing_complete(f.id) from public.filing_instances f
  where f.id = p_filing
    and ((private.is_staff() and private.can_access_client(f.client_id)) or private.acting_sees_filing(f.id) or private.is_client_user(f.client_id))
$$;

-- ---------------------------------------------------------------------------
-- Staff actions.
-- ---------------------------------------------------------------------------

/**
 * Records a send of the return's DAT files: by the app through the mailbox ('gmail',
 * with the Gmail ids) or by hand ('manual', "mark sent"). Allowed after the Owner's
 * approval, for a return with DAT attachments, when nothing is waiting or validated:
 * the first send, or a resend after errors. Returns the send.
 */
create or replace function public.record_esubmission_sent(
  p_filing uuid, p_method text, p_files text[], p_gmail_message_id text default null, p_gmail_thread_id text default null
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  st text;
  v_id uuid;
begin
  select * into f from public.filing_instances where id = p_filing for update;
  if f.id is null or not (private.is_staff() and private.can_access_client(f.client_id)) then
    raise exception 'Return not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(f.client_id) then
    raise exception 'Only the Owner or staff assigned to this client send its DAT files' using errcode = '42501';
  end if;
  if f.status not in ('owner_approved', 'filed') then
    raise exception 'The DAT files are sent after the Owner''s approval' using errcode = '22023';
  end if;
  if not f.esubmission_required then
    raise exception 'This return has no DAT attachments to send' using errcode = '22023';
  end if;
  if p_method not in ('gmail', 'manual') then raise exception 'Unknown way of sending' using errcode = '22023'; end if;
  if p_method = 'gmail' and nullif(btrim(coalesce(p_gmail_message_id, '')), '') is null then
    raise exception 'The mailbox did not return the message id' using errcode = '22023';
  end if;
  st := private.esubmission_state(f.id);
  if st = 'sent' then raise exception 'The DAT files were sent; wait for the BIR''s reply' using errcode = '22023'; end if;
  if st = 'validated' then raise exception 'The BIR already validated this return''s DAT files' using errcode = '22023'; end if;
  update public.esubmissions set superseded_at = now() where filing_instance_id = f.id and superseded_at is null;
  insert into public.esubmissions (filing_instance_id, client_id, method, files, gmail_message_id, gmail_thread_id)
  values (f.id, f.client_id, p_method, coalesce(p_files, f.esubmission_files), nullif(btrim(coalesce(p_gmail_message_id, '')), ''), nullif(btrim(coalesce(p_gmail_thread_id, '')), ''))
  returning id into v_id;
  return v_id;
end;
$$;

/**
 * Staff record the BIR's answer by hand: validated (with the validation report they
 * uploaded with add_filing_file) or errors (with what to fix). Allowed while the send
 * waits; staff may also correct a result the mailbox recorded.
 */
create or replace function public.record_esubmission_result(p_filing uuid, p_status text, p_note text default null, p_file uuid default null)
returns void
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  e public.esubmissions;
begin
  select * into f from public.filing_instances where id = p_filing;
  if f.id is null or not (private.is_staff() and private.can_access_client(f.client_id)) then
    raise exception 'Return not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(f.client_id) then
    raise exception 'Only the Owner or staff assigned to this client record the BIR''s reply' using errcode = '42501';
  end if;
  select * into e from public.esubmissions where filing_instance_id = f.id and superseded_at is null for update;
  if e.id is null then raise exception 'Send the DAT files first' using errcode = '22023'; end if;
  if p_status not in ('validated', 'errors') then raise exception 'Choose validated or errors' using errcode = '22023'; end if;
  if p_status = 'validated' then
    if p_file is null and not exists (select 1 from public.filing_files where esubmission_id = e.id and kind = 'validation_report') then
      raise exception 'Attach the BIR''s validation report' using errcode = '22023';
    end if;
  elsif nullif(btrim(coalesce(p_note, '')), '') is null and p_file is null then
    raise exception 'Say what the BIR found wrong, or attach its reply' using errcode = '22023';
  end if;
  if p_file is not null then
    if not exists (select 1 from public.filing_files where id = p_file and filing_instance_id = f.id and kind = 'validation_report') then
      raise exception 'That file is not a validation report of this return' using errcode = '22023';
    end if;
    update public.filing_files set esubmission_id = e.id where id = p_file;
  end if;
  update public.esubmissions
    set status = p_status, result_at = now(), result_by = auth.uid(), result_note = nullif(btrim(coalesce(p_note, '')), '')
    where id = e.id;
end;
$$;

-- ---------------------------------------------------------------------------
-- The mailbox job (service role only: the grant is the check).
-- ---------------------------------------------------------------------------

/** Sends sent through the mailbox and still waiting for the BIR's reply. */
create or replace function public.esubmissions_waiting()
returns table (id uuid, filing_instance_id uuid, client_id uuid, gmail_thread_id text, gmail_message_id text, sent_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select e.id, e.filing_instance_id, e.client_id, e.gmail_thread_id, e.gmail_message_id, e.sent_at
  from public.esubmissions e
  where e.status = 'sent' and e.superseded_at is null and e.method = 'gmail'
  order by e.sent_at
$$;

/** Notes that the mailbox was checked and no reply was found yet. */
create or replace function public.esubmission_checked(p_esubmission uuid) returns void
language sql security definer set search_path = '' as $$
  update public.esubmissions set checked_at = now() where id = p_esubmission
$$;

/**
 * Records the BIR's reply found in the mailbox: the validation report file (already
 * stored under the return's folder) and validated or errors. Ignored when the send
 * is no longer waiting.
 */
create or replace function public.esubmission_mailbox_result(
  p_esubmission uuid, p_status text, p_note text, p_path text, p_file_name text, p_mime text, p_size bigint
) returns boolean
language plpgsql security definer set search_path = '' as $$
declare
  e public.esubmissions;
begin
  select * into e from public.esubmissions where id = p_esubmission for update;
  if e.id is null or e.status <> 'sent' or e.superseded_at is not null then return false; end if;
  if p_status not in ('validated', 'errors') then raise exception 'Choose validated or errors' using errcode = '22023'; end if;
  if p_path is not null then
    if p_path not like e.client_id::text || '/' || e.filing_instance_id::text || '/%' then
      raise exception 'The file is not in this return''s folder' using errcode = '22023';
    end if;
    insert into public.filing_files (filing_instance_id, client_id, kind, file_name, mime_type, size_bytes, storage_path, source, uploaded_by, esubmission_id)
    values (e.filing_instance_id, e.client_id, 'validation_report', coalesce(nullif(btrim(p_file_name), ''), 'validation-report'),
            coalesce(nullif(p_mime, ''), 'application/octet-stream'), greatest(coalesce(p_size, 1), 1), p_path, 'mailbox', null, e.id);
  elsif p_status = 'validated' then
    raise exception 'A validated reply needs its validation report' using errcode = '22023';
  end if;
  update public.esubmissions
    set status = p_status, result_at = now(), result_by = null, checked_at = now(), result_note = nullif(btrim(coalesce(p_note, '')), '')
    where id = e.id;
  return true;
end;
$$;

/** Records a copy of a DAT file the app sent (service role or staff through the send action). */
create or replace function public.esubmission_add_dat(p_esubmission uuid, p_path text, p_file_name text, p_size bigint) returns void
language plpgsql security definer set search_path = '' as $$
declare
  e public.esubmissions;
begin
  select * into e from public.esubmissions where id = p_esubmission;
  if e.id is null or not (private.is_staff() and private.can_keep_books(e.client_id)) then
    raise exception 'eSubmission not found' using errcode = 'P0002';
  end if;
  if p_path not like e.client_id::text || '/' || e.filing_instance_id::text || '/%' then
    raise exception 'The file is not in this return''s folder' using errcode = '22023';
  end if;
  insert into public.filing_files (filing_instance_id, client_id, kind, file_name, mime_type, size_bytes, storage_path, source, esubmission_id)
  values (e.filing_instance_id, e.client_id, 'esubmission_dat', p_file_name, 'application/octet-stream', greatest(coalesce(p_size, 1), 1), p_path, 'app', e.id);
end;
$$;

revoke execute on function private.esubmission_state(uuid) from public, anon, authenticated;
revoke execute on function private.filing_complete(uuid) from public, anon, authenticated;
revoke execute on function public.filing_esubmission_state(uuid) from public, anon;
revoke execute on function public.filing_complete(uuid) from public, anon;
revoke execute on function public.record_esubmission_sent(uuid, text, text[], text, text) from public, anon;
revoke execute on function public.record_esubmission_result(uuid, text, text, uuid) from public, anon;
revoke execute on function public.esubmission_add_dat(uuid, text, text, bigint) from public, anon;
revoke execute on function public.esubmissions_waiting() from public, anon, authenticated;
revoke execute on function public.esubmission_checked(uuid) from public, anon, authenticated;
revoke execute on function public.esubmission_mailbox_result(uuid, text, text, text, text, text, bigint) from public, anon, authenticated;
grant execute on function public.filing_esubmission_state(uuid) to authenticated;
grant execute on function public.filing_complete(uuid) to authenticated;
grant execute on function public.record_esubmission_sent(uuid, text, text[], text, text) to authenticated;
grant execute on function public.record_esubmission_result(uuid, text, text, uuid) to authenticated;
grant execute on function public.esubmission_add_dat(uuid, text, text, bigint) to authenticated;
grant execute on function public.esubmissions_waiting() to service_role;
grant execute on function public.esubmission_checked(uuid) to service_role;
grant execute on function public.esubmission_mailbox_result(uuid, text, text, text, text, text, bigint) to service_role;
