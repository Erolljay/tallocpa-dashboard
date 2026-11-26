import type { ReactNode } from "react";
import { PageIntro, Section } from "@/components/site/blocks";
import { getSiteBrand } from "@/lib/site/brand";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description: "How Tallo CPA collects, uses, keeps and protects the personal information sent through its website, under the Data Privacy Act of 2012.",
  path: "/privacy",
});

/*
 * OWNER REVIEW REQUIRED: this privacy notice is written generically for the
 * website's quote form. Before the site goes live, check it against what the
 * firm actually does (retention period, who processes the data, the Data
 * Protection Officer's name and contact, NPC registration if applicable) and
 * have it reviewed if needed. It is not legal advice.
 */
export default async function PrivacyPage() {
  const brand = await getSiteBrand();
  const controller = brand.legalName ?? brand.displayName;
  return (
    <>
      <PageIntro title="Privacy notice" lede={`How ${controller} handles the personal information you send through this website, under the Data Privacy Act of 2012 (Republic Act No. 10173).`} />
      <Section labelledBy="privacy-body">
        <h2 id="privacy-body" className="sr-only">
          The notice
        </h2>
        <div className="flex max-w-3xl flex-col gap-10">
          <Part title="What we collect">
            <p>
              When you request a quote, the form asks for your name, email address, mobile number, your business or trade name, its
              type of taxpayer and VAT registration, the services you want, figures that set the fee (such as employees, branches and the
              volume of documents), and any message you add. We also record the date of
              the request and, if you arrived from an advertisement or a post, which one (from the link&apos;s campaign tags).
            </p>
            <p>The website does not ask for your TIN, bank details or government ID. We collect those only after you engage us, through the client portal.</p>
          </Part>
          <Part title="Why we collect it">
            <p>To prepare and send your quote, to contact you about it, and, if you engage us, to start the engagement. The campaign tags tell us which of our posts and advertisements reach people, so we can spend less on those that do not.</p>
            <p>We process this information on your consent, given when you send the form, and to take steps you asked for before a contract.</p>
          </Part>
          <Part title="Who sees it">
            <p>
              Our staff who handle quotes and onboarding. The information is stored with the service providers that host our systems
              (database, website and email), under agreements that bind them to protect it. We do not sell it or share it for others&apos;
              marketing.
            </p>
          </Part>
          <Part title="How long we keep it">
            <p>
              If you do not engage us, we delete the request within two years of your last contact with us. If you engage us, it becomes
              part of your client records, which we keep for the periods the tax laws and professional standards require.
            </p>
          </Part>
          <Part title="Your rights">
            <p>
              You may ask to see the information we hold about you, have it corrected, object to its processing, have it deleted or
              blocked, or receive a copy. You may also file a complaint with the National Privacy Commission.
            </p>
            <p>
              {brand.email ? (
                <>
                  Send requests to{" "}
                  <a href={`mailto:${brand.email}?subject=${encodeURIComponent("Data privacy request")}`} dir="ltr" className="rounded-sm text-text-primary underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
                    {brand.email}
                  </a>{" "}
                  with the subject &ldquo;Data privacy request&rdquo;.
                </>
              ) : (
                "Send requests through the contact details on our Contact page, marked “Data privacy request”."
              )}{" "}
              We reply within 15 days.
            </p>
          </Part>
          <Part title="Security">
            <p>The information travels encrypted, is stored in access-controlled systems, and is visible only to the people who need it for your request.</p>
          </Part>
        </div>
      </Section>
    </>
  );
}

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-title-2-semibold text-text-primary">{title}</h3>
      <div className="flex flex-col gap-3 text-body-regular text-text-secondary">{children}</div>
    </section>
  );
}
