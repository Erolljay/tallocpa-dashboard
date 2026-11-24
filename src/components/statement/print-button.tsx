"use client";

import { RiPrinterLine } from "@remixicon/react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="pressable inline-flex items-center gap-1.5 rounded-2lg px-2 py-1 text-body-regular text-button-ghost-foreground hover:text-text-primary hover:underline pointer-coarse:min-h-11">
      <RiPrinterLine aria-hidden className="size-4" />
      Print or Save as PDF
    </button>
  );
}
