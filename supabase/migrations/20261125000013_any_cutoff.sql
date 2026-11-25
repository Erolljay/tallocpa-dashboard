-- Any cut-off for the books (Owner, 25 November 2026): the books can start at the
-- beginning of a calendar or fiscal year, or part-way through it (e.g. the second
-- quarter).
--
--  - Year-start cut-off: the opening trial balance is after closing, so it holds no
--    income or expense accounts (save_opening_balances refuses them).
--  - Mid-year cut-off: the opening carries the taxable year to date's income and
--    expenses, dated the day before the books start. ledger_income now counts them, so
--    the quarterly and annual income tax returns read the whole year from the books;
--    the year-end closing already does.
--  - change_books_start(): the cut-off can be moved while nothing but the opening
--    balances is in the books (the opening is removed; enter it again as of the new date).

create or replace function public.save_opening_balances(p_client uuid, p_lines jsonb, p_items jsonb default '[]'::jsonb)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  b public.client_books;
  fye int;
  e uuid;
  ar uuid;
  ap uuid;
  ar_balance numeric := 0;
  ap_balance numeric := 0;
  ar_items numeric;
  ap_items numeric;
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can enter its opening balances' using errcode = '42501';
  end if;
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'Set up the books first' using errcode = 'P0002'; end if;
  p_items := coalesce(p_items, '[]'::jsonb);

  -- At the start of a taxable year the income and expense accounts were closed into equity, so
  -- the opening holds none. A mid-year cut-off carries the year to date's income and expenses.
  select fiscal_year_end_month into fye from public.clients where id = p_client;
  if extract(month from b.books_start)::int = (fye % 12) + 1 and exists (
    select 1 from jsonb_array_elements(p_lines) x join public.ledger_accounts a on a.id = (x ->> 'account_id')::uuid
    where a.type in ('revenue', 'cost', 'expense', 'other_income', 'income_tax')
      and (coalesce((x ->> 'debit')::numeric, 0) <> 0 or coalesce((x ->> 'credit')::numeric, 0) <> 0)
  ) then
    raise exception 'The books start at the beginning of a taxable year, so the opening balances hold no income or expenses: close them into retained earnings or capital first' using errcode = '22023';
  end if;

  perform set_config('ledger.replace_opening', 'on', true);
  delete from public.journal_entries where client_id = p_client and source = 'opening';
  perform set_config('ledger.replace_opening', 'off', true);

  e := private.post_entry(p_client, b.books_start - 1, 'general_journal', 'opening', 'Opening balances', null, p_lines);

  select id into ar from public.ledger_accounts where client_id = p_client and control = 'ar';
  select id into ap from public.ledger_accounts where client_id = p_client and control = 'ap';
  select coalesce(sum(debit - credit), 0) into ar_balance from public.journal_lines where entry_id = e and account_id = ar;
  select coalesce(sum(credit - debit), 0) into ap_balance from public.journal_lines where entry_id = e and account_id = ap;
  select coalesce(sum((x ->> 'amount')::numeric(18, 2)) filter (where x ->> 'kind' = 'receivable'), 0),
         coalesce(sum((x ->> 'amount')::numeric(18, 2)) filter (where x ->> 'kind' = 'payable'), 0)
    into ar_items, ap_items
    from jsonb_array_elements(p_items) as x;
  if ar_items <> ar_balance then
    raise exception 'The receivables listed (%) do not add up to the Accounts Receivable balance (%)', ar_items, ar_balance using errcode = '22023';
  end if;
  if ap_items <> ap_balance then
    raise exception 'The payables listed (%) do not add up to the Accounts Payable balance (%)', ap_items, ap_balance using errcode = '22023';
  end if;

  insert into public.open_items (client_id, kind, party_id, party_name, party_tin, doc_number, doc_date, due_date, amount, balance, account_id, source_entry_id)
  select p_client, i.kind,
         (select p.id from public.parties p where p.tin = nullif(i.party_tin, '') and p.branch_code = '00000'),
         btrim(i.party_name), nullif(i.party_tin, ''), nullif(btrim(i.doc_number), ''), i.doc_date, i.due_date,
         i.amount, i.amount, case when i.kind = 'receivable' then ar else ap end, e
  from jsonb_to_recordset(p_items) as i(kind text, party_name text, party_tin text, doc_number text, doc_date date, due_date date, amount numeric(18, 2));
  return e;
end;
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
    -- Opening income and expenses exist only for a mid-year cut-off: the year to date.
    and not private.is_closing(e)
    and e.entry_date between p_from and p_to
  group by a.id
  order by a.sort_order, a.code
$$;

/** Moves a client's books start (the cut-off) while nothing but the opening balances is in the books. */
create or replace function public.change_books_start(p_client uuid, p_start date) returns void
language plpgsql security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_start)::date;
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can change its books' using errcode = '42501';
  end if;
  if not exists (select 1 from public.client_books where client_id = p_client) then raise exception 'Set up the books first' using errcode = 'P0002'; end if;
  if p_start is null or p_start <> m then raise exception 'The books start on the first day of a month' using errcode = '22023'; end if;
  if exists (select 1 from public.journal_entries where client_id = p_client and source <> 'opening') then
    raise exception 'Entries are already in the books; the books start can no longer change' using errcode = '22023';
  end if;
  if exists (select 1 from public.fixed_assets where client_id = p_client and source = 'opening' and acquired_on >= m) then
    raise exception 'An opening asset was bought on or after %; remove it first', m using errcode = '22023';
  end if;
  perform set_config('ledger.replace_opening', 'on', true);
  delete from public.journal_entries where client_id = p_client and source = 'opening';
  perform set_config('ledger.replace_opening', 'off', true);
  update public.client_books set books_start = m where client_id = p_client;
end;
$$;

revoke execute on function public.change_books_start(uuid, date) from public, anon;
grant execute on function public.change_books_start(uuid, date) to authenticated;
