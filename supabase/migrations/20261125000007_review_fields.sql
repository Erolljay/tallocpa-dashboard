-- One register, slice 4 (docs/UX-REVIEW.md, "Review fields"; Owner's decisions 2, 9 and 11).
--
-- Review captures the remaining worksheet columns: the SC/PWD discount, VAT withheld,
-- other deductions (bank or card charges) and their account, the purchase category
-- for the SLP, and the cash or bank account the money went to or came from. The
-- register line keeps the payment account and the other deduction's account, and
-- the books post them:
--   cash sale      Dr <payment account> net receipt · Dr <other deduction account> · …
--   cash purchase  … · Cr <payment account> net paid · Cr <other deduction account>
-- A document without these books exactly as before (Cash, no other deduction).
--
-- Every client keeps account titles, even for tax compliance only (decision 2):
-- setup_books no longer needs a Bookkeeping engagement.

alter table public.register_lines
  add column payment_account_id uuid,
  add column other_account_id uuid,
  add constraint register_lines_payment_account_fkey foreign key (client_id, payment_account_id) references public.ledger_accounts (client_id, id),
  add constraint register_lines_other_account_fkey foreign key (client_id, other_account_id) references public.ledger_accounts (client_id, id);

create or replace function public.setup_books(p_client uuid, p_template text, p_books_start date, p_accounts jsonb)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can set up its books' using errcode = '42501';
  end if;
  if exists (select 1 from public.client_books where client_id = p_client) then
    raise exception 'This client''s books are already set up' using errcode = '22023';
  end if;
  if p_accounts is null or jsonb_typeof(p_accounts) <> 'array' or jsonb_array_length(p_accounts) = 0 then
    raise exception 'The chart of accounts is empty' using errcode = '22023';
  end if;

  insert into public.client_books (client_id, template, books_start) values (p_client, p_template, p_books_start);
  insert into public.ledger_accounts (client_id, template_key, code, name, type, normal_side, fs_line, bir_line, control, sort_order)
  select p_client, nullif(a.key, ''), a.code, a.name, a.type, a.normal_side, a.fs_line, nullif(a.bir_line, ''), nullif(a.control, ''), coalesce(a.sort_order, 0)
  from jsonb_to_recordset(p_accounts) as a(key text, code text, name text, type text, normal_side text, fs_line text, bir_line text, control text, sort_order integer);
end;
$$;

create or replace function private.sync_register_line(p_document uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  f jsonb;
  v_kind text;
  v_date date;
  v_vatable numeric; v_exempt numeric; v_zero numeric; v_vat numeric; v_total numeric;
  v_wh numeric; v_wv numeric; v_other numeric; v_disc numeric;
  v_account uuid;
  v_fs text;
  v_vat_reg boolean;
  v_slp text;
  v_pay uuid;
  v_other_acct uuid;
begin
  select * into d from public.documents where id = p_document;
  select approved_fields into f from public.extractions where document_id = p_document;
  v_kind := case d.doc_type when 'sales_invoice' then 'sale' when 'purchase_receipt' then 'purchase'
                            when 'bir_2307_received' then 'cwt_received' when 'bir_2307_issued' then 'ewt_issued' end;
  if d.id is null or d.status <> 'posted' or f is null or v_kind is null then
    delete from public.register_lines where document_id = p_document;
    return;
  end if;

  begin
    v_date := nullif(f ->> 'date', '')::date;
  exception when others then
    v_date := null;
  end;
  v_vatable := private.register_amount(f ->> 'vatable');
  v_exempt := private.register_amount(f ->> 'vat_exempt');
  v_zero := private.register_amount(f ->> 'zero_rated');
  v_vat := private.register_amount(f ->> 'vat');
  v_total := private.register_amount(f ->> 'total');
  v_wh := private.register_amount(f ->> 'withholding');
  v_wv := private.register_amount(f ->> 'vat_withheld');
  v_other := private.register_amount(f ->> 'other_deduction');
  v_disc := private.register_amount(f ->> 'discount');

  -- VAT-registered at the line's date: an open 2550Q obligation (as book_document).
  v_vat_reg := exists (
    select 1 from public.obligations o where o.client_id = d.client_id and o.form = '2550Q'
      and o.start_date <= coalesce(v_date, d.document_month) and (o.end_date is null or o.end_date >= coalesce(v_date, d.document_month))
  );

  -- The account title chosen on the document, else the one it would be booked to.
  v_account := coalesce(d.ledger_account_id, case when v_kind in ('sale', 'purchase') then private.document_account(d) end);
  select fs_line into v_fs from public.ledger_accounts where id = v_account;

  -- Where the money went or came from (Owner's decision 11: one Cash account in general
  -- bookkeeping; a cash or bank account of this client's chart when chosen), and the
  -- account an other deduction (bank or card charges) goes to.
  select a.id into v_pay from public.ledger_accounts a
  where a.client_id = d.client_id and a.active and a.control in ('cash', 'bank')
    and a.id::text = nullif(f ->> 'payment_account', '');
  select a.id into v_other_acct from public.ledger_accounts a
  where a.client_id = d.client_id and a.active and a.id::text = nullif(f ->> 'other_deduction_account', '');

  v_slp := nullif(f ->> 'slp_category', '');
  if v_slp is not null and v_slp not in ('capital_goods', 'other_goods', 'services', 'zero_rated', 'exempt') then v_slp := null; end if;
  if v_kind = 'purchase' and v_slp is null then
    v_slp := case when v_fs = 'ppe' then 'capital_goods'
                  when v_vatable = 0 and v_zero > 0 then 'zero_rated'
                  when v_vatable = 0 and v_exempt > 0 then 'exempt' end;
  end if;
  if v_kind <> 'purchase' then v_slp := null; end if;

  insert into public.register_lines as r (
    client_id, document_id, kind, source, month, line_date, reference, party_id, party_name, party_tin, party_address, terms,
    vatable, vat_exempt, zero_rated, vat, total, discount, vat_withheld, other_deduction, atc, withholding, net,
    account_id, slp_category, vat_registered, payment_account_id, other_account_id
  ) values (
    d.client_id, d.id, v_kind, d.source, d.document_month, v_date, nullif(btrim(f ->> 'number'), ''),
    private.document_party(f ->> 'party_tin'), nullif(btrim(f ->> 'party_name'), ''), nullif(btrim(f ->> 'party_tin'), ''), nullif(btrim(f ->> 'party_address'), ''),
    case when f ->> 'payment_terms' = 'charge' then 'charge' else 'cash' end,
    v_vatable, v_exempt, v_zero, v_vat, v_total, v_disc, v_wv, v_other, nullif(upper(btrim(f ->> 'atc')), ''), v_wh,
    -- As book_document: a missing total is the amounts plus VAT.
    case when v_kind in ('sale', 'purchase') then (case when v_total > 0 then v_total else v_vatable + v_exempt + v_zero + v_vat end) - v_wh - v_wv - v_other else 0 end,
    v_account, v_slp, v_vat_reg, v_pay, v_other_acct
  )
  on conflict (document_id) do update set
    kind = excluded.kind, source = excluded.source, month = excluded.month, line_date = excluded.line_date,
    reference = excluded.reference, party_id = excluded.party_id, party_name = excluded.party_name, party_tin = excluded.party_tin, party_address = excluded.party_address,
    terms = excluded.terms, vatable = excluded.vatable, vat_exempt = excluded.vat_exempt, zero_rated = excluded.zero_rated,
    vat = excluded.vat, total = excluded.total, discount = excluded.discount, vat_withheld = excluded.vat_withheld,
    other_deduction = excluded.other_deduction, atc = excluded.atc, withholding = excluded.withholding, net = excluded.net,
    account_id = excluded.account_id, slp_category = excluded.slp_category, vat_registered = excluded.vat_registered,
    payment_account_id = excluded.payment_account_id, other_account_id = excluded.other_account_id;
end;
$$;


create or replace function public.book_document(p_document uuid, p_account uuid default null) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  b public.client_books;
  r public.register_lines;
  acc public.ledger_accounts;
  party_name text;
  doc_date date;
  charge boolean;
  v_vat numeric;
  v_total numeric;
  v_amount numeric;
  v_awaiting numeric;
  v_move numeric;
  v_rest numeric;
  v_booked numeric;
  cash uuid;
  lines jsonb;
  book text;
  label text;
  e uuid;
  k text;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not private.can_access_client(d.client_id) then raise exception 'Document not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(d.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can book its documents' using errcode = '42501';
  end if;
  select * into b from public.client_books where client_id = d.client_id;
  if b.client_id is null or d.doc_type not in ('sales_invoice', 'purchase_receipt', 'bir_2307_received', 'bir_2307_issued') then return null; end if;
  if d.status <> 'posted' then raise exception 'Approve the document''s figures first' using errcode = '22023'; end if;
  if exists (select 1 from public.journal_entries where document_id = d.id and status = 'posted') then
    raise exception 'This document is already in the books; reverse its entry to book it again' using errcode = '22023';
  end if;
  select * into r from public.register_lines where document_id = d.id;
  if r.id is null then raise exception 'Approve the document''s figures first' using errcode = '22023'; end if;
  doc_date := r.line_date;
  if doc_date is null then raise exception 'The document has no date' using errcode = '22023'; end if;

  select * into acc from public.ledger_accounts where id = coalesce(p_account, private.document_account(d)) and client_id = d.client_id and active;
  if acc.id is null then raise exception 'Choose the account title' using errcode = '22023'; end if;
  -- Keeps the register line's account title in step (register_sync trigger).
  update public.documents set ledger_account_id = acc.id where id = d.id;
  delete from public.journal_entries where document_id = d.id and status = 'suggested';
  if doc_date < b.books_start then return null; end if;

  party_name := coalesce(r.party_name, (select display_name from public.parties where id = r.party_id));
  v_vat := case when r.vat_registered then r.vat else 0 end;
  -- As before: a missing total is the amounts plus VAT.
  v_total := case when r.total > 0 then r.total else r.vatable + r.vat_exempt + r.zero_rated + r.vat end;
  charge := r.terms = 'charge';
  -- The cash or bank account chosen on review, else the client's Cash (decision 11).
  cash := coalesce(r.payment_account_id, private.first_control(d.client_id, 'cash'));
  label := case d.doc_type when 'sales_invoice' then 'Sales invoice' when 'purchase_receipt' then 'Purchase'
                           when 'bir_2307_received' then 'BIR 2307 received' else 'BIR 2307 issued' end;
  if r.other_deduction <> 0 then
    if r.kind not in ('sale', 'purchase') or charge then
      raise exception 'An other deduction is booked only on a cash sale or purchase; book this one by journal entry' using errcode = '22023';
    end if;
    if r.other_account_id is null then raise exception 'Choose the account for the other deduction' using errcode = '22023'; end if;
  end if;

  if r.kind = 'sale' then
    if v_total <= 0 then raise exception 'The document has no amount' using errcode = '22023'; end if;
    book := case when charge then 'sales' else 'cash_receipts' end;
    if charge then
      lines := jsonb_build_array(jsonb_build_object('account_id', private.first_control(d.client_id, 'ar'), 'party_id', r.party_id, 'party_name', party_name, 'debit', v_total));
    else
      lines := jsonb_build_array(jsonb_build_object('account_id', cash, 'party_id', r.party_id, 'party_name', party_name, 'debit', r.net));
      if r.withholding > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'cwt_awaiting'), 'party_id', r.party_id, 'debit', r.withholding); end if;
      if r.vat_withheld > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'vat_withheld'), 'party_id', r.party_id, 'debit', r.vat_withheld); end if;
      -- Bank or card charges the customer's payment came in net of.
      if r.other_deduction > 0 then lines := lines || jsonb_build_object('account_id', r.other_account_id, 'debit', r.other_deduction); end if;
    end if;
    if r.discount > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'sales_discount'), 'debit', r.discount); end if;
    lines := lines || jsonb_build_object('account_id', acc.id, 'party_id', r.party_id, 'credit', v_total - v_vat + r.discount);
    if v_vat > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'output_vat'), 'credit', v_vat); end if;
    k := 'sale';
  elsif r.kind = 'purchase' then
    if v_total <= 0 then raise exception 'The document has no amount' using errcode = '22023'; end if;
    if r.vat_withheld <> 0 then raise exception 'VAT withheld on a purchase cannot be booked yet; book it by journal entry' using errcode = '22023'; end if;
    book := case when charge then 'purchases' else 'cash_disbursements' end;
    lines := jsonb_build_array(jsonb_build_object('account_id', acc.id, 'party_id', r.party_id, 'debit', v_total - v_vat));
    if v_vat > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'input_vat'), 'debit', v_vat); end if;
    lines := lines || jsonb_build_object('account_id', case when charge then private.first_control(d.client_id, 'ap') else cash end,
                                         'party_id', r.party_id, 'party_name', party_name,
                                         'credit', case when charge then v_total - r.withholding else r.net end);
    if r.withholding > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'ewt_payable'), 'party_id', r.party_id, 'credit', r.withholding); end if;
    -- A deduction from what was paid (a discount taken at payment).
    if r.other_deduction > 0 then lines := lines || jsonb_build_object('account_id', r.other_account_id, 'credit', r.other_deduction); end if;
    k := 'purchase';
  elsif r.kind = 'cwt_received' then
    if r.withholding <= 0 then raise exception 'The 2307 has no tax withheld' using errcode = '22023'; end if;
    book := 'general_journal';
    -- CWT already booked on the payor's cash sales moves from "awaiting 2307" (no cash);
    -- the rest settles the receivable (acc), else cash, as before.
    v_awaiting := case when r.party_id is null then 0 else greatest(private.party_control_balance(d.client_id, 'cwt_awaiting', r.party_id), 0) end;
    v_move := least(v_awaiting, r.withholding);
    v_rest := r.withholding - v_move;
    lines := jsonb_build_array(jsonb_build_object('account_id', private.first_control(d.client_id, 'cwt'), 'party_id', r.party_id, 'debit', r.withholding));
    if v_move > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'cwt_awaiting'), 'party_id', r.party_id, 'credit', v_move); end if;
    if v_rest > 0 then lines := lines || jsonb_build_object('account_id', acc.id, 'party_id', r.party_id, 'party_name', party_name, 'credit', v_rest); end if;
  else
    if r.withholding <= 0 then raise exception 'The 2307 has no tax withheld' using errcode = '22023'; end if;
    -- EWT the quarter's purchases from this payee already booked at payment.
    select coalesce(sum(p.withholding), 0) into v_booked from public.register_lines p
    where p.client_id = d.client_id and p.kind = 'purchase' and p.party_id = r.party_id
      and date_trunc('quarter', p.month) = date_trunc('quarter', r.month);
    v_amount := r.withholding - v_booked;
    if r.party_id is null then v_amount := r.withholding; end if;
    if v_amount <= 0 then return null; end if;
    book := 'general_journal';
    lines := jsonb_build_array(
      jsonb_build_object('account_id', acc.id, 'party_id', r.party_id, 'party_name', party_name, 'debit', v_amount),
      jsonb_build_object('account_id', private.first_control(d.client_id, 'ewt_payable'), 'party_id', r.party_id, 'credit', v_amount));
  end if;
  if exists (select 1 from jsonb_array_elements(lines) x where x ->> 'account_id' is null) then
    raise exception 'The chart of accounts lacks a control account this entry needs (cash, AR, AP, VAT, CWT, CWT awaiting 2307, VAT withheld, SC/PWD discount or EWT payable)' using errcode = '22023';
  end if;

  e := private.insert_entry(d.client_id, doc_date, book, 'document',
    label || coalesce(' ' || r.reference, '') || coalesce(' · ' || party_name, ''),
    r.reference, lines, null, d.id);

  if k is not null and r.party_id is not null then
    insert into public.client_party_accounts (client_id, party_id, kind, account_id) values (d.client_id, r.party_id, k, acc.id)
    on conflict (client_id, party_id, kind) do update set account_id = excluded.account_id, updated_at = now();
  end if;
  return e;
end;
$$;

revoke execute on function private.sync_register_line(uuid) from public, anon, authenticated;
revoke execute on function public.setup_books(uuid, text, date, jsonb) from public, anon;
grant execute on function public.setup_books(uuid, text, date, jsonb) to authenticated;
revoke execute on function public.book_document(uuid, uuid) from public, anon;
grant execute on function public.book_document(uuid, uuid) to authenticated;

-- Rewrite every line (no change unless the new fields were set).
select private.sync_register_line(document_id) from public.register_lines;
