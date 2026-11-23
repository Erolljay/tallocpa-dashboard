-- OCR intake and review queue (spec §3.5; Q8, Q9, Q15, Q36).
--
-- Each uploaded document gets one extraction: what the OCR engine (Gemini,
-- behind the app's ocr-provider interface) read, with a confidence per field.
-- The engine runs on the server with the service role and writes here; users
-- only read. A staff member then approves the figures (editing any that are
-- wrong) with approve_document(). Every change from what OCR read is logged in
-- extraction_corrections, which gives the OCR correction rate (Q36).
-- No document affects a return until a staff member approves it.

create table public.extractions (
  document_id uuid primary key references public.documents (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'done', 'failed')),
  provider text,
  model text,
  -- {doc_type, date, number, party_name, party_tin, party_address, vatable, vat_exempt,
  --  zero_rated, vat, total, atc, withholding} as read by OCR.
  fields jsonb not null default '{}'::jsonb,
  -- Same keys, 0–1.
  confidence jsonb not null default '{}'::jsonb,
  error text,
  attempts int not null default 0,
  started_at timestamptz,
  finished_at timestamptz,
  -- The figures a staff member approved; null until approved.
  approved_fields jsonb,
  approved_by uuid references auth.users (id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.extraction_corrections (
  id bigint generated always as identity primary key,
  document_id uuid not null references public.documents (id) on delete cascade,
  field text not null,
  ocr_value text,
  approved_value text,
  corrected_by uuid not null references auth.users (id),
  corrected_at timestamptz not null default now()
);

create index extractions_status_idx on public.extractions (status);
create index extraction_corrections_document_idx on public.extraction_corrections (document_id);

create trigger touch_updated_at before update on public.extractions for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.extractions for each row execute function private.audit();

alter table public.extractions enable row level security;
alter table public.extraction_corrections enable row level security;

-- Staff who can see the client read its extractions; client users do not see OCR internals.
create policy extractions_read on public.extractions for select to authenticated using (
  private.is_staff() and exists (select 1 from public.documents d where d.id = document_id and private.can_access_client(d.client_id))
);
create policy extraction_corrections_read on public.extraction_corrections for select to authenticated using (
  private.is_staff() and exists (select 1 from public.documents d where d.id = document_id and private.can_access_client(d.client_id))
);

/**
 * Staff approve a document's figures. p_fields holds the final values (OCR's,
 * edited where wrong). Fields that differ from OCR are logged as corrections.
 * The document is re-placed by its document date (§4.2) and marked Posted.
 */
create or replace function public.approve_document(p_document uuid, p_fields jsonb) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  c public.clients;
  e public.extractions;
  k text;
  doc_date date;
  placed record;
begin
  select * into d from public.documents where id = p_document for update;
  if d.id is null or not private.can_access_client(d.client_id) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;
  if not (private.is_owner() or private.is_assigned(d.client_id)) then
    raise exception 'Only staff assigned to this client can approve its documents' using errcode = '42501';
  end if;
  if d.status not in ('received', 'under_review') then
    raise exception 'Only a received or under-review document can be approved (this one is %)', d.status using errcode = '22023';
  end if;
  if jsonb_typeof(p_fields) <> 'object' then
    raise exception 'Fields must be an object' using errcode = '22023';
  end if;

  select * into c from public.clients where id = d.client_id;
  select * into e from public.extractions where document_id = d.id;

  -- Log every field the reviewer changed from what OCR read.
  if e.document_id is not null and e.status = 'done' then
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
    placed := private.document_period(doc_date, (d.created_at at time zone 'Asia/Manila')::date, c.submission_cutoff_day, c.fiscal_year_end_month);
    update public.documents
      set document_month = date_trunc('month', doc_date)::date, period = placed.period, late = placed.late, prior_year = placed.prior_year
      where id = d.id;
  end if;

  update public.documents set status = 'posted' where id = d.id returning * into d;
  return d;
end;
$$;

revoke execute on function public.approve_document(uuid, jsonb) from public, anon;
grant execute on function public.approve_document(uuid, jsonb) to authenticated;
