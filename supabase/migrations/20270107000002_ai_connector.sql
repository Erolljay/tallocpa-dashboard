-- AI employees, step 2: what the TalloCPA OS connector's first tools read
-- (docs/AI-WORKFORCE.md §6, §7). Read-only grants, on top of step 1
-- (20270107000001_ai_employees.sql), for AI employees that are switched on.
--
--   * the obligations and filings (returns, due dates, status) of their clients, for
--     deadlines and status questions;
--   * a trial balance at Summary access: totals by account for a period, with no
--     entries, customers or suppliers. At Full access the ordinary trial_balance()
--     already works, because it runs under the caller's own rights.

create policy ai_obligations_read on public.obligations for select to authenticated
  using (client_id = any ((select private.ai_client_ids())::uuid[]));

create policy ai_filings_read on public.filing_instances for select to authenticated
  using (client_id = any ((select private.ai_client_ids())::uuid[]));

-- The trial balance for an AI employee at Summary or Full access to the client, and for
-- nobody else (staff use trial_balance()). Totals by account only.
create or replace function public.ai_trial_balance(p_client uuid, p_from date, p_to date)
returns table (code text, name text, type text, fs_line text, bir_line text, opening numeric, debit numeric, credit numeric, closing numeric)
language plpgsql stable security definer set search_path = '' as $$
begin
  if private.ai_books_level(auth.uid(), p_client) not in ('summary', 'full') then
    raise exception 'No books access for this client' using errcode = '42501';
  end if;
  if p_from > p_to then
    raise exception 'The period starts after it ends' using errcode = '22023';
  end if;
  return query
    select t.code, t.name, t.type, t.fs_line, t.bir_line, t.opening, t.debit, t.credit, t.closing
    from public.trial_balance(p_client, p_from, p_to) t;
end;
$$;

revoke all on function public.ai_trial_balance(uuid, date, date) from public;
grant execute on function public.ai_trial_balance(uuid, date, date) to authenticated;
