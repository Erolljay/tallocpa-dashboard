-- Rework phase 5 (docs/REWORK.md, decisions 11 and 23): the 1604-E worksheet.
--
-- The 1604-E (Annual Information Return of Creditable Income Taxes Withheld (Expanded))
-- is built from the year's QAP: the EWT on the year's Purchase Invoices in the Books,
-- read through books_return_sources (so only once all twelve months are locked). Its
-- Part II, the summary of remittances per 1601-EQ, comes from the four 1601-EQ returns
-- of the year: this function gives each quarter's latest return (the filed one first,
-- then the highest amendment), its figures and how it was filed and paid.

create or replace function public.ewt_year_remittances(p_filing uuid)
returns table (
  quarter_start date, filing_id uuid, period_label text, status text, settled boolean, computed boolean,
  withheld bigint, penalties bigint, filed_on date, payment_reference text, paid_on date
)
language sql stable security definer set search_path = '' as $$
  select q.quarter_start, x.id, x.period_label, x.status, coalesce(private.filing_settled(x.status), false), coalesce(w.result is not null, false),
         coalesce((w.figures ->> 'total_taxes_withheld')::bigint, 0),
         coalesce((w.figures ->> 'total_penalties')::bigint, 0),
         x.filed_on, x.payment_reference, x.paid_on
  from public.filing_instances f
  cross join lateral (
    select (date_trunc('month', f.period_start) + make_interval(months => 3 * n))::date as quarter_start from generate_series(0, 3) n
  ) q
  left join lateral (
    select e.* from public.filing_instances e
    where e.client_id = f.client_id and e.form = '1601-EQ' and date_trunc('month', e.period_start)::date = q.quarter_start
    order by private.filing_settled(e.status) desc, e.amendment_no desc
    limit 1
  ) x on true
  left join public.return_worksheets w on w.filing_instance_id = x.id
  where f.id = p_filing and f.form = '1604-E' and private.is_staff() and private.can_access_client(f.client_id)
  order by q.quarter_start
$$;

revoke execute on function public.ewt_year_remittances(uuid) from public, anon;
grant execute on function public.ewt_year_remittances(uuid) to authenticated;
