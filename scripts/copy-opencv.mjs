// Copies OpenCV.js into public/vendor so the document scanner can load it from
// our own domain, only when someone opens the scanner (it is ~10 MB).
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const pkgDir = path.dirname(require.resolve("@techstark/opencv-js/package.json"));
const { version } = require("@techstark/opencv-js/package.json");
const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "public", "vendor");
mkdirSync(outDir, { recursive: true });
copyFileSync(path.join(pkgDir, "dist", "opencv.js"), path.join(outDir, `opencv-${version}.js`));
console.log(`Copied OpenCV.js ${version} to public/vendor`);
