import Link from "next/link";
import { AlertCircle, Check, Clock, Eye, Loader } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/*
 * Button (design system: Button). radius-sm, 40px high (44px on touch screens,
 * Apple's minimum hit target), label style, focus ring from globals.css.
 * Hover changes colour only; the press gives instant feedback (.pressable).
 */
const buttonBase =
  "pressable inline-flex h-10 items-center justify-center gap-2 rounded-[6px] px-5 text-sm font-medium whitespace-nowrap select-none pointer-coarse:h-11 disabled:pointer-events-none disabled:opacity-50";
const variants = {
  primary: "bg-action text-ink-on-action shadow-action hover:bg-action-hover",
  secondary: "border border-border-strong bg-surface text-ink-strong shadow-sm hover:bg-surface-muted",
  ghost: "rounded-[8px] text-ink-muted hover:bg-surface-muted hover:text-link",
};
const sizes = { md: "", sm: "h-9 px-4 pointer-coarse:h-11" };

type ButtonStyle = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export function Button({ variant = "primary", size = "md", className, ...props }: ComponentProps<"button"> & ButtonStyle) {
  return <button className={cx(buttonBase, variants[variant], sizes[size], className)} {...props} />;
}

export function LinkButton({ variant = "primary", size = "md", className, ...props }: ComponentProps<typeof Link> & ButtonStyle) {
  return <Link className={cx(buttonBase, variants[variant], sizes[size], className)} {...props} />;
}

/** One title per screen (heading-lg), an optional one-sentence lead, actions on the right. */
export function PageHeader({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-display text-[28px] leading-[34px] font-bold text-ink-heading sm:text-[32px] sm:leading-[38px]">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-[15px] leading-[22px] text-ink-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

/** App panel: surface, 1px border, radius-xl, shadow-sm, space-6 padding. Never nested. */
export function Card({ title, children, className, actions }: { title?: string; children: ReactNode; className?: string; actions?: ReactNode }) {
  return (
    <section className={cx("rounded-2xl border border-border bg-surface p-6 shadow-sm", className)}>
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-4">
          {title && <h2 className="font-display text-lg leading-7 font-semibold text-ink-heading">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Field({ label, hint, error, children, htmlFor }: { label: string; hint?: string; error?: string; children: ReactNode; htmlFor: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-strong">{label}</label>
      {children}
      {hint && !error && <p className="text-sm text-ink-muted">{hint}</p>}
      {error && (
        <p className="flex items-start gap-1.5 text-sm text-danger-text">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}

/*
 * Input (design system: Input): 40px, border-input, radius-sm. Text is 16px on
 * phones so iOS does not zoom on focus, 14px from the sm breakpoint up.
 */
const control =
  "block w-full rounded-[6px] border border-border-input bg-surface px-3 text-base text-ink transition-colors placeholder:text-ink-subtle hover:border-ink-muted aria-invalid:border-danger disabled:border-border disabled:bg-surface-sunken disabled:text-ink-muted sm:text-sm";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cx(control, "h-10 pointer-coarse:h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cx(control, "py-2", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cx(control, "h-10 pointer-coarse:h-11", className)} {...props} />;
}

/*
 * Status meanings (design system: Badge). Never colour alone: every badge
 * carries its word and a 12px glyph at stroke 3.
 */
const tones = {
  neutral: { cls: "bg-surface-sunken text-ink-strong", Icon: Clock },
  progress: { cls: "bg-surface-tint text-ink-on-tint", Icon: Loader },
  done: { cls: "bg-success-surface text-success", Icon: Check },
  waiting: { cls: "bg-warning-surface text-warning", Icon: Eye },
  blocked: { cls: "bg-danger-surface text-danger-text", Icon: AlertCircle },
};

export function Badge({ tone = "neutral", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  const { cls, Icon } = tones[tone];
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs leading-4 whitespace-nowrap", cls, tone === "blocked" ? "font-bold" : "font-medium")}>
      <Icon aria-hidden className="size-3 shrink-0" strokeWidth={3} />
      {children}
    </span>
  );
}

export function Notice({ tone = "waiting", children }: { tone?: "waiting" | "blocked" | "done"; children: ReactNode }) {
  const { cls, Icon } = tones[tone];
  return (
    <div role="status" className={cx("flex items-start gap-2.5 rounded-xl p-4 text-sm", cls)}>
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function Skeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-10 animate-pulse rounded-[6px] bg-surface-sunken" />
      ))}
    </div>
  );
}

export const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
