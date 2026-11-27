-- Late-submission surcharge on statements (Q54; Appendix A component J; docs/REWORK.md 16c).
--
-- The fee schedule carries late_surcharge_amount and late_surcharge_auto
-- (20261123000014). Documents sent after the client's cutoff, or for a month the
-- client already confirmed complete, are marked late (documents.late). Now:
--
-- 1. When a client's month gets its first late document, and the brand's active
--    fee schedule has a surcharge amount above zero, one surcharge is raised for
--    that client and month (the month the document is for, documents.document_month).
--    Only documents sent on or after the schedule's effective date count.
--    One surcharge per client per month at most (late_surcharges unique key):
--    more late documents in the same month add nothing.
-- 2. late_surcharge_auto = true: the surcharge goes straight in as a charge
--    ("Late-submission surcharge — November 2026"), so it is in Ready to bill
--    and goes on the next statement as its own line.
--    late_surcharge_auto = false: the surcharge waits for the Owner, who approves
--    it (then it goes in as above) or waives it with a reason.
-- 3. The amount is the schedule's at the time the surcharge is raised. A
--    surcharge already approved is waived like any other item (public.waive_due).

create table public.late_surcharges (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  -- First day of the month the late documents are for.
  month date not null check (extract(day from month) = 1),
  amount numeric(18, 2) not null check (amount > 0),
  schedule_id uuid references public.fee_schedules (id),
  status text not null default 'pending' check (status in ('pending', 'approved', 'waived')),
  -- Approved by the schedule's setting, not by the Owner.
  auto boolean not null default false,
  -- The charge on the client's account once approved.
  due_id uuid unique references public.client_dues (id),
  decided_by uuid references auth.users (id),
  decided_at timestamptz,
  waive_reason text,
  created_at timestamptz not null default now(),
  unique (client_id, month),
  check ((status = 'approved') = (due_id is not null)),
  check ((status = 'waived') = (waive_reason is not null)),
  check ((status = 'pending') = (decided_at is null))
);

create index late_surcharges_pending_idx on public.late_surcharges (created_at) where status = 'pending';

alter table public.late_surcharges enable row level security;
create policy late_surcharges_read on public.late_surcharges for select to authenticated using (private.is_owner());

/** "Late-submission surcharge — November 2026". */
create or replace function private.late_surcharge_description(p_month date) returns text
language sql immutable set search_path = '' as $$
  select 'Late-submission surcharge — ' || trim(to_char(p_month, 'FMMonth YYYY'))
$$;

/** Puts a pending surcharge on the client's account as a charge (Ready to bill, then the next statement). */
create or replace function private.approve_late_surcharge(p_id uuid, p_auto boolean) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  s public.late_surcharges;
  new_due uuid;
  -- An automatic surcharge is raised by whoever sent the late document: record no one.
  actor uuid := case when p_auto then null else auth.uid() end;
begin
  select * into s from public.late_surcharges where id = p_id for update;
  if s.id is null then raise exception 'Surcharge not found' using errcode = 'P0002'; end if;
  if s.status <> 'pending' then raise exception 'This surcharge is already %', s.status using errcode = '22023'; end if;
  insert into public.client_dues (client_id, kind, description, amount, due_on, created_by)
  select s.client_id, 'other', private.late_surcharge_description(s.month), s.amount,
         private.manila_today() + b.soa_payment_days, actor
  from public.clients c join public.brands b on b.id = c.brand_id
  where c.id = s.client_id
  returning id into new_due;
  update public.late_surcharges
    set status = 'approved', due_id = new_due, auto = p_auto, decided_by = actor, decided_at = now()
    where id = s.id;
  return new_due;
end;
$$;

/**
 * Raises the month's surcharge for a late document, if the brand's active fee
 * schedule has one and the month has none yet. Idempotent.
 */
create or replace function private.raise_late_surcharge(p_client uuid, p_month date, p_sent_on date) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_month)::date;
  fs public.fee_schedules;
  sid uuid;
begin
  if exists (select 1 from public.late_surcharges where client_id = p_client and month = m) then
    return null;
  end if;
  select s.* into fs
    from public.clients c join public.fee_schedules s on s.brand_id = c.brand_id and s.status = 'active'
    where c.id = p_client;
  if fs.id is null or coalesce(fs.late_surcharge_amount, 0) <= 0 or p_sent_on < fs.effective_from then
    return null;
  end if;
  insert into public.late_surcharges (client_id, month, amount, schedule_id)
  values (p_client, m, fs.late_surcharge_amount, fs.id)
  on conflict (client_id, month) do nothing
  returning id into sid;
  if sid is not null and fs.late_surcharge_auto then
    perform private.approve_late_surcharge(sid, true);
  end if;
  return sid;
end;
$$;

/** A submission marked late (and sent, not still uploading) raises its month's surcharge. */
create or replace function private.documents_late_surcharge() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.late and not new.prior_year and new.status <> 'uploading' and private.is_submission(new.doc_type) then
    perform private.raise_late_surcharge(new.client_id, new.document_month, (new.created_at at time zone 'Asia/Manila')::date);
  end if;
  return null;
end;
$$;

create trigger late_surcharge after insert or update of late, status, document_month, prior_year, doc_type on public.documents
  for each row execute function private.documents_late_surcharge();

-- The Owner approves a waiting surcharge: it goes in Ready to bill and on the next statement.
create or replace function public.approve_late_surcharge(p_id uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  return private.approve_late_surcharge(p_id, false);
end;
$$;

-- The Owner waives a waiting surcharge, with a reason. It never goes on a statement.
create or replace function public.waive_late_surcharge(p_id uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  s public.late_surcharges;
begin
  perform private.require_owner();
  if nullif(trim(coalesce(p_reason, '')), '') is null then raise exception 'Say why it is waived' using errcode = '22023'; end if;
  select * into s from public.late_surcharges where id = p_id for update;
  if s.id is null then raise exception 'Surcharge not found' using errcode = 'P0002'; end if;
  if s.status = 'approved' then
    raise exception 'This surcharge is already a charge; waive it on the client''s account instead' using errcode = '22023';
  end if;
  if s.status = 'waived' then raise exception 'This surcharge is already waived' using errcode = '22023'; end if;
  update public.late_surcharges
    set status = 'waived', waive_reason = trim(p_reason), decided_by = auth.uid(), decided_at = now()
    where id = s.id;
end;
$$;

revoke execute on function private.late_surcharge_description(date) from public, anon, authenticated;
revoke execute on function private.approve_late_surcharge(uuid, boolean) from public, anon, authenticated;
revoke execute on function private.raise_late_surcharge(uuid, date, date) from public, anon, authenticated;
revoke execute on function private.documents_late_surcharge() from public, anon, authenticated;
revoke execute on function public.approve_late_surcharge(uuid) from public, anon;
revoke execute on function public.waive_late_surcharge(uuid, text) from public, anon;
grant execute on function public.approve_late_surcharge(uuid) to authenticated;
grant execute on function public.waive_late_surcharge(uuid, text) to authenticated;
grant select on public.late_surcharges to authenticated;
