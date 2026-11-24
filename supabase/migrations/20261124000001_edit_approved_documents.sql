-- Approved history: staff may correct an approved (posted) document's figures
-- until its month is locked. A month is locked once a return of the client
-- whose period covers it has been filed (filed, paid or proof uploaded): the
-- filed worksheet used those figures, so they must not change under it.
-- Edits after approval are kept in the audit log (old and new row); they are
-- not counted as OCR corrections, so the correction rate stays OCR-only.

/** The filed return that locks a client's month, if any. */
create or replace function private.locking_filing(p_client uuid, p_month date) returns uuid
language sql stable security definer set search_path = '' as $$
  select f.id from public.filing_instances f
  where f.client_id = p_client
    and f.status in ('filed', 'paid', 'proof_uploaded')
    and p_month between date_trunc('month', f.period_start)::date and f.period_end
  order by f.period_end desc
  limit 1;
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

revoke execute on function private.locking_filing(uuid, date) from public, anon, authenticated;
revoke execute on function public.approve_document(uuid, jsonb) from public, anon;
grant execute on function public.approve_document(uuid, jsonb) to authenticated;
