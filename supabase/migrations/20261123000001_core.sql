-- TalloCPA OS — Phase 1A core schema.
-- Spec: docs/SPEC.md §3.1–3.3, §3.14, §5. Decisions: Q13, Q17, Q20, Q21, Q23, Q28, Q60.
--
-- Access is enforced here with row-level security (RLS), not only in the app:
--   * Owner sees everything.
--   * Staff and Reviewers see only clients they are assigned to.
--   * Client users see only their own client.
-- Helper functions live in the `private` schema, which the API does not expose.

create schema if not exists private;

-- ---------------------------------------------------------------------------
-- Brands (Q60): brand and legal entity are settings, not code.
-- ---------------------------------------------------------------------------
create table public.brands (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[A-Z]{2,6}$'),
  display_name text not null,
  legal_name text not null,
  tin text,
  rdo_code text,
  -- Q53/Q55: tax on the firm's own fee. Switches to 'vat_12' once registered for VAT.
  tax_on_fee text not null default 'percentage_tax_3' check (tax_on_fee in ('percentage_tax_3', 'vat_12')),
  -- Q55: warn the Owner when year-to-date gross receipts reach this amount.
  gross_receipts_warning numeric(18, 2) not null default 2500000,
  portal_domain text,
  email_from text,
  logo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.brand_payment_accounts (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands (id),
  kind text not null check (kind in ('bank', 'ewallet')),
  institution text not null,
  account_name text not null,
  account_number text not null,
  -- Q26: client tax money should go to a separate account.
  purpose text not null default 'fees' check (purpose in ('fees', 'client_tax_funds')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Service lines (Q17): every engagement belongs to one.
-- ---------------------------------------------------------------------------
create table public.service_lines (
  code text primary key,
  name text not null,
  available boolean not null default false,
  sort_order smallint not null default 0
);

insert into public.service_lines (code, name, available, sort_order) values
  ('tax_compliance', 'Tax Compliance', true, 1),
  ('bookkeeping', 'Bookkeeping', true, 2),
  ('business_processing', 'Business Processing', false, 3),
  ('fs_audit', 'Financial Statement Audit', false, 4),
  ('aup', 'Agreed-Upon Procedures', false, 5),
  ('ai_automation', 'AI & Business Automation', false, 6),
  ('systems_implementation', 'Systems Implementation', false, 7),
  ('receivership_liquidation', 'Receivership & Liquidation', false, 8);

-- ---------------------------------------------------------------------------
-- Staff (Q21). Users come from Supabase Auth (auth.users).
-- ---------------------------------------------------------------------------
create table public.staff_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  brand_id uuid not null references public.brands (id),
  full_name text not null,
  role text not null check (role in ('owner', 'reviewer', 'staff')),
  -- Q39/Q51: load points = monthly retainer ÷ ₱1,000. Default target = ₱20,000 cost × 3 ÷ ₱1,000.
  capacity_points numeric(8, 2) not null default 60,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Q58: an acting approver while the Owner is away, with a peso limit.
create table public.acting_approver_delegations (
  id uuid primary key default gen_random_uuid(),
  delegate_user_id uuid not null references public.staff_profiles (user_id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  max_tax_due numeric(18, 2) not null check (max_tax_due >= 0),
  reason text not null,
  created_by uuid not null references auth.users (id),
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

-- ---------------------------------------------------------------------------
-- Clients (spec §3.2).
-- ---------------------------------------------------------------------------
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands (id),
  code text not null unique,
  name text not null,
  taxpayer_type text not null check (taxpayer_type in ('individual', 'opc', 'partnership', 'corporation', 'non_stock')),
  tin text check (tin is null or tin ~ '^\d{3}-\d{3}-\d{3}(-\d{3,5})?$'),
  rdo_code text,
  registered_address text,
  fiscal_year_end_month smallint not null default 12 check (fiscal_year_end_month between 1 and 12),
  filing_channel text not null default 'ebirforms' check (filing_channel in ('efps', 'ebirforms')),
  efps_group text check (efps_group in ('A', 'B', 'C', 'D', 'E')),
  book_type text not null default 'manual' check (book_type in ('manual', 'loose_leaf')),
  -- Q23: who pays BIR.
  payment_mode text not null default 'client_pays_direct' check (payment_mode in ('firm_remits', 'client_pays_direct')),
  -- Q28: documents for a month are due on this day of the following month.
  submission_cutoff_day smallint not null default 5 check (submission_cutoff_day between 1 and 28),
  status text not null default 'active' check (status in ('onboarding', 'active', 'inactive', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((filing_channel = 'efps') = (efps_group is not null))
);

-- COR (Form 2303) data, kept as registered.
create table public.client_registrations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  cor_file_path text,
  registration_date date,
  tax_types jsonb not null default '[]'::jsonb,
  extracted jsonb,
  verified_by uuid references auth.users (id),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.client_users (
  user_id uuid not null references auth.users (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  full_name text not null,
  position text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (user_id, client_id)
);

create table public.staff_assignments (
  client_id uuid not null references public.clients (id) on delete cascade,
  user_id uuid not null references public.staff_profiles (user_id),
  role text not null check (role in ('preparer', 'reviewer')),
  created_at timestamptz not null default now(),
  primary key (client_id, user_id, role)
);

-- ---------------------------------------------------------------------------
-- Engagements (Q17): minimal record in Phase 1.
-- ---------------------------------------------------------------------------
create table public.engagements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  service_line text not null references public.service_lines (code),
  monthly_retainer numeric(18, 2) not null default 0 check (monthly_retainer >= 0),
  start_date date not null,
  end_date date,
  status text not null default 'active' check (status in ('active', 'ended')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or end_date >= start_date)
);

create table public.engagement_services (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references public.engagements (id) on delete cascade,
  fee_item_code text not null,
  description text not null,
  monthly_fee numeric(18, 2) not null default 0 check (monthly_fee >= 0),
  annual_fee numeric(18, 2) not null default 0 check (annual_fee >= 0),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Deadline engine data (Q20). Mirrors src/lib/deadlines/engine.ts.
-- ---------------------------------------------------------------------------
create table public.deadline_rules (
  id text primary key,
  form text not null,
  frequency text not null check (frequency in ('monthly', 'quarterly', 'annual')),
  period_filter text not null default 'all' check (period_filter in ('all', 'exclude_quarter_end_months', 'exclude_last_quarter')),
  due jsonb not null check (
    (due ->> 'kind' = 'day_of_month_after' and (due ? 'monthsAfter') and (due ? 'day'))
    or (due ->> 'kind' = 'days_after' and (due ? 'days'))
  ),
  channel text check (channel in ('efps', 'ebirforms')),
  efps_group text check (efps_group in ('A', 'B', 'C', 'D', 'E')),
  effective_from date not null,
  effective_to date,
  -- BIR issuance, e.g. 'RR 8-2024'. 'UNVERIFIED' until a person checks it (open item O3).
  source text not null default 'UNVERIFIED',
  verified_by uuid references auth.users (id),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (effective_to is null or effective_to >= effective_from),
  check (efps_group is null or channel = 'efps')
);

create table public.holidays (
  date date primary key,
  name text not null,
  kind text not null check (kind in ('regular', 'special', 'suspension')),
  source text,
  created_at timestamptz not null default now()
);

create table public.obligations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  form text not null,
  frequency text not null check (frequency in ('monthly', 'quarterly', 'annual')),
  start_date date not null,
  end_date date,
  created_from text not null default 'manual' check (created_from in ('cor', 'manual', 'moxie_import')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or end_date >= start_date),
  unique (client_id, form, start_date)
);

-- Q21/Q57: the sign-off chain. Only the server changes status (later migration adds the transition function).
create table public.filing_instances (
  id uuid primary key default gen_random_uuid(),
  obligation_id uuid not null references public.obligations (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  form text not null,
  period_label text not null,
  period_start date not null,
  period_end date not null,
  rule_id text not null references public.deadline_rules (id),
  statutory_due_date date not null,
  due_date date not null,
  status text not null default 'not_started' check (status in (
    'not_started', 'prepared', 'reviewed', 'client_approved', 'owner_approved', 'filed', 'paid', 'proof_uploaded'
  )),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (obligation_id, period_end)
);

create index filing_instances_due_idx on public.filing_instances (due_date, status);
create index filing_instances_client_idx on public.filing_instances (client_id, due_date);

create table public.filing_events (
  id bigint generated always as identity primary key,
  filing_instance_id uuid not null references public.filing_instances (id) on delete cascade,
  from_status text,
  to_status text not null,
  actor uuid references auth.users (id),
  note text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Audit log (Q21, spec §3.14): who changed what. Append-only.
-- ---------------------------------------------------------------------------
create table public.audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor uuid,
  table_name text not null,
  row_pk text,
  action text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  old_row jsonb,
  new_row jsonb
);

create or replace function private.audit() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  rec jsonb := case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end;
begin
  insert into public.audit_log (actor, table_name, row_pk, action, old_row, new_row)
  values (
    auth.uid(),
    tg_table_name,
    coalesce(rec ->> 'id', rec ->> 'user_id', rec ->> 'code', rec ->> 'date'),
    tg_op,
    case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) end,
    case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) end
  );
  return null;
end;
$$;

create or replace function private.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'brands', 'brand_payment_accounts', 'staff_profiles', 'acting_approver_delegations', 'clients',
    'client_registrations', 'client_users', 'staff_assignments', 'engagements', 'engagement_services',
    'deadline_rules', 'holidays', 'obligations', 'filing_instances'
  ] loop
    execute format('create trigger audit after insert or update or delete on public.%I for each row execute function private.audit()', t);
  end loop;
  foreach t in array array['brands', 'staff_profiles', 'clients', 'engagements', 'deadline_rules', 'obligations', 'filing_instances'] loop
    execute format('create trigger touch_updated_at before update on public.%I for each row execute function private.touch_updated_at()', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Access helpers.
-- ---------------------------------------------------------------------------
create or replace function private.staff_role() returns text
language sql stable security definer set search_path = '' as $$
  select role from public.staff_profiles where user_id = auth.uid() and active
$$;

create or replace function private.is_owner() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce(private.staff_role() = 'owner', false)
$$;

create or replace function private.is_staff() returns boolean
language sql stable security definer set search_path = '' as $$
  select private.staff_role() is not null
$$;

create or replace function private.can_access_client(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_owner()
    or exists (
      select 1 from public.staff_assignments sa
      join public.staff_profiles sp on sp.user_id = sa.user_id and sp.active
      where sa.client_id = target and sa.user_id = auth.uid()
    )
    or exists (select 1 from public.client_users cu where cu.client_id = target and cu.user_id = auth.uid())
$$;

create or replace function private.can_manage_client(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_owner()
    or exists (
      select 1 from public.staff_assignments sa
      join public.staff_profiles sp on sp.user_id = sa.user_id and sp.active and sp.role = 'reviewer'
      where sa.client_id = target and sa.user_id = auth.uid()
    )
$$;

revoke all on schema private from public;
grant usage on schema private to authenticated;
grant execute on all functions in schema private to authenticated;

-- ---------------------------------------------------------------------------
-- Row-level security.
-- ---------------------------------------------------------------------------
alter table public.brands enable row level security;
alter table public.brand_payment_accounts enable row level security;
alter table public.service_lines enable row level security;
alter table public.staff_profiles enable row level security;
alter table public.acting_approver_delegations enable row level security;
alter table public.clients enable row level security;
alter table public.client_registrations enable row level security;
alter table public.client_users enable row level security;
alter table public.staff_assignments enable row level security;
alter table public.engagements enable row level security;
alter table public.engagement_services enable row level security;
alter table public.deadline_rules enable row level security;
alter table public.holidays enable row level security;
alter table public.obligations enable row level security;
alter table public.filing_instances enable row level security;
alter table public.filing_events enable row level security;
alter table public.audit_log enable row level security;

-- Brands: everyone signed in reads the brand (the portal shows its name and payment details); Owner edits.
create policy brands_read on public.brands for select to authenticated using (true);
create policy brands_owner on public.brands for all to authenticated using (private.is_owner()) with check (private.is_owner());
create policy payment_accounts_read on public.brand_payment_accounts for select to authenticated using (active or private.is_owner());
create policy payment_accounts_owner on public.brand_payment_accounts for all to authenticated using (private.is_owner()) with check (private.is_owner());

create policy service_lines_read on public.service_lines for select to authenticated using (true);
create policy service_lines_owner on public.service_lines for all to authenticated using (private.is_owner()) with check (private.is_owner());

-- Staff see their colleagues; client users see none. Owner manages staff.
create policy staff_read on public.staff_profiles for select to authenticated using (private.is_staff());
create policy staff_owner on public.staff_profiles for all to authenticated using (private.is_owner()) with check (private.is_owner());
create policy delegations_read on public.acting_approver_delegations for select to authenticated using (private.is_staff());
create policy delegations_owner on public.acting_approver_delegations for all to authenticated using (private.is_owner()) with check (private.is_owner());

-- Clients: visible to Owner, assigned staff and the client's own users. Owner creates; Owner or assigned Reviewer edits.
create policy clients_read on public.clients for select to authenticated using (private.can_access_client(id));
create policy clients_insert on public.clients for insert to authenticated with check (private.is_owner());
create policy clients_update on public.clients for update to authenticated using (private.can_manage_client(id)) with check (private.can_manage_client(id));
create policy clients_delete on public.clients for delete to authenticated using (private.is_owner());

create policy registrations_read on public.client_registrations for select to authenticated using (private.can_access_client(client_id));
create policy registrations_write on public.client_registrations for all to authenticated using (private.can_manage_client(client_id)) with check (private.can_manage_client(client_id));

create policy client_users_read on public.client_users for select to authenticated using (user_id = auth.uid() or (private.is_staff() and private.can_access_client(client_id)));
create policy client_users_owner on public.client_users for all to authenticated using (private.is_owner()) with check (private.is_owner());

create policy assignments_read on public.staff_assignments for select to authenticated using (private.is_staff());
create policy assignments_owner on public.staff_assignments for all to authenticated using (private.is_owner()) with check (private.is_owner());

create policy engagements_read on public.engagements for select to authenticated using (private.can_access_client(client_id));
create policy engagements_owner on public.engagements for all to authenticated using (private.is_owner()) with check (private.is_owner());
create policy engagement_services_read on public.engagement_services for select to authenticated using (
  exists (select 1 from public.engagements e where e.id = engagement_id and private.can_access_client(e.client_id))
);
create policy engagement_services_owner on public.engagement_services for all to authenticated using (private.is_owner()) with check (private.is_owner());

-- Rules and holidays: staff read, Owner edits (Q20).
create policy rules_read on public.deadline_rules for select to authenticated using (private.is_staff());
create policy rules_owner on public.deadline_rules for all to authenticated using (private.is_owner()) with check (private.is_owner());
create policy holidays_read on public.holidays for select to authenticated using (true);
create policy holidays_owner on public.holidays for all to authenticated using (private.is_owner()) with check (private.is_owner());

create policy obligations_read on public.obligations for select to authenticated using (private.can_access_client(client_id));
create policy obligations_write on public.obligations for all to authenticated using (private.can_manage_client(client_id)) with check (private.can_manage_client(client_id));

-- Filing instances and events: read only through the API; the generator and the
-- sign-off function (service role / security definer) write them.
create policy filings_read on public.filing_instances for select to authenticated using (private.can_access_client(client_id));
create policy filing_events_read on public.filing_events for select to authenticated using (
  exists (select 1 from public.filing_instances f where f.id = filing_instance_id and private.can_access_client(f.client_id))
);

create policy audit_owner on public.audit_log for select to authenticated using (private.is_owner());
