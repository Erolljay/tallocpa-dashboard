-- B1 follow-up: attach the source image (or PDF) to a batch-uploaded row later
-- (docs/UX-REVIEW.md, "Batch upload").
--
-- A batch row (migration 20261125000014) is an approved document with no file behind
-- it ("Batch · no image"). Staff who keep the client's books can attach the invoice's
-- image afterwards. The file goes to the same private "documents" bucket, under
-- <client id>/<document id>/..., like any other document.
--
-- The image is evidence only. Attaching it changes no approved figure, register line
-- or journal entry: only the document's file columns change, and no trigger on those
-- columns rewrites the register or the ledger. So it is allowed in a month locked by
-- a filed return too. Who attached it and when is kept on the document (and in the
-- audit log).
--
-- Two steps, as with register_document / confirm_document:
--   begin_batch_image   checks and returns the path the file goes to
--   attach_batch_image  after the upload: checks the file is there and records it

alter table public.documents
  add column image_attached_at timestamptz,
  add column image_attached_by uuid references auth.users (id);

-- The file types and size a document may have (as the "documents" bucket).
create or replace function private.document_file_ok(p_mime_type text, p_size bigint) returns boolean
language sql immutable as $$
  select p_mime_type in ('image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf')
     and p_size > 0 and p_size <= 20971520
$$;

-- The batch row, locked, after checking the person may attach its image.
create or replace function private.batch_row_for_image(p_document uuid) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
begin
  select * into d from public.documents where id = p_document for update;
  if d.id is null or not private.is_staff() or not private.can_access_client(d.client_id) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(d.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can attach images' using errcode = '42501';
  end if;
  if d.source <> 'batch' then
    raise exception 'Only a batch-uploaded row takes an image later' using errcode = '22023';
  end if;
  if d.storage_path is not null then
    raise exception 'This row already has its image' using errcode = '22023';
  end if;
  return d;
end;
$$;

/** Step 1: checks the row and the file, and returns the storage path the file goes to. Changes nothing. */
create or replace function public.begin_batch_image(p_document uuid, p_file_name text, p_mime_type text, p_size bigint) returns text
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
begin
  d := private.batch_row_for_image(p_document);
  if not private.document_file_ok(p_mime_type, p_size) then
    raise exception 'Attach a photo (JPEG, PNG, HEIC) or a PDF of 20 MB or less' using errcode = '22023';
  end if;
  return d.client_id || '/' || d.id || '/'
    || left(regexp_replace(coalesce(nullif(btrim(p_file_name), ''), 'image'), '[^A-Za-z0-9._-]+', '_', 'g'), 120);
end;
$$;

/**
 * Step 2: the file is in storage under the row's folder; the row now shows it. Only the
 * file columns change (and who attached it, when). Figures, register line and entries stay.
 */
create or replace function public.attach_batch_image(p_document uuid, p_path text, p_mime_type text, p_size bigint) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
begin
  d := private.batch_row_for_image(p_document);
  if not private.document_file_ok(p_mime_type, p_size) then
    raise exception 'Attach a photo (JPEG, PNG, HEIC) or a PDF of 20 MB or less' using errcode = '22023';
  end if;
  if p_path is null or p_path not like d.client_id || '/' || d.id || '/%' or p_path like '%..%' then
    raise exception 'That file is not this row''s' using errcode = '22023';
  end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'documents' and o.name = p_path) then
    raise exception 'The file has not arrived yet; try the upload again' using errcode = '22023';
  end if;
  update public.documents
  set storage_path = p_path, mime_type = p_mime_type, size_bytes = p_size,
      image_attached_at = now(), image_attached_by = auth.uid()
  where id = d.id
  returning * into d;
  return d;
end;
$$;

revoke execute on function private.document_file_ok(text, bigint) from public, anon;
revoke execute on function private.batch_row_for_image(uuid) from public, anon;
revoke execute on function public.begin_batch_image(uuid, text, text, bigint) from public, anon;
revoke execute on function public.attach_batch_image(uuid, text, text, bigint) from public, anon;
grant execute on function private.document_file_ok(text, bigint) to authenticated;
grant execute on function private.batch_row_for_image(uuid) to authenticated;
grant execute on function public.begin_batch_image(uuid, text, text, bigint) to authenticated;
grant execute on function public.attach_batch_image(uuid, text, text, bigint) to authenticated;
