-- Payroll read from the client's own file (Q9: Gemini with staff review).
--
-- Supersedes the note in 20261126000001_payroll_documents.sql that a payroll
-- document is "never read by OCR": a payroll document (the client's Excel, CSV,
-- PDF or photo) is now read into the Tallo payroll register for staff to review.
-- It still never becomes a register line and never goes through extractions /
-- approve_document: the reading is kept apart in payroll_extractions, staff
-- check and edit it beside the original, and only staff load it into the
-- month's payroll, through the same loader as an uploaded register
-- (save_payroll_month). Nothing is posted automatically.
--
-- Spreadsheets are read cell by cell; Gemini only suggests what unknown column
-- headings mean. The columns staff confirm are kept per client in
-- payroll_column_maps, so next month's file maps without asking (like the tax
-- code defaults kept per supplier).
--
-- Who sees it: the Owner and the staff assigned to the client (private.can_payroll).
-- Client users never see the reading or the mapping.

comment on table public.documents is
  'Uploaded documents. A payroll document (doc_type payroll) is read into payroll_extractions for staff review, never into extractions or the register.';

create table public.payroll_extractions (
  document_id uuid primary key references public.documents (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'done', 'failed')),
  -- 'sheet': read from the client's Excel or CSV; 'image': a PDF or photo read by Gemini.
  source text check (source in ('sheet', 'image')),
  provider text,
  model text,
  -- What was read (src/lib/payroll/read/types.ts PayrollRead): rows with a figure and confidence per payslip item.
  result jsonb,
  -- Staff's edits on the review screen (PayrollDraft); null until saved.
  draft jsonb,
  error text,
  attempts int not null default 0,
  started_at timestamptz,
  finished_at timestamptz,
  loaded_at timestamptz,
  loaded_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payroll_extractions_client_idx on public.payroll_extractions (client_id);
create index payroll_extractions_status_idx on public.payroll_extractions (status);

-- The row's client is the document's client, whoever writes it.
create or replace function private.payroll_extraction_client() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  select d.client_id into new.client_id from public.documents d where d.id = new.document_id and d.doc_type = 'payroll';
  if new.client_id is null then
    raise exception 'Only a payroll document can have a payroll reading.' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger payroll_extraction_client before insert or update of document_id, client_id on public.payroll_extractions
  for each row execute function private.payroll_extraction_client();
create trigger touch_updated_at before update on public.payroll_extractions for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.payroll_extractions for each row execute function private.audit();

create table public.payroll_column_maps (
  id bigint generated always as identity primary key,
  client_id uuid not null references public.clients (id) on delete cascade,
  -- The client's column heading, lowercased with punctuation removed (columns.ts headerKey).
  header text not null check (header <> '' and length(header) <= 200),
  target text not null check (target in (
    'item', 'name', 'last_name', 'first_name', 'middle_name', 'employee_no', 'tin', 'pay_date',
    'days', 'hours', 'gross', 'deductions', 'net', 'ignore'
  )),
  item_id uuid references public.payroll_items (id) on delete cascade,
  confirmed_by uuid references auth.users (id) default auth.uid(),
  updated_at timestamptz not null default now(),
  unique (client_id, header),
  check ((target = 'item') = (item_id is not null))
);

-- An item column must name one of this client's items.
create or replace function private.payroll_column_map_item() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.item_id is not null and not exists (select 1 from public.payroll_items i where i.id = new.item_id and i.client_id = new.client_id) then
    raise exception 'That payslip item is not one of this client''s.' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger payroll_column_map_item before insert or update on public.payroll_column_maps
  for each row execute function private.payroll_column_map_item();
create trigger touch_updated_at before update on public.payroll_column_maps for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.payroll_column_maps for each row execute function private.audit();

alter table public.payroll_extractions enable row level security;
alter table public.payroll_column_maps enable row level security;

-- The reading is written by the server (service role) after an upload or from
-- "Read payroll"; staff on the client read it and save their edits to it.
create policy payroll_extractions_read on public.payroll_extractions for select to authenticated using (private.can_payroll(client_id));
create policy payroll_extractions_update on public.payroll_extractions for update to authenticated
  using (private.can_payroll(client_id)) with check (private.can_payroll(client_id));

create policy payroll_column_maps_read on public.payroll_column_maps for select to authenticated using (private.can_payroll(client_id));
create policy payroll_column_maps_insert on public.payroll_column_maps for insert to authenticated with check (private.can_payroll(client_id));
create policy payroll_column_maps_update on public.payroll_column_maps for update to authenticated
  using (private.can_payroll(client_id)) with check (private.can_payroll(client_id));
create policy payroll_column_maps_delete on public.payroll_column_maps for delete to authenticated using (private.can_payroll(client_id));
