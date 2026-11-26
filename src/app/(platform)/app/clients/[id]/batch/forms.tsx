"use client";

import { useActionState, useState } from "react";
import { Badge, Button, Field, Input, Notice } from "@/components/ui";
import { showMonth } from "@/lib/documents/labels";
import type { BatchKind } from "@/lib/batch/register";
import { formatAmount } from "@/lib/returns/money";
import { postBatchAction, previewBatchAction, type BatchPreview, type BatchState } from "./actions";

function PreviewTable({ preview }: { preview: BatchPreview }) {
  return (
    <div className="space-y-4">
      {preview.errorCount > 0 ? (
        <Notice tone="blocked">
          {preview.errorCount} of {preview.rowCount} row{preview.rowCount === 1 ? "" : "s"} {preview.errorCount === 1 ? "has" : "have"} problems. Fix them in the file and preview it again; nothing posts until every row is clean.
        </Notice>
      ) : (
        <Notice tone="done">
          All {preview.rowCount} row{preview.rowCount === 1 ? " is" : "s are"} clean: {formatAmount(preview.total)} in total.
          {preview.bookedCount < preview.rowCount && ` ${preview.rowCount - preview.bookedCount} dated before the books start go to the register only.`}
        </Notice>
      )}
      <div className="flex flex-wrap gap-2">
        {preview.months.map((m) => (
          <span key={m.month} className="rounded-full bg-background-secondary-default px-3 py-1 text-caption-1-regular text-text-secondary tabular-nums">
            {showMonth(`${m.month}-01`)}: {m.count} · {formatAmount(m.total)}
          </span>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-body-regular">
          <thead className="text-body-medium text-text-tertiary">
            <tr>
              <th className="pb-2 text-start">Row</th>
              <th className="pb-2 text-start">Date</th>
              <th className="pb-2 text-start">No.</th>
              <th className="pb-2 text-start">Party</th>
              <th className="pb-2 text-end">Total</th>
              <th className="pb-2 text-end">Net</th>
              <th className="pb-2 ps-3 text-start">Check</th>
            </tr>
          </thead>
          <tbody>
            {preview.rows.map((r) => (
              <tr key={r.line} className="border-t border-separator-border align-top">
                <td className="py-2 pe-3 tabular-nums text-text-secondary">{r.line}</td>
                <td className="py-2 pe-3 tabular-nums">{r.date ?? "—"}</td>
                <td className="py-2 pe-3">{r.number ?? "—"}</td>
                <td className="py-2 pe-3">{r.party}</td>
                <td className="py-2 pe-3 text-end tabular-nums">{formatAmount(r.total)}</td>
                <td className="py-2 text-end tabular-nums">{formatAmount(r.net)}</td>
                <td className="py-2 ps-3">
                  {r.errors.length ? (
                    <ul className="space-y-0.5 text-text-error-primary">{r.errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
                  ) : r.booked ? (
                    <Badge tone="done">Books and register</Badge>
                  ) : (
                    <Badge tone="neutral">Register only</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {preview.shown < preview.rowCount && <p className="mt-2 text-caption-1-regular text-text-tertiary">Showing {preview.shown} of {preview.rowCount} rows, problems first.</p>}
      </div>
    </div>
  );
}

export function BatchUpload({ clientId, kind }: { clientId: string; kind: BatchKind }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, previewAction, previewing] = useActionState(previewBatchAction.bind(null, clientId, kind), {} as BatchState);
  const [posted, postAction, posting] = useActionState(postBatchAction.bind(null, clientId, kind), {} as BatchState);
  const shown = posted.preview ?? preview.preview;
  const tooBig = file != null && file.size > 950_000;
  return (
    <div className="space-y-4">
      <form action={previewAction} className="flex flex-wrap items-end gap-3">
        <Field label="Filled-in register (.xlsx)" htmlFor="batch_file">
          <Input id="batch_file" name="file" type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required onChange={(x) => setFile(x.target.files?.[0] ?? null)} className="py-1.5" />
        </Field>
        <Button type="submit" variant="secondary" disabled={previewing || !file || tooBig}>{previewing ? "Checking…" : "Check the rows"}</Button>
      </form>
      {tooBig && <Notice tone="blocked">The file is over 1 MB. Delete unused sheets and rows, or split it into two files.</Notice>}
      {preview.error && <Notice tone="blocked">{preview.error}</Notice>}
      {shown && !posted.ok && <PreviewTable preview={shown} />}
      {preview.preview && preview.preview.errorCount === 0 && file && !posted.ok && (
        <form
          action={(fd) => {
            fd.set("file", file);
            return postAction(fd);
          }}
        >
          <Button type="submit" disabled={posting}>{posting ? "Posting…" : `Post ${preview.preview.rowCount} row${preview.preview.rowCount === 1 ? "" : "s"}`}</Button>
        </form>
      )}
      {posted.error && <Notice tone="blocked">{posted.error}</Notice>}
      {posted.ok && <Notice tone="done">{posted.ok}</Notice>}
    </div>
  );
}
