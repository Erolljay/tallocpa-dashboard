-- Registration cases match the fee schedule (Owner: "for registration cases please see
-- fee schedule (other than audit), these are the tasks that have fees").
--
-- Every ad hoc job on the fee schedule (component I) except the amended return (a
-- filing) is now a kind of case, billed from the active fee schedule when completed:
--
--   new_business  I.registration_individual / I.registration_non_individual, plus
--                 I.sss_registration, I.philhealth_registration, I.pagibig_registration
--                 for an employer (each unless its employer step is not needed)
--   renewal       I.business_permit, only where the firm handles the permits
--                 (lgu_served, and the mayor's permit step not marked not needed)
--   bir_update    I.orus when a change is filed on Form 1905; I.sec when an SEC
--                 registrant amends its articles or by-laws
--   branch        I.orus
--   sec_filing    I.sec (new: the year's GIS and AFS through eFAST; non-individuals)
--   certificate   I.certificate (new: e.g. tax clearance; details.certificate)
--   employer      I.sss_registration, I.philhealth_registration, I.pagibig_registration
--                 (new: an existing client that starts hiring; per agency not skipped)
--   closure       I.closure
--
-- The same mapping is feeJobsFor in src/lib/registration/steps.ts. A job without a
-- price in the active schedule (e.g. the certificate, quoted per job) becomes a task
-- for the Owner to price and bill, as before.
--
-- BIR updates also take SEC amendments other than name and principal office: primary
-- purpose, capital stock increase or decrease, number of directors, fiscal year and
-- other amendments (partnerships and corporations only). A case with only SEC changes
-- has no Form 1905 steps.
--
-- The SEC General Information Sheet moves from the annual renewal to the SEC filings
-- case (open renewals keep their steps).

-- ---------------------------------------------------------------------------
-- Kinds of case.
-- ---------------------------------------------------------------------------
do $$
declare
  r record;
begin
  for r in
    select conname from pg_constraint
    where conrelid = 'public.registration_cases'::regclass and contype = 'c'
      and (conname = 'registration_cases_kind_check' or pg_get_constraintdef(oid) like '%period_year IS NOT NULL%')
  loop
    execute format('alter table public.registration_cases drop constraint %I', r.conname);
  end loop;
end;
$$;

alter table public.registration_cases
  add constraint registration_cases_kind_check
    check (kind in ('new_business', 'renewal', 'bir_update', 'branch', 'sec_filing', 'certificate', 'employer', 'closure')),
  -- Renewal: the year the permits are for. SEC filings: the year they are filed.
  add constraint registration_cases_period_year_check_kind check ((kind in ('renewal', 'sec_filing')) = (period_year is not null)),
  add constraint registration_cases_certificate_check check (kind <> 'certificate' or coalesce(btrim(details ->> 'certificate'), '') <> '');

-- Several certificates can be open at once, like branches.
drop index public.registration_cases_open_idx;
create unique index registration_cases_open_idx on public.registration_cases (client_id, kind)
  where status = 'open' and kind not in ('branch', 'certificate');
create unique index registration_cases_sec_filing_idx on public.registration_cases (client_id, period_year)
  where kind = 'sec_filing' and status <> 'cancelled';

-- The Owner opens a renewal, BIR update, branch, SEC filings, certificate, employer
-- registration or closure for an existing client.
create or replace function public.open_client_case(p_client uuid, p_kind text, p_case jsonb, p_steps jsonb)
returns public.registration_cases
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
  r public.registration_cases;
begin
  if not private.is_owner() then raise exception 'Only the Owner opens cases for a client' using errcode = '42501'; end if;
  select * into c from public.clients where id = p_client;
  if c.id is null then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if p_kind not in ('renewal', 'bir_update', 'branch', 'sec_filing', 'certificate', 'employer', 'closure') then
    raise exception 'Choose the kind of case' using errcode = '22023';
  end if;
  if c.status in ('inactive', 'archived') then raise exception 'This client is no longer active' using errcode = '22023'; end if;
  if p_kind in ('renewal', 'sec_filing') and nullif(p_case ->> 'period_year', '') is null then raise exception 'Choose the year' using errcode = '22023'; end if;
  if p_kind = 'sec_filing' and c.taxpayer_type = 'individual' then
    raise exception 'SEC filings are for partnerships and corporations' using errcode = '22023';
  end if;
  if p_kind = 'closure' and nullif(p_case ->> 'effective_date', '') is null then
    raise exception 'Enter the day the business stopped operating' using errcode = '22023';
  end if;
  if p_kind = 'bir_update' and nullif(p_case ->> 'effective_date', '') is null then
    raise exception 'Enter the date of the change' using errcode = '22023';
  end if;
  if p_kind = 'bir_update' and jsonb_array_length(coalesce(p_case -> 'changes', '[]'::jsonb)) = 0 then
    raise exception 'Choose what changes' using errcode = '22023';
  end if;
  if p_kind = 'bir_update' and c.taxpayer_type = 'individual'
     and coalesce(p_case -> 'changes', '[]'::jsonb) ?| array['primary_purpose', 'capital_increase', 'capital_decrease', 'directors', 'fiscal_year', 'other_amendment'] then
    raise exception 'A sole proprietorship has no SEC amendments' using errcode = '22023';
  end if;
  if p_kind = 'branch' and coalesce(btrim(p_case ->> 'branch_name'), '') = '' then
    raise exception 'Enter the branch name or address' using errcode = '22023';
  end if;
  if p_kind = 'certificate' and coalesce(btrim(p_case ->> 'certificate'), '') = '' then
    raise exception 'Choose the certificate' using errcode = '22023';
  end if;
  if p_steps is null or jsonb_typeof(p_steps) <> 'array' or jsonb_array_length(p_steps) = 0 then
    raise exception 'The steps are missing' using errcode = '22023';
  end if;
  if exists (select 1 from jsonb_array_elements(p_steps) s where s ->> 'status' not in ('pending', 'not_applicable')) then
    raise exception 'New steps start as pending or not needed' using errcode = '22023';
  end if;

  insert into public.registration_cases (client_id, kind, details, period_year, effective_date, lgu_served, employer, lgu, target_date, notes, opened_by)
  values (
    c.id, p_kind,
    case p_kind
      when 'bir_update' then jsonb_build_object('changes', p_case -> 'changes')
      when 'branch' then jsonb_build_object('branch_name', btrim(p_case ->> 'branch_name'))
      when 'certificate' then jsonb_strip_nulls(jsonb_build_object('certificate', btrim(p_case ->> 'certificate'), 'purpose', nullif(btrim(p_case ->> 'purpose'), '')))
      else '{}'::jsonb
    end,
    case when p_kind in ('renewal', 'sec_filing') then (p_case ->> 'period_year')::smallint end,
    case when p_kind in ('closure', 'bir_update') then (p_case ->> 'effective_date')::date end,
    coalesce((p_case ->> 'lgu_served')::boolean, p_kind not in ('sec_filing', 'certificate', 'employer')),
    p_kind = 'employer' or coalesce((p_case ->> 'employer')::boolean, false),
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

-- The Owner completes a case once every step is done (or not needed). Unchanged, except
-- that SEC filings, certificates and employer registration only close the case.
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

  if k.kind = 'bir_update' and (k.details -> 'changes') ? 'tax_types' and not exists (
    select 1 from public.client_registrations where client_id = c.id and created_at >= k.opened_at
  ) then
    raise exception 'Enter the new tax types on the client first (Edit, effective %)', k.effective_date using errcode = '22023';
  end if;

  if k.kind in ('renewal', 'bir_update', 'branch', 'sec_filing', 'certificate', 'employer') then
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

-- ---------------------------------------------------------------------------
-- Billing: the fee schedule jobs a completed case bills (feeJobsFor).
-- ---------------------------------------------------------------------------
create or replace function private.registration_fee_jobs(k public.registration_cases) returns text[]
language plpgsql stable security definer set search_path = '' as $$
declare
  t text := (select taxpayer_type from public.clients where id = k.client_id);
  changes text[] := array(select jsonb_array_elements_text(coalesce(k.details -> 'changes', '[]'::jsonb)));
  skipped text[] := array(select s.code from public.registration_steps s where s.case_id = k.id and s.status = 'not_applicable');
  codes text[] := '{}';
  agency text;
begin
  case k.kind
    when 'new_business' then
      codes := array[case when t = 'individual' then 'I.registration_individual' else 'I.registration_non_individual' end];
    when 'renewal' then
      if k.lgu_served and not ('mayors_permit' = any (skipped)) then codes := array['I.business_permit']; end if;
    when 'bir_update' then
      if changes && array['address', 'rdo_transfer', 'tax_types', 'name', 'line_of_business', 'primary_purpose', 'fiscal_year']
         and not ('bir_1905' = any (skipped)) then
        codes := array_append(codes, 'I.orus');
      end if;
      if t <> 'individual'
         and changes && array['name', 'rdo_transfer', 'primary_purpose', 'capital_increase', 'capital_decrease', 'directors', 'fiscal_year', 'other_amendment']
         and not ('sec_amendment' = any (skipped)) then
        codes := array_append(codes, 'I.sec');
      end if;
    when 'branch' then codes := array['I.orus'];
    when 'sec_filing' then codes := array['I.sec'];
    when 'certificate' then codes := array['I.certificate'];
    when 'closure' then codes := array['I.closure'];
    else null;
  end case;
  if k.kind = 'employer' or (k.kind = 'new_business' and k.employer) then
    foreach agency in array array['sss', 'philhealth', 'pagibig'] loop
      if not (agency || '_employer' = any (skipped)) then codes := array_append(codes, 'I.' || agency || '_registration'); end if;
    end loop;
  end if;
  return codes;
end;
$$;

create or replace function private.bill_registration_case() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  code text;
  v_label text;
  v_price numeric;
  label text;
  owner uuid := (select user_id from public.staff_profiles where role = 'owner' and active order by created_at limit 1);
begin
  if new.status <> 'completed' or old.status = 'completed' or new.billed_at is not null then return new; end if;
  label := case new.kind
    when 'new_business' then 'business registration'
    when 'closure' then 'closure of business'
    when 'renewal' then 'permit renewal ' || coalesce(new.period_year::text, '')
    when 'branch' then 'branch registration'
    when 'sec_filing' then 'SEC filings ' || coalesce(new.period_year::text, '')
    when 'certificate' then 'BIR certificate'
    when 'employer' then 'employer registration'
    else 'BIR update' end;
  foreach code in array private.registration_fee_jobs(new) loop
    v_label := null; v_price := null;
    select f.label, f.price into v_label, v_price from private.fee_job(new.client_id, code) f;
    if coalesce(v_price, 0) > 0 then
      insert into public.client_dues (client_id, kind, description, amount, due_on, created_by)
      values (new.client_id, 'other', left(v_label, 300), v_price, private.manila_today(), auth.uid());
    elsif owner is not null then
      -- No price in the schedule: the Owner prices and bills it.
      insert into public.staff_tasks (title, notes, client_id, assigned_to, priority, job_code, job_label, created_by)
      values (left('Price and bill: ' || coalesce(v_label, code) || ' (' || label || ')', 200),
              'The ' || label || ' is completed. The active fee schedule has no price for this job: set the price here, then mark the task done to bill it.',
              new.client_id, owner, 'high', case when v_label is not null then code end, v_label, null);
    end if;
  end loop;
  new.billed_at := now();
  return new;
end;
$$;

revoke execute on function private.registration_fee_jobs(public.registration_cases) from public, anon, authenticated;
revoke execute on function private.bill_registration_case() from public, anon, authenticated;
revoke execute on function public.open_client_case(uuid, text, jsonb, jsonb) from public, anon;
revoke execute on function public.complete_registration_case(uuid) from public, anon;
grant execute on function public.open_client_case(uuid, text, jsonb, jsonb) to authenticated;
grant execute on function public.complete_registration_case(uuid) to authenticated;
