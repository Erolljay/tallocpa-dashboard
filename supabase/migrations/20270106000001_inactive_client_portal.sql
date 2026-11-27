-- Client portal for clients we no longer serve.
--
-- When the firm marks a client inactive or archived, that client's contacts keep the
-- portal for two months, view only, so they can download their returns, reports and
-- files. After two months they lose access to that business altogether. Reactivating
-- the client gives them back the access level they had before (client_users.access is
-- left untouched).
--
--   current (onboarding, active)          the contact's own level (full, uploader, viewer)
--   inactive or archived, < 2 months      view only, whatever their level
--   inactive or archived, >= 2 months     no access
--
-- Staff are not affected.

alter table public.clients add column inactive_since timestamptz;

comment on column public.clients.inactive_since is
  'When the client was last marked inactive or archived; null while onboarding or active. Contacts keep view-only portal access for two months from this time.';

-- Clients already inactive or archived get their two months from today.
update public.clients set inactive_since = now() where status in ('inactive', 'archived');

-- Keeps inactive_since in step with status. Moving between inactive and archived keeps
-- the original date, so archiving does not restart the two months.
create or replace function private.track_inactive_since() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.status in ('onboarding', 'active') then
    new.inactive_since := null;
  elsif new.inactive_since is null then
    new.inactive_since := now();
  end if;
  return new;
end;
$$;

create trigger track_inactive_since before insert or update of status on public.clients
  for each row execute function private.track_inactive_since();

-- The last day (Manila) a contact can still see a business that is not current: two
-- months after it was marked inactive, less a day. Null while the business is current.
create or replace function private.client_access_ends_on(c public.clients) returns date
language sql stable set search_path = '' as $$
  select case when c.status in ('onboarding', 'active') or c.inactive_since is null then null
    else ((c.inactive_since at time zone 'Asia/Manila')::date + interval '2 months')::date - 1 end
$$;

-- The portal state of a business for its contacts: 'open', 'closing' (view only through
-- its last day) or 'closed'.
create or replace function private.client_portal_state(target uuid) returns text
language sql stable security definer set search_path = '' as $$
  select case
    when c.status in ('onboarding', 'active') then 'open'
    when (now() at time zone 'Asia/Manila')::date <= private.client_access_ends_on(c) then 'closing'
    else 'closed'
  end
  from public.clients c where c.id = target
$$;

-- Contacts of a closed business no longer reach its rows (or its files: the storage
-- policies use these too).
create or replace function private.can_access_client(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_owner()
    or exists (
      select 1 from public.staff_assignments sa
      join public.staff_profiles sp on sp.user_id = sa.user_id and sp.active
      where sa.client_id = target and sa.user_id = auth.uid()
    )
    or (
      exists (select 1 from public.client_users cu where cu.client_id = target and cu.user_id = auth.uid())
      and private.client_portal_state(target) <> 'closed'
    )
$$;

create or replace function private.is_client_user(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.client_users cu where cu.client_id = target and cu.user_id = auth.uid())
    and private.client_portal_state(target) <> 'closed'
$$;

-- The signed-in contact's effective level: view only once the business is not current.
create or replace function private.client_access(target uuid) returns text
language sql stable security definer set search_path = '' as $$
  select case when private.client_portal_state(target) = 'open' then cu.access else 'viewer' end
  from public.client_users cu where cu.client_id = target and cu.user_id = auth.uid()
$$;

-- As before (20270102000001_contact_access.sql), plus: a contact of a business that is
-- not current may only read, and one whose two months have passed may do nothing.
create or replace function private.client_guard(target uuid, need text, who uuid default auth.uid()) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  lvl text;
  state text;
begin
  if who is null or target is null then return; end if;
  if exists (select 1 from public.staff_profiles sp where sp.user_id = who and sp.active) then return; end if;
  select cu.access into lvl from public.client_users cu where cu.client_id = target and cu.user_id = who;
  if lvl is null and who is distinct from auth.uid() then
    raise exception 'This person no longer has access to this business.' using errcode = '42501';
  end if;
  if lvl is null then return; end if;
  state := private.client_portal_state(target);
  if state = 'closed' then
    raise exception 'Your access to this business has ended.' using errcode = '42501';
  end if;
  if state = 'closing' then
    raise exception 'We no longer handle this business. Your access is view only so you can download your files.' using errcode = '42501';
  end if;
  if lvl = 'full' then return; end if;
  if lvl = 'viewer' then
    raise exception 'Your access to this business is view only. Ask us if you need to upload or approve.' using errcode = '42501';
  end if;
  if need = 'approve' then
    raise exception 'Your access to this business lets you upload and answer requests. Approving returns and paying are for its full-access contacts.' using errcode = '42501';
  end if;
end;
$$;

-- Who is signed in: closed businesses are left out; a closing one shows as view only,
-- with the last day of access.
create or replace function public.current_identity() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'user_id', auth.uid(),
    'staff', (
      select jsonb_build_object('full_name', sp.full_name, 'role', sp.role, 'brand_id', sp.brand_id)
      from public.staff_profiles sp where sp.user_id = auth.uid() and sp.active
    ),
    'clients', coalesce((
      select jsonb_agg(jsonb_build_object(
        'client_id', cu.client_id,
        'full_name', cu.full_name,
        'client_name', c.name,
        'access', case when c.status in ('onboarding', 'active') then cu.access else 'viewer' end,
        'access_ends_on', private.client_access_ends_on(c)
      ) order by c.name)
      from public.client_users cu join public.clients c on c.id = cu.client_id
      where cu.user_id = auth.uid() and private.client_portal_state(c.id) <> 'closed'
    ), '[]'::jsonb)
  )
$$;

revoke execute on function private.client_portal_state(uuid) from public, anon;
grant execute on function private.client_portal_state(uuid) to authenticated;
revoke execute on function private.track_inactive_since() from public, anon;
revoke execute on function private.client_access_ends_on(public.clients) from public, anon;
grant execute on function private.client_access_ends_on(public.clients) to authenticated;
