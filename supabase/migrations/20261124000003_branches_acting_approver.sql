-- Branches and the acting approver.
-- Spec: docs/SPEC.md §1.1, §3.1, §3.8. Decisions: Q58, Q68.
--
-- Branches (Q68): the firm works from Iloilo now and will open branches later. Every
-- client and every staff member except the Owner belongs to one branch, so the Owner
-- can see who works where when assigning a client. Access does not depend on the
-- branch yet: assignments still decide what staff see.
--
-- Acting approver (Q58): while the Owner is away, a Reviewer named by the Owner gives
-- the final approval on returns, but only up to a peso limit on the tax due, never on
-- a return that is not fully paid, and never on a return they prepared. Each approval
-- is marked and goes into a daily digest to the Owner.

-- ---------------------------------------------------------------------------
-- Branches.
-- ---------------------------------------------------------------------------
create table public.branches (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands (id),
  code text not null check (code ~ '^[A-Z]{2,6}$'),
  name text not null check (length(trim(name)) > 0),
  address text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brand_id, code)
);

-- The brand's first branch, used when a client or staff member is saved without one.
create or replace function private.default_branch(p_brand uuid) returns uuid
language sql stable security definer set search_path = '' as $$
  select id from public.branches where brand_id = p_brand and active order by created_at, code limit 1
$$;

-- Every brand starts with one branch. Tallo CPA's is Iloilo (below); a brand added
-- later gets a "Main office" the Owner can rename.
create or replace function private.brand_first_branch() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.branches (brand_id, code, name) values (new.id, 'MAIN', 'Main office')
  on conflict (brand_id, code) do nothing;
  return new;
end;
$$;
create trigger first_branch after insert on public.brands for each row execute function private.brand_first_branch();

insert into public.branches (brand_id, code, name)
select id, 'ILO', 'Iloilo' from public.brands
on conflict (brand_id, code) do nothing;

alter table public.staff_profiles add column branch_id uuid references public.branches (id);
alter table public.clients add column branch_id uuid references public.branches (id);

update public.staff_profiles sp set branch_id = private.default_branch(sp.brand_id) where role <> 'owner';
update public.clients c set branch_id = private.default_branch(c.brand_id);

-- Fills in the brand's first branch when none is given, and keeps the branch in the same brand.
create or replace function private.check_branch() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  b public.branches;
begin
  if new.branch_id is null then
    -- The Owner works across branches and may have none; everyone else gets the first branch.
    if tg_table_name = 'clients' then
      new.branch_id := private.default_branch(new.brand_id);
    elsif new.role <> 'owner' then
      new.branch_id := private.default_branch(new.brand_id);
    end if;
  end if;
  if new.branch_id is not null then
    select * into b from public.branches where id = new.branch_id;
    if b.brand_id is distinct from new.brand_id then
      raise exception 'That branch belongs to another brand' using errcode = '22023';
    end if;
    if not b.active then
      if tg_op = 'INSERT' then
        raise exception 'Branch % is closed; choose an open branch', b.name using errcode = '22023';
      elsif new.branch_id is distinct from old.branch_id then
        raise exception 'Branch % is closed; choose an open branch', b.name using errcode = '22023';
      end if;
    end if;
  end if;
  return new;
end;
$$;
create trigger check_branch before insert or update of branch_id, brand_id, role on public.staff_profiles
  for each row execute function private.check_branch();
create trigger check_branch before insert or update of branch_id, brand_id on public.clients
  for each row execute function private.check_branch();

alter table public.staff_profiles add constraint staff_branch_required check (role = 'owner' or branch_id is not null) not valid;
alter table public.staff_profiles validate constraint staff_branch_required;
alter table public.clients add constraint clients_branch_required check (branch_id is not null) not valid;
alter table public.clients validate constraint clients_branch_required;

create index staff_profiles_branch_idx on public.staff_profiles (branch_id);
create index clients_branch_idx on public.clients (branch_id);

alter table public.branches enable row level security;
create policy branches_read on public.branches for select to authenticated using (private.is_staff());
create policy branches_insert on public.branches for insert to authenticated with check (private.is_owner());
create policy branches_update on public.branches for update to authenticated using (private.is_owner()) with check (private.is_owner());
-- No delete: a branch with history is closed (active = false), not removed.

create trigger audit after insert or update or delete on public.branches for each row execute function private.audit();
create trigger touch_updated_at before update on public.branches for each row execute function private.touch_updated_at();

-- The client forms save the branch with the client (blank keeps it, or the brand's first branch for a new client).
create or replace function public.create_client_with_obligations(
  p_client jsonb,
  p_tax_types jsonb,
  p_registration_date date,
  p_obligations jsonb
) returns public.clients
language plpgsql security invoker set search_path = '' as $$
declare
  c public.clients;
  brand uuid := (p_client ->> 'brand_id')::uuid;
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can create clients' using errcode = '42501';
  end if;

  insert into public.clients (
    brand_id, branch_id, code, name, taxpayer_type, tin, rdo_code, registered_address, fiscal_year_end_month,
    filing_channel, efps_group, book_type, payment_mode, submission_cutoff_day, status
  ) values (
    brand,
    nullif(p_client ->> 'branch_id', '')::uuid,
    private.next_client_code(brand),
    p_client ->> 'name',
    p_client ->> 'taxpayer_type',
    nullif(p_client ->> 'tin', ''),
    nullif(p_client ->> 'rdo_code', ''),
    nullif(p_client ->> 'registered_address', ''),
    coalesce((p_client ->> 'fiscal_year_end_month')::smallint, 12),
    coalesce(p_client ->> 'filing_channel', 'ebirforms'),
    nullif(p_client ->> 'efps_group', ''),
    coalesce(p_client ->> 'book_type', 'manual'),
    coalesce(p_client ->> 'payment_mode', 'client_pays_direct'),
    coalesce((p_client ->> 'submission_cutoff_day')::smallint, 5),
    'onboarding'
  ) returning * into c;

  insert into public.client_registrations (client_id, registration_date, tax_types)
  values (c.id, p_registration_date, coalesce(p_tax_types, '[]'::jsonb));

  insert into public.obligations (client_id, form, frequency, start_date, created_from)
  select c.id, o ->> 'form', o ->> 'frequency', (o ->> 'start_date')::date, 'cor'
  from jsonb_array_elements(coalesce(p_obligations, '[]'::jsonb)) as o;

  return c;
end;
$$;

create or replace function public.update_client_with_obligations(
  p_client_id uuid,
  p_client jsonb,
  -- null = the tax setup did not change.
  p_tax_types jsonb,
  p_effective_date date,
  -- [{form, frequency}] to start on p_effective_date.
  p_add jsonb,
  -- forms whose open obligation ends the day before p_effective_date.
  p_end text[]
) returns public.clients
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can edit clients' using errcode = '42501';
  end if;

  update public.clients set
    name = p_client ->> 'name',
    taxpayer_type = p_client ->> 'taxpayer_type',
    tin = nullif(p_client ->> 'tin', ''),
    rdo_code = nullif(p_client ->> 'rdo_code', ''),
    registered_address = nullif(p_client ->> 'registered_address', ''),
    fiscal_year_end_month = (p_client ->> 'fiscal_year_end_month')::smallint,
    filing_channel = p_client ->> 'filing_channel',
    efps_group = nullif(p_client ->> 'efps_group', ''),
    book_type = p_client ->> 'book_type',
    payment_mode = p_client ->> 'payment_mode',
    submission_cutoff_day = (p_client ->> 'submission_cutoff_day')::smallint,
    branch_id = coalesce(nullif(p_client ->> 'branch_id', '')::uuid, branch_id)
  where id = p_client_id
  returning * into c;
  if c.id is null then
    raise exception 'Client not found' using errcode = 'P0002';
  end if;

  if p_tax_types is not null then
    if p_effective_date is null then
      raise exception 'Enter the date the change took effect' using errcode = '22023';
    end if;

    insert into public.client_registrations (client_id, registration_date, tax_types)
    values (p_client_id, p_effective_date, p_tax_types);

    update public.obligations
    set end_date = p_effective_date - 1
    where client_id = p_client_id and end_date is null and form = any (coalesce(p_end, '{}'));

    -- Filings for periods after an obligation ended that nobody has started are no longer due.
    delete from public.filing_instances f
    using public.obligations o
    where f.obligation_id = o.id and o.client_id = p_client_id
      and o.end_date is not null and f.period_start > o.end_date
      and f.status = 'not_started';

    insert into public.obligations (client_id, form, frequency, start_date, created_from)
    select p_client_id, a ->> 'form', a ->> 'frequency', p_effective_date, 'cor'
    from jsonb_array_elements(coalesce(p_add, '[]'::jsonb)) as a;
  end if;

  return c;
end;
$$;

-- ---------------------------------------------------------------------------
-- Acting approver.
-- ---------------------------------------------------------------------------
alter table public.acting_approver_delegations
  add column ended_at timestamptz,
  add column ended_by uuid references auth.users (id),
  add constraint delegation_reason_given check (length(trim(reason)) > 0);

create index acting_delegations_delegate_idx on public.acting_approver_delegations (delegate_user_id, starts_at, ends_at);

-- Only a Reviewer can stand in, and only one person at a time.
create or replace function private.check_delegation() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'UPDATE' then
    -- Only ending early (or shortening) is allowed once saved.
    if new.delegate_user_id <> old.delegate_user_id or new.starts_at <> old.starts_at or new.max_tax_due <> old.max_tax_due or new.reason <> old.reason then
      raise exception 'End this acting approver and name a new one instead of changing it' using errcode = '22023';
    end if;
    return new;
  end if;
  if not exists (select 1 from public.staff_profiles where user_id = new.delegate_user_id and role = 'reviewer' and active) then
    raise exception 'Only an active Reviewer can be named acting approver' using errcode = '22023';
  end if;
  if new.ends_at <= now() then
    raise exception 'The end date has already passed' using errcode = '22023';
  end if;
  if exists (
    select 1 from public.acting_approver_delegations d
    where d.ended_at is null and d.starts_at < new.ends_at and d.ends_at > new.starts_at
  ) then
    raise exception 'Another acting approver is named for those dates; end that one first' using errcode = '23P01';
  end if;
  return new;
end;
$$;
create trigger check_delegation before insert or update on public.acting_approver_delegations
  for each row execute function private.check_delegation();

-- The signed-in person's acting-approver appointment in force now, if any.
create or replace function private.acting_delegation() returns public.acting_approver_delegations
language sql stable security definer set search_path = '' as $$
  select d.* from public.acting_approver_delegations d
  join public.staff_profiles sp on sp.user_id = d.delegate_user_id and sp.active and sp.role = 'reviewer'
  where d.delegate_user_id = auth.uid() and d.ended_at is null and now() >= d.starts_at and now() < d.ends_at
  order by d.starts_at desc limit 1
$$;

-- Filings an acting approver may open: those waiting for the final approval while
-- they are acting, and those they approved themselves.
create or replace function private.acting_sees_filing(p_filing uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.filing_instances f
    where f.id = p_filing and (
      (f.status = 'client_approved' and (private.acting_delegation()).id is not null)
      or exists (
        select 1 from public.filing_events e
        where e.filing_instance_id = f.id and e.action = 'owner_approve' and e.actor = auth.uid()
      )
    )
  )
$$;

create or replace function private.acting_sees_client(p_client uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.filing_instances f
    where f.client_id = p_client and private.acting_sees_filing(f.id)
  )
$$;

create policy filings_read_acting on public.filing_instances for select to authenticated using (private.acting_sees_filing(id));
create policy filing_events_read_acting on public.filing_events for select to authenticated using (private.acting_sees_filing(filing_instance_id));
create policy clients_read_acting on public.clients for select to authenticated using (private.acting_sees_client(id));
create policy client_users_read_acting on public.client_users for select to authenticated using (private.is_staff() and private.acting_sees_client(client_id));

-- The payment check, for the Owner or the acting approver.
create or replace function public.filing_payment_check(p_filing uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  if not (private.is_owner() or ((private.acting_delegation()).id is not null and private.acting_sees_filing(p_filing))) then
    raise exception 'Only the Owner or the acting approver sees the payment check' using errcode = '42501';
  end if;
  return private.payment_check(p_filing);
end;
$$;

-- ---------------------------------------------------------------------------
-- Sign-off chain: the final approval can come from the acting approver within the
-- limits above. Unchanged otherwise.
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
begin
  select * into f from public.filing_instances where id = p_filing for update;
  if f.id is null then
    raise exception 'Filing not found' using errcode = 'P0002';
  end if;
  prior_status := f.status;
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
    if not owner then
      if acting.id is null then raise exception 'Only the Owner, or the acting approver while named, gives the final approval' using errcode = '42501'; end if;
      if coalesce(f.tax_due, 0) > acting.max_tax_due then
        raise exception 'The tax due is above your approval limit of %; this return waits for the Owner', to_char(acting.max_tax_due, 'FM"₱"999,999,999,990.00') using errcode = '42501';
      end if;
      select actor into preparer from public.filing_events
        where filing_instance_id = f.id and action = 'prepare' order by created_at desc, id desc limit 1;
      if preparer = auth.uid() then raise exception 'You prepared this return; it waits for the Owner' using errcode = '42501'; end if;
    end if;
    -- The payment check comes from Collections (spec §3.9), not from the form, and is
    -- recorded with the step. A tax due not yet on a statement counts as unpaid.
    data := data || jsonb_build_object('payment_check', private.payment_check(f.id));
    data := data || jsonb_build_object('payment_status', data -> 'payment_check' ->> 'status');
    if data ->> 'payment_status' in ('partial', 'unpaid') then
      -- Only the Owner may approve without full payment (Q25, Q58), and must do it deliberately.
      if not owner then raise exception 'This return is not fully paid; only the Owner can approve it' using errcode = '42501'; end if;
      if coalesce((data ->> 'approve_unpaid')::boolean, false) is not true then
        raise exception 'Tick "approve even though unpaid" to approve an unpaid return' using errcode = '22023';
      end if;
    end if;
    if not owner then
      data := (data - 'approve_unpaid') || jsonb_build_object('acting_approver', true, 'delegation_id', acting.id, 'limit', acting.max_tax_due);
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

-- ---------------------------------------------------------------------------
-- Daily digest to the Owner (Q58): one record per Manila day, so a rerun of the
-- nightly job does not send the same digest twice.
-- ---------------------------------------------------------------------------
create table public.acting_digests (
  day date primary key,
  approvals integer not null,
  emailed boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.acting_digests enable row level security;
create policy acting_digests_owner on public.acting_digests for select to authenticated using (private.is_owner());

-- Acting-approver approvals on a Manila day, for the digest (service role only).
create or replace function public.acting_approvals_on(p_day date)
returns table (filing_id uuid, client_name text, form text, period_label text, tax_due numeric, approver text, approved_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select f.id, c.name, f.form, f.period_label, f.tax_due, sp.full_name, e.created_at
  from public.filing_events e
  join public.filing_instances f on f.id = e.filing_instance_id
  join public.clients c on c.id = f.client_id
  left join public.staff_profiles sp on sp.user_id = e.actor
  where e.action = 'owner_approve' and (e.data ->> 'acting_approver')::boolean is true
    and (e.created_at at time zone 'Asia/Manila')::date = p_day
  order by e.created_at
$$;

revoke execute on function private.default_branch(uuid) from public, anon;
revoke execute on function private.brand_first_branch() from public, anon, authenticated;
revoke execute on function private.check_branch() from public, anon, authenticated;
revoke execute on function private.check_delegation() from public, anon, authenticated;
revoke execute on function private.acting_delegation() from public, anon;
revoke execute on function private.acting_sees_filing(uuid) from public, anon;
revoke execute on function private.acting_sees_client(uuid) from public, anon;
grant execute on function private.default_branch(uuid) to authenticated;
grant execute on function private.acting_delegation() to authenticated;
grant execute on function private.acting_sees_filing(uuid) to authenticated;
grant execute on function private.acting_sees_client(uuid) to authenticated;
revoke execute on function public.acting_approvals_on(date) from public, anon, authenticated;
grant execute on function public.acting_approvals_on(date) to service_role;
