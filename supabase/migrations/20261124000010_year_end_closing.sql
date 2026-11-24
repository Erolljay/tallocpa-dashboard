-- Bookkeeping, Phase 1B slice 7 (spec §3.6): year-end closing.
--
-- close_books_year posts the closing entry on the last day of a taxable year:
-- every income and expense account is brought to nil against
--   - Retained Earnings (corporations, OPCs) or Fund Balance (non-stock), the
--     account with the 'retained_earnings' control role; or
--   - the owner's capital (sole proprietorship, one 'capital' account), with the
--     owner's drawings closed into capital as well; or
--   - the partners' capital accounts, by the profit shares given (partnership).
--     Partners' drawings stay open on the books.
--
-- The trial balance and the income figures read the books "before closing" for
-- the range asked: closing entries dated inside the range (and their reversals)
-- are left out, those dated before it are in the opening balances. So the year's
-- statements and returns still show the year's income after it is closed, and the
-- next year opens with the income in equity.
--
-- A closing entry is not a change to the year's taxable figures, so the period
-- lock does not stop it (nor its reversal): the year can be closed after its
-- annual return is filed. Reverse the closing entry to close the year again.

-- Closing entries and their reversals: left out of a range that contains them.
create or replace function private.is_closing(p_entry public.journal_entries) returns boolean
language sql stable security definer set search_path = '' as $$
  select p_entry.source = 'closing'
      or (p_entry.source = 'reversal' and exists (select 1 from public.journal_entries c where c.id = p_entry.reverses and c.source = 'closing'))
$$;

create or replace function public.trial_balance(p_client uuid, p_from date, p_to date)
returns table (account_id uuid, code text, name text, type text, normal_side text, fs_line text, bir_line text, opening numeric, debit numeric, credit numeric, closing numeric)
language sql stable security invoker set search_path = '' as $$
  select a.id, a.code, a.name, a.type, a.normal_side, a.fs_line, a.bir_line,
         coalesce(sum(l.debit - l.credit) filter (where e.entry_date < p_from), 0),
         coalesce(sum(l.debit) filter (where e.entry_date between p_from and p_to), 0),
         coalesce(sum(l.credit) filter (where e.entry_date between p_from and p_to), 0),
         coalesce(sum(l.debit - l.credit) filter (where e.entry_date <= p_to), 0)
  from public.ledger_accounts a
  left join public.journal_lines l on l.account_id = a.id
  left join public.journal_entries e on e.id = l.entry_id and e.status in ('posted', 'reversed')
    and not (e.entry_date >= p_from and private.is_closing(e))
  where a.client_id = p_client
  group by a.id
  order by a.sort_order, a.code
$$;

create or replace function public.ledger_income(p_client uuid, p_from date, p_to date)
returns table (account_id uuid, code text, name text, type text, bir_line text, net numeric)
language sql stable security invoker set search_path = '' as $$
  select a.id, a.code, a.name, a.type, a.bir_line, sum(l.debit - l.credit)
  from public.ledger_accounts a
  join public.journal_lines l on l.account_id = a.id
  join public.journal_entries e on e.id = l.entry_id
  where a.client_id = p_client
    and a.type in ('revenue', 'cost', 'expense', 'other_income', 'income_tax')
    and e.status in ('posted', 'reversed')
    and e.source <> 'opening'
    and not private.is_closing(e)
    and e.entry_date between p_from and p_to
  group by a.id
  order by a.sort_order, a.code
$$;

grant execute on function private.is_closing(public.journal_entries) to authenticated;

-- The period lock does not apply to closing entries and their reversals.
create or replace function private.journal_period_lock() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  late date;
begin
  if tg_op = 'INSERT' then
    if new.status = 'suggested' and new.source = 'document' and private.books_locked_by(new.client_id, new.entry_date) is not null then
      late := private.next_open_month(new.client_id, new.entry_date);
      if late is not null then
        new.memo := new.memo || ' · dated ' || to_char(new.entry_date, 'FMMon FMDD, YYYY') || ', booked late';
        new.entry_date := late;
      end if;
    elsif new.status <> 'suggested' and not private.is_closing(new) then
      perform private.check_books_open(new.client_id, case when new.source = 'opening' then new.entry_date + 1 else new.entry_date end);
    end if;
    return new;
  elsif tg_op = 'UPDATE' then
    if old.status = 'suggested' and new.status = 'posted' and not private.is_closing(new) then
      perform private.check_books_open(new.client_id, case when new.source = 'opening' then new.entry_date + 1 else new.entry_date end);
    end if;
    return new;
  end if;
  if old.status <> 'suggested' and old.source = 'opening' and exists (select 1 from public.clients where id = old.client_id) then
    perform private.check_books_open(old.client_id, old.entry_date + 1);
  end if;
  return old;
end;
$$;

-- One standing closing entry per client and date.
create unique index journal_entries_one_closing on public.journal_entries (client_id, entry_date) where source = 'closing' and status = 'posted';

-- Closes the taxable year ending p_year_end. p_shares, for several capital
-- accounts (partnership) only: [{account_id, percent}] adding up to 100.
create or replace function public.close_books_year(p_client uuid, p_year_end date, p_shares jsonb default null)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  b public.client_books;
  fye integer;
  re uuid;
  caps uuid[];
  drawings uuid[];
  lines jsonb := '[]'::jsonb;
  net numeric := 0; -- debit − credit of the income and expense accounts (a loss is positive)
  r record;
  pct_total numeric;
  allocated numeric := 0;
  share numeric;
  n integer;
  i integer := 0;
  label text;
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can close its books' using errcode = '42501';
  end if;
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'Set up the books first' using errcode = 'P0002'; end if;
  select fiscal_year_end_month into fye from public.clients where id = p_client;
  if p_year_end is null or extract(month from p_year_end) <> fye or extract(day from p_year_end + 1) <> 1 then
    raise exception 'Close on the last day of the taxable year (the year ends in month %)', fye using errcode = '22023';
  end if;
  if p_year_end < b.books_start then raise exception 'The books start after that year' using errcode = '22023'; end if;
  if p_year_end >= (now() at time zone 'Asia/Manila')::date then raise exception 'The year has not ended yet' using errcode = '22023'; end if;
  if exists (select 1 from public.journal_entries where client_id = p_client and source = 'closing' and status = 'posted' and entry_date = p_year_end) then
    raise exception 'That year is already closed; reverse its closing entry to close it again' using errcode = '22023';
  end if;
  if exists (select 1 from public.journal_entries where client_id = p_client and status = 'suggested' and entry_date <= p_year_end) then
    raise exception 'Confirm or remove the suggested entries of the year first' using errcode = '22023';
  end if;

  -- Each income and expense account's balance at the year end, closing entries included.
  for r in
    select a.id, sum(l.debit - l.credit) as bal
    from public.ledger_accounts a
    join public.journal_lines l on l.account_id = a.id
    join public.journal_entries e on e.id = l.entry_id and e.status in ('posted', 'reversed') and e.entry_date <= p_year_end
    where a.client_id = p_client and a.type in ('revenue', 'cost', 'expense', 'other_income', 'income_tax')
    group by a.id, a.sort_order, a.code
    having sum(l.debit - l.credit) <> 0
    order by a.sort_order, a.code
  loop
    lines := lines || jsonb_build_object('account_id', r.id, 'debit', greatest(-r.bal, 0), 'credit', greatest(r.bal, 0));
    net := net + r.bal;
  end loop;

  select id into re from public.ledger_accounts where client_id = p_client and control = 'retained_earnings';
  select array_agg(id order by sort_order, code) into caps from public.ledger_accounts where client_id = p_client and control = 'capital' and active;
  select array_agg(id order by sort_order, code) into drawings from public.ledger_accounts where client_id = p_client and control = 'drawings';

  if re is null and coalesce(array_length(caps, 1), 0) = 1 then
    -- Sole proprietorship: the owner's drawings close into capital too.
    for r in
      select a.id, sum(l.debit - l.credit) as bal
      from public.ledger_accounts a
      join public.journal_lines l on l.account_id = a.id
      join public.journal_entries e on e.id = l.entry_id and e.status in ('posted', 'reversed') and e.entry_date <= p_year_end
      where a.id = any (coalesce(drawings, '{}'))
      group by a.id
      having sum(l.debit - l.credit) <> 0
    loop
      lines := lines || jsonb_build_object('account_id', r.id, 'debit', greatest(-r.bal, 0), 'credit', greatest(r.bal, 0));
      net := net + r.bal;
    end loop;
  end if;

  if jsonb_array_length(lines) = 0 then raise exception 'There is nothing to close for that year' using errcode = '22023'; end if;

  if net <> 0 then
    if re is not null then
      lines := lines || jsonb_build_object('account_id', re, 'debit', greatest(net, 0), 'credit', greatest(-net, 0), 'description', 'Net income (loss) for the year');
    elsif coalesce(array_length(caps, 1), 0) = 1 then
      lines := lines || jsonb_build_object('account_id', caps[1], 'debit', greatest(net, 0), 'credit', greatest(-net, 0), 'description', 'Net income (loss) and drawings for the year');
    elsif coalesce(array_length(caps, 1), 0) > 1 then
      if p_shares is null or jsonb_typeof(p_shares) <> 'array' or jsonb_array_length(p_shares) = 0 then
        raise exception 'Give each partner''s share of the income' using errcode = '22023';
      end if;
      select sum((x ->> 'percent')::numeric), count(*) into pct_total, n from jsonb_array_elements(p_shares) x;
      if pct_total <> 100 then raise exception 'The partners'' shares add up to % percent, not 100', pct_total using errcode = '22023'; end if;
      if exists (select 1 from jsonb_array_elements(p_shares) x where not ((x ->> 'account_id')::uuid = any (caps)) or (x ->> 'percent')::numeric < 0) then
        raise exception 'Each share must be for one of the partners'' capital accounts' using errcode = '22023';
      end if;
      for r in select (x ->> 'account_id')::uuid as id, (x ->> 'percent')::numeric as pct from jsonb_array_elements(p_shares) x where (x ->> 'percent')::numeric > 0 loop
        i := i + 1;
        -- The last partner takes the rounding difference.
        share := case when i = (select count(*) from jsonb_array_elements(p_shares) x where (x ->> 'percent')::numeric > 0) then net - allocated else round(net * r.pct / 100, 2) end;
        allocated := allocated + share;
        lines := lines || jsonb_build_object('account_id', r.id, 'debit', greatest(share, 0), 'credit', greatest(-share, 0), 'description', 'Share in net income (loss), ' || r.pct || '%');
      end loop;
    else
      raise exception 'The chart of accounts has no Retained Earnings or capital account to close into' using errcode = '22023';
    end if;
  end if;

  -- Drop zero lines (a partner with a nil share on a nil income).
  select jsonb_agg(x) into lines from jsonb_array_elements(lines) x where (x ->> 'debit')::numeric <> 0 or (x ->> 'credit')::numeric <> 0;
  label := 'Closing entries for the year ended ' || to_char(p_year_end, 'FMMonth FMDD, YYYY');
  return private.post_entry(p_client, p_year_end, 'general_journal', 'closing', label, null, lines);
end;
$$;

revoke execute on function public.close_books_year(uuid, date, jsonb) from public, anon;
grant execute on function public.close_books_year(uuid, date, jsonb) to authenticated;
