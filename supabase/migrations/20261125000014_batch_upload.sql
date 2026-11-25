-- B1: batch upload in the register layout (docs/UX-REVIEW.md, "Batch upload";
-- Owner's decisions 3 and 30).
--
-- At onboarding, a client's sales or purchases come in as an Excel workbook in
-- the register layout (the taxify batch templates) instead of one image per
-- invoice. The app reads and checks every row first, as with the payroll
-- register preview (src/lib/batch/check.ts). Then `post_batch` posts the whole
-- file, or none of it if any row fails. Each row becomes an approved document
-- marked "Batch · no image", so its register line and journal entry come out
-- the way an approved image's do (sync_register_line, book_document).

-- A batch row has no file behind it.
alter table public.documents alter column storage_path drop not null;
alter table public.documents drop constraint documents_size_bytes_check;
alter table public.documents add constraint documents_file_check
  check (source = 'batch' or (storage_path is not null and size_bytes > 0));
alter table public.documents add constraint documents_batch_size_check check (size_bytes >= 0);

create table public.batch_uploads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  kind text not null check (kind in ('sales', 'purchases')),
  file_name text not null,
  row_count int not null check (row_count > 0),
  -- Sum of the rows' totals (sales: gross receipts with VAT; purchases: amounts paid or payable).
  total numeric(18, 2) not null default 0,
  first_date date,
  last_date date,
  -- Rows booked to the ledger (dated on or after the books start); the rest are register only.
  booked_count int not null default 0,
  uploaded_by uuid not null references auth.users (id),
  created_at timestamptz not null default now()
);
create index batch_uploads_client_idx on public.batch_uploads (client_id, created_at desc);
alter table public.batch_uploads enable row level security;
create policy batch_uploads_read on public.batch_uploads for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create trigger audit after insert or update or delete on public.batch_uploads for each row execute function private.audit();

alter table public.documents add column batch_id uuid references public.batch_uploads (id) on delete restrict;
alter table public.documents add column batch_row int;
create index documents_batch_idx on public.documents (batch_id) where batch_id is not null;

-- History loaded at onboarding is not "sent after the client confirmed the month".
create or replace function private.mark_after_confirmation() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.source <> 'batch' and private.is_submission(new.doc_type) and not new.late and exists (
    select 1 from public.document_cycles y
    where y.client_id = new.client_id and y.period = date_trunc('month', new.document_month)::date and y.client_confirmed_at is not null
  ) then
    new.late := true;
  end if;
  return new;
end;
$$;

/**
 * Posts a checked batch. p_rows: [{row, fields, account_id}] where fields holds the
 * approved figures in the document format (date, number, party_*, vatable, vat,
 * total, atc, withholding, ...). The app has already checked every row. This
 * function checks again what the database can know at posting time:
 *   - access
 *   - the account title belongs to the client
 *   - the month is not locked by a filed return
 *   - no duplicate of an approved document
 * One failing row stops the whole batch, and the error names the row.
 * Returns the batch id.
 */
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
    select fi.form into v_form from public.filing_instances fi where fi.id = private.locking_filing(p_client, v_month);
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

revoke execute on function public.post_batch(uuid, text, text, jsonb) from public, anon;
grant execute on function public.post_batch(uuid, text, text, jsonb) to authenticated;
