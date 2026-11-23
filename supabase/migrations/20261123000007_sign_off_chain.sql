-- Sign-off chain (spec §3.8; Q21, Q25, Q32, Q57).
--
-- Every return moves through: not started → prepared → reviewed → client approved
-- → owner approved → filed → paid → proof sent. Each step is one call to
-- advance_filing(), which checks who may take it, records the step in
-- filing_events with the actor and time, and updates the filing. Nothing else
-- writes filings or events (RLS gives users read access only).

alter table public.filing_instances
  add column tax_due numeric(18,2) check (tax_due >= 0),
  add column filing_reference text,
  add column filed_on date,
  add column payment_reference text,
  add column paid_on date,
  -- A client's question on a reviewed return, open until staff answer it.
  add column open_query text;

alter table public.filing_events
  add column action text,
  add column data jsonb not null default '{}'::jsonb;

create index filing_events_filing_idx on public.filing_events (filing_instance_id, created_at);

-- Is the signed-in person assigned to the client, optionally in a given role?
create or replace function private.is_assigned(target uuid, as_role text default null) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.staff_assignments sa
    join public.staff_profiles sp on sp.user_id = sa.user_id and sp.active
    where sa.client_id = target and sa.user_id = auth.uid() and (as_role is null or sa.role = as_role)
  )
$$;

create or replace function private.is_client_user(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.client_users cu where cu.client_id = target and cu.user_id = auth.uid())
$$;

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
  note text := nullif(trim(coalesce(p_note, '')), '');
  data jsonb := coalesce(p_data, '{}'::jsonb);
  next_status text;
  prior_status text;
  preparer uuid;
begin
  select * into f from public.filing_instances where id = p_filing for update;
  if f.id is null then
    raise exception 'Filing not found' using errcode = 'P0002';
  end if;
  prior_status := f.status;
  if not private.can_access_client(f.client_id) then
    raise exception 'You do not have access to this client' using errcode = '42501';
  end if;

  if p_action = 'prepare' then
    if f.status <> 'not_started' then raise exception 'Only a return not yet started can be marked prepared' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can prepare the return' using errcode = '42501'; end if;
    if (data ->> 'tax_due') is null then raise exception 'Enter the tax due on the return (0 if none)' using errcode = '22023'; end if;
    update public.filing_instances set tax_due = (data ->> 'tax_due')::numeric where id = f.id;
    next_status := 'prepared';

  elsif p_action = 'review' then
    if f.status <> 'prepared' then raise exception 'Only a prepared return can be reviewed' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id, 'reviewer')) then raise exception 'Only the client''s reviewer or the Owner can review' using errcode = '42501'; end if;
    -- Nobody reviews their own work, except the Owner (who signs off last anyway).
    select actor into preparer from public.filing_events
      where filing_instance_id = f.id and action = 'prepare' order by created_at desc, id desc limit 1;
    if not owner and preparer = auth.uid() then raise exception 'You prepared this return; another person must review it' using errcode = '42501'; end if;
    next_status := 'reviewed';

  elsif p_action = 'kick_back' then
    if f.status not in ('prepared', 'reviewed') then raise exception 'Only a prepared or reviewed return can be sent back' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id, 'reviewer')) then raise exception 'Only the client''s reviewer or the Owner can send a return back' using errcode = '42501'; end if;
    if note is null then raise exception 'Say what needs fixing' using errcode = '22023'; end if;
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
    if not owner then raise exception 'Only the Owner gives the final approval' using errcode = '42501'; end if;
    if coalesce(data ->> 'payment_status', '') not in ('paid', 'partial', 'unpaid', 'not_applicable') then
      raise exception 'Record the payment check' using errcode = '22023';
    end if;
    -- Approving without full payment is allowed for the Owner (Q25) but must be deliberate.
    if data ->> 'payment_status' in ('partial', 'unpaid') and coalesce((data ->> 'approve_unpaid')::boolean, false) is not true then
      raise exception 'Tick "approve even though unpaid" to approve an unpaid return' using errcode = '22023';
    end if;
    next_status := 'owner_approved';

  elsif p_action = 'file' then
    if f.status <> 'owner_approved' then raise exception 'Only an approved return can be filed' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can record the filing' using errcode = '42501'; end if;
    if nullif(trim(coalesce(data ->> 'filing_reference', '')), '') is null or (data ->> 'filed_on') is null then
      raise exception 'Enter the filing reference and date' using errcode = '22023';
    end if;
    update public.filing_instances set filing_reference = trim(data ->> 'filing_reference'), filed_on = (data ->> 'filed_on')::date where id = f.id;
    next_status := 'filed';

  elsif p_action = 'pay' then
    if f.status <> 'filed' then raise exception 'Only a filed return can be marked paid' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can record the payment' using errcode = '42501'; end if;
    if coalesce(f.tax_due, 0) > 0 and (nullif(trim(coalesce(data ->> 'payment_reference', '')), '') is null or (data ->> 'paid_on') is null) then
      raise exception 'Enter the payment reference and date' using errcode = '22023';
    end if;
    update public.filing_instances
      set payment_reference = nullif(trim(coalesce(data ->> 'payment_reference', '')), ''), paid_on = (data ->> 'paid_on')::date
      where id = f.id;
    next_status := 'paid';

  elsif p_action = 'send_proof' then
    if f.status <> 'paid' then raise exception 'Only a paid return can be closed' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can close the return' using errcode = '42501'; end if;
    next_status := 'proof_uploaded';

  else
    raise exception 'Unknown action %', p_action using errcode = '22023';
  end if;

  update public.filing_instances set status = next_status where id = f.id returning * into f;
  insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
  values (f.id, prior_status, next_status, auth.uid(), note, p_action, data);
  return f;
end;
$$;

revoke execute on function public.advance_filing(uuid, text, text, jsonb) from public, anon;
grant execute on function public.advance_filing(uuid, text, text, jsonb) to authenticated;
revoke execute on function private.is_assigned(uuid, text) from public, anon;
revoke execute on function private.is_client_user(uuid) from public, anon;
grant execute on function private.is_assigned(uuid, text) to authenticated;
grant execute on function private.is_client_user(uuid) to authenticated;
