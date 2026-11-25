-- Rework phase 3 (docs/REWORK.md, decisions 14 and 15): files kept on a return.
--
--   filed_copy         the ONE scanned copy staff attach at Filed & paid: the return,
--                      the proof of payment and the attachments in one file. The client
--                      sees it under Returns in the portal. Attaching another replaces it
--                      (the earlier copy is kept, marked replaced).
--   validation_report  the BIR's eSubmission validation report: from the reply in the
--                      firm's eSubmission mailbox, or uploaded by staff (manual fallback).
--   esubmission_dat    a copy of each DAT file sent to the BIR (staff only).
--
-- Files sit in the private "filing-files" bucket under <client id>/<filing id>/<file>.
-- Staff upload through a one-time signed link, then add_filing_file() records the file.
-- The eSubmission mailbox job (service role) writes its files directly.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('filing-files', 'filing-files', false, 26214400, array[
  'application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'text/plain', 'text/html', 'application/octet-stream'
])
on conflict (id) do nothing;

create table public.filing_files (
  id uuid primary key default gen_random_uuid(),
  filing_instance_id uuid not null references public.filing_instances (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('filed_copy', 'validation_report', 'esubmission_dat')),
  file_name text not null check (btrim(file_name) <> ''),
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  storage_path text not null unique,
  -- 'staff' uploaded it; 'mailbox' came from the BIR's reply; 'app' was built and sent by the app.
  source text not null default 'staff' check (source in ('staff', 'mailbox', 'app')),
  uploaded_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  replaced_at timestamptz,
  replaced_by uuid references auth.users (id)
);

-- One current scanned copy per return.
create unique index filing_files_one_filed_copy on public.filing_files (filing_instance_id) where kind = 'filed_copy' and replaced_at is null;
create index filing_files_filing_idx on public.filing_files (filing_instance_id, kind, created_at);

create trigger audit after insert or update or delete on public.filing_files for each row execute function private.audit();
alter table public.filing_files enable row level security;

-- Staff who see the client (or the acting approver who sees the return) read every file;
-- the client's users read the scanned copy and the validation report once the return is filed.
create policy filing_files_read_staff on public.filing_files for select to authenticated using (
  (private.is_staff() and private.can_access_client(client_id)) or private.acting_sees_filing(filing_instance_id)
);
create policy filing_files_read_client on public.filing_files for select to authenticated using (
  kind in ('filed_copy', 'validation_report') and replaced_at is null
  and private.is_client_user(client_id)
  and exists (select 1 from public.filing_instances f where f.id = filing_instance_id and f.status = 'filed')
);

-- Objects follow the rows: a reader of the row may open the file; staff assigned to the
-- client (or the Owner) upload into its folder.
create policy filing_files_object_read on storage.objects for select to authenticated using (
  bucket_id = 'filing-files' and exists (select 1 from public.filing_files ff where ff.storage_path = name)
);
create policy filing_files_object_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'filing-files' and private.can_keep_books(private.document_client(name))
);

/**
 * Records a file staff uploaded to a return (kind filed_copy or validation_report).
 * A scanned copy may be attached once the Owner approved the return; it replaces the
 * current one. A validation report needs a return whose DAT files were sent (see the
 * eSubmission functions, which record it as the result).
 */
create or replace function public.add_filing_file(
  p_filing uuid, p_kind text, p_path text, p_file_name text, p_mime text, p_size bigint
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  v_id uuid;
begin
  select * into f from public.filing_instances where id = p_filing;
  if f.id is null or not (private.is_staff() and private.can_access_client(f.client_id)) then
    raise exception 'Return not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(f.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can attach files to its returns' using errcode = '42501';
  end if;
  if p_kind not in ('filed_copy', 'validation_report') then raise exception 'Unknown kind of file' using errcode = '22023'; end if;
  if p_path is null or p_path not like f.client_id::text || '/' || f.id::text || '/%' then
    raise exception 'The file is not in this return''s folder' using errcode = '22023';
  end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'filing-files' and o.name = p_path) then
    raise exception 'The file has not been uploaded' using errcode = '22023';
  end if;
  if coalesce(p_size, 0) <= 0 then raise exception 'The file is empty' using errcode = '22023'; end if;
  if p_kind = 'filed_copy' then
    if f.status not in ('owner_approved', 'filed') then
      raise exception 'Attach the scanned copy once the Owner has approved the return' using errcode = '22023';
    end if;
    update public.filing_files set replaced_at = now(), replaced_by = auth.uid()
      where filing_instance_id = f.id and kind = 'filed_copy' and replaced_at is null;
  end if;
  insert into public.filing_files (filing_instance_id, client_id, kind, file_name, mime_type, size_bytes, storage_path, source)
  values (f.id, f.client_id, p_kind, coalesce(nullif(btrim(p_file_name), ''), 'file'), coalesce(nullif(p_mime, ''), 'application/octet-stream'), p_size, p_path, 'staff')
  returning filing_files.id into v_id;
  return v_id;
end;
$$;

revoke execute on function public.add_filing_file(uuid, text, text, text, text, bigint) from public, anon;
grant execute on function public.add_filing_file(uuid, text, text, text, text, bigint) to authenticated;
