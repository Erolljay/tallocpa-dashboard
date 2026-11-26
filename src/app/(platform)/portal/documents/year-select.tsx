"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui";

/** Year picker for the client's document folders; keeps the open folder when the year changes. */
export function YearSelect({ years, value }: { years: number[]; value: number }) {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  return (
    <Select
      aria-label="Year"
      value={String(value)}
      onChange={(e) => {
        const next = new URLSearchParams(params);
        next.set("year", e.target.value);
        router.push(`${path}?${next.toString()}`);
      }}
      className="w-28"
    >
      {years.map((y) => <option key={y} value={y}>{y}</option>)}
    </Select>
  );
}
