/** Files kept for the brand in the private "brand-files" bucket (<brand id>/<kind>/<file>). */
export type BrandFileKind = "cor" | "logo";

export const BRAND_FILES: Record<BrandFileKind, {
  column: "cor_path" | "logo_path";
  types: Record<string, string>;
  accept: string;
  maxBytes: number;
  typeError: string;
  sizeError: string;
}> = {
  cor: {
    column: "cor_path",
    types: { "application/pdf": "pdf", "image/png": "png", "image/jpeg": "jpg" },
    accept: "application/pdf,image/png,image/jpeg",
    maxBytes: 5 * 1024 * 1024,
    typeError: "Upload the COR as a PDF, PNG or JPEG file.",
    sizeError: "The COR file is over 5 MB. Scan it at a lower resolution and try again.",
  },
  logo: {
    column: "logo_path",
    types: { "image/svg+xml": "svg", "image/png": "png" },
    accept: "image/svg+xml,image/png",
    maxBytes: 1024 * 1024,
    typeError: "Upload the logo as an SVG or PNG file.",
    sizeError: "The logo is over 1 MB. Save it smaller and try again.",
  },
};
