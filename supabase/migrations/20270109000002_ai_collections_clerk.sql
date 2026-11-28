-- AI employees: what the Collections Clerk reads (docs/AI-WORKFORCE.md §3, §6, §7.2).
--
-- The firm's receivables (statements, dues, deposits, payment proofs) are the Owner's
-- alone: staff cannot read them (20261123000010). No table is opened to AI employees
-- here. Instead, four read-only functions hand the Collections Clerk only what its job
-- needs (amounts, dates, statuses, statement references), and only while it is switched
-- on, allowed client data, and only for its clients:
--
--   * public.ai_receivables(): its clients' billed items still open (on a statement,
--     not paid in full, not waived), each with its statement, the client's unused
--     credit, and whether the client has uploaded a payment proof still waiting for
--     the Owner (so it does not chase a client who has paid);
--   * public.ai_client_payments(client, since): one client's billed items since a date
--     (with the date each was paid in full), its payments (date, amount, method, voided)
--     and its credit; no bank account, reference number, BIR invoice number or notes;
--   * public.ai_ready_to_bill(date): what a billing run would bill for its current
--     (onboarding or active) clients, the Owner's Ready to bill list narrowed to them;
--   * public.ai_collections_rows(from, to, client): for the collections summary, the
--     items billed on statements dated in the period, what payments received in the
--     period paid (item by item, as the Owner applied them), and what of those payments
--     is not yet applied: kind, contribution agency, description and amount only.
--
-- No contact details are returned: a reminder is a draft the Owner reads and sends
-- himself (through the statement's share link), so the Clerk needs no email or phone.
--
-- Only the AI employee with key 'collections_clerk' may call them, because receivables
-- are closed even to staff; another AI employee with client data is refused.
-- Reminders are saved through ai_save_draft() (20270108000001) with no client_id, so
-- only the Owner reads and decides them (ai_drafts_staff_read and decide_ai_draft open
-- client-less drafts to the Owner only); the Clerk's tool checks the client is its own.

create or replace function private.ai_collections_caller() returns public.ai_employees
language sql stable security definer set search_path = '' as $$
  select e.* from public.ai_employees e
  where e.user_id = auth.uid() and e.enabled and e.client_data and e.key = 'collections_clerk'
$$;

create or replace function public.ai_receivables()
returns table (
  client_id uuid,
  client_code text,
  client_name text,
  client_status text,
  due_id uuid,
  statement text,
  statement_date date,
  kind text,
  description text,
  due_on date,
  amount numeric(18, 2),
  paid numeric(18, 2),
  open_amount numeric(18, 2),
  client_credit numeric(18, 2),
  proof_waiting boolean
)
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_collections_caller();
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Collections Clerk can read receivables' using errcode = '42501';
  end if;
  return query
    select c.id, c.code, c.name, c.status, d.id, s.reference, s.billing_date, d.kind, d.description, d.due_on,
           d.amount, d.paid, d.open_amount,
           coalesce((select sum(b.unallocated) from public.deposit_balances b where b.client_id = c.id), 0)::numeric(18, 2),
           exists (select 1 from public.payment_proofs p where p.soa_id = s.id and p.status = 'for_verification')
    from public.due_balances d
    join public.soas s on s.id = d.soa_id
    join public.clients c on c.id = d.client_id
    where d.client_id = any (private.ai_client_ids()) and d.open_amount > 0
    order by d.due_on, c.name, s.reference, d.description;
end;
$$;

create or replace function public.ai_client_payments(p_client uuid, p_since date) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_collections_caller();
  out jsonb;
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Collections Clerk can read payment history' using errcode = '42501';
  end if;
  if not (p_client = any (private.ai_client_ids())) then
    raise exception 'Not one of your clients' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'billed', coalesce((
      select jsonb_agg(jsonb_build_object(
        'statement', s.reference, 'statement_date', s.billing_date, 'kind', d.kind, 'description', d.description,
        'due_on', d.due_on, 'amount', d.amount, 'paid', d.paid, 'open', d.open_amount, 'waived', d.waived_at is not null,
        'paid_in_full_on', case when d.waived_at is null and d.open_amount = 0 then (
          select max(dep.received_on) from public.payment_allocations a
          join public.client_deposits dep on dep.id = a.deposit_id
          where a.due_id = d.id and dep.voided_at is null
        ) end
      ) order by d.due_on, s.reference, d.description)
      from public.due_balances d join public.soas s on s.id = d.soa_id
      where d.client_id = p_client and s.billing_date >= p_since
    ), '[]'::jsonb),
    'payments', coalesce((
      select jsonb_agg(jsonb_build_object('received_on', dep.received_on, 'amount', dep.amount, 'method', dep.method, 'voided', dep.voided_at is not null)
        order by dep.received_on, dep.created_at)
      from public.client_deposits dep
      where dep.client_id = p_client and dep.received_on >= p_since
    ), '[]'::jsonb),
    'credit', coalesce((select sum(b.unallocated) from public.deposit_balances b where b.client_id = p_client), 0),
    'proofs_waiting', (select count(*) from public.payment_proofs p where p.client_id = p_client and p.status = 'for_verification')
  ) into out;
  return out;
end;
$$;

create or replace function public.ai_ready_to_bill(p_date date default null)
returns table (
  client_id uuid,
  client_code text,
  client_name text,
  kind text,
  description text,
  amount numeric(18, 2),
  reason text,
  days_to_due integer
)
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_collections_caller();
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Collections Clerk can read what is ready to bill' using errcode = '42501';
  end if;
  return query
    select r.client_id, cl.code, cl.name, r.kind, r.description, r.amount, r.reason, r.days_to_due
    from private.ready_to_bill(coalesce(p_date, private.manila_today())) r
    join public.clients cl on cl.id = r.client_id
    where cl.status in ('onboarding', 'active') and r.client_id = any (private.ai_client_ids())
    order by cl.name, cl.code,
      case r.kind when 'retainer' then 0 when 'tax' then 1 else 2 end,
      r.days_to_due nulls last, r.description;
end;
$$;

create or replace function public.ai_collections_rows(p_from date, p_to date, p_client uuid default null)
returns table (source text, client_id uuid, kind text, contribution text, description text, amount numeric(18, 2))
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_collections_caller();
  mine uuid[];
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Collections Clerk can read collections' using errcode = '42501';
  end if;
  mine := private.ai_client_ids();
  if p_client is not null and not (p_client = any (mine)) then
    raise exception 'Not one of your clients' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_to < p_from or p_to - p_from > 400 then
    raise exception 'Give a period of at most 400 days' using errcode = '22023';
  end if;
  return query
    -- Billed: items on statements dated in the period (waived items left out).
    select 'billed', d.client_id, d.kind, d.contribution, d.description, d.amount
    from public.client_dues d join public.soas s on s.id = d.soa_id
    where s.billing_date between p_from and p_to and d.waived_at is null
      and d.client_id = any (mine) and (p_client is null or d.client_id = p_client)
    union all
    -- Collected: what each payment received in the period paid, item by item.
    select 'collected', dep.client_id, d.kind, d.contribution, d.description, a.amount
    from public.payment_allocations a
    join public.client_deposits dep on dep.id = a.deposit_id
    join public.client_dues d on d.id = a.due_id
    where dep.received_on between p_from and p_to and dep.voided_at is null
      and dep.client_id = any (mine) and (p_client is null or dep.client_id = p_client)
    union all
    -- Received in the period and not yet applied to an item (the client's credit).
    select 'unapplied', b.client_id, 'unapplied', null::text, 'Not yet applied', b.unallocated
    from public.deposit_balances b
    where b.received_on between p_from and p_to and b.voided_at is null and b.unallocated > 0
      and b.client_id = any (mine) and (p_client is null or b.client_id = p_client);
end;
$$;

revoke all on function private.ai_collections_caller() from public;
revoke all on function public.ai_receivables() from public;
revoke all on function public.ai_client_payments(uuid, date) from public;
revoke all on function public.ai_ready_to_bill(date) from public;
revoke all on function public.ai_collections_rows(date, date, uuid) from public;
grant execute on function private.ai_collections_caller() to authenticated;
grant execute on function public.ai_receivables() to authenticated;
grant execute on function public.ai_client_payments(uuid, date) to authenticated;
grant execute on function public.ai_ready_to_bill(date) to authenticated;
grant execute on function public.ai_collections_rows(date, date, uuid) to authenticated;
