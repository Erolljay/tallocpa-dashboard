-- The acting approver unlocks a month too (Owner, 25 November 2026): while in office,
-- the acting approver may unlock a locked month directly with a reason, as the Owner
-- does, not only decide a reviewer's request. The request is recorded and approved at
-- once in their name; a filed month is still flagged for an amended return.

create or replace function public.request_books_unlock(p_client uuid, p_month date, p_reason text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_month)::date;
  r uuid;
  acting boolean := (private.acting_delegation()).id is not null;
begin
  if not (private.is_staff() and (private.can_access_client(p_client) or acting)) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or acting or private.is_assigned(p_client, 'reviewer')) then
    raise exception 'Only the client''s reviewer, the Owner or the acting approver asks to unlock a month' using errcode = '42501';
  end if;
  if m is null then raise exception 'Choose the month' using errcode = '22023'; end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason for unlocking' using errcode = '22023'; end if;
  if private.books_locked_by(p_client, m) is null then raise exception '% is not locked', to_char(m, 'FMMonth YYYY') using errcode = '22023'; end if;
  if exists (select 1 from public.books_lock_requests where client_id = p_client and month = m and kind = 'unlock' and status = 'requested') then
    raise exception 'An unlock of % is already requested', to_char(m, 'FMMonth YYYY') using errcode = '22023';
  end if;
  insert into public.books_lock_requests (client_id, month, kind, reason) values (p_client, m, 'unlock', btrim(p_reason)) returning id into r;
  -- The Owner and the acting approver in office unlock at once.
  if private.is_owner() or acting then
    update public.books_lock_requests set status = 'approved', decided_by = auth.uid(), decided_at = now() where id = r;
    perform private.books_unlock(r);
  end if;
  return r;
end;
$$;
