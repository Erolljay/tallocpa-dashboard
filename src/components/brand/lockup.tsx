import { cx } from "@/utils/cx";
import { Mark } from "./mark";

/** Header lockup: 32px mark beside the wordmark (Montserrat) and the tagline (Caption 2). */
export function Lockup({ wordmarkClassName }: { wordmarkClassName?: string } = {}) {
  return (
    <div className="flex items-center gap-2">
      <Mark className="size-8 shrink-0 rounded-lg" />
      <div className={cx("min-w-0", wordmarkClassName)}>
        <p className="font-display text-title-3-semibold text-text-primary">Tallo CPA</p>
        <p className="text-caption-2-regular whitespace-nowrap text-text-tertiary">Clear Numbers. Clean Compliance.</p>
      </div>
    </div>
  );
}
