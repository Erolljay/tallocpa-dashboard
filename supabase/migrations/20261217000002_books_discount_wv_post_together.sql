-- The Books, as the Owner keeps them (26 November 2026):
--
-- 1. VAT withheld by a government customer (WV010 / WV020) stays its rate on the invoice's
--    total net sales (VATable, exempt and zero-rated). An SC/PWD discount is for
--    individuals, so a government customer's invoice cannot carry one.
-- 2. The only discount on an invoice is the SC/PWD discount, on sales that carry no VAT:
--    a Sales Invoice's discount cannot be more than its VAT-exempt (or non-VAT) sales.
-- 3. Sales are reported gross on the SLS and the 2550Q (exempt sales of 1,000 with an
--    SC/PWD discount of 200 are exempt sales of 1,000, as the register reports them); the
--    discount is kept separately in the books.
-- 4. Approving a document and posting it to the Books happen together
--    (approve_and_post_document): when it cannot be posted (a locked month, a missing
--    account) it is not approved either and stays in the Inbox. A sale or purchase dated in
--    a locked month is offered the first open month after it instead: approved, it is
--    posted on that month's first day (the Owner's practice for late documents). A month
--    cannot be locked while an approved sale or purchase dated in it is not in the Books.

create or replace function private.book_write_invoice(p_client uuid, p_id uuid, p jsonb, p_document uuid, p_link_entry uuid default null)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_kind text := p ->> 'kind';
  v_party uuid := nullif(p ->> 'party_id', '')::uuid;
  v_name text;
  v_tin text;
  v_issue date := nullif(p ->> 'issue_date', '')::date;
  v_due date := nullif(p ->> 'due_date', '')::date;
  v_disc numeric := coalesce(nullif(p ->> 'discount', '')::numeric(18, 2), 0);
  wcode public.tax_codes;
  vcode public.tax_codes;
  v_wh numeric;
  v_wv numeric;
  v_sub numeric;
  v_noVat numeric;
  v_tax numeric;
  v_total numeric;
  v_due_amt numeric;
  inv uuid := p_id;
  x jsonb;
  n integer := 0;
  acc public.ledger_accounts;
  tc public.tax_codes;
  amt numeric;
  tax numeric;
  oi public.open_items;
  who text;
begin
  if v_kind is null or v_kind not in ('sales', 'purchase') then raise exception 'Choose a Sales Invoice or a Purchase Invoice' using errcode = '22023'; end if;
  who := case v_kind when 'sales' then 'customer' else 'supplier' end;
  if v_issue is null then raise exception 'Enter the invoice date' using errcode = '22023'; end if;
  if v_due is not null and v_due < v_issue then raise exception 'The due date cannot be before the invoice date' using errcode = '22023'; end if;
  if v_party is not null and not exists (select 1 from public.parties where id = v_party) then
    raise exception 'That % is not in the directory', who using errcode = 'P0002';
  end if;
  v_name := coalesce(nullif(btrim(p ->> 'party_name'), ''), (select display_name from public.parties where id = v_party));
  if v_name is null then raise exception 'Enter the %', who using errcode = '22023'; end if;
  v_tin := coalesce(nullif(btrim(p ->> 'party_tin'), ''), (select tin from public.parties where id = v_party));
  if jsonb_typeof(p -> 'lines') is distinct from 'array' or jsonb_array_length(p -> 'lines') = 0 then
    raise exception 'An invoice needs at least one line' using errcode = '22023';
  end if;
  if v_kind = 'purchase' and (v_disc <> 0 or coalesce(nullif(p ->> 'vat_withheld', '')::numeric, 0) <> 0 or nullif(p ->> 'vat_withholding_code_id', '') is not null) then
    raise exception 'A discount or VAT withheld goes only on a Sales Invoice' using errcode = '22023';
  end if;
  if v_disc < 0 then raise exception 'The discount cannot be negative' using errcode = '22023'; end if;

  if nullif(p ->> 'withholding_code_id', '') is not null then
    select * into wcode from public.tax_codes where id = (p ->> 'withholding_code_id')::uuid;
    if wcode.id is null or wcode.kind <> 'withholding' then
      raise exception 'Choose a withholding tax code (WC or WI) for the tax withheld' using errcode = '22023';
    end if;
  end if;
  if nullif(p ->> 'vat_withholding_code_id', '') is not null then
    select * into vcode from public.tax_codes where id = (p ->> 'vat_withholding_code_id')::uuid;
    if vcode.id is null or vcode.kind <> 'govt_vat_withheld' then
      raise exception 'Choose WV010 or WV020 for the VAT withheld' using errcode = '22023';
    end if;
  end if;

  if inv is null then
    insert into public.book_invoices (client_id, kind, party_id, party_name, party_tin, reference, issue_date, due_date, description, document_id,
                                      withholding_code_id, vat_withholding_code_id, discount, legacy)
    values (p_client, v_kind, v_party, v_name, v_tin, nullif(btrim(p ->> 'reference'), ''), v_issue, v_due, nullif(btrim(p ->> 'description'), ''), p_document,
            wcode.id, vcode.id, v_disc, p_link_entry is not null)
    returning id into inv;
  else
    update public.book_invoices
      set party_id = v_party, party_name = v_name, party_tin = v_tin, reference = nullif(btrim(p ->> 'reference'), ''),
          issue_date = v_issue, due_date = v_due, description = nullif(btrim(p ->> 'description'), ''),
          withholding_code_id = wcode.id, vat_withholding_code_id = vcode.id, discount = v_disc,
          journal_entry_id = null, open_item_id = null
      where id = inv;
    delete from public.book_invoice_lines where invoice_id = inv;
  end if;

  for x in select * from jsonb_array_elements(p -> 'lines') loop
    n := n + 1;
    select * into acc from public.ledger_accounts where id = nullif(x ->> 'account_id', '')::uuid and client_id = p_client;
    if acc.id is null or not acc.active then raise exception 'Line %: choose the account', n using errcode = '22023'; end if;
    if acc.control in ('ar', 'ap', 'input_vat', 'output_vat', 'cwt', 'cwt_awaiting', 'ewt_payable', 'vat_withheld') then
      raise exception 'Line %: % is posted by the Books itself; choose an income, expense or asset account', n, acc.name using errcode = '22023';
    end if;
    amt := nullif(x ->> 'amount', '')::numeric(18, 2);
    if amt is null or amt = 0 then raise exception 'Line %: enter the amount', n using errcode = '22023'; end if;
    tc := null;
    if nullif(x ->> 'tax_code_id', '') is not null then
      select * into tc from public.tax_codes where id = (x ->> 'tax_code_id')::uuid;
      if tc.id is null then raise exception 'Line %: tax code not found', n using errcode = 'P0002'; end if;
      if tc.kind in ('withholding', 'govt_vat_withheld') then
        raise exception 'Line %: % is a withholding code; put it on the invoice, not on a line', n, tc.code using errcode = '22023';
      end if;
      if tc.applies_to <> (case v_kind when 'sales' then 'sales' else 'purchases' end) then
        raise exception 'Line %: % cannot go on a % invoice', n, tc.name, case v_kind when 'sales' then 'sales' else 'purchase' end using errcode = '22023';
      end if;
    end if;
    tax := coalesce(nullif(x ->> 'tax_amount', '')::numeric(18, 2), round(amt * coalesce(tc.rate, 0), 2));
    if tax <> 0 and coalesce(tc.rate, 0) = 0 then
      raise exception 'Line %: only a 12%% VAT code carries VAT', n using errcode = '22023';
    end if;
    insert into public.book_invoice_lines (client_id, invoice_id, line_no, account_id, description, amount, tax_code_id, tax_amount)
    values (p_client, inv, n, acc.id, nullif(btrim(x ->> 'description'), ''), amt, tc.id, tax);
  end loop;

  select coalesce(sum(amount), 0), coalesce(sum(tax_amount), 0) into v_sub, v_tax from public.book_invoice_lines where invoice_id = inv;
  -- The only discount on an invoice is the SC/PWD discount, on sales that carry no VAT.
  if v_disc > 0 and vcode.id is not null then
    raise exception 'An SC/PWD discount is for individuals: a government customer''s invoice (with % withheld) has none', vcode.code using errcode = '22023';
  end if;
  if v_disc > 0 then
    select coalesce(sum(l.amount), 0) into v_noVat from public.book_invoice_lines l left join public.tax_codes t on t.id = l.tax_code_id
      where l.invoice_id = inv and (t.id is null or t.kind in ('vat_exempt_sales', 'non_vat_sales'));
    if v_disc > v_noVat then
      raise exception 'The discount is the SC/PWD discount on VAT-exempt sales: it cannot be more than the exempt sales on this invoice (%)', to_char(v_noVat, 'FM999,999,999,990.00') using errcode = '22023';
    end if;
  end if;
  v_wh := coalesce(nullif(p ->> 'withholding', '')::numeric(18, 2), round((v_sub - v_disc) * coalesce(wcode.rate, 0), 2));
  v_wv := coalesce(nullif(p ->> 'vat_withheld', '')::numeric(18, 2), round(v_sub * coalesce(vcode.rate, 0), 2));
  if v_wh < 0 or v_wv < 0 then raise exception 'Tax withheld cannot be negative' using errcode = '22023'; end if;
  v_total := v_sub + v_tax - v_disc;
  if v_total <= 0 then raise exception 'The invoice total must be above zero' using errcode = '22023'; end if;
  v_due_amt := v_total - v_wh - v_wv;
  if v_due_amt < 0 then raise exception 'The tax withheld is more than the invoice total' using errcode = '22023'; end if;

  if p_link_entry is not null then
    -- Legacy: the old entry's receivable or payable is the balance.
    select * into oi from public.open_items
      where source_entry_id = p_link_entry and kind = case v_kind when 'sales' then 'receivable' else 'payable' end and amount > 0
      order by created_at limit 1;
    update public.book_invoices
      set subtotal = v_sub, tax_total = v_tax, total = v_total, withholding = v_wh, vat_withheld = v_wv,
          amount_due = coalesce(oi.amount, v_due_amt), journal_entry_id = p_link_entry, open_item_id = oi.id
      where id = inv;
  else
    update public.book_invoices
      set subtotal = v_sub, tax_total = v_tax, total = v_total, withholding = v_wh, vat_withheld = v_wv, amount_due = v_due_amt
      where id = inv;
    perform private.book_post_invoice(inv);
  end if;
  return inv;
end;
$$;
revoke execute on function private.book_write_invoice(uuid, uuid, jsonb, uuid, uuid) from public, anon, authenticated;

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
  -- Sales are reported gross: the SC/PWD discount stays out of the SLS and the 2550Q and is
  -- kept separately in the books (total = sales + VAT - the discount).
  disc as (select s.* from sales s),
  purch as (
    select inv.id, inv.issue_date, inv.reference, inv.party_id, inv.party_name, inv.party_tin, inv.document_id, ln.kind, ln.amount, ln.tax
    from inv join ln on ln.invoice_id = inv.id
    where inv.kind = 'purchase'
  )
  select d.id, 'sales_invoice'::text, date_trunc('month', d.issue_date)::date, d.issue_date, d.reference, d.party_id, d.party_name, d.party_tin,
         null::text, d.s_vatable::numeric(18, 2), d.s_exempt::numeric(18, 2), d.s_zero::numeric(18, 2),
         d.s_nonvat::numeric(18, 2), d.s_vat::numeric(18, 2), d.total, null::text, null::text, 0::numeric(18, 2),
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
revoke execute on function private.books_sources(uuid, date, date) from public, anon, authenticated;


/**
 * Approves a document's figures and, for a client with Books (p_post), posts it to the
 * Books in the same transaction: either both happen or neither does. Correcting a
 * document already in the Books voids its invoice (and receipt or payment) first.
 *
 * A sale or purchase dated in a locked month (reviewer lock or filed return) cannot be
 * posted there. Without p_redate it is refused with SQLSTATE TL001 and the first open
 * month after it in the hint ("YYYY-MM-01"), so the screen can ask "June 2026 is locked:
 * approve it dated 1 July 2026?" (detail 'can_redate'; 'reviewer_redates' when only the
 * client's reviewer or the Owner may move it). With p_redate, by the reviewer or the
 * Owner, it is moved to that month (as
 * defer_document records a move) and posted on its first day; its own date stays on
 * the register. Returns {client_id, doc_type, posting, moved_to}.
 */
create or replace function public.approve_and_post_document(
  p_document uuid, p_fields jsonb, p_post boolean,
  p_account uuid default null, p_cash_account uuid default null, p_codes jsonb default null,
  p_redate boolean default false
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  b public.client_books;
  posting jsonb;
  v_date date;
  v_month date;
  v_open date;
  why text;
  mover boolean;
  i integer := 0;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not private.can_access_client(d.client_id) then raise exception 'Document not found' using errcode = 'P0002'; end if;
  select * into b from public.client_books where client_id = d.client_id;

  -- A new approval of a sale or purchase dated in a locked month.
  if p_post and b.client_id is not null and d.status in ('received', 'under_review') and d.doc_type in ('sales_invoice', 'purchase_receipt') then
    begin
      v_date := nullif(p_fields ->> 'date', '')::date;
    exception when others then
      v_date := null;
    end;
    v_month := date_trunc('month', v_date)::date;
    if v_date is not null and v_date >= b.books_start and (d.deferred_from is null or v_month >= d.document_month) then
      why := private.books_locked_by(d.client_id, v_date);
      if why is not null then
        v_open := v_month;
        loop
          v_open := (v_open + interval '1 month')::date;
          i := i + 1;
          exit when private.books_locked_by(d.client_id, v_open) is null or i > 36;
        end loop;
        -- Moving it to a later month changes what a return declares: the client's reviewer or the Owner decides.
        mover := private.is_owner() or private.is_assigned(d.client_id, 'reviewer');
        if not p_redate or not mover then
          raise exception '% is locked (%)', to_char(v_month, 'FMMonth YYYY'),
            case when why = 'locked by the reviewer' then why else why || ' filed' end
            using errcode = 'TL001', hint = to_char(v_open, 'YYYY-MM-DD'), detail = case when mover then 'can_redate' else 'reviewer_redates' end;
        end if;
        update public.documents
          set deferred_from = coalesce(deferred_from, v_month),
              deferred_reason = to_char(v_month, 'FMMonth YYYY') || ' was locked when it was approved',
              deferred_by = auth.uid(), deferred_at = now(),
              document_month = v_open, period = greatest(period, v_open)
          where id = d.id;
      end if;
    end if;
  end if;

  if p_post and exists (select 1 from public.book_invoices where document_id = p_document and voided_at is null) then
    perform public.unpost_document_from_books(p_document, 'Document figures corrected');
  end if;
  d := public.approve_document(p_document, p_fields);
  if p_post then
    posting := public.post_document_to_books(p_document, p_account, p_cash_account, p_codes);
  end if;
  return jsonb_build_object('client_id', d.client_id, 'doc_type', d.doc_type, 'posting', posting,
    'moved_to', case when v_open is not null and p_redate then v_open end);
end;
$$;
revoke execute on function public.approve_and_post_document(uuid, jsonb, boolean, uuid, uuid, jsonb, boolean) from public, anon;
grant execute on function public.approve_and_post_document(uuid, jsonb, boolean, uuid, uuid, jsonb, boolean) to authenticated;

/** Approved sales and purchases of a month (on or after the books start) that are not in the Books. */
create or replace function private.books_unposted(p_client uuid, p_month date) returns integer
language sql stable security definer set search_path = '' as $$
  select count(*)::integer
  from public.documents d
  join public.client_books b on b.client_id = d.client_id
  join public.register_lines r on r.document_id = d.id
  where d.client_id = p_client and d.document_month = p_month and d.status = 'posted'
    and d.doc_type in ('sales_invoice', 'purchase_receipt') and r.line_date >= b.books_start
    and not exists (select 1 from public.book_invoices i where i.document_id = d.id and i.voided_at is null)
$$;
revoke execute on function private.books_unposted(uuid, date) from public, anon, authenticated;

create or replace function private.check_inbox_clear(p_client uuid, p_month date) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  n integer := private.books_inbox_waiting(p_client, p_month);
  u integer := private.books_unposted(p_client, p_month);
begin
  if n > 0 then
    raise exception '% document% of % % still in the Inbox: approve or return %',
      n, case when n = 1 then '' else 's' end, to_char(p_month, 'FMMonth YYYY'), case when n = 1 then 'is' else 'are' end,
      case when n = 1 then 'it' else 'them' end using errcode = '22023';
  end if;
  if u > 0 then
    raise exception '% approved sale% or purchase% of % % not in the Books: open % in the Inbox and approve % again, or take % back',
      u, case when u = 1 then '' else 's' end, case when u = 1 then '' else 's' end, to_char(p_month, 'FMMonth YYYY'),
      case when u = 1 then 'is' else 'are' end, case when u = 1 then 'it' else 'them' end,
      case when u = 1 then 'it' else 'them' end, case when u = 1 then 'it' else 'them' end using errcode = '22023';
  end if;
end;
$$;
revoke execute on function private.check_inbox_clear(uuid, date) from public, anon, authenticated;
