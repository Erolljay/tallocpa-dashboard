"use client";

import { RiAnticlockwiseLine, RiFullscreenExitLine, RiZoomInLine, RiZoomOutLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { cx } from "@/utils/cx";

const MIN = 1;
const MAX = 6;
const STEP = 1.5;

/**
 * A photo of a document in its fixed box: Enlarge zooms in inside the box, and the
 * reviewer drags the picture to the part they want to read (receipt totals, TINs),
 * without opening another tab. Double-click zooms in at that spot; Fit returns to the
 * whole page; Rotate turns a sideways photo. Keyboard: + and − zoom, arrows move.
 */
export function ZoomPreview({ src, alt }: { src: string; alt: string }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [turn, setTurn] = useState(0);
  const [dragging, setDragging] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const start = useRef<{ px: number; py: number; x: number; y: number } | null>(null);

  // Keep some of the picture in the box: it can move by at most half its enlarged size.
  const clamp = (p: { x: number; y: number }, z: number) => {
    const w = box.current?.clientWidth ?? 0;
    const h = box.current?.clientHeight ?? 0;
    const mx = (w * (z - 1)) / 2;
    const my = (h * (z - 1)) / 2;
    return { x: Math.min(mx, Math.max(-mx, p.x)), y: Math.min(my, Math.max(-my, p.y)) };
  };
  const zoomTo = (z: number, at?: { x: number; y: number }) => {
    const next = Math.min(MAX, Math.max(MIN, z));
    // Zoom toward a point (relative to the box centre) so it stays under the pointer.
    const p = at ? { x: at.x - ((at.x - pan.x) * next) / zoom, y: at.y - ((at.y - pan.y) * next) / zoom } : { x: (pan.x * next) / zoom, y: (pan.y * next) / zoom };
    setZoom(next);
    setPan(next === 1 ? { x: 0, y: 0 } : clamp(p, next));
  };
  const fromCentre = (e: { clientX: number; clientY: number }) => {
    const r = box.current!.getBoundingClientRect();
    return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 };
  };

  // Measured geometry: physical x/y whatever the reading direction.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom === 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, ...pan };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = start.current;
    if (s) setPan(clamp({ x: s.x + e.clientX - s.px, y: s.y + e.clientY - s.py }, zoom));
  };
  const onPointerUp = () => {
    start.current = null;
    setDragging(false);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const move = 60;
    const by: Record<string, { x: number; y: number }> = { ArrowLeft: { x: move, y: 0 }, ArrowRight: { x: -move, y: 0 }, ArrowUp: { x: 0, y: move }, ArrowDown: { x: 0, y: -move } };
    if (e.key === "+" || e.key === "=") zoomTo(zoom * STEP);
    else if (e.key === "-") zoomTo(zoom / STEP);
    else if (e.key === "0") zoomTo(1);
    else if (by[e.key] && zoom > 1) setPan(clamp({ x: pan.x + by[e.key].x, y: pan.y + by[e.key].y }, zoom));
    else return;
    e.preventDefault();
  };

  const tool = "flex size-8 items-center justify-center rounded-lg text-foreground-icon-secondary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring disabled:opacity-40";

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-1">
        <button type="button" onClick={() => zoomTo(zoom * STEP)} disabled={zoom >= MAX} className="flex h-8 items-center gap-1.5 rounded-lg bg-background-secondary-default px-2.5 text-body-medium text-text-primary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring disabled:opacity-40">
          <RiZoomInLine aria-hidden className="size-4" /> Enlarge
        </button>
        <button type="button" onClick={() => zoomTo(zoom / STEP)} disabled={zoom <= MIN} aria-label="Zoom out" className={tool}>
          <RiZoomOutLine aria-hidden className="size-4" />
        </button>
        <span className="w-12 text-center text-caption-1-regular tabular-nums text-text-tertiary" aria-live="polite">{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={() => zoomTo(1)} disabled={zoom === 1} aria-label="Fit the whole page" title="Fit" className={tool}>
          <RiFullscreenExitLine aria-hidden className="size-4" />
        </button>
        <button type="button" onClick={() => setTurn((t) => (t + 270) % 360)} aria-label="Rotate" title="Rotate" className={tool}>
          <RiAnticlockwiseLine aria-hidden className="size-4" />
        </button>
        {zoom > 1 && <span className="ms-1 text-caption-1-regular text-text-tertiary">Drag the picture to move around</span>}
      </div>
      <div
        ref={box}
        tabIndex={0}
        role="group"
        aria-label={`${alt}. Use + and − to zoom and the arrow keys to move.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(e) => zoomTo(zoom >= MAX ? 1 : zoom * 2, fromCentre(e))}
        onKeyDown={onKeyDown}
        className={cx(
          "relative h-[70vh] touch-none select-none overflow-hidden rounded-lg border border-separator-border bg-background-tertiary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
          zoom > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- a short-lived signed link, not an optimisable asset */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${turn}deg)` }}
          className={cx("size-full object-contain", !dragging && "transition-transform duration-150 ease-out motion-reduce:transition-none")}
        />
      </div>
    </div>
  );
}
