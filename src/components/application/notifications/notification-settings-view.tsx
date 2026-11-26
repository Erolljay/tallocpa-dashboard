import { RiArrowLeftSLine, RiShieldUserLine } from "@remixicon/react";
import { LinkButton, PageHeader } from "@/components/ui";
import { kindsFor, NOTIFICATION_GROUPS, NOTIFICATION_KINDS, type NotificationGroup } from "@/lib/notifications/kinds";
import { emailPreferences } from "@/lib/notifications/queries";
import { IDLE_MINUTES } from "@/lib/session/idle";
import { EmailSwitches, type EmailSwitchGroup } from "./email-switches";
import { notificationsHref, type BellAudience } from "./paths";

/** Personal notification settings: an email switch per kind this person receives, and the session rule. */
export async function NotificationSettingsView({ audience, userId, role }: { audience: BellAudience; userId: string; role: "owner" | "reviewer" | "staff" | null }) {
  const kinds = kindsFor(audience, role);
  const prefs = await emailPreferences(userId, kinds);
  const groups: EmailSwitchGroup[] = (Object.keys(NOTIFICATION_GROUPS) as NotificationGroup[])
    .map((group) => ({
      key: group,
      label: NOTIFICATION_GROUPS[group],
      kinds: kinds.filter((k) => NOTIFICATION_KINDS[k].group === group).map((k) => ({ kind: k, label: NOTIFICATION_KINDS[k].label, on: prefs[k] })),
    }))
    .filter((g) => g.kinds.length > 0);

  return (
    <>
      <PageHeader
        title="Notification settings"
        description="The bell always shows everything; these switches only control email."
        actions={
          <LinkButton href={notificationsHref(audience)} variant="secondary" size="sm">
            <RiArrowLeftSLine aria-hidden className="size-[18px] rtl:-scale-x-100" />
            Notifications
          </LinkButton>
        }
      />
      <div className="flex flex-col gap-4">
        <EmailSwitches groups={groups} />
        <section aria-labelledby="session-rule" className="flex items-start gap-3 rounded-3xl border border-border-button-default bg-background-primary-default p-5 sm:p-6">
          <RiShieldUserLine aria-hidden className="mt-0.5 size-5 shrink-0 text-foreground-icon-secondary" />
          <div className="flex flex-col gap-1">
            <h2 id="session-rule" className="text-headline-medium text-text-primary">
              Signing out
            </h2>
            <p className="text-body-regular text-text-secondary">
              For security you are signed out after {IDLE_MINUTES[audience]} minutes without activity. You get a one-minute warning first.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
