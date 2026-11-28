-- Connected mailboxes (read only): the Gmail inboxes the app reads BIR mail and the banks'
-- payment confirmations from (src/lib/mailboxes, docs/SETUP.md).
--
-- Until now the app read only the eSubmission mailbox (and optionally one payment mailbox)
-- through refresh tokens set as environment variables. The Owner's BIR mail and payment
-- confirmations arrive in the Owner's own inbox and the shared support@ mailbox, so the
-- Owner now connects those in Settings → Mailboxes with Google's read-only Gmail scope
-- (gmail.readonly). The environment mailboxes stay as before.
--
--   * public.connected_mailboxes: which mailboxes are connected and what they are read
--     for. The Owner alone reads it. Nobody writes it directly: the OAuth callback (service
--     role) adds a mailbox, the Owner changes its purposes or removes it through the
--     functions below.
--   * private.connected_mailbox_tokens: the refresh tokens, encrypted by the app
--     (AES-256-GCM with GOOGLE_TOKEN_KEY, src/lib/google/crypto.ts, bound to the mailbox's
--     address) in the private schema. Only the server (service role) reads them.
--   * No AI employee reads any of it: no policy is opened to them.
--   * bir_mail and payment_mail record which mailbox a message came from and its RFC 822
--     Message-ID, so a message that reached two connected inboxes is kept once.

create table public.connected_mailboxes (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(btrim(email)) and email like '%@%'),
  for_bir_mail boolean not null default true,
  for_payment_mail boolean not null default true,
  connected_by uuid references auth.users (id),
  connected_at timestamptz not null default now(),
  last_checked_at timestamptz,
  last_error text check (length(last_error) <= 500),
  last_error_at timestamptz
);
create trigger audit after insert or update or delete on public.connected_mailboxes for each row execute function private.audit();
alter table public.connected_mailboxes enable row level security;
create policy connected_mailboxes_owner_read on public.connected_mailboxes for select to authenticated using (private.is_owner());
revoke insert, update, delete on public.connected_mailboxes from anon, authenticated;

create table private.connected_mailbox_tokens (
  mailbox_id uuid primary key references public.connected_mailboxes (id) on delete cascade,
  refresh_token text not null
);
revoke all on private.connected_mailbox_tokens from public, anon, authenticated;

-- Saves a mailbox after the OAuth callback (server only; the route checked the Owner).
create or replace function public.mailbox_save(p_email text, p_token text, p_by uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_id uuid;
begin
  insert into public.connected_mailboxes (email, connected_by) values (lower(btrim(p_email)), p_by)
  on conflict (email) do update set connected_by = excluded.connected_by, connected_at = now(), last_error = null, last_error_at = null
  returning id into v_id;
  insert into private.connected_mailbox_tokens (mailbox_id, refresh_token) values (v_id, p_token)
  on conflict (mailbox_id) do update set refresh_token = excluded.refresh_token;
  return v_id;
end;
$$;

-- The mailboxes read for a purpose ('bir_mail' or 'payment_mail'), with their encrypted tokens (server only).
create or replace function public.mailbox_tokens(p_purpose text)
returns table (id uuid, email text, refresh_token text)
language sql stable security definer set search_path = '' as $$
  select m.id, m.email, t.refresh_token
  from public.connected_mailboxes m join private.connected_mailbox_tokens t on t.mailbox_id = m.id
  where (p_purpose = 'bir_mail' and m.for_bir_mail) or (p_purpose = 'payment_mail' and m.for_payment_mail)
  order by m.connected_at
$$;

-- One mailbox's encrypted token, to revoke it at Google when the Owner disconnects (server only).
create or replace function public.mailbox_token(p_id uuid) returns table (email text, refresh_token text)
language sql stable security definer set search_path = '' as $$
  select m.email, t.refresh_token from public.connected_mailboxes m join private.connected_mailbox_tokens t on t.mailbox_id = m.id where m.id = p_id
$$;

-- Records a check of a mailbox: when, and Google's error if it refused (server only).
create or replace function public.mailbox_checked(p_id uuid, p_error text) returns void
language sql security definer set search_path = '' as $$
  update public.connected_mailboxes
  set last_checked_at = now(),
      last_error = nullif(left(coalesce(p_error, ''), 500), ''),
      last_error_at = case when coalesce(p_error, '') = '' then null else now() end
  where id = p_id
$$;

-- The Owner chooses what a mailbox is read for.
create or replace function public.mailbox_set_purposes(p_id uuid, p_bir_mail boolean, p_payment_mail boolean) returns public.connected_mailboxes
language plpgsql security definer set search_path = '' as $$
declare
  m public.connected_mailboxes;
begin
  if not private.is_owner() then raise exception 'Only the Owner manages connected mailboxes' using errcode = '42501'; end if;
  update public.connected_mailboxes set for_bir_mail = coalesce(p_bir_mail, false), for_payment_mail = coalesce(p_payment_mail, false)
  where id = p_id returning * into m;
  if m.id is null then raise exception 'No such mailbox' using errcode = 'P0002'; end if;
  return m;
end;
$$;

-- The Owner removes a mailbox (its token goes with it; the server revokes it at Google first).
create or replace function public.mailbox_remove(p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_owner() then raise exception 'Only the Owner manages connected mailboxes' using errcode = '42501'; end if;
  delete from public.connected_mailboxes where id = p_id;
  if not found then raise exception 'No such mailbox' using errcode = 'P0002'; end if;
end;
$$;

revoke execute on function public.mailbox_save(text, text, uuid) from public, anon, authenticated;
revoke execute on function public.mailbox_tokens(text) from public, anon, authenticated;
revoke execute on function public.mailbox_token(uuid) from public, anon, authenticated;
revoke execute on function public.mailbox_checked(uuid, text) from public, anon, authenticated;
revoke execute on function public.mailbox_set_purposes(uuid, boolean, boolean) from public, anon;
revoke execute on function public.mailbox_remove(uuid) from public, anon;
grant execute on function public.mailbox_save(text, text, uuid) to service_role;
grant execute on function public.mailbox_tokens(text) to service_role;
grant execute on function public.mailbox_token(uuid) to service_role;
grant execute on function public.mailbox_checked(uuid, text) to service_role;
grant execute on function public.mailbox_set_purposes(uuid, boolean, boolean) to authenticated;
grant execute on function public.mailbox_remove(uuid) to authenticated;

-- Where a stored message came from, and its Message-ID header (one copy per message).
alter table public.bir_mail add column mailbox text;
alter table public.bir_mail add column rfc822_message_id text check (length(rfc822_message_id) <= 500);
create unique index bir_mail_rfc822 on public.bir_mail (rfc822_message_id) where rfc822_message_id is not null;
alter table public.payment_mail add column rfc822_message_id text check (length(rfc822_message_id) <= 500);
create unique index payment_mail_rfc822 on public.payment_mail (rfc822_message_id) where rfc822_message_id is not null;
