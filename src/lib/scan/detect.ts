/**
 * Finds a document's edges in a photo and straightens it (OpenCV.js), like a
 * phone scanner app. Works on a downscaled copy for speed, then maps the corners
 * back to full size. OpenCV is loaded only when the scanner opens (loadCv).
 */
import { orderCorners, outputSize, quadArea, scaleQuad, type Quad } from "./geometry";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- OpenCV.js has loose typings
type CV = any;

/** Must match the installed @techstark/opencv-js (scripts/copy-opencv.mjs copies it to public/vendor). */
export const OPENCV_VERSION = "4.12.0-release.1";

/** OpenCV.js's module is a "thenable" that resolves to itself; unwrap it once so it can be awaited. */
export function unwrapCv(m: CV): Promise<CV> {
  return new Promise((resolve) => {
    if (m.Mat && typeof m.then !== "function") return resolve(m);
    m.then((ready: CV) => {
      delete ready.then;
      resolve(ready);
    });
  });
}

let loading: Promise<CV> | null = null;

/** Loads OpenCV.js in the browser from our own domain, once, the first time the scanner opens. */
export function loadCv(): Promise<CV> {
  loading ??= new Promise<CV>((resolve, reject) => {
    const w = window as unknown as { cv?: CV };
    if (w.cv) return resolve(unwrapCv(w.cv));
    const script = document.createElement("script");
    script.src = `/vendor/opencv-${OPENCV_VERSION}.js`;
    script.async = true;
    script.onload = () => (w.cv ? resolve(unwrapCv(w.cv)) : reject(new Error("The scanner could not start.")));
    script.onerror = () => {
      loading = null;
      reject(new Error("The scanner could not load. Check the internet connection."));
    };
    document.head.appendChild(script);
  });
  return loading;
}

/** Longest side used for detection: fast enough to run several times a second on a phone. */
const DETECT_SIDE = 480;

/**
 * Corners of the biggest four-sided shape covering at least `minArea` of the
 * image, in the coordinates of `src` (an RGBA Mat), or null if none is found.
 */
export function detectDocument(cv: CV, src: CV, minArea = 0.15): Quad | null {
  const scale = Math.min(1, DETECT_SIDE / Math.max(src.cols, src.rows));
  const small = new cv.Mat();
  const gray = new cv.Mat();
  const edges = new cv.Mat();
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  const kernel = cv.Mat.ones(3, 3, cv.CV_8U);
  try {
    cv.resize(src, small, new cv.Size(Math.round(src.cols * scale), Math.round(src.rows * scale)), 0, 0, cv.INTER_AREA);
    cv.cvtColor(small, gray, cv.COLOR_RGBA2GRAY);
    cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
    cv.Canny(gray, edges, 50, 150);
    cv.dilate(edges, edges, kernel);
    cv.findContours(edges, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

    const imageArea = small.cols * small.rows;
    let best: Quad | null = null;
    let bestArea = 0;
    for (let i = 0; i < contours.size(); i++) {
      const c = contours.get(i);
      const approx = new cv.Mat();
      try {
        const area = cv.contourArea(c);
        if (area < imageArea * minArea || area <= bestArea) continue;
        cv.approxPolyDP(c, approx, 0.02 * cv.arcLength(c, true), true);
        if (approx.rows === 4 && cv.isContourConvex(approx)) {
          const pts = [0, 1, 2, 3].map((k) => ({ x: approx.data32S[k * 2], y: approx.data32S[k * 2 + 1] }));
          const q = orderCorners(pts);
          if (quadArea(q) >= imageArea * minArea) {
            best = q;
            bestArea = area;
          }
        }
      } finally {
        approx.delete();
        c.delete();
      }
    }
    return best ? scaleQuad(best, 1 / scale) : null;
  } finally {
    small.delete();
    gray.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();
    kernel.delete();
  }
}

/** Straightens the page inside `quad` into a flat rectangle (new RGBA Mat; caller deletes it). */
export function straighten(cv: CV, src: CV, quad: Quad): CV {
  const { width, height } = outputSize(quad);
  const from = cv.matFromArray(4, 1, cv.CV_32FC2, quad.flatMap((p) => [p.x, p.y]));
  const to = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, width, 0, width, height, 0, height]);
  const m = cv.getPerspectiveTransform(from, to);
  const out = new cv.Mat();
  try {
    cv.warpPerspective(src, out, m, new cv.Size(width, height), cv.INTER_LINEAR, cv.BORDER_REPLICATE);
    return out;
  } finally {
    from.delete();
    to.delete();
    m.delete();
  }
}
