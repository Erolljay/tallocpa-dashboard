-- Firm-wide parties directory (spec §3.5, §3.7, §3.14).
--
-- Every customer and supplier the firm's clients deal with, keyed by TIN and
-- branch code, so the BIR registered name (company name, or last / first /
-- middle for individuals), address and taxpayer kind are entered once and
-- reused across all clients: in OCR review, and in the BIR attachments (SLS/SLP,
-- QAP, SAWT, 2307) that need the exact registered name. Mirrors the party BIR
-- fields of the Owner's Manager.io extension (taxify: type, TIN, branch code,
-- company name, last / first / middle name, address, ZIP).
--
-- Parties are firm reference data: every staff member reads them and can add or
-- correct an unverified one. A party "verified" by the Owner or a reviewer
-- (checked against a COR or a 2307) changes only by the Owner. Client portal
-- users see none of it.
--
-- client_parties says which clients deal with which party ("this client's
-- customers / suppliers"). Approving a document's figures records the party
-- and the link automatically (trigger on extractions below).

create table public.parties (
  id uuid primary key default gen_random_uuid(),
  -- 9 digits, stored dashed: 123-456-789.
  tin text not null check (tin ~ '^\d{3}-\d{3}-\d{3}$' and tin <> '000-000-000'),
  -- Stored as 5 digits ("00000" = head office). BIR shows 3 (COR) to 5 digits; DAT files take the last 4.
  branch_code text not null default '00000' check (branch_code ~ '^\d{5}$'),
  kind text not null default 'non_individual' check (kind in ('individual', 'non_individual')),
  -- Non-individuals: the registered (corporate) name. Individuals: last / first / middle name.
  registered_name text,
  last_name text,
  first_name text,
  middle_name text,
  trade_name text,
  registered_address text,
  zip_code text check (zip_code ~ '^\d{4}$'),
  vat_status text not null default 'unknown' check (vat_status in ('vat', 'non_vat', 'unknown')),
  source text not null default 'manual' check (source in ('manual', 'ocr', 'cor')),
  -- A staff member confirmed the details against a COR or 2307.
  verified_at timestamptz,
  verified_by uuid references auth.users (id),
  notes text,
  -- How lists show and sort the party; the name the BIR attachments use (taxify partyNameCols).
  display_name text generated always as (
    case when kind = 'individual'
      then last_name || ', ' || first_name || coalesce(' ' || middle_name, '')
      else registered_name end
  ) stored,
  created_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tin, branch_code),
  constraint parties_name_matches_kind check (
    case when kind = 'individual'
      then coalesce(btrim(last_name), '') <> '' and coalesce(btrim(first_name), '') <> '' and registered_name is null
      else coalesce(btrim(registered_name), '') <> '' and last_name is null and first_name is null and middle_name is null
    end
  ),
  constraint parties_verified_by check (verified_at is not null or verified_by is null)
);

create index parties_display_name_idx on public.parties (lower(display_name));

create table public.client_parties (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  party_id uuid not null references public.parties (id) on delete cascade,
  role text not null check (role in ('customer', 'supplier', 'both')),
  first_seen date not null,
  last_seen date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, party_id),
  check (first_seen <= last_seen)
);

create index client_parties_client_idx on public.client_parties (client_id, last_seen desc);
create index client_parties_party_idx on public.client_parties (party_id);

-- Tidies what is typed: TIN dashed, branch padded to 5 digits, blank names to null;
-- stamps who verified (the database decides, not the form).
create or replace function private.parties_before_write() returns trigger
language plpgsql set search_path = '' as $$
declare
  d text := regexp_replace(coalesce(new.tin, ''), '\D', '', 'g');
  b text := regexp_replace(coalesce(new.branch_code, ''), '\D', '', 'g');
begin
  if length(d) = 9 then new.tin := substr(d, 1, 3) || '-' || substr(d, 4, 3) || '-' || substr(d, 7, 3); end if;
  if b = '' then new.branch_code := '00000';
  elsif length(b) <= 5 then new.branch_code := lpad(b, 5, '0');
  end if;
  new.registered_name := nullif(btrim(new.registered_name), '');
  new.last_name := nullif(btrim(new.last_name), '');
  new.first_name := nullif(btrim(new.first_name), '');
  new.middle_name := nullif(btrim(new.middle_name), '');
  new.trade_name := nullif(btrim(new.trade_name), '');
  new.registered_address := nullif(btrim(new.registered_address), '');
  new.zip_code := nullif(btrim(new.zip_code), '');
  new.notes := nullif(btrim(new.notes), '');

  if tg_op = 'INSERT' then
    if new.verified_at is not null then new.verified_at := now(); new.verified_by := auth.uid(); end if;
  elsif new.verified_at is null then
    new.verified_by := null;
  elsif old.verified_at is null then
    new.verified_at := now();
    new.verified_by := auth.uid();
  else
    new.verified_at := old.verified_at;
    new.verified_by := old.verified_by;
  end if;
  return new;
end;
$$;

create trigger parties_before_write before insert or update on public.parties for each row execute function private.parties_before_write();
create trigger touch_updated_at before update on public.parties for each row execute function private.touch_updated_at();
create trigger touch_updated_at before update on public.client_parties for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.parties for each row execute function private.audit();
create trigger audit after insert or update or delete on public.client_parties for each row execute function private.audit();

-- Who may mark a party verified: the Owner or a reviewer.
create or replace function private.can_verify_parties() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce(private.staff_role() in ('owner', 'reviewer'), false)
$$;

alter table public.parties enable row level security;
alter table public.client_parties enable row level security;

create policy parties_read on public.parties for select to authenticated using (private.is_staff());
create policy parties_insert on public.parties for insert to authenticated
  with check (private.is_staff() and (verified_at is null or private.can_verify_parties()));
-- Unverified parties: any staff member. Verified: only the Owner.
create policy parties_update on public.parties for update to authenticated
  using (private.is_staff() and (verified_at is null or private.is_owner()))
  with check (private.is_staff() and (verified_at is null or private.can_verify_parties()));
create policy parties_delete on public.parties for delete to authenticated using (private.is_owner());

create policy client_parties_read on public.client_parties for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy client_parties_insert on public.client_parties for insert to authenticated
  with check (private.is_staff() and private.can_access_client(client_id));
create policy client_parties_update on public.client_parties for update to authenticated
  using (private.is_staff() and private.can_access_client(client_id))
  with check (private.is_staff() and private.can_access_client(client_id));
create policy client_parties_delete on public.client_parties for delete to authenticated using (private.can_manage_client(client_id));

-- ---------------------------------------------------------------------------
-- Recording parties from approved documents.
-- ---------------------------------------------------------------------------

/**
 * Records the party on an approved document and links it to the client.
 * Sales invoices and 2307s received name a customer; purchase receipts and 2307s
 * issued name a supplier; CORs (the client's own) and other documents are skipped.
 * A new TIN becomes an unverified non-individual party (source 'ocr'); an
 * unverified party OCR created takes the latest approved name and address; a
 * party typed by staff only has blanks filled; a verified party is never changed.
 * An invalid or missing TIN is skipped, never blocking the approval.
 */
create or replace function private.record_party_from_approval(p_document uuid, p_fields jsonb, p_approved_at timestamptz, p_actor uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  digits text := regexp_replace(coalesce(p_fields ->> 'party_tin', ''), '\D', '', 'g');
  v_name text := nullif(btrim(p_fields ->> 'party_name'), '');
  v_addr text := nullif(btrim(p_fields ->> 'party_address'), '');
  v_tin text;
  v_branch text;
  v_role text;
  v_seen date;
  d record;
  p public.parties;
begin
  if length(digits) < 9 or length(digits) > 14 or substr(digits, 1, 9) = '000000000' then return; end if;
  v_tin := substr(digits, 1, 3) || '-' || substr(digits, 4, 3) || '-' || substr(digits, 7, 3);
  v_branch := case when length(digits) > 9 then lpad(substr(digits, 10), 5, '0') else '00000' end;

  select id, client_id, doc_type into d from public.documents where id = p_document;
  if d.id is null then return; end if;
  v_role := case d.doc_type
    when 'sales_invoice' then 'customer'
    when 'bir_2307_received' then 'customer'
    when 'purchase_receipt' then 'supplier'
    when 'bir_2307_issued' then 'supplier'
    when 'other' then case p_fields ->> 'doc_type' when 'sales_invoice' then 'customer' when 'purchase_receipt' then 'supplier' end
  end;
  if v_role is null then return; end if;

  v_seen := case when coalesce(p_fields ->> 'date', '') ~ '^\d{4}-\d{2}-\d{2}$' then (p_fields ->> 'date')::date
                 else (coalesce(p_approved_at, now()) at time zone 'Asia/Manila')::date end;

  select * into p from public.parties where tin = v_tin and branch_code = v_branch for update;
  if p.id is null then
    if v_name is null then return; end if;
    insert into public.parties (tin, branch_code, kind, registered_name, registered_address, source, created_by)
    values (v_tin, v_branch, 'non_individual', v_name, v_addr, 'ocr', p_actor)
    returning * into p;
  elsif p.verified_at is null then
    update public.parties set
      registered_name = case when kind = 'non_individual' and v_name is not null and (source = 'ocr' or registered_name is null) then v_name else registered_name end,
      registered_address = case when v_addr is not null and (source = 'ocr' or registered_address is null) then v_addr else registered_address end
    where id = p.id
      and ((kind = 'non_individual' and v_name is not null and (source = 'ocr' or registered_name is null) and registered_name is distinct from v_name)
        or (v_addr is not null and (source = 'ocr' or registered_address is null) and registered_address is distinct from v_addr));
  end if;

  insert into public.client_parties (client_id, party_id, role, first_seen, last_seen)
  values (d.client_id, p.id, v_role, v_seen, v_seen)
  on conflict (client_id, party_id) do update set
    role = case when public.client_parties.role = excluded.role then public.client_parties.role else 'both' end,
    first_seen = least(public.client_parties.first_seen, excluded.first_seen),
    last_seen = greatest(public.client_parties.last_seen, excluded.last_seen)
  where public.client_parties.role is distinct from (case when public.client_parties.role = excluded.role then public.client_parties.role else 'both' end)
     or public.client_parties.first_seen > excluded.first_seen
     or public.client_parties.last_seen < excluded.last_seen;
end;
$$;

create or replace function private.record_party_on_approval() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  perform private.record_party_from_approval(new.document_id, new.approved_fields, new.approved_at, new.approved_by);
  return null;
end;
$$;

-- approve_document() writes approved_fields; this picks the party up without changing that function.
create trigger record_party after insert or update of approved_fields on public.extractions
  for each row when (new.approved_fields is not null) execute function private.record_party_on_approval();

/**
 * The Owner merges two records of the same party: the client links move to the
 * one kept (roles and dates combined), blanks on it are filled from the other,
 * and the other is deleted. A verified record is always the one kept.
 */
create or replace function public.merge_parties(p_keep uuid, p_drop uuid) returns public.parties
language plpgsql security definer set search_path = '' as $$
declare
  k public.parties;
  x public.parties;
  t public.parties;
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can merge parties' using errcode = '42501';
  end if;
  if p_keep = p_drop then
    raise exception 'Pick two different parties' using errcode = '22023';
  end if;
  select * into k from public.parties where id = p_keep for update;
  select * into x from public.parties where id = p_drop for update;
  if k.id is null or x.id is null then
    raise exception 'Party not found' using errcode = 'P0002';
  end if;
  if x.verified_at is not null and k.verified_at is null then
    t := k; k := x; x := t;
  end if;

  insert into public.client_parties (client_id, party_id, role, first_seen, last_seen)
  select client_id, k.id, role, first_seen, last_seen from public.client_parties where party_id = x.id
  on conflict (client_id, party_id) do update set
    role = case when public.client_parties.role = excluded.role then public.client_parties.role else 'both' end,
    first_seen = least(public.client_parties.first_seen, excluded.first_seen),
    last_seen = greatest(public.client_parties.last_seen, excluded.last_seen);
  delete from public.client_parties where party_id = x.id;
  delete from public.parties where id = x.id;

  update public.parties set
    trade_name = coalesce(trade_name, x.trade_name),
    registered_address = coalesce(registered_address, x.registered_address),
    zip_code = coalesce(zip_code, x.zip_code),
    vat_status = case when vat_status = 'unknown' then x.vat_status else vat_status end,
    notes = concat_ws(E'\n', notes, 'Merged from ' || x.tin || '-' || x.branch_code || ' (' || x.display_name || ')' || coalesce(': ' || x.notes, ''))
  where id = k.id
  returning * into k;
  return k;
end;
$$;

revoke execute on function private.parties_before_write() from public, anon, authenticated;
revoke execute on function private.record_party_from_approval(uuid, jsonb, timestamptz, uuid) from public, anon, authenticated;
revoke execute on function private.record_party_on_approval() from public, anon, authenticated;
revoke execute on function private.can_verify_parties() from public, anon;
grant execute on function private.can_verify_parties() to authenticated;
revoke execute on function public.merge_parties(uuid, uuid) from public, anon;
grant execute on function public.merge_parties(uuid, uuid) to authenticated;

-- Backfill from documents approved before this migration, oldest first.
do $$
declare r record;
begin
  for r in
    select document_id, approved_fields, approved_at, approved_by from public.extractions
    where approved_fields is not null order by approved_at nulls first, document_id
  loop
    perform private.record_party_from_approval(r.document_id, r.approved_fields, r.approved_at, r.approved_by);
  end loop;
end;
$$;
