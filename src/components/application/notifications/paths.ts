/** Who a bell or notifications page is for: staff (/app) or a client (/portal). */
export type BellAudience = "staff" | "client";

const base = (audience: BellAudience) => (audience === "staff" ? "/app" : "/portal");

/** The full list. */
export const notificationsHref = (audience: BellAudience) => `${base(audience)}/notifications`;

/** Personal email settings (the notification emails' footer links here). */
export const notificationSettingsHref = (audience: BellAudience) => `${base(audience)}/settings/notifications`;
