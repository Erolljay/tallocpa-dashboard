import {
  RiArrowRightSLine,
  RiBankLine,
  RiCheckLine,
  RiChat3Line,
  RiFileList2Line,
  RiFileUploadLine,
  RiLoader4Line,
  RiLockLine,
  RiQrCodeLine,
  RiScanLine,
  RiShoppingBag3Line,
  RiStore2Line,
  RiTeamLine,
  RiTimeLine,
  RiWallet3Line,
} from "@remixicon/react";
import type { ReactNode } from "react";
import { Chip } from "@/components/base/badges/chip";
import { Button } from "@/components/base/buttons/button";
import { Mark } from "@/components/brand/mark";
import { cx } from "@/utils/cx";

/**
 * Re-drawings of the client portal's screens (src/app/portal/**) for the website's
 * "How we work" page, built from the app's own BoardUI components. They are
 * illustrations with sample figures: a sample business, no staff names or photos, no
 * client data, and no fee amounts (fees are quoted only by the quote form). The
 * frames are inert, so nothing inside them can be focused or announced; each figure's
 * caption says what it shows.
 *
 * OWNER REVIEW: the sample business, dates and figures.
 */
export const SAMPLE_BUSINESS = "Sample Trading Corp.";

export function ScreenFigure({ title, caption, children, className }: { title: string; caption: string; children: ReactNode; className?: string }) {
  return (
    <figure data-slot={`screen-${title.toLowerCase().replace(/\W+/g, "-")}`} className={cx("min-w-0", className)}>
      <div inert className="overflow-hidden rounded-3xl border border-border-button-default bg-background-primary-default shadow-lg shadow-accent-950/10">
        <div className="flex items-center justify-between gap-3 border-b border-separator-border px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <Mark className="size-6 shrink-0 rounded-md" />
            <span className="truncate text-body-2-semibold text-text-primary">{title}</span>
          </div>
          <span className="truncate text-caption-1-regular text-text-secondary">{SAMPLE_BUSINESS}</span>
        </div>
        <div className="flex flex-col gap-5 p-5">{children}</div>
      </div>
      <figcaption className="mt-3 text-caption-1-regular text-text-secondary">{caption} Illustration of the client portal with sample figures.</figcaption>
    </figure>
  );
}

const Label = ({ children }: { children: ReactNode }) => <span className="text-body-2-semibold text-text-primary">{children}</span>;
const Muted = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cx("text-caption-1-regular text-text-secondary", className)}>{children}</span>
);
const Done = ({ children }: { children: ReactNode }) => (
  <Chip color="lime" variant="caption" className="gap-1">
    <RiCheckLine className="size-3.5" aria-hidden />
    {children}
  </Chip>
);

/** 1. Onboarding: the filing calendar set up from the Certificate of Registration. */
export function OnboardingScreen() {
  const rows = [
    { form: "2550Q", what: "Quarterly VAT", next: "Jan 25" },
    { form: "1601-C", what: "Withholding on wages, monthly", next: "Dec 10" },
    { form: "0619-E", what: "Expanded withholding, monthly", next: "Dec 10" },
    { form: "1601-EQ", what: "Expanded withholding, quarterly", next: "Feb 1" },
    { form: "1702Q", what: "Quarterly income tax", next: "May 30" },
    { form: "1604-C", what: "Annual information return", next: "Feb 1" },
  ];
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Label>Your registration</Label>
        <Chip color="blue" variant="caption">
          Corporation
        </Chip>
        <Chip color="blue" variant="caption">
          VAT-registered
        </Chip>
      </div>
      <ul className="flex flex-col divide-y divide-separator-border">
        {rows.map((r) => (
          <li key={r.form} className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-baseline gap-3 py-2.5">
            <span className="figure text-body-2-semibold text-text-primary">{r.form}</span>
            <span className="truncate text-body-2-regular text-text-secondary">{r.what}</span>
            <span className="figure text-caption-1-medium text-text-primary">next {r.next}</span>
          </li>
        ))}
      </ul>
      <Muted>Set up from your Certificate of Registration (Form 2303).</Muted>
    </>
  );
}

const CATEGORIES = [
  { name: "Sales", hint: "Sales invoices, official receipts, 2307s from customers", Icon: RiStore2Line },
  { name: "Purchases & Expenses", hint: "Receipts and invoices for what you bought or paid", Icon: RiShoppingBag3Line },
  { name: "Payroll", hint: "Your payroll in any format: Excel, PDF or a photo", Icon: RiTeamLine },
  { name: "Other", hint: "Bank statements, contracts, anything else", Icon: RiFileList2Line },
];

/** 2. Upload: four categories, what it is, which month, scan or choose files. */
export function UploadScreen() {
  return (
    <>
      <Muted className="text-body-2-regular">
        November documents are due by <span className="font-semibold text-text-primary">Sat, Dec 5</span>.
      </Muted>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CATEGORIES.map(({ name, hint, Icon }, i) => (
          <li
            key={name}
            className={cx(
              "flex flex-col gap-1 rounded-2xl border p-3",
              i === 0 ? "border-accent-500 bg-button-ghost-background" : "border-border-button-default",
            )}
          >
            <Icon className={cx("size-5", i === 0 ? "text-button-ghost-foreground" : "text-foreground-icon-secondary")} aria-hidden />
            <Label>{name}</Label>
            <Muted className={cx(i === 0 && "text-button-ghost-foreground")}>{hint}</Muted>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Muted>What is it?</Muted>
          <span className="rounded-xl bg-background-secondary-default px-3 py-2 text-body-2-regular text-text-primary">Sales invoice / official receipt</span>
        </div>
        <div className="flex flex-col gap-1">
          <Muted>For the month of</Muted>
          <span className="figure rounded-xl bg-background-secondary-default px-3 py-2 text-body-2-regular text-text-primary">November 2026</span>
        </div>
        <Button leadingIcon={RiScanLine} className="w-full">
          Scan document
        </Button>
        <Button variant="secondary" leadingIcon={RiFileUploadLine} className="w-full">
          Choose photos or PDFs
        </Button>
      </div>
    </>
  );
}

/** 3. We check and record: what you sent, checked; questions come back under Requests. */
export function CheckScreen() {
  const sent = [
    { what: "Sales invoices and receipts", n: 42 },
    { what: "Receipts for purchases and expenses", n: 27 },
    { what: "Payroll", n: 1 },
  ];
  return (
    <>
      <Label>What you&apos;ve sent for November 2026</Label>
      <ul className="flex flex-col divide-y divide-separator-border">
        {sent.map((s) => (
          <li key={s.what} className="grid grid-cols-[minmax(0,1fr)_2.5rem_auto] items-center gap-3 py-2.5">
            <span className="truncate text-body-2-regular text-text-primary">{s.what}</span>
            <span className="figure text-end text-body-2-medium text-text-primary">{s.n}</span>
            <Done>Checked</Done>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 rounded-2xl border border-border-button-default p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-body-2-semibold text-text-primary">
            <RiChat3Line className="size-4 text-foreground-icon-secondary" aria-hidden />
            Requests
          </span>
          <Chip color="yellow" variant="caption">
            1 open
          </Chip>
        </div>
        <span className="text-body-2-regular text-text-primary">One receipt from Nov 14 is hard to read. Please send a clearer photo.</span>
      </div>
    </>
  );
}

const PROGRESS = [
  { name: "Sales", state: "42 sent, 42 approved", pct: 100 },
  { name: "Purchases & Expenses", state: "27 sent, 27 approved", pct: 100 },
  { name: "Payroll", state: "1 sent, 1 approved", pct: 100 },
  { name: "Other", state: "2 sent, 2 approved", pct: 100 },
];

/** 4 and 5. The month card: confirm "I've sent everything", then the books are locked. */
export function MonthScreen({ locked = false }: { locked?: boolean }) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-title-3-semibold text-text-primary">November 2026</span>
        {locked ? (
          <Chip color="lime" variant="caption" className="gap-1">
            <RiLockLine className="size-3.5" aria-hidden />
            Books locked
          </Chip>
        ) : (
          <Chip color="blue" variant="caption">
            Due Dec 5
          </Chip>
        )}
      </div>
      <Muted className="text-body-2-regular">
        {locked ? "The month is locked: its books are final." : "Nothing missing that we can see."}
      </Muted>
      <ul className="flex flex-col gap-3">
        {PROGRESS.map((p) => (
          <li key={p.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-body-2-regular text-text-primary">{p.name}</span>
              <Muted>{p.state}</Muted>
            </div>
            <span className="block h-1.5 rounded-full bg-accent-500" style={{ width: `${p.pct}%` }} />
          </li>
        ))}
      </ul>
      {locked ? (
        <span className="flex items-center gap-2 text-body-2-medium text-text-primary">
          <RiCheckLine className="size-4 text-status-lime-text" aria-hidden />
          You confirmed the month on Dec 3
        </span>
      ) : (
        <Button className="w-full">I&apos;ve sent everything for November 2026</Button>
      )}
    </>
  );
}

const RETURNS = [
  { form: "1601-C", period: "2026-11", state: "Approved, being filed", tone: "blue" as const },
  { form: "1601-EQ", period: "FY2026-Q3", state: "Filed & paid", tone: "lime" as const },
  { form: "2550Q", period: "FY2026-Q3", state: "Filed & paid", tone: "lime" as const },
  { form: "1601-C", period: "2026-10", state: "Filed & paid", tone: "lime" as const },
];

/** 6. Returns: approve, or ask a question first. */
export function ReturnsScreen() {
  return (
    <>
      <Label>Waiting for your approval</Label>
      <div className="flex flex-col gap-4 rounded-2xl border border-border-button-default p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-0.5">
          <span className="figure text-title-3-semibold text-text-primary">0619-E, 2026-11</span>
          <span className="figure text-title-3-semibold text-text-primary">₱12,480.00</span>
          <Muted>Due Thu, Dec 10</Muted>
          <Muted className="text-end">Tax due</Muted>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="small" leadingIcon={RiCheckLine}>
            Approve this return
          </Button>
          <Button size="small" variant="secondary" leadingIcon={RiChat3Line}>
            Ask a question
          </Button>
        </div>
      </div>
      <Label>Your returns</Label>
      <ul className="flex flex-col divide-y divide-separator-border">
        {RETURNS.map((r) => (
          <li key={`${r.form}-${r.period}`} className="flex items-center justify-between gap-3 py-2.5">
            <span className="figure truncate text-body-2-medium text-text-primary">
              {r.form}, {r.period}
            </span>
            <Chip color={r.tone} variant="caption" className="gap-1">
              {r.tone === "lime" ? <RiCheckLine className="size-3.5" aria-hidden /> : <RiLoader4Line className="size-3.5" aria-hidden />}
              {r.state}
            </Chip>
          </li>
        ))}
      </ul>
    </>
  );
}

/** 7. What happens next: every approval and filing, months ahead, with the BIR deadline. */
export const TIMELINE: { date: string; title: string; note?: string; done?: boolean }[] = [
  { date: "Dec 5", title: "You confirm the month is complete", note: "By the cutoff at the latest." },
  { date: "Dec 7", title: "We finish checking your documents", note: "If something needs fixing we'll ask you under Requests." },
  { date: "Dec 7", title: "Your 2026-11 withholding tax on wages (1601-C) is ready for your approval", done: true },
  { date: "Dec 7", title: "Your 2026-11 expanded withholding tax (0619-E) is ready for your approval", note: "You approve it here in the portal, under Returns." },
  { date: "Dec 9", title: "We file and pay your 0619-E and 1601-C", note: "The BIR deadline is Thu, Dec 10." },
  { date: "Jan 19", title: "Your FY2026-Q4 quarterly VAT return (2550Q) is ready for your approval", note: "You approve it here in the portal, under Returns." },
  { date: "Jan 20", title: "We file and pay your 2550Q", note: "The BIR deadline is Mon, Jan 25." },
  { date: "Jan 28", title: "Your annual information return on wages (1604-C) and FY2026-Q4 1601-EQ are ready for your approval" },
  { date: "Jan 29", title: "We file and pay your 1604-C and 1601-EQ", note: "The BIR deadline is Mon, Feb 1." },
  { date: "Feb 26", title: "We file your annual information return (1604-E)", note: "The BIR deadline is Mon, Mar 1." },
];

export function TimelineScreen() {
  return (
    <>
      <Label>What happens next</Label>
      <ol className="flex flex-col">
        {TIMELINE.map((t, i) => (
          <li key={i} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 border-t border-separator-border py-2.5 first:border-t-0 first:pt-0">
            <span className={cx("figure text-caption-1-semibold", t.done ? "text-status-lime-text" : "text-text-secondary")}>{t.date}</span>
            <span className="flex flex-col gap-0.5">
              <span className={cx("text-body-2-medium", t.done ? "text-text-secondary" : "text-text-primary")}>
                {t.title}
                {t.done && <RiCheckLine className="ms-1 inline size-4 align-text-bottom text-status-lime-text" aria-hidden />}
              </span>
              {t.note && <Muted>{t.note}</Muted>}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}

const POSITION = [
  { label: "Cash and bank", value: "₱486,210.40" },
  { label: "Owed to you", value: "₱138,900.00" },
  { label: "You owe", value: "₱92,415.75" },
  { label: "Equity", value: "₱532,694.65" },
];
/** Sample revenue and expenses, in thousands of pesos; November is not final yet. */
const MONTHS6 = [
  { m: "Jun", rev: 62, exp: 48 },
  { m: "Jul", rev: 71, exp: 52 },
  { m: "Aug", rev: 58, exp: 47 },
  { m: "Sep", rev: 80, exp: 61 },
  { m: "Oct", rev: 76, exp: 55 },
  { m: "Nov", rev: 69, exp: 50, draft: true },
];

/** 8. Reports: financial position, the last six months, filed returns, books, 2307s and 2316s. */
export function ReportsScreen() {
  return (
    <>
      <Label>Financial position</Label>
      <ul className="grid grid-cols-2 gap-2">
        {POSITION.map((p) => (
          <li key={p.label} className="flex flex-col gap-0.5 rounded-2xl border border-border-button-default p-3">
            <Muted>{p.label}</Muted>
            <span className="figure text-body-semibold text-text-primary">{p.value}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Label>Last 6 months</Label>
          <span className="flex items-center gap-1.5 text-caption-1-regular text-text-secondary">
            <span className="size-2 rounded-full bg-chart-1" aria-hidden />
            Revenue
          </span>
          <span className="flex items-center gap-1.5 text-caption-1-regular text-text-secondary">
            <span className="size-2 rounded-full bg-chart-3" aria-hidden />
            Expenses
          </span>
        </div>
        <div className="grid h-28 grid-cols-6 items-end gap-2">
          {MONTHS6.map((d) => (
            <div key={d.m} className={cx("flex h-full items-end justify-center gap-1 rounded-md", d.draft && "outline-1 outline-offset-2 outline-dashed outline-border-button-default")}>
              <span className="w-2.5 rounded-t-sm bg-chart-1" style={{ height: `${d.rev}%` }} />
              <span className="w-2.5 rounded-t-sm bg-chart-3" style={{ height: `${d.exp}%` }} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2 text-center">
          {MONTHS6.map((d) => (
            <Muted key={d.m}>{d.m}</Muted>
          ))}
        </div>
      </div>
      <ul className="flex flex-col divide-y divide-separator-border">
        {["Filed returns, with the BIR validation report", "Books of account, loose-leaf, by month", "BIR 2307 certificates", "BIR 2316 for your employees"].map((r) => (
          <li key={r} className="flex items-center justify-between gap-3 py-2.5">
            <span className="text-body-2-regular text-text-primary">{r}</span>
            <RiArrowRightSLine className="size-4 shrink-0 text-foreground-icon-secondary" aria-hidden />
          </li>
        ))}
      </ul>
    </>
  );
}

/** 9. Billing: the statement, paid by QR from a bank or e-wallet app, with proof uploaded. */
export function BillingScreen() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label>Statement of account, November 2026</Label>
        <Chip color="yellow" variant="caption" className="gap-1">
          <RiTimeLine className="size-3.5" aria-hidden />
          Due Dec 15
        </Chip>
      </div>
      <div className="flex flex-col gap-2">
        <Muted>Choose a bank or e-wallet</Muted>
        <div className="grid grid-cols-2 gap-2">
          <span className="flex items-center gap-2 rounded-xl border border-accent-500 bg-button-ghost-background px-3 py-2 text-body-2-medium text-button-ghost-foreground">
            <RiBankLine className="size-4" aria-hidden />
            Bank transfer
          </span>
          <span className="flex items-center gap-2 rounded-xl border border-border-button-default px-3 py-2 text-body-2-medium text-text-primary">
            <RiWallet3Line className="size-4" aria-hidden />
            E-wallet
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <RiQrCodeLine className="size-20 shrink-0 text-foreground-icon-primary" aria-hidden />
        <div className="flex min-w-0 flex-col gap-1">
          <Muted>Payment reference</Muted>
          <span className="figure text-body-semibold text-text-primary">SOA-2611-0042</span>
          <Muted>Scan with your bank or e-wallet app.</Muted>
        </div>
      </div>
      <Button variant="secondary" leadingIcon={RiFileUploadLine} className="w-full">
        Upload proof of payment
      </Button>
    </>
  );
}

