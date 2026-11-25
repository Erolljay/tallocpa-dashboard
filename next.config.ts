import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // The portal Statement page became Billing; old links (emails, bookmarks) keep working.
  redirects() {
    return [{ source: "/portal/statement/:path*", destination: "/portal/billing/:path*", permanent: true }];
  },
  partialPrefetching: true,
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
