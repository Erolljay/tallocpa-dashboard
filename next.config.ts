import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // The portal Statement page became Billing; old links (emails, bookmarks) keep working.
  redirects() {
    return [
      { source: "/portal/statement/:path*", destination: "/portal/billing/:path*", permanent: true },
      // The portal has no Payroll section (decision 19): released 2316s moved under Reports.
      { source: "/portal/payroll/2316/:clientId/:year", destination: "/portal/reports/2316/:clientId/:year", permanent: true },
      { source: "/portal/payroll/:path*", destination: "/portal/reports", permanent: true },
    ];
  },
  partialPrefetching: true,
  experimental: {
    // Two root layouts (the website's and the app's) leave no single layout for an
    // unmatched URL's 404: src/app/global-not-found.tsx renders it with the website's document.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        // CSS modules (*.module.css) keep Next's own handling, so their class names stay scoped.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
