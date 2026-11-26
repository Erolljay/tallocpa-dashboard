import type { ReactNode } from "react";
import { H2_ON_NAVY, PageIntro, QuoteBand, Section, TextLink } from "@/components/site/blocks";
import { JsonLd } from "@/components/site/json-ld";
import {
  BillingScreen,
  CheckScreen,
  MonthScreen,
  OnboardingScreen,
  ReportsScreen,
  ReturnsScreen,
  ScreenFigure,
  TimelineScreen,
  UploadScreen,
} from "@/components/site/screens";
import { getSiteBrand } from "@/lib/site/brand";
import { siteUrl } from "@/lib/site/config";
import { HOW_STEPS } from "@/lib/site/content";
import { pageMetadata } from "@/lib/site/metadata";
import { FIRM_ID } from "@/lib/site/structured-data";
import { cx } from "@/utils/cx";

/* Primary search phrase: "how bookkeeping and BIR compliance work". OWNER REVIEW: the step copy (content.ts HOW_STEPS). */
export const metadata = pageMetadata({
  title: "How Our Bookkeeping and BIR Compliance Work | Tallo CPA",
  description:
    "How our bookkeeping and BIR compliance run each month: upload documents, we check and record them, you approve each return, and we file before the deadline.",
  path: "/how-we-work",
});

const step = (id: string) => {
  const i = HOW_STEPS.findIndex((s) => s.id === id);
  return { ...HOW_STEPS[i], n: i + 1 };
};

/** One step's words: the head names the step, one or two sentences say what happens. */
function StepText({ id, onNavy = false, className }: { id: string; onNavy?: boolean; className?: string }) {
  const s = step(id);
  return (
    <div id={s.id} className={cx("flex scroll-mt-24 flex-col gap-3", className)}>
      <h2 className={onNavy ? H2_ON_NAVY : "text-display-4-semibold text-balance text-text-primary lg:text-display-3-semibold"}>
        <span className={cx("figure me-3", onNavy ? "text-accent-200" : "text-button-ghost-foreground")}>{s.n}</span>
        {s.title}
      </h2>
      <p className={cx("max-w-[52ch] text-body-regular", onNavy ? "text-accent-200" : "text-text-secondary")}>{s.body}</p>
    </div>
  );
}

/** Two steps side by side, each its words over its screen. */
function Pair({ left, right }: { left: [string, ReactNode]; right: [string, ReactNode] }) {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
      {[left, right].map(([id, screen]) => (
        <div key={id} className="flex min-w-0 flex-col gap-8">
          <StepText id={id} />
          {screen}
        </div>
      ))}
    </div>
  );
}

/** One step: words on one side, its screen on the other. */
function Split({ id, screen, flip = false }: { id: string; screen: ReactNode; flip?: boolean }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
      <StepText id={id} className={cx("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")} />
      <div className={cx("min-w-0 lg:col-span-6", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>{screen}</div>
    </div>
  );
}

export default async function HowWeWorkPage() {
  const brand = await getSiteBrand();
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How bookkeeping and BIR compliance work with Tallo CPA",
    description: "Each month, from the documents you upload to the return we file, in the client portal.",
    provider: { "@id": FIRM_ID },
    step: HOW_STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body, url: `${siteUrl("/how-we-work")}#${s.id}` })),
  };
  return (
    <>
      <JsonLd data={howTo} />
      <PageIntro
        navy
        title="How bookkeeping and BIR compliance work with us"
        lede="Every month runs the same way in your client portal."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "How we work", path: "/how-we-work" },
        ]}
      />

      <Section labelledBy="calendar">
        <Pair
          left={["calendar", <ScreenFigure key="s" title="Filing calendar" caption="Your returns and their next due dates, set up from your registration."><OnboardingScreen /></ScreenFigure>]}
          right={["upload", <ScreenFigure key="s" title="Upload" caption="Four categories; pick what it is and the month, then scan or choose files."><UploadScreen /></ScreenFigure>]}
        />
      </Section>

      <Section labelledBy="check" tone="wash">
        <Split id="check" screen={<ScreenFigure title="Home" caption="What you sent this month, checked, and one question under Requests."><CheckScreen /></ScreenFigure>} />
      </Section>

      <Section labelledBy="confirm">
        <Pair
          left={["confirm", <ScreenFigure key="s" title="Home" caption="The month card before you confirm."><MonthScreen /></ScreenFigure>]}
          right={["lock", <ScreenFigure key="s" title="Home" caption="The same month, locked."><MonthScreen locked /></ScreenFigure>]}
        />
      </Section>

      <Section labelledBy="approve" tone="wash">
        <Split id="approve" flip screen={<ScreenFigure title="Returns" caption="A return waiting for approval, and the returns already filed."><ReturnsScreen /></ScreenFigure>} />
      </Section>

      <Section labelledBy="file" tone="navy">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <StepText id="file" onNavy />
            <p className="max-w-[52ch] text-body-regular text-accent-200">
              The schedule follows the <a href="/bir-filing-calendar" className="rounded-sm whitespace-nowrap text-text-white underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">BIR filing calendar</a>, and moves when the BIR moves a date.
            </p>
          </div>
          <div className="site-glow min-w-0 lg:col-span-7">
            <TimelineFigure />
          </div>
        </div>
      </Section>

      <Section labelledBy="reports">
        <Pair
          left={["reports", <ScreenFigure key="s" title="Reports" caption="Financial position, the last six months, and your filed returns, books and certificates."><ReportsScreen /></ScreenFigure>]}
          right={["billing", <ScreenFigure key="s" title="Billing" caption="Your statement, paid by QR code, with the proof uploaded."><BillingScreen /></ScreenFigure>]}
        />
        <p className="mt-16 max-w-[60ch] text-body-regular text-text-secondary">
          This is how our <TextLink href="/services/bookkeeping">bookkeeping services</TextLink> and{" "}
          <TextLink href="/services/tax-compliance">BIR tax compliance services</TextLink> run together.
        </p>
      </Section>


      <QuoteBand brand={brand} />
    </>
  );
}

/** The timeline screen, captioned for the navy band. */
function TimelineFigure() {
  return (
    <div className="[&_figcaption]:text-accent-200">
      <ScreenFigure title="Home" caption="What happens next: every approval and filing, months ahead, with its BIR deadline.">
        <TimelineScreen />
      </ScreenFigure>
    </div>
  );
}
