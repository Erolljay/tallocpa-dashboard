-- Requests & tickets (spec §3.6 open item, §3.7c): one place in the portal for
-- what the firm asks of a client and what a client asks of the firm.
--
-- A request goes to the client (e.g. documents a registration step needs); a
-- ticket comes from the client. Both are a thread of messages, each with an
-- optional file in the private "requests" bucket under
-- <client id>/<request id>/<file>.
--
-- A request can be tied to a registration step. Asking for something on a step
-- puts the step on "Waiting on client" on the routing slip; the client's reply
-- puts it back to "In progress" with the firm.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('requests', 'requests', false, 20971520, array[
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
])
on conflict (id) do nothing;

create table public.client_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  -- to_client: the firm asks the client; from_client: the client's ticket.
  direction text not null check (direction in ('to_client', 'from_client')),
  subject text not null check (btrim(subject) <> ''),
  -- open: waiting on whoever must act next; answered: the other side replied; closed: done.
  status text not null default 'open' check (status in ('open', 'answered', 'closed')),
  due_date date,
  registration_step_id uuid references public.registration_steps (id) on delete set null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_by uuid references auth.users (id),
  closed_at timestamptz,
  check ((status = 'closed') = (closed_at is not null))
);
create index client_requests_client_idx on public.client_requests (client_id, status, created_at desc);
create index client_requests_step_idx on public.client_requests (registration_step_id) where registration_step_id is not null;

create table public.client_request_messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.client_requests (id) on delete cascade,
  author uuid references auth.users (id),
  from_firm boolean not null,
  body text,
  storage_path text unique,
  file_name text,
  mime_type text,
  created_at timestamptz not null default now(),
  check (nullif(btrim(body), '') is not null or storage_path is not null),
  check ((storage_path is null) = (file_name is null))
);
create index client_request_messages_request_idx on public.client_request_messages (request_id, created_at);

create trigger audit after insert or update or delete on public.client_requests for each row execute function private.audit();
create trigger audit after insert or update or delete on public.client_request_messages for each row execute function private.audit();
create trigger touch_updated_at before update on public.client_requests for each row execute function private.touch_updated_at();

alter table public.client_requests enable row level security;
alter table public.client_request_messages enable row level security;
create policy client_requests_read on public.client_requests for select to authenticated
  using ((private.is_staff() and private.can_access_client(client_id)) or private.is_client_user(client_id));
create policy client_request_messages_read on public.client_request_messages for select to authenticated
  using (exists (
    select 1 from public.client_requests r
    where r.id = request_id and ((private.is_staff() and private.can_access_client(r.client_id)) or private.is_client_user(r.client_id))
  ));

-- Files: staff on the client and the client's own users read and add; nothing is changed or removed.
create policy requests_files_read on storage.objects for select to authenticated using (
  bucket_id = 'requests' and private.can_upload(private.document_client(name))
);
create policy requests_files_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'requests' and private.can_upload(private.document_client(name))
);

-- Who may act on a client's requests: staff on the client (true) or its users (false); null for anyone else.
create or replace function private.request_side(p_client uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select case
    when private.is_staff() and private.can_access_client(p_client) then true
    when private.is_client_user(p_client) then false
  end
$$;

-- Checks an attached file: it must sit under <client>/<request>/ and already be uploaded.
create or replace function private.check_request_file(r public.client_requests, p_path text) returns void
language plpgsql stable security definer set search_path = '' as $$
begin
  if p_path is null then return; end if;
  if p_path not like r.client_id::text || '/' || r.id::text || '/%' then
    raise exception 'The file is not in this request''s folder' using errcode = '22023';
  end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'requests' and o.name = p_path) then
    raise exception 'The file has not been uploaded' using errcode = '22023';
  end if;
end;
$$;

-- Staff ask the client for something, optionally for a registration step (the step then waits on the client).
create or replace function public.create_client_request(
  p_client uuid, p_subject text, p_body text, p_due date default null, p_step uuid default null
) returns public.client_requests
language plpgsql security definer set search_path = '' as $$
declare
  r public.client_requests;
  k public.registration_cases;
begin
  if private.request_side(p_client) is not true then
    raise exception 'Only staff on this client send it requests' using errcode = '42501';
  end if;
  if coalesce(btrim(p_subject), '') = '' then raise exception 'Enter what you are asking for' using errcode = '22023'; end if;
  if p_step is not null then
    select c.* into k from public.registration_steps s join public.registration_cases c on c.id = s.case_id where s.id = p_step;
    if k.id is null or k.client_id <> p_client then raise exception 'That step is not this client''s' using errcode = '22023'; end if;
    if k.status <> 'open' then raise exception 'That registration is closed' using errcode = '22023'; end if;
  end if;

  insert into public.client_requests (client_id, direction, subject, due_date, registration_step_id, created_by)
  values (p_client, 'to_client', btrim(p_subject), p_due, p_step, auth.uid())
  returning * into r;
  if nullif(btrim(p_body), '') is not null then
    insert into public.client_request_messages (request_id, author, from_firm, body) values (r.id, auth.uid(), true, btrim(p_body));
  end if;
  if p_step is not null then
    update public.registration_steps
    set status = 'waiting_client', status_changed_at = case when status <> 'waiting_client' then now() else status_changed_at end, updated_by = auth.uid()
    where id = p_step and status not in ('done', 'not_applicable');
  end if;
  return r;
end;
$$;

-- A client user opens a ticket.
create or replace function public.open_client_ticket(p_client uuid, p_subject text, p_body text)
returns public.client_requests
language plpgsql security definer set search_path = '' as $$
declare
  r public.client_requests;
begin
  if private.request_side(p_client) is distinct from false then
    raise exception 'Only the client''s own users open tickets' using errcode = '42501';
  end if;
  if coalesce(btrim(p_subject), '') = '' then raise exception 'Enter a subject' using errcode = '22023'; end if;
  if coalesce(btrim(p_body), '') = '' then raise exception 'Write your message' using errcode = '22023'; end if;
  insert into public.client_requests (client_id, direction, subject, created_by)
  values (p_client, 'from_client', btrim(p_subject), auth.uid()) returning * into r;
  insert into public.client_request_messages (request_id, author, from_firm, body) values (r.id, auth.uid(), false, btrim(p_body));
  return r;
end;
$$;

-- Either side replies, with a message, a file or both. A reply hands the thread
-- to the other side; a client's reply on a registration step puts the step back with the firm.
create or replace function public.reply_client_request(p_request uuid, p_body text, p_path text default null, p_file_name text default null, p_mime text default null)
returns public.client_request_messages
language plpgsql security definer set search_path = '' as $$
declare
  r public.client_requests;
  firm boolean;
  m public.client_request_messages;
begin
  select * into r from public.client_requests where id = p_request for update;
  if r.id is null then raise exception 'Request not found' using errcode = 'P0002'; end if;
  firm := private.request_side(r.client_id);
  if firm is null then raise exception 'You cannot reply to this request' using errcode = '42501'; end if;
  if r.status = 'closed' then raise exception 'This request is closed' using errcode = '22023'; end if;
  if nullif(btrim(p_body), '') is null and p_path is null then raise exception 'Write a message or attach a file' using errcode = '22023'; end if;
  perform private.check_request_file(r, p_path);

  insert into public.client_request_messages (request_id, author, from_firm, body, storage_path, file_name, mime_type)
  values (r.id, auth.uid(), firm, nullif(btrim(p_body), ''), p_path,
          case when p_path is not null then coalesce(nullif(btrim(p_file_name), ''), 'file') end,
          case when p_path is not null then p_mime end)
  returning * into m;

  -- 'open' = waiting on the side that must act: the client for a request, the firm for a ticket.
  update public.client_requests
  set status = case
    when (r.direction = 'to_client') = firm then 'open'
    else 'answered'
  end
  where id = r.id;

  if not firm and r.registration_step_id is not null then
    update public.registration_steps
    set status = 'in_progress', status_changed_at = now(), updated_by = auth.uid()
    where id = r.registration_step_id and status = 'waiting_client';
  end if;
  return m;
end;
$$;

-- Staff close a request or ticket; a client closes its own ticket.
create or replace function public.close_client_request(p_request uuid) returns public.client_requests
language plpgsql security definer set search_path = '' as $$
declare
  r public.client_requests;
  firm boolean;
begin
  select * into r from public.client_requests where id = p_request;
  if r.id is null then raise exception 'Request not found' using errcode = 'P0002'; end if;
  firm := private.request_side(r.client_id);
  if firm is null or (firm = false and r.direction <> 'from_client') then
    raise exception 'You cannot close this request' using errcode = '42501';
  end if;
  if r.status = 'closed' then return r; end if;
  update public.client_requests set status = 'closed', closed_by = auth.uid(), closed_at = now() where id = p_request returning * into r;
  return r;
end;
$$;

revoke execute on function private.request_side(uuid) from public, anon;
revoke execute on function private.check_request_file(public.client_requests, text) from public, anon;
revoke execute on function public.create_client_request(uuid, text, text, date, uuid) from public, anon;
revoke execute on function public.open_client_ticket(uuid, text, text) from public, anon;
revoke execute on function public.reply_client_request(uuid, text, text, text, text) from public, anon;
revoke execute on function public.close_client_request(uuid) from public, anon;
grant execute on function private.request_side(uuid) to authenticated;
grant execute on function public.create_client_request(uuid, text, text, date, uuid) to authenticated;
grant execute on function public.open_client_ticket(uuid, text, text) to authenticated;
grant execute on function public.reply_client_request(uuid, text, text, text, text) to authenticated;
grant execute on function public.close_client_request(uuid) to authenticated;
