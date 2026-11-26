-- Local holidays (Owner, 26 November 2026).
--
-- Besides the national non-working days, a city or province declares its own (a charter
-- day, a local fiesta). A BIR deadline that falls on one moves to the next working day for
-- taxpayers registered there. A local holiday names its place and the RDO codes it covers;
-- it moves the due dates only of clients whose RDO is one of them (src/lib/filings/
-- generate.ts). National days stay one per date; a local day is one per date and place.

alter table public.holidays drop constraint holidays_pkey;
alter table public.holidays add column id uuid not null default gen_random_uuid() primary key;
alter table public.holidays add column place text;
alter table public.holidays add column rdo_codes text[] not null default '{}';

alter table public.holidays drop constraint holidays_kind_check;
alter table public.holidays add constraint holidays_kind_check check (kind in ('regular', 'special', 'suspension', 'local'));
alter table public.holidays add constraint holidays_local_place check (
  (kind = 'local') = (nullif(btrim(coalesce(place, '')), '') is not null and cardinality(rdo_codes) > 0)
);

create unique index holidays_one_national on public.holidays (date) where kind <> 'local';
create unique index holidays_one_local on public.holidays (date, lower(place)) where kind = 'local';
