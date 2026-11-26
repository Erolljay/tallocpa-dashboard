-- Parallel run (docs/REWORK.md, "What changes underneath"): before the old register screens
-- are retired, the returns' figures from the register (register_lines, read as the return
-- worksheets read them before the Books) are compared with the figures from the Books by
-- tax code, client by client and month by month, to the centavo
-- (src/lib/parallel-run/compare.ts, pages under Books -> Reports and Firm).
--
--   private.books_sources()      the Books' figures by tax code for a client and a date range:
--                                the query books_return_sources ran, moved here unchanged so
--                                the returns and the parallel run read the very same figures;
--                                plus the 2307 that supports a Sales Invoice's CWT
--                                (cwt_document_id), to match it with the old 2307 line.
--   books_return_sources()       unchanged for its callers: the filing's checks and the lock
--                                gate, then private.books_sources().
--   books_parallel_run()         the same figures for any months of a client, locked or not,
--                                for the Owner and the staff assigned to the client (as the
--                                Books pages). Read only.
--
-- The register and its screens are not changed.

/** The Books' figures by tax code, posted and not void invoices dated p_from to p_to (see books_return_sources). */
create or replace function private.books_sources(p_client uuid, p_from date, p_to date)
returns table (
  invoice_id uuid, source text, month date, issue_date date, reference text, party_id uuid, party_name text, party_tin text,
  slp_category text, vatable numeric, vat_exempt numeric, zero_rated numeric, non_vat numeric, vat numeric, total numeric,
  atc text, tax_code text, withholding numeric, uncoded numeric, cwt_supported boolean, cwt_followed_up_at timestamptz, document_id uuid,
  cwt_document_id uuid
)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not (private.is_staff() and private.can_access_client(p_client)) then
    raise exception 'Client not found' using errcode = 'P0002';
  end if;

  return query
  with inv as (
    select i.* from public.book_invoices i
    join public.journal_entries j on j.id = i.journal_entry_id and j.status = 'posted'
    where i.client_id = p_client and i.voided_at is null and i.issue_date between p_from and p_to
  ),
  ln as (
    select l.invoice_id, t.kind, sum(l.amount) as amount, sum(l.tax_amount) as tax
    from public.book_invoice_lines l
    join inv on inv.id = l.invoice_id
    left join public.tax_codes t on t.id = l.tax_code_id
    group by l.invoice_id, t.kind
  ),
  sales as (
    select inv.*,
           coalesce(a.s_vatable, 0) as s_vatable, coalesce(a.s_vat, 0) as s_vat, coalesce(a.s_exempt, 0) as s_exempt,
           coalesce(a.s_zero, 0) as s_zero, coalesce(a.s_nonvat, 0) as s_nonvat, coalesce(a.s_uncoded, 0) as s_uncoded
    from inv
    left join (
      select ln.invoice_id,
             sum(ln.amount) filter (where ln.kind = 'output_vat') as s_vatable,
             sum(ln.tax) filter (where ln.kind = 'output_vat') as s_vat,
             sum(ln.amount) filter (where ln.kind = 'vat_exempt_sales') as s_exempt,
             sum(ln.amount) filter (where ln.kind = 'zero_rated_sales') as s_zero,
             sum(ln.amount) filter (where ln.kind = 'non_vat_sales') as s_nonvat,
             sum(ln.amount) filter (where ln.kind is null or ln.kind not in ('output_vat', 'vat_exempt_sales', 'zero_rated_sales', 'non_vat_sales')) as s_uncoded
      from ln group by ln.invoice_id
    ) a on a.invoice_id = inv.id
    where inv.kind = 'sales'
  ),
  -- The discount comes off exempt sales first (an SC/PWD sale is VAT-exempt), then the others.
  disc as (
    select s.*, a.d1, b.d2, c.d3, greatest(s.discount - a.d1 - b.d2 - c.d3, 0) as d4
    from sales s
    cross join lateral (select least(s.discount, s.s_exempt) as d1) a
    cross join lateral (select least(s.discount - a.d1, s.s_nonvat) as d2) b
    cross join lateral (select least(s.discount - a.d1 - b.d2, s.s_zero) as d3) c
  ),
  purch as (
    select inv.id, inv.issue_date, inv.reference, inv.party_id, inv.party_name, inv.party_tin, inv.document_id, ln.kind, ln.amount, ln.tax
    from inv join ln on ln.invoice_id = inv.id
    where inv.kind = 'purchase'
  )
  select d.id, 'sales_invoice'::text, date_trunc('month', d.issue_date)::date, d.issue_date, d.reference, d.party_id, d.party_name, d.party_tin,
         null::text, (d.s_vatable - d.d4)::numeric(18, 2), (d.s_exempt - d.d1)::numeric(18, 2), (d.s_zero - d.d3)::numeric(18, 2),
         (d.s_nonvat - d.d2)::numeric(18, 2), d.s_vat::numeric(18, 2), d.total, null::text, null::text, 0::numeric(18, 2),
         d.s_uncoded::numeric(18, 2), null::boolean, null::timestamptz, d.document_id, d.cwt_document_id
  from disc d
  union all
  select p.id, 'purchase_receipt', date_trunc('month', p.issue_date)::date, p.issue_date, p.reference, p.party_id, p.party_name, p.party_tin,
         case p.kind when 'input_vat_capital' then 'capital_goods' when 'input_vat_goods' then 'other_goods' when 'input_vat_services' then 'services'
                     when 'vat_exempt_purchases' then 'exempt' when 'zero_rated_purchases' then 'zero_rated' end,
         case when p.kind in ('input_vat_capital', 'input_vat_goods', 'input_vat_services') then p.amount else 0 end::numeric(18, 2),
         case when p.kind = 'vat_exempt_purchases' then p.amount else 0 end::numeric(18, 2),
         case when p.kind = 'zero_rated_purchases' then p.amount else 0 end::numeric(18, 2),
         case when p.kind = 'non_vat_purchases' then p.amount else 0 end::numeric(18, 2),
         case when p.kind in ('input_vat_capital', 'input_vat_goods', 'input_vat_services') then p.tax else 0 end::numeric(18, 2),
         (p.amount + p.tax)::numeric(18, 2), null, null, 0::numeric(18, 2),
         case when p.kind is null or p.kind not in ('input_vat_capital', 'input_vat_goods', 'input_vat_services', 'vat_exempt_purchases',
                                                     'zero_rated_purchases', 'non_vat_purchases', 'non_deductible', 'not_reported_purchases')
              then p.amount else 0 end::numeric(18, 2),
         null, null, p.document_id, null::uuid
  from purch p
  where p.kind is null or p.kind not in ('non_deductible', 'not_reported_purchases')
  union all
  -- CWT the customer withheld (WC / WI code on the Sales Invoice).
  select i.id, 'bir_2307_received', date_trunc('month', i.issue_date)::date, i.issue_date, i.reference, i.party_id, i.party_name, i.party_tin,
         null, 0, 0, 0, 0, 0, (i.subtotal - i.discount)::numeric(18, 2), w.atc, w.code, i.withholding, 0,
         i.cwt_document_id is not null, i.cwt_followed_up_at, i.document_id, i.cwt_document_id
  from inv i left join public.tax_codes w on w.id = i.withholding_code_id
  where i.kind = 'sales' and (i.withholding > 0 or i.withholding_code_id is not null)
  union all
  -- VAT withheld by a government customer (WV010 / WV020).
  select i.id, 'bir_2307_received', date_trunc('month', i.issue_date)::date, i.issue_date, i.reference, i.party_id, i.party_name, i.party_tin,
         null, 0, 0, 0, 0, 0, i.subtotal, v.atc, v.code, i.vat_withheld, 0,
         i.cwt_document_id is not null, i.cwt_followed_up_at, i.document_id, i.cwt_document_id
  from inv i left join public.tax_codes v on v.id = i.vat_withholding_code_id
  where i.kind = 'sales' and (i.vat_withheld > 0 or i.vat_withholding_code_id is not null)
  union all
  -- EWT the client withheld (WC / WI code on the Purchase Invoice).
  select i.id, 'bir_2307_issued', date_trunc('month', i.issue_date)::date, i.issue_date, i.reference, i.party_id, i.party_name, i.party_tin,
         null, 0, 0, 0, 0, 0, i.subtotal, w.atc, w.code, i.withholding, 0, null, null, i.document_id, null
  from inv i left join public.tax_codes w on w.id = i.withholding_code_id
  where i.kind = 'purchase' and (i.withholding > 0 or i.withholding_code_id is not null)
  order by 3, 4, 1, 2;
end;
$$;

/**
 * A filing's figures from the Books (migration 20261127000001), from p_from (default: the
 * period start) to the period end. Refused unless every month of it is locked.
 */
create or replace function public.books_return_sources(p_filing uuid, p_from date default null)
returns table (
  invoice_id uuid, source text, month date, issue_date date, reference text, party_id uuid, party_name text, party_tin text,
  slp_category text, vatable numeric, vat_exempt numeric, zero_rated numeric, non_vat numeric, vat numeric, total numeric,
  atc text, tax_code text, withholding numeric, uncoded numeric, cwt_supported boolean, cwt_followed_up_at timestamptz, document_id uuid
)
language plpgsql stable security definer set search_path = '' as $$
declare
  f public.filing_instances;
  v_from date;
  open_months text;
begin
  select * into f from public.filing_instances where id = p_filing;
  if f.id is null or not (private.is_staff() and private.can_access_client(f.client_id)) then
    raise exception 'Filing not found' using errcode = 'P0002';
  end if;
  v_from := least(coalesce(p_from, f.period_start), f.period_start);
  open_months := private.books_open_months(f.client_id, v_from, f.period_end);
  if open_months is not null then
    raise exception 'The Books are not locked for %: a return is worked out only from locked months', open_months using errcode = '55000';
  end if;

  return query
  select s.invoice_id, s.source, s.month, s.issue_date, s.reference, s.party_id, s.party_name, s.party_tin,
         s.slp_category, s.vatable, s.vat_exempt, s.zero_rated, s.non_vat, s.vat, s.total,
         s.atc, s.tax_code, s.withholding, s.uncoded, s.cwt_supported, s.cwt_followed_up_at, s.document_id
  from private.books_sources(f.client_id, v_from, f.period_end) s
  order by s.month, s.issue_date, s.invoice_id, s.source;
end;
$$;

/**
 * The parallel run's new side: the Books' figures by tax code for a client's months p_from
 * to p_to (first day to last day), locked or not. For the Owner and the staff assigned to
 * the client, as the Books pages; anyone else is told the client is not found.
 */
create or replace function public.books_parallel_run(p_client uuid, p_from date, p_to date)
returns table (
  invoice_id uuid, source text, month date, issue_date date, reference text, party_id uuid, party_name text, party_tin text,
  slp_category text, vatable numeric, vat_exempt numeric, zero_rated numeric, non_vat numeric, vat numeric, total numeric,
  atc text, tax_code text, withholding numeric, uncoded numeric, cwt_supported boolean, cwt_followed_up_at timestamptz, document_id uuid,
  cwt_document_id uuid
)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not (private.is_staff() and private.can_keep_books(p_client)) then
    raise exception 'Client not found' using errcode = 'P0002';
  end if;
  if p_from is null or p_to is null or p_to < p_from then
    raise exception 'Give the first and last day of the months to compare' using errcode = '22023';
  end if;
  if p_to - p_from > 400 then
    raise exception 'Compare at most a year at a time' using errcode = '22023';
  end if;
  return query select * from private.books_sources(p_client, p_from, p_to);
end;
$$;

revoke execute on function private.books_sources(uuid, date, date) from public, anon, authenticated;
revoke execute on function public.books_return_sources(uuid, date) from public, anon;
revoke execute on function public.books_parallel_run(uuid, date, date) from public, anon;
grant execute on function public.books_return_sources(uuid, date) to authenticated;
grant execute on function public.books_parallel_run(uuid, date, date) to authenticated;
