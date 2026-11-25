-- Deadline safeguards (docs/UX-REVIEW.md, D1): the 7:00 am morning email to the
-- Owner and to each preparer and reviewer (src/lib/deadlines/run.ts). A Manila day
-- is recorded once handled, so a rerun of the job sends nothing twice.

create table public.deadline_digests (
  day date primary key,
  emails integer not null default 0,
  critical integer not null default 0,
  at_risk integer not null default 0,
  gaps integer not null default 0,
  emailed boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.deadline_digests enable row level security;
create policy deadline_digests_owner on public.deadline_digests for select to authenticated using (private.is_owner());
