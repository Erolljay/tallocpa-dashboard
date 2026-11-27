-- AI employees, step 1: the foundation (docs/AI-WORKFORCE.md §5, §6, §9, §10; Q75–Q80).
--
-- An AI employee is NOT a member of staff. It has a login (auth.users) but no
-- staff_profiles row and no client_users row, so every existing check refuses it:
-- private.staff_role(), is_staff(), is_owner(), is_assigned(), can_access_client(),
-- can_keep_books(), can_payroll(), can_upload() and every function and policy built
-- on them. It cannot prepare, review, approve, post, reverse, lock, release, file,
-- pay or remit anything, now or in any feature added later, unless a migration
-- grants it on purpose.
--
-- What this migration grants on purpose, read-only and only while the AI employee is
-- switched on:
--   * its own record, assignments and tool grants;
--   * the client records it is assigned (or every client of its brand when the Owner
--     ticks "all clients"), unless it is barred from client data (marketing);
--   * the books of those clients when its books access is Full. Summary is served
--     later through summary functions, never the entry tables; None reads nothing.
--
-- The Owner manages everything here. Activity is written by the server (service
-- role) when a tool runs and read by the Owner. Credentials are stored as a SHA-256
-- hash; the key itself is shown to the Owner once and never stored.

-- ── AI employees ─────────────────────────────────────────────

create table public.ai_employees (
  user_id uuid primary key references auth.users (id) on delete cascade,
  brand_id uuid not null references public.brands (id),
  -- Stable name in code and tools, e.g. 'document_clerk' (src/lib/ai/workforce.ts).
  key text not null check (key ~ '^[a-z][a-z0-9_]{1,40}$'),
  name text not null check (length(trim(name)) between 1 and 80),
  department text not null check (department in ('managing_partner', 'client_services', 'compliance', 'registration', 'collections', 'marketing')),
  job text not null default '' check (length(job) <= 600),
  -- The staff member it answers to; null means the Owner.
  supervisor_user_id uuid references public.staff_profiles (user_id),
  runs_on text not null check (runs_on in ('cowork', 'app', 'both')),
  -- Every AI employee starts switched off.
  enabled boolean not null default false,
  books_level text not null default 'none' check (books_level in ('none', 'summary', 'full')),
  all_clients boolean not null default false,
  -- False for marketing: never sees a client record or the books.
  client_data boolean not null default true,
  daily_limit integer not null default 500 check (daily_limit between 0 and 100000),
  -- Monthly spending cap in pesos for AI employees that call a paid API (runs_on app or both). 0 = nothing may be spent.
  monthly_cap numeric(12, 2) not null default 0 check (monthly_cap >= 0),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brand_id, key),
  check (client_data or (books_level = 'none' and not all_clients))
);

create trigger touch_updated_at before update on public.ai_employees for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.ai_employees for each row execute function private.audit();

-- A login is either a person (staff or client contact) or an AI employee, never both.
create or replace function private.ai_login_is_not_a_person() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from public.staff_profiles where user_id = new.user_id)
     or exists (select 1 from public.client_users where user_id = new.user_id) then
    raise exception 'This login belongs to a person; an AI employee needs its own login' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger ai_login_is_not_a_person before insert or update of user_id on public.ai_employees
  for each row execute function private.ai_login_is_not_a_person();

create or replace function private.person_login_is_not_ai() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from public.ai_employees where user_id = new.user_id) then
    raise exception 'This login belongs to an AI employee; it cannot be staff or a client contact' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger person_login_is_not_ai before insert or update of user_id on public.staff_profiles
  for each row execute function private.person_login_is_not_ai();
create trigger person_login_is_not_ai before insert or update of user_id on public.client_users
  for each row execute function private.person_login_is_not_ai();

-- ── Assigned clients ─────────────────────────────────────────

create table public.ai_assignments (
  ai_user_id uuid not null references public.ai_employees (user_id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  primary key (ai_user_id, client_id)
);

create index ai_assignments_client on public.ai_assignments (client_id);
create trigger audit after insert or update or delete on public.ai_assignments for each row execute function private.audit();

-- Marketing (client_data = false) is never assigned a client, and an AI employee only
-- works for clients of its own brand.
create or replace function private.ai_assignment_allowed() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if not exists (
    select 1 from public.ai_employees e join public.clients c on c.brand_id = e.brand_id
    where e.user_id = new.ai_user_id and c.id = new.client_id and e.client_data
  ) then
    raise exception 'This AI employee may not work on client records' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger ai_assignment_allowed before insert or update on public.ai_assignments
  for each row execute function private.ai_assignment_allowed();

-- ── Credentials ──────────────────────────────────────────────

create table public.ai_credentials (
  id uuid primary key default gen_random_uuid(),
  ai_user_id uuid not null references public.ai_employees (user_id) on delete cascade,
  label text not null default '' check (length(label) <= 80),
  -- SHA-256 of the key, hex. The key is shown once and never stored.
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  -- Last four characters, so the Owner can tell keys apart.
  token_hint text not null check (length(token_hint) = 4),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  revoked_by uuid references auth.users (id),
  last_used_at timestamptz,
  check (expires_at > created_at)
);

create index ai_credentials_ai on public.ai_credentials (ai_user_id);
create trigger audit after insert or update or delete on public.ai_credentials for each row execute function private.audit();

-- A key, once revoked, stays revoked; nothing about it changes but its last use.
create or replace function private.ai_credential_frozen() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.ai_user_id <> old.ai_user_id or new.token_hash <> old.token_hash or new.token_hint <> old.token_hint
     or new.created_at <> old.created_at or new.expires_at <> old.expires_at
     or (old.revoked_at is not null and new.revoked_at is distinct from old.revoked_at) then
    raise exception 'A key cannot be changed; revoke it and create a new one' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger ai_credential_frozen before update on public.ai_credentials
  for each row execute function private.ai_credential_frozen();

-- ── Tool grants ──────────────────────────────────────────────

-- Which connector tools an AI employee may use (step 2 registers the tools). New
-- tools start ungranted.
create table public.ai_tool_grants (
  ai_user_id uuid not null references public.ai_employees (user_id) on delete cascade,
  tool text not null check (tool ~ '^[a-z][a-z0-9_.]{1,80}$'),
  granted_by uuid references auth.users (id),
  granted_at timestamptz not null default now(),
  primary key (ai_user_id, tool)
);

create trigger audit after insert or update or delete on public.ai_tool_grants for each row execute function private.audit();

-- ── Activity ─────────────────────────────────────────────────

-- One row per tool call, written by the server (service role). acting_user_id is the
-- person whose shared connection made the call, when the connector cannot sign in as
-- the AI employee itself (docs/AI-WORKFORCE.md §5, A1).
create table public.ai_activity (
  id bigint generated always as identity primary key,
  ai_user_id uuid not null references public.ai_employees (user_id) on delete cascade,
  acting_user_id uuid references auth.users (id),
  tool text not null,
  client_id uuid references public.clients (id) on delete set null,
  outcome text not null check (outcome in ('ok', 'refused', 'error')),
  detail jsonb not null default '{}'::jsonb check (jsonb_typeof(detail) = 'object'),
  -- Pesos spent on a paid API for this call.
  cost numeric(12, 4) not null default 0 check (cost >= 0),
  created_at timestamptz not null default now()
);

create index ai_activity_ai_time on public.ai_activity (ai_user_id, created_at desc);
create index ai_activity_time on public.ai_activity (created_at desc);
create index ai_activity_client on public.ai_activity (client_id) where client_id is not null;

-- ── What the calling AI employee may read ────────────────────

-- The clients the calling AI employee may read: none unless it is switched on and
-- allowed client data. Returns an empty array for anyone who is not an AI employee,
-- so the policies below cost staff one lookup per query, not per row.
create or replace function private.ai_client_ids() returns uuid[]
language sql stable security definer set search_path = '' as $$
  select coalesce(array_agg(c.id), '{}')
  from public.ai_employees e
  join public.clients c on c.brand_id = e.brand_id
  where e.user_id = auth.uid() and e.enabled and e.client_data
    and (e.all_clients or exists (select 1 from public.ai_assignments a where a.ai_user_id = e.user_id and a.client_id = c.id))
$$;

-- The clients whose books (entries, ledger, parties, invoices) the calling AI employee
-- may read: its clients, when its books access is Full.
create or replace function private.ai_full_books_client_ids() returns uuid[]
language sql stable security definer set search_path = '' as $$
  select case
    when exists (select 1 from public.ai_employees e where e.user_id = auth.uid() and e.enabled and e.books_level = 'full')
    then private.ai_client_ids()
    else '{}'::uuid[]
  end
$$;

-- The same answers for a given AI employee, for server code acting for it (step 2).
create or replace function private.ai_books_level(p_ai uuid, p_client uuid) returns text
language sql stable security definer set search_path = '' as $$
  select coalesce((
    select e.books_level
    from public.ai_employees e
    join public.clients c on c.id = p_client and c.brand_id = e.brand_id
    where e.user_id = p_ai and e.enabled and e.client_data
      and (e.all_clients or exists (select 1 from public.ai_assignments a where a.ai_user_id = e.user_id and a.client_id = c.id))
  ), 'none')
$$;

-- ── Row-level security ───────────────────────────────────────

alter table public.ai_employees enable row level security;
alter table public.ai_assignments enable row level security;
alter table public.ai_credentials enable row level security;
alter table public.ai_tool_grants enable row level security;
alter table public.ai_activity enable row level security;

create policy ai_employees_owner on public.ai_employees for all to authenticated
  using (private.is_owner()) with check (private.is_owner());
create policy ai_employees_self on public.ai_employees for select to authenticated
  using (user_id = auth.uid());

create policy ai_assignments_owner on public.ai_assignments for all to authenticated
  using (private.is_owner()) with check (private.is_owner());
create policy ai_assignments_self on public.ai_assignments for select to authenticated
  using (ai_user_id = auth.uid());

-- Keys: the Owner only. Not even the AI employee reads its own.
create policy ai_credentials_owner on public.ai_credentials for all to authenticated
  using (private.is_owner()) with check (private.is_owner());

create policy ai_tool_grants_owner on public.ai_tool_grants for all to authenticated
  using (private.is_owner()) with check (private.is_owner());
create policy ai_tool_grants_self on public.ai_tool_grants for select to authenticated
  using (ai_user_id = auth.uid());

-- Activity: written by the server only; the Owner reads it.
create policy ai_activity_owner_read on public.ai_activity for select to authenticated
  using (private.is_owner());

-- Assigned client records.
create policy ai_clients_read on public.clients for select to authenticated
  using (id = any ((select private.ai_client_ids())::uuid[]));

-- Books, at Full access. Read-only: there is no insert, update or delete policy for
-- AI employees, and the posting functions refuse them (they are not staff).
do $$
declare t text;
begin
  foreach t in array array[
    'client_books', 'ledger_accounts', 'journal_entries', 'journal_lines', 'client_party_accounts',
    'open_items', 'open_item_applications', 'arap_updates', 'book_invoices', 'book_invoice_lines',
    'book_settlements', 'book_settlement_allocations', 'books_month_locks'
  ] loop
    execute format(
      'create policy ai_books_read on public.%I for select to authenticated using (client_id = any ((select private.ai_full_books_client_ids())::uuid[]))',
      t
    );
  end loop;
end $$;

revoke all on function private.ai_client_ids() from public;
revoke all on function private.ai_full_books_client_ids() from public;
revoke all on function private.ai_books_level(uuid, uuid) from public;
grant execute on function private.ai_client_ids() to authenticated;
grant execute on function private.ai_full_books_client_ids() to authenticated;
grant execute on function private.ai_books_level(uuid, uuid) to service_role;
