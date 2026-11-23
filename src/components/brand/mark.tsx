/**
 * The Tallo CPA mark, redrawn as SVG from the supplied master (tallo-mark.jpg),
 * measured rectangle by rectangle. Inks are the logo's own: brand-navy field,
 * brand-blue, brand-sky and brand-sky-light tiles, a white T. The slit between
 * the two halves is transparent, as in the master. Never recolour or stretch it.
 */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 1453 1430" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <rect x="0" y="0" width="708" height="1430" fill="#041a63" />
      <rect x="775" y="0" width="678" height="1430" fill="#041a63" />
      <rect x="325" y="324" width="822" height="277" fill="#ffffff" />
      <rect x="589" y="600" width="296" height="553" fill="#ffffff" />
      <rect x="325" y="867" width="264" height="286" fill="#0053fb" />
      <rect x="885" y="601" width="262" height="282" fill="#1195f7" />
      <rect x="885" y="883" width="262" height="270" fill="#8fc6ff" />
    </svg>
  );
}
