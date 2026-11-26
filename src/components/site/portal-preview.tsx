import { RiCheckLine, RiFileTextLine, RiQrCodeLine, RiTimeLine } from "@remixicon/react";
import { Chip } from "@/components/base/badges/chip";
import { Button } from "@/components/base/buttons/button";
import { Mark } from "@/components/brand/mark";
import { cx } from "@/utils/cx";

/**
 * The hero's object: a working-size rendering of the client portal, built from the
 * app's own BoardUI components. It is an illustration with sample figures, said so
 * in its caption; no client's data is shown. The controls are inert (not focusable,
 * not announced): the caption describes what the picture shows.
 *
 * OWNER REVIEW: the sample figures and labels.
 */
const DOCS = [
  { label: "Sales invoices", state: "38 received", tone: "lime" as const },
  { label: "Purchase invoices", state: "21 received", tone: "lime" as const },
  { label: "Bank statement", state: "Requested", tone: "yellow" as const },
];

export function PortalPreview({ className }: { className?: string }) {
  return (
    <figure data-slot="portal-preview" className={cx("min-w-0", className)}>
      <div
        inert
        className="overflow-hidden rounded-3xl border border-border-button-default bg-background-primary-default shadow-lg shadow-accent-950/5"
      >
        <div className="flex items-center justify-between gap-3 border-b border-separator-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Mark className="size-6 rounded-md" />
            <span className="text-body-2-semibold text-text-primary">Client portal</span>
          </div>
          <span className="figure text-body-2-medium text-text-secondary">November</span>
        </div>

        <div className="flex flex-col gap-4 border-b border-separator-border p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-body-2-semibold text-text-primary">For your approval</span>
            <Chip color="yellow" variant="caption">
              Awaiting you
            </Chip>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-4 gap-y-1">
            <span className="figure text-title-2-semibold text-text-primary">0619-E</span>
            <span className="figure text-title-2-semibold text-text-primary">₱12,480.00</span>
            <span className="text-body-2-regular text-text-secondary">Expanded withholding, November</span>
            <span className="figure text-body-2-regular text-text-secondary">due Dec 10</span>
          </div>
          <div className="flex gap-2">
            <Button size="small" variant="secondary" leadingIcon={RiFileTextLine} tabIndex={-1}>
              Review
            </Button>
            <Button size="small" leadingIcon={RiCheckLine} tabIndex={-1}>
              Approve
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="flex flex-col gap-3 border-separator-border p-5 max-sm:border-b sm:border-e">
            <span className="text-body-2-semibold text-text-primary">Documents this month</span>
            <ul className="flex flex-col gap-2.5">
              {DOCS.map((d) => (
                <li key={d.label} className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2 text-body-2-regular text-text-primary">
                    {d.tone === "lime" ? (
                      <RiCheckLine className="size-4 shrink-0 text-status-lime-text" aria-hidden />
                    ) : (
                      <RiTimeLine className="size-4 shrink-0 text-status-yellow-text" aria-hidden />
                    )}
                    <span className="truncate">{d.label}</span>
                  </span>
                  <Chip color={d.tone} variant="caption">
                    {d.state}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 p-5">
            <span className="text-body-2-semibold text-text-primary">Statement of account</span>
            <div className="flex items-center gap-3">
              <RiQrCodeLine className="size-14 shrink-0 text-foreground-icon-primary" aria-hidden />
              <div className="flex min-w-0 flex-col">
                <span className="figure text-title-3-semibold text-text-primary">₱8,960.00</span>
                <span className="text-caption-1-regular text-text-secondary">Scan with your bank or e-wallet app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-caption-1-regular text-text-secondary">
        Illustration of the client portal with sample figures: a return awaiting approval, the month&apos;s documents, and a statement paid by QR code.
      </figcaption>
    </figure>
  );
}
