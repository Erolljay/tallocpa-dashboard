/** Corner geometry for the document scanner (pure; no OpenCV needed). */

export interface Point {
  x: number;
  y: number;
}
/** Top-left, top-right, bottom-right, bottom-left. */
export type Quad = [Point, Point, Point, Point];

/** Puts four corners in order: top-left, top-right, bottom-right, bottom-left. */
export function orderCorners(points: readonly Point[]): Quad {
  if (points.length !== 4) throw new Error("A document has four corners");
  const bySum = [...points].sort((a, b) => a.x + a.y - (b.x + b.y));
  const byDiff = [...points].sort((a, b) => a.y - a.x - (b.y - b.x));
  return [bySum[0], byDiff[0], bySum[3], byDiff[3]];
}

const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

/** Output size of the straightened page: the longer of each pair of opposite edges. */
export function outputSize(q: Quad): { width: number; height: number } {
  const [tl, tr, br, bl] = q;
  return {
    width: Math.round(Math.max(dist(tl, tr), dist(bl, br))),
    height: Math.round(Math.max(dist(tl, bl), dist(tr, br))),
  };
}

/** Area of a quadrilateral (shoelace). */
export function quadArea(q: Quad): number {
  let s = 0;
  for (let i = 0; i < 4; i++) {
    const a = q[i];
    const b = q[(i + 1) % 4];
    s += a.x * b.y - b.x * a.y;
  }
  return Math.abs(s) / 2;
}

/** A frame inset 8% from the edges, used when no document is found. */
export function defaultQuad(width: number, height: number): Quad {
  const dx = width * 0.08;
  const dy = height * 0.08;
  return [
    { x: dx, y: dy },
    { x: width - dx, y: dy },
    { x: width - dx, y: height - dy },
    { x: dx, y: height - dy },
  ];
}

export const scaleQuad = (q: Quad, s: number): Quad => q.map((p) => ({ x: p.x * s, y: p.y * s })) as Quad;
