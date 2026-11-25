-- Rework phase 5 (docs/REWORK.md, decisions 12 and 23): year-end.
--
--   1. The closing entry is the Owner's: only the Owner posts it (close_books_year) or
--      reverses it. The year-end page offers it once the year's months are locked.
--   2. year_end_checks: the steps of the year-end checklist the app cannot see for
--      itself (adjustments, bank reconciliation, 13th month, inventory list, loose-leaf
--      binding, AFS), ticked by the Owner or the staff assigned to the client.
--   3. Missing 2307 at year end (decision 12): the CWT on a Sales Invoice whose 2307
--      never came stays claimed until the client decides, on the portal, to keep claiming
--      it or to stop. A stopped claim leaves the SAWT and the annual return's tax credits.
--      The decision is the client's (the Owner can record it for them); it is closed once
--      the annual income tax return of that year is Filed & paid.
--   4. A final 2316: a year's 2316s are released to the portal only once the year's months
--      are locked in the Books (clients with Books), so the released figures are final.

-- ---------------------------------------------------------------------------
-- 1. The closing entry is the Owner's.
-- ---------------------------------------------------------------------------

create or replace function private.closing_by_owner() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  -- auth.uid() is null only for the database itself (migrations, jobs).
  if auth.uid() is not null and not private.is_owner()
     and (new.source = 'closing' or (new.source = 'reversal' and exists (select 1 from public.journal_entries c where c.id = new.reverses and c.source = 'closing'))) then
    raise exception 'Only the Owner posts or reverses the closing entry' using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger closing_by_owner before insert on public.journal_entries
  for each row execute function private.closing_by_owner();

revoke execute on function private.closing_by_owner() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- 2. Year-end checklist ticks.
-- ---------------------------------------------------------------------------

create table public.year_end_checks (
  id uuid not null default gen_random_uuid() unique,
  client_id uuid not null references public.clients (id) on delete cascade,
  year_end date not null,
  item text not null check (item in ('adjustments', 'bank_reconciliation', 'thirteenth_month', 'annualization', 'inventory_list', 'loose_leaf', 'afs')),
  done_at timestamptz not null default now(),
  done_by uuid not null references auth.users (id),
  note text,
  primary key (client_id, year_end, item)
);

alter table public.year_end_checks enable row level security;
create policy year_end_checks_read on public.year_end_checks for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create trigger audit after insert or update or delete on public.year_end_checks for each row execute function private.audit();

/** Ticks (p_done) or clears a step of the year-end checklist. */
create or replace function public.set_year_end_check(p_client uuid, p_year_end date, p_item text, p_done boolean, p_note text default null) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not (private.is_staff() and private.can_access_client(p_client)) then
    raise exception 'Client not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can tick the year-end checklist' using errcode = '42501';
  end if;
  if p_year_end is null or extract(day from p_year_end + 1) <> 1 then
    raise exception 'Give the last day of the taxable year' using errcode = '22023';
  end if;
  if p_done then
    insert into public.year_end_checks (client_id, year_end, item, done_by, note)
    values (p_client, p_year_end, p_item, auth.uid(), nullif(btrim(coalesce(p_note, '')), ''))
    on conflict (client_id, year_end, item) do update set done_at = now(), done_by = auth.uid(), note = excluded.note;
  else
    delete from public.year_end_checks where client_id = p_client and year_end = p_year_end and item = p_item;
  end if;
end;
$$;

revoke execute on function public.set_year_end_check(uuid, date, text, boolean, text) from public, anon;
grant execute on function public.set_year_end_check(uuid, date, text, boolean, text) to authenticated;

-- ---------------------------------------------------------------------------
-- 3. Missing 2307: the client's decision.
-- ---------------------------------------------------------------------------

alter table public.book_invoices
  add column cwt_claim text check (cwt_claim in ('keep', 'stop')),
  add column cwt_claim_decided_at timestamptz,
  add column cwt_claim_decided_by uuid references auth.users (id);

/** The annual income tax return covering p_date is Filed & paid. */
create or replace function private.annual_itr_filed(p_client uuid, p_date date) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.filing_instances f
    where f.client_id = p_client and f.form in ('1700', '1701', '1701A', '1702-RT', '1702-EX', '1702-MX')
      and p_date between f.period_start and f.period_end and f.status = 'filed'
  )
$$;

/** The client (or the Owner for them) decides whether to keep claiming the CWT of a Sales Invoice whose 2307 never came. */
create or replace function public.decide_missing_2307(p_invoice uuid, p_keep boolean) returns void
language plpgsql security definer set search_path = '' as $$
declare
  inv public.book_invoices;
begin
  select * into inv from public.book_invoices where id = p_invoice;
  if inv.id is null or not (private.is_client_user(inv.client_id) or (private.is_staff() and private.can_access_client(inv.client_id))) then
    raise exception 'Invoice not found' using errcode = 'P0002';
  end if;
  if not (private.is_client_user(inv.client_id) or private.is_owner()) then
    raise exception 'Keeping or stopping the claim is the client''s decision' using errcode = '42501';
  end if;
  if inv.kind <> 'sales' or inv.withholding <= 0 or inv.voided_at is not null or inv.cwt_document_id is not null then
    raise exception 'Only a Sales Invoice with tax withheld and no 2307 waits for this decision' using errcode = '22023';
  end if;
  if private.books_locked_by(inv.client_id, inv.issue_date) is null then
    raise exception 'The month of this invoice is still open' using errcode = '22023';
  end if;
  if private.annual_itr_filed(inv.client_id, inv.issue_date) then
    raise exception 'The annual income tax return of that year is filed; the decision can no longer change' using errcode = '22023';
  end if;
  update public.book_invoices
    set cwt_claim = case when p_keep then 'keep' else 'stop' end, cwt_claim_decided_at = now(), cwt_claim_decided_by = auth.uid()
    where id = p_invoice;
end;
$$;

/**
 * The client's Sales Invoices with CWT and no 2307, in locked months: what the portal asks
 * the client to decide once the taxable year has ended (year_ended). Client users of the
 * client, and the staff who can see it.
 */
create or replace function public.missing_2307s(p_client uuid)
returns table (invoice_id uuid, issue_date date, reference text, party_name text, atc text, withholding numeric, followed_up_at timestamptz,
               claim text, decided_at timestamptz, closed boolean, year_end date, year_ended boolean)
language sql stable security definer set search_path = '' as $$
  select i.id, i.issue_date, i.reference, i.party_name, w.atc, i.withholding, i.cwt_followed_up_at,
         i.cwt_claim, i.cwt_claim_decided_at, private.annual_itr_filed(i.client_id, i.issue_date), ye.d,
         ye.d < (now() at time zone 'Asia/Manila')::date
  from public.book_invoices i
  join public.journal_entries j on j.id = i.journal_entry_id and j.status = 'posted'
  join public.clients c on c.id = i.client_id
  -- The last day of the taxable year the invoice falls in.
  cross join lateral (
    select (make_date(extract(year from i.issue_date)::int + case when extract(month from i.issue_date) > c.fiscal_year_end_month then 1 else 0 end,
                      c.fiscal_year_end_month, 1) + interval '1 month' - interval '1 day')::date as d
  ) ye
  left join public.tax_codes w on w.id = i.withholding_code_id
  where i.client_id = p_client and i.kind = 'sales' and i.withholding > 0 and i.voided_at is null and i.cwt_document_id is null
    and private.books_locked_by(i.client_id, i.issue_date) is not null
    and (private.is_client_user(p_client) or (private.is_staff() and private.can_access_client(p_client)))
  order by i.issue_date, i.reference
$$;

revoke execute on function private.annual_itr_filed(uuid, date) from public, anon, authenticated;
revoke execute on function public.decide_missing_2307(uuid, boolean) from public, anon;
revoke execute on function public.missing_2307s(uuid) from public, anon;
grant execute on function public.decide_missing_2307(uuid, boolean) to authenticated;
grant execute on function public.missing_2307s(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- 4. A year's 2316s are final: released only once the year's months are locked.
-- ---------------------------------------------------------------------------

create or replace function private.release_2316_when_locked() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  open_months text;
begin
  open_months := private.books_open_months(new.client_id, make_date(new.year, 1, 1), make_date(new.year, 12, 31));
  if open_months is not null then
    raise exception 'Lock the Books for % before releasing the % 2316s: they are final only then', open_months, new.year using errcode = '55000';
  end if;
  return new;
end;
$$;

create trigger release_when_locked before insert on public.payroll_2316_releases
  for each row execute function private.release_2316_when_locked();

revoke execute on function private.release_2316_when_locked() from public, anon, authenticated;
