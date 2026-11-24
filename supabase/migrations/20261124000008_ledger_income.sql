-- Bookkeeping, Phase 1B slice 5 (spec §3.6, §3.7): income tax computed from the
-- ledger. The quarterly income tax worksheets (1701Q, 1702Q) read each income
-- and expense account's movement for a date range and group it by the account's
-- BIR income tax line (ledger_accounts.bir_line, src/lib/ledger/bir-lines.ts).
--
-- Posted entries count, and so do reversed ones (their reversal is posted too,
-- so the pair nets to nil). Suggestions do not count. Opening balances carry no
-- income or expense, and year-end closing entries are left out so the year's
-- income is not zeroed.

-- Net debit − credit of each income and expense account dated p_from…p_to.
-- Runs with the caller's rights, so row-level security applies.
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
    and e.source not in ('opening', 'closing')
    and e.entry_date between p_from and p_to
  group by a.id
  order by a.sort_order, a.code
$$;

revoke execute on function public.ledger_income(uuid, date, date) from public, anon;
grant execute on function public.ledger_income(uuid, date, date) to authenticated;
