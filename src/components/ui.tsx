import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
const variants = {
  primary: "bg-action text-ink-on-action hover:bg-action-hover",
  secondary: "border border-border-strong bg-surface text-ink-heading hover:bg-surface-sunken",
  ghost: "text-ink-strong hover:bg-surface-sunken",
};

export function Button({ variant = "primary", className, ...props }: ComponentProps<"button"> & { variant?: keyof typeof variants }) {
  return <button className={cx(buttonBase, variants[variant], className)} {...props} />;
}

export function LinkButton({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
  return <Link className={cx(buttonBase, variants[variant], className)} {...props} />;
}

export function PageHeader({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-heading">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-ink-muted">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, children, className, actions }: { title?: string; children: ReactNode; className?: string; actions?: ReactNode }) {
  return (
    <section className={cx("rounded-2xl border border-border bg-surface p-6", className)}>
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-4">
          {title && <h2 className="font-display text-lg font-semibold text-ink-heading">{title}</h2>}
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
      {hint && !error && <p className="text-xs text-ink-subtle">{hint}</p>}
      {error && <p className="text-xs text-danger-text">{error}</p>}
    </div>
  );
}

const control =
  "block w-full rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-subtle focus:border-action";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cx(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cx(control, className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cx(control, className)} {...props} />;
}

const tones = {
  neutral: "bg-surface-sunken text-ink-strong",
  progress: "bg-surface-tint text-ink-on-tint",
  done: "bg-success-surface text-success",
  waiting: "bg-warning-surface text-warning",
  blocked: "bg-danger-surface text-danger-text",
};

export function Badge({ tone = "neutral", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={cx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>{children}</span>;
}

export function Notice({ tone = "waiting", children }: { tone?: "waiting" | "blocked" | "done"; children: ReactNode }) {
  return <div role="status" className={cx("rounded-xl border border-border p-4 text-sm", tones[tone])}>{children}</div>;
}

export function Skeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-10 animate-pulse rounded-lg bg-surface-sunken" />
      ))}
    </div>
  );
}

export const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
