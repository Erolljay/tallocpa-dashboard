-- Moving a sale or purchase to a later period, and taking an approval back.
--
-- Clients ask for this quarter's sales or purchases to be reported in the next one.
-- A sale or purchase is reported in the month of its document date (register_lines.month
-- = documents.document_month), so moving it changes what a return declares. Only the
-- client's reviewer or the Owner may do it, with a reason; the month it leaves and the
-- month it goes to must both be open (no return filed for them, Books not locked), and
-- the move is kept on the document (deferred_from, deferred_reason, deferred_by,
-- deferred_at) as well as in the audit log.
--
-- defer_document: moves a waiting or approved sale or purchase to a later month. An
--   approved one is taken back first (as unapprove_document) and waits for approval in
--   its new month. Approved again, it stays in that month and posts to the Books on its
--   first day, while the register keeps the document's own date.
-- unapprove_document: puts an approved sale or purchase back in the Inbox (waiting for
--   review): its Book invoice and receipt or payment are voided, the register line goes,
--   and the approved figures become the starting point for the next review.

alter table public.documents
  add column deferred_from date check (deferred_from is null or extract(day from deferred_from) = 1),
  add column deferred_reason text,
  add column deferred_by uuid references auth.users (id),
  add column deferred_at timestamptz,
  add column unapproved_reason text,
  add column unapproved_by uuid references auth.users (id),
  add column unapproved_at timestamptz,
  add constraint documents_deferred_check check ((deferred_from is null) = (deferred_reason is null) and (deferred_from is null) = (deferred_at is null));

/** The filed return that already declared a client's month, as "2550Q Q3 2026", if any. */
create or replace function private.filed_for(p_client uuid, p_month date) returns text
language sql stable security definer set search_path = '' as $$
  select f.form || ' ' || f.period_label from public.filing_instances f where f.id = private.locking_filing(p_client, p_month)
$$;

/** Takes one approval back (the caller has checked who may). */
create or replace function private.unapprove_document(p_document uuid, p_reason text) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  inv public.book_invoices;
  filed text;
begin
  select * into d from public.documents where id = p_document for update;
  if d.status <> 'posted' then raise exception 'Only an approved document can be taken back' using errcode = '22023'; end if;
  filed := private.filed_for(d.client_id, d.document_month);
  if filed is not null then
    raise exception 'This document is locked: the % return for its month has been filed', filed using errcode = '42501';
  end if;

  -- The Books: void its invoice (and the receipt or payment posted with it).
  delete from public.journal_entries where document_id = d.id and status = 'suggested';
  select * into inv from public.book_invoices where document_id = d.id and voided_at is null;
  if inv.id is not null then
    perform private.book_void_invoice(inv.id, btrim(p_reason));
  end if;
  if exists (select 1 from public.journal_entries where document_id = d.id and source = 'document' and status = 'posted') then
    raise exception 'This document is in the Books as a journal entry: reverse that entry first' using errcode = '22023';
  end if;

  -- The approved figures become the starting point of the next review.
  update public.extractions
    set fields = coalesce(approved_fields, fields), approved_fields = null, approved_by = null, approved_at = null
    where document_id = d.id;
  -- Waiting again: the register_sync trigger removes its register line.
  update public.documents
    set status = 'under_review', unapproved_reason = btrim(p_reason), unapproved_by = auth.uid(), unapproved_at = now()
    where id = d.id returning * into d;
  return d;
end;
$$;

/** Puts an approved sale or purchase back in the Inbox. The client's reviewer or the Owner only. */
create or replace function public.unapprove_document(p_document uuid, p_reason text) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not private.can_access_client(d.client_id) then raise exception 'Document not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or private.is_assigned(d.client_id, 'reviewer')) then
    raise exception 'Only the client''s reviewer or the Owner can take an approval back' using errcode = '42501';
  end if;
  if d.doc_type not in ('sales_invoice', 'purchase_receipt') then
    raise exception 'Only a sale or purchase can be taken back' using errcode = '22023';
  end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason' using errcode = '22023'; end if;
  return private.unapprove_document(d.id, p_reason);
end;
$$;

/**
 * Moves a sale or purchase to a later month (p_to, any day of it): reported there, and
 * reviewed there. The client's reviewer or the Owner only, with a reason. An approved
 * document is taken back first and waits for approval in its new month.
 */
create or replace function public.defer_document(p_document uuid, p_to date, p_reason text) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  v_to date := date_trunc('month', p_to)::date;
  filed text;
  locked text;
begin
  select * into d from public.documents where id = p_document for update;
  if d.id is null or not private.can_access_client(d.client_id) then raise exception 'Document not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or private.is_assigned(d.client_id, 'reviewer')) then
    raise exception 'Only the client''s reviewer or the Owner can move a document to a later period' using errcode = '42501';
  end if;
  if d.doc_type not in ('sales_invoice', 'purchase_receipt') then
    raise exception 'Only a sale or purchase can be moved to a later period' using errcode = '22023';
  end if;
  if d.status not in ('received', 'under_review', 'posted') then
    raise exception 'Only a waiting or approved document can be moved (this one is %)', d.status using errcode = '22023';
  end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason' using errcode = '22023'; end if;
  if v_to is null or v_to <= d.document_month then
    raise exception 'Choose a month after %', to_char(d.document_month, 'FMMonth YYYY') using errcode = '22023';
  end if;
  filed := private.filed_for(d.client_id, d.document_month);
  if filed is not null then
    raise exception 'The % return already declared this document; amend that return instead', filed using errcode = '42501';
  end if;
  filed := private.filed_for(d.client_id, v_to);
  if filed is not null then
    raise exception '% is already filed (%)', to_char(v_to, 'FMMonth YYYY'), filed using errcode = '42501';
  end if;
  locked := private.books_locked_by(d.client_id, v_to);
  if locked is not null then
    raise exception 'The Books for % are locked (%)', to_char(v_to, 'FMMonth YYYY'), locked using errcode = '42501';
  end if;

  if d.status = 'posted' then
    perform private.unapprove_document(d.id, 'Moved to ' || to_char(v_to, 'FMMonth YYYY') || ': ' || btrim(p_reason));
  end if;
  -- The place_document trigger moves the review month past any closed cycle.
  update public.documents
    set deferred_from = coalesce(deferred_from, document_month), deferred_reason = btrim(p_reason),
        deferred_by = auth.uid(), deferred_at = now(),
        document_month = v_to, period = greatest(period, v_to)
    where id = d.id returning * into d;
  return d;
end;
$$;

create or replace function public.approve_document(p_document uuid, p_fields jsonb) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  c public.clients;
  e public.extractions;
  k text;
  doc_date date;
  placed record;
  editing boolean;
  lock_form text;
begin
  select * into d from public.documents where id = p_document for update;
  if d.id is null or not private.can_access_client(d.client_id) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;
  if not (private.is_owner() or private.is_assigned(d.client_id)) then
    raise exception 'Only staff assigned to this client can approve its documents' using errcode = '42501';
  end if;
  editing := d.status = 'posted';
  if d.status not in ('received', 'under_review', 'posted') then
    raise exception 'Only a received or under-review document can be approved (this one is %)', d.status using errcode = '22023';
  end if;
  if jsonb_typeof(p_fields) <> 'object' then
    raise exception 'Fields must be an object' using errcode = '22023';
  end if;
  if editing then
    select f.form into lock_form from public.filing_instances f where f.id = private.locking_filing(d.client_id, d.document_month);
    if lock_form is not null then
      raise exception 'This document is locked: the % return for its month has been filed', lock_form using errcode = '42501';
    end if;
  end if;

  select * into c from public.clients where id = d.client_id;
  select * into e from public.extractions where document_id = d.id;

  -- Log every field the reviewer changed from what OCR read (first approval only).
  if not editing and e.document_id is not null and e.status = 'done' then
    for k in select jsonb_object_keys(p_fields) union select jsonb_object_keys(e.fields) loop
      if (e.fields ->> k) is distinct from (p_fields ->> k) then
        insert into public.extraction_corrections (document_id, field, ocr_value, approved_value, corrected_by)
        values (d.id, k, e.fields ->> k, p_fields ->> k, auth.uid());
      end if;
    end loop;
  end if;

  insert into public.extractions (document_id, status, fields, approved_fields, approved_by, approved_at)
  values (d.id, 'done', '{}'::jsonb, p_fields, auth.uid(), now())
  on conflict (document_id) do update set approved_fields = excluded.approved_fields, approved_by = excluded.approved_by, approved_at = excluded.approved_at;

  -- Re-place by the document date when there is one (§4.2), as of the upload date.
  begin
    doc_date := nullif(p_fields ->> 'date', '')::date;
  exception when others then
    raise exception 'Document date must be YYYY-MM-DD' using errcode = '22023';
  end;
  -- A document moved to a later period (defer_document) keeps that month, unless its
  -- corrected date falls in that month or later: then it is placed by its date again.
  if doc_date is not null and d.deferred_from is not null and date_trunc('month', doc_date)::date < d.document_month then
    doc_date := null;
  elsif doc_date is not null and d.deferred_from is not null then
    update public.documents set deferred_from = null, deferred_reason = null, deferred_by = null, deferred_at = null where id = d.id;
  end if;
  if doc_date is not null then
    -- An edit cannot move a document into a month that is already locked.
    if editing and date_trunc('month', doc_date)::date <> d.document_month then
      select f.form into lock_form from public.filing_instances f where f.id = private.locking_filing(d.client_id, date_trunc('month', doc_date)::date);
      if lock_form is not null then
        raise exception 'That date falls in a locked month: the % return for it has been filed', lock_form using errcode = '42501';
      end if;
    end if;
    placed := private.document_period(doc_date, (d.created_at at time zone 'Asia/Manila')::date, c.submission_cutoff_day, c.fiscal_year_end_month);
    update public.documents
      set document_month = date_trunc('month', doc_date)::date, period = placed.period, late = placed.late, prior_year = placed.prior_year
      where id = d.id;
  end if;

  update public.documents set status = 'posted' where id = d.id returning * into d;
  return d;
end;
$$;

create or replace function private.document_invoice_payload(d public.documents, r public.register_lines, p_account uuid, p_codes jsonb default null) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  sug jsonb;
  lines jsonb := '[]'::jsonb;
  x jsonb;
  y jsonb;
  tc public.tax_codes;
  n integer := 0;
  w jsonb;
  vw jsonb;
begin
  sug := private.document_tax_suggestion(d.client_id, r.kind, r.party_id, r.vat_registered, r.slp_category,
    r.vatable, r.vat_exempt, r.zero_rated, r.vat, r.total, r.discount, r.atc, r.withholding, r.vat_withheld);
  p_codes := coalesce(p_codes, '{}'::jsonb);
  if jsonb_typeof(p_codes) <> 'object' then raise exception 'The tax codes must be an object' using errcode = '22023'; end if;
  for x in select * from jsonb_array_elements(sug -> 'lines') loop
    n := n + 1;
    select c into y from jsonb_array_elements(coalesce(p_codes -> 'lines', '[]'::jsonb)) c where c ->> 'portion' = x ->> 'portion' limit 1;
    if y is not null and y ? 'tax_code_id' then
      x := jsonb_set(x, '{tax_code_id}', coalesce(y -> 'tax_code_id', 'null'::jsonb));
      select * into tc from public.tax_codes where id = nullif(x ->> 'tax_code_id', '')::uuid;
      if tc.id is not null and tc.rate > 0 and (x ->> 'tax_amount')::numeric = 0 then
        raise exception 'Line %: the document shows no VAT on this amount; choose an exempt or zero-rated code', n using errcode = '22023';
      end if;
      tc := null;
    end if;
    y := null;
    lines := lines || jsonb_build_object('account_id', p_account, 'amount', x -> 'amount', 'tax_code_id', x -> 'tax_code_id', 'tax_amount', x -> 'tax_amount');
  end loop;
  w := case when p_codes ? 'withholding_code_id' then p_codes -> 'withholding_code_id' else sug -> 'withholding_code_id' end;
  vw := case when p_codes ? 'vat_withholding_code_id' then p_codes -> 'vat_withholding_code_id' else sug -> 'vat_withholding_code_id' end;
  if r.kind = 'purchase' and vw is not null and vw <> 'null'::jsonb then
    raise exception 'WV010 and WV020 go only on a Sales Invoice' using errcode = '22023';
  end if;

  return jsonb_build_object(
    'kind', case r.kind when 'sale' then 'sales' else 'purchase' end,
    'party_id', r.party_id,
    'party_name', coalesce(r.party_name, (select display_name from public.parties where id = r.party_id), case r.kind when 'sale' then 'Cash sales' else 'Cash purchases' end),
    'party_tin', r.party_tin,
    'reference', r.reference,
    -- A document moved to a later period posts on the first day of that month (its register month).
    'issue_date', case when d.deferred_from is not null and r.line_date < d.document_month then d.document_month else r.line_date end,
    'withholding_code_id', w,
    'withholding', r.withholding,
    'vat_withholding_code_id', case when r.kind = 'sale' then vw end,
    'vat_withheld', case when r.kind = 'sale' then r.vat_withheld else 0 end,
    'discount', case when r.kind = 'sale' then r.discount else 0 end,
    'lines', lines);
end;
$$;

create or replace function public.post_document_to_books(p_document uuid, p_account uuid default null, p_cash_account uuid default null, p_codes jsonb default null)
returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  b public.client_books;
  inv public.book_invoices;
  acc public.ledger_accounts;
  legacy uuid;
  v_date date;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not private.can_access_client(d.client_id) then raise exception 'Document not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(d.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can post its documents' using errcode = '42501';
  end if;
  if d.status <> 'posted' then raise exception 'Approve the document''s figures first' using errcode = '22023'; end if;
  select * into b from public.client_books where client_id = d.client_id;
  if b.client_id is null then return null; end if;

  if d.doc_type = 'bir_2307_received' then
    return jsonb_build_object('cwt_marked', private.mark_cwt_supported(d.id));
  end if;
  if d.doc_type not in ('sales_invoice', 'purchase_receipt') then return null; end if;

  select * into inv from public.book_invoices where document_id = d.id and voided_at is null;
  if inv.id is not null then
    return jsonb_build_object('invoice_id', inv.id,
      'settlement_id', (select id from public.book_settlements where document_id = d.id and voided_at is null));
  end if;

  select * into acc from public.ledger_accounts
    where id = coalesce(p_account, d.ledger_account_id, private.document_account(d)) and client_id = d.client_id and active;
  if acc.id is null then raise exception 'Choose the account title' using errcode = '22023'; end if;
  -- Keeps the register line's account title in step (register_sync trigger).
  if d.ledger_account_id is distinct from acc.id then
    update public.documents set ledger_account_id = acc.id where id = d.id;
  end if;
  select case when d.deferred_from is not null and line_date < d.document_month then d.document_month else line_date end
    into v_date from public.register_lines where document_id = d.id;
  if v_date is not null and v_date < b.books_start then return null; end if;

  delete from public.journal_entries where document_id = d.id and status = 'suggested';
  -- Booked the old way (book_document, confirmed) and not yet moved across: link it.
  select id into legacy from public.journal_entries
    where document_id = d.id and status = 'posted' and source = 'document'
    order by posted_at desc limit 1;
  return private.document_to_books(d.id, acc.id, p_cash_account, legacy, p_codes, legacy is null);
end;
$$;

revoke execute on function private.filed_for(uuid, date) from public, anon, authenticated;
revoke execute on function private.unapprove_document(uuid, text) from public, anon, authenticated;
revoke execute on function public.unapprove_document(uuid, text) from public, anon;
revoke execute on function public.defer_document(uuid, date, text) from public, anon;
grant execute on function public.unapprove_document(uuid, text) to authenticated;
grant execute on function public.defer_document(uuid, date, text) to authenticated;
revoke execute on function public.approve_document(uuid, jsonb) from public, anon;
grant execute on function public.approve_document(uuid, jsonb) to authenticated;
revoke execute on function public.post_document_to_books(uuid, uuid, uuid, jsonb) from public, anon;
grant execute on function public.post_document_to_books(uuid, uuid, uuid, jsonb) to authenticated;
revoke execute on function private.document_invoice_payload(public.documents, public.register_lines, uuid, jsonb) from public, anon, authenticated;
