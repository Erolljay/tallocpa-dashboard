-- Bookkeeping, Phase 1B slice 3 (spec §3.6): the books of account printed as
-- BIR loose-leaf pages (or for copying into manual bound books). The permit /
-- registration reference of the client's loose-leaf books is printed on every
-- page.

alter table public.client_books add column books_permit text;

-- The Owner or staff assigned to the client record the books' permit / registration reference.
create or replace function public.set_books_permit(p_client uuid, p_permit text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can change its books' using errcode = '42501';
  end if;
  update public.client_books set books_permit = nullif(btrim(p_permit), '') where client_id = p_client;
  if not found then raise exception 'Set up the books first' using errcode = 'P0002'; end if;
end;
$$;

revoke execute on function public.set_books_permit(uuid, text) from public, anon;
grant execute on function public.set_books_permit(uuid, text) to authenticated;
