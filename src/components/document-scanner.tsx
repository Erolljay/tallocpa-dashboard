"use client";

import { Check, LoaderCircle, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { detectDocument, loadCv, straighten } from "@/lib/scan/detect";
import { defaultQuad, type Point, type Quad } from "@/lib/scan/geometry";

type Stage = "starting" | "live" | "adjust" | "saving" | "error";

/**
 * Full-screen document scanner (phone or tablet): live camera with the page's
 * edges outlined, then drag the corners if needed, then the page is straightened
 * and cropped like a scanner app. Each scan is handed to `onScan` as a JPEG file.
 */
export function DocumentScanner({ onScan, onClose, onUnavailable }: { onScan: (file: File) => void; onClose: () => void; onUnavailable: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const overlay = useRef<HTMLCanvasElement>(null);
  const still = useRef<HTMLCanvasElement>(null);
  const stream = useRef<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- OpenCV.js
  const cvRef = useRef<any>(null);
  const [stage, setStage] = useState<Stage>("starting");
  const [error, setError] = useState("");
  const [quad, setQuad] = useState<Quad | null>(null);
  const [found, setFound] = useState(false);
  const [count, setCount] = useState(0);

  const stop = useCallback(() => {
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
  }, []);

  // Start the camera and load OpenCV.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!("getUserMedia" in (navigator.mediaDevices ?? {}))) {
        onUnavailable();
        return;
      }
      try {
        const [media, cv] = await Promise.all([
          navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false }),
          loadCv(),
        ]);
        if (cancelled) {
          media.getTracks().forEach((t) => t.stop());
          return;
        }
        stream.current = media;
        cvRef.current = cv;
        if (video.current) {
          video.current.srcObject = media;
          await video.current.play();
        }
        setStage("live");
      } catch (e) {
        const name = (e as { name?: string }).name;
        if (name === "NotAllowedError" || name === "NotFoundError" || name === "OverconstrainedError") {
          onUnavailable();
          return;
        }
        setError((e as Error).message || "The camera could not start.");
        setStage("error");
      }
    })();
    return () => {
      cancelled = true;
      stop();
    };
  }, [onUnavailable, stop]);

  // Live outline: detect on a small frame a few times a second.
  useEffect(() => {
    if (stage !== "live") return;
    const small = document.createElement("canvas");
    const timer = window.setInterval(() => {
      const v = video.current;
      const o = overlay.current;
      const cv = cvRef.current;
      if (!v || !o || !cv || !v.videoWidth) return;
      const scale = 480 / Math.max(v.videoWidth, v.videoHeight);
      small.width = Math.round(v.videoWidth * scale);
      small.height = Math.round(v.videoHeight * scale);
      small.getContext("2d", { willReadFrequently: true })!.drawImage(v, 0, 0, small.width, small.height);
      const mat = cv.imread(small);
      let q: Quad | null = null;
      try {
        q = detectDocument(cv, mat);
      } finally {
        mat.delete();
      }
      // Map from the small frame to the overlay as displayed (object-cover).
      const rect = o.getBoundingClientRect();
      o.width = rect.width;
      o.height = rect.height;
      const ctx = o.getContext("2d")!;
      ctx.clearRect(0, 0, o.width, o.height);
      setFound(Boolean(q));
      if (!q) return;
      const cover = Math.max(rect.width / small.width, rect.height / small.height);
      const offX = (rect.width - small.width * cover) / 2;
      const offY = (rect.height - small.height * cover) / 2;
      ctx.beginPath();
      q.forEach((p, i) => (i ? ctx.lineTo(p.x * cover + offX, p.y * cover + offY) : ctx.moveTo(p.x * cover + offX, p.y * cover + offY)));
      ctx.closePath();
      ctx.fillStyle = "rgba(37, 99, 235, 0.18)";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#3b82f6";
      ctx.stroke();
    }, 250);
    return () => window.clearInterval(timer);
  }, [stage]);

  function capture() {
    const v = video.current;
    const c = still.current;
    const cv = cvRef.current;
    if (!v || !c || !cv) return;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")!.drawImage(v, 0, 0);
    const mat = cv.imread(c);
    try {
      setQuad(detectDocument(cv, mat) ?? defaultQuad(c.width, c.height));
    } finally {
      mat.delete();
    }
    setStage("adjust");
  }

  async function saveScan(andFinish: boolean) {
    const c = still.current;
    const cv = cvRef.current;
    if (!c || !cv || !quad) return;
    setStage("saving");
    const src = cv.imread(c);
    const out = straighten(cv, src, quad);
    const outCanvas = document.createElement("canvas");
    try {
      cv.imshow(outCanvas, out);
    } finally {
      src.delete();
      out.delete();
    }
    const blob = await new Promise<Blob | null>((r) => outCanvas.toBlob(r, "image/jpeg", 0.9));
    if (blob) {
      const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
      onScan(new File([blob], `scan-${stamp}.jpg`, { type: "image/jpeg" }));
      setCount((n) => n + 1);
    }
    if (andFinish) {
      stop();
      onClose();
    } else {
      setQuad(null);
      setStage("live");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-white" role="dialog" aria-modal="true" aria-label="Scan a document">
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm">
          {stage === "adjust" ? "Drag the corners to the edges of the page" : found ? "Page found — hold steady and tap the button" : "Point the camera at the receipt"}
          {count > 0 && <span className="ml-2 text-white/70">· {count} scanned</span>}
        </p>
        <button
          type="button"
          onClick={() => {
            stop();
            onClose();
          }}
          className="rounded-full p-2 hover:bg-white/10"
          aria-label="Close the scanner"
        >
          <X className="size-6" aria-hidden />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <video ref={video} playsInline muted className={`absolute inset-0 h-full w-full object-cover ${stage === "live" ? "" : "invisible"}`} />
        <canvas ref={overlay} className={`pointer-events-none absolute inset-0 h-full w-full ${stage === "live" ? "" : "hidden"}`} />
        <Adjuster canvas={still} quad={quad} onChange={setQuad} visible={stage === "adjust" || stage === "saving"} />
        {stage === "starting" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80">
            <LoaderCircle className="size-8 animate-spin" aria-hidden />
            <p className="text-sm">Starting the scanner…</p>
          </div>
        )}
        {stage === "error" && <p className="absolute inset-x-4 top-1/3 text-center text-sm">{error}</p>}
      </div>

      <div className="flex items-center justify-center gap-3 px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {stage === "live" && (
          <button type="button" onClick={capture} aria-label="Take the scan" className="size-18 rounded-full border-4 border-white bg-white/20 active:bg-white/50" />
        )}
        {(stage === "adjust" || stage === "saving") && (
          <>
            <button type="button" disabled={stage === "saving"} onClick={() => setStage("live")} className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-3 text-sm">
              <RotateCcw className="size-4" aria-hidden /> Retake
            </button>
            <button type="button" disabled={stage === "saving"} onClick={() => saveScan(false)} className="whitespace-nowrap rounded-full bg-white/15 px-4 py-3 text-sm">
              Scan another
            </button>
            <button type="button" disabled={stage === "saving"} onClick={() => saveScan(true)} className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
              {stage === "saving" ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <Check className="size-4" aria-hidden />} Done
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** The captured photo with four draggable corner handles. */
function Adjuster({ canvas, quad, onChange, visible }: { canvas: React.RefObject<HTMLCanvasElement | null>; quad: Quad | null; onChange: (q: Quad) => void; visible: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ scale: 1, offX: 0, offY: 0, w: 0, h: 0 });
  const dragging = useRef<number | null>(null);

  // Fit the photo (object-contain) and remember how image pixels map to the screen.
  useEffect(() => {
    if (!visible) return;
    const fit = () => {
      const c = canvas.current;
      const b = box.current;
      if (!c || !b || !c.width) return;
      const r = b.getBoundingClientRect();
      const scale = Math.min(r.width / c.width, r.height / c.height);
      setView({ scale, offX: (r.width - c.width * scale) / 2, offY: (r.height - c.height * scale) / 2, w: c.width, h: c.height });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [visible, canvas]);

  const toScreen = (p: Point) => ({ x: p.x * view.scale + view.offX, y: p.y * view.scale + view.offY });

  function move(e: React.PointerEvent) {
    if (dragging.current == null || !quad || !box.current) return;
    const r = box.current.getBoundingClientRect();
    const x = Math.min(view.w, Math.max(0, (e.clientX - r.left - view.offX) / view.scale));
    const y = Math.min(view.h, Math.max(0, (e.clientY - r.top - view.offY) / view.scale));
    const next = [...quad] as Quad;
    next[dragging.current] = { x, y };
    onChange(next);
  }

  return (
    <div
      ref={box}
      className={`absolute inset-0 touch-none ${visible ? "" : "hidden"}`}
      onPointerMove={move}
      onPointerUp={() => (dragging.current = null)}
      onPointerCancel={() => (dragging.current = null)}
    >
      <canvas
        ref={canvas}
        className="absolute"
        style={{ left: view.offX, top: view.offY, width: view.w * view.scale, height: view.h * view.scale }}
      />
      {quad && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <polygon points={quad.map((p) => { const s = toScreen(p); return `${s.x},${s.y}`; }).join(" ")} fill="rgba(37,99,235,0.18)" stroke="#3b82f6" strokeWidth={3} />
        </svg>
      )}
      {quad?.map((p, i) => {
        const s = toScreen(p);
        return (
          <button
            key={i}
            type="button"
            aria-label={["Top-left", "Top-right", "Bottom-right", "Bottom-left"][i] + " corner"}
            onPointerDown={(e) => {
              dragging.current = i;
              (e.currentTarget.parentElement as HTMLElement).setPointerCapture(e.pointerId);
            }}
            className="absolute size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-blue-500/70 shadow"
            style={{ left: s.x, top: s.y }}
          />
        );
      })}
    </div>
  );
}
