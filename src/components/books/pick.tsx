"use client";

import { useEffect, useState } from "react";
import type { Key } from "react-aria-components";
import { ComboBox, ComboBoxItem, ComboBoxSection } from "@/components/base/combobox/combobox";
import { cx } from "@/utils/cx";

export interface PickOption {
  id: string;
  label: string;
  /** Optional heading the option is listed under (e.g. the account type). */
  group?: string;
}

const NONE = "__none__";

/**
 * A searchable BoardUI combobox (react-aria) over plain options, for the Books
 * forms and the Inbox: type part of a code or name ("6100", "rent", "input vat")
 * and the list narrows to the rows that contain it; the arrow opens the whole
 * list. Value is an id or null ("none" row first when `noneLabel` is given).
 * Options with a `group` are listed under that heading.
 *
 * `tone` tints the field: success for a code that can go as is, warning for a
 * suggestion to confirm (the account-title confirm pattern). With `name`, the
 * chosen id is submitted with the form (empty for none).
 */
export function Pick({
  label,
  ariaLabel,
  value,
  onChange,
  options,
  noneLabel,
  placeholder = "Type to search…",
  tone = "neutral",
  size = "md",
  isDisabled,
  className,
  name,
  id,
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
  id?: string;
}) {
  const selected: Key | null = value ?? (noneLabel ? NONE : null);
  const labelOf = (v: string | null) => (v ? (options.find((o) => o.id === v)?.label ?? "") : (noneLabel ?? ""));
  const shown = labelOf(value);
  // The field shows the choice; typed text only filters, and goes back to the choice on leaving.
  const [text, setText] = useState(shown);
  useEffect(() => setText(shown), [shown]);
  const groups = [...new Set(options.map((o) => o.group ?? ""))];
  const grouped = groups.some((g) => g !== "");
  const item = (o: PickOption) => (
    <ComboBoxItem key={o.id} id={o.id} textValue={o.label}>
      <span className="truncate">{o.label}</span>
    </ComboBoxItem>
  );
  return (
    <>
      <ComboBox
        id={id}
        label={label}
        aria-label={label ? undefined : ariaLabel}
        selectedKey={selected}
        inputValue={text}
        onInputChange={setText}
        onSelectionChange={(k) => {
          // Clearing the text and leaving the field keeps the last choice; "none" is a row.
          if (k == null) return setText(shown);
          const next = k === NONE ? null : String(k);
          setText(labelOf(next));
          onChange(next);
        }}
        onBlur={() => setText(shown)}
        // Focusing selects the shown title, so typing starts a fresh search.
        onFocus={(e) => (e.target instanceof HTMLInputElement ? e.target.select() : undefined)}
        menuTrigger="focus"
        placeholder={placeholder}
        size={size === "sm" ? "small" : "medium"}
        isDisabled={isDisabled}
        emptyMessage="Nothing matches. Try part of the code or name."
        className={cx("min-w-0", className)}
        fieldClassName={cx(
          tone === "success" && "border-transparent bg-status-lime-background text-status-lime-text",
          tone === "warning" && "border-transparent bg-status-yellow-background text-status-yellow-text",
          tone === "error" && "border-border-error-default",
        )}
        popoverClassName="min-w-72 max-w-[min(32rem,calc(100vw-2rem))]"
      >
        {noneLabel ? (
          <ComboBoxItem id={NONE} textValue={noneLabel}>
            <span className="text-text-secondary">{noneLabel}</span>
          </ComboBoxItem>
        ) : null}
        {grouped
          ? groups.map((g) => (
              <ComboBoxSection key={g || "other"} id={`group:${g}`} title={g || "Other"}>
                {options.filter((o) => (o.group ?? "") === g).map(item)}
              </ComboBoxSection>
            ))
          : options.map(item)}
      </ComboBox>
      {/* Disabled fields do not submit either way: the hidden input keeps the id in the form. */}
      {name ? <input type="hidden" name={name} value={value ?? ""} /> : null}
    </>
  );
}

/**
 * Pick for a plain form: holds its own value from `defaultValue` and submits it
 * as `name` (empty for none).
 */
export function PickInput({ defaultValue, onChange, ...props }: Omit<Parameters<typeof Pick>[0], "value" | "onChange"> & { defaultValue: string | null; name: string; onChange?: (id: string | null) => void }) {
  const [value, setValue] = useState<string | null>(defaultValue || null);
  return (
    <Pick
      {...props}
      value={value}
      onChange={(x) => {
        setValue(x);
        onChange?.(x);
      }}
    />
  );
}
