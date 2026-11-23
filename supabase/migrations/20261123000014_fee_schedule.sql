-- Fee schedule (spec §3.12, Appendix A; Q39, Q48–Q54).
--
-- One price list per brand that quotes (and later proposals, SOAs and the website
-- calculator) read from. The structure comes from src/lib/fees/template.ts; the
-- prices are the Owner's decision (open item O2), so nothing here sets a price.
--
--  - fee_schedules: versions of the price list. A schedule starts as a draft; the
--    Owner activates it once every item that is not quoted on request has a price.
--    Activating retires the brand's previous active schedule. At most one is active
--    per brand. Active and retired schedules never change: the Owner starts a new
--    version (a copy, as a draft) instead.
--  - fee_items: the lines of a schedule. price null = not set yet. Only a draft's
--    items can be added, changed or removed.
--
-- Staff read (quotes); the Owner writes. Existing clients keep their fees until
-- their annual renewal (Q52): nothing here changes an engagement.

create table public.fee_schedules (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands (id),
  name text not null check (length(btrim(name)) between 2 and 120),
  effective_from date not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'retired')),
  -- Q53/Q55: whether prices already include the tax on our fee (3% percentage tax, or 12% VAT).
  prices_include_tax boolean not null default true,
  quote_valid_days smallint not null default 30 check (quote_valid_days between 1 and 365),
  minimum_monthly_retainer numeric(18, 2) check (minimum_monthly_retainer >= 0),
  -- Q54 / Appendix A component J. Null = no surcharge.
  late_surcharge_amount numeric(18, 2) check (late_surcharge_amount >= 0),
  -- false = the Owner approves each surcharge before it goes on the SOA.
  late_surcharge_auto boolean not null default false,
  notes text,
  activated_at timestamptz,
  activated_by uuid references auth.users (id),
  retired_at timestamptz,
  created_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index fee_schedules_one_active on public.fee_schedules (brand_id) where status = 'active';
create index fee_schedules_brand_idx on public.fee_schedules (brand_id, effective_from desc);

create table public.fee_items (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid not null references public.fee_schedules (id) on delete cascade,
  -- Stable key from the template, e.g. 'D.10-29'. Quotes find items by it.
  code text not null check (code ~ '^[A-K]\.[a-z0-9_+-]+$'),
  -- Appendix A components A–J; K = other services, always quoted on request.
  component text not null check (component ~ '^[A-K]$'),
  label text not null,
  band_label text,
  billing text not null check (billing in ('monthly', 'annual', 'one_time', 'per_unit_monthly', 'multiplier')),
  -- Pesos, or the factor for a multiplier. Null = not set yet.
  price numeric(18, 2) check (price >= 0),
  -- Price on request (audit, AUP, systems implementation, 301+ documents …).
  is_custom_quote boolean not null default false,
  unit_label text,
  -- When the item applies (see Conditions in src/lib/fees/types.ts).
  conditions jsonb not null default '{}'::jsonb check (jsonb_typeof(conditions) = 'object'),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (schedule_id, code),
  check (left(code, 1) = component),
  check (not (is_custom_quote and price is not null)),
  check (billing <> 'multiplier' or price is null or price >= 1)
);

create index fee_items_schedule_idx on public.fee_items (schedule_id, sort_order);

-- ---------------------------------------------------------------------------
-- Guards: only drafts change; activation needs every price; one active per brand.
-- ---------------------------------------------------------------------------
create or replace function private.fee_schedules_guard() returns trigger
language plpgsql set search_path = '' as $$
declare
  missing text;
  item_count int;
  current_from date;
begin
  if tg_op = 'INSERT' then
    if new.status <> 'draft' then
      raise exception 'A new fee schedule starts as a draft' using errcode = '22023';
    end if;
    new.activated_at := null;
    new.activated_by := null;
    new.retired_at := null;
    return new;
  end if;

  if tg_op = 'DELETE' then
    if old.status <> 'draft' then
      raise exception 'Only a draft fee schedule can be deleted; this one is %', old.status using errcode = '22023';
    end if;
    return old;
  end if;

  if new.brand_id <> old.brand_id then
    raise exception 'A fee schedule cannot move to another brand' using errcode = '22023';
  end if;

  if old.status = 'retired' then
    raise exception 'A retired fee schedule cannot be changed' using errcode = '22023';
  end if;

  if old.status = 'active' then
    -- The only change allowed: retiring it (done when the next version is activated).
    if new.status <> 'retired'
       or (to_jsonb(new) - 'status' - 'retired_at' - 'updated_at') <> (to_jsonb(old) - 'status' - 'retired_at' - 'updated_at') then
      raise exception 'An active fee schedule cannot be changed. Start a new version instead.' using errcode = '22023';
    end if;
    new.retired_at := now();
    return new;
  end if;

  -- old.status = 'draft'
  if new.status = 'retired' then
    raise exception 'A draft is not retired; delete it instead' using errcode = '22023';
  end if;

  if new.status = 'active' then
    select count(*),
           string_agg(i.label || coalesce(' (' || i.band_label || ')', ''), '; ' order by i.sort_order)
             filter (where i.price is null and not i.is_custom_quote)
      into item_count, missing
      from public.fee_items i where i.schedule_id = new.id;
    if item_count = 0 then
      raise exception 'This fee schedule has no items' using errcode = '22023';
    end if;
    if missing is not null then
      raise exception 'Set a price for every item before activating. Not priced yet: %', missing using errcode = '22023';
    end if;
    select s.effective_from into current_from
      from public.fee_schedules s where s.brand_id = new.brand_id and s.status = 'active' and s.id <> new.id;
    if found and new.effective_from <= current_from then
      raise exception 'The new version must take effect after the current one (%)', current_from using errcode = '22023';
    end if;
    update public.fee_schedules set status = 'retired'
      where brand_id = new.brand_id and status = 'active' and id <> new.id;
    new.activated_at := now();
    new.activated_by := auth.uid();
  end if;
  return new;
end;
$$;

create or replace function private.fee_items_guard() returns trigger
language plpgsql set search_path = '' as $$
declare
  s text;
begin
  if tg_op in ('UPDATE', 'DELETE') then
    select status into s from public.fee_schedules where id = old.schedule_id;
    -- s is null while a draft schedule's delete cascades to its items.
    if s is not null and s <> 'draft' then
      raise exception 'Only a draft fee schedule''s items can be changed; this one is %. Start a new version instead.', s using errcode = '22023';
    end if;
  end if;
  if tg_op in ('INSERT', 'UPDATE') then
    select status into s from public.fee_schedules where id = new.schedule_id;
    if s is distinct from 'draft' then
      raise exception 'Only a draft fee schedule''s items can be changed; this one is %. Start a new version instead.', coalesce(s, 'missing') using errcode = '22023';
    end if;
    return new;
  end if;
  return old;
end;
$$;

create trigger fee_schedules_guard before insert or update or delete on public.fee_schedules
  for each row execute function private.fee_schedules_guard();
create trigger fee_items_guard before insert or update or delete on public.fee_items
  for each row execute function private.fee_items_guard();

create trigger touch_updated_at before update on public.fee_schedules for each row execute function private.touch_updated_at();
create trigger touch_updated_at before update on public.fee_items for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.fee_schedules for each row execute function private.audit();
create trigger audit after insert or update or delete on public.fee_items for each row execute function private.audit();

-- ---------------------------------------------------------------------------
-- Row-level security: staff read, Owner writes.
-- ---------------------------------------------------------------------------
alter table public.fee_schedules enable row level security;
alter table public.fee_items enable row level security;

create policy fee_schedules_read on public.fee_schedules for select to authenticated using (private.is_staff());
create policy fee_schedules_owner on public.fee_schedules for all to authenticated using (private.is_owner()) with check (private.is_owner());
create policy fee_items_read on public.fee_items for select to authenticated using (private.is_staff());
create policy fee_items_owner on public.fee_items for all to authenticated using (private.is_owner()) with check (private.is_owner());

-- ---------------------------------------------------------------------------
-- A new draft with its items in one step: from the template, or a copy of the
-- active schedule ("Start new version"). Runs as the caller, so RLS applies.
-- ---------------------------------------------------------------------------
create or replace function public.create_fee_schedule_draft(p_schedule jsonb, p_items jsonb)
returns uuid
language plpgsql set search_path = '' as $$
declare
  sid uuid;
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can change the fee schedule' using errcode = '42501';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'A fee schedule needs at least one item' using errcode = '22023';
  end if;
  insert into public.fee_schedules (
    brand_id, name, effective_from, prices_include_tax, quote_valid_days,
    minimum_monthly_retainer, late_surcharge_amount, late_surcharge_auto, notes
  ) values (
    (p_schedule ->> 'brand_id')::uuid,
    p_schedule ->> 'name',
    (p_schedule ->> 'effective_from')::date,
    coalesce((p_schedule ->> 'prices_include_tax')::boolean, true),
    coalesce((p_schedule ->> 'quote_valid_days')::smallint, 30),
    (p_schedule ->> 'minimum_monthly_retainer')::numeric,
    (p_schedule ->> 'late_surcharge_amount')::numeric,
    coalesce((p_schedule ->> 'late_surcharge_auto')::boolean, false),
    p_schedule ->> 'notes'
  ) returning id into sid;

  insert into public.fee_items (schedule_id, code, component, label, band_label, billing, price, is_custom_quote, unit_label, conditions, sort_order)
  select sid, i ->> 'code', i ->> 'component', i ->> 'label', i ->> 'band_label', i ->> 'billing',
         (i ->> 'price')::numeric, coalesce((i ->> 'is_custom_quote')::boolean, false), i ->> 'unit_label',
         coalesce(i -> 'conditions', '{}'::jsonb), coalesce((i ->> 'sort_order')::int, n::int * 10)
  from jsonb_array_elements(p_items) with ordinality as t (i, n);
  return sid;
end;
$$;

-- ---------------------------------------------------------------------------
-- Documents per client per month, for the volume band of the gap report (Q49).
-- Counts what clients submit (sales, purchases, 2307s, other), by the month the
-- document is for. Runs as the caller: the Owner sees every client.
-- ---------------------------------------------------------------------------
create or replace function public.client_document_volume(p_from date, p_to date)
returns table (client_id uuid, month date, documents int)
language sql stable set search_path = '' as $$
  select d.client_id, d.document_month, count(*)::int
  from public.documents d
  where d.document_month between date_trunc('month', p_from)::date and date_trunc('month', p_to)::date
    and private.is_submission(d.doc_type)
    and d.status <> 'uploading'
  group by d.client_id, d.document_month
$$;

revoke execute on function private.fee_schedules_guard() from public, anon, authenticated;
revoke execute on function private.fee_items_guard() from public, anon, authenticated;
revoke execute on function public.create_fee_schedule_draft(jsonb, jsonb) from public, anon;
revoke execute on function public.client_document_volume(date, date) from public, anon;
grant execute on function public.create_fee_schedule_draft(jsonb, jsonb) to authenticated;
grant execute on function public.client_document_volume(date, date) to authenticated;
