-- Rework phase 4 (docs/REWORK.md, decision 16): the Owner ticks which statement
-- items a verified payment pays, and the tax and contribution money is held as
-- cash for remittance until it is remitted.
--
-- Ticked items. Verifying a proof of payment now takes the items the Owner ticked
-- (p_due_ids). The payment is applied to those items only, oldest first, as
-- record_deposit always did; unticked items stay open and the client can keep
-- paying until they are settled. What is left over is the client's credit, used
-- as before (oldest open item first) on the next billing run or when the Owner
-- applies it. Ticking none keeps the whole payment as credit. A ticked item must
-- be this client's, on a statement, and still open.
--
-- The allocation trigger that posts the dues payment in the client's Books
-- (migration 20261127100004) and the Owner-approval payment check (this return's
-- own item, migration 20261127100003) only read payment_allocations, so they
-- follow the ticked items unchanged.
--
-- An allocation made from credit (apply_credit) is marked from_credit, so a
-- payment shows the items the Owner ticked apart from those its leftover credit
-- paid later.
--
-- Cash for remittance. Money applied to a tax item (a return the firm remits) or a
-- contribution item (SSS, PhilHealth, Pag-IBIG) is the client's money held for the
-- BIR or the agency until remitted:
--   - a tax item is remitted once its return is Filed & paid (status 'filed');
--   - a contribution item is remitted once the Owner records the remittance
--     (date and reference) with mark_contribution_remitted. There was no record of
--     contribution remittances before this migration.
-- public.remittance_items lists each item; public.cash_for_remittance() totals it
-- per client (received, remitted, held).

-- ---------------------------------------------------------------------------
-- Allocations made from credit.
-- ---------------------------------------------------------------------------
alter table public.payment_allocations add column from_credit boolean not null default false;

-- As before (migration 20261123000010), marking what it applies as from credit.
create or replace function private.apply_credit(p_client uuid) returns numeric
language plpgsql security definer set search_path = '' as $$
declare
  due record;
  dep record;
  take numeric(18, 2);
  need numeric(18, 2);
  applied numeric(18, 2) := 0;
begin
  for due in
    select id, open_amount from public.due_balances
    where client_id = p_client and open_amount > 0
    order by due_on, created_at, id
  loop
    need := due.open_amount;
    for dep in
      select id, unallocated from public.deposit_balances
      where client_id = p_client and unallocated > 0
      order by received_on, created_at, id
    loop
      exit when need <= 0;
      take := least(need, dep.unallocated);
      insert into public.payment_allocations (deposit_id, due_id, amount, created_by, from_credit) values (dep.id, due.id, take, auth.uid(), true);
      need := need - take;
      applied := applied + take;
    end loop;
  end loop;
  return applied;
end;
$$;
revoke execute on function private.apply_credit(uuid) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Verify with the ticked items.
-- ---------------------------------------------------------------------------
drop function public.verify_payment_proof(uuid, date, numeric, text);

/**
 * The Owner confirms the money arrived: records it as a deposit applied to the
 * ticked items only (oldest first), and marks the proof Verified. What is left over
 * is the client's credit. The amount and date can be corrected to what the bank shows.
 */
create function public.verify_payment_proof(
  p_proof uuid,
  p_received_on date,
  p_amount numeric,
  p_bir_invoice_number text,
  p_due_ids uuid[]
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  p record;
  dep_id uuid;
  method text;
begin
  perform private.require_owner();
  select * into p from public.payment_proofs where id = p_proof for update;
  if not found then raise exception 'Proof of payment not found' using errcode = 'P0002'; end if;
  if p.status <> 'for_verification' then raise exception 'This proof of payment was already reviewed' using errcode = '22023'; end if;
  if p_due_ids is null then
    raise exception 'Tick the items this payment pays (tick none to keep it all as credit)' using errcode = '22023';
  end if;
  if exists (
    select 1 from unnest(p_due_ids) as x(id)
    where not exists (
      select 1 from public.due_balances d
      where d.id = x.id and d.client_id = p.client_id and d.soa_id is not null and d.open_amount > 0
    )
  ) then
    raise exception 'A ticked item is not open on this client''s statements' using errcode = '22023';
  end if;

  -- A check stays a check; a counter deposit is money into the bank like a transfer.
  if p.method = 'check' then
    method := 'check';
  else
    select case when a.kind = 'ewallet' then 'ewallet' else 'transfer' end into method
      from public.brand_payment_accounts a where a.id = p.payment_account_id;
  end if;

  dep_id := public.record_deposit(
    p.client_id,
    coalesce(p_received_on, p.paid_on),
    coalesce(p_amount, p.amount),
    p.payment_account_id,
    p.reference,
    p_bir_invoice_number,
    'Proof of payment uploaded on the portal',
    p_due_ids,
    coalesce(method, 'transfer'),
    null
  );

  update public.payment_proofs
    set status = 'verified', deposit_id = dep_id, reviewed_by = auth.uid(), reviewed_at = now()
    where id = p_proof;
  return dep_id;
end;
$$;
revoke execute on function public.verify_payment_proof(uuid, date, numeric, text, uuid[]) from public, anon;
grant execute on function public.verify_payment_proof(uuid, date, numeric, text, uuid[]) to authenticated;

-- ---------------------------------------------------------------------------
-- Contribution remittances.
-- ---------------------------------------------------------------------------
alter table public.client_dues
  add column remitted_on date,
  add column remit_reference text,
  add column remitted_by uuid references auth.users (id),
  add constraint client_dues_remitted_contribution check (remitted_on is null or kind = 'contribution'),
  add constraint client_dues_remit_reference check (remitted_on is not null or remit_reference is null);

/** The Owner records that a contribution (SSS, PhilHealth, Pag-IBIG) was remitted to the agency. */
create or replace function public.mark_contribution_remitted(p_due uuid, p_remitted_on date, p_reference text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  d public.client_dues;
begin
  perform private.require_owner();
  select * into d from public.client_dues where id = p_due for update;
  if d.id is null then raise exception 'Item not found' using errcode = 'P0002'; end if;
  if d.kind <> 'contribution' then
    raise exception 'Only a contribution is marked remitted; a return is remitted when it is Filed & paid' using errcode = '22023';
  end if;
  if d.remitted_on is not null then raise exception 'This contribution is already marked remitted' using errcode = '22023'; end if;
  if p_remitted_on is null then raise exception 'Enter the date it was remitted' using errcode = '22023'; end if;
  if p_remitted_on > private.manila_today() then raise exception 'The date remitted cannot be in the future' using errcode = '22023'; end if;
  if length(coalesce(p_reference, '')) > 100 then raise exception 'Keep the reference under 100 characters' using errcode = '22023'; end if;
  update public.client_dues
    set remitted_on = p_remitted_on, remit_reference = nullif(trim(coalesce(p_reference, '')), ''), remitted_by = auth.uid()
    where id = d.id;
end;
$$;

/** Undoes a remittance recorded by mistake: the contribution's money is held again. */
create or replace function public.clear_contribution_remitted(p_due uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  update public.client_dues set remitted_on = null, remit_reference = null, remitted_by = null
    where id = p_due and kind = 'contribution' and remitted_on is not null;
  if not found then raise exception 'Remitted contribution not found' using errcode = 'P0002'; end if;
end;
$$;

revoke execute on function public.mark_contribution_remitted(uuid, date, text) from public, anon;
revoke execute on function public.clear_contribution_remitted(uuid) from public, anon;
grant execute on function public.mark_contribution_remitted(uuid, date, text) to authenticated;
grant execute on function public.clear_contribution_remitted(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Cash for remittance.
-- ---------------------------------------------------------------------------

-- Each tax and contribution item: what the client's verified payments applied to
-- it (received), whether and when it was remitted, and what is still held.
-- security_invoker: the reader's policies decide which rows they see.
create view public.remittance_items with (security_invoker = true) as
with items as (
  select
    d.id as due_id,
    d.client_id,
    d.soa_id,
    d.kind,
    d.description,
    d.amount,
    d.due_on,
    d.filing_instance_id,
    f.status as filing_status,
    coalesce(p.received, 0)::numeric(18, 2) as received,
    case when d.kind = 'tax' then coalesce(f.status = 'filed', false) else d.remitted_on is not null end as remitted,
    case when d.kind = 'tax' then case when f.status = 'filed' then coalesce(f.paid_on, f.filed_on) end else d.remitted_on end as remitted_on,
    d.remit_reference
  from public.client_dues d
  left join public.filing_instances f on f.id = d.filing_instance_id
  left join (select due_id, sum(amount) as received from public.payment_allocations group by due_id) p on p.due_id = d.id
  where d.kind in ('tax', 'contribution')
)
select
  items.*,
  (case when remitted then received else 0 end)::numeric(18, 2) as remitted_amount,
  (case when remitted then 0 else received end)::numeric(18, 2) as held
from items;

/**
 * Cash for remittance per client: money applied to tax and contribution items
 * (received), the part already remitted, and what is still held. Clients with
 * nothing received are left out. p_client limits it to one client. Owner only.
 */
create or replace function public.cash_for_remittance(p_client uuid default null)
returns table (client_id uuid, received numeric, remitted numeric, held numeric)
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.require_owner();
  return query
    select r.client_id, sum(r.received)::numeric(18, 2), sum(r.remitted_amount)::numeric(18, 2), sum(r.held)::numeric(18, 2)
    from public.remittance_items r
    where (p_client is null or r.client_id = p_client) and r.received > 0
    group by r.client_id
    order by sum(r.held) desc, r.client_id;
end;
$$;
revoke execute on function public.cash_for_remittance(uuid) from public, anon;
grant execute on function public.cash_for_remittance(uuid) to authenticated;
