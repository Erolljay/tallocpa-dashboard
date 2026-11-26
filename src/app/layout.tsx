import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
/* BoardUI styles (src/styles) plus the Tallo app layer, one Tailwind entry. */
import "./globals.css";
import { sidebarScript } from "@/lib/sidebar-state";

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
 * BoardUI flips its tokens with a `.dark` class on <html>. Before first paint,
 * apply the saved choice from the theme toggle, or follow the device when the
 * user has not picked one, so there is no light flash in dark mode.
 */
const themeScript = `try{var t=localStorage.getItem("boardui:theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

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
