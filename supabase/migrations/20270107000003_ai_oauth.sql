-- AI employees, step 2b: OAuth sign-in for Claude connectors (docs/AI-WORKFORCE.md §5,
-- §7; docs/SETUP.md). Claude's custom connectors (claude.ai, desktop, Cowork) sign in
-- with OAuth 2.1: the app registers the connector (dynamic client registration), the
-- Owner approves it on a consent page for ONE AI employee, and the connector gets a
-- short-lived access token plus a refresh token.
--
-- An access token is an ordinary AI employee key (ai_credentials, source 'oauth'), so
-- the connector checks it exactly as in step 2: a live key of the AI employee in the
-- address, switched on. Revoking the connection (the grant) revokes its tokens.
--
-- Codes and refresh tokens are stored as SHA-256 hashes, like keys. The Owner approves
-- (writes codes) and revokes; the token endpoint (server, no session) does the rest.

create table public.oauth_clients (
  client_id text primary key check (client_id ~ '^tcoc_[A-Za-z0-9_-]{22}$'),
  client_name text not null default '' check (length(client_name) <= 120),
  redirect_uris text[] not null check (cardinality(redirect_uris) between 1 and 10),
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

create table public.oauth_codes (
  code_hash text primary key check (code_hash ~ '^[0-9a-f]{64}$'),
  client_id text not null references public.oauth_clients (client_id) on delete cascade,
  ai_user_id uuid not null references public.ai_employees (user_id) on delete cascade,
  redirect_uri text not null,
  code_challenge text not null check (code_challenge ~ '^[A-Za-z0-9_-]{43}$'),
  resource text not null,
  approved_by uuid not null references auth.users (id),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz,
  check (expires_at > created_at)
);

create table public.oauth_grants (
  id uuid primary key default gen_random_uuid(),
  client_id text not null references public.oauth_clients (client_id) on delete cascade,
  ai_user_id uuid not null references public.ai_employees (user_id) on delete cascade,
  approved_by uuid not null references auth.users (id),
  -- The current refresh token's hash; it changes every time it is used.
  refresh_hash text not null unique check (refresh_hash ~ '^[0-9a-f]{64}$'),
  refresh_expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  revoked_at timestamptz,
  revoked_by uuid references auth.users (id)
);

create index oauth_grants_ai on public.oauth_grants (ai_user_id);
create trigger audit after insert or update or delete on public.oauth_grants for each row execute function private.audit();

alter table public.ai_credentials
  add column source text not null default 'key' check (source in ('key', 'oauth')),
  add column oauth_grant_id uuid references public.oauth_grants (id) on delete cascade,
  add constraint ai_credentials_oauth_grant check ((source = 'oauth') = (oauth_grant_id is not null));

create index ai_credentials_grant on public.ai_credentials (oauth_grant_id) where oauth_grant_id is not null;

alter table public.oauth_clients enable row level security;
alter table public.oauth_codes enable row level security;
alter table public.oauth_grants enable row level security;

-- Registered apps: the Owner sees and removes them; the server registers them.
create policy oauth_clients_owner_read on public.oauth_clients for select to authenticated using (private.is_owner());
create policy oauth_clients_owner_delete on public.oauth_clients for delete to authenticated using (private.is_owner());

-- Codes: only the Owner issues them (on the consent page); the server redeems them.
create policy oauth_codes_owner_insert on public.oauth_codes for insert to authenticated
  with check (private.is_owner() and approved_by = auth.uid());

-- Connections: the Owner sees and revokes them; the server creates and rotates them.
create policy oauth_grants_owner_read on public.oauth_grants for select to authenticated using (private.is_owner());
create policy oauth_grants_owner_revoke on public.oauth_grants for update to authenticated
  using (private.is_owner()) with check (private.is_owner());

-- Revoking a connection revokes every token it issued.
create or replace function private.oauth_grant_revoked() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.revoked_at is not null and old.revoked_at is null then
    update public.ai_credentials set revoked_at = new.revoked_at, revoked_by = new.revoked_by
    where oauth_grant_id = new.id and revoked_at is null;
  end if;
  return new;
end;
$$;

create trigger oauth_grant_revoked after update of revoked_at on public.oauth_grants
  for each row execute function private.oauth_grant_revoked();

-- A revoked connection stays revoked.
create or replace function private.oauth_grant_stays_revoked() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if old.revoked_at is not null and new.revoked_at is distinct from old.revoked_at then
    raise exception 'A revoked connection cannot be restored; connect again' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger oauth_grant_stays_revoked before update on public.oauth_grants
  for each row execute function private.oauth_grant_stays_revoked();
