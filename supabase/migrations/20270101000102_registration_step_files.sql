-- Proof files on registration steps: staff attach the government receipts, certificates,
-- permits and other proof to a step (several files, PDF or photos), open them and take
-- them off; the client sees the files on their own steps in the portal.
--
-- Files sit in the private "registration-files" bucket under <client id>/<case id>/.
-- The browser uploads to a one-time link (startStepFileUpload in
-- src/app/(platform)/app/registrations/actions.ts), then
-- add_registration_step_file records it. Who may see a file is decided by the row:
-- staff on the client (the Owner and staff assigned to it) and the client's own users,
-- as for the steps. Files are attached while the case is open or completed (a
-- certificate often arrives last), and taken off only while it is open. Taking a file
-- off keeps the stored copy (retention, §3.14).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('registration-files', 'registration-files', false, 26214400, array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create table public.registration_step_files (
  id uuid primary key default gen_random_uuid(),
  step_id uuid not null references public.registration_steps (id) on delete cascade,
  case_id uuid not null references public.registration_cases (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  file_name text not null check (btrim(file_name) <> ''),
  mime_type text not null check (mime_type in ('application/pdf', 'image/jpeg', 'image/png', 'image/webp')),
  size_bytes bigint not null check (size_bytes > 0),
  storage_path text not null unique,
  uploaded_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now()
);
create index registration_step_files_step_idx on public.registration_step_files (step_id, created_at);
create index registration_step_files_case_idx on public.registration_step_files (case_id);
create trigger audit after insert or update or delete on public.registration_step_files for each row execute function private.audit();

alter table public.registration_step_files enable row level security;
create policy registration_step_files_read on public.registration_step_files for select to authenticated
  using ((private.is_staff() and private.can_access_client(client_id)) or private.is_client_user(client_id));
revoke insert, update, delete on public.registration_step_files from authenticated;
grant select on public.registration_step_files to authenticated;

-- A stored file can be opened by whoever can see its row; staff on the client upload.
create policy registration_files_object_read on storage.objects for select to authenticated using (
  bucket_id = 'registration-files' and exists (select 1 from public.registration_step_files f where f.storage_path = name)
);
create policy registration_files_object_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'registration-files' and private.is_staff() and private.can_access_client(private.document_client(name))
);

-- Staff on the client record an uploaded file on a step.
create or replace function public.add_registration_step_file(
  p_step uuid, p_path text, p_file_name text, p_mime text, p_size bigint
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  s public.registration_steps;
  k public.registration_cases;
  v_id uuid;
begin
  select * into s from public.registration_steps where id = p_step;
  if s.id is null then raise exception 'Step not found' using errcode = 'P0002'; end if;
  select * into k from public.registration_cases where id = s.case_id;
  if not (private.is_staff() and private.can_access_client(k.client_id)) then
    raise exception 'Only staff on this client attach files to its registration' using errcode = '42501';
  end if;
  if k.status = 'cancelled' then raise exception 'This case was cancelled' using errcode = '22023'; end if;
  if coalesce(p_mime, '') not in ('application/pdf', 'image/jpeg', 'image/png', 'image/webp') then
    raise exception 'Attach a PDF or a photo (JPEG, PNG or WebP)' using errcode = '22023';
  end if;
  if p_path is null or p_path not like k.client_id::text || '/' || k.id::text || '/%' then
    raise exception 'The file is not in this case''s folder' using errcode = '22023';
  end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'registration-files' and o.name = p_path) then
    raise exception 'The file has not been uploaded' using errcode = '22023';
  end if;
  if coalesce(p_size, 0) <= 0 then raise exception 'The file is empty' using errcode = '22023'; end if;
  insert into public.registration_step_files (step_id, case_id, client_id, file_name, mime_type, size_bytes, storage_path)
  values (s.id, k.id, k.client_id, left(coalesce(nullif(btrim(p_file_name), ''), 'file'), 200), p_mime, p_size, p_path)
  returning id into v_id;
  return v_id;
end;
$$;

-- Staff on the client take a file off a step while the case is open (the stored copy is kept).
create or replace function public.remove_registration_step_file(p_file uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  f public.registration_step_files;
  k public.registration_cases;
begin
  select * into f from public.registration_step_files where id = p_file;
  if f.id is null then raise exception 'File not found' using errcode = 'P0002'; end if;
  if not (private.is_staff() and private.can_access_client(f.client_id)) then
    raise exception 'Only staff on this client remove its files' using errcode = '42501';
  end if;
  select * into k from public.registration_cases where id = f.case_id;
  if k.status <> 'open' then raise exception 'This case is closed' using errcode = '22023'; end if;
  delete from public.registration_step_files where id = f.id;
end;
$$;

revoke execute on function public.add_registration_step_file(uuid, text, text, text, bigint) from public, anon;
revoke execute on function public.remove_registration_step_file(uuid) from public, anon;
grant execute on function public.add_registration_step_file(uuid, text, text, text, bigint) to authenticated;
grant execute on function public.remove_registration_step_file(uuid) to authenticated;
