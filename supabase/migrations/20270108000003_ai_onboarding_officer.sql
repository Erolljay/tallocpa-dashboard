-- AI employees, step 3: what the Onboarding Officer reads (docs/AI-WORKFORCE.md §3, §7.2).
--
-- No table is opened to AI employees here. The onboarding checklist is computed by the
-- app's own pure code (src/lib/onboarding/checklist.ts) from a handful of facts; instead
-- of granting the dozen tables those facts come from (client files, proposals, portal
-- users' sign-ins, staff assignments, books, batches, employees …), two read-only
-- functions hand an AI employee only the facts, and only while it is switched on and
-- allowed the client:
--
--   * public.ai_onboarding_facts(client): the checklist facts of one of its clients
--     (counts, dates and yes/no only: no file names, no people's names or emails), the
--     COR's tax types and registration date, the engagements and the accepted
--     proposal's retainer;
--   * public.ai_staff_load(): for suggesting a team, each active member of staff of its
--     brand with role, branch, capacity and current load (monthly retainers of current
--     clients ÷ ₱1,000, as the Staff page counts it): no emails, no user ids.
--
-- Both refuse anyone who is not a switched-on AI employee allowed client data. Drafts
-- the Onboarding Officer prepares go through ai_save_draft() (20270108000001).

create or replace function private.ai_caller_with_client_data() returns public.ai_employees
language sql stable security definer set search_path = '' as $$
  select e.* from public.ai_employees e where e.user_id = auth.uid() and e.enabled and e.client_data
$$;

create or replace function public.ai_onboarding_facts(p_client uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_caller_with_client_data();
  facts jsonb;
begin
  if me.user_id is null then
    raise exception 'Only a switched-on AI employee with client data can read onboarding facts' using errcode = '42501';
  end if;
  if not (p_client = any (private.ai_client_ids())) then
    raise exception 'Not one of your clients' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'client_id', c.id,
    'status', c.status,
    'fiscal_year_end_month', c.fiscal_year_end_month,
    'files', jsonb_build_object(
      'proposal', (select count(*) from public.client_files f where f.client_id = c.id and f.kind = 'proposal') + (case when acc.id is null then 0 else 1 end),
      'contract', (select count(*) from public.client_files f where f.client_id = c.id and f.kind = 'contract') + (case when acc.id is null then 0 else 1 end),
      'contract_signed', acc.id is not null or exists (select 1 from public.client_files f where f.client_id = c.id and f.kind = 'contract' and f.signed_on is not null)
    ),
    'engagement_active', exists (select 1 from public.engagements e where e.client_id = c.id and e.status = 'active'),
    'engagements', coalesce((
      select jsonb_agg(jsonb_build_object('service_line', e.service_line, 'monthly_retainer', e.monthly_retainer, 'status', e.status, 'start_date', e.start_date) order by e.start_date)
      from public.engagements e where e.client_id = c.id
    ), '[]'::jsonb),
    'accepted_proposal', case when acc.id is null then null else jsonb_build_object('accepted_on', acc.accepted_at::date, 'monthly_retainer', acc.monthly_retainer) end,
    'tax_types', coalesce(reg.tax_types, '[]'::jsonb),
    'registration_date', reg.registration_date,
    'obligations', (select count(*) from public.obligations o where o.client_id = c.id),
    'has_payroll_obligation', exists (select 1 from public.obligations o where o.client_id = c.id and o.form = '1601-C'),
    'preparer', exists (select 1 from public.staff_assignments a where a.client_id = c.id and a.role = 'preparer'),
    'reviewer', exists (select 1 from public.staff_assignments a where a.client_id = c.id and a.role = 'reviewer'),
    'portal_users', (select count(*) from public.client_users u where u.client_id = c.id),
    'portal_signed_in', exists (select 1 from public.client_users u join auth.users au on au.id = u.user_id where u.client_id = c.id and au.last_sign_in_at is not null),
    'books_start', (select b.books_start from public.client_books b where b.client_id = c.id),
    'opening_posted', exists (select 1 from public.journal_entries j where j.client_id = c.id and j.source = 'opening' and j.status = 'posted'),
    'batch_uploads', (select count(*) from public.batch_uploads bu where bu.client_id = c.id),
    'employees', (select count(*) from public.employees em where em.client_id = c.id),
    'ticks', coalesce((select jsonb_agg(jsonb_build_object('item', t.item, 'at', t.done_at::date, 'note', t.note)) from public.onboarding_ticks t where t.client_id = c.id), '[]'::jsonb)
  )
  into facts
  from public.clients c
  left join lateral (
    select p.id, p.accepted_at, p.monthly_retainer
    from public.proposals p join public.leads l on l.id = p.lead_id
    where l.client_id = c.id and p.status = 'accepted'
    order by p.accepted_at desc limit 1
  ) acc on true
  left join lateral (
    select r.tax_types, r.registration_date from public.client_registrations r where r.client_id = c.id order by r.created_at desc limit 1
  ) reg on true
  where c.id = p_client;
  return facts;
end;
$$;

create or replace function public.ai_staff_load()
returns table (full_name text, role text, branch text, capacity_points numeric, load_points numeric, clients integer)
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_caller_with_client_data();
begin
  if me.user_id is null then
    raise exception 'Only a switched-on AI employee with client data can read staff load' using errcode = '42501';
  end if;
  return query
    select sp.full_name, sp.role, b.name, sp.capacity_points,
           coalesce((
             select round(sum(e.monthly_retainer) / 1000, 2)
             from (select distinct a.client_id from public.staff_assignments a
                   join public.clients c on c.id = a.client_id and c.status in ('onboarding', 'active')
                   where a.user_id = sp.user_id) mine
             join public.engagements e on e.client_id = mine.client_id and e.status = 'active'
           ), 0) as load_points,
           (select count(distinct a.client_id)::integer from public.staff_assignments a
            join public.clients c on c.id = a.client_id and c.status in ('onboarding', 'active')
            where a.user_id = sp.user_id) as clients
    from public.staff_profiles sp
    left join public.branches b on b.id = sp.branch_id
    where sp.active and sp.brand_id = me.brand_id
    order by sp.role, sp.full_name;
end;
$$;

revoke all on function private.ai_caller_with_client_data() from public;
revoke all on function public.ai_onboarding_facts(uuid) from public;
revoke all on function public.ai_staff_load() from public;
grant execute on function private.ai_caller_with_client_data() to authenticated;
grant execute on function public.ai_onboarding_facts(uuid) to authenticated;
grant execute on function public.ai_staff_load() to authenticated;
