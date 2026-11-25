"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui";
import { cx } from "@/utils/cx";

/**
 * A picker that sets one search param of the current page (the business, the year,
 * the report). `clear`: other params to drop when it changes (a year that belongs
 * to the business picked before).
 */
export function ParamSelect({ name, label, value, options, clear = [], className }: {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  clear?: string[];
  className?: string;
}) {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  return (
    <Select
      aria-label={label}
      value={value}
      onChange={(e) => {
        const next = new URLSearchParams(params);
        next.set(name, e.target.value);
        for (const c of clear) next.delete(c);
        router.push(`${path}?${next.toString()}`);
      }}
      className={cx("pointer-coarse:min-h-11", className)}
    >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </Select>
  );
}
