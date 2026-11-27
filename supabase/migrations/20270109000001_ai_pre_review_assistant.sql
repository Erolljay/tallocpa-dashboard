-- AI employees, step 6: what the Pre-Review Assistant reads (docs/AI-WORKFORCE.md §3, §6,
-- §7.2). Read-only grants, on top of step 1 (20270107000001_ai_employees.sql), step 2
-- (20270107000002_ai_connector.sql: obligations, filing_instances) and the drafts
-- (20270108000001_ai_drafts.sql), for switched-on AI employees and their clients only:
--
--   * return_worksheets: the figures and lines of each return as the preparer computed
--     them (with the app's own errors and warnings). Part of the return itself, like
--     filing_instances, so it follows the client (private.ai_client_ids()).
--   * register_lines: the sales, purchases and 2307 registers built from the approved
--     documents. Books detail (who sold or bought what), so Full books access only
--     (private.ai_full_books_client_ids()). Used for the tie-outs (T-1 sales vs revenue,
--     T-3 CWT vs 2307s received, …) and the ₱3,000,000 VAT threshold.
--   * workpaper_explanations: staff's written explanations of tie-out differences, read
--     with the tie-outs. Full books access only.
--
-- The books totals the tie-outs compare against come from public.workpaper_ledger(),
-- which runs as the caller (security invoker): an AI employee sees there only the
-- journal it may already read at Full access (step 1, ai_books_read).
--
-- Nothing here lets an AI employee change a return, a worksheet, a register line or an
-- explanation: there is no insert, update or delete policy for it (the existing write
-- policies need is_owner() or is_assigned(), which an AI employee never is), and the
-- sign-off chain (advance_filing) stays staff-only. What it finds goes in a draft review
-- memo (ai_save_draft) for the Reviewer to accept or reject.

create policy ai_return_worksheets_read on public.return_worksheets for select to authenticated
  using (client_id = any ((select private.ai_client_ids())::uuid[]));

create policy ai_register_lines_read on public.register_lines for select to authenticated
  using (client_id = any ((select private.ai_full_books_client_ids())::uuid[]));

create policy ai_workpaper_explanations_read on public.workpaper_explanations for select to authenticated
  using (client_id = any ((select private.ai_full_books_client_ids())::uuid[]));
