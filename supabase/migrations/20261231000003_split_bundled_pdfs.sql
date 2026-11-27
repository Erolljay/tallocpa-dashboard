-- Split a bundled PDF into one Inbox line per invoice (Owner's request, 27 November 2026).
--
-- Clients often send one PDF holding many invoices, receipts or 2307s. OCR now reads
-- every one of them (lib/ocr/bundle.ts). When it finds more than one, the uploaded
-- document becomes a bundle: its status is 'split' and it gets one child document
-- per invoice. Each child is an ordinary document (same client, type, month, source,
-- uploader and upload time) with its own extraction, reviewed, approved, posted and
-- registered exactly like any other. The children share the bundle's stored file:
-- they have no storage_path of their own, and /files/<child> serves the bundle's file.
--
-- A bundle is never a line to review and is never counted: everything that lists or
-- counts work already looks at received / under_review / posted documents, and the
-- counts that took "anything but uploading" leave 'split' out below. A PDF with
-- exactly one invoice stays one document, as before; photos are never split.
--
--   bundle (status 'split')  bundle_count = N, bundle_pages = pages in the PDF
--   └ child                  bundle_id = bundle, bundle_page = page (1-based),
--                            bundle_index = n in "Invoice n of N" (ordered by page)

alter table public.documents
  add column bundle_id uuid references public.documents (id) on delete restrict,
  add column bundle_page int check (bundle_page >= 1),
  add column bundle_index int check (bundle_index >= 1),
  add column bundle_count int check (bundle_count >= 0),
  add column bundle_pages int check (bundle_pages >= 1);

alter table public.documents add constraint documents_bundle_child_check check (
  (bundle_id is null and bundle_page is null and bundle_index is null)
  or (bundle_id is not null and bundle_page is not null and bundle_index is not null and storage_path is null and bundle_count is null)
);

create index documents_bundle_idx on public.documents (bundle_id, bundle_index) where bundle_id is not null;

alter table public.documents drop constraint documents_status_check;
alter table public.documents add constraint documents_status_check
  check (status in ('uploading', 'received', 'under_review', 'posted', 'returned', 'split'));

-- A batch row has no file; a bundle's child uses its bundle's file.
alter table public.documents drop constraint documents_file_check;
alter table public.documents add constraint documents_file_check check (
  source = 'batch' or bundle_id is not null or (storage_path is not null and size_bytes > 0)
);

-- Document types whose PDFs are split into one line per invoice.
create or replace function private.is_splittable(doc_type text) returns boolean
language sql immutable as $$
  select doc_type in ('sales_invoice', 'purchase_receipt', 'bir_2307_received', 'bir_2307_issued')
$$;

/**
 * A child takes its bundle's late flag as it was when the client sent the file: it is
 * created later, when OCR has read the PDF, and the client may have confirmed the
 * month in between.
 */
create or replace function private.mark_after_confirmation() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.bundle_id is not null then return new; end if;
  if new.source <> 'batch' and private.is_submission(new.doc_type) and not new.late and exists (
    select 1 from public.document_cycles y
    where y.client_id = new.client_id and y.period = date_trunc('month', new.document_month)::date and y.client_confirmed_at is not null
  ) then
    new.late := true;
  end if;
  return new;
end;
$$;

/** Numbers a bundle's children 1..N in page order and records N on the bundle. */
create or replace function private.renumber_bundle(p_bundle uuid) returns int
language plpgsql security definer set search_path = '' as $$
declare
  n int;
begin
  update public.documents d set bundle_index = o.rn
  from (
    select x.id, row_number() over (order by x.bundle_page, x.bundle_index, x.created_at, x.id)::int as rn
    from public.documents x where x.bundle_id = p_bundle
  ) o
  where d.id = o.id and d.bundle_index is distinct from o.rn;
  select count(*)::int into n from public.documents where bundle_id = p_bundle;
  update public.documents set bundle_count = n where id = p_bundle and bundle_count is distinct from n;
  return n;
end;
$$;

/** A new child of a bundle: everything but the figures comes from the bundle. */
create or replace function private.add_bundle_child(b public.documents, p_page int, p_index int, p_status text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  new_id uuid;
begin
  insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, late, prior_year, carried_from,
                                exception_status, exception_reason, deferred_from, deferred_reason, deferred_by, deferred_at,
                                file_name, mime_type, size_bytes, storage_path, status, ledger_account_id,
                                created_at, bundle_id, bundle_page, bundle_index)
  values (b.client_id, b.uploaded_by, b.source, b.doc_type, b.period, b.document_month, b.late, b.prior_year, b.carried_from,
          b.exception_status, b.exception_reason, b.deferred_from, b.deferred_reason, b.deferred_by, b.deferred_at,
          b.file_name, b.mime_type, b.size_bytes, null, p_status, b.ledger_account_id,
          b.created_at, b.id, p_page, p_index)
  returning id into new_id;
  return new_id;
end;
$$;

/** Removes a child not yet approved (its suggested journal entry goes with it). */
create or replace function private.drop_bundle_child(p_child uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  delete from public.journal_entries where document_id = p_child and status = 'suggested';
  delete from public.documents where id = p_child;
end;
$$;

/**
 * OCR (service role): save what was read from a PDF of a submission type.
 * p_parts is [{page, position, fields, confidence}, ...], one per invoice found, in
 * the order read. Two or more: the document becomes a bundle with one child each
 * (a re-read replaces the children not yet approved, and is refused once any is
 * approved). One, on a document that was a bundle: it is a single document again.
 */
create or replace function public.split_document(p_document uuid, p_pages int, p_parts jsonb, p_provider text, p_model text)
returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  part jsonb;
  child uuid;
  i int := 0;
  n int := case when jsonb_typeof(p_parts) = 'array' then jsonb_array_length(p_parts) else 0 end;
  x record;
begin
  select * into d from public.documents where id = p_document for update;
  if d.id is null then raise exception 'Document not found' using errcode = 'P0002'; end if;
  if d.bundle_id is not null or d.storage_path is null then
    raise exception 'Read the whole PDF from its bundle' using errcode = '22023';
  end if;
  if d.mime_type <> 'application/pdf' or not private.is_splittable(d.doc_type) then
    raise exception 'Only a PDF of invoices, receipts or 2307s is split' using errcode = '22023';
  end if;
  if d.status not in ('received', 'under_review', 'split') then
    raise exception 'That cannot be done to a document that is %', d.status using errcode = '22023';
  end if;
  if n = 0 or (n = 1 and d.status <> 'split') then
    raise exception 'Nothing to split' using errcode = '22023';
  end if;
  if exists (select 1 from public.documents c where c.bundle_id = d.id and c.status = 'posted') then
    raise exception 'Some invoices from this PDF are already approved: reading it again would duplicate them. Add or remove invoices by hand instead.' using errcode = '22023';
  end if;

  for x in select c.id from public.documents c where c.bundle_id = d.id loop
    perform private.drop_bundle_child(x.id);
  end loop;

  if n = 1 then
    part := p_parts -> 0;
    update public.documents set status = 'under_review', bundle_count = null, bundle_pages = null where id = d.id returning * into d;
    insert into public.extractions (document_id, status, provider, model, fields, confidence, finished_at, error)
    values (d.id, 'done', p_provider, p_model, coalesce(part -> 'fields', '{}'::jsonb), coalesce(part -> 'confidence', '{}'::jsonb), now(), null)
    on conflict (document_id) do update set status = 'done', provider = excluded.provider, model = excluded.model, fields = excluded.fields,
      confidence = excluded.confidence, finished_at = excluded.finished_at, error = null;
    return d;
  end if;

  for part in select value from jsonb_array_elements(p_parts) loop
    i := i + 1;
    child := private.add_bundle_child(d, greatest(1, coalesce((part ->> 'page')::int, 1)), i, 'under_review');
    insert into public.extractions (document_id, status, provider, model, fields, confidence, attempts, started_at, finished_at)
    values (child, 'done', p_provider, p_model, coalesce(part -> 'fields', '{}'::jsonb), coalesce(part -> 'confidence', '{}'::jsonb), 1, now(), now());
  end loop;

  -- The bundle's own extraction records the read; its figures live on the children.
  insert into public.extractions (document_id, status, provider, model, fields, confidence, finished_at, error)
  values (d.id, 'done', p_provider, p_model, '{}'::jsonb, '{}'::jsonb, now(), null)
  on conflict (document_id) do update set status = 'done', provider = excluded.provider, model = excluded.model, fields = '{}'::jsonb,
    confidence = '{}'::jsonb, finished_at = excluded.finished_at, error = null;

  update public.documents set status = 'split', bundle_pages = case when p_pages >= 1 then p_pages end where id = d.id;
  perform private.renumber_bundle(d.id);
  select * into d from public.documents where id = d.id;
  return d;
end;
$$;

-- The checks shared by the reviewer's fixes below: the bundle a document belongs to
-- (or is), locked, for staff who may act on the client (the Owner or assigned staff).
create or replace function private.bundle_for_fix(p_document uuid, out b public.documents, out d public.documents)
language plpgsql security definer set search_path = '' as $$
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not private.can_access_client(d.client_id) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;
  if not (private.is_owner() or private.is_assigned(d.client_id)) then
    raise exception 'Only staff assigned to this client can change its documents' using errcode = '42501';
  end if;
  select * into b from public.documents where id = coalesce(d.bundle_id, d.id) for update;
end;
$$;

/**
 * Staff: add an invoice OCR missed, on page p_page of the PDF, as a new line with
 * empty figures to type in. From a bundle or any of its invoices; or from a PDF read
 * as one invoice, which then becomes a bundle of two (what was read is invoice 1, on
 * page 1, unless it was on the page given).
 */
create or replace function public.add_bundle_invoice(p_document uuid, p_page int) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  f record;
  b public.documents;
  child uuid;
  first_child uuid;
  r public.documents;
begin
  select * into f from private.bundle_for_fix(p_document);
  b := f.b;
  if p_page is null or p_page < 1 or p_page > coalesce(b.bundle_pages, 50) then
    raise exception 'Choose a page from 1 to %', coalesce(b.bundle_pages, 50) using errcode = '22023';
  end if;
  if b.status <> 'split' then
    if b.storage_path is null or b.mime_type <> 'application/pdf' or not private.is_splittable(b.doc_type) then
      raise exception 'Only a PDF of invoices, receipts or 2307s can hold more than one invoice' using errcode = '22023';
    end if;
    if b.status not in ('received', 'under_review') then
      raise exception 'Only a document waiting for review can be split (this one is %)', b.status using errcode = '22023';
    end if;
    -- What was read so far becomes the first invoice of the bundle.
    first_child := private.add_bundle_child(b, 1, 1, 'under_review');
    insert into public.extractions (document_id, status, provider, model, fields, confidence, attempts, started_at, finished_at)
    select first_child, 'done', e.provider, e.model, e.fields, e.confidence, e.attempts, e.started_at, e.finished_at
    from public.extractions e where e.document_id = b.id and e.status = 'done';
    if not found then
      insert into public.extractions (document_id, status, provider, fields, confidence, finished_at)
      values (first_child, 'done', 'manual', '{}'::jsonb, '{}'::jsonb, now());
    end if;
    update public.extractions set fields = '{}'::jsonb, confidence = '{}'::jsonb where document_id = b.id;
    update public.documents set status = 'split' where id = b.id;
  end if;
  child := private.add_bundle_child(b, p_page, 1000000, 'under_review');
  -- Typed by hand: an extraction with nothing read (not counted as OCR in the correction rates).
  insert into public.extractions (document_id, status, provider, fields, confidence, finished_at)
  values (child, 'done', 'manual', '{}'::jsonb, '{}'::jsonb, now());
  perform private.renumber_bundle(b.id);
  select * into r from public.documents where id = child;
  return r;
end;
$$;

/** Staff: remove an invoice of a bundle that is not approved (OCR read something that is not one). */
create or replace function public.delete_bundle_invoice(p_document uuid) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  f record;
  b public.documents;
  d public.documents;
begin
  select * into f from private.bundle_for_fix(p_document);
  b := f.b;
  d := f.d;
  if d.bundle_id is null then raise exception 'Only an invoice of a bundled PDF can be removed' using errcode = '22023'; end if;
  perform 1 from public.documents where id = d.id for update;
  if exists (select 1 from public.documents where id = d.id and status = 'posted') then
    raise exception 'This invoice is approved: take the approval back before removing it' using errcode = '22023';
  end if;
  if exists (select 1 from public.journal_entries where document_id = d.id and status <> 'suggested')
     or exists (select 1 from public.book_invoices where document_id = d.id) then
    raise exception 'This invoice is in the Books: take it out of the Books first' using errcode = '22023';
  end if;
  if (select count(*) from public.documents where bundle_id = b.id) <= 1 then
    raise exception 'This is the only invoice left in the PDF; return it to the client instead' using errcode = '22023';
  end if;
  perform private.drop_bundle_child(d.id);
  perform private.renumber_bundle(b.id);
  select * into b from public.documents where id = b.id;
  return b;
end;
$$;

/** Staff: the page of the PDF an invoice of a bundle is on. */
create or replace function public.set_bundle_page(p_document uuid, p_page int) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  f record;
  b public.documents;
  d public.documents;
  r public.documents;
begin
  select * into f from private.bundle_for_fix(p_document);
  b := f.b;
  d := f.d;
  if d.bundle_id is null then raise exception 'Only an invoice of a bundled PDF has a page' using errcode = '22023'; end if;
  if p_page is null or p_page < 1 or p_page > coalesce(b.bundle_pages, 50) then
    raise exception 'Choose a page from 1 to %', coalesce(b.bundle_pages, 50) using errcode = '22023';
  end if;
  update public.documents set bundle_page = p_page where id = d.id;
  perform private.renumber_bundle(b.id);
  select * into r from public.documents where id = d.id;
  return r;
end;
$$;

-- Counts of documents sent: a bundle is counted through its invoices, not itself.

create or replace function public.client_document_volume(p_from date, p_to date)
returns table (client_id uuid, month date, documents int)
language sql stable set search_path = '' as $$
  select d.client_id, d.document_month, count(*)::int
  from public.documents d
  where d.document_month between date_trunc('month', p_from)::date and date_trunc('month', p_to)::date
    and private.is_submission(d.doc_type)
    and d.status not in ('uploading', 'split')
  group by d.client_id, d.document_month
$$;

create or replace function public.client_scorecard(p_from date, p_to date, p_today date default null)
returns table (client_id uuid, month date, cycles_due int, cycles_missed int, documents int, documents_returned int, documents_late int, dues_due int, dues_late int, filings_due int, filings_late int, late_client int)
language plpgsql stable security definer set search_path = '' as $$
declare
  today date := coalesce(p_today, private.manila_today());
  from_m date := date_trunc('month', p_from)::date;
  to_end date := (date_trunc('month', p_to) + interval '1 month - 1 day')::date;
begin
  perform private.require_owner_scores();
  return query
  with cyc as (
    select y.client_id, y.period as m, count(*)::int as due, count(*) filter (where y.missed_cutoff)::int as missed
    from public.document_cycles y
    where y.cutoff_date < today and y.period between from_m and to_end
    group by 1, 2
  ),
  docs as (
    select d.client_id, d.document_month as m, count(*)::int as n,
           count(*) filter (where d.return_reason is not null)::int as returned,
           count(*) filter (where d.late)::int as late
    from public.documents d
    where private.is_submission(d.doc_type) and not d.prior_year and d.status not in ('uploading', 'split')
      and d.document_month between from_m and to_end
    group by 1, 2
  ),
  dues as (
    select du.client_id, date_trunc('month', du.due_on)::date as m, count(*)::int as due,
           count(*) filter (where du.amount > coalesce((
             select sum(a.amount) from public.payment_allocations a
             join public.client_deposits dep on dep.id = a.deposit_id
             where a.due_id = du.id and dep.voided_at is null and dep.received_on <= du.due_on
           ), 0))::int as late
    from public.client_dues du
    where du.waived_at is null and du.due_on < today and du.due_on between from_m and to_end
    group by 1, 2
  ),
  fil as (
    select fi.client_id, date_trunc('month', fi.due_date)::date as m, count(*)::int as due
    from public.filing_instances fi
    where fi.due_date < today and fi.due_date between from_m and to_end
    group by 1, 2
  ),
  lf as (
    select l.client_id, date_trunc('month', l.due_date)::date as m, count(*)::int as late,
           count(*) filter (where l.cause = 'client')::int as by_client
    from private.late_filing_causes(from_m, to_end, today) l
    group by 1, 2
  ),
  k as (
    select c.client_id, c.m from cyc c union select d.client_id, d.m from docs d
    union select u.client_id, u.m from dues u union select f.client_id, f.m from fil f
  )
  select k.client_id, k.m,
         coalesce(cyc.due, 0), coalesce(cyc.missed, 0),
         coalesce(docs.n, 0), coalesce(docs.returned, 0), coalesce(docs.late, 0),
         coalesce(dues.due, 0), coalesce(dues.late, 0),
         coalesce(fil.due, 0), coalesce(lf.late, 0), coalesce(lf.by_client, 0)
  from k
  left join cyc on cyc.client_id = k.client_id and cyc.m = k.m
  left join docs on docs.client_id = k.client_id and docs.m = k.m
  left join dues on dues.client_id = k.client_id and dues.m = k.m
  left join fil on fil.client_id = k.client_id and fil.m = k.m
  left join lf on lf.client_id = k.client_id and lf.m = k.m
  order by k.client_id, k.m;
end;
$$;

create or replace function public.confirm_month_complete(p_client uuid, p_period date, p_cancelled jsonb default '[]'::jsonb)
returns public.document_cycles
language plpgsql security definer set search_path = '' as $$
declare
  y public.document_cycles;
  m date := date_trunc('month', p_period)::date;
  sent int;
  open_list text;
begin
  if not private.can_upload(p_client) then
    raise exception 'You cannot do this for this client' using errcode = '42501';
  end if;
  select * into y from public.document_cycles where client_id = p_client and period = m for update;
  if y.id is null then raise exception 'That month is not open for documents' using errcode = 'P0002'; end if;
  if y.closed_at is not null then raise exception 'That month is closed' using errcode = '22023'; end if;
  if y.client_confirmed_at is not null then return y; end if;
  if y.nothing_to_submit_at is not null then
    raise exception 'This month was marked as having no transactions' using errcode = '22023';
  end if;
  select count(*) into sent from public.documents d
  where d.client_id = p_client and d.document_month = m and d.status not in ('uploading', 'split') and private.is_submission(d.doc_type);
  sent := sent + (select count(*) from public.payroll_submissions s where s.client_id = p_client and s.pay_month = m);
  if sent = 0 then
    raise exception 'Nothing has been sent for this month. If there were no transactions, use “No transactions this month”.' using errcode = '22023';
  end if;

  -- Only numbers that are actually missing can be marked cancelled.
  insert into public.cancelled_invoices (client_id, prefix, num, width, period)
  select p_client, g.prefix, g.num, g.width, m
  from private.missing_invoices(p_client, m) g
  join jsonb_array_elements(case when jsonb_typeof(p_cancelled) = 'array' then p_cancelled else '[]'::jsonb end) c
    on upper(coalesce(c ->> 'prefix', '')) = g.prefix and (c ->> 'num') ~ '^\d{1,15}$' and (c ->> 'num')::bigint = g.num
  on conflict do nothing;

  select string_agg(g.prefix || ' ' || lpad(g.num::text, g.width, '0'), ', ' order by g.prefix, g.num) into open_list
  from (select * from private.missing_invoices(p_client, m) limit 10) g;
  if open_list is not null then
    raise exception 'Answer the missing invoices first: %', open_list using errcode = '22023';
  end if;

  update public.document_cycles
    set client_confirmed_at = now(), client_confirmed_by = auth.uid(), confirmed_documents = sent
    where id = y.id returning * into y;
  return y;
end;
$$;

create or replace function private.missing_invoices(p_client uuid, p_period date)
returns table (prefix text, num bigint, width int)
language sql stable security definer set search_path = '' as $$
  with nums as (
    select d.document_month, n.prefix, n.num, n.width
    from public.documents d
    join public.extractions x on x.document_id = d.id
    cross join lateral private.invoice_number_parts(coalesce(nullif(x.approved_fields ->> 'number', ''), x.fields ->> 'number')) n
    where d.client_id = p_client and d.doc_type = 'sales_invoice' and d.status not in ('uploading', 'returned', 'split')
      and d.document_month between (p_period - interval '12 months')::date and (p_period + interval '12 months')::date
  ),
  cur as (
    select n.prefix, min(n.num) as lo, max(n.num) as hi, max(n.width) as w from nums n where n.document_month = p_period group by n.prefix
  ),
  bounds as (
    select c.prefix, c.hi, c.w,
      coalesce((select max(o.num) from nums o where o.prefix = c.prefix and o.document_month < p_period and o.num < c.lo and o.num >= c.lo - 51), c.lo) as lo
    from cur c
  ),
  -- Every number of the series in range, whatever month it was sent for, in order.
  present as (
    select distinct b.prefix, b.w, o.num from bounds b join nums o on o.prefix = b.prefix and o.num between b.lo and b.hi
  ),
  pairs as (select p.prefix, p.w, p.num, lead(p.num) over (partition by p.prefix order by p.num) as next from present p)
  select pr.prefix, g as num, pr.w as width
  from pairs pr cross join lateral generate_series(pr.num + 1, pr.next - 1) g
  where pr.next - pr.num - 1 between 1 and 50
    and not exists (select 1 from public.cancelled_invoices ci where ci.client_id = p_client and ci.prefix = pr.prefix and ci.num = g)
  order by 1, 2
$$;

/**
 * Closing a month: what was not posted is carried to the next month (or, at the end
 * of the taxable year, queued as an exception). A bundle is not posted itself; its
 * invoices are carried or queued one by one (the bundle stays where it was; an invoice
 * added to it later is placed past the closed month by place_document).
 */
create or replace function private.close_cycle(p_cycle uuid, p_by uuid) returns public.document_cycles
language plpgsql security definer set search_path = '' as $$
declare
  y public.document_cycles;
  fye int;
  next_m date;
  moved int := 0;
  queued int := 0;
begin
  select * into y from public.document_cycles where id = p_cycle for update;
  if y.closed_at is not null then return y; end if;
  select fiscal_year_end_month into fye from public.clients where id = y.client_id;
  next_m := (y.period + interval '1 month')::date;

  update public.document_cycles set closed_at = now(), closed_by = p_by where id = y.id;

  if private.taxable_year(next_m, fye) = private.taxable_year(y.period, fye) then
    -- The place_document trigger moves each one past any closed months.
    with moved_docs as (
      update public.documents d set period = next_m, carried_from = coalesce(d.carried_from, y.period)
      where d.client_id = y.client_id and d.period = y.period and d.status not in ('posted', 'split')
        and private.is_submission(d.doc_type) and not d.prior_year and d.exception_status is null
      returning 1
    ) select count(*) into moved from moved_docs;
  else
    with queued_docs as (
      update public.documents d set exception_status = 'open', exception_reason = 'Not posted when the taxable year closed'
      where d.client_id = y.client_id and d.period = y.period and d.status not in ('posted', 'split')
        and private.is_submission(d.doc_type) and d.exception_status is null
      returning 1
    ) select count(*) into queued from queued_docs;
  end if;

  update public.document_cycles set carried_forward = moved, to_exceptions = queued where id = y.id returning * into y;
  return y;
end;
$$;

revoke execute on function private.is_splittable(text) from public, anon;
revoke execute on function private.renumber_bundle(uuid) from public, anon, authenticated;
revoke execute on function private.add_bundle_child(public.documents, int, int, text) from public, anon, authenticated;
revoke execute on function private.drop_bundle_child(uuid) from public, anon, authenticated;
revoke execute on function private.bundle_for_fix(uuid) from public, anon, authenticated;
revoke execute on function public.split_document(uuid, int, jsonb, text, text) from public, anon, authenticated;
revoke execute on function public.add_bundle_invoice(uuid, int) from public, anon;
revoke execute on function public.delete_bundle_invoice(uuid) from public, anon;
revoke execute on function public.set_bundle_page(uuid, int) from public, anon;
grant execute on function private.is_splittable(text) to authenticated;
grant execute on function public.split_document(uuid, int, jsonb, text, text) to service_role;
grant execute on function public.add_bundle_invoice(uuid, int) to authenticated;
grant execute on function public.delete_bundle_invoice(uuid) to authenticated;
grant execute on function public.set_bundle_page(uuid, int) to authenticated;
