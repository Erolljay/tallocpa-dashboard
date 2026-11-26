-- The 2307 tracker: the CWT customers withheld on the client's Sales Invoices beside the
-- 2307s the client sent us, and a staff button to match a 2307 again.
--
--   cwt_2307_tracker(client, from, to)   for a period of at most a year:
--     invoices   each posted, not void Sales Invoice with tax withheld, with the 2307 that
--                supports it (book_invoices.cwt_document_id), the follow-up and the
--                year-end decision (keep / stop claiming);
--     documents  each 2307 received from the client (received, under review or posted)
--                dated in the period or supporting an invoice of the period, with the
--                figures approved (else the figures OCR read) and the customer it is for.
--   Who may call it: the Owner and staff assigned to the client (every month), and the
--   client's own portal users, who get only the invoices of locked months (decision 9) and
--   their own uploads. Client users still read no Books table.
--
--   rematch_2307(document)   runs private.mark_cwt_supported again for an approved 2307 that
--   supports no invoice yet: the usual case is a 2307 approved before its Sales Invoice was
--   keyed in the Books. A 2307 that already supports invoices is left alone, so a filed SAWT
--   does not move under it. Owner and staff who keep the client's Books.

/** The customer a row belongs to: its party, else its TIN (first 11 characters), else its name. */
create or replace function private.cwt_party_key(p_party uuid, p_tin text, p_name text) returns text
language sql immutable set search_path = '' as $$
  select coalesce(p_party::text,
                  case when p_tin ~ '^\d{3}-\d{3}-\d{3}' then 'tin:' || substr(p_tin, 1, 11) end,
                  'name:' || upper(btrim(coalesce(p_name, ''))))
$$;

/** "2026-10-31" → that date; anything else → null (OCR text is not trusted to be a date). */
create or replace function private.cwt_date(p text) returns date
language plpgsql immutable set search_path = '' as $$
begin
  if p is null or p !~ '^\d{4}-\d{2}-\d{2}$' then return null; end if;
  return p::date;
exception when others then
  return null;
end;
$$;

create or replace function public.cwt_2307_tracker(p_client uuid, p_from date, p_to date)
returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  v_staff boolean := private.is_staff() and private.can_access_client(p_client);
  result jsonb;
begin
  if not v_staff and not private.is_client_user(p_client) then
    raise exception 'The 2307 tracker of this client is not available.' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_from > p_to or p_to - p_from > 366 then
    raise exception 'Choose a period of at most a year' using errcode = '22023';
  end if;

  with months as (
    select g::date as month, private.books_locked_by(p_client, g::date) is not null as locked
    from generate_series(date_trunc('month', p_from), date_trunc('month', p_to), interval '1 month') g
  ),
  inv as (
    select i.*, w.atc, m.locked
    from public.book_invoices i
    join public.journal_entries j on j.id = i.journal_entry_id and j.status = 'posted'
    left join public.tax_codes w on w.id = i.withholding_code_id
    join months m on m.month = date_trunc('month', i.issue_date)::date
    where i.client_id = p_client and i.kind = 'sales' and i.voided_at is null and i.withholding > 0
      and i.issue_date between p_from and p_to
      and (v_staff or m.locked)
  ),
  docs as (
    select d.id, d.status, d.file_name, d.document_month, d.created_at,
           e.approved_at is not null as approved,
           coalesce(e.approved_fields, e.fields, '{}'::jsonb) as f
    from public.documents d
    left join public.extractions e on e.document_id = d.id
    where d.client_id = p_client and d.doc_type = 'bir_2307_received' and d.status in ('received', 'under_review', 'posted')
  ),
  docs_in as (
    select x.*, coalesce(private.cwt_date(x.f ->> 'date'), x.document_month) as on_date
    from docs x
  )
  select jsonb_build_object(
    'months', coalesce((select jsonb_agg(jsonb_build_object('month', m.month, 'locked', m.locked) order by m.month) from months m), '[]'::jsonb),
    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
        'invoice_id', i.id, 'issue_date', i.issue_date, 'reference', i.reference,
        'party_key', private.cwt_party_key(i.party_id, i.party_tin, i.party_name),
        'party_name', i.party_name, 'party_tin', i.party_tin, 'atc', i.atc,
        'withholding', i.withholding::text, 'document_id', i.cwt_document_id,
        'followed_up_at', i.cwt_followed_up_at, 'follow_up_note', i.cwt_follow_up_note,
        'claim', i.cwt_claim, 'locked', i.locked
      ) order by i.issue_date, i.reference, i.id)
      from inv i), '[]'::jsonb),
    'documents', coalesce((
      select jsonb_agg(jsonb_build_object(
        'document_id', x.id, 'status', x.status, 'approved', x.approved, 'file_name', x.file_name,
        'date', x.on_date, 'number', x.f ->> 'number',
        'party_key', private.cwt_party_key(private.document_party(x.f ->> 'party_tin'), x.f ->> 'party_tin', x.f ->> 'party_name'),
        'party_name', x.f ->> 'party_name', 'party_tin', x.f ->> 'party_tin',
        'atc', nullif(upper(btrim(coalesce(x.f ->> 'atc', ''))), ''),
        'withholding', private.register_amount(x.f ->> 'withholding')::text,
        'created_at', x.created_at
      ) order by x.on_date, x.created_at)
      from docs_in x
      where x.on_date between p_from and p_to
         or exists (select 1 from inv i where i.cwt_document_id = x.id)), '[]'::jsonb)
  ) into result;
  return result;
end;
$$;

/** Matches an approved 2307 that supports no Sales Invoice yet; returns how many invoices it now supports. */
create or replace function public.rematch_2307(p_document uuid) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not (private.is_staff() and private.can_access_client(d.client_id)) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(d.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can match a 2307' using errcode = '42501';
  end if;
  if d.doc_type <> 'bir_2307_received' or d.status <> 'posted' then
    raise exception 'Only an approved 2307 received can be matched' using errcode = '22023';
  end if;
  if exists (select 1 from public.book_invoices i where i.cwt_document_id = p_document) then
    raise exception 'This 2307 already supports a Sales Invoice' using errcode = '22023';
  end if;
  return private.mark_cwt_supported(p_document);
end;
$$;

revoke execute on function private.cwt_party_key(uuid, text, text) from public, anon, authenticated;
revoke execute on function private.cwt_date(text) from public, anon, authenticated;
revoke execute on function public.cwt_2307_tracker(uuid, date, date) from public, anon;
revoke execute on function public.rematch_2307(uuid) from public, anon;
grant execute on function public.cwt_2307_tracker(uuid, date, date) to authenticated;
grant execute on function public.rematch_2307(uuid) to authenticated;
