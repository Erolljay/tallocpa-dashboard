-- BIR Form 2316 (Certificate of Compensation Payment / Tax Withheld, September
-- 2021 ENCS), printed from the payroll (src/components/bir/form-2316.tsx):
--   * an MWE's statutory minimum wage per month (item 10; item 9 is mwe_daily_rate);
--   * an employee's previous employer within the year (Part III, items 16–18, and
--     the amounts that enter items 22 and 25B and the alphalist's previous-employer
--     columns);
--   * per client, the employer's ZIP code (item 14A) and the authorized
--     representative who signs the certificates (items 53 and 55);
--   * per client and year, when staff released the year's 2316s to the client's
--     portal users, who then print them from the portal through payroll_2316_data().
-- Who may change these: the Owner and staff assigned to the client (as for payroll).

-- ---------------------------------------------------------------------------
-- Item 10: statutory minimum wage rate per month (MWE).
-- ---------------------------------------------------------------------------
alter table public.employees
  add column mwe_monthly_rate numeric(18,2) check (mwe_monthly_rate > 0);

-- ---------------------------------------------------------------------------
-- Part III: the employee's previous employer within the year (one per employee-year).
-- ---------------------------------------------------------------------------
create table public.employee_prior_employers (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  employee_id uuid not null,
  year smallint not null check (year between 2000 and 2100),
  -- Item 16, with the branch code when known.
  tin text check (tin is null or tin ~ '^\d{3}-\d{3}-\d{3}(-\d{3,5})?$'),
  -- Item 17.
  name text not null check (btrim(name) <> ''),
  -- Items 18 and 18A.
  address text,
  zip_code text check (zip_code is null or zip_code ~ '^\d{4}$'),
  -- From the previous employer's 2316: its items 21 (taxable), 20 (non-taxable) and 25A/26 (tax withheld).
  taxable_compensation numeric(18,2) not null default 0 check (taxable_compensation >= 0),
  non_taxable_compensation numeric(18,2) not null default 0 check (non_taxable_compensation >= 0),
  tax_withheld numeric(18,2) not null default 0 check (tax_withheld >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (employee_id, client_id) references public.employees (id, client_id) on delete restrict,
  unique (employee_id, year)
);

create index employee_prior_employers_client_year_idx on public.employee_prior_employers (client_id, year);

-- ---------------------------------------------------------------------------
-- Per-client payroll settings printed on the 2316.
-- ---------------------------------------------------------------------------
create table public.payroll_settings (
  -- For the audit log's row key.
  id uuid not null default gen_random_uuid() unique,
  client_id uuid primary key references public.clients (id) on delete restrict,
  -- Item 14A (the clients table has the registered address but no ZIP code).
  employer_zip_code text check (employer_zip_code is null or employer_zip_code ~ '^\d{4}$'),
  -- Items 53 and 55: present employer / authorized agent, signature over printed name.
  signatory_name text check (signatory_name is null or btrim(signatory_name) <> ''),
  signatory_title text check (signatory_title is null or btrim(signatory_title) <> ''),
  updated_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- A year's 2316s released to the client's portal users. Deleting the row withdraws them.
-- ---------------------------------------------------------------------------
create table public.payroll_2316_releases (
  id uuid not null default gen_random_uuid() unique,
  client_id uuid not null references public.clients (id) on delete restrict,
  year smallint not null check (year between 2000 and 2100),
  released_at timestamptz not null default now(),
  released_by uuid not null default auth.uid() references auth.users (id),
  primary key (client_id, year)
);

-- Who released and when are set by the database, not by the caller.
create or replace function private.payroll_2316_release_defaults() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  new.released_at := now();
  new.released_by := coalesce(auth.uid(), new.released_by);
  return new;
end;
$$;

create or replace function private.payroll_settings_defaults() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  new.updated_by := auth.uid();
  return new;
end;
$$;

create trigger release_defaults before insert on public.payroll_2316_releases
  for each row execute function private.payroll_2316_release_defaults();
create trigger settings_defaults before insert or update on public.payroll_settings
  for each row execute function private.payroll_settings_defaults();

create trigger audit after insert or update or delete on public.employee_prior_employers for each row execute function private.audit();
create trigger audit after insert or update or delete on public.payroll_settings for each row execute function private.audit();
create trigger audit after insert or update or delete on public.payroll_2316_releases for each row execute function private.audit();
create trigger touch_updated_at before update on public.employee_prior_employers for each row execute function private.touch_updated_at();
create trigger touch_updated_at before update on public.payroll_settings for each row execute function private.touch_updated_at();

alter table public.employee_prior_employers enable row level security;
alter table public.payroll_settings enable row level security;
alter table public.payroll_2316_releases enable row level security;

-- Same as employees: the Owner and assigned staff. A wrong entry may be deleted.
create policy employee_prior_employers_read on public.employee_prior_employers for select to authenticated using (private.can_payroll(client_id));
create policy employee_prior_employers_insert on public.employee_prior_employers for insert to authenticated with check (private.can_payroll(client_id));
create policy employee_prior_employers_update on public.employee_prior_employers for update to authenticated using (private.can_payroll(client_id)) with check (private.can_payroll(client_id));
create policy employee_prior_employers_delete on public.employee_prior_employers for delete to authenticated using (private.can_payroll(client_id));

create policy payroll_settings_read on public.payroll_settings for select to authenticated using (private.can_payroll(client_id));
create policy payroll_settings_insert on public.payroll_settings for insert to authenticated with check (private.can_payroll(client_id));
create policy payroll_settings_update on public.payroll_settings for update to authenticated using (private.can_payroll(client_id)) with check (private.can_payroll(client_id));

-- Client users see which of their years are released; staff release and withdraw.
create policy payroll_2316_releases_read on public.payroll_2316_releases for select to authenticated
  using (private.can_payroll(client_id) or private.is_client_user(client_id));
create policy payroll_2316_releases_insert on public.payroll_2316_releases for insert to authenticated with check (private.can_payroll(client_id));
create policy payroll_2316_releases_delete on public.payroll_2316_releases for delete to authenticated using (private.can_payroll(client_id));

-- ---------------------------------------------------------------------------
-- Everything a year's 2316s are computed from, for the Owner and assigned staff,
-- and for the client's own users once the year is released. Client users still
-- cannot read the payroll tables; the portal renders the certificates server-side
-- from this. Entries are shaped like the app's ENTRY_COLUMNS select (with
-- payroll_entry_lines embedded) so the same row mappers apply.
-- ---------------------------------------------------------------------------
create or replace function public.payroll_2316_data(p_client uuid, p_year int)
returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  result jsonb;
begin
  if not (
    private.can_payroll(p_client)
    or (private.is_client_user(p_client) and exists (select 1 from public.payroll_2316_releases r where r.client_id = p_client and r.year = p_year))
  ) then
    raise exception 'The BIR 2316s for % are not available.', p_year using errcode = '42501';
  end if;
  select jsonb_build_object(
    'client', (select jsonb_build_object('id', c.id, 'name', c.name, 'tin', c.tin, 'rdo_code', c.rdo_code, 'registered_address', c.registered_address)
               from public.clients c where c.id = p_client),
    'settings', (select jsonb_build_object('employer_zip_code', s.employer_zip_code, 'signatory_name', s.signatory_name, 'signatory_title', s.signatory_title)
                 from public.payroll_settings s where s.client_id = p_client),
    'release', (select jsonb_build_object('released_at', r.released_at) from public.payroll_2316_releases r where r.client_id = p_client and r.year = p_year),
    'employees', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', e.id, 'employee_no', e.employee_no, 'last_name', e.last_name, 'first_name', e.first_name, 'middle_name', e.middle_name,
        'tin', e.tin, 'tin_branch', e.tin_branch, 'birth_date', e.birth_date, 'address', e.address, 'zip_code', e.zip_code,
        'region', e.region, 'nationality', e.nationality, 'employment_status', e.employment_status, 'is_mwe', e.is_mwe,
        'mwe_daily_rate', e.mwe_daily_rate, 'mwe_monthly_rate', e.mwe_monthly_rate, 'hire_date', e.hire_date,
        'separation_date', e.separation_date, 'separation_reason', e.separation_reason, 'substituted_filing', e.substituted_filing,
        'active', e.active, 'needs_details', e.needs_details))
      from public.employees e where e.client_id = p_client), '[]'::jsonb),
    'items', coalesce((
      select jsonb_agg(jsonb_build_object('id', i.id, 'name', i.name, 'kind', i.kind, 'bir_category', i.bir_category, 'sort_order', i.sort_order, 'active', i.active))
      from public.payroll_items i where i.client_id = p_client), '[]'::jsonb),
    'entries', coalesce((
      select jsonb_agg(jsonb_build_object(
        'employee_id', pe.employee_id, 'pay_month', pe.pay_month, 'adjustment', pe.adjustment, 'note', pe.note,
        'payroll_entry_lines', coalesce((select jsonb_agg(jsonb_build_object('item_id', l.item_id, 'amount', l.amount))
                                         from public.payroll_entry_lines l where l.entry_id = pe.id), '[]'::jsonb)))
      from public.payroll_entries pe
      where pe.client_id = p_client and pe.pay_month >= make_date(p_year, 1, 1) and pe.pay_month <= make_date(p_year, 12, 1)), '[]'::jsonb),
    'prior_employers', coalesce((
      select jsonb_agg(jsonb_build_object(
        'employee_id', p.employee_id, 'year', p.year, 'tin', p.tin, 'name', p.name, 'address', p.address, 'zip_code', p.zip_code,
        'taxable_compensation', p.taxable_compensation, 'non_taxable_compensation', p.non_taxable_compensation, 'tax_withheld', p.tax_withheld))
      from public.employee_prior_employers p where p.client_id = p_client and p.year = p_year), '[]'::jsonb)
  ) into result;
  return result;
end;
$$;

revoke execute on function private.payroll_2316_release_defaults() from public, anon, authenticated;
revoke execute on function private.payroll_settings_defaults() from public, anon, authenticated;
revoke execute on function public.payroll_2316_data(uuid, int) from public, anon;
grant execute on function public.payroll_2316_data(uuid, int) to authenticated;
