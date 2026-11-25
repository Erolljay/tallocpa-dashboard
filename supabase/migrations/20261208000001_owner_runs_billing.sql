-- The Owner runs billing (docs/REWORK.md, decision 16c; Owner, 25 November 2026).
--
-- This replaces the billing behaviour described at the top of migration
-- 20261123000010_collections.sql. What changes:
--
-- 1. Nothing is billed automatically. The nightly job no longer issues
--    statements: public.run_scheduled_billing is kept only so an older deploy
--    calling it does no harm, and now does nothing. The clients' billing_days
--    no longer trigger anything; the column is kept (unused, not shown) so no
--    data is lost, and public.set_billing_days is dropped.
--
-- 2. When a return's tax is ready to bill (firm-remits clients only). A return
--    with tax due above zero is billable once the client has approved it
--    (client_approved, owner_approved or filed), or, while it is reviewed but
--    not yet approved, from two days before its BIR deadline
--    (billing date >= filing_instances.due_date - 2), whichever comes first. A
--    nil or zero-tax return is never billed. Dates are Manila dates: the
--    billing date defaults to private.manila_today() on the screens.
--
-- 3. Ready to bill. private.ready_to_bill(date, client) lists, per client, what
--    a billing run on that date would put on a statement: the returns now
--    billable and not yet billed (reason 'client_approved' or 'due_soon', with
--    the days to the BIR deadline), contributions and charges not yet on a
--    statement ('charge'), and the month's retainer if not yet billed
--    ('retainer'). A client with only the retainer to bill is listed from the
--    1st of the month, so retainers are never missed. public.ready_to_bill is
--    the Owner's view of it, for active and onboarding clients.
--
-- 4. Running billing. public.run_billing(date, client) bills one client, or,
--    without a client, every active or onboarding client in Ready to bill on
--    that date ("Run billing for all ready"). A run issues (or tops up) that
--    day's statement with everything in Ready to bill for the client, the
--    month's retainer included when not yet billed, then applies the client's
--    credit. Unchanged: a re-prepared return's tax due updates its existing due
--    if no more than the new amount is paid; the reference format
--    (code-YYYY-MM-DD, one statement per client per billing date); ticked
--    allocation (20261201000001); the payment check (20261127100003).

-- ---------------------------------------------------------------------------
-- What is ready to bill.
-- ---------------------------------------------------------------------------
create or replace function private.ready_to_bill(p_date date, p_client uuid default null)
returns table (
  client_id uuid,
  kind text,
  description text,
  amount numeric(18, 2),
  reason text,
  days_to_due integer,
  filing_instance_id uuid,
  due_id uuid
)
language sql stable security definer set search_path = '' as $$
  with month as (
    select date_trunc('month', p_date)::date as first_day,
           (date_trunc('month', p_date) + interval '1 month - 1 day')::date as last_day
  )
  -- The month's retainer, when not yet billed.
  select e.client_id, 'retainer', 'Monthly retainer, ' || trim(to_char(m.first_day, 'FMMonth YYYY')),
         sum(e.monthly_retainer)::numeric(18, 2), 'retainer', null::integer, null::uuid, null::uuid
  from public.engagements e cross join month m
  where (p_client is null or e.client_id = p_client)
    and e.status = 'active' and e.start_date <= m.last_day and (e.end_date is null or e.end_date >= m.first_day)
    and not exists (select 1 from public.client_dues d where d.client_id = e.client_id and d.kind = 'retainer' and d.period_month = m.first_day)
  group by e.client_id, m.first_day
  having sum(e.monthly_retainer) > 0

  union all

  -- Returns the firm remits: approved by the client, or reviewed and two days or less from the BIR deadline.
  select f.client_id, 'tax', 'Tax due, ' || f.form || ' ' || f.period_label, f.tax_due::numeric(18, 2),
         case when f.status = 'reviewed' then 'due_soon' else 'client_approved' end,
         (f.due_date - p_date)::integer, f.id, null::uuid
  from public.filing_instances f
  join public.clients cl on cl.id = f.client_id
  where (p_client is null or f.client_id = p_client)
    and cl.payment_mode = 'firm_remits'
    and coalesce(f.tax_due, 0) > 0
    and (f.status in ('client_approved', 'owner_approved', 'filed') or (f.status = 'reviewed' and p_date >= f.due_date - 2))
    and not exists (select 1 from public.client_dues d where d.filing_instance_id = f.id)

  union all

  -- Contributions and other charges entered and not yet on a statement.
  select d.client_id, d.kind, d.description, d.amount, 'charge', null::integer, null::uuid, d.id
  from public.client_dues d
  where (p_client is null or d.client_id = p_client) and d.soa_id is null and d.waived_at is null
$$;

-- ---------------------------------------------------------------------------
-- One billing run for one client: as in 20261123000010, but billing what
-- private.ready_to_bill lists. Returns true when the statement was created or
-- changed (or a due updated, or credit applied).
-- ---------------------------------------------------------------------------
create or replace function private.bill_client(p_client uuid, p_billing_date date) returns boolean
language plpgsql security definer set search_path = '' as $$
declare
  c record;
  m date := date_trunc('month', p_billing_date)::date;
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

  -- The month's retainer goes on the same statement, when not yet billed.
  insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on, period_month, created_by)
  select c.id, s.id, 'retainer', r.description, r.amount, s.due_on, m, auth.uid()
  from private.ready_to_bill(p_billing_date, c.id) r
  where r.kind = 'retainer';
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

-- "Run billing for all ready": every active or onboarding client with something
-- ready to bill on the date. Billing days no longer matter.
create or replace function private.run_billing(p_billing_date date) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  c record;
  touched integer := 0;
begin
  for c in
    select cl.id from public.clients cl
    where cl.status in ('onboarding', 'active')
      and exists (select 1 from private.ready_to_bill(p_billing_date, cl.id))
    order by cl.code
  loop
    if private.bill_client(c.id, p_billing_date) then touched := touched + 1; end if;
  end loop;
  return touched;
end;
$$;

-- Runs billing (Owner only): one client, or every client ready to bill on that date.
-- Returns the number of statements created or changed.
create or replace function public.run_billing(p_billing_date date, p_client uuid default null) returns integer
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  if p_billing_date is null then raise exception 'Choose the billing date' using errcode = '22023'; end if;
  if p_client is not null then
    return case when private.bill_client(p_client, p_billing_date) then 1 else 0 end;
  end if;
  return private.run_billing(p_billing_date);
end;
$$;

-- Billing is no longer automatic: the nightly job does not call this any more,
-- and an older deploy that still does issues nothing.
create or replace function public.run_scheduled_billing(p_billing_date date) returns integer
language sql stable set search_path = '' as $$
  select 0
$$;

-- The Owner's Ready to bill list (Collections, Home), as of a Manila date (today by default).
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
      r.days_to_due nulls last, r.description;
end;
$$;

drop function if exists public.set_billing_days(uuid, smallint[]);
comment on column public.clients.billing_days is
  'Unused since 20261208000001 (decision 16c): the Owner runs billing from Ready to bill; billing days no longer trigger statements.';

revoke execute on function private.ready_to_bill(date, uuid) from public, anon, authenticated;
revoke execute on function private.bill_client(uuid, date) from public, anon, authenticated;
revoke execute on function private.run_billing(date) from public, anon, authenticated;
revoke execute on function public.run_billing(date, uuid) from public, anon;
grant execute on function public.run_billing(date, uuid) to authenticated;
revoke execute on function public.run_scheduled_billing(date) from public, anon, authenticated;
grant execute on function public.run_scheduled_billing(date) to service_role;
revoke execute on function public.ready_to_bill(date) from public, anon;
grant execute on function public.ready_to_bill(date) to authenticated;
