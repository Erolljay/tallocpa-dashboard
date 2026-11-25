"use client";

import type { Key } from "react-aria-components";
import { Select, SelectItem } from "@/components/base/select/select";
import { cx } from "@/utils/cx";

export interface PickOption {
  id: string;
  label: string;
}

const NONE = "__none__";

/**
 * A BoardUI select (react-aria) over plain options, for the Books forms and the
 * Inbox: value is an id or null ("none" row first when `noneLabel` is given).
 * `tone` tints the trigger: success for a code that can go as is, warning for a
 * suggestion to confirm (the account-title confirm pattern).
 */
export function Pick({
  label,
  ariaLabel,
  value,
  onChange,
  options,
  noneLabel,
  placeholder = "Choose…",
  tone = "neutral",
  size = "md",
  isDisabled,
  className,
  name,
}: {
  label?: string;
  ariaLabel?: string;
  value: string | null;
  onChange: (id: string | null) => void;
  options: PickOption[];
  noneLabel?: string;
  placeholder?: string;
  tone?: "neutral" | "success" | "warning" | "error";
  size?: "sm" | "md";
  isDisabled?: boolean;
  className?: string;
  name?: string;
}) {
  const selected: Key | null = value ?? (noneLabel ? NONE : null);
  return (
    <Select
      label={label}
      aria-label={label ? undefined : ariaLabel}
      selectedKey={selected}
      onSelectionChange={(k) => onChange(k == null || k === NONE ? null : String(k))}
      placeholder={placeholder}
      size={size}
      isDisabled={isDisabled}
      name={name}
      className={cx("min-w-0", className)}
      triggerClassName={cx(
        "w-full",
        tone === "success" && "border-transparent bg-status-lime-background text-status-lime-text hover:bg-status-lime-background",
        tone === "warning" && "border-transparent bg-status-yellow-background text-status-yellow-text hover:bg-status-yellow-background",
        tone === "error" && "border-border-error-default",
      )}
      popoverClassName="max-w-[min(32rem,calc(100vw-2rem))]"
    >
      {noneLabel ? <SelectItem id={NONE} textValue={noneLabel}>{noneLabel}</SelectItem> : null}
      {options.map((o) => (
        <SelectItem key={o.id} id={o.id} textValue={o.label}>{o.label}</SelectItem>
      ))}
    </Select>
  );
}
