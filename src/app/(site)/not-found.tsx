import { SiteNotFoundBody } from "@/components/site/not-found-body";

/** A website page that is not there (e.g. an unknown service), inside the site's header and footer. */
export default function SiteNotFound() {
  return (
    <>
      <title>Page not found | Tallo CPA</title>
      <SiteNotFoundBody />
    </>
  );
}
