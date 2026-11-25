-- W2: sign-off per workpaper and review notes (docs/UX-REVIEW.md, recommendations 1
-- and 4; Owner's decision 8).
--
--  - Each workpaper of a period file (client × month) is signed by its preparer, then
--    by the reviewer. The reviewer always signs 10 sales, 20 purchases and 0-2 tie-outs,
--    the others when they have activity (src/lib/workpapers/review.ts decides which).
--  - Review notes (workpaper 0-1) are raised on a workpaper, answered by the preparer
--    and cleared by the reviewer. A workpaper cannot be reviewer-signed while it has an
--    open note, and a new note takes away its reviewer sign-off.
--  - The preparer is anyone assigned to the client (or the Owner); the reviewer is the
--    client's reviewer or the Owner.

create table public.workpaper_signoffs (
  client_id uuid not null references public.clients (id) on delete cascade,
  period date not null check (extract(day from period) = 1),
  ref text not null check (ref in ('0', '0-2', '10', '20', '30', 'B-2', 'BB-2', 'E')),
  prepared_by uuid references auth.users (id),
  prepared_at timestamptz,
  reviewed_by uuid references auth.users (id),
  reviewed_at timestamptz,
  primary key (client_id, period, ref),
  check ((prepared_at is null) = (prepared_by is null)),
  check ((reviewed_at is null) = (reviewed_by is null)),
  check (reviewed_at is null or prepared_at is not null)
);
create trigger audit after insert or update or delete on public.workpaper_signoffs for each row execute function private.audit();
alter table public.workpaper_signoffs enable row level security;
create policy workpaper_signoffs_read on public.workpaper_signoffs for select to authenticated using (private.is_staff() and private.can_access_client(client_id));

create table public.review_notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  period date not null check (extract(day from period) = 1),
  ref text not null check (ref in ('0', '0-2', '10', '20', '30', 'B-2', 'BB-2', 'E')),
  note text not null check (btrim(note) <> ''),
  raised_by uuid references auth.users (id) default auth.uid(),
  raised_at timestamptz not null default now(),
  response text,
  responded_by uuid references auth.users (id),
  responded_at timestamptz,
  cleared_by uuid references auth.users (id),
  cleared_at timestamptz
);
create index review_notes_open_idx on public.review_notes (client_id, period) where cleared_at is null;
create trigger audit after insert or update or delete on public.review_notes for each row execute function private.audit();
alter table public.review_notes enable row level security;
create policy review_notes_read on public.review_notes for select to authenticated using (private.is_staff() and private.can_access_client(client_id));

/** Signs a workpaper as prepared ('prepare') or reviewed ('review'), or takes a signature back ('unprepare', 'unreview'). */
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

/** The reviewer raises a note on a workpaper; its reviewer sign-off goes. */
create or replace function public.raise_review_note(p_client uuid, p_period date, p_ref text, p_note text) returns public.review_notes
language plpgsql security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_period)::date;
  n public.review_notes;
begin
  if not (private.is_owner() or private.is_assigned(p_client)) then
    raise exception 'Only staff assigned to this client write its review notes' using errcode = '42501';
  end if;
  if nullif(btrim(coalesce(p_note, '')), '') is null then raise exception 'Write the note' using errcode = '22023'; end if;
  insert into public.review_notes (client_id, period, ref, note) values (p_client, m, p_ref, btrim(p_note)) returning * into n;
  update public.workpaper_signoffs set reviewed_by = null, reviewed_at = null where client_id = p_client and period = m and ref = p_ref;
  return n;
end;
$$;

/** The preparer answers a note ('respond'); the reviewer or the Owner clears it ('clear') or reopens it ('reopen'). */
create or replace function public.act_on_review_note(p_note uuid, p_action text, p_text text default null) returns public.review_notes
language plpgsql security definer set search_path = '' as $$
declare
  n public.review_notes;
begin
  select * into n from public.review_notes where id = p_note for update;
  if n.id is null or not private.can_access_client(n.client_id) then raise exception 'Note not found' using errcode = 'P0002'; end if;
  if p_action = 'respond' then
    if not (private.is_owner() or private.is_assigned(n.client_id)) then raise exception 'Only staff assigned to this client answer its notes' using errcode = '42501'; end if;
    if nullif(btrim(coalesce(p_text, '')), '') is null then raise exception 'Write the answer' using errcode = '22023'; end if;
    update public.review_notes set response = btrim(p_text), responded_by = auth.uid(), responded_at = now() where id = n.id returning * into n;
  elsif p_action in ('clear', 'reopen') then
    if not private.can_manage_client(n.client_id) then raise exception 'Only the client''s reviewer or the Owner clears review notes' using errcode = '42501'; end if;
    if p_action = 'clear' then
      update public.review_notes set cleared_by = auth.uid(), cleared_at = now() where id = n.id returning * into n;
    else
      update public.review_notes set cleared_by = null, cleared_at = null where id = n.id returning * into n;
      update public.workpaper_signoffs set reviewed_by = null, reviewed_at = null where client_id = n.client_id and period = n.period and ref = n.ref;
    end if;
  else
    raise exception 'Unknown action %', p_action using errcode = '22023';
  end if;
  return n;
end;
$$;

revoke execute on function public.sign_workpaper(uuid, date, text, text) from public, anon;
revoke execute on function public.raise_review_note(uuid, date, text, text) from public, anon;
revoke execute on function public.act_on_review_note(uuid, text, text) from public, anon;
grant execute on function public.sign_workpaper(uuid, date, text, text) to authenticated;
grant execute on function public.raise_review_note(uuid, date, text, text) to authenticated;
grant execute on function public.act_on_review_note(uuid, text, text) to authenticated;
