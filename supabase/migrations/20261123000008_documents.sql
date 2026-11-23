-- Client documents (spec §3.4, §3.10, §3.14, §4.2; Q10, Q28, Q35, Q45, Q61).
--
-- Clients upload from the portal (phone camera or file); staff can upload for the
-- clients assigned to them. Files live in the private "documents" bucket under
-- <client id>/<document id>/<file name>. A row in public.documents describes each
-- file; it is created by register_document() before the upload and confirmed by
-- confirm_document() after. Nothing is deleted automatically (retention ≥ 10 years).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents', 'documents', false, 20971520,
        array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'])
on conflict (id) do nothing;

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  uploaded_by uuid not null references auth.users (id),
  source text not null check (source in ('portal', 'staff')),
  doc_type text not null check (doc_type in (
    'sales_invoice', 'purchase_receipt', 'bir_2307_received', 'bir_2307_issued', 'cor',
    'filed_return', 'payment_proof', 'other'
  )),
  -- First day of the month the document is counted in (§4.2).
  period date not null check (extract(day from period) = 1),
  -- The month the uploader said the document is for.
  document_month date not null check (extract(day from document_month) = 1),
  -- Uploaded after that month's cutoff: counted in the next open month (§3.10).
  late boolean not null default false,
  -- From a prior taxable year: never carried forward; goes to the exceptions queue.
  prior_year boolean not null default false,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  storage_path text not null unique,
  status text not null default 'uploading' check (status in ('uploading', 'received', 'under_review', 'posted', 'returned')),
  return_reason text,
  client_reply text,
  -- Filed return / proof of payment attached to a filing.
  filing_instance_id uuid references public.filing_instances (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index documents_client_idx on public.documents (client_id, period desc, created_at desc);
create index documents_filing_idx on public.documents (filing_instance_id) where filing_instance_id is not null;

create trigger touch_updated_at before update on public.documents for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.documents for each row execute function private.audit();

-- Who viewed which document (§3.14). Append-only; the Owner reads it.
create table public.access_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor uuid not null references auth.users (id),
  document_id uuid not null references public.documents (id) on delete cascade,
  action text not null check (action in ('view'))
);

alter table public.documents enable row level security;
alter table public.access_log enable row level security;

-- Read: anyone who can see the client. Writes go through the functions below.
create policy documents_read on public.documents for select to authenticated using (private.can_access_client(client_id));
create policy access_log_owner on public.access_log for select to authenticated using (private.is_owner());
create policy access_log_insert on public.access_log for insert to authenticated with check (
  actor = auth.uid() and exists (select 1 from public.documents d where d.id = document_id and private.can_access_client(d.client_id))
);

-- Who may add documents to a client: its client users, staff assigned to it, the Owner.
create or replace function private.can_upload(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_owner() or private.is_assigned(target) or private.is_client_user(target)
$$;

-- The client id a stored file belongs to (its first folder), or null for any other path.
create or replace function private.document_client(name text) returns uuid
language plpgsql immutable as $$
begin
  return split_part(name, '/', 1)::uuid;
exception when invalid_text_representation then
  return null;
end;
$$;

-- Storage: files sit under <client id>/...; the same people may read and add them.
-- No update or delete policy: stored files are kept (retention, §3.14).
create policy documents_files_read on storage.objects for select to authenticated using (
  bucket_id = 'documents' and private.can_access_client(private.document_client(name))
);
create policy documents_files_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'documents' and private.can_upload(private.document_client(name))
);

-- Taxable year a month belongs to, for a client whose year ends in fye_month.
create or replace function private.taxable_year(d date, fye_month int) returns int
language sql immutable as $$
  select case when extract(month from d)::int <= fye_month then extract(year from d)::int else extract(year from d)::int + 1 end
$$;

/**
 * Which month a document is counted in (§4.2, §3.10), given the month it is for,
 * the upload date, the client's cutoff day and taxable-year end:
 *  - before that month's cutoff (cutoff day of the next month): that month;
 *  - after it, same taxable year: the month now open for documents, flagged late;
 *  - a prior taxable year: kept on its month and flagged for the exceptions
 *    queue, never carried forward.
 */
create or replace function private.document_period(m date, today date, cutoff_day int, fye_month int,
  out period date, out late boolean, out prior_year boolean)
language plpgsql immutable as $$
declare
  open_month date := case when extract(day from today) <= cutoff_day
                          then (date_trunc('month', today) - interval '1 month')::date
                          else date_trunc('month', today)::date end;
begin
  m := date_trunc('month', m)::date;
  prior_year := private.taxable_year(m, fye_month) < private.taxable_year(open_month, fye_month);
  late := m < open_month and not prior_year;
  period := case when late then open_month else m end;
end;
$$;

/**
 * Creates the document row before the file is uploaded and returns it (its
 * storage_path is where the file goes), placed in a month by document_period().
 */
create or replace function public.register_document(
  p_client uuid,
  p_doc_type text,
  p_month date,
  p_file_name text,
  p_mime_type text,
  p_size bigint,
  p_filing uuid default null
) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
  d public.documents;
  today date := (now() at time zone 'Asia/Manila')::date;
  m date := date_trunc('month', p_month)::date;
  placed record;
  new_id uuid := gen_random_uuid();
  safe_name text;
  staff boolean;
begin
  select * into c from public.clients where id = p_client;
  if c.id is null or not private.can_upload(p_client) then
    raise exception 'You cannot add documents for this client' using errcode = '42501';
  end if;
  staff := private.staff_role() is not null;
  if p_doc_type in ('filed_return', 'payment_proof') and not staff then
    raise exception 'Only staff add filed returns and proof of payment' using errcode = '42501';
  end if;
  if p_filing is not null and not exists (select 1 from public.filing_instances f where f.id = p_filing and f.client_id = p_client) then
    raise exception 'That filing is not this client''s' using errcode = '22023';
  end if;
  if m > date_trunc('month', today)::date then
    raise exception 'Choose this month or an earlier one' using errcode = '22023';
  end if;

  placed := private.document_period(m, today, c.submission_cutoff_day, c.fiscal_year_end_month);

  safe_name := left(regexp_replace(coalesce(nullif(trim(p_file_name), ''), 'document'), '[^A-Za-z0-9._-]+', '_', 'g'), 120);

  insert into public.documents (id, client_id, uploaded_by, source, doc_type, period, document_month, late, prior_year,
                                file_name, mime_type, size_bytes, storage_path, filing_instance_id)
  values (
    new_id, p_client, auth.uid(), case when staff then 'staff' else 'portal' end, p_doc_type,
    placed.period, m, placed.late, placed.prior_year,
    coalesce(nullif(trim(p_file_name), ''), 'document'), p_mime_type, p_size,
    p_client || '/' || new_id || '/' || safe_name,
    p_filing
  ) returning * into d;
  return d;
end;
$$;

/** The uploader confirms the file arrived; the document becomes Received. */
create or replace function public.confirm_document(p_document uuid) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
begin
  select * into d from public.documents where id = p_document for update;
  if d.id is null or d.uploaded_by <> auth.uid() then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;
  if d.status <> 'uploading' then return d; end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'documents' and o.name = d.storage_path) then
    raise exception 'The file has not arrived yet; try the upload again' using errcode = '22023';
  end if;
  update public.documents set status = 'received' where id = d.id returning * into d;
  return d;
end;
$$;

/** Staff act on a document: accept it for review, mark it posted, or return it with a reason. */
create or replace function public.review_document(p_document uuid, p_action text, p_reason text default null) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  reason text := nullif(trim(coalesce(p_reason, '')), '');
begin
  select * into d from public.documents where id = p_document for update;
  if d.id is null or not private.can_access_client(d.client_id) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;
  if not (private.is_owner() or private.is_assigned(d.client_id)) then
    raise exception 'Only staff assigned to this client can review its documents' using errcode = '42501';
  end if;
  if p_action = 'accept' and d.status in ('received', 'returned') then
    update public.documents set status = 'under_review' where id = d.id returning * into d;
  elsif p_action = 'post' and d.status in ('received', 'under_review') then
    update public.documents set status = 'posted' where id = d.id returning * into d;
  elsif p_action = 'return' and d.status in ('received', 'under_review') then
    if reason is null then raise exception 'Say why the document is being returned (e.g. blurry, retake)' using errcode = '22023'; end if;
    update public.documents set status = 'returned', return_reason = reason, client_reply = null where id = d.id returning * into d;
  else
    raise exception 'That cannot be done to a document that is %', d.status using errcode = '22023';
  end if;
  return d;
end;
$$;

/** The client replies to a returned document (Q35: replies only on returned documents). */
create or replace function public.reply_document(p_document uuid, p_reply text) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  reply text := nullif(trim(coalesce(p_reply, '')), '');
begin
  select * into d from public.documents where id = p_document for update;
  if d.id is null or not private.is_client_user(d.client_id) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;
  if d.status <> 'returned' then raise exception 'You can reply only to a returned document' using errcode = '22023'; end if;
  if reply is null then raise exception 'Write your reply' using errcode = '22023'; end if;
  update public.documents set client_reply = reply, status = 'received' where id = d.id returning * into d;
  return d;
end;
$$;

revoke execute on function public.register_document(uuid, text, date, text, text, bigint, uuid) from public, anon;
revoke execute on function public.confirm_document(uuid) from public, anon;
revoke execute on function public.review_document(uuid, text, text) from public, anon;
revoke execute on function public.reply_document(uuid, text) from public, anon;
revoke execute on function private.can_upload(uuid) from public, anon;
revoke execute on function private.document_client(text) from public, anon;
revoke execute on function private.taxable_year(date, int) from public, anon;
revoke execute on function private.document_period(date, date, int, int) from public, anon;
grant execute on function public.register_document(uuid, text, date, text, text, bigint, uuid) to authenticated;
grant execute on function public.confirm_document(uuid) to authenticated;
grant execute on function public.review_document(uuid, text, text) to authenticated;
grant execute on function public.reply_document(uuid, text) to authenticated;
grant execute on function private.can_upload(uuid) to authenticated;
grant execute on function private.document_client(text) to authenticated;
grant execute on function private.taxable_year(date, int) to authenticated;
grant execute on function private.document_period(date, date, int, int) to authenticated;
