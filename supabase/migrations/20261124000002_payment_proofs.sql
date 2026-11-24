-- Proof of payment from the client portal (spec §3.9, Pay Now).
--
-- After paying through one of the accounts under "Pay Now", the client uploads a
-- screenshot of the transfer, or for a check or over-the-counter deposit the
-- bank-validated deposit slip, with the amount and date. The statement
-- then shows "For verification". The Owner checks the bank or e-wallet, and on
-- Verify the proof becomes a deposit matched to the client's open billed items,
-- oldest first (as record_deposit does), so the statement reads Paid once it is
-- covered. A proof that does not match the bank is rejected with a reason the
-- client sees.
--
-- Files live in the private "payment-proofs" bucket under
-- <client id>/<statement id>/<file>.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('payment-proofs', 'payment-proofs', false, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'])
on conflict (id) do nothing;

create table public.payment_proofs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  soa_id uuid not null references public.soas (id) on delete cascade,
  payment_account_id uuid references public.brand_payment_accounts (id),
  amount numeric(18, 2) not null check (amount > 0),
  paid_on date not null,
  -- Online transfer / e-wallet, a check, or cash deposited over the bank counter.
  method text not null default 'transfer' check (method in ('transfer', 'check', 'deposit')),
  -- The transaction or reference number, or the check number for a check.
  reference text,
  storage_path text not null unique,
  file_name text not null,
  mime_type text not null,
  status text not null default 'for_verification' check (status in ('for_verification', 'verified', 'rejected')),
  submitted_by uuid not null references auth.users (id),
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references auth.users (id),
  reviewed_at timestamptz,
  reject_reason text,
  -- The deposit recorded when the Owner verified the payment.
  deposit_id uuid references public.client_deposits (id),
  check ((status = 'rejected') = (reject_reason is not null)),
  check ((status = 'verified') = (deposit_id is not null)),
  check ((status = 'for_verification') = (reviewed_at is null))
);

create index payment_proofs_soa_idx on public.payment_proofs (soa_id);
create index payment_proofs_pending_idx on public.payment_proofs (submitted_at) where status = 'for_verification';

create trigger audit after insert or update or delete on public.payment_proofs
  for each row execute function private.audit();

-- Read access only; every write goes through the functions below.
alter table public.payment_proofs enable row level security;
create policy payment_proofs_read on public.payment_proofs for select to authenticated
  using (private.is_owner() or private.is_client_user(client_id));

-- Storage: the Owner and the client's own users may view and add proofs. Nothing is
-- updated or deleted: a proof is kept with the payment it supports.
create policy payment_proofs_files_read on storage.objects for select to authenticated using (
  bucket_id = 'payment-proofs' and (private.is_owner() or private.is_client_user(private.document_client(name)))
);
create policy payment_proofs_files_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'payment-proofs' and (private.is_owner() or private.is_client_user(private.document_client(name)))
);

/**
 * The client (or the Owner for them) says a statement was paid. The file must
 * already be uploaded under <client id>/<statement id>/. Returns the proof id.
 */
create or replace function public.submit_payment_proof(
  p_soa uuid,
  p_storage_path text,
  p_file_name text,
  p_mime_type text,
  p_amount numeric,
  p_paid_on date,
  p_payment_account uuid,
  p_reference text,
  p_method text default 'transfer'
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  s record;
  proof_id uuid;
begin
  select so.id, so.client_id, c.brand_id into s
    from public.soas so join public.clients c on c.id = so.client_id
    where so.id = p_soa;
  if not found or not (private.is_owner() or private.is_client_user(s.client_id)) then
    raise exception 'Statement not found' using errcode = 'P0002';
  end if;
  if p_amount is null or p_amount <= 0 then raise exception 'Enter the amount you paid' using errcode = '22023'; end if;
  if round(p_amount, 2) <> p_amount then raise exception 'Use at most two decimals' using errcode = '22023'; end if;
  if p_paid_on is null then raise exception 'Enter the date you paid' using errcode = '22023'; end if;
  if p_paid_on > private.manila_today() then raise exception 'The date paid cannot be in the future' using errcode = '22023'; end if;
  if coalesce(p_method, '') not in ('transfer', 'check', 'deposit') then raise exception 'Choose how you paid' using errcode = '22023'; end if;
  if p_method = 'check' and nullif(trim(coalesce(p_reference, '')), '') is null then raise exception 'Enter the check number' using errcode = '22023'; end if;
  if p_payment_account is not null and not exists (
    select 1 from public.brand_payment_accounts a where a.id = p_payment_account and a.brand_id = s.brand_id
  ) then
    raise exception 'Choose one of the accounts under Pay Now' using errcode = '22023';
  end if;
  if coalesce(p_storage_path, '') not like s.client_id::text || '/' || s.id::text || '/%' then
    raise exception 'Upload the proof of payment for this statement' using errcode = '22023';
  end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'payment-proofs' and o.name = p_storage_path) then
    raise exception 'The proof of payment was not received. Please upload it again' using errcode = 'P0002';
  end if;

  insert into public.payment_proofs (client_id, soa_id, payment_account_id, method, amount, paid_on, reference, storage_path, file_name, mime_type, submitted_by)
  values (s.client_id, s.id, p_payment_account, p_method, p_amount, p_paid_on, nullif(trim(coalesce(p_reference, '')), ''), p_storage_path,
          coalesce(nullif(trim(coalesce(p_file_name, '')), ''), 'proof'), coalesce(nullif(trim(coalesce(p_mime_type, '')), ''), 'application/octet-stream'), auth.uid())
  returning id into proof_id;
  return proof_id;
end;
$$;

/**
 * The Owner confirms the money arrived: records it as a deposit matched to the
 * client's open billed items, oldest first, and marks the proof Verified. The
 * amount and date can be corrected to what the bank shows.
 */
create or replace function public.verify_payment_proof(
  p_proof uuid,
  p_received_on date,
  p_amount numeric,
  p_bir_invoice_number text
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  p record;
  dep_id uuid;
  method text;
  dues uuid[];
begin
  perform private.require_owner();
  select * into p from public.payment_proofs where id = p_proof for update;
  if not found then raise exception 'Proof of payment not found' using errcode = 'P0002'; end if;
  if p.status <> 'for_verification' then raise exception 'This proof of payment was already reviewed' using errcode = '22023'; end if;

  -- A check stays a check; a counter deposit is money into the bank like a transfer.
  if p.method = 'check' then
    method := 'check';
  else
    select case when a.kind = 'ewallet' then 'ewallet' else 'transfer' end into method
      from public.brand_payment_accounts a where a.id = p.payment_account_id;
  end if;
  select coalesce(array_agg(d.id), '{}') into dues
    from public.due_balances d where d.client_id = p.client_id and d.soa_id is not null and d.open_amount > 0;

  dep_id := public.record_deposit(
    p.client_id,
    coalesce(p_received_on, p.paid_on),
    coalesce(p_amount, p.amount),
    p.payment_account_id,
    p.reference,
    p_bir_invoice_number,
    'Proof of payment uploaded on the portal',
    dues,
    coalesce(method, 'transfer'),
    null
  );

  update public.payment_proofs
    set status = 'verified', deposit_id = dep_id, reviewed_by = auth.uid(), reviewed_at = now()
    where id = p_proof;
  return dep_id;
end;
$$;

/** The Owner could not find the payment: the client sees the reason and can upload again. */
create or replace function public.reject_payment_proof(p_proof uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  if nullif(trim(coalesce(p_reason, '')), '') is null then raise exception 'Say why the proof is rejected' using errcode = '22023'; end if;
  update public.payment_proofs
    set status = 'rejected', reject_reason = trim(p_reason), reviewed_by = auth.uid(), reviewed_at = now()
    where id = p_proof and status = 'for_verification';
  if not found then raise exception 'Proof of payment not found or already reviewed' using errcode = 'P0002'; end if;
end;
$$;

revoke execute on function public.submit_payment_proof(uuid, text, text, text, numeric, date, uuid, text, text) from public, anon;
revoke execute on function public.verify_payment_proof(uuid, date, numeric, text) from public, anon;
revoke execute on function public.reject_payment_proof(uuid, text) from public, anon;
grant execute on function public.submit_payment_proof(uuid, text, text, text, numeric, date, uuid, text, text) to authenticated;
grant execute on function public.verify_payment_proof(uuid, date, numeric, text) to authenticated;
grant execute on function public.reject_payment_proof(uuid, text) to authenticated;
