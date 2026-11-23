/** Header lockup: mark + name + tagline (spec §7). The mark is a stand-in until the SVG redraw (Q59). */
export function Lockup() {
  return (
    <div className="flex items-center gap-3">
      <div aria-hidden className="grid size-10 place-items-center rounded-lg bg-brand-navy font-display text-lg font-bold text-white">
        T
      </div>
      <div>
        <p className="font-display text-xl font-semibold leading-7 text-ink-heading">Tallo CPA</p>
        <p className="text-[10px] uppercase tracking-[0.05em] text-ink-subtle">Clear Numbers. Clean Compliance.</p>
      </div>
    </div>
  );
}
