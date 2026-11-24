-- Return worksheets (spec §3.7): the figures of one filing, line by line on the
-- BIR form, computed by the app (src/lib/returns) from approved documents plus
-- figures staff type in. One worksheet per filing instance.
--
--   inputs        the figures staff typed in (ManualInput key → text as typed);
--   result        snapshot of the last computation (WorksheetResult: sections,
--                 schedules, errors, warnings, document ids);
--   figures       the same lines flattened, line key → centavos; later
--                 worksheets of the client read these as priorFigures (e.g.
--                 1601-EQ deducts the 0619-E remittances of months 1 and 2);
--   document_ids  the approved documents the figures came from.
--
-- Access: the Owner and the staff assigned to the client (preparer or reviewer)
-- read and write. Client users do not see worksheets: they see the return in
-- the portal once it is reviewed (spec §3.8), not the working papers.
-- Once the filing is Filed (or later) the worksheet is locked; an amendment is
-- a new filing (§4.3).

create table public.return_worksheets (
  id uuid primary key default gen_random_uuid(),
  filing_instance_id uuid not null unique references public.filing_instances (id) on delete cascade,
  -- Copied from the filing by a trigger (never trusted from the caller); used by RLS.
  client_id uuid not null references public.clients (id) on delete cascade,
  inputs jsonb not null default '{}'::jsonb check (jsonb_typeof(inputs) = 'object'),
  result jsonb check (result is null or jsonb_typeof(result) = 'object'),
  figures jsonb not null default '{}'::jsonb check (jsonb_typeof(figures) = 'object'),
  document_ids uuid[] not null default '{}',
  computed_at timestamptz,
  computed_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((result is null) = (computed_at is null))
);

create index return_worksheets_client_idx on public.return_worksheets (client_id);

-- Keep client_id equal to the filing's; refuse any change once the return is filed.
create or replace function private.return_worksheet_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  target uuid := case when tg_op = 'DELETE' then old.filing_instance_id else new.filing_instance_id end;
begin
  if tg_op = 'UPDATE' and new.filing_instance_id <> old.filing_instance_id then
    raise exception 'A worksheet stays with its filing' using errcode = '22023';
  end if;
  select * into f from public.filing_instances where id = target;
  if f.id is null then
    -- The filing is being deleted (cascade): let the worksheet go with it.
    if tg_op = 'DELETE' then return old; end if;
    raise exception 'Filing not found' using errcode = 'P0002';
  end if;
  if f.status in ('filed', 'paid', 'proof_uploaded') then
    raise exception 'This return has been filed; its worksheet is locked' using errcode = '42501';
  end if;
  if tg_op = 'DELETE' then return old; end if;
  new.client_id := f.client_id;
  return new;
end;
$$;

create trigger guard before insert or update or delete on public.return_worksheets
  for each row execute function private.return_worksheet_guard();
create trigger touch_updated_at before update on public.return_worksheets
  for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.return_worksheets
  for each row execute function private.audit();

alter table public.return_worksheets enable row level security;

-- Staff who can see the client (Owner, assigned preparer or reviewer); never client users.
create policy worksheets_read on public.return_worksheets for select to authenticated using (
  private.is_staff() and private.can_access_client(client_id)
);
-- The same people who prepare the return (advance_filing 'prepare': Owner or assigned staff) save its worksheet.
create policy worksheets_insert on public.return_worksheets for insert to authenticated with check (
  private.is_owner() or private.is_assigned(client_id)
);
create policy worksheets_update on public.return_worksheets for update to authenticated
  using (private.is_owner() or private.is_assigned(client_id))
  with check (private.is_owner() or private.is_assigned(client_id));
-- No delete policy: a worksheet goes only with its filing.

revoke execute on function private.return_worksheet_guard() from public, anon;
