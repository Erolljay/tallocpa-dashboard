"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="pressable inline-flex items-center gap-1.5 rounded-[6px] px-2 py-1 text-sm text-link hover:text-link-hover hover:underline pointer-coarse:min-h-11">
      <Printer aria-hidden className="size-4" />
      Print or Save as PDF
    </button>
  );
}
