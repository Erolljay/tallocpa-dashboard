-- Onboarding tab (Owner, 25 November 2026): each client has an onboarding
-- checklist, and the client's file holds the proposal and the signed contract
-- (engagement letter).
--
-- Most checklist items are worked out from the data: engagement, COR, obligations,
-- team, portal, chart, opening balances, employees, batch uploads
-- (src/lib/onboarding/checklist.ts). The items nothing records, such as BIR
-- eFiling access and the kickoff meeting, are ticked by staff here.
--
-- Files sit in the private "client-files" bucket under <client id>/<file>. Phase 2
-- will attach the proposal it generates and the contract the client e-signs to
-- the same list.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('client-files', 'client-files', false, 20971520, array[
  'application/pdf', 'image/jpeg', 'image/png', 'image/webp',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
])
on conflict (id) do nothing;

create table public.client_files (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('proposal', 'contract', 'other')),
  title text not null check (btrim(title) <> ''),
  file_name text not null,
  storage_path text not null unique,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  -- Contract: the date both parties signed.
  signed_on date,
  uploaded_by uuid not null references auth.users (id),
  created_at timestamptz not null default now()
);
create index client_files_client_idx on public.client_files (client_id, created_at desc);
alter table public.client_files enable row level security;
create policy client_files_read on public.client_files for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create trigger audit after insert or update or delete on public.client_files for each row execute function private.audit();

-- The Owner and staff assigned to the client upload and read; files are never changed.
create policy client_files_object_read on storage.objects for select to authenticated using (
  bucket_id = 'client-files' and private.is_staff() and private.can_access_client(private.document_client(name))
);
create policy client_files_object_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'client-files' and private.can_keep_books(private.document_client(name))
);

create table public.onboarding_ticks (
  client_id uuid not null references public.clients (id) on delete cascade,
  item text not null check (item ~ '^[a-z][a-z0-9_]*$'),
  note text,
  done_by uuid not null references auth.users (id),
  done_at timestamptz not null default now(),
  primary key (client_id, item)
);
alter table public.onboarding_ticks enable row level security;
create policy onboarding_ticks_read on public.onboarding_ticks for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create trigger audit after insert or update or delete on public.onboarding_ticks for each row execute function private.audit();

/** Records an uploaded proposal, contract or other onboarding file. */
create or replace function public.add_client_file(
  p_client uuid, p_kind text, p_title text, p_path text, p_file_name text, p_mime text, p_size bigint, p_signed_on date default null
) returns public.client_files
language plpgsql security definer set search_path = '' as $$
declare
  f public.client_files;
begin
  if not private.can_access_client(p_client) or not private.is_staff() then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can add its files' using errcode = '42501';
  end if;
  if p_path not like p_client::text || '/%' then raise exception 'The file is not in this client''s folder' using errcode = '22023'; end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'client-files' and o.name = p_path) then
    raise exception 'The file has not been uploaded' using errcode = '22023';
  end if;
  insert into public.client_files (client_id, kind, title, file_name, storage_path, mime_type, size_bytes, signed_on, uploaded_by)
  values (p_client, p_kind, coalesce(nullif(btrim(p_title), ''), p_file_name), p_file_name, p_path, p_mime, p_size,
          case when p_kind = 'contract' then p_signed_on end, auth.uid())
  returning * into f;
  return f;
end;
$$;

/** Removes a file from the list (Owner only). The stored object is kept. */
create or replace function public.remove_client_file(p_file uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_owner() then raise exception 'Only the Owner can remove a client file' using errcode = '42501'; end if;
  delete from public.client_files where id = p_file;
end;
$$;

/** Ticks or unticks a manual onboarding item. */
create or replace function public.set_onboarding_item(p_client uuid, p_item text, p_done boolean, p_note text default null) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.can_access_client(p_client) or not private.is_staff() then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can tick its onboarding' using errcode = '42501';
  end if;
  if p_done then
    insert into public.onboarding_ticks (client_id, item, note, done_by) values (p_client, p_item, nullif(btrim(p_note), ''), auth.uid())
    on conflict (client_id, item) do update set note = excluded.note, done_by = excluded.done_by, done_at = now();
  else
    delete from public.onboarding_ticks where client_id = p_client and item = p_item;
  end if;
end;
$$;

revoke execute on function public.add_client_file(uuid, text, text, text, text, text, bigint, date) from public, anon;
grant execute on function public.add_client_file(uuid, text, text, text, text, text, bigint, date) to authenticated;
revoke execute on function public.remove_client_file(uuid) from public, anon;
grant execute on function public.remove_client_file(uuid) to authenticated;
revoke execute on function public.set_onboarding_item(uuid, text, boolean, text) from public, anon;
grant execute on function public.set_onboarding_item(uuid, text, boolean, text) to authenticated;
