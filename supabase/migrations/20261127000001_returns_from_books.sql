-- Rework phase 3a (docs/REWORK.md, decisions 10–12): return worksheets read the Books by
-- tax code, for locked periods only.
--
--   clients.income_tax_method      OSD, itemized, or 8% (individuals only, 1701Q), set per
--                                  client by the Owner or the staff assigned to it; the
--                                  1701Q and 1702Q worksheets use it (and the 2551Q: an
--                                  individual on 8% pays no percentage tax).
--   book_invoices.cwt_followed_up_*  a Sales Invoice whose customer has not sent the 2307
--                                  yet: its CWT is still claimed on the SAWT, and staff mark
--                                  that it was followed up (decision 12).
--   books_return_sources()         a filing's figures from the Books, one row per invoice
--                                  and kind of source, grouped by the tax codes on the lines
--                                  (SLS, SLP by category, SAWT from CWT and WV codes on Sales
--                                  Invoices, QAP from EWT codes on Purchase Invoices). Refused
--                                  unless every month from p_from to the period end is
--                                  locked in the Books.
--   books_non_deductible()         ND-coded purchase lines per account: added back for
--                                  income tax (NR lines stay deductible, NVP lines too).
--   vat_carry_over()               the excess input VAT on the previous 2550Q's worksheet.
--   ewt_remittances()              for a 1601-EQ, the 0619-E of months 1 and 2: what each
--                                  remitted (item 14 of its worksheet) and whether it was
--                                  filed and paid (only then is it deducted).
--   return_worksheet_guard         a worksheet of a return worked out from the Books is
--                                  saved only once the Books of its period are locked.
--
-- "Filed and paid" is one place: private.filing_settled().

-- ---------------------------------------------------------------------------
-- Income tax method per client.
-- ---------------------------------------------------------------------------

alter table public.clients add column income_tax_method text
  check (income_tax_method in ('osd', 'itemized', 'eight_percent'));
alter table public.clients add constraint clients_eight_percent_individual
  check (income_tax_method is distinct from 'eight_percent' or taxpayer_type = 'individual');

/** The Owner or the staff assigned to the client set (or clear, with null) its income tax method. */
create or replace function public.set_client_income_tax_method(p_client uuid, p_method text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
  m text := nullif(btrim(coalesce(p_method, '')), '');
begin
  select * into c from public.clients where id = p_client;
  if c.id is null or not (private.is_staff() and private.can_access_client(p_client)) then
    raise exception 'Client not found' using errcode = 'P0002';
  end if;
  if not (private.is_owner() or private.is_assigned(p_client)) then
    raise exception 'Only the Owner or staff assigned to this client set its income tax method' using errcode = '42501';
  end if;
  if m is not null and m not in ('osd', 'itemized', 'eight_percent') then
    raise exception 'Choose OSD, itemized deductions or the 8%% option' using errcode = '22023';
  end if;
  if m = 'eight_percent' and c.taxpayer_type <> 'individual' then
    raise exception 'The 8%% option is for individuals only (1701Q)' using errcode = '22023';
  end if;
  update public.clients set income_tax_method = m where id = p_client;
end;
$$;

-- ---------------------------------------------------------------------------
-- Missing 2307: the CWT is claimed and followed up.
-- ---------------------------------------------------------------------------

alter table public.book_invoices
  add column cwt_followed_up_at timestamptz,
  add column cwt_followed_up_by uuid references auth.users (id),
  add column cwt_follow_up_note text;

/** Marks that the customer was asked for the missing 2307 of a Sales Invoice with CWT. */
create or replace function public.mark_cwt_followed_up(p_invoice uuid, p_note text default null) returns void
language plpgsql security definer set search_path = '' as $$
declare
  inv public.book_invoices;
begin
  select * into inv from public.book_invoices where id = p_invoice;
  if inv.id is null or not (private.is_staff() and private.can_access_client(inv.client_id)) then
    raise exception 'Invoice not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(inv.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can mark a follow-up' using errcode = '42501';
  end if;
  if inv.kind <> 'sales' or inv.withholding <= 0 or inv.voided_at is not null then
    raise exception 'Only a Sales Invoice with tax withheld waits for a 2307' using errcode = '22023';
  end if;
  if inv.cwt_document_id is not null then
    raise exception 'The customer''s 2307 for this invoice is already in' using errcode = '22023';
  end if;
  update public.book_invoices
    set cwt_followed_up_at = now(), cwt_followed_up_by = auth.uid(), cwt_follow_up_note = nullif(btrim(coalesce(p_note, '')), '')
    where id = p_invoice;
end;
$$;

-- ---------------------------------------------------------------------------
-- Locked periods.
-- ---------------------------------------------------------------------------

/** Filed and paid: a return whose remittance counts (e.g. a 0619-E deducted on the 1601-EQ). */
create or replace function private.filing_settled(p_status text) returns boolean
language sql immutable set search_path = '' as $$
  select p_status in ('paid', 'proof_uploaded')
$$;

/** The months of the client's Books from p_from to p_to that are not locked ('January 2026, …'), or null when all are (or there are no Books). */
create or replace function private.books_open_months(p_client uuid, p_from date, p_to date) returns text
language sql stable security definer set search_path = '' as $$
  select string_agg(to_char(g, 'FMMonth YYYY'), ', ' order by g)
  from public.client_books b
  cross join lateral generate_series(date_trunc('month', greatest(p_from, b.books_start)), date_trunc('month', p_to), interval '1 month') g
  where b.client_id = p_client and private.books_locked_by(p_client, g::date) is null
$$;

-- ---------------------------------------------------------------------------
-- A filing's figures from the Books.
-- ---------------------------------------------------------------------------

/**
 * The Books' figures for a filing, from p_from (default: the period start) to the period
 * end, by tax code. Only posted, not void invoices count, in the month of their date.
 *   sales_invoice      one per Sales Invoice: VATable (Output VAT 12%) and its VAT, exempt
 *                      (VES), zero-rated (ZRS) and non-VAT (NVS) sales; an SC/PWD discount
 *                      comes off exempt sales first, then non-VAT, zero-rated, VATable.
 *   purchase_receipt   one per Purchase Invoice and SLP column: capital goods, other goods,
 *                      services (Input VAT 12% codes, with their VAT), exempt (VEP),
 *                      zero-rated (ZRP); non-VAT purchases (NVP) on their own row. ND and NR
 *                      lines feed no list or VAT return and are left out.
 *   bir_2307_received  CWT on a Sales Invoice (WC/WI code; income payment = subtotal less
 *                      discount) and VAT withheld by a government customer (WV010 / WV020;
 *                      payment = subtotal), for the SAWT; with whether the 2307 is in.
 *   bir_2307_issued    EWT on a Purchase Invoice (income payment = subtotal), for 0619-E,
 *                      1601-EQ and the QAP.
 * `uncoded` is the amount of lines with no tax code (or a code of the wrong side).
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
  with inv as (
    select i.* from public.book_invoices i
    join public.journal_entries j on j.id = i.journal_entry_id and j.status = 'posted'
    where i.client_id = f.client_id and i.voided_at is null and i.issue_date between v_from and f.period_end
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
         d.s_uncoded::numeric(18, 2), null::boolean, null::timestamptz, d.document_id
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
         null, null, p.document_id
  from purch p
  where p.kind is null or p.kind not in ('non_deductible', 'not_reported_purchases')
  union all
  -- CWT the customer withheld (WC / WI code on the Sales Invoice).
  select i.id, 'bir_2307_received', date_trunc('month', i.issue_date)::date, i.issue_date, i.reference, i.party_id, i.party_name, i.party_tin,
         null, 0, 0, 0, 0, 0, (i.subtotal - i.discount)::numeric(18, 2), w.atc, w.code, i.withholding, 0,
         i.cwt_document_id is not null, i.cwt_followed_up_at, i.document_id
  from inv i left join public.tax_codes w on w.id = i.withholding_code_id
  where i.kind = 'sales' and (i.withholding > 0 or i.withholding_code_id is not null)
  union all
  -- VAT withheld by a government customer (WV010 / WV020).
  select i.id, 'bir_2307_received', date_trunc('month', i.issue_date)::date, i.issue_date, i.reference, i.party_id, i.party_name, i.party_tin,
         null, 0, 0, 0, 0, 0, i.subtotal, v.atc, v.code, i.vat_withheld, 0,
         i.cwt_document_id is not null, i.cwt_followed_up_at, i.document_id
  from inv i left join public.tax_codes v on v.id = i.vat_withholding_code_id
  where i.kind = 'sales' and (i.vat_withheld > 0 or i.vat_withholding_code_id is not null)
  union all
  -- EWT the client withheld (WC / WI code on the Purchase Invoice).
  select i.id, 'bir_2307_issued', date_trunc('month', i.issue_date)::date, i.issue_date, i.reference, i.party_id, i.party_name, i.party_tin,
         null, 0, 0, 0, 0, 0, i.subtotal, w.atc, w.code, i.withholding, 0, null, null, i.document_id
  from inv i left join public.tax_codes w on w.id = i.withholding_code_id
  where i.kind = 'purchase' and (i.withholding > 0 or i.withholding_code_id is not null)
  order by 3, 4, 1, 2;
end;
$$;

/** ND-coded purchase lines per account (posted, not void, dated p_from to p_to): added back for income tax. */
create or replace function public.books_non_deductible(p_client uuid, p_from date, p_to date)
returns table (account_id uuid, code text, name text, bir_line text, amount numeric)
language sql stable security definer set search_path = '' as $$
  select a.id, a.code, a.name, a.bir_line, sum(l.amount)::numeric(18, 2)
  from public.book_invoice_lines l
  join public.book_invoices i on i.id = l.invoice_id
  join public.journal_entries j on j.id = i.journal_entry_id and j.status = 'posted'
  join public.tax_codes t on t.id = l.tax_code_id and t.kind = 'non_deductible'
  join public.ledger_accounts a on a.id = l.account_id
  where i.client_id = p_client and i.kind = 'purchase' and i.voided_at is null and i.issue_date between p_from and p_to
    and private.is_staff() and private.can_access_client(p_client)
  group by a.id, a.code, a.name, a.bir_line
  order by a.code
$$;

-- ---------------------------------------------------------------------------
-- Carry-overs between returns.
-- ---------------------------------------------------------------------------

/**
 * The client's previous 2550Q (the latest one ending before this filing's period, its
 * latest amendment): its excess input VAT (worksheet line excess_input_tax, in centavos),
 * whether its worksheet was saved, and whether it was filed. Across taxable years too.
 */
create or replace function public.vat_carry_over(p_filing uuid)
returns table (filing_id uuid, period_label text, period_end date, status text, filed boolean, computed boolean, excess bigint)
language sql stable security definer set search_path = '' as $$
  select p.id, p.period_label, p.period_end, p.status, p.status in ('filed', 'paid', 'proof_uploaded'), w.result is not null,
         coalesce((w.figures ->> 'excess_input_tax')::bigint, 0)
  from public.filing_instances f
  join lateral (
    select x.* from public.filing_instances x
    where x.client_id = f.client_id and x.form = '2550Q' and x.period_end < f.period_start
    order by x.period_end desc, x.amendment_no desc
    limit 1
  ) p on true
  left join public.return_worksheets w on w.filing_instance_id = p.id
  where f.id = p_filing and private.is_staff() and private.can_access_client(f.client_id)
$$;

/**
 * For a 1601-EQ: the 0619-E of the first and second months of its quarter. Of each month's
 * 0619-E (and its amendments) the latest filed and paid one, else the latest; what it
 * remitted (worksheet item 14, amount_of_remittance, in centavos) and whether it was filed
 * and paid. A month without a 0619-E has a row with no filing.
 */
create or replace function public.ewt_remittances(p_filing uuid)
returns table (month date, filing_id uuid, period_label text, status text, settled boolean, computed boolean, remitted bigint)
language sql stable security definer set search_path = '' as $$
  select m.month, x.id, x.period_label, x.status, coalesce(private.filing_settled(x.status), false), coalesce(w.result is not null, false),
         coalesce((w.figures ->> 'amount_of_remittance')::bigint, 0)
  from public.filing_instances f
  cross join lateral (
    select (date_trunc('month', f.period_start) + make_interval(months => n))::date as month from generate_series(0, 1) n
  ) m
  left join lateral (
    select e.* from public.filing_instances e
    where e.client_id = f.client_id and e.form = '0619-E' and date_trunc('month', e.period_start)::date = m.month
    order by private.filing_settled(e.status) desc, e.amendment_no desc
    limit 1
  ) x on true
  left join public.return_worksheets w on w.filing_instance_id = x.id
  where f.id = p_filing and f.form = '1601-EQ' and private.is_staff() and private.can_access_client(f.client_id)
  order by m.month
$$;

-- ---------------------------------------------------------------------------
-- A worksheet of a return from the Books is saved only for locked months.
-- ---------------------------------------------------------------------------

create or replace function private.return_worksheet_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  target uuid := case when tg_op = 'DELETE' then old.filing_instance_id else new.filing_instance_id end;
  open_months text;
begin
  if tg_op = 'UPDATE' and new.filing_instance_id <> old.filing_instance_id then
    raise exception 'A worksheet stays with its filing' using errcode = '22023';
  end if;
  select * into f from public.filing_instances where id = target;
  if f.id is null then
    -- The filing is being deleted (cascade): let the worksheet go with it.
    if tg_op = 'DELETE' then return old; end if;
    raise exception 'Filing not found' using errcode = 'P0002';
  end if;
  if f.status in ('filed', 'paid', 'proof_uploaded') then
    raise exception 'This return has been filed; its worksheet is locked' using errcode = '42501';
  end if;
  if tg_op = 'DELETE' then return old; end if;
  if new.result is not null and f.form = any (private.book_lock_forms()) then
    open_months := private.books_open_months(f.client_id, f.period_start, f.period_end);
    if open_months is not null then
      raise exception 'The Books are not locked for %: lock the months before saving the worksheet', open_months using errcode = '55000';
    end if;
  end if;
  new.client_id := f.client_id;
  return new;
end;
$$;

revoke execute on function public.set_client_income_tax_method(uuid, text) from public, anon;
revoke execute on function public.mark_cwt_followed_up(uuid, text) from public, anon;
revoke execute on function public.books_return_sources(uuid, date) from public, anon;
revoke execute on function public.books_non_deductible(uuid, date, date) from public, anon;
revoke execute on function public.vat_carry_over(uuid) from public, anon;
revoke execute on function public.ewt_remittances(uuid) from public, anon;
grant execute on function public.set_client_income_tax_method(uuid, text) to authenticated;
grant execute on function public.mark_cwt_followed_up(uuid, text) to authenticated;
grant execute on function public.books_return_sources(uuid, date) to authenticated;
grant execute on function public.books_non_deductible(uuid, date, date) to authenticated;
grant execute on function public.vat_carry_over(uuid) to authenticated;
grant execute on function public.ewt_remittances(uuid) to authenticated;
revoke execute on function private.filing_settled(text) from public, anon, authenticated;
revoke execute on function private.books_open_months(uuid, date, date) from public, anon, authenticated;
revoke execute on function private.return_worksheet_guard() from public, anon;
