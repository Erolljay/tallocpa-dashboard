-- Payroll (spec §3.7): each client's employees and their monthly pay, the source
-- of BIR Form 1601-C (monthly), 1604-C (annual) and the alphalist of employees
-- (Schedule 1: other than minimum wage earners; Schedule 2: MWEs).
--
-- Who may see and change payroll: the Owner and staff assigned to the client.
-- Client users never read payroll_entries; they send their payroll register
-- (the Excel template) from the portal as a payroll_submission, which assigned
-- staff review and post into payroll_entries, or return with a reason.
-- A month's entries are locked once that month's 1601-C is filed.
-- Amounts are numeric(18,2) pesos here; the app works in integer centavos.

-- ---------------------------------------------------------------------------
-- Employees.
-- ---------------------------------------------------------------------------
create table public.employees (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  employee_no text check (employee_no is null or btrim(employee_no) <> ''),
  last_name text not null check (btrim(last_name) <> ''),
  first_name text not null check (btrim(first_name) <> ''),
  middle_name text,
  tin text check (tin is null or tin ~ '^\d{3}-\d{3}-\d{3}$'),
  tin_branch text not null default '0000' check (tin_branch ~ '^\d{4,5}$'),
  birth_date date,
  address text,
  zip_code text,
  -- Region where the employee works (minimum wages are set per region; the alphalist DAT carries it).
  region text,
  nationality text not null default 'FILIPINO',
  -- BIR alphalist codes (taxify custom-fields.js EMPLOYEE_FIELDS): Regular, Casual, Contractual/Project-based,
  -- Seasonal, Probationary, Apprentice/Learner.
  employment_status text not null default 'R' check (employment_status in ('R', 'C', 'CP', 'S', 'P', 'AL')),
  -- Minimum wage earner: statutory minimum wage, holiday/overtime/night-shift/hazard pay are exempt.
  is_mwe boolean not null default false,
  mwe_daily_rate numeric(18,2) check (mwe_daily_rate > 0),
  hire_date date,
  separation_date date,
  -- T terminated/resigned, TR transferred, R retired, D death (NA on the alphalist when not separated).
  separation_reason text check (separation_reason in ('T', 'TR', 'R', 'D')),
  -- Qualified for substituted filing (the 2316 stands as the employee's ITR).
  substituted_filing boolean not null default true,
  active boolean not null default true,
  -- Added from an uploaded register without full details: staff should complete the record.
  needs_details boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (not is_mwe or (region is not null and mwe_daily_rate is not null)),
  check ((separation_date is null) = (separation_reason is null)),
  check (separation_date is null or hire_date is null or separation_date >= hire_date),
  unique (client_id, employee_no),
  -- Lets payroll_entries check that an entry's employee belongs to the same client.
  unique (id, client_id)
);

create unique index employees_client_tin_key on public.employees (client_id, tin) where tin is not null;
create index employees_client_idx on public.employees (client_id, last_name, first_name);

-- ---------------------------------------------------------------------------
-- Payslip items: each client's earnings, deductions and employer contributions,
-- each mapped to a BIR reporting category (taxify PH_CAT). Tax figures are
-- computed from the category totals (src/lib/payroll/items.ts).
-- ---------------------------------------------------------------------------
create table public.payroll_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  name text not null check (btrim(name) <> '' and name !~ '[\r\n]'),
  kind text not null check (kind in ('earning', 'deduction', 'employer_contribution')),
  bir_category text not null check (bir_category in (
    'basic', 'overtime', 'holiday', 'night_diff', 'hazard', 'thirteenth_month', 'de_minimis', 'other_taxable',
    'separation', 'commission', 'profit_share', 'director_fee',
    'withholding_tax', 'sss_ee', 'phic_ee', 'hdmf_ee', 'sss_er', 'phic_er', 'hdmf_er', 'none'
  )),
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Earnings map to an earnings category; deductions to tax, employee contributions or none; employer contributions to employer shares or none.
  check (
    (kind = 'earning' and bir_category in ('basic', 'overtime', 'holiday', 'night_diff', 'hazard', 'thirteenth_month', 'de_minimis', 'other_taxable', 'separation', 'commission', 'profit_share', 'director_fee'))
    or (kind = 'deduction' and bir_category in ('withholding_tax', 'sss_ee', 'phic_ee', 'hdmf_ee', 'none'))
    or (kind = 'employer_contribution' and bir_category in ('sss_er', 'phic_er', 'hdmf_er', 'none'))
  ),
  unique (id, client_id)
);

-- Column headers of the Excel register: unique per client regardless of case.
create unique index payroll_items_client_name_key on public.payroll_items (client_id, lower(btrim(name)));

-- ---------------------------------------------------------------------------
-- Payroll: an entry per employee per month (optionally per pay period), with
-- one line per payslip item.
-- ---------------------------------------------------------------------------
create table public.payroll_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  employee_id uuid not null,
  -- First day of the month the pay belongs to.
  pay_month date not null check (extract(day from pay_month) = 1),
  -- For semi-monthly or weekly detail; null for the month as a whole (what the OS saves today).
  pay_period_end date check (pay_period_end is null or date_trunc('month', pay_period_end)::date = pay_month),
  -- Computed by the app when the month is saved (src/lib/payroll/compute.ts): 1601-C item 22 for the employee. Reports recompute it.
  taxable_compensation numeric(18,2) not null default 0,
  -- Correction of tax withheld from this employee in earlier months (1601-C item 26):
  -- positive when more is withheld, negative for a refund (e.g. the year-end refund of over-withholding).
  adjustment numeric(18,2) not null default 0,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (employee_id, client_id) references public.employees (id, client_id) on delete restrict,
  unique (id, client_id)
);

create unique index payroll_entries_period_key on public.payroll_entries (employee_id, pay_month, coalesce(pay_period_end, '-infinity'::date));
create index payroll_entries_client_month_idx on public.payroll_entries (client_id, pay_month);

create table public.payroll_entry_lines (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null,
  client_id uuid not null,
  item_id uuid not null,
  -- Pesos. Earnings may be negative (tardiness, leave without pay), as in taxify.
  amount numeric(18,2) not null,
  foreign key (entry_id, client_id) references public.payroll_entries (id, client_id) on delete cascade,
  -- An item that has been used cannot be deleted, only deactivated.
  foreign key (item_id, client_id) references public.payroll_items (id, client_id) on delete restrict,
  unique (entry_id, item_id)
);

create index payroll_entry_lines_item_idx on public.payroll_entry_lines (item_id);

-- ---------------------------------------------------------------------------
-- Payroll registers sent by client users from the portal, waiting for staff.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('payroll', 'payroll', false, 5242880, array['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
on conflict (id) do nothing;

create table public.payroll_submissions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  pay_month date not null check (extract(day from pay_month) = 1),
  submitted_by uuid not null default auth.uid() references auth.users (id),
  file_name text not null,
  -- <client id>/<pay month>/<uuid>.xlsx in the private "payroll" bucket.
  storage_path text not null unique,
  -- The register as read from the file (src/lib/payroll/register.ts RegisterRow[]); amounts as decimal strings.
  rows jsonb not null check (jsonb_typeof(rows) = 'array'),
  row_count int generated always as (jsonb_array_length(rows)) stored,
  -- Sent after the client's document cutoff for the month (same rule as documents, §3.10).
  late boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'posted', 'returned')),
  return_reason text,
  reviewed_by uuid references auth.users (id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'returned') = (return_reason is not null))
);

create index payroll_submissions_client_idx on public.payroll_submissions (client_id, pay_month desc, created_at desc);

-- ---------------------------------------------------------------------------
-- Access.
-- ---------------------------------------------------------------------------
-- Owner, or staff assigned to the client (preparer or reviewer).
create or replace function private.can_payroll(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_owner() or private.is_assigned(target)
$$;

-- Has the 1601-C covering this month been filed (filed, paid or proof sent)?
create or replace function private.payroll_month_locked(p_client uuid, p_month date) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.filing_instances f
    where f.client_id = p_client and f.form = '1601-C'
      and p_month between f.period_start and f.period_end
      and f.status in ('filed', 'paid', 'proof_uploaded')
  )
$$;

create or replace function private.payroll_entries_lock() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_op in ('UPDATE', 'DELETE') and private.payroll_month_locked(old.client_id, old.pay_month) then
    raise exception 'The 1601-C for % is already filed: its payroll is locked.', to_char(old.pay_month, 'FMMonth YYYY') using errcode = '42501';
  end if;
  if tg_op in ('INSERT', 'UPDATE') and private.payroll_month_locked(new.client_id, new.pay_month) then
    raise exception 'The 1601-C for % is already filed: its payroll is locked.', to_char(new.pay_month, 'FMMonth YYYY') using errcode = '42501';
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

create or replace function private.payroll_lines_lock() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  r record;
begin
  for r in select e.client_id, e.pay_month from public.payroll_entries e
           where e.id in (case when tg_op = 'DELETE' then old.entry_id else new.entry_id end, case when tg_op = 'UPDATE' then old.entry_id end) loop
    if private.payroll_month_locked(r.client_id, r.pay_month) then
      raise exception 'The 1601-C for % is already filed: its payroll is locked.', to_char(r.pay_month, 'FMMonth YYYY') using errcode = '42501';
    end if;
  end loop;
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

-- An item's kind and BIR category change only while no payroll uses it (the figures already computed would change).
create or replace function private.payroll_items_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if (new.kind, new.bir_category, new.client_id) is distinct from (old.kind, old.bir_category, old.client_id)
     and exists (select 1 from public.payroll_entry_lines l where l.item_id = old.id) then
    raise exception 'The payslip item "%" is already used on the payroll: its kind and BIR category cannot change. Deactivate it and add a new item instead.', old.name using errcode = '42501';
  end if;
  return new;
end;
$$;

-- A client's submission is late when sent after the cutoff day of the month after the pay month.
create or replace function private.payroll_submission_defaults() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  cutoff_day int;
begin
  select submission_cutoff_day into cutoff_day from public.clients where id = new.client_id;
  new.late := private.manila_today() > (new.pay_month + interval '1 month')::date + (coalesce(cutoff_day, 5) - 1);
  new.status := 'pending';
  new.return_reason := null;
  new.reviewed_by := null;
  new.reviewed_at := null;
  return new;
end;
$$;

-- Staff review: only status, reason and reviewer change; the register itself stays as sent.
create or replace function private.payroll_submission_review() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.client_id <> old.client_id or new.pay_month <> old.pay_month or new.submitted_by <> old.submitted_by
     or new.file_name <> old.file_name or new.storage_path <> old.storage_path or new.rows <> old.rows or new.late <> old.late then
    raise exception 'A sent payroll register cannot be changed; return it and ask for a new one.' using errcode = '42501';
  end if;
  if old.status <> 'pending' then
    raise exception 'This payroll register was already %.', old.status using errcode = '42501';
  end if;
  new.reviewed_by := auth.uid();
  new.reviewed_at := now();
  return new;
end;
$$;

create trigger lock_filed_month before insert or update or delete on public.payroll_entries
  for each row execute function private.payroll_entries_lock();
create trigger lock_filed_month before insert or update or delete on public.payroll_entry_lines
  for each row execute function private.payroll_lines_lock();
create trigger items_guard before update on public.payroll_items
  for each row execute function private.payroll_items_guard();
create trigger submission_defaults before insert on public.payroll_submissions
  for each row execute function private.payroll_submission_defaults();
create trigger submission_review before update on public.payroll_submissions
  for each row execute function private.payroll_submission_review();

create trigger audit after insert or update or delete on public.employees for each row execute function private.audit();
create trigger audit after insert or update or delete on public.payroll_entries for each row execute function private.audit();
create trigger audit after insert or update or delete on public.payroll_submissions for each row execute function private.audit();
create trigger audit after insert or update or delete on public.payroll_items for each row execute function private.audit();
create trigger audit after insert or update or delete on public.payroll_entry_lines for each row execute function private.audit();
create trigger touch_updated_at before update on public.payroll_items for each row execute function private.touch_updated_at();
create trigger touch_updated_at before update on public.employees for each row execute function private.touch_updated_at();
create trigger touch_updated_at before update on public.payroll_entries for each row execute function private.touch_updated_at();
create trigger touch_updated_at before update on public.payroll_submissions for each row execute function private.touch_updated_at();

alter table public.employees enable row level security;
alter table public.payroll_entries enable row level security;
alter table public.payroll_submissions enable row level security;
alter table public.payroll_items enable row level security;
alter table public.payroll_entry_lines enable row level security;

-- Employees are never deleted (retention, §3.14): mark them separated or inactive.
create policy employees_read on public.employees for select to authenticated using (private.can_payroll(client_id));
create policy employees_insert on public.employees for insert to authenticated with check (private.can_payroll(client_id));
create policy employees_update on public.employees for update to authenticated using (private.can_payroll(client_id)) with check (private.can_payroll(client_id));

-- An entry may be cleared while its month is open (the lock trigger stops it after filing).
create policy payroll_entries_read on public.payroll_entries for select to authenticated using (private.can_payroll(client_id));
create policy payroll_entries_insert on public.payroll_entries for insert to authenticated with check (private.can_payroll(client_id));
create policy payroll_entries_update on public.payroll_entries for update to authenticated using (private.can_payroll(client_id)) with check (private.can_payroll(client_id));
create policy payroll_entries_delete on public.payroll_entries for delete to authenticated using (private.can_payroll(client_id));

create policy payroll_entry_lines_read on public.payroll_entry_lines for select to authenticated using (private.can_payroll(client_id));
create policy payroll_entry_lines_insert on public.payroll_entry_lines for insert to authenticated with check (private.can_payroll(client_id));
create policy payroll_entry_lines_update on public.payroll_entry_lines for update to authenticated using (private.can_payroll(client_id)) with check (private.can_payroll(client_id));
create policy payroll_entry_lines_delete on public.payroll_entry_lines for delete to authenticated using (private.can_payroll(client_id));

-- Payslip items: client users read them (the register's columns); staff manage them. An unused item may be deleted.
create policy payroll_items_read on public.payroll_items for select to authenticated using (private.can_payroll(client_id) or private.is_client_user(client_id));
create policy payroll_items_insert on public.payroll_items for insert to authenticated with check (private.can_payroll(client_id));
create policy payroll_items_update on public.payroll_items for update to authenticated using (private.can_payroll(client_id)) with check (private.can_payroll(client_id));
create policy payroll_items_delete on public.payroll_items for delete to authenticated using (private.can_payroll(client_id));

-- Client users send and see their own client's submissions; staff review them.
create policy payroll_submissions_read on public.payroll_submissions for select to authenticated
  using (private.can_payroll(client_id) or private.is_client_user(client_id));
create policy payroll_submissions_insert on public.payroll_submissions for insert to authenticated
  with check (submitted_by = auth.uid() and (private.can_payroll(client_id) or private.is_client_user(client_id)));
create policy payroll_submissions_review on public.payroll_submissions for update to authenticated
  using (private.can_payroll(client_id)) with check (private.can_payroll(client_id));

-- Stored registers: <client id>/... in the "payroll" bucket. Kept, never replaced (retention).
create policy payroll_files_read on storage.objects for select to authenticated using (
  bucket_id = 'payroll' and (private.can_payroll(private.document_client(name)) or private.is_client_user(private.document_client(name)))
);
create policy payroll_files_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'payroll' and (private.can_payroll(private.document_client(name)) or private.is_client_user(private.document_client(name)))
);

-- ---------------------------------------------------------------------------
-- Saving a month in one step (grid, staff upload, posting a client submission).
-- Runs as the caller, so RLS and the lock trigger apply.
-- p_entries: [{employee_id, pay_period_end, taxable_compensation, adjustment, note, lines: [{item_id, amount}]}]
-- Every employee listed has their entries for the month replaced by the ones given
-- (an element with no lines, no adjustment and no note just clears the month);
-- employees not listed are left alone. Returns the number of employees replaced.
-- ---------------------------------------------------------------------------
create or replace function public.save_payroll_month(p_client uuid, p_month date, p_entries jsonb, p_submission uuid default null)
returns int
language plpgsql set search_path = '' as $$
declare
  n int := 0;
  emp uuid;
  e jsonb;
  new_id uuid;
begin
  if not private.can_payroll(p_client) then
    raise exception 'Only the Owner and staff assigned to this client can change its payroll.' using errcode = '42501';
  end if;
  for emp in select distinct (x ->> 'employee_id')::uuid from jsonb_array_elements(p_entries) x loop
    delete from public.payroll_entries where client_id = p_client and employee_id = emp and pay_month = p_month;
    n := n + 1;
  end loop;
  for e in select x from jsonb_array_elements(p_entries) x loop
    if jsonb_array_length(coalesce(e -> 'lines', '[]'::jsonb)) = 0
       and coalesce((e ->> 'adjustment')::numeric, 0) = 0 and nullif(btrim(e ->> 'note'), '') is null then
      continue;
    end if;
    insert into public.payroll_entries (client_id, employee_id, pay_month, pay_period_end, taxable_compensation, adjustment, note)
    values (p_client, (e ->> 'employee_id')::uuid, p_month, nullif(e ->> 'pay_period_end', '')::date,
            coalesce((e ->> 'taxable_compensation')::numeric, 0), coalesce((e ->> 'adjustment')::numeric, 0), nullif(btrim(e ->> 'note'), ''))
    returning id into new_id;
    insert into public.payroll_entry_lines (entry_id, client_id, item_id, amount)
    select new_id, p_client, (l ->> 'item_id')::uuid, sum((l ->> 'amount')::numeric)
    from jsonb_array_elements(coalesce(e -> 'lines', '[]'::jsonb)) l
    group by (l ->> 'item_id')::uuid
    having sum((l ->> 'amount')::numeric) <> 0;
  end loop;
  if p_submission is not null then
    update public.payroll_submissions set status = 'posted'
    where id = p_submission and client_id = p_client and pay_month = p_month;
    if not found then
      raise exception 'Payroll submission not found for this client and month.' using errcode = 'P0002';
    end if;
  end if;
  return n;
end;
$$;

-- The default payslip items, added the first time a client's payroll is opened (all editable).
create or replace function public.ensure_payroll_items(p_client uuid) returns int
language plpgsql set search_path = '' as $$
declare
  n int;
begin
  if not private.can_payroll(p_client) then
    raise exception 'Only the Owner and staff assigned to this client can set up its payroll.' using errcode = '42501';
  end if;
  if exists (select 1 from public.payroll_items where client_id = p_client) then
    return 0;
  end if;
  insert into public.payroll_items (client_id, name, kind, bir_category, sort_order)
  values
    (p_client, 'Basic Pay', 'earning', 'basic', 10),
    (p_client, 'Overtime Pay', 'earning', 'overtime', 20),
    (p_client, 'Holiday Pay', 'earning', 'holiday', 30),
    (p_client, 'Night Differential', 'earning', 'night_diff', 40),
    (p_client, '13th Month Pay', 'earning', 'thirteenth_month', 50),
    (p_client, 'Rice Allowance', 'earning', 'de_minimis', 60),
    (p_client, 'Withholding Tax', 'deduction', 'withholding_tax', 10),
    (p_client, 'SSS (Employee)', 'deduction', 'sss_ee', 20),
    (p_client, 'PhilHealth (Employee)', 'deduction', 'phic_ee', 30),
    (p_client, 'Pag-IBIG (Employee)', 'deduction', 'hdmf_ee', 40),
    (p_client, 'SSS (Employer)', 'employer_contribution', 'sss_er', 10),
    (p_client, 'PhilHealth (Employer)', 'employer_contribution', 'phic_er', 20),
    (p_client, 'Pag-IBIG (Employer)', 'employer_contribution', 'hdmf_er', 30);
  get diagnostics n = row_count;
  return n;
end;
$$;

-- The employee list a client user needs to fill in and check their payroll register
-- (numbers, names, TINs; no pay). Staff read employees directly.
create or replace function public.payroll_roster(p_client uuid)
returns table (id uuid, employee_no text, last_name text, first_name text, middle_name text, tin text, tin_branch text,
               is_mwe boolean, active boolean, hire_date date, separation_date date)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not (private.can_payroll(p_client) or private.is_client_user(p_client)) then
    raise exception 'You cannot see this client''s employees.' using errcode = '42501';
  end if;
  return query
    select e.id, e.employee_no, e.last_name, e.first_name, e.middle_name, e.tin, e.tin_branch, e.is_mwe, e.active, e.hire_date, e.separation_date
    from public.employees e
    where e.client_id = p_client
    order by e.last_name, e.first_name;
end;
$$;

revoke execute on function private.can_payroll(uuid) from public, anon;
revoke execute on function private.payroll_month_locked(uuid, date) from public, anon;
revoke execute on function private.payroll_entries_lock() from public, anon, authenticated;
revoke execute on function private.payroll_lines_lock() from public, anon, authenticated;
revoke execute on function private.payroll_items_guard() from public, anon, authenticated;
revoke execute on function public.ensure_payroll_items(uuid) from public, anon;
grant execute on function public.ensure_payroll_items(uuid) to authenticated;
revoke execute on function private.payroll_submission_defaults() from public, anon, authenticated;
revoke execute on function private.payroll_submission_review() from public, anon, authenticated;
revoke execute on function public.save_payroll_month(uuid, date, jsonb, uuid) from public, anon;
revoke execute on function public.payroll_roster(uuid) from public, anon;
grant execute on function private.can_payroll(uuid) to authenticated;
grant execute on function private.payroll_month_locked(uuid, date) to authenticated;
grant execute on function public.save_payroll_month(uuid, date, jsonb, uuid) to authenticated;
grant execute on function public.payroll_roster(uuid) to authenticated;
