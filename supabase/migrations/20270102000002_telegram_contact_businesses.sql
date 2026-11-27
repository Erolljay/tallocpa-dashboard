-- Telegram for contacts with several businesses (Owner's request, 27 November 2026).
--
-- A contact linked to more than one business chooses the business in the bot the way
-- staff choose a client: /client, then a button. They see only their own businesses
-- where Telegram is switched on and their access is not view only. Each file still goes
-- in the month open for documents for that business (staff alone choose the month).

-- May this person file a Telegram upload for this business? Staff: the Owner, or staff
-- assigned to it. A contact: a business they are linked to with upload or full access,
-- with Telegram switched on.
create or replace function private.telegram_can_file(p_user uuid, p_client uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.staff_profiles sp
    where sp.user_id = p_user and sp.active
      and (sp.role = 'owner' or exists (select 1 from public.staff_assignments sa where sa.user_id = p_user and sa.client_id = p_client))
  ) or exists (
    select 1 from public.clients c join public.client_users cu on cu.client_id = c.id
    where c.id = p_client and c.telegram_enabled and cu.user_id = p_user and cu.access <> 'viewer'
  )
$$;

-- Bot (service role): the businesses a linked chat may send for, matching a name or code.
-- Staff chats: their clients. Contact chats: their own businesses (see above).
create or replace function public.telegram_staff_clients(p_chat bigint, p_query text)
returns table (id uuid, code text, name text)
language sql stable security definer set search_path = '' as $$
  select c.id, c.code, c.name
  from public.telegram_links l
  join public.clients c on private.telegram_can_file(l.user_id, c.id)
  where l.chat_id = p_chat and c.status <> 'archived'
    and (coalesce(trim(p_query), '') = '' or c.name ilike '%' || trim(p_query) || '%' or c.code ilike '%' || trim(p_query) || '%')
  order by c.name
  limit 8
$$;

-- Bot (service role): a chat chooses the business its next files are for. Returns its name.
create or replace function public.telegram_set_client(p_chat bigint, p_client uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare
  l public.telegram_links;
  name text;
begin
  select * into l from public.telegram_links where chat_id = p_chat for update;
  if l.chat_id is null then raise exception 'This chat is not linked' using errcode = '42501'; end if;
  if not private.telegram_can_file(l.user_id, p_client) then
    raise exception 'You cannot send documents for this %', case when l.staff then 'client' else 'business' end using errcode = '42501';
  end if;
  update public.telegram_links set client_id = p_client where chat_id = p_chat;
  select c.name into name from public.clients c where c.id = p_client;
  return name;
end;
$$;

revoke execute on function private.telegram_can_file(uuid, uuid) from public, anon, authenticated;
revoke execute on function public.telegram_staff_clients(bigint, text) from public, anon, authenticated;
revoke execute on function public.telegram_set_client(bigint, uuid) from public, anon, authenticated;
grant execute on function public.telegram_staff_clients(bigint, text) to service_role;
grant execute on function public.telegram_set_client(bigint, uuid) to service_role;
