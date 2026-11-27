-- Contacts: a mobile number, and finding a contact by email (Owner's request, 27 November 2026).
--
-- The mobile number belongs to the person; it is kept on each of their client_users rows
-- (as full_name is) and the app saves it on all of them together.
--
-- Leads: when a lead's email already belongs to a portal contact (an owner of one client
-- starting another business), the lead page says so; converting the lead can then give
-- that same login access to the new business.

alter table public.client_users
  add column mobile text check (mobile is null or (length(btrim(mobile)) between 7 and 30 and mobile ~ '^[0-9+() -]+$'));

comment on column public.client_users.mobile is 'The contact''s mobile number; the same on every business they are linked to.';

-- Staff: the portal contact with this email, if any, and the businesses of theirs this
-- staff member may see (the Owner sees all). Nothing for anyone else.
create or replace function public.contact_by_email(p_email text)
returns table (user_id uuid, full_name text, mobile text, client_id uuid, client_name text, access text)
language sql stable security definer set search_path = '' as $$
  select cu.user_id, cu.full_name, cu.mobile, cu.client_id, c.name, cu.access
  from auth.users u
  join public.client_users cu on cu.user_id = u.id
  join public.clients c on c.id = cu.client_id
  where private.is_staff()
    and lower(u.email) = lower(btrim(p_email))
    and private.can_access_client(cu.client_id)
  order by c.name
$$;

revoke execute on function public.contact_by_email(text) from public, anon;
grant execute on function public.contact_by_email(text) to authenticated;
