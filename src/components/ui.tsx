import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { RiArrowDownSLine, RiCheckLine, RiErrorWarningLine, RiEyeLine, RiLoader4Line, RiTimeLine } from "@remixicon/react";
import { buttonStyles } from "@/components/base/buttons/button";
import { Chip, type ChipColor } from "@/components/base/badges/chip";
import { Skeleton as BoardSkeleton } from "@/components/base/skeleton/skeleton";
import { cx } from "@/utils/cx";

/*
 * Tallo CPA's app primitives, built on BoardUI (components/base). Pages import
 * from here so the props stay the same everywhere; the look, tokens and type
 * scale are BoardUI's (Button and LinkButton use BoardUI's exported button
 * style map). New UI can also use the BoardUI components directly.
 */

/* ------------------------------------------------------------------ Buttons */

type Variant = "primary" | "secondary" | "ghost" | "danger";
type ButtonStyle = { variant?: Variant; size?: "md" | "sm" };

/*
 * BoardUI's ghost is an accent-tinted pill; Tallo's "ghost" is a quiet text
 * action (Cancel, Back), so it rides BoardUI's secondary shape without the frame.
 */
const quiet = "bg-transparent text-text-secondary hover:bg-background-secondary-hover hover:text-text-primary active:bg-background-tertiary-default";

function buttonClass({ variant = "primary", size = "md" }: ButtonStyle, className?: string) {
  const s = size === "sm" ? "small" : "medium";
  return cx(
    buttonStyles.base,
    buttonStyles.size[s],
    variant === "ghost" ? quiet : buttonStyles.variant[variant],
    "pointer-coarse:min-h-11",
    className,
  );
}

export function Button({ variant = "primary", size = "md", className, children, type = "button", ...props }: ComponentProps<"button"> & ButtonStyle) {
  return (
    <button type={type} className={buttonClass({ variant, size }, className)} {...props}>
      <span className={cx(buttonStyles.label[size === "sm" ? "small" : "medium"], "gap-1.5")}>{children}</span>
    </button>
  );
}

/** Next.js link styled as a BoardUI button. */
/** A plain link styled as a button, for targets that must load as a full page (a route handler that redirects off-site). */
export function AnchorButton({ variant = "primary", size = "md", className, children, ...props }: ComponentProps<"a"> & ButtonStyle) {
  return (
    <a className={buttonClass({ variant, size }, cx("gap-1.5", size === "sm" ? "px-2.5" : "px-3", className))} {...props}>
      {children}
    </a>
  );
}

export function LinkButton({ variant = "primary", size = "md", className, children, ...props }: ComponentProps<typeof Link> & ButtonStyle) {
  return (
    <Link className={buttonClass({ variant, size }, cx("gap-1.5", size === "sm" ? "px-2.5" : "px-3", className))} {...props}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------- Page chrome */

/** One title per screen (Title 1), an optional one-sentence lead, actions on the end side. */
export function PageHeader({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-title-1-medium text-text-primary">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-body-regular text-text-secondary">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** BoardUI panel: rounded-3xl, button-default border, primary surface. Never nested. */
export function Card({ title, children, className, actions }: { title?: string; children: ReactNode; className?: string; actions?: ReactNode }) {
  return (
    <section className={cx("min-w-0 rounded-3xl border border-border-button-default bg-background-primary-default p-5 sm:p-6", className)}>
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          {title && <h2 className="text-title-3-semibold text-text-primary">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------- Forms */

export function Field({ label, hint, error, children, htmlFor }: { label: string; hint?: string; error?: string; children: ReactNode; htmlFor: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-body-medium text-text-primary">{label}</label>
      {children}
      {hint && !error && <p className="text-caption-1-medium text-text-secondary">{hint}</p>}
      {error && (
        <p className="flex items-start gap-1 text-caption-1-medium text-text-error-primary">
          <RiErrorWarningLine aria-hidden className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/*
 * BoardUI's Input field shell (components/base/input) on native elements, so
 * server-action forms keep FormData, defaultValue and onChange as they are.
 * Text is 16px on phones so iOS does not zoom on focus, Body/Regular from sm up.
 */
const control = cx(
  "block w-full min-w-0 rounded-2lg border-0 bg-background-tertiary-default px-3 text-text-primary",
  "text-headline-regular sm:text-body-regular",
  "ring-1 ring-border-button-default ring-inset outline-none transition-[background-color,box-shadow,color] duration-150",
  "placeholder:text-text-tertiary hover:ring-2 hover:ring-border-button-hover focus:ring-2 focus:ring-border-button-active",
  "aria-invalid:bg-background-tertiary-error aria-invalid:ring-2 aria-invalid:ring-border-error-default",
  "disabled:cursor-not-allowed disabled:bg-input-disabled-background disabled:text-input-disabled-text",
  "read-only:hover:ring-1 read-only:hover:ring-border-button-default",
  "file:me-3 file:h-7 file:cursor-pointer file:rounded-lg file:border file:border-border-button-default file:bg-background-primary-default file:px-2.5 file:text-body-medium file:text-text-primary",
);

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cx(control, "h-9 pointer-coarse:h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cx(control, "py-2", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <span className={cx("relative block", className)}>
      <select className={cx(control, "h-9 cursor-pointer appearance-none pe-9 pointer-coarse:h-11")} {...props} />
      <RiArrowDownSLine aria-hidden className="pointer-events-none absolute end-2.5 top-1/2 size-5 -translate-y-1/2 text-foreground-icon-tertiary" />
    </span>
  );
}

/* ------------------------------------------------------------------ Status */

/*
 * Status meanings on BoardUI's Chip. Never colour alone: every chip carries
 * its word and a glyph.
 */
const tones = {
  neutral: { color: "neutral", Icon: RiTimeLine },
  progress: { color: "blue", Icon: RiLoader4Line },
  done: { color: "lime", Icon: RiCheckLine },
  waiting: { color: "yellow", Icon: RiEyeLine },
  blocked: { color: "rose", Icon: RiErrorWarningLine },
} satisfies Record<string, { color: ChipColor; Icon: typeof RiTimeLine }>;

export function Badge({ tone = "neutral", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  const { color, Icon } = tones[tone];
  return (
    <Chip variant="caption" color={color} className={cx("gap-1 rounded-full px-2", tone === "blocked" && "text-caption-1-semibold")}>
      <Icon aria-hidden className="size-3.5 shrink-0" />
      {children}
    </Chip>
  );
}

const noticeTones = {
  waiting: { box: "bg-status-yellow-background/50", icon: "text-status-yellow-text" },
  blocked: { box: "bg-status-rose-background/50", icon: "text-status-rose-text" },
  done: { box: "bg-status-lime-background/50", icon: "text-status-lime-text" },
};

/** Inline callout: a soft BoardUI status tint, readable primary text, the glyph carries the colour. */
export function Notice({ tone = "waiting", children }: { tone?: keyof typeof noticeTones; children: ReactNode }) {
  const { Icon } = tones[tone];
  return (
    <div role="status" className={cx("flex items-start gap-2.5 rounded-2xl px-4 py-3 text-body-regular text-text-primary", noticeTones[tone].box)}>
      <Icon aria-hidden className={cx("mt-0.5 size-4 shrink-0", noticeTones[tone].icon)} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/** Loading rows on BoardUI's Skeleton (layered light sheen). */
export function Skeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <BoardSkeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}

export const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
