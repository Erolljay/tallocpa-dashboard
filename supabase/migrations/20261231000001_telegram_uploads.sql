-- Telegram uploads (Owner's request, 27 November 2026).
--
-- A quiet, opt-in channel: some clients do not trust Telegram, so it is off for
-- every client until staff switch it on for that client (clients.telegram_enabled).
-- A client without it never sees Telegram in the portal.
--
-- Once on, a portal user links their Telegram chat from the Upload page (a one-time
-- code opened in the bot), then sends photos or PDFs to the bot. The bot answers each
-- file (or album) with buttons for the kind of document; tapping one files it in the
-- client's Inbox exactly as a portal upload would, with source 'telegram'.
--
-- The bot runs on the server with the secret key; the tables below have no policies
-- for writes, and the service-role functions check the person is still the client's
-- portal user and the channel is still on before anything is filed.

alter table public.clients add column telegram_enabled boolean not null default false;

alter table public.documents drop constraint documents_source_check;
alter table public.documents add constraint documents_source_check check (source in ('portal', 'staff', 'email', 'batch', 'telegram'));
alter table public.register_lines drop constraint register_lines_source_check;
alter table public.register_lines add constraint register_lines_source_check check (source in ('portal', 'staff', 'email', 'batch', 'telegram'));

-- One-time codes a portal user opens in the bot (t.me/<bot>?start=<code>). 15 minutes.
create table public.telegram_link_codes (
  code text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  expires_at timestamptz not null default now() + interval '15 minutes',
  used_at timestamptz
);

-- A linked chat sends files for one client as one portal user.
create table public.telegram_links (
  chat_id bigint primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  username text,
  linked_at timestamptz not null default now()
);
create index telegram_links_client_idx on public.telegram_links (client_id);

-- Files received by the bot, waiting for the client to tap what kind they are.
-- An album (media_group_id) gets one set of buttons: the row with prompt = true.
create table public.telegram_uploads (
  id uuid primary key default gen_random_uuid(),
  chat_id bigint not null references public.telegram_links (chat_id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  media_group_id text,
  prompt boolean not null default true,
  file_id text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  status text not null default 'waiting' check (status in ('waiting', 'filing', 'filed', 'failed')),
  document_id uuid references public.documents (id) on delete set null,
  error text,
  created_at timestamptz not null default now()
);
create unique index telegram_uploads_album_prompt on public.telegram_uploads (chat_id, media_group_id) where prompt and media_group_id is not null;
create index telegram_uploads_chat_idx on public.telegram_uploads (chat_id, status);

alter table public.telegram_link_codes enable row level security;
alter table public.telegram_links enable row level security;
alter table public.telegram_uploads enable row level security;

-- A portal user sees their own linked chats; staff who manage the client see its links.
create policy telegram_links_read on public.telegram_links for select to authenticated
  using (user_id = auth.uid() or private.can_manage_client(client_id));
create policy telegram_links_delete on public.telegram_links for delete to authenticated
  using (user_id = auth.uid() or private.can_manage_client(client_id));

/** Portal user: a one-time code to link a Telegram chat to this client. */
create or replace function public.telegram_link_code(p_client uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare
  c text := replace(gen_random_uuid()::text, '-', '');
begin
  if not private.is_client_user(p_client) then
    raise exception 'You cannot do this for this client' using errcode = '42501';
  end if;
  if not exists (select 1 from public.clients where id = p_client and telegram_enabled) then
    raise exception 'Telegram uploads are not on for this client' using errcode = '42501';
  end if;
  delete from public.telegram_link_codes where user_id = auth.uid() and (used_at is not null or expires_at < now());
  insert into public.telegram_link_codes (code, user_id, client_id) values (c, auth.uid(), p_client);
  return c;
end;
$$;

/** Bot (service role): link a chat with a code. Returns the client's name. */
create or replace function public.telegram_link_chat(p_code text, p_chat bigint, p_username text) returns text
language plpgsql security definer set search_path = '' as $$
declare
  k public.telegram_link_codes;
  name text;
begin
  select * into k from public.telegram_link_codes where code = p_code for update;
  if k.code is null or k.used_at is not null or k.expires_at < now() then
    raise exception 'This link has expired. Open a new one from the Upload page of the portal.' using errcode = 'P0002';
  end if;
  select c.name into name from public.clients c
  where c.id = k.client_id and c.telegram_enabled
    and exists (select 1 from public.client_users cu where cu.client_id = c.id and cu.user_id = k.user_id);
  if name is null then
    raise exception 'Telegram uploads are not on for this account.' using errcode = '42501';
  end if;
  update public.telegram_link_codes set used_at = now() where code = k.code;
  insert into public.telegram_links (chat_id, user_id, client_id, username)
  values (p_chat, k.user_id, k.client_id, p_username)
  on conflict (chat_id) do update set user_id = excluded.user_id, client_id = excluded.client_id,
    username = excluded.username, linked_at = now();
  return name;
end;
$$;

/**
 * Bot (service role): file a Telegram upload as a document, once its file is in
 * storage at p_path (<client>/<p_id>/<name>). Same placement as register_document(),
 * but the document arrives Received, uploaded by the linked portal user.
 */
create or replace function public.telegram_file_document(
  p_upload uuid,
  p_id uuid,
  p_doc_type text,
  p_month date,
  p_path text
) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  u public.telegram_uploads;
  c public.clients;
  d public.documents;
  today date := private.manila_today();
  m date := date_trunc('month', p_month)::date;
  placed record;
begin
  select * into u from public.telegram_uploads where id = p_upload for update;
  if u.id is null then raise exception 'Upload not found' using errcode = 'P0002'; end if;
  if u.document_id is not null then
    select * into d from public.documents where id = u.document_id;
    return d;
  end if;
  select * into c from public.clients where id = u.client_id;
  if not c.telegram_enabled or not exists (select 1 from public.client_users cu where cu.client_id = c.id and cu.user_id = u.user_id) then
    raise exception 'Telegram uploads are not on for this account.' using errcode = '42501';
  end if;
  if p_doc_type not in ('sales_invoice', 'purchase_receipt', 'bir_2307_received', 'bir_2307_issued', 'payroll', 'cor', 'other') then
    raise exception 'Unknown document type' using errcode = '22023';
  end if;
  if m > date_trunc('month', today)::date then
    raise exception 'Choose this month or an earlier one' using errcode = '22023';
  end if;
  if split_part(p_path, '/', 1) <> c.id::text or split_part(p_path, '/', 2) <> p_id::text then
    raise exception 'Wrong storage path' using errcode = '22023';
  end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'documents' and o.name = p_path) then
    raise exception 'The file has not arrived yet' using errcode = '22023';
  end if;

  placed := private.document_period(m, today, c.submission_cutoff_day, c.fiscal_year_end_month);

  insert into public.documents (id, client_id, uploaded_by, source, doc_type, period, document_month, late, prior_year,
                                file_name, mime_type, size_bytes, storage_path, status)
  values (p_id, c.id, u.user_id, 'telegram', p_doc_type, placed.period, m, placed.late, placed.prior_year,
          u.file_name, u.mime_type, u.size_bytes, p_path, 'received')
  returning * into d;
  update public.telegram_uploads set status = 'filed', document_id = d.id, error = null where id = u.id;
  return d;
end;
$$;

revoke execute on function public.telegram_link_code(uuid) from public, anon;
revoke execute on function public.telegram_link_chat(text, bigint, text) from public, anon, authenticated;
revoke execute on function public.telegram_file_document(uuid, uuid, text, date, text) from public, anon, authenticated;
grant execute on function public.telegram_link_code(uuid) to authenticated;
grant execute on function public.telegram_link_chat(text, bigint, text) to service_role;
grant execute on function public.telegram_file_document(uuid, uuid, text, date, text) to service_role;

-- The bot also sends a client's notifications to their linked chat (as it emails them):
-- set once the Telegram message is sent, so an email retry never sends it twice.
alter table public.notifications add column telegram_sent_at timestamptz;
