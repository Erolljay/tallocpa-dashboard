import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
/* BoardUI styles (src/styles) plus the Tallo app layer, one Tailwind entry. */
import "./globals.css";
import { sidebarScript } from "@/lib/sidebar-state";
import { themeScript } from "@/lib/theme-script";

/* BoardUI's typeface: the theme reads it from --font-inter. */
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], axes: ["opsz"] });

/* Montserrat stays for the Tallo CPA wordmark only. */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "TalloCPA OS",
  description: "Clear Numbers. Clean Compliance.",
};

/*
 * The root layout of everything that is not the public website: the staff app
 * (/app), the client portal (/portal), sign-in, the quote funnel (/start), booking,
 * proposals and the file links. The website (src/app/(site)/layout.tsx) is a second
 * root layout with its own lean stylesheet and fonts; moving between the two is a
 * full page load.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-PH" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Staff sidebar collapse, from its cookie, so the rail paints at the right width. */}
        <script dangerouslySetInnerHTML={{ __html: sidebarScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background-full text-text-primary">{children}</body>
    </html>
  );
}
