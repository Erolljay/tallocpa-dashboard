/**
 * Shrinks a phone photo before upload so receipts send quickly on mobile data:
 * longest side at most 2400 px, JPEG quality 0.85 (still sharp enough to read and
 * for OCR). PDFs, small images and formats the browser cannot draw (e.g. HEIC on
 * some browsers) are sent as they are. Browser only.
 */
const MAX_SIDE = 2400;
const SMALL_ENOUGH = 1.5 * 1024 * 1024;

export async function shrinkImage(file: File): Promise<File> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return file;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return file;
  }
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size <= SMALL_ENOUGH) {
    bitmap.close();
    return file;
  }
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  if (!blob || blob.size >= file.size) return file;
  const name = file.name.replace(/\.(png|webp|jpe?g)$/i, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg", lastModified: file.lastModified });
}
