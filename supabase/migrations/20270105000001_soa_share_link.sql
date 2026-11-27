-- ---------------------------------------------------------------------------
-- A statement's share link: the Owner copies it into Viber, Messenger, SMS or
-- email so the client can see what is due and how to pay without signing in.
--
--   soas.share_token   64 hex characters, made on first ask. Anyone with the
--                      link sees that one statement and the firm's payment
--                      channels (read by the server with the secret key).
--   soa_share_token()  Owner only; p_renew makes a new link and the old one
--                      stops working.
-- ---------------------------------------------------------------------------

alter table public.soas add column share_token text unique check (share_token ~ '^[0-9a-f]{64}$');

create or replace function public.soa_share_token(p_soa uuid, p_renew boolean default false) returns text
language plpgsql security definer set search_path = '' as $$
declare
  t text;
begin
  if not private.is_owner() then
    raise exception 'Only the Owner shares statements' using errcode = '42501';
  end if;
  select share_token into t from public.soas where id = p_soa for update;
  if not found then
    raise exception 'Statement not found' using errcode = 'P0002';
  end if;
  if t is null or p_renew then
    update public.soas set share_token = replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '') where id = p_soa returning share_token into t;
  end if;
  return t;
end;
$$;

revoke execute on function public.soa_share_token(uuid, boolean) from public, anon;
grant execute on function public.soa_share_token(uuid, boolean) to authenticated;
