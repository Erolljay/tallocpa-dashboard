-- A filed return locks only the documents it was prepared from.
--
-- Until now any filed return locked every document of its months and the whole
-- Books month: a filed 1601-C (tax withheld on compensation, prepared from payroll)
-- locked October's purchase receipts and stopped a new October purchase from being
-- approved. A return locks a document only when its figures come from that kind of
-- document:
--   sales (and 2307s received):     2550M/2550Q, 2551M/2551Q, the income tax returns
--   purchases (and 2307s issued):   0619-E/1601-EQ, 2550M/2550Q, the income tax returns
--   payroll:                        1601-C, the income tax returns
-- Manual journal entries and everything else in the Books keep the full list
-- (private.book_lock_forms()), and the reviewer's month lock still locks everything.

/** The filed returns that lock a kind of document (null: every return that locks the Books). */
create or replace function private.book_lock_forms(p_doc_type text) returns text[]
language sql immutable set search_path = '' as $$
  select case
    when p_doc_type in ('sales_invoice', 'bir_2307_received') then
      array['2550M', '2550Q', '2551M', '2551Q', '1701Q', '1702Q', '1701', '1701A', '1702-RT', '1702-EX', '1702-MX']
    when p_doc_type in ('purchase_receipt', 'bir_2307_issued') then
      array['0619-E', '1601-EQ', '2550M', '2550Q', '1701Q', '1702Q', '1701', '1701A', '1702-RT', '1702-EX', '1702-MX']
    when p_doc_type = 'payroll' then
      array['1601-C', '1701Q', '1702Q', '1701', '1701A', '1702-RT', '1702-EX', '1702-MX']
    else private.book_lock_forms()
  end
$$;

/** The filed return that locks a client's month for a kind of document, if any. */
create or replace function private.locking_filing(p_client uuid, p_month date, p_doc_type text) returns uuid
language sql stable security definer set search_path = '' as $$
  select f.id from public.filing_instances f
  where f.client_id = p_client
    and f.status in ('filed', 'paid', 'proof_uploaded')
    and (p_doc_type is null or f.form = any (private.book_lock_forms(p_doc_type)))
    and p_month between date_trunc('month', f.period_start)::date and f.period_end
  order by f.period_end desc
  limit 1;
$$;

create or replace function private.locking_filing(p_client uuid, p_month date) returns uuid
language sql stable security definer set search_path = '' as $$
  select private.locking_filing(p_client, p_month, null::text)
$$;

/** The filed return that already declared a kind of document for a client's month, as "2550Q Q3 2026". */
create or replace function private.filed_for(p_client uuid, p_month date, p_doc_type text) returns text
language sql stable security definer set search_path = '' as $$
  select f.form || ' ' || f.period_label from public.filing_instances f where f.id = private.locking_filing(p_client, p_month, p_doc_type)
$$;

create or replace function private.filed_for(p_client uuid, p_month date) returns text
language sql stable security definer set search_path = '' as $$
  select private.filed_for(p_client, p_month, null::text)
$$;

-- Why the month of p_date is locked for a kind of document (null: for anything), or
-- null when it is open: the filed return(s) that lock it (unless an amendment
-- reopened it), else the reviewer's lock.
create or replace function private.books_locked_by(p_client uuid, p_date date, p_doc_type text) returns text
language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select string_agg(f.form || ' ' || f.period_label, ', ' order by f.period_start, f.form)
     from public.filing_instances f
     where f.client_id = p_client
       and f.form = any (private.book_lock_forms(p_doc_type))
       and p_date between f.period_start and f.period_end
       and f.status in ('filed', 'paid', 'proof_uploaded')
       and not exists (
         select 1 from public.ledger_amendments a
         where a.client_id = p_client and a.status = 'reopened' and p_date between a.period_start and a.period_end
       )
       and not exists (
         -- An unlock decided after the lock row was removed reopens a filed month too.
         select 1 from public.books_lock_requests r
         where r.client_id = p_client and r.kind = 'unlock' and r.status = 'approved'
           and r.month = date_trunc('month', p_date)::date
           and not exists (select 1 from public.books_month_locks l where l.client_id = p_client and l.month = r.month)
       )),
    (select 'locked by the reviewer' from public.books_month_locks l
     where l.client_id = p_client and l.month = date_trunc('month', p_date)::date))
$$;

create or replace function private.books_locked_by(p_client uuid, p_date date) returns text
language sql stable security definer set search_path = '' as $$
  select private.books_locked_by(p_client, p_date, null::text)
$$;

create or replace function private.check_books_open(p_client uuid, p_date date, p_doc_type text) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  why text := private.books_locked_by(p_client, p_date, p_doc_type);
begin
  if why = 'locked by the reviewer' then
    raise exception '% is locked by the reviewer. Ask the reviewer to request an unlock to change the books.',
      to_char(p_date, 'FMMonth YYYY') using errcode = '42501';
  elsif why is not null then
    raise exception '% is locked: % filed. Ask for an amendment on that return to change the books.',
      to_char(p_date, 'FMMonth YYYY'), why using errcode = '42501';
  end if;
end;
$$;

create or replace function private.check_books_open(p_client uuid, p_date date) returns void
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.check_books_open(p_client, p_date, null::text);
end;
$$;

-- The first day of the next month after p_date, in the same taxable year, open for a kind of document, or null.
create or replace function private.next_open_month(p_client uuid, p_date date, p_doc_type text) returns date
language plpgsql stable security definer set search_path = '' as $$
declare
  fye integer;
  m date := (p_date - (extract(day from p_date)::integer - 1));
  year_end date;
begin
  select fiscal_year_end_month into fye from public.clients where id = p_client;
  year_end := (m + make_interval(months => (coalesce(fye, 12) - extract(month from m)::integer + 12) % 12))::date;
  loop
    m := (m + interval '1 month')::date;
    exit when m > year_end;
    if private.books_locked_by(p_client, m, p_doc_type) is null then return m; end if;
  end loop;
  return null;
end;
$$;

create or replace function private.next_open_month(p_client uuid, p_date date) returns date
language sql stable security definer set search_path = '' as $$
  select private.next_open_month(p_client, p_date, null::text)
$$;

/** The kind of document a journal entry books (through a reversal, the reversed entry's), or null. */
create or replace function private.entry_doc_type(p_document uuid, p_reverses uuid) returns text
language sql stable security definer set search_path = '' as $$
  select d.doc_type from public.documents d
  where d.id = coalesce(p_document, (select r.document_id from public.journal_entries r where r.id = p_reverses))
$$;

-- The period lock: an entry booking a document is locked only by the returns
-- prepared from that kind of document.
create or replace function private.journal_period_lock() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  late date;
  kind text;
begin
  if tg_op = 'INSERT' then
    kind := private.entry_doc_type(new.document_id, new.reverses);
    if new.status = 'suggested' and new.source = 'document' and private.books_locked_by(new.client_id, new.entry_date, kind) is not null then
      late := private.next_open_month(new.client_id, new.entry_date, kind);
      if late is not null then
        new.memo := new.memo || ' · dated ' || to_char(new.entry_date, 'FMMon FMDD, YYYY') || ', booked late';
        new.entry_date := late;
      end if;
    elsif new.status <> 'suggested' and not private.is_closing(new) then
      perform private.check_books_open(new.client_id, case when new.source = 'opening' then new.entry_date + 1 else new.entry_date end, kind);
    end if;
    return new;
  elsif tg_op = 'UPDATE' then
    if old.status = 'suggested' and new.status = 'posted' and not private.is_closing(new) then
      perform private.check_books_open(new.client_id, case when new.source = 'opening' then new.entry_date + 1 else new.entry_date end,
        private.entry_doc_type(new.document_id, new.reverses));
    end if;
    return new;
  end if;
  if old.status <> 'suggested' and old.source = 'opening' and exists (select 1 from public.clients where id = old.client_id) then
    perform private.check_books_open(old.client_id, old.entry_date + 1);
  end if;
  return old;
end;
$$;

-- The callers, each now asking about its own kind of document.

create or replace function private.unapprove_document(p_document uuid, p_reason text) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  inv public.book_invoices;
  filed text;
begin
  select * into d from public.documents where id = p_document for update;
  if d.status <> 'posted' then raise exception 'Only an approved document can be taken back' using errcode = '22023'; end if;
  filed := private.filed_for(d.client_id, d.document_month, d.doc_type);
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
  filed := private.filed_for(d.client_id, d.document_month, d.doc_type);
  if filed is not null then
    raise exception 'The % return already declared this document; amend that return instead', filed using errcode = '42501';
  end if;
  filed := private.filed_for(d.client_id, v_to, d.doc_type);
  if filed is not null then
    raise exception '% is already filed (%)', to_char(v_to, 'FMMonth YYYY'), filed using errcode = '42501';
  end if;
  locked := private.books_locked_by(d.client_id, v_to, d.doc_type);
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
    select f.form into lock_form from public.filing_instances f where f.id = private.locking_filing(d.client_id, d.document_month, d.doc_type);
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
      select f.form into lock_form from public.filing_instances f where f.id = private.locking_filing(d.client_id, date_trunc('month', doc_date)::date, d.doc_type);
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
      why := private.books_locked_by(d.client_id, v_date, d.doc_type);
      if why is not null then
        v_open := v_month;
        loop
          v_open := (v_open + interval '1 month')::date;
          i := i + 1;
          exit when private.books_locked_by(d.client_id, v_open, d.doc_type) is null or i > 36;
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

create or replace function public.post_batch(p_client uuid, p_kind text, p_file_name text, p_rows jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  b public.client_books;
  v_batch uuid;
  v_doc_type text;
  x jsonb;
  f jsonb;
  v_row int;
  v_date date;
  v_month date;
  v_account uuid;
  v_doc uuid;
  v_entry uuid;
  v_form text;
  v_total numeric := 0;
  v_booked int := 0;
  v_first date;
  v_last date;
begin
  if not private.can_access_client(p_client) or not private.is_staff() then
    raise exception 'Client not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can upload its registers' using errcode = '42501';
  end if;
  if p_kind not in ('sales', 'purchases') then raise exception 'Unknown register' using errcode = '22023'; end if;
  if jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) = 0 then
    raise exception 'The file has no rows' using errcode = '22023';
  end if;
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'Set up the client''s chart of accounts first' using errcode = '22023'; end if;
  v_doc_type := case p_kind when 'sales' then 'sales_invoice' else 'purchase_receipt' end;

  insert into public.batch_uploads (client_id, kind, file_name, row_count, uploaded_by)
  values (p_client, p_kind, coalesce(nullif(btrim(p_file_name), ''), 'batch.xlsx'), jsonb_array_length(p_rows), auth.uid())
  returning id into v_batch;

  for x in select value from jsonb_array_elements(p_rows) loop
    v_row := (x ->> 'row')::int;
    f := x -> 'fields';
    begin
      v_date := (f ->> 'date')::date;
    exception when others then
      raise exception 'Row %: the date must be YYYY-MM-DD', v_row using errcode = '22023';
    end;
    if v_date is null then raise exception 'Row %: no date', v_row using errcode = '22023'; end if;
    v_month := date_trunc('month', v_date)::date;
    v_account := nullif(x ->> 'account_id', '')::uuid;
    if not exists (select 1 from public.ledger_accounts where id = v_account and client_id = p_client and active) then
      raise exception 'Row %: the account title is not in the client''s chart', v_row using errcode = '22023';
    end if;
    select fi.form into v_form from public.filing_instances fi where fi.id = private.locking_filing(p_client, v_month, v_doc_type);
    if v_form is not null then
      raise exception 'Row %: % is locked; its % has been filed', v_row, to_char(v_month, 'FMMonth YYYY'), v_form using errcode = '42501';
    end if;
    if nullif(btrim(f ->> 'number'), '') is not null and exists (
      select 1 from public.documents d join public.extractions e on e.document_id = d.id
      where d.client_id = p_client and d.doc_type = v_doc_type and d.status = 'posted'
        and btrim(e.approved_fields ->> 'number') = btrim(f ->> 'number')
        and (v_doc_type = 'sales_invoice' or coalesce(e.approved_fields ->> 'party_tin', '') = coalesce(f ->> 'party_tin', ''))
    ) then
      raise exception 'Row %: % % is already in the register', v_row, case p_kind when 'sales' then 'invoice' else 'receipt' end, f ->> 'number' using errcode = '23505';
    end if;

    insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes,
                                  storage_path, status, ledger_account_id, batch_id, batch_row)
    values (p_client, auth.uid(), 'batch', v_doc_type, v_month, v_month,
            coalesce(nullif(btrim(p_file_name), ''), 'batch.xlsx') || ' · row ' || v_row, 'application/x-batch-row', 0,
            null, 'posted', v_account, v_batch, v_row)
    returning id into v_doc;
    -- The register line follows (register_sync); the party joins the directory (record_party).
    insert into public.extractions (document_id, status, fields, approved_fields, approved_by, approved_at)
    values (v_doc, 'done', '{}'::jsonb, f, auth.uid(), now());

    if v_date >= b.books_start then
      begin
        v_entry := public.book_document(v_doc, v_account);
        if v_entry is not null then
          perform public.confirm_journal_entry(v_entry);
          v_booked := v_booked + 1;
        end if;
      exception when others then
        raise exception 'Row %: %', v_row, sqlerrm using errcode = '22023';
      end;
    end if;

    v_total := v_total + coalesce((select total from public.register_lines where document_id = v_doc), 0);
    v_first := least(coalesce(v_first, v_date), v_date);
    v_last := greatest(coalesce(v_last, v_date), v_date);
  end loop;

  update public.batch_uploads set total = v_total, booked_count = v_booked, first_date = v_first, last_date = v_last where id = v_batch;
  return v_batch;
end;
$$;

revoke execute on function private.book_lock_forms(text) from public, anon, authenticated;
revoke execute on function private.locking_filing(uuid, date, text) from public, anon, authenticated;
revoke execute on function private.filed_for(uuid, date, text) from public, anon, authenticated;
revoke execute on function private.books_locked_by(uuid, date, text) from public, anon, authenticated;
revoke execute on function private.check_books_open(uuid, date, text) from public, anon, authenticated;
revoke execute on function private.next_open_month(uuid, date, text) from public, anon, authenticated;
revoke execute on function private.entry_doc_type(uuid, uuid) from public, anon, authenticated;
