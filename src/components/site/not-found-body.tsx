import { ButtonLink } from "@/components/base/buttons/button";
import { H1 } from "./blocks";
import { cx } from "@/utils/cx";
import { Container } from "./chrome";

/**
 * The website's 404, inside the site's frame: a navy banner, one sentence and the
 * way back. A Server Component with plain links only: Next sends a segment's
 * not-found with every page under it, so it must not add client code.
 */
export function SiteNotFoundBody() {
  return (
    <section className="site-navy site-grid flex-1">
      <Container className="flex flex-col gap-5 py-16 md:py-24">
        <p className="figure text-body-medium text-accent-200">404</p>
        <h1 className={cx(H1, "text-text-white")}>This page is not here.</h1>
        <p className="max-w-[52ch] text-title-3-regular text-accent-200">
          The link may be old, or the address mistyped. Start from the home page, or see our services.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/" className="h-12 px-5">
            Go to the home page
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" className="h-12 px-5">
            See our services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
