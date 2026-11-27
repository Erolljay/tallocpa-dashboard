"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getIdentity } from "@/lib/auth";
import { ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE } from "./constants";

/** Switches the portal to one of the contact's businesses, or to all of them, and remembers it. */
export async function switchBusinessAction(clientId: string): Promise<{ error?: string }> {
  const id = await getIdentity();
  if (id.staff) return { error: "Staff use the firm app." };
  if (clientId !== ALL_BUSINESSES && !id.clients.some((c) => c.clientId === clientId)) return { error: "Business not found." };
  (await cookies()).set(PORTAL_BUSINESS_COOKIE, clientId, {
    path: "/portal",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  revalidatePath("/portal", "layout");
  return {};
}
