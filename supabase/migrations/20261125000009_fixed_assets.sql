-- A1: the fixed asset register (workpaper E) and straight-line depreciation
-- (docs/UX-REVIEW.md, "Capital expenditure and depreciation"; Owner's decisions 12–17).
--
--  - A purchases register line booked to a property and equipment account (not land)
--    with a cost of ₱10,000 or more (decision 12) becomes an asset waiting for its
--    depreciation to be set up. Its input VAT stays on the 2550Q in full (decision 16).
--  - Setting it up gives the useful life for that item (decision 13) and a tax life
--    (decision 17; the same unless changed). Residual value ₱1 (decision 14).
--    Depreciation starts the month after purchase (decision 15).
--  - Straight line: (cost − residual) ÷ life in months, rounded to the centavo; the
--    last month takes the rounding, so the residual stays on the books.
--  - Opening assets come in with the opening balances; their depreciation before the
--    books start is in the opening accumulated depreciation.
--  - Running a month posts one entry: Dr Depreciation Expense / Cr Accumulated
--    Depreciation by class (src/lib/assets/schedule.ts mirrors the arithmetic).

create table public.fixed_assets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  -- E-1, E-2, … per client.
  number int not null,
  source text not null check (source in ('register', 'opening')),
  document_id uuid unique references public.documents (id) on delete set null,
  description text not null check (btrim(description) <> ''),
  asset_account_id uuid not null,
  accum_account_id uuid,
  acquired_on date not null,
  -- VAT-exclusive for a VAT-registered client; the input VAT is claimed on the 2550Q.
  cost numeric(18, 2) not null check (cost > 0),
  input_vat numeric(18, 2) not null default 0,
  residual numeric(18, 2) not null default 1 check (residual >= 0),
  life_months int check (life_months > 0),
  tax_life_months int check (tax_life_months > 0),
  status text not null default 'setup' check (status in ('setup', 'active')),
  set_up_by uuid references auth.users (id),
  set_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, number),
  check (residual < cost),
  check (status = 'setup' or (life_months is not null and tax_life_months is not null and accum_account_id is not null)),
  foreign key (client_id, asset_account_id) references public.ledger_accounts (client_id, id),
  foreign key (client_id, accum_account_id) references public.ledger_accounts (client_id, id)
);
create trigger touch_updated_at before update on public.fixed_assets for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.fixed_assets for each row execute function private.audit();
alter table public.fixed_assets enable row level security;
create policy fixed_assets_read on public.fixed_assets for select to authenticated using (private.is_staff() and private.can_access_client(client_id));

-- One depreciation entry per client and month.
create table public.depreciation_runs (
  client_id uuid not null references public.clients (id) on delete cascade,
  month date not null check (extract(day from month) = 1),
  entry_id uuid not null references public.journal_entries (id),
  run_by uuid references auth.users (id) default auth.uid(),
  run_at timestamptz not null default now(),
  primary key (client_id, month)
);
create trigger audit after insert or update or delete on public.depreciation_runs for each row execute function private.audit();
alter table public.depreciation_runs enable row level security;
create policy depreciation_runs_read on public.depreciation_runs for select to authenticated using (private.is_staff() and private.can_access_client(client_id));

/** The accumulated depreciation account paired with a property and equipment account of the chart templates. */
create or replace function private.accum_account_for(p_asset_account uuid) returns uuid
language sql stable security definer set search_path = '' as $$
  select x.id from public.ledger_accounts a
  join public.ledger_accounts x on x.client_id = a.client_id and x.active and x.template_key = case a.template_key
    when 'building' then 'accum_dep_building'
    when 'transportation_equipment' then 'accum_dep_transportation'
    when 'office_equipment' then 'accum_dep_office'
    when 'furniture_fixtures' then 'accum_dep_furniture'
    when 'it_equipment' then 'accum_dep_it' end
  where a.id = p_asset_account
$$;

/**
 * One month's straight-line depreciation of an asset: (cost − residual) ÷ life,
 * rounded to the centavo, from the month after purchase; the last month takes the
 * rounding. Zero before the start, after the life, or while not set up.
 */
create or replace function private.depreciation_for(p_cost numeric, p_residual numeric, p_life int, p_acquired date, p_month date)
returns numeric language sql immutable as $$
  select case
    when p_life is null then 0
    when n < 1 or n > p_life then 0
    when n = p_life then (p_cost - p_residual) - round((p_cost - p_residual) / p_life, 2) * (p_life - 1)
    else round((p_cost - p_residual) / p_life, 2) end
  from (select ((extract(year from p_month) - extract(year from p_acquired)) * 12
               + extract(month from p_month) - extract(month from p_acquired))::int as n) m
$$;

/**
 * Keeps the register's capital goods in step (decision 12): a purchase line booked to
 * a property and equipment account other than land, costing ₱10,000 or more, has an
 * asset. While its depreciation is not set up the asset follows the line; once set
 * up it is left alone. An asset waiting for setup goes when its line no longer qualifies.
 */
create or replace function private.sync_fixed_asset() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  r public.register_lines;
  a public.ledger_accounts;
  v_cost numeric;
  v_vat numeric;
  qualifies boolean := false;
begin
  if tg_op = 'DELETE' then
    delete from public.fixed_assets where document_id = old.document_id and status = 'setup';
    return null;
  end if;
  r := new;
  select * into a from public.ledger_accounts where id = r.account_id;
  v_vat := case when r.vat_registered then r.vat else 0 end;
  v_cost := (case when r.total > 0 then r.total else r.vatable + r.vat_exempt + r.zero_rated + r.vat end) - v_vat;
  qualifies := r.kind = 'purchase' and a.fs_line = 'ppe' and a.normal_side = 'debit'
               and coalesce(a.template_key, '') <> 'land' and v_cost >= 10000;
  if not qualifies then
    delete from public.fixed_assets where document_id = r.document_id and status = 'setup';
    return null;
  end if;
  if exists (select 1 from public.fixed_assets where document_id = r.document_id) then
    update public.fixed_assets
      set asset_account_id = a.id, accum_account_id = coalesce(accum_account_id, private.accum_account_for(a.id)),
          acquired_on = coalesce(r.line_date, r.month), cost = v_cost, input_vat = v_vat
      where document_id = r.document_id and status = 'setup';
  else
    perform pg_advisory_xact_lock(hashtext('fixed_assets:' || r.client_id::text));
    insert into public.fixed_assets (client_id, number, source, document_id, description, asset_account_id, accum_account_id, acquired_on, cost, input_vat)
    values (
      r.client_id, coalesce((select max(number) from public.fixed_assets where client_id = r.client_id), 0) + 1, 'register', r.document_id,
      coalesce(nullif(btrim(concat_ws(' · ', r.party_name, r.reference)), ''), a.name),
      a.id, private.accum_account_for(a.id), coalesce(r.line_date, r.month), v_cost, v_vat
    );
  end if;
  return null;
end;
$$;
create trigger sync_fixed_asset after insert or update or delete on public.register_lines for each row execute function private.sync_fixed_asset();

-- Capital goods already in the register.
update public.register_lines set kind = kind where kind = 'purchase';

/**
 * Sets up an asset's depreciation (decisions 13 and 17): what it is, its useful life
 * in months, and its life for income tax (the same unless given). Staff assigned to
 * the client or the Owner; once a month's depreciation of it is posted, the life
 * can no longer change.
 */
create or replace function public.setup_fixed_asset(p_asset uuid, p_description text, p_life_months int, p_tax_life_months int default null, p_accum_account uuid default null)
returns public.fixed_assets
language plpgsql security definer set search_path = '' as $$
declare
  x public.fixed_assets;
begin
  select * into x from public.fixed_assets where id = p_asset for update;
  if x.id is null or not private.can_access_client(x.client_id) then raise exception 'Asset not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(x.client_id) then raise exception 'Only the Owner or staff assigned to this client can set up its assets' using errcode = '42501'; end if;
  if p_life_months is null or p_life_months < 1 or p_life_months > 1200 then raise exception 'Give the useful life in months' using errcode = '22023'; end if;
  if p_tax_life_months is not null and (p_tax_life_months < 1 or p_tax_life_months > 1200) then raise exception 'Give the tax life in months' using errcode = '22023'; end if;
  if x.status = 'active' and (p_life_months <> x.life_months or coalesce(p_tax_life_months, p_life_months) <> x.tax_life_months)
     and exists (select 1 from public.depreciation_runs d join public.journal_entries e on e.id = d.entry_id and e.status = 'posted'
                 where d.client_id = x.client_id and d.month > date_trunc('month', x.acquired_on)) then
    raise exception 'Depreciation of this asset is already posted; its life can no longer change' using errcode = '22023';
  end if;
  if p_accum_account is not null and not exists (
    select 1 from public.ledger_accounts where id = p_accum_account and client_id = x.client_id and active and fs_line = 'ppe' and normal_side = 'credit'
  ) then raise exception 'Choose an accumulated depreciation account' using errcode = '22023'; end if;
  if coalesce(p_accum_account, x.accum_account_id, private.accum_account_for(x.asset_account_id)) is null then
    raise exception 'Choose the accumulated depreciation account for this asset' using errcode = '22023';
  end if;
  update public.fixed_assets set
    description = coalesce(nullif(btrim(p_description), ''), description),
    life_months = p_life_months,
    tax_life_months = coalesce(p_tax_life_months, p_life_months),
    accum_account_id = coalesce(p_accum_account, accum_account_id, private.accum_account_for(asset_account_id)),
    status = 'active', set_up_by = auth.uid(), set_up_at = now()
  where id = x.id returning * into x;
  return x;
end;
$$;

/** An asset brought in with the opening balances (decision: opening assets come with the opening balances). */
create or replace function public.add_opening_asset(p_client uuid, p_description text, p_asset_account uuid, p_acquired_on date, p_cost numeric,
  p_life_months int, p_tax_life_months int default null, p_accum_account uuid default null)
returns public.fixed_assets
language plpgsql security definer set search_path = '' as $$
declare
  x public.fixed_assets;
  b public.client_books;
begin
  if not private.can_keep_books(p_client) then raise exception 'Only the Owner or staff assigned to this client can add its assets' using errcode = '42501'; end if;
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'Set up the account titles first' using errcode = '22023'; end if;
  if p_acquired_on is null or p_acquired_on >= b.books_start then raise exception 'An opening asset was bought before the books start (%)', b.books_start using errcode = '22023'; end if;
  if coalesce(p_cost, 0) <= 1 then raise exception 'Give the cost' using errcode = '22023'; end if;
  if not exists (select 1 from public.ledger_accounts where id = p_asset_account and client_id = p_client and fs_line = 'ppe' and normal_side = 'debit') then
    raise exception 'Choose a property and equipment account' using errcode = '22023';
  end if;
  perform pg_advisory_xact_lock(hashtext('fixed_assets:' || p_client::text));
  insert into public.fixed_assets (client_id, number, source, description, asset_account_id, accum_account_id, acquired_on, cost)
  values (p_client, coalesce((select max(number) from public.fixed_assets where client_id = p_client), 0) + 1, 'opening',
          coalesce(nullif(btrim(p_description), ''), 'Opening asset'), p_asset_account,
          coalesce(p_accum_account, private.accum_account_for(p_asset_account)), p_acquired_on, round(p_cost, 2))
  returning * into x;
  return public.setup_fixed_asset(x.id, p_description, p_life_months, p_tax_life_months, p_accum_account);
end;
$$;

/**
 * Posts a month's depreciation (books, not tax): one entry dated the month's end,
 * Dr Depreciation Expense / Cr each accumulated depreciation account. Refused while an
 * asset bought before the month still waits for its setup, before the books start,
 * or when the month is already run (reverse that entry to run it again).
 */
create or replace function public.run_depreciation(p_client uuid, p_month date) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_month)::date;
  b public.client_books;
  waiting text;
  lines jsonb;
  total numeric;
  dep uuid;
  e uuid;
begin
  if not private.can_keep_books(p_client) then raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501'; end if;
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'Set up the account titles first' using errcode = '22023'; end if;
  if m < date_trunc('month', b.books_start) then raise exception 'That month is before the books start (%)', b.books_start using errcode = '22023'; end if;
  if exists (select 1 from public.depreciation_runs d join public.journal_entries j on j.id = d.entry_id
             where d.client_id = p_client and d.month = m and j.status <> 'reversed') then
    raise exception 'Depreciation for that month is already posted; reverse its entry to run it again' using errcode = '22023';
  end if;
  select string_agg('E-' || number, ', ' order by number) into waiting from public.fixed_assets
  where client_id = p_client and status = 'setup' and acquired_on < m;
  if waiting is not null then raise exception 'Set up the depreciation of % first', waiting using errcode = '22023'; end if;

  dep := coalesce(private.account_by_key(p_client, 'depreciation'),
                  (select id from public.ledger_accounts where client_id = p_client and active and bir_line = 'ded_depreciation' order by sort_order limit 1));
  if dep is null then raise exception 'The chart has no Depreciation Expense account' using errcode = '22023'; end if;

  with amounts as (
    select x.accum_account_id as account_id, sum(private.depreciation_for(x.cost, x.residual, x.life_months, x.acquired_on, m)) as amount
    from public.fixed_assets x where x.client_id = p_client and x.status = 'active'
    group by x.accum_account_id
  )
  select coalesce(sum(amount), 0),
         jsonb_agg(jsonb_build_object('account_id', account_id, 'credit', amount, 'description', 'Depreciation') order by account_id) filter (where amount > 0)
  into total, lines from amounts;
  if total <= 0 then raise exception 'Nothing to depreciate in %', to_char(m, 'FMMonth YYYY') using errcode = '22023'; end if;

  lines := jsonb_build_array(jsonb_build_object('account_id', dep, 'debit', total, 'description', 'Depreciation, straight line')) || lines;
  e := private.insert_entry(p_client, (m + interval '1 month - 1 day')::date, 'general_journal', 'manual',
                            'Depreciation for ' || to_char(m, 'FMMonth YYYY') || ' (fixed asset register)', 'DEP ' || to_char(m, 'YYYY-MM'), lines, null, null);
  perform public.confirm_journal_entry(e);
  insert into public.depreciation_runs (client_id, month, entry_id) values (p_client, m, e)
  on conflict (client_id, month) do update set entry_id = excluded.entry_id, run_by = auth.uid(), run_at = now();
  return e;
end;
$$;

revoke execute on function private.accum_account_for(uuid) from public, anon, authenticated;
revoke execute on function private.sync_fixed_asset() from public, anon, authenticated;
revoke execute on function public.setup_fixed_asset(uuid, text, int, int, uuid) from public, anon;
revoke execute on function public.add_opening_asset(uuid, text, uuid, date, numeric, int, int, uuid) from public, anon;
revoke execute on function public.run_depreciation(uuid, date) from public, anon;
grant execute on function private.depreciation_for(numeric, numeric, int, date, date) to authenticated;
grant execute on function public.setup_fixed_asset(uuid, text, int, int, uuid) to authenticated;
grant execute on function public.add_opening_asset(uuid, text, uuid, date, numeric, int, int, uuid) to authenticated;
grant execute on function public.run_depreciation(uuid, date) to authenticated;
