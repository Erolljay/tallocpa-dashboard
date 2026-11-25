-- Payroll as an intake stream (rework, 25 November 2026; docs/REWORK.md).
--
-- Clients send their payroll in their own format: their Excel, a PDF, or a photo
-- of the payroll sheet. It arrives like any other document, in its own Inbox tab;
-- staff convert it to the Tallo standard payroll template and load it on the
-- client's Payroll page, then mark the document done ("posted"). A payroll
-- document is never read by OCR and never becomes a register line (the payroll
-- register is the payroll entries), but it counts as part of the month's
-- submission like the sales and purchases (private.is_submission).

alter table public.documents drop constraint documents_doc_type_check;
alter table public.documents add constraint documents_doc_type_check check (doc_type in (
  'sales_invoice', 'purchase_receipt', 'bir_2307_received', 'bir_2307_issued', 'payroll', 'cor',
  'filed_return', 'payment_proof', 'other'
));

-- The client's own payroll workbook: .xlsx, .xls or .csv, in the documents bucket.
update storage.buckets
set allowed_mime_types = array[
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'
]
where id = 'documents';
