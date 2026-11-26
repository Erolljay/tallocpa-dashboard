import { ImageResponse } from "next/og";

/*
 * The link preview for every website page (Facebook, Messenger, X): the mark,
 * the wordmark and the tagline on the brand navy. ImageResponse cannot read CSS
 * tokens, so the inks are the brand ramp's values from src/styles/theme.css
 * (accent-950, accent-500, accent-200) and the Mark's own (src/components/brand/mark.tsx).
 */
export const alt = "Tallo CPA: Clear Numbers. Clean Compliance.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#020f3d";
const MARK_NAVY = "#041a63";
const BLUE = "#0053fb";
const SKY = "#1195f7";
const SKY_LIGHT = "#8fc6ff";
const PALE = "#c0d4ff";
const WHITE = "#ffffff";

/** Montserrat for the wordmark, as in the site header; without the network the default face is used. */
async function montserrat(weight: 600 | 700, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Montserrat:wght@${weight}&text=${encodeURIComponent(text)}`, {
      signal: AbortSignal.timeout(4000),
    }).then((r) => (r.ok ? r.text() : ""));
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src, { signal: AbortSignal.timeout(4000) });
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const wordmark = "Tallo CPA";
  const tagline = "Clear Numbers. Clean Compliance.";
  const line = "Bookkeeping, BIR filings and audit for Philippine businesses";
  const [bold, semi] = await Promise.all([montserrat(700, wordmark), montserrat(600, `${tagline}${line}`)]);
  const fonts = [
    ...(bold ? [{ name: "Montserrat", data: bold, weight: 700 as const, style: "normal" as const }] : []),
    ...(semi ? [{ name: "Montserrat", data: semi, weight: 600 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NAVY, padding: 80, fontFamily: fonts.length ? "Montserrat" : undefined }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <svg width="112" height="110" viewBox="0 0 1453 1430" style={{ borderRadius: 20 }}>
              <rect x="0" y="0" width="708" height="1430" fill={MARK_NAVY} />
              <rect x="775" y="0" width="678" height="1430" fill={MARK_NAVY} />
              <rect x="325" y="324" width="822" height="277" fill={WHITE} />
              <rect x="589" y="600" width="296" height="553" fill={WHITE} />
              <rect x="325" y="867" width="264" height="286" fill={BLUE} />
              <rect x="885" y="601" width="262" height="282" fill={SKY} />
              <rect x="885" y="883" width="262" height="270" fill={SKY_LIGHT} />
            </svg>
            <div style={{ fontSize: 64, fontWeight: 700, color: WHITE, letterSpacing: -1 }}>{wordmark}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 76, fontWeight: 600, color: WHITE, lineHeight: 1.05, letterSpacing: -2 }}>{tagline}</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: PALE }}>{line}</div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
