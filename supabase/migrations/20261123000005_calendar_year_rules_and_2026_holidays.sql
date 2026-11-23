-- Withholding returns follow the calendar year, and 2026 holidays (spec §3.3).

-- A rule can say its form follows the calendar year whatever the client's taxable
-- year: 0619-E, 1601-C, 1601-EQ, 1604-C and 1604-E are calendar-based even for a
-- fiscal-year client. Income tax and business tax returns keep the taxable year.
alter table public.deadline_rules
  add column calendar_year boolean not null default false;

comment on column public.deadline_rules.calendar_year is
  'True when the form''s periods follow the calendar year regardless of the client''s taxable year.';

update public.deadline_rules set calendar_year = true
where id in (
  '0619E-ebir', '1601C-ebir',
  '0619E-efps-A', '1601C-efps-A', '0619E-efps-B', '1601C-efps-B', '0619E-efps-C', '1601C-efps-C',
  '0619E-efps-D', '1601C-efps-D', '0619E-efps-E', '1601C-efps-E',
  '1601EQ', '1604C', '1604E'
);

-- 2026 non-working days (Proclamation No. 1006, s. 2025). ⚠️ UNVERIFIED starting
-- figures, same as the 2027 list: check against the proclamation. Eid'l Fitr and
-- Eid'l Adha are proclaimed separately and are added as they are declared.
insert into public.holidays (date, name, kind, source) values
  ('2026-01-01', 'New Year''s Day', 'regular', 'UNVERIFIED'),
  ('2026-02-17', 'Chinese New Year', 'special', 'UNVERIFIED'),
  ('2026-04-02', 'Maundy Thursday', 'regular', 'UNVERIFIED'),
  ('2026-04-03', 'Good Friday', 'regular', 'UNVERIFIED'),
  ('2026-04-04', 'Black Saturday', 'special', 'UNVERIFIED'),
  ('2026-04-09', 'Araw ng Kagitingan', 'regular', 'UNVERIFIED'),
  ('2026-05-01', 'Labor Day', 'regular', 'UNVERIFIED'),
  ('2026-06-12', 'Independence Day', 'regular', 'UNVERIFIED'),
  ('2026-08-21', 'Ninoy Aquino Day', 'special', 'UNVERIFIED'),
  ('2026-08-31', 'National Heroes Day', 'regular', 'UNVERIFIED'),
  ('2026-11-01', 'All Saints'' Day', 'special', 'UNVERIFIED'),
  ('2026-11-02', 'All Souls'' Day', 'special', 'UNVERIFIED'),
  ('2026-11-30', 'Bonifacio Day', 'regular', 'UNVERIFIED'),
  ('2026-12-08', 'Feast of the Immaculate Conception', 'special', 'UNVERIFIED'),
  ('2026-12-24', 'Christmas Eve', 'special', 'UNVERIFIED'),
  ('2026-12-25', 'Christmas Day', 'regular', 'UNVERIFIED'),
  ('2026-12-30', 'Rizal Day', 'regular', 'UNVERIFIED'),
  ('2026-12-31', 'Last Day of the Year', 'special', 'UNVERIFIED')
on conflict (date) do nothing;
