-- Bookkeeping, Phase 1B slice 6 (spec §3.4 Reports, §3.6; Q42): financial
-- statements released to the client.
--
-- Staff view a client's statements for a month, quarter or year from the
-- ledger at any time (src/lib/ledger/statements.ts). The Owner releases one to
-- the client's portal: the statements are stored exactly as released, so later
-- postings or amendments do not change what the client was given. Releasing
-- the same report again replaces it; the Owner can withdraw it.

create table public.client_reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('monthly', 'quarterly', 'annual')),
  period_start date not null,
  period_end date not null,
  -- FinancialStatements (src/lib/ledger/statements.ts) as released.
  statements jsonb not null check (jsonb_typeof(statements) = 'object'),
  note text,
  released_by uuid references auth.users (id),
  released_at timestamptz not null default now(),
  check (period_start <= period_end),
  unique (client_id, kind, period_end)
);

create index client_reports_client_idx on public.client_reports (client_id, period_end desc);
create trigger audit after insert or update or delete on public.client_reports for each row execute function private.audit();

alter table public.client_reports enable row level security;
-- Staff who see the client, and the client's own users, read released reports.
create policy client_reports_read on public.client_reports for select to authenticated
  using ((private.is_staff() and private.can_access_client(client_id)) or private.is_client_user(client_id));

-- The Owner releases (or re-releases) a report to the client.
create or replace function public.release_client_report(p_client uuid, p_kind text, p_start date, p_end date, p_statements jsonb, p_note text default null)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  r uuid;
begin
  if not private.is_owner() then raise exception 'Only the Owner releases reports to clients' using errcode = '42501'; end if;
  if not exists (select 1 from public.client_books where client_id = p_client) then
    raise exception 'This client has no books' using errcode = '22023';
  end if;
  if p_kind not in ('monthly', 'quarterly', 'annual') or p_start is null or p_end is null or p_start > p_end then
    raise exception 'Choose the report period' using errcode = '22023';
  end if;
  if p_statements is null or jsonb_typeof(p_statements) <> 'object' then
    raise exception 'The statements are missing' using errcode = '22023';
  end if;
  insert into public.client_reports (client_id, kind, period_start, period_end, statements, note, released_by, released_at)
  values (p_client, p_kind, p_start, p_end, p_statements, nullif(btrim(p_note), ''), auth.uid(), now())
  on conflict (client_id, kind, period_end) do update
    set period_start = excluded.period_start, statements = excluded.statements, note = excluded.note,
        released_by = excluded.released_by, released_at = excluded.released_at
  returning id into r;
  return r;
end;
$$;

-- The Owner withdraws a released report from the portal.
create or replace function public.withdraw_client_report(p_report uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_owner() then raise exception 'Only the Owner withdraws reports' using errcode = '42501'; end if;
  delete from public.client_reports where id = p_report;
  if not found then raise exception 'Report not found' using errcode = 'P0002'; end if;
end;
$$;

revoke execute on function public.release_client_report(uuid, text, date, date, jsonb, text) from public, anon;
revoke execute on function public.withdraw_client_report(uuid) from public, anon;
grant execute on function public.release_client_report(uuid, text, date, date, jsonb, text) to authenticated;
grant execute on function public.withdraw_client_report(uuid) to authenticated;
