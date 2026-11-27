-- Contacts and their access per business.
--
-- A contact is a person on the client's side who signs in to the portal (one login per
-- email). The firm chooses which businesses each contact sees (a client_users row per
-- business) and, per business, what the contact may do:
--
--   full      approve returns, pay statements, decide on missing 2307s, upload, answer requests
--   uploader  upload documents, answer requests, confirm the month, book a meeting
--   viewer    read only: status, reports, statements
--
-- Every existing contact keeps what they could do before: full.
-- The database enforces the level, so the portal's screens are not the only gate.

alter table public.client_users
  add column access text not null default 'full' check (access in ('full', 'uploader', 'viewer'));

comment on column public.client_users.access is
  'What this contact may do for this business: full (approve and pay), uploader (upload and answer), viewer (read only).';

-- The signed-in contact's level for a business; null for staff and for people not linked to it.
create or replace function private.client_access(target uuid) returns text
language sql stable security definer set search_path = '' as $$
  select cu.access from public.client_users cu where cu.client_id = target and cu.user_id = auth.uid()
$$;

-- Stops a contact from doing what their level for `target` does not allow.
-- need: 'act' (anything that changes data: uploads, replies, confirming the month) or
-- 'approve' (approving or querying a return, paying, deciding on a 2307 claim).
-- `who` is the person acting: the signed-in user, or for service-role work done on a
-- contact's behalf (Telegram uploads, meeting bookings), the contact it is done for.
-- Staff, and service-role work for no one, pass.
create or replace function private.client_guard(target uuid, need text, who uuid default auth.uid()) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  lvl text;
begin
  if who is null or target is null then return; end if;
  if exists (select 1 from public.staff_profiles sp where sp.user_id = who and sp.active) then return; end if;
  select cu.access into lvl from public.client_users cu where cu.client_id = target and cu.user_id = who;
  if lvl is null or lvl = 'full' then return; end if;
  if lvl = 'viewer' then
    raise exception 'Your access to this business is view only. Ask us if you need to upload or approve.' using errcode = '42501';
  end if;
  if need = 'approve' then
    raise exception 'Your access to this business lets you upload and answer requests. Approving returns and paying are for its full-access contacts.' using errcode = '42501';
  end if;
end;
$$;

-- Trigger form: tg_argv[0] is the need; tg_argv[1], when given, names the column that
-- holds the contact a service-role insert is done for.
create or replace function private.client_access_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  row jsonb := to_jsonb(new);
  target uuid;
  who uuid := auth.uid();
begin
  if tg_table_name = 'client_request_messages' then
    select r.client_id into target from public.client_requests r where r.id = new.request_id;
  else
    target := (row ->> 'client_id')::uuid;
  end if;
  if who is null and tg_op = 'INSERT' and tg_nargs > 1 then
    who := (row ->> tg_argv[1])::uuid;
  end if;
  perform private.client_guard(target, tg_argv[0], who);
  return new;
end;
$$;

-- Uploading, replying, confirming the month, linking Telegram, booking a meeting: uploader or full.
create trigger client_access_guard before insert or update on public.documents
  for each row execute function private.client_access_guard('act', 'uploaded_by');
create trigger client_access_guard before update on public.document_cycles
  for each row execute function private.client_access_guard('act');
create trigger client_access_guard before insert on public.cancelled_invoices
  for each row execute function private.client_access_guard('act');
create trigger client_access_guard before insert or update on public.client_requests
  for each row execute function private.client_access_guard('act');
create trigger client_access_guard before insert on public.client_request_messages
  for each row execute function private.client_access_guard('act');
create trigger client_access_guard before insert on public.payroll_submissions
  for each row execute function private.client_access_guard('act');
create trigger client_access_guard before insert on public.telegram_link_codes
  for each row execute function private.client_access_guard('act');
create trigger client_access_guard before insert on public.client_meetings
  for each row execute function private.client_access_guard('act', 'booked_by');

-- Approving or querying a return, paying, and keeping or stopping a 2307 claim: full only.
create trigger client_access_guard before update on public.filing_instances
  for each row execute function private.client_access_guard('approve');
create trigger client_access_guard before insert on public.payment_proofs
  for each row execute function private.client_access_guard('approve');
create trigger client_access_guard before update of cwt_claim on public.book_invoices
  for each row execute function private.client_access_guard('approve');

revoke execute on function private.client_access(uuid) from public, anon;
revoke execute on function private.client_guard(uuid, text, uuid) from public, anon;
grant execute on function private.client_access(uuid) to authenticated;
grant execute on function private.client_guard(uuid, text, uuid) to authenticated;

-- Who is signed in now also says, per business, what the contact may do there.
create or replace function public.current_identity() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'user_id', auth.uid(),
    'staff', (
      select jsonb_build_object('full_name', sp.full_name, 'role', sp.role, 'brand_id', sp.brand_id)
      from public.staff_profiles sp where sp.user_id = auth.uid() and sp.active
    ),
    'clients', coalesce((
      select jsonb_agg(jsonb_build_object('client_id', cu.client_id, 'full_name', cu.full_name, 'client_name', c.name, 'access', cu.access) order by c.name)
      from public.client_users cu join public.clients c on c.id = cu.client_id
      where cu.user_id = auth.uid()
    ), '[]'::jsonb)
  )
$$;
