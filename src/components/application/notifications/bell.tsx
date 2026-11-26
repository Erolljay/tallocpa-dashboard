import { RiNotification3Line } from "@remixicon/react";
import { getIdentity } from "@/lib/auth";
import { bellData } from "@/lib/notifications/queries";
import { cx } from "@/utils/cx";
import { NotificationBell, type BellVariant } from "./notification-bell";
import type { BellAudience } from "./paths";

/**
 * The bell with the signed-in person's count and latest notifications. Reads request
 * data: render it inside <Suspense fallback={<BellFallback … />}> so the layout's shell
 * stays prerendered.
 */
export async function Bell({ audience, variant, className }: { audience: BellAudience; variant: BellVariant; className?: string }) {
  const id = await getIdentity();
  const initial = await bellData(id.userId);
  return <NotificationBell audience={audience} variant={variant} initial={initial} className={className} />;
}

/** The bell's place while the count loads: the same size, no count, not yet interactive. */
export function BellFallback({ variant, className }: { variant: BellVariant; className?: string }) {
  if (variant === "row") {
    return (
      <div aria-hidden className={cx("flex w-full items-center gap-2 rounded-2lg p-2 md:sidebar-collapsed:justify-center", className)}>
        <RiNotification3Line className="size-5 shrink-0 text-foreground-icon-tertiary" />
        <span className="text-body-medium whitespace-nowrap text-text-tertiary md:sidebar-collapsed:sr-only">Notifications</span>
      </div>
    );
  }
  return (
    <div aria-hidden className={cx("flex size-9 items-center justify-center rounded-2lg pointer-coarse:size-11", className)}>
      <RiNotification3Line className="size-5 text-foreground-icon-tertiary" />
    </div>
  );
}
