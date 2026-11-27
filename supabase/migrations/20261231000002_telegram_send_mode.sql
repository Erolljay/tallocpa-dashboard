-- Telegram uploads: "choose the type first" (Owner's request, 27 November 2026).
--
-- /send in the bot asks what the files are (staff: and the month) before any file
-- arrives. Until /done, or 30 minutes without a file, every file the chat sends is
-- filed straight away as that type, with no buttons under each file. The bot (service
-- role) keeps the choice on the chat's link; choosing another client clears it.

alter table public.telegram_links
  add column send_doc_type text
    check (send_doc_type in ('sales_invoice', 'purchase_receipt', 'bir_2307_received', 'bir_2307_issued', 'payroll', 'cor', 'other')),
  -- Staff: the month they chose. Clients: null (the month open for documents when each file is filed).
  add column send_month date,
  -- When /send was chosen or the last file came in under it; idle for 30 minutes means it expired.
  add column send_active_at timestamptz;

-- The bot's one reply for a file (or album) sent under /send; each file's filing edits it
-- with the running result, so an album of ten gets one message, not ten.
alter table public.telegram_uploads add column reply_message_id bigint;
