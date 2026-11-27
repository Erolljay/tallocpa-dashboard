-- Business permits for Iloilo City clients only, and the SEC amendment as its own job
-- (Owner, 27 Nov 2026).
--
-- 1. "We only handle business permits for Iloilo City clients." A case where the firm
--    handles the LGU permits (lgu_served) must be in Iloilo City: a case naming another
--    city or municipality is refused. A case with no city takes the client's city from
--    its latest case. The business permit (I.business_permit) is billed when an Iloilo
--    City case is completed with the mayor's permit step done: the annual renewal, and
--    now also the new business's first permit (the new business registration covers
--    BIR and SEC only). Its label becomes "Business permit (Iloilo City)".
-- 2. "SEC amendment is 15,000." A new ad hoc job I.sec_amendment (partnerships and
--    corporations) is billed for an SEC amendment instead of I.sec (the GIS and AFS
--    filings). It is added to the draft and active schedules at ₱15,000.
--
-- The active schedule's items cannot normally change (start a new version instead).
-- The Owner set this price and label, so the guard is set aside for these rows only;
-- the audit log records them as usual.

create or replace function private.is_iloilo_city(p_lgu text) returns boolean
language sql immutable set search_path = '' as $$
  select coalesce(
    regexp_replace(lower(p_lgu), '[^a-z]+', ' ', 'g') ~ '(^| )(iloilo city|city of iloilo)( |$)',
    false);
$$;

create or replace function private.registration_case_lgu() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  new.lgu := nullif(btrim(new.lgu), '');
  if new.lgu_served and new.lgu is null then
    select k.lgu into new.lgu from public.registration_cases k
    where k.client_id = new.client_id and k.lgu is not null and k.id <> new.id
    order by k.opened_at desc limit 1;
  end if;
  if new.lgu_served and new.lgu is not null and not private.is_iloilo_city(new.lgu) then
    raise exception 'We handle business permits only for Iloilo City clients. Untick "We handle the LGU permits", or enter Iloilo City as the city.'
      using errcode = '22023';
  end if;
  return new;
end;
$$;
create trigger iloilo_permits before insert or update of lgu, lgu_served on public.registration_cases
  for each row execute function private.registration_case_lgu();

create or replace function private.registration_fee_jobs(k public.registration_cases) returns text[]
language plpgsql stable security definer set search_path = '' as $$
declare
  t text := (select taxpayer_type from public.clients where id = k.client_id);
  changes text[] := array(select jsonb_array_elements_text(coalesce(k.details -> 'changes', '[]'::jsonb)));
  skipped text[] := array(select s.code from public.registration_steps s where s.case_id = k.id and s.status = 'not_applicable');
  permit boolean := k.lgu_served and private.is_iloilo_city(k.lgu) and not ('mayors_permit' = any (skipped));
  codes text[] := '{}';
  agency text;
begin
  case k.kind
    when 'new_business' then
      codes := array[case when t = 'individual' then 'I.registration_individual' else 'I.registration_non_individual' end];
      if permit then codes := array_append(codes, 'I.business_permit'); end if;
    when 'renewal' then
      if permit then codes := array['I.business_permit']; end if;
    when 'bir_update' then
      if changes && array['address', 'rdo_transfer', 'tax_types', 'name', 'line_of_business', 'primary_purpose', 'fiscal_year']
         and not ('bir_1905' = any (skipped)) then
        codes := array_append(codes, 'I.orus');
      end if;
      if t <> 'individual'
         and changes && array['name', 'rdo_transfer', 'primary_purpose', 'capital_increase', 'capital_decrease', 'directors', 'fiscal_year', 'other_amendment']
         and not ('sec_amendment' = any (skipped)) then
        codes := array_append(codes, 'I.sec_amendment');
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

alter table public.fee_items disable trigger fee_items_guard;

update public.fee_items i
set label = 'Business permit (Iloilo City)', band_label = 'New or renewal · Iloilo City clients only'
from public.fee_schedules s
where s.id = i.schedule_id and s.status in ('draft', 'active') and i.code = 'I.business_permit'
  and not exists (select 1 from public.fee_items g where g.schedule_id = s.id and g.component = 'G'); -- current structure only

insert into public.fee_items (schedule_id, code, component, label, band_label, billing, price, is_custom_quote, unit_label, conditions, sort_order)
select s.id, 'I.sec_amendment', 'I', 'SEC amendment', 'Articles or by-laws: name, purpose, capital, directors, fiscal year and others',
       'one_time', 15000, false, null, '{"taxpayer_types": ["opc", "partnership", "corporation", "non_stock"]}'::jsonb,
       coalesce((select x.sort_order + 5 from public.fee_items x where x.schedule_id = s.id and x.code = 'I.sec'), 495)
from public.fee_schedules s
where s.status in ('draft', 'active')
  and not exists (select 1 from public.fee_items g where g.schedule_id = s.id and g.component = 'G') -- current structure only
  and not exists (select 1 from public.fee_items x where x.schedule_id = s.id and x.code = 'I.sec_amendment');

alter table public.fee_items enable trigger fee_items_guard;

revoke execute on function private.is_iloilo_city(text) from public, anon, authenticated;
revoke execute on function private.registration_case_lgu() from public, anon, authenticated;
revoke execute on function private.registration_fee_jobs(public.registration_cases) from public, anon, authenticated;
