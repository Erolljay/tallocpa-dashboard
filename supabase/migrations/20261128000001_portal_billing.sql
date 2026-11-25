-- Portal Billing (rework decisions 16–17): payment channels and payment statuses.
--
-- Payment channels are the banks and e-wallets the firm accepts
-- (brand_payment_accounts): name, bank or e-wallet, account name and number, a
-- QR image, an active flag and the order clients see them in. Only the Owner
-- manages them. A client sees only the active channels of their own firm, and
-- only those channels' QR images; on the portal they choose one channel and see
-- just its QR and account details.
--
-- A payment the client sends is a proof (payment_proofs): Pending verification
-- until the Owner verifies it (it becomes a deposit applied to the open items,
-- oldest first, unchanged here) or rejects it with a reason the client sees.
-- A reviewed proof is final.

-- ---------------------------------------------------------------------------
-- Channels.
-- ---------------------------------------------------------------------------
alter table public.brand_payment_accounts
  add constraint brand_payment_accounts_institution_present check (length(trim(institution)) > 0),
  add constraint brand_payment_accounts_account_name_present check (length(trim(account_name)) > 0),
  add constraint brand_payment_accounts_account_number_present check (length(trim(account_number)) > 0);

create index if not exists brand_payment_accounts_brand_order_idx on public.brand_payment_accounts (brand_id, sort_order);

/** Whether the signed-in user is a client user of a business served by `target` brand. */
create or replace function private.is_brand_client_user(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.client_users cu join public.clients c on c.id = cu.client_id
    where cu.user_id = auth.uid() and c.brand_id = target
  )
$$;
revoke execute on function private.is_brand_client_user(uuid) from public, anon;
grant execute on function private.is_brand_client_user(uuid) to authenticated;

-- Was: any signed-in user saw every active account. Now staff see the active
-- channels, a client only their own firm's active channels, and the Owner all.
drop policy if exists payment_accounts_read on public.brand_payment_accounts;
create policy payment_accounts_read on public.brand_payment_accounts for select to authenticated using (
  private.is_owner() or (active and (private.is_staff() or private.is_brand_client_user(brand_id)))
);

-- QR images: was readable by anyone signed in. Now staff, and anyone who can
-- see the channel the image belongs to (a client: an active channel of their firm).
drop policy if exists payment_qr_read on storage.objects;
create policy payment_qr_read on storage.objects for select to authenticated using (
  bucket_id = 'payment-qr'
  and (private.is_staff() or exists (select 1 from public.brand_payment_accounts a where a.qr_path = objects.name))
);

-- ---------------------------------------------------------------------------
-- Payments: a reviewed proof is final.
-- ---------------------------------------------------------------------------
create or replace function private.payment_proof_transition() returns trigger
language plpgsql set search_path = '' as $$
begin
  if old.status <> 'for_verification' then
    raise exception 'This proof of payment was already reviewed' using errcode = '22023';
  end if;
  if new.status not in ('for_verification', 'verified', 'rejected') then
    raise exception 'Unknown payment status' using errcode = '22023';
  end if;
  if new.status = 'rejected' and nullif(trim(coalesce(new.reject_reason, '')), '') is null then
    raise exception 'Say why the proof is rejected' using errcode = '22023';
  end if;
  if (new.client_id, new.soa_id, new.amount, new.paid_on, new.method, new.storage_path, new.submitted_by, new.submitted_at)
     is distinct from (old.client_id, old.soa_id, old.amount, old.paid_on, old.method, old.storage_path, old.submitted_by, old.submitted_at) then
    raise exception 'What the client sent cannot be changed' using errcode = '22023';
  end if;
  return new;
end;
$$;

create trigger payment_proof_transition before update on public.payment_proofs
  for each row execute function private.payment_proof_transition();

/**
 * As before, plus: the channel must be one of the firm's active channels, and
 * when the firm has active channels the client must say which one they paid to.
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
  if p_payment_account is null then
    if exists (select 1 from public.brand_payment_accounts a where a.brand_id = s.brand_id and a.active) then
      raise exception 'Choose the bank or e-wallet you paid to' using errcode = '22023';
    end if;
  elsif not exists (
    select 1 from public.brand_payment_accounts a where a.id = p_payment_account and a.brand_id = s.brand_id and a.active
  ) then
    raise exception 'Choose one of the banks or e-wallets under Pay' using errcode = '22023';
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

/** The Owner could not find the payment: the client sees the reason and can upload again. */
create or replace function public.reject_payment_proof(p_proof uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  if nullif(trim(coalesce(p_reason, '')), '') is null then raise exception 'Say why the proof is rejected' using errcode = '22023'; end if;
  if length(trim(p_reason)) > 500 then raise exception 'Keep the reason under 500 characters' using errcode = '22023'; end if;
  update public.payment_proofs
    set status = 'rejected', reject_reason = trim(p_reason), reviewed_by = auth.uid(), reviewed_at = now()
    where id = p_proof and status = 'for_verification';
  if not found then raise exception 'Proof of payment not found or already reviewed' using errcode = 'P0002'; end if;
end;
$$;
