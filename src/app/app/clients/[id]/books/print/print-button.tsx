"use client";

import { RiPrinterLine } from "@remixicon/react";
import { Button } from "@/components/ui";

export function PrintButton() {
  return (
    <Button type="button" onClick={() => window.print()}>
      <RiPrinterLine aria-hidden className="size-4" /> Print
    </Button>
  );
}
