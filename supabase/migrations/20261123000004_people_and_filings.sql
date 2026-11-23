-- People management and filing generation (spec §1.1, §3.3).

-- The Owner looks up whether an email already has a login, so inviting someone
-- who already exists links the existing account instead of failing.
create or replace function public.owner_find_user(p_email text) returns uuid
language plpgsql stable security definer set search_path = '' as $$
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can look up users' using errcode = '42501';
  end if;
  return (select id from auth.users where lower(email) = lower(trim(p_email)) limit 1);
end;
$$;

revoke execute on function public.owner_find_user(text) from public, anon;
grant execute on function public.owner_find_user(text) to authenticated;

-- Staff need to see email addresses of their colleagues and of client users on their
-- clients; auth.users is not exposed, so the app reads them through this view-like function.
create or replace function public.user_emails(p_user_ids uuid[]) returns table (user_id uuid, email text, last_sign_in_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select u.id, u.email::text, u.last_sign_in_at
  from auth.users u
  where u.id = any(p_user_ids)
    and private.is_staff()
    and (
      exists (select 1 from public.staff_profiles sp where sp.user_id = u.id)
      or exists (select 1 from public.client_users cu where cu.user_id = u.id and private.can_access_client(cu.client_id))
    )
$$;

revoke execute on function public.user_emails(uuid[]) from public, anon;
grant execute on function public.user_emails(uuid[]) to authenticated;

-- Filing generation runs with the service role and must never overwrite a filing's progress.
create index if not exists obligations_open_idx on public.obligations (client_id) where end_date is null;
