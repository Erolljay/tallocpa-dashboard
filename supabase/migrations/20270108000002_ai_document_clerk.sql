-- AI employees, step 3: what the Document Clerk reads (docs/AI-WORKFORCE.md §3, §7.2).
-- Read-only grants, on top of step 1 (20270107000001_ai_employees.sql) and the drafts
-- (20270108000001_ai_drafts.sql), for AI employees that are switched on, for their
-- clients only (private.ai_client_ids()):
--
--   * documents: what each client sent, its type, period and status;
--   * extractions: OCR's reading of those documents (fields, confidence), and the
--     approved figures, used to spot duplicates;
--   * client_parties: which suppliers and customers each client deals with;
--   * parties: only the directory entries linked to its clients through
--     client_parties, so it can name a supplier. Not the whole directory: other
--     clients' suppliers stay out of sight.
--
-- Nothing here lets an AI employee change a document, a reading or a party: there is
-- no insert, update or delete policy for it, and approving, posting and returning
-- documents stay staff-only (their functions check is_staff()). What it suggests goes
-- in a draft (ai_save_draft) for a person to accept or reject.

create policy ai_documents_read on public.documents for select to authenticated
  using (client_id = any ((select private.ai_client_ids())::uuid[]));

-- The cardinality test runs once per query (an initplan) and is false for everyone who
-- is not an AI employee with clients, so staff queries skip the subquery.
create policy ai_extractions_read on public.extractions for select to authenticated
  using (cardinality((select private.ai_client_ids())::uuid[]) > 0 and exists (
    select 1 from public.documents d
    where d.id = extractions.document_id and d.client_id = any ((select private.ai_client_ids())::uuid[])
  ));

create policy ai_client_parties_read on public.client_parties for select to authenticated
  using (client_id = any ((select private.ai_client_ids())::uuid[]));

create policy ai_parties_read on public.parties for select to authenticated
  using (cardinality((select private.ai_client_ids())::uuid[]) > 0 and exists (
    select 1 from public.client_parties cp
    where cp.party_id = parties.id and cp.client_id = any ((select private.ai_client_ids())::uuid[])
  ));
