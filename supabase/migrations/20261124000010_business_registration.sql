-- Business Registration, Phase 1C (spec §2, §3.7c, Q66): registering a new
-- business, the yearly permit renewals, and closing a business, each as a case
-- with a checklist of agency steps shown as a routing slip.
--
-- New business:
-- The Owner opens a registration case for a business that does not exist yet.
-- That creates the client (status Onboarding, no TIN), a Business Registration
-- engagement and the case with its checklist of agency steps, worked out in
-- src/lib/registration/steps.ts: DTI or SEC, barangay clearance and mayor's
-- permit (where the firm handles them), BIR (ORUS, COR / Form 2303, books,
-- invoices), and SSS / PhilHealth / Pag-IBIG employer registration.
--
-- Staff on the client move each step along (status, reference number, date,
-- government fee paid, notes). When the COR is issued, the Owner enters it on
-- the client (Edit: TIN, RDO, tax types, effective date), which starts the
-- filing obligations (§4.1). The Owner then completes the case, which makes the
-- client active and ends the Business Registration engagement.
--
-- Annual renewal (an existing client, for a year): barangay, fire, sanitary and
-- mayor's permits, SEC GIS or DTI renewal, books for the new year. Completing
-- it only closes the case.
--
-- Closing the business (an existing client, with the closing date): barangay
-- and City Hall retirement, BIR Form 1905, final returns, invoices surrendered,
-- verification and cancellation, DTI cancellation or SEC dissolution, employer
-- numbers. Completing it ends the client's filing obligations after the
-- closing date, ends its engagements and makes it inactive.

insert into public.service_lines (code, name, available, sort_order) values
  ('business_registration', 'Business Registration', true, 3),
  ('bir_loa', 'BIR LOA Services', false, 4)
on conflict (code) do update set name = excluded.name, available = excluded.available, sort_order = excluded.sort_order;
-- Q66: the other services run on another platform; list them after the four OS service lines.
update public.service_lines set sort_order = sort_order + 10
where code not in ('tax_compliance', 'bookkeeping', 'business_registration', 'bir_loa') and sort_order < 10;

create table public.registration_cases (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null default 'new_business' check (kind in ('new_business', 'renewal', 'closure')),
  -- Renewal: the year the permits are for.
  period_year smallint check (period_year between 2000 and 2100),
  -- Closure: the day the business stopped operating; obligations end on it.
  effective_date date,
  -- The firm handles the barangay clearance and mayor's permit.
  lgu_served boolean not null,
  -- The business will hire: employer registration with SSS, PhilHealth and Pag-IBIG.
  employer boolean not null,
  -- City or municipality where the business will operate.
  lgu text,
  target_date date,
  status text not null default 'open' check (status in ('open', 'completed', 'cancelled')),
  notes text,
  opened_by uuid references auth.users (id),
  opened_at timestamptz not null default now(),
  closed_by uuid references auth.users (id),
  closed_at timestamptz,
  cancel_reason text,
  updated_at timestamptz not null default now(),
  check ((status = 'open') = (closed_at is null)),
  check (status <> 'cancelled' or cancel_reason is not null),
  check ((kind = 'renewal') = (period_year is not null)),
  check ((kind = 'closure') = (effective_date is not null))
);
-- One open case of each kind per client, and one renewal per client and year.
create unique index registration_cases_open_idx on public.registration_cases (client_id, kind) where status = 'open';
create unique index registration_cases_renewal_idx on public.registration_cases (client_id, period_year) where kind = 'renewal' and status <> 'cancelled';
create index registration_cases_client_idx on public.registration_cases (client_id, opened_at desc);

create table public.registration_steps (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.registration_cases (id) on delete cascade,
  code text not null,
  agency text not null check (agency in ('dti', 'sec', 'barangay', 'lgu', 'bfp', 'bir', 'sss', 'philhealth', 'pagibig')),
  label text not null,
  reference_label text not null,
  sort_order smallint not null,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'waiting_client', 'waiting_agency', 'done', 'not_applicable')),
  reference_no text,
  done_on date,
  government_fee numeric(18, 2) check (government_fee >= 0),
  notes text,
  -- When the status last changed: the routing slip shows how long a step has sat in it.
  status_changed_at timestamptz not null default now(),
  updated_by uuid references auth.users (id),
  updated_at timestamptz not null default now(),
  unique (case_id, code),
  check ((status = 'done') = (done_on is not null))
);
create index registration_steps_case_idx on public.registration_steps (case_id, sort_order);

create trigger audit after insert or update or delete on public.registration_cases for each row execute function private.audit();
create trigger audit after insert or update or delete on public.registration_steps for each row execute function private.audit();
create trigger touch_updated_at before update on public.registration_cases for each row execute function private.touch_updated_at();
create trigger touch_updated_at before update on public.registration_steps for each row execute function private.touch_updated_at();

alter table public.registration_cases enable row level security;
alter table public.registration_steps enable row level security;
-- Staff on the client and the client's own users read; writes go through the functions below.
create policy registration_cases_read on public.registration_cases for select to authenticated
  using ((private.is_staff() and private.can_access_client(client_id)) or private.is_client_user(client_id));
create policy registration_steps_read on public.registration_steps for select to authenticated
  using (exists (
    select 1 from public.registration_cases c
    where c.id = case_id and ((private.is_staff() and private.can_access_client(c.client_id)) or private.is_client_user(c.client_id))
  ));

-- The Owner opens a case: the client (Onboarding), the engagement, the case and its steps.
create or replace function public.open_registration_case(p_client jsonb, p_case jsonb, p_steps jsonb)
returns public.registration_cases
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
  r public.registration_cases;
  brand uuid := (p_client ->> 'brand_id')::uuid;
begin
  if not private.is_owner() then raise exception 'Only the Owner opens registrations' using errcode = '42501'; end if;
  if coalesce(btrim(p_client ->> 'name'), '') = '' then raise exception 'Enter the proposed business name' using errcode = '22023'; end if;
  if p_steps is null or jsonb_typeof(p_steps) <> 'array' or jsonb_array_length(p_steps) = 0 then
    raise exception 'The registration steps are missing' using errcode = '22023';
  end if;
  if exists (select 1 from jsonb_array_elements(p_steps) s where s ->> 'status' not in ('pending', 'not_applicable')) then
    raise exception 'New steps start as pending or not needed' using errcode = '22023';
  end if;

  insert into public.clients (brand_id, branch_id, code, name, taxpayer_type, registered_address, fiscal_year_end_month, status)
  values (
    brand,
    nullif(p_client ->> 'branch_id', '')::uuid,
    private.next_client_code(brand),
    btrim(p_client ->> 'name'),
    p_client ->> 'taxpayer_type',
    nullif(btrim(p_client ->> 'registered_address'), ''),
    coalesce((p_client ->> 'fiscal_year_end_month')::smallint, 12),
    'onboarding'
  ) returning * into c;

  insert into public.engagements (client_id, service_line, monthly_retainer, start_date, notes)
  values (c.id, 'business_registration', 0, coalesce((p_case ->> 'start_date')::date, current_date), 'New business registration');

  insert into public.registration_cases (client_id, lgu_served, employer, lgu, target_date, notes, opened_by)
  values (
    c.id,
    coalesce((p_case ->> 'lgu_served')::boolean, true),
    coalesce((p_case ->> 'employer')::boolean, false),
    nullif(btrim(p_case ->> 'lgu'), ''),
    nullif(p_case ->> 'target_date', '')::date,
    nullif(btrim(p_case ->> 'notes'), ''),
    auth.uid()
  ) returning * into r;

  insert into public.registration_steps (case_id, code, agency, label, reference_label, sort_order, status, notes)
  select r.id, s ->> 'code', s ->> 'agency', s ->> 'label', s ->> 'reference_label', (s ->> 'sort_order')::smallint,
         s ->> 'status', nullif(s ->> 'notes', '')
  from jsonb_array_elements(p_steps) s;

  return r;
end;
$$;

-- Staff on the client (and the Owner) record a step's progress while the case is open.
create or replace function public.update_registration_step(
  p_step uuid, p_status text, p_reference text, p_done_on date, p_fee numeric, p_notes text
) returns public.registration_steps
language plpgsql security definer set search_path = '' as $$
declare
  s public.registration_steps;
  k public.registration_cases;
begin
  select * into s from public.registration_steps where id = p_step;
  if s.id is null then raise exception 'Step not found' using errcode = 'P0002'; end if;
  select * into k from public.registration_cases where id = s.case_id;
  if not (private.is_staff() and private.can_access_client(k.client_id)) then
    raise exception 'Only staff on this client update its registration' using errcode = '42501';
  end if;
  if k.status <> 'open' then raise exception 'This registration is closed' using errcode = '22023'; end if;
  if p_status not in ('pending', 'in_progress', 'waiting_client', 'waiting_agency', 'done', 'not_applicable') then
    raise exception 'Choose a status' using errcode = '22023';
  end if;
  if p_status = 'done' and p_done_on is null then raise exception 'Enter the date this step was done' using errcode = '22023'; end if;
  if p_status = 'done' and s.code = 'bir_cor' and coalesce(btrim(p_reference), '') !~ '^\d{3}-\d{3}-\d{3}(-\d{3,5})?$' then
    raise exception 'Enter the TIN on the COR (123-456-789-00000)' using errcode = '22023';
  end if;
  if p_fee is not null and p_fee < 0 then raise exception 'The government fee cannot be negative' using errcode = '22023'; end if;

  update public.registration_steps set
    status = p_status,
    reference_no = nullif(btrim(p_reference), ''),
    done_on = case when p_status = 'done' then p_done_on end,
    government_fee = p_fee,
    notes = nullif(btrim(p_notes), ''),
    status_changed_at = case when status is distinct from p_status then now() else status_changed_at end,
    updated_by = auth.uid()
  where id = p_step
  returning * into s;
  return s;
end;
$$;

-- The Owner completes a case once every step is done (or not needed).
-- New business: the COR must be entered on the client; the client becomes active.
-- Closure: obligations end on the closing date, engagements end, the client becomes inactive.
create or replace function public.complete_registration_case(p_case uuid) returns public.registration_cases
language plpgsql security definer set search_path = '' as $$
declare
  k public.registration_cases;
  c public.clients;
  cor_tin text;
begin
  if not private.is_owner() then raise exception 'Only the Owner completes registrations' using errcode = '42501'; end if;
  select * into k from public.registration_cases where id = p_case for update;
  if k.id is null then raise exception 'Registration not found' using errcode = 'P0002'; end if;
  if k.status <> 'open' then raise exception 'This registration is already closed' using errcode = '22023'; end if;
  if exists (select 1 from public.registration_steps where case_id = p_case and status not in ('done', 'not_applicable')) then
    raise exception 'Some steps are not finished' using errcode = '22023';
  end if;
  select * into c from public.clients where id = k.client_id;

  if k.kind = 'renewal' then
    update public.registration_cases set status = 'completed', closed_by = auth.uid(), closed_at = now()
    where id = p_case returning * into k;
    return k;
  end if;

  if k.kind = 'closure' then
    -- Nothing is due for periods after the business closed.
    update public.obligations set end_date = k.effective_date
    where client_id = c.id and (end_date is null or end_date > k.effective_date) and start_date <= k.effective_date;
    delete from public.filing_instances f
    using public.obligations o
    where f.obligation_id = o.id and o.client_id = c.id and o.end_date is not null
      and f.period_start > o.end_date and f.status = 'not_started';
    update public.engagements set status = 'ended', end_date = greatest(start_date, k.effective_date)
    where client_id = c.id and status = 'active';
    update public.clients set status = 'inactive' where id = c.id;
    update public.registration_cases set status = 'completed', closed_by = auth.uid(), closed_at = now()
    where id = p_case returning * into k;
    return k;
  end if;

  select reference_no into cor_tin from public.registration_steps where case_id = p_case and code = 'bir_cor' and status = 'done';
  if cor_tin is null then raise exception 'The BIR COR step is not done' using errcode = '22023'; end if;
  if c.tin is null or not exists (
    select 1 from public.client_registrations where client_id = c.id and jsonb_array_length(tax_types) > 0
  ) then
    raise exception 'Enter the COR on the client first (Edit: TIN, RDO and tax types)' using errcode = '22023';
  end if;
  -- Compare the 9-digit TIN; the branch code may be written either way.
  if left(regexp_replace(c.tin, '\D', '', 'g'), 9) <> left(regexp_replace(cor_tin, '\D', '', 'g'), 9) then
    raise exception 'The client''s TIN (%) does not match the COR (%)', c.tin, cor_tin using errcode = '22023';
  end if;

  update public.registration_cases set status = 'completed', closed_by = auth.uid(), closed_at = now()
  where id = p_case returning * into k;
  update public.clients set status = 'active' where id = c.id and status = 'onboarding';
  update public.engagements set status = 'ended', end_date = greatest(start_date, current_date)
  where client_id = c.id and service_line = 'business_registration' and status = 'active';
  return k;
end;
$$;

-- The Owner opens a renewal or a closure for an existing client.
create or replace function public.open_client_case(p_client uuid, p_kind text, p_case jsonb, p_steps jsonb)
returns public.registration_cases
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
  r public.registration_cases;
begin
  if not private.is_owner() then raise exception 'Only the Owner opens renewals and closures' using errcode = '42501'; end if;
  select * into c from public.clients where id = p_client;
  if c.id is null then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if p_kind not in ('renewal', 'closure') then raise exception 'Choose a renewal or a closure' using errcode = '22023'; end if;
  if c.status in ('inactive', 'archived') then raise exception 'This client is no longer active' using errcode = '22023'; end if;
  if p_kind = 'renewal' and nullif(p_case ->> 'period_year', '') is null then raise exception 'Choose the year' using errcode = '22023'; end if;
  if p_kind = 'closure' and nullif(p_case ->> 'effective_date', '') is null then
    raise exception 'Enter the day the business stopped operating' using errcode = '22023';
  end if;
  if p_steps is null or jsonb_typeof(p_steps) <> 'array' or jsonb_array_length(p_steps) = 0 then
    raise exception 'The steps are missing' using errcode = '22023';
  end if;
  if exists (select 1 from jsonb_array_elements(p_steps) s where s ->> 'status' not in ('pending', 'not_applicable')) then
    raise exception 'New steps start as pending or not needed' using errcode = '22023';
  end if;

  insert into public.registration_cases (client_id, kind, period_year, effective_date, lgu_served, employer, lgu, target_date, notes, opened_by)
  values (
    c.id, p_kind,
    case when p_kind = 'renewal' then (p_case ->> 'period_year')::smallint end,
    case when p_kind = 'closure' then (p_case ->> 'effective_date')::date end,
    coalesce((p_case ->> 'lgu_served')::boolean, true),
    coalesce((p_case ->> 'employer')::boolean, false),
    nullif(btrim(p_case ->> 'lgu'), ''),
    nullif(p_case ->> 'target_date', '')::date,
    nullif(btrim(p_case ->> 'notes'), ''),
    auth.uid()
  ) returning * into r;

  insert into public.registration_steps (case_id, code, agency, label, reference_label, sort_order, status, notes)
  select r.id, s ->> 'code', s ->> 'agency', s ->> 'label', s ->> 'reference_label', (s ->> 'sort_order')::smallint,
         s ->> 'status', nullif(s ->> 'notes', '')
  from jsonb_array_elements(p_steps) s;
  return r;
end;
$$;

-- The Owner cancels an open case (e.g. the business was not registered after all).
create or replace function public.cancel_registration_case(p_case uuid, p_reason text) returns public.registration_cases
language plpgsql security definer set search_path = '' as $$
declare
  k public.registration_cases;
begin
  if not private.is_owner() then raise exception 'Only the Owner cancels registrations' using errcode = '42501'; end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason for cancelling' using errcode = '22023'; end if;
  update public.registration_cases set status = 'cancelled', closed_by = auth.uid(), closed_at = now(), cancel_reason = btrim(p_reason)
  where id = p_case and status = 'open' returning * into k;
  if k.id is null then raise exception 'No open registration to cancel' using errcode = 'P0002'; end if;
  if k.kind = 'new_business' then
    update public.engagements set status = 'ended', end_date = greatest(start_date, current_date)
    where client_id = k.client_id and service_line = 'business_registration' and status = 'active';
  end if;
  return k;
end;
$$;

revoke execute on function public.open_registration_case(jsonb, jsonb, jsonb) from public, anon;
revoke execute on function public.open_client_case(uuid, text, jsonb, jsonb) from public, anon;
grant execute on function public.open_client_case(uuid, text, jsonb, jsonb) to authenticated;
revoke execute on function public.update_registration_step(uuid, text, text, date, numeric, text) from public, anon;
revoke execute on function public.complete_registration_case(uuid) from public, anon;
revoke execute on function public.cancel_registration_case(uuid, text) from public, anon;
grant execute on function public.open_registration_case(jsonb, jsonb, jsonb) to authenticated;
grant execute on function public.update_registration_step(uuid, text, text, date, numeric, text) to authenticated;
grant execute on function public.complete_registration_case(uuid) to authenticated;
grant execute on function public.cancel_registration_case(uuid, text) to authenticated;
