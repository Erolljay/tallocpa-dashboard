-- A retainer month never billed is not lost (docs/REWORK.md, decision 16c;
-- Owner, 25 November 2026).
--
-- Until now Ready to bill listed only the billing month's retainer, so a month
-- the Owner never ran billing in was skipped for good. Now:
--
-- 1. Ready to bill lists every month from the engagement's start month up to
--    and including the billing month whose retainer (the sum of the
--    engagements covering the month, start_date to end_date) is above zero and
--    has no retainer due yet. The billing month has reason 'retainer'; an
--    earlier month has reason 'retainer_unbilled' (shown as "Not billed").
--    Ended engagements count for the months up to their end date, so the last
--    month of an engagement is not lost either.
-- 2. A billing run puts every one of those months on the statement, each as its
--    own retainer due with its own period_month and description
--    ("Monthly retainer, October 2026"), open until paid.
-- 3. A month with a retainer due already, billed or waived, is never billed
--    again (client_dues_one_retainer_per_month). Months before an engagement's
--    start or after its end are not billed, nor months after the billing date.
--
-- private.ready_to_bill gains a period_month column (the month a retainer row
-- is for), so it is dropped and created again; public.ready_to_bill keeps its
-- signature and lists the retainer months oldest first.

drop function if exists private.ready_to_bill(date, uuid);

create function private.ready_to_bill(p_date date, p_client uuid default null)
returns table (
  client_id uuid,
  kind text,
  description text,
  amount numeric(18, 2),
  reason text,
  days_to_due integer,
  filing_instance_id uuid,
  due_id uuid,
  period_month date
)
language sql stable security definer set search_path = '' as $$
  -- Every retainer month up to the billing month not yet billed (or waived).
  select rm.client_id, 'retainer', 'Monthly retainer, ' || trim(to_char(rm.first_day, 'FMMonth YYYY')),
         rm.amount, case when rm.first_day = date_trunc('month', p_date)::date then 'retainer' else 'retainer_unbilled' end,
         null::integer, null::uuid, null::uuid, rm.first_day
  from (
    select e.client_id, m.first_day::date as first_day, sum(e.monthly_retainer)::numeric(18, 2) as amount
    from public.engagements e
    cross join lateral generate_series(
      date_trunc('month', e.start_date),
      date_trunc('month', least(coalesce(e.end_date, p_date), p_date)),
      interval '1 month'
    ) as m (first_day)
    where (p_client is null or e.client_id = p_client)
      and (e.status = 'active' or e.end_date is not null)
      and e.start_date <= p_date
    group by e.client_id, m.first_day
    having sum(e.monthly_retainer) > 0
  ) rm
  where not exists (
    select 1 from public.client_dues d where d.client_id = rm.client_id and d.kind = 'retainer' and d.period_month = rm.first_day
  )

  union all

  -- Returns the firm remits: approved by the client, or reviewed and two days or less from the BIR deadline.
  select f.client_id, 'tax', 'Tax due, ' || f.form || ' ' || f.period_label, f.tax_due::numeric(18, 2),
         case when f.status = 'reviewed' then 'due_soon' else 'client_approved' end,
         (f.due_date - p_date)::integer, f.id, null::uuid, null::date
  from public.filing_instances f
  join public.clients cl on cl.id = f.client_id
  where (p_client is null or f.client_id = p_client)
    and cl.payment_mode = 'firm_remits'
    and coalesce(f.tax_due, 0) > 0
    and (f.status in ('client_approved', 'owner_approved', 'filed') or (f.status = 'reviewed' and p_date >= f.due_date - 2))
    and not exists (select 1 from public.client_dues d where d.filing_instance_id = f.id)

  union all

  -- Contributions and other charges entered and not yet on a statement.
  select d.client_id, d.kind, d.description, d.amount, 'charge', null::integer, null::uuid, d.id, null::date
  from public.client_dues d
  where (p_client is null or d.client_id = p_client) and d.soa_id is null and d.waived_at is null
$$;

-- One billing run for one client, as in 20261208000001, but every unbilled
-- retainer month goes on the statement, each as its own due.
create or replace function private.bill_client(p_client uuid, p_billing_date date) returns boolean
language plpgsql security definer set search_path = '' as $$
declare
  c record;
  s public.soas;
  changed integer := 0;
  n integer;
begin
  select cl.id, cl.code, cl.payment_mode, b.soa_payment_days into c
    from public.clients cl join public.brands b on b.id = cl.brand_id
    where cl.id = p_client;
  if c.id is null then raise exception 'Client not found' using errcode = 'P0002'; end if;

  if c.payment_mode = 'firm_remits' then
    -- A return re-prepared with a different tax due updates its due, if no more than that is paid.
    update public.client_dues d set amount = f.tax_due
      from public.filing_instances f, public.due_balances b
      where d.filing_instance_id = f.id and b.id = d.id and d.client_id = c.id and d.waived_at is null
        and f.tax_due > 0 and d.amount <> f.tax_due and f.tax_due >= b.paid;
    get diagnostics n = row_count;
    changed := changed + n;
  end if;

  select * into s from public.soas where client_id = c.id and billing_date = p_billing_date;
  -- A statement only when there is something on it.
  if s.id is null and exists (select 1 from private.ready_to_bill(p_billing_date, c.id)) then
    insert into public.soas (client_id, billing_date, reference, due_on, created_by)
    values (c.id, p_billing_date, c.code || '-' || to_char(p_billing_date, 'YYYY-MM-DD'), p_billing_date + c.soa_payment_days, auth.uid())
    returning * into s;
    changed := changed + 1;
  end if;
  if s.id is null then
    return changed > 0;
  end if;

  -- Every retainer month not yet billed goes on the same statement, each its own due.
  insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on, period_month, created_by)
  select c.id, s.id, 'retainer', r.description, r.amount, s.due_on, r.period_month, auth.uid()
  from private.ready_to_bill(p_billing_date, c.id) r
  where r.kind = 'retainer'
  order by r.period_month;
  get diagnostics n = row_count;
  changed := changed + n;

  insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on, filing_instance_id, created_by)
  select c.id, s.id, 'tax', r.description, r.amount, f.due_date, f.id, auth.uid()
  from private.ready_to_bill(p_billing_date, c.id) r
  join public.filing_instances f on f.id = r.filing_instance_id
  where r.kind = 'tax';
  get diagnostics n = row_count;
  changed := changed + n;

  -- Contributions and other charges entered since the last statement.
  update public.client_dues set soa_id = s.id where client_id = c.id and soa_id is null and waived_at is null;
  get diagnostics n = row_count;
  changed := changed + n;

  if private.apply_credit(c.id) > 0 then changed := changed + 1; end if;
  return changed > 0;
end;
$$;

-- The Owner's Ready to bill list: as in 20261208000001, retainer months oldest first.
create or replace function public.ready_to_bill(p_date date default null)
returns table (
  client_id uuid,
  client_code text,
  client_name text,
  kind text,
  description text,
  amount numeric(18, 2),
  reason text,
  days_to_due integer,
  filing_instance_id uuid,
  due_id uuid
)
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.require_owner();
  return query
    select r.client_id, cl.code, cl.name, r.kind, r.description, r.amount, r.reason, r.days_to_due, r.filing_instance_id, r.due_id
    from private.ready_to_bill(coalesce(p_date, private.manila_today())) r
    join public.clients cl on cl.id = r.client_id
    where cl.status in ('onboarding', 'active')
    order by cl.name, cl.code,
      case r.kind when 'retainer' then 0 when 'tax' then 1 else 2 end,
      r.period_month nulls last, r.days_to_due nulls last, r.description;
end;
$$;

revoke execute on function private.ready_to_bill(date, uuid) from public, anon, authenticated;
