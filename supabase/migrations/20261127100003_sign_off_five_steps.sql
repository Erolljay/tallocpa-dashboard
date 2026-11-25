-- Rework phase 3 (docs/REWORK.md, decisions 13–15): the sign-off chain in five steps.
--
--   Prepared → Reviewed → Client approved → Owner approved → Filed & paid
--
-- - Nil returns (tax due 0) skip the client's approval: reviewing one moves it to
--   client_approved, recorded as skipped.
-- - The Owner (or the acting approver, within their limits) approves only once the
--   client's payment for THIS return's own statement item is verified: the tax due on
--   the return's item in Collections is fully paid. Other balances (the retainer) are
--   shown, not checked. A return with nothing for the firm to collect (nil, or a client
--   who pays the BIR directly) has nothing to check. The Owner's "approve even though
--   unpaid" is gone.
-- - Filed & paid is one step: the filing reference and date, the payment reference and
--   date (when tax is due), and the ONE scanned copy (filing_files, kind filed_copy).
--   It then posts what the return closes in the client's Books (private.on_return_filed,
--   migration 20261127100004).
-- - The Owner's approval records whether the return has DAT attachments for eSubmission
--   (from the worksheet: p_data.dat_files).
-- - A return is prepared only once the Books of its period are locked (decision 10).
--   Unlocking a month sends the unfiled returns that cover it back to Not started, so
--   the five steps restart on the corrected Books; a filed return is flagged for an
--   amended return (migration 20261126000005), which starts at Not started.
--
-- Existing returns move to the nearest new step: Filed, Paid and Proof sent become
-- Filed & paid ('filed'); a nil return waiting for the client's approval moves past it.

-- ---------------------------------------------------------------------------
-- Existing returns.
-- ---------------------------------------------------------------------------
insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
select id, status, 'filed', null, 'Sign-off in five steps: ' || case status when 'paid' then 'Paid' else 'Proof sent' end || ' is now Filed & paid',
       'migrate', jsonb_build_object('from', status)
from public.filing_instances where status in ('paid', 'proof_uploaded');
update public.filing_instances set status = 'filed' where status in ('paid', 'proof_uploaded');

insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
select id, 'reviewed', 'client_approved', null, 'Nil return: the client''s approval is not needed', 'skip_client_approval', jsonb_build_object('nil', true)
from public.filing_instances where status = 'reviewed' and tax_due = 0 and open_query is null;
update public.filing_instances set status = 'client_approved' where status = 'reviewed' and tax_due = 0 and open_query is null;

alter table public.filing_instances drop constraint filing_instances_status_check;
alter table public.filing_instances add constraint filing_instances_status_check
  check (status in ('not_started', 'prepared', 'reviewed', 'client_approved', 'owner_approved', 'filed'));

-- ---------------------------------------------------------------------------
-- The payment check: this return's own item.
-- ---------------------------------------------------------------------------
create or replace function private.payment_check(p_filing uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  f public.filing_instances;
  mode text;
  tax_amount numeric(18, 2) := 0;
  tax_paid numeric(18, 2) := 0;
  tax_status text := 'not_applicable';
  billed boolean := false;
  other_open numeric(18, 2);
begin
  select * into f from public.filing_instances where id = p_filing;
  select payment_mode into mode from public.clients where id = f.client_id;
  if mode = 'firm_remits' and coalesce(f.tax_due, 0) > 0 then
    tax_amount := f.tax_due;
    select coalesce(sum(paid), 0), count(*) > 0 into tax_paid, billed
      from public.due_balances where filing_instance_id = f.id and waived_at is null;
    tax_status := case when tax_paid >= tax_amount then 'paid' when tax_paid > 0 then 'partial' else 'unpaid' end;
  end if;
  -- Shown beside the check, not part of it (decision 13).
  select coalesce(sum(open_amount), 0) into other_open from public.due_balances
    where client_id = f.client_id and kind <> 'tax' and open_amount > 0 and due_on <= private.manila_today();
  return jsonb_build_object(
    'status', tax_status,
    'tax_status', tax_status,
    'tax_due', tax_amount,
    'tax_paid', tax_paid,
    'billed', billed,
    'other_open', other_open
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- Helpers.
-- ---------------------------------------------------------------------------

/** Every month of the return's period is locked in the Books (true when it keeps no books). */
create or replace function private.filing_books_locked(p_filing uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select case
    when not (f.form = any (private.book_lock_forms())) then true
    when b.client_id is null then true
    else not exists (
      select 1 from generate_series(date_trunc('month', greatest(f.period_start, b.books_start)), date_trunc('month', f.period_end), interval '1 month') g
      where private.books_locked_by(f.client_id, g::date) is null)
  end
  from public.filing_instances f
  left join public.client_books b on b.client_id = f.client_id
  where f.id = p_filing
$$;

/** What a return closes in the client's Books once Filed & paid (migration 20261127100004). */
create or replace function private.on_return_filed(p_filing uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  null;
end;
$$;

-- ---------------------------------------------------------------------------
-- The chain.
-- ---------------------------------------------------------------------------
create or replace function public.advance_filing(
  p_filing uuid,
  p_action text,
  p_note text default null,
  p_data jsonb default '{}'::jsonb
) returns public.filing_instances
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  owner boolean := private.is_owner();
  acting public.acting_approver_delegations;
  note text := nullif(trim(coalesce(p_note, '')), '');
  data jsonb := coalesce(p_data, '{}'::jsonb);
  next_status text;
  prior_status text;
  preparer uuid;
  nil boolean;
  dat text[];
begin
  select * into f from public.filing_instances where id = p_filing for update;
  if f.id is null then
    raise exception 'Filing not found' using errcode = 'P0002';
  end if;
  prior_status := f.status;
  nil := coalesce(f.tax_due, -1) = 0;
  if not owner and p_action = 'owner_approve' then
    acting := private.acting_delegation();
  end if;
  if not (private.can_access_client(f.client_id) or acting.id is not null) then
    raise exception 'You do not have access to this client' using errcode = '42501';
  end if;

  if p_action = 'prepare' then
    if f.status <> 'not_started' then raise exception 'Only a return not yet started can be marked prepared' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can prepare the return' using errcode = '42501'; end if;
    if (data ->> 'tax_due') is null then raise exception 'Enter the tax due on the return (0 if none)' using errcode = '22023'; end if;
    if (data ->> 'tax_due')::numeric < 0 then raise exception 'The tax due cannot be negative' using errcode = '22023'; end if;
    if not coalesce(private.filing_books_locked(f.id), true) then
      raise exception 'The Books for this return''s period are still open: the reviewer locks every month first' using errcode = '22023';
    end if;
    update public.filing_instances set tax_due = (data ->> 'tax_due')::numeric where id = f.id;
    next_status := 'prepared';

  elsif p_action = 'review' then
    if f.status <> 'prepared' then raise exception 'Only a prepared return can be reviewed' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id, 'reviewer')) then raise exception 'Only the client''s reviewer or the Owner can review' using errcode = '42501'; end if;
    -- Nobody reviews their own work, except the Owner (who signs off last anyway).
    select actor into preparer from public.filing_events
      where filing_instance_id = f.id and action = 'prepare' order by created_at desc, id desc limit 1;
    if not owner and preparer = auth.uid() then raise exception 'You prepared this return; another person must review it' using errcode = '42501'; end if;
    if nil then
      -- A nil return skips the client's approval (decision 13).
      update public.filing_instances set open_query = null where id = f.id;
      data := data || jsonb_build_object('client_approval', 'skipped', 'nil', true);
      next_status := 'client_approved';
    else
      next_status := 'reviewed';
    end if;

  elsif p_action = 'kick_back' then
    if f.status not in ('prepared', 'reviewed', 'client_approved') then
      raise exception 'Only a return not yet approved by the Owner can be sent back' using errcode = '22023';
    end if;
    if not (owner or private.is_assigned(f.client_id, 'reviewer')) then raise exception 'Only the client''s reviewer or the Owner can send a return back' using errcode = '42501'; end if;
    if note is null then raise exception 'Say what needs fixing' using errcode = '22023'; end if;
    update public.filing_instances set open_query = null where id = f.id;
    next_status := 'not_started';

  elsif p_action = 'client_approve' then
    if f.status <> 'reviewed' then raise exception 'Only a reviewed return can be approved by the client' using errcode = '22023'; end if;
    if private.is_client_user(f.client_id) then
      null;
    elsif owner then
      if note is null then raise exception 'Note how the client approved (e.g. email of 12 Jan)' using errcode = '22023'; end if;
    else
      raise exception 'Only the client (or the Owner on their behalf) can approve' using errcode = '42501';
    end if;
    update public.filing_instances set open_query = null where id = f.id;
    next_status := 'client_approved';

  elsif p_action = 'client_query' then
    if f.status <> 'reviewed' then raise exception 'You can ask about a return while it waits for your approval' using errcode = '22023'; end if;
    if not private.is_client_user(f.client_id) then raise exception 'Only the client can send a query' using errcode = '42501'; end if;
    if note is null then raise exception 'Write your question' using errcode = '22023'; end if;
    update public.filing_instances set open_query = note where id = f.id;
    next_status := f.status;

  elsif p_action = 'answer_query' then
    if f.open_query is null then raise exception 'There is no open query' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can answer' using errcode = '42501'; end if;
    if note is null then raise exception 'Write the answer' using errcode = '22023'; end if;
    update public.filing_instances set open_query = null where id = f.id;
    next_status := f.status;

  elsif p_action = 'owner_approve' then
    if f.status <> 'client_approved' then raise exception 'Only a client-approved return can get the final approval' using errcode = '22023'; end if;
    if not owner then
      if acting.id is null then raise exception 'Only the Owner, or the acting approver while named, gives the final approval' using errcode = '42501'; end if;
      if coalesce(f.tax_due, 0) > acting.max_tax_due then
        raise exception 'The tax due is above your approval limit of %; this return waits for the Owner', to_char(acting.max_tax_due, 'FM"₱"999,999,999,990.00') using errcode = '42501';
      end if;
      select actor into preparer from public.filing_events
        where filing_instance_id = f.id and action = 'prepare' order by created_at desc, id desc limit 1;
      if preparer = auth.uid() then raise exception 'You prepared this return; it waits for the Owner' using errcode = '42501'; end if;
    end if;
    -- The payment check comes from Collections (decision 13): the return's own item,
    -- recorded with the step. A tax due not yet on a statement counts as unpaid.
    data := (data - 'approve_unpaid' - 'payment_status' - 'payment_check') || jsonb_build_object('payment_check', private.payment_check(f.id));
    data := data || jsonb_build_object('payment_status', data -> 'payment_check' ->> 'status');
    if data ->> 'payment_status' in ('partial', 'unpaid') then
      raise exception 'The client''s payment for this return is not verified yet (%): approve once its item in Collections is paid',
        case data ->> 'payment_status' when 'partial' then 'partly paid' else
          case when (data -> 'payment_check' ->> 'billed')::boolean then 'unpaid' else 'not on a statement yet' end end
        using errcode = '22023';
    end if;
    -- DAT attachments for eSubmission, from the worksheet (decision 15).
    if jsonb_typeof(data -> 'dat_files') = 'array' then
      select coalesce(array_agg(x order by n), '{}') into dat
        from jsonb_array_elements_text(data -> 'dat_files') with ordinality as t(x, n) where btrim(x) <> '';
      update public.filing_instances set esubmission_required = cardinality(dat) > 0, esubmission_files = dat where id = f.id;
    end if;
    if not owner then
      data := data || jsonb_build_object('acting_approver', true, 'delegation_id', acting.id, 'limit', acting.max_tax_due);
    end if;
    next_status := 'owner_approved';

  elsif p_action = 'file' then
    -- Filed & paid (decision 14).
    if f.status <> 'owner_approved' then raise exception 'Only an approved return can be filed' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can record the filing' using errcode = '42501'; end if;
    if nullif(trim(coalesce(data ->> 'filing_reference', '')), '') is null or (data ->> 'filed_on') is null then
      raise exception 'Enter the filing reference and date' using errcode = '22023';
    end if;
    if coalesce(f.tax_due, 0) > 0 and (nullif(trim(coalesce(data ->> 'payment_reference', '')), '') is null or (data ->> 'paid_on') is null) then
      raise exception 'Enter the payment reference and date' using errcode = '22023';
    end if;
    if not exists (select 1 from public.filing_files where filing_instance_id = f.id and kind = 'filed_copy' and replaced_at is null) then
      raise exception 'Attach the scanned copy (return, proof of payment and attachments) first' using errcode = '22023';
    end if;
    update public.filing_instances
      set filing_reference = trim(data ->> 'filing_reference'), filed_on = (data ->> 'filed_on')::date,
          payment_reference = nullif(trim(coalesce(data ->> 'payment_reference', '')), ''), paid_on = nullif(data ->> 'paid_on', '')::date
      where id = f.id;
    next_status := 'filed';

  else
    raise exception 'Unknown action %', p_action using errcode = '22023';
  end if;

  update public.filing_instances set status = next_status where id = f.id returning * into f;
  insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
  values (f.id, prior_status, next_status, auth.uid(), note, p_action, data);
  if p_action = 'file' then
    perform private.on_return_filed(f.id);
    select * into f from public.filing_instances where id = f.id;
  end if;
  return f;
end;
$$;

-- ---------------------------------------------------------------------------
-- Unlocking a month restarts the unfiled returns that cover it.
-- ---------------------------------------------------------------------------
create or replace function private.restart_returns_on_unlock() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
begin
  for f in
    select * from public.filing_instances
    where client_id = old.client_id and form = any (private.book_lock_forms())
      and old.month between date_trunc('month', period_start)::date and period_end
      and status in ('prepared', 'reviewed', 'client_approved', 'owner_approved')
    for update
  loop
    update public.filing_instances set status = 'not_started', open_query = null where id = f.id;
    insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
    values (f.id, f.status, 'not_started', auth.uid(),
            'The Books of ' || to_char(old.month, 'FMMonth YYYY') || ' were unlocked: prepare the return again once the month is locked',
            'restart', jsonb_build_object('month', old.month));
  end loop;
  return null;
end;
$$;

create trigger restart_returns_on_unlock after delete on public.books_month_locks
  for each row execute function private.restart_returns_on_unlock();

revoke execute on function private.filing_books_locked(uuid) from public, anon, authenticated;
revoke execute on function private.on_return_filed(uuid) from public, anon, authenticated;
revoke execute on function private.restart_returns_on_unlock() from public, anon, authenticated;
