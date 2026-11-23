import { beforeAll, describe, expect, it } from "vitest";
import { createRequire } from "node:module";
import { detectDocument, OPENCV_VERSION, straighten, unwrapCv } from "./detect";
import { orderCorners, outputSize } from "./geometry";

const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cv: any;
beforeAll(async () => {
  // Plain require: vitest's import() would wait forever on OpenCV's self-resolving "then".
  cv = await unwrapCv(require("@techstark/opencv-js"));
}, 60_000);

it("loads the OpenCV.js version that postinstall copies to public/vendor", () => {
  expect(OPENCV_VERSION).toBe(require("@techstark/opencv-js/package.json").version);
});

/** A dark "table" with a white tilted "receipt" on it. */
function photo(corners: number[][], w = 900, h = 1200) {
  const img = new cv.Mat(h, w, cv.CV_8UC4, new cv.Scalar(40, 45, 50, 255));
  const pts = cv.matFromArray(4, 1, cv.CV_32SC2, corners.flat());
  const vec = new cv.MatVector();
  vec.push_back(pts);
  cv.fillPoly(img, vec, new cv.Scalar(245, 245, 240, 255));
  pts.delete();
  vec.delete();
  return img;
}

describe("orderCorners", () => {
  it("orders any four points as top-left, top-right, bottom-right, bottom-left", () => {
    const q = orderCorners([{ x: 90, y: 110 }, { x: 10, y: 100 }, { x: 0, y: 0 }, { x: 100, y: 5 }]);
    expect(q).toEqual([{ x: 0, y: 0 }, { x: 100, y: 5 }, { x: 90, y: 110 }, { x: 10, y: 100 }]);
  });
});

describe("detectDocument", () => {
  it("finds the corners of a tilted receipt on a table", () => {
    const corners = [[180, 150], [720, 210], [680, 1050], [140, 980]];
    const img = photo(corners);
    const q = detectDocument(cv, img);
    img.delete();
    expect(q).not.toBeNull();
    q!.forEach((p, i) => {
      expect(Math.abs(p.x - corners[i][0])).toBeLessThan(20);
      expect(Math.abs(p.y - corners[i][1])).toBeLessThan(20);
    });
  });

  it("finds nothing in an empty picture", () => {
    const img = new cv.Mat(1200, 900, cv.CV_8UC4, new cv.Scalar(40, 45, 50, 255));
    expect(detectDocument(cv, img)).toBeNull();
    img.delete();
  });

  it("straightens the receipt into a flat page of the right size", () => {
    const corners = [[180, 150], [720, 210], [680, 1050], [140, 980]];
    const img = photo(corners);
    const q = orderCorners(corners.map(([x, y]) => ({ x, y })));
    const flat = straighten(cv, img, q);
    expect({ width: flat.cols, height: flat.rows }).toEqual(outputSize(q));
    // The middle of the straightened page is the white paper.
    const mid = flat.ucharPtr(Math.floor(flat.rows / 2), Math.floor(flat.cols / 2));
    expect(mid[0]).toBeGreaterThan(200);
    flat.delete();
    img.delete();
  });
});
