"use client";

import { Button } from "@/components/ui";

/** Opens the browser's print dialog (print, or save as PDF). */
export function PrintButton({ label = "Print / save as PDF" }: { label?: string }) {
  return <Button type="button" variant="secondary" onClick={() => window.print()}>{label}</Button>;
}
