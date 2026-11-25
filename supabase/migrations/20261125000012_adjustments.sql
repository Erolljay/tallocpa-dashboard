-- Adjustments (docs/UX-REVIEW.md, recommendation 2; Owner, 25 November 2026): an
-- adjustment is made only as a journal entry ("Create journal entry" on the Books
-- page), never as a typed figure. It carries its kind, reason and, if any, the
-- supporting document; the reviewer ticks it. Posting one takes away the reviewer
-- sign-off of the month's tie-outs (0-2) and lead (0), and 0-2 cannot be
-- reviewer-signed again until every adjustment of the month is ticked.

-- Kept beside the entry: a posted entry itself never changes (only its reversal).
create table public.adjustments (
  entry_id uuid primary key references public.journal_entries (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  entry_date date not null,
  kind text not null check (kind in ('disallowance', 'reclassification', 'accrual', 'correction', 'other')),
  reason text not null check (btrim(reason) <> ''),
  document_id uuid references public.documents (id) on delete set null,
  ticked_by uuid references auth.users (id),
  ticked_at timestamptz,
  check ((ticked_at is null) = (ticked_by is null))
);
create index adjustments_client_date_idx on public.adjustments (client_id, entry_date);
create trigger audit after insert or update or delete on public.adjustments for each row execute function private.audit();
alter table public.adjustments enable row level security;
create policy adjustments_read on public.adjustments for select to authenticated using (private.is_staff() and private.can_access_client(client_id));

/** Posts an adjustment: a manual journal entry with its kind, reason and supporting document. */
create or replace function public.post_adjustment(p_client uuid, p_date date, p_memo text, p_reference text, p_lines jsonb,
  p_kind text, p_reason text, p_document uuid default null) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  e uuid;
  m date := date_trunc('month', p_date)::date;
begin
  if p_kind is null or p_kind not in ('disallowance', 'reclassification', 'accrual', 'correction', 'other') then
    raise exception 'Choose the kind of adjustment' using errcode = '22023';
  end if;
  if nullif(btrim(coalesce(p_reason, '')), '') is null then raise exception 'Give the reason for the adjustment' using errcode = '22023'; end if;
  if p_document is not null and not exists (select 1 from public.documents where id = p_document and client_id = p_client) then
    raise exception 'That document is not this client''s' using errcode = '22023';
  end if;
  e := public.post_journal_entry(p_client, p_date, p_memo, p_reference, p_lines);
  insert into public.adjustments (entry_id, client_id, entry_date, kind, reason, document_id) values (e, p_client, p_date, p_kind, btrim(p_reason), p_document);
  update public.workpaper_signoffs set reviewed_by = null, reviewed_at = null
  where client_id = p_client and period = m and ref in ('0', '0-2');
  return e;
end;
$$;

/** The reviewer ticks an adjustment as reviewed, or takes the tick back. */
create or replace function public.tick_adjustment(p_entry uuid, p_ticked boolean) returns void
language plpgsql security definer set search_path = '' as $$
declare
  a public.adjustments;
begin
  select * into a from public.adjustments where entry_id = p_entry for update;
  if a.entry_id is null or not private.can_access_client(a.client_id) then raise exception 'Adjustment not found' using errcode = 'P0002'; end if;
  if not private.can_manage_client(a.client_id) then raise exception 'Only the client''s reviewer or the Owner ticks adjustments' using errcode = '42501'; end if;
  update public.adjustments
    set ticked_by = case when p_ticked then auth.uid() end, ticked_at = case when p_ticked then now() end
  where entry_id = p_entry;
  if not p_ticked then
    update public.workpaper_signoffs set reviewed_by = null, reviewed_at = null
    where client_id = a.client_id and period = date_trunc('month', a.entry_date)::date and ref = '0-2';
  end if;
end;
$$;

-- Reviewing 0-2 also needs the month's adjustments ticked.
create or replace function public.sign_workpaper(p_client uuid, p_period date, p_ref text, p_action text) returns public.workpaper_signoffs
language plpgsql security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_period)::date;
  s public.workpaper_signoffs;
begin
  if not (private.is_owner() or private.is_assigned(p_client)) then
    raise exception 'Only staff assigned to this client sign its workpapers' using errcode = '42501';
  end if;
  insert into public.workpaper_signoffs (client_id, period, ref) values (p_client, m, p_ref) on conflict do nothing;
  select * into s from public.workpaper_signoffs where client_id = p_client and period = m and ref = p_ref for update;
  if p_action = 'prepare' then
    update public.workpaper_signoffs set prepared_by = auth.uid(), prepared_at = now()
    where client_id = p_client and period = m and ref = p_ref returning * into s;
  elsif p_action = 'unprepare' then
    if s.reviewed_at is not null then raise exception 'The reviewer has signed it; ask them to take the review back first' using errcode = '22023'; end if;
    update public.workpaper_signoffs set prepared_by = null, prepared_at = null
    where client_id = p_client and period = m and ref = p_ref returning * into s;
  elsif p_action in ('review', 'unreview') then
    if not private.can_manage_client(p_client) then
      raise exception 'Only the client''s reviewer or the Owner signs the review' using errcode = '42501';
    end if;
    if p_action = 'review' then
      if s.prepared_at is null then raise exception 'The preparer has not signed this workpaper yet' using errcode = '22023'; end if;
      if exists (select 1 from public.review_notes where client_id = p_client and period = m and ref = p_ref and cleared_at is null) then
        raise exception 'Clear the open review notes on % first', p_ref using errcode = '22023';
      end if;
      -- Adjustments are reviewed on the tie-outs: each must be ticked first.
      if p_ref = '0-2' and exists (
        select 1 from public.adjustments a join public.journal_entries j on j.id = a.entry_id and j.status = 'posted'
        where a.client_id = p_client and a.entry_date between m and (m + interval '1 month - 1 day')::date and a.ticked_at is null
      ) then
        raise exception 'Tick the month''s adjustments first' using errcode = '22023';
      end if;
      update public.workpaper_signoffs set reviewed_by = auth.uid(), reviewed_at = now()
      where client_id = p_client and period = m and ref = p_ref returning * into s;
    else
      update public.workpaper_signoffs set reviewed_by = null, reviewed_at = null
      where client_id = p_client and period = m and ref = p_ref returning * into s;
    end if;
  else
    raise exception 'Unknown sign-off action %', p_action using errcode = '22023';
  end if;
  return s;
end;
$$;


revoke execute on function public.post_adjustment(uuid, date, text, text, jsonb, text, text, uuid) from public, anon;
revoke execute on function public.tick_adjustment(uuid, boolean) from public, anon;
grant execute on function public.post_adjustment(uuid, date, text, text, jsonb, text, text, uuid) to authenticated;
grant execute on function public.tick_adjustment(uuid, boolean) to authenticated;
