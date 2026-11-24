-- Bookkeeping, Phase 1B slice 7 (spec §3.6): cash flow statement.
--
-- Each account carries how it reports on the statement of cash flows (indirect
-- method): 'cash' (cash and cash equivalents), 'operating' (working capital),
-- 'investing', 'financing', or 'noncash' (non-cash items added back to net
-- income, e.g. accumulated depreciation). Null: worked out from the account's
-- FS line by the app (src/lib/ledger/cash-flow.ts `defaultCashFlow`).

alter table public.ledger_accounts
  add column cash_flow text check (cash_flow in ('cash', 'operating', 'investing', 'financing', 'noncash'));

-- The trial balance also gives each account's normal side and cash-flow class.
drop function public.trial_balance(uuid, date, date);
create function public.trial_balance(p_client uuid, p_from date, p_to date)
returns table (account_id uuid, code text, name text, type text, normal_side text, fs_line text, bir_line text, control text, cash_flow text,
               opening numeric, debit numeric, credit numeric, closing numeric)
language sql stable security invoker set search_path = '' as $$
  select a.id, a.code, a.name, a.type, a.normal_side, a.fs_line, a.bir_line, a.control, a.cash_flow,
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

revoke execute on function public.trial_balance(uuid, date, date) from public, anon;
grant execute on function public.trial_balance(uuid, date, date) to authenticated;
