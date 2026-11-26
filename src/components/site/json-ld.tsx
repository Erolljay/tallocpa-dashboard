import { ldJson } from "@/lib/site/structured-data";

/** A JSON-LD block for search engines; "<" is escaped so the data cannot close the tag. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(data) }} />;
}
